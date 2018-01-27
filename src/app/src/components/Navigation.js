import React from "react";
import "./Components.css";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="footer">
      <Link to="/">
        <i className="fa fa-home fa-3x nav-item" />
      </Link>
      <Link to="/shoppinglist">
        <i className="fa fa-list fa-3x nav-item" />
      </Link>
      <Link to="/archive">
        <i className="fa fa-archive fa-3x nav-item" />
      </Link>
      <Link to="/search">
        <i className="fa fa-search fa-3x nav-item" />
      </Link>
    </div>
  );
};

export default Navigation;
