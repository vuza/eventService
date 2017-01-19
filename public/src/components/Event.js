import React, { PropTypes } from 'react'

const Event = ({ name, startDate, duration, onDelete, onEdit }) => (
  <li>
    {name}, {startDate}, {duration}
    <button
        onClick={onDelete}
    >
        Delete
    </button>
    <button
        onClick={onEdit}
    >
        Edit
    </button>
  </li>
)

Event.propTypes = {
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired
}

export default Event
