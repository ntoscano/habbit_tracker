import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router'

import style from './index.scss';

class ToDoList extends React.Component {

  render() {
    const todos = this.props.todos.map((todo, index) => {
      return (
        <li key={index} onClick={() => {console.log('clicked todo')}}
          className={todo.completed ? cx(style.complete, 'test') : cx(style.incomplete, 'test')}>
          {todo.text}
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
};

ToDoList.defaultProps = {
  todos: [],
}

export default ToDoList;
