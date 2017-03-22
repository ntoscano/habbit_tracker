import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import ToDo from 'Bitmatica/components/ToDo';
import AddToDo from 'Bitmatica/components/AddToDo';

class ToDoList extends React.Component {

  render() {
    const todos = this.props.todos.filter((todo) => {
      return todo.sticky;
    }).map((todo, index) => {
      return (
        <ToDo todo={todo} key={todo.id}/>
      );
    });
    return (
        <div>
          {todos}
          <p></p>
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
