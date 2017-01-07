import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import Event from '../components/Event'

const EventListComponent = ({ events }) => (
  <ul>
    {events.map((event, i) =>
      <Event
        key={i}
        {...event}
      />
    )}
  </ul>
)

EventListComponent.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
}

const mapStateToProps = (state) => ({
    events: state.events
})

const EventList = connect(
    mapStateToProps
)(EventListComponent)

export default EventList
