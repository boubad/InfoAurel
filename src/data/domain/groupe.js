//groupe.js
//
import {
    DepartementSigleNameItem
}
from './departementsiglename';
//
export class Groupe extends DepartementSigleNameItem {
    constructor(oMap) {
        super(oMap);
    } // constructor
    get type() {
        return 'groupe';
    }
    get collection_name() {
        return 'groupes';
    }
    get base_prefix() {
        return 'GRP';
    }
} // class Groupe