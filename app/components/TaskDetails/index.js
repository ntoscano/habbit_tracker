import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import { Link } from 'react-router-dom';

class TaskDetails extends React.Component {

  onClickCheckbox (newValue) {
    this.props.onClickCheckbox(this.props.task.id, newValue);
  }

  onChangeNotes (newValue) {
    this.props.onChangeNotes(id, newValue)
  }

  render() {
    let notesInput;
    return (
      <div className="list-group-item list-group-item-action justify-content-between  " key={this.props.task.id}>
        <Link to={"/tasks/" + this.props.task.id + "/edit"} className="text-muted">{this.props.task.name}  <i className="fa fa-pencil"></i></Link>
        <div className="input-group">
          <span className="input-group-addon">
            <input type="checkbox" checked={this.props.checked} onClick={(event) => {this.onClickCheckbox(event.target.checked)}} aria-label="Checkbox for following text input" />
          </span>
          <input className="form-control" placeholder="Notes..." value={this.props.notes} onChange={(e) => {this.props.onChangeNotes(this.props.task.id, e.target.value)}} onClick={(event) => {this.onClickCheckbox(true)}} />
        </div>
      </div>
    )};
}

TaskDetails.propTypes = {
  task: React.PropTypes.object,

  onClickCheckbox: React.PropTypes.func,
  onChangeNotes: React.PropTypes.func,

  checked: React.PropTypes.bool,
  notes: React.PropTypes.string,

};

TaskDetails.defaultProps = {
  task: {},

  onClickCheckbox: undefined,
  onChangeNotes: undefined,

  checked: false,
  notes: '',

}

export default TaskDetails;
