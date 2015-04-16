//etudevent.js
import {MatiereWorkItem} from './matiereworkitem';
//
export class EtudEvent extends MatiereWorkItem {
  //
  constructor(oMap) {
    super(oMap);
    this.etudaffectationid = null;
    this.etudiantid = null;
    this.groupeeventid = null;
    this.note = null;
    this._date = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.etudaffectationid !== undefined) {
        this.etudaffectationid = oMap.etudaffectationid;
      }
      if (oMap.etudiantid !== undefined) {
        this.etudiantid = oMap.etudiantid;
      }
      if (oMap.groupeeventid !== undefined) {
        this.groupeeventid = oMap.groupeeventid;
      }
      if (oMap.note !== undefined) {
        this.note = oMap.note;
      }
      if (oMap.date !== undefined){
        this.date = oMap.date;
      }
    }// oMap
  }// constructor
  get base_prefix() {
    return 'EVT';
  }
  create_id() {
    return this.base_prefix + '-' + this.groupeeventid + '-' + this.etudiantid;
  }// create_id
  get type() {
    return 'etudevent';
  }
  get collection_name() {
    return 'etudevents';
  }
  get date(){
  	return this._date;
  }
  set date(d){
  	this._date = this.check_date(d);
  }
  //
  get is_storeable() {
  	  return super.is_storeable && (this.etudaffectationid !== null) &&
      (this.groupeeventid !== null) &&
  	  (this.etudiantid !== null) && (this.genre !== null);
  }
  to_map(oMap) {
    super.to_map(oMap);
      oMap.etudaffectationid = this.etudaffectationid;
      oMap.groupeeventid = this.groupeeventid;
      oMap.etudiantid = this.etudiantid;
      oMap.note = this.note;
      oMap.date = this.date;
  }// to_insert_map
}// class GroupeEvent
