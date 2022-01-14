import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKuXPDlbijMTWfiSLkxpjN-GQPjacHOMo",
  authDomain: "mailapp-3b4fe.firebaseapp.com",
  projectId: "mailapp-3b4fe",
  storageBucket: "mailapp-3b4fe.appspot.com",
  messagingSenderId: "1057560374267",
  appId: "1:1057560374267:web:2b8bad87efdca31750395e",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
