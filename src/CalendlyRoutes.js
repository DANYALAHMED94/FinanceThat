import React from 'react'
import { Route } from 'react-router-dom'

const CalendlyRoutes = ({ component: Component, path, ...rest }) => {

    return (
        <Route {...rest} render={props => (
            <Component {...props} />
        )} />
    )
}

export default CalendlyRoutes