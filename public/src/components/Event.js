import React, { PropTypes } from 'react'

const Event = ({ name }) => (
  <li>
    {name}
  </li>
)

Event.propTypes = {
  name: PropTypes.string.isRequired
}

export default Event
