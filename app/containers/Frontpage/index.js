import React from 'react';
import {connect, dispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import ToDoList from 'Bitmatica/components/ToDoList';
import AddToDo from 'Bitmatica/components/AddToDo';
import LoggedToDoList from 'Bitmatica/components/LoggedToDoList';
import EntryGroup from 'Bitmatica/components/EntryGroup';
import NavBar from 'Bitmatica/components/NavBar';
import {addToDo, logToDo, addSubTask, fetchEntries, editEntry} from './actions';
import style from './index.scss';
import moment from 'moment';


let timerId;

class Frontpage extends React.Component {

  componentDidMount () {
    this.props.fetchEntries();
    timerId = setInterval(this.props.fetchEntries, 1000);
  }
  componentWillUnmount () {
    clearInterval(timerId);
  }

  entryGroups(entries) {
    let entryGroups = [];
    entries.sort(function(e1,e2) {
      return e2.updatedAt - e1.updatedAt;
    }).map((entry, index) => {
      if (entry.parent_entry_id === '') {
        entryGroups = entryGroups.concat([entries.filter((ent) => {
          return ent.parent_entry_id === entry.id || ent.id === entry.id;
        })]);
      }
    });
    return entryGroups;
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
          <tr>
            <td><Link className="text-muted" to={"/entries/" + entry.id} key={entry.id}>{entry.parent_entry_id ? '....' : ''}{task.name}</Link></td>
            <td><Link className="text-muted" to={"/entries/" + entry.id} key={entry.id}>{entry.content}</Link></td>
            <td><Link className="text-muted" to={"/entries/" + entry.id} key={entry.id}>{moment(entry.updatedAt).fromNow()}</Link></td>
          </tr>
        );
    });
    return (
      <div>
        <NavBar backButton={false} />
        <p></p>
        <ToDoList todos={this.props.todos} onClickAddTask={this.props.onClickAdd}/>
        <p></p>
        <div className="list-group">
          <div className="list-group-item">
            <table className="table table-hover">
              <tbody>
                {entries}
              </tbody>
            </table>
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
  fetchEntries: React.PropTypes.func,
}

Frontpage.defaultProps = {
  todos: [],
  loggedTodos: [],
}

const mapStateToProps = (state, ownProps) => {
  return {
    todos: state.cms.todos,
    loggedTodos: state.cms.loggedTodos.sort(function(a,b) {
      return b.updatedAt - a.updatedAt;
    }),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickAdd: (text) => {
      dispatch(addToDo(null, text));
    },
    onClickLog: (id, text, notes) => {
      dispatch(logToDo(id, text, notes));
    },
    fetchEntries: () => {
      dispatch(fetchEntries());
    },
    editEntry: (entryId, content, check) => {
      dispatch(editEntry(entryId, content, check))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage);
