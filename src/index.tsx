import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.scss";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase";
import dotenv from 'dotenv';

require('dotenv').config()

ReactDOM.render(<App />, document.getElementById("root"));

try {
  let config: any = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };
  firebase.initializeApp(config);
} catch (err) {
  console.log("Firebase connection failed");
  console.log(err);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
