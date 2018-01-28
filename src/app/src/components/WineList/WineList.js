import React from "react";
import WineInfo from "../WineInfo/WineInfo";
import InfiniteScroll from "react-infinite-scroll-component";
import "./WineList.css";

const WineList = ({ wines, fetchMoreWines, moreWinesToFetch }) => {
  return (
    <div>
      <InfiniteScroll
        next={fetchMoreWines}
        hasMore={moreWinesToFetch}
        loader={<h4>Loading...</h4>}
      >
        <div className="wine-list">
          {wines.map(wine => {
            return <WineInfo key={wine.id} wine={wine} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default WineList;
