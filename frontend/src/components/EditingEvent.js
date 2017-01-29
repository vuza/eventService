import React, { PropTypes, Component } from 'react'

class EditingEvent extends Component {
    componentDidMount() {
        Materialize.updateTextFields()

        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        })

        $('#description').trigger('autoresize')
        $('#description').characterCounter()
    }

    render() {
        const { id = '', name = '', startDate = '', duration = '', description = '', onSave } = this.props

        return (
            <div className='row'>
                <form className='col s12' onSubmit={ e => {
                    e.preventDefault()

                    if (!this.newName.value.trim() || !this.newStartDate.value.trim() || !this.newDuration.value.trim() || !this.newStartTime.value.trim()) {
                        return
                    }

                    const date = new Date(this.newStartDate.value)
                    const minute = this.newStartTime.value.substring(this.newStartTime.value.indexOf(':') + 1)
                    const hour = this.newStartTime.value.substring(0, this.newStartTime.value.indexOf(':'))

                    date.setHours(hour)
                    date.setMinutes(minute)

                    onSave(id, this.newName.value, date.toGMTString(), this.newDuration.value, this.newDescription.value)

                    this.newName.value = ''
                    this.newStartDate.value = ''
                    this.newDuration.value = ''
                    this.newDescription.value = ''
                    this.newStartTime.value = ''

                    Materialize.updateTextFields()
                }}>
                    <div className='row'>
                        <div className='input-field col s2'>
                            <input
                                defaultValue={ name }
                                id='name'
                                type='text'
                                ref={ node => {
                                    this.newName = node
                                }}
                            />
                            <label for='name'>Eventname</label>
                        </div>
                        <div className='col s3'>
                            <div className='input-field inline'>
                                <input
                                    type='date'
                                    defaultValue={ startDate }
                                    id='startDate'
                                    className='datepicker'
                                    ref={ node => {
                                        this.newStartDate = node
                                    }}
                                />
                                <label for='startDate'>Start Date</label>
                            </div>
                            <div style={{width: '50%'}} className='input-field inline'>
                                <input
                                    id='startTime'
                                    type='time'
                                    min='0'
                                    max='1000'
                                    ref={ node => {
                                        this.newStartTime = node
                                    }}
                                />
                            </div>
                        </div>
                        <div className='input-field col s1'>
                            <input
                                defaultValue={ duration }
                                id='duration'
                                type='number'
                                min='0'
                                max='1000'
                                ref={ node => {
                                    this.newDuration = node
                                }}
                            />
                            <label for='duration'>Duration in minutes</label>
                        </div>
                        <div className='input-field col s4'>
                            <textarea
                                defaultValue={ description }
                                id='description'
                                className='materialize-textarea'
                                type='text'
                                ref={ node => {
                                    this.newDescription = node
                                }}
                            ></textarea>
                            <label for='description'>Description</label>
                        </div>
                        <div className='input-field col s2'>
                            <button className='waves-effect waves-light btn' type='submit'>
                                Save Event
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

EditingEvent.propTypes = {
    onSave: PropTypes.func.isRequired
}

export default EditingEvent
