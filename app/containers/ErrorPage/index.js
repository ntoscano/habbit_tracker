import React from 'react';
import {connect} from 'react-redux';

class ErrorPage extends React.Component {
  render() {
    return (
      <div>
        Oops!
      </div>
    )
  }
}

ErrorPage.propTypes = {
  message: React.PropTypes.string
}

ErrorPage.defaultProps = {
  message: undefined
}

const mapStateToProps = (state, ownProps) => {
  return {
    message: ''
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
