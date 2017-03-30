import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import NavBar from 'Bitmatica/components/NavBar';
import {login, logout, fetchToDos, setRedirectUrl} from 'Bitmatica/containers/Frontpage/actions';
import {SignupPage} from 'Bitmatica/containers/SignupPage';

class LoginPage extends React.Component {

  render() {
    let email;
    let password;
    let redirectUrl = this.props.location.state && this.props.location.state.from ? this.props.location.state.from.pathname : '/';
    return (
      <div>
        <div className="container">
          <div className="form-group row">
            <label className="col-2 col-form-label">Email</label>
            <div className="col-10">
              <input className="form-control" type="email" id="email" ref={node => {
                email = node;
              }}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label">Password</label>
            <div className="col-10">
              <input className="form-control" type="password" id="password" ref={node => {
                password = node;
              }}/>
            </div>
          </div>
          <span>
            <a className="text-white" onClick={(e)=>{this.props.setRedirectUrl(redirectUrl);this.props.history.push("/signup")}}>Signup</a>
            <button type="submit" className="btn btn-success" onClick={(e) => {this.props.setRedirectUrl(redirectUrl);this.props.login(email.value, password.value)}}>Login</button>
          </span>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
}

LoginPage.defaultProps = {
}

const mapStateToProps = (state, ownProps) => {
  return {
    todos: state.cms.todos,
    loggedTodos: state.cms.loggedTodos,
    user: state.cms.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setRedirectUrl: (url) => {
      dispatch(setRedirectUrl(url));
    },
    login: (email, password) => {
      dispatch(login(email, password));
    },
    fetchTodos: () => {
      dispatch(fetchToDos());
    },
    logout: () => {
      dispatch(logout());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
