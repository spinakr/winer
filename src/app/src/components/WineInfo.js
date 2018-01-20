import React from "react";

const WineInfo = ({ wine }) => {
  return (
    <div className="wineInfoContainer">
      <div>{wine.name}</div>
      <div>{wine.country}</div>
      <div>{wine.price}</div>
    </div>
  );
};

export default WineInfo;
