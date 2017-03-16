import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import { Link } from 'react-router-dom';

class TaskDetails extends React.Component {

  constructor() {
    super();
    this.state = {
      showNotesField: false,
    }
  }

  toggleNotesField () {
    this.props.onToggleEntry(this.props.task.id);
    this.setState({
      showNotesField: !this.state.showNotesField,
    })
  }
  render() {
    let notesInput;
    return (
      <div className="list-group-item list-group-item-action justify-content-between  " key={this.props.task.id}>
        {this.props.task.text}
        <Link to={"/tasks/" + this.props.task.id + "/edit"}>Edit</Link>
        <div className="form-check form-check-inline">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value={this.props.task.id} onChange={(event) => {this.toggleNotesField()}} />
          </label>
        </div>

        {this.state.showNotesField && <div className="input-group">
          <input className="form-control" placeholder="Notes..." onChange={(e) => {this.props.onChangeNotes(this.props.task.id, e.target.value)}} />
        </div>}
      </div>
    )};
}

TaskDetails.propTypes = {
  onLogTask: React.PropTypes.func,
  task: React.PropTypes.object,
  onToggleEntry: React.PropTypes.func,
  onChangeNotes: React.PropTypes.func,
};

TaskDetails.defaultProps = {
  onLogTask: undefined,
  task: {},
  onToggleEntry: undefined,
  onChangeNotes: undefined,
}

export default TaskDetails;
