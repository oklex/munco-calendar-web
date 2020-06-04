import React from "react";
import "./Subscribe.scss";
import firebase from "firebase";

class Subscribe extends React.Component<{}, {}> {
	componentDidMount = () => {
		const messaging = firebase.messaging();
		const key: any = process.env.REACT_APP_PUBLIC_VAPID_KEY;
		if (key !== undefined) {
			messaging.usePublicVapidKey(key);
		} else {
			console.log("no web-notification key");
			throw Error("no web-notification key");
		}
	};

	getNotifications = () => {
		// Retrieve Firebase Messaging object.
		const messaging = firebase.messaging();
		messaging
			.getToken()
			.then((currentToken) => {
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
			.catch((err) => {
				console.log("An error occurred while retrieving token. ", err);
				//   showToken("Error retrieving Instance ID token. ", err);
				//   setTokenSentToServer(false);
			});
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
