import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth} from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9vByCuGr88-q0h5auXYvBxCUWAPn4X1Y",
  authDomain: "unity-project-80fdd.firebaseapp.com",
  databaseURL: "https://unity-project-80fdd-default-rtdb.firebaseio.com",
  projectId: "unity-project-80fdd",
  storageBucket: "unity-project-80fdd.appspot.com",
  messagingSenderId: "834856565383",
  appId: "1:834856565383:web:0306eac1fe36573b379622",
  measurementId: "G-5F2ZTFE3ZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth = getAuth(app);
let logUser;



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export {db as database};
export {auth,logUser};
