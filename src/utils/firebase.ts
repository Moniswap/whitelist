import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, getCount } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "moniswap-e9773.firebaseapp.com",
  projectId: "moniswap-e9773",
  storageBucket: "moniswap-e9773.appspot.com",
  messagingSenderId: "1129847447",
  appId: "1:1129847447:web:4b0b1911ab39acba8aa7d2",
  measurementId: "G-985T3CDM5H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const whitelistCollectionRef = collection(db, "whitelist");

export async function checkIfRegistered(address: string) {
  try {
    const snapshot = await getDocs(whitelistCollectionRef);
    return snapshot.docs
      .map(doc => doc.data())
      .map(ddt => ddt.address)
      .includes(address);
  } catch (error) {
    throw error;
  }
}

export async function countParticipants() {
  try {
    const val = await getCount(whitelistCollectionRef);
    return val.data().count;
  } catch (error) {
    throw error;
  }
}

export async function addToWhitelist(address: string) {
  try {
    const dr = await addDoc(whitelistCollectionRef, { address });
    return console.log(`New doc written ${dr.id}`);
  } catch (error) {
    throw error;
  }
}
