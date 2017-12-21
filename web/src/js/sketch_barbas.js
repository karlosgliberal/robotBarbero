var config = {
  apiKey: "AIzaSyA0jhHDWUKFTRsoyv1CaV3XNJ8ffHgAmkw",
  authDomain: "bato-fwcsaf.firebaseapp.com",
  databaseURL: "https://bato-fwcsaf.firebaseio.com",
  projectId: "bato-fwcsaf",
  storageBucket: "bato-fwcsaf.appspot.com",
  messagingSenderId: "386049811743"
};

firebase.initializeApp(config);
var database = firebase.database();
var rnd = 1;
var barbas = [];
var barbasId = [randomDos(), randomDos(), randomDos(), randomDos(), randomDos()];
var barbasIteradores = [0, 0, 0, 0, 0];
var cnv;
var _movingSize = 0.6;
var translateBarba = 185;
var estado = false;
var repintarEstado = false;


function setup() {
  cnv = createCanvas(900, 200);
  centerCanvas();
  cnv.parent('barbas');
  for (var i = 0; i < barbasId.length; i++) {
    getData(barbasId[i]);
  }
  smooth(2);
}

function draw() {
  if(repintarEstado){
    if(typeof(barbas) != 'undefined'){
      locura(barbas);
    }
  }
}

function randomDos(){
  return Math.floor(Math.random() * 100000) + 1
}

function locura(barbas){
  if(!estado){
    var drawDataMoving = barbas;
    var lastSeenKey;
    strokeWeight(2);
    stroke(0);
    translate(10, 10);

    for (var b = 0; b < drawDataMoving.length; b++) {
      for (let i = 0; i < drawDataMoving[b].drawing.length; i++) {
        if(barbasIteradores[b] < drawDataMoving[b].drawing[i][0].length - 1){
          let _x1 = drawDataMoving[b].drawing[i][0][barbasIteradores[b]] * _movingSize;
          let _y1 = drawDataMoving[b].drawing[i][1][barbasIteradores[b]] * _movingSize;
          let _x2 = drawDataMoving[b].drawing[i][0][barbasIteradores[b] + 1] * _movingSize;
          let _y2 = drawDataMoving[b].drawing[i][1][barbasIteradores[b] + 1] * _movingSize;
          line(_x1, _y1, _x2, _y2);
        }
      }
      barbasIteradores[b]++;
      translate(translateBarba, 0);
    }
  } else {
    clear();
    estado = false;
  }
}


function repintar() {
  clear();

  barbasId = [randomDos(), randomDos(), randomDos(), randomDos(), randomDos()];
  barbasIteradores = [0, 0, 0, 0, 0];
  barbas = [];
  for (var i = 0; i < barbasId.length; i++) {
    getData(barbasId[i]);
  }
  estado = true;
  repintarEstado = true;

  // setInterval(function(){
  // }, 10000);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    getData(1);
    clear();
  } else if (keyCode === DOWN_ARROW) {
    getData();
    rnd--;
  } else if (keyCode === ENTER) {
    save();
  }
}

function getData(id) {  // preload() runs once
  //var rnd = random(1, 165200); "5943952282746880"
  firebase.database().ref('/barbas/'+id).once('value').then(function(snapshot) {
    // var barbaKey = snapshot.val();
    //if(barbaKey.recognized == true){
    barbas.push(snapshot.val());
    //}
  }).then(function(){

  });
}



function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  if(bowser.mobile){
    _movingSize = map(x,270,-250,0.8,0.4);
  } else {
    movingSize = map(x,270,-250,0.6,0.2);
  }
  cnv.position(x, y);
}


function windowResized() {
  centerCanvas();
}
