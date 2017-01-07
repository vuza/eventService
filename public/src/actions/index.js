/*
 * action types
 */

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'
export const REQUEST_EVENTS = 'REQUEST_EVENTS'
export const API_ERROR = 'API_ERROR'
export const ADDING_EVENT = 'ADDING_EVENT'
export const ADDED_EVENT = 'ADDED_EVENT'
export const AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR'
export const AUTHORIZED = 'AUTHORIZED'
export const AUTHORIZING = 'AUTHORIZING'

/*
 * action creators
 */


const handleFetchError = (error) => {
     if(error.message === '401') {
         return {
             type: AUTHORIZATION_ERROR,
             error: error
         }
     }

     return {
         type: API_ERROR,
         error: error
     }
}

const authorized = (bearer) => ({
    type: AUTHORIZED,
    bearer: bearer
})

const authorizing = () => ({
   type: AUTHORIZING
})

export const authorize = (username, password) => {
     return (dispatch) => {
         dispatch(authorizing())

         const params = {username: username, password: password}
         const data = Object.keys(params).map((key) => {
             return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
         }).join('&')

         return fetch(`http://localhost:8080/auth`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded'
             },
             body: data
         })
             .then(r => {
                 if(!r.ok) {
                     throw Error(r.status)
                 }

                 return r
             })
             .then(r => r.text())
             .then((bearer) => dispatch(authorized(bearer)))
             .catch(error => dispatch(handleFetchError(error)))
     }
}

const addingEvent = () => ({
    type: ADDING_EVENT
})

const addedEvent = (event) => ({
    type: ADDED_EVENT,
    event: event
})

export const addEvent = (name) => {
    return (dispatch, getState) => {
        dispatch(addingEvent())

        const bearer = getState().bearer

        const params = {name: name, startDate: 'xas', duration: 'asdf'} // TODO startDate, duration
        const data = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&')

        return fetch(`http://localhost:8080/event`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${bearer}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
            .then(r => {
                if(!r.ok) {
                    throw Error(r.status)
                }

                return r
            })
            .then(r => r.json())
            .then((event) => dispatch(addedEvent(event)))
            .catch(error => dispatch(handleFetchError(error)))
    }
}

const requestEvents = () => ({
    type: REQUEST_EVENTS
})

const receiveEvents = (events) => ({
    type: RECEIVE_EVENTS,
    events: events.map(child => {return JSON.parse(child)})
})

export const fetchEvents = () => {
    return (dispatch) => {
        dispatch(requestEvents())

        return fetch(`http://localhost:8080/events`)
            .then(r => {
                if(!r.ok) {
                    throw Error(r.status)
                }

                return r
            })
            .then(r => r.json())
            .then(events => dispatch(receiveEvents(events)))
            .catch(error => dispatch(handleFetchError(error)))
    }
}
