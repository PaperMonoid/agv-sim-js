import React from "react";
import ReactDOM from "react-dom";

export default function(props) {
  const obstacleStyle = {
    display: "inline-block",
    background: "red",
    position: "absolute",
    left: Math.floor(document.body.clientWidth / 2 + props.x),
    top: Math.floor(document.body.clientHeight / 2 - props.y),
    width: props.width,
    height: props.height,
    opacity: 0.5
  };
  return <div style={obstacleStyle}></div>;
}
