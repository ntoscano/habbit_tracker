import React from 'react';
import cx from 'classnames';

import style from './index.scss';

class LoggedToDoList extends React.Component {

  render() {
    const todos = this.props.loggedTodos.map((todo, index) => {
      return (
        <li key={index}>
          Task: {todo.text}, Notes: {todo.notes}
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

LoggedToDoList.propTypes = {
  loggedTodos: React.PropTypes.array,
};

LoggedToDoList.defaultProps = {
  loggedTodos: [],
}

export default LoggedToDoList;
