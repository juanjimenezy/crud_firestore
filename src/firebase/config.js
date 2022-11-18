import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD7H3C3CFn9CNSsjqZhTBngaZ3zxs_KXRc",
    authDomain: "crud-firestore-jj.firebaseapp.com",
    projectId: "crud-firestore-jj",
    storageBucket: "crud-firestore-jj.appspot.com",
    messagingSenderId: "554338416441",
    appId: "1:554338416441:web:ae14aad0064bc63b4b9ae8",
    measurementId: "G-YMXS65DLYD"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };