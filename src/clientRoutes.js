import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { history } from './_helpers/history'
import Layout from "./hoc/layout/Layout";

const ClientDashboardRoutes = ({ component: Component, path, ...rest }) => {
    return (
        <Route
            path={path}
            {...rest}
            render={(props) => {
                return localStorage.getItem('user') ? (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                ) : (
                    <Layout>
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    prevLocation: rest?.location?.pathname || path,
                                    error: "You need to login first!",
                                },
                            }}
                        />
                    </Layout>
                );
            }}
        />
        // <Route {...rest} render={props => (
        //     <Layout>
        //         <Component {...props} />
        //     </Layout>
        // )} />
    )
}

export default ClientDashboardRoutes