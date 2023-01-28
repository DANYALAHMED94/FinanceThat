import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { history } from "../../_helpers/history";
import dateFormat from "dateformat";
import { Helmet } from "react-helmet";

class Application extends Component {
  constructor(props) {
    super(props);
  }
  removeLocalStorage = () => {
    localStorage.removeItem("lastStepPostAppEditAdmin");
    localStorage.removeItem("coApplicantEditPostAppAdmin");
    localStorage.removeItem("lastStepPostAppEditAdmin");
    localStorage.removeItem("coApplicantEditPostAppAdmin");
    localStorage.removeItem("lastStepPostAppEdit");
    localStorage.removeItem("coApplicantEditPostApp");
    localStorage.removeItem("lastStepDealerPostAppEdit");
    localStorage.removeItem("coApplicantDealerEditPostApp");
  };
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>My applications</title>
          <meta name="description" content="" />
        </Helmet>
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-7 col-sm-12 col-12">
            <div className="MyApp-Head">
              <h1>Current Application</h1>
            </div>
          </div>

          <div className="col-xl-9 col-lg-8 col-md-5 col-sm-12 col-12">
            <div className="MyAppRight-List">
              <ul>
                <li>
                  <h1>Conditionally approved</h1>
                </li>
                <li>
                  <h2>Pre-approved</h2>
                </li>
                <li>
                  <h3>Approved</h3>
                </li>
                <li>
                  <h4>Decline</h4>
                </li>
                <li>
                  <h6>Booked</h6>
                </li>
                <li>
                  <p>Withdrawn</p>
                </li>
                <li>
                  <h5>Credit Unknown</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          {(this.props.post_applications || []).map((item, index) => (
            <div
              className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12"
              key={index}
            >
              <div className="MyApp-ThumText">
                <div className="TopText-Head">
                  {Number(item.application_status) === Number("1") ? (
                    <React.Fragment>
                      <h3 className="unverified">
                        Application ID:
                        <span>{item.id}</span>
                        <span className="app-applicant-name">
                          {" "}
                          Applicant Name:{" "}
                          {item.first_name ? item.first_name : ""}{" "}
                          {item.last_name ? item.last_name : ""}{" "}
                        </span>
                      </h3>
                      {/* <h2 className="Dicline-Color">{'Decline'}</h2> */}
                      <h2 className="unverified">{"Credit Unknown"}</h2>
                      {/* <h2 className="Pending-Color">{'Pending'}</h2> */}
                    </React.Fragment>
                  ) : Number(item.application_status) === Number("2") ? (
                    <React.Fragment>
                      <h1>
                        Application ID: <span>{item.id}</span>
                        <span className="app-applicant-name">
                          {" "}
                          Applicant Name:{" "}
                          {item.first_name ? item.first_name : ""}{" "}
                          {item.last_name ? item.last_name : ""}{" "}
                        </span>
                      </h1>
                      <h2>{"Conditionally approved"}</h2>
                    </React.Fragment>
                  ) : Number(item.application_status) === Number("3") ? (
                    <React.Fragment>
                      <h4>
                        Application ID: <span>{item.id}</span>
                        <span className="app-applicant-name">
                          Applicant Name:{" "}
                          {item.first_name ? item.first_name : ""}{" "}
                          {item.last_name ? item.last_name : ""}{" "}
                        </span>
                      </h4>
                      <h2 className="Pre-Approved-Color">{"Pre-approved"}</h2>
                    </React.Fragment>
                  ) : Number(item.application_status) === Number("4") ? (
                    <React.Fragment>
                      <h3>
                        Application ID: <span>{item.id}</span>
                        <span className="app-applicant-name">
                          Applicant Name:{" "}
                          {item.first_name ? item.first_name : ""}{" "}
                          {item.last_name ? item.last_name : ""}{" "}
                        </span>
                      </h3>
                      <h2 className="Dicline-Color">{"Decline"}</h2>
                    </React.Fragment>
                  ) : Number(item.application_status) === Number("5") ? (
                    <React.Fragment>
                      <h5>
                        Application ID: <span>{item.id}</span>
                        <span className="app-applicant-name">
                          Applicant Name:{" "}
                          {item.first_name ? item.first_name : ""}{" "}
                          {item.last_name ? item.last_name : ""}{" "}
                        </span>
                      </h5>
                      <h2 className="Approved-Color">{"Approved"}</h2>
                    </React.Fragment>
                  ) : Number(item.application_status) === Number("6") ? (
                    <React.Fragment>
                      <h3 className="funded">
                        Application ID: <span>{item.id}</span>
                        <span className="app-applicant-name">
                          Applicant Name:{" "}
                          {item.first_name ? item.first_name : ""}{" "}
                          {item.last_name ? item.last_name : ""}{" "}
                        </span>
                      </h3>
                      <h2 className="funded">{"Booked"}</h2>
                    </React.Fragment>
                  ) : Number(item.application_status) === Number("7") ? (
                    <React.Fragment>
                      <h3 className="withdraw">
                        Application ID: <span>{item.id}</span>
                        <span className="app-applicant-name">
                          Applicant Name:{" "}
                          {item.first_name ? item.first_name : ""}{" "}
                          {item.last_name ? item.last_name : ""}{" "}
                        </span>
                      </h3>
                      <h2 className="withdraw">{"Withdraw"}</h2>
                    </React.Fragment>
                  ) : Number(item.application_status) === Number("11") ? (
                    <React.Fragment>
                      <h3>
                        Application ID: <span>{item.id}</span>
                        <span className="app-applicant-name">
                          Applicant Name:{" "}
                          {item.first_name ? item.first_name : ""}{" "}
                          {item.last_name ? item.last_name : ""}{" "}
                        </span>
                      </h3>
                      <h2 className="Dicline-Color">{"Credit Unverified"}</h2>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {/** Pending Show as Decline */}
                      <h3 className="unverified">
                        Application ID: <span>{item.id}</span>
                        <span className="app-applicant-name">
                          Applicant Name:{" "}
                          {item.first_name ? item.first_name : ""}{" "}
                          {item.last_name ? item.last_name : ""}{" "}
                        </span>
                      </h3>
                      {/* <h2 className="Dicline-Color">{'Decline'}</h2> */}
                      <h2 className="unverified">{"Credit Unknown"}</h2>

                      {/* <h1>Application ID: <span>{item.id}</span></h1>
                                        <h2>{item.application_status}</h2> */}
                    </React.Fragment>
                  )}
                </div>

                <div className="AmountRequest-Head">
                  {/* <h1>Amount Requested</h1>
                  <h2>
                    {item.financing_amount !== null &&
                      item.financing_amount !== ""
                      ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(Number(item.financing_amount)) // '$100.00'
                      : new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(0)}
                  </h2> */}
                  <h3>
                    <i className="icon-ad-calendar"></i>{" "}
                    {dateFormat(item.created_at, "mmmm dd, yyyy")}
                  </h3>
                  {localStorage.getItem("user_type") &&
                    Number(localStorage.getItem("user_type")) === 2 ? (
                    Number(item.application_status) === Number("4") ? (
                      <Link
                        to={`/dealer/my-application/${item.id}`}
                        onClick={this.removeLocalStorage}
                        style={{ visibility: "hidden" }}
                      >
                        View
                      </Link>
                    ) : Number(item.user) ===
                      Number(localStorage.getItem("userId")) ? (
                      <Link
                        to={`/buyer/my-application/${item.id}`}
                        onClick={this.removeLocalStorage}
                      >
                        View
                      </Link>
                    ) : (
                      <Link
                        to={`/dealer/my-application/${item.id}`}
                        onClick={this.removeLocalStorage}
                      >
                        View
                      </Link>
                    )
                  ) : Number(item.application_status) === Number("4") ? (
                    <Link
                      to={`/buyer/my-application/${item.id}`}
                      onClick={this.removeLocalStorage}
                      style={{ visibility: "hidden" }}
                    >
                      View
                    </Link>
                  ) : (
                    <Link
                      to={`/buyer/my-application/${item.id}`}
                      onClick={this.removeLocalStorage}
                    >
                      View
                    </Link>
                  )}

                  {/* {(localStorage.getItem('user_type') && Number(localStorage.getItem('user_type')) === 2 ? Number(item.application_status) === Number('4') || Number(item.application_status) === Number('1') || (item.application_status) === ('pending') ? (<Link to={`/dealer/my-application/${item.id}`}
                                    onClick={this.removeLocalStorage} style={{ visibility: 'hidden' }}>View</Link>) : (<Link to={`/dealer/my-application/${item.id}`} onClick={this.removeLocalStorage}>View</Link>) : Number(item.application_status) === Number('4') || Number(item.application_status) === Number('1') || (item.application_status) === ('pending') ? (<Link to={`/buyer/my-application/${item.id}`}
                                    onClick={this.removeLocalStorage} style={{ visibility: 'hidden' }}>View</Link>) : (<Link to={`/buyer/my-application/${item.id}`} onClick={this.removeLocalStorage}>View</Link>))} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Application;
