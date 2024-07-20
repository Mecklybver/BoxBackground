export class Player {
  constructor(background) {
    this.background = background;
    this.player = {
      img: document.getElementById("player"),
      width: 52,
      height: 73,
      x: 0,
      y: 0,
      SpriteX: 0,
      SpriteY: 0,
      MaxSpriteX: 2,
      MaxSpriteY: 3,
    };
    this.outerSquare = {
      width: innerWidth * 0.8,
      height: innerHeight * 0.8,
      x: innerWidth * 0.1,
      y: innerHeight * 0.1,
    };
    this.innerSquare = {
      x: 0,
      y: 0,
      width: 52,
      height: 72,
    };
    this.backgroundLimitX =
      document.querySelector("img").width - this.background.width;
    this.backgroundLimitY =
      document.querySelector("img").height - this.background.height;
    this.speed = 1;
    this.key = new Set();
    this.accumulator = 0;
    this.nextFrame = 100;
    this.moving = false;

    addEventListener("keydown", (e) => {
      this.key.add(e.key);
      this.updateMovementState();
    });

    addEventListener("keyup", (e) => {
      this.key.delete(e.key);
      this.updateMovementState();
    });
  }

  updateMovementState() {
    if (this.key.size > 0) {
      this.moving = true;
      if (this.key.has("ArrowUp")) {
        this.player.SpriteY = 3;
      } else if (this.key.has("ArrowDown")) {
        this.player.SpriteY = 0;
      } else if (this.key.has("ArrowLeft")) {
        this.player.SpriteY = 1;
      } else if (this.key.has("ArrowRight")) {
        this.player.SpriteY = 2;
      }
    } else {
      this.moving = false;
      this.player.MaxSpriteY = 0;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.rect(
      this.outerSquare.x,
      this.outerSquare.y,
      this.outerSquare.width,
      this.outerSquare.height
    );
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(
      this.outerSquare.x +
        this.outerSquare.width * 0.5 +
        this.innerSquare.x -
        this.innerSquare.width * 0.5,
      this.outerSquare.y +
        this.outerSquare.height * 0.5 +
        this.innerSquare.y -
        this.innerSquare.height * 0.5,
      this.innerSquare.width,
      this.innerSquare.height
    );
    ctx.fill();
    ctx.drawImage(
      this.player.img,
      this.player.x + this.player.SpriteX * this.player.width,
      this.player.y + this.player.SpriteY * this.player.height,
      this.player.width,
      this.player.height,
      this.outerSquare.x +
        this.outerSquare.width * 0.5 +
        this.innerSquare.x -
        this.innerSquare.width * 0.5,
      this.outerSquare.y +
        this.outerSquare.height * 0.5 +
        this.innerSquare.y -
        this.innerSquare.height * 0.5,
      this.player.width,
      this.player.height
    );
  }

  update(ctx, deltaTime) {
    if (this.accumulator > this.nextFrame && this.moving) {
      this.accumulator = 0;
      if (this.player.SpriteX < this.player.MaxSpriteX) {
        this.player.SpriteX++;
      } else {
        this.player.SpriteX = 0;
        this.accumulator = 0;
      }
    } else {
      this.accumulator += deltaTime;
    }

    if (this.key.has("ArrowRight")) {
      if (
        this.outerSquare.x < window.innerWidth - this.outerSquare.width &&
        this.innerSquare.x > 0
      ) {
        this.outerSquare.x += this.speed;
      } else if (
        this.background.x < this.backgroundLimitX &&
        this.innerSquare.x > 0
      ) {
        this.background.x += this.speed * 0.5;
      } else if (
        this.innerSquare.x <
        this.outerSquare.width * 0.5 - this.innerSquare.width * 0.5
      ) {
        this.innerSquare.x += this.speed;
      }
    }

    if (this.key.has("ArrowLeft")) {
      if (this.outerSquare.x > 0 && this.innerSquare.x < 0) {
        this.outerSquare.x -= this.speed;
      } else if (
        this.background.x - this.speed >= 0 &&
        this.innerSquare.x < 0
      ) {
        this.background.x -= this.speed * 0.5;
      } else if (
        this.innerSquare.x >
        -this.outerSquare.width * 0.5 + this.innerSquare.width * 0.5
      ) {
        this.innerSquare.x -= this.speed;
      }
    }

    if (this.key.has("ArrowUp")) {
      if (this.outerSquare.y > 0 && this.innerSquare.y < 0) {
        this.outerSquare.y -= this.speed;
      } else if (
        this.background.y - this.speed >= 0 &&
        this.innerSquare.y < 0
      ) {
        this.background.y -= this.speed;
      } else if (
        this.innerSquare.y >
        -this.outerSquare.height * 0.5 + this.innerSquare.height * 0.5
      ) {
        this.innerSquare.y -= this.speed;
      }
    }

    if (this.key.has("ArrowDown")) {
      if (
        this.outerSquare.y < window.innerHeight - this.outerSquare.height &&
        this.innerSquare.y > 0
      ) {
        this.outerSquare.y += this.speed;
      } else if (
        this.background.y < this.backgroundLimitY - this.speed &&
        this.innerSquare.y > 0
      ) {
        this.background.y += this.speed;
      } else if (
        this.innerSquare.y <
        this.outerSquare.height * 0.5 -
          this.innerSquare.height * 0.5 -
          this.speed
      ) {
        this.innerSquare.y += this.speed;
      }
    }

    this.draw(ctx);
  }
}
