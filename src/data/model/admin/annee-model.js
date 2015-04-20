//annee-model.js
//
import {inject, customElement} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Validation,ValidationConfig} from 'aurelia-validation';
//
import {DataService} from '../../services/dataservice';
import {UserInfo} from '../userinfo';
import {Annee} from '../../domain/annee';
import {IntervalModel} from './intervalitem';
//
@inject(DataService,UserInfo,Validation,ValidationConfig)
export class AnneeModelClass extends IntervalModel {
	constructor(dataService,userInfo,validation,validationConfig){
		super(dataService,userInfo,validation,validationConfig,new Annee());
		this.validation.on(this)
			.ensure('departementid').isNotEmpty()
			.ensure('sigle').isNotEmpty().hasLengthBetween(2,31)
			.ensure('startDate').isNotEmpty()
			.ensure('endDate').isNotEmpty();
		this.base_title = 'Années';
	}// constructor
	post_change_item(){
		var id  = (this.current_item !== null) ? this.current_item.id : null;
		this.userInfo.anneeid = id;
		super.update_menu();
  }// post_change_item
}// class AnneesClass
