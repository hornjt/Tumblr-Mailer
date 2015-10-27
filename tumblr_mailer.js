var fs = require('fs');
var contacts = require("./contact_constructors.js");
var ejs = require('ejs');
var csvFile = fs.readFileSync("./friend_list.csv").toString();
var emailHTML = fs.readFileSync('./email_template.html', 'utf-8');
// var getTemplate = require("./email_template.ejs");
// var renderedTemplate = ejs.render(emailHTML);
//console.log(renderedTemplate);
var parsedCSV = csvParse(csvFile);
var contactArray = buildContactArray(parsedCSV);

/*
Will parse any CSV and return a parsed CSV Object
*/
function csvParse(file) {
	// Split each address line by line
	var splitLines = file.split("\n");

	// Remove extra element from \n
	splitLines.pop();

	// Remove the header and save if needed later
	var header = splitLines.shift().split(",");

	// Create CSV Object with parsed contact info
	var csv = new contacts.CSVObject(header, splitLines);
	return csv;
}

/*
Loops through a CSV Object and returns an array of objects
*/
function buildContactArray(csvObject) {
	var newArray = [];

	// Loop through the array of contacts
	for (var i = 0; i < csvObject.arrayOfContacts.length; i++) {
		// Parse the contact data
		var contactInfo = csvObject.arrayOfContacts[i].split(",");
		var contact = new contacts.Contact();
		for (var j = 0; j < contactInfo.length; j++) {
			// Add parsed data to new Contact
			contact[csvObject.header[j]] = contactInfo[j];
		};
		// Add new contact to the contact array
		newArray.push(contact);
	};
	return newArray;
}

function buildEmailEJS() {
	
	for (var i = 0; i < contactArray.length; i++) {
		console.log(ejs.render(emailHTML,contactArray[i]));
	};
}

function buildEmail_REPLACE_METHOD() {
	var emailArray = [];
	var firstName = /FIRST_NAME/gi;
	var monthsSince = /NUM_MONTHS_SINCE_CONTACT/gi;

	for (var i = 0; i < contactArray.length; i++) {
		console.log();
		console.log();
		var newName = (emailHTML.replace(firstName, contactArray[i].firstName));
		var newNameMonths = emailHTML.replace(monthsSince, contactArray[i].numMonthsSinceContact);
		console.log(newNameMonths);
		emailArray.push(newNameMonths);
	};
}

// Main function
function main() {
	//console.log(contactArray);
	//buildEmail();
	buildEmailEJS();
	//return contactArray;
}

main();

