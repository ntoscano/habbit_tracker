import React from 'react';
import style from './index.scss';
import { Link } from 'react-router-dom';

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
                      <Link to="/" className="nav-link">Back</Link>
                  </li>
              </ul>}
          </div>
          <Link to="/" className="navbar-brand d-flex mx-auto">Habbit</Link>
          <div className="navbar-collapse collapse dual-collapse">
          </div>
        </nav>
      </div>
    )
  }
}

NavBar.propTypes = {
  backButton: React.PropTypes.bool,
};

NavBar.defaultProps = {
  backButton: false,
}

export default NavBar;
