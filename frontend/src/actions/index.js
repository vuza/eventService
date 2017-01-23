/*
 * Config
 */

 const protocoll = 'http'
 const host = 'alagoda.at'
 const port = 8080

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
export const DELETING_EVENT = 'DELETING_EVENT'
export const DELETED_EVENT = 'DELETED_EVENT'
export const EDITING_EVENT = 'EDITING_EVENT'
export const UPDATING_EVENT = 'UPDATING_EVENT'
export const UPDATED_EVENT = 'UPDATED_EVENT'

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

         return fetch(`${protocoll}://${host}:${port}/auth`, {
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

export const addEvent = (name, startDate, duration, link) => {
    return (dispatch, getState) => {
        dispatch(addingEvent())

        const bearer = getState().bearer

        const params = {name: name, startDate: startDate, duration: duration, link: link}
        const data = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&')

        return fetch(`${protocoll}://${host}:${port}/event`, {
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

        return fetch(`${protocoll}://${host}:${port}/events`)
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

const deletingEvent = () => ({
    type: DELETING_EVENT
})

const deletedEvent = (id) => ({
    type: DELETED_EVENT,
    id: id
})

export const deleteEvent = (id) => {
    return (dispatch, getState) => {
        dispatch(deletingEvent())

        const bearer = getState().bearer

        return fetch(`http://localhost:8080/event/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${bearer}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(r => {
                if(!r.ok) {
                    throw Error(r.status)
                }

                return r
            })
            .then(() => dispatch(deletedEvent(id)))
            .catch(error => dispatch(handleFetchError(error)))
    }
}

export const editEvent = (id) => ({
    type: EDITING_EVENT,
    id: id
})

const updatingEvent = id => ({
    type: UPDATING_EVENT,
    id: id
})

const updatedEvent = event => ({
    type: UPDATED_EVENT,
    event: event
})

export const updateEvent = (id, name, startDate, duration, link) => {
    return (dispatch, getState) => {
        dispatch(updatingEvent(id))

        const bearer = getState().bearer

        const params = {name: name, startDate: startDate, duration: duration, link: link}
        const data = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&')

        return fetch(`${protocoll}://${host}:${port}/event/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${bearer}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:data
        })
        .then(r => {
            if(!r.ok) {
                throw Error(r.status)
            }

            return r
        })
        .then(r => r.json())
        .then(event => dispatch(updatedEvent(event)))
        .catch(error => dispatch(handleFetchError(error)))
    }
}
