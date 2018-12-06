import { LOGIN_SUCCESS, REGISTER_SUCCESS, ERROR_MSG } from './constant';

const initState = {
  user: '',
  pwd: '',
  sex: '',
  msg: ''
}

export function user(state = initState, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case ERROR_MSG:
      return {
        msg: action.msg
      }
    default:
      return state;
  }
}
