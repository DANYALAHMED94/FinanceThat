import React, { Component } from 'react'
import jwt_decode from "jwt-decode";
import { history } from '../_helpers/history'
import Store from './store'
import * as ACTIONS from '../actions/authActions'
export default ComposedComponent => {
    class AdminAuthenticate extends Component {
        UNSAFE_componentWillMount() {
            const login = localStorage.getItem('admin')
            if (login == null) {
                // localStorage.clear();
                localStorage.removeItem('admin_user_type')
                localStorage.removeItem('admin')
                localStorage.removeItem('adminSccrens')
                localStorage.removeItem('lastAdminStepPostAppEdit')
                localStorage.removeItem('coAdminApplicantEditPostApp')
                history.push('/secure/admin-login')
            }
            else {
                let decoded = JSON.parse(login).access
                decoded = jwt_decode(decoded);
                let accessToken = decoded.exp
                if (accessToken * 1000 < Date.now()) {
                    // localStorage.clear();
                    localStorage.removeItem('admin_user_type')
                    localStorage.removeItem('admin')
                    localStorage.removeItem('adminSccrens')
                    localStorage.removeItem('lastAdminStepPostAppEdit')
                    localStorage.removeItem('coAdminApplicantEditPostApp')
                    const refreshToken = JSON.parse(localStorage.getItem('admin')) !== undefined && JSON.parse(localStorage.getItem('admin')) !== null ? JSON.parse(localStorage.getItem('admin')).refresh !== null && JSON.parse(localStorage.getItem('admin')).refresh !== undefined ? JSON.parse(localStorage.getItem('admin')).refresh : null : null;
                    const data = {
                        "refresh": refreshToken
                    }
                    Store.dispatch(ACTIONS.refresh_token(data, 'admin'))
                    // history.push('/secure/admin-login')
                }
            }
        }

        componentWillUpdate(nextprops) {
            const login = localStorage.getItem('admin')
            if (login == null) {
                // localStorage.clear();
                Store.dispatch(ACTIONS.logout_session_admin())
                history.push('/secure/admin-login')
            }
            else {
                let decoded = JSON.parse(login).access
                decoded = jwt_decode(decoded);
                let accessToken = decoded.exp
                if (accessToken * 1000 < Date.now()) {
                    const refreshToken = JSON.parse(localStorage.getItem('admin')) !== undefined && JSON.parse(localStorage.getItem('admin')) !== null ? JSON.parse(localStorage.getItem('admin')).refresh !== null && JSON.parse(localStorage.getItem('admin')).refresh !== undefined ? JSON.parse(localStorage.getItem('admin')).refresh : null : null;
                    const data = {
                        "refresh": refreshToken
                    }
                    Store.dispatch(ACTIONS.refresh_token(data, 'admin'))
                    // localStorage.clear();
                    // Store.dispatch(ACTIONS.logout_session_admin())
                    // history.push('/secure/admin-login')
                }
            }
        }
        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return (AdminAuthenticate)
}
