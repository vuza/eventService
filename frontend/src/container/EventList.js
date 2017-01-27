import { connect } from 'react-redux'
import React, { PropTypes, Component } from 'react'
import Event from '../components/Event'
import EditingEvent from '../components/EditingEvent'
import { deleteEvent, editEvent, updateEvent } from '../actions'

class EventListComponent extends Component {
    constructor({ events, onDelete, onEdit, onSave }) {
        super()

        this.events = events
        this.onDelete = onDelete
        this.onEdit = onEdit
        this.onSave = onSave
    }

    componentDidMount = () => {
        Materialize.updateTextFields();
    }

    render = () => (
        <div className='row'>
            <ul className='col s12'>
                {this.events.map((event) =>
                    event.editing ?

                    <li key={event.id}>
                        <EditingEvent
                            {...event}
                            onSave={this.onSave} />
                    </li> :

                    <Event
                        key={event.id}
                        {...event}
                        onDelete={() => this.onDelete(event.id)}
                        onEdit={() => this.onEdit(event.id)} />
                )}
            </ul>
        </div>
    )
}

EventListComponent.propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    }).isRequired).isRequired
}

const mapStateToProps = (state) => ({
    events: state.events
})

const mapDispatchToProps = dispatch => ({
    onDelete: id => dispatch(deleteEvent(id)),
    onEdit: id => dispatch(editEvent(id)),
    onSave: (id, name, startDate, duration, link) => dispatch(updateEvent(id, name, startDate, duration, link))
})

const EventList = connect(
    mapStateToProps,
    mapDispatchToProps
)(EventListComponent)

export default EventList
