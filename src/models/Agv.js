import Sensor from "./Sensor.js";

export default class Agv {
  constructor() {
    this.rotation = 0;
    this.angularSpeed = 0;
    this.angularAcceleration = 8;
    this.angularAccelerationDirection = 0;

    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.acceleration = 8;

    this.stop = true;

    this.sensor = new Sensor();
  }

  toJson() {
    return {
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      stop: this.stop,
      sensor: this.sensor.toJson()
    };
  }

  accelerate() {
    this.stop = false;
    this.speed += this.acceleration;
    if (this.speed > 32) {
      this.speed = 32;
    }
    this.rotation += 1.1;
  }

  deaccelerate() {
    this.stop = true;
    this.speed -= this.acceleration;
    if (this.speed < 0) {
      this.speed = 0;
    }
  }

  move() {
    this.rotation += this.angularSpeed;
    this.x += this.speed * Math.cos(((-90 - this.rotation) * Math.PI) / 180);
    this.y += this.speed * Math.sin(((-90 - this.rotation) * Math.PI) / 180);
  }

  sense(obstacles) {
    this.sensor.sense(obstacles, [this.x, this.y], this.rotation);
  }

  left() {
    this.stop = false;
    this.angularSpeed -= this.angularAcceleration;
    if (this.angularSpeed < -32) {
      this.angularSpeed = -32;
    }
  }

  right() {
    this.stop = false;
    this.angularSpeed += this.angularAcceleration;
    if (this.angularSpeed > 32) {
      this.angularSpeed = 32;
    }
  }

  deaccelerateRotation() {
    if (this.angularSpeed > 0) {
      this.left();
    } else if (this.angularSpeed < 0) {
      this.right();
    }
  }
}
