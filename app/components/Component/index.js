import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router'

import style from './index.scss';

class Component extends React.Component {

  render() {
    return (
      <div className={cx(style.component, 'test')}>
        <div>
          {this.props.greeting} {this.props.noun}{this.props.punctuation}
        </div>
        <div>
          <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/404">error</Link></li>
          </ul>
        </div>
      </div>
    )
  }

}

Component.propTypes = {
  greeting: React.PropTypes.string,
  noun: React.PropTypes.string,
  punctuation: React.PropTypes.string
};

Component.defaultProps = {
  greeting: 'Hello',
  noun: 'world',
  punctuation: ';'
}

export default Component;
