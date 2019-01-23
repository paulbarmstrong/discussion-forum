/**
	Backend Node Express Script
	
	Author: Paul Armstrong
	Description:
		This Node.js script uses express to respond to http requests from the front end
**/


const express = require('express');
const app = express();

// Hard coded definition of example threads
// This is a placeholder for until I add a database
var forumThreads = [{
		author: 'Paul',
		title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus convallis, '
			+'ipsum eu consequat lobortis, justo nisl varius arcu, a egestas urna massa ac tortor.',
		subtitle: 'Donec dictum aliquet sapien. Vestibulum ante ipsum primis?',
		date: 1547904951533,
		id: 0,
		views: 8,
		comments: [{
			author: 'TurtleMan',
			content: 'Suspendisse non ligula diam. Cras interdum condimentum consectetur.',
			date: 1548051899690
		}]
	},{
		author: 'User4',
		title: 'Nullam consectetur mattis nibh, vitae convallis neque accumsan quis.'
			+'Cras faucibus tincidunt dolor, eu pellentesque est molestie et.',
		subtitle: 'Quisque condimentum, turpis nec mattis fringilla, elit risus elementum ligula, at dignissim nibh ipsum bibendum nibh.',
		date: 1547903562932,
		id: 1,
		views: 14,
		comments: [{
			author: 'Paul',
			content: 'Quisque nec vehicula dolor, et ultrices dolor. Integer sit amet faucibus leo.',
			date: 1547904562932
		},{
			author: 'User3',
			content: 'Fusce elementum risus justo. Suspendisse non ligula diam. Cras interdum condimentum consectetur. Ut ac ipsum a odio tincidunt porttitor. ',
			date: 1547906562932
		}]
	}
];

// Allow CORS (only for when testing local, on server its already same origin)
app.use('/', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

// Handle the GET request for all forum threads
app.get('/threads', (req, res) => {
	res.send(JSON.stringify(forumThreads));
});

// Listen on port 3000 (for testing local)
app.listen(3000, () => console.log('Listening...'));
