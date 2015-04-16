//userinfo.js
//
import {EventAggregator} from 'aurelia-event-aggregator';
//
import {SessionObjectStore} from '../services/sessionstore';
import {Person} from '../domain/person';
import {EtudiantPerson} from '../domain/etudperson';
import {ProfPerson} from '../domain/profperson';
import {DataService} from '../services/dataservice';
//
@inject(EventAggregator,DataService)
export class UserInfo extends SessionObjectStore {
  constructor(eventAggregator,dataService) {
    super();
    var self = this;
    this.eventAggregator = eventAggregator;
    this.dataService = dataService;
    this._person = null;
    this.eventAggregator.subscribe('infoMessage',(payload) =>{
      if ((payload !== undefined) && (payload !== null)){
          let type = (payload.type !== undefined) ? payload.type : null;
          if (type !== null){
            let val = (payload.value !== undefined) ? payload.value : null;
            if (type == 'person'){
              self.person = val;
            } else if (type == 'departementid'){
              self.departementid = val;
            }else if (type == 'anneeid'){
              self.anneeid = val;
            }else if (type == 'semestreid'){
              self.semestreid = val;
            }else if (type == 'uniteid'){
              self.uniteid = val;
            }else if (type == 'matiereid'){
              self.matiereid = val;
            }else if (type == 'groupeid'){
              self.groupeid = val;
            } else if (type == 'disconnect'){
              self.person = null;
            }
          }// type
      }// payload
    });
  }// constructor
  get description() {
    return this.get_value('description');
  }
  set description(s){
    this.store_value('description',s);
  }
  get phone() {
    return this.get_value('phone');
  }
  set phone(s){
    this.store_value('phone',s);
  }
  get email() {
    return this.get_value('email');
  }
  set email(s){
    this.store_value('email',s);
  }
  get fullname() {
    return this.get_value('fullname');
  }
  set fullname(s){
    this.store_value('fullname',s);
  }
  get lastname() {
    return this.get_value('lastname');
  }
  set lastname(s){
    this.store_value('lastname',s);
  }
  get firstname() {
    return this.get_value('firstname');
  }
  set firstname(s){
    this.store_value('firstname',s);
  }
  get photoUrl() {
    return this.get_value('photoUrl');
  }
  set photoUrl(s){
    this.store_value('photoUrl',s);
  }
  get groupeid() {
    return this.get_value('groupeid');
  }
  set groupeid(s){
    this.store_value('groupeid',s);
  }
  get matiereid() {
    return this.get_value('matiereid');
  }
  set matiereid(s){
    this.store_value('matiereid',s);
  }
  get uniteid() {
    return this.get_value('uniteid');
  }
  set uniteid(s){
    this.store_value('uniteid',s);
  }
  get semestreid() {
    return this.get_value('semestreid');
  }
  set semestreid(s){
    this.store_value('semestreid',s);
  }
  get anneeid() {
    return this.get_value('anneeid');
  }
  set anneeid(s){
    this.store_value('anneeid',s);
  }
  get departementid() {
    return this.get_value('departementid');
  }
  set departementid(s){
    this.store_value('departementid',s);
  }
  get personid() {
    return this.get_value('personid');
  }
  set personid(s){
    this.store_value('personid',s);
  }
  get personrev() {
    return get_value('personrev');
  }
  set personrev(s) {
    this.store_value('personrev',s);
  }
  //
  get person() {
    if (this._person !== null){
      return null;
    }
    let sval = this.get_value('person');
    if (sval === null){
      return null;
    }
    let oMap = JSON.parse(sval);
    var t = ((oMap.type !== undefined) && (oMap.type !== null)) ? oMap.type : null;
    if (t === null){
      return null;
    }
    if (t == 'person') {
       this._person = new Person(oMap);
    } else if (t == 'etudperson') {
       this._person = new EtudiantPerson(oMap);
    }else if (t == 'profperson') {
       this._person = new ProfPerson(oMap);
    }  

    return this._person;
  }
  set person(pPers) {
    let p = (pPers !== undefined) ? pPers : null;
    let old = this.photoUrl;
    if (old !== null){
      window.URL.revokeObjectURL(old);
    }
    this.photoUrl = null;
    this._person = p;
    this.personid = null;
    this.personrev = null;
    this.departementid = null;
    this.anneeid = null;
    this.semestreid = null;
    this.uniteid = null;
    this.matiereid = null;
    this.groupeid = null;
    this.firstname = null;
    this.lastname = null;
    this.fullname = null;
    this.email = null;
    this.phone = null;
    this.description = null;
    if ((p !== null) && (p.id !== null)) {
      let docid = p.id;
      let avatarid = p.avatarid;
      this.personid = id;
      this.personrev = p.rev;
      this.firstname = p.firstname;
      this.lastname = p.lastname;
      this.fullname = p.fullname;
      this.email = p.email;
      this.phone = p.phone;
      this.description = p.description;
      if ((docid !== null) && (avatarid !== null)){
         var self = this;
         this.dataService.get_attachment(docid,avatarid).then((blob)=>{
            if ((blob !== undefined) && (blob !== null)){
              let x = window.URL.createObjectURL(blob);
              self.photoUrl = x;
            }
         });
      }// docid
    }// pPers
  }
  @computedFrom('photoUrl')
  get hasPhoto() {
    return (this.photoUrl !== null);
  }
}// class UserInfo