import React from 'react';
import styles from './Login.module.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../actions/productActions';


class Login extends React.Component {

  constructor(props){
    super(props);
    this.state={
      loginMessage:''
    }
  }

  handleSubmit = event => {
    this.props.history.push("/");
    this.props.actions.handleLogin();
  }

  render() {
      return (
        <div className={styles.loginContainer}>
            <form onSubmit={this.handleSubmit} noValidate ref="formSignUp" className={styles.signUpForm}>
            <h2>Sign In</h2>
            <div className="imgcontainer">
                <img src="./login.jpg" alt="Avatar" className="avatar"></img>
            </div>
            <div className="signup-container">
                <label><b>Username</b></label>
                <input type="text" placeholder="admin" name="email" required />

                <label><b>Password</b></label>
                <input type="password" placeholder="admin" name="password" required />
                    
                <button>Login</button>
                {/* <div className="rem-box">
                  <span>Remember me</span>
                  <input type="checkbox" ref="chkbox" defaultChecked={false}/>
                </div>                 */}
            </div>
            {/* <div className="signup-container" style={{backgroundColor: '#f1f1f1'}}>
                <a href="/signup" style={{"color":"black"}}>Sign Up</a>
                <span className="psw"> <a href="/forgotpassword" style={{"color":"black"}}>Forgot password?</a></span>
            </div> */}
            </form>
            {this.state.loginMessage && <span className="wrong-cred-text">{this.state.loginMessage} </span>}
        </div>
      );
    }
  }

  function mapStateToProps(state, ownProps) {
  return {
    cartItems: state.CartReducer.cartItems // See: reducers/index.js
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(cartActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));