// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js"
);
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyB1fCZW3o0zzeQouUGLx2JAQEWY2FGj63U",
  authDomain: "munco-calendar.firebaseapp.com",
  databaseURL: "https://munco-calendar.firebaseio.com",
  projectId: "munco-calendar",
  storageBucket: "munco-calendar.appspot.com",
  messagingSenderId: "686062822496",
  appId: "1:686062822496:web:b112e8f259c78b5cf30f05",
});

self.addEventListener("push", function (event) {
  let payload = event.data.json();
  console.log("Message recieved ", payload);
  this.showNotification(payload);
});

self.addEventListener("notificationclick", function (event) {
  window.location.href = "/";
  console.log("notification clicked");
});

async function isClientFocused() {
  return clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  })
  .then((windowClients) => {
    let clientIsFocused = false;
    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i];
      if (windowClient.focused) {
        clientIsFocused = true;
        break;
      }
    }

    return clientIsFocused;
  });
}

function showNotification(payload) {
  if (await isClientFocused()) {
    console.log('client is focused')
    const windowClients = await clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    });
    windowClients.forEach((windowClient) => {
      windowClient.postMessage({
        message: "Received a push message.",
        time: new Date().toString(),
      });
    });
    return;
  } 
  
  return self.registration.showNotification(payload.data.title, {
      icon:
        "https://s3-us-west-2.amazonaws.com/munco.ca/brand/Original+02-700px.png",
      body: payload.data.body,
    });
  
}