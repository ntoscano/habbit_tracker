import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import { Link } from 'react-router-dom';

class ToDo extends React.Component {

  render() {
    return (
      <div key>
        <Link to={"/tasks/" + this.props.todo.id}>
          <button className="btn btn-secondary">
            <h4 className="text-muted">{this.props.todo.name}</h4>
          </button>
        </Link>
      </div>
    )
  }
}

ToDo.propTypes = {
  todo: React.PropTypes.object,
};

ToDo.defaultProps = {
  todo: {},
}

export default ToDo;
