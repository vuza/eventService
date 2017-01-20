import React, { PropTypes } from 'react'

const EditingEvent = ({ id = '', name = '', startDate = '', duration = '', link = '', onSave }) => {
    let newName
    let newStartDate
    let newDuration
    let newLink

    return (
        <form onSubmit={ e => {
            e.preventDefault()

            if (!newName.value.trim() || !newStartDate.value.trim() || !newDuration.value.trim()) {
                return
            }
            
            onSave(id, newName.value, newStartDate.value, newDuration.value, newLink.value)

            newName.value = ''
            newStartDate.value = ''
            newDuration.value = ''
            newLink.value = ''
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
            <input
                defaultValue={ link }
                placeholder='Link'
                ref={ node => {
                    newLink = node
                }}
            />
            <button type='submit'>
                Save
            </button>
        </form>
    )
}

EditingEvent.propTypes = {
    onSave: PropTypes.func.isRequired
}

export default EditingEvent
