export class Background {
  constructor() {
    this.img = document.querySelector("img");
    this.width = this.img.width * 0.35;
    this.height = this.img.height * 0.4;
    this.x = 390;
      this.y = 480;

      addEventListener("resize", () => {
        this.width = this.img.width * 0.35;
        this.height = this.img.height * 0.4;
      });
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height,
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );
    }

}
