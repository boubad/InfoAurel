//annee-model.js
//
import {inject, customElement} from 'aurelia-framework';
//
import {DataService} from '../../services/dataservice';
import {UserInfo} from '../userinfo';
import {Annee} from '../../domain/annee';
import {IntervalModel} from './intervalitem';
//
@inject(DataService,UserInfo)
export class AnneeModelClass extends IntervalModel {
	constructor(dataService,userInfo){
		super(dataService,userInfo,new Annee());
		this.base_title = 'Années';
	}// constructor
	post_change_item(){
		var id  = (this.current_item !== null) ? this.current_item.id : null;
		this.userInfo.anneeid = id;
		super.update_menu();
  }// post_change_item
}// class AnneesClass
