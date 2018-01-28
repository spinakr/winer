import React from "react";
import WineActionsContainer from "../../containers/WineActionsContainer";
import "./WineInfo.css";

const WineInfo = ({ wine }) => {
  const vinmonopoletUrlBase = "https://bilder.vinmonopolet.no/cache/300x300-0/";
  return (
    <div className="wine-info-container">
      <div className="col-one">
        <div className="centered-text" style={{ minHeight: "70px" }}>
          <h3>{wine.name}</h3>
        </div>
        <div className="centered-text">
          {wine.type} - {wine.vintage}
        </div>
        <div className="centered-text">
          {wine.area}, {wine.country}
        </div>
        <div className="centered-text">{wine.price},-</div>
        <div>
          <WineActionsContainer wine={wine} />
        </div>
      </div>

      <div className="col-two">
        <img
          src={`${vinmonopoletUrlBase}${wine.vinmonopoletId}-1.jpg`}
          className="wine-image"
          alt=""
        />
      </div>
    </div>
  );
};

export default WineInfo;
