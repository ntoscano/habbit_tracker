import React from 'react';
import {connect, dispatch} from 'react-redux';
import ToDoList from 'Bitmatica/components/ToDoList';
import AddToDo from 'Bitmatica/components/AddToDo';
import LoggedToDoList from 'Bitmatica/components/LoggedToDoList';
import {addToDo, logToDo, addSubTask} from './actions';
import {v4} from 'node-uuid';
import style from './index.scss';

let nextTodoId = 0;
class Frontpage extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div className="page-header">
            <h2>Tasks</h2>
          </div>
          <ToDoList todos={this.props.todos} />
          <AddToDo className={style.page} onClick={this.props.onClickAdd} />
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
      dispatch(addToDo(v4(), text));
    },
    onClickLog: (id, text, notes) => {
      dispatch(logToDo(id, text, notes));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage);
