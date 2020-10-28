import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.min.css";
import Routes from "./Routes";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes />
        <ToastContainer />
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
