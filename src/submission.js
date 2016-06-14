var submissionData = pluginName + 'Submission';
var attrList = ['action', 'enctype', 'method', 'target'];

var submissionSupport = function () {
    var input = $('<input>')[0];
    return !!('formAction' in input);
};

var submissionSubmit = function () {
    var $form = $(this),
        $btn  = $(document.activeElement).filter(submitSelector);
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