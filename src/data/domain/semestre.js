//semestre.js
import {
    IntervalItem
}
from './intervalitem';
//
extends class Semestre extends IntervalItem {
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
    get is_storeable() {
        return super.is_storeable && (this.anneeid !== null) &&
            (this.startDate !== null) && (this.endDate !== null) &&
            (this.startDate.getTime() <= this.endDate.getTime());
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