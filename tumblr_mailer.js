var fs = require('fs'),
ejs = require('ejs'),
tumblr = require('tumblr.js'),
contacts = require("./contact_constructors.js"),
mandrill = require("./mandrillFuncs.js"),
mergeCsvContacts = require("./mergeCsvContacts");
csvFile = fs.readFileSync("./friend_list.csv").toString(),
emailTemplate = fs.readFileSync('./email_template.ejs', 'utf-8'),
blogName = "atomicpizzarebel.tumblr.com",
postObjs = [],
contactArray = [];
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

	// Builds email list, appends each email, and gets Tumblr post URLs
	// Executed at the end of Tumblr API for sync issues while constructing contact
	contactArray = mergeCsvContacts.csvParse(csvFile, postObjs);
	htmlList = buildEmailEJS();

	for (var i = 0; i < contactArray.length; i++) {
		contactArray[i].htmlEmail = htmlList[i];
	};
	console.log(contactArray);
    buildMandrillEmails();
});


function buildMandrillEmails() {
	var toName = contactArray[0].firstName;
	var toEmail = contactArray[0].emailAddress;
	var fromName = "Jon Horn";
	var fromEmail = "jhorn85@gmail.com";
	var subject = "Check out my blog";
	var message = htmlList;
/*	console.log(toName);
	console.log(toEmail);
	console.log(fromName);
	console.log(fromEmail);
	console.log(subject);
	console.log(message);*/
}

function buildEmailEJS() {
	var htmlOut = [];
	for (var i = 0; i < contactArray.length; i++) {
		htmlOut.push(ejs.render(emailTemplate,contactArray[i]));
	};
	return htmlOut;
	/*fs.writeFile('./composedEmails.html', htmlOut, function(err) {
		if (err) return console.log(err);
		console.log("File written successful to composedEmails.html");
		console.log(htmlOut);
		return htmlOut;
	});*/
}

function getTimeElapsed(time) {
	var oneDayInMs = 86400000;
	var now = Date.now();
	var then = Date.parse(time);
	var diff = now - then;
	return diff / oneDayInMs;
}