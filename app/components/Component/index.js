import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router'

import style from './index.scss';

class Component extends React.Component {

  render() {
    const todos = this.props.todos.map((todo, index) => {
      return (
        <li key={index}>
          {todo}
        </li>
      );
    });
    return (
      <div className={cx(style.component, 'test')}>
        <div>
          // {this.props.greeting} {this.props.noun}{this.props.punctuation}
        </div>
        <div>
          <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/404">error</Link></li>
          </ul>
        </div>
        <div>
          <ol>{todos}</ol>
        </div>
      </div>
    )
  }
}

Component.propTypes = {
  greeting: React.PropTypes.string,
  noun: React.PropTypes.string,
  punctuation: React.PropTypes.string,
  todos: React.PropTypes.array,
};

Component.defaultProps = {
  greeting: 'Hello',
  noun: 'world',
  punctuation: ';',
  todos: ['One', 'Two', 'Three'],
}

export default Component;
