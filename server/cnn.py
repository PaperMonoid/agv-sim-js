from keras.models import Sequential
from keras.layers import Conv1D, MaxPooling1D, Flatten, Dense, Activation
import numpy as np

import csv
import random

# create model with 32 samples of 6 features and output of 16
model = Sequential()

model.add(Conv1D(kernel_size=4, filters=4, input_shape=(16, 6)))
model.add(Activation("relu"))

model.add(Conv1D(kernel_size=4, filters=4))
model.add(Activation("relu"))

model.add(MaxPooling1D(pool_size=4))
model.add(Activation("relu"))

model.add(Flatten())

model.add(Dense(5))
model.add(Activation("sigmoid"))

model.summary()

# use loss function for multiple classes
model.compile(
    optimizer="rmsprop", loss="categorical_crossentropy", metrics=["accuracy"]
)

# read dataset
data = []
data_classes = []

with open("training_data/data.csv", "r") as csv_data:
    csv_reader = csv.reader(csv_data, delimiter=",")
    batch = []
    for sample in csv_reader:
        if len(sample) == 11:
            batch.append(sample)
            if len(batch) == 16:
                data.append(batch)
                batch = []


random.shuffle(data)
half = int(len(data) * 0.5)

train_data = []
train_labels = []

for sample in data[:half]:
    sample_data = [x[5:] for x in sample]
    sample_label = sample[-1][:5]
    train_data.append(sample_data)
    train_labels.append(sample_label)

test_data = []
test_labels = []

for sample in data[half:]:
    sample_data = [x[5:] for x in sample]
    sample_label = sample[-1][:5]
    test_data.append(sample_data)
    test_labels.append(sample_label)

# train model
BATCH_SIZE = 32
for i in range(int(len(train_data) / BATCH_SIZE)):
    batch_size = BATCH_SIZE
    lower = i
    upper = i + batch_size
    if len(train_data) - 1 < upper:
        upper = len(train_data) - 1
        batch_size = len(train_data) - 1 - i
    batch_data = np.array(train_data[lower:upper])
    batch_labels = np.array(train_labels[lower:upper])
    model.fit(batch_data, batch_labels, epochs=1000, batch_size=batch_size)


print("Evaluating model...")

# evaluate model
BATCH_SIZE = 32
for i in range(int(len(test_data) / BATCH_SIZE)):
    batch_size = BATCH_SIZE
    lower = i
    upper = i + batch_size
    if len(test_data) - 1 < upper:
        upper = len(test_data) - 1
        batch_size = len(test_data) - 1 - i
    batch_data = np.array(test_data[lower:upper])
    batch_labels = np.array(test_labels[lower:upper])
    loss, accuracy = model.evaluate(batch_data, batch_labels, batch_size=batch_size)
    print("loss: {0} - accuracy: {1}".format(loss, accuracy))
