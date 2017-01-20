import React from 'react'
import { connect } from 'react-redux'
import { authorize } from '../actions'

const LoginComponent = ({ dispatch }) => {
    let username
    let password

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()

                if(!username.value.trim() || !password.value.trim()) {
                    return
                }

                dispatch(authorize(username.value, password.value))

                username.value = ''
                password.value = ''
            }}>
                <input defaultValue='marlon' ref={node => {
                    username = node
                }} />
                <input defaultValue='xx' ref={node => {
                    password = node
                }} />
                <button type='submit'>
                    Login
                </button>
            </form>
        </div>
    )
}

const Login = connect()(LoginComponent)

export default Login
