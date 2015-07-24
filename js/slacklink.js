function slackpls(){
	channelInput = prompt("Please enter channel");
	messageInput = prompt("Please enter message");
  	$.getScript("js/slacking.js", function() {
	    console.log("slacking accessed");
  	});
};
