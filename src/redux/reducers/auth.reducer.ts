import { AuthType } from '../types/auth.type'

const defaultState: any = {
  isLoading: false,
  isAuth: false,
  role: '',
  token: '',
  user: {
    name: 'user',
    channel: '',
  },
}

export const AuthReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case AuthType.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuth: true,
      }
    case AuthType.LOGIN_FAIL:
      return defaultState
    case AuthType.FETCH_ME_SUCCESS:
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
