//elementdesc.js
//
import {computedFrom} from 'aurelia-framework';
//
export class ElementDesc  {
  //
  constructor(oMap?: any) {
    this.id = null;
    this.text = null;
    this.rev = null;
    this.avatardocid = null;
    this.avatarid = null;
    this.url = null;
    this.personid = null;
    this.startDate = null;
    this.endDate = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.id !== undefined) {
        this.id = oMap.id;
      }
      if (oMap.rev !== undefined) {
        this.rev = oMap.rev;
      }
      if (oMap.text !== undefined) {
        this.text = oMap.text;
      }
      if (oMap.avatardocid !== undefined) {
        this.avatardocid = oMap.avatardocid;
      }
      if (oMap.avatarid !== undefined) {
        this.avatarid = oMap.avatarid;
      }
      if (oMap.personid !== undefined) {
        this.personid = oMap.personid;
      }
      if (oMap.startDate !== undefined) {
        this.startDate = oMap.startDate;
      }
      if (oMap.endDate !== undefined) {
        this.endDate = oMap.endDate;
      }
    }// oMap
  }// constructor
  @computedFrom('url')
  get hasUrl() {
    return ((this.url !== undefined) &&
      (this.url !== null) && (this.url.trim().length > 0));
  }
}// class ElementDesc