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


// close autorization meny by clicking outside it


// open modal log-in
document.getElementById('authorize-login').addEventListener('click', function () {
	document.getElementById('modal-log').classList.add('open')
})

document.getElementById('librarycard-login').addEventListener('click', function () {
	document.getElementById('modal-log').classList.add('open')
})

// close modal log-in
document.getElementById('close-log').addEventListener('click', function () {
	document.getElementById('modal-log').classList.remove('open')
})

// close modal log-in on click 'escape'
window.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		document.getElementById('modal-log').classList.remove('open')
	}
});

// close modal login by clicking outside it
document.querySelector('#modal-log .modal__login').addEventListener('click', (event) => {
	event._isClick = true;
})

document.getElementById('modal-log').addEventListener('click', (event) => {
	if (event._isClick) {
		return
	};
	event.currentTarget.classList.remove('open');
})

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


//-----------------Local storage---------------------------------
let userData = {};
const form = document.querySelector('.modal__form');
const submit = document.getElementById('modal-button');
const icon = document.querySelector('.header__icon');
const initial = document.querySelector('.header__initial');
const registered = document.querySelector('.registered-menu');
const profile = document.getElementById('registered-profile');

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
		Object.assign(userData, number);
		
		let usersArray = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
		localStorage.setItem('users', JSON.stringify(usersArray));
		usersArray.push(userData);
		localStorage.setItem('users', JSON.stringify(usersArray));
		
		icon.classList.add('header__icon_hidden');
		initial.classList.add('header__initial_active');
		document.getElementById('modal').classList.remove('open');
		document.querySelector('.authorize-menu').classList.remove('authorize-menu_active');

		// добавляем атрибут title:
		const firstName = document.getElementById('first-name');
		const lastName = document.getElementById('last-name');

		let initialTitle = `${firstName.value} ${lastName.value}`;
		initial.setAttribute('title', initialTitle);

		//Иконка пользователя меняется на заглавные буквы имени
		let initialLetters = `${(firstName.value)[0]}${(lastName.value)[0]}`;
		initial.textContent = initialLetters.toUpperCase();
		
		initial.addEventListener('click', () => {
			profile.textContent = cardNumber;
		});

	}
})

initial.addEventListener('click', () => {
	registered.classList.toggle('registered-menu_active');
});

// Нажимая на кнопку Log Out выходим из состояния авторизации
const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
	initial.removeAttribute('title');
	icon.classList.toggle('header__icon_hidden');
	registered.classList.toggle('registered-menu_active');
	initial.classList.toggle('header__initial_active');
});

console.log('Ваша оценка - 115.5 баллов\nОтзыв по пунктам ТЗ:\nНе выполненные/не засчитанные пункты:\n1) ❗Панель навигации "слайдера" сделана по технологии "sticky" для разрешений с одним рядом книг (768px и меньше), т.е. опускается вниз вместе со скроллом страницы, прилипая к верхней части экрана, в рамках блока Favorites.  \n2) На разрешении 768px, при открытом бургер-меню, оно закрывается и открывается меню авторизации. \n3) Нажатие на любую область или элемент вне меню приводят к закрытию меню авторизации. \n4) Блок Digital Library Cards. Если введённые имя и номер карты совпадают с данными пользователя, то отображается панель с информацией, вместо кнопки Check the card на 10 секунд.  \n5) Там же после отображения информации, кнопка возвращается в прежнее состояние, а поля в форме сбрасываются. \n6) Если пользователь ещё не вошёл в учётную запись, то при нажатии на любую кнопку Buy открывается модальное окно LOGIN.  \n7) На разрешении 768px при открытом бургер-меню, оно закрывается и открывается меню авторизации. \n8) Нажатие на любую область или элемент вне меню приводят к закрытию меню профиля. \n9) Нажатие на кнопку My Profile открывает модальное окно MY PROFILE. \n10) Дизайн модального окна соответствует макету.  \n11) Счетчик для Visits отображает, сколько раз пользователь проходил процесс авторизации, включая самый первый - регистрацию. \n12) Счетчик для Books отображает, сколько у пользователя книг находятся в состоянии Own. Значение варьируется 0-16.  \n13) Рядом с Card Number есть кнопка, нажатие на которую копирует код карты клиента в буфер обмена. \n14) Окно центрировано, а область вокруг затемнена (насколько затемнена - не имеет значения). \n15) При нажатии на крестик в углу окна, или на затемненную область вне этого окна, оно закрывается. \n16) При нажатии на любую кнопку Buy, еще до покупки абонемента, открывается модальное окно BUY A LIBRARY CARD. \n17) При нажатии на любую кнопку Buy, после покупки абонемента, меняет вид кнопки на неактивную Own, добавляя единицу к счетчику книг в профиле. \n18) Кроме того после нажатия обновляется не только счетчик, но и название книги должно отобразится в разделе Rented Books. Название формируется по принципу <название книги>, <автор книги>. В случае если название книги слишком длинное или список стал слишком большой список книг в блоке Rented Books становится скроллируемым (по необходимости горизонтально/ вертикально или оба скролла сразу) Тайтл Rented Books скроллироваться не должен \n19) ❗Модальное окно нужно сделать шириной 640px. Будет это обрезка по 5px по бокам, или просто уменьшение длины с сохранением сетки - значения не имеет, хотя при правильной сеточной структуре, сделать это будет намного проще. \n20) Дизайн модального окна соответствует макету.  \n21) При нажатии на крестик в углу окна, или на затемнённую область вне этого окна, оно закрывается.  \n22) Для того, чтобы кнопка Buy была активна, все поля должны быть не пустыми. \n23) Bank card number должен содержать 16 цифр. С пробелами каждые 4 символа или нет - значения не имеет. \n24) Expiration code содержит 2 поля с ограничением в 2 цифры. \n25) CVC должен содержать 3 цифры. \n26) При наличии авторизации вместо кнопки Check the Card будут отображаться данные пользователя и бейджи, как на дизайне LibraryCard after login in account. \nЧастично выполненные пункты:\n1) "Слайдер" реагирует на нажатие кнопок панели навигации и происходит анимация затухания и проявления. \nОтзыв: отсутствует анимация затухания\n2) На любой ширине экрана все 4 карточки с книгами одновременно будут плавно затухать, а затем плавно проявляться следующие. \nОтзыв: отсутствует анимация затухания\n3) То же верно и в обратную сторону, кнопка бургер-меню должна быть доступна при открытом меню авторизации.  \nОтзыв: не совсем понял этот пункт\n4) То же верно и в обратную сторону, кнопка бургер-меню должна быть доступна. \nОтзыв: не совсем понял этот пункт\nВыполненные пункты:\n1) Карусель реагирует на нажатие кнопок (кнопки под каруселью и стрелочки слева и справа в мобильной версии) и происходит анимация перелистывания. \n2) На экране шириной 1440px проверяем, чтобы было доступно 2 других скрытых картинки. При каждом нажатии выезжает следующая, и так до границ справа и слева. \n3) Выделенная кнопка под каруселью (имеется ввиду кнопка соответствующая активному слайду и которая имеет коричневый цвет) - неактивная. \n4) Если анимация карусели не успела завершиться, при этом нажата была следующая кнопка, то картинка не должна зависнуть в промежуточном состоянии. \n5) На экране шириной 768px проверяем, чтобы было доступно 4 других скрытых картинки. Для этого меняем разрешение и перезагружаем страницу. Теперь доступных перемещений становится 5. \n6) Неактивными становятся не только выделенные кнопки, но и стрелочки на границах карусели. \n7) Анимация может быть прервана следующим нажатием на кнопку выбора поры года, но при этом анимация не должна застывать в промежуточном состоянии. Если анимация не была прервана следующим нажатием кнопки, то она должна отрабатывать до конца. \n8) Во время анимаций высота блока Favorites не должна меняться. \n9) В блоке Favorites все кнопки должны иметь имя Buy, а не Own. \n10) Нажатие на иконку пользователя в хедере открывает меню, которое должно оказаться под иконкой таким образом, что правый верхний угол меню находится в той же точке, что и нижний правый угол контейнера с иконкой в хедере. Меню под иконкой. \n11) Дизайн модального окна соответствует макету.\n12) При нажатии на кнопку Register в открытом меню авторизации появляется модальное окно REGISTER, где есть поля First name, Last name, E-mail и Password. \n13) При нажатии кнопки Sign Up в блоке Digital Library Cards также появляется модальное окно REGISTER. \n14) Окно центрировано, а область вокруг затемнена (насколько затемнена - не имеет значения).\n15) При нажатии на крестик в углу окна, или на затемнённую область вне этого окна, оно закрывается. \n16) В данном случае, ограничения по полям - все поля должны быть не пустыми. \n17) Пароль должен быть не короче 8 символов.  \n18) В поле E-mail должна быть валидация типа email.  \n19) Данные сохраняются в хранилище localStorage, в том числе и пароль, хотя в реальной жизни так делать нельзя. \n20) Иконка пользователя меняется на заглавные буквы имени. \n21) Отображение страницы приходит в состояние после авторизации (этап 4). \n22) Будет сгенерирован девятизначный Card Number случайным образом в формате 16-ричного числа. \n23) Дизайн модального окна соответствует макету.  \n24) При нажатии на кнопку Log In появляется модальное окно LOGIN, где есть поля E-mail or readers card и Password. \n25) При нажатии кнопки Log In в блоке Digital Library Cards также появляется модальное окно LOGIN. \n26) Окно центрировано, а область вокруг затемнена (насколько затемнена - не имеет значения). \n27) При нажатии на крестик в углу окна, или на затемнённую область вне этого окна, оно закрывается. \n28) Для авторизации все поля должны быть не пустыми. \n29) Пароль должен быть не короче 8 символов. \n30) При наведении курсором на иконку пользователя должно отображаться полное имя пользователя (атрибут title). \n31) Нажатие на иконку пользователя в хедере открывает меню, которое должно оказаться под иконкой таким образом, что правый верхний угол меню находится в той же точке, что и нижний правый угол контейнера с иконкой в хедере. Меню под иконкой. \n32) ❗Вместо надписи Profile отображается девятизначный Card Number. Для Card Number можно использовать меньший шрифт чтобы надпись вметилась в контейнер. \n33) Нажатие на кнопку Log Out приводит к выходу пользователю из состояния авторизации, возвращаемся к этапу 1.')

