import React from 'react';
import {connect, dispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import ToDoList from 'Bitmatica/components/ToDoList';
import AddToDo from 'Bitmatica/components/AddToDo';
import LoggedToDoList from 'Bitmatica/components/LoggedToDoList';
import NavBar from 'Bitmatica/components/NavBar';
import {addToDo, fetchEntries, fetchToDos, fetchCurrentUser} from './actions';
import style from './index.scss';
import moment from 'moment';


let fetchEntriesTimerId;
let fetchTasksTimerId;

class Frontpage extends React.Component {

  componentDidMount () {
    this.props.fetchEntries();
    this.props.fetchTasks();

    // fetchEntriesTimerId = setInterval(this.props.fetchEntries, 1000);
    // fetchTasksTimerId = setInterval(this.props.fetchTasks, 1000);
  }
  componentWillUnmount () {
    // clearInterval(fetchEntriesTimerId);
    // clearInterval(fetchTasksTimerId);
  }

  parentTaskIdForEntryGroup(entryGroup) {
    let parentTaskId;
  }

  render() {
    let entries = this.props.loggedTodos.filter((entry, index) => {
      return entry.check;
    }).map((entry, index) => {
      let task = this.props.todos.filter((task, index) => {
        return task.id === entry.task_id;
      })[0];
      return (
          <tr key={entry.id}>
            <td><Link className="text-muted" to={"/entries/" + entry.id} key={entry.id}>{entry.parent_entry_id ? '....' : ''}{task ? task.name : ''}</Link></td>
            <td><Link className="text-muted" to={"/entries/" + entry.id} key={entry.id}>{entry.content}</Link></td>
            <td><Link className="text-muted" to={"/entries/" + entry.id} key={entry.id}>{moment(entry.updatedAt).fromNow()}</Link></td>
          </tr>
        );
    });
    return (
      <div>
        <div className="container">
          <ToDoList todos={this.props.todos} onClickAddTask={(text, userId=this.props.user.id) => {this.props.onClickAdd(text, userId)}}/>
        </div>
        <p></p>
        <div className="container">
          <div className="list-group">
            <div className="list-group-item">
              <table className="table table-hover">
                <tbody>
                  {entries}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p></p>
      </div>
    )
  }
}

Frontpage.propTypes = {
  todos: React.PropTypes.array,
  loggedTodos: React.PropTypes.array,
  user: React.PropTypes.object,
}

Frontpage.defaultProps = {
  todos: [],
  loggedTodos: [],
  user: undefined,
}

const mapStateToProps = (state, ownProps) => {
  return {
    todos: state.cms.todos,
    loggedTodos: sortEntries(state.cms.loggedTodos),
    user: state.cms.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickAdd: (text, userId) => {
      dispatch(addToDo(null, text, userId));
    },
    fetchEntries: () => {
      dispatch(fetchEntries());
    },
    fetchTasks: () => {
      dispatch(fetchToDos());
    },
  }
}

const sortEntries = (entries) => {
  let parents = entries.filter((entry, index) => {
    return !entry.parent_entry_id;
  }).sort(function(a,b) {
    return b.updatedAt - a.updatedAt;
  });
  let allEntries = parents.map((parent, index) => {
    let childEntries = entries.filter((entry, index) => {
      return entry.parent_entry_id === parent.id;
    });
    childEntries.splice(0,0,parent);
    return childEntries;
  });
  return [].concat.apply([],allEntries);
}

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage);
