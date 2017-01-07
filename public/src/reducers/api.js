import * as actionTypes from '../actions'

const api = (state = {communicating: false, invalidate: false}, action) => {
    switch(action.type) {
        case actionTypes.ADDING_EVENT:
        case actionTypes.REQUEST_EVENTS:
            return Object.assign({}, state, {
                communicating: true,
                invalidate: false
            })

        case actionTypes.ADDED_EVENT:
        case actionTypes.RECEIVE_EVENTS:
            return Object.assign({}, state, {
                communicating: false,
                invalidate: false
            })

        case actionTypes.API_ERROR:
            return Object.assign({}, state, {
                communicating: false,
                invalidate: true
            })

        default:
            return state
    }
}

export default api
