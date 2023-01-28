import React, { Component } from 'react'
import { connect, ReactReduxContext } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import ReactToPrint from "react-to-print";

class PrintDealerPendingAccounts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        window.print()
    }
    render() {
        return (<React.Fragement>
            <table style={{ width: "100%" }}>
                <thead>
                    <th>ID</th>
                    <th>Busniess Name</th>
                    <th>City</th>
                    <th>Telephone</th>
                    <th>Email</th>
                    <th>Date Added</th>
                </thead>
                <tbody>
                    {(this.props.active_pending_accounts || []).map((item, index) => {
                        return (item.dd_user_id || []).map((dealer, idx) => (
                            <React.Fragment key={index}>
                                <tr key={idx}>
                                    <td><span><Link>{dealer.id}</Link></span></td>
                                    <td><span>{dealer.business_name}</span></td>
                                    <td>{dealer.city}</td>
                                    <td>{dealer.phone}</td>
                                    <td>{dealer.email}</td>
                                    <td>{moment(dealer.created_at).format('ll')}</td>
                                </tr>
                            </React.Fragment>
                        ))

                    }
                    )}
                </tbody>
            </table>
        </React.Fragement>)
    }
}
const mapStateToProps = (state) => {
    return {
        active_pending_accounts: state.adminReducer.adminAccounts.pendingAccountReducer.active_pending_accounts,
    }
}
export default connect(mapStateToProps, null)(PrintDealerPendingAccounts);