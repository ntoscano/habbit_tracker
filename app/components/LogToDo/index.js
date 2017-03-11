import React from 'react';
import cx from 'classnames';
import style from './index.scss';

class ToDo extends React.Component {

  render() {
    let input;
    return (
      <div>
        <div className="card-block">
          <h4 className="card-title">{this.props.todo.text} ({this.props.todo.count})</h4>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
          <div className="input-group">
            <input className="form-control" placeholder="Notes..." ref={node => {
              input = node;
            }} />
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button" onClick={() => {this.props.onClick(input.value); input.value='';}}>Log</button>
            </span>
          </div>
        </div>
        <div className="card-footer">
          <small className="text-muted">Last updated 3 mins ago</small>
        </div>
        </div>
    )
  }
}

ToDo.propTypes = {
  onClick: React.PropTypes.func,
  todo: React.PropTypes.object
};

ToDo.defaultProps = {
  onClick: undefined,
  todo: {},
}

export default ToDo;
