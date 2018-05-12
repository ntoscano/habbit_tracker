import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import Habit from 'Bitmatica/components/Habit';
import AddHabit from 'Bitmatica/components/AddHabit';

class HabitList extends React.Component {

  render() {
    const todos = this.props.todos.filter((todo) => {
      return todo.sticky;
    }).map((todo, index) => {
      return (
        <Habit todo={todo} key={todo.id}/>
      );
    });
    return (
        <div className="fl w-100 center">
          <div>
            <AddHabit onClick={this.props.onClickAddTask} />
          </div>
          <div>
            {todos}
          </div>
        </div>
    )
  }
}

HabitList.propTypes = {
  todos: React.PropTypes.array,
  onClickAddTask: React.PropTypes.func,
};

HabitList.defaultProps = {
  todos: [],
  onClickAddTask: undefined,
}

export default HabitList;
