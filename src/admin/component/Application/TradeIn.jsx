import React, { Component } from "react";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import NumberFormat from "react-number-format";
import MaskedInput from "react-text-mask";
import { Link } from "react-router-dom";
import $ from "jquery";
import ConfirmModel from "../alertModel/ConfirmModel";
import ApplicationHeaderAdmin from "./ApplicationHeaderAdmin";
class TradeIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: "assets-detail",
      assetIndex: "",
      model: "",
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.updateTradeIn !== this.props.updateTradeIn &&
      this.props.updateTradeIn !== undefined
    ) {
      this.props.onClickChangeStep(4, 5);
      this.props.history.push(`${this.props.url}/verify-identity`);
    }
  }

  update_trade_detail = () => {
    const data = {
      id: this.props.buyerAppId,
      admin_user_type: localStorage.getItem("admin_user_type"),
      trade: {
        tradeYear: this?.props?.tradeYear||'',
        tradeMake: this?.props?.tradeMake||'',
        tradeModel: this?.props?.tradeModel||'',
        tradeTrim: this?.props?.tradeTrim||'',
        tradeKilometer: !this.props.tradeKilometer
          ? 0
          : this.props.tradeKilometer.toString().split(",").join(""),
        tradeVin: this.props.tradeVin||'',
        tradeAllowance: !this?.props?.tradeAllowance
          ? 0
          : this.props.tradeAllowance
            .toString()
            .split(",")
            .join("")
            .split("$")
            .join(""),
        tradeCondition: this.props.tradeCondition||'',
      },
      additional_item: [],
    };
    console.log(data);
    this.props.update_application_detail(data, "updateTradeIn");
  };

  render() {

    const { Option } = components;

    const renderScrollbarCondition = (props) => {
      return (
        <div style={{ height: 100 }}>
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
            <ApplicationHeaderAdmin {...this.props} />
            <ul
              className="nav nav-tabs-2 singleItem"
              id="formAppTabs"
              role="tablist"
            >
              <li
                className="nav-item"
              >
                <a
                  className={"nav-link active"}
                  id="assets-detail-tab"
                  data-toggle="tab"
                  href="#assets-detail"
                  role="tab"
                  aria-controls="assets-detail"
                  aria-selected={"true"}
                >
                  <span className="tabs-text assets-detail">
                    {" "}
                    Trade In
                  </span>{" "}
                </a>
              </li>

            </ul>
            <div className="tab-content" id="formAppTabsContent">
              <div
                className="tab-pane fade show active clearfix"
                id="assets-detail"
                role="tabpanel"
                aria-labelledby="assets-detail-tab"
              >
                    <div className="forms-head clearfix">
                      <h1> Trade-in Detail </h1>
                    </div>
                    <div className="form-main" >
                      <div className="form-field-row two-col clearfix">
                      </div>


                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Year </label>
                          <MaskedInput
                            mask={[/[0-9]/i, /[0-9]/, /[0-9]/i, /[0-9]/]}
                            className="form-control"
                            guide={false}
                            placeholder="Year"
                            id="tradeYear"
                            name="tradeYear"
                            value={this.props.tradeYear}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Make </label>

                          <input
                            type="text"
                            className="form-control"
                            name="tradeMake"
                            placeholder="Make"
                            value={this.props.tradeMake}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Model </label>

                          <input
                            type="text"
                            className="form-control"
                            name="tradeModel"
                            placeholder="Model"
                            value={this.props.tradeModel}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Trim </label>

                          <input
                            type="text"
                            className="form-control"
                            name="tradeTrim"
                            placeholder=" "
                            value={this.props.tradeTrim}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> KM </label>
                          <NumberFormat
                            className="form-control"
                            value={this.props.tradeKilometer}
                            decimalScale={2}
                            onChange={this.props.handleOnChange}
                            thousandSeparator={true}
                            id="tradeKilometer"
                            name="tradeKilometer"
                            allowNegative={false}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> VIN </label>
                          <input
                            type="text"
                            className="form-control"
                            name="tradeVin"
                            placeholder="Vin"
                            value={this.props.tradeVin}
                            onChange={this.props.handleOnChange}
                            maxLength="17"
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Allowance </label>
                          <NumberFormat
                            className="form-control"
                            value={this.props.tradeAllowance}
                            decimalScale={2}
                            onChange={this.props.handleOnChange}
                            thousandSeparator={true}
                            prefix={"$"}
                            id="tradeAllowance"
                            name="tradeAllowance"
                            allowNegative={false}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Condition </label>
                          <Select
                            id="selectedTradeCondition"
                            name="selectedTradeCondition"
                            value={this.props.selectedTradeCondition}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "tradeCondition",
                                "selectedTradeCondition",
                              )
                            }
                            options={this.props.conditions}
                            isSearchable
                            isClearable
                            className="react-select-main"
                            classNamePrefix="react-select"
                            components={{
                              Option: renderOption,
                              MenuList: renderScrollbarCondition,
                            }}
                            captureMenuScroll={false}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="switch-holder">
                      <input
                        id="swicth"
                        type="checkbox"
                        name="trade_in_complete"
                        checked={this.props.trade_in_complete}
                        onChange={(e) =>
                          this.props.changeCompleteStatus(e, "trade_in_complete")
                        }
                      />
                      <label for="swicth" class="switch">
                        <div></div>
                      </label>
                      <span class="switch-label"> Complete </span>
                    </div>
                    <div className="footer-btns-holder clearfix">
                      <Link to={`${this.props.url}/assets-detail`}>
                        {" "}
                        <button
                          className="btn btn-primary float-left"
                          onClick={() => this.props.onClickChangeStep(4, 3)}
                        >
                          {" "}
                          Back{" "}
                        </button>
                      </Link>
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
                          onClick={this.update_trade_detail}
                        >
                          {" "}
                          Save{" "}
                        </button>
                      )}
                    </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default TradeIn;
