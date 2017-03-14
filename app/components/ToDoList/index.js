import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import ToDo from 'Bitmatica/components/ToDo';

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
        <div className="card-columns">{todos}</div>
    )
  }
}

ToDoList.propTypes = {
  todos: React.PropTypes.array,
};

ToDoList.defaultProps = {
  todos: [],
}

export default ToDoList;
