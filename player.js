export class Player {
  constructor(background) {
    this.background = background;
    // this.ctx = document.createElement("canvas").getContext("2d");
    // this.ctx.canvas.width = innerWidth;
    // this.ctx.canvas.height = innerHeight;
    // this.ctx.globalAlpha = 0.6;
    // this.ctx.canvas.id = "player";
    // document.body.appendChild(this.ctx.canvas);
    // this.trace = false;

    this.player = {
      img: document.getElementById("player"),
      width: 52,
      height: 73,
      x: 0,
      y: 0,
      alpha: 1,
      SpriteX: 0,
      SpriteY: 0,
      MaxSpriteX: 2,
      MaxSpriteY: 3,
    };
    this.cameraSquare = {
      width: innerWidth * 0.8,
      height: innerHeight * 0.8,
      x: innerWidth * 0.1,
      y: innerHeight * 0.1,
    };
    this.playerSquare = {
      x: 0,
      y: 0,
      width: 52,
      height: 72,
    };
    this.backgroundLimitX =
      document.querySelector("img").width - this.background.width;
    this.backgroundLimitY =
      document.querySelector("img").height - this.background.height;
    this.speed = 13;
    this.key = new Set();
    this.frameAccumulator = 0;
    this.nextFrame = 100;
    this.moving = false;
    this.hurtAccumulator = 0;
    this.hurt = false;
    this.hurtBlink = false;

    this.displacementX = 0;
    this.displacementY = 0;
    this.displacementStep = 6;
    this.up = false;

    addEventListener("keydown", (e) => {
      this.key.add(e.key);
      this.updateMovementState();
    });

    addEventListener("keyup", (e) => {
      this.key.delete(e.key);
      this.updateMovementState();
      this.up = false;
      this.displacementX = 0;
      this.displacementY = 0;
    });

    addEventListener("resize", () => {
      this.cameraSquare.width = innerWidth * 0.8;
      this.cameraSquare.height = innerHeight * 0.8;
      this.cameraSquare.x = innerWidth * 0.1;
      this.cameraSquare.y = innerHeight * 0.1;

      this.backgroundLimitX =
        document.querySelector("img").width - this.background.width;
      this.backgroundLimitY =
        document.querySelector("img").height - this.background.height;
    });
  }

  updateMovementState() {
    if (this.key.size > 0) {
      this.moving = true;
      if (this.key.has("ArrowUp")) {
        this.player.SpriteY = 4;
        this.player.SpriteY = 3;
        this.up = true;
        this.displacementY = this.displacementStep;
      } else if (this.key.has("ArrowDown")) {
        this.player.SpriteY = 0;
        this.displacementY = -this.displacementStep;
      } else if (this.key.has("ArrowLeft")) {
        this.player.SpriteY = 1;
        this.displacementX = this.displacementStep;
      } else if (this.key.has("ArrowRight")) {
        this.player.SpriteY = 2;
        this.displacementX = -this.displacementStep;
      } else if (this.key.has("p")) {
        this.trace = !this.trace;
      } else if (this.key.has("o")) {
        this.hurt = !this.hurt;
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
      this.cameraSquare.x,
      this.cameraSquare.y,
      this.cameraSquare.width,
      this.cameraSquare.height
    );
    // ctx.stroke();
    ctx.beginPath();
    ctx.rect(
      this.cameraSquare.x +
        this.cameraSquare.width * 0.5 +
        this.playerSquare.x -
        this.playerSquare.width * 0.5,
      this.cameraSquare.y +
        this.cameraSquare.height * 0.5 +
        this.playerSquare.y -
        this.playerSquare.height * 0.5,
      this.playerSquare.width,
      this.playerSquare.height
    );
    // ctx.fill();

    if (this.trace) {
      ctx.save();
      for (let i = 0; i < 10; i++) {
        ctx.globalAlpha = 1 - i * 0.1;
        ctx.drawImage(
          this.player.img,
          this.player.x + this.player.SpriteX * this.player.width,
          this.player.y + this.player.SpriteY * this.player.height,
          this.player.width,
          this.player.height,
          this.displacementX +
            this.cameraSquare.x +
            this.cameraSquare.width * 0.5 +
            this.playerSquare.x -
            this.playerSquare.width * 0.5 +
            i * this.displacementX,
          this.displacementY +
            this.cameraSquare.y +
            this.cameraSquare.height * 0.5 +
            this.playerSquare.y -
            this.playerSquare.height * 0.5 +
            i * this.displacementY,
          this.player.width,
          this.player.height
        );
      }
      ctx.restore();
    }

    ctx.globalAlpha = this.hurt && this.hurtBlink ? 0.5 : 1;
    ctx.drawImage(
      this.player.img,
      this.player.x + this.player.SpriteX * this.player.width,
      this.player.y + this.player.SpriteY * this.player.height,
      this.player.width,
      this.player.height,
      this.cameraSquare.x +
        this.cameraSquare.width * 0.5 +
        this.playerSquare.x -
        this.playerSquare.width * 0.5,
      this.cameraSquare.y +
        this.cameraSquare.height * 0.5 +
        this.playerSquare.y -
        this.playerSquare.height * 0.5,
      this.player.width,
      this.player.height
    );
    ctx.globalAlpha = 1; // Reset alpha
  }

  update(ctx, deltaTime) {
    if (this.frameAccumulator > this.nextFrame && this.moving) {
      this.frameAccumulator = 0;
      if (this.player.SpriteX < this.player.MaxSpriteX) {
        this.player.SpriteX++;
      } else {
        this.player.SpriteX = 0;
        this.frameAccumulator = 0;
      }
    } else {
      this.frameAccumulator += deltaTime;
    }

    if (this.key.has("ArrowRight")) {
      if (
        this.cameraSquare.x < window.innerWidth - this.cameraSquare.width &&
        this.playerSquare.x > 0
      ) {
        this.cameraSquare.x += this.speed;
      } else if (
        this.background.x + this.speed < this.backgroundLimitX &&
        this.playerSquare.x > 0
      ) {
        this.background.x += this.speed * 0.5;
      } else if (
        this.playerSquare.x <
        this.cameraSquare.width * 0.5 - this.playerSquare.width * 0.5
      ) {
        this.playerSquare.x += this.speed;
      }
    }

    if (this.key.has("ArrowLeft")) {
      if (this.cameraSquare.x > 0 && this.playerSquare.x < 0) {
        this.cameraSquare.x -= this.speed;
      } else if (
        this.background.x - this.speed >= 0 &&
        this.playerSquare.x < 0
      ) {
        this.background.x -= this.speed * 0.5;
      } else if (
        this.playerSquare.x >
        -this.cameraSquare.width * 0.5 + this.playerSquare.width * 0.5
      ) {
        this.playerSquare.x -= this.speed;
      }
    }

    if (this.key.has("ArrowUp")) {
      if (this.cameraSquare.y > 0 && this.playerSquare.y < 0) {
        this.cameraSquare.y -= this.speed;
      } else if (
        this.background.y - this.speed >= 0 &&
        this.playerSquare.y < 0
      ) {
        this.background.y -= this.speed;
      } else if (
        this.playerSquare.y >
        -this.cameraSquare.height * 0.5 + this.playerSquare.height * 0.5
      ) {
        this.playerSquare.y -= this.speed;
      }
    }

    if (this.key.has("ArrowDown")) {
      if (
        this.cameraSquare.y < window.innerHeight - this.cameraSquare.height &&
        this.playerSquare.y > 0
      ) {
        this.cameraSquare.y += this.speed;
      } else if (
        this.background.y < this.backgroundLimitY - this.speed &&
        this.playerSquare.y > 0
      ) {
        this.background.y += this.speed;
      } else if (
        this.playerSquare.y <
        this.cameraSquare.height * 0.5 -
          this.playerSquare.height * 0.5 -
          this.speed
      ) {
        this.playerSquare.y += this.speed;
      }
    }

    if (this.hurt) {
      this.hurtAccumulator += deltaTime;
      this.hurtAccumulator %= 1000;
      this.hurtBlink = this.hurtAccumulator < 500;
    }

    this.draw(ctx);
  }
}
