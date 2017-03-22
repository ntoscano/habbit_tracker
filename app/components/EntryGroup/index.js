import React from 'react';
import cx from 'classnames';
import style from './index.scss';

import moment from 'moment';

import { Link } from 'react-router-dom';

 // onClick={(e) => {console.log('clicked ' + entry.content); this.props.onClick(entry.id, 'NEW CONTENT', false)}}

class EntryGroup extends React.Component {

  render() {
    const entries = this.props.entries.sort(function(e1,e2) {
      return e1.updatedAt - e2.updatedAt;
    }).map((entry, index) => {
      return (
        <Link to={"/entries/" + entry.id}>
          <div className="list-group-item" key={entry.id}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="text-muted">{entry.parent_entry_id ? 'SUB ENTRY: ' : ''} {entry.content}</h5>
              <small>{moment(entry.updatedAt).fromNow()}</small>
            </div>
          </div>
        </Link>
      );
    });
    return (
      <div className="list-group">{entries}</div>
    )
  }
}

EntryGroup.propTypes = {
  entries: React.PropTypes.array,
  onClick: React.PropTypes.func,
};

EntryGroup.defaultProps = {
  entries: [],
  onClick: undefined,
}

export default EntryGroup;
