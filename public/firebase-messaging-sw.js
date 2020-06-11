
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');
 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
 firebase.initializeApp({
   apiKey: 'AIzaSyB1fCZW3o0zzeQouUGLx2JAQEWY2FGj63U',
   authDomain:  'munco-calendar.firebaseapp.com',
   databaseURL:  'https://munco-calendar.firebaseio.com',
   projectId:  'munco-calendar',
   storageBucket:  'munco-calendar.appspot.com',
   messagingSenderId:  '686062822496',
   appId:  '1:686062822496:web:b112e8f259c78b5cf30f05'
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