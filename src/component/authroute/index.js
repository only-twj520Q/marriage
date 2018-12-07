import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

@withRouter
class AuthRoute extends Component{
  componentDidMount() {
    // 如果页面path是注册和登录页，不用请求后端
    const list = ['/login','/register'];
    const { pathname } = this.props.location;
    if (list.includes(pathname)) {
      return null;
    }

    axios.get('/user/info')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          // 登陆成功
        } else {
          this.props.history.push('/login');
        }
      })

  }

  render() {
    return null;
  }
}

export default AuthRoute;
