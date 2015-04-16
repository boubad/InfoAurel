//itemgenerator.js
//
import {Departement} from '../domain/departement';
import {Person} from '../domain/person';
import {EtudiantPerson} from '../domain/etudperson';
import {ProfPerson} from '../domain/profperson';
import {Annee} from '../domain/annee';
import {Unite} from '../domain/unite';
import {Groupe} from '../domain/groupe';
import {Matiere} from '../domain/matiere';
import {Semestre} from '../domain/semestre';
import {Enseignant} from '../domain/enseignant';
import {Etudiant} from '../domain/etudiant';
import {ProfAffectation} from '../domain/profaffectation';
import {EtudAffectation} from '../domain/departement';
import {GroupeEvent} from '../domain/groupeevent';
import {EtudEvent} from '../domain/etudevent';
//
export class ItemGenerator  {
  constructor() {
  }// constructor
  create_item(oMap) {
    if ((oMap === undefined) || (oMap === null)) {
      return null;
    }
    if ((oMap.type === undefined) || (oMap.type === null)) {
      return null;
    }
    let t = oMap.type.trim().toLowerCase();
    if (t.length < 1) {
      return null;
    }
    if (t == 'departement') {
      return new Departement(oMap);
    } else if (t == 'person') {
      return new Person(oMap);
    } else if (t == 'etudperson') {
      return new EtudiantPerson(oMap);
    } else if (t == 'profperson') {
      return new ProfPerson(oMap);
    } else if (t == 'etud') {
      return new Etudiant(oMap);
    } else if (t == 'enseignant') {
      return new Enseignant(oMap);
    } else if (t == 'unite') {
      return new Unite(oMap);
    } else if (t == 'groupe') {
      return new Groupe(oMap);
    } else if (t == 'matiere') {
      return new Matiere(oMap);
    } else if (t == 'semestre') {
      return new Semestre(oMap);
    } else if (t == 'profaffectation') {
      return new ProfAffectation(oMap);
    } else if (t == 'etudaffectation') {
      return new EtudAffectation(oMap);
    } else if (t == 'groupeevent') {
      return new GroupeEvent(oMap);
    } else if (t == 'etudevent') {
      return new EtudEvent(oMap);
    } 
    //
    return null;
  }// create_item
  convert_items(dd) {
    let oResult = [];
    if ((dd !== undefined) && (dd !== null)) {
      for (let oMap of dd){
        let p = this.create_item(oMap);
        if (p !== null){
          oResult.push(p);
        }
      }// oMap
    }// dd
    if (oResult.length > 1) {
      let p = oResult[0];
      let t = p.sort_func;
      if ((t !== undefined) && (t !== null)) {
        oResult.sort(t);
      }
    }
    return oResult;
  }// convert_items
}// class ItemGenerator