import React from 'react';
import {connect} from 'react-redux';
import Component from 'Bitmatica/components/Component';

class ErrorPage extends React.Component {
  render() {
    return (
      <div>
        <Component greeting={'Oops!'} noun={this.props.message} />
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
