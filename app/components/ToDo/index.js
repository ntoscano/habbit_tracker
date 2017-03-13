import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import Subtask from 'Bitmatica/components/Subtask';
import { Link } from 'react-router-dom';

class ToDo extends React.Component {

  render() {
    const subTasks = this.props.subTasks.map((task, index) => {
      let notesInput;
      return (
        <Subtask onClick={this.props.onClick} task={task} />
      );
    });
    let input;
    return (
      <div>
      <Link to="/tasks">error</Link>
      <h3 className="card-header">{this.props.todo.text}</h3>
        <div className="list-group list-group-flush">
          {subTasks}
        </div>
        <div className="input-group">
          <input className="form-control" placeholder="New Subtask Name..." ref={node => {
            input = node;
          }} />
          <span className="input-group-btn">
            <button className="btn btn-secondary" type="button" onClick={() => {if (input.value) {this.props.onClickAddSubTask(input.value); input.value='';}}}>Add</button>
          </span>
        </div>
      </div>
    )
  }
}

ToDo.propTypes = {
  onClick: React.PropTypes.func,
  todo: React.PropTypes.object,
  onClickAddSubTask: React.PropTypes.func,
  subTasks: React.PropTypes.array,
};

ToDo.defaultProps = {
  onClick: undefined,
  todo: {},
  onClickAddSubTask: undefined,
  subTasks: [],
}

export default ToDo;
