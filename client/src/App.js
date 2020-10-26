import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
