import React from "react";
import "./Components.css";
import WineInfo from "./WineInfo";

const WineList = ({ wines }) => {
  return (
    <div className="wineList">
      {wines.map(wine => {
        return <WineInfo key={wine.id} wine={wine} />;
      })}
    </div>
  );
};

export default WineList;
