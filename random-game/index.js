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
let gravitation = 1.5;
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
let score = 0;

function draw() {
	context.drawImage(background, 0, 0);
	context.drawImage(monkeyCorner, 0, canvas.height - monkeyCorner.height);
	context.drawImage(bird, birdX, birdY);
	birdY += gravitation;

	let scoreArray = localStorage.getItem('myScore') ? JSON.parse(localStorage.getItem('myScore')) : [];
	localStorage.setItem('myScore', JSON.stringify(scoreArray));

	showScore();

	animalsArray.forEach(element => {
		if (element.posX == 250) {
			score++;
		}
	});

	let animation = requestAnimationFrame(draw);
	for (let i = 0; i < animalsArray.length; i++) {
		context.drawImage(monkeyHang, animalsArray[i].posX, -animalsArray[i].posY);
		context.drawImage(snake, animalsArray[i].posX + 100, monkeyHang.height + distance - animalsArray[i].posY );
		animalsArray[i].posX -= 1;
		if ( animalsArray[i].posX == 800 ) {  // or 700
			animalsArray.push({
				posX : canvas.width,
				posY : Math.floor(Math.random() * snake.height)
			});
		}

		// при касании птицей других животных и земли - перезагрузка
		if (birdX + bird.width >= animalsArray[i].posX + 100 && birdX <= animalsArray[i].posX + monkeyHang.width -130 && 
			(birdY <= -animalsArray[i].posY + monkeyHang.height || birdY + bird.height >= -animalsArray[i].posY + monkeyHang.height + distance) 
			|| birdY + bird.height >= canvas.height) {
			scoreArray.push(score);
			localStorage.setItem('myScore', JSON.stringify(scoreArray));

			document.querySelector('.modal').classList.add('open');
			document.querySelector('.modal__button').addEventListener('click', () => {
				document.querySelector('.modal').classList.remove('open');
				document.location.reload();
			})
			// alert("GAME OVER!");
			// document.location.reload();
			
			cancelAnimationFrame(animation);
			// clearInterval(animation);
		}
	}
	
}
bird.onload = draw;

scoreArray = JSON.parse(localStorage.getItem("myScore"));
console.log(scoreArray)

// best score and score of the last 10 games
let bestScore;
let totalResult;
if (scoreArray == null) {
	bestScore = 0;
	totalResult = 0;
} else {
	bestScore = Math.max.apply(null, scoreArray);
	totalResult = scoreArray.slice(-10);
}

function showScore() {
	context.fillStyle = '#ffffff';
	context.font = '52px Caveat Brush';
	context.fillText('Score: ' + score, 20, 45);
	context.fillText('Best score: ' + bestScore, 190, 45);
}

document.addEventListener('keydown', () => {
	birdY -= 60;
})

// results of the last 10 games
const modalRes = document.querySelector('.modal__results');
console.log(totalResult);
modalRes.innerHTML = totalResult;