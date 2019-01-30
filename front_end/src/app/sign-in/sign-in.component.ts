/**
	CreateAccountComponent
	
	Author: Paul Armstrong
	Description:
		This component represents a sign in form for the site.

**/

import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: []
})
export class SignInComponent implements OnInit {

	@Input() username: string = '';
	@Input() password: string = '';
	
	message: string = '';

	constructor(private databaseService: DatabaseService, private location: Location, private router: Router) { }

	ngOnInit() {
	}
	
	// Called when the submit button is pressed
	signIn(): void {
		this.databaseService.startSession({username: this.username, password: this.password}).subscribe(id => {
			this.message = id > -1 ? 'Successfully logged in...' : 'Incorrect username/password.';
			if (id > -1) {
				localStorage.setItem('username', this.username);
				localStorage.setItem('sessionId', id.toString());
				
				// Go back
				this.location.back();
			}
		});
	}
}
