//baseelement.js
import {computedFrom} from 'aurelia-framework';
//
export class BaseElement {
	constructor(eventAggregator,dataService,userInfo){
		this.eventAggregator = eventAggregator;
		this.dataService = dataService;
		this.userInfo = userInfo;
		this.errMessage = null;
		this.infoMessage = null;
		this.person = null;
		this.photoUrl = null;
		this.title = null;
		this.menu = [];
		let self = this;
		this.eventAggregator.subscribe('personChanged',(payload)=>{
			self.person = null;
			self.photoUrl = null;
			if ((payload !== undefined) && (payload !== null)){
				if (payload.data !== undefined){
					self.person = payload.data;
				}
				if (payload.url !== undefined){
					self.photoUrl = payload.url;
				}
			}
		});
	}// constructor
	activate(){
		return true;
	}
	update_title(){

	}// update_title
	update_menu(){

	}// update_menu
	@computedFrom('person')
	get isConnected(){
		let p = this.person;
		return (p !== undefined) && (p !== null) && (p.id !== indefined) &&
		(p.id !== null) && (p.rev !== undefined) && (p.rev !== null);
	}
	@computedFrom('photoUrl')
	get photoUrl(){
		return (this.photoUrl !== null);
	}
	@computedFrom('errorMessage')
	get hasErrorMessage(){
		return (this.errorMessage !== null) && (this.errorMessage.length > 0);
	}
	@computedFrom('infoMessage')
	get hasInfoMessage(){
		return (this.infoMessage !== null) && (this.infoMessage.length > 0);
	}
	clear_error(){
		this.errorMessage = null;
		this.hasInfoMessage = null;
	}
	set_error(err){
          if ((err !== undefined) && (err !== null)){
             if ((err.message !== undefined) && (err.message !== null)){
              this.errorMessage = err.message;
             } else if ((err.msg !== undefined) && (err.msg !== null)){
              this.errorMessage = err.msg;
             } else if ((err.reason !== undefined) && (err.reason !== null)){
              this.errorMessage = err.reason;
             } else {
              this.errorMessage = JSON.stringify(err);
             }
            } else {
              this.errorMessage = 'Erreur inconnue';
            }
          }// set_error
}// class UserLogin