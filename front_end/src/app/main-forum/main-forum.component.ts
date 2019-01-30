/**
	MainForumComponent
	
	Author: Paul Armstrong
	Description:
		This component represents the main forum thread list
	
**/

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ForumComment, ForumThread } from '../ForumThread';
import { DatabaseService } from '../database.service';

@Component({
	selector: 'app-main-forum',
	templateUrl: './main-forum.component.html',
	styleUrls: []
})
export class MainForumComponent implements OnInit {
	
	@Input() newTitle: string = '';
	@Input() newSubtitle: string = '';
	
	signedIn: boolean = false;
	message: string = '';
	
	forumThreads: ForumThread[] = [];

	constructor(private databaseService: DatabaseService, private router: Router) { }

	ngOnInit() {
		this.getForumThreads();
		this.signedIn = localStorage.getItem('sessionId') !== null;
	}
	
	getForumThreads(): void {
		this.databaseService.getForumThreads().subscribe(forumThreads => this.forumThreads = forumThreads);
	}
	
	submitForumThread(): void {
		
		// Create the new ForumThread object based on input and the current time
		if (this.newTitle.length > 0) {
			this.databaseService.submitForumThread({
				author: localStorage.getItem('username'),
				title: this.newTitle,
				subtitle: this.newSubtitle,
				date: Date.now(),
				id: 0,
				views: 0,
				comments: []
			}).subscribe(message => {
				this.message = message;
				if (message.startsWith('Su')) {
					this.refreshComponent();
				}
			});
		}
	}
	
	// Refresh the component by navigating to the empty page and back
	refreshComponent(): void {
		const oldUrl = this.router.url.toString();
		this.router.navigateByUrl('/empty').then(() => {
			this.router.navigateByUrl(oldUrl);
		});
	}
}
