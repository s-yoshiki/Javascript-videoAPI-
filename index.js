var video = document.getElementById("world");
var info  = document.getElementById("info");
var global_url = "";

document.getElementById("draw").onclick = function(){
    try{
        drawVideo();
    }catch(e){
        alert(e);
    }
};


var localstream;

function start() {
    if (navigator.webkitGetUserMedia) {
        
        navigator.webkitGetUserMedia({
            audio: false,
            video: true
        }, function(stream) {
            localstream = stream;
            console.dir(stream.getVideoTracks()[0]);
            var url = window.webkitURL.createObjectURL(stream);
            video.src = url;
            global_url = url;
            info.innerHTML = url;
        }, function(error) {});
    
    } else if (navigator.mozGetUserMedia) {
        
        navigator.mozGetUserMedia({
            video: true
        }, function(stream) {
            video.mozSrcObject = stream;
            video.play();
            streaming = true;
        }, function(err) {
            alert("An error occured! " + err);
        });
        
    } else if (navigator.getUserMedia) {
        navigator.getUserMedia("audio, video", success, error);
    }
}



function drawVideo(){
    var video = document.getElementById("video");
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, 260, 260);
}
    

function stop() {
    if (video.mozSrcObject) {
        xvideo.pause();
        video.mozSrcObject = null;
    } else {
        if (localstream) {
            localstream.stop();
        }
    }
}