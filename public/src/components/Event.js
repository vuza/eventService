import React, { PropTypes } from 'react'

const Event = ({ name, startDate, duration }) => (
  <li>
    {name}, {startDate}, {duration}
  </li>
)

Event.propTypes = {
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired
}

export default Event
