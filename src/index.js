import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.scss";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Firebase, { FirebaseContext } from './services/Firebase';

require('dotenv').config()

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
