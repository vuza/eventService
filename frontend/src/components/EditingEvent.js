import React, { PropTypes, Component } from 'react'

class EditingEvent extends Component {
    componentDidMount() {
        Materialize.updateTextFields()

        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        })
    }

    render() {
        const { id = '', name = '', startDate = '', duration = '', link = '', onSave } = this.props

        return (
            <div className='row'>
                <form className='col s12' onSubmit={ e => {
                    e.preventDefault()

                    if (!this.newName.value.trim() || !this.newStartDate.value.trim() || !this.newDuration.value.trim()) {
                        return
                    }

                    onSave(id, this.newName.value, this.newStartDate.value, this.newDuration.value, this.newLink.value)

                    this.newName.value = ''
                    this.newStartDate.value = ''
                    this.newDuration.value = ''
                    this.newLink.value = ''

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
                        <div className='input-field col s2'>
                            <input
                                type='date'
                                defaultValue={ startDate }
                                id='startDate'
                                className='datepicker'
                                ref={ node => {
                                    this.newStartDate = node
                                }}
                            />
                            <label for='startDate'>Startdate</label>
                        </div>
                        <div className='input-field col s2'>
                            <p className='range-field'>
                                <input
                                    defaultValue={ duration }
                                    id='duration'
                                    type='range'
                                    min='0'
                                    max='1000'
                                    ref={ node => {
                                        this.newDuration = node
                                    }}
                                />
                            </p>
                            <label for='duration'>Duration in minutes</label>
                        </div>
                        <div className='input-field col s2'>
                            <input
                                defaultValue={ link }
                                id='link'
                                type='text'
                                ref={ node => {
                                    this.newLink = node
                                }}
                            />
                            <label for='link'>Link</label>
                        </div>
                        <div className='input-field col s4'>
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
