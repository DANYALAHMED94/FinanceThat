/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import MaskedInput from "react-text-mask";
import { useDispatch, useSelector } from "react-redux";
import { update_dealer_profile } from "../../../actions/dealer/dealerShipActions";

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
const DealerOwners = (props) => {
  const dispatch = useDispatch();
  const { owners, dealer_id, profile_update_loading } = useSelector(
    ({ dealerAdminReducer }) => {
      return {
        owners: dealerAdminReducer.dealerShipReducer.owners,
        dealer_id: dealerAdminReducer.dealerShipReducer.dealer_id,
        profile_update_loading:
          dealerAdminReducer.dealerShipReducer.profile_update_loading,
      };
    }
  );
  const [state, setState] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(0);
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
  useEffect(() => {
    if (owners && owners.length !== 0) {
      let ownersData = [];
      (owners || []).map((item) => {
        ownersData.push({
          ...item,
          selectProvince: provinces.find((ite) => ite.value === item.province),
        });
      });
      for (let i = owners.length; i <= 5; i++) {
        ownersData.push({
          city: "",
          date_of_birth: "",
          email: "",
          first_name: "",
          full_address: "",
          last_name: "",
          percentage_of_ownership: "",
          postal_code: "",
          province: "",
          telephone: "",
          selectProvince: "",
        });
      }

      setState(ownersData);
    } else {
      for (let item in [1, 2, 3, 4, 5, 6]) {
        setState([
          ...state,
          {
            city: "",
            date_of_birth: "",
            email: "",
            first_name: "",
            full_address: "",
            last_name: "",
            percentage_of_ownership: "",
            postal_code: "",
            province: "",
            telephone: "",
            selectProvince: "",
          },
        ]);
      }
    }
  }, [owners]);
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
  const saveOwners = () => {
    var formData = new FormData();
    const owners = state.filter(
      (item) =>
        item.city ||
        item.date_of_birth ||
        item.email ||
        item.first_name ||
        item.full_address ||
        item.last_name ||
        item.percentage_of_ownership ||
        item.postal_code ||
        item.province ||
        item.telephone ||
        item.selectProvince
    );
    formData.append("dealer_owners", JSON.stringify(owners));
    formData.append("no_of_owner", (owners || []).length);
    dispatch(update_dealer_profile(formData, dealer_id));
  };
  function getOwnerDetailBoolean(index) {
    return (
      state[index]?.city ||
      state[index]?.date_of_birth ||
      state[index]?.email ||
      state[index]?.first_name ||
      state[index]?.full_address ||
      state[index]?.last_name ||
      state[index]?.percentage_of_ownership ||
      state[index]?.postal_code ||
      state[index]?.province ||
      state[index]?.telephone ||
      state[index]?.selectProvince ||
      false
    );
  }
  return (
    <React.Fragment>
      <div className="Altable-Container">
        <div className="Dealer-dtable">
          <nav>
            <div className="owner nav nav-tabs " id="nav-tab" role="tablist">
              <button
                className={`nav-link btnA ${
                  selectedOwner === 0
                    ? "active"
                    : getOwnerDetailBoolean(0)
                    ? "complete"
                    : ""
                }`}
                id="nav-OwnerFirst-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-OwnerFirst"
                type="button"
                role="tab"
                aria-controls="nav-OwnerFirst"
                aria-selected="true"
                onClick={() => setSelectedOwner(0)}
              >
                1st Owner
              </button>
              <button
                className={`nav-link btnB ${
                  selectedOwner === 1
                    ? "active"
                    : getOwnerDetailBoolean(1)
                    ? "complete"
                    : ""
                }`}
                id="nav-Owner-tab"
                data-bs-toggle="tab"
                data-bs-target=""
                type="button"
                role="tab"
                aria-controls="nav-Owner"
                aria-selected="false"
                onClick={() => setSelectedOwner(1)}
              >
                2nd owner
              </button>
              <button
                className={`nav-link btnC ${
                  selectedOwner === 2
                    ? "active"
                    : getOwnerDetailBoolean(2)
                    ? "complete"
                    : ""
                }`}
                id="nav-Documents-tab"
                data-bs-toggle="tab"
                data-bs-target=""
                type="button"
                role="tab"
                aria-controls="nav-Documents"
                aria-selected="false"
                onClick={() => setSelectedOwner(2)}
              >
                3rd owner
              </button>
              <button
                className={`nav-link btnD ${
                  selectedOwner === 3
                    ? "active"
                    : getOwnerDetailBoolean(3)
                    ? "complete"
                    : ""
                }`}
                id="nav-Vehicles-tab"
                data-bs-toggle="tab"
                data-bs-target=""
                type="button"
                role="tab"
                aria-controls="nav-Vehicles"
                aria-selected="false"
                onClick={() => setSelectedOwner(3)}
              >
                4th owner
              </button>
              <button
                className={`nav-link btnE ${
                  selectedOwner === 4
                    ? "active"
                    : getOwnerDetailBoolean(4)
                    ? "complete"
                    : ""
                }`}
                id="nav-Locations-tab"
                data-bs-toggle="tab"
                data-bs-target=""
                type="button"
                role="tab"
                aria-controls="nav-Locations"
                aria-selected="false"
                onClick={() => setSelectedOwner(4)}
              >
                5th owner
              </button>
              <button
                className={`nav-link btnF ${
                  selectedOwner === 5
                    ? "active"
                    : getOwnerDetailBoolean(5)
                    ? "complete"
                    : ""
                }`}
                id="nav-AdminFee-tab"
                data-bs-toggle="tab"
                data-bs-target=""
                type="button"
                role="tab"
                aria-controls="nav-AdminFee"
                aria-selected="false"
                onClick={() => setSelectedOwner(5)}
              >
                6th owner
              </button>
            </div>
          </nav>
          <div className="col-12">
            <h5 className="lh-lg mt-3 mb-5">
              {selectedOwner + 1 === 1
                ? "1st"
                : selectedOwner + 1 === 2
                ? "2nd"
                : selectedOwner + 1 === 3
                ? "3rd"
                : selectedOwner + 1 === 4
                ? "4th"
                : selectedOwner + 1 === 5
                ? "5th"
                : selectedOwner + 1 === 6
                ? "6th"
                : null}{" "}
              Owner Information
            </h5>
            <hr></hr>
          </div>
          <div className="col-12">
            <div className="row my-4">
              <div className="col-md-4">
                <label> Name </label>
              </div>
              <div className="col-md-3">
                <div className="form-field-col">
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    placeholder="John"
                    value={state[selectedOwner]?.first_name}
                    onChange={(e) => handleOnChange(e, selectedOwner)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-field-col">
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    placeholder="Doe"
                    value={state[selectedOwner]?.last_name}
                    onChange={(e) => handleOnChange(e, selectedOwner)}
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>
          {/* 3 */}
          <div className="col-12">
            <div className="row my-4 ">
              <div className="col-md-4">
                <label> Email address </label>
              </div>
              <div className="col-md-6">
                <div className="form-field-col">
                  <input
                    className="form-control"
                    type="email"
                    id="Email"
                    name="email"
                    placeholder="Email"
                    value={state[selectedOwner]?.email}
                    onChange={(e) => handleOnChange(e, selectedOwner)}
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>
          {/* 1  */}
          <div className="col-12">
            <div className="row my-4">
              <div className="col-md-4">
                <label> Telephone </label>
              </div>
              <div className="col-md-6">
                <div className="form-field-col">
                  <NumberFormat
                    required
                    className="form-control"
                    format="+1 (###) ###-####"
                    placeholder="+1 (123) 456-7890"
                    value={state[selectedOwner]?.telephone}
                    onChange={(e) => handleOnChange(e, selectedOwner)}
                    name="telephone"
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>
          {/* 4 */}
          <div className="col-12">
            <div className="row my-4">
              <div className="col-md-4">
                <label> Street address </label>
              </div>
              <div className="col-md-6">
                <div className="form-field-col">
                  <input
                    type="text"
                    className="form-control"
                    name="full_address"
                    placeholder="Street address"
                    value={state[selectedOwner]?.full_address}
                    onChange={(e) => handleOnChange(e, selectedOwner)}
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>
          {/* 5 */}
          <div className="col-12">
            <div className="row my-4">
              <div className="col-md-4">
                <label> City </label>
              </div>
              <div className="col-md-6">
                <div className="form-field-col">
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    placeholder="City"
                    value={state[selectedOwner]?.city}
                    onChange={(e) => handleOnChange(e, selectedOwner)}
                  />
                </div>
              </div>
            </div>
            <hr></hr>
          </div>
          {/* 6 */}
          <div className="col-12">
            <div className="row my-4">
              <div className="col-md-4">
                <label> Province / Postal Code</label>
              </div>
              <div className="col-md-4">
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
          {/* 7 */}
          <div className="col-12">
            <div className="row my-4">
              <div className="col-md-4">
                <label> Percentage of ownership </label>
              </div>
              <div className="col-md-6">
                <div className="form-field-col">
                  <NumberFormat
                    className="form-control"
                    suffix={"%"}
                    placeholder="100%"
                    value={state[selectedOwner]?.percentage_of_ownership}
                    onChange={(e) => handleOnChange(e, selectedOwner)}
                    name="percentage_of_ownership"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row my-4">
              <div className="Dealerfoobtn float-end my-3">
                <button
                  className="btn btn-primary float-right active"
                  onClick={saveOwners}
                  disabled={profile_update_loading}
                >
                  {profile_update_loading ? (
                    <i
                      className="fa fa-circle-o-notch fa-spin"
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
export default DealerOwners;
