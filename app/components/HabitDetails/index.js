import React from 'react';
import cx from 'classnames';
import style from './index.scss';
import {Link} from 'react-router-dom';

class HabitDetails extends React.Component {

  onClickCheckbox(newValue) {
    this
      .props
      .onClickCheckbox(this.props.task.id, !this.props.checked);
  }

  onChangeNotes(newValue) {
    this
      .props
      .onChangeNotes(id, newValue)
  }

  render() {
    let notesInput;
    return (
      <div
        className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4"
        role="group"
        key={this.props.task.id}
        aria-label="task">
        <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">
          <Link to={"/tasks/" + this.props.task.id + "/edit"} className="black">
            {this.props.task.name}
            <i className="fa fa-pencil ml3"></i>
          </Link>
          <label className="f4 di fr black">
            Completed:
            <input
              className="ml2"
              type="checkbox"
              checked={this.props.checked}
              onClick={(event) => {
              this.onClickCheckbox(event.target.checked)
            }}
              aria-label="Checkbox for following text input"/>
          </label>
        </h1>
        <div className="pa2 bt b--black-10 db">
          <p className="ma0">
            <textarea
              className="center b--black-20 ma2 w-100 di"
              placeholder="Notes..."
              value={this.props.notes}
              onChange={(e) => {
              this
                .props
                .onChangeNotes(this.props.task.id, e.target.value)
            }}></textarea>
          </p>
        </div>
      </div>
    )
  };
}

HabitDetails.propTypes = {
  task: React.PropTypes.object,

  onClickCheckbox: React.PropTypes.func,
  onChangeNotes: React.PropTypes.func,

  checked: React.PropTypes.bool,
  notes: React.PropTypes.string
};

HabitDetails.defaultProps = {
  task: {},

  onClickCheckbox: undefined,
  onChangeNotes: undefined,

  checked: false,
  notes: ''
}

export default HabitDetails;
