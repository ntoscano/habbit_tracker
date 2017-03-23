import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import { Link } from 'react-router-dom';

class TaskDetails extends React.Component {

  toggleNotesField () {
    this.props.onToggleEntry(this.props.task.id, this.props.showNotesField);
  }

  componentDidMount () {
    if (!this.props.task.parent_task_id) {
      this.props.onToggleEntry(this.props.task.id, false);
    }
  }

  render() {
    let notesInput;
    return (
      <div className="list-group-item list-group-item-action justify-content-between  " key={this.props.task.id}>
        <Link to={"/tasks/" + this.props.task.id + "/edit"} className="text-muted">{this.props.task.name}  <i className="fa fa-pencil"></i></Link>
        <div className="input-group">
          <span className="input-group-btn">
            <button type="button" className="btn btn-secondary" onClick={(event) => {this.toggleNotesField()}}><i className={this.props.showNotesField ? "fa fa-check-square-o fa-3" : "fa fa-square-o fa-3"}></i></button>
          </span>
          <input className="form-control" placeholder="Notes..." defaultValue={this.props.initialNotes} onChange={(e) => {this.props.onChangeNotes(this.props.task.id, e.target.value)}} />
        </div>
      </div>
    )};
}

TaskDetails.propTypes = {
  task: React.PropTypes.object,
  onToggleEntry: React.PropTypes.func,
  onChangeNotes: React.PropTypes.func,
  showNotesField: React.PropTypes.bool,
  notes: React.PropTypes.string,

  initialChecked: React.PropTypes.bool,
  initialNotes: React.PropTypes.string,
};

TaskDetails.defaultProps = {
  task: {},
  onToggleEntry: undefined,
  onChangeNotes: undefined,
  showNotesField: false,
  notes: '',

  initialChecked: false,
  initialNotes: '',
}

export default TaskDetails;
