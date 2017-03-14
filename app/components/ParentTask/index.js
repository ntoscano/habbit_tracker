import React from 'react';
import cx from 'classnames';
import style from './index.scss';

class ParentTask extends React.Component {

  constructor() {
    super();
    this.state = {
      showNotesField: false,
    }
  }

  toggleNotesField () {
    this.setState({
      showNotesField: !this.state.showNotesField,
    })
  }
  render() {
    let notesInput;
    return (
      <div className="list-group-item list-group-item-action justify-content-between active" key={this.props.task.id}>
        {this.props.task.text}
        <div className="form-check form-check-inline">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value={this.props.task.id} onChange={(event) => {this.toggleNotesField()}} />
          </label>
        </div>

        {this.state.showNotesField && <div className="input-group">
          <input className="form-control" placeholder="Notes..." ref={node => {
            notesInput = node;
          }} />
          <span className="input-group-btn">
            <button className="btn btn-secondary" type="button" onClick={() => {this.props.onLogTask(this.props.task.id, this.props.task.text, notesInput.value);notesInput.value='';}}>Finish</button>
          </span>
        </div>}
      </div>
    )};
}

ParentTask.propTypes = {
  onLogTask: React.PropTypes.func,
  task: React.PropTypes.object,
};

ParentTask.defaultProps = {
  onLogTask: undefined,
  task: {},
}

export default ParentTask;
