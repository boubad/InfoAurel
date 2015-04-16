//depworkitem.js
import {computedFrom} from 'aurelia-framework';
//
import {DepartementPerson} from './departementperson';
//
export class DepWorkItem extends DepartementPerson {
  //
  constructor(oMap) {
    super(oMap);
    this.anneeid = null;
    this.semestreid = null;
    this.groupeid = null;
    this._start = null;
    this._end = null;
    this.status = null;
    this.genre = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.anneeid !== undefined) {
        this.anneeid = oMap.anneeid;
      }
      if (oMap.semestreid !== undefined) {
        this.semestreid = oMap.semestreid;
      }
      if (oMap.groupeid !== undefined) {
        this.groupeid = oMap.groupeid;
      }
      if (oMap.startDate !== undefined) {
        this.startDate = oMap.startDate;
      }
      if (oMap.endDate !== undefined) {
        this.endDate = oMap.endDate;
      }
      if (oMap.genre !== undefined){
        this.genre = oMap.genre;
      }
      if (oMap.status !== undefined){
        this.status = oMap.status;
      }
    }// oMap
  }// constructor

  get fullname() {
    let s = '';
    if (this.lastname !== null) {
      s = this.lastname;
    }
    if (this.firstname !== null) {
      s = s + ' ' + this.firstname;
    }
    s = s.trim();
    return (s.length > 0) ? s : null;
  } // fullname

  //
  get startDate() {
    return this._start;
  }
  set startDate(d) {
    this._start = this.check_date(d);
  }

  get endDate() {
    return this._end;
  }
  set endDate(d) {
    this._end = this.check_date(d);
  }
  //
  @computedFrom('anneeid','semestreid','groupeid')
  get is_storeable() {
    return super.is_storeable && (this.anneeid !== null) &&
       (this.semestreid !== null) &&
      (this.groupeid !== null) && (this.personid !== null);
  }
  to_map(oMap)  {
    super.to_map(oMap);
      oMap.anneeid = this.anneeid;
      oMap.semestreid = this.semestreid;
      oMap.groupeid = this.groupeid;
      oMap.startDate = this.startDate;
      oMap.endDate = this.endDate;
      oMap.genre = this.genre;
      oMap.status = this.status;
  }// to_insert_map
  sort_func(p1, p2) {
        let vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !== null)) {
            if ((p1.fullname !== undefined) && (p1.fullname !== null)) {
                if ((p2.fullname !== undefined) && (p2.fullname !== null)) {
                    let s1 = p1.fullname;
                    let s2 = p2.fullname;
                } else {
                    vRet = 1;
                }
            } else {
                vRet = 1;
            }
        } else if ((p1 === undefined) || (p1 === null)) {
            vRet = 1;
        }
        return vRet;
    } // sort_func
}// class WorkItem
