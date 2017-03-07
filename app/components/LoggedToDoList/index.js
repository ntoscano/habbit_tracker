import React from 'react';
import cx from 'classnames';

import style from './index.scss';

class LoggedToDoList extends React.Component {

  render() {
    const todos = this.props.loggedTodos.map((todo, index) => {
      return (
        <li className="list-group-item" key={index}>
          <div>
            <p>
              Task: {todo.text}
            </p>
            <p>
              Notes: {todo.notes}
            </p>
          </div>
        </li>
      );
    });
    return (
      <div>
        <div>
          <ul className="list-group">{todos}</ul>
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
