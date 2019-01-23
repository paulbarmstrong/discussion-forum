/**
	MainForumComponent
	
	Author: Paul Armstrong
	Description:
		This component represents the main forum thread list
	
**/

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ForumComment, ForumThread } from '../ForumThread';
import { DatabaseService } from '../database.service';

@Component({
	selector: 'app-main-forum',
	templateUrl: './main-forum.component.html',
	styleUrls: []
})
export class MainForumComponent implements OnInit {
	
	forumThreads: ForumThread[];

	constructor(private databaseService: DatabaseService) { }

	ngOnInit() {
		this.getForumThreads();
	}
	
	getForumThreads(): void {
		this.databaseService.getForumThreads().subscribe(forumThreads => this.forumThreads = forumThreads);
	}
	
}
