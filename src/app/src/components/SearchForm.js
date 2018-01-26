import React, { Component } from "react";
import "./Form.css";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { vinmonopoletId: "" };
    this.handleFormChanged = this.handleFormChanged.bind(this);
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
  }

  handleFormChanged({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmitClicked() {
    this.props.searchWine(this.state.vinmonopoletId);
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
        <button className="submit-button" onClick={this.handleSubmitClicked}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchForm;
