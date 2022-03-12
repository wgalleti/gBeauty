// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6j6hVkXu8_HxgPHT7NpIG0YSpFGSgE0U",
  authDomain: "gbeauty-8c551.firebaseapp.com",
  projectId: "gbeauty-8c551",
  storageBucket: "gbeauty-8c551.appspot.com",
  messagingSenderId: "735293422414",
  appId: "1:735293422414:web:db3bd198870bc2db3e7c1f",
  measurementId: "G-C8LGM9L4FN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);