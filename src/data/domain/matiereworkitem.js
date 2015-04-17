//matiereworkitem.js
import {computedFrom} from 'aurelia-framework';
//
import {DepWorkItem} from './depworkitem';
//
export class MatiereWorkItem extends DepWorkItem {
  //
  constructor(oMap) {
    super(oMap);
    this.uniteid = null;
    this.matiereid = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.uniteid !== undefined) {
        this.uniteid = oMap.uniteid;
      }
      if (oMap.matiereid !== undefined) {
        this.matiereid = oMap.matiereid;
      }
    }// oMap
  }// constructor
  //
  @computedFrom('super.is_storeable','uniteid','matiereid')
  get is_storeable() {
    return super.is_storeable && (this.uniteid !== null) &&
       (this.matiereid !== null);
  }
  to_map(oMap)  {
    super.to_map(oMap);
      oMap.uniteid = this.uniteid;
      oMap.matiereid = this.matiereid;
  }// to_insert_map
}// class MatiereWorkItem
