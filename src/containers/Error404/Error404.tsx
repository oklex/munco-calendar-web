import React from "react";
import "./Error404.scss";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

class Error404 extends React.Component<{}, {}> {
  render() {
    return (
      <div className="errorPage">
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="container">
          <h1><span role='img' aria-label='thinking-emoji'>🤔</span></h1>
          <h1>404</h1>
          <p>
            {"page not found  -  "}
            <Link to="/" className="btn-gold">
              Go back to home
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Error404;
