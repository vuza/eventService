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

        var startDateValue = ''
        var startTimeValue = ''
        if(startDate != '') {
            const startDateObject = new Date(startDate)
            startDateValue = startDateObject.getFullYear() + '-' + ('0' + (startDateObject.getMonth() + 1)).slice(-2) + '-' + ('0' + startDateObject.getDate()).slice(-2)
            startTimeValue = ('0' + startDateObject.getHours()).slice(-2) + ':' + ('0' + startDateObject.getMinutes()).slice(-2)
        }

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
                            <div style={{width: '50%', 'margin-left': '-5px', 'padding-left': '5px'}} className='input-field inline'>
                                <input
                                    type='date'
                                    defaultValue={ startDateValue }
                                    id='startDate'
                                    className='datepicker'
                                    ref={ node => {
                                        this.newStartDate = node
                                    }}
                                />
                                <label style={{'padding-left': '5px'}} for='startDate'>Start Date</label>
                            </div>
                            <div style={{width: '50%', 'margin-left': '0'}} className='input-field inline'>
                                <input
                                    id='startTime'
                                    defaultValue={ startTimeValue }
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
                            <label for='duration'>Minutes</label>
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
