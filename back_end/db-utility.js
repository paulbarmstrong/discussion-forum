/**
	Database Utility Script
	
	Author: Paul Armstrong
	Description:
		This Node.js script is meant to abstract away communications with the forum database
**/

var sqlite3 = require('sqlite3');
var HashMap = require('hashmap');
var Filter = require('bad-words');

var spaceFilter = new Filter({ placeHolder: ' ' });

module.exports = {
	
	// Calls callback with either the forumThread with the id, or undefined
	getThreadById: function (db, id, callback) {
		db.get('SELECT * FROM forum_threads WHERE id = ?', [id], (err, forumThread) => {
			if (forumThread !== undefined) {
				db.all('SELECT * FROM forum_comments WHERE threadId=?', [forumThread.id], (err, forumComments) => {
					forumThread.comments = forumComments;
					callback(forumThread);
				});
			} else {
				callback(forumThread);
			}
		});
	},
	
	// Calls callback with all of the threads in the db without also getting comments
	getAllThreads: function (db, withComments, callback) {
		db.all('SELECT * FROM forum_threads', (err, forumThreads) => {
			for (var i = 0; i < forumThreads.length; i++) {
				forumThreads[i].comments = [];
			}
			if (withComments) {
				db.all('SELECT * FROM forum_comments', (err, forumComments) => {
					callback(this.helperMatchComments(forumThreads, forumComments).reverse());
				});	
			} else {
				callback(forumThreads.reverse());
			}
		});
	},
	
	// Adds newThread to the db and calls callback with boolean of success
	addThread: function (db, newThread, callback) {
		
		db.all('SELECT * FROM id_count_table', (err, rows) => {
			var count = rows.length > 0 ? rows[0].count : 0;
			db.run('INSERT INTO forum_threads VALUES(?,?,?,?,?,?)',[
				spaceFilter.clean(newThread.author),
				spaceFilter.clean(newThread.title),
				spaceFilter.clean(newThread.subtitle),
				newThread.date,
				count,
				newThread.views
			], err => callback(!err));
			db.run('UPDATE id_count_table SET count=?', [count+1]);
		});
	},
	
	// Adds newComment to the db and calls callback with boolean of success
	addComment: function (db, newComment, callback) {
		db.run('INSERT INTO forum_comments VALUES(?,?,?,?)',[
			spaceFilter.clean(newComment.author),
			spaceFilter.clean(newComment.content),
			newComment.date,
			newComment.threadId
		], err => callback(!err));
	},
	
	// Helper function to match the comments to each forum thread with constant runtime
	helperMatchComments: function (forumThreads, forumComments) {
	
		// Map each thread's id to an empty array
		var commentMap = new HashMap();
		for (var i = 0; i < forumThreads.length; i++) {
			commentMap.set(forumThreads[i].id, []);
		}
		
		// Put each comment into the correct array
		for (var i = 0; i < forumComments.length; i++) {
			if (!commentMap.has(forumComments[i].threadId)) {
				commentMap.set(forumComments[i].threadId, [forumComments[i]]);
			} else {
				commentMap.get(forumComments[i].threadId).push(forumComments[i]);
			}
		}
		
		// Set each thread's comments from the array of comments in the map
		for (var i = 0; i < forumThreads.length; i++) {
			forumThreads[i].comments = commentMap.get(forumThreads[i].id);
		}
		
		return forumThreads;
	}
}
