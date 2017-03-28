import React from "react";
import { Route } from 'react-router-dom'

import Frontpage from 'Bitmatica/containers/Frontpage';
import ErrorPage from 'Bitmatica/containers/ErrorPage';
import TaskDetailPage from 'Bitmatica/containers/TaskDetailPage';
import TaskEditPage from 'Bitmatica/containers/TaskEditPage';
import EntryEditPage from 'Bitmatica/containers/EntryEditPage';
import SignupPage from 'Bitmatica/containers/SignupPage';
import LoginPage from 'Bitmatica/containers/LoginPage';

export default () => (
  <div>
    <Route exact path="/" component={Frontpage} />
    <Route path="/404" component={ErrorPage} />
    <Route exact path="/tasks/:id" component={TaskDetailPage} />
    <Route exact path="/tasks/:id/edit" component={TaskEditPage} />
    <Route exact path="/entries/:id" component={EntryEditPage} />
    <Route exact path="/signup" component={SignupPage} />
    <Route exact path="/login" component={LoginPage} />
  </div>
);
