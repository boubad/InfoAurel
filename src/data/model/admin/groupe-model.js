//groupe-model.js
//
import {inject} from 'aurelia-framework';
//
import {DataService} from '../../services/dataservice';
import {UserInfo} from '../userinfo';
import {Groupe} from '../../domain/groupe';
import {DepSigleNameModel} from './depsiglenameitem';
//
//
@inject(DataService,UserInfo)
export class GroupeModelClass extends DepSigleNameModel {
	constructor(dataService,userInfo){
		super(dataService,userInfo,new Groupe());
		this.base_title = 'Groupes';
	}// constructor
}// class GroupeModelClass
