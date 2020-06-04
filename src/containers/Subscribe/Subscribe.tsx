import React from "react";
import "./Subscribe.scss";
import firebase from "firebase";

class Subscribe extends React.Component<{}, {}> {
  getNotifications = () => {
    // Retrieve Firebase Messaging object.
    const messaging = firebase.messaging();
    const key: any = process.env.PUBLIC_VAPID_KEY;
    if (key !== undefined) {
      messaging.usePublicVapidKey(key);

      // Get Instance ID token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      messaging
        .getToken()
        .then((currentToken) => {
          if (currentToken) {
            // sendTokenToServer(currentToken);
            // updateUIForPushEnabled(currentToken);
            console.log('currentToken')
          } else {
            // Show permission request.
            console.log(
              "No Instance ID token available. Request permission to generate one."
            );
            // Show permission UI.
            // updateUIForPushPermissionRequired();
            // setTokenSentToServer(false);
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        //   showToken("Error retrieving Instance ID token. ", err);
        //   setTokenSentToServer(false);
        });
    } else {
        console.log('no web-notification key')
      throw Error("no web-notification key");
    }
  };

  render() {
    return (
      <div className="subscribePage container">
        {/* <h3>Subscribe to web-notifications</h3> */}
        <button onClick={() => this.getNotifications()}>
          set-up web notifications
        </button>
      </div>
    );
  }
}

export default Subscribe;
