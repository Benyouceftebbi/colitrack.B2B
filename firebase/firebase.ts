import { initializeApp } from "firebase/app";
import { initializeAuth,browserLocalPersistence } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
const firebaseConfig = {
  apiKey: "AIzaSyA4YsEHLisv0iblWmyH7qE3CQaYv3d-ClI",
  authDomain: "deliverysync-9fdcd.firebaseapp.com",
  projectId: "deliverysync-9fdcd",
  storageBucket: "deliverysync-9fdcd.firebasestorage.app",
  messagingSenderId: "907163553140",
  appId: "1:907163553140:web:48d0127a7a4b3b1b353021"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{ persistence: browserLocalPersistence});
const db = getFirestore(app)
const storage = getStorage(app);
const functions = getFunctions(app);
// connectFunctionsEmulator(functions, "127.0.0.1", 5001);
export {db , storage,functions}
export default app 