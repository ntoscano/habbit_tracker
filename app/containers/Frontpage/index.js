import React from 'react';
import {connect, dispatch} from 'react-redux';
import ToDoList from 'Bitmatica/components/ToDoList';
import AddToDo from 'Bitmatica/components/AddToDo';
import LoggedToDoList from 'Bitmatica/components/LoggedToDoList';
import NavBar from 'Bitmatica/components/NavBar';
import {addToDo, logToDo, addSubTask, fetchEntries} from './actions';
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

  render() {
    return (
      <div>
        <NavBar backButton={false} />
        <p></p>
        <div>
          <ToDoList todos={this.props.todos} onClickAddTask={this.props.onClickAdd}/>
          <LoggedToDoList loggedTodos={this.props.loggedTodos} />
        </div>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage);
