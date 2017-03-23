import React from 'react';
import cx from 'classnames';
import style from './index.scss';

import moment from 'moment';

import { Link } from 'react-router-dom';

 // onClick={(e) => {console.log('clicked ' + entry.content); this.props.onClick(entry.id, 'NEW CONTENT', false)}}

class EntryGroup extends React.Component {

  taskForId(id) {
    return this.props.tasks.filter((tsk) => {
      return tsk.id === id;
    })[0];
  }

  render() {
    const entries = this.props.entries.sort(function(e1,e2) {
      return e1.updatedAt - e2.updatedAt;
    }).map((entry, index) => {
      return (
        <Link to={"/entries/" + entry.id} className="list-group-item" key={entry.id}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="text-muted">{this.taskForId(entry.task_id).name}</h5>
            <h5 className="text-muted">{entry.content} </h5>
            <h5 className="text-muted">{moment(entry.updatedAt).fromNow()}</h5>
          </div>
        </Link>
      );
    });
    return (
      <div>
        {entries}
      </div>
    )
  }
}

EntryGroup.propTypes = {
  entries: React.PropTypes.array,
  tasks: React.PropTypes.array,
  onClick: React.PropTypes.func,
};

EntryGroup.defaultProps = {
  entries: [],
  tasks: [],
  onClick: undefined,
}

export default EntryGroup;
