import React from 'react';
import cx from 'classnames';
import style from './index.scss';
// <p>
//   <input ref={node => {
//     input = node;
//   }} />
//   <button onClick={() => {this.props.onClick(input.value); input.value='';}}>Add Task</button>
//   </p>
class AddToDo extends React.Component {

  render() {
    let input;
    return (
      <div className={cx(style.component, 'test')}>
        <div className="input-group">
          <input className="form-control" placeholder="New Task Name..." ref={node => {
            input = node;
          }} />
          <span className="input-group-btn">
            <button className="btn btn-secondary" type="button" onClick={() => {if (input.value) {this.props.onClick(input.value); input.value='';}}}>Add</button>
          </span>
        </div>
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
