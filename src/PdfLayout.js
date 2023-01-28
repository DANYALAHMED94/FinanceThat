import React from 'react'
import { Route } from 'react-router-dom'

const PdfLayout = ({ component: Component, path, ...rest }) => {

    return (
        <Route {...rest} render={props => (
            <Component {...props} />
        )} />
    )
}

export default PdfLayout