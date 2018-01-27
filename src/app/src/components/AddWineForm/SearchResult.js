import React from "react";
import WineInfo from "../WineList/WineInfo";
import "./SearchForm.css";

const SearchResult = ({ wine }) => {
  return (
    <div className="search-result">
      <div className="search-item">
        <WineInfo wine={wine} />
      </div>
    </div>
  );
};

export default SearchResult;
