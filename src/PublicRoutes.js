import React from 'react'
import { Route } from 'react-router-dom'
import Layout from "./hoc/layout/Layout";

const PublicRoutes = ({ component: Component, path, ...rest }) => {

    return (
        <Route {...rest} render={props => (
            <Layout>
                <Component {...props} />
            </Layout>
        )} />
    )
}

export default PublicRoutes