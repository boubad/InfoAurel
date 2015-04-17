//siglenameitem.js
import {computedFrom} from 'aurelia-framework';
//
import {ItemBase} from './itembase';
//
export class SigleNameBase extends ItemBase {
	constructor(eventAggregator,dataService,userInfo,model){
		super(eventAggregator,dataService,userInfo,model);
	}
	get sigle(){
		let x = this.current_item;
		return ((x !== undefined) && (x !== nulll)) ? x.sigle : null;
	}
	set sigle(s){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			s.sigle = s;
		}
	}
	get name(){
		let x = this.current_item;
		return ((x !== undefined) && (x !== nulll)) ? x.name : null;
	}
	set name(s){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			s.name = s;
		}
	}
	get description(){
		let x = this.current_item;
		return ((x !== undefined) && (x !== nulll)) ? x.description : null;
	}
	set description(s){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			s.description = s;
		}
	}
}// class SigleNameBase