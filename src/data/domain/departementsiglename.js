//departementsiglename.js
import {computedFrom} from 'aurelia-framework';
//
import {
    DepartementChildItem
}
from "./departementchild";
//
export class DepartementSigleNameItem extends DepartementChildItem {
    //
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
        return this.base_prefix + '-' + this.departementid + '-' +
            this.sigle.toUpperCase();
    } // create_id
     @computedFrom('sigle')
    get is_storeable() {
        return super.is_storeable && (this.sigle !== null);
    }
    to_map(oMap) {
        super.to_map(oMap);
        oMap.sigle = this.sigle;
        oMap.name = this.name;
    } // to_insert_map
} // class SigleNameItemItem