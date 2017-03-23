import React from 'react';
import cx from 'classnames';
import style from './index.scss';

class AddToDo extends React.Component {

  addTask(input) {
    if (input.value) {
      this.props.onClick(input.value); input.value='';
    }
  }
  render() {
    let input;
    return (
      <div className="card">
        <div className="input-group">
          <input className="form-control" placeholder="New Task Name..." ref={node => {
            input = node;
          }} onKeyPress={(e) => {if (e.key === 'Enter') this.addTask(input)}}/>
          <span className="input-group-btn">
            <button className="btn btn-secondary" type="button" onClick={() => {this.addTask(input)}}>Add</button>
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
