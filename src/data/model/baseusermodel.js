//baseusermodel.js.js
//
import {inject,computedFrom} from 'aurelia-framework';
import {DataService} from '../services/dataservice';
import {UserInfo} from './userinfo';
//
@inject(DataService,UserInfo)
export class BaseUserModel  {
	constructor(dataService,userInfo){
		this.dataService = dataService;
		this.userInfo = userInfo;
		this.isAdmin = false;
		this.isSuper = false;
		this.departements = [];
		this._annees = [];
		this._unites = [];
		this._groupes = [];
		this._matieres = [];
		this._semestres = [];
		this._departement = null;
		this._annee = null;
		this._semestre = null;
		this._unite = null;
		this._matiere = null;
		this._groupe = null;
		//
		this.isDepartement = false;
		this.isAnnee = false;
		this.isSemestre = false;
		this.isUnite = false;
		this.isMatiere = false;
		this.isGroupe = false;
	}// constructor
	get fullname(){
		return this.userInfo.fullname;
	}
	get photoUrl(){
		return this.userInfo.photoUrl;
	}
	get isConnected(){
		return this.userInfo.isConnected;
	}
	get isNotConnected(){
		return (!this.isConnected);
	}
	get hasPhoto(){
		return this.userInfo.hasPhoto;
	}
	//
	get person(){
		return this.userInfo.person;
	}
	set person(pPers){
		this.userInfo.person = pPers;
		this.departements = [];
		this._annees = [];
		this._unites = [];
		this._groupes = [];
		this._matieres = [];
		this._semestres = [];
		this.annees = [];
		this.unites = [];
		this.groupes = [];
		this.matieres = [];
		this.semestres = [];
		this.isAdmin = false;
		this.isAdmin = false;
		this.isSuper = false;
		this._departement = null;
		this._annee = null;
		this._semestre = null;
		this._unite = null;
		this._matiere = null;
		this._groupe = null;
		let p = this.userInfo.person;
		if ((p === undefined) || (p === null)){
			return;
		}
		let self = this;
		let service = this.dataService;
		let bSuper = p.hasRole('super');
		this.isSuper = bSuper;
		this.isAdmin = bSuper || p.hasRole('admin');
		if (bSuper){
		   service.find_all_departements().then((dd)=>{
		   	self.departements = dd;
		   });
		} else {
			service.find_elements_array(p.departementids).then((dd)=>{
				self.departements = dd;
				return service.find_elements_array(p.anneeids);
			}).then((aa)=>{
				self._annees = aa;
				return service.find_elements_array(p.semestreids);
			}).then((ss)=>{
				self._semestres = ss;
				return service.find_elements_array(p.uniteids);
			}).then((uu)=>{
				self._unites = uu;
				return service.find_elements_array(p.matiereids);
			}).then((mm)=>{
				self._matieres = mm;
				return service.find_all_elements(p.groupeids);
			}).then((gg)=>{
				self._groupes = gg;
			});
		}
		}// set person
	disconnect(){
		if (window.confirm('Voulez-vous vraiment quitter?')){
			this.person = null;
			let dummy = this.isConnected || this.isNotConnected;
		}
		return true;
	}// disconnect
	get departement(){
		return this._departement;
	}
	set departement(p){
		let px = (p !== undefined) ? p : null;
		let id = ((px !== null) && (px.id !== undefined)) ? px.id : null;
		this._departement = px;
		this.annees = [];
		this.unites = [];
		this.groupes = [];
		this.matieres = [];
		this.semestres = [];
		this._annee = null;
		this._semestre = null;
		this._unite = null;
		this._matiere = null;
		this._groupe = null;
		this.userInfo.departementid = id;
	    if (id !== null){
	  	if (this.isSuper){
	  		let self = this;
	  		var service = this.dataService;
	  		service.find_departement_unites(id).then((uu)=>{
	  			self.unites = uu;
	  			return service.find_departement_groupes(id);
	  		}).then((gg)=>{
	  			self.groupes = gg;
	  			return service.find_departement_annees(id);
	  		}).then((aa)=>{
	  			self.annees = aa;
	  		});
	  	} else {
	  		for (let a of this._annees){
	  			if (a.departementid == id){
	  				this.annees.push(a);
	  			}
	  		}// a
	  		for (let g of this._groupes){
	  			if (g.departementid == id){
	  				this.groupes.push(g);
	  			}
	  		}// a
	  		for (let u of this._unites){
	  			if (u.departementid == id){
	  				this.unites.push(u);
	  			}
	  		}// a
	  	}
	  }// id
	}
	get annee(){
		return this._annee;
	}
	set annee(p){
		let px = (p !== undefined) ? p : null;
		let id = ((px !== null) && (px.id !== undefined)) ? px.id : null;
		this._annee = px;
		this.semestres = [];
		this._semestre = null;
	  	this.userInfo.anneeid = id;
	  if (id !== null){
	  	if (this.isSuper){
	  		let self = this;
	  		var service = this.dataService;
	  		service.find_annee_semestres(id).then((ss)=>{
	  			self.semestres = ss;
	  		});
	  	} else {
	  		for (let a of this._semestres){
	  			if (a.anneeid == id){
	  				this.semestres.push(a);
	  			}
	  		}// a
	  	}
	  }// id
	}
	  get unite(){
		return this._unite;
	}
	set unite(p){
		let px = (p !== undefined) ? p : null;
		let id = ((px !== null) && (px.id !== undefined)) ? px.id : null;
		this._unite = px;
		this.matieres = [];
		this._matiere = null;
	  	this.userInfo.uniteid = id;
	  if (id !== null){
	  	if (this.isSuper){
	  		let self = this;
	  		var service = this.dataService;
	  		service.find_unite_matieres(id).then((mm)=>{
	  			self.matieres = mm;
	  		});
	  	} else {
	  		for (let a of this._matieres){
	  			if (a.uniteid == id){
	  				this.matieres.push(a);
	  			}
	  		}// a
	  	}
	  }// id
	}
	 get semestre(){
		return this._semestre;
	}
	set semestre(p){
		let px = (p !== undefined) ? p : null;
		let id = ((px !== null) && (px.id !== undefined)) ? px.id : null;
		this._semestre = px;
	  	this.userInfo.semestreid = id;
	}
	get matiere(){
		return this._matiere;
	}
	set matiere(p){
		let px = (p !== undefined) ? p : null;
		let id = ((px !== null) && (px.id !== undefined)) ? px.id : null;
		this._matiere = px;
	  	this.userInfo.matiereid = id;
	}
	get groupe(){
		return this._groupe;
	}
	set groupe(p){
		let px = (p !== undefined) ? p : null;
		let id = ((px !== null) && (px.id !== undefined)) ? px.id : null;
		this._groupe = px;
	  	this.userInfo.groupeid = id;
	}
}// class UserInfoClass
