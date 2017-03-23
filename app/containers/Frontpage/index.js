import React from 'react';
import {connect, dispatch} from 'react-redux';
import ToDoList from 'Bitmatica/components/ToDoList';
import AddToDo from 'Bitmatica/components/AddToDo';
import LoggedToDoList from 'Bitmatica/components/LoggedToDoList';
import EntryGroup from 'Bitmatica/components/EntryGroup';
import NavBar from 'Bitmatica/components/NavBar';
import {addToDo, logToDo, addSubTask, fetchEntries, editEntry} from './actions';
import style from './index.scss';

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
    let entryGroups = this.entryGroups(this.props.loggedTodos).map((entries, index) => {

      return <EntryGroup entries={entries} tasks={this.props.todos} onClick={this.props.editEntry} />;
    });
    return (
      <div>
        <NavBar backButton={false} />
        <p></p>
        <ToDoList todos={this.props.todos} onClickAddTask={this.props.onClickAdd}/>
        <p></p>
        <div className="list-group">{entryGroups}</div>
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
