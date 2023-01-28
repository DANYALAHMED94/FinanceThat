import React, { useState } from 'react';
import { single_check_application, delete_single_row } from '../../../../../../actions/admin/applicationActions';
import ColumnStatus from '../../../../TableComponents/ColumnStatus';
import ConfirmModel from '../../../../alertModel/ConfirmModel';
import { Link, useRouteMatch } from 'react-router-dom'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
const TableRow = ({ item }) => {
    const dispatch = useDispatch()
    const { delete_application_loading, delete_application_id } = useSelector(({ adminReducer }) => {
        return {
            delete_application_loading:
                adminReducer.adminAccounts.applicationReducer
                    .delete_application_loading,
            delete_application_id:
                adminReducer.adminAccounts.applicationReducer.delete_application_id,
        }
    })
    let { url } = useRouteMatch();
    const [itemId, setItemId] = useState('')
    const removeLocalStorage = () => {
        localStorage.removeItem("lastStepPostAppEditAdmin");
        localStorage.removeItem("coApplicantEditPostAppAdmin");
    };
    const delete_application = (id) => {
        dispatch(delete_single_row(id, "Search Active Applications"));
    };
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
                            state: { applicationType: 'Unmanaged',
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
                    {item?.dealer && Object.keys(item.dealer).length > 0
                        ? item?.dealer?.full_name || ''
                        : ""
                    }
                </td>

                <td>
                {item?.user?.user_type === 2 ? "Dealer" : item?.user?.user_type === 5 ? "Agent" :item?.user?.user_type === 1 ? "Applicant" : "-"}

                </td>
                <td>
                {item?.stock ? item?.stock?.user_id.full_name : "-"}

                </td>
                <td>
                    {item.created_at
                        ? moment(item.created_at).format("ll")
                        : ""}
                </td>
                <td onClick={removeLocalStorage}>
                    <Link to={{
                        pathname: `${url}/${item.id}`,
                        state: { applicationType: 'Unmanaged',
                        application_type: item?.application_type }
                    }} className="detaillinkbtn">Details</Link>

                </td>
                <td>

                    <div className="icon-delete ">
                        <button
                            type="button"
                            data-toggle="modal"
                            data-target="#confirmModelAdmin"
                            onClick={() => setItemId(item.id)}
                        >
                            {delete_application_loading &&
                                Number(item.id) ===
                                Number(delete_application_id) ? (
                                <i
                                    class="fa fa-circle-o-notch fa-spin"
                                    aria-hidden="true"
                                ></i>
                            ) : (
                                <img
                                    src="/assets/image/sprite-icon/icon-delete.svg"
                                    alt=""
                                />
                            )}
                        </button>
                    </div>

                </td>
            </tr>
            {itemId ? (
                <ConfirmModel
                    buttonAction={delete_application}
                    id={itemId}
                    heading={"Delete Application"}
                    section1={"Are you sure you want to delete this Application?"}
                    section2={""}
                />
            ) : null}
        </>

    )
}
export default TableRow