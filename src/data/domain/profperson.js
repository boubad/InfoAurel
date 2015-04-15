// profperson.js
//
import {
    Person
}
from './person';
//
export class ProfPerson extends Person {
    constructor(oMap) {
        super(oMap);
        this.roles = ['prof'];
    }
    get type() {
        return "profperson";
    }
} // class ProfPerson