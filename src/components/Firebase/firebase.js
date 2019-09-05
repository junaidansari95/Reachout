import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import * as firebase from "firebase";
import "firebase/firestore";


const config = {  
  apiKey: "AIzaSyCrZnHQsNxTh4opSw5CaqzcpLyw45IkHSE",
authDomain: "gourmet-1.firebaseapp.com",
databaseURL: "https://gourmet-1.firebaseio.com",
projectId: "gourmet-1",
storageBucket: "gourmet-1.appspot.com",
messagingSenderId: "847721690954"
};
firebase.initializeApp(config);
const storage = firebase.storage();

class Firebase {
  constructor() {


    this.auth = firebase.auth();
    this.db = firebase.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export {
  storage, Firebase as default
}
