//sessionstore.js
//
let bExists = (window.sessionStorage !== undefined) &&
  (window.sessionStorage !== null);
//
export class SessionObjectStore {
  constructor() {
  }// constructor
  get_value(key){
    let vRet = null;
    if (bExists && (key !== undefined) && (key !== null)) {
      let skey = key.trim().toLowerCase();
      if (skey.length > 0) {
        vRet = window.sessionStorage.getItem(skey);
      }// skey
    }// exists
    return vRet;
  }// get_value
  store_value(key, value) {
    let bRet = null;
    if (bExists && (key !== undefined) && (key !== null)) {
      let skey = key.trim().toLowerCase();
      if (skey.length > 0) {
        if ((value !== undefined) && (value !== null)) {
          try {
            window.sessionStorage.setItem(skey, value);
            bRet = value;
          } catch (e) {
            console.log('SessioObjectStore error: ' + e.toString());
          }
        } else {
          if (window.sessionStorage.getItem(skey) !== null) {
            window.sessionStorage.removeItem(skey);
          }
        }
      }// skey
    }// exists
    return bRet;
  }// store_value
  remove_value(key) {
    return this.store_value(key, null);
  }// remove_value
}// class SessionObjectStore

