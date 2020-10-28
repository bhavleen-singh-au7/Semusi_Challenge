import React from "react";
import Spinner from "../images/spinner.gif";

const Loader = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "10vh" }}>
      <img src={Spinner} alt="Loading..." />
    </div>
  );
};

export default Loader;
