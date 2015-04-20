//userinfo.js
//
import {customElement, bindable, computedFrom} from 'aurelia-framework';
import {UserInfo} from '../data/model/userinfo';
import {DataService} from '../data/services/dataservice';
//
@customElement('user-info')
export class UserInfoCustomElement {
	constructor(){
		this.dataService = new DataService();
		this.userInfo = new UserInfo();
		this.isDepartement = true;
		this.isAnnee = true;
		this.isSemestre = true;
		this.isUnite = true;
		this.isMatiere = true;
		this.isGroupe = true;
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
	}
	@bindable({
      name:'personid', //name of the property on the class
  	  attribute:'personid', //name of the attribute in HTML
      changeHandler:'personidChanged', //name of the method to invoke on property changes
      defaultValue: null //default value of the property, if not bound or set in HTML
      });
	@bindable({
		name:'isDepartement',
		attribute:'isDepartement',
		defaultValue: false
	});
	@bindable({
		name:'isAnnee',
		attribute:'isAnnee',
		defaultValue: false
	});
	@bindable({
		name:'isSemestre',
		attribute:'isSemestre',
		defaultValue: false
	});
	@bindable({
		name:'isUnite',
		attribute:'isUnite',
		defaultValue: false
	});
	@bindable({
		name:'isMatiere',
		attribute:'isMatiere',
		defaultValue: false
	});
	@bindable({
		name:'isGroupe',
		attribute:'isGroupe',
		defaultValue: false
	});
	
	personidChanged(){
		let id = (this.personid !== undefined)? this.personid : null;
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
		if (id === null){
			return;
		}
		let self = this;
		let service = this.dataService;
		let pPers = null;
		let xurl = null;
		this.dataService.get_item_by_id(id).then((p)=>{
			let pPers = (p !== undefined) ? p : null;
			pPers = p;
			let avatarid = null;
			if (pPers !== null){
				avatarid = pPers.avatarid;
			}
			return avatarid;
		},(err)=>{
			pPers = null;
			return null;
		}).then((vid)=>{
			if (vid !== null){
				return service.get_attachment(id,vid);
			} else {
				return null;
			}
		},(e1)=>{
			return null;
		}).then((data)=>{
			if (data !== null){
               xurl = window.URL.createObjectURL(data);
			}
			if ((self.userInfo !== undefined) && (self.userInfo !== null)){
				self.photoUrl = xul;
			}
			self.photoUrl = xurl;
		},(e2)=>{
		});
	}// personidChanged
	get fullname(){
		let x = ((this.userInfo !== undefined) && (this.userInfo !== null)) ? this.userInfo : null;
		return (x !== null) ? x.fullname : null;
	}
	get photoUrl(){
		let x = ((this.userInfo !== undefined) && (this.userInfo !== null)) ? this.userInfo : null;
		return (x !== null) ? x.photoUrl : null;
	}
	get isConnected(){
		let x = ((this.userInfo !== undefined) && (this.userInfo !== null)) ? this.userInfo : null;
		return (x !== null) ? x.isConnected : false;
	}
	get hasPhoto(){
		let x = ((this.userInfo !== undefined) && (this.userInfo !== null)) ? this.userInfo : null;
		return (x !== null) ? x.hasPhoto : false;
	}
	//
	get person(){
		let x = ((this.userInfo !== undefined) && (this.userInfo !== null)) ? this.userInfo : null;
		return (x !== null) ? x.person : null;
	}
	set person(pPers){
		let p = (pPers !== undefined)? pPers : null;
		this._person = pPers;
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
		   	if ((dd !== undefined) && (dd !== null) && (dd.length > 0) ){
		   		self.departements = dd;
		   		self.departement = dd[0];
		   	}
		   });
		} else {
			let xxdeps = [];
			service.find_elements_array(p.departementids).then((dd)=>{
				self.departements = dd;
				xxdeps = dd;
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
				if ((xxdeps !== undefined) && (xxdeps !== null) && (xxdeps.length > 0) ){
		   		self.departement = xxdeps[0];
		   	}
			});
		}
		}// set person
	disconnect(){
		if (window.confirm('Voulez-vous vraiment quitter?')){
			this.personid = null;
			this.personidChanged();
			if ((this.userInfo !== undefined) && (this.userInfo !== null)){
				this.userInfo.person = null;
			}
			let dummy = this.isConnected;
		}
		return true;
	}// disconnect
	get departement(){
		return this._departement;
	}
	set departement(p){
		let px = (p !== undefined) ? p : null;
		let id = ((px !== null) && (px.id !== undefined)) ? px.id : null;
		if ((this.userInfo !== undefined) && (this.userInfo !== null)){
			this.userInfo.departementid = id;
		}
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
	  	if ((this.userInfo !== undefined) && (this.userInfo !== null)){
			this.userInfo.anneeid = id;
		}
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
	  	if ((this.userInfo !== undefined) && (this.userInfo !== null)){
			this.userInfo.uniteid = id;
		}
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
	  	if ((this.userInfo !== undefined) && (this.userInfo !== null)){
			this.userInfo.semestreid = id;
		}
	}
	get matiere(){
		return this._matiere;
	}
	set matiere(p){
		let px = (p !== undefined) ? p : null;
		let id = ((px !== null) && (px.id !== undefined)) ? px.id : null;
		this._matiere = px;
	  	if ((this.userInfo !== undefined) && (this.userInfo !== null)){
			this.userInfo.matiereid = id;
		}
	}
	get groupe(){
		return this._groupe;
	}
	set groupe(p){
		let px = (p !== undefined) ? p : null;
		let id = ((px !== null) && (px.id !== undefined)) ? px.id : null;
		this._groupe = px;
	  	if ((this.userInfo !== undefined) && (this.userInfo !== null)){
			this.userInfo.groupeid = id;
		}
	}
}// class UserInfoCustomElement
