//baseitem.js
//
export class BaseItem {
    //
    constructor(oMap) {
        this.id = null;
        this.rev = null;
        this.attachments = null;
        this.avatarid = null;
        this.description = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap._id !== undefined) {
                this.id = oMap._id;
            }
            if (oMap._rev !== undefined) {
                this.rev = oMap._rev;
            }
            if (oMap._attachments !== undefined) {
                this.attachments = oMap._attachments;
            }
            if (oMap.description !== undefined) {
                this.description = oMap.description
            }
            if (oMap.avatarid !== undefined) {
                this.avatarid = oMap.avatarid;
            }
        } // oMap
    } // constructor
    get base_prefix() {
        return null;
    }
    @computedFrom('collection_name')
    get index_name() {
        return (this.collection_name !== null) ?
            this.collection_name + '/by_id' : null;
    }
    create_id() {
        let n: number = Math.floor(Math.random() * 10000.0);
        let sn = '' + n;
        while (sn.length < 4) {
            sn = '0' + sn;
            n
        }
        let s: string = ((new Date()).toISOString()).substr(0, 10) + '-' + sn;
        return (this.base_prefix !== null) ?
            this.base_prefix + '-' + s : s;
    } // create_id
    check_date(d) {
        let dRet = null;
        if ((d !== undefined) && (d !== null)) {
            let t = Date.parse(d.toString());
            if (!isNaN(t)) {
                dRet = d;
            }
        }
        return dRet;
    } // check_date
    get type() {
        return null;
    }
    get collection_name() {
        return null;
    }
    @computedFrom('type','collection_name')
    get is_storeable() {
        return (this.type !== null) && (this.collection_name !== null);
    }
    to_map(oMap) {
        if ((this.id !== undefined) && (this.id !== null)) {
            oMap._id = this.id;
        } else {
            oMap._id = this.create_id();
        }
        if ((this.rev !== undefined) && (this.rev !== null)) {
            oMap._rev = this.rev;
        }
        if ((this.attachments !== undefined) && (this.attachments !== null)) {
            oMap._attachments = this.attachments;
        }
        if ((this.type !== undefined) && (this.type !== null)) {
            oMap.type = this.type;
        }
        if ((this.description !== undefined) && (this.description !== null)) {
            oMap.description = this.description;
        }
        if ((this.avatarid !== undefined) && (this.avatarid !== null)) {
            oMap.avatarid = this.avatarid;
        }
    }
    toString() {
        let oMap = {};
        this.to_map(oMap);
        return JSON.stringify(oMap);
    } // toString
    sort_func(p1, p2) {
        let vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !==
            null)) {
            if ((p1.id !== undefined) && (p1.id !== null)) {
                if ((p2.id !== undefined) && (p2.id !== null)) {
                    let s1 = p1.id;
                    let s2 = p2.id;
                    vRet = s1.localeCompare(s2);
                } else {
                    vRet = 1;
                }
            } else {
                vRet = 1;
            }
        } else if ((p1 === undefined) || (p1 === null)) {
            vRet = 1;
        }
        return vRet;
    } // sort_func
} // class BaseItem