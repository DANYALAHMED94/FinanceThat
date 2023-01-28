import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import DealerLayout from './dealerAdmin/component/layout/DealerLayout.jsx'

const DealerDashboardRoutes = ({ component: Component, path, ...rest }) => {

    return (
        <Route
            path={path}
            {...rest}
            render={(props) => {
                return Number(localStorage.getItem('user_type')) === 2 ? (
                    <DealerLayout>
                        <Component {...props} />
                    </DealerLayout>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/dealer-login",
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

export default DealerDashboardRoutes