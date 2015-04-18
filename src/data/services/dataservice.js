//dataservice.js
import {Promise} from 'bluebird';
import {PouchDatabase} from './pouchdb/pouchdatabase';
//
import {Departement} from '../domain/departement';
import {Annee} from '../domain/annee';
import {Semestre} from '../domain/semestre';
import {Groupe} from '../domain/groupe';
import {Unite} from '../domain/unite';
import {Matiere} from '../domain/matiere';
//
const DATABASE_NAME = 'geninfo';
//
export class DataService extends PouchDatabase {
	constructor(){
		super(DATABASE_NAME);
		this._departement = new Departement();
		this._annee = new Annee();
		this._semestre = new Semestre();
		this._unite = new Unite();
		this._matiere = new Matiere();
		this._groupe = new Groupe();
		this.check_admin();
	}// constructor
	find_elements_array(ids){
		if ((ids !== undefined) && (ids !== null) && (ids.length > 0)){
			return this.get_items_array(ids).then((dd)=>{
		});
		} else {
			return new Promise((resolve,reject)=>{
				resolve([]);
			});
		}
	}// find_elements_array
	find_all_departements(){
		let model = this._departement;
		let startKey = model.base_prefix;
		return this.find_all_elements(model,startKey);
	}// find_all_departements
	find_departement_groupes(depid){
		let model = this._groupe;
		let startKey = model.base_prefix + '-' + depid;
		return this.find_all_elements(model,startKey);
	}// find_departement_groupes
	find_departement_unites(depid){
		let model = this._unite;
		let startKey = model.base_prefix + '-' + depid;
		return this.find_all_elements(model,startKey);
	}// find_departement_unites

	find_departement_annees(depid){
		let model = this._annee;
		let startKey = model.base_prefix + '-' + depid;
		return this.find_all_elements(model,startKey,true);
	}// find_departement_annee
	find_annee_semestres(anneeid){
		let model = this._semestre;
		let startKey = model.base_prefix + '-' + anneeid;
		return this.find_all_elements(model,startKey,true);
	}// find_annee_semestres
	find_unite_matieres(uniteid){
		let model = this._matiere;
		let startKey = model.base_prefix + '-' + uniteid;
		return this.find_all_elements(model,startKey);
	}// find_unite_matieres
} // class DataService