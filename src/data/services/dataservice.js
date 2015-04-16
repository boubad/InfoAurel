//dataservice.js
import {PouchDatabase} from './pouchdb/pouchdatabase';
//
const DATABASE_NAME = 'geninfo';
//
export class DataService extends PouchDatabase {
	constructor(){
		super(DATABASE_NAME);
	}// constructor
} // class DataService