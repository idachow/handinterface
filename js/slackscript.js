// not currently used

var SlackBot = require('slackbots');

function slackMe() {

	console.log("AAA");

	// webhookUrl = "https://hooks.slack.com/services/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";

	var bot = new SlackBot({
	    token: 'xoxb-8068201271-MqFtLSMe5jzkCEriNAOZ9IrA', // Add a bot https://my.slack.com/services/new/bot and put the token 
	    name: 'My Bot'
	});

	bot.on('start', function() {
	    // more information about additional params https://api.slack.com/methods/chat.postMessage
	    var params = {
	        icon_emoji: ':cat:'
	    };

	    bot.postMessageToChannel('scripttest', 'meow!', params);
	    // bot.postMessageToUser('username', 'meow!', params);
	    // bot.postMessageToGroup('private_group', 'meow!', params);
	});
	
};