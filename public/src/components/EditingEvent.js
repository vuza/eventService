import React, { PropTypes } from 'react'

const EditingEvent = ({ name, startDate, duration, onSave, dispatch }) => {
    let newName
    let newStartDate
    let newDuration

    return (
        <form onSubmit={ e => {
            e.preventDefault()

            if (!newName.value.trim() || !newStartDate.value.trim() || !newDuration.value.trim()) {
                return
            }

            dispatch(onSave(newName.value, newStartDate.value, newDuration.value))

            name.value = ''
            startDate.value = ''
            duration.value = ''
        }}>
            <input
                defaultValue={ name }
                placeholder='Name'
                ref={ node => {
                    newName = node
                }}
            />
            <input
                defaultValue={ startDate }
                placeholder='Start Date'
                ref={ node => {
                    newStartDate = node
                }}
            />
            <input
                defaultValue={ duration }
                placeholder='Duration'
                ref={ node => {
                    newDuration = node
                }}
            />
            <button type='submit'>
                Save
            </button>
        </form>
    )
}

EditingEvent.propTypes = {
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired
}

export default EditingEvent
