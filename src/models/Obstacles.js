import Obstacle from "./Obstacle.js";

export default class Obstacles {
  constructor() {
    this.obstacles = new Set();
    this.obstaclesJsons = [];
    this.obstacle = null;

    document.addEventListener(
      "mousedown",
      function(event) {
        event.preventDefault();
        const x = event.clientX - document.body.clientWidth / 2;
        const y = document.body.clientHeight / 2 - event.clientY;
        if (event.buttons == 1) {
          this.obstacle = new Obstacle(x, y);
        } else if (event.buttons == 2) {
          for (let obstacle of this.obstacles) {
            if (obstacle.isInside(x, y)) {
              this.obstacles.delete(obstacle);
              this.updateJson();
              return;
            }
          }
        }
      }.bind(this)
    );

    document.addEventListener(
      "mouseup",
      function(event) {
        event.preventDefault();
        if (this.obstacle != null) {
          const x = event.clientX - document.body.clientWidth / 2;
          const y = document.body.clientHeight / 2 - event.clientY;
          this.obstacle.setSize(x, y);
          this.obstacles.add(this.obstacle);
          this.obstacle = null;
          this.updateJson();
        }
      }.bind(this)
    );
  }

  updateJson() {
    this.obstaclesJsons = Array.from(this.obstacles).map(obstacle =>
      obstacle.toJson()
    );
  }

  toJson() {
    return this.obstaclesJsons;
  }

  anyInside(x, y) {
    for (let obstacle of this.obstacles) {
      if (obstacle.isInside(x, y)) {
        return true;
      }
    }
    return false;
  }
}
