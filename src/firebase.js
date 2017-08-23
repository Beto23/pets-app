import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDrTwkdgsebwVilbxhWVdCOR6cHU6VS9A4',
  authDomain: 'pets-1501294814838.firebaseapp.com',
  databaseURL: 'https://pets-1501294814838.firebaseio.com',
  projectId: 'pets-1501294814838',
  storageBucket: 'gs://pets-1501294814838.appspot.com/',
  messagingSenderId: '399478224191',
};

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth();
export const firebaseDataBase = firebase.database();
export const firebaseStorage = firebase.storage();

export default firebase;
