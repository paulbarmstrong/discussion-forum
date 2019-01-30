/**
	ThreadComponent
	
	Author: Paul Armstrong
	Description:
		This component represents a forum thread's content.
	
**/

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ForumComment, ForumThread } from '../ForumThread';
import { DatabaseService } from '../database.service';

@Component({
	selector: 'app-thread',
	templateUrl: './thread.component.html',
	styleUrls: []
})
export class ThreadComponent implements OnInit {
	
	@Input() commentText: string = "";
	
	message: string = '';
	
	signedIn: boolean = false;
	
	forumThread: ForumThread = {author: '', title: '', subtitle: '', date: 0, id: 0, views: 0, comments: []};

	constructor(private route: ActivatedRoute, private router: Router, private databaseService: DatabaseService, private location: Location) { }

	ngOnInit() {
		this.getForumThread();
		this.signedIn = localStorage.getItem('sessionId') !== null;
	}

	getForumThread(): void {
		var id = Number(this.route.snapshot.paramMap.get('id'));
		this.databaseService.getForumThread(id).subscribe(forumThread => this.forumThread = forumThread);
	}
	
	submitForumComment(): void {
		var id = Number(this.route.snapshot.paramMap.get('id'));
		
		// Create the new ForumComment object based on input and the current time
		if (this.commentText.length > 0 && id !== undefined) {
			this.databaseService.submitForumComment({
				author: localStorage.getItem('username'),
				content: this.commentText,
				date: Date.now(),
				threadId: id
			}).subscribe(message => {
				this.message = message;
				if (message.startsWith('Su')) {
					this.refreshComponent();
				}
			});
		}
	}
	
	refreshComponent(): void {
		const oldUrl = this.router.url.toString();
		this.router.navigateByUrl('/empty').then(() => {
			this.router.navigateByUrl(oldUrl);
		});
	}
}
