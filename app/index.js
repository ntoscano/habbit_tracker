import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers } from "redux";
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import { browserHistory } from "react-router";
import { AppContainer } from 'react-hot-loader';

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

const history = syncHistoryWithStore(browserHistory, store);

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
render(routes(history));

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('Bitmatica/containers/Frontpage', () => {
    render(Frontpage)
  });
}
