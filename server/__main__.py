import asyncio
import websockets
import uuid

import cnn
import numpy as np

# https://websockets.readthedocs.io/en/stable/intro.html#installation
async def main(websocket, path):
    i = 0
    filename = "training_data/{0}.csv".format(uuid.uuid4())
    training_data = open(filename, "a")
    while True:
        data = await websocket.recv()
        if data[0] is "E":
            data = data[1:]
            data = [sample.split(",") for sample in data.split()]
            data = [[int(feature) for feature in sample] for sample in data]
            data = np.array([data])
            prediction = cnn.model.predict(data)[0].argmax(axis=-1)
            await websocket.send("E{0}".format(prediction))
        if data[0] is "T":
            i += 1
            data = data[1:]
            if i <= 512:
                cnn.model
                training_data.write(data)
                training_data.write("\n")
            else:
                i = 0
                training_data.close()
                print("WROTE {0}!".format(filename))
                filename = "training_data/{0}.csv".format(uuid.uuid4())
                training_data = open(filename, "a")
                training_data.write(data)
                training_data.write("\n")


start_server = websockets.serve(main, "localhost", 1069)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
