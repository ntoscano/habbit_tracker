import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';

class TaskDetailPage extends React.Component {
  render() {
    return (
      <div>
        <div>
          This is a task detail page: {this.props.id}
        </div>
      </div>
    );
  }
}

TaskDetailPage.propTypes = {

}

TaskDetailPage.defaultProps = {
  id: React.PropTypes.string,
}

const mapStateToProps = (state, ownProps) => {
  console.log('ownProps.location: ' + ownProps.location.keys);
  return {
    id: ownProps.location.query
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailPage);
