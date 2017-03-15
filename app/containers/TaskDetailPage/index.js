import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import TaskDetails from 'Bitmatica/components/TaskDetails';
import NavBar from 'Bitmatica/components/NavBar';
import {addToDo, logToDo, addSubTask} from 'Bitmatica/containers/Frontpage/actions';
import {v4} from 'node-uuid';


class TaskDetailPage extends React.Component {
  render() {
    const subTasks = this.props.subTasks.map((task, index) => {
      let notesInput;
      return (
        <TaskDetails onLogTask={this.props.onClickLog} task={task} key={task.id} />
      );
    });
    let input;
    return (
      <div>
        <NavBar backButton={true} />
        <p></p>
        <div className="card-columns">
          <div className="card">
            <div className="list-group list-group-flush">
              <TaskDetails onLogTask={this.props.onClickLog} task={this.props.task} />
              {subTasks}
              <div className="input-group">
                <input className="form-control" placeholder="New Subtask Name..." ref={node => {
                  input = node;
                }} />
                <span className="input-group-btn">
                  <button className="btn btn-secondary" type="button" onClick={() => {if (input.value) {this.props.onClickAddTask(this.props.task.id, input.value); input.value='';}}}>Add</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TaskDetailPage.propTypes = {
  id: React.PropTypes.string,
  task: React.PropTypes.object,
  subTasks: React.PropTypes.array,
}

TaskDetailPage.defaultProps = {
  id: "",
  task: {},
  subTasks: [],
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
