import React, { PropTypes } from 'react'

const Event = ({ id, name, startDate, duration, link, onDelete, onEdit }) => (
  <li>
    {name}, {startDate}, {duration}, {link}
    <button
        onClick={()=>{onDelete(id)}}
    >
        Delete
    </button>
    <button
        onClick={()=>{onEdit(id)}}
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
