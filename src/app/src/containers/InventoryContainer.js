import React, { Component } from "react";
import wineService from "../api/wine";
import WineList from "../components/WineList";
import InfiniteScroll from "react-infinite-scroll-component";

const validStatuses = ["/", "/archive", "/shoppinglist"];
const pageSize = 12;

class InventoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wines: [],
      currentPage: 0,
      count: 0
    };
    this.fetchMoreWines = this.fetchMoreWines.bind(this);
  }

  fetchMoreWines() {
    const newPage = this.state.currentPage + 1;
    wineService
      .get(
        `${this.props.location.pathname}?page=${newPage}&pageCount=${pageSize}`
      )
      .then(response => {
        console.log(response);
        this.setState({
          wines: this.state.wines.concat(response.data.wines),
          count: response.data.count,
          currentPage: newPage
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    if (validStatuses.some(s => s === this.props.location.pathname)) {
      this.fetchMoreWines();
    }
  }

  render() {
    return (
      <InfiniteScroll
        next={this.fetchMoreWines}
        hasMore={this.state.currentPage * pageSize < this.state.count}
        loader={<h4>Loading...</h4>}
      >
        <WineList wines={this.state.wines} />
      </InfiniteScroll>
    );
  }
}

export default InventoryContainer;
