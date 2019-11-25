import React from "react";
import ReactDOM from "react-dom";

import Sensor from "./Sensor.jsx";

export default function(props) {
  const sensorStyle = {
    position: "absolute",
    left: 20,
    top: 80
  };
  const forwardStyle = {
    display: "inline-block",
    width: 10,
    height: 100,
    background: props.forward > 0 ? "red" : "black",
    position: "absolute",
    right: 0,
    top: 0,
    opacity: props.forward < 0 ? 0 : 0.5,
    transform: "rotate(0deg)"
  };
  const rightStyle = {
    display: "inline-block",
    width: 10,
    height: 100,
    background: props.right > 0 ? "red" : "black",
    position: "absolute",
    right: 40,
    top: -40,
    opacity: props.right < 0 ? 0 : 0.5,
    transform: "rotate(90deg)"
  };
  const leftStyle = {
    display: "inline-block",
    width: 10,
    height: 100,
    background: props.left > 0 ? "red" : "black",
    position: "absolute",
    left: 40,
    top: -40,
    opacity: props.left < 0 ? 0 : 0.5,
    transform: "rotate(-90deg)"
  };
  return (
    <div style={sensorStyle}>
      <div style={forwardStyle}></div>
      <div style={leftStyle}></div>
      <div style={rightStyle}></div>
    </div>
  );
}
