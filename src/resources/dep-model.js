//dep-model.js
//
import {inject, customElement} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Validation,ValidationConfig} from 'aurelia-validation';
//
import {DataService} from '../data/services/dataservice';
import {UserInfo} from '../data/model/userinfo';
import {Departement} from '../data/domain/departement';
import {SigleNameBase} from './siglenameitem';
//
let currentLocale = 'fr-FR';
//
@customElement('dep-model')
@inject(EventAggregator,DataService,UserInfo,Validation,ValidationConfig)
export class DepartementsClass extends SigleNameBase {
	constructor(eventAggregator,dataService,userInfo,validation,validationConfig){
		super(eventAggregator,dataService,userInfo,new Departement());
		this.validation = validation;
		this.globalValidationConfig = validationConfig;
		this.globalValidationConfig.useLocale(currentLocale);
		this.validation.on(this)
			.ensure('sigle').isNotEmpty().hasLengthBetween(2,31);
		this.title = 'Départements';	
	}// constructor
	create_start_key(){
		return 'DEP-';
	}
	post_change_item(){
		var id  = (this.current_item !== null) ? this.current_item.id : null;
		this.eventAggregator.publish('infoMessage',{type:'departementid',value:id});
		super.update_menu();
  }// post_change_item
}// class DepartementsClass