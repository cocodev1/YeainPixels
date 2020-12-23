import {combineReducers} from 'redux'
import colorReducer from './colorReducer'
import changeYearReducer from './changeYearReducer'

export default combineReducers({
    colorReducer,
    changeYearReducer
})