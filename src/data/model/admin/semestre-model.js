//semestre-model.js
//
import {inject} from 'aurelia-framework';
//
import {DataService} from '../../services/dataservice';
import {UserInfo} from '../userinfo';
import {Semestre} from '../../domain/semestre';
import {IntervalModel} from './intervalitem';
//
@inject(DataService,UserInfo)
export class SemestreModelClass extends IntervalModel {
	constructor(dataService,userInfo){
		super(dataService,userInfo,new Semestre());
		this.annee = null;
		this.base_title = 'Semestres';
	}// constructor
	activate(){
		let info = this.userInfo;
		let id = ((info !== undefined) && (info !== null)) ? info.anneeid : null;
		this.anneeid = id;
	}// activate
	create_item(){
		let p = this.dataService.create_item({type:this.modelItem.type,
			departementid: this.departementid, anneeid: this.anneeid});
		return p;
	}// create_item
	get anneeid(){
		return this.userInfo.anneeid;
	}
	set anneeid(s){
		let id = ((s !== undefined) && (s !== null)) ? s : null;
		this.modelItem.anneeid = id;
		this.userInfo.anneeid = id;
		if (id !== null){
			let self = this;
			this.dataService.get_item_by_id(id).then((an) =>{
				self.annee = ((an !== undefined) && (an !== null)) ? an : null;
				self.update_title();
			},(err)=>{
				self.annee = null;
				self.update_title();
			});
		} else {
			this.annee = null;
			self.update_title();
		}
	}
	post_change_item(){
		var id  = (this.current_item !== null) ? this.current_item.id : null;
		this.userInfo.semestreid = id;
		this.update_menu();
  }// post_change_item
}// class AnneesClass
