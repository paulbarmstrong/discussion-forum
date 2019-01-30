/**
	CreateAccountComponent
	
	Author: Paul Armstrong
	Description:
		This component represents a form for creating an account for the site.

**/

import { Component, OnInit, Input } from '@angular/core';

import { DatabaseService } from '../database.service';

@Component({
	selector: 'app-create-account',
	templateUrl: './create-account.component.html',
	styleUrls: []
})
export class CreateAccountComponent implements OnInit {
	@Input() username: string = '';
	@Input() email: string = '';
	@Input() password: string = '';
	@Input() passwordAgain: string = '';
	
	message: string = '';

	constructor(private databaseService: DatabaseService) { }

	ngOnInit() {
	}
	
	// Match with the regular expression for the username
	usernameAccepted(): boolean {
		return this.username.match(/^[0-9a-zA-Z\-_]{3,30}$/) !== null;
	}
	
	// Match with the regular expression for the password
	passwordAccepted(): boolean {
		return this.password.match(/^[0-9a-zA-Z\-_!@#\$\%\^&\*]{3,30}$/) !== null;
	}
	
	createAccount(): void {
		this.databaseService.createAccount({
			username: this.username, email: this.email, password: this.password
		}).subscribe(result => this.message = result);
	}
}
