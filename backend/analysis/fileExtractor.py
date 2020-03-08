
# from fastai.vision import *
# from fastai.metrics import error_rat
from pathlib import Path
# from glob2 import glob
from sklearn.metrics import confusion_matrix

import pandas as pd
import numpy as np
import random
import os
import zipfile as zf
import shutil
import re


# import seaborn as sns

class WasteClassifier(object):

    @staticmethod
    def extractFile():
        # need to feed it zipfile
        files = zf.ZipFile("dataset-resized.zip", 'r')
        files.extractall()
        files.close()

    # helper functions #

    # splits indices for a folder into train, validation, and test indices with random sampling
    # input: folder path
    # output: train, valid, and test indices

    @staticmethod
    def split_indices(folder):
        list1 = os.listdir(folder)
        n = len(list1)
        full_set = list(range(1, n + 1))

        # train indices
        random.seed(1)
        train = random.sample(list(range(1, n + 1)), int(.5 * n))

        # temp
        remain = list(set(full_set) - set(train))

        # separate remaining into validation and test
        random.seed(1)
        valid = random.sample(remain, int(.5 * len(remain)))
        test = list(set(remain) - set(valid))

        return train, valid, test

    # gets file names for a particular type of trash, given indices
    # input: waste category and indices
    # output: file names

    @staticmethod
    def get_names(waste_type, indices):
        file_names = [waste_type + str(i) + ".jpg" for i in indices]
        return file_names

        # moves group of source files to another folder

    # input: list of source files and destination folder
    # no output

    @staticmethod
    def move_files(source_files, destination_folder):
        for file in source_files:
            shutil.move(file, destination_folder)

    def makeFolder(self):
        # paths will be train/cardboard, train/glass, etc...
        subsets = ['train', 'valid', 'test']
        waste_types = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']

        # create destination folders for analysis subset and waste type
        for subset in subsets:
            for waste_type in waste_types:
                folder = os.path.join('data', subset, waste_type)
                if not os.path.exists(folder):
                    os.makedirs(folder)

        if not os.path.exists(os.path.join('data', 'test')):
            os.makedirs(os.path.join('data', 'test'))

        # move files to destination folders for each waste type
        for waste_type in waste_types:
            source_folder = os.path.join('dataset-resized', waste_type)
            train_ind, valid_ind, test_ind = self.split_indices(source_folder)

            # move source files to train
            train_names = self.get_names(waste_type, train_ind)
            train_source_files = [os.path.join(source_folder, name) for name in train_names]
            train_dest = "data/train/" + waste_type
            self.move_files(train_source_files, train_dest)

            # move source files to valid
            valid_names = self.get_names(waste_type, valid_ind)
            valid_source_files = [os.path.join(source_folder, name) for name in valid_names]
            valid_dest = "data/valid/" + waste_type
            self.move_files(valid_source_files, valid_dest)

            ## move source files to test
            test_names = self.get_names(waste_type, test_ind)
            test_source_files = [os.path.join(source_folder, name) for name in test_names]
            ## I use data/test here because the images can be mixed up
            self.move_files(test_source_files, "data/test")


if __name__ == "__main__":
    classifier = WasteClassifier()

    classifier.extractFile()
    path = Path(os.getcwd())/"data"
    print(os.listdir(os.path.join(os.getcwd(), "dataset-resized")))

    train, valid, test = classifier.split_indices("dataset-resized")

    classifier.makeFolder()

