import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import RootReducer from './RootReducer'
import thunk from 'redux-thunk'
import { persistStore,persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:'root',
    storage
}
const persistedReducer = persistReducer(persistConfig,RootReducer)

const middlewares = [logger,thunk];

export const store = createStore(persistedReducer,applyMiddleware(...middlewares))
export const Persister = persistStore(store)
