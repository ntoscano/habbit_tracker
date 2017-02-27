import React from "react";
import {Router, Route, IndexRoute} from "react-router";

import Frontpage from 'Bitmatica/containers/Frontpage';
import ErrorPage from 'Bitmatica/containers/ErrorPage';

export default (history) => (
  <Router history={history}>
    <Route path="/" component={Frontpage} />
    <Route path="/404" component={ErrorPage} />
  </Router>
);
