var controllerOptions = {enableGestures: true};

Leap.loop(controllerOptions, function(frame) {

  var gestureOutput = document.getElementById("gestureData");
  var gestureString = "gesture:";

  if (frame.gestures.length > 0) {
    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];
      if(gesture.type == "circle") {
          console.log("circle recognized, refresh");
          window.location.reload(true);
          break;
      }
      if(gesture.type == "keyTap") {
          console.log("tap recognized, dingdong");
          slackpls();
          break;
      }
      if(gesture.type == "swipe") {
          var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);

          if(isHorizontal) {
            if(gesture.direction[0] > 0){
                  swipeDirection = "right";
              } else {
                  swipeDirection = "left";
              }
            console.log(swipeDirection + " --swipe recognized, link out");
            if(swipeDirection == "right") {
              window.open("calendardemo.html", "_self");
            }
            if (swipeDirection == "left") {
              window.open("linkto.html", "_self");
            }
          }
          break;
      }
    }
  }

});

