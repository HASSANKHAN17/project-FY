import CartReducer from './cart/CartReducer'
import userReducer from './user/userReducer'
import {combineReducers} from 'redux'

export default combineReducers({
    cart:CartReducer,
    user:userReducer
})