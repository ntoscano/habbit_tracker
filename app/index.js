
import 'Bitmatica/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, combineReducers } from "redux";
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader';

import { syncHistoryWithStore, routerReducer } from "react-router-redux";

import routes from 'Bitmatica/routes';
import frontpageReducer from 'Bitmatica/containers/Frontpage/reducer';

import {loadState, saveState} from './localStorage';

const persistedState = loadState();
const store = createStore(
  combineReducers({
    cms: frontpageReducer,
    routing: routerReducer,
  }),
  persistedState
);

store.subscribe(() => {
  saveState(store.getState());
});

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        {Component}
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};
const App = routes;
render(
  <div>
    <Router>
      <App />
    </Router>
  </div>
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('Bitmatica/containers/Frontpage', () => {
    render(<Router><App /></Router>);
  });
}
