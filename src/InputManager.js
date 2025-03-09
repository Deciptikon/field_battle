export class InputManager {
  constructor() {
    this.mouse = { x: 0, y: 0 };
    this.active = false;
    this.leftDown = false;
    this.touchSupported = "ontouchstart" in window;

    if (this.touchSupported) {
      window.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        this.mouse.x = touch.clientX;
        this.mouse.y = touch.clientY;
        this.active = true;
        this.leftDown = true;
        //console.log("Касание началось");
      });

      window.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        if (this.leftDown) {
          this.mouse.x = touch.clientX;
          this.mouse.y = touch.clientY;
          this.active = true;
          //console.log(`${this.mouse.x}   ${this.mouse.y}`);
        }
      });

      window.addEventListener("touchend", () => {
        if (this.leftDown) {
          this.active = true;
          this.leftDown = false;
          console.log("Касание закончилось");
        }
      });
    } else {
      window.addEventListener("mousemove", (e) => {
        if (this.leftDown) {
          this.mouse.x = e.clientX;
          this.mouse.y = e.clientY;
          this.active = true;
          //console.log(`${this.mouse.x}   ${this.mouse.y}`);
        }
      });

      window.addEventListener("mousedown", (e) => {
        if (e.button === 0) {
          this.mouse.x = e.clientX;
          this.mouse.y = e.clientY;
          this.leftDown = true;
          this.active = true;
          //console.log("Нажатие");
        }
      });

      window.addEventListener("mouseup", (e) => {
        if (this.leftDown) {
          this.mouse.x = e.clientX;
          this.mouse.y = e.clientY;
          this.active = true;
          this.leftDown = false;
          //console.log(`Отпускание`);
        }
      });
    }
  }

  getActivity() {
    let active = this.active ? true : false;
    this.active = false;

    return active;
  }

  getTouch() {
    if (this.leftDown) {
      this.active = false;
      return this.mouse;
    } else {
      return null;
    }
  }
}

export const input = new InputManager();
