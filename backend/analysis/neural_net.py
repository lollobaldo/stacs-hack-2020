from time import time

from fastai.vision import *
from fastai.metrics import error_rate

import cv2

from pathlib import Path

tfms = get_transforms(do_flip=True, flip_vert=True)


class NN:
    def __init__(self):
        # Load data
        self.data = ImageDataBunch.from_folder("data", test="test", ds_tfms=tfms, bs=16)
        # Load model
        model = cnn_learner(self.data, models.resnet34, metrics=error_rate)
        model.model_dir = Path("")
        self.model = model.load("trained_model")

    def load_image(self, path):
        return open_image(path)

    def transform(self, path):
        image = cv2.imread(path)

        mask = cv2.inRange(image, (50, 50, 50), (255, 255, 255))
        kernel = np.ones((5, 5), np.uint8)
        mask = cv2.dilate(mask, kernel, iterations=3)

        x = image.shape[0]
        y = image.shape[1]

        new_image = np.zeros((x, y, 3), np.uint8)

        for i in range(x):
            for j in range(y):
                if mask[i][j] == 255:
                    new_image[i][j] = image[i][j]
                else:
                    new_image[i][j] = 255

        return new_image


if __name__ == "__main__":
    nn = NN()
    for path in os.listdir('data/Stacs')[:20]:
        t = time()
        print(path)
        full_path = 'data/Stacs/' + path

        print("Loading image")

        print("Predicting")

        print(nn.model.predict(nn.load_image(full_path)))
        print(time() - t)

    #
