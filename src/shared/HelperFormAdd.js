import { firebaseDataBase } from '../firebase';


export class HelperFormAdd {
    // static setPetName(id) {
    //     let path = `/pet/${id}`;
    //     firebaseDataBase.ref(path).set(name)
    // }    
    static addPet(item) {
        let path = `/pet/`;
        firebaseDataBase.ref(path).push(item)
    }
    static addLostPet(item) {
        let path = `/petLost/`;
        firebaseDataBase.ref(path).push(item)
    }
}

