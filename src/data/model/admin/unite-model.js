//unite-model.js
//
import {inject} from 'aurelia-framework';
//
import {DataService} from '../../services/dataservice';
import {UserInfo} from '../userinfo';
import {Unite} from '../../domain/unite';
import {DepSigleNameModel} from './depsiglenameitem';
//
//
@inject(DataService,UserInfo)
export class UniteModelClass extends DepSigleNameModel {
	constructor(dataService,userInfo){
		super(dataService,userInfo,new Unite());
		this.base_title = 'Unités';
	}// constructor
}// class UniteModelClass
