//userinfo.js
//
import {customElement, bindable} from 'aurelia-framework';
//
@customElement('user-info')
export class UserInfoElementClass  {
	@bindable dataModel;
	disconnect(){
		if ((dataModel !== undefined) && (dataModel !== null)){
			if (dataModel.disconnect !== undefined){
				dataModel.disconnect();
			}
		}
	}
}// class UserInfoElementClass
