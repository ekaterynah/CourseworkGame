let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let frog = new Image();
let background = new Image();
let foreground = new Image();
let fly = new Image();
let pipeBottom = new Image();


frog.src = "img/frog0.PNG";
fly.src = "img/fly2.JPEG";
background.src = "img/backgr.jpg";
foreground.src = "img/water2.jpg";
pipeBottom.src = "img/pipeBottom.png";

document.addEventListener("keydown", jump);

function jump(){
    yPos -= 100;
}

let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 300
}

let xPos = 10;
let yPos = 490;

let widthFrog = 90;
let heightFrog = 80;

let grav = 3;

let max = 100;

let gap = 90;

let score = 0;
function draw(){
    ctx.drawImage(background, 0, 0);

   for (let i = 0; i < pipe.length; i++) {

       ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y);
       ctx.drawImage(fly, pipe[i].x, pipe[i].y - pipeBottom.height + gap, 50, 50);

       ctx.drawImage(frog, xPos, yPos, widthFrog, heightFrog);
       ctx.drawImage(foreground, 0, cvs.height - foreground.height );


       if (pipe[i].x === 125){
          pipe.push({
               x: cvs.width,
               y: Math.floor(Math.random() * pipeBottom.height) - pipeBottom.height / max
           })
       }

       if (xPos + widthFrog >= pipe[i].x && yPos + heightFrog >= pipe[i].y) {
           location.reload();
       }

       if(yPos>= pipe[i].y + pipeBottom.height) {
           location.reload();
       }

       if (pipe[i].x === 4){
        score++;
       }

       pipe[i].x--;
   }

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);

}
pipeBottom.onload = draw;

