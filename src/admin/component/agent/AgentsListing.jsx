/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import ConfirmModel from "../alertModel/ConfirmModel";
import ConfirmModelMulti from "../alertModel/ConfirmModelMulti";
import { history } from "../../../_helpers/history";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const AgentsListing = (props) => {
  let { url } = useRouteMatch();
  const [search, setSearch] = useState("");
  const [itemId, setItemId] = useState("");
  const [sortBy] = useState("newest_accounts_first");
  const [pageNumberLimit] = useState(5);
  // ((props.pages_urls || []).length)/5
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [page, setpage] = useState(1);
  const [pageLength, setPageLenght] = useState(20);
  const preSearch = usePrevious(search);

  const checkAgent = (id) => {
    props.single_check_agent(id);
  };
  const toggleAllAgents = () => {
    props.toggle_all_check_agent(!props.checkedAllAgent);
  };
  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };
  //   const handleOnBlur = () => {
  //     setpage(1);
  //     const data = {
  //       search: search,
  //       sort_by: sortBy,
  //       p_size: pageLength,
  //     };
  //     props.get_agents(data);
  //   };
  const deleteEmployee = (id) => {
    console.log(id);
    props.delete_single_agent(id || "");
  };
  const delete_multi_employee = (id) => {
    console.log(id);
    const ids = props.agent_listing
      .filter((item) => item.isChecked === true)
      .map((item) => {
        return item.id;
      });
    props.delete_multi_agent(ids);
  };
  const call_pages_data = (pageUrl, pageNo) => {
    setpage(pageNo);
    props.get_agents_pages(pageUrl);
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
    };
    props.get_agents(data);
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
        search: search,
        page: page + 1,
      };
      props.get_agents(data);
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
      };
      props.get_agents(data);
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
    };
    props.get_agents(data);
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
    props.get_agents(data);
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
        props.get_agents(data);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [preSearch, search]);
  const findDealerRoutes = () => {
    var pathname = history.location.pathname
    return pathname.includes("dealer-admin")
  }
  return (
    <React.Fragment>
      <div className="Pending-ListHead">
        <h1>{findDealerRoutes() ? "Users" : "Agents"}</h1>
      </div>
      <div className="Admin-AgentList-Container">
        <div className="AlContainer">
          <div className="ActiveList-Left">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search Agents"
              value={search}
              onChange={handleOnChange}
            //   onBlur={handleOnBlur}
            />
          </div>
          <div className="ActiveList-Right d-block agent-new-button">
            <Link to={findDealerRoutes() ? "/dealer-admin/new-agent" : "/admin/new-agent"}>
              <button className="AgentsBtn" type="button">
                Add New Agents
              </button>
            </Link>
          </div>
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
            <table style={{ width: "100%" }} id="">
              <thead>
                <tr>
                  <th>
                    <label className="ListCheckBox">
                      <input
                        type="checkbox"
                        checked={
                          props.checkedAllAgent !== undefined &&
                            props.checkedAllAgent !== null
                            ? props.checkedAllAgent
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
                {(props.agent_listing || []).map((item, index) => (
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
                            Number(item.id) === Number(props.delete_agent_id) ? (
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
            heading={"Delete Agent"}
            section1={"Are you sure you want to delete this Agent?"}
            section2={""}
          />
        ) : null}
        <ConfirmModelMulti
          buttonAction={delete_multi_employee}
          heading={"Delete Agents"}
          section1={"Are you sure you want to delete these Agents?"}
          section2={""}
        />
      </div>
    </React.Fragment>
  );
};
export default AgentsListing;
