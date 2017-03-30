import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';
import { browserHistory , Route, Switch, Redirect} from 'react-router-dom';
import {fetchCurrentUser, logout, setRedirectUrl} from 'Bitmatica/containers/Frontpage/actions';
import NavBar from 'Bitmatica/components/NavBar';

import Frontpage from 'Bitmatica/containers/Frontpage';
import ErrorPage from 'Bitmatica/containers/ErrorPage';
import TaskDetailPage from 'Bitmatica/containers/TaskDetailPage';
import TaskEditPage from 'Bitmatica/containers/TaskEditPage';
import EntryEditPage from 'Bitmatica/containers/EntryEditPage';
import SignupPage from 'Bitmatica/containers/SignupPage';
import LoginPage from 'Bitmatica/containers/LoginPage';
// import EnsureLoggedInContainer from 'Bitmatica/containers/EnsureLoggedInContainer';

class App extends React.Component {

  componentDidMount () {
    this.props.fetchCurrentUser();
  }

  componentDidUpdate (prevProps) {
    const isLoggingOut = prevProps.user && !this.props.user;
    const isLoggingIn = !prevProps.user && this.props.user;

    if (isLoggingIn) {
      console.log('isLoggingIn');
      this.props.history.push(this.props.redirectUrl);
      // send to redirectUrl
    } else if (isLoggingOut) {
      console.log('isLoggingOut');
      this.props.history.replace("/login");
      // send to login page
    }
  }

  render() {
    // From https://reacttraining.com/react-router/web/example/auth-workflow
    const PrivateRoute = ({ component, ...rest }) => (
      <Route {...rest} render={props => (
        this.props.user ? (
          React.createElement(component, props)
        ) : (
          <Redirect to={{
            pathname: '/login',
          }}/>
        )
      )}/>
    )

    return (
      <div>
        <NavBar user={this.props.user} onClickLogout={this.props.logout} />

        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route path="/404" component={ErrorPage} />

        <PrivateRoute exact path="/" component={Frontpage} />
        <PrivateRoute exact path="/tasks/:id" component={TaskDetailPage} />
        <PrivateRoute exact path="/tasks/:id/edit" component={TaskEditPage} />
        <PrivateRoute exact path="/entries/:id" component={EntryEditPage} />
        <PrivateRoute path="/404" component={ErrorPage} />

      </div>
    );
  }
}

App.propTypes = {
  user: React.PropTypes.object,
  redirectUrl: React.PropTypes.string,
}

App.defaultProps = {
  user: undefined,
  redirectUrl: '/',
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.cms.user,
    redirectUrl: state.cms.redirectUrl,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCurrentUser: () => {
      dispatch(fetchCurrentUser());
    },
    logout: () => {
      dispatch(logout());
    },
    setRedirectUrl: (url) => {
      dispatch(setRedirectUrl(url));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
