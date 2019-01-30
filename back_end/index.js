/**
	Backend Node Express Script
	
	Author: Paul Armstrong
	Description:
		This Node.js script uses express to respond to http requests from the front end
**/

var sqlite3 = require('sqlite3');
var express = require('express');
var crypto = require('crypto');
var dbUtility = require('./db-utility.js');
var emailUtility = require('./email-utility.js');


var app = express();
app.use(express.json());

// Open the database, close it on exit
var db = new sqlite3.Database('database.db');
process.on('exit', () => db.close());

// Key-Value Map to store sessions
var sessionMap = new Map();

// Serve the webpage for valid paths
['/', '/sign-in', '/create-account', '/thread/:id'].map(str => app.use(str, express.static('/root/public_html')));

// Enable CORS (for testing locally)
/*app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
	next();
});*/

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
	
	// Make sure the session is legit and user has permission to post
	if (req.body !== undefined && req.body.forumThread !== undefined && req.body.forumThread.id !== undefined
			&& sessionMap.has(Number(req.body.sessionId)) && sessionMap.get(Number(req.body.sessionId)) === req.body.username) {
		dbUtility.getUserByName(db, req.body.username, userInfo => {
			if (userInfo !== undefined && userInfo.permission > 0) {
				dbUtility.addThread(db, req.body.forumThread, result => {
					if (userInfo.permission < 3) {
						emailUtility.sendEmail('[My Email]', 'New Thread on Discussion Forum',
							'There is a new permission level '+userInfo.permission+
							' thread: <a href="discussion-forum.io/thread/'+result+'">\"'
							+req.body.forumThread.title+'\" - '+req.body.username+'</a>');
					}
					res.send(JSON.stringify(result > -1 ? 'Successfully created thread...' : 'Thread creation failed: Database problem.'))
				});
			} else {
				res.send(JSON.stringify('Thread creation failed: Insufficient Permissions.'));
			}
		});
	} else {
		res.send(JSON.stringify('You must sign-in to create a thread.'));
	}
});

// Handle the POST request to add a new comment
app.post('/api/submitComment', (req, res) => {
	
		// Make sure the session is legit and user has permission to comment
	if (req.body !== undefined && req.body.forumComment !== undefined && req.body.forumComment.threadId !== undefined
			&& sessionMap.has(Number(req.body.sessionId)) && sessionMap.get(Number(req.body.sessionId)) === req.body.username) {
		dbUtility.getUserByName(db, req.body.username, userInfo => {
			if (userInfo !== undefined && userInfo.permission > 0) {
				dbUtility.addComment(db, req.body.forumComment, result => {
				if (userInfo.permission < 3) {
					emailUtility.sendEmail('[My Email]', 'New Comment on Discussion Forum',
							'There is a new permission level '+userInfo.permission+
							' comment: <a href="discussion-forum.io/thread/'+req.body.forumComment.threadId+'">\"'
							+req.body.forumComment.content+'\" - '+req.body.username+'</a>');
				}
				res.send(JSON.stringify(result ? 'Successfully created comment...' : 'Comment creation failed: Database problem.'))});
			} else {
				res.send(JSON.stringify('Comment creation failed: Insufficient Permissions.'));
			}
		});
	} else {
		res.send(JSON.stringify('You must sign-in to create a comment.'));
	}
});

// Handle the POST request to create an account
app.post('/api/createAccount', (req, res) => {
	
	if (req.body && req.body.username !== undefined && req.body.password !== undefined
			&& req.body.username.match(/^[0-9a-zA-Z\-_]{3,30}$/) !== null
			&& req.body.password.match(/^[0-9a-zA-Z\-_!@#\$\%\^&\*]{3,30}$/) !== null) {
				
		// Create the salted pass hash
		req.body.salt = crypto.randomBytes(32).toString('hex');
		req.body.hash_pass = crypto.createHash('sha256').update(req.body.salt+req.body.password).digest('hex');
		
		dbUtility.createUser(db, req.body, result => res.send(JSON.stringify(result)));
	} else {
		res.send(JSON.stringify('Account creation failed: serverside input validation.'));
	}
});

// Handle the POST request for starting a session, return sessionId or -1
app.post('/api/startSession', (req, res) => {
	
	// Validate credentials
	dbUtility.getUserByName(db, req.body.username, userInfo => {
		if (userInfo !== undefined) {

			// Create the salted pass hash from the given password
			newHashPass = crypto.createHash('sha256').update(userInfo.salt+req.body.password).digest('hex');
			
			if (newHashPass === userInfo.hash_pass) {
				
				// If it checks out, create a session for the user and return the id
				var sessionId = Math.floor(Math.random() * 10000);
				while (sessionMap.has(sessionId)) {
					sessionId++;
				}
				sessionMap.set(sessionId, userInfo.username);
				res.send(JSON.stringify(sessionId));
			} else {
				res.send(JSON.stringify(-1));
			}
		} else {
			res.send(JSON.stringify(-1));
		}
	});
});

// Handle the POST request for checking on a session (given a sessionId and username), return boolean
app.post('/api/checkSession', (req, res) => {
	res.send(JSON.stringify(sessionMap.has(Number(req.body.sessionId)) && sessionMap.get(Number(req.body.sessionId)) === req.body.username));
});

// Handle the POST request for ending a session, return boolean of success
app.post('/api/endSession', (req, res) => {
	if (sessionMap.has(Number(req.body.sessionId)) && sessionMap.get(Number(req.body.sessionId)) === req.body.username) {
		sessionMap.delete(Number(req.body.sessionId));
		res.send(true);
	} else {
		res.send(false);
	}
});



// Start listening for requests
app.listen(80, () => console.log('Listening...'));

