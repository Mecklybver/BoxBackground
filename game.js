import { Player } from "./player.js";
import { Minimap } from "./minimap.js";
import { Background } from "./background.js";

export class Game {
  constructor() {
    this.minimap = new Minimap();
    this.background = new Background();
    this.player = new Player(this.background);
    this.minimap = new Minimap();
  }

  draw(ctx, deltaTime) {
    // this.background.draw(ctx );
    this.background.draw(ctx );
    this.player.update(ctx, deltaTime);
    this.minimap.draw(ctx, this.background, this.player.playerSquare);
  }
}
