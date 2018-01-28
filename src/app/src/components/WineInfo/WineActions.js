import React from "react";
import "./WineInfo.css";

const WineActions = ({ wine, archiveWine }) => {
  if (wine.status === 1) {
    return (
      <button className="handle-button" onClick={archiveWine}>
        <i className="fa fa-recycle" />
      </button>
    );
  }

  return null;
};

export default WineActions;
