export default class Sensor {
  constructor() {
    this.time = 0;
    this.forward = -1;
    this.left = -1;
    this.right = -1;
  }

  toJson() {
    return {
      forward: this.forward,
      left: this.left,
      right: this.right
    };
  }

  sense(obstacles, coordenates, rotation) {
    this.time += 100;
    coordenates[0] += 40 * Math.cos(((-90 - rotation) * Math.PI) / 180);
    coordenates[1] += 80 * Math.sin(((-90 - rotation) * Math.PI) / 180);
    if (this.time == 100) {
      this.checkLeft(obstacles, coordenates, rotation);
    } else if (this.time == 1100) {
      this.checkForward(obstacles, coordenates, rotation);
    } else if (this.time == 2100) {
      this.checkRight(obstacles, coordenates, rotation);
    } else if (this.time == 3100) {
      this.checkForward(obstacles, coordenates, rotation);
    } else if (this.time > 4100) {
      this.time = 0;
    }
  }

  checkForward(obstacles, coordenates, rotation) {
    this.forward = 0;
    this.left = -1;
    this.right = -1;
    for (let i = 10; i <= 100; i += 10) {
      let x = coordenates[0] + i * Math.cos(((-90 - rotation) * Math.PI) / 180);
      let y = coordenates[1] + i * Math.sin(((-90 - rotation) * Math.PI) / 180);
      if (obstacles.anyInside(x, y)) {
        this.forward = i;
        return;
      }
    }
  }

  checkLeft(obstacles, coordenates, rotation) {
    this.forward = -1;
    this.left = 0;
    this.right = -1;
    for (let i = 10; i <= 100; i += 10) {
      let x =
        coordenates[0] + i * Math.cos(((-90 + 90 - rotation) * Math.PI) / 180);
      let y =
        coordenates[1] + i * Math.sin(((-90 + 90 - rotation) * Math.PI) / 180);
      if (obstacles.anyInside(x, y)) {
        this.left = i;
        return;
      }
    }
  }

  checkRight(obstacles, coordenates, rotation) {
    this.forward = -1;
    this.left = -1;
    this.right = 0;
    for (let i = 10; i <= 100; i += 10) {
      let x =
        coordenates[0] + i * Math.cos(((-90 - 90 - rotation) * Math.PI) / 180);
      let y =
        coordenates[1] + i * Math.sin(((-90 - 90 - rotation) * Math.PI) / 180);
      if (obstacles.anyInside(x, y)) {
        this.right = i;
        return;
      }
    }
  }
}
