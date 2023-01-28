/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import moment from "moment";
import { CSVLink } from "react-csv";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { useSelector } from "react-redux";
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const DmsDealerFeedsDatatable = (props) => {
  let { url } = useRouteMatch();
  const reduxState = useSelector((state) => {
    return {
      dms_dealer_feed:
        state.adminReducer.adminAccounts.dmsReducer.dms_dealer_feed,
      total_count: state.adminReducer.adminAccounts.dmsReducer.total_count,
      pages_urls: state.adminReducer.adminAccounts.dmsReducer.total_pages,
    };
  });
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
    // props.single_check_pending(id, "dealer");
  };
  const toggleAllDealer = () => {
    // props.toggle_all_check(!props.checkedAllDealerAccount, "dealer");
  };
  const headers = [
    { label: "Date", key: "date" },
    { label: "Active Listings", key: "active_listings" },
    { label: "Newly Added", key: "newly_added" },
    { label: "Deleted", key: "deleted" },
    { label: "Missing Images", key: "missig_images" },
  ];
  const exportData = [];
  (reduxState.dms_dealer_feed || []).map((item, index) => {
    return exportData.push({
      date: item.date,
      active_listings: item.totla,
      newly_added: item.added,
      deleted: item.deleted,
      missig_images: item.discarded,
    });
  });
  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };
  const delete_multipe_accounts = () => {
    const ids = (reduxState.dms_dealer_feed || [])
      .filter((item) => item.isChecked)
      .map((item) => {
        return item.id;
      });
    // props.delete_multiple_account(ids, "Search Active Accounts");
  };
  // print function
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);
  const delete_account = (id) => {
    // props.delete_single_account(id, "Search Active Accounts");
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
    };
    // props.get_pending_active_accounts(data);
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
      };
      // props.get_pending_active_accounts(data);
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
      };
      // props.get_pending_active_accounts(data);
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
    };
    // props.get_pending_active_accounts(data);
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
    };
    // props.get_pending_active_accounts(data);
  };

  const sortTable = (val) => {
    setpage(1);
    setSortBy(val);
    const data = {
      search: search,
      sort_by: val,
      p_size: pageLength,
    };
    // props.get_pending_active_accounts(data);
  };
  useEffect(() => {
    if (preSearch !== search && preSearch !== undefined) {
      const timeoutId = setTimeout(() => {
        setpage(1);
        const data = {
          search: search,
          sort_by: sortBy,
          p_size: pageLength,
        };
        // props.get_pending_active_accounts(data);
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
            placeholder="Search Logs"
            value={search}
            onChange={handleOnChange}
            // onBlur={handleOnBlur}
          />
        </div>
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
                {/* className="custom-sorting" */}
                <th>
                  <span>Date</span>
                </th>
                <th>Active Listings</th>
                <th>Newly Added</th>
                <th>Deleted</th>
                <th>Missing Images</th>
              </tr>
            </thead>
            <tbody>
              {(reduxState.dms_dealer_feed || []).map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr key={index}>
                      <td>{moment(item.date).format("ll")}</td>
                      <td>{item.total}</td>
                      <td>{item.added}</td>
                      <td>{item.deleted}</td>
                      <td>{item.discarded}</td>
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
      </div>
    </React.Fragment>
  );
};
export default DmsDealerFeedsDatatable;
