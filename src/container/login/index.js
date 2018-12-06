import React, { Component } from 'react'
import {
	List,
	InputItem,
	WingBlank,
	WhiteSpace,
	Button
} from 'antd-mobile';
import Logo from '../../component/logo';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { login } from '../../redux/user/action';

@connect(
	state => state.user,
	{ login }
)
class Login extends Component{
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			pwd: ''
		}
		this.handleLogin = this.handleLogin.bind(this);
		this.toRegisterPage = this.toRegisterPage.bind(this);
	}

	handleChange(key, val) {
		this.setState({
			[key]: val
		})
	}

	handleLogin() {
		this.props.login(this.state);
	}

	// 跳转到注册页面
	toRegisterPage() {
		this.props.history.push('/register')
	}


	render(){
		let redirectToPath = this.props.path;
		return (
			<div>

				{ redirectToPath ? <Redirect to={redirectToPath} /> : null }

        <Logo />

        <WingBlank>

          <List>
            <InputItem onChange={v => this.handleChange('user',v)}>用户</InputItem>
            <InputItem onChange={v => this.handleChange('pwd',v)}>密码</InputItem>
          </List>

          <WhiteSpace />
          <Button type='primary' onClick={this.handleLogin}>登陆</Button>
          <WhiteSpace />
          <Button type='primary' onClick={this.toRegisterPage}>注册</Button>

        </WingBlank>
			</div>
		)
	}
}

export default Login
