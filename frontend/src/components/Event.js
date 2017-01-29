import React, { PropTypes } from 'react'

const Event = ({ id, name, startDate, duration, description, onDelete, onEdit }) => {
    console.log(description)

    return (
        <li className='collection-item'
            style={{
                'padding-left': 0,
                'padding-right': 0
            }}>
            <div className='row'>
                <p className='col s2'>
                    {name}
                </p>
                <p className='col s2'>
                    {startDate}
                </p>
                <p className='col s2'>
                    {duration}
                </p>
                <p className='col s2'>
                    {description}
                </p>
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
            </div>
      </li>
    )
}

Event.propTypes = {
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired
}

export default Event
