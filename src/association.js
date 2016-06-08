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

    setTimeout(function () { associationAfterSubmit.call(form); }, 10);
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
    $(document).on('submit', 'form', associationSubmit);
}