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

//sound
const waveAudio = new Audio();
const scoreAudio = new Audio();
const winAudio = new Audio();
const gameoverAudio = new Audio();
const bgAudio = new Audio();

waveAudio.src = 'assets/audio/fly.mp3';
scoreAudio.src = 'assets/audio/score.mp3';
winAudio.src = 'assets/audio/win.mp3';
gameoverAudio.src = 'assets/audio/gameover.mp3';

let animalsArray = [];
animalsArray[0] = {
	posX : canvas.width,
	posY : 200
}
let score = 0;

const modalTitle = document.querySelector('.modal__title');
const modalScore = document.querySelector('.modal__score');
const modalRes = document.querySelector('.modal__results');

function draw() {
	let animation = requestAnimationFrame(draw);
	context.drawImage(background, 0, 0);
	context.drawImage(monkeyCorner, 0, canvas.height - monkeyCorner.height);
	context.drawImage(bird, birdX, birdY);
	birdY += gravitation;

	let scoreArray = localStorage.getItem('myScore') ? JSON.parse(localStorage.getItem('myScore')) : [];
	localStorage.setItem('myScore', JSON.stringify(scoreArray));
	let isGame = true;
	
	for (let i = 0; i < animalsArray.length; i++) {
		context.drawImage(monkeyHang, animalsArray[i].posX, -animalsArray[i].posY);
		context.drawImage(snake, animalsArray[i].posX + 100, monkeyHang.height + distance - animalsArray[i].posY );
		animalsArray[i].posX -= 1;
		
		if ( animalsArray[i].posX == 800 ) {
			animalsArray.push({
				posX : canvas.width,
				posY : Math.floor(Math.random() * snake.height)
			});
		}
		
		// добавляем очки при прохождении animals позиции 250
		if ( animalsArray[i].posX == 250 ) {
			score++;
			scoreAudio.play();
		}

		// при касании птицей других животных и земли - game over
		if (birdX + bird.width >= animalsArray[i].posX + 100 && birdX <= animalsArray[i].posX + monkeyHang.width -130 && 
			(birdY <= -animalsArray[i].posY + monkeyHang.height || birdY + bird.height >= -animalsArray[i].posY + monkeyHang.height + distance) 
			|| birdY + bird.height >= canvas.height) {

			isGame = false;
			gameoverAudio.play();
			modalTitle.innerHTML = 'GAME OVER!';
			modalScore.innerHTML = score;

			document.querySelector('.modal').classList.add('open');
			document.querySelector('.modal__button').addEventListener('click', () => {
				document.querySelector('.modal').classList.remove('open');
				document.location.reload();
			})
			cancelAnimationFrame(animation);
		}
	
		// при достижении 5 очков - победа
		if (score == 5) {
			isGame = false;
			winAudio.play();
			modalTitle.innerHTML = 'YOU WON! Congratulations!';
			modalScore.innerHTML = score;

			document.querySelector('.modal').classList.add('open');
			document.querySelector('.modal__button').addEventListener('click', () => {
				document.querySelector('.modal').classList.remove('open');
				document.location.reload();
			})
			cancelAnimationFrame(animation);
		}
	}
	if (!isGame) {
		scoreArray.push(score);
		modalRes.innerHTML = scoreArray.slice(-10);  // results of the last 10 games
		localStorage.setItem('myScore', JSON.stringify(scoreArray));
	}
	
	context.fillStyle = '#ffffff';
	context.font = '52px Caveat Brush';
	context.fillText('Score: ' + score, 20, 45);
}
bird.onload = draw;

document.addEventListener('keydown', () => {
	birdY -= 60;
	waveAudio.play();
})