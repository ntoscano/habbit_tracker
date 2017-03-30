import React from 'react';
import style from './index.scss';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router'

class NavBar extends React.Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-sm navbar-inverse">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target=".dual-collapse">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse dual-collapse">
              {this.props.backButton && <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                      <a className="nav-link" href="#" onClick={() => {browserHistory.goBack()}}>Back</a>
                  </li>
              </ul>}
          </div>
          <Link to="/" className="navbar-brand d-flex mx-auto">Habbit</Link>
          <Link to="/login" className="pull-xs-right">Login</Link>
          {this.props.user ? this.props.user.email : 'Login'}
        </nav>
      </div>
    )
  }
}

NavBar.propTypes = {
  backButton: React.PropTypes.bool,
  user: React.PropTypes.object,
};

NavBar.defaultProps = {
  backButton: false,
  user: {},
}

export default NavBar;
