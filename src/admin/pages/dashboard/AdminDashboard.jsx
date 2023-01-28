import React, { Component } from 'react'
import AdminNewlistings from '../../component/dashboard/AdminNewlistings'
import AdminNewAccount from '../../component/dashboard/AdminNewAccount'
import AdminNewApplication from '../../component/dashboard/AdminNewApplication'
import { get_dashboard_listings, get_dashboard_accounts, get_dashboard_applications } from '../../../actions/admin/dashboardActions'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet';

class AdminDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: new Date(),
            allowScreens: {
                "applications": (this.props.adminScreens || []).length > 0 ? (this.props.adminScreens || [])[0] !== undefined && (this.props.adminScreens || [])[0] !== null ? (this.props.adminScreens || [])[0].applications : false : true,
                "accounts": (this.props.adminScreens || []).length > 0 ? (this.props.adminScreens || [])[0] !== undefined && (this.props.adminScreens || [])[0] !== null ? (this.props.adminScreens || [])[0].accounts : false : true,
                "listings": (this.props.adminScreens || []).length > 0 ? (this.props.adminScreens || [])[0] !== undefined && (this.props.adminScreens || [])[0] !== null ? (this.props.adminScreens || [])[0].listings : false : true,
                "employees": (this.props.adminScreens || []).length > 0 ? (this.props.adminScreens || [])[0] !== undefined && (this.props.adminScreens || [])[0] !== null ? (this.props.adminScreens || [])[0].employees : false : true,
                "settings": (this.props.adminScreens || []).length > 0 ? (this.props.adminScreens || [])[0] !== undefined && (this.props.adminScreens || [])[0] !== null ? (this.props.adminScreens || [])[0].settings : false : true,
                "users": (this.props.adminScreens || []).length > 0 ? (this.props.adminScreens || [])[0] !== undefined && (this.props.adminScreens || [])[0] !== null ? (this.props.adminScreens || [])[0].users : false : true,
            }
        }
        const data = {
            a_new: 'a_new'
        }
        this.props.get_dashboard_accounts(data)
        this.props.get_dashboard_applications(data)
        this.props.get_dashboard_listings(data)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.adminScreens !== this.props.adminScreens && this.props.adminScreens !== undefined) {
            const allowScreens = {
                "applications": (this.props.adminScreens || []).length > 0 ? (this.props.adminScreens || [])[0] !== undefined && (this.props.adminScreens || [])[0] !== null ? (this.props.adminScreens || [])[0].applications : false : false,
                "accounts": (this.props.adminScreens || []).length > 0 ? (this.props.adminScreens || [])[0] !== undefined && (this.props.adminScreens || [])[0] !== null ? (this.props.adminScreens || [])[0].accounts : false : false,
                "listings": (this.props.adminScreens || []).length > 0 ? (this.props.adminScreens || [])[0] !== undefined && (this.props.adminScreens || [])[0] !== null ? (this.props.adminScreens || [])[0].listings : false : false,
                "employees": (this.props.adminScreens || []).length > 0 ? (this.props.adminScreens || [])[0] !== undefined && (this.props.adminScreens || [])[0] !== null ? (this.props.adminScreens || [])[0].employees : false : false,
                "settings": (this.props.adminScreens || []).length > 0 ? (this.props.adminScreens || [])[0] !== undefined && (this.props.adminScreens || [])[0] !== null ? (this.props.adminScreens || [])[0].settings : false : false,
                "users": (this.props.adminScreens || []).length > 0 ? (this.props.adminScreens || [])[0] !== undefined && (this.props.adminScreens || [])[0] !== null ? (this.props.adminScreens || [])[0].users : false : false,
            }
            this.setState({
                ...this.state,
                allowScreens: allowScreens
            })
        }
    }
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Dashboard</title>
                    <meta name="description" content="" />
                </Helmet>
                {this.state.allowScreens ? this.state.allowScreens.applications ? (<AdminNewApplication {...this.props} />) : null : null}
                {this.state.allowScreens ? this.state.allowScreens.accounts ? (<AdminNewAccount {...this.props} />) : null : null}
                {this.state.allowScreens ? this.state.allowScreens.listings ? (<AdminNewlistings {...this.props} />) : null : null}
            </React.Fragment>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading_dashboard_application: state.adminReducer.adminAccounts.dashboardReducer.loading_dashboard_application,
        loading_dashboard_accounts: state.adminReducer.adminAccounts.dashboardReducer.loading_dashboard_accounts,
        loading_dashboard_listings: state.adminReducer.adminAccounts.dashboardReducer.loading_dashboard_listings,
        dashboard_accounts: state.adminReducer.adminAccounts.dashboardReducer.dashboard_accounts,
        dashboard_listings: state.adminReducer.adminAccounts.dashboardReducer.dashboard_listings,
        dashboard_applications: state.adminReducer.adminAccounts.dashboardReducer.dashboard_applications,
        adminScreens: state.authReducer.authentication.adminScreens,
    }
}
export default connect(mapStateToProps, { get_dashboard_listings, get_dashboard_accounts, get_dashboard_applications })(AdminDashboard)