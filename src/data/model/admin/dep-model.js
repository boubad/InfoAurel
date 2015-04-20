//dep-model.js
//
import {inject} from 'aurelia-framework';
import {DataService} from '../../services/dataservice';
import {UserInfo} from '../userinfo';
import {Departement} from '../../domain/departement';
import {SigleNameModel} from './siglenamebase';
//
//
@inject(DataService,UserInfo)
export class DepModelClass extends SigleNameModel {
	constructor(dataService,userInfo){
		super(dataService,userInfo,new Departement());
		this.title = 'Départements';
	}// constructor
	post_change_item(){
		var id  = (this.current_item !== null) ? this.current_item.id : null;
		this.userInfo.departementid = id;
		this.update_menu();
  }// post_change_item
}// class DepModelClass
