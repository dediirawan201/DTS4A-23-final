// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzEvJAt99XyD14Ah6hGvrVvaBsINld8to",
    authDomain: "project-d6e6d.firebaseapp.com",
    projectId: "project-d6e6d",
    storageBucket: "project-d6e6d.appspot.com",
    messagingSenderId: "1060050288880",
    appId: "1:1060050288880:web:8334d84124f05ab41d4235"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//inialisasi firebase Auth
const auth = getAuth(app);

const registrasiDenganEmailPassword = async (email, kataSandi) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      kataSandi
    );

    //aturan firebase authentitication
    //setelah seorang register
    //maka secara auto langsung login
    console.log("User yang sudah registrasi adalah ", userCredential.user);
  } catch (err) {
    console.log(err);
    console.log("code ", err.code);
    console.log("msg", err.message);
  }
};

const signDenganEmailDanPassword = async (email,kataSandi) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          kataSandi
        );
    
        //aturan firebase authentitication
        //setelah seorang register
        //maka secara auto langsung login
        console.log("User yang sudah login adalah ", userCredential.user);
      } catch (err) {
        console.log(err);
        console.log("code ", err.code);
        console.log("msg", err.message);
      }
    };

//signout
const keluarAplikasi = async() => {
    try{
        await signOut(auth)
    }catch(err){
        console.log(err)
    }
}

export{
    auth,
    registrasiDenganEmailPassword,
    signDenganEmailDanPassword,
    keluarAplikasi,
}