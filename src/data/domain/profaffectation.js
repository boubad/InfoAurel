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
  @computedFrom('super.is_storeable','enseignantid')
  get is_storeable() {
    return super.is_storeable && (this.enseignantid !== null);
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
