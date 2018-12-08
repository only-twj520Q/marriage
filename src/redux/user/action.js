import axios from 'axios';
import { AUTH_SUCCESS, ERROR_MSG } from './constant';

// 授权成功
function authSuccess(data) {
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

// 错误提示
function errorMsg(msg) {
  return {
    type: ERROR_MSG,
    msg
  }
}

// 登陆
export function login(data) {
  let { user, pwd } = data;
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }

  return dispatch => {
    axios.post('/user/login', { user, pwd })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errorMsg(res.data.msg));
        }
      })
  }
}

// 注册
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
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 完善信息
export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
