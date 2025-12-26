import React from "react";
import BicycleLoader from "./BicycleLoader";
import "./Loading.css";

const Loading = ({ message, useBicycle = true }) => {
  if (useBicycle) {
    return <BicycleLoader message={message} />;
  }

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{message || "Loading..."}</p>
    </div>
  );
};

export default Loading;
