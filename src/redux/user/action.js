import axios from 'axios';
import { ERROR_MSG } from './constant';

function errorMsg(msg) {
  return {
    type: ERROR_MSG,
    msg
  }
}

export function register(data) {
  let { user, pwd, repeatpwd, sex } = data;
  if (!user || !pwd || !sex) {
    return errorMsg('用户名密码必须输入')
  }

  if (pwd != repeatpwd) {
    return errorMsg('密码和确认密码不一致')
  }

  return dispatch => {
    axios.post('/user/register', { user, pwd, sex })
      .then(res => {
        console.log(res);
      })
  }
}
