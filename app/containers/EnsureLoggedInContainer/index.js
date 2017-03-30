import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';
import { browserHistory } from 'react-router';
import {setRedirectUrl} from 'Bitmatica/containers/Frontpage/actions';

class EnsureLoggedInContainer extends React.Component {
  componentDidMount () {

    if (!this.props.user) {
      this.props.setRedirectUrl(this.props.currentUrl);
      this.props.history.replace("/login");
    }
  }

  render () {
    console.log(this.props);
    if (this.props.user) {
      console.log('logged in');
      return null;
    } else {
      console.log('not logged in');
      return null;
    }
  }

}

EnsureLoggedInContainer.propTypes = {
  user: React.PropTypes.object,
  currentUrl: React.PropTypes.string,
}

EnsureLoggedInContainer.defaultProps = {
  user: undefined,
  currentUrl: undefined,
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.cms.user,
    currentUrl: ownProps.location.pathname,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setRedirectUrl: (url) => {
      dispatch(setRedirectUrl(url));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnsureLoggedInContainer)
