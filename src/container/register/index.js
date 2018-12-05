import React, { Component } from 'react'
import {
	List,
	InputItem,
	Radio,
	WingBlank,
	WhiteSpace,
	Button
} from 'antd-mobile';
import Logo from '../../component/logo'
import { connect } from 'react-redux';
import { register } from '../../redux/user/action';

@connect(
  state => state.user,
  { register }
)
class Register extends Component{
	constructor(props) {
		super(props);
    this.state = {
			user: '',
			pwd: '',
			repeatpwd: '',
			sex: 'man'
		}
		this.handleRegister = this.handleRegister.bind(this);
	}

  handleChange(key, val) {
		this.setState({
			[key]: val
		})
	}

  handleRegister() {
    this.props.register(this.state);
  }


	render(){
    const RadioItem = Radio.RadioItem;

		return (
			<div>
        <Logo />

        <WingBlank>

          <List>
            {
              this.props.msg ?
              <p className='error-msg'>{this.props.msg}</p>
              : null
            }
            <InputItem onChange={v => this.handleChange('user',v)}>用户</InputItem>
            <InputItem onChange={v => this.handleChange('pwd',v)}>密码</InputItem>
            <InputItem onChange={v => this.handleChange('repeatpwd',v)}>确认密码</InputItem>
            <RadioItem
              checked={this.state.sex === 'man'}
              onChange={v => this.handleChange('sex','man')}
            >
              男士
            </RadioItem>
					  <RadioItem
              checked={this.state.sex === 'women'}
              onChange={v => this.handleChange('sex','women')}
            >
              女士
            </RadioItem>
          </List>

          <WhiteSpace />
          <Button type='primary' onClick={this.handleRegister}>注册</Button>

        </WingBlank>
			</div>
		)
	}
}

export default Register
