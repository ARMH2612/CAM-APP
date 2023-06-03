import numpy as np
from PIL import Image
import cv2
import datetime
from io import BytesIO
import base64


def normalize_cam(cam):
    return (cam - cam.min())/(cam.max() - cam.min())


def overlay_image_to_base64(image):
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')


def json_ready_cam_for_tensor(cam, image):
    cam_array = (cam.detach().numpy() * 255).astype(np.uint8)
    image = Image.open(image)
    image_cv = np.array(image.convert('RGB'))
    heatmap = cv2.applyColorMap(cam_array, cv2.COLORMAP_JET)
    overlay = cv2.addWeighted(image_cv, 0.5, heatmap, 0.5, 0)
    overlay_image = Image.fromarray(overlay)

    image_data = overlay_image_to_base64(overlay_image)
    return image_data


def json_ready_cam(cam, image):
    cam_array = (cam * 255).astype(np.uint8)
    image = Image.open(image)
    image_cv = np.array(image.convert('RGB'))
    heatmap = cv2.applyColorMap(cam_array, cv2.COLORMAP_JET)
    overlay = cv2.addWeighted(image_cv, 0.5, heatmap, 0.5, 0)
    overlay_image = Image.fromarray(overlay)

    image_data = overlay_image_to_base64(overlay_image)
    return image_data
