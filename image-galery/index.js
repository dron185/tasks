const search = document.getElementById('search');
const cross = document.querySelector('.header__cross');
const url = 
'https://api.unsplash.com/search/photos?query=spring&per_page=30&client_id=Xag3asSOqMZBOXZBV9SEB3rYrmIYSBY46IMEjTzLDv8';
const gallery = document.querySelector('.gallery');
const apiSearch = 'https://api.unsplash.com/search/photos?query=';

async function getData(urlApi) {
	const response = await fetch(urlApi);
	const data = await response.json();
	// console.log(data);
	const results = data.results;
	// console.log(results);

	for (let item of results.values()) {
		let imgUrl = item.urls.regular;
		// console.log(imgUrl);
		showData(imgUrl);
	}
}
getData(url);

function showData(imgUrl) {
	const img = document.createElement('img');
	img.classList.add('gallery__img');
	img.alt = `image`;
	const imgBox = document.createElement('div');
	imgBox.classList.add('gallery__box');
	imgBox.append(img);
	img.src = imgUrl;
	gallery.append(imgBox);

	img.addEventListener('click', () => {
		// console.log(imgUrl)
		window.open(imgUrl);
	})
}

function inputChange() {
	if (search.value) {
		cross.classList.remove('header__cross_hidden');
	} else {
		cross.classList.add('header__cross_hidden');
	}
}

const form = document.querySelector('.header__search');

form.addEventListener('submit', function (event) {
	event.preventDefault();

	const apiSearchUrl = `${apiSearch}${search.value}${'&per_page=30&client_id=Xag3asSOqMZBOXZBV9SEB3rYrmIYSBY46IMEjTzLDv8'}`;
	console.log(apiSearchUrl)
	if (search.value) {
		gallery.innerHTML = "";
		getData(apiSearchUrl);
		// search.value = '';     //делает пустую строку search после отправки запроса
		// cross.classList.add('header__cross_hidden');
	}
})

function clearSearch() {
	search.value = '';
	cross.classList.add('header__cross_hidden');
}


