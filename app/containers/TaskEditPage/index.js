import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router'
import {editToDo} from 'Bitmatica/containers/Frontpage/actions';
import NavBar from 'Bitmatica/components/NavBar';

class TaskEditPage extends React.Component {
  render() {
    let input;
    let stickyCheckbox;
    return (
      <div>
        <div className="container">
          <div className="card-columns">
            <div className="card">
              <div className="list-group list-group-flush">
                <div className="list-group-item">
                  <div className="input-group">
                    <input className="form-control" defaultValue={this.props.task.name} placeholder="" ref={node => {
                      input = node;
                    }} />
                  </div>
                </div>
                <div className="list-group-item list-group-item-action justify-content-between">
                  Show on front page
                  <div className="form-check form-check-inline">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" id="inlineCheckbox1" defaultChecked={this.props.task.sticky} ref={(node) => stickyCheckbox = node} />
                    </label>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button className="btn btn-secondary" type="button" onClick={() => {browserHistory.goBack()}}>Cancel</button>
                <button className="btn btn-success" type="button" onClick={() => {if (input.value) {this.props.onClickSaveEdit(this.props.task.id, input.value, stickyCheckbox.checked);browserHistory.goBack();}}}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TaskEditPage.propTypes = {
  task: React.PropTypes.object,
  onClickSaveEdit: React.PropTypes.func,
}

TaskEditPage.defaultProps = {
  task: {},
  onClickSaveEdit: undefined,
}

const mapStateToProps = (state, ownProps) => {
  let subPath = ownProps.location.pathname.substr(0, ownProps.location.pathname.lastIndexOf('/'));
  let currentId = subPath.substr(subPath.lastIndexOf('/') + 1);

  let task = state.cms.todos.filter((task) => {
    return task.id === currentId;
  })[0];

  return {
    task,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickSaveEdit: (id, text, sticky) => {
      dispatch(editToDo(id, text, sticky));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditPage);
