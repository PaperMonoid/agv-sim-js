import React from "react";
import ReactDOM from "react-dom";

import Simulator from "../models/Simulator.js";
import Inputs from "./Inputs.jsx";
import Agv from "./Agv.jsx";
import Obstacle from "./Obstacle.jsx";

export default class AgvSim extends React.Component {
  constructor(props) {
    super(props);

    this.simulator = new Simulator(this.onUpdate.bind(this));

    this.state = {
      auto: false,
      training: false,
      inputs: { action: 0 },
      agv: {
        x: 0,
        y: 0,
        rotation: 0,
        stop: false,
        sensor: { forward: 0, left: 0, right: 0 }
      },
      obstacles: []
    };
  }

  onUpdate(auto, training, inputs, agv, obstacles) {
    this.setState({ auto, training, inputs, agv, obstacles });
  }

  toggleTraining() {
    this.simulator.toggleTraining();
  }

  toggleAuto() {
    this.simulator.toggleAuto();
  }

  render() {
    const trainingStyle = {
      position: "absolute",
      bottom: 45,
      right: 15,
      filter: `brightness(${this.state.training ? 1.3 : 1})`
    };

    const autoStyle = {
      position: "absolute",
      bottom: 15,
      right: 15,
      filter: `brightness(${this.state.auto ? 1.3 : 1})`
    };

    return (
      <div>
        <Inputs inputs={this.state.inputs} />
        {this.state.obstacles.map((obstacle, index) => (
          <Obstacle
            key={index}
            x={obstacle.x}
            y={obstacle.y}
            width={obstacle.width}
            height={obstacle.height}
          />
        ))}
        <Agv
          x={this.state.agv.x}
          y={this.state.agv.y}
          rotation={this.state.agv.rotation}
          stop={this.state.agv.stop}
          sensor={this.state.agv.sensor}
        />
        <button onClick={this.toggleTraining.bind(this)} style={trainingStyle}>
          Training
        </button>
        <button onClick={this.toggleAuto.bind(this)} style={autoStyle}>
          Auto
        </button>
      </div>
    );
  }
}
