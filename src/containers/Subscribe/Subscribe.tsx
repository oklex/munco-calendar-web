import React from "react";
import "./Subscribe.scss";
import { FirebaseContext } from "../../services/Firebase";
// import Firebase from "../../services/Firebase/firebase";

class Subscribe extends React.Component<{}, {}> {
  static contextType = FirebaseContext

  subButton = (e: any) => {
    let firebase = this.context;
    firebase.getFCMToken()
  }

  deleteFCMButton = (e: any) => {
    let firebase = this.context;
    firebase.deleteFCMTOken()
  }

  render() {
    return (
      <div className="subscribePage container">
        <h3>Subscribe to web-notifications</h3>
				<button onClick={this.subButton}>
					set-up web notifications
				</button>
        <br/>
				<button onClick={this.deleteFCMButton}>
					cancel your web notifications
				</button>
      </div>
    );
  }
}

export default Subscribe;
