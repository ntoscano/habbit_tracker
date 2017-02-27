import React from 'react';
import cx from 'classnames';

import style from './index.scss';

class ToDoList extends React.Component {

  render() {
    const todos = this.props.todos.map((todo, index) => {
      return (
        <li key={index} onClick={() => {this.props.onIncrement(index)}}
          className={todo.completed ? cx(style.complete, 'test') : cx(style.incomplete, 'test')}>
          {todo.text} ({todo.count})
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
  onToggle: React.PropTypes.func,
  onIncrement: React.PropTypes.func,
};

ToDoList.defaultProps = {
  todos: [],
  onToggle: undefined,
  onIncrement: undefined,
}

export default ToDoList;
