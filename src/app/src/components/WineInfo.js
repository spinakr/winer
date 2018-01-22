import React from "react";

const WineInfo = ({ wine }) => {
  const vinmonopoletUrlBase = "https://bilder.vinmonopolet.no/cache/300x300-0/";
  return (
    <div className="wineInfoContainer">
      <div className="col-one centered-text">
        <div style={{ minHeight: "70px" }}>
          <h3>{wine.name}</h3>
        </div>
        <div>
          {wine.type} - {wine.vintage}
        </div>
        <div>
          {wine.area}, {wine.country}
        </div>
        <div>{wine.price},-</div>
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
