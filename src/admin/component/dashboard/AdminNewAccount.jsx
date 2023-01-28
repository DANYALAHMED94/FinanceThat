import React from 'react'
import { Link, useRouteMatch } from "react-router-dom";
import moment from 'moment'
const AdminNewAccount = props => {
    let { url } = useRouteMatch();

    return (
        <React.Fragment>
            <div className="NewApp-Container">
                <div className="Admin-NewApp">
                    <div className="NewApp-Left"><h1>New Accounts</h1></div>
                    <div className="NewApp-Right"><h2>{props.loading_dashboard_accounts === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : (props.dashboard_accounts || []) !== undefined && (props.dashboard_accounts || []) !== null && (props.dashboard_accounts || []).length > 0 ? (props.dashboard_accounts || [])[0].start_date !== undefined && (props.dashboard_accounts || [])[0].start_date !== null ? moment((props.dashboard_accounts || [])[0].start_date).format('ll') : '' : ''}</h2></div>
                </div>
                {props.dashboard_accounts !== undefined && props.dashboard_accounts !== null ? (props.dashboard_accounts || []).map((item, index) => (
                    <div className="Admin-ContentBox" key={index}>
                        <div className="JhonDoe-Container">
                            <div className="JhonHead-Left">
                                <h3>{props.loading_dashboard_accounts === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.bd_user_id !== undefined && item.bd_user_id !== null && item.bd_user_id.length > 0 ? (item.bd_user_id[0].name) && (item.bd_user_id[0].name !== 'NAN' && item.bd_user_id[0].name !== 'NA') ? item.bd_user_id[0].name || '' : item.bd_user_id[0].first_name + " " + item.bd_user_id[0].last_name : item.dd_user_id !== undefined && item.dd_user_id !== null && item.dd_user_id.length > 0 ? item.dd_user_id[0].business_name !== undefined && item.dd_user_id[0].business_name !== null ? item.dd_user_id[0].business_name || '' : '' : ''}</h3>
                                <h4>ID: <span>{props.loading_dashboard_accounts === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.id || ''}</span></h4>
                            </div>
                            <div className="JhonHead-Right">
                                <h5>{props.loading_dashboard_accounts === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.start_date !== undefined && item.start_date !== null ? moment(item.start_date).format('ll') : ''} | {props.loading_dashboard_accounts === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.start_date !== undefined && item.start_date !== null ? moment(item.start_date).format('LT') : ''}</h5>
                            </div>
                        </div>
                        <div className="JhonDoe-Container mb-0">
                            <div className="JhonHead-Left">
                                {/* <h5>Energy Powersports</h5> */}
                            </div>
                            <div className="JhonHead-Right">
                                {item.is_active ? (<Link to={`/admin/active-account/${props.loading_dashboard_accounts === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.id !== undefined && item.id !== null ? item.id || '' : item.id !== undefined && item.id !== null ? item.id || '' : ''}/${props.loading_dashboard_accounts === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.bd_user_id !== undefined && item.bd_user_id !== null && item.bd_user_id.length > 0 ? 'Private' : item.dd_user_id !== undefined && item.dd_user_id !== null && item.dd_user_id.length > 0 ? 'Dealer' : ''}`}>Review</Link>) : (<Link to={`/admin/pending-account/${props.loading_dashboard_accounts === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.id !== undefined && item.id !== null ? item.id || '' : item.id !== undefined && item.id !== null ? item.id || '' : ''}/${props.loading_dashboard_accounts === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.bd_user_id !== undefined && item.bd_user_id !== null && item.bd_user_id.length > 0 ? 'Private' : item.dd_user_id !== undefined && item.dd_user_id !== null && item.dd_user_id.length > 0 ? 'Dealer' : ''}`}>Review</Link>)}

                            </div>
                        </div>
                    </div>
                )) : null}

                <div className="ViewAll-Btn">
                    <Link to={`/admin/pending-account`}>View all accounts</Link>
                </div>

            </div>
        </React.Fragment>
    );
}
export default AdminNewAccount
{/* <Link to={`${url}/pending-account/${props.loading_dashboard_accounts === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.bd_user_id !== undefined && item.bd_user_id !== null && item.bd_user_id.length > 0 ? item.bd_user_id[0].user_id !== undefined && item.bd_user_id[0].user_id !== null ? item.bd_user_id[0].user_id || '' : '' : item.dd_user_id !== undefined && item.dd_user_id !== null && item.dd_user_id.length > 0 ? item.dd_user_id[0].user_id !== undefined && item.dd_user_id[0].user_id !== null ? item.dd_user_id[0].user_id || '' : '' : ''}/${props.loading_dashboard_accounts === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.bd_user_id !== undefined && item.bd_user_id !== null && item.bd_user_id.length > 0 ? 'Private' : item.dd_user_id !== undefined && item.dd_user_id !== null && item.dd_user_id.length > 0 ? 'Dealer' : ''}`}>Review</Link> */ }