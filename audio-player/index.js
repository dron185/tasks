const audio = document.getElementById('audio');
let isPlay = false;
const playButton = document.getElementById('play-button');

function playSong() {
	if (!isPlay) {
		audio.play();
		isPlay = true;
		playButton.classList.add('pause');
	} else {
		audio.pause();
		isPlay = false;
		playButton.classList.remove('pause');
	}
}

let playNumber = 0;
let songArray = ['./assets/audio/audio-1.mp3', './assets/audio/audio-2.mp3', './assets/audio/audio-3.mp3'];
let bandNames = ['Survivor', '2Pac', 'Paul Weekend'];
let songNames = ['Eye Of The Tiger', 'All Eyez On Me (Gangsta Remix)', 'Feel So High'];
const bandName = document.querySelector('.main__band-name');
const songName = document.querySelector('.main__song-name');
const bgImage = document.querySelector('.main__bg');
const playerImage = document.querySelector('.main__player-img');
let bgImages = ['assets/img/tiger.jpg', 'assets/img/2pac.jpg', 'assets/img/feel.jpg'];


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
}


const volumeNumber = document.querySelector('.main__volume-number');
const volumeCurrent = document.getElementById('volume');
function changeVolume() {
	volumeNumber.innerHTML = volumeCurrent.value;
	audio.volume = volumeCurrent.value / 100; //-----уменьшает звук
}


//change slider position
const progressSlider = document.querySelector('.main__progress-slider');
const progressBar = document.querySelector('.main__progress-bar');


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
