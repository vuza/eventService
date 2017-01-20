import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import EventList from './EventList'
import AddEvent from './AddEvent'

const AppComponent = ({bearer}) => (
  <div>
    {!bearer ? // TODO we should make a modal out of it, or a route, e.g.: http://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions/35641680
        <Login /> :
        <div>
            <EventList />
            <AddEvent />
        </div>
    }
  </div>
)

const mapStateToProps = (state) => ({
    errors: state.errors.length > 0 ? state.errors : false,
    bearer: state.bearer
})

const App = connect(
    mapStateToProps
)(AppComponent)

export default App
