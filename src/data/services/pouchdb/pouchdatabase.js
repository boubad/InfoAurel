//pouchdatabase.js
//
/*
import {
    Promise
}
from 'bluebird';
*/
/*
import {
    PouchDB
}
from 'pouchdb';
*/
import {
    MyCrypto
}
from '../../domain/mycrypto';
import {ElementDesc} from '../../domain/elementdesc';
import {ItemGenerator} from '../itemgenerator';
//
export class PouchDatabase {
    //
    constructor(name) {
        this._db = null;
        this.url = ((name !== undefined) && (name !== null)) ?
            name : 'geninfo';
        this.gen = new ItemGenerator();
    } // constructor
    get db() {
        let self = this;
        return new Promise((resolve, reject) => {
            if (self._db !== null) {
                resolve(self._db);
            } else {
                let xdb = new PouchDB(self.url, (err, ydb) => {
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
        let d = null;
        return this.db.then((xdb) => {
            d = xdb;
            return d.get(ddoc._id);
        }).then((r) => {
            ddoc._rev = r._rev;
            return d.put(ddoc);
        }, (e) => {
            if (e.status == 404) {
                return d.put(ddoc);
            } else {
                throw new Error(e.reason);
            }
        });
    } // maintains_doc
    check_admin() {
        let self = this;
        let username = 'admin';
        let id = 'PER-' + username;
        let d = null;
        return this.db.then((xdb) => {
            d = xdb;
            return xdb.get(id);
        }).then((p) => {
            return p;
        }, (e) => {
            if (e.status == 404) {
                let cc = new MyCrypto();
                let oMap = {
                    type:'person',
                    _id: id,
                    username: username,
                    password: cc.md5(username),
                    lastname: 'SYSTEM',
                    firstname: 'Administrator',
                    roles: ['super', 'admin', 'oper', 'prof', 'etud',
                        'reader'
                    ]
                };
                return d.put(oMap);
            } else {
                return null;
            }
        });
    } // check_admin
    get_item_by_id(id,bAttachments) {
        let self = this;
    return this.db.then((xdb) => {
      if ((bAttachments !== undefined) && (bAttachments !== null) && (bAttachments == true)){
          return xdb.get(id,{attachments:true});
        } else {
          return xdb.get(id);
        }
    }).then((doc) => {
        if ((doc.type === undefined) && (doc._id == 'PER-admin')){
          doc.type = 'person';
        }
        return self.gen.create_item(doc);
      }, (err) => {
        if (err.status == 404) {
          return null;
        } else {
          throw new Error(err.reason);
        }
      });
  }//get_item_by_id
  internal_maintains_one_item(xdb,item){
    let oMap = {};
    item.to_map(oMap);
    if ((oMap._id === undefined) || (oMap._id === null)){
        oMap._id = item.create_id();
    }
    let docid = oMap._id;
    let generator = this.gen;
    return xdb.get(id,{attachments:true}).then((p)=>{
        oMap._rev = p._rev;
        if ((p._attachments !== undefined) && (p._attachments !== null)){
            oMap._attachments = p._attachments;
        }
        return xdb.put(oMap);
    },(err)=>{
        if (err.status != 404){
            throw new Error(err.reason);
        }
        return xdb.put(oMap);
    }).then((z)=>{
        return xdb.get(id,{attachments:true});
    },(ex)=>{
        throw new Error(err.reason);
    }).then((pk)=>{
        return generator.create_item(pk);
    });
  }// maintains_one_item
  maintains_one_item(item){
    let self = this;
    return this.db.then((xdb) =>{
        return self.internal_maintains_one_item(xdb,item)
    });
  }// maintains_one_item
  maintains_items(items){
    let self = this;
    return this.db.then((xdb)=>{
        let pp = [];
        for (let item of items){
            var p = self.internal_maintains_one_item(xd,item);
            pp.push(p);
        }// item
        return Promise.all(pp);
    });
  }// maintains_items
  remove_one_item(item){
    let xdb = null;
    let id = item.id;
    return this.db.then((d)=>{
        xdb = d;
        return xdb.get(id);
    }).then((p)=>{
        return xdb.remove(p);
    });
  }// remove_one_item
  get_attachment(docid,attachmentId){
    return this.db.then((xdb)=>{
        return xdb.getAttachment(docid,attachmentId);
    }).then((p)=>{
        return p;
    },(err)=>{
        if (err.status == 404){
            return null;
        } else {
            throw new Error(err.reason);
        }
    });
  }// get_attachment
  maintains_attachment(docid,attachmentId,attachmentData,attachmentType){
    let xdb = null;
    return this.db.then((d)=>{
        xdb = d;
        return xdb.get(docid);
    }).then((p)=>{
        return xdb.putAttachment(p._id,attachmentId,p._rev,attachmenData,attachmentType);
    });
  }// maintains_attachment
  remove_attachment(docid,attachmentId){
    let xdb = null;
    return this.db.then((d)=>{
        xdb = d;
        return xdb.get(docid);
    }).then((p)=>{
        return xdb.removeAttachment(p._id,attachmentId,p._rev);
    });
  }// maintains_attachment
  get_items_array(ids,bAttachments) {
    let generator = this.gen;
    let options = {keys:ids,include_doc:true};
    if ((bAttachments !== undefined) && (bAttachments !== null) && (bAttachments == true)){
        options.attachments = true;
    }
    return this.db.then((xdb) => {
      return xdb.allDocs(options).then((rr) => {
          let oRet = [];
          if ((rr !== undefined) && (rr !== null)) {
            let data = rr.rows;
            if ((data !== undefined) && (data !== null)) {
                for (let r of data){
                    let val = r.value;
                    if ((val !== undefined) && (val !== null)){
                        if ((val.deleted === undefined) && (val.error === null)){
                            let x = generator.create_item(r.doc);
                            if (x !== null){
                                oRet.push(x);
                            }
                        }
                    }// val
                }// r
            }// data
          }// rr
          return oRet;
        });
    });
  }//get_items_array
  find_elements_range(indexName, startKey, endKey,skip, limit,descending, bIncludeEnd, bDoc, bAttach){
    let options = {};
    let bGetData = false;
    if ((startKey !== undefined) && (startKey !== null)) {
      options.startkey = startKey;
    }
    if ((endKey != undefined) && (endKey !== null)) {
      options.endkey = endKey;
    }
    if ((bIncludeEnd !== undefined) && (bIncludeEnd !== null)) {
      options.inclusive_end = bIncludeEnd;
    }
    if ((skip !== undefined) && (skip !== null) && (skip > 0)) {
      options.skip = skip;
    }
    if ((limit !== undefined) && (limit !== null) &&
      (limit > 0)) {
      options.limit = limit;
    }
    if ((descending !== undefined) && (descending !== null)) {
      options.descending = descending;
    }
    if ((bDoc !== undefined) && (bDoc !== null)) {
      options.include_docs = bDoc;
      bGetData = true;
    }
    if ((bAttach !== undefined) && (bAttach !== null)) {
      options.attachments = bAttach;
    }
    return this.db.then((xdb) => {
      return xdb.query(indexName, options).then((rr) => {
        let oRet = [];
        if ((rr !== undefined) && (rr !== null)) {
          let data = rr.rows;
          if ((data !== undefined) && (data !== null)) {
            for (let r of data){
                if ((r.value !== undefined) && (r.value !== null)) {
                if ((r.error !== undefined) || (r.deleted !== undefined)) {
                  continue;
                }
                var xx = new ElementDesc(r.value);
                oRet.push(xx);
              }
            }// r
          }// data
        }// rr
        return oRet;
      });
    });
  }//find_elements_range
  find_all_elements(item,startKey,descending){
    let endKey = startkey + '\uffff';
    let options = {startkey:startKey,endkey:endKey};
    if ((descending !== undefined) && (descending !== null)) {
        options.descending = true;
    }
    let indexName = item.index_name;
    return this.db.then((xdb) => {
      return xdb.query(indexName, options).then((rr) => {
        let oRet = [];
        if ((rr !== undefined) && (rr !== null)) {
          let data = rr.rows;
          if ((data !== undefined) && (data !== null)) {
            for (let r of data){
                if ((r.value !== undefined) && (r.value !== null)) {
                if ((r.error !== undefined) || (r.deleted !== undefined)) {
                  continue;
                }
                var xx = new ElementDesc(r.value);
                oRet.push(xx);
              }
            }// r
          }// data
        }// rr
        return oRet;
      });
    });
  }// find_all_items
} // class PouchDatabase
