//userinfo.js
//
import {customElement, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
//
@customElement('user-info')
@inject(EventAggregator)
export class UserInfoClass {
	@bindable isConnected;
	@bindable fullname;
	@bindable hasPhoto;
	@bindable photoUrl;
	//
	constructor(eventAggregator){
		this.eventAggregator = eventAggregator;
		var self = this;
		this.isConnected = false;
		this.fullname = null;
		this.hasPhoto = false;
		this.photoUrl = null;
		this.eventAggregator.subscribe('personChanged',(msg) =>{
			self.isConnected = (msg.name !== null) && (msg.name.length > 0);
			self.fullname = msg.name;
			self.hasPhoto = (msg.url !== null);
			self.photoUrl = msg.url;
		});
	}// constructor
	disconnect(){
		if (window.confirm('Voulez-vous vraiment quitter?')){
			this.eventAggregator.publish('infoMessage',{type:'disconnect',value:null});
		}
	}// disconnect
}// class UserInfoClass
