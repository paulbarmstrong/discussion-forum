/**
	DatabaseService
	
	Author: Paul Armstrong
	Description:
		DatabaseService will serve as a middleman between angular components
		and the database on the server.
		
		Until the server and database are configured this service will use
		hardcoded test values.
**/

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ForumComment, ForumThread } from './ForumThread';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	
	private httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
	
	constructor(private http: HttpClient) { }
		
	getForumThreads(): Observable<ForumThread[]> {
		return this.http.get<ForumThread[]>('http://discussion-forum.io/api/threads');
	}

	getForumThread(id: number): Observable<ForumThread> {
		return this.http.get<ForumThread>('http://discussion-forum.io/api/thread/'+id);
	}
	
	submitForumThread(newForumThread: ForumThread): Observable<string> {
		return this.http.post<string>('http://discussion-forum.io/api/submitThread', {forumThread: newForumThread,
				username: localStorage.getItem('username'), sessionId: localStorage.getItem('sessionId')}, this.httpOptions);
	}
	
	submitForumComment(newForumComment: ForumComment): Observable<string> {
		return this.http.post<string>('http://discussion-forum.io/api/submitComment',{forumComment: newForumComment,
				username: localStorage.getItem('username'), sessionId: localStorage.getItem('sessionId')}, this.httpOptions);
	}
		
	createAccount(newUser: Object): Observable<string> {
		return this.http.post<string>('http://discussion-forum.io/api/createAccount', newUser, this.httpOptions);
	}
	
	startSession(userInfo: Object): Observable<number> {
		return this.http.post<number>('http://discussion-forum.io/api/startSession', userInfo, this.httpOptions);
	}
	
	checkSession(sessionInfo: Object): Observable<boolean> {
		return this.http.post<boolean>('http://discussion-forum.io/api/checkSession', sessionInfo, this.httpOptions);
	}
	
	endSession(sessionInfo: Object): Observable<boolean> {
		return this.http.post<boolean>('http://discussion-forum.io/api/endSession', sessionInfo, this.httpOptions);
	}
}
