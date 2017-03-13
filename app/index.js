
import 'Bitmatica/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, combineReducers } from "redux";
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader';

import routes from 'Bitmatica/routes';
import frontpageReducer from 'Bitmatica/containers/Frontpage/reducer';


const store = createStore(
  combineReducers({
    cms: frontpageReducer,
  })
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
const App = routes;
render(<Router><App /></Router>);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('Bitmatica/containers/Frontpage', () => {
    render(<Router><App /></Router>);
  });
}
