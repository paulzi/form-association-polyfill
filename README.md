# form-association-polyfill

[![NPM version](http://img.shields.io/npm/v/form-association-polyfill.svg?style=flat)](https://www.npmjs.org/package/form-association-polyfill)
[![Build Status](https://img.shields.io/travis/paulzi/form-association-polyfill/master.svg)](https://travis-ci.org/paulzi/form-association-polyfill)
[![Downloads](https://img.shields.io/npm/dt/form-association-polyfill.svg)](https://www.npmjs.org/package/form-association-polyfill)
![License](https://img.shields.io/npm/l/form-association-polyfill.svg)

HTML5 [form attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#form) polyfill

[Russian readme](https://github.com/paulzi/form-association-polyfill/blob/master/README.ru.md)

## Install

```sh
npm install form-association-polyfill
```

## Usage

Just import library:

```javascript
import 'form-association-polyfill';
```

## Documentation

### Import types

There are several entry points for importing a library:

- `import FormPolyfill from 'form-association-polyfill'` - similarly `register-with-shims`;
- `import FormPolyfill from 'form-association-polyfill/standard'` - easy import without polyfills for ie11, register is required;
- `import FormPolyfill from 'form-association-polyfill/with-shims'` - import with shims for ie11, register is required;
- `import FormPolyfill from 'form-association-polyfill/with-polyfills'` - import with polyfill for ie11, register is required;
- `import FormPolyfill from 'form-association-polyfill/register'` - import without polyfills for ie11, auto-register;
- `import FormPolyfill from 'form-association-polyfill/register-with-shims'` - import with shims for ie11, auto-register;
- `import FormPolyfill from 'form-association-polyfill/register-with-polifills'` - import with polyfill for ie11, auto-register.

Differences shims from polyfills you can read in [polyshim](https://github.com/paulzi/polyshim/) package.

When directly include the script from the `dist` folder to the browser, you can get an FormPolyfill instance via `window.FormAssociationPolyfill.default`.

### Registration and name of events

When importing a package without register, you need to register it:

```javascript
import FormPolyfill from 'form-association-polyfill/with-shims';

FormPolyfill.register();
```

### Methods

- `register()` - register library
- `unregister()` - unregister library
- `setShim([setClosest[, setEvent]])` - sets shims for non-cross-browser methods
    - `setClosest {Function|null}` - shim for `Element.prototype.closest`
    - `setEvent {Function|null}` - shim for `new Event`

## Testing

For tests, you need to install [selenium-drivers](https://seleniumhq.github.io/selenium/docs/api/javascript/index.html) for browsers.
To run tests, use:

```sh
npm test
```

## Browsers support

- Internet Explorer 11+
- Other modern browsers

For old browsers use [version 1.x](https://github.com/paulzi/form-association-polyfill/tree/1.x).