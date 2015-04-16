//departementchild.js
import {computedFrom} from 'aurelia-framework';
//
import {
    BaseItem
}
from "./baseitem";
//
export class DepartementChildItem extends BaseItem {
    constructor(oMap) {
        super(oMap);
        this.departementid = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementid !== undefined) {
                this.departementid = oMap.departementid;
            }
        } // oMap
    } // constructor
    @computedFrom('departementid')
    get is_storeable() {
        return super.is_storeable && (this.departementid !== null);
    }
    to_map(oMap) {
        super.to_map(oMap);
        oMap.departementid = this.departementid;
    } // to_map
} // class DepartementChildItem