import { Player } from "./player.js";
import { Minimap } from "./minimap.js";

export class Game {
  constructor() {
    this.minimap = new Minimap();
    this.background = {
      img: document.querySelector("img"),
      width: img.width * 0.35,
      height: img.height * 0.4,
      x: 390,
      y: 480,
    };

    this.player = new Player(this.background);
    this.minimap = new Minimap();



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

    this.minimap.draw(ctx, this.background, this.player.playerSquare);
    this.player.update(ctx, deltaTime);

  }
}
