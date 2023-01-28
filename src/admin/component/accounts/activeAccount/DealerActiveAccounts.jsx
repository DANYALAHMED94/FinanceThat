/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import moment from "moment";
import { CSVLink } from "react-csv";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { capitalize } from "./../../../../_helpers/capitalize";
import ConfirmModel from "../../alertModel/ConfirmModel";
import ConfirmModelMulti from "../../alertModel/ConfirmModelMulti";
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const DealerActiveAccounts = (props) => {
  let { url } = useRouteMatch();
  const [itemId, setItemId] = useState("");
  const [search, setSearch] = useState("");
  const [page, setpage] = useState(1);
  const [sortBy, setSortBy] = useState("newest_accounts_first");
  const [pageNumberLimit] = useState(5);
  // ((props.pages_urls || []).length)/5
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [pageLength, setPageLenght] = useState(20);
  const [dealerType, setDealerType] = useState(20);
  const componentRef = React.useRef(null);
  const preSearch = usePrevious(search);
  const checkDealer = (id) => {
    props.single_check_pending(id, "dealer");
  };
  const toggleAllDealer = () => {
    // alert(!props.checkedAllDealerAccount)
    props.toggle_all_check(!props.checkedAllDealerAccount, "dealer");
  };
  const headers = [
    { label: "ID", key: "id" },
    { label: "Business Name", key: "businessName" },
    { label: "City", key: "city" },
    { label: "Telephone", key: "telephone" },
    { label: "Email Address", key: "email" },
    { label: "Date added", key: "date" },
  ];
  const exportData = [];
  (props.active_pending_accounts || []).map((item, index) => {
    return (item.dd_user_id || []).map((dealer, idx) =>
      exportData.push({
        id: dealer.id,
        businessName: dealer.business_name,
        city: dealer.city,
        telephone: dealer.phone,
        email: dealer.email,
        date: dealer.created_at,
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
  //       a_type: "dealer",
  //       a_status: "approved",
  //       search: search,
  //       sort_by: sortBy,
  //       p_size: pageLength,
  //     };
  //     props.get_pending_active_accounts(data);
  //   };
  const delete_multipe_accounts = () => {
    const ids = (props.active_pending_accounts || [])
      .filter((item) => item.isChecked)
      .map((item) => {
        return item.id;
      });
    props.delete_multiple_account(ids, "Search Active Accounts");
  };
  // print function
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);
  const delete_account = (id) => {
    props.delete_single_account(id, "Search Active Accounts");
  };
  const call_pages_data = (pageUrl, pageNo) => {
    setpage(pageNo);
    const data = {
      a_status: props.a_status,
      sort_by: props.sort_by,
    };
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
      a_type: "dealer",
      a_status: "approved",
      search: search,
      sort_by: sortBy,
      page: (props.pages_urls || []).length,
    };
    props.get_pending_active_accounts(data);
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
  const handleNextbtn = () => {
    if (page !== (props.pages_urls || []).length) {
      setpage(page + 1);
      const data = {
        a_type: "dealer",
        a_status: "approved",
        sort_by: sortBy,
        search: search,
        page: page + 1,
      };
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
        a_type: "dealer",
        a_status: "approved",
        sort_by: sortBy,
        search: search,
        page: page - 1,
      };
      props.get_pending_active_accounts(data);
    }
    if ((page - 1) % pageNumberLimit === 0) {
      const min =
        minPageNumberLimit - pageNumberLimit === -1
          ? 0
          : minPageNumberLimit - pageNumberLimit;
      const max =
        maxPageNumberLimit - pageNumberLimit === 4
          ? 5
          : maxPageNumberLimit - pageNumberLimit;
      setmaxPageNumberLimit(max);
      //   setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(min);
      //   setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleFirstbtn = () => {
    setpage(1);
    const data = {
      a_type: "dealer",
      a_status: "approved",
      search: search,
      sort_by: sortBy,
      page: 1,
    };
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
      a_type: "dealer",
      a_status: "approved",
      search: search,
      sort_by: sortBy,
      p_size: e.target.value,
    };
    props.get_pending_active_accounts(data);
  };
  const changeDealerType = (e) => {
    setDealerType(e.target.value);
    const data = {
      a_type: "dealer",
      a_status: "approved",
      search: search,
      d_type: e.target.value,
      sort_by: sortBy,
      p_size: pageLength,
    };
    props.get_pending_active_accounts(data);
  };
  const sortTable = (val) => {
    setpage(1);
    setSortBy(val);
    const data = {
      a_type: "dealer",
      a_status: "approved",
      search: search,
      sort_by: val,
      p_size: pageLength,
    };
    props.get_pending_active_accounts(data);
  };
  useEffect(() => {
    if (preSearch !== search && preSearch !== undefined) {
      const timeoutId = setTimeout(() => {
        setpage(1);
        const data = {
          a_type: "dealer",
          a_status: "approved",
          search: search,
          sort_by: sortBy,
          p_size: pageLength,
        };
        props.get_pending_active_accounts(data);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [preSearch, search]);

  return (
    <React.Fragment>
      <div className="AlContainer">
        <div className="ActiveList-Left">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search Active accounts"
            value={search}
            onChange={handleOnChange}
            // onBlur={handleOnBlur}
          />
        </div>
        {/* <div className="ActiveList-Right"><button type="submit">Archive</button></div> */}
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
          <div className="d-flex py-3"> <div className="table-showing-entries">
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
          <div className="table-showing-entries">
            <label htmlFor="">Dealer Type</label>
            <select
              className="form-control konnn"
              onChange={changeDealerType}
              name="dealerType"
              value={dealerType}
              style={{maxWidth:"120px"}}
            >
              <option value={""}> select </option>
              <option value={"managed"}> Managed </option>
              <option value={"unmanaged"}> Unmanaged </option>
            </select>
          </div></div>
         
          <table style={{ width: "100%" }} id="" ref={componentRef}>
            <thead>
              <tr>
                <th width="47px">
                  <label className="ListCheckBox">
                    <input
                      type="checkbox"
                      checked={
                        props.checkedAllDealerAccount !== undefined &&
                        props.checkedAllDealerAccount !== null
                          ? props.checkedAllDealerAccount
                          : false
                      }
                      onChange={toggleAllDealer}
                    />
                    <div className="ListMark"></div>
                  </label>
                </th>
                {/* className="custom-sorting" */}
                <th width="90px">
                  <span>ID</span>
                </th>
                <th width="200px">Business Name</th>
                <th width="150px">City</th>
                <th width="190px">Telephone</th>
                <th>Email Address</th>
                <th>Dealer Type</th>
                <th width="120px">
                  Date added
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
                    <button
                      disabled={
                        (props.active_pending_accounts || []).length === 0
                      }
                    >
                      <CSVLink
                        data={exportData}
                        headers={headers}
                        filename={"Active_Dealer_Accounts.csv"}
                      >
                        <img
                          src="/assets/image/sprite-icon/icon-download.svg"
                          alt=""
                        />
                      </CSVLink>
                    </button>
                    <ReactToPrint
                      documentTitle="Active Applications Record"
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
                return (item.dd_user_id || []).map((dealer, idx) => (
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
                            onChange={() => checkDealer(item.id)}
                          />
                          <div className="ListMark"></div>
                        </label>
                      </td>
                      {/* <td><span><Link to={`${url}/${item.id}/Dealer`} >{dealer.id}</Link></span></td> */}
                      <td>
                        <span>
                          <Link to={`${url}/${item.id}/Dealer`}>{item.id}</Link>
                        </span>
                      </td>
                      <td>
                        <span>
                          <a
                            target="_blank"
                            href={`/dealer-list/${item.id}`}
                            rel="noreferrer"
                          >
                            {dealer.operating_name
                              ? dealer.operating_name.split(" ")
                                ? dealer.operating_name.split(" ").length > 0
                                  ? dealer.operating_name
                                      .split(" ")
                                      .map((item) => {
                                        return (
                                          item
                                            .toLowerCase()
                                            .charAt(0)
                                            .toUpperCase() +
                                          item.toLowerCase().slice(1) +
                                          " "
                                        );
                                      })
                                  : dealer.operating_name
                                : dealer.operating_name
                              : ""}
                          </a>
                        </span>
                      </td>
                      <td>{capitalize(dealer.city)}</td>
                      <td>{dealer.phone}</td>
                      <td>{dealer.email}</td>
                      <td>{dealer?.subscription ? "Unmanaged" : "Managed"}</td>
                      <td>{moment(dealer.created_at).format("ll")}</td>
                      <td style={{ width: "150px" }}>
                        <Link to={`${url}/${item.id}/Dealer`}>Review</Link>
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
                  <button className="first" onClick={handleFirstbtn}>
                    {" "}
                    First{" "}
                  </button>
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
export default DealerActiveAccounts;
