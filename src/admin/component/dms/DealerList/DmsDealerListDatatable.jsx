/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { CSVLink } from "react-csv";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import ConfirmModel from "../../alertModel/ConfirmModel";
import ConfirmModelMulti from "../../alertModel/ConfirmModelMulti";
import { useSelector, useDispatch } from "react-redux";
import {
  single_check_dms_dealer,
  toggle_all_check_dms_dealer,
  delete_single_dms_dealer,
  delete_multiple_dms_dealer,
} from "../../../../actions/admin/dmsActions";
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const DmsDealerListDatatable = (props) => {
  let { url } = useRouteMatch();
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => {
    return {
      dms_dealer_detail:
        state.adminReducer.adminAccounts.dmsReducer.dms_dealer_detail,
      total_count: state.adminReducer.adminAccounts.dmsReducer.total_count,
      pages_urls: state.adminReducer.adminAccounts.dmsReducer.total_pages,
      checkAllDmsDealer:
        state.adminReducer.adminAccounts.dmsReducer.checkAllDmsDealer,
      delete_dms_id: state.adminReducer.adminAccounts.dmsReducer.delete_dms_id,
      delete_dms_loading:
        state.adminReducer.adminAccounts.dmsReducer.delete_dms_loading,
    };
  });
  const [itemId, setItemId] = useState("");
  const [search, setSearch] = useState("");
  const [page, setpage] = useState(1);
  const [sortBy, setSortBy] = useState("newest_accounts_first");
  const [pageNumberLimit] = useState(5);
  // ((props.pages_urls || []).length)/5
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [pageLength, setPageLenght] = useState(20);
  const componentRef = React.useRef(null);
  const preSearch = usePrevious(search);
  const checkDealer = (id) => {
    dispatch(single_check_dms_dealer(id));
  };
  const toggleAllDealer = () => {
    dispatch(toggle_all_check_dms_dealer(!reduxState.checkAllDmsDealer));
  };
  const headers = [
    { label: "ID", key: "id" },
    { label: "Dealer Name", key: "dealer_name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "No Of Listings", key: "no_of_listings" },
  ];
  const exportData = [];
  (reduxState.dms_dealer_detail || []).map((item, index) => {
    return exportData.push({
      id: item.id,
      dealer_name: item.business_name,
      email: item.email,
      phone: item.phone,
      no_of_listings: item.no_of_listings,
    });
  });
  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };
  const delete_multipe_accounts = () => {
    const ids = (reduxState.dms_dealer_detail || [])
      .filter((item) => item.isChecked)
      .map((item) => {
        return item.id;
      });
    dispatch(delete_multiple_dms_dealer(ids));
  };
  // print function
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);
  const delete_account = (id) => {
    dispatch(delete_single_dms_dealer(id));
  };
  const call_pages_data = (pageUrl, pageNo) => {
    setpage(pageNo);
    const data = {
      a_status: props.a_status,
      sort_by: props.sort_by,
    };
    // props.get_pending_active_accounts_pages(pageUrl, data);
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
      search: search,
      sort_by: sortBy,
      page: (reduxState.pages_urls || []).length,
      id: props.id,
    };
    props.get_dms_dealer_detail(data);
    let count = (reduxState.pages_urls || []).length;
    while (count % 5 !== 0) {
      count++;
    }
    setmaxPageNumberLimit(count);
    setminPageNumberLimit(count - 5);
  };
  const handleNextbtn = () => {
    if (page !== (reduxState.pages_urls || []).length) {
      setpage(page + 1);
      const data = {
        sort_by: sortBy,
        search: search,
        page: page + 1,
        id: props.id,
      };
      props.get_dms_dealer_detail(data);
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
        sort_by: sortBy,
        search: search,
        page: page - 1,
        id: props.id,
      };
      props.get_dms_dealer_detail(data);
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
      setminPageNumberLimit(min);
    }
  };
  const handleFirstbtn = () => {
    setpage(1);
    const data = {
      search: search,
      sort_by: sortBy,
      page: 1,
      id: props.id,
    };
    props.get_dms_dealer_detail(data);
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
      search: search,
      sort_by: sortBy,
      p_size: e.target.value,
      id: props.id,
    };
    props.get_dms_dealer_detail(data);
  };

  const sortTable = (val) => {
    setpage(1);
    setSortBy(val);
    const data = {
      search: search,
      sort_by: val,
      p_size: pageLength,
      id: props.id,
    };
    props.get_dms_dealer_detail(data);
  };
  useEffect(() => {
    if (preSearch !== search && preSearch !== undefined) {
      const timeoutId = setTimeout(() => {
        setpage(1);
        const data = {
          search: search,
          sort_by: sortBy,
          p_size: pageLength,
          id: props.id,
        };
        props.get_dms_dealer_detail(data);
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
            placeholder="Search dealer"
            value={search}
            onChange={handleOnChange}
          // onBlur={handleOnBlur}
          />
        </div>
      </div>

      <div className="admin-delete-selected-button btn-top-next">
        {/* <button
          type="button"
          data-toggle="modal"
          data-target="#confirmModelAdminMulti"
          disabled={
            (reduxState.dms_dealer_detail || []).filter(
              (item) => item.isChecked
            ).length === 0
          }
        >
          Delete Selected
        </button> */}
      </div>

      <div className="Altable-Container">
        <div className="Admin-dtable dms-dt">
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
            </select>
            <label htmlFor="">Entries</label>
          </div>
          <table style={{ width: "100%" }} id="" ref={componentRef}>
            <thead>
              <tr>
                {/* <th width="47px">
                  <label className="ListCheckBox">
                    <input
                      type="checkbox"
                      checked={
                        reduxState.checkAllDmsDealer !== undefined &&
                        reduxState.checkAllDmsDealer !== null
                          ? reduxState.checkAllDmsDealer
                          : false
                      }
                      onChange={toggleAllDealer}
                    />
                    <div className="ListMark"></div>
                  </label>
                </th> */}
                {/* className="custom-sorting" */}
                <th>
                  <span>ID</span>
                </th>
                <th>Dealer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>No Of Listings</th>
                <th>
                  <div className="imgprint">
                    <button
                      disabled={
                        (reduxState.dms_dealer_detail || []).length === 0
                      }
                    >
                      <CSVLink
                        data={exportData}
                        headers={headers}
                        filename={"DMS.csv"}
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
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {(reduxState.dms_dealer_detail || []).map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={index}>
                      {/* <td>
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
                      </td> */}
                      <td>
                        <span>
                          <Link
                            to={`${url}/${item.business_name}/feeds/${item.user_id}`}
                          >
                            {item.user_id}
                          </Link>
                        </span>
                      </td>
                      <td>{item.business_name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        {/* <Link to={`${url}/listings/${item.id}`}>
                          {item.no_of_dealer}
                        </Link> */}
                        <Link
                          to={`${url}/${item.business_name}/listing/${item.user_id}`}
                        >
                          {item.no_of_listings}
                        </Link>
                      </td>
                      <td style={{ width: "150px" }}>
                        <Link
                          to={`${url}/${item.business_name}/feeds/${item.user_id}`}
                        >
                          Review
                        </Link>
                        {/* <div className="admin-icon-delete">
                          <button
                            type="button"
                            data-toggle="modal"
                            data-target="#confirmModelAdmin"
                            onClick={() => setItemId(item.id)}
                          >
                            {reduxState.delete_dms_loading &&
                            Number(item.id) ===
                              Number(reduxState.delete_dms_id) ? (
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
                  </React.Fragment>
                );
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
            heading={"Delete DMS Dealer"}
            section1={"Are you sure you want to delete this dms dealer?"}
            section2={""}
          />
        ) : null}
        <ConfirmModelMulti
          buttonAction={delete_multipe_accounts}
          heading={"Delete DMS Dealer"}
          section1={"Are you sure you want to delete these dms dealers?"}
          section2={""}
        />
      </div>
    </React.Fragment>
  );
};
export default DmsDealerListDatatable;
