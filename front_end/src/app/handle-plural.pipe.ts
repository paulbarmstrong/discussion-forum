/**
	Angular Pipe: handle-plural
	
	Author: Paul Armstrong
	Description:
		A pipe which does its best to put the provided word after
		the provided quantity while handling plurality.

**/

import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'handlePlural'})

export class HandlePluralPipe implements PipeTransform {
	
	transform(quantity: any, word: string): string {
		
		if (Number(quantity) === 1) {
			return quantity.toString() + " " + word;
		} else {
			return quantity.toString() + " " + (word.endsWith('y') ? word.slice(0, word.length - 1) + 'ies' : word + 's');
		}

	}
	
}