const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d'); // указываем формат нашей игры (двумерный контекст)

const background = document.createElement('img');
const monkeyCorner = document.createElement('img');
const monkeyHang = document.createElement('img');
const snake = document.createElement('img');
const bird = document.createElement('img');

// bird's positions
let birdX = 600;
let birdY = 250;
// bird's change positions
let newY = 1.5;
// the distance between animals
let distance = 300;

background.src = 'assets/img/bg.png';
monkeyCorner.src = 'assets/img/monkey3.png';
monkeyHang.src = 'assets/img/monkey4.png';
snake.src = 'assets/img/snake.png';
bird.src = 'assets/img/bird.png';

let animalsArray = []; 
animalsArray[0] = {
	posX : canvas.width,
	posY : 200
}

bird.onload = function draw() {
	let score = animalsArray.length - 1;
	context.drawImage(background, 0, 0);
	context.drawImage(monkeyCorner, 0, canvas.height - monkeyCorner.height);
	context.drawImage(bird, birdX, birdY);
	birdY += newY;

	for (let i = 0; i < animalsArray.length; i++) {
		context.drawImage(monkeyHang, animalsArray[i].posX, -animalsArray[i].posY);
		context.drawImage(snake, animalsArray[i].posX + 100, monkeyHang.height + distance - animalsArray[i].posY );
		animalsArray[i].posX -= 1;
		if (animalsArray[i].posX == 300 ) { 
			animalsArray.push({
				posX : canvas.width,
				posY : Math.floor(Math.random() * snake.height)
			});
		} 
		
		context.fillStyle = 'azure';
		context.font = '52px Caveat Brush';
		context.fillText('Score: ' + score, 20, 45);

		// при касании птицей других животных и земли - перезагрузка
		if (birdX + bird.width >= animalsArray[i].posX + 100 && birdX <= animalsArray[i].posX + monkeyHang.width -100 && 
			(birdY <= -animalsArray[i].posY + monkeyHang.height || birdY + bird.height >= -animalsArray[i].posY + monkeyHang.height + distance) 
			|| birdY + bird.height >= canvas.height) {

			alert("GAME OVER!");
			document.location.reload();
			clearInterval(interval);
		}
	}
	requestAnimationFrame(draw);
}

document.addEventListener('keydown', () => {
	birdY -= 60;
})