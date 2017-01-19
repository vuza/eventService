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

        case actionTypes.DELETED_EVENT:
            return state.filter(event => event.id !== action.id)

        case actionTypes.EDITING_EVENT:
            const newState = state.slice()
            newState.forEach(event => {
                if(event.id === action.id){
                    event.editing = true;
                }
            })
            return newState

        default:
            return state
    }
}

export default events
