var contacts = require("./contact_constructors.js");
http = require('http');

/*
Will parse any CSV and return a parsed CSV Object
*/
function csvParse(file, posts) {
	// Split each address line by line
	var splitLines = file.split("\n");

	// Remove extra element from \n
	splitLines.pop();

	// Remove the header and save if needed later
	var header = splitLines.shift().split(",");

	// Create CSV Object with parsed contact info
	var csv = new contacts.CSVObject(header, splitLines);
	//console.log(csv);
	debugger;
	return buildContactArray(csv, posts);
}

/*
Loops through a CSV Object and returns an array of objects
*/
function buildContactArray(csvObject, posts) {
	var newArray = [];

	// Loop through the array of contacts
	for (var i = 0; i < csvObject.arrayOfContacts.length; i++) {
		// Parse the contact data
		var contactInfo = csvObject.arrayOfContacts[i].split(",");
		var contact = new contacts.Contact();
		for (var j = 0; j < contactInfo.length; j++) {
			// Add parsed data to new Contact
			contact[csvObject.header[j]] = contactInfo[j];
			contact["latestPosts"] = posts;
		};
		// Add new contact to the contact array
		newArray.push(contact);
	};
	debugger;
	return newArray;
}

module.exports.csvParse = csvParse;
// module.exports.buildContactArray = buildContactArray;