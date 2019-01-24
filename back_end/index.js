/**
	Backend Node Express Script
	
	Author: Paul Armstrong
	Description:
		This Node.js script uses express to respond to http requests from the front end
**/


const express = require('express');
const app = express();
app.use(express.json());

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
			date: 1548051899690,
			threadId: 0
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
			date: 1547904562932,
			threadId: 1
		},{
			author: 'User3',
			content: 'Fusce elementum risus justo. Suspendisse non ligula diam. Cras interdum condimentum consectetur. Ut ac ipsum a odio tincidunt porttitor. ',
			date: 1547906562932,
			threadId: 1
		}]
	}
];

var idCount = 2;

// Serve the webpage for valid paths
['/', '/submission', '/thread/:id'].map(str => app.use(str, express.static('/root/public_html')));

// Enable CORS (for testing locally)
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
	next();
});

// Handle the GET request for all forum threads
app.get('/api/threads', (req, res) => {
	res.send(JSON.stringify(forumThreads));
});

// Handle the GET request for a single forum thread
app.get('/api/thread/:id', (req, res) => {
	const id = req.params.id;
	const searchResults = forumThreads.filter(thread => thread.id == id);
	if (searchResults.length > 0) {
		res.send(JSON.stringify(searchResults[0]));
	}
});

// Handle the POST request to add a new forum thread
app.post('/api/submitThread', (req, res) => {
	var newForumThread = req.body;
	if (newForumThread) {
		newForumThread.id = idCount++;
		forumThreads.push(newForumThread);
	}
	res.send(newForumThread ? 'true' : 'false');
});

// Handle the POST request to add a new comment
app.post('/api/submitComment', (req, res) => {
	var newForumComment = req.body;
	var resultFlag = 'false'
	if (newForumComment && newForumComment.threadId !== undefined) {
		
		const searchResults = forumThreads.filter(thread => thread.id === newForumComment.threadId);
		
		// If the comment can be paired with an existing post, add it
		if (searchResults.length > 0) {
			searchResults[0].comments.push(newForumComment);
			resultFlag = 'true';
		}
	}
	res.send(resultFlag);
});


// Start listening for requests
app.listen(80, () => console.log('Listening...'));
