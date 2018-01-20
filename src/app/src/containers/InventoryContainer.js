import React, { Component } from "react";
import wineService from "../api/wine";
import WineList from "../components/WineList";

class InventoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { wines: [] };
  }

  componentDidMount() {
    wineService
      .get()
      .then(response => {
        console.log(response);
        this.setState({ wines: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return <WineList wines={this.state.wines} />;
  }
}

export default InventoryContainer;
