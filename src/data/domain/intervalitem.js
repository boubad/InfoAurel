//intervalitem.js
import {
    DepartementSigleNameItem
}
from "./departementsiglename";
//
export class IntervalItem extends DepartementSigleNameItem {
    constructor(oMap) {
        super(oMap);
        this._start = null;
        this._end = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.startDate !== undefined) {
                this._start = this.check_date(oMap.startDate);
            }
            if (oMap.endDate !== undefined) {
                this._end = this.check_date(oMap.endDate);
            }
        }
    }
    create_id() {
        let s = (this.startDate.toISOString()).substr(0, 10);
        return this.base_prefix + '-' +
            this.departementid + '-' + s;
    } // create_id
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
    get is_storeable(): boolean {
        return super.is_storeable &&
            (this.startDate !== null) && (this.endDate !== null) &&
            (this.startDate.getTime() <= this.endDate.getTime());
    }
    to_map(oMap) {
        super.to_map(oMap);
        oMap.startDate = this.startDate;
        oMap.endDate = this.endDate;
    } // to_insert_map
    sort_func(p1, p2) {
        let vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !==
            null)) {
            if ((p1.startDate !== undefined) && (p1.startDate !== null)) {
                if ((p2.startDate !== undefined) && (p2.startDate !== null)) {
                    let s1 = Date.parse(p1.startDate.toString());
                    let s2 = Date.parse(p2.startDate.toString());
                    if (s1 < s2) {
                        vRet = 1;
                    } else if (s1 > s2) {
                        vRet = -1;
                    } else {
                        vRet = 0;
                    }
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
} // class IntervalItem