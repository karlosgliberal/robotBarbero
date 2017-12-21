//ScrollTo
 $('#robot-menu').click(function(event){
        event.preventDefault()
        $.scrollTo($('#robot-text'), 800, {offset: {top: -50}});
 });

$('#captura').click(function(event){
    event.preventDefault();
    captura();
});
