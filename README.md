# Form Association Polyfill

[![NPM version](http://img.shields.io/npm/v/form-association-polyfill.svg?style=flat)](https://www.npmjs.org/package/form-association-polyfill)
![Bower version](http://img.shields.io/bower/v/form-association-polyfill.svg?style=flat)

HTML5 form* attributes polyfill, to change form association and submission attributes

Demo: https://paulzi.ru/misc/github/form-association-polyfill-v1/

[Russian readme](https://github.com/paulzi/form-association-polyfill/blob/master/README.ru.md)

## Install

Install via NPM
```sh
npm install form-association-polyfill
```

Install via Bower
```sh
bower install form-association-polyfill
```

Or install manually.

## Usage

Include library on page after jQuery. Select standalone or separate method:

### standalone (build-in dependencies)

```html
<script src="/bower_components/jquery/dist/jquery.min.js">
<script src="/bower_components/form-association-polyfill/dist/form-association-polyfill.all.min.js">
```

### separate (external dependencies)

```html
<script src="/bower_components/jquery/dist/jquery.min.js">
<script src="/bower_components/form-extra-events/dist/form-extra-events.min.js">
<script src="/bower_components/form-association-polyfill/dist/form-association-polyfill.min.js">
```

Profit!

## Features

- provide `form` attribute polyfill
- support submitting form with button outside form (part of `form` attribute polyfill)
- provide `formaction`, `formmethod`, `formenctype`, `formtarget` attributes polyfill
- save original fields order in DOM
- support `input[type="file"]`
- additionally provides a fix for Safari `document.activeElement` for buttons

## Requirements

- jQuery 1.7+
- [form-extra-events](https://github.com/paulzi/form-extra-events/)

## Browser support

Tested with browsers:

- Internet Explorer 7+
- Chrome 7+
- Firefox 3+
- Opera 15+
- Safari 5+
- Android Browser 2.2+
- iOS Safari ?