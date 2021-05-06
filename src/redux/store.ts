import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { logger } from 'redux-logger'
import rootReducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let middlewares = [sagaMiddleware, logger]
if (process.env.REACT_APP_ENV === `production`) {
  middlewares = [sagaMiddleware]
}

const composeEnhancers =
  (process.env.REACT_APP_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const enhancer = composeEnhancers(applyMiddleware(...middlewares))
const store = createStore(persistedReducer, enhancer)

sagaMiddleware.run(rootSaga)

export default store
export const persistor = persistStore(store)
