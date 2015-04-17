//groupe-model.js
//
import {inject, customElement} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Validation,ValidationConfig} from 'aurelia-validation';
//
import {DataService} from '../data/services/dataservice';
import {UserInfo} from '../data/model/userinfo';
import {Groupe} from '../data/domain/groupe';
import {DepSigleNameBase} from './depsiglenameitem';
//
let currentLocale = 'fr-FR';
//
@customElement('groupe-model')
@inject(EventAggregator,DataService,UserInfo,Validation,ValidationConfig)
export class GroupesClass extends DepSigleNameBase {
	constructor(eventAggregator,dataService,userInfo,validation,validationConfig){
		super(eventAggregator,dataService,userInfo,new Groupe());
		this.validation = validation;
		this.globalValidationConfig = validationConfig;
		this.globalValidationConfig.useLocale(currentLocale);
		this.validation.on(this)
			.ensure('sigle').isNotEmpty().hasLengthBetween(2,31);
		this.base_title = 'Groupes';	
	}// constructor

	post_change_item(){
		var id  = (this.current_item !== null) ? this.current_item.id : null;
		this.eventAggregator.publish('infoMessage',{type:'groupeid',value:id});
		super.update_menu();
  }// post_change_item
}// class GroupesClass