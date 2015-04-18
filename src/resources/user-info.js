//userinfo.js
//
import {inject, customElement, bindable,computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
//
import {DataService} from '../data/services/dataservice';
import {ElementDesc} from '../data/domain/elementdesc';
import {UserInfo} from '../data/model/userinfo';
import {BaseElement} from './baseelement';
//
import {app} from '../app';
//
@customElement('user-info')
@inject(EventAggregator,DataService,UserInfo)
export class UserInfoClass  extends BaseElement {
	@bindable showGroupes;
	@bindable showSemestres;
	@bindable showMatieres;
	@bindable showUnites;
	@bindable showAnnees;
	@bindable showDepartements;
	//
	constructor(eventAggregator,dataService,userInfo){
		super(eventAggregator,dataService,userInfo);
		var self = this;
		this.showGroupes = 'false';
		this.showSemestres = 'false';
		this.showUnites = 'false';
		this.showMatieres = 'false';
		this.showUnites = 'false';
		this.showDepartements = 'false';
		this.showAnnees = 'false';
		this.isConnected = false;
		this.fullname = null;
		this.photoUrl = null;
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
		this.subscribe();
	}// constructor
	subscribe(){
		if ((this.dispose_func === null) && (this.eventAggregator !== undefined) &&
			(this.eventAggregator !== null)){
			let self = this;
		this.eventAggregator.subscribe('personChanged',(msg) =>{
			let pPers = null;
			let xurl = null;
			if ((msg !== undefined) && (msg !== null)){
				if (msg.data !== undefined){
					pPers = msg.data;
				}
				if (msg.url !== undefined){
					xurl = msg.url;
				}
			}//msg
			self.perform_change_person(pPers,xurl);
		});
		}
  }// subscribe  
	perform_change_person(pPers,xurl){
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
		this.isConnected = false;
		this.fullname = null;
		this.photoUrl = null;
		this.isAdmin = false;
		this._departement = null;
		this._annee = null;
		this._semestre = null;
		this._unite = null;
		this._matiere = null;
		this._groupe = null;
		if ((pPers === undefined) || (pPers === null)){
			return;
		}
		let self = this;
		let service = this.dataService;
		this.isConnected = true;
		this.fullname = pPers.fullname;
		this.photoUrl = (xurl !== undefined) ? xurl : null;
		let bSuper = pPers.hasRole('super');
		this.isSuper = bSuper;
		this.isAdmin = bSuper || pPers.hasRole('admin');
		if (bSuper){
		   service.find_all_departements().then((dd)=>{
		   	self.departements = dd;
		   });
		} else {
			service.find_elements_array(pPers.departementids).then((dd)=>{
				self.departements = dd;
				return service.find_elements_array(pPers.anneeids);
			}).then((aa)=>{
				self._annees = aa;
				return service.find_elements_array(pPers.semestreids);
			}).then((ss)=>{
				self._semestres = ss;
				return service.find_elements_array(pPers.uniteids);
			}).then((uu)=>{
				self._unites = uu;
				return service.find_elements_array(pPers.matiereids);
			}).then((mm)=>{
				self._matieres = mm;
				return service.find_all_elements(pPers.groupeids);
			}).then((gg)=>{
				self._groupes = gg;
			});
		}
	}// perform_.change_person
	@computedFrom('photoUrl')
	get hasPhoto(){
		return (this.photoUrl !== null);
	}
	disconnect(){
		if (window.confirm('Voulez-vous vraiment quitter?')){
			this.userInfo.person = null;
			if ((app !== undefined) && (app !== null)){
				if ((app.router !== undefined) && (app.router !== null)){
					app.router.navigate("#welcome");
				}
			}
			//return this.publish('infoMessage',{type:'disconnect',value:null});
		}
		return true;
	}// disconnect
	check_attr(a){
		return ((a !== undefined) && (a !== null) && (a != 'false'));
	}
	@computedFrom('showDepartements')
	get isDepartement(){
		return this.check_attr(this.showDepartements);
	}
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
	@computedFrom('showAnnees')
	get isAnnee(){
		return this.check_attr(this.showAnnees);
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
	@computedFrom('showUnites')
	get isUnite(){
		return this.check_attr(this.showUnites);
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
	@computedFrom('showSemestres')
	get isSemestre(){
		return this.check_attr(this.showSemestres);
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
	@computedFrom('showMatieres')
	get isMatiere(){
		return this.check_attr(this.showMatieres);
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
	@computedFrom('showGroupes')
	get isGroupe(){
		return this.check_attr(this.showGroupe);
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
