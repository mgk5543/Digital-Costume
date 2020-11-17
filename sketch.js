
let seedX = Math.random();
let seedY = Math.random();
let radX = 0.7;
let radY = 0.6;
let ampX;
let ampY;

  
  // ml5.js adjustable mask!
let video;
let poseNet;
let pose;
let skeleton;



function setup() {
  createCanvas(640, 360);
  video = createCapture(VIDEO);
  video.hide();
  
  // Hook up poseNet
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  
  
  // frameRate(30)
  // createLoop({duration:3})
  
  frameRate(15)
    background(255)
    fill(127)
    noStroke()
    createLoop(3)
    ampX = width / 2.3
    ampY = height / 2.3
  
  
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  image(video, 0, 0);

  
  if (pose) {
    let earR = pose.rightEar;
    let earL = pose.leftEar;
    // We use the difference between the ears
    // as the size of the mask.
    let d = dist(earR.x, earR.y, earL.x, earL.y);
    
    noFill();
    stroke(255);
    strokeWeight(3);
    arc(earR.x-d/5, earL.y-d*1.7, d*1.4, d*3, TWO_PI, PI, OPEN);
    
    strokeWeight(0);
    fill(255, 255, 255, 70);
    rectMode(CORNER);
    rect(earR.x - d/1.4, earL.y -d/2.8, d*2.4, d*1.8);
    fill(232, 226, 211);
    rect(earR.x -d/9, earL.y-d/1.4, d*1.2, d/3);
    ellipseMode(CENTER);
    arc(earL.x +d/16, earL.y-d/3.5, d*1.5, d/3, -PI/2, PI/2);
    arc(earR.x-d/16, earL.y-d/3.5, d*1.5, d/3, PI/2, -PI/2);
    fill(201, 193, 175);
    arc(earL.x+d/16, earL.y-d/4.2, d*1.3, d/4, -PI/2, PI/2);
    arc(earR.x-d/16, earL.y-d/4.2, d*1.3, d/4, PI/2, -PI/2);
    ellipseMode(CORNER);
    fill(232, 226, 211);
    arc(earR.x-d/9, earL.y-d*1.2, d*1.2, d, PI, 0);
    fill(255, 255, 255);
    arc(earR.x-d/9, earL.y-d*1.2, d*1.2, d*1.5, -2.3, 0);
    
    
    

    // Draw an ellipse on eack keypoint
    // for (let i = 0; i < pose.keypoints.length; i++) {
    //   let x = pose.keypoints[i].position.x;
    //   let y = pose.keypoints[i].position.y;
    //   fill(0, 255, 0);
    //   ellipse(x, y, 16, 16);
    // }😀😀😀😀
    
    
    
    // translate(width / 2, height / 2)
    // const radius = height / 3
    // const beeX = cos(animLoop.theta) * radius
    // const beeY = sin(animLoop.theta) * radius
    
    fill(animLoop.progress, 0.5, 1)
      translate(width / 2, height / 2)
    
    for(let i=0;i<5;i++){
      seedX = Math.random();
      seedY = Math.random();
      const beeX = animLoop.noise({ radius: radX, seed: seedX }) * ampX
      const beeY = animLoop.noise({ radius: radY, seed: seedY }) * ampY
      createBee(beeX, beeY);
    }
    
    
    

  }
}


function createBee(beeX, beeY){
  //wings
    stroke(0);
    strokeWeight(1.5);
    fill(220, 222, 231);
    ellipse(beeX-15, beeY-37, 25, 30);
    fill(220, 242, 251);
    ellipse(beeX+5, beeY-35, 25, 30);
    
    //body and face
    fill(255, 158, 58);
    ellipse(beeX-30, beeY-25, 60, 50);
    fill(255, 210, 58);
    strokeWeight(0);
    ellipse(beeX - 25, beeY - 25, 50, 40);
    strokeWeight(2);
    
    //feet
    line(beeX-20, beeY+20 ,beeX-22, beeY+22);
    line(beeX-10, beeY+24 ,beeX-11, beeY+27);
    line(beeX+5, beeY+25 ,beeX+6, beeY+28);
    line(beeX+15, beeY+22 ,beeX+17, beeY+25);
    
    
    fill(0);
    circle(beeX + 5, beeY, 5);
    circle(beeX - 25, beeY, 5);
    strokeWeight(1);
    triangle(beeX+31, beeY+3, beeX+31, beeY-2, beeX+37, beeY);
    noFill();
    strokeWeight(3);
    bezier(beeX+10, beeY-22, beeX+20, beeY-10, beeX+20, beeY+10, beeX+10, beeY+22);
    bezier(beeX+20, beeY-18, beeX+27, beeY-10, beeX+27, beeY+10, beeX+20, beeY+18);
    
    fill(255, 210, 58);
      strokeWeight(2);
      arc(beeX - 13, beeY, 10, 10, TWO_PI, PI, OPEN);
}