import React from "react";
import WineInfo from "./WineInfo";
import "./WineList.css";

const WineList = ({ wines }) => {
  return (
    <div className="wine-list">
      {wines.map(wine => {
        return <WineInfo key={wine.id} wine={wine} />;
      })}
    </div>
  );
};

export default WineList;
