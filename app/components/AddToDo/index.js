import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router'

import style from './index.scss';

class AddToDo extends React.Component {

  render() {
    let input;
    return (
      <div className={cx(style.component, 'test')}>
        <input ref={node => {
          input = node;
        }} />
        <button onClick={() => {this.props.onClick(input.value); input.value='';}}>Add TODO</button>
      </div>
    )
  }
}

AddToDo.propTypes = {
  onClick: React.PropTypes.func,

};

AddToDo.defaultProps = {
  onClick: undefined,
}

export default AddToDo;
