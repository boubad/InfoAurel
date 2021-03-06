//intervalitem.js
import {computedFrom} from 'aurelia-framework';
//
import {DepSigleNameModel} from './depsiglenameitem';
//
export class IntervalModel extends DepSigleNameModel {
	constructor(dataService, userInfo,model){
		super(dataService, userInfo,model);
	}// constructor
	get startDate(){
		let x = this.current_item;
		return ((x !== undefined) && (x !== null)) ? x.startDate : null;
	}
	set startDate(s){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			x.startDate = s;
		}
	}// starDate
	get endDate(){
		let x = this.current_item;
		return ((x !== undefined) && (x !== null)) ? x.endDate : null;
	}
	set endDate(s){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			x.endDate = s;
		}
	}// endDate
}// class IntervalBase
