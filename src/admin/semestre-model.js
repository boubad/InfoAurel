//semestre-model.js
//
import {inject, customElement} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Validation,ValidationConfig} from 'aurelia-validation';
//
import {DataService} from '../data/services/dataservice';
import {UserInfo} from '../data/model/userinfo';
import {Semestre} from '../data/domain/semestre';
import {IntervalBase} from './intevalbase';
//
let currentLocale = 'fr-FR';
//
@inject(EventAggregator,DataService,UserInfo,Validation,ValidationConfig)
export class SemestreClass extends IntervalBase {
	constructor(eventAggregator,dataService,userInfo,validation,validationConfig){
		super(eventAggregator,dataService,userInfo,new Groupe());
		this.validation = validation;
		this.globalValidationConfig = validationConfig;
		this.globalValidationConfig.useLocale(currentLocale);
		this.annee = null;
		this.validation.on(this)
			.ensure('departementid').isNotEmpty()
			.ensure('anneeid').isNotEmpty()
			.ensure('sigle').isNotEmpty().hasLengthBetween(2,31);
		this.base_title = 'Semestre';
	}// constructor
	activate(params){
		var id = ((params !== undefined) && (params !== null) &&
			(params.id !== undefined)) ? params.id : null;
		if (id === null){
			let info = this.userInfo;
		    let id = ((info !== undefined) && (info !== null)) ? info.anneeid : null;
		    this.anneeid = id;
		    }
		this.anneeid = id;
	}// acti
	@computedFrom('annee')
	get anneeid(){
		return (this.annee !== null) ? this.annee.id : null;
	}
	set anneeid(s){
		let id = ((s !== undefined) && (s !== null)) ? s : null;
		if (id !== null){
			let self = this;
			this.dataService.get_item_by_id(id).then((an) =>{
				self.annee = ((an !== undefined) && (an !== null)) ?
				 an : null;
				self.update_title();
				self.userInfo.anneeid = self.anneeid;
			},(err)=>{
				self.annee = null;
				self.userInfo.anneeid = null;
				self.update_title();
			});
		} else {
			this.annee = null;
			self.userInfo.anneeid = null;
			this.update_title();
		}
	}// departementid
	create_item(){
		let p = this.dataService.create_item({type:this.modelItem.type});
		p.departementid = this.departementid;
		return p;
	}// create_item
	post_change_item(){
		var id  = (this.current_item !== null) ? this.current_item.id : null;
		this.eventAggregator.publish('infoMessage',{type:'semestreid',value:id});
		super.update_menu();
  }// post_change_item
}// class AnneesClass
