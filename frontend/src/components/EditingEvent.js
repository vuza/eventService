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
                    <div className='input-field col s6'>
                        <input
                            defaultValue={ name }
                            id='name'
                            ref={ node => {
                                newName = node
                            }}
                        />
                        <label for='name'>Eventname</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field col s6'>
                        <input
                            defaultValue={ startDate }
                            id='startDate'
                            ref={ node => {
                                newStartDate = node
                            }}
                        />
                        <label for='startDate'>Startdate</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field col s6'>
                        <input
                            defaultValue={ duration }
                            id='duration'
                            ref={ node => {
                                newDuration = node
                            }}
                        />
                        <label for='duration'>Duration</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field col s6'>
                        <input
                            defaultValue={ link }
                            id='link'
                            ref={ node => {
                                newLink = node
                            }}
                        />
                        <label for='link'>Link</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field col s6'>
                        <button className='waves-effect waves-light btn-large' type='submit'>
                            Save
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
