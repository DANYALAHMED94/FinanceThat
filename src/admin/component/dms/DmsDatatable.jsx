/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { CSVLink } from "react-csv";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import ConfirmModel from "../alertModel/ConfirmModel";
import ConfirmModelMulti from "../alertModel/ConfirmModelMulti";
import {
  single_check_dms,
  toggle_all_check_dms,
  delete_single_dms,
  delete_multiple_dms,
} from "../../../actions/admin/dmsActions";
import { useDispatch } from "react-redux";
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const DmsDatatable = (props) => {
  let { url } = useRouteMatch();
  const dispatch = useDispatch();
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
  const checkDms = (id) => {
    dispatch(single_check_dms(id));
  };
  const toggleAllDealer = () => {
    dispatch(toggle_all_check_dms(!props.checkAllDms));
  };
  const headers = [
    { label: "ID", key: "id" },
    { label: "DMS Provider", key: "dms_provider" },
    { label: "Email", key: "email" },
    { label: "Feed", key: "feed" },
    { label: "No Of Dealer", key: "no_of_dealer" },
  ];
  const exportData = [];
  (props.dms_detail || []).map((item, index) => {
    return exportData.push({
      id: item.id,
      dms_provider: item.name,
      email: item.email,
      feed: item.feed,
      no_of_dealer: item.number_of_dealers,
    });
  });
  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };
  const delete_multipe_dms = () => {
    const ids = (props.dms_detail || [])
      .filter((item) => item.isChecked)
      .map((item) => {
        return item.id;
      });
    dispatch(delete_multiple_dms(ids));
  };
  // print function
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);
  const delete_dms = (id) => {
    dispatch(delete_single_dms(id));
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
      search: search,
      sort_by: sortBy,
      page: (props.pages_urls || []).length,
    };
    props.get_dms_detail(data);
    let count = (props.pages_urls || []).length;
    while (count % 5 !== 0) {
      count++;
    }
    setmaxPageNumberLimit(count);
    setminPageNumberLimit(count - 5);
  };
  const handleNextbtn = () => {
    if (page !== (props.pages_urls || []).length) {
      setpage(page + 1);
      const data = {
        sort_by: sortBy,
        search: search,
        page: page + 1,
      };
      props.get_dms_detail(data);
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
      props.get_dms_detail(data);
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
    props.get_dms_detail(data);
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
    props.get_dms_detail(data);
  };

  // const sortTable = (val) => {
  //   setpage(1);
  //   setSortBy(val);
  //   const data = {
  //     a_type: "dealer",
  //     a_status: "approved",
  //     search: search,
  //     sort_by: val,
  //     p_size: pageLength,
  //   };
  //   props.get_dms_detail(data);
  // };
  useEffect(() => {
    if (preSearch !== search && preSearch !== undefined) {
      const timeoutId = setTimeout(() => {
        setpage(1);
        const data = {
          search: search,
          sort_by: sortBy,
          p_size: pageLength,
        };
        props.get_dms_detail(data);
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
            placeholder="Search DMS"
            value={search}
            onChange={handleOnChange}
          // onBlur={handleOnBlur}
          />
        </div>
      </div>

      <div className="admin-delete-selected-button btn-top-next">
        <button
          type="button"
          data-toggle="modal"
          data-target="#confirmModelAdminMulti"
          disabled={
            (props.dms_detail || []).filter((item) => item.isChecked).length ===
            0
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
                        props.checkAllDms !== undefined &&
                          props.checkAllDms !== null
                          ? props.checkAllDms
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
                <th width="200px">DMS Provider</th>
                <th width="150px">Email</th>
                <th width="190px">Feed</th>
                <th>No Of Dealer</th>
                <th>
                  <div className="imgprint">
                    <button disabled={(props.dms_detail || []).length === 0}>
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
              {(props.dms_detail || []).map((item, index) => {
                return (
                  <React.Fragment key={index}>
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
                            onChange={() => checkDms(item.id)}
                          />
                          <div className="ListMark"></div>
                        </label>
                      </td>
                      <td>
                        <span>
                          <Link to={`${url}/${item.name}/dealer/${item.id}`}>
                            {item.id}
                          </Link>
                        </span>
                        {/* <span>
                          <Link to={`${url}/${item.id}/Dealer`}>{item.id}</Link>
                        </span> */}
                      </td>
                      <td>
                        <span>
                          {/* <a
                            target="_blank"
                            href={`/dealer-list/${item.id}`}
                            rel="noreferrer"
                          > */}
                          <Link to={`${url}/${item.name}/dealer/${item.id}`}>
                            {item.name}
                          </Link>
                          {/* </a> */}
                        </span>
                      </td>
                      <td>{item.email}</td>
                      <td>{item.feed || "External"}</td>
                      <td>
                        <Link to={`${url}/${item.name}/dealer/${item.id}`}>
                          {item.number_of_dealers}
                        </Link>
                      </td>
                      <td style={{ width: "150px" }}>
                        <Link to={`${url}/${item.id}/account`}>Review</Link>
                        <div className="admin-icon-delete">
                          <button
                            type="button"
                            data-toggle="modal"
                            data-target="#confirmModelAdmin"
                            onClick={() => setItemId(item.id)}
                          >
                            {props.delete_dms_loading &&
                              Number(item.id) === Number(props.delete_dms_id) ? (
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
            buttonAction={delete_dms}
            id={itemId}
            heading={"Delete DMS"}
            section1={"Are you sure you want to delete this dms?"}
            section2={""}
          />
        ) : null}
        <ConfirmModelMulti
          buttonAction={delete_multipe_dms}
          heading={"Delete DMS"}
          section1={"Are you sure you want to delete these dms?"}
          section2={""}
        />
      </div>
    </React.Fragment>
  );
};
export default DmsDatatable;
