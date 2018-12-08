import React, { Component } from 'react';
import { Grid, SegmentedControl, ImagePicker } from 'antd-mobile';
import './index.css';

class AvatarSelector extends Component{
  constructor(props) {
		super(props);
		this.state = {
      icon: '',
      files: [],
      selectedSegmentIndex: 0
    };
    this.onSegChange = this.onSegChange.bind(this);
    this.upLoadAvatar = this.upLoadAvatar.bind(this);
    this.onSelectAvatar = this.onSelectAvatar.bind(this);
	}

  onSegChange(e) {
    const { selectedSegmentIndex } = e.nativeEvent;
    this.setState({
      selectedSegmentIndex
    });
  }

  upLoadAvatar(files, type, index) {
    this.setState({
      files,
      icon: files.length > 0 ? files[0].url: ''
    });

    this.props.selectAvatar(files.length > 0 ? files[0].file.name : '');
  }

  onSelectAvatar(elm) {
    this.setState(elm);
    this.props.selectAvatar(elm.text);
  }


  render() {
    const avatarList = ['boy','girl','man','woman','pig','tiger'].map(v=>({
      icon: require(`../../common/image/avatar/${v}.png`),
      text: v
    }));
    let { selectedSegmentIndex, icon, files} = this.state;
    console.log('子组件');
    return (
      <div>
        {
          icon ?
          (
            <div className='avatar-container'>
              <span>已选择头像</span>
              <img style={{width:20}} src={icon} />
            </div>
          ) :
          (
            <div className='avatar-container'>请选择头像</div>
          )
        }

        <SegmentedControl
          values={['选择系统头像', '自定义头像']}
          selectedIndex={selectedSegmentIndex}
          onChange={this.onSegChange}
        />

        {
          selectedSegmentIndex === 0 &&
            <Grid
              data={avatarList}
              columnNum={3}
              onClick={elm => { this.onSelectAvatar(elm) }}
            />
          }

          {
            selectedSegmentIndex === 1 &&
              <ImagePicker
                files={files}
                onChange={this.upLoadAvatar}
                selectable={files.length < 1}
                multiple={false}
              />
          }

      </div>
    )
	}
}

export default AvatarSelector;
