/**
	ForumThread and ForumComment
	
	Author: Paul Armstrong
	Description:
		Definition of classes used to store forum post information.

**/

export class ForumComment {
	author: string;
	content: string;
	date: number;
	threadId: number;
}

export class ForumThread {
	author: string;
	title: string;
	subtitle: string;
	date: number;
	id: number;
	views: number;
	comments: ForumComment[];
}