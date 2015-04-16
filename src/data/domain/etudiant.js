//etudiant.js
//
import {DepartementPerson} from './departementperson';
//
export class Etudiant extends DepartementPerson  {
  //
  constructor(oMap) {
    super(oMap);
  }// constructor
  get type() {
    return 'etudiant';
  }
  get collection_name() {
    return 'etudiants';
  }
  get base_prefix() {
    return 'ETD';
  }
}// class Etudiant
