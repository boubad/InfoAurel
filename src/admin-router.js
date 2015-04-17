//admin-router.js
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class AdminRouter{
  heading = 'Administration';

  constructor(router){
    this.router = router;
    router.configure(config => {
      config.map([
        { route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Welcome' },
        { route: 'affetuds',  moduleId: './welcome', nav: true, title:'Affectation étudiants' },
        { route: 'affprofs',  moduleId: './welcome', nav: true, title:'Affectations enseignants' },
        { route: 'etudiants',  moduleId: './welcome', nav: true, title:'Etudiants' },
        { route: 'semestre',  moduleId: './welcome', nav: true, title:'Semestres' },
        { route: 'annees',  moduleId: './welcome', nav: true, title:'Années' },
        { route: 'enseignants',  moduleId: './welcome', nav: true, title:'Enseignants' },
        { route: 'groupes',  moduleId: './welcome', nav: true, title:'Groupes' },
        { route: 'matieres',  moduleId: './welcome', nav: true, title:'Matières' },
        { route: 'unites',  moduleId: './welcome', nav: true, title:'Unités' },
        { route: 'departements',  moduleId: './welcome', nav: true, title:'Départements' }
      ]);
    });
  }
}
