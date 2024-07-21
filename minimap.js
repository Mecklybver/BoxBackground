export class Minimap {
  constructor() {
    this.cameraSquare = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
    this.playerSquare = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    }
    this.minimap = {
      img: document.getElementById("img"),
      x: 0,
      y: 0,
      width: img.width * 0.25,
      height: img.height * 0.2,
    };
  }

  draw(ctx, camera, player) {
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.drawImage(
      this.minimap.img,
      this.minimap.x,
      this.minimap.y,
      this.minimap.width,
      this.minimap.height
    );

    this.cameraSquare.width =
    (camera.width / camera.img.width) * this.minimap.width;
    this.cameraSquare.height =
    (camera.height / camera.img.height) * this.minimap.height;
    this.cameraSquare.x =
    this.minimap.x + (camera.x / camera.img.width) * this.minimap.width;
    this.cameraSquare.y =
    this.minimap.y + (camera.y / camera.img.height) * this.minimap.height;




    ctx.beginPath();
    ctx.rect(this.cameraSquare.x, this.cameraSquare.y, this.cameraSquare.width, this.cameraSquare.height);
    ctx.stroke();
    ctx.restore();
    ctx.beginPath();

    ctx.rect(this.playerSquare.x, this.playerSquare.y, this.playerSquare.width, this.playerSquare.height);
    ctx.stroke();}
}
