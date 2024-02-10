import React from "react";
import ReactDOM from "react-dom/client";
import { swRegister } from "pwa-updater";

import { BrowserRouter } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import "./assests/index.js";
// third-party
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./components/redux/index.js";

import App from "./App.js";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.js";
import reportWebVitals from "./reportWebVitals.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReduxProvider store={store}>
    <ReactNotifications />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();
serviceWorkerRegistration.register(swRegister);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
