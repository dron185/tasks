const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d'); // указываем формат нашей игры (двумерный контекст)

const background = document.createElement('img');
const monkey = document.createElement('img');
const monkeyBottom = document.createElement('img');
const monkeyCorner = document.createElement('img');
const bird = document.createElement('img');

background.src = 'assets/img/bg.png';
monkey.src = 'assets/img/monkey1.png';
monkeyBottom.src = 'assets/img/monkey2.png';
monkeyCorner.src = 'assets/img/monkey3.png';
bird.src = 'assets/img/bird.png';

function draw() {
	context.drawImage(background, 0, 0);
	context.drawImage(monkey, 500, -90);
	context.drawImage(monkeyBottom, 520, canvas.height - monkeyBottom.height);
	context.drawImage(monkeyCorner, 0, canvas.height - monkeyBottom.height);
	context.drawImage(bird, 250, 350);

}

bird.onload = draw;