// Функция observable предназначена для того чтобы хранить/изменять значение объекта
// также умеет функциональность оповещения внешних обработчиков об изменении значения
function observable(){
    // Запоминаем начальное значение
  var value = arguments[0];    
    
  function handler(){
      // В случае если в функцию были переданы аргументы - считываем значение
    if(arguments.length){
      value = arguments[0];
        // И вызываем каждую из функций-слушателей с новым значением
      for(var i in handler.listeners){
        handler.listeners[i](handler);
      }
    }
    // Независимо от того, было ли передано новое значение или нет, - возвращаем текущее значение
    return value;
  }
    
    //устанавливаем объекту-функции свойство listeners
    handler.listeners = [];
  
    // Возвращаем объект-функцию  
    return handler;
}

// Функция observableArray является "оберткой" для массива
// умеет оповещать внешние обработчики об удалении/добавлении элементов
function observableArray(){
  // Если аргумент был передан - считываем значение массива с первого аргумента
  if(arguments.length){
    var array = arguments[0];
  }
  else{
      // Иначе инициализируем новый массив
    var array = [];
  }
  // Возвращаемая функция просто возвращает массив
  function handler(){
    return array;
  }
  // Свойтво listeners отвечает за массив подписчиков
  handler.listeners = [];
  // Функция push добавляет новый элемент в массив и извещает подписчиков о добавлении
  handler.push = function(item){
     // Добавление в массив
    array.push(item);
    // Извещение всех подписчиков
    for(var i in handler.listeners){
        handler.listeners[i].push(item);
    }
  };
  // Аналогичная функция для удаления элементов с массива и оповещения всех подписчиков об этом
  handler.remove = function(item){
      // Сначала находим в нашем массиве нужный элемент
    for(var i in array){
      if(array[i] == item){
         // Удаляем его
        array.splice(i, 1);
          // оповещаем подписчиков
        for(var j in handler.listeners){
          handler.listeners[j].remove(item);
        }
          // Выходим с функции
        return;
      }
    }
      // В случае если мы прошли по массиву и не вышли с функции(что говорит о том что нужный элемент не был найден) - 
      // генерируем исключение
    throw "Object " + item + " not found";
  };
  
  return handler;
}

// Функция, для прикрепления текста к элементу
function text(element){
    // Внешняя функция существует лишь для того чтобы с помощью замыкания запомнить значение element
    return function(value){
        // Задаем текст
        element.text(value());
        // подписываемся на потерю фокуса
        element.on("blur", function(){
            // при потере фокуса - выставляем новое значение
            value(element.text());
        })
    }
}

function id(element){
	// Переменная, которая хранит в себе предыдущее значение
	var previousValue = '';
	
	return function(value){
		var newValue = value();
		// Если значение не поменялось - выходим из функции
		if(previousValue == newValue){
			return;
		}
		
		element.attr('id', newValue);
		
		// Запоминаем присвоенное значение
		previousValue = newValue;
	}
}

// Функция для привязки класса к свойству вью-модели
function className(element){
	// Переменная, которая хранит в себе значение предыдущего класса
	var previousValue = '';
	
	return function(value){
	
		var newValue = value();
		// Если значение не поменялось - выходим из функции
		if(previousValue == newValue){
			return;
		}
		// В случае если хоть один раз класс уже был назначен - удаляем предыдущее значение
		if(previousValue){
			element.removeClass(previousValue);
		}
		// Добавляем  класс, если элемент еще не омеет его в себе
		if(!element.hasClass(newValue)){
			element.addClass(newValue);
		}
		// Запоминаем присвоенное значение
		previousValue = newValue;
	}
}

// Функция для привязки обработчика нажатия мышью
function click(element){
    // опять - внешняя функция необходима для запоминания значения element
    // Внутренняя функция принимает value - по обработчик события и object - текущий объект, привязанный к элементу
    return function(value, object){
        // Подписываемся на нажатие
        element.on("click", function(){
            // При нажатии вызываем обработчик и предаем в него текущий объект
            value(object);
        })
    }
}

// Функция для генерация HTML c template-объекта. Каждый раз вызывается для конкретной ноды темплейта. 
// При наличии свойства children рекурсивно вызывает generateMarkup для каждой из дочерних нод
function generateMarkup(template, container, object){
    var elements = [];
    // В случае если в ноде присутствует свойство name - создаем элемент
    // свойство name не является обязательным для нод foreach, with и if
    if("name" in template){
        var element = $(document.createElement(template.name));
        element.appendTo(container);
        container = element;
        elements.push(element);
    }
	
	// Свойство '$' для удобства - создает элемент с помощью jquery-функции.
	if('$' in template){
		var element = $(template.$);
		element.appendTo(container);
        container = element;
        elements.push(element);
	}
    
    // Свойство bind отвечает за привязку значения с вью-модели к HTML-элементу
    if("bind" in template){
        for(var i in template.bind){
            // Инициализируем привязку. template.bind[i] в нашем случае  - єто либо функция text, либо click
            // передаем в функцию элемент
            var bind = template.bind[i](element);
            // Передаем значение объекта и сам объект
            bind(object[i], object);
            
            //В случае если в объекте есть свойство listeners - добавляем в массив "слушателей" функцию, 
            // которую вернет нам наша "связная" функция (click, text итд)
            // Таким образом прикаждои изменении значения во вью-модели, будет вызываться функция, 
            // которая будет обновлять значение на разметке
            if("listeners" in  object[i]){
                object[i].listeners.push(bind);
            }
        }
    }
    
    // Свойство для атрибута class
    if("className" in template){
        element.addClass(template.className);
    }
    
    // Универсальное свойтсво для любого атрибута
    if("attr" in template){
        for(var i in template.attr){
            element.attr(i, template.attr[i]);
        }
    }
    
    // Свойство if
    if("ifCondition" in template && "children" in template){
        var ifCondition = template.ifCondition;
        // Создаем функцию, котрая будет выполнять условие, которые мы передали в if
        var condition = function(){
            // Стандартная функция eval, которая выполняет код со строки(в нашем случае - код условия)
            return eval(ifCondition);
        }
        // Выполняем функцию в контексте текущего объекта
        if(condition.call(object)){
            // В случае если функция вернет нам true - генерируем разметку для всех дочерних элементов
            for(var i in template.children){
                // Получаем список сгенерированных элементов
                var addedElements = generateMarkup(template.children[i], container, object);
                // Если текущий список пустой(такое возможно только если у нас не был создан элемент свойством name) - 
                // заполняем его списком новосозданных элементов
                if(!elements.length){
                    elements = elements.concat(addedElements);
                }
                // если же элемент таки был создан для текущей ноды, то он и будет кореневым, 
                // и новосозданные элементы войдут в него
            }
        }
        return elements;
    }
    
    // Функция для перебора элементов массива
    if("foreach" in template && "children" in template){
        var foreachProperty = template.foreach;
        var array = object[foreachProperty];
        // Перебираем все объекты массива
        for(var i in array()){
            for(var j in template.children){
                // Генерируем разметку для всех темплейт-нод children
                var addedElements = generateMarkup(template.children[j], container, array()[i]);
                if(!elements.length){
                    elements = elements.concat(addedElements);
                }
            }
            // Логика обработки новосозданных элементов(см аналогичную в модуле if)
            var childElements = addedElements;
            if("elements" in array()[i]){
                childElements = addedElements.concat(array()[i].elements);
            }
            array()[i].elements = childElements;
        }
        // В случае если мы еще не подписались на изменения в массиве(тоесть если свойство массива listeners пустое)
        if(!array.listeners.length){
            // добавляем подписчик
            array.listeners.push({
                // Функция подписчика для удаления - просто удаляем все элементы
                remove: function(item){
                    for(var i in item.elements){
                        item.elements[i].remove();
                    }
                },
                // Функция подписчика для добавления - генерируем разметку для добавленого элемента
                push: function(item){
                    var elements = []
                    for(var j in template.children){
                        var addedElements = generateMarkup(template.children[j], container, item);
                        elements = elements.concat(addedElements);
                    }
                    item.elements = elements;
                }
            })
        }
        return elements;
    }
    // Свойство with - для всех своих children выставляет текущим объектом значение переданного свойства
    if("withCondition" in template && "children" in template){
        var property = template.withCondition;
        var withObject = object[property] || property;
        for(var i in template.children){
            var addedElements = generateMarkup(template.children[i], container, withObject);
            if(!elements.length){
                elements = elements.concat(addedElements);
            }
        }
        return elements;
    }
    
    // Свойство children - определает под-ноды от текущей
    if("children" in template){
        for(var i in template.children){
            var addedElements = generateMarkup(template.children[i], container, object);
            if(!elements.length){
                elements = elements.concat(addedElements);
            }
        }
    }
    
    return elements;
}