import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';
import Subtask from 'Bitmatica/components/Subtask';
import ParentTask from 'Bitmatica/components/ParentTask';
import {addToDo, logToDo, addSubTask} from 'Bitmatica/containers/Frontpage/actions';
import {v4} from 'node-uuid';

class TaskDetailPage extends React.Component {
  render() {
    const subTasks = this.props.subTasks.map((task, index) => {
      let notesInput;
      return (
        <Subtask onLogTask={this.props.onClickLog} task={task} />
      );
    });
    let input;
    return (
      <div>
        <ParentTask onLogTask={this.props.onClickLog} task={this.props.task} />
        <div className="list-group list-group-flush">
          {subTasks}
        </div>
        <div className="input-group">
          <input className="form-control" placeholder="New Subtask Name..." ref={node => {
            input = node;
          }} />
          <span className="input-group-btn">
            <button className="btn btn-secondary" type="button" onClick={() => {if (input.value) {this.props.onClickAddTask(this.props.task.id, input.value); input.value='';}}}>Add</button>
          </span>
        </div>
      </div>
    )
  }
}

TaskDetailPage.propTypes = {

}

TaskDetailPage.defaultProps = {
  id: React.PropTypes.string,
}

const mapStateToProps = (state, ownProps) => {
  let currentId = ownProps.location.pathname.substr(ownProps.location.pathname.lastIndexOf('/') + 1)

  let task = state.cms.todos.filter((task) => {
    return task.id === currentId;
  })[0];

  let subTasks = state.cms.todos.filter((task) => {
    return task.parentTaskId === currentId;
  });

  return {
    task,
    subTasks,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickAddTask: (parentTaskId, text) => {
      dispatch(addToDo(v4(), parentTaskId, text));
    },
    onClickLog: (id, text, notes) => {
      dispatch(logToDo(id, text, notes));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailPage);
