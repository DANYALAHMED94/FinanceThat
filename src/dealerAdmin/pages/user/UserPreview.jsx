import React, { Component } from 'react'
import UsersPreviews from '../../component/user/UsersPreviews'
import {
    get_user_detail,
    get_user_roles,
    remove_all_state_user,
    delete_user,
    update_user_permissions,
    update_user_detail
} from '../../../actions/dealer/dealerUserActions'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet';

class UserPreview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.match.params.id !== undefined ? this.props.match.params.id : ''
        }
        this.props.get_user_roles()
        this.props.get_user_detail(this.props.match.params.id !== undefined ? this.props.match.params.id : '')

    }
    componentWillUnmount() {
        this.props.remove_all_state_user()
    }
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>User Detail</title>
                    <meta name="description" content="" />
                </Helmet>
                <UsersPreviews {...this.props} />
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.dealerAdminReducer.dealerUserReducer.loading,
        user_detail: state.dealerAdminReducer.dealerUserReducer.user_detail,
        user_roles: state.dealerAdminReducer.dealerUserReducer.user_roles,
        loading_deleteing: state.dealerAdminReducer.dealerUserReducer.loading_deleteing,
        loading_update_permissions: state.dealerAdminReducer.dealerUserReducer.loading_update_permissions,
        loading_update_detail: state.dealerAdminReducer.dealerUserReducer.loading_update_detail,
    }
}
export default connect(mapStateToProps, {
    get_user_detail,
    get_user_roles,
    remove_all_state_user,
    delete_user,
    update_user_permissions,
    update_user_detail
})(UserPreview)