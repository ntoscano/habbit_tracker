import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import ToDo from 'Bitmatica/components/ToDo';

class ToDoList extends React.Component {

  render() {
    const todos = this.props.todos.filter((todo) => {
      return todo.parentTaskId === null;
    }).map((todo, index) => {

      const subTasks = this.props.todos.filter((aTask) => {
        return todo.id === aTask.parentTaskId
      })
      return (
        <div className="card" key={todo.id}>
          <ToDo
            todo={todo}
            subTasks={subTasks}
            onClick={(id, text, notes) => {this.props.onLog(id, text, notes)}}
            onClickAddSubTask={(text) => {this.props.onAddSubTask(todo.id, text)}} />
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
  onLog: React.PropTypes.func,
  onAddSubTask: React.PropTypes.func,
};

ToDoList.defaultProps = {
  todos: [],
  onLog: undefined,
  onAddSubTask: undefined,
}

export default ToDoList;
