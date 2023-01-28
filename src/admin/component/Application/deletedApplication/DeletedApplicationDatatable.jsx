/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import moment from "moment";
import { CSVLink } from "react-csv";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import ConfirmModel from "../../alertModel/ConfirmModel";
import ConfirmModelMulti from "../../alertModel/ConfirmModelMulti";
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
const DeletedApplicationDatatable = (props) => {
    let { url } = useRouteMatch();
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("newest_first");
    const [page, setpage] = useState(1);
    const [itemId, setItemId] = useState("");
    const [pageLength, setPageLenght] = useState(20);
    // const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [pageNumberLimit] = useState(5);
    // ((props.pages_urls || []).length)/5
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    const [userFilter, selectUserFilter] = useState("");
    const [statusFilter, selectStatusFilter] = useState("");
    const [allAgents, setAllAgents] = useState([]);
    const [selectAgent, selectAgentFilter] = useState("");

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
                                :Number(item.application_status) === 9 ?
                                        "Mannual"
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
        setSearch(value);
    };
    //   const handleOnBlur = () => {
    //     setpage(1);
    //     const data = {
    //       search: search,
    //       a_status: "pending",
    //       sort_by: sortBy,
    //       p_size: pageLength,
    //     };
    //     props.get_pending_active_application(data);
    //   };
    const removeLocalStorage = () => {
        localStorage.removeItem("lastStepPostAppEditAdmin");
        localStorage.removeItem("coApplicantEditPostAppAdmin");
    };
    // for print
    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);

    const delete_application = (id) => {
        props.delete_single_row(id, "Search Deleted Applications");
    };
    const delete_application_multi = () => {
        const ids = (props.application_data || [])
            .filter((item) => item.isChecked)
            .map((item) => {
                return item.id;
            });
        props.delete_multi_row(ids, "Search Deleted Applications");
    };

    const call_pages_data = (pageUrl, pageNo) => {
        setpage(pageNo);
        const data = {
            search: search,
            a_status: props.a_status,
            sort_by: props.sort_by,
            p_size: pageLength,
            agent_filter: selectAgent,
            a_type: userFilter,
            app_status_filter: statusFilter,
        };
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
                a_status: "deleted",
                sort_by: sortBy,
                page: page + 1,
                p_size: pageLength,
                agent_filter: selectAgent,
                a_type: userFilter,
                app_status_filter: statusFilter,
            };
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
            a_status: "deleted",
            sort_by: sortBy,
            page: (props.pages_urls || []).length,
            p_size: pageLength,
            agent_filter: selectAgent,
            a_type: userFilter,
            app_status_filter: statusFilter,
        };
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
                a_status: "deleted",
                sort_by: sortBy,
                page: page - 1,
                p_size: pageLength,
                agent_filter: selectAgent,
                a_type: userFilter,
                app_status_filter: statusFilter,
            };
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
            a_status: "deleted",
            sort_by: sortBy,
            page: 1,
            p_size: pageLength,
            agent_filter: selectAgent,
            a_type: userFilter,
            app_status_filter: statusFilter,
        };
        props.get_pending_active_application(data);
        setmaxPageNumberLimit(5);
        setminPageNumberLimit(0);
    };
    let pageIncrementBtn = null;
    if ((props.pages_urls || []).length > maxPageNumberLimit) {
        pageIncrementBtn = <bitton onClick={handleNextbtn}> &hellip; </bitton>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <bitton onClick={handlePrevbtn}> &hellip; </bitton>;
    }
    const changePageLength = (e) => {
        setPageLenght(e.target.value);
        setpage(1);
        const data = {
            a_status: "deleted",
            search: search,
            sort_by: sortBy,
            p_size: e.target.value,
            agent_filter: selectAgent,
            a_type: userFilter,
            app_status_filter: statusFilter,
        };
        props.get_pending_active_application(data);
    };
    const sortTable = (val) => {
        setpage(1);
        setSortBy(val);
        const data = {
            search: search,
            a_status: "deleted",
            sort_by: val,
            p_size: pageLength,
            agent_filter: selectAgent,
            a_type: userFilter,
            app_status_filter: statusFilter,
        };
        props.get_pending_active_application(data);
    };
    // useEffect(() => {
    //     if (preSearch !== search && preSearch !== undefined) {
    //         const timeoutId = setTimeout(() => {
    //             setpage(1);
    //             const data = {
    //                 search: search,
    //                 a_status: "deleted",
    //                 sort_by: sortBy,
    //                 p_size: pageLength,
    //                 agent_filter: selectAgent,
    //                 a_type: userFilter,
    //                 app_status_filter: statusFilter,
    //             };
    //             props.get_pending_active_application(data);
    //         }, 1000);
    //         return () => clearTimeout(timeoutId);
    //     }
    // }, [preSearch, search]);

    useEffect(() => {
        setAllAgents(
            (props.agent_listing || []).map((item) => {
                return {
                    value:
                        item.aud_user_id !== undefined &&
                            item.aud_user_id !== null &&
                            item.aud_user_id.length > 0
                            ? item.aud_user_id[0].user_id || ""
                            : "",
                    label:
                        item.aud_user_id !== undefined &&
                            item.aud_user_id !== null &&
                            item.aud_user_id.length > 0
                            ? item.aud_user_id[0].name || ""
                            : "",
                };
            })
        );
    }, [props.agent_listing]);

    useEffect(() => {
        const data = {
            search: search,
            a_status: "deleted",
            sort_by: sortBy,
            p_size: pageLength,
            agent_filter: selectAgent,
            a_type: userFilter,
            app_status_filter: statusFilter,
        };
        props.get_pending_active_application(data);
    }, [selectAgent]);
    useEffect(() => {
        const data = {
            search: search,
            a_status: "deleted",
            sort_by: sortBy,
            p_size: pageLength,
            agent_filter: selectAgent,
            a_type: userFilter,
            app_status_filter: statusFilter,
        };
        props.get_pending_active_application(data);
    }, [userFilter]);
    useEffect(() => {
        const data = {
            search: search,
            a_status: "deleted",
            sort_by: sortBy,
            p_size: pageLength,
            agent_filter: selectAgent,
            a_type: userFilter,
            app_status_filter: statusFilter,
        };
        props.get_pending_active_application(data);
    }, [statusFilter]);

    return (
        <React.Fragment>
            <div className="AlContainer">
                <div className="ActiveList-Left">
                    <input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Search Deleted Applications"
                        value={search}
                        onChange={handleOnChange}
                    // onBlur={handleOnBlur}
                    />
                </div>
                <div className="ActiveList-Right">
                    <button type="submit">Archive</button>
                </div>
            </div>

            <div className="admin-delete-selected-button">
                <button
                    type="button"
                    data-toggle="modal"
                    data-target="#confirmModelAdminMulti"
                    disabled={(props.application_data || []).length === 0}
                >
                    Delete Selected
                </button>
            </div>

            <div className="Altable-Container">
                <div className="Admin-dtable">
                    <div className="table-showing-entries">
                        <div className="row">
                            <div className="col-md-3">
                                <label htmlFor="">Show</label>
                                <select
                                    className="form-control page-length"
                                    onChange={changePageLength}
                                    name="pageLength"
                                    value={pageLength}
                                    style={{cursor:"pointer"}}
                                >
                                    <option value={20}> 20 </option>
                                    <option value={50}> 50</option>
                                    <option value={100}> 100</option>
                                    {/* <option value={(props.application_data || []).length}> All </option> */}
                                </select>
                                <label htmlFor="">Entries</label>
                            </div>
                            {/* <div className="col-md-2"></div> */}
                            <div className="col-md-3">
                                <select
                                    className="form-control w-100"
                                    onChange={(e) => selectAgentFilter(e.target.value)}
                                    name="selectAgent"
                                    value={selectAgent}
                                    style={{cursor:"pointer"}}
                                >
                                    <option value=""> Sort by Agent</option>
                                    {(allAgents || []).map((item) => (
                                        <option value={item.value}> {item.label} </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-3">
                                <select
                                    className="form-control w-100"
                                    onChange={(e) => selectStatusFilter(e.target.value)}
                                    name="statusFilter"
                                    value={statusFilter}
                                    style={{cursor:"pointer"}}
                                >
                                    <option value=""> Sort by</option>
                                    <option value="conditionally approved"> conditionally approved </option>
                                    <option value="pre-approved"> pre-approved</option>
                                    <option value="approved"> approved </option>
                                    <option value="funded"> Booked</option>
                                    <option value="unverified"> Credit Unknown</option>
                                    <option value="declined"> declined</option>
                                    <option value="withdraw"> Withdraw</option>
                                    <option value="manual"> Manual</option>
                                    <option value="conditionally_approved_for_special_program"> Conditionally Approved For Special Program</option>
                                </select>
                            </div>

                            <div className="col-md-3">
                                <select
                                    className="form-control w-100"
                                    onChange={(e) => selectUserFilter(e.target.value)}
                                    name="userFilter"
                                    value={userFilter}
                                    style={{cursor:"pointer"}}
                                >
                                    <option value=""> show applications by</option>
                                    <option value="dealer"> Dealers only </option>
                                    <option value="buyer"> Buyer only</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <table style={{ width: "100%" }} id="" ref={componentRef}>
                        <thead>
                            <tr>
                                <th>
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
                                <th>Application Id </th>
                                <th>
                                    <span>Applicant Name</span>{" "}
                                </th>
                                <th>Application Status</th>
                                <th>Dealer Name</th>
                                <th>Assigned Agent</th>
                                <th>Submitted By</th>
                                <th>Asset By</th>
                                <th>Email Address</th>
                                <th>
                                    Date Added{" "}
                                    <span
                                        className={
                                            sortBy === "newest_first"
                                                ? "custom-sorting acs-sort"
                                                : "custom-sorting dec-sort"
                                        }
                                        onClick={() =>
                                            sortTable(
                                                sortBy === "newest_first"
                                                    ? "oldest_first"
                                                    : "newest_first"
                                            )
                                        }
                                    ></span>
                                </th>
                                <th>
                                    <div className="imgprint imageapp-width">
                                        <button
                                            disabled={(props.application_data || []).length === 0}
                                        >
                                            <CSVLink
                                                data={exportData}
                                                headers={headers}
                                                filename={"Active_Dealer_Listings.csv"}
                                            >
                                                <img
                                                    src="/assets/image/sprite-icon/icon-download.svg"
                                                    alt=""
                                                />
                                            </CSVLink>
                                        </button>
                                        <ReactToPrint
                                            documentTitle="Pending Applications Record"
                                            content={reactToPrintContent}
                                        >
                                            <PrintContextConsumer>
                                                {({ handlePrint }) => (
                                                    <button className="mr-0" onClick={handlePrint}>
                                                        <img
                                                            src="/assets/image/sprite-icon/icon-print.svg"
                                                            alt=""
                                                        />
                                                    </button>
                                                )}
                                            </PrintContextConsumer>
                                        </ReactToPrint>
                                    </div>
                                </th>
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
                                            <span>
                                                <Link to={`${url}/${item.id}`}>
                                                    {item.id ? item.id || "" : ""}
                                                </Link>
                                            </span>
                                        </td>
                                        <td>
                                            <span>
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
                                                                                    : Number(item.application_status) === 11 ?"table-unverified" : "table-unverified"
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
                                                                                    ? "Conditionally Approved For Special Program" : Number(item.application_status) === 11 ? "Credit Unverified" : item.application_status
                                                    : item.application_status === "pending"
                                                        ? "Credit Unknown"
                                                        : item.application_status}
                                            </div>
                                        </td>
                                        <td>
                                            {item.user
                                                ? item.user.user_type
                                                    ? Number(item.user.user_type) === 2 ? item.user
                                                        ? item.user.first_name
                                                            ? item.user.first_name + ' ' + item.user
                                                                ? item.user.last_name
                                                                    ? item.user.last_name : "" : ''
                                                            : ""
                                                        : "" : "" : "" : ""}
                                        </td>
                                         <td>
                      {item.agent
                        ? item.agent.full_name
                          ? item.agent.full_name ||""
                          : ""
                        : ""}
                    </td>
                                        <td>
                                        {item.agent
                                            ? item.agent.full_name
                                            ? item.agent.full_name ||""
                                            : ""
                                            : ""}
                                        </td>
                                        <td>
                                            {item.user
                                                ? item.user.user_type
                                                    ? Number(item.user.user_type) === 2
                                                        ? "Dealer"
                                                        : "Buyer"
                                                    : ""
                                                : ""}
                                        </td>
                                        <td>{item?.seller ? (item.seller?.first_name || "") + " " + (item.seller?.last_name || "") : ""}</td>
                                        <td>
                                            {item.user && Object.keys(item.user).length > 0
                                                ? item.user.id
                                                    ? Number(item.user.id) === -99
                                                        ? item.email_address
                                                        : item.user.email !== undefined &&
                                                            item.user.email !== null &&
                                                            item.user.email !== ""
                                                            ? item.user.email || ""
                                                            : ""
                                                    : ""
                                                : ""}
                                        </td>
                                        <td>
                                            {item.created_at
                                                ? moment(item.created_at).format("ll")
                                                : ""}
                                        </td>
                                        <td style={{ width: "150px" }} onClick={removeLocalStorage}>
                                            <Link to={`${url}/${item.id}`}>Review</Link>
                                            {/* <div className="admin-icon-delete">
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
                                            </div> */}
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                    <div className="datatable-custom-pagination">
                        {(props.pages_urls || []).length > 1 ? (
                            <>
                                {" "}
                                {page > 5 ? (
                                    <button className="first" onClick={handleFirstbtn}>
                                        {" "}
                                        First{" "}
                                    </button>
                                ) : null}{" "}
                                <button className="prev" onClick={handlePrevbtn}>
                                    {" "}
                                    Prev{" "}
                                </button>
                                {pageDecrementBtn}
                                {(props.pages_urls || []).map((item, index) =>
                                    item.page_no < maxPageNumberLimit + 1 &&
                                        item.page_no > minPageNumberLimit ? (
                                        <button
                                            onClick={() => call_pages_data(item.url, item.page_no)}
                                            className={
                                                Number(page) === Number(item.page_no) ? "active" : ""
                                            }
                                            disabled={Number(page) === Number(item.page_no)}
                                            key={index}
                                        >
                                            {item.page_no}
                                        </button>
                                    ) : (
                                        ""
                                    )
                                )}
                                {pageIncrementBtn}
                                <button className="next" onClick={handleNextbtn}>
                                    {" "}
                                    Next{" "}
                                </button>{" "}
                                {page > 1 ? (
                                    <button className="last" onClick={handleLastbtn}>
                                        {" "}
                                        Last{" "}
                                    </button>
                                ) : null}{" "}
                            </>
                        ) : null}
                    </div>
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
        </React.Fragment>
    );
};
export default DeletedApplicationDatatable;
