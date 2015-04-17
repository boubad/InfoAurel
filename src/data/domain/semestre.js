//semestre.js
import {computedFrom} from 'aurelia-framework';
import {
    IntervalItem
}
from './intervalitem';
//
export class Semestre extends IntervalItem {
    //
    constructor(oMap) {
        super(oMap);
        this.anneeid = null;
        if ((oMap != undefined) && (oMap != null)) {
            if (oMap.anneeid != undefined) {
                this.anneeid = oMap.anneeid;
            }
        } // oMap
    } // constructor
    get base_prefix() {
        return 'SEM';
    }
    create_id() {
        let s = (this.startDate.toISOString()).substr(0, 10);
        return this.base_prefix + '-' + this.anneeid + s;
    } // create_id
    @computedFrom('super.is_storeable','anneeid')
    get is_storeable() {
        return super.is_storeable && (this.anneeid !== null);
    }
    to_map(oMap) {
        super.to_map(oMap);
        oMap.anneeid = this.anneeid;
    } // to_insert_map
    get type() {
        return 'semestre';
    }
    get collection_name() {
        return 'semestres';
    }
} // class Annee