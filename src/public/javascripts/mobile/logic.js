class Logic {

  constructor() {
    this.accX = 0;
    this.accY = 0;
    this.accZ = 0;
    this.session = document.getElementById("session").textContent;
    this.socket = io.connect();
    this.accSuport = (window.DeviceMotionEvent ? true : false);
  }

  sendData() {
    this.socket.emit('acc', {
      session: this.session,
      x: this.accX,
      y: this.accY,
      z: this.accZ
    });
  }

  sendtouch() {
    let perX = map(winMouseX, 0, width, 0, 100);
    let perY = map(winMouseY, 0, height, 0, 100);
    this.socket.emit('touch', {
      session: session,
      x: perX,
      y: perY
    });
  }

  listenAcc() {
    window.addEventListener('devicemotion', ev => {
      var acc = ev.accelerationIncludingGravity;
      // let aX = Math.round(acc.x);
      // let aY = Math.round(acc.y);
      // let aZ = Math.round(acc.z);
      let aX = Math.round(acc.x * 100) / 100;
      let aY = Math.round(acc.y * 100) / 100;
      let aZ = Math.round(acc.z * 100) / 100;
      if (logic.accX !== aX) {
        logic.accX = aX;
      }
      if (logic.accY !== aY) {
        logic.accY = aY;
      }
      if (logic.accZ !== aZ) {
        logic.accZ = aZ;
      }
    }, false);
  }

}