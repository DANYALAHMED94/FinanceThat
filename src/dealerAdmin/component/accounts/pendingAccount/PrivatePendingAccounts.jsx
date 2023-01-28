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
const PrivatePendingAccounts = (props) => {
  let { url } = useRouteMatch();
  const [search, setSearch] = useState("");
  const [itemId, setItemId] = useState("");
  const [page, setpage] = useState(1);
  const [sortBy, setSortBy] = useState("newest_accounts_first");
  const [pageNumberLimit] = useState(5);
  // ((props.pages_urls || []).length)/5
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [pageLength, setPageLenght] = useState(20);
  const componentRef = React.useRef(null);
  const preSearch = usePrevious(search);
  const checkPrivate = (id) => {
    props.single_check_pending(id, "private");
  };
  const toggleAllPrivate = () => {
    props.toggle_all_check(!props.checkedAllPendingAccount, "private");
  };
  const headers = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "City", key: "city" },
    { label: "Telephone", key: "telephone" },
    { label: "Email Address", key: "email" },
    { label: "Date added", key: "date" },
  ];
  const exportData = [];
  (props.active_pending_accounts || []).map((item, index) => {
    return (item.bd_user_id || []).map((buyer, idx) =>
      exportData.push({
        id: buyer.id,
        name: buyer.name,
        city: buyer.city,
        telephone: buyer.phone,
        email: buyer.email,
        date: buyer.created_at,
      })
    );
  });
  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };
  //   const handleOnBlur = () => {
  //     setpage(1);
  //     const data = {
  //       a_type: "private",
  //       a_status: "pending",
  //       search: search,
  //       sort_by: sortBy,
  //       p_size: pageLength,
  //     };
  //     props.get_pending_active_accounts(data);
  //   };
  const archiveAccount = () => {
    const data = props.active_pending_accounts.filter(
      (item) => item.isChecked === true
    );
    console.log(data);
  };
  const delete_multipe_accounts = () => {
    const ids = (props.active_pending_accounts || [])
      .filter((item) => item.isChecked)
      .map((item) => {
        return item.id;
      });
    props.delete_multiple_account(ids, "Search Pending Accounts");
  };
  const delete_account = (id) => {
    props.delete_single_account(id, "Search Pending Accounts");
  };
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);
  const call_pages_data = (pageUrl, pageNo) => {
    setpage(pageNo);
    const data = {
      a_status: props.a_status,
      sort_by: props.sort_by,
    };
    if(localStorage.getItem("staff_dealer")){
      data.dealer_id = localStorage.getItem("staff_dealer")
    }
    props.get_pending_active_accounts_pages(pageUrl, data);
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
  const handleLastbtn = () => {
    setpage((props.pages_urls || []).length);
    const data = {
      a_type: "private",
      a_status: "pending",
      search: search,
      sort_by: sortBy,
      page: (props.pages_urls || []).length,
    };
    if(localStorage.getItem("staff_dealer")){
      data.dealer_id = localStorage.getItem("staff_dealer")
    }
    props.get_pending_active_accounts(data);
    let count = (props.pages_urls || []).length;
    while (count % 5 !== 0) {
      count++;
    }
    setmaxPageNumberLimit(count);
    setminPageNumberLimit(count - 5);
    //   setmaxPageNumberLimit(maxPageNumberLimit + Math.ceil(((props.pages_urls || []).length) - 5));
    //   setminPageNumberLimit(minPageNumberLimit + Math.ceil(((props.pages_urls || []).length) - 5));
  };
  const handleNextbtn = () => {
    if (page !== (props.pages_urls || []).length) {
      setpage(page + 1);
      const data = {
        a_type: "private",
        a_status: "pending",
        search: search,
        sort_by: sortBy,
        page: page + 1,
      };
      if(localStorage.getItem("staff_dealer")){
        data.dealer_id = localStorage.getItem("staff_dealer")
      }
      props.get_pending_active_accounts(data);
    }
    if (page + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    if (page !== 1) {
      setpage(page - 1);
      const data = {
        a_type: "private",
        a_status: "pending",
        search: search,
        sort_by: sortBy,
        page: page - 1,
      };
      if(localStorage.getItem("staff_dealer")){
        data.dealer_id = localStorage.getItem("staff_dealer")
      }
      props.get_pending_active_accounts(data);
    }
    if ((page - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleFirstbtn = () => {
    setpage(1);
    const data = {
      a_type: "private",
      a_status: "pending",
      search: search,
      sort_by: sortBy,
      page: 1,
    };
    if(localStorage.getItem("staff_dealer")){
      data.dealer_id = localStorage.getItem("staff_dealer")
    }
    props.get_pending_active_accounts(data);
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
      a_type: "private",
      a_status: "pending",
      search: search,
      sort_by: sortBy,
      p_size: e.target.value,
    };
    if(localStorage.getItem("staff_dealer")){
      data.dealer_id = localStorage.getItem("staff_dealer")
    }
    props.get_pending_active_accounts(data);
  };
  const sortTable = (val) => {
    setpage(1);
    setSortBy(val);
    const data = {
      a_type: "private",
      a_status: "pending",
      search: search,
      sort_by: val,
      p_size: pageLength,
    };
    if(localStorage.getItem("staff_dealer")){
      data.dealer_id = localStorage.getItem("staff_dealer")
    }
    props.get_pending_active_accounts(data);
  };
  useEffect(() => {
    if (preSearch !== search && preSearch !== undefined) {
      const timeoutId = setTimeout(() => {
        setpage(1);
        const data = {
          a_type: "private",
          a_status: "pending",
          search: search,
          sort_by: sortBy,
          p_size: pageLength,
        };
        if(localStorage.getItem("staff_dealer")){
          data.dealer_id = localStorage.getItem("staff_dealer")
        }
        props.get_pending_active_accounts(data);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [preSearch, search]);
  console.log(props.active_pending_accounts, "active_pending_accounts")
  return (
    <React.Fragment>
      <div className="AlContainer">
        <div className="ActiveList-Left">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search pending accounts"
            value={search}
            onChange={handleOnChange}
          // onBlur={handleOnBlur}
          />
        </div>
        <div className="ActiveList-Right">
          <button type="button" onClick={archiveAccount}>
            Archive
          </button>
        </div>
      </div>

      <div className="admin-delete-selected-button btn-top-next">
        <button
          type="button"
          data-toggle="modal"
          data-target="#confirmModelAdminMulti"
          disabled={
            (props.active_pending_accounts || []).filter(
              (item) => item.isChecked
            ).length === 0
          }
        >
          Delete Selected
        </button>
      </div>

      <div className="Altable-Container">
        <div className="Admin-dtable">
          <div className="table-showing-entries">
            <label htmlFor="">Show</label>
            <select
              className="form-control page-length"
              onChange={changePageLength}
              name="pageLength"
              value={pageLength}
            >
              <option value={20}> 20 </option>
              <option value={50}> 50 </option>
              <option value={100}> 100 </option>
              {/* <option value={(props.active_pending_accounts || []).length}> All </option> */}
            </select>
            <label htmlFor="">Entries</label>
          </div>
          <table style={{ width: "100%" }} id="" ref={componentRef}>
            <thead>
              <tr>
                <th width="47px">
                  <label className="ListCheckBox">
                    <input
                      type="checkbox"
                      checked={
                        props.checkedAllPendingAccount !== undefined &&
                          props.checkedAllPendingAccount !== null
                          ? props.checkedAllPendingAccount
                          : false
                      }
                      onChange={toggleAllPrivate}
                    />
                    <div className="ListMark"></div>
                  </label>
                </th>

                <th width="90px">
                  <span>ID</span>
                </th>
                <th width="170px">Name</th>
                <th width="120px">City</th>
                <th width="190px">Telephone</th>
                <th>Email Address</th>
                <th width="120px">
                  Date added{" "}
                  <span
                    className={
                      sortBy === "newest_accounts_first"
                        ? "custom-sorting acs-sort"
                        : "custom-sorting dec-sort"
                    }
                    onClick={() =>
                      sortTable(
                        sortBy === "newest_accounts_first"
                          ? "oldest_accounts_first"
                          : "newest_accounts_first"
                      )
                    }
                  ></span>
                </th>
                <th>
                  <div className="imgprint">
                    <button>
                      <CSVLink
                        data={exportData}
                        headers={headers}
                        filename={"Pending_Private_Accounts.csv"}
                      >
                        {" "}
                        <img
                          src="/assets/image/sprite-icon/icon-download.svg"
                          alt=""
                        />
                      </CSVLink>
                    </button>
                    <ReactToPrint
                      documentTitle="Pending Private Record"
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
                    {/* <button className="mr-0"><img src="/assets/image/sprite-icon/icon-print.svg" alt="" /></button> */}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {(props.active_pending_accounts || []).map((item, index) => {
                return (item.bd_user_id || []).map((buyer, idx) => (
                  <React.Fragment key={index}>
                    <tr key={idx}>
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
                            onChange={() => checkPrivate(item.id)}
                          />
                          <div className="ListMark"></div>
                        </label>
                        {/* <label className="ListCheckBox">
                                                <input type="checkbox" checked={buyer.isChecked !== undefined && buyer.isChecked !== null ? buyer.isChecked : false} value={buyer.id} onChange={() => checkPrivate(buyer.id)} />
                                                <div className="ListMark"></div>
                                            </label> */}
                      </td>
                      {/* <td><span><Link to={`${url}/${item.id}/Private`} >{buyer.id}</Link></span></td> */}
                      <td>
                        <span>
                          <Link to={`${url}/${item.id}/Private`}>
                            {item.id}
                          </Link>
                        </span>
                      </td>
                      <td>
                        <span>
                          <a
                            target="_blank"
                            href={`/private-seller/${item.id}`}
                            rel="noreferrer"
                          >
                            {buyer.name && (buyer.name !== 'NAN' && buyer.name !== 'NA') ? buyer.name : buyer.first_name + ' ' + buyer.last_name}
                          </a>
                        </span>
                      </td>
                      <td>{buyer.city}</td>
                      <td>{item.phone_number}</td>
                      <td>{item.email}</td>
                      <td>
                        {item.start_date !== undefined
                          ? moment(item.start_date).format("ll")
                          : ""}
                      </td>
                      <td style={{ width: "150px" }}>
                        <Link to={`${url}/${item.id}/Private`}>Review</Link>
                        {/* <div className="admin-icon-delete"><button type="button"><img src="/assets/image/sprite-icon/icon-delete.svg" alt="" /></button></div> */}
                        <div className="admin-icon-delete">
                          <button
                            type="button"
                            data-toggle="modal"
                            data-target="#confirmModelAdmin"
                            onClick={() => setItemId(item.id)}
                          >
                            {props.delete_account_loading &&
                              Number(item.id) ===
                              Number(props.delete_account_id) ? (
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
                        {/* <div className="admin-icon-delete"><button type="button" onClick={() => delete_account(item.id)}>{props.delete_account_loading && Number(item.id) === Number(props.delete_account_id) ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : <img src="/assets/image/sprite-icon/icon-delete.svg" alt="" />}</button></div> */}
                      </td>
                    </tr>
                  </React.Fragment>
                ));
              })}
            </tbody>
          </table>
          <div className="datatable-custom-pagination">
            {(props.pages_urls || []).length > 1 ? (
              <>
                {" "}
                {page > 5 ? (
                  <button onClick={handleFirstbtn}> First </button>
                ) : null}{" "}
                <button onClick={handlePrevbtn}> Prev </button>
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
                <button onClick={handleNextbtn}> Next </button>{" "}
                {page > 1 ? (
                  <button onClick={handleLastbtn}> Last </button>
                ) : null}{" "}
              </>
            ) : null}
          </div>
        </div>
        {itemId ? (
          <ConfirmModel
            buttonAction={delete_account}
            id={itemId}
            heading={"Delete Account"}
            section1={"Are you sure you want to delete this Account?"}
            section2={""}
          />
        ) : null}
        <ConfirmModelMulti
          buttonAction={delete_multipe_accounts}
          heading={"Delete Account"}
          section1={"Are you sure you want to delete these Accounts?"}
          section2={""}
        />
      </div>
    </React.Fragment>
  );
};
export default PrivatePendingAccounts;
