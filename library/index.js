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

<<<<<<< HEAD
console.log ('1. Вёрстка соответствует макету. Ширина экрана 768px +26\n2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n3. На ширине экрана 768рх реализовано адаптивное меню +12\nОценка: 50/50');
=======
console.log ('1. Вёрстка соответствует макету. Ширина экрана 768px +26\n2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n3. На ширине экрана 768рх реализовано адаптивное меню +12\nОценка: 50/50');
>>>>>>> acb9ebd90be665a5e861c48baa7553d597e4a601
