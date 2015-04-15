//unite.js
//
import {
    DepartementSigleNameItem
}
from './departementsiglename';
//
export class Unite extends DepartementSigleNameItem {
    constructor(oMap) {
        super(oMap);
    } // constructor
    get type() {
        return 'unite';
    }
    get collection_name() {
        return 'unites';
    }
    get base_prefix() {
        return 'UNT';
    }
} // class Groupe