//profaffectation.js
import {computedFrom} from 'aurelia-framework';
//
import {MatiereWorkItem} from './matiereworkitem';
//
export class ProfAffectation extends MatiereWorkItem {
  constructor(oMap) {
    super(oMap);
    this.enseignantid = null;
    if ((oMap != undefined) && (oMap != null)) {
      if (oMap.enseignantid != undefined) {
        this.enseignantid = oMap.enseignantid;
      }
    }// oMap
  }// constructor
  get base_prefix() {
    return 'AFP';
  }
  create_id() {
    let d = (this.startDate !== null) ? this.startDate : new Date();
    let s = (d.toISOString()).substr(0,10);
    return this.base_prefix + '-' + this.semestreid + '-' + this.matiereid +
    '-' + this.enseignantid + '-' + this.groupeid + '-' + s;
  }// create_id
  //
  @computedFrom('enseignantid')
  get is_storeable() {
    let bRet = super.is_storeable && (this.enseignantid !== null);
    if (!bRet){
      return false;
    }
    if ((this.startDate !== null) && (this.endDate !== null)) {
      if (this.startDate.getTime() > this.endDate.getTime()) {
        return false;
      }
    } else if ((this.startDate !== null) || (this.endDate != null)) {
      return false;
    }
    return true;
  }
  to_map(oMap) {
    super.to_map(oMap);
      oMap.enseignantid = this.enseignantid;
  }// to_insert_map
  get type() {
    return 'profaffectation';
  }
  get collection_name() {
    return 'profaffectations';
  }
}// class ProfAffectation
