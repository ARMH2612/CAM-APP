import torch
import torch.nn as nn
from torch.nn import functional as F


class CNN_MNIST(nn.Module):
    def __init__(self):
        super().__init__()
        # 28 - 3 + 2 + 1 = 28
        self.conv1 = nn.Conv2d(
            in_channels=1, out_channels=8, kernel_size=3, padding=1)
        # 28 - 2 + 1 = 27
        self.pooling1 = nn.MaxPool2d(kernel_size=2)
        # 27 - 3 + 2 + 1 = 27
        self.conv2 = nn.Conv2d(
            in_channels=8, out_channels=16, kernel_size=3, padding=1)
        #
        self.pooling2 = nn.MaxPool2d(kernel_size=2)
        # it was supposed to be 16 * 26 * 26, idk why didnt work
        self.fc = nn.Linear(16*7*7, 10)

    def forward(self, x):
        x = nn.functional.relu(self.conv1(x))
        x = self.pooling1(x)
        x = nn.functional.relu(self.conv2(x))
        x = self.pooling2(x)
        x = x.view((-1, 16*7*7))

        return nn.functional.softmax(self.fc(x))


class CNN_CIFAR(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(
            in_channels=3, out_channels=32, kernel_size=3, padding=1)
        self.pooling1 = nn.MaxPool2d(kernel_size=2)
        self.conv2 = nn.Conv2d(
            in_channels=32, out_channels=64, kernel_size=3, padding=1)
        self.pooling2 = nn.MaxPool2d(kernel_size=2)
        self.conv3 = nn.Conv2d(
            in_channels=64, out_channels=128, kernel_size=3, padding=1)
        self.pooling3 = nn.MaxPool2d(kernel_size=2)
        self.fc = nn.Linear(128*4*4, 10)

    def forward(self, x):
        x = nn.functional.relu(self.conv1(x))
        x = self.pooling1(x)
        x = nn.functional.relu(self.conv2(x))
        x = self.pooling2(x)
        x = nn.functional.relu(self.conv3(x))
        x = self.pooling3(x)
        # print(x.shape)
        x = x.view((-1, 128*4*4))

        return nn.functional.softmax(self.fc(x))


class CNN_SVHN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(
            in_channels=3, out_channels=32, kernel_size=3, padding=1)
        self.pooling1 = nn.MaxPool2d(kernel_size=2)
        self.conv2 = nn.Conv2d(
            in_channels=32, out_channels=64, kernel_size=3, padding=1)
        self.pooling2 = nn.MaxPool2d(kernel_size=2)
        self.conv3 = nn.Conv2d(
            in_channels=64, out_channels=128, kernel_size=3, padding=1)
        self.pooling3 = nn.MaxPool2d(kernel_size=2)
        self.fc = nn.Linear(128*4*4, 10)

    def forward(self, x):
        x = nn.functional.relu(self.conv1(x))
        x = self.pooling1(x)
        x = nn.functional.relu(self.conv2(x))
        x = self.pooling2(x)
        x = nn.functional.relu(self.conv3(x))
        x = self.pooling3(x)
        # print(x.shape)
        x = x.view((-1, 128*4*4))

        return nn.functional.softmax(self.fc(x))
