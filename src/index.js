import ExtraEvents from 'form-extra-events/standard';

// shorthands for uglify
const doc = document;
const win = doc.defaultView;

// can shim
let closest = Element.prototype.closest;
let Event   = win.Event;

// data
let evSettings, activeBtn, cloneBtn, before, after, list;

/**
 * @param {HTMLElement} element
 */
function hide(element) {
    element.style.display = 'none';
    return element;
}

/**
 * @returns {Boolean}
 */
function checkSupport() {
    let div   = doc.createElement('div');
    let form  = doc.createElement('form');
    let input = doc.createElement('input');
    let id    = '_tmp' + Date.now();
    form.id   = id;
    input.setAttribute('form', id);

    doc.body.appendChild(hide(div));
    div.appendChild(form);
    div.appendChild(input);
    let result = input.form === form;
    doc.body.removeChild(div);

    return result;
}

/**
 * @param {HTMLElement} element
 * @returns {Boolean}
 */
function isButton(element) {
    return ['reset', 'submit', 'button', 'image'].indexOf(element.type) !== -1;
}

/**
 * @param {HTMLElement} element
 * @returns {Boolean}
 */
function isSubmitButton(element) {
    return element.type === 'submit' || element.type === 'image';
}

/**
 * @param {HTMLFormElement} form
 * @param {HTMLElement} element
 * @return {HTMLElement|null}
 */
function moveOnForm(form, element) {
    let pos = form.compareDocumentPosition(element);
    let isBefore = (pos & 19) === 2;
    let isAfter  = (pos & 21) === 4;
    if (!isBefore && !isAfter) {
        return null;
    }
    let div;
    if (isBefore) {
        div = before = before || hide(doc.createElement('div'));
        form.insertBefore(div, form.firstChild);
    } else {
        div = after = after || hide(doc.createElement('div'));
        form.appendChild(div);
    }

    let clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
    div.appendChild(element);
    setTimeout(cleanUp, 0);
    return clone;
}

/**
 */
function cleanUp() {
    cloneBtn && cloneBtn.parentNode.replaceChild(activeBtn, cloneBtn);
    before   && before.parentNode.removeChild(before);
    after    && after.parentNode.removeChild(after);
    before = after = cloneBtn = activeBtn = null;
}

/**
 * @param {HTMLElement[]} nodes
 * @returns {HTMLElement|undefined}
 */
function getFirstSubmit(nodes) {
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (isSubmitButton(node)) {
            return node;
        }
    }
}

/**
 * @param {KeyboardEvent} e
 */
function keyPressHandler(e) {
    let target = e.target;
    if (!e.defaultPrevented && (e.key === 'Enter' || (e.keyCode || e.which || e.charCode) === 13)) {
        let formId = target.getAttribute('form');
        let form = formId ? doc.querySelector('form#' + formId) : target.form;
        if (form && form.id) {
            let btn1 = getFirstSubmit(doc.querySelectorAll('[form="' + form.id + '"]'));
            let btn2 = getFirstSubmit(form.elements);
            let btn;
            if (btn1 && btn2) {
                btn = (btn1.compareDocumentPosition(btn2) & 4) === 4 ? btn1 : btn2;
            } else {
                btn = btn1 || btn2;
            }
            e.preventDefault();
            if (btn) {
                btn.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));
            }
        } else if (formId) {
            e.preventDefault();
        }
    }
}

/**
 * @param {Event} e
 */
function clickHandler(e) {
    if (!e.defaultPrevented) {
        let target = e.target;
        target = target && closest.call(target, 'button,input');
        if (target && isSubmitButton(target)) {
            let formId = target.getAttribute('form');
            if (formId) {
                let form = closest.call(target, 'form');
                if (!form || form.id !== formId) {
                    form = doc.querySelector('form#' + formId);
                    if (form) {
                        activeBtn = target;
                        cloneBtn  = moveOnForm(form, target);
                    } else {
                        e.preventDefault();
                    }
                }
            }
        }
    }
}

function submitHandler() {
    cleanUp();
}

/**
 * @param {Event} e
 */
function beforeHandler(e) {
    let form = e.target;
    list = [];

    // remove
    for (let i = 0; i < form.elements.length; i++) {
        let item = form.elements[i];
        let formId = item.getAttribute('form');
        if (formId && formId !== form.id && item.name !== '' && !item.disabled && !isButton(item)) {
            list.push([null, item.name, item]);
            item.removeAttribute('name');
        }
    }

    // add
    if (form.id) {
        let elements = doc.querySelectorAll('[form="' + form.id + '"]');
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            let clone = moveOnForm(form, element);
            if (clone) {
                list.push([clone, null, element]);
            }
        }
    }
}

/**
 */
function startHandler() {
    for (let i = 0; i < list.length; i++) {
        let [clone, name, element] = list[i];
        if (name) {
            element.setAttribute('name', name);
        } else {
            clone.parentNode.replaceChild(element, clone);
        }
    }
    cleanUp();
    list = [];
}

export default {
    /**
     * @param {Function|null} [setClosest]
     * @param {Function|null} [setEvent]
     */
    setShim: function(setClosest, setEvent) {
        closest = setClosest || closest;
        Event   = setEvent   || Event;
    },

    /**
     * Register plugin
     */
    register: () => {
        let register = () => {
            if (!checkSupport()) {
                if (evSettings) {
                    throw new Error('form-association-polyfill already registered');
                }
                evSettings = ExtraEvents.getSettings();
                if (!evSettings) {
                    evSettings = ExtraEvents.register();
                }
                win.addEventListener('keypress',             keyPressHandler);
                win.addEventListener('click',                clickHandler);
                win.addEventListener('submit',               submitHandler, true);
                win.addEventListener(evSettings.eventBefore, beforeHandler);
                win.addEventListener(evSettings.eventStart,  startHandler);
            }
        };
        if (doc.body) {
            register();
        } else {
            doc.addEventListener('DOMContentLoaded', register);
        }
    },

    /**
     * Unregister plugin
     */
    unregister: () => {
        if (evSettings) {
            win.removeEventListener('keypress',             keyPressHandler);
            win.removeEventListener('click',                clickHandler);
            win.removeEventListener('submit',               submitHandler, true);
            win.removeEventListener(evSettings.eventBefore, beforeHandler);
            win.removeEventListener(evSettings.eventStart,  startHandler);
            evSettings = null;
        }
    },
}