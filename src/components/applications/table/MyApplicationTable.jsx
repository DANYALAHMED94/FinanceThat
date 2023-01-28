import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import dateFormat from "dateformat";
import "./table.css";

const BasicTable = ({ tableData, loading, delete_application, delete_application_multi }) => {
  const [input, setInput] = useState("")
  const [data, setData] = useState(tableData)
  const [check, setCheck] = useState(false)
  const handleChange = event => {
    setInput(event.target.value)
  };
  const filterHandler = () => {
    const lowercasedInput = input.toLowerCase();

    const filteredData = data?.filter(item => {
      return Object.keys(item).some(key => {
        const regex = new RegExp(`^${lowercasedInput.trim()}`, 'i');
        return regex.test(item[key]);
      }
      );
    });
    if (input == "") {
      setData(tableData)
    } else {
      setData(filteredData)
    }
  }
  useEffect(() => {
    filterHandler()
  }, [input]);
  useEffect(() => {
    setData(tableData)
  }, [tableData]);
  const checkDealer = (id) => {
    let d = [...data]
    const isLargeNumber = (item) => item.id == id;
    let index = d.findIndex(isLargeNumber)
    let change = d[index]
    change.isChecked = !change.isChecked
    setData(d)
  };
  const toggleAllDealer = () => {
    let change = []
    data.map((item) => {
      item.isChecked = !check
      change.push(item)
    })
    setData(change)
    setCheck(!check)
  };

  return (
    <LoadingOverlay
      active={loading}
      spinner
      text="Loading your content..."
    >
      <div className="container-fluid">
        <div className="heading">
          <h1>Applications</h1>
        </div>
        <div className="AlContainer spaceBetween">
          <div className="ActiveList-Left">
            <input
              type="text"
              id="search"
              name="search"
              value={input}
              placeholder="Search Pending Applications"
              onChange={(i) => handleChange(i)}
            />
          </div>
          <button
            className="searchBtn"
            type="button"
            data-toggle="modal"
            onClick={filterHandler}
            data-target="#confirmModelAdminMulti"
          >
            <span style={{ color: "white" }}>Search</span>
          </button>
          <button
            className="deleteSelected"
            type="button"
            data-toggle="modal"
            data-target="#confirmModelAdminMulti"
            onClick={() => { delete_application_multi(data) }}
          >
            Delete Selected
          </button>

        </div>
        <div className="table-responsive" style={{ background: '#FFFFFF' }}>
          <div className="tableinfo">
            <div style={{ float: 'left' }}><p><b>{data?.length} Applications</b></p></div>
            <div style={{ float: 'right' }}>
              <p><i class="bi bi-funnel"></i> filter by Date</p>
            </div>
          </div>
          <table className="table table-striped table-hover">

            <thead>
              <tr style={{ backgroundColor: '#D4D3E0' }}>
                <th>   <label className="ListCheckBox">
                  <input
                    type="checkbox"
                    checked={check}
                    value={check}
                    onChange={() =>toggleAllDealer()}
                  />
                  <div className="ListMark"></div>
                </label></th>
                <th>{"id".toUpperCase()}</th>
                <th>{"name".toUpperCase()}</th>
                <th><div className="center">{"status".toUpperCase()}</div></th>
                <th>{"number".toUpperCase()}</th>
                <th>{"email".toUpperCase()}</th>
                <th>{"type".toUpperCase()}</th>
                <th>{"employment".toUpperCase()}</th>
                <th>{"gross income".toUpperCase()}</th>
                <th>{"received".toUpperCase()}</th>
                <th>{ }</th>
                <th>{ }</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => {
                return (
                  <tr>
                    <th>
                      <label className="ListCheckBox">
                        <input
                          type="checkbox"
                          checked={
                            item.isChecked
                              ? true
                              : false
                          }
                          value={item.id}
                          onChange={() => checkDealer(item.id)}
                        />
                        <div className="ListMark"></div>
                      </label>
                    </th>
                    <td>{item.id}</td>
                    <td>{item.first_name} {item.last_name}</td>
                    <td><div className="status">{item.status}</div></td>
                    <td>{item.employer_telephone}</td>
                    <td>{item.employer_email}</td>
                    <td>{item.interested_vehicle_type}</td>
                    <td>{item.employement_status}</td>
                    <td>
                      {item?.gross_income
                        ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(Number(item?.gross_income)) // '$100.00'
                        : new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(0)}
                    </td>
                    <td>{dateFormat(item.created_at, "mmmm dd, yyyy")}</td>
                    <td>
                      <Link to={`/buyer/my-application/${item.id}`} className="detaillinkbtn">
                        Details
                      </Link>
                    </td>
                    <td onClick={() => delete_application(item.id)}>
                      <div className="deletelinkbtn"><i class="bi bi-trash-fill"></i></div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>


        <div className="row">
          <div className="col-md-5">
            {+data?.length > 20 ? <p className="inline">
              <label htmlFor="">Showing</label>
              <select
                className="page-length"
                name="pageLength"
              >
                <option value={20}> 20 </option>
                <option value={50}> 50</option>
                <option value={100}> 100</option>
              </select>
              <label htmlFor="">applications out of {data?.length}</label>
            </p>: null}

          </div>
          <div className="col-md-4"> <div>&nbsp;</div></div>
          <div className="col-md-3">
            <nav aria-label="Page navigation">
              <ul class="pagination customepagination">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div >

      </div >
    </LoadingOverlay>
  );
}

export default BasicTable;
