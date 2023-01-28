/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import Select, { components } from "react-select";
import { toastr } from "react-redux-toastr";
import { update_dealer_profile } from "../../../actions/dealer/dealerShipActions";
import { API_URL } from "../../../constant";
import { Scrollbars } from "react-custom-scrollbars";
import MaskedInput from "react-text-mask";

const DealerShipGeneral = (props) => {
  const dispatch = useDispatch();
  const [provinces] = useState([
    { value: "AB", label: "Alberta" },
    { value: "BC", label: "British Columbia" },
    { value: "MB", label: "Manitoba" },
    { value: "NB", label: "New Brunswick" },
    { value: "NL", label: "Newfoundland and Labrador" },
    { value: "NS", label: "Nova Scotia" },
    { value: "ON", label: "Ontario" },
    { value: "PE", label: "Prince Edward Island" },
    { value: "QC", label: "Quebec" },
    { value: "SK", label: "Saskatchewan" },
    { value: "NT", label: "Northwest Territories" },
    { value: "NU", label: "Nunavut" },
    { value: "YT", label: "Yukon" },
  ]);
  const [selectedOwner, setSelectedOwner] = useState(0);
  const {
    name,
    streetAddress,
    postalCode,
    city,
    telephone,
    email,
    website,
    fax,
    dealer_id,
    profile_update_loading,
    firstName,
    photo,
    lastName,
    logo_path,
  } = useSelector(({ dealerAdminReducer }) => {
    return {
      firstName: dealerAdminReducer.dealerShipReducer.firstName,
      lastName: dealerAdminReducer.dealerShipReducer.lastName,
      name: dealerAdminReducer.dealerShipReducer.name,
      streetAddress: dealerAdminReducer.dealerShipReducer.streetAddress,
      postalCode: dealerAdminReducer.dealerShipReducer.postalCode,
      city: dealerAdminReducer.dealerShipReducer.city,
      fax: dealerAdminReducer.dealerShipReducer.fax,
      website: dealerAdminReducer.dealerShipReducer.website,
      telephone: dealerAdminReducer.dealerShipReducer.telephone,
      email: dealerAdminReducer.dealerShipReducer.email,
      dealer_id: dealerAdminReducer.dealerShipReducer.dealer_id,
      photo: dealerAdminReducer.dealerShipReducer.photo,
      logo_path: dealerAdminReducer.dealerShipReducer.logo_path,
      profile_update_loading:
        dealerAdminReducer.dealerShipReducer.profile_update_loading,
    };
  });

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
      // if (file.size > (2 * 1024 * 1024)) {
      //     toastr.error('Error', "Please upload a file smaller than 2 MB")
      //     return false;
      // }
      const name = e.target.name;
      const previewName = e.target.name + "Preview";
      setState({
        ...state,
        [name]: file,
        [previewName]: URL.createObjectURL(file),
      });
    }
  };
  const handleChangeOwnerProvince = (e, ownerIndex, formName, name) => {
    setState(
      state.slice().map((item, index) => {
        if (index === ownerIndex) {
          return {
            ...item,
            [name]: e,
            [formName]: e
              ? e.value !== undefined && e.value !== null
                ? e.value
                : ""
              : "",
          };
        }
        return item;
      })
    );
  };
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
  const handleOnChange = (e, index) => {
    if (
      e.target.name === "percentage_of_ownership" &&
      Number(e.target.value.toString().split("%").join("")) > 100
    ) {
      alert("sa");
      setState((prevState) =>
        prevState.slice().map((item, ownerIndex) => {
          if (ownerIndex === index) {
            return {
              ...item,
              percentage_of_ownership: item.percentage_of_ownership,
            };
          }
          return item;
        })
      );
    } else {
      setState(
        state.map((ite, iteIndex) => {
          if (iteIndex === index) {
            return {
              ...ite,
              [e.target.name]: e.target.value,
            };
          }
          return ite;
        })
      );
    }
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
    formData.append("email", state.email);
    state.photo?.name && formData.append("photo", state.photo);
    state.logo_path?.name && formData.append("logo_path", state.logo_path);
    dispatch(update_dealer_profile(formData, dealer_id));
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
                <div className="row">
                  {getImage(photo, state.photoPreview) && (
                    <div class="col-md-12">
                      <i
                        class="bi bi-x"
                        style={{
                          width: "25px",
                          height: "25px",
                          float: "right",
                        }}
                        onClick={() => removeImage("photo")}
                      ></i>
                    </div>
                  )}
                  <div class="col-md-12">
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
                      {/* <i class="fa fa-cloud-upload"></i> */}
                      <img src="/assets/image/fa-cloud-upload.svg" />
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
                <div className="row">
                  {getImage(logo_path, state.logo_pathPreview) && (
                    <div class="col-md-12">
                      <i
                        class="bi bi-x"
                        style={{
                          width: "25px",
                          height: "25px",
                          float: "right",
                        }}
                        onClick={() => removeImage("logo_path")}
                      ></i>
                    </div>
                  )}
                  <div class="col-md-12">
                    <div class="text-center">
                      {getImage(logo_path, state.logo_pathPreview) ? (
                        <img
                          src={getImage(logo_path, state.logo_pathPreview)}
                          class="rounded-circle"
                          alt=""
                          style={{ height: "100px", width: "100px" }}
                        />
                      ) : null}
                    </div>
                  </div>
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
                      {/* <i class="fa fa-cloud-upload"></i> */}
                      <img src="/assets/image/fa-cloud-upload.svg" />
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
                    onChange={(e) =>
                      setState({ ...state, [e.target.name]: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>

          {/* 1  */}

          <div class="col-12">
            <div class="row my-4">
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
                    onChange={(e) =>
                      setState({ ...state, [e.target.name]: e.target.value })
                    }
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
                    onChange={(e) =>
                      setState({ ...state, [e.target.name]: e.target.value })
                    }
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
                    onChange={(e) =>
                      setState({ ...state, [e.target.name]: e.target.value })
                    }
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
                    onChange={(e) =>
                      setState({ ...state, [e.target.name]: e.target.value })
                    }
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
                    onChange={(e) =>
                      setState({ ...state, [e.target.name]: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>

          {/* 6 */}

          <div class="col-12">
            <div className="row my-4">
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
                    options={provinces}
                    onChange={(e) =>
                      handleChangeOwnerProvince(
                        e,
                        selectedOwner,
                        "province",
                        "selectProvince"
                      )
                    }
                    value={state[selectedOwner]?.selectProvince}
                    className="react-select-main"
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
                    id="postal_code"
                    name="postal_code"
                    value={state[selectedOwner]?.postal_code}
                    onChange={(e) => handleOnChange(e, selectedOwner)}
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>
          {/* <div className="col-md-2">
                <div className="form-field-col">
                  <MaskedInput
                    mask={[/[a-zA-Z0-9]/i, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/i, ' ', /[a-zA-Z0-9]/, /[a-zA-Z0-9]/i, /[a-zA-Z0-9]/]}
                    className="form-control mask__input_zip"
                    guide={false}
                    placeholder='A2A 2A2'
                    id="postal_code" name='postal_code'
                    value={state[selectedOwner]?.postal_code}
                    onChange={(e) => handleOnChange(e, selectedOwner)}
                  />
                </div>
              </div> */}

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
                    onChange={(e) =>
                      setState({ ...state, [e.target.name]: e.target.value })
                    }
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
                  disabled={profile_update_loading}
                >
                  {profile_update_loading ? (
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
