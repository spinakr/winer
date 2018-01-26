import React, { Component } from "react";
import AddWineForm from "../components/AddWineForm";
import wineService from "../api/wine";

class AddNewWineContainer extends Component {
  constructor(props) {
    super(props);
    this.addNewWine = this.addNewWine.bind(this);
    this.state = {
      successMessage: "",
      errorMessage: ""
    };
  }

  addNewWine(state) {
    wineService
      .post("", state)
      .then(response => {
        this.setState({
          successMessage: response.data.name
        });
        setTimeout(() => {
          this.setState({
            successMessage: ""
          });
        }, 3000);
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
    return (
      <div>
        <AddWineForm
          addNewWine={this.addNewWine}
          successMessage={this.state.successMessage}
          errorMessage={this.state.errorMessage}
        />
      </div>
    );
  }
}

export default AddNewWineContainer;
