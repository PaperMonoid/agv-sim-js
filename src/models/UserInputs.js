const inputs = { action: 0 };

function keyDown(event) {
  switch (event.keyCode) {
    case 37:
      inputs.action = 1;
      break;
    case 39:
      inputs.action = 2;
      break;
    case 38:
      inputs.action = 3;
      break;
    case 40:
      inputs.action = 4;
      break;
  }
}

function keyUp(event) {
  if (
    (event.keyCode == 37 && inputs.action == 1) ||
    (event.keyCode == 39 && inputs.action == 2) ||
    (event.keyCode == 38 && inputs.action == 3) ||
    (event.keyCode == 40 && inputs.action == 4)
  ) {
    inputs.action = 0;
  }
}

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

export default inputs;
