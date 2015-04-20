//groupe-model.js
//
import {inject} from 'aurelia-framework';
import {Validation,ValidationConfig} from 'aurelia-validation';
//
import {DataService} from '../../services/dataservice';
import {UserInfo} from '../userinfo';
import {Groupe} from '../../domain/groupe';
import {DepSigleNameModel} from './depsiglenameitem';
//
//
@inject(DataService,UserInfo,Validation,ValidationConfig)
export class GroupeModelClass extends DepSigleNameModel {
	constructor(dataService,userInfo,validation,validationConfig){
		super(dataService,userInfo,validation,validationConfig,new Groupe());
		this.validation.on(this)
			.ensure('departementid').isNotEmpty()
			.ensure('sigle').isNotEmpty().hasLengthBetween(2,31);
		this.base_title = 'Groupes';
	}// constructor
}// class GroupeModelClass
