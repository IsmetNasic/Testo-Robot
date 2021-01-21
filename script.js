const canvas = document.getElementById('canvasBoard');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

// Saves the arrow keys. This way we can press two keys at the same time.
const keys = [];

// Values of our robot. x and y tells us the position, width and height of the robot, 
// frameX and frameY and moving are used to animate moving, speed is for speed xD.
const player = {
    x: 0,
    y: 0,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 10, 
    moving: false
};
// This helps us locate the position of our robot on the x axis.
const xKeys = {
    0: 26,
    1: 126,
    2: 226,
    3: 326,
    4: 426,
};

// this helps us locate the position of our robot on the y axis.
const yKeys = {
    0: 434,
    1: 334,
    2: 234,
    3: 134,
    4: 34,
}

const facingKeys = {
    SOUTH: 0,
    WEST: 1,
    EAST: 2,
    NORTH: 3,
}

// Here we load up the images
const playerSprite = new Image();
playerSprite.src = "robot.png";
const background = new Image();
background.src = "background.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

// event listeners to move robot with arrows
window.addEventListener("keydown", function(e){
    keys[e.key] = true;
});
window.addEventListener("keyup", function(e){
    delete keys[e.key];
    player.moving = false;
});

// function that allows us to move with arrows
function movePlayer(){
    if (keys["ArrowUp"] && player.y > 0){
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;
    }
    if (keys["ArrowDown"] && player.y < 450){
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }
    if (keys["ArrowLeft"] && player.x > 0){
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    }
    if (keys["ArrowRight"] && player.x < 470){
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true;
    }
}

function handlePlayerFrame(){
    if (player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0;
}


let fps, fpsInterval, startTime, now, then, elapsed;

// here we set up the speed of moving FPS
function startAnimating(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height)
        movePlayer();
        handlePlayerFrame();
    }
}

// Commands - place(x, y, facing), move(), right(), left(), report()
let saveMe = 0;
console.log(saveMe)


function report(){
    if(saveMe <= 0){
        return alert("You need to place the Testo-Robot First")
    }
    let x = 'Jackpot, right between two blocks!';
    let y = 'Jackpot, right between two blocks!';
    let z = '';
    
    if(player.frameY == 0){
        z = 'SOUTH';
    }if(player.frameY == 1){
        z = 'WEST';
    }if(player.frameY == 2){
        z = 'EAST';
    }if(player.frameY == 3){
        z = 'NORTH';
    }

    if(player.y < 54){
        y = 4;
    }if (player.y > 54 && player.y < 155){
        y = 3;
    }if (player.y > 155 && player.y < 255){
        y = 2;
    }if(player.y > 255 && player.y < 355){
        y = 1;
    }if(player.y > 355){
        y = 0;
    }

    if(player.x < 78){
        x = 0;
    }if (player.x > 78 && player.x < 178){
        x = 1;
    }if (player.x > 178 && player.x < 278){
        x = 2;
    }if(player.x > 278 && player.x < 378){
        x = 3;
    }if(player.x > 378){
        x = 4;
    }
    console.log(x, y, z)
    document.getElementById("place-value").innerHTML = x + ', ' + y + ', ' + z;
};



function place(x, y, facing){
    player.x = xKeys[x];
    player.y = yKeys[y];
    player.frameY = facingKeys[facing];
    if (x > 4 || x < 0 || x == undefined || y == undefined || y > 4 || y < 0|| facing == undefined) {
        return  alert("Value is incorrect");
    };
    if (facing == 'WEST' || facing == 'EAST'|| facing == 'SOUTH' || facing == 'NORTH'){
        saveMe += 1;
        return startAnimating(13);
    }
    return alert("Value is incorrect")
}

function move(){
    if (player.frameY == 1 && player.x > 100){   
        player.x -= 100;
    }
    if (player.frameY == 2 && player.x < 400){
        player.x += 100;
    }
    if (player.frameY == 3 && player.y > 100){
        player.y -= 100;
    }
    if (player.frameY == 0 && player.y < 400){
        player.y += 100;
    }
}

function right(){
    if (player.frameY == 0) {
        return player.frameY += 1;
        
    }
    if (player.frameY == 1) {
        return player.frameY += 2;
    }
    if (player.frameY == 3) {
        return player.frameY -= 1;
    }
    if (player.frameY == 2) {
        return player.frameY -= 2;
    }
 };

 function left(){
    if (player.frameY == 0) {
        return player.frameY += 2;
    }
    if (player.frameY == 1) {
        return player.frameY -= 1;
    }
    if (player.frameY == 3) {
        return player.frameY -= 2;
    }
    if (player.frameY == 2) {
        return player.frameY += 1;
    }
 };