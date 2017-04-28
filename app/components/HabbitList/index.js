import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import Habbit from 'Bitmatica/components/Habbit';
import AddHabbit from 'Bitmatica/components/AddHabbit';

class HabbitList extends React.Component {

  render() {
    const todos = this.props.todos.filter((todo) => {
      return todo.sticky;
    }).map((todo, index) => {
      return (
        <Habbit todo={todo} key={todo.id}/>
      );
    });
    return (
        <div className="fl w-100 center">
          <div>
            <AddHabbit onClick={this.props.onClickAddTask} />
          </div>
          <div>
            {todos}
          </div>
        </div>
    )
  }
}

HabbitList.propTypes = {
  todos: React.PropTypes.array,
  onClickAddTask: React.PropTypes.func,
};

HabbitList.defaultProps = {
  todos: [],
  onClickAddTask: undefined,
}

export default HabbitList;
