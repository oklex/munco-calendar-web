import app from 'firebase/app';
import 'firebase/messaging'
// import 'firebase/auth'

class Firebase {
  auth: any;
  messaging: any;
  constructor() {
    let config: any = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    };
    if (config.databaseURL !== undefined) {
      try {
        app.initializeApp(config);
        // this.auth = app.auth();
        this.messaging = app.messaging()
        const key: any = process.env.REACT_APP_PUBLIC_VAPID_KEY;
        if (key !== undefined) {
          this.messaging.usePublicVapidKey(key);
        } else {
          console.log("no web-notification key");
          throw Error("no web-notification key");
        }
        console.log("Firebase connected");
      } catch (err) {
        console.log("Firebase connection failed: ", err);
        throw err
      }
    } else {
      console.log("Firebase connection failed");
      throw Error("Firebase configuration failed")
    }
  }

  getFCMToken = () => {
    console.log("Firebase::getFCMToken()")
    this.messaging
    .getToken()
    .then((currentToken: string) => {
      if (currentToken) {
        // sendTokenToServer(currentToken);
        // updateUIForPushEnabled(currentToken);
        console.log("currentToken: ", currentToken);
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
    .catch((err: Error) => {
      console.log("An error occurred while retrieving token. ", err);
      //   showToken("Error retrieving Instance ID token. ", err);
      //   setTokenSentToServer(false);
    });
  }

}

export default Firebase