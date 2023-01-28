import React, { Component } from "react";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";
import moment from "moment";
import { API_URL } from "../../../constant";

class AssignAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: "assign-agent",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.updateAssignAgent !== this.props.updateAssignAgent &&
      this.props.updateAssignAgent !== undefined
    ) {
      this.props.onClickChangeStep(1.1, 1);
      this.props.history.push(`${this.props.url}/applicant-detail`);
    }
  }

  update_assign_agent = () => {
    const data = {
      id: this.props.buyerAppId,
      agent: this.props.assignAgent,
      admin_user_type: localStorage.getItem("admin_user_type"),
      additional_item: [],
    };
    console.log(data);
    this.props.update_application_detail(data, "updateAssignAgent");
  };

  render() {
    const { Option } = components;

    const renderScrollbar = (props) => {
      return (
        <div style={{ height: 170 }}>
          <Scrollbars>{props.children}</Scrollbars>
        </div>
      );
    };
    const renderOption = (props) => {
      return (
        <Option {...props}>
          <div>{props.data.label}</div>
        </Option>
      );
    };
    let first = this.props.applicantFirstName
      ? this.props.applicantFirstName.split(" ")[0]
      : "";
    let last = this.props.applicantLastName
      ? this.props.applicantLastName.split(" ")[0]
      : "";
    first = first ? first.charAt(0).toUpperCase() : "";
    last = last ? last.charAt(0).toUpperCase() : "";
    return (
      <React.Fragment>
        <div className="app-form-content">
          <div className="app-form-content-inner">
            <div className="admin-form-head">
              <div className="admin-form-head-inner">
                {this.props.photo ? (
                  <span
                    style={{
                      backgroundImage: `url(${
                        API_URL + "/media/" + this.props.photo
                      })`,
                    }}
                    className="avatar"
                  ></span>
                ) : (
                  <span className="avatar">{`${first}${last}`} </span>
                )}
                <strong className="title d-inline-block">
                  {" "}
                  {`${
                    this.props.applicantFirstName != undefined &&
                    this.props.applicantFirstName != null
                      ? this.props.applicantFirstName || ""
                      : ""
                  } ${
                    this.props.applicantLastName != undefined &&
                    this.props.applicantLastName != null
                      ? this.props.applicantLastName || ""
                      : ""
                  }`}{" "}
                </strong>{" "}
                <span className="date d-inline-block">
                  {" "}
                  {this.props.created_at != null &&
                  this.props.created_at != undefined &&
                  this.props.created_at !== ""
                    ? moment(this.props.created_at).format("ll")
                    : ""}{" "}
                </span>{" "}
                <span className="type d-inline-block">
                  {" "}
                  {this.props.firstTypeOfVehicle}{" "}
                </span>{" "}
                <span className="type d-inline-block">
                  {" "}
                  {`ID: ${this.props.buyerAppId}`}{" "}
                </span>
                <p>
                  {" "}
                  <span className="">
                    {" "}
                    <em>PH:</em>{" "}
                    {this.props.applicantTelephone != undefined &&
                    this.props.applicantTelephone != null
                      ? this.props.applicantTelephone || ""
                      : ""}{" "}
                  </span>{" "}
                  <span className="">
                    {" "}
                    <em>E:</em>
                    {this.props.applicantEmail != undefined &&
                    this.props.applicantEmail != null
                      ? this.props.applicantEmail || ""
                      : ""}{" "}
                  </span>{" "}
                </p>
                {this.props.selectedAgent &&
                Object.keys(this.props.selectedAgent).length > 0 ? (
                  <span className="name">
                    {" "}
                    {`${
                      this.props.selectedAgent &&
                      Object.keys(this.props.selectedAgent).length > 0
                        ? this.props.selectedAgent.label
                        : ""
                    } `}{" "}
                  </span>
                ) : null}
                {/* <span className="name"> {`${this.props.applicantFirstName != undefined && this.props.applicantFirstName != null ? this.props.applicantFirstName || '' : ''} ${this.props.applicantLastName != undefined && this.props.applicantLastName != null ? this.props.applicantLastName || '' : ''}`} </span> */}
              </div>
            </div>

            <div className="tab-content" id="formAppTabsContent">
              <div
                className="tab-pane fade show active clearfix"
                id="assign-agent"
                role="tabpanel"
                aria-labelledby="assign-agent-tab"
              >
                {this.state.screenName === "assign-agent" ? (
                  <React.Fragment>
                    <div className="forms-head clearfix">
                      <h1> Assign Agent </h1>
                    </div>
                    <div className="form-main">
                      <div className="form-field-row two-col clearfix admin_flex">
                        <div className="form-field-col">
                          <label> Agent Name </label>
                          <Select
                            placeholder="Search Agent"
                            id="selectedAgent"
                            name="selectedAgent"
                            value={this.props.selectedAgent}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "assignAgent",
                                "selectedAgent"
                              )
                            }
                            options={this.props.allAgents}
                            isSearchable
                            isClearable
                            className="react-select-main"
                            classNamePrefix="react-select"
                            components={{
                              Option: renderOption,
                              MenuList: renderScrollbar,
                            }}
                            captureMenuScroll={false}
                          />
                        </div>
                        <div className="form-field-col">
                          {this.props.loading_update === true ? (
                            <button style={{height:"48px",width:"100px"}} className="btn btn-primary float-right active">
                              {" "}
                              <i
                                class="fa fa-circle-o-notch fa-spin"
                                aria-hidden="true"
                              ></i>{" "}
                            </button>
                          ) : (
                            <button style={{height:"48px",width:"100px"}}
                              className="btn btn-primary float-right active"
                              onClick={this.update_assign_agent}
                            >
                              {" "}
                              Assign{" "}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="footer-btns-holder clearfix">
                      {/* <Link to={`${this.props.url}/applicant-detail`}> <button className="btn btn-primary float-left" onClick={() => this.props.onClickChangeStep(1.1, 1)}> Back  </button></Link> */}
                      <button
                        className="btn btn-primary float-left"
                        onClick={() => this.props.history.goBack()}
                      >
                        {" "}
                        Back{" "}
                      </button>
                      {this.props.loading_update === true ? (
                        <button className="btn btn-primary float-right active">
                          {" "}
                          <i
                            class="fa fa-circle-o-notch fa-spin"
                            aria-hidden="true"
                          ></i>{" "}
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary float-right active"
                          onClick={this.update_assign_agent}
                        >
                          {" "}
                          Continue{" "}
                        </button>
                      )}
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AssignAgent;
