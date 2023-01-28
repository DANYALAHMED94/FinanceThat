import React, { Component } from "react";
import NumberFormat from "react-number-format";
import SimpleReactValidator from "simple-react-validator";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import MaskedInput from "react-text-mask";
import { toastr } from "react-redux-toastr";
import { Helmet } from "react-helmet";
import { capitalize } from "./../../_helpers/capitalize";

var that;
class DealerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      user_id: "",
      name: "",
      operating_name: "",
      street_address: "",
      city: "",
      province: "",
      postal_code: "",
      phone: "",
      fax: "",
      email: "",
      years_in_business: "",
      no_of_owner: 1,
      selected_no_of_owner: { value: 1, label: 1 },
      void_check_path: "",
      interior_business_path: "",
      exterior_business_path: "",
      license_path: "",
      logo_path: "",
      omviccertificate: "",
      auction_dealer_id: "",
      status: "",
      reason: "",
      note: "",
      created_at: "",
      modified_at: "",
      country: "",
      photo: "",
      base64_image: "",
      update_profile: "",
      profile_update_loading: "",
      profile_password_update_loading: "",
      provinces: [
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
      ],
      selectProvince: [],
      owner: [],
      no_of_owner_default: 0,
    };
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    that = this;
  }
  componentDidMount() {
    if (
      this.props.get_user_profile !== null &&
      this.props.get_user_profile !== "" &&
      this.props.get_user_profile !== undefined &&
      Object.keys(this.props.get_user_profile).length > 0
    ) {
      // const id = this.props.get_user_profile.id !== undefined && this.props.get_user_profile.id !== null && this.props.get_user_profile.id !== '' ? this.props.get_user_profile.id : ''
      const id = this.props.get_user_profile.id
        ? this.props.get_user_profile.id
        : "";
      const user_id = this.props.get_user_profile.user_id
        ? this.props.get_user_profile.user_id
        : "";
      // const user_id = this.props.get_user_profile.user_id !== undefined && this.props.get_user_profile.user_id !== null && this.props.get_user_profile.user_id !== '' ? this.props.get_user_profile.user_id : ''
      // const business_name = this.props.get_user_profile.business_name !== undefined && this.props.get_user_profile.business_name !== null && this.props.get_user_profile.business_name !== '' ? this.props.get_user_profile.business_name : ''
      const business_name = this.props.get_user_profile.business_name
        ? this.props.get_user_profile.business_name
        : "";
      // const operating_name = this.props.get_user_profile.operating_name !== undefined && this.props.get_user_profile.operating_name !== null && this.props.get_user_profile.operating_name !== '' ? this.props.get_user_profile.operating_name : ''
      const operating_name = this.props.get_user_profile.operating_name
        ? this.props.get_user_profile.operating_name
        : "";
      // const street_address = this.props.get_user_profile.street_address !== undefined && this.props.get_user_profile.street_address !== null && this.props.get_user_profile.street_address !== '' ? this.props.get_user_profile.street_address : ''
      const street_address = this.props.get_user_profile.street_address
        ? this.props.get_user_profile.street_address
        : "";
      // const city = this.props.get_user_profile.city !== undefined && this.props.get_user_profile.city !== null && this.props.get_user_profile.city !== '' ? this.props.get_user_profile.city : ''
      const city = this.props.get_user_profile.city
        ? this.props.get_user_profile.city
        : "";
      // const postal_code = this.props.get_user_profile.postal_code !== undefined && this.props.get_user_profile.postal_code !== null && this.props.get_user_profile.postal_code !== '' ? this.props.get_user_profile.postal_code : ''
      const postal_code = this.props.get_user_profile.postal_code
        ? this.props.get_user_profile.postal_code
        : "";
      // const country = this.props.get_user_profile.country !== undefined && this.props.get_user_profile.country !== null && this.props.get_user_profile.country !== '' ? this.props.get_user_profile.country : ''
      const country = this.props.get_user_profile.country
        ? this.props.get_user_profile.country
        : "";
      // const email = this.props.get_user_profile.email !== undefined && this.props.get_user_profile.email !== null && this.props.get_user_profile.email !== '' ? this.props.get_user_profile.email : ''
      const email = this.props.get_user_profile.email
        ? this.props.get_user_profile.email
        : "";
      // const phone = this.props.get_user_profile.phone !== undefined && this.props.get_user_profile.phone !== null && this.props.get_user_profile.phone !== '' ? this.props.get_user_profile.phone : ''
      const phone = this.props.get_user_profile.phone
        ? this.props.get_user_profile.phone
        : "";
      // const fax = this.props.get_user_profile.fax !== undefined && this.props.get_user_profile.fax !== null && this.props.get_user_profile.fax !== '' ? this.props.get_user_profile.fax : ''
      const fax = this.props.get_user_profile.fax
        ? this.props.get_user_profile.fax
        : "";
      const years_in_business = this.props.get_user_profile.years_in_business
        ? this.props.get_user_profile.years_in_business
        : "";
      // const years_in_business = this.props.get_user_profile.years_in_business !== undefined && this.props.get_user_profile.years_in_business !== null && this.props.get_user_profile.years_in_business !== '' ? this.props.get_user_profile.years_in_business : ''
      // const no_of_owner = this.props.get_user_profile.no_of_owner !== undefined && this.props.get_user_profile.no_of_owner !== null && this.props.get_user_profile.no_of_owner !== '' ? this.props.get_user_profile.no_of_owner : 1
      const no_of_owner = this.props.get_user_profile.no_of_owner
        ? this.props.get_user_profile.no_of_owner
        : 1;
      // const selected_no_of_owner = this.props.get_user_profile.no_of_owner !== undefined && this.props.get_user_profile.no_of_owner !== null && this.props.get_user_profile.no_of_owner !== '' ? { value: this.props.get_user_profile.no_of_owner, label: this.props.get_user_profile.no_of_owner } : { value: 1, label: 1 }
      const selected_no_of_owner = this.props.get_user_profile.no_of_owner
        ? {
            value: this.props.get_user_profile.no_of_owner,
            label: this.props.get_user_profile.no_of_owner,
          }
        : { value: 1, label: 1 };
      // const void_check_path = this.props.get_user_profile.void_check_path !== undefined && this.props.get_user_profile.void_check_path !== null && this.props.get_user_profile.void_check_path !== '' ? this.props.get_user_profile.void_check_path : ''
      const void_check_path = this.props.get_user_profile.void_check_path
        ? this.props.get_user_profile.void_check_path
        : "";
      // const interior_business_path = this.props.get_user_profile.interior_business_path !== undefined && this.props.get_user_profile.interior_business_path !== null && this.props.get_user_profile.interior_business_path !== '' ? this.props.get_user_profile.interior_business_path : ''
      const interior_business_path = this.props.get_user_profile
        .interior_business_path
        ? this.props.get_user_profile.interior_business_path
        : "";
      // const exterior_business_path = this.props.get_user_profile.exterior_business_path !== undefined && this.props.get_user_profile.exterior_business_path !== null && this.props.get_user_profile.exterior_business_path !== '' ? this.props.get_user_profile.exterior_business_path : ''
      const exterior_business_path = this.props.get_user_profile
        .exterior_business_path
        ? this.props.get_user_profile.exterior_business_path
        : "";
      // const license_path = this.props.get_user_profile.license_path !== undefined && this.props.get_user_profile.license_path !== null && this.props.get_user_profile.license_path !== '' ? this.props.get_user_profile.license_path : ''
      const license_path = this.props.get_user_profile.license_path
        ? this.props.get_user_profile.license_path
        : "";
      // const logo_path = this.props.get_user_profile.logo_path !== undefined && this.props.get_user_profile.logo_path !== null && this.props.get_user_profile.logo_path !== '' ? this.props.get_user_profile.logo_path : ''
      const logo_path = this.props.get_user_profile.logo_path
        ? this.props.get_user_profile.logo_path
        : "";
      // const omviccertificate = this.props.get_user_profile.omviccertificate !== undefined && this.props.get_user_profile.omviccertificate !== null && this.props.get_user_profile.omviccertificate !== '' ? this.props.get_user_profile.omviccertificate : ''
      const omviccertificate = this.props.get_user_profile.omviccertificate
        ? this.props.get_user_profile.omviccertificate
        : "";
      // const auction_dealer_id = this.props.get_user_profile.auction_dealer_id !== undefined && this.props.get_user_profile.auction_dealer_id !== null && this.props.get_user_profile.auction_dealer_id !== '' ? this.props.get_user_profile.auction_dealer_id : ''
      const auction_dealer_id = this.props.get_user_profile.auction_dealer_id
        ? this.props.get_user_profile.auction_dealer_id
        : "";
      // const status = this.props.get_user_profile.status !== undefined && this.props.get_user_profile.status !== null && this.props.get_user_profile.status !== '' ? this.props.get_user_profile.status : ''
      const status = this.props.get_user_profile.status
        ? this.props.get_user_profile.status
        : "";
      // const reason = this.props.get_user_profile.reason !== undefined && this.props.get_user_profile.reason !== null && this.props.get_user_profile.reason !== '' ? this.props.get_user_profile.reason : ''
      const reason = this.props.get_user_profile.reason
        ? this.props.get_user_profile.reason
        : "";
      // const note = this.props.get_user_profile.note !== undefined && this.props.get_user_profile.note !== null && this.props.get_user_profile.note !== '' ? this.props.get_user_profile.note : ''
      const note = this.props.get_user_profile.note
        ? this.props.get_user_profile.note
        : "";
      // const created_at = this.props.get_user_profile.created_at !== undefined && this.props.get_user_profile.created_at !== null && this.props.get_user_profile.created_at !== '' ? this.props.get_user_profile.created_at : ''
      const created_at = this.props.get_user_profile.created_at
        ? this.props.get_user_profile.created_at
        : "";
      // const modified_at = this.props.get_user_profile.modified_at !== undefined && this.props.get_user_profile.modified_at !== null && this.props.get_user_profile.modified_at !== '' ? this.props.get_user_profile.modified_at : ''
      const modified_at = this.props.get_user_profile.modified_at
        ? this.props.get_user_profile.modified_at
        : "";
      // const province = this.props.get_user_profile.province !== undefined && this.props.get_user_profile.province !== null ? this.props.get_user_profile.province : ''
      const province = this.props.get_user_profile.province
        ? this.props.get_user_profile.province
        : "";
      let selectedProvince = this.state.provinces.filter(
        (item) => item.value === province
      );
      if (
        selectedProvince !== undefined &&
        selectedProvince !== null &&
        selectedProvince.length > 0
      ) {
        selectedProvince = selectedProvince[0];
      } else {
        selectedProvince = "";
      }
      this.setState({
        ...this.state,
        id: id,
        user_id: user_id,
        name: business_name,
        operating_name: operating_name,
        street_address: street_address,
        city: city,
        postal_code: postal_code,
        country: country,
        email: email,
        phone: phone,
        fax: fax,
        years_in_business: years_in_business,
        void_check_path: void_check_path,
        interior_business_path: interior_business_path,
        exterior_business_path: exterior_business_path,
        license_path: license_path,
        logo_path: logo_path,
        omviccertificate: omviccertificate,
        auction_dealer_id: auction_dealer_id,
        status: status,
        reason: reason,
        note: note,
        created_at: created_at,
        modified_at: modified_at,
        province: province,
        selectProvince: selectedProvince,
        owner:
          this.props.get_user_profile.dealerdetail_id !== undefined &&
          this.props.get_user_profile.dealerdetail_id !== null
            ? this.props.get_user_profile.dealerdetail_id.length > 0
              ? this.props.get_user_profile.dealerdetail_id.map((item) => {
                  let selectedOwnerProvince = this.state.provinces.filter(
                    (pro) => pro.value === item.province
                  );
                  if (
                    selectedOwnerProvince !== undefined &&
                    selectedOwnerProvince !== null &&
                    selectedOwnerProvince.length > 0
                  ) {
                    selectedOwnerProvince = selectedOwnerProvince[0];
                  } else {
                    selectedOwnerProvince = "";
                  }
                  return {
                    id: item.id,
                    first_name: item.first_name,
                    last_name: item.last_name,
                    full_address: item.full_address,
                    city: item.city,
                    province: item.province,
                    selectProvince: selectedOwnerProvince,
                    postal_code: item.postal_code,
                    telephone: item.telephone,
                    percentage_of_ownership: item.percentage_of_ownership,
                    date_of_birth: item.date_of_birth,
                    created_at: item.created_at,
                    dealer_id: item.dealer_id,
                    first_name_error: "",
                    last_name_error: "",
                    full_address_error: "",
                    owner_city_error: "",
                    owner_province_error: "",
                    owner_postal_error: "",
                    telephone_error: "",
                    percentage_of_ownership_error: "",
                    date_of_birth_error: "",
                    email:
                      item.email !== undefined &&
                      item.email !== null &&
                      item.email !== ""
                        ? item.email
                        : "",
                    email_error: "",
                  };
                })
              : []
            : [],
        no_of_owner: no_of_owner,
        no_of_owner_default: no_of_owner,
        selected_no_of_owner: selected_no_of_owner,
      });
    }
  }
  handleOnchange = (e) => {
    const { name, value } = e.target;
    this.props.change_profile_input(name, value);
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    // this.props.get_user_profile.length > 0
    if (
      prevProps.get_user_profile !== this.props.get_user_profile &&
      this.props.get_user_profile !== undefined &&
      Object.keys(this.props.get_user_profile).length > 0
    ) {
      // const id = this.props.get_user_profile.id !== undefined && this.props.get_user_profile.id !== null && this.props.get_user_profile.id !== '' ? this.props.get_user_profile.id : ''
      const id = this.props.get_user_profile.id
        ? this.props.get_user_profile.id
        : "";
      const user_id = this.props.get_user_profile.user_id
        ? this.props.get_user_profile.user_id
        : "";
      // const user_id = this.props.get_user_profile.user_id !== undefined && this.props.get_user_profile.user_id !== null && this.props.get_user_profile.user_id !== '' ? this.props.get_user_profile.user_id : ''
      // const business_name = this.props.get_user_profile.business_name !== undefined && this.props.get_user_profile.business_name !== null && this.props.get_user_profile.business_name !== '' ? this.props.get_user_profile.business_name : ''
      const business_name = this.props.get_user_profile.business_name
        ? this.props.get_user_profile.business_name
        : "";
      // const operating_name = this.props.get_user_profile.operating_name !== undefined && this.props.get_user_profile.operating_name !== null && this.props.get_user_profile.operating_name !== '' ? this.props.get_user_profile.operating_name : ''
      const operating_name = this.props.get_user_profile.operating_name
        ? this.props.get_user_profile.operating_name
        : "";
      // const street_address = this.props.get_user_profile.street_address !== undefined && this.props.get_user_profile.street_address !== null && this.props.get_user_profile.street_address !== '' ? this.props.get_user_profile.street_address : ''
      const street_address = this.props.get_user_profile.street_address
        ? this.props.get_user_profile.street_address
        : "";
      // const city = this.props.get_user_profile.city !== undefined && this.props.get_user_profile.city !== null && this.props.get_user_profile.city !== '' ? this.props.get_user_profile.city : ''
      const city = this.props.get_user_profile.city
        ? this.props.get_user_profile.city
        : "";
      // const postal_code = this.props.get_user_profile.postal_code !== undefined && this.props.get_user_profile.postal_code !== null && this.props.get_user_profile.postal_code !== '' ? this.props.get_user_profile.postal_code : ''
      const postal_code = this.props.get_user_profile.postal_code
        ? this.props.get_user_profile.postal_code
        : "";
      // const country = this.props.get_user_profile.country !== undefined && this.props.get_user_profile.country !== null && this.props.get_user_profile.country !== '' ? this.props.get_user_profile.country : ''
      const country = this.props.get_user_profile.country
        ? this.props.get_user_profile.country
        : "";
      // const email = this.props.get_user_profile.email !== undefined && this.props.get_user_profile.email !== null && this.props.get_user_profile.email !== '' ? this.props.get_user_profile.email : ''
      const email = this.props.get_user_profile.email
        ? this.props.get_user_profile.email
        : "";
      // const phone = this.props.get_user_profile.phone !== undefined && this.props.get_user_profile.phone !== null && this.props.get_user_profile.phone !== '' ? this.props.get_user_profile.phone : ''
      const phone = this.props.get_user_profile.phone
        ? this.props.get_user_profile.phone
        : "";
      // const fax = this.props.get_user_profile.fax !== undefined && this.props.get_user_profile.fax !== null && this.props.get_user_profile.fax !== '' ? this.props.get_user_profile.fax : ''
      const fax = this.props.get_user_profile.fax
        ? this.props.get_user_profile.fax
        : "";
      const years_in_business = this.props.get_user_profile.years_in_business
        ? this.props.get_user_profile.years_in_business
        : "";
      // const years_in_business = this.props.get_user_profile.years_in_business !== undefined && this.props.get_user_profile.years_in_business !== null && this.props.get_user_profile.years_in_business !== '' ? this.props.get_user_profile.years_in_business : ''
      // const no_of_owner = this.props.get_user_profile.no_of_owner !== undefined && this.props.get_user_profile.no_of_owner !== null && this.props.get_user_profile.no_of_owner !== '' ? this.props.get_user_profile.no_of_owner : 1
      const no_of_owner = this.props.get_user_profile.no_of_owner
        ? this.props.get_user_profile.no_of_owner
        : 1;
      // const selected_no_of_owner = this.props.get_user_profile.no_of_owner !== undefined && this.props.get_user_profile.no_of_owner !== null && this.props.get_user_profile.no_of_owner !== '' ? { value: this.props.get_user_profile.no_of_owner, label: this.props.get_user_profile.no_of_owner } : { value: 1, label: 1 }
      const selected_no_of_owner = this.props.get_user_profile.no_of_owner
        ? {
            value: this.props.get_user_profile.no_of_owner,
            label: this.props.get_user_profile.no_of_owner,
          }
        : { value: 1, label: 1 };
      // const void_check_path = this.props.get_user_profile.void_check_path !== undefined && this.props.get_user_profile.void_check_path !== null && this.props.get_user_profile.void_check_path !== '' ? this.props.get_user_profile.void_check_path : ''
      const void_check_path = this.props.get_user_profile.void_check_path
        ? this.props.get_user_profile.void_check_path
        : "";
      // const interior_business_path = this.props.get_user_profile.interior_business_path !== undefined && this.props.get_user_profile.interior_business_path !== null && this.props.get_user_profile.interior_business_path !== '' ? this.props.get_user_profile.interior_business_path : ''
      const interior_business_path = this.props.get_user_profile
        .interior_business_path
        ? this.props.get_user_profile.interior_business_path
        : "";
      // const exterior_business_path = this.props.get_user_profile.exterior_business_path !== undefined && this.props.get_user_profile.exterior_business_path !== null && this.props.get_user_profile.exterior_business_path !== '' ? this.props.get_user_profile.exterior_business_path : ''
      const exterior_business_path = this.props.get_user_profile
        .exterior_business_path
        ? this.props.get_user_profile.exterior_business_path
        : "";
      // const license_path = this.props.get_user_profile.license_path !== undefined && this.props.get_user_profile.license_path !== null && this.props.get_user_profile.license_path !== '' ? this.props.get_user_profile.license_path : ''
      const license_path = this.props.get_user_profile.license_path
        ? this.props.get_user_profile.license_path
        : "";
      // const logo_path = this.props.get_user_profile.logo_path !== undefined && this.props.get_user_profile.logo_path !== null && this.props.get_user_profile.logo_path !== '' ? this.props.get_user_profile.logo_path : ''
      const logo_path = this.props.get_user_profile.logo_path
        ? this.props.get_user_profile.logo_path
        : "";
      // const omviccertificate = this.props.get_user_profile.omviccertificate !== undefined && this.props.get_user_profile.omviccertificate !== null && this.props.get_user_profile.omviccertificate !== '' ? this.props.get_user_profile.omviccertificate : ''
      const omviccertificate = this.props.get_user_profile.omviccertificate
        ? this.props.get_user_profile.omviccertificate
        : "";
      // const auction_dealer_id = this.props.get_user_profile.auction_dealer_id !== undefined && this.props.get_user_profile.auction_dealer_id !== null && this.props.get_user_profile.auction_dealer_id !== '' ? this.props.get_user_profile.auction_dealer_id : ''
      const auction_dealer_id = this.props.get_user_profile.auction_dealer_id
        ? this.props.get_user_profile.auction_dealer_id
        : "";
      // const status = this.props.get_user_profile.status !== undefined && this.props.get_user_profile.status !== null && this.props.get_user_profile.status !== '' ? this.props.get_user_profile.status : ''
      const status = this.props.get_user_profile.status
        ? this.props.get_user_profile.status
        : "";
      // const reason = this.props.get_user_profile.reason !== undefined && this.props.get_user_profile.reason !== null && this.props.get_user_profile.reason !== '' ? this.props.get_user_profile.reason : ''
      const reason = this.props.get_user_profile.reason
        ? this.props.get_user_profile.reason
        : "";
      // const note = this.props.get_user_profile.note !== undefined && this.props.get_user_profile.note !== null && this.props.get_user_profile.note !== '' ? this.props.get_user_profile.note : ''
      const note = this.props.get_user_profile.note
        ? this.props.get_user_profile.note
        : "";
      // const created_at = this.props.get_user_profile.created_at !== undefined && this.props.get_user_profile.created_at !== null && this.props.get_user_profile.created_at !== '' ? this.props.get_user_profile.created_at : ''
      const created_at = this.props.get_user_profile.created_at
        ? this.props.get_user_profile.created_at
        : "";
      // const modified_at = this.props.get_user_profile.modified_at !== undefined && this.props.get_user_profile.modified_at !== null && this.props.get_user_profile.modified_at !== '' ? this.props.get_user_profile.modified_at : ''
      const modified_at = this.props.get_user_profile.modified_at
        ? this.props.get_user_profile.modified_at
        : "";
      // const province = this.props.get_user_profile.province !== undefined && this.props.get_user_profile.province !== null ? this.props.get_user_profile.province : ''
      const province = this.props.get_user_profile.province
        ? this.props.get_user_profile.province
        : "";
      let selectedProvince = this.state.provinces.filter(
        (item) => item.value === province
      );
      if (
        selectedProvince !== undefined &&
        selectedProvince !== null &&
        selectedProvince.length > 0
      ) {
        selectedProvince = selectedProvince[0];
      } else {
        selectedProvince = "";
      }
      this.setState({
        ...this.state,
        id: id,
        user_id: user_id,
        name: business_name,
        operating_name: operating_name,
        street_address: street_address,
        city: city,
        postal_code: postal_code,
        country: country,
        email: email,
        phone: phone,
        fax: fax,
        years_in_business: years_in_business,
        void_check_path: void_check_path,
        interior_business_path: interior_business_path,
        exterior_business_path: exterior_business_path,
        license_path: license_path,
        logo_path: logo_path,
        omviccertificate: omviccertificate,
        auction_dealer_id: auction_dealer_id,
        status: status,
        reason: reason,
        note: note,
        created_at: created_at,
        modified_at: modified_at,
        province: province,
        selectProvince: selectedProvince,
        // owner: this.props.get_user_profile.dealerdetail_id !== undefined && this.props.get_user_profile.dealerdetail_id !== null ? this.props.get_user_profile.dealerdetail_id.length > 0 ? this.props.get_user_profile.dealerdetail_id.map(item => {
        owner: this.props.get_user_profile.dealerdetail_id
          ? this.props.get_user_profile.dealerdetail_id.length > 0
            ? this.props.get_user_profile.dealerdetail_id.map((item) => {
                let selectedCoProvince = this.state.provinces.filter(
                  (prov) => prov.value === item.province
                );
                if (
                  selectedCoProvince !== undefined &&
                  selectedCoProvince !== null &&
                  selectedCoProvince.length > 0
                ) {
                  selectedCoProvince = selectedCoProvince[0];
                } else {
                  selectedCoProvince = "";
                }
                return {
                  id: item.id,
                  first_name: item.first_name,
                  last_name: item.last_name,
                  full_address: item.full_address,
                  city: item.city,
                  province: item.province,
                  selectProvince: selectedCoProvince,
                  postal_code: item.postal_code,
                  telephone: item.telephone,
                  percentage_of_ownership: item.percentage_of_ownership,
                  date_of_birth: item.date_of_birth,
                  created_at: item.created_at,
                  dealer_id: item.dealer_id,
                  first_name_error: "",
                  last_name_error: "",
                  full_address_error: "",
                  owner_city_error: "",
                  owner_province_error: "",
                  owner_postal_error: "",
                  telephone_error: "",
                  percentage_of_ownership_error: "",
                  date_of_birth_error: "",
                  email:
                    item.email !== undefined &&
                    item.email !== null &&
                    item.email !== ""
                      ? item.email
                      : "",
                  email_error: "",
                };
              })
            : []
          : [],
        no_of_owner: no_of_owner,
        no_of_owner_default: no_of_owner,
        selected_no_of_owner: selected_no_of_owner,
      });
    }
    if (
      prevState.no_of_owner !== this.state.no_of_owner &&
      this.state.no_of_owner !== undefined
    ) {
      const owner = [];
      let removeOwners =
        Number(prevState.no_of_owner) - Number(this.state.no_of_owner);
      if (
        Number(this.state.no_of_owner) !== 0 &&
        this.state.no_of_owner !== ""
      ) {
        if (this.state.owner.length < Number(this.state.no_of_owner)) {
          for (
            let index = this.state.owner.length;
            index < Number(this.state.no_of_owner);
            index++
          ) {
            owner.push({
              id: "",
              first_name: "",
              last_name: "",
              full_address: "",
              city: "",
              province: "",
              selectProvince: "",
              postal_code: "",
              dealer_id: "",
              first_name_error: "",
              last_name_error: "",
              full_address_error: "",
              owner_city_error: "",
              owner_province_error: "",
              owner_postal_error: "",
              telephone: "",
              telephone_error: "",
              percentage_of_ownership: "",
              percentage_of_ownership_error: "",
              date_of_birth: "",
              date_of_birth_error: "",
              email: "",
              email_error: "",
            });
          }
          this.setState({
            ...this.state,
            owner: [
              ...this.state.owner.map((item) => {
                return {
                  ...item,
                  first_name_error: "",
                  last_name_error: "",
                  full_address_error: "",
                  owner_city_error: "",
                  owner_province_error: "",
                  owner_postal_error: "",
                  telephone_error: "",
                  percentage_of_ownership_error: "",
                  date_of_birth_error: "",
                  email_error: "",
                };
              }),
              ...owner,
            ],
          });
        } else if (
          Number(this.state.no_of_owner) ===
          Number(this.state.no_of_owner_default)
        ) {
          this.setState({
            ...this.state,
            owner: this.state.owner,
          });
        } else {
          this.setState({
            ...this.state,
            // owner: typeof this.state.owner.slice(0, -removeOwners) !== 'undefined' && typeof this.state.owner.slice(0, -removeOwners) !== 'null' && this.state.owner.slice(0, -removeOwners).length > 0 ? this.state.owner.slice(0, -removeOwners).map(item => {
            owner: !this.state.owner.slice(0, -removeOwners)
              ? []
              : this.state.owner.slice(0, -removeOwners).map((item) => {
                  return {
                    ...item,
                    first_name_error: "",
                    last_name_error: "",
                    full_address_error: "",
                    owner_city_error: "",
                    owner_province_error: "",
                    owner_postal_error: "",
                    telephone_error: "",
                    percentage_of_ownership_error: "",
                    date_of_birth_error: "",
                    email_error: "",
                  };
                }),
          });
        }
      } else {
        this.setState({
          ...this.state,
          owner: [],
        });
      }
    }
  }

  changeSelect = (e, formName, name) => {
    this.setState({
      ...this.state,
      [name]: e,
      // [formName]: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : '' : ''
      [formName]: e ? (e.value ? e.value : "") : "",
    });
  };
  _handleImageChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        file.type !== "application/pdf" &&
        file.type !== "application/docs"
      ) {
        toastr.error(
          "Error",
          "File does not support. You must use pdf, docs, .png, jpeg or .jpg "
        );
        return false;
      }
      // if (file.size > (2 * 1024 * 1024)) {
      //     toastr.error('Error', "Please upload a file smaller than 2 MB")
      //     return false;
      // }
      const name = e.target.name;
      // const fileNameState = e.target.name + 'Name'
      // const fileName = e.target.files[0].name
      that.setState({
        ...that.state,
        [name]: file,
        // [fileNameState]: fileName
      });
    }

    // reader.readAsDataURL(file)
  }

  handleChangeOwner = (e, ownerIndex) => {
    if (e.target.name === "percentage_of_ownership") {
      const perOwner = e.target.value.toString().split("%").join("");
      if (Number(perOwner) > 100) {
        this.setState((prevState) => ({
          ...this.state,
          owner: prevState.owner.slice().map((item, index) => {
            if (index === ownerIndex) {
              return {
                ...item,
                percentage_of_ownership: item.percentage_of_ownership,
              };
            }
            return item;
          }),
        }));
      } else {
        this.setState({
          ...this.state,
          owner: this.state.owner.slice().map((item, index) => {
            if (index === ownerIndex) {
              return {
                ...item,
                [e.target.name]: perOwner,
              };
            }
            return item;
          }),
        });
      }

      return false;
    } else {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, index) => {
          if (index === ownerIndex) {
            return {
              ...item,
              [e.target.name]: e.target.value,
            };
          }
          return item;
        }),
      });
    }
  };
  handleOnClickOwnerNextBlur = (index) => {
    // if (this.state.owner[index].first_name.trim() == '') {
    if (!this.state.owner[index].first_name) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              first_name_error: "Please Enter First Name",
            };
          }
          return item;
        }),
      });
      return false;
    }
    // if (this.state.owner[index].last_name.trim() === '') {
    if (!this.state.owner[index].last_name) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              last_name_error: "Please Enter Last Name",
            };
          }
          return item;
        }),
      });
      return false;
    }
    // if (this.state.owner[index].full_address.trim() == '') {
    if (!this.state.owner[index].full_address) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              full_address_error: "Please Enter Address",
            };
          }
          return item;
        }),
      });
      return false;
    }
    // if (this.state.owner[index].city.trim() == '') {
    if (!this.state.owner[index].city) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              owner_city_error: "Please Enter City",
            };
          }
          return item;
        }),
      });
      return false;
    }
    // if (this.state.owner[index].province.trim() == '') {
    if (!this.state.owner[index].province) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              owner_province_error: "Please Enter Province",
            };
          }
          return item;
        }),
      });
      return false;
    }
    // if (this.state.owner[index].postal_code.trim() == '') {
    if (!this.state.owner[index].postal_code) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              owner_postal_error: "Please Enter Postal Code",
            };
          }
          return item;
        }),
      });
      return false;
    }
    if (this.state.owner[index].postal_code.length !== 7) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              owner_postal_error: "Please Enter Valid Postal Code(A2A 2A2)",
            };
          }
          return item;
        }),
      });
      return false;
    }
    // if (this.state.owner[index].telephone.trim() == '') {
    if (!this.state.owner[index].telephone) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              telephone_error: "Please Enter Phone Number",
            };
          }
          return item;
        }),
      });
      return false;
    }
    // if (this.state.owner[index].percentage_of_ownership.trim() == '') {
    if (!this.state.owner[index].percentage_of_ownership) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              percentage_of_ownership_error:
                "Please Enter Percentage of Ownership",
            };
          }
          return item;
        }),
      });
      return false;
    }
  };
  update_Profile = () => {
    if (!this.validator.fieldValid("Dealer Name")) {
      this.validator.showMessageFor("Dealer Name");
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid("Dealer Operation Name")) {
      this.validator.showMessageFor("Dealer Operation Name");
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid("Street address")) {
      this.validator.showMessageFor("Street address");
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid("city")) {
      this.validator.showMessageFor("city");
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid("province")) {
      this.validator.showMessageFor("province");
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid("Postal Code")) {
      this.validator.showMessageFor("Postal Code");
      this.forceUpdate();
      return false;
    }

    if (!this.validator.fieldValid("telephone")) {
      this.validator.showMessageFor("telephone");
      this.forceUpdate();
      return false;
    }
    if (this.props.user_id && Number(localStorage.getItem("user_type")) === 2) {
      var formData = new FormData();
      formData.append("business_name ", this.state.name);
      formData.append("operating_name ", this.state.operating_name);
      formData.append("full_name ", this.state.operating_name);
      formData.append("street_address ", this.state.street_address);
      formData.append("postal_code ", this.state.postal_code);
      formData.append("city ", this.state.city);
      formData.append("phone ", this.state.phone);
      formData.append("fax ", this.state.fax);
      formData.append("province ", this.state.province);
      formData.append("no_of_owner ", this.state.no_of_owner);
      if (this.props.preview !== null) {
        formData.append("photo ", this.props.preview);
      }
      this.props.update_dealer_profile(formData, this.props.user_id);
    }
  };
  isFile = (input) => {
    if ("File" in window && input instanceof File) return true;
    else return false;
  };
  update_Profile_files = () => {
    if (this.props.user_id && Number(localStorage.getItem("user_type")) === 2) {
      var formData = new FormData();
      if (this.isFile(this.state.void_check_path)) {
        formData.append("void_check_path ", this.state.void_check_path);
      }
      if (this.isFile(this.state.interior_business_path)) {
        formData.append(
          "interior_business_path ",
          this.state.interior_business_path
        );
      }
      if (this.isFile(this.state.exterior_business_path)) {
        formData.append(
          "exterior_business_path ",
          this.state.exterior_business_path
        );
      }
      if (this.isFile(this.state.license_path)) {
        formData.append("license_path ", this.state.license_path);
      }
      // formData.append("interior_business_path ", this.state.interior_business_path);
      // formData.append("exterior_business_path ", this.state.exterior_business_path);
      // formData.append("license_path ", this.state.license_path);
      this.props.update_dealer_profile(formData, this.props.user_id);
    }
  };
  update_profile_owners = (index) => {
    // if (!this.state.owner[index].first_name.trim() == '') {
    if (!this.state.owner[index].first_name) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              first_name_error: "Please Enter First Name",
            };
          }
          return item;
        }),
      });
      return false;
    }
    // if (this.state.owner[index].last_name.trim() == '') {
    if (!this.state.owner[index].last_name) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              last_name_error: "Please Enter Last Name",
            };
          }
          return item;
        }),
      });
      return false;
    }
    // if (this.state.owner[index].full_address.trim() == '') {
    if (!this.state.owner[index].full_address) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              full_address_error: "Please Enter Address",
            };
          }
          return item;
        }),
      });
      return false;
    }
    // if (this.state.owner[index].city.trim() == '') {
    if (!this.state.owner[index].city) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              owner_city_error: "Please Enter City",
            };
          }
          return item;
        }),
      });
      return false;
    }
    // if (this.state.owner[index].province.trim() == '') {
    if (!this.state.owner[index].province) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              owner_province_error: "Please Enter Province",
            };
          }
          return item;
        }),
      });
      return false;
    }
    // if (this.state.owner[index].postal_code.trim() == '') {
    if (!this.state.owner[index].postal_code) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              owner_postal_error: "Please Enter Postal Code",
            };
          }
          return item;
        }),
      });
      return false;
    }
    if (this.state.owner[index].postal_code.length !== 7) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              owner_postal_error: "Please Enter Valid Postal Code(A2A 2A2)",
            };
          }
          return item;
        }),
      });
      return false;
    }
    // if (this.state.owner[index].telephone.trim() == '') {
    if (!this.state.owner[index].telephone) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              telephone_error: "Please Enter Phone Number",
            };
          }
          return item;
        }),
      });
      return false;
    }
    // if (this.state.owner[index].percentage_of_ownership.trim() == '') {
    if (!this.state.owner[index].percentage_of_ownership) {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, ownerIndex) => {
          if (index === ownerIndex) {
            return {
              ...item,
              percentage_of_ownership_error:
                "Please Enter Percentage of Ownership",
            };
          }
          return item;
        }),
      });
      return false;
    }

    var formData = new FormData();
    var ownerData = [];
    ownerData = (this.state.owner || []).map((item) => {
      if (item.id) {
        return {
          id: item.id,
          first_name: item.first_name,
          last_name: item.last_name,
          full_address: item.full_address,
          city: item.city,
          province: item.province,
          postal_code: item.postal_code,
          telephone: item.telephone,
          percentage_of_ownership: item.percentage_of_ownership,
          email: item.email,
        };
      } else {
        return {
          first_name: item.first_name,
          last_name: item.last_name,
          full_address: item.full_address,
          city: item.city,
          province: item.province,
          postal_code: item.postal_code,
          telephone: item.telephone,
          percentage_of_ownership: item.percentage_of_ownership,
          email: item.email,
        };
      }
    });
    formData.append("dealer_owners", JSON.stringify(ownerData));
    this.props.update_dealer_profile(formData, this.props.user_id);
  };
  handleChangeOwnerProvince = (e, ownerIndex, formName, name) => {
    this.setState({
      ...this.state,
      owner: this.state.owner.slice().map((item, index) => {
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
      }),
    });
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
    return (
      <React.Fragment>
        <Helmet>
          <title>Dealer - Profile</title>
          <meta name="description" content="" />
        </Helmet>
        <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
          <div className="dealer-profile-container">
            <div className="dealer-tab">
              <div className="accordion" id="accordionExample">
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Dealership Information
                      </button>
                    </h2>
                  </div>

                  <div
                    id="collapseOne"
                    className="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <div className="dealer-info-container">
                        <div className="dealer-form-step-one">
                          <div className="form-left">
                            <label>Dealership Legal Name</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={this.state.name}
                              onChange={this.handleOnchange}
                              onBlur={() =>
                                this.validator.showMessageFor("Dealer Name")
                              }
                            />
                            {this.validator.message(
                              "Dealer Name",
                              this.state.name,
                              "required"
                            )}
                          </div>

                          <div className="form-right">
                            <label>Dealership Operating Name</label>
                            <input
                              type="text"
                              id="operating_name"
                              name="operating_name"
                              value={this.state.operating_name}
                              onChange={this.handleOnchange}
                              onBlur={() =>
                                this.validator.showMessageFor(
                                  "Dealer Operation Name"
                                )
                              }
                            />
                            {this.validator.message(
                              "Dealer Operation Name",
                              this.state.operating_name,
                              "required"
                            )}
                          </div>
                        </div>

                        <div className="dealer-form-step-one">
                          <div className="form-left">
                            <label>Street address</label>
                            <input
                              type="text"
                              id="street_address"
                              name="street_address"
                              value={this.state.street_address}
                              onChange={this.handleOnchange}
                              onBlur={() =>
                                this.validator.showMessageFor("Street address")
                              }
                            />
                            {this.validator.message(
                              "Street address",
                              this.state.street_address,
                              "required"
                            )}
                          </div>

                          <div className="form-right">
                            <label>City</label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={capitalize(this.state.city)}
                              onChange={this.handleOnchange}
                              onBlur={() =>
                                this.validator.showMessageFor("city")
                              }
                            />
                            {this.validator.message(
                              "city",
                              this.state.city,
                              "required"
                            )}
                          </div>
                        </div>

                        <div className="dealer-form-step-one">
                          <div className="form-left">
                            <label>Province</label>
                            <Select
                              required
                              placeholder="Select Seating"
                              id="selectProvince"
                              name="selectProvince"
                              options={this.state.provinces}
                              onChange={(e) =>
                                this.changeSelect(
                                  e,
                                  "province",
                                  "selectProvince"
                                )
                              }
                              value={this.state.selectProvince}
                              className="react-select-main"
                              classNamePrefix="react-select"
                              components={{
                                Option: renderOption,
                                MenuList: renderScrollbar,
                              }}
                            />
                            {this.validator.message(
                              "province",
                              this.state.province,
                              "required"
                            )}
                          </div>

                          <div className="form-right">
                            <label>Postal Code</label>
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
                              id="postal_code"
                              name="postal_code"
                              value={this.state.postal_code}
                              onChange={this.handleOnchange}
                              onBlur={() =>
                                this.validator.showMessageFor("Postal Code")
                              }
                            />
                            {this.validator.message(
                              "Postal Code",
                              this.state.postal_code,
                              "required|max:7|regex:[a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9] [a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9]"
                            )}
                          </div>
                        </div>

                        <div className="dealer-form-step-one">
                          <div className="form-left">
                            <label>Email</label>
                            <input
                              type="text"
                              id="email"
                              name="email"
                              value={this.state.email}
                              disabled
                            />
                          </div>

                          <div className="form-right">
                            <label>Telephone</label>
                            <NumberFormat
                              className="form-control"
                              format="+1 (###) ###-####"
                              onChange={this.handleOnchange}
                              value={this.state.phone}
                              name="phone"
                              onBlur={() =>
                                this.validator.showMessageFor("telephone")
                              }
                            />
                            {this.validator.message(
                              "telephone",
                              this.state.phone,
                              "required"
                            )}
                          </div>
                        </div>

                        <div className="dealer-form-step-one">
                          <div className="form-left">
                            <label>Fax (optional)</label>
                            <NumberFormat
                              className="form-control"
                              format="+1 (###) ###-####"
                              onChange={this.handleOnchange}
                              value={this.state.fax}
                              name="fax"
                            />
                          </div>

                          <div className="form-right">
                            <label>Number of Owners</label>
                            <Select
                              required
                              placeholder="Select Owner"
                              id="selected_no_of_owner"
                              name="selected_no_of_owner"
                              options={[
                                { label: 1, value: 1 },
                                { label: 2, value: 2 },
                                { label: 3, value: 3 },
                                { label: 4, value: 4 },
                                { label: 5, value: 5 },
                              ]}
                              onChange={(e) =>
                                this.changeSelect(
                                  e,
                                  "no_of_owner",
                                  "selected_no_of_owner"
                                )
                              }
                              value={this.state.selected_no_of_owner}
                              className="react-select-main"
                              classNamePrefix="react-select"
                              components={{
                                Option: renderOption,
                                MenuList: renderScrollbar,
                              }}
                            />
                          </div>
                        </div>

                        <div className="dealer-form-step-one">
                          <div className="form-left">
                            <button
                              type="button"
                              onClick={this.update_Profile}
                              disabled={this.props.profile_update_loading}
                            >
                              {this.props.profile_update_loading === true ? (
                                <i
                                  class="fa fa-circle-o-notch fa-spin"
                                  aria-hidden="true"
                                ></i>
                              ) : (
                                "Update"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header" id="headingTwo">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                      >
                        Owner’s Information
                      </button>
                    </h2>
                  </div>

                  <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <div className="dealer-info-container">
                        {(this.state.owner || []).map((item, index) => (
                          <React.Fragment key={index}>
                            <button
                              class="btn btn-primary"
                              type="button"
                              data-toggle="collapse"
                              data-target={`#collapseinner-${index}`}
                              aria-expanded="false"
                              aria-controls={`collapseinner-${index}`}
                            >
                              {index + 1}st Owner
                            </button>

                            <div class="collapse" id={`collapseinner-${index}`}>
                              <div className="card card-body">
                                <div className="dealer-info-container">
                                  <div className="dealer-form-step-one">
                                    <div className="form-left">
                                      <label>First Name</label>
                                      <input
                                        className="form-control"
                                        placeholder="First Name"
                                        type="text"
                                        name="first_name"
                                        onChange={(e) =>
                                          this.handleChangeOwner(e, index)
                                        }
                                        value={item.first_name}
                                        onBlur={() =>
                                          this.handleOnClickOwnerNextBlur(index)
                                        }
                                      />
                                      {item.first_name_error !== "" ? (
                                        <div
                                          className="srv-validation-message"
                                          style={{ color: "red" }}
                                        >
                                          {item.first_name_error}
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div className="form-right">
                                      <label>Last Name</label>
                                      <input
                                        className="form-control"
                                        placeholder="Last Name"
                                        type="text"
                                        name="last_name"
                                        onChange={(e) =>
                                          this.handleChangeOwner(e, index)
                                        }
                                        value={item.last_name}
                                        onBlur={() =>
                                          this.handleOnClickOwnerNextBlur(index)
                                        }
                                      />
                                      {item.last_name_error !== "" ? (
                                        <div
                                          className="srv-validation-message"
                                          style={{ color: "red" }}
                                        >
                                          {item.last_name_error}
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>

                                  <div className="dealer-form-step-one">
                                    <div className="form-left">
                                      <label>Street address</label>
                                      <input
                                        className="form-control"
                                        placeholder="Street address"
                                        type="text"
                                        name="full_address"
                                        onChange={(e) =>
                                          this.handleChangeOwner(e, index)
                                        }
                                        value={item.full_address}
                                        onBlur={() =>
                                          this.handleOnClickOwnerNextBlur(index)
                                        }
                                      />
                                      {item.full_address_error !== "" ? (
                                        <div
                                          className="srv-validation-message"
                                          style={{ color: "red" }}
                                        >
                                          {item.full_address_error}
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>

                                    <div className="form-right">
                                      <label>City</label>
                                      <input
                                        className="form-control"
                                        placeholder="City"
                                        type="text"
                                        name="city"
                                        onChange={(e) =>
                                          this.handleChangeOwner(e, index)
                                        }
                                        value={item.owner_city}
                                        onBlur={() =>
                                          this.handleOnClickOwnerNextBlur(index)
                                        }
                                      />
                                      {item.owner_city_error !== "" ? (
                                        <div
                                          className="srv-validation-message"
                                          style={{ color: "red" }}
                                        >
                                          {item.owner_city_error}
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>

                                  <div className="dealer-form-step-one">
                                    <div className="form-left">
                                      <label>Province</label>
                                      <Select
                                        required
                                        placeholder="Select Province"
                                        id="selectProvince"
                                        name="selectProvince"
                                        options={this.state.provinces}
                                        onChange={(e) =>
                                          this.handleChangeOwnerProvince(
                                            e,
                                            index,
                                            "province",
                                            "selectProvince"
                                          )
                                        }
                                        value={item.selectProvince}
                                        className="react-select-main"
                                        classNamePrefix="react-select"
                                        components={{
                                          Option: renderOption,
                                          MenuList: renderScrollbar,
                                        }}
                                        onBlur={() =>
                                          this.handleOnClickOwnerNextBlur(index)
                                        }
                                      />
                                      {item.owner_province_error !== "" ? (
                                        <div
                                          className="srv-validation-message"
                                          style={{ color: "red" }}
                                        >
                                          {item.owner_province_error}
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>

                                    <div className="form-right">
                                      <label>Postal Code</label>
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
                                        id="postal_code"
                                        name="postal_code"
                                        onBlur={() =>
                                          this.handleOnClickOwnerNextBlur(index)
                                        }
                                        value={item.postal_code}
                                        onChange={(e) =>
                                          this.handleChangeOwner(e, index)
                                        }
                                      />
                                      {item.owner_postal_error !== "" ? (
                                        <div
                                          className="srv-validation-message"
                                          style={{ color: "red" }}
                                        >
                                          {item.owner_postal_error}
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>

                                  <div className="dealer-form-step-one">
                                    <div className="form-left">
                                      <label>Email</label>
                                      <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder=""
                                        value={item.email}
                                        onChange={(e) =>
                                          this.handleChangeOwner(e, index)
                                        }
                                      />
                                    </div>

                                    <div className="form-right">
                                      <label>Telephone</label>
                                      <NumberFormat
                                        className="form-control"
                                        format="+1 (###) ###-####"
                                        placeholder="Telephone"
                                        onChange={(e) =>
                                          this.handleChangeOwner(e, index)
                                        }
                                        value={item.telephone}
                                        name="telephone"
                                        onBlur={() =>
                                          this.handleOnClickOwnerNextBlur(index)
                                        }
                                      />
                                      {item.telephone_error !== "" ? (
                                        <div
                                          className="srv-validation-message"
                                          style={{ color: "red" }}
                                        >
                                          {item.telephone_error}
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>

                                  <div className="dealer-form-step-one">
                                    <div className="form-left">
                                      <label>Percentage of Ownership</label>
                                      <NumberFormat
                                        className="form-control"
                                        suffix={"%"}
                                        placeholder="Percentage of Ownership"
                                        onChange={(e) =>
                                          this.handleChangeOwner(e, index)
                                        }
                                        value={item.percentage_of_ownership}
                                        name="percentage_of_ownership"
                                        onBlur={() =>
                                          this.handleOnClickOwnerNextBlur(index)
                                        }
                                      />
                                      {item.percentage_of_ownership_error !==
                                      "" ? (
                                        <div
                                          className="srv-validation-message"
                                          style={{ color: "red" }}
                                        >
                                          {item.percentage_of_ownership_error}
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>

                                    {/* <div className="form-right">
                                                                            <label>Number of Owners</label>
                                                                            <input type="text" id="" name="" placeholder="5" />
                                                                        </div> */}
                                  </div>

                                  <div className="dealer-form-step-one">
                                    <div className="form-left">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          this.update_profile_owners(index)
                                        }
                                      >
                                        Update
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header" id="headingThree">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                      >
                        Photos & Documents
                      </button>
                    </h2>
                  </div>

                  <div
                    id="collapseThree"
                    className="collapse show"
                    aria-labelledby="headingThree"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <div className="dealer-info-container">
                        <div className="dealer-form-step-one pb-0">
                          <div className="form-left-upload">
                            <label
                              className={
                                this.state.void_check_path !== undefined &&
                                this.state.void_check_path !== null &&
                                this.state.void_check_path !== ""
                                  ? "inner-lable active"
                                  : "inner-lable"
                              }
                            >
                              Void Cheque/PAD Form Upload
                            </label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                name="void_check_path"
                                accept="application/pdf, application/docs, .docx"
                                onChange={this._handleImageChange}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFile"
                              >
                                {this.state.void_check_path !== undefined &&
                                this.state.void_check_path !== null &&
                                this.state.void_check_path !== ""
                                  ? "Uploaded"
                                  : "Upload File"}
                              </label>
                            </div>
                          </div>

                          <div className="form-right-upload">
                            <div className="#">
                              <label
                                className={
                                  this.state.interior_business_path !==
                                    undefined &&
                                  this.state.interior_business_path !== null &&
                                  this.state.interior_business_path !== ""
                                    ? "inner-lable active"
                                    : "inner-lable"
                                }
                              >
                                Dealership Interior Photo
                              </label>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  name="interior_business_path"
                                  accept="application/pdf, application/docs, .docx"
                                  onChange={this._handleImageChange}
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="customFile"
                                >
                                  {this.state.interior_business_path !==
                                    undefined &&
                                  this.state.interior_business_path !== null &&
                                  this.state.interior_business_path !== ""
                                    ? "Uploaded"
                                    : "Upload File"}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="dealer-form-step-one">
                          <div className="form-left-upload">
                            <label
                              className={
                                this.state.exterior_business_path !==
                                  undefined &&
                                this.state.exterior_business_path !== null &&
                                this.state.exterior_business_path !== ""
                                  ? "inner-lable active"
                                  : "inner-lable"
                              }
                            >
                              Dealership Exterior Photo
                            </label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                name="exterior_business_path"
                                accept="application/pdf, application/docs, .docx"
                                onChange={this._handleImageChange}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFile"
                              >
                                {this.state.exterior_business_path !==
                                  undefined &&
                                this.state.exterior_business_path !== null &&
                                this.state.exterior_business_path !== ""
                                  ? "Uploaded"
                                  : "Upload File"}
                              </label>
                            </div>
                          </div>

                          <div className="form-right-upload">
                            <div className="#">
                              <label
                                className={
                                  this.state.license_path !== undefined &&
                                  this.state.license_path !== null &&
                                  this.state.license_path !== ""
                                    ? "inner-lable active"
                                    : "inner-lable"
                                }
                              >
                                Article of Incorporation or Master Business
                                License
                              </label>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  name="exterior_business_path"
                                  accept="application/pdf, application/docs, .docx"
                                  onChange={this._handleImageChange}
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="customFile"
                                >
                                  {this.state.license_path !== undefined &&
                                  this.state.license_path !== null &&
                                  this.state.license_path !== ""
                                    ? "Uploaded"
                                    : "Upload File"}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="dealer-form-step-one">
                          <div className="form-left">
                            <button
                              type="button"
                              onClick={this.update_Profile_files}
                            >
                              {this.props.profile_update_loading === true ? (
                                <i
                                  class="fa fa-circle-o-notch fa-spin"
                                  aria-hidden="true"
                                ></i>
                              ) : (
                                "Update"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default DealerProfile;
