import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX1RT1A6h_bn-zAQQS5siBrHxGbXSm5RQ",
  authDomain: "hypewear-36cdf.firebaseapp.com",
  projectId: "hypewear-36cdf",
  storageBucket: "hypewear-36cdf.firebasestorage.app",
  messagingSenderId: "471358862045",
  appId: "1:471358862045:web:5a066500fed27451c8a134",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);