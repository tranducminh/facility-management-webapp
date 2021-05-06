import {
  LoginPayload,
  LoginSuccessPayload,
  FetchMeSuccessPayload,
  LoginAdminPayload,
  FetchMePayload,
} from '../payloads/auth.payload'
import { AuthType } from '../types/auth.type'

export const loginEmployee = (payload: LoginPayload) => ({
  type: AuthType.LOGIN_EMPLOYEE,
  payload,
})

export const loginAdmin = (payload: LoginAdminPayload) => ({
  type: AuthType.LOGIN_ADMIN,
  payload,
})

export const loginRepairman = (payload: LoginPayload) => ({
  type: AuthType.LOGIN_REPAIRMAN,
  payload,
})

export const loginSuccess = (payload: LoginSuccessPayload) => ({
  type: AuthType.LOGIN_SUCCESS,
  payload,
})

export const logout = () => ({
  type: AuthType.LOGOUT,
})

export const fetchMe = (payload: FetchMePayload) => ({
  type: AuthType.FETCH_ME,
  payload,
})

export const fetchMeSuccess = (payload: FetchMeSuccessPayload) => ({
  type: AuthType.FETCH_ME_SUCCESS,
  payload,
})
