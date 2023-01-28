import React, { useEffect, useState } from 'react'
import DMSHeader from "../../dms/component/header/DMSHeader";
import DMSSideBar from "../../dms/component/sideBar/DMSSideBar";
import BasicTable from "../../dms/component/table/BasicTable";
import { get_dms_post_applications, delete_single_row, delete_multi_row } from '../../actions/postApplication'
import { history } from "../../_helpers/history";
import { useDispatch, useSelector } from "react-redux";
const MyApplications = (props) => {
    const dispatch = useDispatch();
    const post_dms_applications = useSelector((state) => state.postApplication.postApplicationReducer.post_dms_applications)
    const loading = useSelector((state) => state.postApplication.postApplicationReducer.loading)
    var pathname = history.location.pathname
    const [tableData, setTableData] = useState(post_dms_applications.General)
    const changePath = () => {
        const { id } = props.match.params
        if (id == "general") {
            setTableData(post_dms_applications.General)
        } else if (id == "inventory") {
            setTableData(post_dms_applications.Inventory)
        } else if (id == "manual") {
            setTableData(post_dms_applications.Manual)
        } else if (id == "approved") {
            setTableData(post_dms_applications.Approved)
        } else if (id == "declined") {
            setTableData(post_dms_applications.Declined)
        } else if (id == "withdrawn") {
            setTableData(post_dms_applications.Withdrawn)
        } else if (id == "deleted") {
            setTableData(post_dms_applications.Deleted)
        }
    }
    useEffect(() => {
        changePath()
    }, [pathname]);
    const delete_application = (id) => {
        dispatch(delete_single_row(id));
    };
    const delete_application_multi = (application_data) => {
        const ids = (application_data || [])
            .filter((item) => item.isChecked)
            .map((item) => {
                return item.id;
            });
        dispatch(delete_multi_row(ids))
    };
    useEffect(() => {
        // setLoading(true)
        if (localStorage.getItem('user_type')) {
            dispatch(get_dms_post_applications())
        }
    }, []);
    useEffect(() => {
        changePath()
    }, [post_dms_applications.General]);

    return (
        <React.Fragment>
            {/* <DMSHeader /> */}
            <div className="container-fluid">
                <BasicTable tableData={tableData} loading={loading} delete_application={delete_application} delete_application_multi={delete_application_multi} />

            </div>
        </React.Fragment>

    )
}
export default MyApplications