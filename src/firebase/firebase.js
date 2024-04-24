import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { setDoc, doc, getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBaiK1YQXzzrB8cqgNxg62KwrLRYEIjz_A",
    authDomain: "music-emotion-18647.firebaseapp.com",
    projectId: "music-emotion-18647",
    storageBucket: "music-emotion-18647.appspot.com",
    messagingSenderId: "226583024150",
    appId: "1:226583024150:web:7cc66a08fa6078eea91b37"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);



export { app, auth, db, storage };
