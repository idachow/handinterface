function slackpls(){
	myInput = prompt("Please enter channel");
	  $.getScript("js/slacking.js", function() {
	    console.log("slacking accessed");
  	});
};
