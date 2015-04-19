//admin-router.js
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
//
import {UserInfo} from '../userinfo';
//
const HOME_ID = '../home';
const NOT_IMPLEMENTED = '../notimplemented';
//
@inject(Router,UserInfo)
export class AdminRouter{
  heading = 'Administration';
  constructor(router,userInfo){
    this.router = router;
    this.userInfo = userInfo;
    router.configure(config => {
      config.map([
        { route: ['','home'],  moduleId: HOME_ID,      nav: true, title:'Accueil' },
        { route: 'affetuds',  moduleId: NOT_IMPLEMENTED, nav: true, title:'Affectation étudiants' },
        { route: 'affprofs',  moduleId: NOT_IMPLEMENTED, nav: true, title:'Affectations enseignants' },
        { route: 'etudiants',  moduleId: NOT_IMPLEMENTED, nav: true, title:'Etudiants' },
        { route: 'semestre',  moduleId: NOT_IMPLEMENTED, nav: true, title:'Semestres' },
        { route: 'annees',  moduleId: NOT_IMPLEMENTED, nav: true, title:'Années' },
        { route: 'enseignants',  moduleId: NOT_IMPLEMENTED, nav: true, title:'Enseignants' },
        { route: 'groupes',  moduleId: NOT_IMPLEMENTED, nav: true, title:'Groupes' },
        { route: 'matieres',  moduleId: NOT_IMPLEMENTED, nav: true, title:'Matières' },
        { route: 'unites',  moduleId: NOT_IMPLEMENTED, nav: true, title:'Unités' },
        { route: 'departements',  moduleId: NOT_IMPLEMENTED, nav: true, title:'Départements' }
      ]);
    });
  }
}
