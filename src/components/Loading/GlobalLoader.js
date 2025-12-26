import React from "react";
import { useLoading } from "../../context/LoadingContext";
import BicycleLoader from "./BicycleLoader";

const GlobalLoader = () => {
  const { loading, loadingMessage } = useLoading();

  if (!loading) {
    return null;
  }

  return <BicycleLoader message={loadingMessage} />;
};

export default GlobalLoader;

