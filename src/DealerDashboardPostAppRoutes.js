
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import DealerLayoutPostApp from './dealerAdmin/component/layout/DealerLayoutPostApp.jsx'

const DealerDashboardPostAppRoutes = ({ component: Component, path, ...rest }) => {

    return (
        <Route
            path={path}
            {...rest}
            render={(props) => {
                return Number(localStorage.getItem('user_type')) === 2 ? (
                    <DealerLayoutPostApp>
                        <Component {...props} />
                    </DealerLayoutPostApp>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {
                                prevLocation: rest?.location?.pathname || path,
                                error: "You need to login first!",
                            },
                        }}
                    />
                );
            }}
        />
    )
}

export default DealerDashboardPostAppRoutes