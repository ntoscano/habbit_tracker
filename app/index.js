
import 'Bitmatica/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'
import { createStore, combineReducers , applyMiddleware} from "redux";
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader';
import thunkMiddleware from 'redux-thunk'

import { syncHistoryWithStore, routerReducer } from "react-router-redux";

import routes from 'Bitmatica/routes';
import frontpageReducer from 'Bitmatica/containers/Frontpage/reducer';

import { fetchToDos, fetchEntries } from 'Bitmatica/containers/Frontpage/actions'

import {loadState, saveState} from './localStorage';

const persistedState = loadState();
const store = createStore(
  combineReducers({
    cms: frontpageReducer,
    routing: routerReducer,
  }),
  persistedState,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  ),
);

store.dispatch(fetchToDos()); // There's probably a better place to initiate this
// store.dispatch(fetchEntries()); // There's probably a better place to initiate this

// store.subscribe(() => {
//   saveState(store.getState());
// });

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
