function slackMe() {

	console.log("AAA");

	var moduleName = 'slack-node';
	require([moduleName], function(slackModule){
	    // do something with fooModule

		// var Slack = require(['slack-node']);

		console.log("BBB");

		webhookUrl = "https://hooks.slack.com/services/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";

		console.log("CCC");
		
		slack = new Slack();
		slack.setWebhook(webhookUrl);

		console.log("pre-function");

		slack.webhook({
		  channel: "#scripttest",
		  username: "webhookbot",
		  text: "This is posted to #scripttest from this site which doesnt work ."
		}, function(err, response) {
		  console.log(response);
		});
	})
};