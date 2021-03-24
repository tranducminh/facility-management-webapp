import UserType from '../types/user.type'

export const fetchUser = (payload: any) => ({
  type: UserType.FETCH_USER,
  payload,
})
