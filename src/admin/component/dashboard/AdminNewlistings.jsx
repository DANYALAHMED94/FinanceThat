import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from "react-router-dom";
import moment from 'moment'
import $ from 'jquery'
import { capitalize } from "./../../../_helpers/capitalize";

const AdminNewlistings = props => {
    let { url } = useRouteMatch();
    const [dashboard_listings, set_dashboard_listings] = useState([])
    useEffect(() => {
        if (props.dashboard_listings !== undefined && props.dashboard_listings !== null && props.dashboard_listings.length > 0) {
            set_dashboard_listings(props.dashboard_listings)
        }
    }, [props.dashboard_listings])
    return (
        <React.Fragment>
            <div className="NewList-Container">
                <div className="NewList-ConHead">
                    <div className="ListHead-Left">
                        <h1>New Listings</h1>
                    </div>
                    <div className="ListHead-Right">
                        <h2>{props.loading_dashboard_listings === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : (dashboard_listings || []) !== undefined && (dashboard_listings || []) !== null && (dashboard_listings || []).length > 0 ? (dashboard_listings || [])[0].created_at !== undefined && (dashboard_listings || [])[0].created_at !== null ? moment((dashboard_listings || [])[0].created_at).format('ll') : '' : ''}</h2>
                    </div>
                </div>
                <div className="ListTable">
                    <table style={{ width: "100%" }} id="dashboardListingDatatable">
                        <thead>
                            <tr>
                                <th>
                                    <label className="ListCheckBox">
                                        <input type="checkbox" />
                                        <div className="ListMark"></div>
                                    </label>
                                </th>

                                <th><span>ID</span></th>
                                <th>Make</th>
                                <th>Model</th>
                                <th>City</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboard_listings !== undefined && dashboard_listings !== null ? (dashboard_listings || []).map((item, index) => (<tr key={index}>
                                <td>
                                    <label className="ListCheckBox">
                                        <input type="checkbox" />
                                        <div className="ListMark"></div>
                                    </label>
                                </td>
                                <td><span>{props.loading_dashboard_listings === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.id}</span></td>
                                <td><span>{props.loading_dashboard_listings === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.make !== undefined && item.make !== null ? item.make.make_name !== undefined && item.make.make_name !== null ? item.make.make_name || '' : '' : ''}</span></td>
                                <td>{props.loading_dashboard_listings === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.model !== undefined && item.model !== null ? item.model.model_make !== undefined && item.model.model_make !== null ? item.model.model_make || '' : '' : ''}</td>
                                <td>{props.loading_dashboard_listings === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : capitalize(item.city) !== undefined && capitalize(item.city) !== null ? capitalize(item.city) || '' : ''}</td>
                                <td>{props.loading_dashboard_listings === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.price !== null && item.price !== '' ? new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }
                                ).format(Number(item.price))// '$100.00'
                                    : new Intl.NumberFormat('en-US',
                                        { style: 'currency', currency: 'USD' }
                                    ).format(0)}</td>
                                {/* <td><Link to={`/admin/pending-listing/${props.loading_dashboard_listings === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.id !== undefined && item.id !== null ? item.id || '' : ''}`} >Review</Link></td> */}
                                <td><Link to={`/admin/pending-listing/${props.loading_dashboard_listings === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.stock_id  ? item.stock_id : ''}`} >Review</Link></td>
                            </tr>)) : null}
                        </tbody>
                    </table>
                    <div className="ListView-Btn"><Link to='/admin/pending-listing' >View all listings</Link></div>
                </div>

            </div>

        </React.Fragment>
    );
}
export default AdminNewlistings;
// /${props.loading_dashboard_listings === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : item.user_id !== undefined && item.user_id !== null && item.user_id.length > 0 ? item.user_id[0].dd_user_id !== undefined && item.user_id[0].dd_user_id !== null && item.user_id[0].dd_user_id.length > 0 ? 'Dealer' : item.user_id !== undefined && item.user_id !== null && item.user_id.length > 0 ? item.user_id[0].bd_user_id !== undefined && item.user_id[0].bd_user_id !== null && item.user_id[0].bd_user_id.length > 0 ? 'Private' : '' : '' : ''}
// item.user_id !== undefined && item.user_id !== null && item.user_id.length > 0 ? item.user_id[0].id !== undefined && item.user_id[0].id !== null ? item.user_id[0].id || '' : '' : ''