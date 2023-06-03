import torch
import torch.nn as nn
from torch.nn import functional as F
import cv2
from utils import normalize_cam, json_ready_cam_for_tensor, json_ready_cam
import torch.optim as optim
import urllib
from sklearn.decomposition import KernelPCA
import numpy as np


def grad_cam(features, pooled_grads, h_w):
    weighted_features = features * pooled_grads
    cam = torch.sum(weighted_features, dim=1, keepdim=True)
    cam = cam.abs()
    cam = cam.cpu().detach().numpy()[0, :, :]
    cam = cv2.resize(cam, (h_w, h_w))
    cam = normalize_cam(cam)
    return cam


def optimize_cam(image_shape, image_input, model, num_iterations, learning_rate, original):
    image = image_input.clone().detach().requires_grad_(True)
    output = model(image)
    _, predicted = torch.max(output.data, 1)
    optimizer = optim.Adam([image], lr=learning_rate)
    loss_fn = nn.CrossEntropyLoss()
    for i in range(num_iterations):
        optimizer.zero_grad()
        image_classification = image * image_input
        output = model(image_classification)
        # _, y_pred = torch.max(output.data, 1)

        loss = loss_fn(output, predicted)

        loss.backward(retain_graph=True)

        optimizer.step()
        image.data.clamp_(0, 1)
    image = 1 - image
    image = torch.sum(image, axis=0)
    image[image <= torch.mean(image)] = 0
    image = normalize_cam(image)

    image = json_ready_cam_for_tensor(image, original)
    return image


def pca_thresh(feature_maps_flat, thresh, grad_kernel, h_w, size, original):
    pca = KernelPCA(kernel=grad_kernel, random_state=0)
    principal_components = pca.fit_transform(
        feature_maps_flat.cpu().detach().numpy().T)

    eien_ratio = pca.eigenvalues_/pca.eigenvalues_[0]
    CAM = np.zeros_like(principal_components)

    for i in range(len(eien_ratio)):
        if eien_ratio[i] < thresh:
            break
        CAM[:, i] = principal_components[:, i] * eien_ratio[i]
    cam = np.sum(CAM, axis=1)
    cam = cam.reshape((h_w, h_w))
    cam = cv2.resize(cam, (size, size))
    cam = normalize_cam(cam)
    cam = json_ready_cam(cam, original)
    return cam


def eigen_k(activations, size, original, threshold=0.1):
    reshaped_activations = (activations).reshape(activations.shape[0], -1).T
    U, S, VT = np.linalg.svd(reshaped_activations, full_matrices=True)
    S /= S[0]
    CAM = np.zeros((size, size))
    # print(S)
    for i in range(len(S)):
        if S[i] < threshold:
            break
        projection = reshaped_activations @ VT[i, :]
        projection = projection.reshape(activations.shape[1:])
        projection = cv2.resize(projection, (size, size))
        CAM += S[i]*projection
    CAM = normalize_cam(CAM)
    CAM = json_ready_cam(CAM, original)
    return CAM
