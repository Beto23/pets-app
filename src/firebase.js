import * as firebase from "firebase"


const config = {
    apiKey: "AIzaSyDrTwkdgsebwVilbxhWVdCOR6cHU6VS9A4",
    authDomain: "pets-1501294814838.firebaseapp.com",
    databaseURL: "https://pets-1501294814838.firebaseio.com",
    projectId: "pets-1501294814838",
    storageBucket: "",
    messagingSenderId: "399478224191"
};

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth();
export const firebaseDataBase = firebase.database()

export default firebase;