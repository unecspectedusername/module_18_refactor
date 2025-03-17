## Модуль 20 "Стандарты написания кода и общие подходы"

Практическое задание курса "Профессия Fullstack веб-разработчик на JavaScript и PHP"

### Практическое задание модуля

В рамках задания необходимо было выполнить рефакторинг кода для того, чтобы он соответствовал принципам DRY, KISS, YAGNI и SOLID.

В рамках этого проекта я сосредоточился на соответствии принципам DRY, KISS и YAGI. Примеры применения принципов SOLID я привел в [этом проекте](https://github.com/unecspectedusername/module_10_refactor)

Оригинальный код можно посмотреть [здесь](https://github.com/unecspectedusername/module_18).


## D.R.Y

1. В проекте "Верстка сайта по макету" во всех основных файлах стилей я нашел часто повторяющиеся CSS свойства и объединил их в блоки.

Например, если было так:

```
.fantasies {
	width: 100%;
	position: relative
}
.fantasies__wrapper {
    	width: 100%;
    	background-color: black;
}
.fantasies__header {
    	width: 100%;
    	font-size: 18px;
}
```

Стало так:

```
.fantasies,
.fantasies__wrapper,
.fantasies__header {
	width: 100%;
}
.fantasies {
	position: relative
}
.fantasies__wrapper {
	background-color: black;
}
.fantasies__header {
	font-size: 18px;
}
```

2. Проанализаровав макет, я заметил, что большая часть картинок подключается с помощью свойства `background: no-repeat url(‘/path/to/file’) 50% / cover;` Я заменил повторение этого свойства для всех картинок миксином `background(/path/to/file)`
3. В проекте я часто использовал миксин `flex-center`, который выглядел так:

```
@mixin flex-center($isInline: false) {
	@if ($isInline) {
		display: inline-flex;
	} @else {
		display: flex;
	}
	justify-content: center;
	align-items: center;
}
```

Я написал его в самом начале работы с проектом и думал, что мне придется часто использовать `display: inline-flex`, но по факту, я не использовал аргумент `$isInline` ни разу. При этом я постоянно указывал направление `flex-direction: row` или `column` после каждого вызова миксина.

Поэтому я переписал его:

```
@mixin flex-center($direction: null) {
	display: flex;
	@if ($direction == row) {
		flex-direction: row;
	} @else if($direction == column) {
		flex-direction: column;
	}
	justify-content: center;
	align-items: center;
}
```

Таким образом я убрал постоянные повторения `flex-direction`, включив этот параметр в миксин. Так же я удалил миксин `flex-row-center` т.к. в нем отпала необходимость и заменил все случаи его использования на `@include flex-center(row);`

## K.I.S.S

1. В стилях проекта для медиазапросов я использовал SASS миксины. Свойства, которые должны были попасть в медиазопросы я часто прописывал для каждого класса отдельно. Примерно так:

```
.block {
	display: flex;
	flex-direction: row;
	@include mobile {
		flex-direction: column;
	}
}

.block__header {
	font-size: 18px;
	@include mobile {
		font-size: 14px:
	}
}

.block__text {
	color: white;
	@include mobile {
		color: black;
	}
}
```

На мой взгляд так может быть сложно понять, как меняются стили при достижении определенных брейкпоинтов, поэтому я вынес все стили для медиазапросов в отдельные блоки в конце файлов.

```
.block {
	display: flex;
	flex-direction: row;
}

.block__header {
	font-size: 18px;
}

.block__text {
	color: white;
}

@include mobile {
	.block {
		flex-direction: column;
	}
	.block__header {
		font-size: 14px;
	}
	.block__text {
		color: black;
	}
}
```

## Y.A.G.N.I

В оригинальном макете в Figma в нижней части расположена карта. Судя мо макету, эта карта представляет собой статическую картинку, т.к. на ней не видно каких-то элементов управления, которые обычно есть на настоящих картах и она выводится в черно-белой гамме, что тоже не похоже на настоящую карту.

Тем не менее при первоначальной верстке макета я добавил на страницу "живую" карту с помощью конструктора карт Яндекс и наложил фильтр grayscale, чтобы она выглядела так же, как на макете.

Это ведет за собой ряд проблем:

* Время загрузки страницы увеличивается.
* В консоли получаем целую гору ошибок связанных с cookie и трекерами, которые добавляет Яндекс
* Валидатор W3C ругается на JS скрипт Яндекса.
* Проблема со скроллом на мобильных устройствах, при которой пользователь, прокручивая страницу вниз может "застрять" на карте, и вместо прокрутки страницы он будет двигать карту. Можно исправить, но для этого понадобится добавить дополнительный JS с обработчиком событий, который будет отслеживать тап на карте. Это займет дополное время.

Поэтому я заменил карту на статическую картинку.

## S.O.L.I.D

### **Single Responsibility Principle**

В стилях проекта был такой утилитарный класс:

```
.overlay {
  background-color: var(--color-dark);
  opacity: 70%;
  width: 100%;
  height: 100%;
}
```

Согласно принципу S.R.P. каждый утилитарный класс CSS должен отвечать только за одну конкретную задачу, поэтому я разделил этот класс на два:

```
.overlay {
  background-color: var(--color-dark);
  opacity: 70%;
}

.full-size {
  width: 100%;
  height: 100%;
}
```

Класс `.full-size` я смог использовать для многих других элементов, вместо того, чтобы прописывать им `width: 100%; height: 100%;`

### Остальные принципы SOLID я показал на примере [другого проекта](https://github.com/unecspectedusername/module_10_refactor)