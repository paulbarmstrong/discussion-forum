/**
	Angular Pipe: time-since
	
	Author: Paul Armstrong
	Description:
		A pipe which gives a string of the most significant
		figure of time elapsed between the given ms since epoch
		and the current time.

**/

import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'timeSince'})

export class TimeSincePipe implements PipeTransform {
	
	transform(input: any): string {
		const start = Number(input);
		const end = Date.now();
		const elapsedSeconds = (end-start) / 1000;
		
		const unitNames = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];
		const unitWeights = [1, 60, 3600, 86400, 604800, 2592000, 31556952];
		
		// Find the appropriate unit
		var i = 0;
		while (unitWeights[i] < elapsedSeconds && i < unitWeights.length) {
			i++;
		}
		i = i > 0 ? i - 1 : 0;
		
		// Create the output
		const unitQuantity = Math.max(Math.floor(elapsedSeconds / unitWeights[i]), 0);
		const unitString = unitNames[i] + (unitQuantity === 1 ? '' : 's');
		
		// Create the string
		return unitQuantity.toString() + ' ' + unitString;
		
	}
	
}