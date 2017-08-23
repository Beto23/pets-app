import { firebaseDataBase } from '../firebase';

export class HelperFormAdd {
  // static setPetName(id) {
  //     let path = `/pet/${id}`;
  //     firebaseDataBase.ref(path).set(name)
  // }    
  static addPet(item) {
    const path = '/pet/';
    firebaseDataBase.ref(path).push(item);
  }
  static addLostPet(item) {
    const path = '/petLost/';
    firebaseDataBase.ref(path).push(item);
  }
}

