import { ERROR_MSG } from './constant';

const initState = {

}

export function user(state = initState, action) {
  switch(action.type) {
    case ERROR_MSG:
      return {
        msg: action.msg
      }
    default:
      return state;
  }
}
