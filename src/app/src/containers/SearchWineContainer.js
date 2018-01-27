import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import SearchForm from "../components/SearchForm";
import WineInfo from "../components/WineInfo";
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
          <div className="wineList">
            <div className="search-result">
              <WineInfo wine={this.props.searchedWine} />
            </div>
          </div>
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
