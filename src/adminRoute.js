import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AdminLayout from './admin/component/layout/AdminLayout.jsx'

const AdminDashboardRoutes = ({ component: Component, path, ...rest }) => {

    return (
        <Route
            path={path}
            {...rest}
            render={(props) => {
                return localStorage.getItem('admin') ? (
                    <AdminLayout>
                        <Component {...props} />
                    </AdminLayout>
                ) : (
                    <AdminLayout>
                        <Redirect
                            to={{
                                pathname: "/secure/admin-login",
                                state: {
                                    prevLocation: rest?.location?.pathname || path,
                                    error: "You need to login first!",
                                },
                            }}
                        />
                    </AdminLayout>
                );
            }}
        />
        // <Route {...rest} render={props => (
        //     <AdminLayout>
        //         <Component {...props} />
        //     </AdminLayout>
        // )} />
    )
}

export default AdminDashboardRoutes