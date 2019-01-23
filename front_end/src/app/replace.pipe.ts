/**
	Angular Pipe: replace
	
	Author: Paul Armstrong
	Description: A pipe which lets you replace a pattern in a string

**/

import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'replace'})

export class ReplacePipe implements PipeTransform {
	
	transform(input: string, pattern: string, replacement: string): string {
		return input.replace(pattern, replacement);
	}
	
}