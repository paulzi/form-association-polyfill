!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.FormAssociationPolyfill=t():e.FormAssociationPolyfill=t()}(window,function(){return n={},e.m=t=[function(e,t,n){"use strict";var r,i={eventLast:"submitlast",eventBefore:"submitbefore",eventStart:"submitstart",eventEnd:"submitend"},o=document,u=o.defaultView,a=Element.prototype.closest,l=Object.assign,f=u.CustomEvent,d=null,c=null,s=!1,v=null;function m(e){var t=e.target;!(t=t&&a.call(t,"button,input"))||"submit"!==t.type&&"image"!==t.type||(c=t,setTimeout(function(){c=null},1))}function p(){d=null,s=!1,u.removeEventListener("submit",E),u.addEventListener("submit",E)}function b(e,t){var n={transport:"default"};return e===v.eventBefore&&(n.activeButton=c),void 0!==t&&(n.timeout=t),new f(e,{bubbles:!0,cancelable:!1,detail:n})}function y(e,t,n){var r=b(t,n);e.dispatchEvent(r)}function E(e){u.removeEventListener("submit",E);var t=e.target,n=new f(v.eventLast,{bubbles:!0,cancelable:!0,detail:{activeButton:c}});e.defaultPrevented&&n.preventDefault(),t.dispatchEvent(n),n.defaultPrevented?e.preventDefault():y(d=t,v.eventBefore)}function g(){d&&!s&&y(d,v.eventStart),s=!0,r=r||b(v.eventEnd)}function h(e){d&&(r?(r.detail.timeout=e,d.dispatchEvent(r)):y(d,v.eventEnd,e)),d=null,s=!1}function L(){h(!1)}t.a={setShim:function(e,t,n){a=e||a,l=t||l,f=n||f},getSendingForm:function(){return d},forceSubmitEnd:function(e){h(e)},getSettings:function(){return v},register:function(e){if(v)throw new Error("form-extra-events already registered");return v=l({},i,e||{}),u.addEventListener("click",m),o.addEventListener("submit",p),u.addEventListener("beforeunload",g),u.addEventListener("unload",L),v},unregister:function(){v=null,u.removeEventListener("click",m),o.removeEventListener("submit",p),u.removeEventListener("beforeunload",g),u.removeEventListener("unload",L)}}},function(e,t,n){"use strict";var r=n(0);function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var u,a=e[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==a.return||a.return()}finally{if(i)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var o,u,a,l,f,d,c=document,s=c.defaultView,v=Element.prototype.closest,m=s.Event;function p(e){return e.style.display="none",e}function b(e){return"submit"===e.type||"image"===e.type}function y(e,t){var n,r=e.compareDocumentPosition(t),i=2==(19&r);if(!i&&4!=(21&r))return null;i?(n=l=l||p(c.createElement("div")),e.insertBefore(n,e.firstChild)):(n=f=f||p(c.createElement("div")),e.appendChild(n));var o=t.cloneNode(!0);return t.parentNode.replaceChild(o,t),n.appendChild(t),setTimeout(E,0),o}function E(){a&&a.parentNode.replaceChild(u,a),l&&l.parentNode.removeChild(l),f&&f.parentNode.removeChild(f),l=f=a=u=null}function g(e){for(var t=0;t<e.length;t++){var n=e[t];if(b(n))return n}}function h(e){var t=e.target;if(!e.defaultPrevented&&("Enter"===e.key||13===(e.keyCode||e.which||e.charCode))){var n=t.getAttribute("form"),r=n?c.querySelector("form#"+n):t.form;if(r&&r.id){var i,o=g(c.querySelectorAll('[form="'+r.id+'"]')),u=g(r.elements);i=o&&u?4==(4&o.compareDocumentPosition(u))?o:u:o||u,e.preventDefault(),i&&i.dispatchEvent(new m("click",{bubbles:!0,cancelable:!0}))}else n&&e.preventDefault()}}function L(e){if(!e.defaultPrevented){var t=e.target;if((t=t&&v.call(t,"button,input"))&&b(t)){var n=t.getAttribute("form");if(n){var r=v.call(t,"form");r&&r.id===n||((r=c.querySelector("form#"+n))?a=y(r,u=t):e.preventDefault())}}}}function S(){E()}function w(e){var t=e.target;d=[];for(var n=0;n<t.elements.length;n++){var r=t.elements[n],i=r.getAttribute("form");i&&i!==t.id&&""!==r.name&&!r.disabled&&-1===["reset","submit","button","image"].indexOf(r.type)&&(d.push([null,r.name,r]),r.removeAttribute("name"))}if(t.id)for(var o=c.querySelectorAll('[form="'+t.id+'"]'),u=0;u<o.length;u++){var a=o[u],l=y(t,a);l&&d.push([l,null,a])}}function C(){for(var e=0;e<d.length;e++){var t=i(d[e],3),n=t[0],r=t[1],o=t[2];r?o.setAttribute("name",r):n.parentNode.replaceChild(o,n)}E(),d=[]}t.a={setShim:function(e,t){v=e||v,m=t||m},register:function(){function e(){if(!function(){var e=c.createElement("div"),t=c.createElement("form"),n=c.createElement("input"),r="_tmp"+Date.now();t.id=r,n.setAttribute("form",r),c.body.appendChild(p(e)),e.appendChild(t),e.appendChild(n);var i=n.form===t;return c.body.removeChild(e),i}()){if(o)throw new Error("form-association-polyfill already registered");o=(o=r.a.getSettings())||r.a.register(),s.addEventListener("keypress",h),s.addEventListener("click",L),s.addEventListener("submit",S,!0),s.addEventListener(o.eventBefore,w),s.addEventListener(o.eventStart,C)}}c.body?e():c.addEventListener("DOMContentLoaded",e)},unregister:function(){o&&(s.removeEventListener("keypress",h),s.removeEventListener("click",L),s.removeEventListener("submit",S,!0),s.removeEventListener(o.eventBefore,w),s.removeEventListener(o.eventStart,C),o=null)}}},,,function(e,t,n){"use strict";n.r(t);var r=n(1);r.a.register(),t.default=r.a}],e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(r,i,function(e){return t[e]}.bind(null,i));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},e.p="",e(e.s=4);function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var t,n});