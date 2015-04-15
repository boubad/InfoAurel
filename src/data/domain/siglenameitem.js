// siglenameitem.js
//
import {
    BaseItem
}
from './baseitem';
//
export class SigleNameItem extends BaseItem {
    constructor(oMap) {
        super(oMap);
        this.sigle = null;
        this.name = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.sigle !== undefined) {
                this.sigle = oMap.sigle;
            }
            if (oMap.name !== undefined) {
                this.name = oMap.name;
            }
        } // oMap
    } // constructor
    create_id() {
        let ss = this.sigle;
        if (ss === null) {
            return super.create_id();
        }
        ss = ss.toUpperCase();
        let s = this.base_prefix;
        if (s !== null) {
            s = s + "-" + ss;
        } else {
            s = ss;
        }
        return s;
    } // create_id
    is_storeable(): boolean {
        return super.is_storeable && (this.sigle !== null);
    }
    to_map(oMap) {
        super.to_map(oMap);
        oMap.sigle = this.sigle;
        oMap.name = this.name;
    } // toInsertMap
    sort_func(p1, p2) {
        let vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !==
            null)) {
            if ((p1.sigle !== undefined) && (p1.sigle !== null)) {
                if ((p2.sigle !== undefined) && (p2.sigle !== null)) {
                    let s1 = p1.sigle;
                    let s2 = p2.sigle;
                    vRet = s1.localeCompare(s2);
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
} // class SigleNameItem