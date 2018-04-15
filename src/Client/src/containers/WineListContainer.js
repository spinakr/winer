import React, { Component } from "react";
import { connect } from "react-redux";
import {
  FETCH_MORE_WINES_REQUEST,
  CLEAR_WINES_LIST
} from "../reducers/wineListReducer";
import WineList from "../components/WineList/WineList";

const validStatuses = ["/", "/archive", "/shoppinglist"];
const pageSize = 12;

class WineListContainer extends Component {
  status = this.props.location.pathname;

  componentDidMount() {
    this.props.clearWines();
    if (validStatuses.some(s => s === this.status)) {
      this.props.fetchMoreWines(this.status)();
    }
  }
  render() {
    return (
      <WineList
        wines={this.props.wines}
        fetchMoreWines={this.props.fetchMoreWines(this.status)}
        moreWinesToFetch={this.props.currentPage * pageSize < this.props.count}
      />
    );
  }
}

const mapStateToProps = state => ({
  wines: state.wineList.wines,
  count: state.wineList.count,
  currentPage: state.wineList.currentPage
});

const mapDispatchToProps = dispatch => {
  return {
    clearWines: () => {
      dispatch({ type: CLEAR_WINES_LIST });
    },

    fetchMoreWines: status => () => {
      dispatch({ type: FETCH_MORE_WINES_REQUEST, payload: { status } });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WineListContainer);
