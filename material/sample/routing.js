// Функция для регистрации маршрутов
// Представьте себе следющю ситуацию: у нас есть несколько маршрутов
// 
// registerRoute('filter/advanced', function(){alert(2)};);
// Этот маршрут предназнчен для URL'ов типа:
// #filter/advanced/abcde
// #filter/advanced/1234
//
// registerRoute('filter', function(){alert(1)};);
// Этот маршрут предназнчен для URL'ов типа:
// #filter/abcde
// #filter/1234
// Этот маршрут также НЕ должен срабатывать на #filter/advanced/abcde
// 
// Порядок поиска маршрутов совпадает с порядком их регистрации, 
// поэтому мы должны зарегистрировать эти два маршрута в правильном порядке - 
// сначала более конкрентный - 'filter/advanced', а потом более общий - 'filter'
// В таком случае при строке #filter/advanced/abcde мы найдем маршрут filter/advanced, 
// выполним его, и прервем цикл поиска маршрутов(смотрите функцию resolveNavigation)
function registerRoute(name, handler) {
	// В случае если массив routes еще не инициализирован, инициализируем его.
	if (!('routes' in window)) {
		// Это произойдет только при первом входе в функцию. 
		window.routes = [];
	}

	// Добавляем машрут в массив
	window.routes.push({name: name, handler: handler});
}

// Инициализируем навигацию
function setupNavigation() {
	resolveNavigation();
	if ('onpopstate' in window) {
		// На событие 'onpopstate' вызываем навигацию
		$(window).on('popstate', function () {
			resolveNavigation();
		});
	} else {
		// IE9 не знает события 'onpopstate', поэтому мы будем проверять состояние строки запроса с интервалом 100мс
		setInterval(resolveNavigation, 100);
	}
}

// Функция для переходов по маршруту
function navigateTo(route, data) {
	// Изменение строки запроса
	window.location.hash = route;
	// Вызов навигации
	resolveNavigation();
}

// Функция вызова навигации - находит необходимый маршрут и выпоняет его функцию-подписчик.
function resolveNavigation() {
	// Оптимизация: в случае если строка запроса не поменялась, выходим с функции
	if (window.location.href == window.location.previousHref) {
		return;
	}

	// удаляем со строки навигации символ #
	var hash = window.location.hash.substr(1);
	// Разделяем строку на массив сегментов
	var segments = hash.split('/');

	// Проходи циклом по всем зарегистрированым маршрутам
	for (var i in window.routes) {
		var route = window.routes[i];
		// Проверям соответствие строки запроса одному из маршрутов
		// Обратите внимание - при проверке соответствия маршрута мы используем функцию match,
		// Это означает, что при регистрации маршрутов мы можем использовать регулярные выражения
		if (hash.match('^' + route.name)) {
			// Если текущая строка запроса соответствует одному из маршрутов - 
			// вызываем функцию обработчик и передаем ей все сегменты строки запроса
			route.handler.apply(this, segments);
			// После того как мы вызвали поддписчик маршрута, мы прерываем цикл
			break;
		}
	}

	// записываем последнюю обработанную строку запроса в свойство previousHref
	window.location.previousHref = window.location.href;
}