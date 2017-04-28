import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import { Link } from 'react-router-dom';

class Habbit extends React.Component {

  render() {
    return (
      <div className="center mw5 mw6-ns br2 hidden ba b--black-10 mv4" role="group" aria-label="First group">
        <Link to={"/tasks/" + this.props.todo.id} className="">
          <h1 className="f4 bg-near-white br2 br--top black-60 mv0 pv2 ph3">{this.props.todo.name}</h1>
        </Link>
      </div>
    )
  }
}

Habbit.propTypes = {
  todo: React.PropTypes.object,
};

Habbit.defaultProps = {
  todo: {},
}

export default Habbit;
