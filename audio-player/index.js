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
let songArray = ['./assets/audio/audio-1.mp3', './assets/audio/audio-2.mp3'];
let bandNames = ['Survivor', '2Pac'];
let songNames = ['Eye Of The Tiger', 'All Eyez On Me (Gangsta Remix)'];
const bandName = document.querySelector('.main__band-name');
const songName = document.querySelector('.main__song-name');
const bgImage = document.querySelector('.main__bg');
const playerImage = document.querySelector('.main__player-img');
let bgImages = ['assets/img/tiger.jpg', 'assets/img/2pac.jpg'];


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


// function changeDuration() {
	
// }
