import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Helmet from "react-helmet";
import Error404 from "../Error404/Error404";
import Calendar from "../Calendar/Calendar";

class App extends React.Component<{}, {}> {
  show404 = () => {
    return <Error404 />;
  };

  showCalendar = () => {
    return <Calendar/>
  }

  render() {
    return (
      <Router>
        <Helmet>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Helmet>
        <div className="App">
          <Switch>
            <Route exact path="/" component={this.showCalendar} />
            <Route component={this.show404} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default App;
