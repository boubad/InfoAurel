//pouchdatabase.js
//
import {
    Promise
}
from 'bluebird';
import {
    PouchDB
}
from 'pouchdb';
import {
    MyCrypto
}
from '../../domain/mycrypto';
//
export class PouchDatabase {
    //
    constructor(name) {
        this._db = null;
        this.url = ((name !== undefined) && (name !== null)) ?
            name : 'geninfo';
    } // constructor
    get db() {
        let self = this;
        return new Promise((resolve, reject) = > {
            if (self._db !== null) {
                resolve(self._db);
            } else {
                let xdb = new PouchDB(self.url, (err, ydb) = > {
                    if ((err !== undefined) && (err !== null)) {
                        reject(new Error(err.reason));
                    } else {
                        self._db = ydb;
                        resolve(self._db);
                    }
                });
            }
        });
    } // db
    maintains_doc(ddoc) {
        let d: PouchDB = null;
        return this.db.then((xdb) = > {
            d = xdb;
            return d.get(ddoc._id);
        }).then((r) = > {
            ddoc._rev = r._rev;
            return d.put(ddoc);
        }, (e) = > {
            if (e.status == 404) {
                return d.put(ddoc);
            } else {
                throw new Error(e.reason);
            }
        });
    } // maintains_doc
    check_admin() {
        let self = this;
        return this.db.then((xdb) = > {
            return xdb.get('PER-admin');
        }).then((p) = > {
            return p;
        }, (e) = > {
            if (e.status == 404) {
                let cc = new MyCrypto();
                let oMap = {
                    _id: 'PER-admin',
                    username: 'admin',
                    password: cc.md5('admin'),
                    lastname: 'SYSTEM',
                    firstname: 'Administrator',
                    roles: ['super', 'admin', 'oper', 'prof', 'etud',
                        'reader'
                    ]
                };
                return self.maintains_doc(oMap).then((z) = > {
                    return z;
                });
            } else {
                return null;
            }
        });
    } // check_admin
} // class PouchDatabase