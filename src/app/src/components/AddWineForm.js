import React, { Component } from "react";
import "./Form.css";

class AddWineForm extends Component {
  constructor(props) {
    super(props);
    this.state = { vinmonopoletId: "" };

    this.handleFormChanged = this.handleFormChanged.bind(this);
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
  }

  handleFormChanged(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmitClicked() {
    this.props.addNewWine(this.state);
    this.setState({ vinmonopoletId: "" });
  }

  render() {
    if (this.props.errorMessage) {
      return <div>Wine was not added: {this.props.errorMessage}</div>;
    }

    if (this.props.successMessage) {
      return <div>Wine was added: {this.props.successMessage}</div>;
    }

    return (
      <div className="wine-form">
        <h2>Search Wine</h2>
        <input
          type="text"
          name="vinmonopoletId"
          placeholder="Vinmonopolet id"
          onChange={this.handleFormChanged}
          value={this.state.vinmonopoletId}
        />
        <button className="submit-button" onClick={this.handleSubmitClicked}>
          Search
        </button>
      </div>
    );
  }
}

export default AddWineForm;
