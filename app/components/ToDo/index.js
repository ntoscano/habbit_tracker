import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import {timeDifference} from 'Bitmatica/utils'

// <div className="input-group">
//   <input className="form-control" placeholder="Notes..." ref={node => {
//     input = node;
//   }} />
//   <span className="input-group-btn">
//     <button className="btn btn-secondary" type="button" onClick={() => {this.props.onClick(input.value); input.value='';}}>Log</button>
//   </span>
// </div>


// <li className="list-group-item" key={index}>
//   {task.text}
// </li>

class ToDo extends React.Component {

  render() {

    const subTasks = this.props.subTasks.map((task, index) => {

      const diff = new Date() - task.updatedAt;
      let badgeColor;
      if (diff/1000 < 86400) {
        badgeColor = 'badge-success';
      } else if (diff/1000 < 604800) {
        badgeColor = 'badge-warning';
      } else {
        badgeColor = 'badge-dange';
      }
      return (
        <div className="list-group-item list-group-item-action justify-content-between" key={task.id}>
          {task.text}<button className="btn btn-success" type="button" onClick={() => {this.props.onClick(task.id, task.text, 'some notes')}}>Log</button>
        </div>
      );
    });
    let input;
    return (
      <div>
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
