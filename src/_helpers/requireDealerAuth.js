import React, { Component } from 'react'
import jwt_decode from "jwt-decode";
import { history } from './history'
import Store from './store'
import * as ACTIONS from '../actions/authActions'
export default ComposedComponent => {
    class DealerAuthenticate extends Component {
        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return (DealerAuthenticate)
}
