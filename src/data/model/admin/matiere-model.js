//matiere-model.js
//
import {inject} from 'aurelia-framework';
import {Validation,ValidationConfig} from 'aurelia-validation';
//
import {DataService} from '../../services/dataservice';
import {UserInfo} from '../userinfo';
import {Matiere} from '../../domain/matiere';
import {DepSigleNameModel} from './depsiglenameitem';
//
@inject(DataService,UserInfo,Validation,ValidationConfig)
export class MatiereModelClass extends DepSigleNameModel {
	constructor(dataService,userInfo,validation,validationConfig){
		super(dataService,userInfo,validation,validationConfig,new Semestre());
		this.unite = null;
		this.validation.on(this)
			.ensure('departementid').isNotEmpty()
			.ensure('uniteid').isNotEmpty()
			.ensure('sigle').isNotEmpty().hasLengthBetween(2,31);
		this.base_title = 'Matières';
	}// constructor
	activate(){
		let info = this.userInfo;
		let id = ((info !== undefined) && (info !== null)) ? info.anneeid : null;
		this.uniteid = id;
	}// activate
	create_item(){
		let p = this.dataService.create_item({type:this.modelItem.type,
			departementid: this.departementid, uniteid: this.uniteid});
		return p;
	}// create_item
	get uniteid(){
		return this.userInfo.uniteid;
	}
	set uniteid(s){
		let id = ((s !== undefined) && (s !== null)) ? s : null;
		this.modelItem.uniteid = id;
		this.userInfo.uniteid = id;
		if (id !== null){
			let self = this;
			this.dataService.get_item_by_id(id).then((an) =>{
				self.unite = ((an !== undefined) && (an !== null)) ? an : null;
				self.update_title();
			},(err)=>{
				self.unite = null;
				self.update_title();
			});
		} else {
			this.unite = null;
			self.update_title();
		}
	}
	post_change_item(){
		var id  = (this.current_item !== null) ? this.current_item.id : null;
		this.userInfo.uniteid = id;
		this.update_menu();
  }// post_change_item
  get genre(){
		let x = this.current_item;
		return ((x !== undefined) && (x !== nulll)) ? x.genre : null;
	}
 set genre(s){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			x.genre = s;
		}
	}
	get mat_module(){
		let x = this.current_item;
		return ((x !== undefined) && (x !== nulll)) ? x.mat_module : null;
	}
 set mat_module(s){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			x.mat_module = s;
		}
	}
	get coefficient(){
		let x = this.current_item;
		return ((x !== undefined) && (x !== nulll)) ? x.coefficient : null;
	}
 set coefficient(s){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			x.coefficient = s;
		}
	}
	get ecs(){
		let x = this.current_item;
		return ((x !== undefined) && (x !== nulll)) ? x.ecs : null;
	}
 set ecs(s){
		let  x = this.current_item;
		if ((x !== undefined) && (x !== null)){
			x.ecs = s;
		}
	}
}// class AnneesClass
