import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import ToDo from 'Bitmatica/components/ToDo';
import AddToDo from 'Bitmatica/components/AddToDo';

class ToDoList extends React.Component {

  render() {
    const todos = this.props.todos.filter((todo) => {
      return todo.parentTaskId === null;
    }).map((todo, index) => {

      return (
        <div>
          <ToDo todo={todo}/>
        </div>
      );
    });
    return (
        <div className="card-columns">{todos}
          <AddToDo className={style.page} onClick={this.props.onClickAddTask} />
        </div>
    )
  }
}

ToDoList.propTypes = {
  todos: React.PropTypes.array,
  onClickAddTask: React.PropTypes.func,
};

ToDoList.defaultProps = {
  todos: [],
  onClickAddTask: undefined,
}

export default ToDoList;
