import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyB7zdQ4mAN--x5kA7z0LFZYSUaWnj9Hk7Q",
    authDomain: "frontend-crud-3rd.firebaseapp.com",
    databaseURL: "https://frontend-crud-3rd.firebaseio.com",
    projectId: "frontend-crud-3rd",
    storageBucket: "frontend-crud-3rd.appspot.com",
    messagingSenderId: "450780120161",
    appId: "1:450780120161:web:b1b5c58b90f8305c015620",
    measurementId: "G-FZDEW1QKHM"
  };
  // Initialize Firebase
 var firebaseApp = firebase.initializeApp(config);

 


export default firebaseApp;