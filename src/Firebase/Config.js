

import { getFirestore } from "firebase/firestore";

import firebase from "firebase/compat/app";

import{ getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth" ; 
require('firebase/auth');


const firebaseConfig = {
        apiKey: "AIzaSyDflXTKqkzs_e7koIOe8laVRoYy2dCeaWI",
        authDomain: "blog-maker-fad3b.firebaseapp.com",
        projectId: "blog-maker-fad3b",
        storageBucket: "blog-maker-fad3b.appspot.com",
        messagingSenderId: "925579134566",
        appId: "1:925579134566:web:506b463304b55b393ccfa7",
        measurementId: "G-LDZ9M9B457"
      };


  const app = firebase.initializeApp(firebaseConfig);
   export const db = getFirestore(app);
  export const auth =getAuth(app);
  export const storage = getStorage(app);