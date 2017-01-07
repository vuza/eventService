import React from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../actions'

const AddEventComponent = ({ dispatch }) => {
    let input

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!input.value.trim()) {
                    return
                }
                dispatch(addEvent(input.value))
                input.value = ''
            }}>
                <input ref={node => {
                    input = node
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
