//user-login.js
//
import {inject, customElement, computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Validation,ValidationConfig} from 'aurelia-validation';
//
import {DataService} from '../data/services/dataservice';
import {BaseElement} from './baseelement';
//
let currentLocale = 'fr-FR';
//
@customElement('user-login')
@inject(EventAggregator,DataService,Validation,ValidationConfig)
export class UserLogin extends BaseElement {
	constructor(eventAggregator,dataService,validation,validationConfig){
		super(eventAggregator,dataService);
		this.validation = validation;
		this.globalValidationConfig = validationConfig;
		this.username = null;
		this.password = null;
		this.globalValidationConfig.useLocale(currentLocale);
		this.validation.on(this)
			.ensure('username').isNotEmpty().hasLengthBetween(5,31)
			.ensure('password').isNotEmpty()
	}// constructor
	@computedFrom('username','password')
	get canConnect(){
		let x1 = (this.username !== null) ? this.username.trim() : null;
		let x2 = (this.password !== null) ? this.password.trim() : null;
		return (x1 !== null) && (x1.length > 0) && (x2 !== null) && (x2.length > 0);
	}// canConnect
	connect(){
		let x1 = (this.username !== null) ? this.username.trim() : null;
		let x2 = (this.password !== null) ? this.password.trim() : null;
		if ((x1 === null) || (x1.length < 1) || (x2 === null) || (x2.length  < 1)){
			return;
		}
		var self = this;
		var id = 'PER-' + x1.toLowerCase();
		this.dataService.get_item_by_id(id).then((pPers)=>{
			if ((pPers !== undefined) && (pPers !== null)){
				self.eventAggregator.publish('infoMessage',{type:'person',value:pPers});
			} else {
				self.errorMessage('Utilisateur inconnu...');
			}
		},(err)=>{
			if ((err !== undefined) && (err !== null)){
				if ((err.message !== undefined) && (err.message !== null)){
					self.errorMessage = err.message;
				} else {
					self.errorMessage = JSON.stringify(err);
				}
			}
		});
	}// connect
}// class UserLogin