import React, { Component } from "react";
import { connect } from "react-redux";
import SearchForm from "../components/SearchForm";
import WineInfo from "../components/WineInfo";
import {
  SEARCH_WINE_REQUEST,
  CLEAR_SEARCH_LIST
} from "../reducers/addWineReducer";
import WineList from "../components/WineList";

class SearchWineContainer extends Component {
  render() {
    return (
      <div>
        <SearchForm searchWine={this.props.searchWine} />

        {this.props.searchedWines.length > 0 ? (
          <div className="wineList">
            {this.props.searchedWines.map((wine, index) => {
              return (
                <div className="search-result" key={index}>
                  <WineInfo wine={wine} />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchedWines: state.addWine.searchedWines
});

const mapDispatchToProps = dispatch => {
  return {
    clearWines: () => {
      dispatch({ type: CLEAR_SEARCH_LIST });
    },

    searchWine: vinmonopoletId => {
      dispatch({ type: SEARCH_WINE_REQUEST, payload: { vinmonopoletId } });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchWineContainer
);
