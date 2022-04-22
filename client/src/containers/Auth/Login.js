import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';

import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
          isShowPassword: false,
          errMessage: '',
        }
    }

    handleOnChangeUsername = (event) => {
      this.setState({
        username: event.target.value,
      });
      //console.log(event.target.value);
    }

    handleOnChangePassword = (event) => {
      this.setState({
        password: event.target.value,
      })
    }
  //   handleLogin = async()=>{
  //     this.setState({
  //         errMessage:''
  //     }) 
  // }

    // handleLogin = () => {
    //   console.log("test", this.state.password);
    // }
    handleLogin=()=>{
      console.log('username', this.state.username);
      console.log('pass', this.state.password);
  }

    handleShowHidePassword = () => {
      this.setState({
        isShowPassword: !this.state.isShowPassword
      })
    }

    handleKeyDown = (event) => {
      if(event.key === 'Enter' || event.keyCode === 13) this.handleLogin();
    }

    render() {
        
        return (
            <div className='login-bg'>
              <div className='login-container'>
                <div className='login-content row'>
                  <div className='col-12 text-login'>Login</div>
                  <div className='col-12 form-group login-input'>
                    <label>Username</label>
                    <input type='text' 
                      className='form-control login-input'
                      placeholder="Enter your username..."
                      value={this.state.username}
                      onChange={(event) => {
                        this.handleOnChangeUsername(event)
                      }}
                    />
                  </div>
                  < div className='col-12 form-group login-input'>
                    <label>Password</label>
                    <div className='custom-input-password'>
                      <input type={this.state.isShowPassword ? 'text': 'password'} 
                        className='form-control login-input'
                        placeholder="Enter your password..."
                        value={this.state.password}
                        onChange={(event) => {this.handleOnChangePassword(event)}}
                        onKeyDown={(event)=>this.handleKeyDown(event)}
                        />
                        <span onClick={()=> this.handleShowHidePassword()}>
                          <i className={this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash" }></i>      
                        </span>
                    </div>
                  </div>
                  <div className='col-12 '>
                    <button className='btn-login' onClick={()=> this.handleLogin()}>Login</button>
                  </div>
                  <div className='col-12'>
                    <span className='forgot-password small'>Forgot your password?</span>
                  </div>
                  <div className="col-12 text-center mt-3">
                    <span className="text-other-login"> Or login with: </span>
                      </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-twitter twitter"></i>
                        </div>
                  </div>
              </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
