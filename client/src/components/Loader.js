import React from "react";
import Spinner from "../images/spinner.gif";

const Loader = () => {
  return (
    <div
      style={{
        textAlign: "center",
        position: "absolute",
        top: "35%",
        left: "35%",
        zIndex: "2",
      }}
    >
      <img src={Spinner} alt="Loading..." />
    </div>
  );
};

export default Loader;
