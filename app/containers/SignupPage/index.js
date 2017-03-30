import React from 'react';
import style from './index.scss';
import {connect, dispatch} from 'react-redux';
import NavBar from 'Bitmatica/components/NavBar';
import {addUser} from 'Bitmatica/containers/Frontpage/actions';


class SignupPage extends React.Component {

  render() {
    let email;
    let password;
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
          <button type="submit" className="btn btn-success" onClick={(e) => {this.props.signup(email.value, password.value)}}>Signup</button>
        </div>
      </div>
    )
  }
}

SignupPage.propTypes = {
}

SignupPage.defaultProps = {
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
    signup: (email, password) => {
      dispatch(addUser(email, password));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
