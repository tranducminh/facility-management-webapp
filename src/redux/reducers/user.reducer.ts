import UserType from '../types/user.type'

const defaultState: any = {
  id: 1,
  name: '',
  email: '',
  role: '',
  rememberToken: '',
  emailVerifiedAt: '',
  refreshToken: '',
  createAt: '',
  updateAt: '',
}

export const UserReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case UserType.FETCH_USER:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
