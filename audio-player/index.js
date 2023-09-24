const audio = document.getElementById('audio');
let isPlay = false;
const playButton = document.getElementById('play-button');
const progressSlider = document.querySelector('.main__progress-slider');
const progressBar = document.querySelector('.main__progress-bar');

let playNumber = 0;
let songArray = ['./assets/audio/audio-1.mp3', './assets/audio/audio-2.mp3', './assets/audio/audio-3.mp3'];
let bandNames = ['Survivor', '2Pac', 'Paul Weekend'];
let songNames = ['Eye Of The Tiger', 'All Eyez On Me (Gangsta Remix)', 'Feel So High'];
const bandName = document.querySelector('.main__band-name');
const songName = document.querySelector('.main__song-name');
const bgImage = document.querySelector('.main__bg');
const playerImage = document.querySelector('.main__player-img');
let bgImages = ['assets/img/tiger.jpg', 'assets/img/2pac.jpg', 'assets/img/feel.jpg'];
let collors = ['rgb(243, 123, 10)', 'rgb(109, 108, 108)', 'rgb(112, 39, 161)'];


function playSong() {
	if (!isPlay) {
		audio.play();
		isPlay = true;
		playButton.classList.add('pause');
		playerImage.style.transform = 'scale(1.1)';

	} else {
		audio.pause();
		isPlay = false;
		playButton.classList.remove('pause');
		playerImage.style.transform = 'scale(1)';
	}
}

audio.onended = function nextSong() {
	playNext();
}

function playNext() {
	playNumber++;
	if (playNumber > songArray.length - 1) {
		playNumber = 0;
	}
	audio.src = songArray[playNumber];
	bgImage.src = bgImages[playNumber];
	playerImage.src = bgImages[playNumber];
	audio.play();
	isPlay = true;
	playButton.classList.add('pause');
	bandName.textContent = bandNames[playNumber];
	songName.textContent = songNames[playNumber];
	progressSlider.style.backgroundColor = collors[playNumber];
	playerImage.style.transform = 'scale(1.1)';
}

function playPrev() {
	playNumber--;
	if (playNumber < 0) {
		playNumber = songArray.length - 1;
	}
	audio.src = songArray[playNumber];
	bgImage.src = bgImages[playNumber];
	playerImage.src = bgImages[playNumber];
	audio.play();
	isPlay = true;
	playButton.classList.add('pause');
	bandName.textContent = bandNames[playNumber];
	songName.textContent = songNames[playNumber];
	progressSlider.style.backgroundColor = collors[playNumber];
	playerImage.style.transform = 'scale(1.1)';
}

const volumeNumber = document.querySelector('.main__volume-number');
const volumeCurrent = document.getElementById('volume');
function changeVolume() {
	volumeNumber.innerHTML = volumeCurrent.value;
	audio.volume = volumeCurrent.value / 100; //-----уменьшает звук
}

//change slider position

function changeDuration() {
	const duration = audio.duration;
	const currentTime = audio.currentTime;

	const durationTime = document.querySelector('.main__duratiom-time');
	durationTime.innerHTML = formatTime(audio.duration);
	const progressTime = document.querySelector('.main__progress-time');
	progressTime.innerHTML = formatTime(audio.currentTime);

	console.log(duration)
	console.log(currentTime)

	let progressValue = ( currentTime / duration ) * 100;
	progressSlider.style.width = `${progressValue}%`;
}
audio.addEventListener('timeupdate', changeDuration);

function changeTime(elem) {
	const width = this.clientWidth;
	let clickBar = elem.offsetX;
	const duration = audio.duration;
	audio.currentTime = ( clickBar / width ) * duration;
}
progressBar.addEventListener('click', changeTime);


//formating time in minutes and seconds
const formatTime = (time) => {
	let min = Math.floor(time / 60);
	if (min < 10) {
		min = `0${min}`;
	}
	let sec = Math.floor(time % 60);
	if (sec < 10) {
		sec = `0${sec}`;
	}
	return `${min}:${sec}`;
}

// volume switch of/on

const volumeButton = document.querySelector('.main__volume-button');

function switchVolume() {
	if (!audio.muted) {
		audio.muted = true;
		volumeButton.classList.add('mute');
	} else {
		audio.muted = false;
		volumeButton.classList.remove('mute');
	}
}

// Самооценка своего проекта по пунктам с указанием баллов за каждый выполненный пункт:
console.log('1.Вёрстка +10\n-вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5\n-в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n2.Кнопка Play/Pause +10\n-есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5\n-внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5\n3.При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10\n4.При смене аудиотрека меняется изображение - обложка аудиотрека +10\n5.Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10\n6.Отображается продолжительность аудиотрека и его текущее время проигрывания +10\n7.Очень высоке качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\n-высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо');