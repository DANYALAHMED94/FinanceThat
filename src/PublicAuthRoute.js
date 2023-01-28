import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Layout from "./hoc/layout/Layout";

const PublicAuthRoute = ({ component: Component, path, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            !localStorage.getItem('user')
            ?  <Layout>
                     <Component {...props} />
                </Layout>
            : <>
                <Redirect to="/" />
            </>
           
        )} />
    )
}

export default PublicAuthRoute