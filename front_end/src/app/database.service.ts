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
	
	private forumThreads: ForumThread[] = [{
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
			author: 'User2',
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
	
	constructor(private http: HttpClient) { }
	
	getForumThreads(): Observable<ForumThread[]> {
		return this.http.get<ForumThread[]>('http://localhost:3000/threads');
	}

	getForumThread(id: number): ForumThread {
		return this.forumThreads.filter(thread => thread.id == id)[0];
	}
}
