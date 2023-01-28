
import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AdminLayoutPostApp from './admin/component/layout/AdminLayoutPostApp.jsx'

const AdminDashboardPostAppRoutes = ({ component: Component, path, ...rest }) => {

    return (
        <Route
            path={path}
            {...rest}
            render={(props) => {
                return localStorage.getItem('admin') ? (
                    <AdminLayoutPostApp>
                        <Component {...props} />
                    </AdminLayoutPostApp>
                ) : (
                    <AdminLayoutPostApp>
                        <Redirect
                            to={{
                                pathname: "/secure/admin-login",
                                state: {
                                    prevLocation: rest?.location?.pathname || path,
                                    error: "You need to login first!",
                                },
                            }}
                        />
                    </AdminLayoutPostApp>
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

export default AdminDashboardPostAppRoutes