/**
	NavbarComponent
	
	Author: Paul Armstrong
	Description:
		This component represents the navbar at the top of the site.
	
**/

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: []
})
export class NavbarComponent implements OnInit {

	constructor(private location: Location) { }

	ngOnInit() {
	}

	goBack(): void {
		this.location.back();
	}
}
