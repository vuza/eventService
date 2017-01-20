import { combineReducers } from 'redux'
import api from './api'
import errors from './errors'
import events from './events'
import bearer from './bearer'

export default combineReducers({
    errors,
    api,
    events,
    bearer
})
