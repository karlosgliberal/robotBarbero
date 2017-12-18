// https://github.com/qiao/PathFinding.js/

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
var iterator = 0;
var dosIterator = 0;
var rnd = 1;
var barbas = [];
var barbasId = [111];
var mover = 10;


function setup() {
  // setup camera capture
  var videoInput = createCapture();
  videoInput.size(400, 300);
  videoInput.id("v");
  var mv = document.getElementById("v");
  mv.muted = true;

  var cnv = createCanvas(400, 300);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  videoInput.position(x, y);
  cnv.position(x, y);
  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);
  for (var i = 0; i < barbasId.length; i++) {
    getData(barbasId[i]);
  }
  smooth(2);
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
  strokeWeight(10);
  stroke(255,255 ,255);

  scale(0.6* (mSize*0.01), 0.6* (mSize*0.01));
  var _movingSize = 0.8;
  var drawDataMoving = barbas;
  var lastSeenKey;


  translate(100, 10);
  strokeWeight(2);
  stroke(255,255,255);

  // let k = dosIterator;
  var k = dosIterator;
  //var i = iterator;
  //if(i < drawDataMoving.drawing.length){
  var mover = 100;
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
  //iterator++
  // if (frameCount % 6 == true) {
  //   dosIterator = dosIterator + 0.5;
  // }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    barba.drawing = [];
    clear();
    background(0);
    dosIterator = 0;
    rnd++;
    getData();
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
    barbas.push(snapshot.val());
  }).then(function(){
    console.log(id);
  });
}
