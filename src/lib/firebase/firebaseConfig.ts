import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoGbiU6aTHj2nMSbsSaTrIpMGDj_Niz5I",
  authDomain: "panting-9c670.firebaseapp.com",
  projectId: "panting-9c670",
  storageBucket: "panting-9c670.appspot.com",
  messagingSenderId: "699829832022",
  appId: "1:699829832022:web:0b80b782d0d5d3cfd0aef7",
  measurementId: "G-BL8PWBEQZ9",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage();
