import React, { Component } from "react";
import AddWineForm from "../components/AddWineForm";
import WineInfo from "../components/WineInfo";
import wineService from "../api/wine";

class SearchWineContainer extends Component {
  constructor(props) {
    super(props);
    this.addNewWine = this.addNewWine.bind(this);
    this.state = {
      errorMessage: ""
    };
  }

  addNewWine(state) {
    wineService
      .get(state.vinmonopoletId)
      .then(response => {
        this.setState({
          wine: response.data
        });
      })
      .catch(error => {
        this.setState({
          errorMessage: "adding wine failed"
        });
        setTimeout(() => {
          this.setState({
            errorMessage: ""
          });
        }, 3000);
      });
  }

  render() {
    if (this.state.wine) {
      return (
        <div className="wineList">
          <div className="search-result">
            <WineInfo wine={this.state.wine} />
          </div>
        </div>
      );
    }
    return (
      <AddWineForm
        addNewWine={this.addNewWine}
        errorMessage={this.state.errorMessage}
      />
    );
  }
}

export default SearchWineContainer;
