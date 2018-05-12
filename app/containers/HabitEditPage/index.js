import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {browserHistory} from 'react-router'
import {editToDo} from 'Bitmatica/containers/Frontpage/actions';
import NavBar from 'Bitmatica/components/NavBar';

class TaskEditPage extends React.Component {
  render() {
    let input;
    let stickyCheckbox;
    return (
      <div>
        <form className="pa4 black-80">
          <div className="measure">
            <label htmlFor="name" className="f6 b db mb2">Task Name</label>
            <input
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="text"
              defaultValue={this.props.task.name}
              placeholder=""
              ref={node => {
              input = node;
            }}/>
          </div>
        </form>
        <div>
          <div className="pa4 fl w-50">
            Show on front page
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                defaultChecked={this.props.task.sticky}
                ref={(node) => stickyCheckbox = node}/>
            </label>
          </div>

          <div className="pa4 fl w-30">
            <button
              className="b ph3 mr1 ml1 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="button"
              onClick={() => {
              this
                .props
                .history
                .push('/')
            }}>Cancel</button>
            <button
              className="b ph3 pv2 mr1 ml1 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="button"
              onClick={() => {
              if (input.value) {
                this
                  .props
                  .onClickSaveEdit(this.props.task.id, input.value, stickyCheckbox.checked);
                this
                  .props
                  .history
                  .push('/')
              }
            }}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}

TaskEditPage.propTypes = {
  task: React.PropTypes.object,
  onClickSaveEdit: React.PropTypes.func
}

TaskEditPage.defaultProps = {
  task: {},
  onClickSaveEdit: undefined
}

const mapStateToProps = (state, ownProps) => {
  let subPath = ownProps
    .location
    .pathname
    .substr(0, ownProps.location.pathname.lastIndexOf('/'));
  let currentId = subPath.substr(subPath.lastIndexOf('/') + 1);

  let task = state
    .cms
    .todos
    .filter((task) => {
      return task.id === currentId;
    })[0];

  return {task}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickSaveEdit: (id, text, sticky) => {
      dispatch(editToDo(id, text, sticky));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditPage);
