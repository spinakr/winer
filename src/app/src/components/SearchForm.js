import React, { Component } from "react";
import "./Form.css";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { vinmonopoletId: "" };
    this.handleFormChanged = this.handleFormChanged.bind(this);
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
    this.handleSaveClicked = this.handleSaveClicked.bind(this);
  }

  handleFormChanged({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmitClicked() {
    this.props.searchWine(this.state.vinmonopoletId);
  }

  handleSaveClicked() {
    this.props.addWine(this.state.vinmonopoletId);
    this.setState({ vinmonopoletId: "" });
  }

  render() {
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
        <button
          className="submit-button"
          onClick={this.handleSubmitClicked}
          disabled={this.state.vinmonopoletId === ""}
        >
          Search
        </button>
        <button className="submit-button" onClick={this.handleSaveClicked}>
          Save
        </button>
      </div>
    );
  }
}

export default SearchForm;
