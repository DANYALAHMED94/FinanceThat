/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import moment from "moment";
import ConfirmModel from "../../alertModel/ConfirmModel";
import ConfirmModelMulti from "../../alertModel/ConfirmModel";
import "./table.css";
import { Modal } from "react-bootstrap";
import DateRangePicker from "../../DateRangePicker";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
const GeneralApplicationDatatable = (props) => {
    var date = new Date();
    date.setDate(date.getDate() - 7);
    const today = moment();
    const [rangeDate, setRangeDate] = useState(moment.range(today.clone().subtract(7, "days"), today.clone()))

    const [show, setShow] = useState(false);
    const [totalDays, setTotalDays] = useState(7);
    const [isDateFilter, setDateFilter] = useState(false)
    const [startDate, setStartDate] = useState(date)
    const [endDate, setEndDate] = useState(new Date())
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let { url } = useRouteMatch();
    const [search, setSearch] = useState("");
  const [tSearch, setTSearch] = useState("");

    const [sortBy, setSortBy] = useState("newest_first");
    const [page, setpage] = useState(1);
    const [itemId, setItemId] = useState("");
    const [pageLength, setPageLenght] = useState(20);
    // const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [pageNumberLimit] = useState(5);
    // ((props.pages_urls || []).length)/5
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    const [selectApplicationType, setApplicationType] = useState([]);
    const [selectApplicationStatus] = useState([{ value: "deleted", label: "Deleted" }])
    const [selectTypeOfVehicle, setTypeOfVehicle] = useState([])

    const componentRef = React.useRef(null);
    const preSearch = usePrevious(search);

    const checkDealer = (id) => {
        props.single_check_application(id);
    };
    const toggleAllDealer = () => {
        props.toggle_all_check(!props.checkedAllApplication);
    };
    const headers = [
        { label: "APPLICATION ID", key: "Application_Id" },
        { label: "APPLICANT NAME", key: "Applicant_Name" },
        { label: "APPLICATION STATUS", key: "Applicaion_Status" },
        { label: "EMAIL", key: "email" },
        { label: "DATE ADDED", key: "date" },
    ];
    const exportData = [];
    (props.application_data || []).map((item, index) =>
        exportData.push({
            Applicant_Name: `${item.first_name != undefined &&
                item.first_name != null &&
                item.first_name !== ""
                ? item.first_name || ""
                : ""
                } ${item.last_name != undefined &&
                    item.last_name != null &&
                    item.last_name !== ""
                    ? item.last_name || ""
                    : ""
                }`,
            Application_Id:
                item.id != undefined && item.id != null && item.id !== ""
                    ? item.id || ""
                    : "",
            Applicaion_Status:
                item.application_status != undefined &&
                    item.application_status != null &&
                    item.application_status !== ""
                    ? Number(item.application_status) === 6
                            ? "Booked"
                            : Number(item.application_status) === 1
                              ? "Credit Unknown"
                              : Number(item.application_status) === 2
                                ? "Conditionally approved"
                                : Number(item.application_status) === 3
                                  ? "Pre-approved"
                                  : Number(item.application_status) === 4
                                    ? "Decline"
                                    : Number(item.application_status) === 5
                                      ? "Approved"
                                      : Number(item.application_status) === 7
                                        ? "Withdraw"
                                        : item.application_status === "pending"
                                          ? "Credit Unknown"
                                          :  Number(item.application_status) === 8
                                          ? "Conditionally Approved For Special Program" : item.application_status
                          : item.application_status === "pending"
                            ? "Credit Unknown"
                            : item.application_status,
            // email: item.user != undefined && item.user != null && Object.keys(item.user).length > 0 ? item.user.email !== undefined && item.user.email !== null && item.user.email !== '' ? item.user.email || '' : '' : '',
            email:
                item.user && Object.keys(item.user).length > 0
                    ? item.user.id
                        ? Number(item.user.id) === -99
                            ? item.email_address
                            : item.user.email !== undefined &&
                                item.user.email !== null &&
                                item.user.email !== ""
                                ? item.user.email || ""
                                : ""
                        : ""
                    : "",
            date:
                item.created_at != undefined && item.created_at != null
                    ? moment(item.created_at).format("ll")
                    : "",
        })
    );
    const handleOnChange = (e) => {
        const { value } = e.target;
        setTSearch(value);
    };

    const removeLocalStorage = () => {
        localStorage.removeItem("lastStepPostAppEditAdmin");
        localStorage.removeItem("coApplicantEditPostAppAdmin");
    };

    const delete_application = (id) => {
        props.delete_single_row(id, "Search Applications");
    };
    const delete_application_multi = () => {
        const ids = (props.application_data || [])
            .filter((item) => item.isChecked)
            .map((item) => {
                return item.id;
            });
        props.delete_multi_row(ids, "Search Applications");
    };

    const call_pages_data = (pageUrl, pageNo) => {
        setpage(pageNo);
        const data = {
            search: search,
            sort_by: props.sort_by,
            p_size: pageLength,
            ...({ start_date: moment(startDate).format("YYYY-MM-DD") }),
            ...({ end_date: moment(endDate).format("YYYY-MM-DD") }),
        };
        if (selectApplicationStatus?.map(item => { return item.value })?.length > 0) {
            data.application_status = JSON.stringify(selectApplicationStatus?.map(item => { return item.value }) || []);
        }
        if (selectApplicationType?.map(item => { return item.value })?.length > 0) {
            data.application_type = JSON.stringify(selectApplicationType?.map(item => { return item.value }) || []);
        }
        if (selectTypeOfVehicle?.map(item => { return item.label })?.length > 0) {
            data.vehicle_type = JSON.stringify(selectTypeOfVehicle?.map(item => { return item.label }) || []);
        }
        if(localStorage.getItem("staff_dealer")){
            data.dealer_id = localStorage.getItem("staff_dealer")
          }
        props.get_pending_active_application_paging(pageUrl, data);
        if (page + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + 1);
            setminPageNumberLimit(minPageNumberLimit + 1);
        }
        if ((page - 1) % pageNumberLimit === 0) {
            const min = minPageNumberLimit - 1 === -1 ? 0 : minPageNumberLimit - 1;
            const max = maxPageNumberLimit - 1 === 4 ? 5 : maxPageNumberLimit - 1;
            setmaxPageNumberLimit(max);
            setminPageNumberLimit(min);
        }
    };
    const handleNextbtn = () => {
        if (page !== (props.pages_urls || []).length) {
            setpage(page + 1);
            const data = {
                search: search,
                p_size: pageLength,
                ...({ start_date: moment(startDate).format("YYYY-MM-DD") }),
                ...({ end_date: moment(endDate).format("YYYY-MM-DD") }),
                sort_by: sortBy,
                page: page + 1,
            };
            if (selectApplicationStatus?.map(item => { return item.value })?.length > 0) {
                data.application_status = JSON.stringify(selectApplicationStatus?.map(item => { return item.value }) || []);
            }
            if (selectApplicationType?.map(item => { return item.value })?.length > 0) {
                data.application_type = JSON.stringify(selectApplicationType?.map(item => { return item.value }) || []);
            }
            if (selectTypeOfVehicle?.map(item => { return item.label })?.length > 0) {
                data.vehicle_type = JSON.stringify(selectTypeOfVehicle?.map(item => { return item.label }) || []);
            }
            if(localStorage.getItem("staff_dealer")){
                data.dealer_id = localStorage.getItem("staff_dealer")
              }
            props.get_pending_active_application(data);
        }
        if (page + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };
    const handleLastbtn = () => {
        setpage((props.pages_urls || []).length);
        const data = {
            search: search,
            p_size: pageLength,
            ...({ start_date: moment(startDate).format("YYYY-MM-DD") }),
            ...({ end_date: moment(endDate).format("YYYY-MM-DD") }),
            sort_by: sortBy,
            page: (props.pages_urls || []).length,
        };
        if (selectApplicationStatus?.map(item => { return item.value })?.length > 0) {
            data.application_status = JSON.stringify(selectApplicationStatus?.map(item => { return item.value }) || []);
        }
        if (selectApplicationType?.map(item => { return item.value })?.length > 0) {
            data.application_type = JSON.stringify(selectApplicationType?.map(item => { return item.value }) || []);
        }
        if (selectTypeOfVehicle?.map(item => { return item.label })?.length > 0) {
            data.vehicle_type = JSON.stringify(selectTypeOfVehicle?.map(item => { return item.label }) || []);
        }
        if(localStorage.getItem("staff_dealer")){
            data.dealer_id = localStorage.getItem("staff_dealer")
          }
        props.get_pending_active_application(data);
        let count = (props.pages_urls || []).length;
        while (count % 5 !== 0) {
            count++;
        }
        setmaxPageNumberLimit(count);
        setminPageNumberLimit(count - 5);
        // setmaxPageNumberLimit(Math.ceil((props.pages_urls || []).length));
        // setminPageNumberLimit(Math.ceil(((props.pages_urls || []).length) - 5));
        //   setmaxPageNumberLimit(maxPageNumberLimit + Math.ceil(((props.pages_urls || []).length) - 5));
        //   setminPageNumberLimit(minPageNumberLimit + Math.ceil(((props.pages_urls || []).length) - 5));
    };
    const handlePrevbtn = () => {
        if (page !== 1) {
            setpage(page - 1);
            const data = {
                search: search,
                p_size: pageLength,
                ...({ start_date: moment(startDate).format("YYYY-MM-DD") }),
                ...({ end_date: moment(endDate).format("YYYY-MM-DD") }),
                sort_by: sortBy,
                page: page - 1,
            };
            if (selectApplicationStatus?.map(item => { return item.value })?.length > 0) {
                data.application_status = JSON.stringify(selectApplicationStatus?.map(item => { return item.value }) || []);
            }
            if (selectApplicationType?.map(item => { return item.value })?.length > 0) {
                data.application_type = JSON.stringify(selectApplicationType?.map(item => { return item.value }) || []);
            }
            if (selectTypeOfVehicle?.map(item => { return item.label })?.length > 0) {
                data.vehicle_type = JSON.stringify(selectTypeOfVehicle?.map(item => { return item.label }) || []);
            }
            if(localStorage.getItem("staff_dealer")){
                data.dealer_id = localStorage.getItem("staff_dealer")
              }
            props.get_pending_active_application(data);
        }
        if ((page - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };
    const handleFirstbtn = () => {
        setpage(1);
        const data = {
            search: search,
            p_size: pageLength,
            ...({ start_date: moment(startDate).format("YYYY-MM-DD") }),
            ...({ end_date: moment(endDate).format("YYYY-MM-DD") }),
            sort_by: sortBy,
            page: 1,
        };
        if (selectApplicationStatus?.map(item => { return item.value })?.length > 0) {
            data.application_status = JSON.stringify(selectApplicationStatus?.map(item => { return item.value }) || []);
        }
        if (selectApplicationType?.map(item => { return item.value })?.length > 0) {
            data.application_type = JSON.stringify(selectApplicationType?.map(item => { return item.value }) || []);
        }
        if (selectTypeOfVehicle?.map(item => { return item.label })?.length > 0) {
            data.vehicle_type = JSON.stringify(selectTypeOfVehicle?.map(item => { return item.label }) || []);
        }
        if(localStorage.getItem("staff_dealer")){
            data.dealer_id = localStorage.getItem("staff_dealer")
          }
        props.get_pending_active_application(data);
        setmaxPageNumberLimit(5);
        setminPageNumberLimit(0);
    };
    let pageIncrementBtn = null;
    if ((props.pages_urls || []).length > maxPageNumberLimit) {
        pageIncrementBtn = <bitton onClick={handleNextbtn}>  </bitton>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <bitton onClick={handlePrevbtn}> &hellip; </bitton>;
    }
    const changePageLength = (e) => {
        setPageLenght(e.target.value);
        setpage(1);
        const data = {
            search: search,
            ...({ start_date: moment(startDate).format("YYYY-MM-DD") }),
            ...({ end_date: moment(endDate).format("YYYY-MM-DD") }),
            sort_by: sortBy,
            // page: 1,
            p_size: e.target.value,

        };
        if (selectApplicationStatus?.map(item => { return item.value })?.length > 0) {
            data.application_status = JSON.stringify(selectApplicationStatus?.map(item => { return item.value }) || []);
        }
        if (selectApplicationType?.map(item => { return item.value })?.length > 0) {
            data.application_type = JSON.stringify(selectApplicationType?.map(item => { return item.value }) || []);
        }
        if (selectTypeOfVehicle?.map(item => { return item.label })?.length > 0) {
            data.vehicle_type = JSON.stringify(selectTypeOfVehicle?.map(item => { return item.label }) || []);
        }
        if(localStorage.getItem("staff_dealer")){
            data.dealer_id = localStorage.getItem("staff_dealer")
          }
        props.get_pending_active_application(data);
    };
    const sortTable = (val) => {
        setpage(1);
        setSortBy(val);
        const data = {
            search: search,
            p_size: pageLength,
            ...({ start_date: moment(startDate).format("YYYY-MM-DD") }),
            ...({ end_date: moment(endDate).format("YYYY-MM-DD") }),
            sort_by: val,
            // page: 1,
        };
        if (selectApplicationStatus?.map(item => { return item.value })?.length > 0) {
            data.application_status = JSON.stringify(selectApplicationStatus?.map(item => { return item.value }) || []);
        }
        if (selectApplicationType?.map(item => { return item.value })?.length > 0) {
            data.application_type = JSON.stringify(selectApplicationType?.map(item => { return item.value }) || []);
        }
        if (selectTypeOfVehicle?.map(item => { return item.label })?.length > 0) {
            data.vehicle_type = JSON.stringify(selectTypeOfVehicle?.map(item => { return item.label }) || []);
        }
        if(localStorage.getItem("staff_dealer")){
            data.dealer_id = localStorage.getItem("staff_dealer")
          }
        props.get_pending_active_application(data);
    };
    useEffect(() => {
        if (preSearch !== search && preSearch !== undefined) {
            const timeoutId = setTimeout(() => {
                setpage(1);
                const data = {
                    search: search,
                    p_size: pageLength,
                    ...({ start_date: moment(startDate).format("YYYY-MM-DD") }),
                    ...({ end_date: moment(endDate).format("YYYY-MM-DD") }),
                    sort_by: sortBy,
                    // page: 1,
                };

                if (selectApplicationStatus?.map(item => { return item.value })?.length > 0) {
                    data.application_status = JSON.stringify(selectApplicationStatus?.map(item => { return item.value }) || []);
                }
                if (selectApplicationType?.map(item => { return item.value })?.length > 0) {
                    data.application_type = JSON.stringify(selectApplicationType?.map(item => { return item.value }) || []);
                }
                if (selectTypeOfVehicle?.map(item => { return item.label })?.length > 0) {
                    data.vehicle_type = JSON.stringify(selectTypeOfVehicle?.map(item => { return item.label }) || []);
                }
                if(localStorage.getItem("staff_dealer")){
                    data.dealer_id = localStorage.getItem("staff_dealer")
                  }
                props.get_pending_active_application(data);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [preSearch, search]);

    useEffect(() => {
        const data = {
            search: search,
            p_size: pageLength,
            ...({ start_date: moment(startDate).format("YYYY-MM-DD") }),
            ...({ end_date: moment(endDate).format("YYYY-MM-DD") }),
            sort_by: sortBy,
            // page: 1,

        };
        if (selectApplicationStatus?.map(item => { return item.value })?.length > 0) {
            data.application_status = JSON.stringify(selectApplicationStatus?.map(item => { return item.value }) || []);
        }
        if (selectApplicationType?.map(item => { return item.value })?.length > 0) {
            data.application_type = JSON.stringify(selectApplicationType?.map(item => { return item.value }) || []);
        }
        if (selectTypeOfVehicle?.map(item => { return item.label })?.length > 0) {
            data.vehicle_type = JSON.stringify(selectTypeOfVehicle?.map(item => { return item.label }) || []);
        }
        if(localStorage.getItem("staff_dealer")){
            data.dealer_id = localStorage.getItem("staff_dealer")
          }
        props.get_pending_active_application(data);
    }, [selectApplicationType]);

    useEffect(() => {
        const data = {
            search: search,
            p_size: pageLength,
            ...({ start_date: moment(startDate).format("YYYY-MM-DD") }),
            ...({ end_date: moment(endDate).format("YYYY-MM-DD") }),
            sort_by: sortBy,
            // page: 1,

        };
        if (selectApplicationStatus?.map(item => { return item.value })?.length > 0) {
            data.application_status = JSON.stringify(selectApplicationStatus?.map(item => { return item.value }) || []);
        }
        if (selectApplicationType?.map(item => { return item.value })?.length > 0) {
            data.application_type = JSON.stringify(selectApplicationType?.map(item => { return item.value }) || []);
        }
        if (selectTypeOfVehicle?.map(item => { return item.label })?.length > 0) {
            data.vehicle_type = JSON.stringify(selectTypeOfVehicle?.map(item => { return item.label }) || []);
        }
        if(localStorage.getItem("staff_dealer")){
            data.dealer_id = localStorage.getItem("staff_dealer")
          }
        props.get_pending_active_application(data);
    }, [selectTypeOfVehicle]);
    useEffect(() => {
        const data = {
            search: search,
            p_size: pageLength,
            ...({ start_date: moment(startDate).format("YYYY-MM-DD") }),
            ...({ end_date: moment(endDate).format("YYYY-MM-DD") }),
            sort_by: sortBy,
        };
        if (selectApplicationStatus?.map(item => { return item.value })?.length > 0) {
            data.application_status = JSON.stringify(selectApplicationStatus?.map(item => { return item.value }) || []);
        }
        if (selectApplicationType?.map(item => { return item.value })?.length > 0) {
            data.application_type = JSON.stringify(selectApplicationType?.map(item => { return item.value }) || []);
        }
        if (selectTypeOfVehicle?.map(item => { return item.label })?.length > 0) {
            data.vehicle_type = JSON.stringify(selectTypeOfVehicle?.map(item => { return item.label }) || []);
        }
        if(localStorage.getItem("staff_dealer")){
      data.dealer_id = localStorage.getItem("staff_dealer")
    }
        props.get_pending_active_application(data);
    }, [selectApplicationStatus]);

    const handleOnDone = () => {
        setDateFilter(true)

        const data = {
            search: search,
            p_size: pageLength,
            start_date: moment(startDate).format("YYYY-MM-DD"),
            end_date: moment(endDate).format("YYYY-MM-DD"),
            sort_by: sortBy,
        };
        if (selectApplicationStatus?.map(item => { return item.value })?.length > 0) {
            data.application_status = JSON.stringify(selectApplicationStatus?.map(item => { return item.value }) || []);
        }
        if (selectApplicationType?.map(item => { return item.value })?.length > 0) {
            data.application_type = JSON.stringify(selectApplicationType?.map(item => { return item.value }) || []);
        }
        if (selectTypeOfVehicle?.map(item => { return item.label })?.length > 0) {
            data.vehicle_type = JSON.stringify(selectTypeOfVehicle?.map(item => { return item.label }) || []);
        }
        if(localStorage.getItem("staff_dealer")){
            data.dealer_id = localStorage.getItem("staff_dealer")
          }
        props.get_pending_active_application(data);
        handleClose()
    }
    return (
        <React.Fragment>
            <Modal dialogClassName="DateRangePicker-modal" show={show} onHide={handleClose}>
                <Modal.Body>
                    <DateRangePicker getDay={(days) => { setTotalDays(days) }} setStartDate={setStartDate}
                        setEndDate={setEndDate} setRangeDate={setRangeDate} rangeDate={rangeDate} />
                </Modal.Body>
                <Modal.Footer className="justify-content">
                    <div className="space-between">

                        <div className="TDays">
                            <span className="tText">
                                {totalDays} Days
                            </span>
                        </div>
                        <div className="row">

                            <button className="btnClose" onClick={handleClose}>
                                Close
                            </button>
                            <button className="btnDone" onClick={handleOnDone}>
                                Done
                            </button>
                        </div>
                    </div>

                </Modal.Footer>
            </Modal>


            <div className="Altable-Container">

                <div className="AlContainer" style={{ padding: "20px 0px 0px 0px", margin: "0px" }} >
                    <p style={{ float: 'left' }} className="pl-4"><b >{props?.total_count} Applications</b></p>
                    <div className="pr-3">
                        <button type="button" data-toggle="modal" data-target="#confirmModelAdminMulti" className="deleteSelected" disabled={(props.application_data || []).length === 0}>
                            Delete Selected
                        </button>
                    </div>
                </div>


                <div className="p-2">
                    <p>{`${moment(startDate || "").format("YYYY-MM-DD")} to ${moment(endDate || "").format("YYYY-MM-DD")}`}</p>
                    <p className="filtertxt" onClick={handleShow}><i class="bi bi-funnel"></i > Filter by <span style={{ color: '#fb5100' }}>date</span></p>
                    <div className="row">
                        <div className='col-sm-3'>


                            <div class="input-group" style={{ margin: "2px 0px 0px 0px" }}>
                                <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    class="form-control border-end-0 customsearch"
                                    placeholder="Search Applications"
                                    value={tSearch}
                                    onChange={handleOnChange}

                                />
                                <span class="input-group-text" style={{cursor: "pointer"}}  onClick={() =>  setSearch(tSearch)}><i className="fa fa-search"></i></span>
                            </div>

                        </div>
                        <div className="col-sm-3 selectdropdown">
                            <ReactMultiSelectCheckboxes options={[{ label: 'General', value: "general" }, { label: 'Inventory', value: "inventory" }, { label: "Manual", value: "manual" }]} value={selectApplicationType}
                                onChange={setApplicationType}
                                placeholderButtonLabel="Application Type"
                            />
                        </div>

                        <div className="col-sm-3 selectdropdown">
                            <ReactMultiSelectCheckboxes options={(props.vehicle_types || []).map(item => {
                                return {
                                    value: item.id,
                                    label: item.name
                                }
                            })} value={selectTypeOfVehicle}
                                onChange={setTypeOfVehicle}
                                placeholderButtonLabel="Vehicle type"
                            />
                        </div>
                    </div>
                </div>



                <div className="dealer-dtable table-responsive">




                    <table style={{ width: "100%" }} className="tableDealer table-striped table-hover" id="" ref={componentRef}>
                        <thead>
                            <tr className="tableDealerHeight">
                                <th className="text-align: center;">
                                    <label className="ListCheckBox">
                                        <input
                                            type="checkbox"
                                            checked={
                                                props.checkedAllDealerListing !== undefined &&
                                                    props.checkedAllDealerListing !== null
                                                    ? props.checkedAllDealerListing
                                                    : false
                                            }
                                            onChange={toggleAllDealer}
                                        />
                                        <div className="ListMark"></div>
                                    </label>
                                </th>
                                <th>{"id".toUpperCase()}</th>
                                <th>{"APP TYPE".toUpperCase()}</th>
                                <th>{"name".toUpperCase()}</th>
                                <th className="">{"status".toUpperCase()}</th>
                                <th>{"number".toUpperCase()}</th>
                                <th>{"email".toUpperCase()}</th>
                                <th>{"Assigned Agent".toUpperCase()}</th>
                                <th>{"Vehicle".toUpperCase()}</th>
                                <th>{"employment".toUpperCase()}</th>
                                {/* <th>{"gross income".toUpperCase()}</th> */}
                                <th>{"received".toUpperCase()}</th>
                                <th>{""}</th>
                                <th>{""}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(props.application_data || []).map((item, index) => (
                                <>
                                    <tr key={index}>
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
                                                    onChange={() => checkDealer(item.id)}
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
                                                <Link to={`${url}/${item.id}`}>
                                                    {`${item.first_name ? item.first_name || "" : ""} ${item.last_name ? item.last_name || "" : ""
                                                        }`}
                                                </Link>
                                            </span>
                                        </td>
                                        <td>
                                            <div
                                                className={
                                                    item.application_status
                                                        ? Number(item.application_status) === 6
                                                            ? "table-funded"
                                                            : Number(item.application_status) === 1
                                                                ? "table-unverified"
                                                                : Number(item.application_status) === 2
                                                                    ? "Admin-ConditionApproved "
                                                                    : Number(item.application_status) === 3
                                                                        ? "Admin-ConditionApproved active"
                                                                        : Number(item.application_status) === 4
                                                                            ? "table-declined"
                                                                            : Number(item.application_status) === 5
                                                                                ? ""
                                                                                : Number(item.application_status) === 7
                                                                                    ? "table-withdraw"
                                                                                    : Number(item.application_status) === 11 ? "table-unverified" : "table-unverified"
                                                        : ""
                                                }
                                            >
                                                {item.application_status
                                                    ? Number(item.application_status) === 6
                                                        ? "Booked"
                                                        : Number(item.application_status) === 1
                                                            ? "Credit Unknown"
                                                            : Number(item.application_status) === 2
                                                                ? "Conditionally approved"
                                                                : Number(item.application_status) === 3
                                                                    ? "Pre-approved"
                                                                    : Number(item.application_status) === 4
                                                                        ? "Decline"
                                                                        : Number(item.application_status) === 5
                                                                            ? "Approved"
                                                                            : Number(item.application_status) === 7
                                                                                ? "Withdraw"
                                                                                :Number(item.application_status) === 9 ?
                                                                                "Manual"
                                                                                : item.application_status === "pending"
                                                                                    ? "Credit Unknown"
                                                                                    :  Number(item.application_status) === 8
                                                                                    ? "Conditionally Approved For Special Program" : Number(item.application_status) === 11 ?  "Credit Unverified": item.application_status
                                                    : item.application_status === "pending"
                                                        ? "Credit Unknown"
                                                        : item.application_status}
                                            </div>
                                        </td>
                                        <td>
                                            {item?.telephone}
                                        </td>
                                        <td>
                                            {item?.applicant_email_by_dealer}
                                        </td>
                                        <td>
                      {item.agent
                        ? item.agent.full_name
                          ? item.agent.full_name ||""
                          : ""
                        : ""}
                    </td>
                                        <td>
                                            {item?.vehicle_type}
                                        </td>
                                        <td>
                                            {item?.employement_status}
                                        </td>
                                        {/* <td>
                                            {item?.gross_income
                                                ? new Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                }).format(Number(item?.gross_income)) // '$100.00'
                                                : new Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                }).format(0)}
                                        </td> */}
                                        <td>
                                            {item.created_at
                                                ? moment(item.created_at).format("ll")
                                                : ""}
                                        </td>
                                        <td onClick={removeLocalStorage}>
                                            <Link to={`${url}/${item.id}`} className="detaillinkbtn">Details</Link>

                                        </td>
                                        <td>

                                            <div className="icon-delete ">
                                                <button
                                                    type="button"
                                                    data-toggle="modal"
                                                    data-target="#confirmModelAdmin"
                                                    onClick={() => setItemId(item.id)}
                                                >
                                                    {props.delete_application_loading === true &&
                                                        Number(item.id) ===
                                                        Number(props.delete_application_id) ? (
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
                                </>
                            ))}
                        </tbody>
                    </table>

                </div>
                {itemId ? (
                    <ConfirmModel
                        buttonAction={delete_application}
                        id={itemId}
                        heading={"Delete Application"}
                        section1={"Are you sure you want to delete this Application?"}
                        section2={""}
                    />
                ) : null}
                <ConfirmModelMulti
                    buttonAction={delete_application_multi}
                    heading={"Delete Application"}
                    section1={"Are you sure you want to delete these Applications?"}
                    section2={""}
                />
            </div>

            <div className="row m-0 mt-2 rounded" style={{ background: '#fff' }}>
                <div className="col-md-4">
                {+props?.total_count > 20 ?  <p className="inline">
            <label htmlFor="">Showing</label>
            <select
              className="recordcounter"
              name="pageLength"
              onChange={changePageLength}
              value={pageLength}
            >
              <option value={20}> 20 </option>
              <option value={50}> 50</option>
              <option value={100}> 100</option>
            </select>
            <label htmlFor="">applications out of {props?.total_count}</label>
          </p>:null}
                </div>

                <div className="datatable-custom-pagination col-md-8">
                    {(props.pages_urls || []).length > 1 ? (
                        <>
                            {" "}
                            <div className="firstPage" onClick={handleFirstbtn}>
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </div>
                            <div className="firstPage" onClick={handlePrevbtn}>
                                <span aria-hidden="true">{"<"}</span>
                                <span class="sr-only">Previous</span>
                            </div>
                            {pageDecrementBtn}
                            {(props.pages_urls || []).map((item, index) =>
                                item.page_no < maxPageNumberLimit + 1 &&
                                    item.page_no > minPageNumberLimit ? (
                                    <div
                                        onClick={() => call_pages_data(item.url, item.page_no)}
                                        className={
                                            Number(page) === Number(item.page_no) ? "activePage" : "firstPage"
                                        }
                                        disabled={Number(page) === Number(item.page_no)}
                                        key={index}
                                    >
                                        {item.page_no}
                                    </div>
                                ) : (
                                    ""
                                )
                            )}
                            {pageIncrementBtn}
                            <div className="firstPage" onClick={handleNextbtn}>
                                <span aria-hidden="true">{">"}</span>
                                <span class="sr-only">Next</span>
                            </div>{" "}

                            <div className="firstPage" onClick={handleLastbtn}>
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>


        </React.Fragment>
    );
};
export default GeneralApplicationDatatable;
