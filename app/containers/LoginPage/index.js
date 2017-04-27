import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import NavBar from 'Bitmatica/components/NavBar';
import {login, logout, fetchToDos, setRedirectUrl} from 'Bitmatica/containers/Frontpage/actions';
import {SignupPage} from 'Bitmatica/containers/SignupPage';

class LoginPage extends React.Component {

  render() {
    let email;
    let password;
    let redirectUrl = this.props.location.state && this.props.location.state.from
      ? this.props.location.state.from.pathname
      : '/';
    return (
      <main className="pa4 black-80">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                ref={node => {
                email = node;
              }}/>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                ref={node => {
                password = node;
              }}/>
            </div>
            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/>
              Remember me</label>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              this
                .props
                .setRedirectUrl(redirectUrl);
              this
                .props
                .login(email.value, password.value)
            }}/>
          </div>
          <div className="lh-copy mt3">
            <a
              href="#0"
              className="f6 link dim black db"
              onClick={(e) => {
              this
                .props
                .setRedirectUrl(redirectUrl);
              this
                .props
                .history
                .push("/signup")
            }}>Sign up</a>
            <a href="#0" className="f6 link dim black db">Forgot your password?</a>
          </div>
        </form>
      </main>
    )
  }
}

LoginPage.propTypes = {}

LoginPage.defaultProps = {}

const mapStateToProps = (state, ownProps) => {
  return {todos: state.cms.todos, loggedTodos: state.cms.loggedTodos, user: state.cms.user}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
