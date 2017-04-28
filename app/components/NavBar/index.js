import React from 'react';
import style from './index.scss';
import { Link } from 'react-router-dom';
import { browserHistory } from 'react-router'

class NavBar extends React.Component {

  render() {
    return (
      <div>
        <nav className="tc pa3 pa4-ns">
          <div>
            {this.props.backButton && <ul className="">
                <li className="">
                    <a className="link dim gray f6 f5-ns dib mr3" href="#" onClick={() => {browserHistory.goBack()}}>Back</a>
                </li>
            </ul>}
          </div>
          <Link to="/" className="link dim black b f2 tc db mb4-ns fl di">Habbit</Link>
          {this.props.user &&
            <span className="di fr">
              <p className="link dim gray f6 f5-ns dib mr3">{this.props.user.email}</p>
              <a className="link dim gray f6 f5-ns dib mr3" onClick={(e)=>{console.log('click');;this.props.onClickLogout()}}>Logout</a>
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
