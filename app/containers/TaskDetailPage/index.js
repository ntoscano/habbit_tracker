import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';

class TaskDetailPage extends React.Component {
  render() {
    return (
      <div>
        <div>
          This is a task detail page
        </div>
      </div>
    );
  }
}

TaskDetailPage.propTypes = {
}

TaskDetailPage.defaultProps = {
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailPage);
