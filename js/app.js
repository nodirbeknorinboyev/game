function reset(){
	location.reload();
}

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var score = 0;

var vX = 4;
var vY = -4;

var x = 10;
var y = 100;
var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) /2;


var paddleVx = 10;

var rightPressed;
var leftPressed;

function keyDownHandler(event){
    if(event.keyCode == 39){
    	rightPressed = true;
    }
    else if(event.keyCode == 37){
    	leftPressed = true;
    }
}

function keyUpHandler(event){
    if(event.keyCode == 39){
    	rightPressed = false;
    }
    else if(event.keyCode == 37){
    	leftPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function drawPaddle(){
   ctx.beginPath();
   ctx.rect(paddleX, canvas.height - paddleHeight, 
   	        paddleWidth, paddleHeight, paddleWidth, paddleHeight);
   ctx.fillStyle = "#05CFEC";
   ctx.fill();
   ctx.closePath();
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x,y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#05CFEC";
	ctx.fill();
	ctx.closePath();
}

function draw(){
	ctx.clearRect(0, 100, canvas.width, canvas.height);
	drawBall();
	drawPaddle();

	if(rightPressed && (paddleX + paddleWidth) < canvas.width){
		paddleX += paddleVx;
	}
	else if (leftPressed && paddleX > 0){
		paddleX -= paddleVx;
	}

	if(x + vX > canvas.width - ballRadius ||
	   x + vX < ballRadius){
		vX = -vX;
	}

	if(y + vY < ballRadius){
		vY = -vY;
	}

	if (y + vY < ballRadius || 
		(y + vY > canvas.height - paddleHeight - ballRadius &&
		 x + vX > paddleX && 
		 x + vX < paddleX + paddleWidth
		)) {
        score++;
    	vY = -vY;
        document.getElementById("val").innerText = score;
	
	}
	else if(y +vY > canvas.height){
		var overG = document.getElementById('mess');
		overG.style.display = "flex";

		document.removeEventListener('keydown', keyDownHandler);
        document.removeEventListener('keyup', keyUpHandler);

        vy = 0;
        vX = 0;
	}else{
		// good
	}



	x += vX;
	y += vY;


	window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);