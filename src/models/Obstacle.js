export default class Obstacle {
  constructor(x1, y1) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x1;
    this.y2 = y1;
  }

  setSize(x2, y2) {
    if (x2 < this.x1) {
      this.x2 = this.x1;
      this.x1 = x2;
    } else {
      this.x2 = x2;
    }
    if (y2 < this.y1) {
      this.y2 = this.y1;
      this.y1 = y2;
    } else {
      this.y2 = y2;
    }
  }

  isInside(x, y) {
    return this.x1 <= x && this.x2 >= x && this.y1 <= y && this.y2 >= y;
  }

  toJson() {
    return {
      x: this.x1,
      y: this.y2,
      width: this.x2 - this.x1,
      height: this.y2 - this.y1
    };
  }
}
