/**
	Angular Pipe: SubmissionComponent
	
	Author: Paul Armstrong
	Description:
		This component represents the forum thread creation form.

**/

import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { DatabaseService } from '../database.service';


@Component({
	selector: 'app-submission',
	templateUrl: './submission.component.html',
	styleUrls: []
})
export class SubmissionComponent implements OnInit {

	@Input() title: string = '';
	@Input() subtitle: string = '';

	constructor(private databaseService: DatabaseService, private location: Location) { }

	ngOnInit() {
		
	}
	
	submitForumThread(): void {
		
		// Create the new ForumThread object based on input and the current time
		if (this.title.length > 0) {
			this.databaseService.submitForumThread({
				author: 'TempUser',
				title: this.title,
				subtitle: this.subtitle,
				date: Date.now(),
				id: 0,
				views: 0,
				comments: []
			}).subscribe(result => {
				if (result) this.location.back();
			});
		}
	}
}
