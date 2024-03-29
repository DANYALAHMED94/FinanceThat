import React from 'react'
import { toggle_all_check } from '../../../../../../actions/admin/applicationActions';
import { useSelector, useDispatch } from 'react-redux';
import { capitalize } from '../../../../../../_helpers/capitalize';
const TableHead = () => {
    const dispatch = useDispatch()
    const { checkedAllApplication } = useSelector(({ adminReducer }) => {
        return {
            checkedAllApplication: adminReducer.adminAccounts.applicationReducer.checkedAllApplication
        }
    })
    return (
        <thead>
            <tr className="tableDealerHeight">
                <th className="text-align: center;">
                    <label className="ListCheckBox">
                        <input
                            type="checkbox"
                            checked={
                                checkedAllApplication !== undefined &&
                                    checkedAllApplication !== null
                                    ? checkedAllApplication
                                    : false
                            }
                            onChange={() => dispatch(toggle_all_check(!checkedAllApplication))}
                        />
                        <div className="ListMark"></div>
                    </label>
                </th>
                <th>{capitalize("id")}</th>
                <th>{capitalize("APP TYPE")}</th>
                <th>{capitalize("applicant name")}</th>
                <th>{capitalize("Vehicle Type")}</th>
                <th >{capitalize("status")}</th>
                <th >{capitalize("Assigned Dealer")}</th>
                <th>{capitalize("Created By")}</th>
                <th>{capitalize("Unit From")}</th>
                <th>{capitalize("Created")}</th>
                <th>{""}</th>
                <th>{""}</th>
            </tr>
        </thead>
    )
}
export default TableHead