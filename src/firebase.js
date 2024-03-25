// firebase.js
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';
// import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAR7NC9KtLA1kC3ASFtj0A_2laxLw03yc4",
  authDomain: "shoppers-feefe.firebaseapp.com",
  projectId: "shoppers-feefe",
  storageBucket: "shoppers-feefe.appspot.com",
  messagingSenderId: "995786555297",
  appId: "1:995786555297:web:716f80f2d1bb98e05c55e0",
  measurementId: "G-NES4FK06R3"
};

// const firebaseApp = initializeApp(firebaseConfig);
// // const db = getDatabase(firebaseApp);
// const db = getFirestore(firebaseApp);
// const auth = getAuth(firebaseApp);

// export { db, auth };

export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth(); 
export const db = firebase.firestore()

