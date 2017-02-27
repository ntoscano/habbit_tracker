import React from 'react';
import {connect} from 'react-redux';
import Component from 'Bitmatica/components/Component';
import {setPostsData, addToDo} from './actions';

class Frontpage extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <Component noun={this.props.author} todos={this.props.todos}/>
      </div>
    )
  }
}

Frontpage.propTypes = {
  author: React.PropTypes.string,
  todos: React.PropTypes.array
}

Frontpage.defaultProps = {
  author: undefined,
  todos: [],
}

const mapStateToProps = (state, ownProps) => {
  return {
    // author: state.cms.users.length ? state.cms.users[0] : null,
    todos: state.cms.todos,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (e) => {
      dispatch(addToDo('New TODO'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage);
