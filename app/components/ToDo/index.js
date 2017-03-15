import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import { Link } from 'react-router-dom';

class ToDo extends React.Component {

  render() {
    return (
      <div>
        <Link to={"/tasks/" + this.props.todo.id}>
        <div className="card card-inverse card-secondary mb-3 text-center">
          <div className="card-block">
            <blockquote className="card-blockquote">
              <h4 className="text-muted">{this.props.todo.text}</h4>
            </blockquote>
          </div>
        </div>
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
