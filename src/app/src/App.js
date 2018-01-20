import React, { Component } from "react";
import "./App.css";
import WineInventory from "./containers/InventoryContainer";

class App extends Component {
  render() {
    return (
      <div className="AppContainer">
        <h1>Winer</h1>
        <WineInventory />
      </div>
    );
  }
}

export default App;
