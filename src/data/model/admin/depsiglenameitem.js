//depsiglenameitem.js
import {computedFrom} from 'aurelia-framework';
//
import {SigleNameModel} from './siglenamebase';
//
export class DepSigleNameModel extends SigleNameModel {
	constructor(dataService, userInfo,Validation,ValidationConfig,model){
		super(dataService, userInfo,Validation,ValidationConfig,model);
		this.departement = null;
		this.base_title = null;
	}// constructor
	activate(){
		let info = this.userInfo;
		let id = ((info !== undefined) && (info !== null)) ? info.departementid : null;
		this.departementid = id;
	}// activate
	update_departement(){
		 this.update_title();
    if (this.elements.length < 1){
			this.refreshAll();
		}
	}// update_departement
	get departementid(){
		return this.userInfo.departementid;
	}
	set departementid(s){
		let id = ((s !== undefined) && (s !== null)) ? s : null;
		this.modelItem.departementid = id;
		this.userInfo.departementid = id;
		if (id !== null){
			let self = this;
			this.dataService.get_item_by_id(id).then((dep) =>{
				self.departement = ((dep !== undefined) && (dep !== null)) ? dep : null;
				self.update_departement();
			},(err)=>{
				self.departement = null;
				self.update_departement();
			});
		} else {
			this.departement = null;
			self.update_departement();
		}
	}// departementid
	create_item(){
		let p = this.dataService.create_item({type:this.modelItem.type,
			departementid: this.departementid});
		return p;
	}// create_item
	get departement_name(){
		return (this.departement !== null) ? this.departement.name : null;
	}
	get departement_sigle(){
		return (this.departement !== null) ? this.departement.sigle : null;
	}
	create_start_key(){
		return this.modelItem.start_key;
	}//create_start_key
	update_title(){
		let sRet = this.base_title;
		let d = this.departement_name;
		if (d !== null){
			sRet = sRet + ' ' + d;
		}
		this.title = sRet;
	}
}// class DepSigleNameBase
