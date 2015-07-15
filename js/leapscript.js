var controllerOptions = {enableGestures: true};

Leap.loop(controllerOptions, function(frame) {

  var gestureOutput = document.getElementById("gestureData");
  var gestureString = "gesture:";

  if (frame.gestures.length > 0) {
    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];
      switch (gesture.type) {
        case "circle":
          // refresh screen
          console.log("circle recognized, refresh");
          window.location.reload(true);
          break;
        case "swipe":
          console.log("swipe recognized, link out");
          window.open("linkto.html","_self");
          break;
        case "keyTap":
          console.log("tap recognized, link back");
          window.open("calendardemo.html", "_self");
          break;
      }
    }
  }

});