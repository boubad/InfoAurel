//sessionstore.js
//
export class SessionObjectStore {
  constructor() {
  }// constructor
  get_value(key){
    let vRet = null;
    if ((key !== undefined) && (key !== null)) {
      let skey = key.trim().toLowerCase();
      if (skey.length > 0) {
         vRet = window.sessionStorage.getItem(skey);
         if ((vRet !== null) && (vRet == "null")){
            vRet = null;
         }
      }// skey
    }// exists
    return vRet;
  }// get_value
  store_value(key, value) {
    let bRet = null;
    if ((key !== undefined) && (key !== null)) {
      let skey = key.trim().toLowerCase();
      if (skey.length > 0) {
          try {
            window.sessionStorage.setItem(skey,value);
          } catch (e) {
            console.log('SessionObjectStore error: ' + e.toString());
          }
      }// skey
    }// exists
    return bRet;
  }// store_value
  remove_value(key) {
    return this.store_value(key, null);
  }// remove_value
}// class SessionObjectStore

