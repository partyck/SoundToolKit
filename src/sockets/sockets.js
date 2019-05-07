const midi = require('midi');
const midiOut = new midi.output();
const socket = require('socket.io');

try {
  midiOut.openPort(0);
  console.log(midiOut.getPortCount());
} catch (error) {
  midiOut.openVirtualPort('');
}

function scale(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function toMidi(session, x, y, z) {
  let xmidi = scale(x, -9.81, 9.81, 0, 128);
  let ymidi = scale(y, -9.81, 9.81, 0, 128);
  if (session < 16) {
    let channelX = (parseInt(session) - 1) * 2 + 176;
    let channelY = channelX + 1;
    midiOut.sendMessage([channelX, 0, xmidi]);
    midiOut.sendMessage([channelY, 0, ymidi]);
  }
}

function toMidi2(x) {
  if (x > 9.81) {
    return 128;
  }
  if (x < -9.81) {
    return 0;
  }
  return scale(x, -9.81, 9.81, 0, 128);
}


module.exports = server => {
  let io = socket(server);

  let dotSocket = io.of('/')
    .on('connection', socket => {
      console.log("usuario conectado");
      
      socket.on('acc', data => {
        // io.sockets.emit('graphic', data);
        toMidi(data.session, data.x, data.y, data.z);
        // console.log('acc X: ',data.x, '; Y: ',data.y, '; Z: ',data.z);
      });

      socket.on('touch', data => {
        // io.sockets.emit('graphic', data);
        // toMidi(data.session, data.x, data.y, data.z);
        console.log('touch X: ',data.x, '; Y: ',data.y);
      });

    });
};