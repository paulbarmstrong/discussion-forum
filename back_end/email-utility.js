/**
	Email Utility Script
	
	Author: Paul Armstrong
	Description:
		This Node.js script is meant to abstract away the sending of emails
**/

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'discussionforumnotifications@gmail.com',
		pass: '[Not The Actual Password]'
	}
});


module.exports = {
	sendEmail: function (sendTo, subject, content) {
		transporter.sendMail({
			from: 'discussionforumnotifications@gmail.com',
			to: '[My Email]',
			subject: subject,
			html: content
		});
	}
};


