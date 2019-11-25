import React from "react";
import ReactDOM from "react-dom";

import Sensor from "./Sensor.jsx";

export default function(props) {
  const agvStyle = {
    display: "inline-block",
    width: 30,
    height: 100,
    background: "black",
    borderRadius: "5px",
    position: "absolute",
    left: Math.floor(document.body.clientWidth / 2 + props.x - 30 / 2),
    top: Math.floor(document.body.clientHeight / 2 - props.y - 100 / 2),
    transform: `rotate(${props.rotation}deg)`
  };
  const rightWheelStyle = {
    display: "inline-block",
    width: 10,
    height: 30,
    background: "black",
    borderRadius: "5px",
    position: "absolute",
    bottom: 5,
    right: -10
  };
  const rightStyle = {
    display: "inline-block",
    width: 8,
    height: 8,
    background: "red",
    borderRadius: "100%",
    position: "absolute",
    top: -5,
    right: 5,
    opacity: props.stop ? 0.5 : 0
  };
  const leftWheelStyle = {
    display: "inline-block",
    width: 10,
    height: 30,
    background: "black",
    borderRadius: "5px",
    position: "absolute",
    bottom: 5,
    left: -10
  };
  const leftStyle = {
    display: "inline-block",
    width: 8,
    height: 8,
    background: "red",
    borderRadius: "100%",
    position: "absolute",
    top: -5,
    left: 5,
    opacity: props.stop ? 0.5 : 0
  };
  return (
    <div style={agvStyle}>
      <Sensor
        forward={props.sensor.forward}
        left={props.sensor.left}
        right={props.sensor.right}
      />
      <div style={leftWheelStyle}></div>
      <div style={leftStyle}></div>
      <div style={rightWheelStyle}></div>
      <div style={rightStyle}></div>
    </div>
  );
}
