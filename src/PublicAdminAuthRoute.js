import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Layout from "./hoc/layout/Layout";

const PublicAdminAuthRoute = ({ component: Component, path, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            !localStorage.getItem('adminId')
            ?  <Layout>
                     <Component {...props} />
                </Layout>
            : <>
                <Redirect to="/admin" />
            </>
           
        )} />
    )
}

export default PublicAdminAuthRoute