import { Player } from "./player.js";

export class Background {
  constructor() {
    this.background = {
      img: document.querySelector("img"),
      width: img.width * 0.25,
      height: img.height * 0.4,
      x: 720,
      y: 480,
    };

    this.player = new Player(this.background);



  }

  draw(ctx, deltaTime) {
    ctx.drawImage(
      this.background.img,
      this.background.x,
      this.background.y,
      this.background.width,
      this.background.height,
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );

    this.player.update(ctx, deltaTime);

  }
}
