import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import ConfirmModelMulti from '../alertModel/ConfirmModelMulti'
import { delete_multi_row } from '../../../actions/admin/applicationActions'
import { useHistory } from 'react-router-dom'
const ApplicationTableTopHeader = ({deleted}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { total_count, application_data } = useSelector(({ adminReducer }) => {
        return {
            total_count: adminReducer.adminAccounts.applicationReducer.total_count,
            application_data:
                adminReducer.adminAccounts.applicationReducer.application_data,
        }
    })
    const delete_application_multi = () => {
        const ids = (application_data || [])
          .filter((item) => item.isChecked)
          .map((item) => {
            return item.id;
          });
        dispatch(delete_multi_row(ids, "Search Pending Applications"));
      };
    return (
        <>
            <div className="AlContainer upper" style={{ padding: "20px 0px 0px 0px", margin: "0px" }}>
                <p style={{ float: 'left' }} className="pl-4"><b>
                    Applications {total_count}
                </b></p>
                <div className="pr-3">
                {!deleted && (
                    <>
                    <button
                        type="button"
                        data-toggle="modal"
                        data-target="#confirmModelAdminMulti"
                        className="deleteSelected"
                        disabled={(application_data || [])?.filter(item => item?.isChecked).length === 0}
                    >
                        Delete Selected
                    </button>
                    <button
                        type="button"
                        className="newAppBtn"
                        onClick={() => history.push("/admin/application/addNew")}
                        >
                        <i class="fa fa-plus"></i> New application
                    </button></>)}
                </div>
            </div>
            <ConfirmModelMulti
                buttonAction={delete_application_multi}
                heading={"Delete Application"}
                section1={"Are you sure you want to delete these Applications?"}
                section2={""}
            />
        </>
    )
}
export default ApplicationTableTopHeader