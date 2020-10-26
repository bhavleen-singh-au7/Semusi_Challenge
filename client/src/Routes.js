import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import FallBack from "./pages/404";

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/" component={FallBack} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
