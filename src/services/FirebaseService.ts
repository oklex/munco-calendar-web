import firebase from "firebase";

const configService = (): any => {
    if (process.env.NODE_ENV) {
        console.log("Firebase configured for PRODUCTION database")
        return {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.FIREBASE_DATABASE_URL,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
        };
    } else {
        throw Error("ENV variables incomplete")
    }
}

export let FirebaseInitialize = () => {
    try {
        firebase.initializeApp(configService())
        var connectedRef = firebase.database().ref(".info/connected");
        connectedRef.on("value", function (snap: any) {
            if (snap.val() === true) {
                console.log("connected");
            } else {
                console.log("not connected");
            }
        });
    } catch (err) {
        console.log("Firebase initialization failed");
        // throw err;
    }
};