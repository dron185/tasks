const button = document.querySelector('.header__search-btn');
const search = document.getElementById('search');
const url = 'https://api.unsplash.com/search/photos?query=spring&client_id=Xag3asSOqMZBOXZBV9SEB3rYrmIYSBY46IMEjTzLDv8';
const imgBox = document.querySelector('.gallery__box');
// const image = document.querySelector('.gallery__img');


// async function getData() {
// 	try {
// 		const response = await fetch(url);
// 		const data = await response.json();
// 		console.log(data);
// 		// console.log(data.results[0].urls.regular);
// 		showData(data);
// 		// imgBox.style.backgroundImage = "url('data.results[0].urls.regular')";
// 		// image.src = data.results[0].urls.regular;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
// getData();

// function showData(data) {
// 	// imgBox.style.backgroundImage = "url('data.results[0].urls.regular')";
// 	image.src = data.results[0].urls.regular;
// }

const img = document.createElement('img');
img.classList.add('gallery__img');
img.alt = `image`;
imgBox.append(img);

async function getData() {
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
	showData(data);
}
getData();

function showData(data) {
	img.src = data.results[0].urls.regular;
}




