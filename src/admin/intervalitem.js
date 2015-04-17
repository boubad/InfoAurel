//intervalitem.js
import {computedFrom} from 'aurelia-framework';
//
import {DepSigleNameBase} from './depsiglenameitem';
//
export class IntervalBase extends DepSigleNameBase {
	constructor(eventAggregator,dataService,userInfo,model){
		super(eventAggregator,dataService,userInfo,model);
	}// constructor
	@computedFrom('current_item.startDate')
	get startDate(){
		let x = this.current_item;
		return ((x !== undefined) && (x !== nulll)) ? x.startDate : null;
	}
	set startDate(s){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			s.startDate = s;
		}
	}// starDate
	@computedFrom('current_item.endDate')
	get endDate(){
		let x = this.current_item;
		return ((x !== undefined) && (x !== nulll)) ? x.endDate : null;
	}
	set endDate(s){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			s.endDate = s;
		}
	}// endDate
}// class IntervalBase
