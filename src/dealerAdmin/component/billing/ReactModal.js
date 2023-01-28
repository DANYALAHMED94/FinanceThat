import React, { useState, useCallback, useEffect } from "react";
import { Modal } from "react-bootstrap";
import InputTextFiled from "./InputTextFiled";
import NumberFormat from "react-number-format";
import PaymentForm from "./PaymentForm";
import MaskedInput from "react-text-mask";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
const AddBillingModal = (props) => {
  const provinces = [
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
  ];
  const billing = props.billing;
  const [number, setnumber] = useState("");
  const [title, settitle] = useState("");
  const [exp_month, setexp_month] = useState("");
  const [exp_year, setexp_year] = useState("");
  const [cvc, setcvc] = useState("");
  const [email, setemail] = useState("");
  const [streed_address, setstreed_address] = useState("");
  const [city, setcity] = useState("");
  const [postal_code, setpostal_code] = useState("");
  const [province, setProvince] = useState("");
  const [selectProvince, setSelectProvince] = useState(
    (provinces || [])?.filter(
      (item) => item.value === billing?.province || ""
    )?.[0] || ""
  );

  const handleInputChange = ({ target }) => {
    if (target.name === "email") {
      setemail(target.value);
    } else if (target.name === "streed_address") {
      setstreed_address(target.value);
    } else if (target.name === "City") {
      setcity(target.value);
    } else if (target.name === "postal_code") {
      setpostal_code(target.value);
    } else if (target.name === "setProvince") {
      setProvince(target.value);
    }
    console.log(target.value, "target");
  };

  const onSuccess = () => {
    props.handleAddBillingModalSowClose();
  };
  useEffect(() => {
    setnumber(billing?.number || "");
    settitle(billing?.title || "");
    setexp_month(billing?.exp_month || "");
    setexp_year(billing?.exp_year || "");
    setcvc(billing?.cvc || "");
    setemail(billing?.email || "");
    setstreed_address(billing?.streed_address || "");
    setcity(billing?.city || "");
    setpostal_code(billing?.postal_code || "");
    setProvince(billing?.province || "");
    console.log(billing, city);
  }, [props.AddBillingModalSow]);

  useEffect(() => {
    if (props.editCard) {
      setnumber(billing?.number || "");
      settitle(billing?.title || "");
      setexp_month(billing?.exp_month || "");
      setexp_year(billing?.exp_year || "");
      setcvc(billing?.cvc || "");
      setemail(billing?.email || "");
      setstreed_address(billing?.streed_address || "");
      setcity(billing?.city || "");
      setpostal_code(billing?.postal_code || "");
      setProvince(billing?.province || "");
    }
  }, [props.editCard]);

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

  return (
    <Modal
      dialogClassName="billing-modal"
      show={props.AddBillingModalSow}
      onHide={props.handleAddBillingModalSowClose}
    >
      <Modal.Body>
        <div class="form-group row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 botm">
          <h5>Payment method</h5>
        </div>
        <div className="borderonlyBiling"></div>

        <PaymentForm
          setnumber={setnumber}
          settitle={settitle}
          setexp_month={setexp_month}
          setexp_year={setexp_year}
          setcvc={setcvc}
          billing={billing}
        />

        <InputTextFiled
          showTopBorder
          title={"Email address"}
          onChange={handleInputChange}
          name="email"
          value={email}
          emailIcon
          subTitle={"Invoices will be sent to this email address"}
        />
        <InputTextFiled
          showTopBorder
          onChange={handleInputChange}
          name="streed_address"
          value={streed_address}
          title={"Street address"}
        />
        <InputTextFiled
          showTopBorder
          onChange={handleInputChange}
          name="City"
          value={city}
          title={"City"}
        />
        <div className="borderonlyBiling"></div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-4 col-form-label">
            Province / Postal Code{" "}
          </label>

          <div style={{ width: "40%" }} className="col-md-4 pt-0 pb-0 pr-0">
            <div className="PostApp-Form Applicantin-Btm">
              {/* <label>Province</label> */}
              <Select
                required
                placeholder="Select Province"
                id="selectProvince"
                name="selectProvince"
                options={provinces}
                onChange={(e) => {
                  setProvince(e?.value || "");
                  setSelectProvince(e);
                }}
                value={selectProvince}
                className="react-select-main"
                classNamePrefix="react-select"
                components={{
                  Option: renderOption,
                  MenuList: renderScrollbar,
                }}
                captureMenuScroll={false}
              />
            </div>
          </div>

          <div style={{ width: "16%" }} class="col-sm-3 ">
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
              onChange={handleInputChange}
              value={postal_code}
              name="postal_code"
              type="text"
              class="form-control"
              placeholder={"L9R 0T7"}
              style={{ borderRadious: "9px", height: "47px" }}
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-12 btnAlienEnd">
            <button
              type="submit"
              onClick={() => {
                if (!number) {
                  alert("Please enter card number");
                } else if (!title) {
                  alert("Please enter card title");
                } else if (!exp_month || !exp_year) {
                  alert("Please enter card date");
                } else if (!cvc) {
                  alert("Please enter card cvc");
                } else if (!email) {
                  alert("Please enter email");
                } else if (!streed_address) {
                  alert("Please enter streed address");
                } else if (!city) {
                  alert("Please enter city");
                } else if (!postal_code) {
                  alert("Please enter Postal Code");
                } else if (!province) {
                  alert("Please enter province");
                } else if (exp_month > 12) {
                  alert("Exp month is not valid");
                } else {
                  if (props?.billing?.number_of_applications) {
                    props.edit_card_for_billing(
                      {
                        number_of_applications: props?.noOfApplications?.value
                          ? props?.noOfApplications?.value
                          : 0,
                        email: email,
                        streed_address: streed_address,
                        city: city,
                        postal_code: postal_code,
                        province: province,
                        title: title,
                        number: number,
                        exp_month: exp_month,
                        exp_year: exp_year,
                        cvc: cvc,
                      },
                      true,
                      true,
                      onSuccess,
                      (msg) => {
                        alert(msg);
                      }
                    );
                  } else {
                    props.add_card_for_billing(
                      {
                        number_of_applications: props?.noOfApplications?.value
                          ? props?.noOfApplications?.value
                          : 0,
                        email: email,
                        streed_address: streed_address,
                        city: city,
                        postal_code: postal_code,
                        province: province,
                        title: title,
                        number: number,
                        exp_month: exp_month,
                        exp_year: exp_year,
                        cvc: cvc,
                      },
                      onSuccess,
                      (msg) => {
                        alert(msg);
                      }
                    );
                  }
                }
              }}
              class="btn btn-light btnDesignbillingSave"
            >
              {props.billingLoader ? "loading" : "Save"}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default AddBillingModal;
