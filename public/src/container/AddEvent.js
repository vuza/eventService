import React from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../actions'

const AddEventComponent = ({ dispatch }) => {
    let name
    let startDate
    let duration

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()

                if (!name.value.trim() || !startDate.value.trim() || !duration.value.trim()) {
                    return
                }

                dispatch(addEvent(name.value, startDate.value, duration.value))

                name.value = ''
                startDate.value = ''
                duration.value = ''
            }}>
                <input ref={node => {
                    name = node
                }} />
                <input ref={node => {
                    startDate = node
                }} />
                <input ref={node => {
                    duration = node
                }} />
                <button type='submit'>
                    Add Event
                </button>
            </form>
        </div>
    )
}

const AddEvent = connect()(AddEventComponent)

export default AddEvent
