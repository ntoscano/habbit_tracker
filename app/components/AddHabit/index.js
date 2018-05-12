import React from 'react';
import cx from 'classnames';
import style from './index.scss';

class AddHabit extends React.Component {

  addTask(input) {
    if (input.value) {
      this
        .props
        .onClick(input.value);
      input.value = '';
    }
  }
  render() {
    let input;
    return (
      <form className="pa4 black-80 w-100">
        <div className="di">
          <label className="f6 b db mb2">New Habit Name...</label>
          <input
            className="input-reset f6 ba b--black-20 pa2 mb2 di w-80"
            ref={node => {
            input = node;
          }}
            onKeyPress={(e) => {
            if (e.key === 'Enter') 
              this.addTask(input)
          }}/>
        </div>
          <div className="mt3 di">
            <input className="b ml3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 w-10" type="button" onClick={() => {
              this.addTask(input)
            }} value="Add" />
          </div>
      </form>
    )
  }
}

AddHabit.propTypes = {
  onClick: React.PropTypes.func
};

AddHabit.defaultProps = {
  onClick: undefined
}

export default AddHabit;
