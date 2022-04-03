//----------------------------------------
//  Our app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyDDCNYZS2GD_bFeRZGzfKuhBFycuIIwWkM",
    authDomain: "comp1800-project-9594b.firebaseapp.com",
    projectId: "comp1800-project-9594b",
    storageBucket: "comp1800-project-9594b.appspot.com",
    messagingSenderId: "610232817937",
    appId: "1:610232817937:web:136f5700974abf1e0754b0"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const fieldValue = firebase.firestore.FieldValue;