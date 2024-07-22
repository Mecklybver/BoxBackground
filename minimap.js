export class Minimap {
  constructor() {
    this.scale = {
      y: 0.2,
      x: 0.25,
    }
    this.cameraSquare = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
    this.playerSquare = {
      width: 5 ,
      height: 5 ,
      x: this.cameraSquare.width * 0.5  ,
      y: this.cameraSquare.height * 0.5 ,
    }
    this.minimap = {
      img: document.getElementById("img"),
      x: 0,
      y: 0,
      width: img.width * this.scale.x,
      height: img.height * this.scale.y,
    };

    addEventListener("resize", () => {
      this.minimap.width = img.width * this.scale.x;
      this.minimap.height = img.height * this.scale.y;

      this.cameraSquare.width =
        (camera.width / camera.img.width) * this.minimap.width;
      this.cameraSquare.height =
        (camera.height / camera.img.height) * this.minimap.height;
      this.cameraSquare.x =
        this.minimap.x + (camera.x / camera.img.width) * this.minimap.width;
      this.cameraSquare.y =
        this.minimap.y + (camera.y / camera.img.height) * this.minimap.height;

      
    });
  }

  draw(ctx, camera, player) {

    ctx.save();
    ctx.globalAlpha = 0.4;
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
    ctx.beginPath();

    ctx.rect(
      this.cameraSquare.x  + this.cameraSquare.width * 0.5 + (player.x * this.scale.x * 0.8) ,
      this.cameraSquare.y + this.cameraSquare.height * 0.5 + (player.y * this.scale.y ) ,
      this.playerSquare.width,
      this.playerSquare.height
    );
    ctx.fill();
    ctx.restore();
  }
}
