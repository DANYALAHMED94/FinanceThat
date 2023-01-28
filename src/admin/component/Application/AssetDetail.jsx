import React, { Component, useEffect } from "react";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import NumberFormat from "react-number-format";
import MaskedInput from "react-text-mask";
import { Link } from "react-router-dom";
import $ from "jquery";
import moment from "moment";
import ConfirmModel from "../alertModel/ConfirmModel";
import { API_URL } from "../../../constant";
import UploadImages from "./UploadImages";
import ApplicationHeaderAdmin from "./ApplicationHeaderAdmin";
import Automotive from "./AssetDetailComponent/Automotive";
import Marine from "./AssetDetailComponent/Marine";
import RV from "./AssetDetailComponent/RV";
import PowerSport from "./AssetDetailComponent/PowerSport";
import Trailer from "./AssetDetailComponent/Trailer";
import Construction from "./AssetDetailComponent/Construction";

class AssetDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: "assets-detail",
      assetIndex: "",
      sub_vehicle: "",
      monthlyBuget: "",
      model: "",
    };
    $("#assets-detail").removeClass("tabDeactive");
    $("#seller-information").addClass("tabDeactive");
    $("#additional-information").addClass("tabDeactive");
  }
  changeScreen = (para) => {
    if (para === "assets-detail") {
      $("#assets-detail").addClass("active");
      $("#assets-detail").addClass("show");
      $("#assets-detail").removeClass("tabDeactive");
      $("#seller-information").addClass("tabDeactive");
      $("#seller-information").removeClass("active");
      $("#seller-information").removeClass("show");
      $("#additional-information").addClass("tabDeactive");
      $("#additional-information").removeClass("active");
      $("#additional-information").removeClass("show");
    } else if (para === "seller-information") {
      $("#assets-detail").addClass("tabDeactive");
      $("#assets-detail").removeClass("active");
      $("#assets-detail").removeClass("show");
      $("#seller-information").removeClass("tabDeactive");
      $("#seller-information").addClass("active");
      $("#seller-information").addClass("show");
      $("#additional-information").addClass("tabDeactive");
      $("#additional-information").removeClass("active");
      $("#additional-information").removeClass("show");
    } else {
      $("#seller-information").addClass("tabDeactive");
      $("#seller-information").removeClass("active");
      $("#seller-information").removeClass("show");
      $("#assets-detail").addClass("tabDeactive");
      $("#assets-detail").removeClass("active");
      $("#assets-detail").removeClass("show");
      $("#additional-information").removeClass("tabDeactive");
      $("#additional-information").addClass("active");
      $("#additional-information").addClass("show");
    }
    this.setState({
      ...this.state,
      screenName: para,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.updateAssetsDetail !== this.props.updateAssetsDetail &&
      this.props.updateAssetsDetail !== undefined
    ) {
      $("#assets-detail").addClass("tabDeactive");
      $("#assets-detail").removeClass("active");
      $("#assets-detail").removeClass("show");
      $("#seller-information").removeClass("tabDeactive");
      $("#seller-information").addClass("active");
      $("#seller-information").addClass("show");
      $("#additional-information").addClass("tabDeactive");
      $("#additional-information").removeClass("active");
      $("#additional-information").removeClass("show");
      this.setState({
        ...this.state,
        screenName: "seller-information",
      });
    }
    if (
      prevProps.updateSellerDetail !== this.props.updateSellerDetail &&
      this.props.updateSellerDetail !== undefined
    ) {
      $("#seller-information").addClass("tabDeactive");
      $("#seller-information").removeClass("active");
      $("#seller-information").removeClass("show");
      $("#assets-detail").addClass("tabDeactive");
      $("#assets-detail").removeClass("active");
      $("#assets-detail").removeClass("show");
      $("#additional-information").removeClass("tabDeactive");
      $("#additional-information").addClass("active");
      $("#additional-information").addClass("show");
      this.setState({
        ...this.state,
        screenName: "additional-information",
      });
    }
    if (
      prevProps.updateAddtionalInfo !== this.props.updateAddtionalInfo &&
      this.props.updateAddtionalInfo !== undefined
    ) {
      this.props.onClickChangeStep(3, 4);
      this.props.history.push(`${this.props.url}/trade-in`);
    }
  }

  update_assets_detail = (para) => {
    if (para === "assets-detail") {
      var error = false;
      const data = {
        id: this.props.buyerAppId,
        admin_user_type: localStorage.getItem("admin_user_type"),
        vehicle_type:this.props.assetsDetails && this.props.assetsDetails?.length > 0 ?
        this.props.assetsDetails[0]?.selectedVehicle?.label || "" : "",
        sub_vehicle_type:this.props.assetsDetails && this.props.assetsDetails?.length > 0 ? this.props.assetsDetails[0]?.selectedSubTypeOfVehicle?.label || "" : "",
        vehicle: this.props.assetsDetails.map((item) => {
          if (item.id === "") {
            // if (item.tradeIn === "") {
            //   error = true;
            //   alert("Select Trade In Option");
            //   return;
            // }
            let vehicleData = {
              type_of_vehicle: item.vehicleType,
              sub_type_of_vehicle: item.sub_type_of_vehicle,
              trade_in: item.tradeIn || false,
              year: item.year,
              make: item.make,
              model: item.model,
              trim: item.trim,
              kilometer:
                item.kilometer === ""
                  ? 0
                  : item.kilometer.toString().split(",").join(""),
              vin: item.vin,
              price:
                item.price === ""
                  ? 0
                  : item.price
                      .toString()
                      .split(",")
                      .join("")
                      .split("$")
                      .join(""),
              condition: item.condition,
              stock_id: item.stockNumber,
              body_type: item.body_type,
              tonnage: item.tonnage,
              engine: item.engine,
              is_updated: item.is_updated,
            };
            if (
              !["powersport", "automotive"].includes(
                item?.selectedVehicle?.label?.toLowerCase()
              )
            ) {
              delete vehicleData.body_type;
            }
            if (
              !["powersport", "motorcycle", "boat", "marine"].includes(
                item?.selectedVehicle?.label?.toLowerCase()
              )
            ) {
              delete vehicleData.engine;
              delete vehicleData.tonnage;
            }
            if (item?.selectedVehicle?.label?.toLowerCase() !== "automotive") {
              delete vehicleData.trim;
            }
            if (
              ![
                "powersport",
                "motorcycle",
                "boat",
                "rv",
                "automotive",
                "marine",
              ].includes(item?.selectedVehicle?.label?.toLowerCase())
            ) {
              delete vehicleData.vin;
            }
            if (
              item?.selectedVehicle?.label?.toLowerCase() === "boat" ||
              item?.selectedVehicle?.label?.toLowerCase() === "marine"
            ) {
              delete vehicleData.kilometer;
            }
            return vehicleData;
          } else {
            let newVehicleData = {
              id: item.id,
              type_of_vehicle: item.vehicleType,
              sub_type_of_vehicle: item.sub_type_of_vehicle,
              trade_in: item.tradeIn || false,
              client_budget: item.client_budget,
              year: item.year,
              make: item.make,
              model: item.model,
              trim: item.trim,
              kilometer:
                item.kilometer === ""
                  ? 0
                  : item.kilometer.toString().split(",").join(""),
              vin: item.vin,
              price:
                item.price === ""
                  ? 0
                  : item.price
                      .toString()
                      .split(",")
                      .join("")
                      .split("$")
                      .join(""),
              condition: item.condition,
              stock_id: item.stockNumber,
              body_type: item.body_type,
              tonnage: item.tonnage,
              engine: item.engine,
              is_updated: item.is_updated,
            };
            if (
              !["powersport", "automotive"].includes(
                item?.selectedVehicle?.label?.toLowerCase()
              )
            ) {
              delete newVehicleData.client_budget;
              delete newVehicleData.body_type;
            }
            if (
              !["powersport", "motorcycle", "boat", "marine"].includes(
                item?.selectedVehicle?.label?.toLowerCase()
              )
            ) {
              delete newVehicleData.engine;
              delete newVehicleData.tonnage;
            }
            if (item?.selectedVehicle?.label?.toLowerCase() !== "automotive") {
              delete newVehicleData.trim;
            }
            if (
              ![
                "powersport",
                "motorcycle",
                "boat",
                "rv",
                "automotive",
                "marine",
                "construction"
              ].includes(item?.selectedVehicle?.label?.toLowerCase())
            ) {
              delete newVehicleData.vin;
            }
            if (
              item?.selectedVehicle?.label?.toLowerCase() === "boat" ||
              item?.selectedVehicle?.label?.toLowerCase() === "marine"
            ) {
              delete newVehicleData.kilometer;
            }
            return newVehicleData;
          }
        }),
        monthly_budget: this.props.monthly_budget,
        // trade_in:this.props.tradeIn,
        additional_item: [],
      };
      if (
        !["powersport", "automotive", "construction"].includes(
          this.props.assetsDetails?.[0]?.selectedVehicle?.label?.toLowerCase()
        )
      ) {
        delete data.monthly_budget;
      }
      console.log(data);
      if (!error) {
        this.props.update_application_detail(data, "updateAssetsDetail");
      }
    } else if (para === "seller-information") {
      const data = {
        id: this.props.buyerAppId,
        admin_user_type: localStorage.getItem("admin_user_type"),
        seller: {
          // first_name: this.props.sellerFirstName,
          // last_name: this.props.sellerLastName,
          street: this.props.sellerLocationName,
          city: this.props.sellerCity,
          province: this.props.sellerProvince,
          postal_code: this.props.sellerPostalCode,
          fax: this.props.sellerFax,
          email: this.props.sellerEmail,
          telephone: this.props.sellerTelephone,
          website: this.props.sellerWebsite,
        },
        looking_for_private_seller: this.props.privateSeller,
        additional_item: [],
      };
      if (this.props.sellerType === "dealer") {
        data.seller.dealership_name = this.props.sellerDealerShipName;
      } else {
        data.seller.first_name = this.props.sellerName?.split(" ")[0] || "";
        data.seller.last_name = this.props.sellerName?.split(" ")[1] || "";
      }
      console.log(data);
      this.props.update_application_detail(data, "updateSellerDetail");
    } else {
      const data = {
        id: this.props.buyerAppId,
        admin_user_type: localStorage.getItem("admin_user_type"),
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
      console.log(data);
      if (data.additional_item.length > 0) {
        this.props.update_application_detail(data, "updateAddtionalInfo");
      }
    }
  };

  onBack = (para) => {
    if (para === "assets-detail") {
      $("#assets-detail").removeClass("tabDeactive");
      $("#assets-detail").addClass("active");
      $("#assets-detail").addClass("show");
      $("#seller-information").addClass("tabDeactive");
      $("#seller-information").removeClass("active");
      $("#seller-information").removeClass("show");
      $("#additional-information").addClass("tabDeactive");
      $("#additional-information").removeClass("active");
      $("#additional-information").removeClass("show");
    } else if (para === "seller-information") {
      $("#seller-information").removeClass("tabDeactive");
      $("#seller-information").addClass("active");
      $("#seller-information").addClass("show");
      $("#assets-detail").addClass("tabDeactive");
      $("#assets-detail").removeClass("active");
      $("#assets-detail").removeClass("show");
      $("#additional-information").addClass("tabDeactive");
      $("#additional-information").removeClass("active");
      $("#additional-information").removeClass("show");
    }

    this.setState({
      ...this.state,
      screenName: para,
    });
  };

  render() {
    console.log(this.props, "Assest Detail ");
    const assetId =
      this.props.assetsDetails && (this.props.assetsDetails || []).length > 0
        ? this.props.assetsDetails[0].id
        : "";
    const { Option } = components;

    const renderScrollbar = (props) => {
      return (
        <div style={{ height: 260 }}>
          <Scrollbars>{props.children}</Scrollbars>
        </div>
      );
    };
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
    const renderScrollbarSub = (props) => {
      return (
        <div style={{ height: 150 }}>
          <Scrollbars>{props.children}</Scrollbars>
        </div>
      );
    };
    const renderOptionSubType = (props) => {
      return (
        <Option {...props}>
          <div>{props.data.name}</div>
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
            {/* <div className="admin-form-head">
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
                </span>
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
                  </span>
                  <span className="">
                    {" "}
                    <em>SIN:</em>{" "}
                    {this.props.applicantSin
                      ? this.props.applicantSin || ""
                      : ""}{" "}
                  </span>{" "}
                </p>
                {this.props.selectedAgent &&
                Object.keys(this.props.selectedAgent).length > 0 ? (
                  <Link
                    className="nav-link"
                    to={`${this.props.url}/assign-agent`}
                  >
                    {" "}
                    <span className="name">
                      {" "}
                      {`${
                        this.props.selectedAgent &&
                        Object.keys(this.props.selectedAgent).length > 0
                          ? this.props.selectedAgent.label
                          : ""
                      } `}{" "}
                    </span>
                  </Link>
                ) : null}
              </div>
            </div> */}
            <ul
              className="nav nav-tabs-2 admin-tabs two-items"
              id="formAppTabs"
              role="tablist"
            >
              <li
                className="nav-item"
                onClick={() => this.changeScreen("assets-detail")}
              >
                <a
                  className={
                    this.state.screenName === "assets-detail"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="assets-detail-tab"
                  data-toggle="tab"
                  href="#assets-detail"
                  role="tab"
                  aria-controls="assets-detail"
                  aria-selected={
                    this.state.screenName === "assets-detail" ? "true" : "false"
                  }
                >
                  {" "}
                  <span className="tabs-text assets-detail">
                    {" "}
                    Asset Detail{" "}
                  </span>{" "}
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => this.changeScreen("seller-information")}
              >
                <a
                  className={
                    this.state.screenName === "seller-information"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="seller-information-tab"
                  data-toggle="tab"
                  href="#seller-information"
                  role="tab"
                  aria-controls="seller-information"
                  aria-selected={
                    this.state.screenName === "assets-detail" ? "true" : "false"
                  }
                >
                  <span className="tabs-text seller-information">
                    {" "}
                    Seller information{" "}
                  </span>{" "}
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => this.changeScreen("additional-information")}
              >
                <a
                  className={
                    this.state.screenName === "additional-information"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="additional-information-tab"
                  data-toggle="tab"
                  href="#additional-information"
                  role="tab"
                  aria-controls="additional-information"
                  aria-selected={
                    this.state.screenName === "assets-detail" ? "true" : "false"
                  }
                >
                  <span className="tabs-text additional-information">
                    {" "}
                    Additional information{" "}
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
                {this.state.screenName === "assets-detail" ? (
                  <React.Fragment>
                    <div className="forms-head clearfix">
                      <h1> Asset Detail </h1>
                    </div>
                    {(this.props.assetsDetailsForm || []).map((item, index) => (
                      <div className="form-main" key={index}>
                        <div className="form-field-row two-col clearfix">
                          <div className="form-field-col">
                            <label> Type of vehicle </label>
                            <Select
                              placeholder="Search Vehicle"
                              id="selectedVehicle"
                              name="selectedVehicle"
                              value={item.selectedVehicle}
                              onChange={(e) => {
                                console.log(e, "selectedVehicle");
                                this.props.changeSelectAssets(
                                  e,
                                  "vehicleType",
                                  "selectedVehicle",
                                  index
                                );
                              }}
                              options={this.props.vehicleOptions}
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
                            <label>Subtype of vehicle</label>
                            <Select
                              placeholder={"Subtype of vehicle"}
                              id="selectedSubTypeOfVehicle"
                              name="selectedSubTypeOfVehicle"
                              value={
                                item?.selectedVehicle?.sub_type_of_vehicle
                                  ?.length > 0
                                  ? item.selectedSubTypeOfVehicle
                                  : ""
                              }
                              onChange={(e) => {
                                console.log(item, "renderOptionSubType");
                                let ob = { value: e.id, label: e.name };
                                this.props.changeSelectAssets(
                                  ob,
                                  "sub_type_of_vehicle",
                                  "selectedSubTypeOfVehicle",
                                  index
                                );
                              }}
                              options={item.selectedVehicle.sub_type_of_vehicle}
                              isSearchable
                              isClearable
                              className="react-select-main"
                              classNamePrefix="react-select"
                              components={{
                                Option: renderOptionSubType,
                                MenuList: renderScrollbarSub,
                              }}
                              captureMenuScroll={false}
                            />
                          </div>
                        </div>
                        {["automotive"].includes(
                          item?.selectedVehicle?.label?.toLowerCase()
                        ) ? (
                          <Automotive
                            item={item}
                            changeSelectAssets={this.props.changeSelectAssets}
                            conditions={this.props.conditions}
                            tradeIns={this.props.tradeIns}
                            handleOnChangeAssets={
                              this.props.handleOnChangeAssets
                            }
                            handleOnBlurStock={this.props.handleOnBlurStock}
                            changeSelect={this.props.changeSelect}
                            index={index}
                            {...this.props}
                          />
                        ) : null}
                        {["marine"].includes(
                          item?.selectedVehicle?.label?.toLowerCase()
                        ) ? (
                          <Marine
                            item={item}
                            changeSelectAssets={this.props.changeSelectAssets}
                            conditions={this.props.conditions}
                            tradeIns={this.props.tradeIns}
                            handleOnChangeAssets={
                              this.props.handleOnChangeAssets
                            }
                            handleOnBlurStock={this.props.handleOnBlurStock}
                            changeSelect={this.props.changeSelect}
                            index={index}
                            {...this.props}
                          />
                        ) : null}
                        {["rv"].includes(
                          item?.selectedVehicle?.label?.toLowerCase()
                        ) ? (
                          <RV
                            item={item}
                            changeSelectAssets={this.props.changeSelectAssets}
                            conditions={this.props.conditions}
                            tradeIns={this.props.tradeIns}
                            handleOnChangeAssets={
                              this.props.handleOnChangeAssets
                            }
                            handleOnBlurStock={this.props.handleOnBlurStock}
                            changeSelect={this.props.changeSelect}
                            index={index}
                            {...this.props}
                          />
                        ) : null}
                        {["powersport"].includes(
                          item?.selectedVehicle?.label?.toLowerCase()
                        ) ? (
                          <PowerSport
                            item={item}
                            changeSelectAssets={this.props.changeSelectAssets}
                            conditions={this.props.conditions}
                            tradeIns={this.props.tradeIns}
                            handleOnChangeAssets={
                              this.props.handleOnChangeAssets
                            }
                            handleOnBlurStock={this.props.handleOnBlurStock}
                            changeSelect={this.props.changeSelect}
                            index={index}
                            {...this.props}
                          />
                        ) : null}
                        {["trailer", "lawn tractor"].includes(
                          item?.selectedVehicle?.label?.toLowerCase()
                        ) ? (
                          <Trailer
                            item={item}
                            changeSelectAssets={this.props.changeSelectAssets}
                            conditions={this.props.conditions}
                            tradeIns={this.props.tradeIns}
                            handleOnChangeAssets={
                              this.props.handleOnChangeAssets
                            }
                            handleOnBlurStock={this.props.handleOnBlurStock}
                            changeSelect={this.props.changeSelect}
                            index={index}
                            {...this.props}
                          />
                        ) : null}
                        {["construction"].includes(
                          item?.selectedVehicle?.label?.toLowerCase()
                        ) ? ( <Construction
                          item={item}
                          changeSelectAssets={this.props.changeSelectAssets}
                          conditions={this.props.conditions}
                          tradeIns={this.props.tradeIns}
                          handleOnChangeAssets={
                            this.props.handleOnChangeAssets
                          }
                          handleOnBlurStock={this.props.handleOnBlurStock}
                          changeSelect={this.props.changeSelect}
                          index={index}
                          {...this.props}
                        />):null}
                        <div className="form-field-row two-col clearfix">
                          <div className="cta m-0 clearfix">
                            {item.stockNumber !== undefined &&
                            item.stockNumber !== null &&
                            item.stockNumber !== "" ? (
                              <Link
                                to={`/ad-post/detail/${item.stockNumber}`}
                                target="_blank"
                              >
                                <button className="btn btn-primary float-left active">
                                  {" "}
                                  View listing{" "}
                                </button>
                              </Link>
                            ) : null}
                            {(this.props.assetsDetailsForm || []).length - 1 ===
                            index ? (
                              <button
                                className="add-another float-right"
                                onClick={this.props.addAssets}
                              >
                                {" "}
                                Add Another{" "}
                              </button>
                            ) : null}

                            {index > 0 ? (
                              this.props.loading_delete_vehicle === true ? (
                                <button className="add-another float-right">
                                  <i
                                    class="fa fa-circle-o-notch fa-spin"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              ) : (
                                <span
                                  className="del"
                                  data-toggle="modal"
                                  data-target="#confirmModelAdmin"
                                  onClick={() =>
                                    this.setState({
                                      ...this.state,
                                      assetIndex: index,
                                      model: "asset",
                                    })
                                  }
                                ></span>
                              )
                            ) : // (<span className="del" onClick={() => this.props.deleteAsset(index)}>
                            // </span>)
                            null}
                          </div>
                        </div>
                      </div>
                    ))}
                    {assetId ? (
                      <React.Fragment>
                        {" "}
                        {/* <div className="upload-doc-content">
                          <UploadImages
                            state={this.props}
                            editListingImages={true}
                            upload_asset_detail_files={
                              this.props.upload_asset_detail_files
                            }
                            assetId={assetId}
                          />
                        </div> */}
                        {/** File Upload */}
                        {/* <div className="upload-doc-content">
                          <strong className="title">
                            {" "}
                            Required documents{" "}
                          </strong>
                          {(this.props.sellerDocuments || []).map(
                            (item, index) => (
                              <div
                                className="upload-doc-box request-box"
                                key={index}
                              >
                                <span className="icon-holder"></span>
                                <div className="text-box">
                                  <h2> {item.name} </h2>
                                  <p> {item.des} </p>
                                  <button className="upload-btn">
                                    <input
                                      type="file"
                                      className="custom-file-input"
                                      name={`doc`}
                                      accept="image/png, image/jpeg, image/jpg,application/pdf, application/docs"
                                      onChange={(e) =>
                                        this.props._handleUploadSellerDocChange(
                                          e,
                                          index,
                                          item.fileName,
                                          assetId
                                        )
                                      }
                                      multiple
                                    />
                                    <span className="text"> Upload </span>
                                  </button>
                                </div>
                              </div>
                            )
                          )}
                        </div> */}
                      </React.Fragment>
                    ) : null}

                    <div class="switch-holder">
                      <input
                        id="swicth"
                        type="checkbox"
                        name="assets_complete"
                        checked={this.props.assets_complete}
                        onChange={(e) =>
                          this.props.changeCompleteStatus(e, "assets_complete")
                        }
                      />
                      <label for="swicth" class="switch">
                        <div></div>
                      </label>
                      <span class="switch-label"> Complete </span>
                    </div>
                    <div className="footer-btns-holder clearfix">
                      {this.props.coApplicant === true ? (
                        <Link to={`${this.props.url}/co-applicant`}>
                          {" "}
                          <button
                            className="btn btn-primary float-left"
                            onClick={() => this.props.onClickChangeStep(3, 2)}
                          >
                            {" "}
                            Back{" "}
                          </button>
                        </Link>
                      ) : (
                        <Link to={`${this.props.url}/applicant-detail`}>
                          {" "}
                          <button
                            className="btn btn-primary float-left"
                            onClick={() => this.props.onClickChangeStep(3, 1)}
                          >
                            {" "}
                            Back{" "}
                          </button>
                        </Link>
                      )}

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
                          onClick={() =>
                            this.update_assets_detail("assets-detail")
                          }
                        >
                          {" "}
                          Continue{" "}
                        </button>
                      )}
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
              <div
                className="tab-pane fade"
                id="seller-information"
                role="tabpanel"
                aria-labelledby="seller-information-tab"
              >
                {this.state.screenName === "seller-information" ? (
                  <React.Fragment>
                    <div className="forms-head clearfix">
                      <h1 className=""> Seller information</h1>
                    </div>
                    <div className="form-main">
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Private Seller </label>
                          <Select
                            required
                            placeholder="Select Seller Type"
                            id="selectedPrivateSeller"
                            name="selectedPrivateSeller"
                            options={this.props.privateSellers}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "privateSeller",
                                "selectedPrivateSeller"
                              )
                            }
                            value={this.props.selectedPrivateSeller}
                            className="react-select-main "
                            classNamePrefix="react-select"
                            components={{
                              Option: renderOption,
                              MenuList: renderScrollbarCondition,
                            }}
                            captureMenuScroll={false}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Seller Type </label>
                          <Select
                            required
                            placeholder="Select Seller Type"
                            id="selectedSellerType"
                            name="selectedSellerType"
                            options={this.props.sellerTypes || []}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "sellerType",
                                "selectedSellerType"
                              )
                            }
                            value={this.props.selectedSellerType}
                            className="react-select-main "
                            classNamePrefix="react-select"
                            components={{
                              Option: renderOption,
                              MenuList: renderScrollbarCondition,
                            }}
                            captureMenuScroll={false}
                          />
                        </div>
                      </div>

                      {/* <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> First Name </label>
                          <input
                            type="text"
                            className="form-control"
                            name="sellerFirstName"
                            placeholder="First Name"
                            value={this.props.sellerFirstName}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Last Name </label>
                          <input
                            type="text"
                            className="form-control"
                            name="sellerLastName"
                            placeholder="Last Name"
                            value={this.props.sellerLastName}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                      </div>
                     */}
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label>
                            {" "}
                            {this.props.sellerType === "dealer"
                              ? "Dealership or Seller Name"
                              :  "Seller Name"}{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name={
                              this.props.sellerType === "dealer"
                                ? "sellerDealerShipName"
                                : "sellerName"
                            }
                            placeholder={
                              this.props.sellerType === "dealer"
                                ? "DealerShip Name"
                                : "Seller Name"
                            }
                            value={
                              this.props.sellerType === "dealer"
                                ? this.props.sellerDealerShipName
                                : this.props.sellerName
                            }
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Email </label>
                          <input
                            type="email"
                            className="form-control"
                            name="sellerEmail"
                            placeholder="Email"
                            value={this.props.sellerEmail}
                            onChange={this.props.sellerEmail}
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Telephone </label>
                          <NumberFormat
                            required
                            className="form-control"
                            format="+1 (###) ###-####"
                            placeholder="+1(123)456-7890"
                            onChange={this.props.handleOnChange}
                            value={this.props.sellerTelephone}
                            name="sellerTelephone"
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Fax </label>
                          <NumberFormat
                            required
                            className="form-control"
                            format="+1 (###) ###-####"
                            placeholder="+1(123)456-7890"
                            onChange={this.props.handleOnChange}
                            value={this.props.sellerFax}
                            name="sellerFax"
                          />
                        </div>
                      </div>
                      <div className="form-field-row clearfix">
                        <div className="form-field-col">
                          <label> Street Address </label>
                          <input
                            type="text"
                            className="form-control"
                            name="sellerLocationName"
                            placeholder="Street Address"
                            value={this.props.sellerLocationName}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> City </label>
                          <input
                            type="text"
                            className="form-control"
                            name="sellerCity"
                            placeholder="City"
                            value={this.props.sellerCity}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Province </label>
                          <Select
                            required
                            placeholder="Select Province"
                            id="selectedSellerProvince"
                            name="selectedSellerProvince"
                            options={this.props.provinces}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "sellerProvince",
                                "selectedSellerProvince"
                              )
                            }
                            value={this.props.selectedSellerProvince}
                            className="react-select-main "
                            classNamePrefix="react-select"
                            components={{
                              Option: renderOption,
                              MenuList: renderScrollbar,
                            }}
                            captureMenuScroll={false}
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Postal Code </label>
                          <MaskedInput
                            mask={[
                              /[a-zA-Z0-9]/i,
                              /[a-zA-Z0-9]/,
                              /[a-zA-Z0-9]/i,
                              " ",
                              /[a-zA-Z0-9]/,
                              /[a-zA-Z0-9]/i,
                              /[a-zA-Z0-9]/,
                            ]}
                            className="form-control"
                            guide={false}
                            placeholder="A2A 2A2"
                            id="sellerPostalCode"
                            name="sellerPostalCode"
                            value={this.props.sellerPostalCode}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Website </label>
                          <input
                            type="text"
                            className="form-control"
                            name="sellerWebsite"
                            placeholder="Website"
                            value={this.props.sellerWebsite}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div class="switch-holder">
                      <input
                        id="swicth"
                        type="checkbox"
                        name="seller_complete"
                        checked={this.props.seller_complete}
                        onChange={(e) =>
                          this.props.changeCompleteStatus(e, "seller_complete")
                        }
                      />
                      <label for="swicth" class="switch">
                        <div></div>
                      </label>
                      <span class="switch-label"> Complete </span>
                    </div>

                    <div className="footer-btns-holder clearfix">
                      <button
                        className="btn btn-primary float-left"
                        onClick={() => this.onBack("assets-detail")}
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
                          onClick={() =>
                            this.update_assets_detail("seller-information")
                          }
                        >
                          {" "}
                          Continue{" "}
                        </button>
                      )}
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
              <div
                className="tab-pane fade"
                id="additional-information"
                role="tabpanel"
                aria-labelledby="additional-information-tab"
              >
                {this.state.screenName === "additional-information" ? (
                  <React.Fragment>
                    <div className="forms-head clearfix">
                      <h1 className="">
                        {" "}
                        Additional Items{" "}
                        <span>
                          {" "}
                          Please enter all applicable third party add-ons that
                          have been included in the loan amount.{" "}
                        </span>{" "}
                      </h1>
                    </div>
                    {(this.props.addtionalInformation || []).map(
                      (item, index) => (
                        <div className="form-main" key={index}>
                          {/* {index > 0 ? <span className="del" onClick={() => this.props.deleteAddtionalInfor(index)}></span> : null} */}
                          {index > 0 ? (
                            <span
                              className="del"
                              data-toggle="modal"
                              data-target="#confirmModelAdmin"
                              onClick={() =>
                                this.setState({
                                  ...this.state,
                                  assetIndex: index,
                                  model: "addtional",
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
                            </div>
                          </div>
                          <div className="form-field-row two-col clearfix">
                            <div className="cta m-0 clearfix">
                              {(this.props.addtionalInformation || []).length -
                                1 ===
                              index ? (
                                <button
                                  className="add-another float-right"
                                  onClick={this.props.addAddtionalInfor}
                                >
                                  {" "}
                                  Add Another{" "}
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    <div class="switch-holder">
                      <input
                        id="swicth"
                        type="checkbox"
                        name="addtional_complete"
                        checked={this.props.addtional_complete}
                        onChange={(e) =>
                          this.props.changeCompleteStatus(
                            e,
                            "addtional_complete"
                          )
                        }
                      />
                      <label for="swicth" class="switch">
                        <div></div>
                      </label>
                      <span class="switch-label"> Complete </span>
                    </div>
                    <div className="footer-btns-holder clearfix">
                      <button
                        className="btn btn-primary float-left"
                        onClick={() => this.onBack("seller-information")}
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
                          onClick={() =>
                            this.update_assets_detail("additional-information")
                          }
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
        {this.state.model === "asset" ? (
          <ConfirmModel
            buttonAction={this.props.deleteAsset}
            id={this.state.assetIndex}
            heading={"Delete Asset?"}
            section1={"Are you sure you want to Delete this Asset?"}
            section2={""}
          />
        ) : null}
        {this.state.model === "addtional" ? (
          <ConfirmModel
            buttonAction={this.props.deleteAddtionalInfor}
            id={this.state.assetIndex}
            heading={"Delete Additional Item?"}
            section1={"Are you sure you want to Delete this Additional Item?"}
            section2={""}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
export default AssetDetail;
