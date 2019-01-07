import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from '../../redux/user/action';

@withRouter
@connect(
  state => state.user,
  { getUserInfo }
)
class AuthRoute extends Component{
  componentDidMount() {
    // 如果页面path是注册和登录页，不用请求后端
    const list = ['/login','/register'];
    const { pathname } = this.props.location;

    if (list.includes(pathname)) {
      return null;
    }

    this.props.getUserInfo();

  }

  render() {
    let redirectToPath = this.props.path;

    return (
      <div>
        { redirectToPath ? <Redirect to={redirectToPath} /> : null }
      </div>
    )
  }
}

export default AuthRoute;
