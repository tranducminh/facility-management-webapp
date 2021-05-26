import { all, fork, put, takeLatest } from 'redux-saga/effects'
import axios from '../../utils/axios'
import { AuthType } from '../types/auth.type'
import { loginSuccess, fetchMeSuccess } from '../actions/auth.action'
import { NotificationStatus } from '../types/notification.type'
import {
  pushNotification,
  resetNotification,
} from '../actions/notification.action'

function* loginEmployeeSaga(action: any) {
  try {
    const result = yield axios.post('/employees/login', { ...action.payload })

    if (result.data) {
      localStorage.setItem('token', result.data.data.token)
      yield put(
        loginSuccess({
          token: result.data.data.token,
          role: 'employee',
          user: result.data.data.employee,
        })
      )
      yield put(
        pushNotification({
          title: result.data.message,
          description: result.data.description,
          status: NotificationStatus.SUCCESS,
        })
      )
      yield put(resetNotification())
    }
  } catch (error) {
    yield put(
      pushNotification({
        title: error.response.data.message,
        description: error.response.data.description,
        status: NotificationStatus.ERROR,
      })
    )
    yield put(resetNotification())
  }
}

function* loginAdminSaga(action: any) {
  try {
    debugger
    const result = yield axios.post('/admins/login', { ...action.payload })
    if (result.data) {
      localStorage.setItem('token', result.data.data.token)
      yield put(
        loginSuccess({
          token: result.data.data.token,
          role: 'admin',
          user: result.data.data.admin,
        })
      )
      yield put(
        pushNotification({
          title: result.data.message,
          description: result.data.description,
          status: NotificationStatus.SUCCESS,
        })
      )
      yield put(resetNotification())
    }
  } catch (error) {
    yield put(
      pushNotification({
        title: error.response.data.message,
        description: error.response.data.description,
        status: NotificationStatus.ERROR,
      })
    )
    yield put(resetNotification())
  }
}

function* loginRepairmanSaga(action: any) {
  try {
    debugger
    const result = yield axios.post('/repairman/login', { ...action.payload })
    if (result.data) {
      localStorage.setItem('token', result.data.data.token)
      yield put(
        loginSuccess({
          token: result.data.data.token,
          role: 'repairman',
          user: result.data.data.repairman,
        })
      )
      yield put(
        pushNotification({
          title: result.data.message,
          description: result.data.description,
          status: NotificationStatus.SUCCESS,
        })
      )
      yield put(resetNotification())
    }
  } catch (error) {
    yield put(
      pushNotification({
        title: error.response.data.message,
        description: error.response.data.description,
        status: NotificationStatus.ERROR,
      })
    )
    yield put(resetNotification())
  }
}

function* fetchMeSaga(action: any) {
  try {
    let result
    switch (action.payload.role) {
      case 'employee':
        result = yield axios.get('/employees/me')
        break
      case 'admin':
        result = yield axios.get('/admins/me')
        break
      case 'repairman':
        result = yield axios.get('/repairman/me')
        break
      default:
        break
    }

    if (result.data) {
      localStorage.setItem('token', result.data.data.token)
      switch (action.payload.role) {
        case 'employee':
          yield put(
            fetchMeSuccess({
              role: 'employee',
              user: result.data.data.employee,
            })
          )
          break
        case 'admin':
          yield put(
            fetchMeSuccess({
              role: 'admin',
              user: result.data.data.admin,
            })
          )
          break
        case 'repairman':
          yield put(
            fetchMeSuccess({
              role: 'repairman',
              user: result.data.data.repairman,
            })
          )
          break
        default:
          break
      }
    }
  } catch (error) {
    console.log(error)
  }
}

function* watchAuthSaga() {
  yield takeLatest(AuthType.LOGIN_EMPLOYEE, loginEmployeeSaga)
  yield takeLatest(AuthType.FETCH_ME, fetchMeSaga)
  yield takeLatest(AuthType.LOGIN_ADMIN, loginAdminSaga)
  yield takeLatest(AuthType.LOGIN_REPAIRMAN, loginRepairmanSaga)
}

function* AuthSaga() {
  yield all([fork(watchAuthSaga)])
}

export default AuthSaga
