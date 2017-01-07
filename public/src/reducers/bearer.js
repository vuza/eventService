import * as actionTypes from '../actions'

const bearer = (state = null, action) => {
    switch(action.type) {
        case actionTypes.AUTHORIZATION_ERROR:
            return null

        case actionTypes.AUTHORIZED:
            return action.bearer

        default:
            return state
    }
}

export default bearer
