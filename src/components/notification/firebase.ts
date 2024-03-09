import React from "react";
import { useDispatch } from "react-redux";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import { getAnalytics } from "firebase/analytics";
import { Store } from "react-notifications-component";
import "animate.css";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq347c65AwVDzv09GelVCgTpWA5rxbKu8",
  authDomain: "jewelrydistricts-co.firebaseapp.com",
  projectId: "jewelrydistricts-co",
  storageBucket: "jewelrydistricts-co.appspot.com",
  messagingSenderId: "505146476448",
  appId: "1:505146476448:web:c2e386e30d4e9e2cac06c5",
  measurementId: "G-TY74J5QV8S",
};
// redux seters
import { setFirebaseToken } from "../redux/reducers/page";
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

getAnalytics(firebaseApp);

const RequestForToken = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    // alert('RequestForToken');
    getToken(messaging, {
      vapidKey:
        "BHq6aWtr-NHPwV8VcX7wlFOPnIouNUQlMwPIVbbUXCtD7u4MuED23K2OIo3g9PhiYVeplnxhvmxrTcOic-E-suo",
    })
      .then((currentToken) => {
        // alert(currentToken);
        if (currentToken) {
          dispatch(setFirebaseToken(currentToken));
          // console.log("current token for client: ", currentToken);
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          // alert(
          //   "No registration token available. Request permission to generate one."
          // );
        }
      })
      .catch((err) => {
        // alert("An error occurred while retrieving token. ", err);
      });
  }, []);
};
export default RequestForToken;
// export const onMessageListener = (pathname) =>
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(
      messaging,
      (payload) => {
        // console.log({pathname});
        // if (pathname !== "/chat") {
        Store.addNotification({
          title: payload.notification.title,
          message: payload.notification.body,
          type: "info",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__flipInY"],
          animationOut: ["animate__animated", "animate__flipOutX"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        resolve(payload);
      }
      // }
    );
  });
