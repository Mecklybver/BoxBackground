import { Background } from "./background.js";



const background = new Background();

const ctx = document.createElement("canvas").getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

document.body.appendChild(ctx.canvas);



let previousTime = 0;

function animate(stampTime=0 ) {
    const deltaTime = stampTime - previousTime;
    previousTime = stampTime;
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    background.draw(ctx, deltaTime);


}

animate();




