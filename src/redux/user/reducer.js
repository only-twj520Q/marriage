import { AUTH_SUCCESS, ERROR_MSG, LOAD_DATA, REDIRECT_PATH } from './constant';

const initState = {
  user: '',
  pwd: '',
  sex: '',
  msg: ''
}

export function user(state = initState, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case ERROR_MSG:
      return {
        msg: action.msg
      }
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      }
    case REDIRECT_PATH:
      return {
        path: action.path
      }
    default:
      return state;
  }
}
