import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import LogToDo from 'Bitmatica/components/LogToDo';

class ToDoList extends React.Component {

  render() {
    const todos = this.props.todos.map((todo, index) => {
      return (
        <li key={index}>
          <LogToDo todo={todo} onClick={(notes) => {this.props.onLog(todo.id, todo.text, notes)}} />
        </li>
      );
    });
    return (
      <div>
        <div>
          <ul>{todos}</ul>
        </div>
      </div>
    )
  }
}

ToDoList.propTypes = {
  todos: React.PropTypes.array,
  onLog: React.PropTypes.func,
};

ToDoList.defaultProps = {
  todos: [],
  onLog: undefined,
}

export default ToDoList;
