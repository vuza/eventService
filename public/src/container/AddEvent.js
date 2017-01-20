import { connect } from 'react-redux'
import { addEvent } from '../actions'
import EditingEvent from '../components/EditingEvent'

const mapDispatchToProps = ({
    onSave: addEvent
})

const mergeProps = () => ({
    name: '',
    startDate: '',
    duration: ''
})

const AddEvent = connect(
    () => ({}),
    mapDispatchToProps,
    mergeProps
)(EditingEvent)

export default AddEvent
