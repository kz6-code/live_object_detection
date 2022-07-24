objectDetector = ";"

function setup(){
    canvas = createCanvas(380, 380)
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}


let input = document.getElementById("input_thing");
let amount;
let no_yes =document.getElementById("true_") ;
img="";
status = "";
objects = [];

function preload(){
    img = loadImage('dog_cat.jpg');
}


function gotResult(error, results) {
    if(error){
        console.log(error);
    }

    objects = results;
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status != ""){

        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++){
        
            document.getElementById("status").innerHTML = "Status : Objects Detetced";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            amount = text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }

    if( input === amount){
        document.getElementById("true_").innerHTML = input + " was found"
    }else{
        document.getElementById("true_").innerHTML = input + " was not found"
    }

}

function modelLoaded(){
    console.log("MODEL HAS BEEN LOADED WOOOOOOOOOOOOOOOOOO!!!!!!!!!!!")
    status = true;
    objectDetector.detect(video, gotResult)
}

