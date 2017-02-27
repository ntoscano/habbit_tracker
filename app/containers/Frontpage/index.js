import React from 'react';
import {connect} from 'react-redux';
import Component from 'Bitmatica/components/Component';
import {setPostsData} from './actions';

class Frontpage extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <Component noun={this.props.author} />
      </div>
    )
  }
}

Frontpage.propTypes = {
  author: React.PropTypes.string
}

Frontpage.defaultProps = {
  author: undefined
}

const mapStateToProps = (state, ownProps) => {
  return {
    author: state.cms.users.length ? state.cms.users[0] : null
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (e) => {
      dispatch(setPostsData([], ['Cesar']))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage);
