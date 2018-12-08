import React, { Component } from 'react';
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button,
  DatePicker,
  List,
  WhiteSpace
} from 'antd-mobile';
import AvatarSelector from '../../component/avatarselector';
import { connect } from 'react-redux';
import { update } from '../../redux/user/action';
import { Redirect } from 'react-router-dom';

@connect(
	state => state.user,
	{ update }
)
class MoreInfo extends Component{
  constructor(props) {
		super(props)
		this.state = {
      avatar: '',
			nickname: '',
      birthdate: '',
      salary: '',
      hobby: '',
			desc:'',
		}
    this.handleChange = this.handleChange.bind(this);
	}

	handleChange(key,val) {
		this.setState({
			[key]:val
		})
	}

  render() {
    console.log('父组件',this.state);
    let redirectToPath = this.props.path;
    return (
      <div>

        { redirectToPath ? <Redirect to={redirectToPath} /> : null }

        <NavBar mode="dark">完善信息</NavBar>

        <AvatarSelector
          selectAvatar={v => this.handleChange('avatar',v)}
        />

      <List>
        <InputItem onChange={v => this.handleChange('nickname',v)}>昵称</InputItem>

        <DatePicker
            mode="date"
            minDate={new Date('1950')}
            extra="请选择"
            value={this.state.birthdate}
            onChange={date => this.setState({ birthdate: date })}
        >
          <List.Item arrow="horizontal">生日</List.Item>
        </DatePicker>

        <InputItem onChange={v => this.handleChange('salary',v)}>收入</InputItem>
        <InputItem onChange={v => this.handleChange('hobby',v)}>爱好</InputItem>
        <TextareaItem
  					onChange={v => this.handleChange('desc',v)}
  					rows={3}
  					autoHeight
  					title='自我描述'
  			>
				</TextareaItem>
      </List>

      <WhiteSpace />
      <WhiteSpace />

      <Button
        onClick={() => {
          this.props.update(this.state);
        }}
        type='primary'
      >
        保存
      </Button>
    </div>
    )
  }
}

export default MoreInfo;
