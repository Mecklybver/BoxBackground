  export class Background {
      constructor() {
          this.outerSquare = {
              x: 0,
              y: 0,
              width: innerWidth * 0.8,
              height: innerHeight * 0.8,
          };
          this.innerSquare = {
            x: 0,
            y: 0,
            width: 40,
            height: 40,
          }
      this.background = {
        img: document.querySelector("img"),
        width: 360,
        height: 200,
        x: 0,
        y: 0,
      };
        this.backgroundLimitX= document.querySelector("img").width - this.background.width;
        this.backgroundLimitY= document.querySelector("img").height - this.background.height;
        this.speed = 10;

      addEventListener("keydown", (e) => {
        switch (e.key) {
          case "ArrowRight":
            if (
              this.outerSquare.x < window.innerWidth - this.outerSquare.width &&
              this.innerSquare.x > 0
            )
              this.outerSquare.x += this.speed;
            else if (
              this.background.x < this.backgroundLimitX &&
              this.innerSquare.x > 0
            )
              this.background.x += this.speed;
            else if (this.innerSquare.x < this.outerSquare.width  * 0.5 - this.innerSquare.width * 0.5 - this.speed) {
              this.innerSquare.x += this.speed;
            }
            break;
            case "ArrowLeft":
            if (this.outerSquare.x > 0 && this.innerSquare.x < 0) this.outerSquare.x -= this.speed;
            else if (this.background.x - this.speed >= 0 && this.innerSquare.x < 0)
              this.background.x -= this.speed;
            else if(this.innerSquare.x > -this.outerSquare.width * 0.5 + this.innerSquare.width * 0.5) {
            this.innerSquare.x -= this.speed
            }
            break;
            case "ArrowUp":
            if (this.outerSquare.y > 0 && this.innerSquare.y < 0) this.outerSquare.y -= this.speed;
            else if (this.background.y - this.speed >= 0 && this.innerSquare.y < 0)
              this.background.y -= this.speed;
            else if (this.innerSquare.y > -this.outerSquare.height * 0.5 + this.innerSquare.height * 0.5 + this.speed) {
              this.innerSquare.y -= this.speed
            }
            break;
            case "ArrowDown":
            if (this.outerSquare.y < window.innerHeight - this.outerSquare.height && this.innerSquare.y > 0)
              this.outerSquare.y += this.speed;
            else if (this.background.y < this.backgroundLimitY && this.innerSquare.y > 0)
              this.background.y += this.speed;
            else if (this.innerSquare.y < this.outerSquare.height * 0.5 - this.innerSquare.height * 0.5 - this.speed) {
              this.innerSquare.y += this.speed
            }
            break;
          default:
            break;
        }
      });
    }

      draw(ctx) {
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
              (this.outerSquare.x + this.outerSquare.width * 0.5 + this.innerSquare.x) - this.innerSquare.width * 0.5,
              (this.outerSquare.y + this.outerSquare.height * 0.5 + this.innerSquare.y) - this.innerSquare.height * 0.5,
        this.innerSquare.width,
        this.innerSquare.height
      );
        ctx.fill();

    }
  }
