// person.js
//
import {
    BaseItem
}
from './baseitem';
import {
    MyCrypto
}
from './mycrypto';
//
let cc = new MyCrypto();
//
export class Person extends BaseItem {
    //
    constructor(oMap) {
        super(oMap);
        this._user = null;
        this._pass = null;
        this._first = null;
        this._last = null;
        this._email = null;
        this._phone = null;
        this._roles = [];
        this._deps = [];
        this._annees = [];
        this._semestres = [];
        this._matieres = [];
        this._unites = [];
        this._groupes = [];
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.username !== undefined) {
                this.username = oMap.username;
            }
            if (oMap.password !== undefined) {
                this.password = oMap.password;
            }
            if (oMap.firstname !== undefined) {
                this.firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this.lastname = oMap.lastname;
            }
            if (oMap.email !== undefined) {
                this.email = oMap.email;
            }
            if (oMap.phone !== undefined) {
                this.phone = oMap.phone;
            }
            if (oMap.departementids !== undefined) {
                this.departementids = oMap.departementids;
            } //
            if (oMap.roles !== undefined) {
                this.roles = oMap.roles;
            } //
            if (oMap.anneeids !== undefined) {
                this.anneeids = oMap.anneeids;
            } //
            if (oMap.semestreids !== undefined) {
                this.semestreids = oMap.semestreids;
            } //
            if (oMap.uniteids !== undefined) {
                this.uniteids = oMap.uniteids;
            } //
            if (oMap.matiereids !== undefined) {
                this.matiereids = oMap.matiereids;
            } //
            if (oMap.groupeids !== undefined) {
                this.groupeids = oMap.groupeids;
            } //
        } // oMap
    } // constructor
    //
    get base_prefix() {
        return 'PER';
    }
    get index_name() {
        return 'persons/by_names';
    }
    create_id() {
        return this.base_prefix + '-' + this.username;
    } // create_id
    //
    get departementids() {
        return this._deps;
    }
    set departementids(s) {
        this._deps = ((s !== undefined) && (s !== null) && (s.length !==
                undefined) &&
            (s.length > 0)) ? s : [];
    }
    //
    get groupeids() {
        return this._groupes;
    }
    set groupeids(s) {
        this._groupes = ((s !== undefined) && (s !== null) && (s.length !==
                undefined) &&
            (s.length > 0)) ? s : [];
    }
    //
    get anneeids() {
        return this._annees;
    }
    set anneeids(s) {
        this._annees = ((s !== undefined) && (s !== null) && (s.length !==
                undefined) &&
            (s.length > 0)) ? s : [];
    }
    //
    get semestreids() {
        return this._semestres;
    }
    set semestreids(s) {
        this._semestres = ((s !== undefined) && (s !== null) && (s.length !==
                undefined) &&
            (s.length > 0)) ? s : [];
    }
    //
    get uniteids() {
        return this._unites;
    }
    set uniteids(s) {
        this._unites = ((s !== undefined) && (s !== null) && (s.length !==
                undefined) &&
            (s.length > 0)) ? s : [];
    }
    //
    get matiereids() {
        return this._matieres;
    }
    set matiereids(s) {
        this._matieres = ((s !== undefined) && (s !== null) && (s.length !==
                undefined) &&
            (s.length > 0)) ? s : [];
    }
    //
    get roles() {
        return this._roles;
    }
    set roles(s: string[]) {
        this._roles = ((s !== undefined) && (s !== null) && (s.length !==
                undefined) &&
            (s.length > 0)) ? s : [];
    }
    //
    reset_password() {
        if (this.username !== null) {
            this.password = cc.md5(this.username);
        } else {
            this.password = null;
        }
    }
    change_password(ct) {
        if ((ct === undefined) || (ct === null)) {
            this.password = null;
        } else {
            var v = null;
            var x = ct.trim();
            if (x.length > 0) {
                v = cc.md5(ct);
            }
            this.password = v;
        }
    }
    check_password(ct) {
        if ((ct === undefined) || (ct === null)) {
            if (this.password === null) {
                return true;
            } else {
                return false;
            }
        }
        var v = cc.md5(ct);
        return (this.password == v);
    } // check_password
    //
    get collection_name() {
        return "persons";
    }
    get type() {
        return "person";
    }
    //
    get username() {
        return this._user;
    }
    set username(s) {
        if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
            this._user = s.trim().toLowerCase();
        } else {
            this._user = null;
        }
    }
    //
    get lastname() {
        return this._last;
    }
    set lastname(s) {
        if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
            this._last = s.trim().toUpperCase();
        } else {
            this._last = null;
        }
    }
    //
    get firstname() {
        return this._first;
    }
    set firstname(s) {
        if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
            var ss = s.trim();
            var n = ss.length;
            if (n > 1) {
                this._first =
                    ss.substr(0, 1).toUpperCase() + ss.substr(1, n - 1).toLowerCase();
            } else {
                this._first = ss.toUpperCase();
            }
        } else {
            this._first = null;
        }
    }
    //
    get fullname() {
        var s = '';
        if (this.lastname !== null) {
            s = this.lastname;
        }
        if (this.firstname != null) {
            s = s + ' ' + this.firstname;
        }
        s = s.trim();
        return (s.length > 0) ? s : null;
    } // fullname

    //
    get password() {
        return this._pass;
    }
    set password(s) {
        if (s !== undefined) {
            this._pass = s;
        } else {
            this._pass = null;
        }
    }
    //
    get email() {
        return this._email;
    }
    set email(s) {
        if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
            this._email = s.trim();
        } else {
            this._email = null;
        }
    }

    get phone() {
        return this._phone;
    }
    set phone(s: string) {
        if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
            this._phone = s.trim();
        } else {
            this._phone = null;
        }
    }
    //
    to_map(oMap) {
        super.to_map(oMap);
        oMap.username = this.username;
        oMap.password = this.password;
        oMap.firstname = this.firstname;
        oMap.lastname = this.lastname;
        oMap.email = this.email;
        oMap.phone = this.phone;
        oMap.roles = this.roles;
        oMap.departementids = this.departementids;
        oMap.uniteids = this.uniteids;
        oMap.matiereids = this.matiereids;
        oMap.anneeids = this.anneeids;
        oMap.semestreids = this.semestreids;
        oMap.groupeids = this.groupeids;
    } // to_insert_map
    get is_storeable() {
        return super.is_storeable && (this.username !== null) && (this.firstname !==
            null) &&
            (this.lastname !== null);
    }
} // class Person