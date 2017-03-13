import React from "react";
import { Route } from 'react-router-dom'

import Frontpage from 'Bitmatica/containers/Frontpage';
import ErrorPage from 'Bitmatica/containers/ErrorPage';
import TaskDetailPage from 'Bitmatica/containers/TaskDetailPage';

export default () => (
  <div>
    <Route exact path="/" component={Frontpage} />
    <Route path="/404" component={ErrorPage} />
    <Route path="/tasks/:id" component={TaskDetailPage} />
  </div>
);
