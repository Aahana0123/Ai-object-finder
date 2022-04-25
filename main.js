video = "";
status = "";
object = [];

function preload(){
video = createVideo("video.mp4");
video.hide();
}
function setup(){
canvas = createCanvas(380 , 380);
canvas.center();
}
function start(){
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status = Objects Detecting";
}
function modelLoaded(){
    console.log("Model Loaded!");
status = true;
video.loop();
video.volume(0);
video.speed(1);
}

function gotResult(error , results){
    if (error) {
        console.log("Error!");
    }
    else {
        console.log(results);
        object = results;
    }
}


function draw(){
    image(video , 0 , 0 , 380 , 380);

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        
        
            objectDetector.detect(video , gotResult);
            for (i = 0; i < object.length; i++) {
                fill(r , g , b)
                percent = floor(object[i].confidence*100);
                text(object[i].label + " " + percent + "%" , object[i].x-10, object[i].y-10);
                noFill();
                stroke(r , g , b);
                rect(object[i].x , object[i].y , object[i].width , object[i].height);
                document.getElementById("status").innerHTML = "Status = Object detected";
                document.getElementById("objects_detected").innerHTML = "Number of objects detected are = " + object.length;
        
                }
        }
    }

     

