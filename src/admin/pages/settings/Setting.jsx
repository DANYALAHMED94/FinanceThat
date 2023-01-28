import React, { Component } from 'react'
import Settings from '../../component/setting/Settings'
import {
    update_admin_password
} from '../../../actions/admin/settingActions'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet';

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <React.Fragment>
                 <Helmet>
                    <title>Settings</title>
                    <meta name="description" content="" />
                </Helmet>
                <Settings {...this.props} />
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.adminReducer.adminAccounts.settingReducer.loading,
        update_passowrd: state.adminReducer.adminAccounts.settingReducer.update_passowrd,
        admin_id: state.authReducer.authentication.admin.user_id,
    }
}
export default connect(mapStateToProps, {
    update_admin_password
})(Setting)