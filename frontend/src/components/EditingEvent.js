import React, { PropTypes } from 'react'

const EditingEvent = ({ id = '', name = '', startDate = '', duration = '', link = '', onSave }) => {
    let newName
    let newStartDate
    let newDuration
    let newLink

    return (
        <div className='row'>
            <form className='col s12' onSubmit={ e => {
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
                <div className='row'>
                    <div className='input-field col s2'>
                        <input
                            defaultValue={ name }
                            id='name'
                            type='text'
                            ref={ node => {
                                newName = node
                            }}
                        />
                        <label for='name'>Eventname</label>
                    </div>
                    <div className='input-field col s2'>
                        <input
                            defaultValue={ startDate }
                            id='startDate'
                            type='text'
                            ref={ node => {
                                newStartDate = node
                            }}
                        />
                        <label for='startDate'>Startdate</label>
                    </div>
                    <div className='input-field col s2'>
                        <input
                            defaultValue={ duration }
                            id='duration'
                            type='text'
                            ref={ node => {
                                newDuration = node
                            }}
                        />
                        <label for='duration'>Duration</label>
                    </div>
                    <div className='input-field col s2'>
                        <input
                            defaultValue={ link }
                            id='link'
                            type='text'
                            ref={ node => {
                                newLink = node
                            }}
                        />
                        <label for='link'>Link</label>
                    </div>
                    <div className='input-field col s4'>
                        <button className='waves-effect waves-light' type='submit'>
                            Save Event
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

EditingEvent.propTypes = {
    onSave: PropTypes.func.isRequired
}

export default EditingEvent
