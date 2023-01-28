/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import ConfirmModel from "../alertModel/ConfirmModel";
import ConfirmModelMulti from "../alertModel/ConfirmModelMulti";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const UsersListing = (props) => {
  let { url } = useRouteMatch();
  const [search, setSearch] = useState("");
  const [itemId, setItemId] = useState("");
  const [sortBy] = useState("newest_accounts");
  const [pageNumberLimit] = useState(5);
  // ((props.pages_urls || []).length)/5
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [page, setpage] = useState(1);
  const [pageLength, setPageLenght] = useState(20);
  const preSearch = usePrevious(search);

  const checkAgent = (id) => {
    props.single_check_user(id);
  };
  const toggleAllAgents = () => {
    props.toggle_all_check_user(!props.checkedAllUser);
  };
  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const deleteEmployee = (id) => {
    console.log(id);
    props.delete_single_user(id || "");
  };
  const delete_multi_employee = (id) => {
    console.log(id);
    const ids = props.user_listing
      .filter((item) => item.isChecked === true)
      .map((item) => {
        return item.id;
      });
    props.delete_multi_user(ids);
  };
  const call_pages_data = (pageUrl, pageNo) => {
    setpage(pageNo);
    props.get_users_pages(pageUrl);
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
      page: (props.pages_urls || []).length,
      dealer_id: localStorage.getItem('userId')
      // localStorage.getItem('userId')
    };
    if(localStorage.getItem("staff_dealer")){
      data.dealer_id = localStorage.getItem("staff_dealer")
      props.get_dealer_admin_users(data)
    }else {
      props.get_dealer_admin_users(data);
    }

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
        search: search,
        page: page + 1,
        dealer_id: localStorage.getItem('userId')
        // localStorage.getItem('userId')
      };
      if(localStorage.getItem("staff_dealer")){
        data.dealer_id = localStorage.getItem("staff_dealer")
        props.get_dealer_admin_users(data)
      }else {
        props.get_dealer_admin_users(data);
      }
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
        search: search,
        page: page - 1,
        dealer_id: localStorage.getItem('userId')
        // localStorage.getItem('userId')
      };
      if(localStorage.getItem("staff_dealer")){
        data.dealer_id = localStorage.getItem("staff_dealer")
        props.get_dealer_admin_users(data)
      }else {
        props.get_dealer_admin_users(data);
      }
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
      page: 1,
      dealer_id: localStorage.getItem('userId')
      // localStorage.getItem('userId')
    };
    if(localStorage.getItem("staff_dealer")){
      data.dealer_id = localStorage.getItem("staff_dealer")
      props.get_dealer_admin_users(data)
    }else {
      props.get_dealer_admin_users(data);
    }
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
      dealer_id: localStorage.getItem('userId')
      // localStorage.getItem('userId')
    };
    if(localStorage.getItem("staff_dealer")){
      data.dealer_id = localStorage.getItem("staff_dealer")
      props.get_dealer_admin_users(data)
    }else {
      props.get_dealer_admin_users(data);
    }
  };
  useEffect(() => {
    if (preSearch !== search && preSearch !== undefined) {
      const timeoutId = setTimeout(() => {
        setpage(1);
        const data = {
          search: search,
          sort_by: sortBy,
          p_size: pageLength,
          dealer_id: localStorage.getItem('userId')
          // localStorage.getItem('userId')
        };
        if(localStorage.getItem("staff_dealer")){
          data.dealer_id = localStorage.getItem("staff_dealer")
          props.get_dealer_admin_users(data)
        }else {
          props.get_dealer_admin_users(data);
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [preSearch, search]);

  return (
    <React.Fragment>
      <div className="Pending-ListHead">
        <h1>{"Users"}</h1>
      </div>


<div className="Altable-Container">

<div className="AlContainer" style={{ padding: "20px 12px 0px", margin: "0px" }}>
          <div className="row">
            <div className="col-sm-4">
              <div className="input-group" style={{ height: "100%" }} >

                <div className="ActiveList-Left">
                  <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Search Users"
                    value={search}
                    onChange={handleOnChange}
                  //   onBlur={handleOnBlur}
                  />
                </div>

              </div>
            </div>

            <div className="col-sm-8 align-self-end">
              <div className="ActiveList-Right d-block">
                <Link to={"/dealer-admin/new-user"}>
                  <button className="AgentsBtn" type="button">
                    Add New Users
                  </button>
                </Link>
              </div>
            </div>
          </div>



        <div className="Admin-dtable" style={{ margin: "20px 0px 0px 0px" }}>

            <table style={{ width: "100%" }} id="">
              <thead>
                <tr>
                  <th>
                    <label className="ListCheckBox">
                      <input
                        type="checkbox"
                        checked={
                          props.checkedAllUser !== undefined &&
                            props.checkedAllUser !== null
                            ? props.checkedAllUser
                            : false
                        }
                        onChange={toggleAllAgents}
                      />
                      <div className="ListMark"></div>
                    </label>
                  </th>
                  <th>
                    <span>ID</span>
                  </th>
                  <th>NAME</th>
                  <th>EMAIL ADDRESS</th>
                  <th>TELEPHONE</th>
                  <th>ROLE</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {(props.user_listing || []).map((item, index) => (
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
                          onChange={() => checkAgent(item.id)}
                        />
                        <div className="ListMark"></div>
                      </label>
                    </td>
                    <td>
                      <span>
                        <Link
                          to={`${url}/${item.aud_user_id !== undefined &&
                            item.aud_user_id !== null &&
                            item.aud_user_id.length > 0
                            ? item.aud_user_id[0].user_id || ""
                            : ""
                            }`}
                        >
                          {item.aud_user_id !== undefined &&
                            item.aud_user_id !== null &&
                            item.aud_user_id.length > 0
                            ? item.aud_user_id[0].user_id || ""
                            : ""}
                        </Link>
                      </span>
                    </td>
                    <td>
                      <span>
                        {item.aud_user_id !== undefined &&
                          item.aud_user_id !== null &&
                          item.aud_user_id.length > 0
                          ? item.aud_user_id[0].name || ""
                          : ""}
                      </span>
                    </td>
                    <td>{item.email || ""}</td>
                    <td>
                      {item.aud_user_id !== undefined &&
                        item.aud_user_id !== null &&
                        item.aud_user_id.length > 0
                        ? item.aud_user_id[0].telephone || ""
                        : ""}
                    </td>
                    <td>{item.user_role}</td>
                    <td style={{ width: "150px" }}>
                      <Link
                        to={`${url}/${item.aud_user_id !== undefined &&
                          item.aud_user_id !== null &&
                          item.aud_user_id.length > 0
                          ? item.aud_user_id[0].user_id || ""
                          : ""
                          }`}
                      >
                        Review
                      </Link>
                      {/* <div className="admin-icon-delete">
                                                <button type="button" data-toggle="modal" data-target="#confirmModelAdmin" onClick={() => setItemId(item.id)} >
                                                    {props.delete_account_loading && Number(item.id) === Number(props.delete_agent_id) ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : <img src="/assets/image/sprite-icon/icon-delete.svg" alt="" />}
                                                </button>
                                            </div> */}
                      <div className="admin-icon-delete">
                        <button
                          type="button"
                          data-toggle="modal"
                          data-target="#confirmModelAdmin"
                          onClick={() => setItemId(item.id)}
                        >
                          {props.loading_deleteing &&
                            Number(item.id) === Number(props.delete_user_id) ? (
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
                        {/* <button type="button" onClick={() => deleteEmployee(item.id)}>{props.loading_deleteing && Number(item.id) === Number(props.delete_agent_id) ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : <img src="/assets/image/sprite-icon/icon-delete.svg" alt="" />}</button> */}
                      </div>
                      {/* <div className="admin-icon-delete"><button type="button"><img src="/assets/image/sprite-icon/icon-delete.svg" alt="" /></button></div> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


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
        </div>
        {itemId ? (
          <ConfirmModel
            buttonAction={deleteEmployee}
            id={itemId}
            heading={"Delete User"}
            section1={"Are you sure you want to delete this User?"}
            section2={""}
          />
        ) : null}
        <ConfirmModelMulti
          buttonAction={delete_multi_employee}
          heading={"Delete Users"}
          section1={"Are you sure you want to delete these Users?"}
          section2={""}
        />
      </div>
    </React.Fragment>
  );
};
export default UsersListing;
