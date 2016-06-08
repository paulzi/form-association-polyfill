# Form Association Polyfill

[![NPM version](http://img.shields.io/npm/v/form-association-polyfill.svg?style=flat)](https://www.npmjs.org/package/form-association-polyfill)
![Bower version](http://img.shields.io/bower/v/form-association-polyfill.svg?style=flat)

Библиотека обеспечивает поддержку HTML5 form* атрибутов для старых браузеров, что позволяет менять принадлежность к формам input-элементов и менять параметры отправки формы.

Демо: http://paulzi.ru/form-association-polyfill/

[English readme](https://github.com/paulzi/form-association-polyfill/)

## Установка

Установка через NPM
```sh
npm install form-association-polyfill
```

Установка через Bower
```sh
bower install form-association-polyfill
```

Или установите вручную.

## Использование

Подключите библиотеку на страницу после jQuery:

```html
<script src="/bower_components/jquery/dist/jquery.min.js">
<script src="/bower_components/form-association-polyfill/dist/form-association-polyfill.min.js">
```

Готово!

## Возможности

- обеспечивает поддержку `form` атрибута
- обеспечивает возможность отпавки формы с помощью кнопок вне формы (это является частью поддержки `form` атрибута)
- обеспечивает поддержку `formaction`, `formmethod`, `formenctype`, `formtarget` атрибутов
- сохраняет оригинальный порядок отправки полей согласно DOM
- поддерживает `input[type="file"]`
- дополнительно обеспечивает фикс Safari `document.activeElement` для кнопок

## Требования

- jQuery 1.7+

## Поддержка браузерами

Поддержка была протестирована в следующих браузерах:

- Internet Explorer 7+
- Chrome 7+
- Firefox 3+
- Opera 15+
- Safari 5+
- Android Browser 2.2+
- iOS Safari ?
