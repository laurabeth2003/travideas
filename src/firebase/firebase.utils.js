import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const config = {
    apiKey: "AIzaSyCqY-YCW9BK2OapRzmzPGGYsuXK4snp07M",
    authDomain: "travideas-website.firebaseapp.com",
    projectId: "travideas-website",
    storageBucket: "travideas-website.appspot.com",
    messagingSenderId: "287620421",
    appId: "1:287620421:web:d885c17dcc7e8943c7522c",
    measurementId: "G-ZRB5RMJF77"
  }

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;



