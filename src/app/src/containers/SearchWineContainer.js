import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import SearchForm from "../components/AddWineForm/SearchForm";
import SearchResult from "../components/AddWineForm/SearchResult";
import {
  SEARCH_WINE_REQUEST,
  ADD_WINE_REQUEST
} from "../reducers/addWineReducer";

class SearchWineContainer extends Component {
  render() {
    return (
      <div>
        <SearchForm
          searchWine={this.props.searchWine}
          addWine={this.props.addWine}
        />

        {!isEmpty(this.props.searchedWine) ? (
          <SearchResult wine={this.props.searchedWine} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchedWine: state.addWine.searchedWine
});

const mapDispatchToProps = dispatch => {
  return {
    searchWine: vinmonopoletId => {
      dispatch({ type: SEARCH_WINE_REQUEST, payload: { vinmonopoletId } });
    },
    addWine: vinmonopoletId => {
      dispatch({ type: ADD_WINE_REQUEST, payload: { vinmonopoletId } });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchWineContainer
);
