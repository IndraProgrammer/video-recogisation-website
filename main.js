var status="";
var video="";
var object="";
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}
function  gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object=results;
    }
}
function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        console.log("i am inside if");
        objectdetector.detect(video,gotResults);
        for(i=0;i<object.length;i++){
            console.log("i am inside for loop")
        document.getElementById("status").innerHTML="status:objects detected";
        document.getElementById("numberofobjects").innerHTML="number of objects detected are  "+object.lenght;
        fill("#FF0000");
        percent=floor(object[i].confidence*100);
        text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke("#0000FF");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
function start(){
    objectdetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
}
function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
