/**
	Routing module generated by angular cli with some routes added.
**/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainForumComponent } from './main-forum/main-forum.component';
import { ThreadComponent } from './thread/thread.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CreateAccountComponent } from './create-account/create-account.component';

const routes: Routes = [
	{ path: '', component: MainForumComponent, pathMatch: 'full'},
	{ path: 'thread/:id', component: ThreadComponent},
	{ path: 'sign-in', component: SignInComponent},
	{ path: 'create-account', component: CreateAccountComponent},
	{ path: 'empty', component: ThreadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
