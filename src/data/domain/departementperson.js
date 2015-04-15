//departementperson.js
//
import {
    DepartementChildItem
}
from './departementchild';
//
export class DepartementPerson extends DepartementChildItem {
    constructor(oMap) {
        super(oMap);
        this.personid = null;
        this.firstname = null;
        this.lastname = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.personid !== undefined) {
                this.personid = oMap.personid;
            }
            if (oMap.firstname !== undefined) {
                this.firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this.lastname = oMap.lastname;
            }
        } // oMap
    } // constructor
    get fullname() {
        var s = '';
        if (this.lastname !== null) {
            s = this.lastname;
        }
        if (this.firstname !== null) {
            s = s + ' ' + this.firstname;
        }
        s = s.trim();
        return (s.length > 0) ? s : null;
    } // fullname
    get is_storeable() {
        return super.is_storeable && (this.personid !== null) &&
            (this.lastname !== null) && (this.firstname !== null);
    }
    to_map(oMap) {
        super.to_map(oMap);
        oMap.personid = this.personid;
        oMap.firstname = this.firstname;
        oMap.lastname = this.lastname;
    } // to_insert_map
    sort_func(p1, p2) {
        let vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !==
            null)) {
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
} // class DepartementPerson