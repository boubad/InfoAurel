import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
//
import {UserInfo} from './data/model/userinfo';
//
const HOME_ID = './data/model/home';
const NOT_IMPLEMENTED = './data/model/notimplemented';
const ADMIN_ID = './data/model/admin/admin-router';
//
@inject(Router,UserInfo)
export class App {
  constructor(router,userInfo) {
    this.router = router;
    this.userInfo = userInfo;
    this.router.configure(config => {
      config.title = 'InfoApp';
      config.map([
        { route: ['','home'],  moduleId: HOME_ID,      nav: true, title:'Accueil' },
        { route: 'admin-router',  moduleId: ADMIN_ID, nav: true, title:'Administration' },
        { route: 'affetuds',  moduleId: NOT_IMPLEMENTED, nav: false, title:'Affectation étudiants' },
        { route: 'affprofs',  moduleId: NOT_IMPLEMENTED, nav: false, title:'Affectations enseignants' },
        { route: 'etudiants',  moduleId: NOT_IMPLEMENTED, nav: false, title:'Etudiants' },
        { route: 'semestre',  moduleId: NOT_IMPLEMENTED, nav: false, title:'Semestres' },
        { route: 'annees',  moduleId: NOT_IMPLEMENTED, nav: false, title:'Années' },
        { route: 'enseignants',  moduleId: NOT_IMPLEMENTED, nav: false, title:'Enseignants' },
        { route: 'groupes',  moduleId: NOT_IMPLEMENTED, nav: false, title:'Groupes' },
        { route: 'matieres',  moduleId: NOT_IMPLEMENTED, nav: false, title:'Matières' },
        { route: 'unites',  moduleId: NOT_IMPLEMENTED, nav: false, title:'Unités' },
        { route: 'departements',  moduleId: NOT_IMPLEMENTED, nav: false, title:'Départements' }
      ]);
    });
  }
}
