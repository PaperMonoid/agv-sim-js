let uri = "ws://127.0.0.1:1069";
let websocket = new WebSocket(uri);

let available = false;
let data = "";
let inputs = { action: 0 };

websocket.onopen = function(event) {
  available = true;
};

websocket.onclose = function(event) {
  available = false;
};

websocket.onmessage = function(event) {
  data = event.data;
};

websocket.onerror = function(event) {};

function send(data) {
  if (available) {
    websocket.send(data);
  }
}

function recv() {
  if (available) {
    if (data[0] == "E") {
      inputs.action = data.slice(1)[0] | 0;
    }
  }
}

export { inputs, send, recv };
