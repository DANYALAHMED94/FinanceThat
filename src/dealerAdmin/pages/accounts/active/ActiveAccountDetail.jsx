import React, { Component } from 'react'
import ActiveAccountReviews from '../../../component/accounts/activeAccount/ActiveAccountReviews'
import { update_account_row_data, remove_update_row, approved_pending_account, decline_pending_account, update_private_account, update_dealer_account, downloadFile, update_dealer_detail, remove_all_state_accounts } from '../../../../actions/admin/accountActions'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet';

class ActiveAccountDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accountType: this.props.match.params.type !== undefined ? this.props.match.params.type : ''
        }
        const id = this.props.match.params.id !== undefined ? this.props.match.params.id : ''
        const data = {
            user_type: this.props.match.params.type !== undefined ? this.props.match.params.type === 'Private' ? 'buyer' : 'dealer' : '',
            id: id
        }
        this.props.update_account_row_data(data)
    }
    componentWillUnmount() {
        this.props.remove_update_row()
        this.props.remove_all_state_accounts()
    }
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Dealer Detail</title>
                    <meta name="description" content="" />
                </Helmet>
                <ActiveAccountReviews {...this.props} accountType={this.state.accountType} />
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        update_account_row: state.adminReducer.adminAccounts.pendingAccountReducer.update_account_row,
        loading: state.adminReducer.adminAccounts.pendingAccountReducer.loading,
        loading_approved_decline: state.adminReducer.adminAccounts.pendingAccountReducer.loading_approved_decline,
        update_account: state.adminReducer.adminAccounts.pendingAccountReducer.update_account,
        loading_dealer_detail: state.adminReducer.adminAccounts.pendingAccountReducer.loading_dealer_detail,

    }
}
export default connect(mapStateToProps, { update_account_row_data, remove_update_row, approved_pending_account, decline_pending_account, update_private_account, update_dealer_account, downloadFile, update_dealer_detail, remove_all_state_accounts })(ActiveAccountDetail)