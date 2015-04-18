//welcome.js
//
import {inject, computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Validation,ValidationConfig} from 'aurelia-validation';
//
import {DataService} from './data/services/dataservice';
import {BaseElement} from './resources/baseelement';
import {UserInfo} from './data/model/userinfo';
//
let currentLocale = 'fr-FR';
//
@inject(EventAggregator,DataService,UserInfo,Validation,ValidationConfig)
export class WelcomeClass extends BaseElement {
	constructor(eventAggregator,dataService,userInfo,validation,validationConfig){
		super(eventAggregator,dataService,userInfo);
		this.validation = validation;
		this.globalValidationConfig = validationConfig;
		this.username = null;
		this.password = null;
		this._connnected = false;
	  this.globalValidationConfig.useLocale(currentLocale);
		this.validation.on(this)
			.ensure('username').isNotEmpty()
			.ensure('password').isNotEmpty();
    
	}// constructor
	activate(){
		super.activate();
	}
	get isConnected(){
		return this._connnected;
	}
	set isConnected(b){
		this._connnected = b;
	}
	get isNotConnected(){
		return (!this.isConnected);
	}
	@computedFrom('username','password')
	get canConnect(){
    if ((this.usename === undefined) || (this.password === undefined)){
      return false;
    }
		let x1 = (this.username !== null) ? this.username.trim() : null;
		let x2 = (this.password !== null) ? this.password.trim() : null;
    if ((x1 === null) || (x2 === null)){
      return (false);
    }
		return (x1.length > 0)  && (x2.length > 0);
	}// canConnect
  @computedFrom('canConnect')	
  get isDisabled(){
    return (!this.canConnect);
  }
	connect(){
		let x1 = (this.username !== null) ? this.username.trim() : null;
		let x2 = (this.password !== null) ? this.password.trim() : null;
		if ((x1 === null) || (x1.length < 1) || (x2 === null) || (x2.length  < 1)){
			return;
		}
		var self = this;
		var id = 'PER-' + x1.toLowerCase();
		var userinfo = this.userInfo;
		this.dataService.get_item_by_id(id).then((pPers)=>{
			if ((pPers !== undefined) && (pPers !== null)){
				self.isConnected = true;
				userinfo.person = pPers;
			} else {
				self.errorMessage = 'Utilisateur inconnu...';
			}
		},(err)=>{
			self.set_error(err);
		});
	}// connect
}// class Welcome
//
