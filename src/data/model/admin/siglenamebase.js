//siglenameitem.js
import {computedFrom} from 'aurelia-framework';
//
import {PagedViewModel} from './pagedviewmodel';
//
export class SigleNameModel extends PagedViewModel {
	constructor(dataService, userInfo,Validation,ValidationConfig,model){
		super(dataService, userInfo,Validation,ValidationConfig,model);
	}
	get sigle(){
		let x = this.current_item;
		return ((x !== undefined) && (x !== nulll)) ? x.sigle : null;
	}
	set sigle(s){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			x.sigle = s;
		}
	}
	get name(){
		let x = this.current_item;
		return ((x !== undefined) && (x !== nulll)) ? x.name : null;
	}
	set name(s){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			x.name = s;
		}
	}
	get description(){
		let x = this.current_item;
		return ((x !== undefined) && (x !== nulll)) ? x.description : null;
	}
	set description(s){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			x.description = s;
		}
	}
}// class SigleNameBase
