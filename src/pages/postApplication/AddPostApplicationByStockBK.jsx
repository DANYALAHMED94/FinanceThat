/* eslint-disable default-case */
import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import dateFormat from "dateformat";
import ApplicantInformation from "./Applicant/ApplicantInformation";
import ApplicantAddress from "./Applicant/ApplicantAddress";
import ApplicantAddress2 from "./Applicant/ApplicantAddress2";
import EmploymentInformation from "./Employment/EmploymentInformation";
import VehicleInformation from "./Vehical/VehicleInformation";
import FinalizeApplication from "./Finalize/FinalizeApplication";
import CoApplicantInformation from "./CoApplicant/CoApplicantInformation";
import CoApplicantEmploymentInformation from "./CoApplicant/CoApplicantEmploymentInformation";
import CoApplicantEmploymentAddress from "./CoApplicant/CoApplicantEmployementAddress";
import VehicleDetail from "./Vehical/VehicleDetail";
import SellerDetail from "./SellerDetail";
import ApplicantMannualAddress from "./Applicant/ApplicantMannualAddress";

import { connect } from "react-redux";
import {
  save_post_application,
  get_stock_by_id,
  reSubmit_post_application,
  confirm_post_application,
  remove_all_post_state,
  update_post_application,
} from "../../actions/postApplication";
import {
  get_vehicle_type,
  get_vehicle_make,
  get_vehicle_model,
  remove_all,
} from "../../actions/addPostActions";
import {
  login,
  register,
  verify_user,
  resend_email,
  verify_otp,
  send_otp,
  postAppRegister,
} from "../../actions/authActions";
import CoApplicantAddress from "./CoApplicant/CoApplicantAddress";
import CoApplicantMannualAddress from "./CoApplicant/CoApplicantMannualAddress";
import VehicleListed from "./ListedFinanceThat/VehicleListed";
import CompletePostEdit from "./Finalize/CompletePostEdit";
import CoApplicantAddress2 from "./CoApplicant/CoApplicantAddress2";
import ConfirmPost from "./SubmitApplication/ConfirmPost";
import ApplicationDeclined from "./SubmitApplication/ApplicationDeclined";
import ApplicationNotFound from "./SubmitApplication/ApplicationNotFound";
import ApplicationApproved from "./SubmitApplication/ApplicationApproved";
import Geocode from "react-geocode";
import TostarMessages from "../../components/alertMessages/TostarMessages";
import SignInModel from "../../components/authModels/SignInModel";
import PostAppSignUpModel from "../../components/authModels/PostAppSignUpModel";
import PostAppVerificationModel from "../../components/authModels/PostAppVerificationModel";
import { toastr } from "react-redux-toastr";
import { Helmet } from "react-helmet";
import { Beforeunload } from "react-beforeunload";
import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmAlertChangeRoute from "../../components/alertMessages/ConfirmAlertChangeRoute";
import InstantApproval from "./InstantApproval";
import EmploymentInformation2 from "./Employment/EmploymentInformation2";

var that;
class AddPostApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicantPreviousStreetAddress: "",
      applicantPreviousStreetAddress2: "",
      previousCity: "",
      selectPreviousProvince: null,
      previousProvince: "",
      previousPostalCode: "",
      applicantPreviousCountry: "",
      durationAtPreviousAddress: "",
      applicantPreviousMonth: "",
      selectPreviousStatus: null,
      previousStatus: "",
      previousMortgageAmount: "",
      signUpdata: {},
      downPaymentCheck: "",
      downPayment: "",
      maritalStatues: [
        { value: "single", label: "Single" },
        { value: "married", label: "Married" },
        { value: "common_law", label: "Common Law" },
        { value: "separated", label: "Separated" },
        { value: "divorced", label: "Divorced" },
        { value: "widowed", label: "Widowed" },
      ],
      maritalStatus: "",
      gender: "",
      selectGender: null,
      genders: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "transgender", label: "Transgender" },
      ],
      selectSalutation: null,
      salutation: "",
      salutations: [
        { value: "mr", label: "Mr." },
        { value: "mrs", label: "Mrs." },
      ],
      selectMaritalStatus: null,
      applicantFirstName: "",
      applicantLastName: "",
      applicantDateOfBirth: null,
      applicantTelephone: "",
      coApplication: "",
      coApplicantFirstName: "",
      coApplicantLastName: "",
      coApplicantDateOfBirth: null,
      coApplicantTelephone: "",
      coEmploymentStep: 0,
      streetName: "",
      applicantStreetAddress: "",
      applicantCountry: "",
      city: "",
      province: "AB",
      postalCode: "",
      applicantAddress: "",
      locationName: "",
      durationAtAddress: "",
      durationYear: new Date(),
      verificationOption: "code",
      phoneNum: "",
      sinNumber: "",
      applicantMonth: "",
      status: "Owned",
      mortgageHolderName: "",
      homeMarketValue: "",
      mortgageAmount: "",
      coStreetName: "",
      coApplicantStreetAddress: "",
      coApplicantCountry: "",
      coCity: "",
      coProvince: "AB",
      coPostalCode: "",
      coLocationName: "",
      coApplicantAddress: "",
      coDurationAtAddress: "",
      coMaritalStatus: "",
      selectCoMaritalStatus: "",
      coStatus: "Owned",
      coSinNumber: "",
      coMortgageAmount: "",
      employmentStatus: "Employed",
      typeOfEmployment: "Full Time",
      employerName: "",
      occupation: "",
      employeeBusinessName: "",
      employeeTypeOfBusiness: "",
      employmentSince: null,
      grossIncome: "",
      coEmploymentStatus: "Employed",
      coTypeOfEmployment: "Full Time",
      coEmployerName: "",
      coOccupation: "",
      coEmploymentSince: null,
      coDurationYear: new Date(),
      coApplicantMonth: "",
      coGrossIncome: "",
      coEmployeeBusinessName: "",
      coEmployeeTypeOfBusiness: "",
      listingSource: "Vehicle listed on Finance That",
      vehiclePrice: "",
      typeOfVehicle: "",
      year: null,
      make: "",
      model: "",
      kilometer: "",
      vin: "",
      price: "",
      condition: "new",
      sellerFirstName: "",
      sellerLastName: "",
      sellerName: "",
      sellerStreetAddress: "",
      sellerCity: "",
      sellerProvince: "AB",
      sellerPostalCode: "",
      sellerEmail: "",
      sellerTelephone: "",
      financeAmount: "",
      sellerInfo: "yes",
      terms1: false,
      terms2: false,
      currentTab: 0,
      lastTab: 1,
      step: 1,
      addressChild: "",
      coApplicantAddressChild: "",
      vehicleDetailStep: "",
      lastVehicleDetailStep: "",
      vehicleFinanceStep: "",
      lastVehicleFinanceStep: "",
      coApplicantStep: 1,
      complete: false,
      stockNumber: "",
      finalizeStep: "",
      applicantMannualAddress: 0,
      coApplicantMannualAddress: 0,
      employeeInformationstep: 0,
      employerStreetAddress: "",
      employerCity: "",
      employerProvince: "",
      employerPhone: "",
      employerEmail: "",
      coEmployerStreetAddress: "",
      coEmployerCity: "",
      coEmployerProvince: "",
      coEmployerPhone: "",
      coEmployerEmail: "",
      postSteps: [
        {
          name: "Applicant Information",
          value: 1,
          completed: false,
          current: true,
          disbaled: false,
          tab: 7,
          perc: 0,
        },
        {
          name: "Address",
          value: 2,
          completed: false,
          current: false,
          disbaled: false,
          tab: 6,
          perc: 16.66666666666667,
        },
        {
          name: "Employment Information",
          value: 3,
          completed: false,
          current: false,
          disbaled: false,
          tab: 5,
          perc: 33.33333333333333,
        },
        {
          name: "Co Applicant",
          value: 4,
          completed: false,
          current: false,
          disbaled: false,
          tab: 6,
          perc: 50.00000000000001,
        },
        {
          name: "Vehicle Information",
          value: 5,
          completed: false,
          current: false,
          disbaled: false,
          tab: 4,
          perc: 66.66666666666668,
        },
        {
          name: "Finalize Application",
          value: 6,
          completed: false,
          current: false,
          disbaled: false,
          tab: 1,
          perc: 83.33333333333335,
        },
      ],
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
      statuses: [
        { value: "Owned", label: "Owned" },
        { value: "Rent", label: "Rent" },
        { value: "Live With Parents", label: "Live With Parents" },
        { value: "Other", label: "Other" },
      ],
      employmentStatuses: [
        { label: "Employed", value: "Employed" },
        { label: "Self employed", value: "Self employed" },
        { label: "Retired", value: "Retired" },
        { label: "Unemployed", value: "Unemployed" },
      ],
      typeOfEmployments: [
        { label: "Full Time", value: "Full Time" },
        { label: "Part Time", value: "Part Time" },
        { label: "Seasonal", value: "Seasonal" },
      ],
      listingSources: [
        {
          value: "Vehicle listed on Finance That",
          label: "Vehicle listed on Finance That",
        },
        {
          value: "Vehicle sold somewhere else",
          label: "Vehicle sold somewhere else",
        },
      ],
      backTo: "",
      barPercent: 0,
      response_type: "",
      animation: "fadeInUp",
      totalScreen: 16,
      startPerc: 100 / 6,
      startAddress: 100 / 6 / 2,
      startPerCo: 100 / 6 / 4,
      startVehiclBar: "",
      editPostBar: 0,
      sellerBar: 0,
      selectProvince: { value: "AB", label: "Alberta" },
      selectCoProvince: { value: "AB", label: "Alberta" },
      selectSellerProvince: { value: "AB", label: "Alberta" },
      selectStatus: { value: "Owned", label: "Owned" },
      selectCoStatus: { value: "Owned", label: "Owned" },
      selectEmploymentStatus: [{ value: "Employed", label: "Employed" }],
      selectCoTypeOfEmployment: [{ label: "Full Time", value: "Full Time" }],
      selectTypeOfEmployment: [{ label: "Full Time", value: "Full Time" }],
      selectCoEmploymentStatus: [{ value: "Employed", label: "Employed" }],
      selectListingSource: {
        value: "Vehicle listed on Finance That",
        label: "Vehicle listed on Finance That",
      },
      selectTypeOfVehicle: {},
      selectCondition: { label: "New", value: "new" },
      showMannualAddress: true,
      coShowMannualAddress: true,
      fullEdit: "",
      backFromCo: "",
      showAlert: true,
    };
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    that = this;
  }

  componentDidMount() {
    // window.$('#signInModel').modal('show')
    // window.$("#signUpModel").modal("show");
    this.props.get_vehicle_type();
    //  set Google Maps Geocoding API for purposes of quota management.Its optional but recommended.
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

    // set response language. Defaults to english.
    Geocode.setLanguage("en");

    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion("es");
    if (
      this.props.match.params !== undefined &&
      this.props.match.params.id !== undefined
    ) {
      this.props.get_stock_by_id(this.props.match.params.id);
      this.setState({
        ...this.state,
        stockNumber: this.props.match.params.id,
        vehicleFinanceStep: 1,
        lastVehicleFinanceStep: 1,
      });
    }
  }

  handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "vin") {
      if (value.length > 17) {
        toastr.error("Error", "Vin Number Contain 17 Characters");
        return false;
      }
    }
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  changeEmployementInformation = (val) => {
    if (val > 0) {
      if (!this.validator.fieldValid("Employement Status")) {
        this.validator.showMessageFor("Employement Status");
        this.forceUpdate();
        return false;
      }
      if (this.state.employmentStatus === "Retired") {
        if (!this.validator.fieldValid("Gross Income")) {
          this.validator.showMessageFor("Gross Income");
          this.forceUpdate();
          return false;
        }
      }
      if (this.state.employmentStatus === "Self employed") {
        if (!this.validator.fieldValid("Business Name")) {
          this.validator.showMessageFor("Business Name");
          this.forceUpdate();
          return false;
        }

        if (!this.validator.fieldValid("Employment Since")) {
          this.validator.showMessageFor("Employment Since");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Business Type")) {
          this.validator.showMessageFor("Business Type");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Gross Income")) {
          this.validator.showMessageFor("Gross Income");
          this.forceUpdate();
          return false;
        }

        //                 employeeBusinessName
        // employeeTypeOfBusiness
      }
      if (
        this.state.employmentStatus !== "Unemployed" &&
        this.state.employmentStatus !== "Retired" &&
        this.state.employmentStatus !== "Self employed"
      ) {
        if (!this.validator.fieldValid("Type Of Employee")) {
          this.validator.showMessageFor("Type Of Employee");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Employer Name")) {
          this.validator.showMessageFor("Employer Name");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Employer Occupation")) {
          this.validator.showMessageFor("Employer Occupation");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Employment Since")) {
          this.validator.showMessageFor("Employment Since");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Gross Income")) {
          this.validator.showMessageFor("Gross Income");
          this.forceUpdate();
          return false;
        }
        // if (!this.validator.fieldValid('Gross Income')) {
        //     this.validator.showMessageFor('Gross Income')
        //     this.forceUpdate();
        //     return false
        // }
      }
    }
    this.setState({
      ...this.state,
      employeeInformationstep: val,
    });
  };

  changeCoEmploymentStep = (val) => {
    if (val > 0) {
      if (!this.validator.fieldValid("Co Applicant Employement Status")) {
        this.validator.showMessageFor("Co Applicant Employement Status");
        this.forceUpdate();
        return false;
      }
      if (this.state.coEmploymentStatus === "Retired") {
        if (!this.validator.fieldValid("Co Applicant Gross Income")) {
          this.validator.showMessageFor("Co Applicant Gross Income");
          this.forceUpdate();
          return false;
        }
      }

      if (this.state.coEmploymentStatus === "Self employed") {
        if (!this.validator.fieldValid("Co Applicant Business Name")) {
          this.validator.showMessageFor("Co Applicant Business Name");
          this.forceUpdate();
          return false;
        }

        if (!this.validator.fieldValid("Co Applicant Employment Since")) {
          this.validator.showMessageFor("Co Applicant Employment Since");
          this.forceUpdate();
          return false;
        }

        if (!this.validator.fieldValid("Co Applicant Business Type")) {
          this.validator.showMessageFor("Co Applicant Business Type");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Co Applicant Gross Income")) {
          this.validator.showMessageFor("Co Applicant Gross Income");
          this.forceUpdate();
          return false;
        }
        //                 employeeBusinessName
        // employeeTypeOfBusiness
      }

      if (
        this.state.coEmploymentStatus !== "Unemployed" &&
        this.state.coEmploymentStatus !== "Retired" &&
        this.state.coEmploymentStatus !== "Self employed"
      ) {
        if (!this.validator.fieldValid("Co Applicant Type Of Employee")) {
          this.validator.showMessageFor("Co Applicant Type Of Employee");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Co Applicant Employer Name")) {
          this.validator.showMessageFor("Co Applicant Employer Name");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Co Applicant Employer Occupation")) {
          this.validator.showMessageFor("Co Applicant Employer Occupation");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Co Applicant Employment Since")) {
          this.validator.showMessageFor("Co Applicant Employment Since");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Co Applicant Gross Income")) {
          this.validator.showMessageFor("Co Applicant Gross Income");
          this.forceUpdate();
          return false;
        }
        // if (!this.validator.fieldValid('Co Applicant Gross Income')) {
        //     this.validator.showMessageFor('Co Applicant Gross Income')
        //     this.forceUpdate();
        //     return false
        // }
      }
    }
    this.setState({
      ...this.state,
      coEmploymentStep: val,
    });
  };

  handleOnChangeVehicle = (e) => {
    this.setState({
      ...this.state,
      typeOfVehicle: e,
    });
  };

  handleOnChangeDates = (e, name) => {
    this.setState({
      ...this.state,
      [name]: e,
    });
  };

  changeStep = (e, perc) => {
    let bar = perc;
    // if (e === 5 && (this.state.finalizeStep === '')) {
    //     bar = perc - this.state.startVehiclBar
    // }
    // if (e === 4 && (this.state.finalizeStep === '')) {
    //     bar = perc - this.state.startVehiclBar
    // }
    this.setState({
      ...this.state,
      currentTab: e,
      coApplicantStep: 1,
      addressChild: "",
      coApplicantAddressChild: "",
      applicantMannualAddress: 0,
      coApplicantMannualAddress: 0,
      // barPercent: perc,
      barPercent: bar,
      postSteps: this.state.postSteps.slice().map((item) => {
        return {
          ...item,
          current: item.value == e ? true : false,
        };
      }),
      vehicleDetailStep: "",
      vehicleFinanceStep: "",
      finalizeStep: "",
      animation: "fadeInDown",
    });
  };

  validateVehicleInfor = () => {
    if (!this.validator.fieldValid("Seller Info")) {
      this.validator.showMessageFor("Seller Info");
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid("Listing Source")) {
      this.validator.showMessageFor("Listing Source");
      this.forceUpdate();
      return false;
    }
  };

  changeStepButton = (prev, current, perc) => {
    console.log(prev, current, perc, "prev, current, perc");
    // CCC
    if (prev === 1) {
      console.log(prev, current, perc, "prev, current, perc 1");

      if (!this.validator.fieldValid("Applicant First Name")) {
        this.validator.showMessageFor("Applicant First Name");
        this.forceUpdate();
        return false;
      }
      if (!this.validator.fieldValid("Applicant Last Name")) {
        this.validator.showMessageFor("Applicant Last Name");
        this.forceUpdate();
        return false;
      }
      if (!this.validator.fieldValid("Applicant Date Of Birth")) {
        this.validator.showMessageFor("Applicant Date Of Birth");
        this.forceUpdate();
        return false;
      }

      if (!this.validator.fieldValid("Applicant Telephone")) {
        this.validator.showMessageFor("Applicant Telephone");
        this.forceUpdate();
        return false;
      }
      if (!this.validator.fieldValid("Marital Status")) {
        this.validator.showMessageFor("Marital Status");
        this.forceUpdate();
        return false;
      }
    }
    if (prev === 2 && this.state.addressChild === 1) {
      console.log(prev, current, perc, "prev, current, perc 2");

      if (!this.validator.fieldValid("Duration At Address")) {
        this.validator.showMessageFor("Duration At Address");
        this.forceUpdate();
        return false;
      }
      if (!this.validator.fieldValid("Duration At Address Month")) {
        this.validator.showMessageFor("Duration At Address Month");
        this.forceUpdate();
        return false;
      }
      if (!this.validator.fieldValid("Status")) {
        this.validator.showMessageFor("Status");
        this.forceUpdate();
        return false;
      }
      if (this.state.status === "Owned" || this.state.status === "Rent") {
        if (!this.validator.fieldValid("Mortgage Amount")) {
          this.validator.showMessageFor("Mortgage Amount");
          this.forceUpdate();
          return false;
        }
      }
    }

    // CCC
    if (prev === 3) {
      if (!["Unemployed", "Retired"].includes(this.state.employmentStatus)) {
        if (!this.validator.fieldValid("Employer Street Address")) {
          this.validator.showMessageFor("Employer Street Address");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Employer City")) {
          this.validator.showMessageFor("Employer City");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Employer Province")) {
          this.validator.showMessageFor("Employer Province");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Employer Phone")) {
          this.validator.showMessageFor("Employer Phone");
          this.forceUpdate();
          return false;
        }
      }
      if (this.state.employmentStatus === "Retired") {
        if (!this.validator.fieldValid("Gross Income")) {
          this.validator.showMessageFor("Gross Income");
          this.forceUpdate();
          return false;
        }
      }
      if (!this.validator.fieldValid("Co Applicant")) {
        this.validator.showMessageFor("Co Applicant");
        this.forceUpdate();
        return false;
      }
    }

    if (
      prev === 4 &&
      this.state.coEmploymentStep === 0 &&
      this.state.coApplicantStep === 3 &&
      this.state.coEmploymentStatus === "Retired"
    ) {
      if (!this.validator.fieldValid("Co Gross Income")) {
        this.validator.showMessageFor("Co Gross Income");
        this.forceUpdate();
        return false;
      }
    }
    if (prev === 4 && this.state.coEmploymentStep === 1) {
      // when co-applicant employee step is 2

      if (!["Unemployed", "Retired"].includes(this.state.coEmploymentStatus)) {
        if (!this.validator.fieldValid("Co Employer Street Address")) {
          this.validator.showMessageFor("Co Employer Street Address");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Co Employer City")) {
          this.validator.showMessageFor("Co Employer City");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Co Employer Province")) {
          this.validator.showMessageFor("Co Employer Province");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Co Employer Phone")) {
          this.validator.showMessageFor("Co Employer Phone");
          this.forceUpdate();
          return false;
        }
      }
    }

    // CCC
    if (
      prev === 5 &&
      this.state.listingSource === "Vehicle listed on Finance That"
    ) {
      if (this.state.lastVehicleFinanceStep === 1) {
        if (!this.validator.fieldValid("Stock Number")) {
          this.validator.showMessageFor("Stock Number");
          this.forceUpdate();
          return false;
        }
        if ((this.props.single_stock_detail || []).length === 0) {
          toastr.error("Error", "Please Select Valid Stock Id");
          return false;
        }
      }
    }
    if (
      prev === 5 &&
      this.state.listingSource === "Vehicle sold somewhere else"
    ) {
      if (this.state.vehicleDetailStep === 2) {
        if (!this.validator.fieldValid("Seller Name")) {
          this.validator.showMessageFor("Seller Name");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Seller City")) {
          this.validator.showMessageFor("Seller City");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Seller Province")) {
          this.validator.showMessageFor("Seller Province");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Seller Email")) {
          this.validator.showMessageFor("Seller Email");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Seller Telephone")) {
          this.validator.showMessageFor("Seller Telephone");
          this.forceUpdate();
          return false;
        }
      }
    }
    // if (prev === 4) {
    //     if (!this.validator.fieldValid('Seller Info')) {
    //         this.validator.showMessageFor('Seller Info')
    //         this.forceUpdate();
    //         return false
    //     }
    // }

    if (this.state.backTo === "") {
      this.setState({
        ...this.state,
        currentTab: current,
        barPercent: this.state.barPercent + perc,
        postSteps: this.state.postSteps.slice().map((item) => {
          if (item.value == prev) {
            return {
              ...item,
              completed: true,
              current: false,
              disbaled: false,
            };
          }
          return {
            ...item,
            current: item.value == current ? true : false,
            disbaled:
              item.value === 4 && this.state.coApplication === "no"
                ? true
                : item.disbaled,
            completed:
              item.value === 4 && this.state.coApplication === "no"
                ? false
                : item.completed,
          };
        }),
        vehicleDetailStep: this.state.lastVehicleDetailStep,
        animation: perc > 0 ? "fadeInUp" : "fadeInDown",
      });
    } else {
      this.setState({
        ...this.state,
        currentTab: 6,
        backTo: "",
        barPercent: this.state.barPercent + perc,
        postSteps: this.state.postSteps.slice().map((item) => {
          if (item.value == 6) {
            return {
              ...item,
              current: true,
              disbaled: false,
            };
          }
          return {
            ...item,
            current: false,
            disbaled:
              item.value === 4 && this.state.coApplication === "no"
                ? true
                : item.disbaled,
            completed:
              item.value === 4 && this.state.coApplication === "no"
                ? false
                : item.completed,
          };
        }),
        vehicleDetailStep: this.state.lastVehicleDetailStep,
      });
    }
  };

  changeAddress = (child, name, prev, perc) => {
    if (prev === 2) {
      if (this.state.showMannualAddress === false) {
        if (!this.validator.fieldValid("Applicant Address")) {
          this.validator.showMessageFor("Applicant Address");
          this.forceUpdate();
          return false;
        }
      }
      if (this.state.showMannualAddress === true) {
        if (!this.validator.fieldValid("Street Address")) {
          this.validator.showMessageFor("Street Address");
          this.forceUpdate();
          return false;
        }

        if (!this.validator.fieldValid("City")) {
          this.validator.showMessageFor("City");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Province")) {
          this.validator.showMessageFor("Province");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Postal Code")) {
          this.validator.showMessageFor("Postal Code");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Applicant Country")) {
          this.validator.showMessageFor("Applicant Country");
          this.forceUpdate();
          return false;
        }
      }
    }
    this.setState({
      ...this.state,
      [name]: child,
      barPercent: this.state.barPercent + perc,
      animation: perc > 0 ? "fadeInUp" : "fadeInDown",
    });
  };

  changeCoAddress = (child, name, prev, perc) => {
    if (prev === 2) {
      if (this.state.coShowMannualAddress === false) {
        if (!this.validator.fieldValid("Co Applicant Address")) {
          this.validator.showMessageFor("Co Applicant Address");
          this.forceUpdate();
          return false;
        }
      }
      if (this.state.coShowMannualAddress === true) {
        if (!this.validator.fieldValid("Co Street Address")) {
          this.validator.showMessageFor("Co Street Address");
          this.forceUpdate();
          return false;
        }

        if (!this.validator.fieldValid("Co City")) {
          this.validator.showMessageFor("Co City");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Co Province")) {
          this.validator.showMessageFor("Co Province");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Co Postal Code")) {
          this.validator.showMessageFor("Co Postal Code");
          this.forceUpdate();
          return false;
        }
      }
    }
    this.setState({
      ...this.state,
      [name]: child,
      barPercent: this.state.barPercent + perc,
      animation: perc > 0 ? "fadeInUp" : "fadeInDown",
    });
  };

  changeVehicleDetail = (e, perc) => {
    if (this.state.currentTab === 5) {
      if (!this.validator.fieldValid("Seller Info")) {
        this.validator.showMessageFor("Seller Info");
        this.forceUpdate();
        return false;
      }
    }
    if (this.state.currentTab === 5 && this.state.listingSource === "") {
      if (!this.validator.fieldValid("Listing Source")) {
        this.validator.showMessageFor("Listing Source");
        this.forceUpdate();
        return false;
      }
    }

    if (
      this.state.currentTab === 5 &&
      this.state.listingSource === "Vehicle sold somewhere else"
    ) {
      // if (this.state.vehicleDetailStep === '') {
      if (e === 1) {
        if (!this.validator.fieldValid("Vehicle Type")) {
          this.validator.showMessageFor("Vehicle Type");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Vehicle Price")) {
          this.validator.showMessageFor("Vehicle Price");
          this.forceUpdate();
          return false;
        }
      }
      // if (this.state.vehicleDetailStep === 1) {
      if (e === 2) {
        if (!this.validator.fieldValid("year")) {
          this.validator.showMessageFor("year");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Vehicle Make")) {
          this.validator.showMessageFor("Vehicle Make");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("Vehicle Model")) {
          this.validator.showMessageFor("Vehicle Model");
          this.forceUpdate();
          return false;
        }
        if (!this.validator.fieldValid("kilometer")) {
          this.validator.showMessageFor("kilometer");
          this.forceUpdate();
          return false;
        }
        if (
          this.state.vin === "" ||
          this.state.vin === undefined ||
          this.state.vin.length < 17
        ) {
          if (!this.validator.fieldValid("Vin")) {
            this.validator.showMessageFor("Vin");
            this.forceUpdate();
            return false;
          }
          // toastr.error('Error', `Please Enter 17 Vin Number `)
          // return false
        }

        // if (!this.validator.fieldValid('Price')) {
        //     this.validator.showMessageFor('Price')
        //     this.forceUpdate();
        //     return false
        // }
        if (!this.validator.fieldValid("Condition")) {
          this.validator.showMessageFor("Condition");
          this.forceUpdate();
          return false;
        }
      }
    }
    this.setState({
      ...this.state,
      vehicleDetailStep: e,
      barPercent: this.state.barPercent + perc,
      animation: perc > 0 ? "fadeInUp" : "fadeInDown",
    });
  };

  changeVehicleFinance = (e, perc) => {
    if (this.state.currentTab === 5) {
      if (this.state.sellerInfo === "") {
        if (!this.validator.fieldValid("Seller Info")) {
          this.validator.showMessageFor("Seller Info");
          this.forceUpdate();
          return false;
        }
      }
    }
    this.setState({
      ...this.state,
      vehicleFinanceStep: e,
      barPercent: this.state.barPercent + perc,
      animation: perc > 0 ? "fadeInUp" : "fadeInDown",
    });
  };

  changeStepCoApplicant = (tab, perc) => {
    if (tab !== "") {
      if (this.state.coApplication === "yes") {
        if (this.state.coApplicantStep === 1) {
          if (!this.validator.fieldValid("Co Applicant First Name")) {
            this.validator.showMessageFor("Co Applicant First Name");
            this.forceUpdate();
            return false;
          }
          if (!this.validator.fieldValid("Co Applicant Last Name")) {
            this.validator.showMessageFor("Co Applicant Last Name");
            this.forceUpdate();
            return false;
          }
          if (!this.validator.fieldValid("Co Applicant Date Of Birth")) {
            this.validator.showMessageFor("Co Applicant Date Of Birth");
            this.forceUpdate();
            return false;
          }
          if (!this.validator.fieldValid("Co Applicant Telephone")) {
            this.validator.showMessageFor("Co Applicant Telephone");
            this.forceUpdate();
            return false;
          }
          if (!this.validator.fieldValid("Co Applicant Marital Status")) {
            this.validator.showMessageFor("Co Applicant Marital Status");
            this.forceUpdate();
            return false;
          }
        }
        if (
          this.state.coApplicantStep === 2 &&
          this.state.coApplicantAddressChild === 1
        ) {
          if (!this.validator.fieldValid("Co Duration At Address")) {
            this.validator.showMessageFor("Co Duration At Address");
            this.forceUpdate();
            return false;
          }
          if (!this.validator.fieldValid("Co Duration At Address Month")) {
            this.validator.showMessageFor("Co Duration At Address Month");
            this.forceUpdate();
            return false;
          }
          if (!this.validator.fieldValid("Co Status")) {
            this.validator.showMessageFor("Co Status");
            this.forceUpdate();
            return false;
          }
          if (
            this.state.coStatus === "Owned" ||
            this.state.coStatus === "Rent"
          ) {
            if (!this.validator.fieldValid("Co Mortgage Amount")) {
              this.validator.showMessageFor("Co Mortgage Amount");
              this.forceUpdate();
              return false;
            }
          }
        }
      }
    }

    this.setState({
      ...this.state,
      coApplicantStep: tab,
      barPercent: this.state.barPercent + perc,
      animation: perc > 0 ? "fadeInUp" : "fadeInDown",
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.type_of_vehicles !== this.props.type_of_vehicles &&
      this.props.type_of_vehicles !== undefined &&
      this.props.type_of_vehicles.length > 0
    ) {
      const typeOfVehicle = this.props.type_of_vehicles[0];
      const type_of_vehicle = {
        value: typeOfVehicle !== undefined ? typeOfVehicle.id : "",
        label: typeOfVehicle !== undefined ? typeOfVehicle.name : "",
      };
      this.setState({
        ...this.state,
        selectTypeOfVehicle: type_of_vehicle,
        typeOfVehicle: typeOfVehicle !== undefined ? typeOfVehicle.id : "",
      });
    }

    if (
      prevState.currentTab !== this.state.currentTab &&
      this.state.currentTab > this.state.lastTab
    ) {
      this.setState({
        ...this.state,
        lastTab: this.state.currentTab,
      });
    }
    if (
      prevState.vehicleDetailStep !== this.state.vehicleDetailStep &&
      this.state.vehicleDetailStep > this.state.lastVehicleDetailStep
    ) {
      this.setState({
        ...this.state,
        lastVehicleDetailStep: this.state.vehicleDetailStep,
      });
    }
    if (
      prevState.vehicleFinanceStep !== this.state.vehicleFinanceStep &&
      this.state.vehicleFinanceStep > this.state.lastVehicleFinanceStep
    ) {
      this.setState({
        ...this.state,
        lastVehicleFinanceStep: this.state.vehicleFinanceStep,
      });
    }
    if (
      prevState.coApplication !== this.state.coApplication &&
      this.state.coApplication !== undefined &&
      this.state.coApplication === "yes"
    ) {
      this.setState({
        ...this.state,
        backTo: "",
        coApplicantStep: 1,
      });
    }
    if (
      prevState.listingSource !== this.state.listingSource &&
      this.state.listingSource !== ""
    ) {
      this.setState({
        ...this.state,
        vehicleDetailStep: "",
        vehiclePrice: "",
        lastVehicleDetailStep: "",
        vehicleFinanceStep: "",
        lastVehicleFinanceStep: "",
        sellerName: "",
        sellerStreetAddress: "",
        sellerCity: "",
        selectSellerProvince: { value: "AB", label: "Alberta" },
        sellerPostalCode: "",
        sellerEmail: "",
        sellerTelephone: "",
        selectCondition: { label: "New", value: "new" },
        vin: "",
        kilometer: "",
        model: "",
        make: "",
        year: "",
        stockNumber: "",
        sellerBar:
          Number(this.state.startPerc) * 4 + Number(this.state.startPerc) / 1.5,
      });
      this.props.remove_all_post_state();
      this.validator.hideMessageFor("Vehicle Price");
      this.validator.hideMessageFor("Seller Name");
      this.validator.hideMessageFor("Seller City");
      this.validator.hideMessageFor("Seller Province");
      this.validator.hideMessageFor("Seller Email");
      this.validator.hideMessageFor("Seller Telephone");
      this.validator.hideMessageFor("Seller Postal Code");
      this.validator.hideMessageFor("year");
      this.validator.hideMessageFor("Vehicle Make");
      this.validator.hideMessageFor("Vehicle Model");
      this.validator.hideMessageFor("kilometer");
      this.validator.hideMessageFor("Vin");
      this.validator.hideMessageFor("Condition");
      this.validator.hideMessageFor("Stock Number");
      this.validator.hideMessageFor("Finance Amount");
      this.validator.hideMessageFor("borrower Terms and Conditions");
      this.validator.hideMessageFor("Credit Report Consent Terms");
      // this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }
    if (
      prevState.sellerInfo !== this.state.sellerInfo &&
      this.state.sellerInfo !== ""
    ) {
      this.setState({
        ...this.state,
        vehicleDetailStep: "",
        lastVehicleDetailStep: "",
        vehicleFinanceStep: "",
        lastVehicleFinanceStep: "",
        finalizeStep: "",
        financeAmount: "",
        startVehiclBar:
          this.state.sellerInfo === "no" && this.state.coApplication === "no"
            ? this.state.startPerc
            : this.state.startPerCo,
      });
    }
    if (
      (prevProps.save_post !== this.props.save_post &&
        this.props.save_post !== undefined) ||
      (prevProps.response_type !== this.props.response_type &&
        this.props.response_type !== "" &&
        this.props.response_type !== undefined)
    ) {
      this.setState({
        ...this.state,
        tab: 6,
        finalizeStep: 2,
        response_type: this.props.response_type,
        barPercent: 100,
        showAlert: false,
        postSteps: this.state.postSteps.slice().map((item) => {
          if (item.value == 6) {
            return {
              ...item,
              completed: true,
              current: false,
              disbaled: true,
            };
          }
          return {
            ...item,
            disbaled: true,
            completed: true,
            current: false,
          };
        }),
      });
    }

    if (prevProps.loggedIn !== this.props.loggedIn) {
      this.setState({
        ...this.state,
        modelName: "",
      });
      // this.setState({
      //     ...this.state,
      //     userEmail: '',
      //     userPassword: ''
      // })
      // // this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      // this.validator.hideMessageFor('User Email')
      // this.validator.hideMessageFor('User Password')
      window.$("#signInModel").modal("hide");
    }
    // if (
    //   prevProps.reSubmit !== this.props.reSubmit &&
    //   this.props.reSubmit !== undefined
    // ) {
    //   this.discardState();
    // }
    if (
      prevProps.registering !== this.props.registering &&
      this.props.registering === true
    ) {
      this.setState({
        ...this.state,
        modelName: "verify",
      });
      // window.$("#signUpModel").modal("hide");
      // window.$("#verificationModel").modal("show");
      setTimeout(() => {
        document.body.classList.add("modal-open");
      }, 500);
    }
    if (
      prevProps.isVerify !== this.props.isVerify &&
      this.props.isVerify === true
    ) {
      window.$("#signUpModel").modal("hide");
      window.$("#verificationModel").modal("hide");
      window.$("#signInModel").modal("hide");
    }
    if (
      prevState.coApplicantAddress !== this.state.coApplicantAddress &&
      this.state.coApplicantAddress !== null &&
      this.state.coApplicantAddress !== undefined &&
      this.state.coApplicantAddress !== ""
    ) {
      new Promise((resolve) => {
        Geocode.fromAddress(this.state.coApplicantAddress.label).then(
          (response) => {
            console.log(response);
            const address = response.results[0].formatted_address;
            let city,
              state,
              country,
              postal_code,
              street_number,
              route,
              state_long;
            for (
              let i = 0;
              i < response.results[0].address_components.length;
              i++
            ) {
              for (
                let j = 0;
                j < response.results[0].address_components[i].types.length;
                j++
              ) {
                switch (response.results[0].address_components[i].types[j]) {
                  case "locality":
                    city = response.results[0].address_components[i].long_name;
                    break;
                  case "administrative_area_level_1":
                    state_long =
                      response.results[0].address_components[i].long_name;
                    state =
                      response.results[0].address_components[i].short_name;

                    break;
                  case "country":
                    country =
                      response.results[0].address_components[i].long_name;
                    break;
                  case "route":
                    route = response.results[0].address_components[i].long_name;
                    break;
                  case "postal_code":
                    postal_code =
                      response.results[0].address_components[i].long_name;
                    break;
                  case "street_number":
                    street_number =
                      response.results[0].address_components[i].long_name;
                    break;
                }
              }
            }
            street_number =
              (street_number === undefined || street_number === null
                ? ""
                : street_number) +
              " " +
              (route === undefined || route === null ? "" : route);
            this.setState({
              ...this.state,
              coProvince: state === undefined || state === null ? "" : state,
              selectCoProvince:
                (state === undefined || state === null) &&
                (state_long === undefined || state_long === null)
                  ? ""
                  : { value: state, label: state_long },
              coCity: city === undefined || city === null ? "" : city,
              coPostalCode:
                postal_code === undefined || postal_code === null
                  ? ""
                  : postal_code,
              coApplicantCountry:
                country === undefined || country === null ? "" : country,
              coApplicantStreetAddress:
                street_number === undefined || street_number === null
                  ? ""
                  : street_number,
              coLocationName: this.state.coApplicantAddress.label,
            });
            // console.log(city, state, country, postal_code, street_number);
            // console.log(response);
          },
          (error) => {
            console.error(error);
          }
        );
      });
    }
    if (
      prevState.applicantAddress !== this.state.applicantAddress &&
      this.state.applicantAddress !== null &&
      this.state.applicantAddress !== undefined &&
      this.state.applicantAddress !== ""
    ) {
      new Promise((resolve) => {
        Geocode.fromAddress(this.state.applicantAddress.label).then(
          (response) => {
            console.log(response);
            const address = response.results[0].formatted_address;
            let city,
              state,
              country,
              postal_code,
              street_number,
              route,
              state_long;
            for (
              let i = 0;
              i < response.results[0].address_components.length;
              i++
            ) {
              for (
                let j = 0;
                j < response.results[0].address_components[i].types.length;
                j++
              ) {
                switch (response.results[0].address_components[i].types[j]) {
                  case "locality":
                    city = response.results[0].address_components[i].long_name;
                    break;
                  case "administrative_area_level_1":
                    // state = response.results[0].address_components[i].long_name;
                    state =
                      response.results[0].address_components[i].short_name;
                    state_long =
                      response.results[0].address_components[i].long_name;
                    break;
                  case "route":
                    route = response.results[0].address_components[i].long_name;
                    break;
                  case "country":
                    country =
                      response.results[0].address_components[i].long_name;
                    break;
                  case "postal_code":
                    postal_code =
                      response.results[0].address_components[i].long_name;
                    break;
                  case "street_number":
                    street_number =
                      response.results[0].address_components[i].long_name;
                    break;
                }
              }
            }
            street_number =
              (street_number === undefined || street_number === null
                ? ""
                : street_number) +
              " " +
              (route === undefined || route === null ? "" : route);
            this.setState({
              ...this.state,
              province: state === undefined || state === null ? "" : state,
              selectProvince:
                (state === undefined || state === null) &&
                (state_long === undefined || state_long === null)
                  ? ""
                  : { value: state, label: state_long },
              city: city === undefined || city === null ? "" : city,
              postalCode:
                postal_code === undefined || postal_code === null
                  ? ""
                  : postal_code,
              applicantCountry:
                country === undefined || country === null ? "" : country,
              applicantStreetAddress:
                street_number === undefined || street_number === null
                  ? ""
                  : street_number,
              locationName: this.state.applicantAddress.label,
            });
            // console.log(city, state, country, postal_code, street_number);
            // console.log(response);
          },
          (error) => {
            console.error(error);
          }
        );
      });
    }
    if (
      prevProps.userVerified !== this.props.userVerified &&
      this.props.userVerified === false
    ) {
      window.$("#signUpModel").modal("hide");
      window.$("#verificationModel").modal("show");
      window.$("#signInModel").modal("hide");
    }
  }

  handleLocationChange = (e, name) => {
    this.setState({
      ...this.state,
      [name]: e,
    });
  };
  toggleHandleOnChangeTerm1 = (e) => {
    this.setState((prevState) => ({
      ...this.state,
      terms1: !prevState.terms1,
    }));
  };
  toggleHandleOnChangeTerm2 = (e) => {
    this.setState((prevState) => ({
      ...this.state,
      terms2: !prevState.terms2,
    }));
  };
  toggleHandleOnChangeVerification = (value) => {
    this.setState((prevState) => ({
      ...this.state,
      verificationOption: value,
    }));
  };

  updateSubmitPost = () => {
    if (this.state.sellerInfo === "no") {
      if (!this.validator.fieldValid("Finance Amount")) {
        this.validator.showMessageFor("Finance Amount");
        this.forceUpdate();
        return false;
      }
    }
    // if (!this.validator.fieldValid("Down Payment")) {
    //   this.validator.showMessageFor("Down Payment");
    //   this.forceUpdate();
    //   return false;
    // }
    // if (this.state.downPaymentCheck === "yes") {
    //   if (!this.validator.fieldValid("Down Payment Amount")) {
    //     this.validator.showMessageFor("Down Payment Amount");
    //     this.forceUpdate();
    //     return false;
    //   }
    // }
    let seller = {};
    let vehicle = {};
    if (this.state.listingSource === "Vehicle sold somewhere else") {
      vehicle = {
        year: dateFormat(this.state.year, "yyyy"),
        make: this.state.make,
        model: this.state.model,
        vin: this.state.vin,
        price:
          this.state.vehiclePrice === ""
            ? 0
            : this.state.vehiclePrice
                .toString()
                .split(",")
                .join("")
                .replace("$", ""),
        condition: this.state.condition,
        type_of_vehicle: this.state.typeOfVehicle,
      };
      seller = {
        dealership_name: this.state.sellerName,
        first_name: this.state.sellerFirstName,
        last_name: this.state.sellerLastName,
        street: this.state.sellerStreetAddress,
        city: this.state.sellerCity,
        province: this.state.sellerProvince,
        postal_code: this.state.sellerPostalCode,
        email: this.state.sellerEmail,
        telephone: this.state.sellerTelephone,
      };
    }

    if (this.state.kilometer !== "" && this.state.kilometer.trim() !== "") {
      vehicle.kilometer =
        this.state.kilometer == ""
          ? 0
          : this.state.kilometer.split(",").join("");
    }

    let data = {
      user: this.props.user_id,
      first_name: this.state.applicantFirstName,
      last_name: this.state.applicantLastName,
      dob: dateFormat(this.state.applicantDateOfBirth, "yyyy-mm-dd"),
      marital_status: this.state.maritalStatus,
      gender: this.state.gender,
      salutation: this.state.salutation,
      // telephone: this.state.applicantTelephone,
      address: this.state.locationName,
      country: this.state.applicantCountry,
      street_address: this.state.applicantStreetAddress,
      city: this.state.city,
      province: this.state.province,
      postal_code: this.state.postalCode,
      duration_address_yr: this.state.durationAtAddress,
      status: this.state.status,
      business_name: this.state.employeeBusinessName,
      type_of_business: this.state.employeeTypeOfBusiness,
      mortgage_holder_name: "Remove From Design",
      home_market_value:
        this.state.homeMarketValue == ""
          ? 0
          : this.state.homeMarketValue.split(",").join("").replace("$", ""),
      mortgage_amount:
        this.state.mortgageAmount == ""
          ? 0
          : this.state.mortgageAmount.split(",").join("").replace("$", ""),
      employer_name: this.state.employerName,
      // employer_street_address: this.state.employerStreetAddress,
      employer_address: this.state.employerStreetAddress,
      employer_city: this.state.employerCity,
      employer_province: this.state.employerProvince,
      employer_telephone: this.state.employerPhone,
      employer_email: this.state.employerEmail,
      sin: this.state.sinNumber,
      application_status: "pending",
      employement_status: this.state.employmentStatus,
      type_of_employment: this.state.typeOfEmployment,
      occupation: this.state.occupation,
      employment_since: dateFormat(this.state.employmentSince, "yyyy-mm-dd"),
      // employment_since: this.state.employmentSince,
      gross_income:
        this.state.grossIncome == ""
          ? 0
          : this.state.grossIncome.split(",").join("").replace("$", ""),
      vin_number: this.state.vin,
      // category: this.state.typeOfVehicle !== null && this.state.typeOfVehicle !== '' ? this.state.typeOfVehicle.value : '',
      category: this.state.typeOfVehicle,
      // vehicle: Object.keys(vehicle).length > 0 ? [vehicle] : [],
      seller: seller,
      // document: {},
      duration_address_mn: this.state.applicantMonth,
      down_payment: this.state.downPayment
        ? this.state.downPayment.split(",").join("").replace("$", "")
        : 0,
    };

    if (
      this.state.listingSource === "Vehicle sold somewhere else" &&
      this.state.sellerInfo !== "no"
    ) {
      data.financing_amount =
        this.state.vehiclePrice === ""
          ? 0
          : this.state.vehiclePrice
              .toString()
              .split(",")
              .join("")
              .replace("$", "");
    } else if (
      this.state.listingSource === "Vehicle listed on Finance That" &&
      this.state.sellerInfo !== "no"
    ) {
      data.financing_amount =
        this.props.single_stock_detail !== undefined &&
        this.props.single_stock_detail !== null &&
        this.props.single_stock_detail.length > 0
          ? this.props.single_stock_detail[0] !== undefined &&
            this.props.single_stock_detail[0] !== null
            ? this.props.single_stock_detail[0].price !== undefined &&
              this.props.single_stock_detail[0].price !== null &&
              this.props.single_stock_detail[0].price !== ""
              ? this.props.single_stock_detail[0].price
                  .toString()
                  .split(",")
                  .join("")
                  .replace("$", "")
              : 0
            : 0
          : 0;
      data.user_id =
        this.props.single_stock_detail !== undefined &&
        this.props.single_stock_detail !== null &&
        this.props.single_stock_detail.length > 0
          ? this.props.single_stock_detail[0] !== undefined &&
            this.props.single_stock_detail[0] !== null
            ? this.props.single_stock_detail[0].user_id &&
              this.props.single_stock_detail[0].user_id.id
              ? this.props.single_stock_detail[0].user_id.id
              : ""
            : ""
          : "";
      // Add Vehicle When Add Stock Id
      vehicle = {
        type_of_vehicle:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].category
                ? this.props.single_stock_detail[0].category.id
                : this.props.single_stock_detail[0].category.id
              : ""
            : "",
        year:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].year
                ? this.props.single_stock_detail[0].year
                : ""
              : ""
            : "",
        make:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].make
                ? this.props.single_stock_detail[0].make.make_name
                : this.props.single_stock_detail[0].make.make_name
              : ""
            : "",
        model:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].model
                ? this.props.single_stock_detail[0].model.model_make
                : this.props.single_stock_detail[0].model.model_make
              : ""
            : "",
        vin:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].vin
                ? this.props.single_stock_detail[0].vin
                : ""
              : ""
            : "",
        price:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].price
                ? this.props.single_stock_detail[0].price
                : 0
              : 0
            : 0,
        condition:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].v_condition
                ? this.props.single_stock_detail[0].v_condition
                : ""
              : ""
            : "",
        trim:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].trim
                ? this.props.single_stock_detail[0].trim
                : ""
              : ""
            : "",
        kilometer:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].kilometer
                ? this.props.single_stock_detail[0].kilometer
                : ""
              : ""
            : "",
        stock_id: this.state.stockNumber,
      };
    } else {
      data.financing_amount =
        this.state.financeAmount == ""
          ? 0
          : this.state.financeAmount.split(",").join("").replace("$", "");
    }

    if (this.state.coApplication === "yes") {
      data.co_applicant = {
        first_name: this.state.coApplicantFirstName,
        last_name: this.state.coApplicantLastName,
        dob: dateFormat(this.state.coApplicantDateOfBirth, "yyyy-mm-dd"),
        marital_status: this.state.coMaritalStatus,
        // dob: this.state.coApplicantDateOfBirth,
        employer_address: this.state.coEmployerStreetAddress,
        employer_name: this.state.coEmployerName,
        employer_telephone: this.state.coApplicantTelephone,
        telephone: this.state.coApplicantTelephone,
        address: this.state.coLocationName,
        street_address: this.state.coApplicantStreetAddress,
        city: this.state.coCity,
        province: this.state.coProvince,
        country: this.state.coApplicantCountry,
        postal_code: this.state.coPostalCode,
        occupation: this.state.coOccupation,
        duration_address_yr: this.state.coDurationAtAddress,
        duration_address_mn: this.state.coApplicantMonth,
        status: this.state.coStatus,
        mortgage_amount:
          this.state.coMortgageAmount == ""
            ? 0
            : this.state.coMortgageAmount.split(",").join("").replace("$", ""),
        employement_status: this.state.coEmploymentStatus,
        type_of_employment: this.state.coTypeOfEmployment,
        employment_since: dateFormat(
          this.state.coEmploymentSince,
          "yyyy-mm-dd"
        ),
        // employment_since: this.state.coEmploymentSince,
        gross_income:
          this.state.coGrossIncome == ""
            ? 0
            : this.state.coGrossIncome.split(",").join("").replace("$", ""),
        business_name: this.state.coEmployeeBusinessName,
        type_of_business: this.state.coEmployeeTypeOfBusiness,
        sin: this.state.coSinNumber,
      };
    } else {
      data.co_applicant = {};
    }

    if (
      this.state.listingSource === "Vehicle listed on Finance That" &&
      this.state.sellerInfo === "yes"
    ) {
      data.stock = this.state.stockNumber;
    }
    data.vehicle = Object.keys(vehicle).length > 0 ? [vehicle] : [];
    data.additional_item = [];
    data.required_documents = [];
    data.id = this.props.app_id;
    // data.ad_vehicle = {}
    // if (this.state.financeAmount !== '') {
    //     data.financing_amount = this.state.financeAmount == '' ? 0 : this.state.financeAmount.split(',').join("")
    // }
    this.props.update_post_application(data);
    // console.log(this.state, 'state')
    console.log(data);
  };

  submitPost = () => {
    if (this.state.sellerInfo === "no") {
      if (!this.validator.fieldValid("Finance Amount")) {
        this.validator.showMessageFor("Finance Amount");
        this.forceUpdate();
        return false;
      }
    }

    let seller = {};
    let vehicle = {};
    if (this.state.listingSource === "Vehicle sold somewhere else") {
      vehicle = {
        year: dateFormat(this.state.year, "yyyy"),
        make: this.state.make,
        model: this.state.model,
        vin: this.state.vin,
        price:
          this.state.vehiclePrice === ""
            ? 0
            : this.state.vehiclePrice
                .toString()
                .split(",")
                .join("")
                .replace("$", ""),
        condition: this.state.condition,
        type_of_vehicle: this.state.typeOfVehicle,
      };
      seller = {
        dealership_name: this.state.sellerName,
        first_name: this.state.sellerFirstName,
        last_name: this.state.sellerLastName,
        street: this.state.sellerStreetAddress,
        city: this.state.sellerCity,
        province: this.state.sellerProvince,
        postal_code: this.state.sellerPostalCode,
        email: this.state.sellerEmail,
        telephone: this.state.sellerTelephone,
      };
    }

    if (this.state.kilometer !== "" && this.state.kilometer.trim() !== "") {
      vehicle.kilometer =
        this.state.kilometer == ""
          ? 0
          : this.state.kilometer.split(",").join("");
    }

    // previous applicant address
    const previous_applicant_address = {
      street_address: this.state.applicantPreviousStreetAddress,
      street_address_2: this.state.applicantPreviousStreetAddress2,
      city: this.state.previousCity,
      province: this.state.previousCity,
      postal_code: this.state.previousPostalCode,
      duration_address_yr: this.state.durationAtPreviousAddress,
    };
    // previous employer addresss and info
    const previous_employer_address = {
      employer_name: this.state.previousEmployerName,
      employer_address: this.state.previousEmployerStreetAddress,
      employer_city: this.state.previousEmployerCity,
      employer_province: this.state.previousEmployerProvince,
      employer_telephone: this.state.previousEmployerPhone,
      employer_email: this.state.previousEmployerEmail,
      employement_status: this.state.previousCoEmploymentStatus,
      type_of_employment: this.state.previousCoTypeOfEmployment,
      employment_since_year: this.state.previousCoEmploymentSinceYear,
      employment_since_month: this.state.previousCoEmploymentSinceMonth,
      gross_income:
        this.state.previousCoGrossIncome == ""
          ? 0
          : this.state.previousCoGrossIncome
              .split(",")
              .join("")
              .replace("$", ""),
      business_name: this.state.previousEmployeeBusinessName,
      type_of_business: this.state.previousEmployeeTypeOfBusiness,
    };
    // previous co applicant address
    const previous_co_applicant_address = {
      street_address: this.state.coApplicantPreviousStreetAddress,
      street_address_2: this.state.coApplicantPreviousStreetAddress2,
      city: this.state.coApplicantPrevious,
      province: this.state.coPreviousCity,
      postal_code: this.state.coPreviousPostalCode,
      duration_address_yr: this.state.coDurationAtPreviousAddress,
    };

    // previous co employer addresss and info
    const previous_co_employer_address = {
      employer_name: this.state.previousCoEmployerName,
      employer_address: this.state.previousCoEmployerStreetAddress,
      employer_city: this.state.previousCoEmployerCity,
      employer_province: this.state.previousCoEmployerProvince,
      employer_telephone: this.state.previousCoEmployerPhone,
      employer_email: this.state.previousCoEmployerEmail,
      employement_status: this.state.previousCoEmploymentStatus,
      type_of_employment: this.state.previousTypeOfEmployment,
      employment_since_year: this.state.previousEmploymentSinceYear,
      employment_since_month: this.state.previousEmploymentSinceMonth,
      gross_income:
        this.state.previousGrossIncome == ""
          ? 0
          : this.state.previousGrossIncome.split(",").join("").replace("$", ""),
      business_name: this.state.previousCoEmployeeBusinessName,
      type_of_business: this.state.previousCoEmployeeTypeOfBusiness,
    };

    let data = {
      user: this.props.user_id,
      first_name: this.state.applicantFirstName,
      last_name: this.state.applicantLastName,
      dob: dateFormat(this.state.applicantDateOfBirth, "yyyy-mm-dd"),
      marital_status: this.state.maritalStatus,
      // dob: this.state.applicantDateOfBirth,
      telephone: this.state.applicantTelephone,
      address: this.state.locationName,
      country: this.state.applicantCountry,
      street_address: this.state.applicantStreetAddress,
      city: this.state.city,
      province: this.state.province,
      postal_code: this.state.postalCode,
      duration_address_yr: this.state.durationAtAddress,
      status: this.state.status,
      business_name: this.state.employeeBusinessName,
      type_of_business: this.state.employeeTypeOfBusiness,
      mortgage_holder_name: "Remove From Design",
      home_market_value:
        this.state.homeMarketValue == ""
          ? 0
          : this.state.homeMarketValue.split(",").join("").replace("$", ""),
      mortgage_amount:
        this.state.mortgageAmount == ""
          ? 0
          : this.state.mortgageAmount.split(",").join("").replace("$", ""),
      employer_name: this.state.employerName,
      // employer_street_address: this.state.employerStreetAddress,
      employer_address: this.state.employerStreetAddress,
      employer_city: this.state.employerCity,
      employer_province: this.state.employerProvince,
      employer_telephone: this.state.employerPhone,
      employer_email: this.state.employerEmail,
      sin: this.state.sinNumber,
      application_status: "pending",
      employement_status: this.state.employmentStatus,
      type_of_employment: this.state.typeOfEmployment,
      occupation: this.state.occupation,
      employment_since: dateFormat(this.state.employmentSince, "yyyy-mm-dd"),
      // employment_since: this.state.employmentSince,
      gross_income:
        this.state.grossIncome == ""
          ? 0
          : this.state.grossIncome.split(",").join("").replace("$", ""),
      vin_number: this.state.vin,
      // category: this.state.typeOfVehicle !== null && this.state.typeOfVehicle !== '' ? this.state.typeOfVehicle.value : '',
      category: this.state.typeOfVehicle,
      // vehicle: Object.keys(vehicle).length > 0 ? [vehicle] : [],
      seller: seller,
      // document: {},
      duration_address_mn: this.state.applicantMonth,
      down_payment: this.state.downPayment
        ? this.state.downPayment.split(",").join("").replace("$", "")
        : 0,
      interested_vehicle_type: this.state.interestedVehicleType,
      previous_applicant_address: {},
      previous_employer_address: {},
      applicant_email_by_dealer: this.state.applicantEmailByDealer,
    };
    if (this.state.durationAtAddress < 2) {
      data.previous_applicant_address = previous_applicant_address;
    }
    if (this.state.employmentSinceYear < 2) {
      data.previous_employer_address = previous_employer_address;
    }

    if (
      this.state.listingSource === "Vehicle sold somewhere else" &&
      this.state.sellerInfo !== "no"
    ) {
      data.financing_amount =
        this.state.vehiclePrice === ""
          ? 0
          : this.state.vehiclePrice
              .toString()
              .split(",")
              .join("")
              .replace("$", "");
    } else if (
      this.state.listingSource === "Vehicle listed on Finance That" &&
      this.state.sellerInfo !== "no"
    ) {
      data.financing_amount =
        this.props.single_stock_detail !== undefined &&
        this.props.single_stock_detail !== null &&
        this.props.single_stock_detail.length > 0
          ? this.props.single_stock_detail[0] !== undefined &&
            this.props.single_stock_detail[0] !== null
            ? this.props.single_stock_detail[0].price !== undefined &&
              this.props.single_stock_detail[0].price !== null &&
              this.props.single_stock_detail[0].price !== ""
              ? this.props.single_stock_detail[0].price
                  .toString()
                  .split(",")
                  .join("")
                  .replace("$", "")
              : 0
            : 0
          : 0;
      data.user_id =
        this.props.single_stock_detail !== undefined &&
        this.props.single_stock_detail !== null &&
        this.props.single_stock_detail.length > 0
          ? this.props.single_stock_detail[0] !== undefined &&
            this.props.single_stock_detail[0] !== null
            ? this.props.single_stock_detail[0].user_id &&
              this.props.single_stock_detail[0].user_id.id
              ? this.props.single_stock_detail[0].user_id.id
              : ""
            : ""
          : "";
      // Add Vehicle When Add Stock Id
      vehicle = {
        type_of_vehicle:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].category
                ? this.props.single_stock_detail[0].category.id
                : this.props.single_stock_detail[0].category.id
              : ""
            : "",
        year:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].year
                ? this.props.single_stock_detail[0].year
                : ""
              : ""
            : "",
        make:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].make
                ? this.props.single_stock_detail[0].make.make_name
                : this.props.single_stock_detail[0].make.make_name
              : ""
            : "",
        model:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].model
                ? this.props.single_stock_detail[0].model.model_make
                : this.props.single_stock_detail[0].model.model_make
              : ""
            : "",
        vin:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].vin
                ? this.props.single_stock_detail[0].vin
                : ""
              : ""
            : "",
        price:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].price
                ? this.props.single_stock_detail[0].price
                : 0
              : 0
            : 0,
        condition:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].v_condition
                ? this.props.single_stock_detail[0].v_condition
                : ""
              : ""
            : "",
        trim:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].trim
                ? this.props.single_stock_detail[0].trim
                : ""
              : ""
            : "",
        kilometer:
          this.props.single_stock_detail &&
          this.props.single_stock_detail.length > 0
            ? this.props.single_stock_detail[0]
              ? this.props.single_stock_detail[0].kilometer
                ? this.props.single_stock_detail[0].kilometer
                : ""
              : ""
            : "",
        stock_id: this.state.stockNumber,
      };
    } else {
      data.financing_amount =
        this.state.financeAmount == ""
          ? 0
          : this.state.financeAmount.split(",").join("").replace("$", "");
    }

    if (this.state.coApplication === "yes") {
      data.co_applicant = {
        first_name: this.state.coApplicantFirstName,
        last_name: this.state.coApplicantLastName,
        dob: dateFormat(this.state.coApplicantDateOfBirth, "yyyy-mm-dd"),
        marital_status: this.state.coMaritalStatus,
        // dob: this.state.coApplicantDateOfBirth,
        // employer_address: this.state.coApplicantStreetAddress,
        employer_name: this.state.coEmployerName,
        employer_telephone: this.state.coApplicantTelephone,
        telephone: this.state.coApplicantTelephone,
        address: this.state.coLocationName,
        street_address: this.state.coApplicantStreetAddress,
        city: this.state.coCity,
        province: this.state.coProvince,
        country: this.state.coApplicantCountry,
        postal_code: this.state.coPostalCode,
        occupation: this.state.coOccupation,
        duration_address_yr: this.state.coDurationAtAddress,
        duration_address_mn: this.state.coApplicantMonth,
        status: this.state.coStatus,
        mortgage_amount:
          this.state.coMortgageAmount == ""
            ? 0
            : this.state.coMortgageAmount.split(",").join("").replace("$", ""),
        employement_status: this.state.coEmploymentStatus,
        type_of_employment: this.state.coTypeOfEmployment,
        employment_since: dateFormat(
          this.state.coEmploymentSince,
          "yyyy-mm-dd"
        ),
        // employment_since: this.state.coEmploymentSince,
        gross_income:
          this.state.coGrossIncome == ""
            ? 0
            : this.state.coGrossIncome.split(",").join("").replace("$", ""),
        business_name: this.state.coEmployeeBusinessName,
        type_of_business: this.state.coEmployeeTypeOfBusiness,
        sin: this.state.coSinNumber,

        employer_address: this.state.coEmployerStreetAddress,
        employer_city: this.state.coEmployerCity,
        employer_province: this.state.coEmployerProvince,
        employer_telephone: this.state.coEmployerPhone,
        employer_email: this.state.coEmployerEmail,
      };
    } else {
      data.co_applicant = {};
    }

    if (
      this.state.listingSource === "Vehicle listed on Finance That" &&
      this.state.sellerInfo === "yes"
    ) {
      data.stock = this.state.stockNumber;
    }
    data.vehicle = Object.keys(vehicle).length > 0 ? [vehicle] : [];
    data.additional_item = [];
    data.required_documents = [];
    // data.ad_vehicle = {}
    // if (this.state.financeAmount !== '') {
    //     data.financing_amount = this.state.financeAmount == '' ? 0 : this.state.financeAmount.split(',').join("")
    // }
    this.props.save_post_application(data);
    // console.log(this.state, 'state')
    console.log(data);
  };

  emptyFunction = () => {
    return true;
  };

  findStockNumber = () => {
    if (!this.validator.fieldValid("Stock Number")) {
      this.validator.showMessageFor("Stock Number");
      this.forceUpdate();
      return false;
    }
    this.props.get_stock_by_id(this.state.stockNumber);
  };

  changeStepFinalize = (e, perc) => {
    if (e === 1 && this.state.sellerInfo === "no") {
      if (!this.validator.fieldValid("Finance Amount")) {
        this.validator.showMessageFor("Finance Amount");
        this.forceUpdate();
        return false;
      }
    }
    if (
      this.props.user_id === undefined ||
      this.props.user_id === null ||
      this.props.user_id === ""
    ) {
      toastr.error("Error", "Please Login");
      return false;
    }
    if (!this.validator.fieldValid("borrower Terms and Conditions")) {
      this.validator.showMessageFor("borrower Terms and Conditions");
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid("Credit Report Consent Terms")) {
      this.validator.showMessageFor("Credit Report Consent Terms");
      this.forceUpdate();
      return false;
    }
    this.setState({
      ...this.state,
      finalizeStep: e,
      barPercent: this.state.barPercent + perc,
      animation: perc > 0 ? "fadeInUp" : "fadeInDown",
    });
  };

  discardState = () => {
    this.setState({
      userEmail: "",
      downPaymentCheck: "",
      downPayment: "",
      maritalStatus: "",
      selectMaritalStatus: null,
      coMaritalStatus: "",
      selectCoMaritalStatus: "",
      showAlert: false,
      applicantFirstName: "",
      applicantLastName: "",
      applicantDateOfBirth: null,
      applicantTelephone: "",
      coApplication: "",
      coApplicantFirstName: "",
      coApplicantLastName: "",
      coApplicantDateOfBirth: null,
      coApplicantTelephone: "",
      streetName: "",
      applicantStreetAddress: "",
      applicantCountry: "",
      city: "",
      province: "AB",
      postalCode: "",
      applicantAddress: "",
      locationName: "",
      durationAtAddress: "",
      durationYear: new Date(),
      applicantMonth: "",
      status: "Owned",
      mortgageHolderName: "",
      homeMarketValue: "",
      mortgageAmount: "",
      coStreetName: "",
      coApplicantStreetAddress: "",
      coApplicantCountry: "",
      coCity: "",
      coProvince: "AB",
      coPostalCode: "",
      coLocationName: "",
      coApplicantAddress: "",
      coDurationAtAddress: "",
      coStatus: "Owned",
      coMortgageAmount: "",
      employmentStatus: "Employed",
      typeOfEmployment: "Full Time",
      employerName: "",
      occupation: "",
      employeeBusinessName: "",
      employeeTypeOfBusiness: "",
      employmentSince: null,
      grossIncome: "",
      coEmploymentStatus: "Employed",
      coTypeOfEmployment: "Full Time",
      coEmployerName: "",
      coOccupation: "",
      coEmploymentSince: null,
      coDurationYear: new Date(),
      coApplicantMonth: "",
      coGrossIncome: "",
      coEmployeeBusinessName: "",
      coEmployeeTypeOfBusiness: "",
      listingSource: "Vehicle listed on Finance That",
      vehiclePrice: "",
      typeOfVehicle: "",
      year: null,
      make: "",
      model: "",
      kilometer: "",
      vin: "",
      price: "",
      condition: "new",
      sellerFirstName: "",
      sellerLastName: "",
      sellerName: "",
      sellerStreetAddress: "",
      sellerCity: "",
      sellerProvince: "AB",
      sellerPostalCode: "",
      sellerEmail: "",
      sellerTelephone: "",
      financeAmount: "",
      sellerInfo: "",
      verificationOption: "",
      phoneNum: "",
      terms1: false,
      terms2: false,
      currentTab: 1,
      lastTab: 1,
      step: 1,
      addressChild: "",
      coApplicantAddressChild: "",
      vehicleDetailStep: "",
      lastVehicleDetailStep: "",
      vehicleFinanceStep: "",
      lastVehicleFinanceStep: "",
      coApplicantStep: 1,
      complete: false,
      stockNumber: "",
      finalizeStep: "",
      applicantMannualAddress: 0,
      coApplicantMannualAddress: 0,
      postSteps: [
        {
          name: "Applicant Information",
          value: 1,
          completed: false,
          current: true,
          disbaled: false,
          tab: 7,
          perc: 0,
        },
        {
          name: "Address",
          value: 2,
          completed: false,
          current: false,
          disbaled: false,
          tab: 6,
          perc: 16.66666666666667,
        },
        {
          name: "Employment Information",
          value: 3,
          completed: false,
          current: false,
          disbaled: false,
          tab: 5,
          perc: 33.33333333333333,
        },
        {
          name: "Co Applicant",
          value: 4,
          completed: false,
          current: false,
          disbaled: false,
          tab: 6,
          perc: 50.00000000000001,
        },
        {
          name: "Vehicle Information",
          value: 5,
          completed: false,
          current: false,
          disbaled: false,
          tab: 4,
          perc: 66.66666666666668,
        },
        {
          name: "Finalize Application",
          value: 6,
          completed: false,
          current: false,
          disbaled: false,
          tab: 1,
          perc: 83.33333333333335,
        },
      ],
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
      statuses: [
        { value: "Owned", label: "Owned" },
        { value: "Rent", label: "Rent" },
        { value: "Live With Parents", label: "Live With Parents" },
        { value: "Other", label: "Other" },
      ],
      employmentStatuses: [
        { label: "Employed", value: "Employed" },
        { label: "Self employed", value: "Self employed" },
        { label: "Retired", value: "Retired" },
        { label: "Unemployed", value: "Unemployed" },
      ],
      typeOfEmployments: [
        { label: "Full Time", value: "Full Time" },
        { label: "Part Time", value: "Part Time" },
        { label: "Seasonal", value: "Seasonal" },
      ],
      listingSources: [
        {
          value: "Vehicle listed on Finance That",
          label: "Vehicle listed on Finance That",
        },
        {
          value: "Vehicle sold somewhere else",
          label: "Vehicle sold somewhere else",
        },
      ],
      backTo: "",
      barPercent: 0,
      response_type: "",
      animation: "fadeInUp",
      totalScreen: 16,
      startPerc: 100 / 6,
      startAddress: 100 / 6 / 2,
      startPerCo: 100 / 6 / 4,
      startVehiclBar: "",
      editPostBar: 0,
      sellerBar: 0,
      selectProvince: { value: "AB", label: "Alberta" },
      selectCoProvince: { value: "AB", label: "Alberta" },
      selectSellerProvince: { value: "AB", label: "Alberta" },
      selectStatus: { value: "Owned", label: "Owned" },
      selectCoStatus: { value: "Owned", label: "Owned" },
      selectEmploymentStatus: [{ value: "Employed", label: "Employed" }],
      selectCoTypeOfEmployment: [{ label: "Full Time", value: "Full Time" }],
      selectTypeOfEmployment: [{ label: "Full Time", value: "Full Time" }],
      selectCoEmploymentStatus: [{ value: "Employed", label: "Employed" }],
      selectListingSource: {
        value: "Vehicle listed on Finance That",
        label: "Vehicle listed on Finance That",
      },
      selectTypeOfVehicle: {},
      selectCondition: { label: "New", value: "new" },
      showMannualAddress: true,
      coShowMannualAddress: true,
      fullEdit: "",
      backFromCo: "",
      sinNumber: "",
      coSinNumber: "",
    });
    this.props.remove_all_post_state();
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  };

  editPost = (step, backTo, vehicleStep, perc) => {
    if (
      this.state.sellerInfo === "yes" &&
      this.state.listingSource === "Vehicle listed on Finance That"
    ) {
      this.setState({
        ...this.state,
        currentTab: step,
        coApplicantStep: step === 4 ? 1 : this.state.coApplicantStep,
        coApplicantAddressChild:
          step === 4 ? "" : this.state.coApplicantAddressChild,
        addressChild: step === 2 ? "" : this.state.addressChild,
        applicantMannualAddress:
          step === 2 ? 0 : this.state.applicantMannualAddress,
        coApplicantMannualAddress:
          step === 4 ? 0 : this.state.coApplicantMannualAddress,
        barPercent: perc,
        postSteps: this.state.postSteps.slice().map((item) => {
          if (item.value == step) {
            return {
              ...item,
              current: !item.current,
            };
          }
          return item;
        }),
        backTo: backTo,
        backFromCo: backTo,
        fullEdit: vehicleStep === "" ? "edit" : "",
        vehicleFinanceStep: vehicleStep,
        animation: "fadeInDown",
      });
    } else {
      this.setState({
        ...this.state,
        currentTab: step,
        coApplicantStep: step === 4 ? 1 : this.state.coApplicantStep,
        addressChild: step === 2 ? "" : this.state.addressChild,
        coApplicantAddressChild:
          step === 4 ? "" : this.state.coApplicantAddressChild,
        applicantMannualAddress:
          step === 2 ? 0 : this.state.applicantMannualAddress,
        coApplicantMannualAddress:
          step === 4 ? 0 : this.state.coApplicantMannualAddress,
        barPercent: perc,
        postSteps: this.state.postSteps.slice().map((item) => {
          if (item.value == step) {
            return {
              ...item,
              current: !item.current,
            };
          }
          return item;
        }),
        backTo: backTo,
        backFromCo: backTo,
        vehicleDetailStep: vehicleStep,
        fullEdit: vehicleStep === "" ? "edit" : "",
        finalizeStep:
          this.state.selleInfo === "no" && step === 5
            ? ""
            : this.state.finalizeStep,
        animation: "fadeInDown",
      });
    }
  };

  handleOnChangeSelect = (e, name) => {
    this.setState({
      ...this.state,
      [name]: e,
    });
  };

  changePasswordField = () => {
    this.setState({
      ...this.state,
      changePasswordField: !this.state.changePasswordField,
    });
  };

  changeConformPasswordField = () => {
    this.setState({
      ...this.state,
      changeConformPasswordField: !this.state.changeConformPasswordField,
    });
  };

  modelClose = () => {
    this.setState({
      ...this.state,
      userEmail: "",
    });
    return true;
  };

  toggleModel = (e) => {
    if (e === "signIn") {
      window.$("#signUpModel").modal("hide");
      window.$("#signInModel").modal("show");
    }
    if (e === "signUp") {
      window.$("#signUpModel").modal("show");
      window.$("#signInModel").modal("hide");
    }
  };

  changeSelect = (e, formName, name) => {
    this.setState({
      ...this.state,
      [name]: e,
      [formName]:
        e !== undefined && e !== null
          ? e.value !== undefined && e.value !== null
            ? e.value
            : ""
          : "",
    });
  };

  changeMannualAddress = (value, name) => {
    console.log(name, value);
    this.setState({
      ...this.state,
      [name]: value,
      animation: value > 0 ? "fadeInUp" : "fadeInDown",
    });
  };

  responseGoogle = (response) => {
    console.log(response, "Google response");
    if (response.profileObj) {
      this.setState({
        ...this.state,
        userEmail: response.profileObj.email,
      });
      const data = {
        full_name:
          response.profileObj.givenName + " " + response.profileObj.familyName,
        email: response.profileObj.email,
        access_token: response.profileObj.googleId,
        login_type: 1,
        user_type: 1,
      };
      this.props.register(data);
    }
  };

  componentWillUnmount() {
    this.props.remove_all();
    this.props.remove_all_post_state();
  }

  setCell = (value) => {
    this.setState({
      ...this.state,
      phoneNum: value,
    });
  };
  setSignUpData = (data) => {
    this.setState({
      ...this.state,
      signUpdata: data,
    });
    window.$("#signUpModel").modal("hide");
    window.$("#signInModel").modal("hide");
    window.$("#verificationModel").modal("show");
  };
  render() {
    console.log(this.state, "application");
    const clickAble = this.state.lastTab > this.state.currentTab;
    const percentBar = `${this.state.barPercent}%`;
    const applicantInfor = this.state.postSteps
      .filter((item) => item.value === 1)
      .map((item) => {
        return item.perc;
      })[0];
    const applicantAddress = this.state.postSteps
      .filter((item) => item.value === 2)
      .map((item) => {
        return item.perc;
      })[0];
    const employmentInfo = this.state.postSteps
      .filter((item) => item.value === 3)
      .map((item) => {
        return item.perc;
      })[0];
    const coApplicationBar = this.state.postSteps
      .filter((item) => item.value === 4)
      .map((item) => {
        return item.perc;
      })[0];
    const vehicleInformation = this.state.postSteps
      .filter((item) => item.value === 5)
      .map((item) => {
        return item.perc;
      })[0];
    const finalizeDetail = this.state.postSteps
      .filter((item) => item.value === 6)
      .map((item) => {
        return item.perc;
      })[0];
    return (
      <React.Fragment>
        <Helmet>
          <title>My applications</title>
          <meta name="description" content="" />
        </Helmet>
        <NavigationPrompt
          renderIfNotActive={true}
          // when={(crntLocation, nextLocation) => !nextLocation || !nextLocation.pathname.startsWith(crntLocation.pathname)}
          when={this.state.showAlert}
        >
          {({ isActive, onCancel, onConfirm }) => {
            if (isActive) {
              window.$("#confirmModelChangeRoute").modal("show");
              return (
                <ConfirmAlertChangeRoute
                  buttonAction={onConfirm}
                  cancel={onCancel}
                  id={""}
                  heading={"Are You Sure?"}
                  section1={
                    "Are you sure you want to leave this post application?"
                  }
                  section2={""}
                />
              );
            }
          }}
        </NavigationPrompt>

        <Beforeunload onBeforeunload={() => "You’ll lose your data!"}>
          {this.state.currentTab === 6 &&
          this.state.finalizeStep === 2 &&
          this.state.response_type === 1 ? (
            <>
              <ApplicationNotFound
                reSubmit_post_application={this.props.reSubmit_post_application}
                animation={this.state.animation}
                message={this.props.message}
                // changeSin={e=>setSinApplicationNotFound(e)}
                app_id={this.props.app_id}
                state={this.state}
                validator={this.validator}
                handleOnChange={this.handleOnChange}
                updateSubmitPost={this.updateSubmitPost}
              />
            </>
          ) : this.state.currentTab === 6 &&
            this.state.finalizeStep === 2 &&
            (this.state.response_type === 3 ||
              this.state.response_type === 2) ? (
            <>
              <ApplicationApproved
                response_type={this.state.response_type}
                confirm_post_application={this.props.confirm_post_application}
                message={this.props.message}
                amount={this.props.amount}
                animation={this.state.animation}
                app_id={this.props.app_id}
              />
            </>
          ) : this.state.currentTab === 6 &&
            this.state.finalizeStep === 2 &&
            this.state.response_type === 4 ? (
            <>
              <ApplicationDeclined
                reSubmit_post_application={this.props.reSubmit_post_application}
                animation={this.state.animation}
              />
            </>
          ) : this.state.currentTab === 6 &&
            this.state.finalizeStep === 2 &&
            this.state.response_type === 5 ? (
            <>
              <ConfirmPost animation={this.state.animation} />
            </>
          ) : (
            <React.Fragment>
              <section className="Section-AddPost post-application-container">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="PostAdd-Container">
                        <div className="PostApp-TopList">
                          <ul>
                            {this.state.postSteps.map((item, index) => (
                              <React.Fragment key={index}>
                                <li
                                  className={
                                    item.current == true
                                      ? "headactive"
                                      : item.completed == true
                                      ? "active"
                                      : ""
                                  }
                                  onClick={
                                    item.current == false &&
                                    (item.completed == true || clickAble) &&
                                    item.disbaled == false
                                      ? () =>
                                          this.changeStep(item.value, item.perc)
                                      : item.current == true &&
                                        item.completed == false &&
                                        item.disbaled == false
                                      ? () =>
                                          this.changeStep(item.value, item.perc)
                                      : this.emptyFunction
                                  }
                                >
                                  <a>{item.value}</a>
                                </li>
                                <li
                                  className={
                                    item.current == true
                                      ? "headactive"
                                      : item.completed == true
                                      ? "activetext"
                                      : ""
                                  }
                                  onClick={
                                    item.current == false &&
                                    (item.completed == true || clickAble) &&
                                    item.disbaled == false
                                      ? () =>
                                          this.changeStep(item.value, item.perc)
                                      : item.current == true &&
                                        item.completed == false &&
                                        item.disbaled == false
                                      ? () =>
                                          this.changeStep(item.value, item.perc)
                                      : this.emptyFunction
                                  }
                                >
                                  <h1>{item.name}</h1>
                                </li>
                              </React.Fragment>
                            ))}
                          </ul>
                        </div>

                        <div className="PostApp-Status">
                          <div className="top-status-bar">
                            <div className="top-status-bar-inner">
                              <div
                                className="filled-status-bar"
                                style={{ width: percentBar }}
                              >
                                {" "}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="App-post-body-main clearfix">
                          <div className="Addpost-responsiveimg">
                            <img
                              src="/assets/image/post-app-responsive-image.svg"
                              alt=""
                            />
                          </div>

                          {/** Start Component */}
                          <div className="ad-post-left-section">
                            <div className="SliderContainer">
                              {}
                              {this.state.currentTab === 0 ? (
                                <>
                                  {/**Application Information */}
                                  <InstantApproval
                                    state={this.state}
                                    changeStepButton={this.changeStepButton}
                                  />
                                </>
                              ) : this.state.currentTab === 1 ? (
                                <>
                                  {/**Application Information */}
                                  <ApplicantInformation
                                    state={this.state}
                                    validator={this.validator}
                                    changeStepButton={this.changeStepButton}
                                    handleOnChangeDates={
                                      this.handleOnChangeDates
                                    }
                                    handleOnChange={this.handleOnChange}
                                    changeSelect={this.changeSelect}
                                  />
                                </>
                              ) : this.state.currentTab === 2 &&
                                this.state.addressChild === "" &&
                                this.state.applicantMannualAddress === 0 ? (
                                <>
                                  {/**Application Address */}
                                  <ApplicantAddress
                                    state={this.state}
                                    changeSelect={this.changeSelect}
                                    validator={this.validator}
                                    changeStepButton={this.changeStepButton}
                                    changeAddress={this.changeAddress}
                                    handleOnChange={this.handleOnChange}
                                    changeMannualAddress={
                                      this.changeMannualAddress
                                    }
                                    handleOnChangeSelect={
                                      this.handleOnChangeSelect
                                    }
                                    handleLocationChange={
                                      this.handleLocationChange
                                    }
                                  />
                                </>
                              ) : this.state.currentTab === 2 &&
                                this.state.addressChild === "" &&
                                this.state.applicantMannualAddress === 1 ? (
                                <>
                                  {/**Application Address */}
                                  <ApplicantMannualAddress
                                    state={this.state}
                                    changeSelect={this.changeSelect}
                                    validator={this.validator}
                                    changeStepButton={this.changeStepButton}
                                    changeAddress={this.changeAddress}
                                    handleOnChange={this.handleOnChange}
                                    changeMannualAddress={
                                      this.changeMannualAddress
                                    }
                                    handleOnChangeSelect={
                                      this.handleOnChangeSelect
                                    }
                                    handleLocationChange={
                                      this.handleLocationChange
                                    }
                                  />
                                </>
                              ) : this.state.currentTab === 2 &&
                                this.state.addressChild === 1 ? (
                                <>
                                  {/**Application Address */}
                                  <ApplicantAddress2
                                    state={this.state}
                                    validator={this.validator}
                                    changeStepButton={this.changeStepButton}
                                    changeAddress={this.changeAddress}
                                    handleOnChange={this.handleOnChange}
                                    handleOnChangeSelect={
                                      this.handleOnChangeSelect
                                    }
                                    handleOnChangeDates={
                                      this.handleOnChangeDates
                                    }
                                    changeSelect={this.changeSelect}
                                  />
                                </>
                              ) : this.state.currentTab === 3 &&
                                this.state.employeeInformationstep === 0 ? (
                                <>
                                  <EmploymentInformation
                                    state={this.state}
                                    changeSelect={this.changeSelect}
                                    validator={this.validator}
                                    changeStepButton={this.changeStepButton}
                                    handleOnChange={this.handleOnChange}
                                    changeStepCoApplicant={
                                      this.changeStepCoApplicant
                                    }
                                    handleOnChangeSelect={
                                      this.handleOnChangeSelect
                                    }
                                    changeAddress={this.changeAddress}
                                    handleOnChangeDates={
                                      this.handleOnChangeDates
                                    }
                                    {...this.props}
                                    changeEmployementInformation={
                                      this.changeEmployementInformation
                                    }
                                  />
                                </>
                              ) : this.state.currentTab === 3 &&
                                this.state.employeeInformationstep === 1 ? (
                                <EmploymentInformation2
                                  state={this.state}
                                  changeSelect={this.changeSelect}
                                  validator={this.validator}
                                  changeStepButton={this.changeStepButton}
                                  handleOnChange={this.handleOnChange}
                                  changeStepCoApplicant={
                                    this.changeStepCoApplicant
                                  }
                                  handleOnChangeSelect={
                                    this.handleOnChangeSelect
                                  }
                                  changeAddress={this.changeAddress}
                                  handleOnChangeDates={this.handleOnChangeDates}
                                  changeEmployementInformation={
                                    this.changeEmployementInformation
                                  }
                                  {...this.props}
                                />
                              ) : this.state.currentTab === 4 &&
                                this.state.coApplicantStep === 1 ? (
                                <>
                                  <CoApplicantInformation
                                    state={this.state}
                                    validator={this.validator}
                                    handleOnChange={this.handleOnChange}
                                    changeStepButton={this.changeStepButton}
                                    changeStepCoApplicant={
                                      this.changeStepCoApplicant
                                    }
                                    handleOnChangeDates={
                                      this.handleOnChangeDates
                                    }
                                    changeSelect={this.changeSelect}
                                  />
                                </>
                              ) : this.state.currentTab === 4 &&
                                this.state.coApplicantStep === 2 &&
                                this.state.coApplicantAddressChild === "" &&
                                this.state.coApplicantMannualAddress === 0 ? (
                                <>
                                  <CoApplicantAddress
                                    state={this.state}
                                    changeSelect={this.changeSelect}
                                    validator={this.validator}
                                    changeAddress={this.changeAddress}
                                    changeMannualAddress={
                                      this.changeMannualAddress
                                    }
                                    changeCoAddress={this.changeCoAddress}
                                    handleLocationChange={
                                      this.handleLocationChange
                                    }
                                    handleOnChange={this.handleOnChange}
                                    changeStepCoApplicant={
                                      this.changeStepCoApplicant
                                    }
                                    handleOnChangeSelect={
                                      this.handleOnChangeSelect
                                    }
                                  />
                                </>
                              ) : this.state.currentTab === 4 &&
                                this.state.coApplicantStep === 2 &&
                                this.state.coApplicantAddressChild === "" &&
                                this.state.coApplicantMannualAddress === 1 ? (
                                <>
                                  <CoApplicantMannualAddress
                                    state={this.state}
                                    changeSelect={this.changeSelect}
                                    validator={this.validator}
                                    changeAddress={this.changeAddress}
                                    changeMannualAddress={
                                      this.changeMannualAddress
                                    }
                                    changeCoAddress={this.changeCoAddress}
                                    handleLocationChange={
                                      this.handleLocationChange
                                    }
                                    handleOnChange={this.handleOnChange}
                                    changeStepCoApplicant={
                                      this.changeStepCoApplicant
                                    }
                                    handleOnChangeSelect={
                                      this.handleOnChangeSelect
                                    }
                                  />
                                </>
                              ) : this.state.currentTab === 4 &&
                                this.state.coApplicantStep === 2 &&
                                this.state.coApplicantAddressChild === 1 ? (
                                <>
                                  <CoApplicantAddress2
                                    state={this.state}
                                    validator={this.validator}
                                    changeStepCoApplicant={
                                      this.changeStepCoApplicant
                                    }
                                    changeAddress={this.changeAddress}
                                    changeCoAddress={this.changeCoAddress}
                                    handleOnChange={this.handleOnChange}
                                    handleOnChangeSelect={
                                      this.handleOnChangeSelect
                                    }
                                    handleOnChangeDates={
                                      this.handleOnChangeDates
                                    }
                                    changeSelect={this.changeSelect}
                                  />
                                </>
                              ) : this.state.currentTab === 4 &&
                                this.state.coApplicantStep === 3 &&
                                this.state.coEmploymentStep === 0 ? (
                                <>
                                  <CoApplicantEmploymentInformation
                                    state={this.state}
                                    changeSelect={this.changeSelect}
                                    validator={this.validator}
                                    changeStepButton={this.changeStepButton}
                                    changeAddress={this.changeAddress}
                                    handleOnChange={this.handleOnChange}
                                    changeStepCoApplicant={
                                      this.changeStepCoApplicant
                                    }
                                    handleOnChangeDates={
                                      this.handleOnChangeDates
                                    }
                                    handleOnChangeSelect={
                                      this.handleOnChangeSelect
                                    }
                                    changeCoEmploymentStep={
                                      this.changeCoEmploymentStep
                                    }
                                  />
                                </>
                              ) : this.state.currentTab === 4 &&
                                this.state.coApplicantStep === 3 &&
                                this.state.coEmploymentStep === 1 ? (
                                <>
                                  <CoApplicantEmploymentAddress
                                    state={this.state}
                                    changeSelect={this.changeSelect}
                                    validator={this.validator}
                                    changeStepButton={this.changeStepButton}
                                    changeAddress={this.changeAddress}
                                    handleOnChange={this.handleOnChange}
                                    changeStepCoApplicant={
                                      this.changeStepCoApplicant
                                    }
                                    handleOnChangeDates={
                                      this.handleOnChangeDates
                                    }
                                    handleOnChangeSelect={
                                      this.handleOnChangeSelect
                                    }
                                    changeCoEmploymentStep={
                                      this.changeCoEmploymentStep
                                    }
                                  />
                                </>
                              ) : this.state.currentTab === 5 &&
                                this.state.vehicleDetailStep === "" &&
                                this.state.vehicleFinanceStep === "" ? (
                                <>
                                  <VehicleInformation
                                    state={this.state}
                                    validator={this.validator}
                                    changeVehicleFinance={
                                      this.changeVehicleFinance
                                    }
                                    changeSelect={this.changeSelect}
                                    changeStepButton={this.changeStepButton}
                                    changeVehicleDetail={
                                      this.changeVehicleDetail
                                    }
                                    handleOnChange={this.handleOnChange}
                                    {...this.props}
                                    handleOnChangeSelect={
                                      this.handleOnChangeSelect
                                    }
                                    handleOnChangeDates={
                                      this.handleOnChangeDates
                                    }
                                    validateVehicleInfor={
                                      this.validateVehicleInfor
                                    }
                                  />
                                </>
                              ) : this.state.currentTab === 5 &&
                                this.state.vehicleDetailStep === 1 ? (
                                <>
                                  <VehicleDetail
                                    state={this.state}
                                    validator={this.validator}
                                    changeSelect={this.changeSelect}
                                    changeVehicleDetail={
                                      this.changeVehicleDetail
                                    }
                                    changeStepButton={this.changeStepButton}
                                    handleOnChange={this.handleOnChange}
                                    handleOnChangeDates={
                                      this.handleOnChangeDates
                                    }
                                    handleOnChangeSelect={
                                      this.handleOnChangeSelect
                                    }
                                    {...this.props}
                                  />
                                </>
                              ) : this.state.currentTab === 5 &&
                                this.state.vehicleDetailStep === 2 ? (
                                <>
                                  <SellerDetail
                                    state={this.state}
                                    changeSelect={this.changeSelect}
                                    validator={this.validator}
                                    changeVehicleDetail={
                                      this.changeVehicleDetail
                                    }
                                    changeStepButton={this.changeStepButton}
                                    handleOnChange={this.handleOnChange}
                                    {...this.props}
                                    handleOnChangeSelect={
                                      this.handleOnChangeSelect
                                    }
                                  />
                                </>
                              ) : this.state.currentTab === 5 &&
                                this.state.vehicleFinanceStep === 1 ? (
                                <>
                                  <VehicleListed
                                    state={this.state}
                                    validator={this.validator}
                                    changeVehicleFinance={
                                      this.changeVehicleFinance
                                    }
                                    changeStepButton={this.changeStepButton}
                                    handleOnChange={this.handleOnChange}
                                    {...this.props}
                                    findStockNumber={this.findStockNumber}
                                  />
                                </>
                              ) : this.state.currentTab === 6 &&
                                this.state.finalizeStep === "" ? (
                                <>
                                  <FinalizeApplication
                                    state={this.state}
                                    animation={this.state.animation}
                                    downPayment={this.state.downPayment}
                                    financeAmount={this.state.financeAmount}
                                    handleOnChange={this.handleOnChange}
                                    sellerInfo={this.state.sellerInfo}
                                    terms1={this.state.terms1}
                                    terms2={this.state.terms2}
                                    validator={this.validator}
                                    changeStepButton={this.changeStepButton}
                                    changeStepFinalize={this.changeStepFinalize}
                                    user_id={this.props.user_id}
                                    toggleHandleOnChangeTerm1={
                                      this.toggleHandleOnChangeTerm1
                                    }
                                    toggleHandleOnChangeTerm2={
                                      this.toggleHandleOnChangeTerm2
                                    }
                                  />
                                </>
                              ) : this.state.currentTab === 6 &&
                                this.state.finalizeStep === 1 ? (
                                <>
                                  <CompletePostEdit
                                    animation={this.state.animation}
                                    changeStepButton={this.changeStepButton}
                                    submitPost={this.submitPost}
                                    discardState={this.discardState}
                                    vehicleDetailStep={
                                      this.state.vehicleDetailStep
                                    }
                                    editPost={this.editPost}
                                    vehicleFinanceStep={
                                      this.state.vehicleFinanceStep
                                    }
                                    sellerInfo={this.state.sellerInfo}
                                    listingSource={this.state.listingSource}
                                    isLoading={this.props.isLoading}
                                    applicantInfor={applicantInfor}
                                    applicantAddress={applicantAddress}
                                    employmentInfo={employmentInfo}
                                    vehicleInformation={vehicleInformation}
                                    finalizeDetail={finalizeDetail}
                                    sellerBar={this.state.sellerBar}
                                    cpApplicant={this.state.coApplication}
                                    coApplicationBar={coApplicationBar}
                                  />
                                </>
                              ) : null}
                            </div>
                          </div>

                          {/**End Main Div */}

                          <div className="PostAdd-ImgRight">
                            <img
                              src="/assets/image/post-app-right-image.svg"
                              alt=""
                            />
                          </div>

                          {/**End Image Div */}

                          {/** End Component */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {this.state.currentTab === 6 &&
                this.state.finalizeStep === "" ? (
                  <React.Fragment>
                    <SignInModel
                      {...this.props}
                      modelClose={this.modelClose}
                      toggleModel={this.toggleModel}
                      responseGoogle={this.responseGoogle}
                    />
                    <PostAppSignUpModel
                      {...this.props}
                      modelClose={this.modelClose}
                      toggleModel={this.toggleModel}
                      setSignUpData={this.setSignUpData}
                      applicantFirstName={this.state.applicantFirstName}
                      applicantLastName={this.state.applicantLastName}
                    />
                    <PostAppVerificationModel
                      email={
                        this.state.userEmail
                          ? this.state.userEmail
                          : this.props.user_detail !== undefined &&
                            this.props.user_detail.email !== undefined
                          ? this.props.user_detail.email
                          : ""
                      }
                      {...this.props}
                      signUpdata={this.state.signUpdata}
                      validator={this.validator}
                      modelClose={this.modelClose}
                      forceUpdate={this.forceUpdate}
                      toggleHandleOnChangeVerification={
                        this.toggleHandleOnChangeVerification
                      }
                      onSuccess={() => {
                        this.setState({
                          finalizeStep: 1,
                        });
                      }}
                      phoneNum={this.state.phoneNum}
                      setCell={this.setCell}
                      verificationOption={this.state.verificationOption}
                    />
                  </React.Fragment>
                ) : null}
                {/* {this.state.modelName === 'signIn' ? (<SignInModel {...this.props} modelClose={this.modelClose} toggleModel={this.toggleModel} />) : this.state.modelName === 'signUp' ? (<PostAppSignUpModel {...this.props} modelClose={this.modelClose} toggleModel={this.toggleModel} />) ? this.state.modelName === 'verify' ? (<PostAppVerificationModel email={this.props.user_detail !== undefined && this.props.user_detail.email !== undefined ? this.props.user_detail.email : ''} {...this.props} validator={this.validator} modelClose={this.modelClose} forceUpdate={this.forceUpdate} />) : null : null : null} */}
                <TostarMessages />
              </section>
            </React.Fragment>
          )}
        </Beforeunload>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user_id: state.authReducer.authentication.user.user_id,
    userVerified: state.authReducer.authentication.userVerified,
    type_of_vehicles: state.adPostReducers.addPostReducer.type_of_vehicle,
    isLoading: state.postApplication.postApplicationReducer.isLoading,
    loadingStock: state.postApplication.postApplicationReducer.loadingStock,
    save_post: state.postApplication.postApplicationReducer.save_post,
    loggedIn: state.authReducer.authentication.loggedIn,
    registering: state.authReducer.registration.registering,
    single_stock_detail:
      state.postApplication.postApplicationReducer.single_stock_detail,
    response_type: state.postApplication.postApplicationReducer.response_type,
    reSubmit: state.postApplication.postApplicationReducer.reSubmit,
    message: state.postApplication.postApplicationReducer.message,
    amount: state.postApplication.postApplicationReducer.amount,
    app_id: state.postApplication.postApplicationReducer.app_id,
    stock_message: state.postApplication.postApplicationReducer.stock_message,
    isVerify: state.authReducer.registration.isVerify,
    user_detail: state.authReducer.registration.user_detail,
    otp_send: state.authReducer.authentication.otp_send,
    otp_loading: state.authReducer.authentication.otp_loading,
  };
};

export default connect(mapStateToProps, {
  save_post_application,
  update_post_application,
  get_vehicle_type,
  get_vehicle_model,
  get_vehicle_make,
  get_stock_by_id,
  reSubmit_post_application,
  confirm_post_application,
  remove_all_post_state,
  login,
  register,
  remove_all,
  verify_user,
  resend_email,
  verify_otp,
  send_otp,
  postAppRegister,
})(AddPostApplications);
