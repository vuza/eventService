import * as actionTypes from '../actions'

const events = (state = [], action) => {
    switch(action.type) {
        case actionTypes.ADDED_EVENT:
            return state.concat([{
                id: action.event.id,
                name: action.event.name,
                startDate: action.event.startDate,
                duration: action.event.duration
            }])

        case actionTypes.RECEIVE_EVENTS:
            return state.concat(action.events)

        default:
            return state
    }
}

export default events
