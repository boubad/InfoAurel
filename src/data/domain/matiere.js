//matiere.js
import {computedFrom} from 'aurelia-framework';
//
import {
    DepartementSigleNameItem
}
from './departementsiglename';
//
export class Matiere extends DepartementSigleNameItem {
    constructor(oMap) {
        super(oMap);
        this.uniteid = null;
        this._coef = null;
        this._ecs = null;
        this.genre = null;
        this.mat_module = null;
        if ((oMap != undefined) && (oMap != null)) {
            if (oMap.uniteid != undefined) {
                this.uniteid = oMap.uniteid;
            }
            if (oMap.coefficient != undefined) {
                this.coefficient = oMap.coefficient;
            }
            if (oMap.ecs != undefined) {
                this.ecs = oMap.ecs;
            }
            if (oMap.genre != undefined) {
                this.genre = oMap.genre;
            }
            if (oMap.mat_module != undefined) {
                this.mat_module = oMap.mat_module;
            }
        } // oMap
    } // constructor
    get base_prefix() {
        return 'MAT';
    }
    get type() {
        return 'matiere';
    }
    get collection_name() {
        return 'matieres';
    }
    create_id() {
        return this.base_prefix + '-' + this.uniteid + '-' +
            this.sigle.toUpperCase();
    } // create_id
    get ecs() {
        return this._ecs;
    }
    set ecs(v) {
        if ((v != undefined) && (v != null) && (v > 0)) {
            this._ecs = v;
        } else {
            this._ecs = null;
        }
    }
    get coefficient() {
        return this._coef;
    }
    set coefficient(v) {
        if ((v != undefined) && (v != null) && (v > 0)) {
            this._coef = v;
        } else {
            this._coef = null;
        }
    }
    @computedFrom('super.is_storeable','uniteid')
    get is_storeable() {
        return super.is_storeable && (this.uniteid !== null);
    }
    to_map(oMap) {
        super.to_map(oMap);
        oMap.uniteid = this.uniteid;
        oMap.genre = this.genre;
        oMap.mat_module = this.mat_module;
        oMap.coefficient = this.coefficient;
        oMap.ecs = this.ecs;
    } // to_insert_map
} // class Matiere