import React, { PropTypes, Component } from 'react'

class EditingEvent extends Component {
    componentDidMount() {
        Materialize.updateTextFields();
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
                                defaultValue={ startDate }
                                id='startDate'
                                type='text'
                                ref={ node => {
                                    this.newStartDate = node
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
                                    this.newDuration = node
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
                                    this.newLink = node
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
}

EditingEvent.propTypes = {
    onSave: PropTypes.func.isRequired
}

export default EditingEvent
