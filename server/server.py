from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, request, send_file

import torch
import torchvision
import matplotlib.pyplot as plt
import numpy as np
import cv2
from torchvision.transforms import ToTensor
from PIL import Image


from cnn import CNN_MNIST, CNN_SVHN, CNN_CIFAR

from cams import grad_cam, optimize_cam, pca_thresh, eigen_k

# Initializing flask app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


features = None


def hook(module, input, output):
    global features
    features = output


# model = CNN_MNIST()
# model.load_state_dict(torch.load(
#     './cnn_models/MNIST.pt', map_location=torch.device('cpu')))
# image = Image.open('../datasets/testSet/img_1.jpg')

# image = ToTensor()(image)

# model.conv2.register_forward_hook(hook)

# output = model(image)
# _, predicted = torch.max(output.data, 1)


# @app.route('/')
# def index():
#     print('Hiiii')
#     return 'Hello from Flask!'


@app.route('/api/classify', methods=['POST'])
def classify():
    try:
        image = Image.open(request.files['image'])
        model_name = request.form.get('model')
        kernel = request.form.get('kernel')
        thresh = float(request.form.get('thresh'))

        if model_name == "mnist":
            model = CNN_MNIST()
            model.load_state_dict(torch.load(
                './cnn_models/MNIST.pt', map_location=torch.device('cpu')))
            model.conv2.register_forward_hook(hook)
        elif model_name == 'svhn':
            model = CNN_SVHN()
            model.load_state_dict(torch.load(
                './cnn_models/SVHN.pt', map_location=torch.device('cpu')))
            model.conv3.register_forward_hook(hook)
        elif model_name == 'cifar':
            model = CNN_CIFAR()
            model.load_state_dict(torch.load(
                './cnn_models/CIFAR.pt', map_location=torch.device('cpu')))
            model.conv3.register_forward_hook(hook)

        image = ToTensor()(image)

        output = model(image)
        _, predicted = torch.max(output.data, 1)
        probabilities = torch.softmax(output, dim=1)
        predicted_proba, predicted_class = torch.max(probabilities, 1)

        n_features = features.shape[0]
        h_w = features.shape[1]
        feature_maps_flat = features.reshape(n_features, h_w * h_w)

        grads = torch.autograd.grad(
            outputs=predicted_proba, inputs=features, retain_graph=True, allow_unused=True)[0]
        pooled_grads = torch.mean(grads, dim=(-2, -1), keepdim=True)

        # cam = grad_cam(features, pooled_grads)

        propa_cam = optimize_cam(image.shape, image, model, num_iterations=10,
                                 learning_rate=0.01, original=request.files['image'])

        pca_cam = pca_thresh(feature_maps_flat, 0.99,
                             grad_kernel='linear', h_w=h_w, size=image.shape[1], original=request.files['image'])

        pca_cam_k_vect = pca_thresh(feature_maps_flat, thresh,
                                    grad_kernel=kernel, h_w=h_w, size=image.shape[1], original=request.files['image'])

        eigen_cam = eigen_k(features.cpu().detach().numpy().copy(
        ), image.shape[1], request.files['image'], threshold=0.99)

        eigen_cam_k_vect = eigen_k(features.cpu().detach().numpy().copy(
        ), image.shape[1], request.files['image'], threshold=thresh)

        return jsonify(({'classe': predicted_class.item(), "proba": predicted_proba.item()*100, "pca_cam": pca_cam,  "propa_cam": propa_cam, "eigen_cam": eigen_cam, "pca_cam_k_vect": pca_cam_k_vect, "eigen_cam_k_vect": eigen_cam_k_vect}))
        # return jsonify(({'classe': predicted_class.item(), "proba": predicted_proba.item()*100}))
    except Exception as e:
        error_message = str(e)
        print(e)
        return jsonify({'error': error_message})


if __name__ == '__main__':
    app.run(debug=True)
