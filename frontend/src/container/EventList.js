import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import Event from '../components/Event'
import EditingEvent from '../components/EditingEvent'
import { deleteEvent, editEvent, updateEvent } from '../actions'

const EventListComponent = ({ events, onDelete, onEdit, onSave }) => (
    <div className='row'>
        <ul className='col s12'>
            {events.map((event) =>
                event.editing ?

                <li key={event.id}>
                    <EditingEvent
                        {...event}
                        onSave={onSave} />
                </li> :

                <Event
                    key={event.id}
                    {...event}
                    onDelete={() => onDelete(event.id)}
                    onEdit={() => onEdit(event.id)} />
            )}
        </ul>
    </div>
)

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
