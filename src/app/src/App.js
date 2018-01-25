import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import WineInventory from "./containers/InventoryContainer";
import Navigation from "./components/Navigation";
import AddNewWineContainer from "./containers/AddNewWineContainer";
import SearchWineContainer from "./containers/SearchWineContainer";

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
            <Route exact path="/search" component={SearchWineContainer} />
            <Navigation />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
