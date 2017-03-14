import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import Subtask from 'Bitmatica/components/Subtask';
import { Link } from 'react-router-dom';

class ToDo extends React.Component {

  render() {
    const subTasks = this.props.subTasks.map((task, index) => {
      let notesInput;
      return (
        <Subtask onClick={this.props.onClick} task={task} />
      );
    });
    let input;
    return (
      <div>
        <Link to={"/tasks/" + this.props.todo.id}>
        <div className="card card-inverse card-primary mb-3 text-center">
          <div className="card-block">
            <blockquote className="card-blockquote">
              <h4>{this.props.todo.text}</h4>
            </blockquote>
          </div>
        </div>
        </Link>
      </div>
    )
  }
}

ToDo.propTypes = {
  onClick: React.PropTypes.func,
  todo: React.PropTypes.object,
  onClickAddSubTask: React.PropTypes.func,
  subTasks: React.PropTypes.array,
};

ToDo.defaultProps = {
  onClick: undefined,
  todo: {},
  onClickAddSubTask: undefined,
  subTasks: [],
}

export default ToDo;
