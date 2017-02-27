import React from 'react';
import cx from 'classnames';
import style from './index.scss';

class LogToDo extends React.Component {

  render() {
    let input;
    return (
      <div className={cx(style.component, 'test')}>
        Task: {this.props.todo.text}, Count: {this.props.todo.count}
        <p>
          Notes: <input ref={node => {
            input = node;
          }} />
          <button onClick={() => {this.props.onClick(input.value); input.value='';}}>LOG</button>
        </p>
      </div>
    )
  }
}

LogToDo.propTypes = {
  onClick: React.PropTypes.func,
  todo: React.PropTypes.object
};

LogToDo.defaultProps = {
  onClick: undefined,
  todo: {},
}

export default LogToDo;
