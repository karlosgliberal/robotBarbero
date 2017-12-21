//ScrollTo
$('#robot-menu').click(function(event){
  event.preventDefault()
  $.scrollTo($('#robot-text'), 800, {offset: {top: -50}});
});

$('#captura').click(function(event){
  event.preventDefault();
  captura();
});


$( document ).ready(function() {
  setTimeout(function () {
    var waypoints = $('#barbasWay').waypoint(function(direction) {
      repintar();
    }, {
      offset: '25%'
    });

  }, 1200);
})
