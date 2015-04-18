//baseelement.js
import {
  computedFrom
}
from 'aurelia-framework';
//
export class BaseElement {
  constructor(eventAggregator, dataService, userInfo) {
      this.eventAggregator = eventAggregator;
      this.dataService = dataService;
      this.userInfo = userInfo;
      this.errorMessage = null;
      this.infoMessage = null;
      this.title = null;
      this.dispose_func = null;
      this.menu = [];
    } // constructor
  subscribe(){
  }// subscribe  
  unsubscribe(){
    if (this.dispose_func !== null){
      this.dispose_func();
      this.dispose_func = null;
    }
  }
  publish(channel,payload){
     if ((this.eventAggregator !== undefined) && (this.eventAggregator !== null)){
        this.eventAggregator.publish(channel, payload);
     }
  }
  activate() {
   // this.subscribe();
    return true;
  }
  deactivate(){
    this.unsubscribe();
  }
  update_title() {
    } // update_title
  update_menu() {
    } // update_menu
    @computedFrom('errorMessage')
  get hasErrorMessage() {
    return (this.errorMessage !== null) && (this.errorMessage.length > 0);
  }
  @computedFrom('infoMessage')
  get hasInfoMessage() {
    return (this.infoMessage !== null) && (this.infoMessage.length > 0);
  }
  clear_error() {
    this.errorMessage = null;
    this.hasInfoMessage = null;
  }
  set_error(err) {
      if ((err !== undefined) && (err !== null)) {
        if ((err.message !== undefined) && (err.message !== null)) {
          this.errorMessage = (err.message.length > 0) ? err.message : 'Erreur inconnue...';
        } else if ((err.msg !== undefined) && (err.msg !== null)) {
          this.errorMessage = (err.msg.length > 0) ? err.msg : 'Erreur inconnue...';
        } else if ((err.reason !== undefined) && (err.reason !== null)) {
          this.errorMessage = err.reason;
        } else {
          this.errorMessage = JSON.stringify(err);
        }
      } else {
        this.errorMessage = 'Erreur inconnue...';
      }
    } // set_error
} // class UserLogin
