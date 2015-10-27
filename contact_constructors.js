function Contact(first, last, timeSince, email) {
	this.firstName = first;
	this.lastName = last;
	this.numMonthsSinceContact = timeSince;
	this.emailAddress = email;
}

function CSVObject(header, arrayOfContacts) {
	this.header = header;
	this.arrayOfContacts = arrayOfContacts;
}

module.exports.Contact = Contact;
module.exports.CSVObject = CSVObject;