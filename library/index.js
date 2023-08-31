console.log ('1. Вёрстка валидная +10\n2. Вёрстка семантическая +16\n3. Вёрстка соответствует макету +54\n4. Общие требования к верстке +20\nОценка: 100/100');

(function () {
	const burger = document.querySelector('.burger');
	const menu = document.querySelector('.header__menu');
	const menuItems = menu.querySelectorAll('a');
	const body = document.body;
	

	burger.addEventListener('click', () => {
		body.classList.toggle('stop-scroll');
		burger.classList.toggle('burger_active');
		menu.classList.toggle('header__menu_active');
	});
	menuItems.forEach(el => {
		el.addEventListener('click', () => {
			body.classList.remove('stop-scroll');
			burger.classList.remove('burger_active');
			menu.classList.remove('header__menu_active');
		});
	});

}());

console.log ('1. Вёрстка соответствует макету. Ширина экрана 768px +26\n2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n3. На ширине экрана 768рх реализовано адаптивное меню +12\nОценка: 50/50');

// -------------------- About slider ----------------------------

const cards = document.querySelector('.about__cards');
const arrowLeft = document.querySelector('.about__arrow_left');
const arrowRight = document.querySelector('.about__arrow_right');
const dots = document.querySelectorAll('.about__radio-button');
const buttons = document.querySelectorAll('.about__button');

let position = 0;
let dotIndex = 0;

const nextSlide = () => {
	if(position < 1900) {
		position += 475;
		dotIndex++;
	} else {
		position = 1900;
		dotIndex = (dots.length - 1);
	}
	cards.style.left = -position + 'px';
	currentSlide(dotIndex);
};

const prevSlide = () => {
	if(position > 0) {
		position -= 475;
		dotIndex--;
	} else {
		position = 0;
		dotIndex = 0;
	}
	cards.style.left = -position + 'px';
	currentSlide(dotIndex);
};

const currentSlide = (index) => {
	for(let dot of buttons) {
		dot.removeAttribute('checked')
	}
	buttons[index].setAttribute('checked', 'checked')
}

//eventlisteners
arrowRight.addEventListener('click', nextSlide);
arrowLeft.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		position = 475 * index
		cards.style.left = -position + 'px';
		dotIndex = index;
		currentSlide(dotIndex);
	})
});

// ----------------- Favorites slider ----------------------------

const tabs = document.querySelectorAll('.favorites__season-radio');
const seasonBooks = document.querySelectorAll('.favorites__season');
const favoritesButton = document.querySelectorAll('.favorites__button');

for( let i = 0; i < tabs.length; i++ ) {
	tabs[i].addEventListener('click', () => {

		// удаляем атрибут
		for(let tab of favoritesButton) {
			tab.removeAttribute('checked')
		}
		// добавляем текущий атрибут
		favoritesButton[i].setAttribute('checked', 'checked');

		// fade out
		for(let book of seasonBooks) {
			book.classList.add('fadeout');
		}
		seasonBooks[i].classList.remove('fadeout');

		// удаляем класс
		for(let book of seasonBooks) {
			book.classList.remove('favorites__season_active');
		}
		// добавляем текущий класс
		seasonBooks[i].classList.add('favorites__season_active');
	
		// fade in
		for(let book of seasonBooks) {
			book.classList.remove('fadein');
		}
		seasonBooks[i].classList.add('fadein');
		
	});
}


