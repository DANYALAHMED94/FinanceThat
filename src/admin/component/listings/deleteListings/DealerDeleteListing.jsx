/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import moment from "moment";
import { CSVLink } from "react-csv";
import ConfirmModel from "../../alertModel/ConfirmModel";
import ConfirmModelMulti from "../../alertModel/ConfirmModelMulti";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const DealerDeleteListing = (props) => {
  let { url } = useRouteMatch();
  const [search, setSearch] = useState("");
  const [itemId, setItemId] = useState("");
  const [page, setpage] = useState(1);
  const [sortBy, setSortBy] = useState("newest_first");
  const [pageNumberLimit] = useState(5);
  // ((props.pages_urls || []).length)/5
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [pageLength, setPageLenght] = useState(20);
  const preSearch = usePrevious(search);

  const componentRefDeleteListing = React.useRef(null);

  const checkDealer = (id) => {
    props.single_check_listing(id, "dealer");
  };
  const toggleAllDealer = () => {
    props.toggle_all_check_listing(!props.checkedAllDealerListing, "dealer");
  };
  const headers = [
    { label: "VEHICLE", key: "vehicle" },
    { label: "SELLER", key: "seller" },
    { label: "TYPE", key: "type" },
    { label: "PRICE", key: "price" },
    { label: "KILOMETERS", key: "kilometers" },
    { label: "DATE ADDED", key: "date" },
  ];
  const exportData = [];
  (props.listing_detail || []).map((item, index) =>
    exportData.push({
      vehicle: `${item.year || ""} | ${
        item.make !== undefined && item.make !== null
          ? item.make.make_name !== undefined && item.make.make_name !== null
            ? item.make.make_name || ""
            : ""
          : ""
      } | ${
        item.model !== undefined && item.model !== null
          ? item.model.model_make !== undefined &&
            item.model.model_make !== null
            ? item.model.model_make || ""
            : ""
          : ""
      }`,
      seller:
        item.user_id !== undefined &&
        item.user_id !== null &&
        item.user_id.length > 0
          ? item.user_id[0] !== undefined && item.user_id[0] !== null
            ? item.user_id[0].dd_user_id !== undefined &&
              item.user_id[0].dd_user_id !== null &&
              item.user_id[0].dd_user_id.length > 0
              ? item.user_id[0].dd_user_id[0].operating_name || ""
              : ""
            : ""
          : "",
      type:
        item.category !== undefined && item.category !== null
          ? item.category.name || ""
          : "",
      price:
        item.price !== null && item.price !== ""
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(Number(item.price)) // '$100.00'
          : new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(0),
      kilometers:
        item.kilometer !== null && item.kilometer !== ""
          ? item.kilometer.toLocaleString("en-US")
          : (0).toLocaleString("en-US"),
      date:
        item.created_at !== undefined && item.created_at !== null
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
  //       a_type: "dealer",
  //       a_status: "deleted",
  //       search: search,
  //       sort_by: sortBy,
  //       p_size: pageLength,
  //     };
  //     props.get_listing(data);
  //   };
  const delete_single_listing = (id) => {
    props.permament_delete_single_listing(id, "Search Delete Listing");
  };
  const delete_multiple_listing = () => {
    const ids = (props.listing_detail || [])
      .filter((item) => item.isChecked)
      .map((item) => {
        return item.id;
      });
    props.permament_delete_listings(ids, "Search Delete Listing");
  };
  const reactToPrintContent = React.useCallback(() => {
    return componentRefDeleteListing.current;
  }, [componentRefDeleteListing.current]);
  const call_pages_data = (pageUrl, pageNo) => {
    setpage(pageNo);
    const data = {
      a_status: props.a_status,
      sort_by: props.sort_by,
    };
    props.get_listing_pages(pageUrl, data);
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
      a_status: "deleted",
      search: search,
      sort_by: sortBy,
      page: (props.pages_urls || []).length,
    };
    props.get_listing(data);
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
        a_type: "dealer",
        a_status: "deleted",
        search: search,
        sort_by: sortBy,
        page: page + 1,
      };
      props.get_listing(data);
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
        a_status: "deleted",
        search: search,
        sort_by: sortBy,
        page: page - 1,
      };
      props.get_listing(data);
    }
    if ((page - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleFirstbtn = () => {
    setpage(1);
    const data = {
      a_type: "dealer",
      a_status: "deleted",
      search: search,
      sort_by: sortBy,
      page: 1,
    };
    props.get_listing(data);
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
      a_status: "deleted",
      search: search,
      sort_by: sortBy,
      p_size: e.target.value,
    };
    props.get_listing(data);
  };
  const sortTable = (val) => {
    setpage(1);
    setSortBy(val);
    const data = {
      search: search,
      a_type: "dealer",
      a_status: "deleted",
      sort_by: val,
      p_size: pageLength,
    };
    props.get_listing(data);
  };
  useEffect(() => {
    if (preSearch !== search && preSearch !== undefined) {
      const timeoutId = setTimeout(() => {
        setpage(1);
        const data = {
          a_type: "dealer",
          a_status: "deleted",
          search: search,
          sort_by: sortBy,
          p_size: pageLength,
        };
        props.get_listing(data);
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
            placeholder="Search Delete listings"
            value={search}
            onChange={handleOnChange}
            // onBlur={handleOnBlur}
          />
        </div>

        <div className="ActiveList-Right">
          <button type="submit">Archive</button>
        </div>
      </div>

      <div className="admin-delete-selected-button btn-top-next">
        <button
          type="button"
          data-toggle="modal"
          data-target="#confirmModelAdminMulti"
          disabled={
            (props.listing_detail || []).filter(
              (item) => item.isChecked === true
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
              {/* <option value={(props.listing_detail || []).length}> All </option> */}
            </select>
            <label htmlFor="">Entries</label>
          </div>
          <table
            style={{ width: "100%" }}
            id=""
            ref={componentRefDeleteListing}
          >
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

                <th>
                  <span>Id</span>
                </th>
                <th>
                  <span>Vehicle</span>
                </th>
                <th>Seller</th>
                <th>Type</th>
                <th>Price</th>
                <th>Kilometers</th>
                <th>
                  Date added{" "}
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
                  <div className="imgprint">
                    <button
                      disabled={(props.listing_detail || []).length === 0}
                    >
                      <CSVLink
                        data={exportData}
                        headers={headers}
                        filename={"Delete_Dealer_Listings.csv"}
                      >
                        <img
                          src="/assets/image/sprite-icon/icon-download.svg"
                          alt=""
                        />
                      </CSVLink>
                    </button>
                    <ReactToPrint
                      documentTitle="Delete Listing Seller Record"
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
              {(props.listing_detail || []).map((item, index) => (
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
                      <Link to={`${url}/${item.stock_id}`}>
                        {item.stock_id ? item.stock_id : ""}
                      </Link>
                    </span>
                  </td>
                  <td>
                    <span>
                      <Link to={`${url}/${item.id}`}>{`${item.year || ""}  ${
                        item.make !== undefined && item.make !== null
                          ? item.make.make_name !== undefined &&
                            item.make.make_name !== null
                            ? item.make.make_name || ""
                            : ""
                          : ""
                      }  ${
                        item.model !== undefined && item.model !== null
                          ? item.model.model_make !== undefined &&
                            item.model.model_make !== null
                            ? item.model.model_make || ""
                            : ""
                          : ""
                      }`}</Link>
                    </span>
                  </td>
                  <td>
                    <span>
                      {item.user_id !== undefined &&
                      item.user_id !== null &&
                      item.user_id.length > 0
                        ? item.user_id[0] !== undefined &&
                          item.user_id[0] !== null
                          ? item.user_id[0].dd_user_id !== undefined &&
                            item.user_id[0].dd_user_id !== null &&
                            item.user_id[0].dd_user_id.length > 0
                            ? // ? item.user_id[0].dd_user_id[0].operating_name || ""
                              item.user_id[0].dd_user_id[0].operating_name
                              ? item.user_id[0].dd_user_id[0].operating_name.split(
                                  " "
                                )
                                ? item.user_id[0].dd_user_id[0].operating_name.split(
                                    " "
                                  ).length > 0
                                  ? item.user_id[0].dd_user_id[0].operating_name
                                      .split(" ")
                                      .map((item) => {
                                        return (
                                          item
                                            .toLowerCase()
                                            .charAt(0)
                                            .toUpperCase() +
                                          item.slice(1) +
                                          " "
                                        );
                                      })
                                  : item.user_id[0].dd_user_id[0].operating_name
                                : item.user_id[0].dd_user_id[0].operating_name
                              : ""
                            : ""
                          : ""
                        : ""}
                    </span>
                  </td>
                  <td>
                    {item.category !== undefined && item.category !== null
                      ? item.category.name || ""
                      : ""}
                  </td>
                  <td>
                    {item.price !== null && item.price !== ""
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(Number(item.price)) // '$100.00'
                      : new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(0)}
                  </td>
                  <td>
                    {item.kilometer !== null && item.kilometer !== ""
                      ? item.kilometer.toLocaleString("en-US")
                      : (0).toLocaleString("en-US")}
                  </td>
                  <td>
                    {item.created_at !== undefined && item.created_at !== null
                      ? moment(item.created_at).format("ll")
                      : ""}
                  </td>
                  <td style={{ width: "150px" }}>
                    <Link to={`${url}/${item.stock_id}`}>Review</Link>
                    <div className="admin-icon-delete">
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#confirmModelAdmin"
                        onClick={() => setItemId(item.id)}
                      >
                        {props.loading_listing_delete_single &&
                        Number(item.id) === Number(props.delete_listing_id) ? (
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
                    {/* <div className="admin-icon-delete"><button type="button" onClick={() => delete_single_listing(item.id)}>{props.loading_listing_delete_single && Number(item.id) === Number(props.delete_listing_id) ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : <img src="/assets/image/sprite-icon/icon-delete.svg" alt="" />}</button></div> */}
                    {/* <div className="admin-icon-delete"><button type="button"><img src="/assets/image/sprite-icon/icon-delete.svg" alt="" /></button></div> */}
                  </td>
                </tr>
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
            buttonAction={delete_single_listing}
            id={itemId}
            heading={"Delete Listing"}
            section1={"Are you sure you want to delete this Listing?"}
            section2={""}
          />
        ) : null}
        <ConfirmModelMulti
          buttonAction={delete_multiple_listing}
          heading={"Delete Listing"}
          section1={"Are you sure you want to delete these Listings?"}
          section2={""}
        />
      </div>
    </React.Fragment>
  );
};
export default DealerDeleteListing;
