import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router'
import HabbitDetails from 'Bitmatica/components/HabbitDetails';
import NavBar from 'Bitmatica/components/NavBar';
import {addToDo, logToDo, addSubTask, addEntry, editEntry} from 'Bitmatica/containers/Frontpage/actions';

class EntryEditPage extends React.Component {

  constructor() {
    super();
    this.state = {
      taskIdsToLog: {},
      notesForTaskId: {},
    }
  }

  componentDidMount () {
    let taskIds = {};
    let notes = {};

    this.setState({
      taskIdsToLog: Object.assign(taskIds, this.state.taskIdsToLog, this.props.subEntries.concat(this.props.entry).map((entry, index) => {
        taskIds[entry.task_id] = entry.check;
      })),
      notesForTaskId: Object.assign(notes, this.state.notesForTaskId, this.props.subEntries.concat(this.props.entry).map((entry, index) => {
        notes[entry.task_id] = entry.content;
      })),
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
    console.log(notes);
    this.setState({
      taskIdsToLog: this.state.taskIdsToLog,
      notesForTaskId: Object.assign({}, this.state.notesForTaskId, {
        [id]: notes,
      }),
    })
  }

  saveEntries () {

    let parentEntries = this.entries().filter((entry, index) => {
      let task = this.taskForId(entry.task_id);
      return task && !task.parent_task_id;
    });
    let parentEntry = parentEntries.length ? parentEntries[0] : undefined;

    let entriesToEdit = this.entries().map((entry, index) => {
      this.props.onClickEditEntry({
        id: entry.id,
        content: this.state.notesForTaskId[entry.task_id],
        check: this.state.taskIdsToLog[entry.task_id] ? true : false,
      });
    });

    let taskIdsToAdd = Object.keys(this.state.taskIdsToLog)
    .filter((taskId, index) => {
      return this.state.taskIdsToLog[taskId];
    })
    .filter((taskId, index) => {
      return !this.entryForTaskId(taskId);
    })
    .map((taskId, index) => {
      this.props.onClickAddEntry({
        task_id: taskId,
        parent_entry_id: parentEntry && taskId !== parentEntry.task_id ? parentEntry.id : '',
        content: this.state.notesForTaskId[taskId],
      },
      this.props.user.id);
    });
  }

  entries() {
    return this.props.subEntries.concat(this.props.entry);
  }

  entryForTaskId(id) {
    let entries = this.entries().filter((entry, index) => {
      return entry.task_id === id;
    });
    return entries.length > 0 ? entries[0] : undefined;
  }

  tasks() {
    return this.props.subTasks.concat(this.props.task);
  }

  taskForId(id) {
    let tasks = this.tasks().filter((task, index) => {
      return task.id === id;
    });
    return tasks.length > 0 ? tasks[0] : undefined;
  }

  render() {
    const habbitDetails = [this.props.task].concat(this.props.subTasks).map((task, index) => {
      return (
        <HabbitDetails
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
        <div className="container">
          <div className="card-columns">
            <div className="card">
              <div className="list-group list-group-flush">
                {habbitDetails}
                <div className="text-right">
                  <button className="btn btn-success" type="button" onClick={() => {this.saveEntries();this.props.history.push('/');}}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EntryEditPage.propTypes = {
  entry: React.PropTypes.object,
  subEntries: React.PropTypes.array,
  task: React.PropTypes.object,
  subTasks: React.PropTypes.array,
}

EntryEditPage.defaultProps = {
  entry: {},
  subEntries: [],
  task: {},
  subTasks: [],
}

const mapStateToProps = (state, ownProps) => {
  let currentEntryId = ownProps.location.pathname.substr(ownProps.location.pathname.lastIndexOf('/') + 1);
  let entry = state.cms.loggedTodos.filter((entry) => {
    return entry.id === currentEntryId;
  })[0];

  let subEntries = state.cms.loggedTodos.filter((ent) => {
    return ent.parent_entry_id === entry.id;
  });

  let task = state.cms.todos.filter((task) => {
    return task.id === entry.task_id;
  })[0];

  let subTasks = state.cms.todos.filter((tsk) => {
    return tsk.parent_task_id === task.id;
  });

  return {
    entry,
    subEntries,
    task,
    subTasks,
    user: state.cms.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickAddTask: (parentTaskId, name) => {
      dispatch(addToDo(parentTaskId, name));
    },
    onClickEditEntry: (entry) => {
      dispatch(editEntry(entry.id, entry.content, entry.check, entry.parent_entry_id));
    },
    onClickAddEntry: (entry, userId) => {
      dispatch(addEntry(entry.task_id, entry.parent_entry_id, entry.content, userId));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryEditPage);
