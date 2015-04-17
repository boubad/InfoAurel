//unite-model.js
//
import {inject, customElement} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Validation,ValidationConfig} from 'aurelia-validation';
//
import {DataService} from '../data/services/dataservice';
import {UserInfo} from '../data/model/userinfo';
import {Unite} from '../data/domain/unite';
import {DepSigleNameBase} from './depsiglenameitem';
//
let currentLocale = 'fr-FR';
//
@inject(EventAggregator,DataService,UserInfo,Validation,ValidationConfig)
export class UnitesClass extends DepSigleNameBase {
	constructor(eventAggregator,dataService,userInfo,validation,validationConfig){
		super(eventAggregator,dataService,userInfo,new Unite());
		this.validation = validation;
		this.globalValidationConfig = validationConfig;
		this.globalValidationConfig.useLocale(currentLocale);
		this.validation.on(this)
			.ensure('departementid').isNotEmpty()
			.ensure('sigle').isNotEmpty().hasLengthBetween(2,31);
		this.base_title = 'Unités';
	}// constructor

	post_change_item(){
		var id  = (this.current_item !== null) ? this.current_item.id : null;
		this.eventAggregator.publish('infoMessage',{type:'uniteid',value:id});
		super.update_menu();
  }// post_change_item
}// class UnitesClass
