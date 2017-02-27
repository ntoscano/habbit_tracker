import React from 'react';
import {connect, dispatch} from 'react-redux';
import ToDoList from 'Bitmatica/components/ToDoList';
import AddToDo from 'Bitmatica/components/AddToDo';
import LoggedToDoList from 'Bitmatica/components/LoggedToDoList';
import {addToDo, logToDo} from './actions';

let nextTodoId = 0;
class Frontpage extends React.Component {
  render() {
    return (
      <div>
        <AddToDo onClick={this.props.onClickAdd} />
        Tasks:
        <ToDoList todos={this.props.todos} onLog={this.props.onClickLog} />
        Logged Tasks:
        <LoggedToDoList loggedTodos={this.props.loggedTodos} />
      </div>
    )
  }
}

Frontpage.propTypes = {
  todos: React.PropTypes.array,
  loggedTodos: React.PropTypes.array,
}

Frontpage.defaultProps = {
  todos: [],
  loggedTodos: [],
}

const mapStateToProps = (state, ownProps) => {
  return {
    todos: state.cms.todos,
    loggedTodos: state.cms.loggedTodos,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickAdd: (text) => {
      dispatch(addToDo(nextTodoId++, text));
    },
    onClickLog: (id, text, notes) => {
      dispatch(logToDo(id, text, notes));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage);
