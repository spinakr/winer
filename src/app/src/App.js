import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import WineInventory from "./containers/InventoryContainer";
import Navigation from "./components/Navigation";

class App extends Component {
  render() {
    return (
      <div className="AppContainer">
        <h1>Winer</h1>
        <Router>
          <div>
            <Route exact path="/" component={WineInventory} />
            <Route exact path="/shoppinglist" component={WineInventory} />
            <Route exact path="/archive" component={WineInventory} />
            <Navigation />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
