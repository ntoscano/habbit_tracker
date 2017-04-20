import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import { Link } from 'react-router-dom';

class ToDo extends React.Component {

  render() {
    return (
      <div className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4" role="group" aria-label="First group">
        <Link to={"/tasks/" + this.props.todo.id} className="">
          <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">{this.props.todo.name}</h1>
        </Link>
          <div className="pa3 bt b--black-10">
            <p className="f6 f5-ns lh-copy measure">
              Card Details can go here
            </p>
        </div>
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
