import React, { Fragment } from 'react'
import { Router, Navigate, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
const ProtectedRoute = ({ component: Component, ...rest }) => {

    const { error, user, isAuthenticated, loading } = useSelector(state => state.auth);

    return (
        <Fragment>
            {loading && (
                <React.Fragment
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return <Navigate to='/login' />
                        }
                        return <Component {...props} />
                    }}
                />
            )}
        </Fragment>
    )
}

export default ProtectedRoute