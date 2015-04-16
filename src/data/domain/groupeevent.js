//groupeevent.js
import {MatiereWorkItem} from './matiereworkitem';
//
export class GroupeEvent extends MatiereWorkItem {
  //
  constructor(oMap) {
    super(oMap);
    this.profaffectationid = null;
    this.enseignantid = null;
    this.name = null;
    this.location = null;
    this._coef = null;
    this._date = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.profaffectationid !== undefined) {
        this.profaffectationid = oMap.profaffectationid;
      }
      if (oMap.enseignantid !== undefined) {
        this.enseignantid = oMap.enseignantid;
      }
      if (oMap.name !== undefined) {
        this.name = oMap.name;
      }
      if (oMap.location !== undefined) {
        this.location = oMap.location;
      }
      if (oMap.coefficient !== undefined) {
        this.coefficient = oMap.coefficient;
      }
      if (oMap.date !== undefined){
      	this.date = oMap.date;
      }
    }// oMap
  }// constructor
  get base_prefix() {
    return 'GVT';
  }
  create_id() {
    var n = Math.floor(10000.0*Math.random());
    var sn = '' + n;
    while (sn.length < 4){
      sn = '0' + sn;
    }
    var s:string = (this.date.toISOString()).substr(0,10);
    return this.base_prefix + '-' + this.profaffectationid + '-' +
     this.genre + '-' + s + '-' + sn;
  }// create_id
  get type() {
    return 'groupeevent';
  }
  get collection_name() {
    return 'groupeevents';
  }
  get date(){
  	return this._date;
  }
  set date(d){
  	this._date = this.check_date(d);
  }
  //
  get startTime() {
    return this.startDate;
  }
  set startTime(d) {
    this.startDate = d;
  }

  //
  get endTime() {
    return this.endDate;
  }
  set endTime(d) {
    this.endDate = d;
  }
  //
  get coefficient() {
    return this._coef;
  }
  set coefficient(s) {
    if ((s !== undefined) && (s !== null) && (s > 0)) {
      this._coef = s;
    } else {
      this._coef = null;
    }
  }
  //
  @computedFrom('profaffectationid','enseignantid','date','genre','name')
  get is_storeable() {
  	  return super.is_storeable && (this.profaffectationid !== null) &&
  	  (this.enseignantid !== null) && (this.date !== null) &&
  	  (this.name !== null) && (this.genre !== null);
  }
  to_map(oMap) {
    super.to_map(oMap);
      oMap.profaffectationid = this.profaffectationid;
      oMap.enseignantid = this.enseignantid;
      oMap.name = this.name;
      oMap.location = this.location;
      oMap.coefficient = this.coefficient;
      oMap.date = this.date;
  }// to_insert_map
}// class GroupeEvent
