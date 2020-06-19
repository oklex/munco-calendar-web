import app from 'firebase/app';
import 'firebase/messaging'
import 'firebase/auth'
import NotificationService from '../Notifications/notifications';

class Firebase {
  auth: any;
  messaging: any;
  fcmToken: string | null;
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
        this.auth = app.auth();
        this.fcmToken = null;
        this.messaging = app.messaging()
        const key: any = process.env.REACT_APP_PUBLIC_VAPID_KEY;
        if (key !== undefined) {
          this.messaging.usePublicVapidKey(key);
          this.messaging.onMessage((payload: any) => {
            console.log("Message recieved ", payload);
            new Notification(payload.notification.title, {
                  icon: 'https://s3-us-west-2.amazonaws.com/munco.ca/brand/Original+02-700px.png',
                  body: payload.notification.body,
                })
          })
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

  getFCMToken = async () => {
    console.log("Firebase::getFCMToken()")
    return await this.messaging
      .getToken()
      .then(async (currentToken: string) => {
        if (currentToken.length > 0) {
          console.log("currentToken recieved");
          this.fcmToken = currentToken;
          let check: any = await NotificationService.check(this.fcmToken)
          if (check.settings) {
            console.log('token already registered ', check)
            return check
          } else {
            console.log('registering token ')
            return await NotificationService.register(this.fcmToken)
          }
        } else {
          throw Error("bad token")
        }
      })
      .catch((err: Error) => {
        console.log("An error occurred while retrieving token. ", err);
      });
  }

  deleteFCMTOken = () => {
    console.log('Firebase::deleteFCMTOken()')
    if (this.fcmToken) {
      try {
        NotificationService.unregister(this.fcmToken)
      } catch (err) {
        console.log(err)
      }
    }
  }

}

export default Firebase