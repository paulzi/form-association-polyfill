/**
 * Form association polyfill
 * @see https://github.com/paulzi/form-association-polyfill
 * @license MIT (https://github.com/paulzi/form-association-polyfill/blob/master/LICENSE)
 * @version 1.0.2
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(root.jQuery);
  }
}(this, function ($) {

'use strict';

var pluginName = 'formAssociationPolyfill';
var submitSelector = 'input[type="submit"],input[type="image"],button[type="submit"]';
// safari button document.activeElement fix
$(document).on('click', 'input,button', function () {
    if (!document.activeElement || document.activeElement === document.body) {
        $(this).focus();
    }
});
var hide = function () {
    this.style.display = 'none';
};

var associationSupport = function () {
    var $body  = $(document.body),
        $form  = $('<form>').prop('id', pluginName).each(hide).appendTo($body),
        $input = $('<input form="' + pluginName + '">').each(hide).appendTo($body),
        result = $input.prop('form') === $form[0];
    $form.add($input).remove();
    return result;
};

var associationClickOnSubmit = function (e) {
    var form = $(this).attr('form');
    if (form) {
        var $form = $(this).closest('form');
        if (!$form.length || $form[0].id !== form) {
            e.preventDefault();
            $form.one('submit', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
            $('form#' + form).trigger('submit');
        }
    }
};

var associationSubmit = function () {
    var i, element,
        form = this;

    // remove from form
    var target, removed = [];
    for (i = 0; i < form.elements.length; i++) {
        element = form.elements[i];
        target  = $(element).attr('form');
        if (target && target !== form.id && !element.disabled) {
            element.disabled = true;
            removed.push(element);
        }
    }

    // add other
    var $added = $();
    if (form.id) {
        var createDiv = function (form, action) {
            var $div = $('<div>').each(hide);
            $div[action](form);
            $added = $added.add($div);
            return $div;
        };

        var $div = createDiv(form, 'prependTo');
        $('[form="' + form.id + '"], form[id="' + form.id + '"]').each(function () {
            if (this === form) {
                $div = createDiv(form, 'appendTo');
            } else if ($.inArray(form.elements, this) === -1 && !this.disabled) {
                var clone = this.cloneNode(true);
                $(this)
                    .replaceWith(clone)
                    .prop(pluginName, clone)
                    .appendTo($div);
            }
        });
    }

    form[pluginName] = [removed, $added];
};

var associationAfterSubmit = function () {
    var data = this[pluginName];
    if (data) {
        var i;

        // revert removed
        for (i = 0; i < data[0].length; i++) {
            data[0][i].disabled = false;
        }

        // revert added
        data[1].children()
            .each(function () {
                $(this[pluginName]).replaceWith(this);
                this[pluginName] = null;
            })
            .end()
            .remove();
    }
};

if (!associationSupport()) {
    $(document).on('click', submitSelector, associationClickOnSubmit);
    $(document).on('submitbefore', 'form', associationSubmit);
    $(document).on('submitstart',  'form', associationAfterSubmit);
}
var submissionData = pluginName + 'Submission';
var attrList = ['action', 'enctype', 'method', 'target'];

var submissionSupport = function () {
    var input = $('<input>')[0];
    return !!('formAction' in input);
};

var submissionSubmit = function () {
    var $form = $(this),
        $btn  = $(document.activeElement).filter(submitSelector);
    if (!$btn.length) {
        $.each(this.elements, function (i, input) {
            input = $(input).filter(submitSelector);
            if (!$btn.length && input.length) {
                $btn = input;
            }
        });
    }
    if ($btn.length) {
        var attrNew = {}, attrOld = {};
        $.each(attrList, function (i, attr) {
            attrNew[attr] = $btn.attr('form' + attr);
            attrOld[attr] = $form.attr(attr);
        });
        $form.prop(submissionData, attrOld);
        $form.attr(attrNew);
    }
};

var submissionAfterSubmit = function () {
    var attrOld = $(this).prop(submissionData);
    if (attrOld) {
        $(this).attr(attrOld);
    }
};

if (!submissionSupport()) {
    $(document).on('submitbefore', 'form', submissionSubmit);
    $(document).on('submitstart',  'form', submissionAfterSubmit);
}

}));
