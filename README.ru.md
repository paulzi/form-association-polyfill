# form-association-polyfill

[![NPM version](http://img.shields.io/npm/v/form-association-polyfill.svg?style=flat)](https://www.npmjs.org/package/form-association-polyfill)
[![Build Status](https://img.shields.io/travis/paulzi/form-association-polyfill/master.svg)](https://travis-ci.org/paulzi/form-association-polyfill)
[![Downloads](https://img.shields.io/npm/dt/form-association-polyfill.svg)](https://www.npmjs.org/package/form-association-polyfill)
![License](https://img.shields.io/npm/l/form-association-polyfill.svg)

Полифилл для [атрибута form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#form)

[English readme](https://github.com/paulzi/form-association-polyfill/)

## Установка

```sh
npm install form-association-polyfill
```

## Использование

Просто проимпортируйте библиотеку:

```javascript
import 'form-association-polyfill';
```

## Документация

### Варианты импорта

Есть несколько входных точек для импорта библиотеки:

- `import ExtraEvents from 'form-association-polyfill'` - аналогично `register-with-shims`;
- `import ExtraEvents from 'form-association-polyfill/standard'` - простой импорт без полифилов для ie11, требуется регистрация;
- `import ExtraEvents from 'form-association-polyfill/with-shims'` - импорт с прокладками для ie11, требуется регистрация;
- `import ExtraEvents from 'form-association-polyfill/with-polyfills'` - импорт с полифилами для ie11, требуется регистрация;
- `import ExtraEvents from 'form-association-polyfill/register'` - импорт без полифилов для ie11, авто-регистрация;
- `import ExtraEvents from 'form-association-polyfill/register-with-shims'` - импорт с прокладками для ie11, авто-регистрация;
- `import ExtraEvents from 'form-association-polyfill/register-with-polifills'` - импорт с полифилами для ie11, авто-регистрация.

Отличия прокладок от полифилов можете прочитать в [polyshim](https://github.com/paulzi/polyshim/).

При прямом подключении скрипта из папки `dist` в браузер, получить экземпляр FormPolyfill можно через `window.FormAssociationPolyfill.default`.

### Регистрация и наименование событий

При импорте пакета без регистрации, требуется зарегистрировать его:

```javascript
import ExtraEvents from 'form-association-polyfill/with-shims';

ExtraEvents.register();
```

### Методы 

- `register([settings])` - регистрирует библиотеку
- `unregister()` - отменяет регистрацию библиотеки
- `setShim([setClosest[, setEvent]])` - задаёт прокладки для некроссбраузерных методов
    - `setClosest {Function|null}` - прокладка для `Element.prototype.closest`
    - `setCustomEvent {Function|null}` - прокладка для `new Event`

## Тестирование

Для тестов необходимо установить [selenium-драйверы](https://seleniumhq.github.io/selenium/docs/api/javascript/index.html) для браузеров.
Для запуска тестов используйте:

```sh
npm test
```

## Поддержка браузерами

- Internet Explorer 11+
- Другие современные браузеры

Для старых браузеров используйте [версию 1.x](https://github.com/paulzi/form-association-polyfill/tree/1.x).