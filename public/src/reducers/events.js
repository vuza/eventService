import * as actionTypes from '../actions'

const events = (state = [], action) => {
    switch(action.type) {
        case actionTypes.ADDED_EVENT:
            return state.concat([{
                name: action.name, // TODO startDate, duration
                startDate: 'asfd',
                duration: 'asd'
            }])

        case actionTypes.RECEIVE_EVENTS:
            return state.concat(action.events)

        default:
            return state
    }
}

export default events
