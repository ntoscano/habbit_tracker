import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';
import Routes from 'Bitmatica/containers/Routes';
import {fetchCurrentUser} from 'Bitmatica/containers/Frontpage/actions';

class App extends React.Component {

  componentDidMount () {
    this.props.fetchCurrentUser();
  }

  componentDidUpdate (prevProps) {
    const isLoggingOut = prevProps.user && !this.props.user;
    const isLoggingIn = !prevProps.user && this.props.user;

    if (isLoggingIn) {
      console.log('isLoggingIn');
      // send to redirectUrl
      console.log(this.props.history);
    } else if (isLoggingOut) {
      console.log('isLoggingOut');
      // send to login page
    }
  }

  render() {
    console.log(this.props);
    return (
      <Routes />
    )
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
