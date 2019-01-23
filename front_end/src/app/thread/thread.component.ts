/**
	ThreadComponent
	
	Author: Paul Armstrong
	Description:
		This component represents a forum thread's content.
	
**/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ForumComment, ForumThread } from '../ForumThread';
import { DatabaseService } from '../database.service';

@Component({
	selector: 'app-thread',
	templateUrl: './thread.component.html',
	styleUrls: []
})
export class ThreadComponent implements OnInit {
	
	forumThread: ForumThread;

	constructor(private route: ActivatedRoute, private databaseService: DatabaseService) { }

	ngOnInit() {
		this.getForumThread();
	}

	getForumThread(): void {
		var id = Number(this.route.snapshot.paramMap.get('id'));
		this.forumThread = this.databaseService.getForumThread(id);
	}
}
