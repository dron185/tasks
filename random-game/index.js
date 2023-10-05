const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d'); // указываем формат нашей игры (двумерный контекст)

const background = document.createElement('img');
const monkeyCorner = document.createElement('img');
const monkeyHang = document.createElement('img');
const snake = document.createElement('img');
const bird = document.createElement('img');

// bird's positions
let birdX = 450;
let birdY = 250;
// bird's change positions
let newY = 3;
// the gap between animals
let distance = 200;

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
	context.drawImage(background, 0, 0);

	for (let i = 0; i < animalsArray.length; i++) {
		context.drawImage(monkeyHang, animalsArray[i].posX, -animalsArray[i].posY);
		context.drawImage(snake, animalsArray[i].posX + 100, monkeyHang.height + distance - animalsArray[i].posY );
		animalsArray[i].posX -= 1;
		// console.log(animalsArray[i].posX);
		if (animalsArray[i].posX == 200) {
			animalsArray.push({
				posX : canvas.width,
				posY : Math.floor(Math.random() * snake.height)
			});
		} 
		// else if (animalsArray.length > 2) {
		// 	animalsArray.pop();
		// }
		console.log(animalsArray.length);
	}

	context.drawImage(monkeyCorner, 0, canvas.height - monkeyCorner.height);
	context.drawImage(bird, birdX, birdY);
	birdY += newY;
	requestAnimationFrame(draw);
}

document.addEventListener('keydown', () => {
	birdY -= 60;
})