/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import {
  update_dealer_profile,
  get_dealer_credit_score,
} from "../../../../actions/admin/accountActions";
import { API_URL } from "../../../../constant";
import { Provinces } from "../../../../_constants/Provinces";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import MaskedInput from "react-text-mask";

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

const DealerShipGeneral = (props) => {
  const dispatch = useDispatch();
  const {
    name,
    streetAddress,
    postalCode,
    city,
    telephone,
    email,
    website,
    fax,
    user_id,
    loading_dealer_detail,
    firstName,
    photo,
    lastName,
    logo_path,
    dealer_id,
    province,
  } = useSelector(({ adminReducer }) => {
    return {
      dealer_id:
        adminReducer.adminAccounts.pendingAccountReducer.get_user_profile.id,
      firstName: adminReducer.adminAccounts.pendingAccountReducer.firstName,
      lastName: adminReducer.adminAccounts.pendingAccountReducer.lastName,
      name: adminReducer.adminAccounts.pendingAccountReducer.name,
      streetAddress:
        adminReducer.adminAccounts.pendingAccountReducer.streetAddress,
      postalCode: adminReducer.adminAccounts.pendingAccountReducer.postalCode,
      city: adminReducer.adminAccounts.pendingAccountReducer.city,
      fax: adminReducer.adminAccounts.pendingAccountReducer.fax,
      website: adminReducer.adminAccounts.pendingAccountReducer.website,
      telephone: adminReducer.adminAccounts.pendingAccountReducer.telephone,
      email: adminReducer.adminAccounts.pendingAccountReducer.email,
      user_id: adminReducer.adminAccounts.pendingAccountReducer.dealer_id,
      photo: adminReducer.adminAccounts.pendingAccountReducer.photo,
      logo_path: adminReducer.adminAccounts.pendingAccountReducer.logo_path,
      province: adminReducer.adminAccounts.pendingAccountReducer.province,
      loading_dealer_detail:
        adminReducer.adminAccounts.pendingAccountReducer.loading_dealer_detail,
    };
  });

  useEffect(() => {
    if (dealer_id) {
      dispatch(get_dealer_credit_score(dealer_id));
    }
  }, [dealer_id]);

  const [state, setState] = useState({
    dealershipname: "",
    telephone: "",
    fax: "",
    email: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    website: "",
    photo: "",
    logo_path: "",
    photoPreview: "",
    logo_pathPreview: "",
    province: "",
    selectProvince: "",
  });
  useEffect(() => {
    setState({
      ...state,
      dealershipname: name,
      telephone: (telephone !== undefined && telephone !== null) ? telephone?.length === 11 ? telephone?.slice(-10): telephone?.replace("+1", "").trim(): "",
      fax: fax,
      email: email,
      streetAddress: streetAddress,
      city: city,
      postalCode: postalCode,
      website: website,
      photo: photo,
      logo_path: logo_path,
      photoPreview: "",
      logo_pathPreview: "",
      province: province,
      selectProvince: Provinces.find((ite) => ite.value === province),
    });
  }, [name]);

  const _handleImageChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg"
      ) {
        toastr.error(
          "Error",
          "File does not support. You must use.png, jpeg or .jpg "
        );
        return false;
      }
      const name = e.target.name;
      const previewName = e.target.name + "Preview";
      setState({
        ...state,
        [name]: file,
        [previewName]: URL.createObjectURL(file),
      });
    }
    props.goToNext(true);
  };
  const update_dealer_general = () => {
    var formData = new FormData();
    formData.append("operating_name", state.dealershipname);
    formData.append("street_address", state.streetAddress);
    formData.append("postal_code", state.postalCode);
    formData.append("city", state.city);
    formData.append("phone", state.telephone);
    formData.append("fax", state.fax);
    formData.append("province", state.province);
    formData.append("website", state.website);
    state.photo?.name && formData.append("photo", state.photo);
    state.logo_path?.name && formData.append("logo_path", state.logo_path);
    dispatch(update_dealer_profile(formData, user_id));
    props.goToNext(false);
  };
  let first =
    firstName !== undefined && firstName !== null && firstName !== ""
      ? firstName
      : "";
  let last =
    lastName !== undefined && lastName !== null && lastName !== ""
      ? lastName
      : "";
  first = first ? first.charAt(0).toUpperCase() : "";
  last = last ? last.charAt(0).toUpperCase() : "";

  const removeImage = (name) => {
    const previewName = name + "Preview";
    setState({
      ...state,
      [name]: "",
      [previewName]: "",
    });
  };

  function getImage(img, preview) {
    let filePath = "";
    if (preview) {
      return (filePath = preview);
    } else if (img) {
      return API_URL + img;
    } else {
      return (filePath = "");
    }
  }
  return (
    <React.Fragment>
      <div className="Altable-Container">
        <div className="Dealer-dtable">
          <div class="col-12">
            <h5 className="lh-lg mt-3 mb-5">Dealership General Information</h5>
            <hr></hr>
          </div>

          <div class="col-12">
            <div class="row my-5">
              <div className="col-md-3">
                <p className="mt-3">Your photo</p>
                <p style={{ color: "#acacac", fontSize: "14px" }}>
                  This will be displayed on your profile
                </p>
              </div>
              <div className="col-md-2">
                {getImage(photo, state.photoPreview) && (
                  <div class="col-md-12">
                    <i
                      class="bi bi-x"
                      style={{ width: "25px", height: "25px", float: "right" }}
                      onClick={() => removeImage("photo")}
                    ></i>
                  </div>
                )}
                <div class="text-center">
                  {!getImage(photo, state.photoPreview) ? (
                    <span className="avatar"> {`${first}${last}`} </span>
                  ) : (
                    <img
                      src={getImage(photo, state.photoPreview)}
                      class="rounded-circle"
                      alt=""
                      style={{ height: "100px", width: "100px" }}
                    />
                  )}
                </div>
              </div>
              <div className="col-md-5">
                <div class="upload">
                  <div class="wrapper">
                    <form action="#">
                      <input
                        class="file-input"
                        type="file"
                        name="photo"
                        onChange={_handleImageChange}
                        style={{
                          opacity: "0",
                          width: "93%",
                          height: "160px",
                          position: "absolute",
                          cursor: "pointer",
                        }}
                      />
                      <i class="fa fa-cloud-upload"></i>
                      <p style={{ color: "#83879A" }}>
                        <b style={{ color: "#FB5100" }}>Click to upload </b> or
                        drag and drop <br />
                        PNG, JPEG, JPG or GIF (recommended size 500 x 500px)
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
          </div>

          <div class="col-12">
            <div class="row my-5">
              <div className="col-md-3">
                <p className="mt-3">Banner</p>
                <p style={{ color: "#acacac", fontSize: "14px" }}>
                  This will be displayed on dealer page
                </p>
              </div>
              <div className="col-md-2">
                {getImage(logo_path, state.logo_pathPreview) && (
                  <div class="col-md-12">
                    <i
                      class="bi bi-x"
                      style={{ width: "25px", height: "25px", float: "right" }}
                      onClick={() => removeImage("logo_path")}
                    ></i>
                  </div>
                )}
                <div class="text-center">
                  {getImage(logo_path, state.logo_pathPreview) && (
                    <img
                      src={getImage(logo_path, state.logo_pathPreview)}
                      class="rounded-circle"
                      alt=""
                      style={{ height: "100px", width: "100px" }}
                    />
                  )}
                </div>
              </div>
              <div className="col-md-5">
                <div class="upload">
                  <div class="wrapper">
                    <form action="#">
                      <input
                        class="file-input"
                        type="file"
                        name="logo_path"
                        onChange={_handleImageChange}
                        style={{
                          opacity: "0",
                          width: "93%",
                          height: "160px",
                          position: "absolute",
                          cursor: "pointer",
                        }}
                      />
                      <i class="fa fa-cloud-upload"></i>
                      <p style={{ color: "#83879A" }}>
                        <b style={{ color: "#FB5100" }}>Click to upload </b> or
                        drag and drop <br />
                        PNG, JPEG, JPG or GIF (recommended size 500 x 500px)
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
          </div>

          <div class="col-12">
            <div class="row my-4">
              <div className="col-md-4">
                <label> Dealership name </label>
              </div>
              <div className="col-md-7">
                <div className="form-field-col">
                  <input
                    type="text"
                    className="form-control"
                    name="dealershipname"
                    placeholder="Dealership name"
                    value={state.dealershipname}
                    onChange={(e) => {
                      setState({ ...state, [e.target.name]: e.target.value });
                      props.goToNext(true);
                    }}
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>

          {/* 1  */}

          <div class="col-12">
            <div class="row my-4 ">
              <div className="col-md-4">
                <label> Telephone </label>
              </div>
              <div className="col-md-7">
                <div className="form-field-col">
                  <NumberFormat
                    required
                    className="form-control"
                    format="+1 (###) ###-####"
                    placeholder="+1 (123) 456-7890"
                    onChange={(e) => {
                      setState({ ...state, [e.target.name]: e.target.value });
                      props.goToNext(true);
                    }}
                    value={state.telephone}
                    name="telephone"
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>

          {/* 2  */}

          <div class="col-12">
            <div class="row my-4">
              <div className="col-md-4">
                <label> Fax </label>
              </div>
              <div className="col-md-7">
                <div className="form-field-col">
                  <NumberFormat
                    required
                    className="form-control"
                    format="+1 (###) ###-####"
                    placeholder="+1 (123) 456-7890"
                    onChange={(e) => {
                      setState({ ...state, [e.target.name]: e.target.value });

                      props.goToNext(true);
                    }}
                    value={state.fax}
                    name="fax"
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>

          {/* 3 */}

          <div class="col-12">
            <div class="row my-4">
              <div className="col-md-4">
                <label> Email address </label>
              </div>
              <div className="col-md-7">
                <div className="form-field-col">
                  <input
                    className="form-control"
                    type="email"
                    id="Email"
                    name="email"
                    placeholder=""
                    value={state.email}
                    disabled
                    onChange={(e) => {
                      setState({ ...state, [e.target.name]: e.target.value });
                      props.goToNext(true);
                    }}
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>

          {/* 4 */}

          <div class="col-12">
            <div class="row my-4">
              <div className="col-md-4">
                <label> Street address </label>
              </div>
              <div className="col-md-7">
                <div className="form-field-col">
                  <input
                    type="text"
                    className="form-control"
                    name="streetAddress"
                    placeholder="Street address"
                    value={state.streetAddress}
                    onChange={(e) => {
                      setState({ ...state, [e.target.name]: e.target.value });
                      props.goToNext(true);
                    }}
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>

          {/* 5 */}

          <div class="col-12">
            <div class="row my-4">
              <div className="col-md-4">
                <label> City </label>
              </div>
              <div className="col-md-7">
                <div className="form-field-col">
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    placeholder="City"
                    value={state.city}
                    onChange={(e) => {
                      setState({ ...state, [e.target.name]: e.target.value });
                      props.goToNext(true);
                    }}
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>

          {/* 6 */}

          <div class="col-12">
            <div class="row my-4">
              <div className="col-md-4">
                <label> Province / Postal Code</label>
              </div>
              <div className="col-md-5">
                <div className="form-field-col">
                  <Select
                    required
                    placeholder="Select Province"
                    id="selectProvince"
                    name="selectProvince"
                    options={Provinces}
                    onChange={(e) => {
                      setState({
                        ...state,
                        selectProvince: e,
                        province: e
                          ? e.value !== undefined && e.value !== null
                            ? e.value
                            : ""
                          : "",
                      });
                      props.goToNext(true);
                    }}
                    value={state.selectProvince}
                    className="react-select-main jokee"
                    classNamePrefix="react-select"
                    components={{
                      Option: renderOption,
                      MenuList: renderScrollbar,
                    }}
                  />
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-field-col">
                  <MaskedInput
                    style={{ height: "48px", borderRadious: "10px" }}
                    mask={[
                      /[a-zA-Z0-9]/i,
                      /[a-zA-Z0-9]/,
                      /[a-zA-Z0-9]/i,
                      " ",
                      /[a-zA-Z0-9]/,
                      /[a-zA-Z0-9]/i,
                      /[a-zA-Z0-9]/,
                    ]}
                    className="form-control mask__input_zip"
                    guide={false}
                    placeholder="A2A 2A2"
                    id="postalCode"
                    name="postalCode"
                    value={state.postalCode}
                    onChange={(e) => {
                      setState({ ...state, [e.target.name]: e.target.value });
                      props.goToNext(true);
                    }}
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>

          {/* 7 */}

          <div class="col-12">
            <div class="row my-4">
              <div className="col-md-4">
                <label> Website url </label>
              </div>
              <div className="col-md-7">
                <div className="form-field-col">
                  <input
                    type="text"
                    className="form-control"
                    name="website"
                    placeholder="Website url"
                    value={state.website}
                    onChange={(e) => {
                      setState({ ...state, [e.target.name]: e.target.value });
                      props.goToNext(true);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="row my-4">
              <div class="Dealerfoobtn float-end my-3">
                <button
                  className="btn btn-primary float-right active"
                  onClick={update_dealer_general}
                  disabled={loading_dealer_detail}
                >
                  {loading_dealer_detail ? (
                    <i
                      class="fa fa-circle-o-notch fa-spin"
                      aria-hidden="true"
                    ></i>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default DealerShipGeneral;
