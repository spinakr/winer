import React from "react";
import "./WineInfo.css";

const WineActions = ({ wine, archiveWine, moveToInventory }) => {
  if (wine.status === 1) {
    return (
      <button className="handle-button" onClick={archiveWine}>
        <i className="fa fa-recycle" />
      </button>
    );
  }
  if (wine.status === 3) {
    return (
      <button className="handle-button" onClick={moveToInventory}>
        <i className="fa fa-shopping-cart" />
      </button>
    );
  }

  return null;
};

export default WineActions;
