import React, { PropTypes } from 'react'

const Event = ({ id, name, startDate, duration, link, onDelete, onEdit }) => (
    <li className='row'>
        <div className='col s2'>
            {name}
        </div>
        <div className='col s2'>
            {startDate}
        </div>
        <div className='col s2'>
            {duration}
        </div>
        <div className='col s2'>
            {link}
        </div>
        <div className='input-field col s2'>
            <button
                className='waves-effect waves-light  btn'
                onClick={()=>{onDelete(id)}} >
                Delete Event
            </button>
        </div>
        <div className='input-field col s2'>
            <button
                className='waves-effect waves-light  btn'
                onClick={()=>{onEdit(id)}} >
                Edit Event
            </button>
        </div>
      </li>
)

Event.propTypes = {
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired
}

export default Event
