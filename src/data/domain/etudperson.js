// etudperson.js
//
import {
    Person
}
from './person';
//
export class EtudiantPerson extends Person {
    //
    constructor(oMap) {
        super(oMap);
        this._dossier = null;
        this._sexe = null;
        this._date = null;
        this._ville = null;
        this._etablissement = null;
        this._seriebac = null;
        this._optionbac = null;
        this._mentionbac = null;
        this._sup = null;
        this.roles = ['etud'];
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.dossier !== undefined) {
                this.dossier = oMap.dossier;
            }
            if (oMap.sexe !== undefined) {
                this.sexe = oMap.sexe;
            }
            if (oMap.birthDate !== undefined) {
                this.birthDate = oMap.birthDate;
            }
            if (oMap.etablissement !== undefined) {
                this.etablissement = oMap.etablissement;
            }
            if (oMap.ville !== undefined) {
                this.ville = oMap.ville;
            }
            if (oMap.serieBac !== undefined) {
                this.serieBac = oMap.serieBac;
            }
            if (oMap.optionBac !== undefined) {
                this.optionBac = oMap.optionBac;
            }
            if (oMap.mentionBac != undefined) {
                this.mentionBac = oMap.mentionBac;
            }
            if (oMap.etudesSuperieures !== undefined) {
                this.etudesSuperieures = oMap.etudesSuperieures;
            }
        } // oMap
    } // constructor
    get type() {
        return "etudperson";
    }
    //
    get dossier() {
        return this._dossier;
    }
    set dossier(s) {
        this._dossier = ((s !== undefined) &&
            (s !== null) && (s.trim().length > 0)) ? s.trim().toLowerCase() :
            null;
    }
    //
    get sexe() {
        return this._sexe;
    }
    set sexe(s) {
        this._sexe = ((s !== undefined) &&
            (s !== null) && (s.trim().length > 0)) ? s.trim().toLowerCase() :
            null;
    }
    get isMale() {
        return ((this.sexe !== null) && (this.sexe == 'masculin'));
    }
    set isMale(b) {
        if ((b !== undefined) && (b !== null)) {
            this._sexe = (b == true) ? 'masculin' : 'feminin';
        }
    }
    get isFeminin() {
        return ((this.sexe !== null) && (this.sexe == 'feminin'));
    }
    set isFeminin(b) {
        if ((b !== undefined) && (b !== null)) {
            this._sexe = (b == true) ? 'feminin' : 'masculin';
        }
    }
    //
    get birthDate() {
        return this._date;
    }
    set birthDate(s) {
        this._date = this.check_date(s);
    }
    //
    get ville() {
        return this._ville;
    }
    set ville(s) {
        this._ville = ((s !== undefined) &&
            (s !== null) && (s.trim().length > 0)) ? s.trim() : null;
    }
    //
    get etablissement() {
        return this._etablissement;
    }
    set etablissement(s) {
        this._etablissement = ((s !== undefined) &&
            (s !== null) && (s.trim().length > 0)) ? s.trim() : null;
    }
    //
    get serieBac() {
        return this._seriebac;
    }
    set serieBac(s) {
        this._seriebac = ((s !== undefined) &&
            (s !== null) && (s.trim().length > 0)) ? s.trim().toLowerCase() :
            null;
    }
    //
    get optionBac() {
        return this._optionbac;
    }
    set optionBac(s) {
        this._optionbac = ((s !== undefined) &&
            (s != null) && (s.trim().length > 0)) ? s.trim().toLowerCase() :
            null;
    }
    get mentionBac() {
        return this._mentionbac;
    }
    set mentionBac(s) {
        this._mentionbac = ((s !== undefined) &&
            (s !== null) && (s.trim().length > 0)) ? s.trim().toLowerCase() :
            null;
    }
    //
    get etudesSuperieures() {
        return this._sup;
    }
    set etudesSuperieures(s) {
        this._sup = ((s !== undefined) &&
            (s !== null) && (s.trim().length > 0)) ? s.trim().toLowerCase() :
            null;
    }
    to_map(oMap): void {
        super.to_map(oMap);
        oMap.dossier = this.dossier;
        oMap.sexe = this.sexe;
        oMap.birthDate = this.birthDate;
        oMap.ville = this.ville;
        oMap.etablissement = this.etablissement;
        oMap.serieBac = this.serieBac;
        oMap.optionBac = this.optionBac;
        oMap.mentionBac = this.mentionBac;
        oMap.etudesSuperieures = this.etudesSuperieures;
    } // to_insert_map
} // class EtudiantPerson