import * as actionTypes from '../actions'

const errors = (state = [], action) => {
    switch(action.type) {
        case actionTypes.API_ERROR:
            return state.concat([action.error])

        // TODO nicer
        case 'remove':
            return state.filter((error, i) => i !== action.index)

        default:
            return state
    }
}

export default errors
