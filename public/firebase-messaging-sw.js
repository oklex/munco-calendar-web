
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');
 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
 firebase.initializeApp({
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain:  process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   databaseURL:  process.env.REACT_APP_FIREBASE_DATABASE_URL,
   projectId:  process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket:  process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId:  process.env.REACT_APP_FIREBASE_SENDER_ID,
   appId:  process.env.REACT_APP_FIREBASE_APP_ID
 });
 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();

 messaging.setBackgroundMessageHandler(function(payload) {
   console.log('setBackgroundMessageHandler')
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});

self.addEventListener('notificationclick', function(event) {
  window.location.href = '/'
  console.log('notification clicked')
});