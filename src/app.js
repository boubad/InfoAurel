import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
//
import {UserInfo} from './data/model/userinfo';
//
@inject(Router,UserInfo)
export class App {
  constructor(router,userInfo) {
    this.router = router;
    this.userInfo = userInfo;
    this.userInfo.subscribe();
    this.router.configure(config => {
      config.title = 'InfoApp';
      config.map([
        { route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Welcome' },
        { route: 'admin-router',  moduleId: './admin-router', nav: true, title:'Administration' },
        { route: 'affetuds',  moduleId: './welcome', nav: false, title:'Affectation étudiants' },
        { route: 'affprofs',  moduleId: './welcome', nav: false, title:'Affectations enseignants' },
        { route: 'etudiants',  moduleId: './welcome', nav: false, title:'Etudiants' },
        { route: 'semestre',  moduleId: './welcome', nav: false, title:'Semestres' },
        { route: 'annees',  moduleId: './welcome', nav: false, title:'Années' },
        { route: 'enseignants',  moduleId: './welcome', nav: false, title:'Enseignants' },
        { route: 'groupes',  moduleId: './welcome', nav: false, title:'Groupes' },
        { route: 'matieres',  moduleId: './welcome', nav: false, title:'Matières' },
        { route: 'unites',  moduleId: './welcome', nav: false, title:'Unités' },
        { route: 'departements',  moduleId: './welcome', nav: false, title:'Départements' }
      ]);
    });
  }
}
