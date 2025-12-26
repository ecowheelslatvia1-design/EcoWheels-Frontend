import React from "react";
import "./BicycleLoader.css";

const BicycleLoader = ({ message = "Loading..." }) => {
  return (
    <div className="bicycle-loader-container">
      <div className="bicycle-loader">
        <img
          src="/images/loader.gif"
          alt="Loading..."
          className="bicycle-loader-gif"
        />
      </div>
      {message && <p className="bicycle-loader-text">{message}</p>}
    </div>
  );
};

export default BicycleLoader;

