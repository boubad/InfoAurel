//userinfo.js
//
import {singleton,computedFrom} from 'aurelia-framework';
//
import {SessionObjectStore} from '../services/sessionstore';
import {Person} from '../domain/person';
import {EtudiantPerson} from '../domain/etudperson';
import {ProfPerson} from '../domain/profperson';
//
@singleton()
export class UserInfo extends SessionObjectStore {
  constructor() {
    super();
    this.dataService = dataService;
    this._person = null;
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
  @computedFrom('photoUrl')
  get hasPhoto(){
    return (this.photoUrl !== null);
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
    this.matiereid = null;
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
    this.semestreid = null;
  }
  get departementid() {
    return this.get_value('departementid');
  }
  set departementid(s){
    this.store_value('departementid',s);
    this.anneeid = null;
    this.groupeid = null;
    this.uniteid = null;
  }
  get personid() {
    return this.get_value('personid');
  }
  set personid(s){
    this.store_value('personid',s);
  }
  get personrev() {
    return this.get_value('personrev');
  }
  set personrev(s) {
    this.store_value('personrev',s);
  }
  get password(){
    return this.get_value('password');
  }
  set password(s){
    this.store_value('password',s);
  }
  //
  get person() {
    if (this._person !== null){
      return this._person;
    }
    let sval = this.get_value('person');
    if (sval === null){
      return null;
    }
    let oMap = null;
    try {
         oMap = JSON.parse(sval);
         var t = ((oMap.type !== undefined) && (oMap.type !== null)) ? oMap.type : null;
          if (t === null){
            return null;
          }
        if (t == 'person') {
          this._person = new Person(oMap);
        } else if (t == 'etudperson') {
          this._person = new EtudiantPerson(oMap);
       }  else if (t == 'profperson') {
        this._person = new ProfPerson(oMap);
      }
    }catch(e){
        console.log('UserInfo get person error: ' + JSON.stringify(e));
    }
    return this._person;
  }
  set person(pPers) {
      let p = (pPers !== undefined) ? pPers : null;
    this.photoUrl = null;
    this._person = null;
    this.personid = null;
    this.password = null;
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
       let oMap  = {};
       p.to_map(oMap);
       this.store_value('person',oMap);
      let docid = p.id;
      let avatarid = p.avatarid;
      this.personid = docid;
      this.personrev = p.rev;
      this.firstname = p.firstname;
      this.lastname = p.lastname;
      this.fullname = p.fullname;
      this.email = p.email;
      this.phone = p.phone;
      this.password = p.password;
      this.description = p.description;
  }
  @computedFrom('person')
  get isConnected(){
    let p = this.person;
    return ((p !== undefined) && (p !== null) && (p.id !== undefined) && (p.id !== null));
  }// isConnected
}// class UserInfo
