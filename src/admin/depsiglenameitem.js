//depsiglenameitem.js
import {computedFrom} from 'aurelia-framework';
//
import {SigleNameBase} from './siglenameitem';
//
export class DepSigleNameBase extends SigleNameBase {
	constructor(eventAggregator,dataService,userInfo,model){
		super(eventAggregator,dataService,userInfo,model);
		this.parentid = null;
		this.departement = null;
		this.base_title = null;
	}// constructor
	activate(){
		let info = this.userInfo;
		let id = ((info !== undefined) && (info !== null)) ? info.departementid : null;
		this.departementid = id;
	}// activate
	@computedFrom('departement')
	get departementid(){
		return (this.departement !== null) ? this.departement.id : null;
	}
	set departementid(s){
		let id = ((s !== undefined) && (s !== null)) ? s : null;
		if (id !== null){
			let self = this;
			this.dataService.get_item_by_id(id).then((dep) =>{
				self.departement = ((dep !== undefined) && (dep !== null)) ? dep : null;
				self.update_title();
				self.userInfo.departementId = self.departementid;
			},(err)=>{
				self.departement = null;
				self.userInfo.departementId = self.departementid;
				self.update_title();
			});
		} else {
			this.departement = null;
			self.userInfo.departementId = self.departementid;
			this.update_title();
		}
	}// departementid
	create_item(){
		let p = this.dataService.create_item({type:this.modelItem.type});
		p.departementid = this.departementid;
		return p;
	}// create_item
	@computedFrom('departement')
	get departement_name(){
		return (this.departement !== null) ? this.departement.name : null;
	}
	@computedFrom('departement')
	get departement_sigle(){
		return (this.departement !== null) ? this.departement.sigle : null;
	}
	create_start_key(){
		let sRet = this.modelItem.base_prefix;
		let d = this.departementid;
		if (d !== null){
			sRet = sRet + '-' + d;
		}
		return sRet;
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
