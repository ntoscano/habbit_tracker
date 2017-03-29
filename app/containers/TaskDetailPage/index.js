import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router'
import TaskDetails from 'Bitmatica/components/TaskDetails';
import NavBar from 'Bitmatica/components/NavBar';
import {addToDo, logToDo, addSubTask, addEntry} from 'Bitmatica/containers/Frontpage/actions';
import {v4} from 'node-uuid';


class TaskDetailPage extends React.Component {

  constructor() {
    super();
    this.state = {
      taskIdsToLog: {},
      notesForTaskId: {},
    }
  }

  componentDidMount () {
    this.setState({
      taskIdsToLog: Object.assign({}, this.state.taskIdsToLog,{
        [this.props.task.id]: true,
      }),
      notesForTaskId: this.state.notesForTaskId,
    })
  }

  onClickCheckbox(id, newValue) {
    this.setState({
      taskIdsToLog: Object.assign({}, this.state.taskIdsToLog,{
        [id]: newValue,
      }),
      notesForTaskId: this.state.notesForTaskId,
    })
  }

  onChangeNotes (id, notes) {
    this.setState({
      taskIdsToLog: this.state.taskIdsToLog,
      notesForTaskId: Object.assign({}, this.state.notesForTaskId, {
        [id]: notes,
      }),
    })
  }

  saveEntries () {
    // Should prob calculate uuids in action instead of here
    let parent_entry_id = this.state.taskIdsToLog[this.props.task.id] ? v4() : undefined;
    let entries = Object.keys(this.state.taskIdsToLog).filter((key, index) => {
      return this.state.taskIdsToLog[key];
    }).map((taskId, index) => {

      let task = this.props.task.id === taskId ? this.props.task : this.props.subTasks.filter((task) => {
        return task.id === taskId
      })[0];

      return {
        id: task.id === this.props.task.id ? parent_entry_id : v4(),
        taskId,
        parent_entry_id: task.id === this.props.task.id ? undefined : parent_entry_id,
        content: this.state.notesForTaskId[taskId],
        owner_id: this.props.user.id,
      }
    });
    this.props.onCLickLogAll(entries);
  }

  addTask(input) {
    if (input.value) {
      this.props.onClickAddTask(this.props.task.id, input.value, this.props.user.id);
      input.value='';
    }
  }

  render() {
    const taskDetails = [this.props.task].concat(this.props.subTasks).map((task, index) => {
      return (
        <TaskDetails
          task={task}
          notes={this.state.notesForTaskId[task.id]}
          checked={this.state.taskIdsToLog[task.id]}
          onClickCheckbox={(id, newValue) => this.onClickCheckbox(id, newValue)}
          onChangeNotes={(id, notes) => this.onChangeNotes(id, notes)}
          key={task.id}
        />
      );
    });
    let input;
    return (
      <div>
        <NavBar backButton={true} />
        <p></p>
        <div className="container">
          <div className="card-columns">
            <div className="card">
              <div className="list-group list-group-flush">
                {taskDetails}
                <div className="list-group-item list-group-item-action justify-content-between">
                  <div className="input-group">
                    <input className="form-control" placeholder="Add subtask..." ref={node => {
                      input = node;
                    }} onKeyPress={(e) => {if (e.key === 'Enter') this.addTask(input)}}/>
                    <span className="input-group-btn">
                      <button className="btn btn-secondary" type="button" onClick={() => {this.addTask(input)}}>Add</button>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <button className="btn btn-success" type="button" onClick={() => {this.saveEntries();browserHistory.goBack();}}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TaskDetailPage.propTypes = {
  task: React.PropTypes.object,
  subTasks: React.PropTypes.array,
  user: React.PropTypes.object,
}

TaskDetailPage.defaultProps = {
  task: {},
  subTasks: [],
  user: {},
}

const mapStateToProps = (state, ownProps) => {
  let currentId = ownProps.location.pathname.substr(ownProps.location.pathname.lastIndexOf('/') + 1)
  let task = state.cms.todos.filter((task) => {
    return task.id === currentId;
  })[0];

  let subTasks = state.cms.todos.filter((task) => {
    return task.parent_task_id === currentId;
  });

  return {
    task,
    subTasks,
    user: state.cms.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickAddTask: (parentTaskId, name, userId) => {
      dispatch(addToDo(parentTaskId, name, userId));
    },
    onCLickLogAll: (entries) => {
      entries.map((entry, index) => {
        dispatch(addEntry(entry.id, entry.taskId, entry.parent_entry_id, entry.content, entry.owner_id))
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailPage);
