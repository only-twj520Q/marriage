import React, { Component } from 'react'
import {
	List,
	InputItem,
	Radio,
	WingBlank,
	WhiteSpace,
	Button
} from 'antd-mobile';
import Logo from '../../component/logo';

class Login extends Component{
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			pwd: ''
		}
		this.toRegisterPage = this.toRegisterPage.bind(this);
	}

	handleChange(key, val) {
		this.setState({
			[key]: val
		})
	}

	// 跳转到注册页面
	toRegisterPage() {
		this.props.history.push('/register')
	}


	render(){
		return (
			<div>
        <Logo />

        <WingBlank>

          <List>
            <InputItem onChange={v => this.handleChange('user',v)}>用户</InputItem>
            <InputItem onChange={v => this.handleChange('pwd',v)}>密码</InputItem>
          </List>

          <WhiteSpace />
          <Button type='primary'>登陆</Button>
          <WhiteSpace />
          <Button type='primary' onClick={this.toRegisterPage}>注册</Button>

        </WingBlank>
			</div>
		)
	}
}

export default Login
