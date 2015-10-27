var fs = require('fs');
var contacts = require("./contact_constructors.js");
var csvFile = fs.readFileSync("./friend_list.csv").toString();
var emailHTML = fs.readFileSync('./email_template.html', 'utf-8');
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
	var parsedCSV = new contacts.CSVObject(header, splitLines);
	return parsedCSV;
}

/*
Loops through a CSV Object and returns an array of objects
*/
function buildContactArray(csvObject) {
	var contactArray = [];

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
		contactArray.push(contact);
	};
	return contactArray;
}

// Main function
function main() {
	console.log(contactArray);
	return contactArray;
}

main();

