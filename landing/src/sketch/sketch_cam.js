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
var ctracker;
var myImage;
var barba;
var barbas = [];
var mover = 10;
var barbasId = [randomDos()];
var barbasIteradores = [0];
var cnv;
var _movingSize = 0.7;
var translateBarba = 200

var capture;


function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function randomDos(){
  return Math.floor(Math.random() * 100000) + 1
}

function setup() {

  for (var i = 0; i < barbasId.length; i++) {
    getData(barbasId[i]);
  }
  var videoInput = createCapture(VIDEO);
  videoInput.parent('embed-canvas');
  videoInput.position(100, 200);
  videoInput.id("v");
  var mv = document.getElementById("v");
  mv.muted = true;
  videoInput.size(600, 400);

  cnv = createCanvas(600, 400);
  centerCanvas();

  cnv.parent('embed-canvas');
  cnv.position(100, 200);


  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);
  //myImage = loadImage("images/labarba.png");



  //capture.hide();
}

function draw() {

  if(typeof(barbas) != 'undefined'){
    locura(barbas);
  }

}

function locura(barbas){

  clear();
  var positions = ctracker.getCurrentPosition();
  if(positions.length > 0) {
    var p1 = createVector(positions[7][0], positions[7][1] );
    var p2 = createVector(positions[33][0], positions[33][1] );

    var angleRad = Math.atan2(p2.y - p1.y, p2.x - p1.x);

    translate(positions[0][0]-20, positions[70][1]+10);
    rotate(angleRad + PI/2);
    var mSize = p1.dist(p2);
    strokeWeight(3);
    stroke(255,255 ,255);

    scale(0.6* (mSize*0.01), 0.6* (mSize*0.01));
    var _movingSize = 0.8;
    var drawDataMoving = barbas;
    var lastSeenKey;

    for (var b = 0; b < drawDataMoving.length; b++) {
      for (let i = 0; i < drawDataMoving[b].drawing.length; i++) {
        for (let j = 0; j < drawDataMoving[b].drawing[i].length; j += 2) {
          for (let k = 0; k < drawDataMoving[b].drawing[i][j].length - 1; k++) {
          //if(k < drawDataMoving[b].drawing[i][j + 0].length - 1){
          let _x1 = drawDataMoving[b].drawing[i][j + 0][k] * _movingSize;
          let _y1 = drawDataMoving[b].drawing[i][j + 1][k] * _movingSize;
          let _x2 = drawDataMoving[b].drawing[i][j + 0][k + 1] * _movingSize;
          let _y2 = drawDataMoving[b].drawing[i][j + 1][k + 1] * _movingSize;
          line(_x1, _y1, _x2, _y2);
          }
        }
      }
    }

  }


}

function getData(id) {  // preload() runs once
  //var rnd = random(1, 165200); "5943952282746880"
  firebase.database().ref('/barbas/'+id).once('value').then(function(snapshot) {
    var barbaKey = snapshot.val();
    console.log(barbaKey);
    //if(barbaKey.recognized == true){
    barbas.push(snapshot.val());
    //}
  }).then(function(){
  });
}


function windowResized() {
  centerCanvas();
}
