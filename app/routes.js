import React from "react";
import { Route } from 'react-router-dom'

import Frontpage from 'Bitmatica/containers/Frontpage';
import ErrorPage from 'Bitmatica/containers/ErrorPage';

export default () => (
  <div>
    <Route exact path="/" component={Frontpage} />
    <Route path="/404" component={ErrorPage} />
  </div>
);
