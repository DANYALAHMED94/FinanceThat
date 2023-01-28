import React, { Component } from "react";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import $ from "jquery";
import ConfirmModel from "../alertMessages/ConfirmModel";
import { API_URL } from "../../constant";

class AdditionalItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: "additional_items",
      assetIndex: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.updateAddtionalInfo !== this.props.updateAddtionalInfo &&
      this.props.updateAddtionalInfo !== undefined
    ) {
      // this.props.onClickChangeStep(4)
      // this.props.history.push(`${this.props.url}/verify-identity`)
    }
  }

  update_assets_detail = () => {
    const data = {
      id: this.props.buyerAppId,
      additional_item: (this.props.addtionalInformation || []).map((item) => {
        if (!item.id && item.productType) {
          return {
            type: item.productType,
            provider: item.infoProvider,
            cost: item.infoCost
              .toString()
              .split(",")
              .join("")
              .split("$")
              .join(""),
            // "is_updated": item.is_updated
            is_updated: false,
          };
        } else {
          return {
            id: item.id,
            type: item.productType,
            provider: item.infoProvider,
            cost: item.infoCost
              .toString()
              .split(",")
              .join("")
              .split("$")
              .join(""),
            is_updated: item.is_updated,
          };
        }
      }),
    };
    if (data.additional_item.length > 0) {
      this.props.update_application_detail(data, "updateAddtionalInfo");
    }
  };
  onBack = () => {
    this.props.history.push(`${this.props.url}/assets-detail`);
  };
  render() {
    const { Option } = components;

    const renderScrollbar = (props) => {
      return (
        <div style={{ height: 260 }}>
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
                <span className="type d-inline-block">
                  {" "}
                  {this.props.firstTypeOfVehicle}{" "}
                </span>
                {/* <p> <span className="">  {this.props.firstTypeOfVehicle} </span>  </p> */}
              </div>
            </div>
            {/* <ul className="nav nav-tabs-2 three-items" id="formAppTabs" role="tablist">

                        <li className="nav-item" onClick={() => this.changeScreen('additional-information')}>
                            <a className={this.state.screenName === 'additional-information' ? "nav-link active" : "nav-link"} id="additional-information-tab" data-toggle="tab" href="#additional-information" role="tab" aria-controls="additional-information" aria-selected={this.state.screenName === 'assets-detail' ? "true" : "false"}><span className="tabs-text additional-information"> Additional information </span> </a>
                        </li>
                    </ul> */}
            <div className="tab-content" id="formAppTabsContent">
              <div
                className="tab-pane fade show active clearfix"
                id="additional-information"
                role="tabpanel"
                aria-labelledby="additional-information-tab"
              >
                <div className="forms-head clearfix">
                  <h1 className="">
                    {" "}
                    Additional Items{" "}
                    <span>
                      {" "}
                      Please enter all applicable third party add-ons that have
                      been included in the loan amount.{" "}
                    </span>{" "}
                  </h1>
                </div>
                {(this.props.addtionalInformation || []).map((item, index) => (
                  <div className="form-main" key={index}>
                    {/* {index > 0 ? <span className="del" onClick={() => this.props.deleteAddtionalInfor(index)}></span> : null} */}
                    {index > 0 ? (
                      <span
                        className="del"
                        data-toggle="modal"
                        data-target="#confirmModel"
                        onClick={() =>
                          this.setState({
                            ...this.state,
                            assetIndex: index,
                          })
                        }
                      ></span>
                    ) : null}
                    <div className="form-field-row three-col clearfix">
                      <div className="form-field-col">
                        <label> Type </label>
                        <Select
                          required
                          placeholder="Select Type"
                          id="selectedProductType"
                          name="selectedProductType"
                          options={this.props.addtionalTypes}
                          onChange={(e) =>
                            this.props.changeSelectInfo(
                              e,
                              "productType",
                              "selectedProductType",
                              index
                            )
                          }
                          value={item.selectedProductType}
                          className="react-select-main "
                          classNamePrefix="react-select"
                          components={{
                            Option: renderOption,
                            MenuList: renderScrollbar,
                          }}
                          captureMenuScroll={false}
                        />
                      </div>
                      <div className="form-field-col">
                        <label> Provider </label>
                        <input
                          type="text"
                          className="form-control"
                          name="infoProvider"
                          placeholder="Provider"
                          value={item.infoProvider}
                          onChange={(e) =>
                            this.props.handleOnChangeInfo(e, index)
                          }
                        />
                      </div>
                      <div className="form-field-col">
                        <label> Cost </label>
                        <NumberFormat
                          className="form-control"
                          value={item.infoCost}
                          decimalScale={2}
                          onChange={(e) =>
                            this.props.handleOnChangeInfo(e, index)
                          }
                          thousandSeparator={true}
                          prefix={"$"}
                          id="infoCost"
                          name="infoCost"
                          allowNegative={false}
                          placeholder="Cost"
                        />
                        {/* <input type="text" className="form-control" name="" placeholder="e.g $99" /> */}
                      </div>
                    </div>
                    <div className="form-field-row two-col clearfix">
                      {(this.props.addtionalInformation || []).length > 1 &&
                      index === 0 ? null : (
                        <div className="cta m-0 clearfix">
                          <button
                            className="add-another float-right"
                            onClick={this.props.addAddtionalInfor}
                          >
                            {" "}
                            Add Another{" "}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div className="footer-btns-holder clearfix">
                  <button
                    className="btn btn-primary float-left"
                    onClick={this.onBack}
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
                      onClick={this.update_assets_detail}
                    >
                      {" "}
                      Continue{" "}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ConfirmModel
          buttonAction={this.props.deleteAddtionalInfor}
          id={this.state.assetIndex}
          heading={"Delete Additional Item?"}
          section1={"Are you sure you want to Delete this Additional Item?"}
          section2={""}
        />
      </React.Fragment>
    );
  }
}
export default AdditionalItems;
