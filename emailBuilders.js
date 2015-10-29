var mandrill = require("./mandrillFuncs.js");
var ejs = require('ejs');

function buildMandrillEmails(contactsArray) {
	for (var i = 0; i < contactsArray.length; i++) {
		var toName = contactsArray[i].firstName;
		var toEmail = contactsArray[i].emailAddress;
		var fromName = "Jon Horn";
		var fromEmail = "jhorn85@gmail.com";
		var subject = "Check out my blog";
		var message = contactsArray[i].htmlEmail;
		mandrill.sendEmail(toName, toEmail, fromName, fromEmail, subject, message);
	};
}

function buildEmailEJS(contactsArray, emailTemplate) {
	var htmlOut = [];
	for (var i = 0; i < contactsArray.length; i++) {
		htmlOut.push(ejs.render(emailTemplate,contactsArray[i]));
	};
	return htmlOut;
	/*fs.writeFile('./composedEmails.html', htmlOut, function(err) {
		if (err) return console.log(err);
		console.log("File written successful to composedEmails.html");
		console.log(htmlOut);
		return htmlOut;
	});*/
}

module.exports.buildMandrillEmails = buildMandrillEmails;
module.exports.buildEmailEJS = buildEmailEJS;