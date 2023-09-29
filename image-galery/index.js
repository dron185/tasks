const button = document.querySelector('.header__search-btn');
const search = document.getElementById('search');
const url = 'https://api.unsplash.com/search/photos?query=spring&client_id=Xag3asSOqMZBOXZBV9SEB3rYrmIYSBY46IMEjTzLDv8';
const gallery = document.querySelector('.gallery');

async function getData() {
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);

	const results = data.results;
	console.log(results);

	for (let item of results.values()) {
		let imgUrl = item.urls.regular;
		console.log(imgUrl);
		showData(imgUrl);
	}
}
getData();

function showData(imgUrl) {
	const img = document.createElement('img');
	img.classList.add('gallery__img');
	img.alt = `image`;
	const imgBox = document.createElement('div');
	imgBox.classList.add('gallery__box');
	imgBox.append(img);
	img.src = imgUrl;
	gallery.append(imgBox);
}

