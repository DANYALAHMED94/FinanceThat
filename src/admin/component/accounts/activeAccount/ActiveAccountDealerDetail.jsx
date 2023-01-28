import React, { useEffect, useState } from "react";
import moment from "moment";
import MaskedInput from "react-text-mask";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from "dateformat";
import { capitalize, capsProvince } from "./../../../../_helpers/capitalize";
// dateFormat(this.state.applicantDateOfBirth, 'yyyy-mm-dd'),
const ActiveAccountDealerDetail = (props) => {
  const [state, setState] = useState([
    {
      update: "dealerowner_details",
      id: "",
      first_name: "",
      last_name: "",
      full_address: "",
      city: "",
      province: "",
      postal_code: "",
      telephone: "",
      date_of_birth: "",
      percentage_of_ownership: "",
      dealer_id: "",
    },
  ]);
  const [edit, setEdit] = useState(false);
  const provinces = [
    { name: "Alberta", value: "AB" },
    { name: "British Columbia", value: "BC" },
    { name: "Manitoba", value: "MB" },
    { name: "New Brunswick", value: "NB" },
    { name: "Newfoundland and Labrador", value: "NL" },
    { name: "Nova Scotia", value: "NS" },
    { name: "Ontario", value: "ON" },
    { name: "Prince Edward Island", value: "PE" },
    { name: "Quebec", value: "QC" },
    { name: "Saskatchewan", value: "SK" },
    { name: "Northwest Territories", value: "NT" },
    { name: "Nunavut", value: "NU" },
    { name: "Yukon", value: "YT" },
  ];
  const years = range(1900, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    if (
      props.update_account_row !== undefined &&
      props.update_account_row !== null
    ) {
      const data = [];
      (props.update_account_row || []).map((item) =>
        item.dealerdetail_id !== undefined &&
        item.dealerdetail_id !== null &&
        item.dealerdetail_id.length > 0
          ? item.dealerdetail_id.map((dealer, index) => {
              data.push({
                id: dealer.id || "",
                first_name: dealer.first_name || "",
                last_name: dealer.last_name || "",
                full_address: dealer.full_address || "",
                city: dealer.city || "",
                province: dealer.province || "",
                postal_code: dealer.postal_code || "",
                telephone: dealer.telephone || "",
                date_of_birth: dealer.date_of_birth || "",
                percentage_of_ownership: dealer.percentage_of_ownership || "",
                dealer_id: dealer.dealer_id || "",
              });
            })
          : [
              {
                id: "",
                first_name: "",
                last_name: "",
                full_address: "",
                city: "",
                province: "",
                postal_code: "",
                telephone: "",
                date_of_birth: "",
                percentage_of_ownership: "",
                dealer_id: "",
              },
            ]
      );
      setState(data);
    }
  }, [props.update_account_row]);
  useEffect(() => {
    if (
      props.loading_dealer_detail !== undefined &&
      props.loading_dealer_detail !== null &&
      props.loading_dealer_detail === false
    ) {
      setEdit(false);
    }
  }, [props.loading_dealer_detail]);
  const handleOnChange = (e, index) => {
    console.log(index);
    const { name, value } = e.target;
    setState(
      state.slice().map((item, stateIndex) => {
        if (Number(index) === Number(stateIndex)) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      })
    );
  };
  const handleOnChangeDate = (e, index) => {
    console.log(index);
    setState(
      state.slice().map((item, stateIndex) => {
        if (Number(index) === Number(stateIndex)) {
          return {
            ...item,
            date_of_birth: e,
          };
        }
        return item;
      })
    );
  };
  const editOwner = () => {
    const dealer_owners = state.map((item) => {
      return {
        ...item,
        date_of_birth:
          item.date_of_birth !== undefined &&
          item.date_of_birth !== null &&
          item.date_of_birth !== ""
            ? dateFormat(item.date_of_birth, "yyyy-mm-dd")
            : "",
      };
    });
    const data = {
      update: "dealerowner_details",
      dealer_owners: dealer_owners,
    };
    props.update_dealer_detail(data);
    console.log(data);
  };
  return (
    <React.Fragment>
      <div className="PrimeOwner-Head">
        <div className="OwnerLeft clearfix float-none">
          <h1 className="float-left">Principle/Owner list</h1>
          {edit === true ? (
            <button
              type="button"
              className="newbtn-add btn btn-primary edit-btn float-right"
              disabled={!edit}
              onClick={editOwner}
            >
              {" "}
              {props.loading_dealer_detail === true ? (
                <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
              ) : (
                "Update"
              )}{" "}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary update-btn float-right ml-2"
              onClick={() => setEdit(!edit)}
            >
              <img src="/assets/image/icon-edit.svg" alt="" />
            </button>
          )}
        </div>
      </div>

      <div className="Altable-Container">
        {/* <div className="Admin-dtable dt-holder" style={{ overflowX: 'scroll' }}> */}
        <div className="PrimeOwner-Table dt-holder">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Street Address</th>
                <th>City</th>
                <th>Province</th>
                <th>Postal Code</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>% of Ownership</th>
              </tr>
            </thead>
            <tbody>
              {(state || []).map((item, index) => (
                <tr>
                  <td>
                    <span>
                      {props.loading === true ? (
                        <i
                          class="fa fa-circle-o-notch fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : edit === true ? (
                        <input
                          type="text"
                          name="first_name"
                          value={item.first_name}
                          onChange={(e) => handleOnChange(e, index)}
                        />
                      ) : (
                        item.first_name
                      )}
                    </span>
                  </td>
                  <td>
                    <span>
                      {props.loading === true ? (
                        <i
                          class="fa fa-circle-o-notch fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : edit === true ? (
                        <input
                          type="text"
                          name="last_name"
                          value={item.last_name}
                          onChange={(e) => handleOnChange(e, index)}
                        />
                      ) : (
                        item.last_name
                      )}
                    </span>
                  </td>
                  <td>
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
                      <input
                        type="text"
                        name="full_address"
                        value={item.full_address}
                        onChange={(e) => handleOnChange(e, index)}
                      />
                    ) : (
                      item.full_address
                    )}
                  </td>
                  <td>
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
                      <input
                        type="text"
                        name="city"
                        value={capitalize(item.city)}
                        onChange={(e) => handleOnChange(e, index)}
                      />
                    ) : (
                      capitalize(item.city)
                    )}
                  </td>
                  <td>
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
                      <select
                        name="province"
                        onChange={(e) => handleOnChange(e, index)}
                        value={capsProvince(item.province)}
                      >
                        <option value={""}>Select</option>
                        {provinces.map((prov) => (
                          <option value={prov.value}>{prov.name}</option>
                        ))}
                        )
                      </select>
                    ) : (
                      item.province
                    )}
                  </td>

                  <td>
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
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
                        guide={false}
                        placeholder="A2A 2A2"
                        id="postal_code"
                        name="postal_code"
                        value={item.postal_code}
                        onChange={(e) => handleOnChange(e, index)}
                      />
                    ) : (
                      item.postal_code
                    )}
                  </td>
                  <td>
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
                      <input
                        type="text"
                        name="telephone"
                        value={item.telephone}
                        onChange={(e) => handleOnChange(e, index)}
                      />
                    ) : (
                      item.telephone
                    )}
                  </td>
                  <td>
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
                      <DatePicker
                        renderCustomHeader={({
                          date,
                          changeYear,
                          changeMonth,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled,
                        }) => (
                          <div
                            style={{
                              margin: 10,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              onClick={decreaseMonth}
                              disabled={prevMonthButtonDisabled}
                              type="button"
                            >
                              {"<"}
                            </button>
                            <select
                              value={getYear(date)}
                              onChange={({ target: { value } }) =>
                                changeYear(value)
                              }
                            >
                              {years.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                            <select
                              value={months[getMonth(date)]}
                              onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                              }
                            >
                              {months.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={increaseMonth}
                              disabled={nextMonthButtonDisabled}
                              type="button"
                            >
                              {">"}
                            </button>
                          </div>
                        )}
                        selected={item.date_of_birth}
                        placeholderText="YYYY-MM-DD"
                        dateFormat="yyyy-MM-dd"
                        name="date_of_birth"
                        onChange={(e) => handleOnChangeDate(e, index)}
                        maxDate={new Date()}
                      />
                    ) : item.date_of_birth !== undefined &&
                      item.date_of_birth !== null &&
                      item.date_of_birth !== "" ? (
                      moment(item.date_of_birth).format("yyyy-MM-DD")
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
                      <input
                        type="text"
                        name="percentage_of_ownership"
                        value={item.percentage_of_ownership}
                        onChange={(e) => handleOnChange(e, index)}
                      />
                    ) : (
                      item.percentage_of_ownership
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ActiveAccountDealerDetail;
