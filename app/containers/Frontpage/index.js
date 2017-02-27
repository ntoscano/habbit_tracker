import React from 'react';
import {connect, dispatch} from 'react-redux';
import ToDoList from 'Bitmatica/components/ToDoList';
import AddToDo from 'Bitmatica/components/AddToDo';
import {addToDo, toggleToDo, incrementToDoCount} from './actions';

let nextTodoId = 0;
class Frontpage extends React.Component {
  render() {
    return (
      <div>
        <AddToDo onClick={this.props.onClick}/>
        <ToDoList todos={this.props.todos} onToggle={this.props.onToggle} onIncrement={this.props.onIncrement}/>
      </div>
    )
  }
}

Frontpage.propTypes = {
  todos: React.PropTypes.array,
}

Frontpage.defaultProps = {
  todos: [],
}

const mapStateToProps = (state, ownProps) => {
  return {
    todos: state.cms.todos,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (text) => {
      dispatch(addToDo(nextTodoId++, text));
    },
    onToggle: (id) => {
      dispatch(toggleToDo(id));
    },
    onIncrement: (id) => {
      dispatch(incrementToDoCount(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage);
