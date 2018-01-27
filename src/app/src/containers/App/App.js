import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import WineListContainer from "../WineListContainer";
import Navigation from "../../components/Navigation/Navigation";
import SearchWineContainer from "../SearchWineContainer";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Route exact path="/" component={WineListContainer} />
            <Route exact path="/shoppinglist" component={WineListContainer} />
            <Route exact path="/archive" component={WineListContainer} />
            <Route exact path="/search" component={SearchWineContainer} />
            <Navigation />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
