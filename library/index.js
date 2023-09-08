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

// ----------------- Registration ----------------------------

(function () {
	const icon = document.querySelector('.header__icon');
	const autorize = document.querySelector('.authorize-menu');

	// open/closed autorization meny
	icon.addEventListener('click', () => {
		autorize.classList.toggle('authorize-menu_active');
	});
}());

// open modal registration
document.getElementById('authorize-register').addEventListener('click', function () {
	document.getElementById('modal').classList.add('open')
})

document.getElementById('librarycard-register').addEventListener('click', function () {
	document.getElementById('modal').classList.add('open')
})

// close modal registration
document.getElementById('close-modal').addEventListener('click', function () {
	document.getElementById('modal').classList.remove('open')
})

// close modal registration on click 'escape'
window.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		document.getElementById('modal').classList.remove('open')
	}
});

// close modal registration by clicking outside it
document.querySelector('#modal .modal__register').addEventListener('click', (event) => {
	event._isClick = true;
	// console.log('klick iside the block');
})

document.getElementById('modal').addEventListener('click', (event) => {
	if (event._isClick) {
		return
	};
	event.currentTarget.classList.remove('open');
	// console.log('klick outside the block');
})


//-----------------Local storage test---------------------------------
let userData = {};
const form = document.querySelector('.modal__form');
const submit = document.getElementById('modal-button');

const icon = document.querySelector('.header__icon');
const initial = document.querySelector('.header__initial');

// form validation

// функция для валидации: валидация будет возвращать true или false
  //  true - валидация прошла успешно, все поля которые мы проверяем - введены
  //  false - ошибка, что-то не ввели в какое-то поле

function validation(form) {

	function hideError(input) {
		const parent = input.parentNode;

		if (parent.classList.contains('input-error')) {
			parent.querySelector('.modal__label_error').remove();
			parent.classList.remove('input-error');
		}
	}

	function showError(input, text) {
		const parent = input.parentNode;
		const label = document.createElement('label');
		label.classList.add('modal__label_error');
		label.textContent = text;
		parent.classList.add('input-error');
		parent.append(label);
	}

	let result = true;

	const allInputs = form.querySelectorAll('input');

	for (const input of allInputs) {

		hideError(input);

		if (input.value == "") {
			console.log('fill in the field!');
			showError(input, 'Fill in the field!');
			result = false;
		} 
	}
	return result;
}

form.addEventListener('input', function (event) {
	userData[event.target.name] = event.target.value;
});

// привязка к форме события отправки:
form.addEventListener('submit', function (event) { 
	event.preventDefault() // отменяем переход, который срабатывает по умолчанию

	if (validation(this) == true) {
		// генерируем Card Number
		let cardNumber = (Math.floor(Math.random() * 1000000000)).toString(16).toUpperCase();
		let number = {
			userNumber: cardNumber
		};
		userData = {...number, ...userData};
		
		let usersArray = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
		localStorage.setItem('users', JSON.stringify(usersArray));
		usersArray.push(userData);
		localStorage.setItem('users', JSON.stringify(usersArray));

		// const data = JSON.parse(localStorage.getItem('users'));
		// console.log(data);
		
		icon.classList.add('header__icon_hidden');
		initial.classList.add('header__initial_active');
		document.getElementById('modal').classList.remove('open');
		document.querySelector('.authorize-menu').classList.remove('authorize-menu_active');
		
		// Меняем меню профиля
		const autorize = document.querySelector('.authorize-menu');
		const initialActive = document.querySelector('.header__initial_active');
		const profile = document.getElementById('authorize-profile');
		const login = document.getElementById('authorize-login');
		const register = document.getElementById('authorize-register');

		initialActive.addEventListener('click', () => {
			autorize.classList.toggle('authorize-menu_active');
			login.textContent = 'My profile';
			register.textContent = 'Log Out';
			
			profile.textContent = cardNumber;
		});
		
	}
})









// (function () {
// 	const icon = document.querySelector('.header__icon');
// 	const autorize = document.querySelector('.authorize-menu');

// 	// open/closed autorization meny
// 	icon.addEventListener('click', () => {
// 		autorize.classList.toggle('authorize-menu_active');
// 	});
// }());