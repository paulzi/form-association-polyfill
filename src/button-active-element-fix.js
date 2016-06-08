// safari button document.activeElement fix
$(document).on('click', 'input,button', function () {
    if (!document.activeElement || document.activeElement === document.body) {
        $(this).focus();
    }
});