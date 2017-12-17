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
var barbasId = [111];
var mover = 10;

var capture;
var cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}


function setup() {
  cnv = createCanvas(400, 400);
  centerCanvas();
  cnv.parent('embed-canvas');
  var videoInput = createCapture(VIDEO);
  videoInput.id("v");
  var mv = document.getElementById("v");
  mv.muted = true;
  videoInput.size(400, 400);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);
  myImage = loadImage("images/labarba.png");



  //capture.hide();
}

function draw() {

      clear();
      // get array of face marker positions [x, y] format
      var positions = ctracker.getCurrentPosition();

      if(positions.length > 0) {
          var p1 = createVector(positions[7][0], positions[7][1] );
          var p2 = createVector(positions[33][0], positions[33][1] );

          // stroke(255,0,0);
          // line(p1.x,p1.y,p2.x, p2.y);

          // angle in radians
          var angleRad = Math.atan2(p2.y - p1.y, p2.x - p1.x);

          translate(positions[37][0], positions[37][1]+20);
          rotate(angleRad + PI/2);
          imageMode(CENTER,CENTER);

          var mSize = p1.dist(p2);
          image(myImage, 0, 0, mSize * 1.5, mSize * 1.5);
      }


}

function windowResized() {
  centerCanvas();
}
