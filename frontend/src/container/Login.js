import React from 'react'
import { connect } from 'react-redux'
import { authorize } from '../actions'

const LoginComponent = ({ dispatch }) => {
    let username
    let password

    return (
        <div className='row'>
            <form className='col s12' onSubmit={e => {
                e.preventDefault()

                if(!username.value.trim() || !password.value.trim()) {
                    return
                }

                dispatch(authorize(username.value, password.value))

                username.value = ''
                password.value = ''
            }}>
                <div className='row'>
                    <div className='input-field col s6'>
                        <input placeholder='Type your username' id='username' type='text' ref={node => {
                            username = node
                        }} />
                        <label for='username'>Username</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field col s6'>
                        <input placeholder='Type your password' id='password' type='password' ref={node => {
                            password = node
                        }} />
                        <label for="password">Password</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field col s6'>
                        <button className='waves-effect waves-light btn-large' type='submit'>
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const Login = connect()(LoginComponent)

export default Login
