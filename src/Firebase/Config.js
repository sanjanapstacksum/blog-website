import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import swal from "sweetalert";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
require("firebase/auth");

const firebaseConfig = {
  // apiKey: "AIzaSyDflXTKqkzs_e7koIOe8laVRoYy2dCeaWI",
  // authDomain: "blog-maker-fad3b.firebaseapp.com",
  // projectId: "blog-maker-fad3b",
  // storageBucket: "blog-maker-fad3b.appspot.com",
  // messagingSenderId: "925579134566",
  // appId: "1:925579134566:web:506b463304b55b393ccfa7",
  // measurementId: "G-LDZ9M9B457"
  apiKey: "AIzaSyCQ3qMNEyW7RVyGzNwY8V_P1MqAghlv3iA",
  authDomain: "blogss-32992.firebaseapp.com",
  projectId: "blogss-32992",
  storageBucket: "blogss-32992.appspot.com",
  messagingSenderId: "995471299631",
  appId: "1:995471299631:web:374cbb93225b2a79f3a2da",
  measurementId: "G-7CX2ZLCW5V",
};

const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const storage = getStorage(app);

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + ".png");

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });

  setLoading(false);

  swal("Done!", "Profile picture updated Successfully!", "success");
  window.location.reload(false);
}
