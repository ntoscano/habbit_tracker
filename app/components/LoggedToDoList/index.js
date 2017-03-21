import React from 'react';
import cx from 'classnames';

import style from './index.scss';

import moment from 'moment';

class LoggedToDoList extends React.Component {

  render() {
    const entries = this.props.loggedTodos.map((entry, index) => {
      return (
        <li className="list-group-item" key={index}>
          <div>
            <p> {entry.content} {moment(entry.updatedAt).fromNow()}</p>
          </div>
        </li>
      );
    });
    return (
      <div>
        <div>
          <ul className="list-group">{entries}</ul>
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
