import React from 'react';
import {connect, dispatch} from 'react-redux';
import ToDoList from 'Bitmatica/components/ToDoList';
import AddToDo from 'Bitmatica/components/AddToDo';
import LoggedToDoList from 'Bitmatica/components/LoggedToDoList';
import NavBar from 'Bitmatica/components/NavBar';
import {addToDo, logToDo, addSubTask} from './actions';
import style from './index.scss';

let nextTodoId = 0;
class Frontpage extends React.Component {
  render() {
    return (
      <div>
        <NavBar backButton={false} />
        <p></p>
        <div>
          <ToDoList todos={this.props.todos} onClickAddTask={this.props.onClickAdd}/>
          <LoggedToDoList loggedTodos={this.props.loggedTodos} />
        </div>
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
      dispatch(addToDo(null, text));
    },
    onClickLog: (id, text, notes) => {
      dispatch(logToDo(id, text, notes));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage);
