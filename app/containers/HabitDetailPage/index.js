import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router'
import HabitDetails from 'Bitmatica/components/HabitDetails';
import NavBar from 'Bitmatica/components/NavBar';
import {addToDo, logToDo, addSubTask, addEntry, addEntries} from 'Bitmatica/containers/Frontpage/actions';

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
    let parent_task_id = this.props.task.id
    let parent = this.state.taskIdsToLog[this.props.task.id];
    let entries = Object.keys(this.state.taskIdsToLog).filter((key, index) => {
      return this.state.taskIdsToLog[key];
    }).map((taskId, index) => {
      return {
        task_id: taskId,
        is_parent: parent ? parent_task_id === taskId : false,
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
    const habitDetails = [this.props.task].concat(this.props.subTasks).map((task, index) => {
      return (
        <HabitDetails
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
      <div className="pv3 mv1">
        <form className="pa4 black-80 w-100">
          <div className="center">
            <div>
              <label className="f6 b db mb2">Add Subtask...</label>
              <input className="input-reset f6 ba b--black-20 pa2 mb2 di w-80" ref={node => {
                input = node;
              }} onKeyPress={(e) => {if (e.key === 'Enter') this.addTask(input)}}/>
              <span className="input-group-btn">
                <button className="b ma2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 w-10" type="button" onClick={() => {this.addTask(input)}}>Add</button>
              </span>
            </div>
          </div>
        </form>
        {habitDetails}
        <div className="center w-100">
          <button className="fr b ma2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 w-10" type="button" onClick={() => {this.saveEntries();browserHistory.goBack();}}>Save</button>
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
      dispatch(addEntries(entries));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailPage);
