//dep-model.js
//
import {inject} from 'aurelia-framework';
import {Validation,ValidationConfig} from 'aurelia-validation';
//
import {DataService} from '../../services/dataservice';
import {UserInfo} from '../userinfo';
import {Departement} from '../../domain/departement';
import {SigleNameModel} from './siglenamebase';
//
//
@inject(DataService,UserInfo,Validation,ValidationConfig)
export class DepModelClass extends SigleNameModel {
	constructor(dataService,userInfo,validation,validationConfig){
		super(dataService,userInfo,validation,validationConfig,new Departement());
		this.validation.on(this)
			.ensure('sigle').isNotEmpty().hasLengthBetween(2,31);
		this.title = 'Départements';
	}// constructor
	post_change_item(){
		var id  = (this.current_item !== null) ? this.current_item.id : null;
		this.userInfo.departementid = id;
		this.update_menu();
  }// post_change_item
}// class DepModelClass
