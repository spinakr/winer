import React, { Component } from "react";
import "./App.css";
import wineService from "./api/wine";

class App extends Component {
  componentDidMount() {
    wineService
      .get()
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return <div className="App">My App!</div>;
  }
}

export default App;
