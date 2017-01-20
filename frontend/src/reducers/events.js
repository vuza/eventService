import * as actionTypes from '../actions'

const events = (state = [], action) => {
    switch(action.type) {
        case actionTypes.ADDED_EVENT:
            return state.concat([{
                id: action.event.id,
                name: action.event.name,
                startDate: action.event.startDate,
                duration: action.event.duration,
                link: action.event.link
            }])

        case actionTypes.RECEIVE_EVENTS:
            return state.concat(action.events)

        case actionTypes.DELETED_EVENT:
            return state.filter(event => event.id !== action.id)

        case actionTypes.EDITING_EVENT:
            return Array.from(state, event => {
                if(event.id === action.id){
                    event.editing = true
                }
                return event
            })

        case actionTypes.UPDATED_EVENT:
            return Array.from(state, event => {
                if(event.id === action.event.id){
                    event.editing = false
                    event = action.event
                }
                return event
            })

        default:
            return state
    }
}

export default events
