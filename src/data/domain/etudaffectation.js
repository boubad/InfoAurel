//etudaffectation.js
import {computedFrom} from 'aurelia-framework';
//
import {DepWorkItem} from './depworkitem';
//
export class EtudAffectation extends DepWorkItem {
  constructor(oMap) {
    super(oMap);
    this.etudiantid = null;
    if ((oMap != undefined) && (oMap != null)) {
      if (oMap.etudiantid != undefined) {
        this.etudiantid = oMap.etudiantid;
      }
    }// oMap
  }// constructor
  get base_prefix() {
    return 'ETF';
  }
  create_id() {
    let d = (this.startDate !== null) ? this.startDate : new Date();
    let s = (d.toISOString()).substr(0,10);
    return this.base_prefix + '-' + this.semestreid + 
    '-' + this.etudiantid + '-' + this.groupeid + '-' + s;
  }// create_id
  //
  @computedFrom('etudiantid')
  get is_storeable() {
    let bRet = super.is_storeable && (this.etudiantid !== null);
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
      oMap.etudiantid = this.etudiantid;
  }// to_insert_map
  get type() {
    return 'etudaffectation';
  }
  get collection_name() {
    return 'etudaffectations';
  }
}// class ProfAffectation
