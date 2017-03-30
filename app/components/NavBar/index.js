import React from 'react';
import style from './index.scss';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router'

class NavBar extends React.Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-sm navbar-inverse">
          <div>
            {this.props.backButton && <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="#" onClick={() => {browserHistory.goBack()}}>Back</a>
                </li>
            </ul>}
          </div>
          <Link to="/" className="navbar-brand d-flex mx-auto">Habbit</Link>
          {this.props.user &&
            <span className="text-white">
              <p>{this.props.user.email}</p>
              <a className="text-right alert-link" onClick={(e)=>{console.log('click');;this.props.onClickLogout()}}>Logout</a>
            </span>
          }
        </nav>
        <p></p>
      </div>
    )
  }
}

NavBar.propTypes = {
  backButton: React.PropTypes.bool,
  user: React.PropTypes.object,
  onClickLogout: React.PropTypes.func,
};

NavBar.defaultProps = {
  backButton: false,
  user: undefined,
  onClickLogout: undefined,
}

export default NavBar;
