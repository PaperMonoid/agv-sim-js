import React from "react";
import ReactDOM from "react-dom";

export default function(props) {
  const inputsStyle = {
    display: "inline-block",
    fontSize: "1.5em",
    color: "#333333",
    position: "absolute",
    right: 5,
    top: 5
  };
  return (
    <div style={inputsStyle}>
      <div>INPUT: {props.inputs.action}</div>
    </div>
  );
}
