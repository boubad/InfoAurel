//home.js
//
import {inject, computedFrom} from 'aurelia-framework';
import {Validation,ValidationConfig} from 'aurelia-validation';
import {DataService} from '../services/dataservice';
import {UserInfo} from './userinfo';
import {BaseModel} from './basemodel';
//
@inject(DataService,UserInfo,Validation,ValidationConfig)
export class HomeClass extends BaseModel {
	constructor(dataService,userInfo,validation,validationConfig){
		super(dataService,userInfo,validation,validationConfig);
		this.username = null;
		this.password = null;
		this.validation.on(this)
			.ensure('username').isNotEmpty()
			.ensure('password').isNotEmpty();
    
	}// constructor
	get personid(){
		return this.userInfo.personid;
	}
	set personid(s){
		this.userInfo.personid = s;
	}
	get isConnected(){
		return (this.personid !== null);
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
				self.userInfo.person = pPers;
				let dummy = self.isConnected || self.isNotConnected;
			} else {
				self.errorMessage = 'Utilisateur inconnu...';
			}
		},(err)=>{
			self.set_error(err);
		});
	}// connect
}// class Welcome
//
