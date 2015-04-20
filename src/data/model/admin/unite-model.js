//unite-model.js
//
import {inject} from 'aurelia-framework';
import {Validation,ValidationConfig} from 'aurelia-validation';
//
import {DataService} from '../../services/dataservice';
import {UserInfo} from '../userinfo';
import {Unite} from '../../domain/unite';
import {DepSigleNameModel} from './depsiglenameitem';
//
//
@inject(DataService,UserInfo,Validation,ValidationConfig)
export class UniteModelClass extends DepSigleNameModel {
	constructor(dataService,userInfo,validation,validationConfig){
		super(dataService,userInfo,validation,validationConfig,new Unite());
		this.validation.on(this)
			.ensure('departementid').isNotEmpty()
			.ensure('sigle').isNotEmpty().hasLengthBetween(2,31);
		this.base_title = 'Unités';
	}// constructor
}// class UniteModelClass
