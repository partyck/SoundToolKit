let socket = io.connect();
let accOn = false;
let ax = 0;
let ay = 0;
let az = 0;

socket.on('graphic', function (data) {
  console.log('llega!', data);
  accOn = true;
  ax = data.x;
  ay = data.y;
  az = data.z;
});