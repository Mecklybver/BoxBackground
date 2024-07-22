import { Game } from "./game.js";

const game = new Game();

const ctx = document.createElement("canvas").getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.canvas.id = "main";


document.body.appendChild(ctx.canvas);

let previousTime = 0;

function animate(stampTime = 0) {
  const deltaTime = stampTime - previousTime;
  previousTime = stampTime;
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  game.draw(ctx, deltaTime);
}

animate();

addEventListener("resize", () => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
});
