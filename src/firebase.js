import { initializeApp } from "firebase/app";

import {
  getStorage,
  ref as Storageref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, get, push, onValue } from "firebase/database";
import {
  addDoc,
  getDoc,
  onSnapshot,
  collection,
  query,
  getDocs,
  where,
  getFirestore,
} from "firebase/firestore";

import { useState } from "react/cjs/react.development";

const firebaseConfig = {
  apiKey: "AIzaSyB4fXCzY8mbbl5jZr5Vh_yEBkS4uL3QGsQ",
  authDomain: "goshop-ac040.firebaseapp.com",
  projectId: "goshop-ac040",
  storageBucket: "goshop-ac040.appspot.com",
  messagingSenderId: "288114696249",
  appId: "1:288114696249:web:6a42da334bf9b198b1ade8",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

const uploadImage = async (file) => {
  const storageRef = Storageref(storage, "images/" + file.name);

  console.log(file);

  const uploader = uploadBytes(storageRef, file);

  const snap = uploader.then((snapshot) => {
    return getDownloadURL(snapshot.ref);
  });

  snap.then((url) => {
    console.log("the main url " + url);
  });

  //const newRef =  Storageref(storage , "/images/" + file.name );

  console.log("the ref . path === ", getDownloadURL(storageRef));

  return getDownloadURL(storageRef);
  // return storageRef.fullPath ;
};

const GetPosts = (uid) => {
  const starCountRef = ref(database, "posts/" + uid);
  onValue(starCountRef, async (snapshot) => {});
};

const NewProduct = async (uid, name, disc, file, catagory, price) => {
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  const storageRef = Storageref(storage, "images/" + file.name);

  console.log(file);

  const uploader = uploadBytes(storageRef, file);

  const snap = uploader.then((snapshot) => {
    return getDownloadURL(snapshot.ref);
  });

  snap.then((url) => {
    console.log("the main url " + url);

    const postid =
      Date.now().toString(36) + Math.random().toString(36).substr(2);

    get(ref(database, "products/" + uid + "/" + postid));

    set(ref(database, "products/" + uid + "/" + postid + "/"), {
      uid: uid,
      postid: postid,
      name: name,
      date: datetime,
      description: disc,
      catagory: catagory,
      cover: url,
      price: price,
    });
  });
};

const signinwithgoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }

    const q2 = query(collection(db, "carte"), where("uid", "==", user.uid));
    const docs2 = await getDocs(q2);
    if (docs2.docs.length === 0) {
      await addDoc(collection(db, "carte"), {
        uid: user.uid,
        list : []
        
      });
    }



  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

function writeUserData(
  userId,
  name,
  email,
  photoUrl,
  firstName,
  lastName,
  university,
  grade,
  field
) {
  set(ref(database, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: photoUrl,
    university: university,
    first_name: firstName,
    last_name: lastName,
    grade: grade,
    field: field,
  });
}

function getUserData(userId) {
  const starCountRef = ref(database, "users/" + userId);
  onValue(starCountRef, (snapshot) => {
    const d = snapshot.val();
  });
}

const logoutwithgoogle = () => auth.signOut();

export {
  signinwithgoogle,
  database,
  logoutwithgoogle,
  auth,
  writeUserData,
  getUserData,
  ref,
  set,
  get,
  onValue,
  uploadImage,
  NewProduct,
};
