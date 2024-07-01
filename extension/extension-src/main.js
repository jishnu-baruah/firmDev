let port = null;

function appendMessage(text) {
  // const responseDiv = document.getElementById('response');
  // responseDiv.innerHTML += '<p>' + text + '</p>';
  // responseDiv.scrollTop = responseDiv.scrollHeight; // Scroll to the latest message
}

function updateUiState() {
  const isConnected = port !== null;
  document.getElementById('connect-button').style.display = isConnected ? 'none' : 'block';
  document.getElementById('list-ports-button').style.display = isConnected ? 'block' : 'none';
  document.getElementById('ports-list').style.display = isConnected ? 'block' : 'none';
  // document.getElementById('code-url').style.display = isConnected ? 'block' : 'none';
  document.getElementById('upload-button').style.display = isConnected ? 'block' : 'none';
  document.getElementById('compile-button').style.display = isConnected ? 'block' : 'none';
}

function sendNativeMessage(message) {
  port.postMessage(message);
}

function onNativeMessage(message) {
  appendMessage('Received message: <b>' + JSON.stringify(message) + '</b>');
  if (message.ports) {
    const portsList = document.getElementById('ports-list');
    portsList.innerHTML = '';
    message.ports.forEach(port => {
      const option = document.createElement('option');
      option.value = port;
      option.textContent = port;
      portsList.appendChild(option);
    });
  } else if (message.status === 'compile_finished') {
    appendMessage('Compile finished with return code: ' + message.returncode);
    appendMessage('Output: <pre>' + message.stdout + '</pre>');
    appendMessage('Error: <pre>' + message.stderr + '</pre>');
    appendMessage('Sketch directory: ' + message.sketch_dir);
  }
}

function onDisconnected() {
  appendMessage('Failed to connect: ' + chrome.runtime.lastError.message);
  port = null;
  updateUiState();
}

function connect() {
  const hostName = 'com.firmdev.uploaded_extension';
  appendMessage('Connecting to native messaging host <b>' + hostName + '</b>');
  port = chrome.runtime.connectNative(hostName);
  port.onMessage.addListener(onNativeMessage);
  port.onDisconnect.addListener(onDisconnected);
  updateUiState();
}

function listPorts() {
  sendNativeMessage({ command: 'list_ports' });
}

function uploadCode() {
  const selectedPort = document.getElementById('ports-list').value;
  // const codeUrl = document.getElementById('code-url').value;
  // sendNativeMessage({ command: 'upload_code', port: selectedPort, code_url: codeUrl });
}

function compileSketch() {
  sendNativeMessage({ command: 'compile_sketch' });
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('connect-button').addEventListener('click', connect);
  document.getElementById('list-ports-button').addEventListener('click', listPorts);
  document.getElementById('upload-button').addEventListener('click', uploadCode);
  document.getElementById('compile-button').addEventListener('click', compileSketch);
  updateUiState();
});
