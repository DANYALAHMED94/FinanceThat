import React from 'react';
import { single_check_application } from '../../../../../../actions/admin/applicationActions';
import ColumnStatus from '../../../../TableComponents/ColumnStatus';
import { Link, useRouteMatch } from 'react-router-dom'
import moment from 'moment';
import { useDispatch } from 'react-redux'
const TableRow = ({ item }) => {
    const dispatch = useDispatch()

    let { url } = useRouteMatch();

    return (
        <>
            <tr key={item.id}>
                <td>
                    <label className="ListCheckBox">
                        <input
                            type="checkbox"
                            checked={
                                item.isChecked !== undefined &&
                                    item.isChecked !== null
                                    ? item.isChecked
                                    : false
                            }
                            value={item.id}
                            onChange={() => dispatch(single_check_application(item.id))}
                        />
                        <div className="ListMark"></div>
                    </label>
                </td>
                <td>
                    {item.id ? item.id || "" : ""}
                </td>
                <td>
                    <span className="gridtxtancor">
                         {item?.application_type == 1 ? "General" : item?.application_type == 2 ?  "On Inventory" : item?.application_type == 3 ? "Created manually" : item?.application_type == 4 ? "Lead" : ''}
                    </span>
                </td>
                <td>
                    <span className="gridtxtancor">
                        <Link to={{
                            pathname: `${url}/${item.id}`,
                            state: { applicationType: 'Private',
                            application_type: item?.application_type }
                        }}>
                            {`${item.first_name ? item.first_name || "" : ""} ${item.last_name ? item.last_name || "" : ""
                                }`}
                        </Link>
                    </span>
                </td>
                <td>
                    {item?.vehicle_type}
                </td>
                <td>
                    <ColumnStatus item={item} />
                </td>
                <td>
                {item.applicant_email_by_dealer ? item.applicant_email_by_dealer : item?.user && Object.keys(item.user).length > 0
                        ? item?.user?.email || ''
                        : ""
                    }
                </td>

                <td>
                { item?.user?.user_type === 5 ? "Agent" : item?.user?.user_type === 1 ? "Applicant" : "-"}
                </td>
                <td>
                {item?.vehicle[0]?.stock_id}

                </td>
                <td>
                    {item.created_at
                        ? moment(item.created_at).format("ll")
                        : ""}
                </td>
                <td>
                      {item.agent
                        ? item.agent.full_name
                          ? item.agent.full_name ||""
                          : ""
                        : ""}
                    </td>
            </tr>
        </>

    )
}
export default TableRow