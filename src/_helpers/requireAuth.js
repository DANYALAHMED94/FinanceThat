import React, { Component } from 'react'
import jwt_decode from "jwt-decode";
import { history } from '../_helpers/history'
import Store from './store'
import * as ACTIONS from '../actions/authActions'
export default ComposedComponent => {
    class Authenticate extends Component {
        UNSAFE_componentWillMount() {
            const login = localStorage.getItem('user')
            console.log(history, 'Auth Check')
            if (login == null) {
                // localStorage.clear();
                localStorage.removeItem('user')
                localStorage.removeItem('user_type')
                localStorage.removeItem('lastStepPostAppEditAdmin')
                localStorage.removeItem('coApplicantEditPostAppAdmin')
                localStorage.removeItem('lastStepPostAppEditAdmin')
                localStorage.removeItem('coApplicantEditPostAppAdmin')
                localStorage.removeItem('lastStepPostAppEdit')
                localStorage.removeItem('coApplicantEditPostApp')
                localStorage.removeItem('lastStepDealerPostAppEdit')
                localStorage.removeItem('coApplicantDealerEditPostApp')
                history.push('/login')
            }
            else {
                let decoded = JSON.parse(login).access
                decoded = jwt_decode(decoded);
                let accessToken = decoded.exp
                if (accessToken * 1000 < Date.now()) {
                    // localStorage.clear();
                    const refreshToken = JSON.parse(localStorage.getItem('user')) !== undefined && JSON.parse(localStorage.getItem('user')) !== null ? JSON.parse(localStorage.getItem('user')).refresh !== null && JSON.parse(localStorage.getItem('user')).refresh !== undefined ? JSON.parse(localStorage.getItem('user')).refresh : null : null;
                    const data = {
                        "refresh": refreshToken
                    }
                    Store.dispatch(ACTIONS.refresh_token(data, 'client'))
                    // history.push('/login')
                }
            }
        }

        componentWillUpdate(nextprops) {
            const login = localStorage.getItem('user')
            console.log(history, 'Auth Check C')

            if (login == null) {
                // localStorage.clear();
                localStorage.removeItem('user')
                localStorage.removeItem('user_type')
                localStorage.removeItem('lastStepPostAppEditAdmin')
                localStorage.removeItem('coApplicantEditPostAppAdmin')
                localStorage.removeItem('lastStepPostAppEditAdmin')
                localStorage.removeItem('coApplicantEditPostAppAdmin')
                localStorage.removeItem('lastStepPostAppEdit')
                localStorage.removeItem('coApplicantEditPostApp')
                localStorage.removeItem('lastStepDealerPostAppEdit')
                localStorage.removeItem('coApplicantDealerEditPostApp')
                Store.dispatch(ACTIONS.logout_session())
                history.push('/login')
            }
            else {
                let decoded = JSON.parse(login).access
                decoded = jwt_decode(decoded);
                let accessToken = decoded.exp
                if (accessToken * 1000 < Date.now()) {
                    const refreshToken = JSON.parse(localStorage.getItem('user')) !== undefined && JSON.parse(localStorage.getItem('user')) !== null ? JSON.parse(localStorage.getItem('user')).refresh !== null && JSON.parse(localStorage.getItem('user')).refresh !== undefined ? JSON.parse(localStorage.getItem('user')).refresh : null : null;
                    const data = {
                        "refresh": refreshToken
                    }
                    Store.dispatch(ACTIONS.refresh_token(data, 'client'))
                    // localStorage.clear();
                    // Store.dispatch(ACTIONS.logout_session())
                    // history.push('/login')
                }
            }
        }
        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return (Authenticate)
}
