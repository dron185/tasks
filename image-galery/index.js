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
	}
})

function clearSearch() {
	search.value = '';
	cross.classList.add('header__cross_hidden');
}

// Самооценка своего проекта по пунктам с указанием баллов за каждый выполненный пункт
console.log(`60/60
1. Вёрстка ( 10 )
 - на странице есть несколько фото и строка поиска ( 5 )
 - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс ( 5 )
2. При загрузке приложения на странице отображаются полученные от API изображения ( 10 )
3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API ( 10 )
4. Поиск ( 30 )
 - при открытии приложения курсор находится в поле ввода ( 5 )
 - есть placeholder ( 5 )
 - автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) ( 5 )
 - поисковый запрос можно отправить нажатием клавиши Enter ( 5 )
 - после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода ( 5 )
 - в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder ( 5 )
5. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения ( 10 )
 - высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо`);
