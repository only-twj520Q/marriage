import axios from 'axios';
import { LOGIN_SUCCESS, REGISTER_SUCCESS, ERROR_MSG } from './constant';

// 登陆成功
function loginSuc(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

// 注册成功
function registerSuc(data) {
  return {
    type: REGISTER_SUCCESS,
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
          dispatch(loginSuc(res.data.data));
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
          dispatch(registerSuc(res.data.data));
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
