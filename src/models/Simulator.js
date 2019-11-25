import user_inputs from "./UserInputs.js";
import Agv from "./Agv.js";
import Obstacles from "./Obstacles.js";
import { inputs, send, recv } from "./Socket.js";

export default class Simulator {
  constructor(onUpdate) {
    this.inputs = user_inputs;
    this.mode = 0;
    this.obstacles = new Obstacles();
    this.agv = new Agv();

    this.history = [];

    setInterval(
      function() {
        this.registerSample();
        if (this.mode == 0) {
          this.inputs = user_inputs;
        } else if (this.mode == 1) {
          this.inputs = user_inputs;
          this.sendTraining();
        } else if (this.mode == 2) {
          recv();
          this.inputs = inputs;
          this.sendAuto();
        }
        this.update();
        onUpdate(
          this.isAuto(),
          this.isTraining(),
          { action: this.inputs.action },
          this.agv.toJson(),
          this.obstacles.toJson()
        );
      }.bind(this),
      100
    );
  }

  registerSample() {
    let actions = [0, 0, 0, 0, 0];
    actions[this.inputs.action] = 1;
    let active = [
      (this.agv.sensor.forward >= 0) | 0,
      (this.agv.sensor.left >= 0) | 0,
      (this.agv.sensor.right >= 0) | 0
    ];
    let readings = [
      (this.agv.sensor.forward > 0) | 0,
      (this.agv.sensor.left > 0) | 0,
      (this.agv.sensor.right > 0) | 0
    ];
    this.history.push(
      actions
        .concat(active)
        .concat(readings)
        .join()
    );
    this.history = this.history.slice(-16);
  }

  sendTraining() {
    if (this.history.length > 0) {
      send("T" + this.history.slice(-1)[0]);
    }
  }

  sendAuto() {
    if (this.history.length == 16) {
      send(
        "E" +
          this.history
            .map(sample =>
              sample
                .split(",")
                .slice(5)
                .join()
            )
            .join("\n")
      );
    }
  }

  isTraining() {
    return this.mode == 1;
  }

  toggleTraining() {
    if (this.mode == 1) {
      this.mode = 0;
    } else {
      this.mode = 1;
    }
  }

  isAuto() {
    return this.mode == 2;
  }

  toggleAuto() {
    if (this.mode == 2) {
      this.mode = 0;
    } else {
      this.mode = 2;
    }
  }

  update() {
    if (this.inputs.action == 3) {
      this.agv.deaccelerateRotation();
      this.agv.accelerate();
    } else {
      this.agv.deaccelerate();
      if (this.inputs.action == 1) {
        this.agv.left();
      } else if (this.inputs.action == 2) {
        this.agv.right();
      } else {
        this.agv.deaccelerateRotation();
      }
    }
    this.agv.move();
    this.agv.sense(this.obstacles);
  }
}
