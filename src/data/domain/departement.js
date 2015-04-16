//departement.js
import {
    SigleNameItem
}
from "./siglenameitem";
//
export class Departement extends SigleNameItem {
    constructor(oMap) {
        super(oMap);
    }
    get type() {
        return 'departement';
    }
    get collection_name() {
        return 'departements';
    }
    get base_prefix() {
        return 'DEP';
    }
    @computedFrom('collection_name')
    get index_name() {
        return this.collection_name + '/by_sigle';
    }
} // class Departement