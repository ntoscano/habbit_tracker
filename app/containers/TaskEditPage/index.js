import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {editToDo} from 'Bitmatica/containers/Frontpage/actions';

class TaskEditPage extends React.Component {
  render() {
    return (
      <div>
        <NavBar backButton={true} />
        <p></p>
        <div className="card-columns">
          <div className="card"  onClick={() => {console.log('editing task '+this.props.task);;this.props.onClickSaveEdit(this.props.task.id, "a new task name", true)}}>
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
  onClickSaveEdit: React.PropTypes.func,
}

TaskDetailPage.defaultProps = {
  id: "",
  task: {},
  onClickSaveEdit: undefined,
}

const mapStateToProps = (state, ownProps) => {
  let currentId = ownProps.location.pathname.substr(ownProps.location.pathname.lastIndexOf('/') + 1)

  let task = state.cms.todos.filter((task) => {
    return task.id === currentId;
  })[0];

  return {
    task,
    subTasks,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickSaveEdit: (id, text, sticky) => {
      dispatch(editToDo(id, text, sticky));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditPage);
