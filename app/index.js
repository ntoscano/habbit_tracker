
import 'Bitmatica/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router , Route} from 'react-router-dom'
import { createStore, combineReducers , applyMiddleware} from "redux";
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader';
import thunkMiddleware from 'redux-thunk'
import { syncHistoryWithStore, routerReducer } from "react-router-redux";

import frontpageReducer from 'Bitmatica/containers/Frontpage/reducer';

import App from 'Bitmatica/containers/App';

const store = createStore(
  combineReducers({
    cms: frontpageReducer,
    routing: routerReducer,
  }),
  undefined,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  ),
);

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

render(
    <Router>
      <Route component={App} />
    </Router>
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('Bitmatica/containers/Frontpage', () => {
    render(<Router><App /></Router>);
  });
}
