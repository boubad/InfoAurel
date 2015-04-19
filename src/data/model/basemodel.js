//basemodel.js
import {
  computedFrom
}
from 'aurelia-framework';

//
import {BaseUserModel} from './baseusermodel';
//
const currentLocale = 'fr-FR';
//
export class BaseModel {
  constructor(dataService, userInfo,Validation,ValidationConfig) {
      this.dataService = dataService;
      this.userInfo = userInfo;
      this.validation = validation;
      this.globalValidationConfig = validationConfig;
      this.globalValidationConfig.useLocale(currentLocale);
      this.errorMessage = null;
      this.infoMessage = null;
      this.title = null;
      this.dispose_func = null;
      this.menu = [];
    } // constructor
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
