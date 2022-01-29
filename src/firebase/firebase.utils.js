import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';


const config = {
    apiKey: "AIzaSyCqY-YCW9BK2OapRzmzPGGYsuXK4snp07M",
    authDomain: "travideas-website.firebaseapp.com",
    projectId: "travideas-website",
    storageBucket: "travideas-website.appspot.com",
    messagingSenderId: "287620421",
    appId: "1:287620421:web:d885c17dcc7e8943c7522c",
    measurementId: "G-ZRB5RMJF77"
  }


export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    
    return;
  }
  
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()
  
  if (!(snapShot.exists)) {
    
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName, 
        email,
        createdAt,
        ...additionalData
      })
    }catch(error) {
    console.log("error creating user", error.message)
    }
  }

  return userRef
} 

export const createItineraryDocument = async (additionalData) => {
    try {
      const createdAt = new Date();
      const newitinerary = await firestore.collection("itinerary").add({
        createdAt,
        communitymembers: 0,
        communityratingtotal: 0,
        ...additionalData
      })
      return (newitinerary.id)
    }catch(error) {
      console.log("error creating user", error.message)
    }
    
}



firebase.initializeApp(config);

const storage = firebase.storage();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });


export {storage, firebase as default };



