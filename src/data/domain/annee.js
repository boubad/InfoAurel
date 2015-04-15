//annee.js
import {
    IntervalItem
}
from "./intervalitem";
//
export class Annee extends IntervalItem {
    constructor(oMap) {
        super(oMap);
    } // constructor

    get type() {
        return 'annee';
    }
    get collection_name() {
        return 'annees';
    }
    get base_prefix() {
        return 'ANN';
    }
} // class Annee