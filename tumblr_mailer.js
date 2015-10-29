var fs = require('fs'),
tumblr = require('tumblr.js'),
contacts = require("./contact_constructors.js"),
mergeCsvContacts = require("./mergeCsvContacts");
csvFile = fs.readFileSync("./friend_list.csv").toString(),
emailBuilders = require("./emailBuilders.js"),
emailTemplate = fs.readFileSync('./email_template.ejs', 'utf-8'),
blogName = "atomicpizzarebel.tumblr.com",
postObjs = [],
contactsArray = [];
htmlList = [];

// Imports Tumblr API
var client = tumblr.createClient({
	consumer_key: 'OCFihagoU0ny5kMQmQf2wv1JCPYF2B3tzn0z92FL2ScA7QC3yH',
	consumer_secret: 'wSAyV8clgavD0B568hQdsUIV8FbOMnn6h0JIdlsM6oDJYxMlqb',
	token: 'COco5SgGolpXek4j1pjjzJRXhgl4q532rpfoqUMCKq1ZCJ89Dw',
	token_secret: 'rbXofHQ3u56Pww9o4Rrq4Z73y4Umh5rfMs77fkR4ehyF9JaWuc'
});

// Retrieves posts with titles and URLs from Tumblr
client.posts(blogName, function(err, data){
	var postBodies = [];

	if (err !== null) {
		console.log(err);
	} else {
		// Loops through the returned posts array
		for (var i = 0; i < data.posts.length; i++) {	
			var daysSince = getTimeElapsed(data.posts[i].date);

			if (daysSince <= 7) {
				var recentPosts = {
					href: data.posts[i].short_url,
					title: data.posts[i].title
				};
				postObjs.push(recentPosts);

				// var singlePost = data.posts[i].body.slice(3,-4);
				// postBodies.push(singlePost);
			}
		}
	}

	// Returns the time elapsed since the post
	function getTimeElapsed(time) {
		var oneDayInMs = 86400000;
		var now = Date.now();
		var then = Date.parse(time);
		return (now - then) / oneDayInMs;
	}

	// Builds email list, appends each email, and gets Tumblr post URLs
	// Executed at the end of Tumblr API for sync issues while constructing contact list
	contactsArray = mergeCsvContacts.csvParse(csvFile, postObjs);
	htmlList = emailBuilders.buildEmailEJS(contactsArray, emailTemplate);

	// Add property with the generated emails to the each persons contact object
	for (var i = 0; i < contactsArray.length; i++) {
		contactsArray[i].htmlEmail = htmlList[i];
	};

	// Last line of main
    emailBuilders.buildMandrillEmails(contactsArray, emailTemplate);
});




