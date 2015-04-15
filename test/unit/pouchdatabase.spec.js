//pouchdatabase.spec.js
import {PouchDatabase} from '../../src/data/services/pouchdb/pouchdatabase';
//
describe('PouchDatabase',()=>{
	let base;
	let db;
	beforeEach((done)=>{
		db = null;
		base = new PouchDatabase();
		base.db.then((x)=>{
			db = x;
			expect(db).not.toBeNull();
			done();
		}).catch((err)=>{
			console.log('Error: ' + err.message);
			done();
		});
	});
});