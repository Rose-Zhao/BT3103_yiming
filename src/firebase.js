import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKA7mtB3XNeDUR3kZKnb52CaSlV5eAr3E",
    authDomain: "bt3103-yiming.firebaseapp.com",
    projectId: "bt3103-yiming",
    storageBucket: "bt3103-yiming.appspot.com",
    messagingSenderId: "922602727836",
    appId: "1:922602727836:web:087afef0039250d79b4059",
    measurementId: "G-S92W4CXYNG"
  }

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;  