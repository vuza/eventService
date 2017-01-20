import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import Event from '../components/Event'
import EditingEvent from '../components/EditingEvent'
import { deleteEvent, editEvent, updateEvent } from '../actions'

const EventListComponent = ({ events, onDelete, onEdit, onSave }) => (
  <ul>
    {events.map((event) =>
        event.editing ?
            <li key={event.id}>
                <EditingEvent
                    {...event}
                    onSave={(name, startDate, duration) => onSave(event.id, name, startDate, duration)}
                />
            </li> :
            <Event
                key={event.id}
                {...event}
                onDelete={() => onDelete(event.id)}
                onEdit={() => onEdit(event.id)}
            />
    )}
  </ul>
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

const mapDispatchToProps = ({
    onDelete: deleteEvent,
    onEdit: editEvent,
    onSave: updateEvent
})

const EventList = connect(
    mapStateToProps,
    mapDispatchToProps
)(EventListComponent)

export default EventList
