import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import WineInventory from "./containers/InventoryContainer";
import Navigation from "./components/Navigation";
import AddNewWineContainer from "./containers/AddNewWineContainer";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Route exact path="/" component={WineInventory} />
            <Route exact path="/shoppinglist" component={WineInventory} />
            <Route exact path="/archive" component={WineInventory} />
            <Route exact path="/addnew" component={AddNewWineContainer} />
            <Navigation />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
