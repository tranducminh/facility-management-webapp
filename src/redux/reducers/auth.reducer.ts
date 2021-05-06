import { AuthType } from '../types/auth.type'

const defaultState: any = {
  isLoading: false,
  isAuth: false,
  role: '',
  token: '',
  user: {
    name: 'user',
  },
}

export const AuthReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case AuthType.LOGIN_EMPLOYEE:
      return {
        ...state,
        isLoading: true,
      }
    case AuthType.LOGIN_SUCCESS:
      debugger
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuth: true,
      }
    case AuthType.FETCH_ME_SUCCESS:
      debugger
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuth: true,
      }
    case AuthType.LOGOUT:
      return defaultState
    default:
      return state
  }
}
