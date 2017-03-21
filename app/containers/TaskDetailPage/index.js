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
      textForTaskId: {},
    }
  }

  onToggleEntry (id, currentValue) {
    this.setState({
      taskIdsToLog: Object.assign({}, this.state.taskIdsToLog,{
        [id]: !currentValue,
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
    // Should prob calculate parent_entry_id uuid in action
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
      }
    });
    this.props.onCLickLogAll(entries);
  }

  render() {
    const subTasks = [this.props.task].concat(this.props.subTasks).map((task, index) => {
      let notesInput;
      return (
        <TaskDetails onLogTask={this.props.onClickLog} task={task} showNotesField={this.state.taskIdsToLog[task.id]} key={task.id} onToggleEntry={(id, currentValue) => this.onToggleEntry(id, currentValue)} onChangeNotes={(id, notes) => this.onChangeNotes(id, notes)} />
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
              {subTasks}
              <div className="text-right">
                <button className="btn btn-success" type="button" onClick={() => {this.saveEntries();browserHistory.goBack();}}>Save</button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="input-group">
              <input className="form-control" placeholder="Add subtask..." ref={node => {
                input = node;
              }} />
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button" onClick={() => {if (input.value) {this.props.onClickAddTask(this.props.task.id, input.value); input.value='';}}}>Add</button>
              </span>
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

  onAddEntry: React.PropTypes.func,
  onRemoveEntry: React.PropTypes.func,
}

TaskDetailPage.defaultProps = {
  id: "",
  task: {},
  subTasks: [],
  onAddEntry: undefined,
  onRemoveEntry: undefined,
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
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickAddTask: (parentTaskId, name) => {
      dispatch(addToDo(parentTaskId, name));
    },
    onClickLog: (id, text, notes) => {
      dispatch(logToDo(id, text, notes));
    },
    onCLickLogAll: (entries) => {
      // dispatch(addEntries(entries));
      entries.map((entry, index) => {
        dispatch(addEntry(entry.id, entry.taskId, entry.parent_entry_id, entry.content))
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailPage);
