import React, { Component } from "react";
import { connect } from "react-redux";
import WineList from "../components/WineList";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  FETCH_MORE_WINES_REQUEST,
  CLEAR_WINES_LIST
} from "../reducers/wineListReducer";

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
      <InfiniteScroll
        next={this.props.fetchMoreWines(this.status)}
        hasMore={this.props.currentPage * pageSize < this.props.count}
        loader={<h4>Loading...</h4>}
      >
        <WineList wines={this.props.wines} />
      </InfiniteScroll>
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
