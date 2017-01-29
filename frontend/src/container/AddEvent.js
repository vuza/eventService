import { connect } from 'react-redux'
import { addEvent } from '../actions'
import EditingEvent from '../components/EditingEvent'

const mapDispatchToProps = dispatch => ({
    onSave: (id, name, startDate, duration, description) => {
        dispatch(addEvent(name, startDate, duration, description))
    }
})

const AddEvent = connect(
    () => ({}), // empty mapStateToProps
    mapDispatchToProps
)(EditingEvent)

export default AddEvent
