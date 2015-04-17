//userinfo.js
//
import {inject, customElement, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
//
@customElement('user-info')
@inject(EventAggregator)
export class UserInfoClass {
	@bindable fullname;
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
			let name = null;
			let url = null;
			if ((msg !== undefined) && (msg !== null)){
				if ((msg.data !== undefined) && (msg.data !== null)){
					let p = msg.data;
					name = p.fullname;
				}
				if (msg.url !== undefined){
					url = msg.url;
				}
			}
			self.isConnected = (name !== null);
			self.fullname = name;
			self.hasPhoto = (url !== null);
			self.photoUrl = url;
		});
	}// constructor
	disconnect(){
		if (window.confirm('Voulez-vous vraiment quitter?')){
			this.eventAggregator.publish('infoMessage',{type:'disconnect',value:null});
		}
	}// disconnect
}// class UserInfoClass
