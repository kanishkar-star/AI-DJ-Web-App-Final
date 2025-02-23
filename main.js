song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

rgb = 0;
function preload(){
    song = loadSound('music.mp3');
}

function setup(){
    canvas = createCanvas(600, 500,)
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotpose);
}

function modelLoaded(){
    console.log('PoseNet is Initialized');
}

function draw(){
    image(video, 0, 0, 600, 500);
    tint(rgb);
    rgb = color(random(255), random(255), random(255));

    fill(rgb);
    stroke(rgb);
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY < 100){
            document.getElementById('speed').innerHTML = 'Speed = 0.5';
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY < 200){
            document.getElementById('speed').innerHTML = 'Speed = 1';
            song.rate(1);
        }
        else if(rightWristY > 200 && rightWristY < 300){
            document.getElementById('speed').innerHTML = 'Speed = 1.5';
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY < 400){
            document.getElementById('speed').innerHTML = 'Speed = 2';
            song.rate(2);
    }
    else if(rightWristY > 400 && rightWristY < 500){
        document.getElementById('speed').innerHTML = 'Speed = 2.5';
        song.rate(2.5);
    
    }
    }
if(scoreLeftWrist > 0.2){   
    fill(rgb)
  noStroke();
  circle(leftWristX, leftWristY, 20);

  InNumberleft_wrist_y = Number(leftWristY);
  remove_decimals = floor(InNumberleft_wrist_y);
  volume = remove_decimals/500;
  document.getElementById('volume').innerHTML = "Volume = " + volume;
  song.setVolume(volume);
}


}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
    document.getElementById("play").innerHTML = 'Playing the Song';
    document.getElementById("play").style.background = 'red';
}

function gotpose(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('Left Wrist X = ' + leftWristX + ' Left Wrist Y = ' + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('Right Wrist X = ' + rightWristX + ' Right Wrist Y = ' + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}