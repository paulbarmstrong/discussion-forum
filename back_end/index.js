/**
	Backend Node Express Script
	
	Author: Paul Armstrong
	Description:
		This Node.js script uses express to respond to http requests from the front end
**/

var sqlite3 = require('sqlite3');
var express = require('express');
var dbUtility = require('./db-utility.js');

var app = express();
app.use(express.json());

// Open the database, close it on exit
var db = new sqlite3.Database('database.db');
process.on('exit', () => db.close());

// Serve the webpage for valid paths
['/', '/submission', '/thread/:id'].map(str => app.use(str, express.static('/root/public_html')));

// Enable CORS (for testing locally)
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
	next();
});

// Handle the GET request for all forum threads WITH comments
app.get('/api/threads', (req, res) => {	
	dbUtility.getAllThreads(db, true, forumThreads => res.send(JSON.stringify(forumThreads)));
});

// Handle the GET request for all forum threads WITHOUT comments
app.get('/api/threadsNoComments', (req, res) => {	
	dbUtility.getAllThreads(db, false, forumThreads => res.send(JSON.stringify(forumThreads)));
});

// Handle the GET request for a single forum thread
app.get('/api/thread/:id', (req, res) => {
	dbUtility.getThreadById(db, req.params.id, forumThread => {
		res.send(JSON.stringify(forumThread));
	});
});

// Handle the POST request to add a new forum thread
app.post('/api/submitThread', (req, res) => {
	dbUtility.addThread(db, req.body, result => res.send(result ? true : false));
});

// Handle the POST request to add a new comment
app.post('/api/submitComment', (req, res) => {
	if (req.body && req.body.threadId !== undefined) {
		dbUtility.addComment(db, req.body, result => res.send(result ? 'true' : 'false'));
	} else {
		res.send('false');
	}
});

// Start listening for requests
app.listen(80, () => console.log('Listening...'));

