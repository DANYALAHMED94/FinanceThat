/* eslint-disable no-loop-func */
import React, { Component } from "react";
import BuyerApplicationDetail from "../../component/Application/BuyerApplicationDetail";
import CoApplicant from "../../component/Application/CoApplicant";
import AssetDetail from "../../component/Application/AssetDetail";
import VerifyIdentity from "../../component/Application/VerifyIdentity";
import IncomeVerification from "../../component/Application/IncomeVerification";
import LoanPaymentDetail from "../../component/Application/LoanPaymentDetail";
import UploadDoc from "../../component/Application/UploadDoc";
import LoanDocument from "../../component/Application/LoanDocument";
import AssignAgent from "../../component/Application/AssignAgent";
import { Route, Switch, Link } from "react-router-dom";
import Geocode from "react-geocode";
import axios from "./../../../_helpers/axiosInterceptors";

import { get_vehicle_type } from "../../../actions/addPostActions";
import "../../../assets/css/adminEditApplication.css";
import {
  get_addtional_type,
  get_vehicle_make,
  get_application_detail,
  get_vehicle_model,
  get_vehicle_trims,
  update_application_detail,
  delete_addtional_info,
  downloadFile,
  update_application_detail_file,
  update_application_upload_doc_file,
  delete_vehicle_detail,
  delete_upload_doc,
  get_login_id_flinks,
  login_flinks,
  get_stock_id_detail,
  delete_coApplicant,
  update_application_detail_complete,
  get_jumio_response,
  update_application_detail_status,
  delete_upload_doc_file,
  get_flinks_images,
  get_application_agents,
  upload_un_requested_doc,
  delete_loan_doc_file,
  upload_asset_detail_files,
  add_new_application_detail
} from "../../../actions/admin/applicationActions";
import { get_agents } from "../../../actions/admin/agentActions";
import moment from "moment";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { API_URL } from "../../../constant";
import { history } from "../../../_helpers/history";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import { Helmet } from "react-helmet";
import Dropdown from "react-bootstrap/Dropdown";
import ConfirmModel from "./ConfirmModel";
import ConfirmDecline from "./ConfirmDecline";
import PdfPrint from "../../component/Application/PdfPrint";
import PageNotFoundApp from "../404page/PageNotFoundApp";
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
class AddNewAdminApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeStatusRefund: 0,
      loadingRefund: false,
      buyerAppId: "",
      url: this.props.match.url,
      appType: this?.props?.history?.location?.state?.applicationType || '',
      applicantFirstName: "",
      applicantLastName: "",
      applicantDateOfBirth: "",
      applicantTelephone: "",
      applicantAddress: "",
      applicantStreetAddress: "",
      applicantStreetAddress2: "",
      applicantLocationName: "",
      applicantCity: "",
      applicantProvince: "",
      selectedProvince: "",
      applicantPostalCode: "",
      employeeBusinessName: "",
      applicantCountry: "",
      employmentStatus: "",
      selectEmploymentStatus: "",
      typeOfEmployment: "",
      selectedTypeOfEmployment: "",
      employerName: "",
      typeOfBusniess: "",
      occupation: "",
      applicantEmailByDealer: "",
      employmentSinceYear: "",
      employmentSinceMonth: "",
      grossMonthlyIncome: "",
      salutation: "",
      gender: "",
      interestedVehicleType: "",
      // previous applicant address
      applicantPreviousStreetAddress: "",
      applicantPreviousStreetAddress2: "",
      previousCity: "",
      previousProvince: "",
      previousPostalCode: "",
      durationAtPreviousAddress: "",
      durationAtPreviousAddressMonth: "",
      previousStatus: "",
      previousMortgageAmount: "",
      // previous employer details
      previousEmployerName: "",
      previousEmployerStreetAddress: "",
      previousEmployerCity: "",
      previousEmployerProvince: "",
      previousEmployerPhone: "",
      previousEmployerEmail: "",
      previousEmploymentStatus: "",
      previousTypeOfEmployment: "",
      previousEmploymentSinceYear: "",
      previousEmploymentSinceMonth: "",
      previousGrossIncome: "",
      previousEmployeeBusinessName: "",
      previousEmployeeTypeOfBusiness: "",
      previousOccupation: "",
      genders: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
      salutations: [
        { value: "mr", label: "Mr." },
        { value: "mrs", label: "Mrs." },
      ],
      maritalStatues: [
        { value: "single", label: "Single" },
        { value: "married", label: "Married" },
        { value: "common_law", label: "Common Law" },
        { value: "separated", label: "Separated" },
        { value: "divorced", label: "Divorced" },
        { value: "widowed", label: "Widowed" },
      ],
      applicantMaritalStatus: "",
      selectApplicantMaritalStatus: null,
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
        { label: "Self-Employed", value: "Self-Employed" },
        { label: "Unemployed", value: "Unemployed" },
        { label: "Retired", value: "Retired" },
        { label: "Disability", value: "Disability" },
        { label: "Worker Compensation", value: "Worker Compensation" }
      ],
      typeOfEmployments: [
        { label: "Full Time", value: "Full Time" },
        { label: "Part Time", value: "Part Time" },
        { label: "Seasonal", value: "Seasonal" },
      ],
      grossMonthlyIncome: 0,
      grossMonthlyIncomeValues:[
        { label: "Over $5000", value: "5000" },
        { label: "$2500 - 5000", value: "2500-5000" },
        { label: "$2000 - 2500", value: "2000-2500" },
        { label: "Under $2000", value: "2000" },
      ],
      monthlyGrossIncome:'',
      monthlySelectedGrossIncome:"",
      vehicleOptions: [],
      vehicleType: "",
      selectedVehicle: "",
      conditions: [
        { value: "New", label: "New" },
        { value: "Used", label: "Used" },
      ],
      assetsDetails: [
        {
          id: "",
          vehicleType: "",
          selectedVehicle: "",
          stockNumber: "",
          year: "",
          selectedYear: "",
          make: "",
          selectedMake: "",
          model: "",
          selectedModel: "",
          trim: "",
          selectedTrim: "",
          kilometer: "",
          vin: "",
          price: "",
          condition: "",
          selectedCondition: "",
          is_updated: false,
          new: true,
        },
      ],
      assetsDetailsForm: [
        {
          id: "",
          vehicleType: "",
          selectedVehicle: "",
          stockNumber: "",
          year: "",
          selectedYear: "",
          make: "",
          selectedMake: "",
          model: "",
          selectedModel: "",
          trim: "",
          selectedTrim: "",
          kilometer: "",
          vin: "",
          price: "",
          condition: "",
          selectedCondition: "",
          vehicleMakes: [],
          vehicleModel: [],
          vehicleTrims: [],
          new: true,
          is_updated: false,
        },
      ],
      assetDeletedId: "",
      yearsDropDown: [],
      // Seller States
      sellerDealerShipName: "",
      sellerFirstName: "",
      sellerLastName: "",
      sellerProvince: "",
      selectedSellerProvince: "",
      sellertCity: "",
      sellerPostalCode: "",
      sellerCountry: "",
      sellerStreetAddress: "",
      sellerLocationName: "",
      sellerFax: "",
      sellerTelephone: "",
      sellerEmail: "",
      sellerCity: "",
      //  AddtionalInformation
      addtionalTypes: [],
      addtionalInformation: [
        {
          infoProvider: "",
          infoCost: "",
          selectedProductType: "",
          productType: "",
          new: true,
          id: "",
          is_updated: false,
        },
      ],
      addtionalDeletedId: "",
      // Other Income
      income_type: "",
      selectedIncomeType: "",
      inComeTypes: [{ value: "Cash", label: "Cash" }, { value: "Cheque", label: "Cheque" }],
      income_amount: "",
      income_frequency: "",
      selectedIncomeFrequency: "",
      inComeFrequencies:[{ value: "Annually", label: "Annually" },{ value: "Monthly", label: "Monthly" }],
      // Co Applicant
      coApplicant: false,
      coApplicantId: "",
      coApplicantFirstName: "",
      coApplicantLastName: "",
      coApplicantDateOfBirth: "",
      coApplicantTelephone: "",
      coApplicantAddress: "",
      coApplicantStreetAddress: "",
      coApplicantLocationName: "",
      coApplicantCity: "",
      coApplicantProvince: "",
      selectedCoApplicantProvince: "",
      coApplicantPostalCode: "",
      coApplicantCountry: "",
      coApplicantEmploymentStatus: "",
      selectCoApplicantEmploymentStatus: "",
      coApplicantTypeOfEmployment: "",
      selectedCoApplicantTypeOfEmployment: "",
      coApplicantEmployerName: "",
      coApplicantOccupation: "",
      coApplicantEmploymentSince: "",
      coApplicantGrossMonthlyIncome: "",
      coApplicantDefaultGrossMonthlyIncome: "",
      coApplicantStatus: "",
      coApplicantSelectedStatus: "",
      coApplicantDuration_address_mn: "",
      coApplicantDuration_address_yr: "",
      coApplicantMortgage_amount: "",
      coApplicantSin: "",
      coApplicantBusniessName: "",
      coApplicantTypeOfBusniess: "",
      coApplicantMaritalStatus: "",
      selectCoApplicantMaritalStatus: null,
      employerStreetAddress: "",
      employerCity: "",
      employerProvince: "",
      employerPhone: "",
      employerEmail: "",
      coEmployerStreetAddress: "",
      coEmployerStreetAddress2: "",
      coEmployerCity: "",
      coEmployerProvince: "",
      coEmployerPhone: "",
      coEmployerEmail: "",
      coGender: "",
      coSaluation: "",
      coEmploymentSinceYear: "",
      coEmploymentSinceMonth: "",
      // previous co applicant address
      coApplicantPreviousStreetAddress: "",
      coApplicantPreviousStreetAddress2: "",
      coPreviousCity: "",
      coPreviousProvince: "",
      coPreviousPostalCode: "",
      coDurationAtPreviousAddress: "",
      coDurationAtPreviousAddressMonth: "",
      coPreviousStatus: "",
      coPreviousMortgageAmount: "",
      // previous co employer details
      previousCoEmployerName: "",
      previousCoEmployerStreetAddress: "",
      previousCoEmployerCity: "",
      previousCoEmployerProvince: "",
      previousCoEmployerPhone: "",
      previousCoEmployerEmail: "",
      previousCoEmploymentStatus: "",
      previousCoTypeOfEmployment: "",
      previousCoEmploymentSinceYear: "",
      previousCoEmploymentSinceMonth: "",
      previousCoGrossIncome: "",
      previousCoEmployeeBusinessName: "",
      previousCoEmployeeTypeOfBusiness: "",
      previousCoOccupation: "",
      postApp: [
        {
          id: 1,
          name: "Applicant Details",
          active: true,
          done: false,
          disbaled: false,
          pending: false,
          path: `${this.props.match.url}/applicant-detail`,
        },
        {
          id: 2,
          name: "Co Applicant",
          active: false,
          disbaled: true,
          done: false,
          pending: false,
          path: `${this.props.match.url}/co-applicant`,
        },
        {
          id: 3,
          name: "Asset Detail",
          active: false,
          disbaled: true,
          done: false,
          pending: false,
          path: `${this.props.match.url}/assets-detail`,
        },
        {
          id: 4,
          name: "Verify Identity",
          active: false,
          disbaled: true,
          done: false,
          pending: false,
          path: `${this.props.match.url}/verify-identity`,
        },
        {
          id: 5,
          name: "Income Verifications",
          active: false,
          disbaled: true,
          done: false,
          pending: false,
          path: `${this.props.match.url}/income-verify`,
        },
        {
          id: 6,
          name: "Loan Payment Detail",
          active: false,
          disbaled: true,
          done: false,
          pending: false,
          path: `${this.props.match.url}/loan-payment`,
        },
        {
          id: 7,
          name: "Loan Documents",
          active: false,
          disbaled: true,
          done: false,
          pending: false,
          path: `${this.props.match.url}/loan-document`,
        },
      ],
      step: 1,
      lastStep: 1,
      applicationStatus: "",
      created_at: "",
      loan_amount: 0,
      //Upload Doc
      documents: [],
      sellerDocuments: [
        {
          id: 1,
          name: "Seller Identification",
          des: "Seller Identification",
          fileName: "seller_identification",
          isRequest: false,
          is_uploaded: false,
        },
        {
          id: 2,
          name: "Vehicle ownership",
          des: "vehicle ownership document",
          fileName: "vehicle_ownership",
          isRequest: false,
          is_uploaded: false,
        },
        {
          id: 3,
          name: "Bill of Sale",
          des: "Final Invoice or bill of sale",
          fileName: "bill_of_sale",
          isRequest: false,
          is_uploaded: false,
        },
      ],
      adminDocumentRequest: [
        {
          id: "",
          name: "Identifications",
          des: "Driver license, Passport etc..",
          isRequest: false,
          is_uploaded: false,
        },
        {
          id: "",
          name: "Utility Bill",
          des: "Final Invoice or bill of sale",
          isRequest: false,
          is_uploaded: false,
        },
        {
          id: "",
          name: "Void Cheque or PAD Form",
          des: "Final Invoice or bill of sale",
          isRequest: false,
          is_uploaded: false,
        },
        {
          id: "",
          name: "Bank Statement",
          des: "Final Invoice or bill of sale",
          isRequest: false,
          is_uploaded: false,
        },
        {
          id: "",
          name: "Paystub(s)",
          des: "Final Invoice or bill of sale",
          isRequest: false,
          is_uploaded: false,
        },
        {
          id: "",
          name: "Last Year Notice of Assessment",
          des: "Final Invoice or bill of sale",
          isRequest: false,
          is_uploaded: false,
        },
        {
          id: "",
          name: "5 Invoices Matching Deposits",
          des: "Final Invoice or bill of sale",
          isRequest: false,
          is_uploaded: false,
        },
        {
          id: "",
          name: "Last Year T4",
          des: "Final Invoice or bill of sale",
          isRequest: false,
          is_uploaded: false,
        },
        {
          id: "",
          name: "Letter of Employment",
          des: "Final Invoice or bill of sale",
          isRequest: false,
          is_uploaded: false,
        },
        {
          id: "",
          name: "Master Business License",
          des: "",
          isRequest: false,
          is_uploaded: false,
        },
        {
          id: "",
          name: "Articles of Incorporation",
          des: "",
          isRequest: false,
          is_uploaded: false,
        },
        {
          id: "",
          name: "Insurance Document",
          des: "",
          isRequest: false,
          is_uploaded: false,
        },
      ],
      documentsTable: [],
      deletedDocId: "",
      // Loan Doc
      loanDoc: null,
      loanDocName: "",
      loanDeletedDocId: "",
      // Loc Payment Detail
      loanAmount: "",
      downPayment: "",
      interestRate: 1,
      contractStartDate: "",
      firstPaymentDate: "",
      paymentType: "weekly",
      //States
      approvedAmount: "",
      financingAmount: "",
      applicantSin: "",
      applicantEmail: "",
      amortization: 120,
      amortizationValues: [
        { label: "6 Months", value: 6 },
        { label: "12 Months", value: 12 },
        { label: "24 Months", value: 24 },
        { label: "36 Months", value: 36 },
        { label: "48 Months", value: 48 },
        { label: "60 Months", value: 60 },
        { label: "72 Months", value: 72 },
        { label: "84 Months", value: 84 },
        { label: "96 Months", value: 96 },
        { label: "108 Months", value: 108 },
        { label: "120 Months", value: 120 },
      ],
      grossMonthlyIncomeSlider: 0,
      selectedAmortization: { label: "120 Months", value: 120 },
      incomeVerification: "",
      allAgents: [],
      monthlyAmount: 0,
      stockIndex: "",
      //completeTages
      personal_complete: false,
      employement_complete: false,
      co_personal_complete: false,
      co_employement_complete: false,
      assets_complete: false,
      seller_complete: false,
      addtional_complete: false,
      verify_identity_complete: false,
      income_verification_complete: false,
      loan_payment_complete: false,
      loan_document_complete: false,
      upload_doc_complete: false,
      firstTypeOfVehicle: "",
      incomeVerificationName: "",
      incomeVerificationStatmentName: "",
      jumioReference: "",
      applicationStatuses: [
        { label: "Conditionally approved", value: "2" },
        { label: "Pre-approved", value: "3" },
        { label: "Approved", value: "5" },
        { label: "Booked", value: "6" },
        { label: "Declined", value: "4" },
        // { label: "Credit Unknown", value: "1" },
        { label: "Withdrawn", value: "7" },
        { label:"Special Program", value:"8"},
        // { label:"Credit Unverified", value:"11"},
        { label:"Manual", value:"9"}],
      // applicationStatuses: [{ label: 'Decline', value: '4' }, { label: 'Approved', value: '5' }, { label: 'Pre-approved', value: '3' }, { label: 'Conditionally approved', value: '2' }, { label: 'pending', value: 'pending' }, { label: 'Missing Info', value: '1' }],
      selectedApplicationStatus: { value: "", label: "" },
      selectApplicationStatus: "",
      jumio_status: "",
      jumio_images: [],
      jumio_data: [],
      photo: "",
      status: "",
      selectedStatus: "",
      duration_address_mn: "",
      duration_address_yr: "",
      mortgage_amount: "",
      mainUrl: this.props.match.url
        .substring(0, this.props.match.url.lastIndexOf("/") + 1)
        .replace(/\/$/, ""),
      unRequestDocName: "",
      tempStatus: "",
      declineReason: "",
      income_verification_json: [],
      income_file: false,
      vehicleImages: [
        { id: 1, preViewFiles: null, path: "", ad_id: "" },
        { id: 2, preViewFiles: null, path: "", ad_id: "" },
        { id: 3, preViewFiles: null, path: "", ad_id: "" },
        { id: 4, preViewFiles: null, path: "", ad_id: "" },
        { id: 5, preViewFiles: null, path: "", ad_id: "" },
        { id: 6, preViewFiles: null, path: "", ad_id: "" },
        { id: 7, preViewFiles: null, path: "", ad_id: "" },
        { id: 8, preViewFiles: null, path: "", ad_id: "" },
        { id: 9, preViewFiles: null, path: "", ad_id: "" },
        { id: 10, preViewFiles: null, path: "", ad_id: "" },
      ],
      vehicleUploadImages: [
        { id: 1, files: null, path: "", ad_id: 1 },
        { id: 2, files: null, path: "", ad_id: 2 },
        { id: 3, files: null, path: "", ad_id: 3 },
        { id: 4, files: null, path: "", ad_id: 4 },
        { id: 5, files: null, path: "", ad_id: 5 },
        { id: 6, files: null, path: "", ad_id: 6 },
        { id: 7, files: null, path: "", ad_id: 7 },
        { id: 8, files: null, path: "", ad_id: 8 },
        { id: 9, files: null, path: "", ad_id: 9 },
        { id: 10, files: null, path: "", ad_id: 10 },
      ],
      income_statement: "",
      license: "",
      application_category:"",
      application_type:""
    };
    this.componentRef = React.createRef();

    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleloanDocChange = this._handleloanDocChange.bind(this);
    this._handleUploadDocChange = this._handleUploadDocChange.bind(this);
    this._handleUploadSellerDocChange =
      this._handleUploadSellerDocChange.bind(this);
  }
  componentDidMount() {
    if (this.props.location.pathname !== '/admin/application/addNew/applicant-detail') {
      history.push('/admin/application/addNew/applicant-detail')
    }
    this.props.get_vehicle_type();
    this.props.get_addtional_type();
    // this.props.get_agents()
    this.props.get_application_agents();
    if (
      this.props.match !== undefined &&
      this.props.match.params !== undefined &&
      this.props.match.params !== null &&
      this.props.match.params.id !== undefined &&
      this.props.match.params.id !== undefined
    ) {
      this.props.get_application_detail(this.props.match.params.id);
    }
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    let currentYear = new Date().getFullYear();
    let earliestYear = 1900;
    let years = [];
    while (currentYear >= earliestYear) {
      years.push({ label: `${currentYear}`, value: currentYear });
      currentYear -= 1;
    }
    let lastStep = 1;
    let coApplicant = false;
    if (localStorage.getItem("lastStepPostAppEditAdmin")) {
      lastStep = localStorage.getItem("lastStepPostAppEditAdmin");
    }
    if (localStorage.getItem("coApplicantEditPostAppAdmin")) {
      coApplicant = Boolean(
        localStorage.getItem("coApplicantEditPostAppAdmin")
      );
    }
    // alert(this.props.location.pathname)
    this.setState({
      ...this.state,
      yearsDropDown: years,
      lastStep: lastStep,
      coApplicant: coApplicant,
      postApp: this.state.postApp.slice().map((item) => {
        if (item.path === '/admin/application/addNew/applicant-detail') {
          return {
            ...item,
            active: true,
          };
        }
        return {
          ...item,
          active: false,
        };
      }),
    });
  }
  handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "interestRate") {
      // const interestRate = value === '' ? 1 : value.toString().split(',').join("").split('%').join('')
      const interestRate = value
        .toString()
        .split(",")
        .join("")
        .split("%")
        .join("");
      this.setState({
        ...this.state,
        [name]: interestRate,
      });
      // if (interestRate > 0) {
      //     this.setState({
      //         ...this.state,
      //         [name]: interestRate
      //     })
      // } else {
      //     this.setState(prevState => ({
      //         ...this.state,
      //         interestRate: prevState.interestRate
      //     }))
      // }
    } else {
      this.setState({
        ...this.state,
        [name]: value,
      });
    }
  };
  handleOnChangeDates = (e, name) => {
    this.setState({
      ...this.state,
      [name]: e,
    });
  };

  handleOnChangeYears = (e, name) => {
    this.setState({...this.state,[name]: e.value})
   };


  handleLocationChange = (e, name) => {
    this.setState({
      ...this.state,
      [name]: e,
    });
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
  changeSelectAssets = (e, formName, name, index) => {
    this.setState({
      ...this.state,
      assetsDetails: this.state.assetsDetails.slice().map((item, dataIndex) => {
        if (dataIndex === index) {
          return {
            ...item,
            [name]: e,
            [formName]:
              e !== undefined && e !== null
                ? e.value !== undefined && e.value !== null
                  ? e.value
                  : ""
                : "",
                sub_type_of_vehicle:formName === "vehicleType" ? "" : formName !== "sub_type_of_vehicle" ? item.sub_type_of_vehicle : e !== undefined && e !== null
                ? e.value !== undefined && e.value !== null
                  ? e.value
                  : ""
                : "",
                selectedSubTypeOfVehicle :formName === "vehicleType" ? "" :formName !== "sub_type_of_vehicle" ? item.selectedSubTypeOfVehicle :e
          };
        }
        return item;
      }),
      assetsDetailsForm: this.state.assetsDetailsForm
        .slice()
        .map((item, dataIndex) => {
          if (dataIndex === index) {
            return {
              ...item,
              [name]: e,
              [formName]:
                e !== undefined && e !== null
                  ? e.value !== undefined && e.value !== null
                    ? e.value
                    : ""
                  : "",
                  sub_type_of_vehicle:formName === "vehicleType" ? "" : formName !== "sub_type_of_vehicle" ? item.sub_type_of_vehicle : e !== undefined && e !== null
                  ? e.value !== undefined && e.value !== null
                    ? e.value
                    : ""
                  : "",
                  selectedSubTypeOfVehicle :formName === "vehicleType" ? "" :formName !== "sub_type_of_vehicle" ? item.selectedSubTypeOfVehicle :e
            };
          }
          return item;
        }),
    });
  };
  handleOnChangeAssets = (e, index) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      assetsDetails: this.state.assetsDetails.slice().map((item, dataIndex) => {
        if (dataIndex === index) {
          return {
            ...item,
            [name]: value,
          };
        }
        return item;
      }),
      assetsDetailsForm: this.state.assetsDetailsForm
        .slice()
        .map((item, dataIndex) => {
          if (dataIndex === index) {
            return {
              ...item,
              [name]: value,
            };
          }
          return item;
        }),
    });
  };
  addAssets = () => {
    this.setState({
      ...this.state,
      assetsDetails: [
        ...this.state.assetsDetails,
        {
          id: "",
          vehicleType: "",
          selectedVehicle: "",
          stockNumber: "",
          year: "",
          selectedYear: "",
          make: "",
          selectedMake: "",
          mode: "",
          selectedModel: "",
          trim: "",
          selectedTrim: "",
          kilometer: "",
          vin: "",
          price: "",
          condition: "",
          is_updated: false,
          new: true,
        },
      ],
      assetsDetailsForm: [
        ...this.state.assetsDetailsForm,
        {
          id: "",
          vehicleType: "",
          selectedVehicle: "",
          stockNumber: "",
          year: "",
          selectedYear: "",
          make: "",
          selectedMake: "",
          model: "",
          selectedModel: "",
          trim: "",
          selectedTrim: "",
          kilometer: "",
          vin: "",
          price: "",
          condition: "",
          selectedCondition: "",
          vehicleMakes: [],
          vehicleModel: [],
          vehicleTrims: [],
          is_updated: false,
          new: true,
        },
      ],
    });
  };
  deleteAsset = (itemIndex) => {
    let assetId = this.state.assetsDetails
      .filter((item, index) => {
        return index === itemIndex;
      })
      .map((item) => {
        return item.id !== undefined && item.id !== null && item.id !== ""
          ? item.id
          : "";
      })[0];
    if (assetId != undefined && assetId !== null && assetId !== "") {
      this.props.delete_vehicle_detail(assetId);
      this.setState({
        ...this.state,
        assetDeletedId: assetId,
      });
    } else {
      this.setState({
        ...this.state,
        assetsDetails: this.state.assetsDetails.filter((item, index) => {
          return index !== itemIndex;
        }),
        assetsDetailsForm: this.state.assetsDetailsForm.filter(
          (item, index) => {
            return index !== itemIndex;
          }
        ),
      });
    }
  };
  changeSelectInfo = (e, formName, name, index) => {
    this.setState({
      ...this.state,
      addtionalInformation: this.state.addtionalInformation
        .slice()
        .map((item, dataIndex) => {
          if (dataIndex === index) {
            return {
              ...item,
              [name]: e,
              [formName]:
                e !== undefined && e !== null
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
  handleOnChangeInfo = (e, index) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      addtionalInformation: this.state.addtionalInformation
        .slice()
        .map((item, dataIndex) => {
          if (dataIndex === index) {
            return {
              ...item,
              [name]: value,
            };
          }
          return item;
        }),
    });
  };
  addAddtionalInfor = () => {
    this.setState({
      ...this.state,
      addtionalInformation: [
        ...this.state.addtionalInformation,
        {
          //   productType: [],
          infoProvider: "",
          infoCost: "",
          selectedProductType: "",
          productType: "",
          new: true,
          id: "",
          is_updated: false,
        },
      ],
    });
  };
  deleteAddtionalInfor = (itemIndex) => {
    const id = this.state.addtionalInformation
      .filter((item, index) => index === itemIndex)
      .map((item) => {
        return item.id !== undefined && item.id !== null && item.id !== ""
          ? item.id
          : "";
      })[0];
    if (id != undefined && id != null && id !== "") {
      this.props.delete_addtional_info(id);
      this.setState({
        ...this.state,
        addtionalDeletedId: id,
      });
    } else {
      this.setState({
        ...this.state,
        addtionalInformation: this.state.addtionalInformation.filter(
          (item, index) => {
            return index !== itemIndex;
          }
        ),
      });
    }
  };

  _handleImageChange(e, fileIndex) {
    e.preventDefault();
    let file = e.target.files[0];
    if (file !== undefined && file !== null) {
      if (
        file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        file.type !== "application/pdf" &&
        file.type !== "application/docs"
      ) {
        toastr.error("Error", "File does not support. You must use pdf, docs ");
        return false;
      }
      // if (file.size > (2 * 1024 * 1024)) {
      //     toastr.error('Error', "Please upload a file smaller than 2 MB")
      //     return false;
      // }
      const name = e.target.name;
      const fileNameState = e.target.name + "Name";
      // let reader = new FileReader();
      const fileName = e.target.files[0].name;
      this.setState({
        ...this.state,
        documents: this.state.documents.slice().map((item, index) => {
          if (fileIndex === index) {
            return {
              ...item,
              [name]: file,
              [fileNameState]: fileName,
              status: "Uploaded",
              fileType: file.type,
            };
          }
          return item;
        }),
        documentsTable: [
          ...this.state.documentsTable,
          {
            [name]: file,
            [fileNameState]: fileName,
            status: "Uploaded",
            fileType: file.type,
          },
        ],
      });
    }

    // reader.readAsDataURL(file)
  }
  /**
   *
   *Loan Doc
   *
   *
   */
  _handleloanDocChange(e) {
    e.preventDefault();
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    if (file !== undefined && file !== null) {
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
      const fileNameState = e.target.name + "Name";
      const fileName = e.target.files[0].name;
      this.setState({
        ...this.state,
        loanDoc: file,
        loanDocName: fileName,
      });
      var formData = new FormData();
      if (file != undefined && file != null && file !== "") {
        formData.append("loan_document", file);
        formData.append("additional_item", []);
        console.log(formData);
        this.props.update_application_detail_file(
          formData,
          this.state.buyerAppId,
          "adminLoanDocumentUpload"
        );
      }
    }
  }
  deleteLoanDoc = () => {
    // const data = {
    //   id: this.state.buyerAppId,
    //   loan_document: "",
    //   additional_item: [],
    // };
    let formData = new FormData();
    formData.append("loan_document", "");
    formData.append("additional_item", []);
    this.props.delete_loan_doc_file(formData, this.state.buyerAppId);
  };
  /**
   *
   *Upload Doc
   *
   *
   */
  _handleUploadDocChange(e, fileIndex, name) {
    e.preventDefault();
    // let file = e.target.files[0];
    let documentsTable = this.state.documentsTable.slice();
    var formData = new FormData();
    const filename = this.state.documents.filter(
      (item, index) => item.name === name
    );
    const fileId = filename[0] ? (filename[0].id ? filename[0].id : "") : "";
    if (!fileId) {
      toastr.error("Error", "Please first request the document");
      return false;
    }
    for (var i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (file !== undefined && file !== null) {
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
          // return false;
        } else {
          documentsTable = [
            ...documentsTable,
            {
              name: name,
              file: file,
              fileType:
                file.type ===
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  ? "doc"
                  : file.type,
              is_uploaded: true,
            },
          ];
          formData.append(`file[${i}]`, file);
          formData.append(
            `file_type[${i}]`,
            file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              ? "doc"
              : file.type
          );
          //   formData.append(`doc_id[${i}]`, filename[0].id ? filename[0].id : '' )
          formData.append(`doc_id[${i}]`, fileId);
        }
      }
    }
    this.setState({
      ...this.state,
      documentsTable: documentsTable,
    });

    if (filename && filename.length > 0) {
      formData.append("len", e.target.files.length);
      formData.append("by_admin", true);
      // this.props.update_application_upload_doc_file(formData, filename[0].id ? filename[0].id : '', 'uploadDocClient')
      this.props.update_application_upload_doc_file(
        formData,
        fileId,
        "uploadDocClient"
      );
    }
  }
  /**
   *
   *  Seller DOc
   *
   */
  _handleUploadSellerDocChange(e, fileIndex, name, assetId) {
    e.preventDefault();
    // let file = e.target.files[0];
    console.log(this.state.sellerDocuments, "this.state.sellerDocuments");
    let sellerDocuments = this.state.sellerDocuments.slice();
    var formData = new FormData();
    const filename = this.state.sellerDocuments.filter(
      (item, index) => item.fileName === name
    );
    const fileId = filename[0] ? (filename[0].id ? filename[0].id : "") : "";
    if (!fileId) {
      toastr.error("Error", "Please first request the document");
      return false;
    }
    for (var i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (file !== undefined && file !== null) {
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
          // return false;
        } else {
          sellerDocuments = sellerDocuments.slice().map((item, index) => {
            if (index === fileIndex) {
              return {
                ...item,
                isRequest: !item.isRequest,
              };
            }
            return item;
          });
          formData.append(`${name}`, file);
        }
      }
    }
    this.setState({
      ...this.state,
      sellerDocuments: sellerDocuments,
    });

    if (filename && filename.length > 0) {
      this.props.upload_asset_detail_files(formData, assetId);
      // this.props.update_application_upload_doc_file(
      //   formData,
      //   fileId,
      //   "uploadDocClient"
      // );
    }
  }
  deleteUploadDoc = (itemIndex, id) => {
    const docId = this.state.documents
      .filter((item, index) => Number(item.id) === Number(id))
      .map((item) => {
        return item.id;
      })[0];
    if (docId) {
      this.props.delete_upload_doc(docId);
      this.setState({
        ...this.state,
        deletedDocId: docId,
      });
    } else {
      this.setState({
        ...this.state,
        documents: this.state.documents.slice().map((item, fileIndex) => {
          if (fileIndex === itemIndex) {
            return {
              ...item,
              file: null,
              is_uploaded: false,
            };
          }
          return item;
        }),
        documentsTable: this.state.documentsTable.filter((item, fileIndex) => {
          return fileIndex !== itemIndex;
        }),
        adminDocumentRequest: this.state.adminDocumentRequest
          .slice()
          .map((item) => {
            if (Number(item.id) === Number(docId)) {
              return {
                ...item,
                is_uploaded: false,
                isRequest: false,
                id: "",
              };
            }
            return item;
          }),
      });
    }
  };
  delete_Upload_Doc = (itemIndex, id) => {
    // const docId = this.state.documentsTable.filter((item, index) => index === itemIndex).map(item => { return item.file !== undefined && item.file !== null && item.file !== '' ? item.id : '' })[0]
    const docId = this.state.documentsTable
      .filter((item, index) => Number(item.id) === Number(id))
      .map((item) => {
        return item.file !== undefined && item.file !== null && item.file !== ""
          ? item.id
          : "";
      })[0];
    if (docId) {
      this.props.delete_upload_doc_file(docId);
      this.setState({
        ...this.state,
        deletedDocId: docId,
      });
    } else {
      this.setState({
        ...this.state,
        documentsTable: this.state.documentsTable.filter((item, fileIndex) => {
          return fileIndex !== itemIndex;
        }),
      });
    }
  };
  updateadminUploadDoc = (docIndex) => {
    const requiredFile = this.state.adminDocumentRequest
      .filter((item, index) => index === docIndex)
      .map((itm) => {
        return itm;
      })[0];
    if (requiredFile) {
      if (requiredFile.isRequest === false) {
        this.setState({
          ...this.state,
          adminDocumentRequest: this.state.adminDocumentRequest
            .slice()
            .map((item, index) => {
              if (index === docIndex) {
                return {
                  ...item,
                  isRequest: !item.isRequest,
                };
              }
              return item;
            }),
        });
        const data = {
          id: this.state.buyerAppId,
          required_documents: [{ name: requiredFile.name, is_uploaded: false }],
          additional_item: [],
          by_admin: false,
        };
        this.props.update_application_detail(data, "adminDocumentRequest");
      } else {
        this.setState({
          ...this.state,
          adminDocumentRequest: this.state.adminDocumentRequest
            .slice()
            .map((item, index) => {
              if (index === docIndex) {
                return {
                  ...item,
                  isRequest: !item.isRequest,
                };
              }
              return item;
            }),
          documentsTable: this.state.documentsTable.filter(
            (item, fileIndex) => {
              return Number(item.doc_id) !== Number(requiredFile.id);
            }
          ),
        });
        this.deleteUploadDoc(docIndex, requiredFile.id);
      }
    }
  };

  upload_unrequested_doc = (e, docIndex, name) => {
    e.preventDefault();
    const requiredFile = this.state.adminDocumentRequest
      .filter((item, index) => index === docIndex)
      .map((itm) => {
        return itm;
      })[0];
    if (requiredFile) {
      const data = {
        id: this.state.buyerAppId,
        required_documents: [{ name: requiredFile.name, is_uploaded: false }],
        additional_item: [],
        by_admin: true,
      };
      let imagesData = [];
      // let file = e.target.files[0];
      let documentsTable = this.state.documentsTable.slice();
      const filename = this.state.documents.filter(
        (item, index) => item.name === name
      );
      for (var i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        if (file !== undefined && file !== null) {
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
            // return false;
          } else {
            documentsTable = [
              ...documentsTable,
              {
                name: requiredFile.name,
                file: file,
                fileType:
                  file.type ===
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    ? "doc"
                    : file.type,
                is_uploaded: true,
              },
            ];
            imagesData.push({
              file: file,
              file_type:
                file.type ===
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  ? "doc"
                  : file.type,
              doc_id: "",
            });
          }
        }
      }
      this.setState({
        ...this.state,
        unRequestDocName: requiredFile.name,
      });
      this.props.upload_un_requested_doc(data, imagesData);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.type_of_vehicles !== this.props.type_of_vehicles &&
      this.props.type_of_vehicles !== undefined
    ) {
      const typeOfVehicle = [];

      (this.props.type_of_vehicles || []).map((item, index) => {
        typeOfVehicle.push({
          value: item.id,
          label: item.name,
        });
      });
      let firstTypeOfVehicle = this.props.application_detail
        ? this.props.application_detail.vehicle &&
          this.props.application_detail.vehicle.length > 0
          ? (this.props.application_detail.vehicle || [])[0]
            ? typeOfVehicle
              .filter(
                (item) =>
                  Number(item.value) ===
                  Number(
                    (this.props.application_detail.vehicle || [])[0]
                      .type_of_vehicle
                  )
              )
              .map((item) => {
                return item.label;
              })
            : ""
          : ""
        : "";
      this.setState({
        ...this.state,
        vehicleOptions: typeOfVehicle,
        firstTypeOfVehicle:
          firstTypeOfVehicle && firstTypeOfVehicle.length > 0
            ? firstTypeOfVehicle[0]
            : "",
        assetsDetails: this.props.application_detail
          ? this.props.application_detail.vehicle !== undefined &&
            this.props.application_detail.vehicle !== null &&
            this.props.application_detail.vehicle.length > 0
            ? (this.props.application_detail.vehicle || []).map((item) => {
              return {
                ...item,
                vehicleType:
                  item.type_of_vehicle !== undefined &&
                    item.type_of_vehicle !== null
                    ? item.type_of_vehicle
                    : "",
                selectedVehicle:
                  item.type_of_vehicle !== undefined &&
                    item.type_of_vehicle !== null
                    ? (typeOfVehicle || []).filter(
                      (typeVehcile) =>
                        Number(typeVehcile.value) ===
                        Number(item.type_of_vehicle)
                    ) !== undefined &&
                      (typeOfVehicle || []).filter(
                        (typeVehcile) =>
                          Number(typeVehcile.value) ===
                          Number(item.type_of_vehicle)
                      ) !== null &&
                      (typeOfVehicle || []).filter(
                        (typeVehcile) =>
                          Number(typeVehcile.value) ===
                          Number(item.type_of_vehicle)
                      ).length > 0
                      ? (typeOfVehicle || []).filter(
                        (typeVehcile) =>
                          Number(typeVehcile.value) ===
                          Number(item.type_of_vehicle)
                      )[0]
                      : ""
                    : "",
                stockNumber: item.stock_id ? item.stock_id : "",
                // stockNumber: this.props.application_detail ? this.props.application_detail.stock && Object.keys(this.props.application_detail.stock).length > 0 ? this.props.application_detail.stock.stock_id ? this.props.application_detail.stock.stock_id : '' : '' : '',
                year: item.year ? item.year : "",
                selectedYear:
                  item.year !== undefined && item.year !== null
                    ? { value: item.year, label: item.year }
                    : "",
                make: item.make ? item.make : "",
                model: item.model ? item.model : "",
                trim: item.trim ? item.trim : "",
                kilometer: item.kilometer ? item.kilometer : "",
                vin: item.vin ? item.vin : "",
                price: item.price ? item.price : "",
                condition: item.condition ? item.condition : "",
                selectedCondition: item.condition
                  ? { value: item.condition, label: item.condition }
                  : "",
                is_updated: true,
                new: false,
              };
            })
            : [
              {
                id: "",
                vehicleType: "",
                selectedVehicle: "",
                stockNumber: "",
                year: "",
                selectedYear: "",
                make: "",
                mode: "",
                trim: "",
                kilometer: "",
                vin: "",
                price: "",
                condition: "",
                is_updated: false,
                new: true,
              },
            ]
          : [
            {
              id: "",
              vehicleType: "",
              selectedVehicle: "",
              stockNumber: "",
              year: "",
              selectedYear: "",
              make: "",
              mode: "",
              trim: "",
              kilometer: "",
              vin: "",
              price: "",
              condition: "",
              is_updated: false,
              new: true,
            },
          ],
        assetsDetailsForm: this.props.application_detail
          ? this.props.application_detail.vehicle !== undefined &&
            this.props.application_detail.vehicle !== null &&
            this.props.application_detail.vehicle.length > 0
            ? (this.props.application_detail.vehicle || []).map((item) => {
              return {
                ...item,
                vehicleType:
                  item.type_of_vehicle !== undefined &&
                    item.type_of_vehicle !== null
                    ? item.type_of_vehicle
                    : "",
                selectedVehicle:
                  item.type_of_vehicle !== undefined &&
                    item.type_of_vehicle !== null
                    ? (typeOfVehicle || []).filter(
                      (typeVehcile) =>
                        Number(typeVehcile.value) ===
                        Number(item.type_of_vehicle)
                    ) !== undefined &&
                      (typeOfVehicle || []).filter(
                        (typeVehcile) =>
                          Number(typeVehcile.value) ===
                          Number(item.type_of_vehicle)
                      ) !== null &&
                      (typeOfVehicle || []).filter(
                        (typeVehcile) =>
                          Number(typeVehcile.value) ===
                          Number(item.type_of_vehicle)
                      ).length > 0
                      ? (typeOfVehicle || []).filter(
                        (typeVehcile) =>
                          Number(typeVehcile.value) ===
                          Number(item.type_of_vehicle)
                      )[0]
                      : ""
                    : "",
                stockNumber: item.stock_id ? item.stock_id : "",
                // stockNumber: this.props.application_detail ? this.props.application_detail.stock && Object.keys(this.props.application_detail.stock).length > 0 ? this.props.application_detail.stock.stock_id ? this.props.application_detail.stock.stock_id : '' : '' : '',
                year: item.year ? item.year : "",
                selectedYear: item.year
                  ? { value: item.year, label: item.year }
                  : "",
                make: item ? (item.make ? item.make : "") : "",
                model: item ? (item.model ? item.model : "") : "",
                trim: item ? (item.trim ? item.trim : "") : "",
                kilometer: item ? (item.kilometer ? item.kilometer : "") : "",
                vin: item ? (item.vin ? item.vin : "") : "",
                price: item.price ? item.price : "",
                condition: item.condition ? item.condition : "",
                selectedCondition: item.condition
                  ? { value: item.condition, label: item.condition }
                  : "",
                is_updated: true,
                new: false,
              };
            })
            : [
              {
                id: "",
                vehicleType: "",
                selectedVehicle: "",
                stockNumber: "",
                year: "",
                selectedYear: "",
                make: "",
                model: "",
                trim: "",
                kilometer: "",
                vin: "",
                price: "",
                condition: "",
                selectedCondition: "",
                is_updated: false,
                new: true,
              },
            ]
          : [
            {
              id: "",
              vehicleType: "",
              selectedVehicle: "",
              stockNumber: "",
              year: "",
              selectedYear: "",
              make: "",
              model: "",
              trim: "",
              kilometer: "",
              vin: "",
              price: "",
              condition: "",
              selectedCondition: "",
              is_updated: false,
              new: true,
            },
          ],
      });
    }
    if (
      prevProps.addtional_types !== this.props.addtional_types &&
      this.props.addtional_types !== undefined
    ) {
      const addtionalTypes = [];
      (this.props.addtional_types || []).map((item, index) => {
        addtionalTypes.push({
          value: item.id,
          label: item.type,
        });
      });
      this.setState({
        ...this.state,
        addtionalTypes: addtionalTypes,
        addtionalInformation:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.additional_item !== undefined &&
              this.props.application_detail.additional_item !== null &&
              this.props.application_detail.additional_item.length > 0
              ? this.props.application_detail.additional_item.map((item) => {
                return {
                  infoProvider: item.provider,
                  infoCost: item.cost,
                  selectedProductType:
                    this.props.addtional_types !== undefined &&
                      this.props.addtional_types !== null &&
                      this.props.addtional_types.length > 0
                      ? this.props.addtional_types
                        .filter((ad) => Number(ad.id) === Number(item.type))
                        .map((add) => {
                          return { value: add.id, label: add.type };
                        })[0]
                      : "",
                  productType: item.type,
                  id: item.id,
                  new: false,
                };
              })
              : [
                {
                  infoProvider: "",
                  infoCost: "",
                  selectedProductType: "",
                  productType: "",
                  id: "",
                  new: true,
                },
              ]
            : [
              {
                infoProvider: "",
                infoCost: "",
                selectedProductType: "",
                productType: "",
                id: "",
                new: true,
              },
            ],
      });
    }
    if (
      prevProps.application_detail !== this.props.application_detail &&
      this.props.application_detail !== undefined &&
      Object.keys(this.props.application_detail) !== 0
    ) {
      const financing_amount =
        this.props.application_detail != undefined &&
          this.props.application_detail != null
          ? this.props.application_detail.financing_amount != undefined &&
            this.props.application_detail.financing_amount != null
            ? this.props.application_detail.financing_amount
            : 0
          : 0;
      // let defaultLoanAmount = this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.financing_amount != undefined && this.props.application_detail.financing_amount != null ? (this.props.application_detail.financing_amount / 100) : 0 : 0
      let defaultLoanAmount =
        this.props.application_detail != undefined &&
          this.props.application_detail != null
          ? this.props.application_detail.financing_amount != undefined &&
            this.props.application_detail.financing_amount != null
            ? this.props.application_detail.financing_amount
            : 0
          : 0;
      // defaultLoanAmount = defaultLoanAmount ? defaultLoanAmount * 13 : 0
      // defaultLoanAmount = defaultLoanAmount ? Number(financing_amount) + defaultLoanAmount + 1099 : 0
      let applicantDateOfBirth =
        this.props.application_detail.dob !== undefined &&
          this.props.application_detail.dob !== null &&
          this.props.application_detail.dob !== ""
          ? this.props.application_detail.dob
          : "";
      applicantDateOfBirth = applicantDateOfBirth
        ? applicantDateOfBirth.split("T")
        : "";
      applicantDateOfBirth =
        applicantDateOfBirth && applicantDateOfBirth.length > 0
          ? applicantDateOfBirth[0]
          : applicantDateOfBirth;
      applicantDateOfBirth = applicantDateOfBirth
        ? new Date(applicantDateOfBirth + "T00:00:00")
        : applicantDateOfBirth;

      let employmentSince =
        this.props.application_detail.employment_since !== undefined &&
          this.props.application_detail.employment_since !== null &&
          this.props.application_detail.employment_since !== ""
          ? this.props.application_detail.employment_since
          : "";
      employmentSince = employmentSince ? employmentSince.split("T") : "";
      employmentSince =
        employmentSince && employmentSince.length > 0
          ? employmentSince[0]
          : employmentSince;
      employmentSince = employmentSince
        ? new Date(employmentSince + "T00:00:00")
        : employmentSince;

      let coApplicantDate =
        this.props.application_detail !== undefined &&
          this.props.application_detail !== null
          ? this.props.application_detail.co_applicant !== null &&
            this.props.application_detail.co_applicant !== null
            ? this.props.application_detail.co_applicant.dob !== undefined &&
              this.props.application_detail.co_applicant.dob !== null &&
              this.props.application_detail.co_applicant.dob !== ""
              ? this.props.application_detail.co_applicant.dob
              : ""
            : ""
          : "";
      coApplicantDate = coApplicantDate ? coApplicantDate.split("T") : "";
      coApplicantDate =
        coApplicantDate && coApplicantDate.length > 0
          ? coApplicantDate[0]
          : coApplicantDate;
      coApplicantDate = coApplicantDate
        ? new Date(coApplicantDate + "T00:00:00")
        : coApplicantDate;

      let coApplicantEmploymentSince =
        this.props.application_detail !== undefined &&
          this.props.application_detail !== null
          ? this.props.application_detail.co_applicant !== null &&
            this.props.application_detail.co_applicant !== null
            ? this.props.application_detail.co_applicant.employment_since !==
              undefined &&
              this.props.application_detail.co_applicant.employment_since !==
              null &&
              this.props.application_detail.co_applicant.employment_since !== ""
              ? this.props.application_detail.co_applicant.employment_since
              : ""
            : ""
          : "";
      coApplicantEmploymentSince = coApplicantEmploymentSince
        ? coApplicantEmploymentSince.split("T")
        : "";
      coApplicantEmploymentSince =
        coApplicantEmploymentSince && coApplicantEmploymentSince.length > 0
          ? coApplicantEmploymentSince[0]
          : coApplicantEmploymentSince;
      coApplicantEmploymentSince = coApplicantEmploymentSince
        ? new Date(coApplicantEmploymentSince + "T00:00:00")
        : coApplicantEmploymentSince;

      let firstTypeOfVehicle = this.props.application_detail
        ? this.props.application_detail.vehicle &&
          this.props.application_detail.vehicle.length > 0
          ? (this.props.application_detail.vehicle || [])[0]
            ? (this.state.vehicleOptions || [])
              .filter(
                (item) =>
                  Number(item.value) ===
                  Number(
                    (this.props.application_detail.vehicle || [])[0]
                      .type_of_vehicle
                  )
              )
              .map((item) => {
                return item.label;
              })
            : ""
          : this.props.application_detail?.interested_vehicle_type
        : "";
      const selectedApplicationStatus = this.props.application_detail
        ? this.props.application_detail.application_status
          ? this.props.application_detail.application_status === "pending"
            ? [{ label: "Credit Unknown", value: "1" }]
            : this.state.applicationStatuses.filter(
              (item) =>
                Number(item.value) ===
                Number(this.props.application_detail.application_status)
            )
          : ""
        : "";

      this.setState({
        ...this.state,
        application_category:this.props.application_detail?.application_category,
        application_type:this.props.application_detail?.application_type,
        income_type: this.props.application_detail?.other_income
          ?.income_type,
        selectedIncomeType: {
          value: this.props.application_detail?.other_income
            ?.income_type, label: this.props.application_detail?.other_income
              ?.income_type
        },
        income_amount: this.props.application_detail?.other_income
          ?.income_amount,
        income_frequency: this.props.application_detail?.other_income
          ?.income_frequency,
        selectedIncomeFrequency: {
          value: this.props.application_detail?.other_income
            ?.income_frequency, label: this.props.application_detail?.other_income
              ?.income_frequency
        },
        buyerAppId:
          this.props.application_detail.id !== undefined &&
            this.props.application_detail.id !== null
            ? this.props.application_detail.id
            : "",
        declineReason:
          this.props.application_detail.decline_reason !== undefined &&
            this.props.application_detail.decline_reason !== null
            ? this.props.application_detail.decline_reason
            : "",
        applicantFirstName:
          this.props.application_detail.first_name !== undefined &&
            this.props.application_detail.first_name !== null
            ? this.props.application_detail.first_name
            : "",
        applicantLastName:
          this.props.application_detail.last_name !== undefined &&
            this.props.application_detail.last_name !== null
            ? this.props.application_detail.last_name
            : "",
        // applicantDateOfBirth: this.props.application_detail.dob !== undefined && this.props.application_detail.dob !== null && this.props.application_detail.dob !== '' ? new Date(this.props.application_detail.dob+'T00:00:00') : '',
        applicantDateOfBirth: applicantDateOfBirth,

        applicantTelephone: this.props.application_detail.telephone
          ? this.props.application_detail.telephone.substr(
            1,
            this.props.application_detail.telephone.length
          )
          : this.props.application_detail?.user.phone_number
            ? this.props.application_detail?.user?.phone_number.substr(
              1,
              this.props.application_detail?.user?.phone_number.length
            )
            : "",
        applicantAddress:
          this.props.application_detail.address !== undefined &&
            this.props.application_detail.address !== null
            ? { label: this.props.application_detail.address, value: {} }
            : "",
        applicantStreetAddress:
          this.props.application_detail.street_address !== undefined &&
            this.props.application_detail.street_address !== null
            ? this.props.application_detail.street_address
            : "",
        applicantStreetAddress2:
          this.props.application_detail.street_address2 !== undefined &&
            this.props.application_detail.street_address2 !== null
            ? this.props.application_detail.street_address2
            : "",
        salutation:
          this.props.application_detail.salutation !== undefined &&
            this.props.application_detail.salutation !== null
            ? this.props.application_detail.salutation
            : "",
            selectSalutation: this.props.application_detail.salutation !== undefined &&
            this.props.application_detail.salutation !== null
            ?  this.state.salutations.filter((el) =>
              (el.value == this.props.application_detail.salutation))?.[0] || ""
                : "",
        gender:
          this.props.application_detail.gender !== undefined &&
            this.props.application_detail.gender !== null
            ? this.props.application_detail.gender
            : "",
        selectGender: this.state.genders.find(
          (el) => el.value === this.props.application_detail?.gender
        ),

        interestedVehicleType:
          this.props.application_detail.interested_vehicle_type !== undefined &&
            this.props.application_detail.interested_vehicle_type !== null
            ? this.props.application_detail.interested_vehicle_type
            : "",
        // applicantLocationName: this.props.application_detail.address !== undefined && this.props.application_detail.address !== null ? this.props.application_detail.address : '',
        applicantLocationName:
          this.props.application_detail.street_address !== undefined &&
            this.props.application_detail.street_address !== null
            ? this.props.application_detail.street_address
            : "",
        applicantCity:
          this.props.application_detail.city !== undefined &&
            this.props.application_detail.city !== null
            ? this.props.application_detail.city
            : "",
        applicantProvince:
          this.props.application_detail.province !== undefined &&
            this.props.application_detail.province !== null
            ? this.props.application_detail.province
            : "",
        selectedProvince:
          this.props.application_detail.province !== undefined &&
            this.props.application_detail.province !== null
            ? (this.state.provinces || []).filter((item) => {
              return item.value === this.props.application_detail.province;
            }) !== undefined &&
              (this.state.provinces || []).filter((item) => {
                return item.value === this.props.application_detail.province;
              }) !== null &&
              (this.state.provinces || []).filter((item) => {
                return item.value === this.props.application_detail.province;
              }).length > 0
              ? (this.state.provinces || []).filter((item) => {
                return item.value === this.props.application_detail.province;
              })[0]
              : ""
            : "",
        applicantPostalCode:
          this.props.application_detail.postal_code !== undefined &&
            this.props.application_detail.postal_code !== null
            ? this.props.application_detail.postal_code
            : "",
        applicantCountry:
          this.props.application_detail.country !== undefined &&
            this.props.application_detail.country !== null
            ? this.props.application_detail.country
            : "",
        employmentStatus:
          this.props.application_detail.employement_status !== undefined &&
            this.props.application_detail.employement_status !== null
            ? this.props.application_detail.employement_status
            : "",
        applicantMaritalStatus:
          this.props.application_detail.marital_status !== undefined &&
            this.props.application_detail.marital_status !== null
            ? this.props.application_detail.marital_status
            : "",
        selectApplicantMaritalStatus:
          this.props.application_detail.marital_status !== undefined &&
            this.props.application_detail.marital_status !== null
            ? (this.state.maritalStatues || []).filter((item) => {
              return (
                item.value === this.props.application_detail.marital_status
              );
            }) !== undefined &&
              (this.state.maritalStatues || []).filter((item) => {
                return (
                  item.value === this.props.application_detail.marital_status
                );
              }) !== null &&
              (this.state.maritalStatues || []).filter((item) => {
                return (
                  item.value === this.props.application_detail.marital_status
                );
              }).length > 0
              ? (this.state.maritalStatues || []).filter((item) => {
                return (
                  item.value === this.props.application_detail.marital_status
                );
              })[0]
              : ""
            : "",
        // previous Applicant Address
        applicantPreviousStreetAddress:
          this.props.application_detail?.previous_applicant_address
            ?.street_address,
        applicantPreviousStreetAddress2:
          this.props.application_detail?.previous_applicant_address
            ?.street_address_2,
        previousCity:
          this.props.application_detail?.previous_applicant_address?.city,
        previousProvince:
          this.props.application_detail?.previous_applicant_address?.province,
        selectedPreviousProvince: this.state.provinces.find(
          (el) =>
            el.value ===
            this.props.application_detail?.previous_applicant_address?.province
        ),
        previousPostalCode:
          this.props.application_detail?.previous_applicant_address
            ?.postal_code,
        durationAtPreviousAddress:
          this.props.application_detail?.previous_applicant_address
            ?.duration_address_yr,
        durationAtPreviousAddressMonth:
          this.props.application_detail?.previous_applicant_address
            ?.duration_address_mn,
        previousStatus:
          this.props.application_detail?.previous_applicant_address?.status,
        previousSelectedStatus: this.state.statuses.find(
          (el) =>
            el.value ===
            this.props.application_detail?.previous_applicant_address?.status
        ),
        previousMortgageAmount:
          this.props.application_detail?.previous_applicant_address
            ?.mortgage_amount,
        // previous employer details
        previousEmployerName:
          this.props.application_detail?.previous_employer_address
            ?.employer_name,
        previousEmployerStreetAddress:
          this.props.application_detail?.previous_employer_address
            ?.employer_address,
        previousEmployerCity:
          this.props.application_detail?.previous_employer_address
            ?.employer_city,
        previousEmployerProvince:
          this.props.application_detail?.previous_employer_address
            ?.employer_province,
        previousEmployerPhone:
          this.props.application_detail?.previous_employer_address
            ?.employer_telephone,
        previousEmployerEmail:
          this.props.application_detail?.previous_employer_address
            ?.employer_email,
        previousEmploymentStatus:
          this.props.application_detail?.previous_employer_address
            ?.employement_status,
        selectPreviousEmploymentStatus: this.state.employmentStatuses.find(
          (el) =>
            el.value ===
            this.props.application_detail?.previous_employer_address
              ?.employement_status
        ),
        previousTypeOfEmployment:
          this.props.application_detail?.previous_employer_address
            ?.type_of_employment,
        selectedPreviousTypeOfEmployment: this.state.typeOfEmployments.find(
          (el) =>
            el.value ===
            this.props.application_detail?.previous_employer_address
              ?.type_of_employment
        ),
        previousEmploymentSinceYear:
          this.props.application_detail?.previous_employer_address
            ?.employment_since_year,
        previousEmploymentSinceMonth:
          this.props.application_detail?.previous_employer_address
            ?.employment_since_month,
        previousGrossIncome:
          this.props.application_detail?.previous_employer_address
            ?.gross_income,
        previousEmployeeBusinessName:
          this.props.application_detail?.previous_employer_address
            ?.business_name,
        previousEmployeeTypeOfBusiness:
          this.props.application_detail?.previous_employer_address
            ?.type_of_business,
        previousOccupation:
          this.props.application_detail?.previous_employer_address?.occupation,
        employmentSinceYear:
          this.props.application_detail?.employment_since_year,
        employmentSinceMonth:
          this.props.application_detail?.employment_since_month,

        selectEmploymentStatus:
          this.props.application_detail.employement_status !== undefined &&
            this.props.application_detail.employement_status !== null
            ? (this.state.employmentStatuses || []).filter((item) => {
              return (
                item.value ===
                this.props.application_detail.employement_status
              );
            }) !== undefined &&
              (this.state.employmentStatuses || []).filter((item) => {
                return (
                  item.value ===
                  this.props.application_detail.employement_status
                );
              }) !== null &&
              (this.state.employmentStatuses || []).filter((item) => {
                return (
                  item.value ===
                  this.props.application_detail.employement_status
                );
              }).length > 0
              ? (this.state.employmentStatuses || []).filter((item) => {
                return (
                  item.value ===
                  this.props.application_detail.employement_status
                );
              })[0]
              : ""
            : "",
        typeOfEmployment:
          this.props.application_detail.type_of_employment !== undefined &&
            this.props.application_detail.type_of_employment !== null
            ? this.props.application_detail.type_of_employment
            : "",
        selectedTypeOfEmployment:
          this.props.application_detail.type_of_employment !== undefined &&
            this.props.application_detail.type_of_employment !== null
            ? (this.state.typeOfEmployments || []).filter((item) => {
              return (
                item.value.toLowerCase() ===
                this.props.application_detail.type_of_employment.toLowerCase()
              );
            }) !== undefined &&
              (this.state.typeOfEmployments || []).filter((item) => {
                return (
                  item.value.toLowerCase() ===
                  this.props.application_detail.type_of_employment.toLowerCase()
                );
              }) !== null &&
              (this.state.typeOfEmployments || []).filter((item) => {
                return (
                  item.value.toLowerCase() ===
                  this.props.application_detail.type_of_employment.toLowerCase()
                );
              }).length > 0
              ? (this.state.typeOfEmployments || []).filter((item) => {
                return (
                  item.value.toLowerCase() ===
                  this.props.application_detail.type_of_employment.toLowerCase()
                );
              })[0]
              : ""
            : "",
        employerName:
          this.props.application_detail.employer_name !== undefined &&
            this.props.application_detail.employer_name !== null
            ? this.props.application_detail.employer_name
            : "",
        employeeBusinessName:
          this.props.application_detail.business_name !== undefined &&
            this.props.application_detail.business_name !== null
            ? this.props.application_detail.business_name
            : "",
        typeOfBusniess:
          this.props.application_detail.type_of_business !== undefined &&
            this.props.application_detail.type_of_business !== null
            ? this.props.application_detail.type_of_business
            : "",
        occupation:
          this.props.application_detail.occupation !== undefined &&
            this.props.application_detail.occupation !== null
            ? this.props.application_detail.occupation
            : "",
        applicantEmailByDealer:
          this.props.application_detail.applicant_email_by_dealer !==
            undefined &&
            this.props.application_detail.applicant_email_by_dealer !== null
            ? this.props.application_detail.applicant_email_by_dealer
            : "",
        mortgage_amount:
          this.props.application_detail.mortgage_amount !== undefined &&
            this.props.application_detail.mortgage_amount !== null
            ? this.props.application_detail.mortgage_amount
            : "",
        duration_address_mn:
          this.props.application_detail.duration_address_mn !== undefined &&
            this.props.application_detail.duration_address_mn !== null
            ? this.props.application_detail.duration_address_mn
            : "",
        duration_address_yr:
          this.props.application_detail.duration_address_yr !== undefined &&
            this.props.application_detail.duration_address_yr !== null
            ? this.props.application_detail.duration_address_yr
            : "",
        applicantSin:
          this.props.application_detail.sin !== undefined &&
            this.props.application_detail.sin !== null
            ? this.props.application_detail.sin
            : "",
        status:
          this.props.application_detail.status !== undefined &&
            this.props.application_detail.status !== null
            ? {
              value: this.props.application_detail.status,
              label: this.props.application_detail.status,
            }
            : "",
        selectedStatus:
          this.props.application_detail.status !== undefined &&
            this.props.application_detail.status !== null
            ? this.props.application_detail.status
            : "",
        employmentSince: employmentSince,
        //  this.props.application_detail.employment_since !== undefined && this.props.application_detail.employment_since !== null && this.props.application_detail.employment_since !== '' ? new Date(this.props.application_detail.employment_since+'T00:00:00') : '',
        grossMonthlyIncome:
          this.props.application_detail.gross_income !== undefined &&
            this.props.application_detail.gross_income !== null
            ? this.props.application_detail.gross_income
            : "",
        grossMonthlyIncomeSlider:
          this.props.application_detail.gross_income !== undefined &&
            this.props.application_detail.gross_income !== null
            ? this.props.application_detail.gross_income
            : "",
        // Vehicle Data
        assetsDetails: this.props.application_detail
          ? this.props.application_detail.vehicle &&
            this.props.application_detail.vehicle.length > 0
            ? (this.props.application_detail.vehicle || []).map((item) => {
              return {
                id: item.id ? item.id : "",
                vehicleType: item.type_of_vehicle ? item.type_of_vehicle : "",
                selectedVehicle: item.type_of_vehicle
                  ? (this.state.vehicleOptions || []).filter(
                    (typeVehcile) =>
                      Number(typeVehcile.value) ===
                      Number(item.type_of_vehicle)
                  ) !== undefined &&
                    (this.state.vehicleOptions || []).filter(
                      (typeVehcile) =>
                        Number(typeVehcile.value) ===
                        Number(item.type_of_vehicle)
                    ) !== null &&
                    (this.state.vehicleOptions || []).filter(
                      (typeVehcile) =>
                        Number(typeVehcile.value) ===
                        Number(item.type_of_vehicle)
                    ).length > 0
                    ? (this.state.vehicleOptions || []).filter(
                      (typeVehcile) => {
                        return (
                          Number(typeVehcile.value) ===
                          Number(item.type_of_vehicle)
                        );
                      }
                    )[0]
                    : ""
                  : "",
                stockNumber: item.stock_id ? item.stock_id : "",
                // stockNumber: this.props.application_detail ? this.props.application_detail.stock && Object.keys(this.props.application_detail.stock).length > 0 ? this.props.application_detail.stock.stock_id ? this.props.application_detail.stock.stock_id : '' : '' : '',
                year: item.year ? item.year : "",
                selectedYear:
                  item.year !== undefined && item.year !== null
                    ? { value: item.year, label: item.year }
                    : "",
                make: item.make ? item.make : "",
                model: item.model ? item.model : "",
                trim: item.trim ? item.trim : "",
                kilometer: item.kilometer ? item.kilometer : "",
                vin: item.vin ? item.vin : "",
                price: item.price ? item.price : "",
                condition: item.condition ? item.condition : "",
                selectedCondition: item.condition
                  ? { value: item.condition, label: item.condition }
                  : "",
                is_updated: true,
                new: false,
              };
            })
            : [
              {
                id: "",
                vehicleType: "",
                selectedVehicle: "",
                stockNumber: "",
                year: "",
                selectedYear: "",
                make: "",
                mode: "",
                trim: "",
                kilometer: "",
                vin: "",
                price: "",
                condition: "",
                is_updated: false,
                new: true,
              },
            ]
          : [
            {
              id: "",
              vehicleType: "",
              selectedVehicle: "",
              stockNumber: "",
              year: "",
              selectedYear: "",
              make: "",
              mode: "",
              trim: "",
              kilometer: "",
              vin: "",
              price: "",
              condition: "",
              is_updated: false,
              new: true,
            },
          ],
        assetsDetailsForm: this.props.application_detail
          ? this.props.application_detail.vehicle &&
            this.props.application_detail.vehicle.length > 0
            ? (this.props.application_detail.vehicle || []).map((item) => {
              return {
                id: item.id ? item.id : "",
                vehicleType: item.type_of_vehicle ? item.type_of_vehicle : "",
                selectedVehicle: item.type_of_vehicle
                  ? (this.state.vehicleOptions || []).filter(
                    (typeVehcile) =>
                      Number(typeVehcile.value) ===
                      Number(item.type_of_vehicle)
                  ) !== undefined &&
                    (this.state.vehicleOptions || []).filter(
                      (typeVehcile) =>
                        Number(typeVehcile.value) ===
                        Number(item.type_of_vehicle)
                    ) !== null &&
                    (this.state.vehicleOptions || []).filter(
                      (typeVehcile) =>
                        Number(typeVehcile.value) ===
                        Number(item.type_of_vehicle)
                    ).length > 0
                    ? (this.state.vehicleOptions || []).filter(
                      (typeVehcile) => {
                        return (
                          Number(typeVehcile.value) ===
                          Number(item.type_of_vehicle)
                        );
                      }
                    )[0]
                    : ""
                  : "",
                stockNumber: item.stock_id ? item.stock_id : "",
                // stockNumber: this.props.application_detail ? this.props.application_detail.stock && Object.keys(this.props.application_detail.stock).length > 0 ? this.props.application_detail.stock.stock_id ? this.props.application_detail.stock.stock_id : '' : '' : '',
                year: item.year ? item.year : "",
                selectedYear: item.year
                  ? { value: item.year, label: item.year }
                  : "",
                make: item ? (item.make ? item.make : "") : "",
                model: item ? (item.model ? item.model : "") : "",
                trim: item ? (item.trim ? item.trim : "") : "",
                kilometer: item ? (item.kilometer ? item.kilometer : "") : "",
                vin: item ? (item.vin ? item.vin : "") : "",
                price: item.price ? item.price : "",
                condition: item.condition ? item.condition : "",
                selectedCondition: item.condition
                  ? { value: item.condition, label: item.condition }
                  : "",
                is_updated: true,
                new: false,
                // year: item.year ? item.year : '', selectedYear: item.year ? { value: item.year, label: item.year } : '', make: this.props.application_detail !== undefined && item !== null ? item.make ? item.make : '' : '', model: this.props.application_detail !== undefined && item !== null ? item.model ? item.model : '' : '', trim: this.props.application_detail !== undefined && item !== null ? item.trim ? item.trim : '' : '', kilometer: this.props.application_detail !== undefined && item !== null ? item.kilometer ? item.kilometer : '' : '', vin: this.props.application_detail !== undefined && item !== null ? item.vin ? item.vin : '' : '', price: item.price ? item.price : '', condition: item.condition !== undefined && item.condition !== null ? item.condition : '', selectedCondition: item.condition !== undefined && item.condition !== null ? { value: item.condition, label: item.condition } : '', is_updated: true, new: false
              };
            })
            : [
              {
                id: "",
                vehicleType: "",
                selectedVehicle: "",
                stockNumber: "",
                year: "",
                selectedYear: "",
                make: "",
                model: "",
                trim: "",
                kilometer: "",
                vin: "",
                price: "",
                condition: "",
                selectedCondition: "",
                is_updated: false,
                new: true,
              },
            ]
          : [
            {
              id: "",
              vehicleType: "",
              selectedVehicle: "",
              stockNumber: "",
              year: "",
              selectedYear: "",
              make: "",
              model: "",
              trim: "",
              kilometer: "",
              vin: "",
              price: "",
              condition: "",
              selectedCondition: "",
              is_updated: false,
              new: true,
            },
          ],
        // Seller States
        sellerDealerShipName:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.seller !== null
              ? this.props.application_detail.seller.dealership_name !==
                undefined &&
                this.props.application_detail.seller.dealership_name !== null
                ? this.props.application_detail.seller.dealership_name
                : ""
              : ""
            : "",
        sellerFirstName:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.seller !== null
              ? this.props.application_detail.seller.first_name !== undefined &&
                this.props.application_detail.seller.first_name !== null
                ? this.props.application_detail.seller.first_name
                : ""
              : ""
            : "",
        sellerLastName:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.seller !== null
              ? this.props.application_detail.seller.last_name !== undefined &&
                this.props.application_detail.seller.last_name !== null
                ? this.props.application_detail.seller.last_name
                : ""
              : ""
            : "",
        sellerProvince:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.seller !== null
              ? this.props.application_detail.seller.province !== undefined &&
                this.props.application_detail.seller.province !== null
                ? this.props.application_detail.seller.province
                : ""
              : ""
            : "",
        selectedSellerProvince:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.seller !== null
              ? this.props.application_detail.seller.province !== undefined &&
                this.props.application_detail.seller.province !== null
                ? (this.state.provinces || []).filter((item) => {
                  return (
                    item.value ===
                    this.props.application_detail.seller.province
                  );
                }) !== undefined &&
                  (this.state.provinces || []).filter((item) => {
                    return (
                      item.value ===
                      this.props.application_detail.seller.province
                    );
                  }) !== null &&
                  (this.state.provinces || []).filter((item) => {
                    return (
                      item.value ===
                      this.props.application_detail.seller.province
                    );
                  }).length > 0
                  ? (this.state.provinces || []).filter((item) => {
                    return (
                      item.value ===
                      this.props.application_detail.seller.province
                    );
                  })[0]
                  : ""
                : ""
              : ""
            : "",
        sellertCity:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.seller !== null
              ? this.props.application_detail.seller.city !== undefined &&
                this.props.application_detail.seller.city !== null
                ? this.props.application_detail.seller.city
                : ""
              : ""
            : "",
        sellerPostalCode:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.seller !== null
              ? this.props.application_detail.seller.postal_code !==
                undefined &&
                this.props.application_detail.seller.postal_code !== null
                ? this.props.application_detail.seller.postal_code
                : ""
              : ""
            : "",
        sellerCountry:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.seller !== null
              ? this.props.application_detail.seller.country !== undefined &&
                this.props.application_detail.seller.country !== null
                ? this.props.application_detail.seller.country
                : ""
              : ""
            : "",
        sellerStreetAddress:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.seller !== null
              ? this.props.application_detail.seller.street !== undefined &&
                this.props.application_detail.seller.street !== null
                ? this.props.application_detail.seller.street
                : ""
              : ""
            : "",
        sellerLocationName:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.seller !== null
              ? this.props.application_detail.seller.street !== undefined &&
                this.props.application_detail.seller.street !== null
                ? this.props.application_detail.seller.street
                : ""
              : ""
            : "",
        sellerFax:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.seller !== null
              ? this.props.application_detail.seller.fax !== undefined &&
                this.props.application_detail.seller.fax !== null
                ? this.props.application_detail.seller.fax
                : ""
              : ""
            : "",
        sellerTelephone:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.seller !== null
              ? this.props.application_detail.seller.telephone !== undefined &&
                this.props.application_detail.seller.telephone !== null
                ? this.props.application_detail.seller.telephone
                : ""
              : ""
            : "",
        sellerEmail:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.seller !== null
              ? this.props.application_detail.seller.email !== undefined &&
                this.props.application_detail.seller.email !== null
                ? this.props.application_detail.seller.email
                : ""
              : ""
            : "",
        sellerCity:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.seller !== null
              ? this.props.application_detail.seller.city !== undefined &&
                this.props.application_detail.seller.city !== null
                ? this.props.application_detail.seller.city
                : ""
              : ""
            : "",
        //  AddtionalInformation
        addtionalInformation:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.seller !== undefined &&
              this.props.application_detail.additional_item !== undefined &&
              this.props.application_detail.additional_item !== null &&
              this.props.application_detail.additional_item.length > 0
              ? this.props.application_detail.additional_item.map((item) => {
                return {
                  infoProvider: item.provider,
                  infoCost: item.cost,
                  selectedProductType:
                    this.props.addtional_types !== undefined &&
                      this.props.addtional_types !== null &&
                      this.props.addtional_types.length > 0
                      ? this.props.addtional_types
                        .filter((ad) => Number(ad.id) === Number(item.type))
                        .map((add) => {
                          return { value: add.id, label: add.type };
                        })[0]
                      : "",
                  productType: item.type,
                  id: item.id,
                  new: false,
                  is_updated: true,
                };
              })
              : [
                {
                  infoProvider: "",
                  infoCost: "",
                  selectedProductType: "",
                  productType: "",
                  id: "",
                  new: true,
                },
              ]
            : [
              {
                infoProvider: "",
                infoCost: "",
                selectedProductType: "",
                productType: "",
                id: "",
                new: true,
                is_updated: false,
              },
            ],
        // Co Applicant
        coApplicant:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null &&
              Object.keys(this.props.application_detail.co_applicant).length > 0
              ? true
              : false
            : false,
        coApplicantId:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.id !== undefined &&
                this.props.application_detail.co_applicant.id !== null
                ? this.props.application_detail.co_applicant.id
                : ""
              : ""
            : "",
        coApplicantFirstName:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.first_name !==
                undefined &&
                this.props.application_detail.co_applicant.first_name !== null
                ? this.props.application_detail.co_applicant.first_name
                : ""
              : ""
            : "",
        coApplicantLastName:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.last_name !==
                undefined &&
                this.props.application_detail.co_applicant.last_name !== null
                ? this.props.application_detail.co_applicant.last_name
                : ""
              : ""
            : "",
        coApplicantDateOfBirth: coApplicantDate,
        // this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.dob !== undefined && this.props.application_detail.co_applicant.dob !== null && this.props.application_detail.co_applicant.dob !== '' ? new Date(this.props.application_detail.co_applicant.dob+'T00:00:00') : '' : '' : '',
        coApplicantTelephone:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.telephone !==
                undefined &&
                this.props.application_detail.co_applicant.telephone !== null
                ? this.props.application_detail.co_applicant.telephone.substr(
                  3,
                  this.props.application_detail.co_applicant.telephone.length
                )
                : ""
              : ""
            : "",
        coApplicantAddress:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.address !==
                undefined &&
                this.props.application_detail.co_applicant.address !== null
                ? {
                  label: this.props.application_detail.co_applicant.address,
                  value: {},
                }
                : ""
              : ""
            : "",
        coSalutation:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.salutation !==
                undefined &&
                this.props.application_detail.co_applicant.salutation !== null
                ? this.props.application_detail.co_applicant.salutation
                : ""
              : ""
            : "",
            selectCoSalutation:
            this.props.application_detail !== undefined &&
                this.props.application_detail !== null
                ? this.props.application_detail.co_applicant !== null &&
                  this.props.application_detail.co_applicant !== undefined
                  ? this.props.application_detail.co_applicant.salutation !== undefined && this.props.application_detail.co_applicant.salutation !== null
                    ? this.state.salutations.filter((el) =>
                    (el.value === this.props.application_detail.co_applicant.salutation))?.[0]|| ''
                  : "" :"" : "",

        coGender:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.gender !==
                undefined &&
                this.props.application_detail.co_applicant.gender !== null
                ? this.props.application_detail.co_applicant.gender
                : ""
              : ""
            : "",

        selectCoGender: this.state.genders.find(
          (el) =>
            el.value === this.props.application_detail?.co_applicant?.gender
        ),
        coApplicantAddress:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.address !==
                undefined &&
                this.props.application_detail.co_applicant.address !== null
                ? {
                  label: this.props.application_detail.co_applicant.address,
                  value: {},
                }
                : ""
              : ""
            : "",
        coApplicantStreetAddress:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.street_address !==
                undefined &&
                this.props.application_detail.co_applicant.street_address !==
                null
                ? this.props.application_detail.co_applicant.street_address
                : ""
              : ""
            : "",
        coApplicantStreetAddress2:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.street_address2 !==
                undefined &&
                this.props.application_detail.co_applicant.street_address2 !==
                null
                ? this.props.application_detail.co_applicant.street_address2
                : ""
              : ""
            : "",
        coApplicantLocationName:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.street_address !==
                undefined &&
                this.props.application_detail.co_applicant.street_address !==
                null
                ? this.props.application_detail.co_applicant.street_address
                : ""
              : ""
            : "",
        // coApplicantLocationName: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.address !== undefined && this.props.application_detail.co_applicant.address !== null ? this.props.application_detail.co_applicant.address : '' : '' : '',
        coApplicantCity:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.city !== undefined &&
                this.props.application_detail.co_applicant.city !== null
                ? this.props.application_detail.co_applicant.city
                : ""
              : ""
            : "",
        coApplicantProvince:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.province !==
                undefined &&
                this.props.application_detail.co_applicant.province !== null
                ? this.props.application_detail.co_applicant.province
                : ""
              : ""
            : "",
        selectedCoApplicantProvince:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.province !==
                undefined &&
                this.props.application_detail.co_applicant.province !== null
                ? (this.state.provinces || []).filter((item) => {
                  return (
                    item.value ===
                    this.props.application_detail.co_applicant.province
                  );
                }) !== undefined &&
                  (this.state.provinces || []).filter((item) => {
                    return (
                      item.value ===
                      this.props.application_detail.co_applicant.province
                    );
                  }) !== null &&
                  (this.state.provinces || []).filter((item) => {
                    return (
                      item.value ===
                      this.props.application_detail.co_applicant.province
                    );
                  }).length > 0
                  ? (this.state.provinces || []).filter((item) => {
                    return (
                      item.value ===
                      this.props.application_detail.co_applicant.province
                    );
                  })[0]
                  : ""
                : ""
              : ""
            : "",
        coApplicantPostalCode:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.postal_code !==
                undefined &&
                this.props.application_detail.co_applicant.postal_code !== null
                ? this.props.application_detail.co_applicant.postal_code
                : ""
              : ""
            : "",
        coApplicantCountry:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.country !==
                undefined &&
                this.props.application_detail.co_applicant.country !== null
                ? this.props.application_detail.co_applicant.country
                : ""
              : ""
            : "",
        coApplicantEmploymentStatus:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant
                .employement_status !== undefined &&
                this.props.application_detail.co_applicant
                  .employement_status !== null
                ? this.props.application_detail.co_applicant.employement_status
                : ""
              : ""
            : "",
        coApplicantMaritalStatus:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.marital_status !==
                undefined &&
                this.props.application_detail.co_applicant.marital_status !==
                null
                ? this.props.application_detail.co_applicant.marital_status
                : ""
              : ""
            : "",
        selectCoApplicantMaritalStatus:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.marital_status !==
                undefined &&
                this.props.application_detail.co_applicant.marital_status !==
                null
                ? (this.state.maritalStatues || []).filter((item) => {
                  return (
                    item.value ===
                    this.props.application_detail.co_applicant.marital_status
                  );
                }) !== undefined &&
                  (this.state.maritalStatues || []).filter((item) => {
                    return (
                      item.value ===
                      this.props.application_detail.co_applicant.marital_status
                    );
                  }) !== null &&
                  (this.state.maritalStatues || []).filter((item) => {
                    return (
                      item.value ===
                      this.props.application_detail.co_applicant.marital_status
                    );
                  }).length > 0
                  ? (this.state.maritalStatues || []).filter((item) => {
                    return (
                      item.value ===
                      this.props.application_detail.co_applicant
                        .marital_status
                    );
                  })[0]
                  : ""
                : ""
              : ""
            : "",
        selectCoApplicantEmploymentStatus:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant
                .employement_status !== undefined &&
                this.props.application_detail.co_applicant
                  .employement_status !== null
                ? (this.state.employmentStatuses || []).filter((item) => {
                  return (
                    item.value ===
                    this.props.application_detail.co_applicant
                      .employement_status
                  );
                }) !== undefined &&
                  (this.state.employmentStatuses || []).filter((item) => {
                    return (
                      item.value ===
                      this.props.application_detail.co_applicant
                        .employement_status
                    );
                  }) !== null &&
                  (this.state.employmentStatuses || []).filter((item) => {
                    return (
                      item.value ===
                      this.props.application_detail.co_applicant
                        .employement_status
                    );
                  }).length > 0
                  ? (this.state.employmentStatuses || []).filter((item) => {
                    return (
                      item.value ===
                      this.props.application_detail.co_applicant
                        .employement_status
                    );
                  })[0]
                  : ""
                : ""
              : ""
            : "",
        coApplicantTypeOfEmployment:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant
                .type_of_employment !== undefined &&
                this.props.application_detail.co_applicant
                  .type_of_employment !== null
                ? this.props.application_detail.co_applicant.type_of_employment
                : ""
              : ""
            : "",
        selectedCoApplicantTypeOfEmployment:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant
                .type_of_employment !== undefined &&
                this.props.application_detail.co_applicant
                  .type_of_employment !== null
                ? (this.state.typeOfEmployments || []).filter((item) => {
                  return (
                    item.value.toLowerCase() ===
                    this.props.application_detail.co_applicant.type_of_employment.toLowerCase()
                  );
                }) !== undefined &&
                  (this.state.typeOfEmployments || []).filter((item) => {
                    return (
                      item.value.toLowerCase() ===
                      this.props.application_detail.co_applicant.type_of_employment.toLowerCase()
                    );
                  }) !== null &&
                  (this.state.typeOfEmployments || []).filter((item) => {
                    return (
                      item.value.toLowerCase() ===
                      this.props.application_detail.co_applicant.type_of_employment.toLowerCase()
                    );
                  }).length > 0
                  ? (this.state.typeOfEmployments || []).filter((item) => {
                    return (
                      item.value.toLowerCase() ===
                      this.props.application_detail.co_applicant.type_of_employment.toLowerCase()
                    );
                  })[0]
                  : ""
                : ""
              : ""
            : "",
        coApplicantEmployerName:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.employer_name !==
                undefined &&
                this.props.application_detail.co_applicant.employer_name !==
                null
                ? this.props.application_detail.co_applicant.employer_name
                : ""
              : ""
            : "",
        coApplicantOccupation:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.occupation !==
                undefined &&
                this.props.application_detail.co_applicant.occupation !== null
                ? this.props.application_detail.co_applicant.occupation
                : ""
              : ""
            : "",
        coApplicantEmploymentSince: coApplicantEmploymentSince,
        // this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.employment_since !== undefined && this.props.application_detail.co_applicant.employment_since !== null && this.props.application_detail.co_applicant.employment_since !== '' ? new Date(this.props.application_detail.co_applicant.employment_since+'T00:00:00') : '' : '' : '',
        coApplicantGrossMonthlyIncome:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.gross_income !==
                undefined &&
                this.props.application_detail.co_applicant.gross_income !== null
                ? this.props.application_detail.co_applicant.gross_income
                : ""
              : ""
            : "",
        coApplicantDefaultGrossMonthlyIncome:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.gross_income !==
                undefined &&
                this.props.application_detail.co_applicant.gross_income !== null
                ? this.props.application_detail.co_applicant.gross_income
                : ""
              : ""
            : "",
        coApplicantStatus:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.status !==
                undefined &&
                this.props.application_detail.co_applicant.status !== null
                ? {
                  value: this.props.application_detail.co_applicant.status,
                  label: this.props.application_detail.co_applicant.status,
                }
                : ""
              : ""
            : "",
        coApplicantSelectedStatus:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.status !==
                undefined &&
                this.props.application_detail.co_applicant.status !== null
                ? this.props.application_detail.co_applicant.status
                : ""
              : ""
            : "",
        coApplicantMortgage_amount:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.mortgage_amount !==
                undefined &&
                this.props.application_detail.co_applicant.mortgage_amount !==
                null
                ? this.props.application_detail.co_applicant.mortgage_amount
                : ""
              : ""
            : "",
        coApplicantDuration_address_mn:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant
                .duration_address_mn !== undefined &&
                this.props.application_detail.co_applicant
                  .duration_address_mn !== null
                ? this.props.application_detail.co_applicant.duration_address_mn
                : ""
              : ""
            : "",
        coApplicantDuration_address_yr:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant
                .duration_address_yr !== undefined &&
                this.props.application_detail.co_applicant
                  .duration_address_yr !== null
                ? this.props.application_detail.co_applicant.duration_address_yr
                : ""
              : ""
            : "",
        applicationStatus: this.props.application_detail
          ? this.props.application_detail.application_status
            ? this.props.application_detail.application_status
            : ""
          : "",
        coApplicantSin:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.sin !== undefined &&
                this.props.application_detail.co_applicant.sin !== null
                ? this.props.application_detail.co_applicant.sin
                : ""
              : ""
            : "",
        coApplicantBusniessName:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.business_name !==
                undefined &&
                this.props.application_detail.co_applicant.business_name !==
                null
                ? this.props.application_detail.co_applicant.business_name
                : ""
              : ""
            : "",
        coApplicantTypeOfBusniess:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant.type_of_business !==
                undefined &&
                this.props.application_detail.co_applicant.type_of_business !==
                null
                ? this.props.application_detail.co_applicant.type_of_business
                : ""
              : ""
            : "",
        selectedApplicationStatus: selectedApplicationStatus
          ? selectedApplicationStatus.length > 0
            ? {
              value: selectedApplicationStatus[0].value,
              label: selectedApplicationStatus[0].label,
            }
            : ""
          : "",
        // employer address
        employerStreetAddress: this.props?.application_detail?.employer_address,
        employerCity: this.props?.application_detail?.employer_city,
        employerProvince: this.props?.application_detail?.employer_province,
        employerPhone: this.props?.application_detail?.employer_telephone,
        employerEmail: this.props?.application_detail?.employer_email,

        // co employer address
        coEmployerStreetAddress:
          this.props?.application_detail?.co_applicant?.employer_address,
        coEmployerCity:
          this.props?.application_detail?.co_applicant?.employer_city,
        coEmployerProvince:
          this.props?.application_detail?.co_applicant?.employer_province,
        coEmployerPhone:
          this.props?.application_detail?.co_applicant?.employer_telephone,
        coEmployerEmail:
          this.props?.application_detail?.co_applicant?.employer_email,

        // Required Document
        documents:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.required_documents != undefined &&
              this.props.application_detail.required_documents != null
              ? (this.props.application_detail.required_documents || []).map(
                (item) => {
                  return {
                    id: item.id,
                    name: item.name,
                    fileType: item.file_type,
                    file: item.file,
                    is_uploaded: item.is_uploaded,
                  };
                }
              )
              : []
            : [],
        adminDocumentRequest:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.required_documents != undefined &&
              this.props.application_detail.required_documents != null
              ? this.state.adminDocumentRequest.slice().map((adminDoc) => {
                const exist =
                  this.props.application_detail.required_documents.filter(
                    (uploadedDoc) => uploadedDoc.name === adminDoc.name
                  );
                if (exist != undefined && exist != null && exist.length > 0) {
                  return {
                    ...adminDoc,
                    id:
                      exist != undefined && exist != null && exist.length > 0
                        ? exist[0].id
                        : "",
                    isRequest: true,
                    is_uploaded:
                      exist != undefined && exist != null && exist.length > 0
                        ? exist[0].is_uploaded
                        : false,
                  };
                } else {
                  return {
                    ...adminDoc,
                    isRequest: false,
                  };
                }
              })
              : []
            : [],
        documentsTable: this.props.application_detail
          ? this.props.application_detail.docs
            ? (this.props.application_detail.docs || []).map((item) => {
              //new Condidtion
              return {
                id: item.id,
                name: this.props.application_detail
                  ? this.props.application_detail.required_documents
                    ? (this.props.application_detail.required_documents || [])
                      .filter(
                        (doc) => Number(doc.id) === Number(item.doc_id)
                      )
                      .map((doc) => {
                        return doc.name;
                      })[0]
                      ? (
                        this.props.application_detail.required_documents ||
                        []
                      )
                        .filter(
                          (doc) => Number(doc.id) === Number(item.doc_id)
                        )
                        .map((doc) => {
                          return doc.name;
                        })[0]
                      : this.state.unRequestDocName
                    : ""
                  : "",
                fileType: item.file_type,
                file: item.file,
                is_uploaded: true,
                doc_id: item.doc_id,
              };
            })
            : []
          : [],
        // documentsTable: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.required_documents != undefined && this.props.application_detail.required_documents != null ? (this.props.application_detail.required_documents || []).map(item => {
        //     return {
        //         id: item.id,
        //         name: item.name,
        //         fileType: item.file_type,
        //         file: item.file,
        //         is_uploaded: item.is_uploaded
        //     }
        // }) : [] : [],
        //States
        approvedAmount:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.approved_amount != undefined &&
              this.props.application_detail.approved_amount != null
              ? this.props.application_detail.approved_amount
              : ""
            : "",
        downPayment:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.down_payment != undefined &&
              this.props.application_detail.down_payment != null
              ? this.props.application_detail.down_payment
              : ""
            : "",
        financingAmount:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.financing_amount != undefined &&
              this.props.application_detail.financing_amount != null
              ? this.props.application_detail.financing_amount
              : ""
            : "",
        // applicantEmail: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.user != undefined && this.props.application_detail.user != null && Object.keys(this.props.application_detail.user).length > 0 ? this.props.application_detail.user.email !== undefined && this.props.application_detail.user !== null ? this.props.application_detail.user.email : '' : '' : '',
        applicantEmail: this.props.application_detail.applicant_email_by_dealer,
          // this.props.application_detail != undefined &&
          //   this.props.application_detail != null
          //   ? this.props.application_detail.user != undefined &&
          //     this.props.application_detail.user != null &&
          //     Object.keys(this.props.application_detail.user).length > 0
          //     ? Number(this.props.application_detail.user.id) === -99
          //       ? this.props.application_detail.email_address
          //         ? this.props.application_detail.email_address
          //         : ""
          //       : this.props.application_detail.user.email !== undefined &&
          //         this.props.application_detail.user !== null
          //         ? this.props.application_detail.user.email
          //         : ""
          //     : ""
          //   : "",
        amortization:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.amortization != undefined &&
              this.props.application_detail.amortization != null
              ? Number(this.props.application_detail.amortization)
              : 120
            : 120,
        selectedAmortization:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.amortization != undefined &&
              this.props.application_detail.amortization != null
              ? {
                label: `${this.props.application_detail.amortization} Months`,
                value: Number(this.props.application_detail.amortization),
              }
              : { label: "120 Months", value: 120 }
            : { label: "120 Months", value: 120 },
        interestRate:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.interest_rate != undefined &&
              this.props.application_detail.interest_rate != null
              ? Number(this.props.application_detail.interest_rate)
              : 1
            : 1,
        created_at:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.created_at != undefined &&
              this.props.application_detail.created_at != null
              ? this.props.application_detail.created_at
              : ""
            : "",
        loan_amount:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.loan_amount != undefined &&
              this.props.application_detail.loan_amount != null
              ? this.props.application_detail.loan_amount
              : defaultLoanAmount
            : defaultLoanAmount,
        // Loan Doc
        loanDoc:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.loan_document != undefined &&
              this.props.application_detail.loan_document != null
              ? this.props.application_detail.loan_document
              : ""
            : "",
        loanDocName:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.loan_document != undefined &&
              this.props.application_detail.loan_document != null
              ? this.props.application_detail.loan_document.split("/").pop()
              : ""
            : "",
        // Income Verifcation Doc
        incomeVerification: this.props.application_detail
          ? this.props.application_detail.income_verification
            ? this.props.application_detail.income_file
              ? this.props.application_detail.income_verification
              : "Download File"
            : ""
          : "",
        income_verification_json: this.props.application_detail
          ? this.props.application_detail.income_verification
            ? this.props.application_detail.income_verification
            : ""
          : "",
        income_statement: this.props.application_detail
          ? this.props.application_detail.income_statement
            ? this.props.application_detail.income_statement
            : ""
          : "",
        license: this.props.application_detail
          ? this.props.application_detail.license
            ? this.props.application_detail.license
            : ""
          : "",
        income_file: this.props.application_detail
          ? this.props.application_detail.income_file
            ? this.props.application_detail.income_file
            : false
          : false,
        incomeVerificationName: this.props.application_detail
          ? this.props.application_detail.income_verification
            ? this.props.application_detail.income_file
              ? this.props.application_detail.income_verification
                .split("/")
                .pop()
              : "Download File"
            : ""
          : "",
        incomeVerificationStatmentName: this.props.application_detail
          ? this.props.application_detail.income_statement
            ? this.props.application_detail.income_statement.length > 0
            : false
          : false,
        // previous co Applicant Address
        coApplicantPreviousStreetAddress:
          this.props.application_detail?.co_applicant
            ?.previous_applicant_address?.street_address,
        coApplicantPreviousStreetAddress2:
          this.props.application_detail?.co_applicant
            ?.previous_applicant_address?.street_address_2,
        coPreviousCity:
          this.props.application_detail?.co_applicant
            ?.previous_applicant_address?.city,
        coPreviousProvince:
          this.props.application_detail?.co_applicant
            ?.previous_applicant_address?.province,
        selectedPreviousCoApplicantProvince: this.state.provinces.find(
          (el) =>
            el.value ===
            this.props.application_detail?.co_applicant
              ?.previous_applicant_address?.province
        ),
        coPreviousPostalCode:
          this.props.application_detail?.co_applicant
            ?.previous_applicant_address?.postal_code,
        coDurationAtPreviousAddress:
          this.props.application_detail?.co_applicant
            ?.previous_applicant_address?.duration_address_yr,
        coDurationAtPreviousAddressMonth:
          this.props.application_detail?.co_applicant
            ?.previous_applicant_address?.duration_address_mn,
        coPreviousStatus:
          this.props.application_detail?.co_applicant
            ?.previous_applicant_address?.status,
        coApplicantPreviousStatus: this.state.statuses.find(
          (el) =>
            el.value ===
            this.props.application_detail?.co_applicant
              ?.previous_applicant_address?.status
        ),
        coPreviousMortgageAmount:
          this.props.application_detail?.co_applicant
            ?.previous_applicant_address?.mortgage_amount,
        // previous co employer details
        previousCoEmployerName:
          this.props.application_detail?.co_applicant?.previous_employer_address
            ?.employer_name,
        previousCoEmployerStreetAddress:
          this.props.application_detail?.co_applicant?.previous_employer_address
            ?.employer_address,
        previousCoEmployerCity:
          this.props.application_detail?.co_applicant?.previous_employer_address
            ?.employer_city,
        previousCoEmployerProvince:
          this.props.application_detail?.co_applicant?.previous_employer_address
            ?.employer_province,
        previousCoEmployerPhone:
          this.props.application_detail?.co_applicant?.previous_employer_address
            ?.employer_telephone,
        previousCoEmployerEmail:
          this.props.application_detail?.co_applicant?.previous_employer_address
            ?.employer_email,
        previousCoEmploymentStatus:
          this.props.application_detail?.co_applicant?.previous_employer_address
            ?.employement_status,
        selectPreviousCoApplicantEmploymentStatus:
          this.state.employmentStatuses.find(
            (el) =>
              el.value ===
              this.props.application_detail?.co_applicant
                ?.previous_employer_address?.employement_status
          ),
        previousCoTypeOfEmployment:
          this.props.application_detail?.co_applicant?.previous_employer_address
            ?.type_of_employment,
        selectedPreviousCoApplicantTypeOfEmployment:
          this.state.typeOfEmployments.find(
            (el) =>
              el.value ===
              this.props.application_detail?.co_applicant
                ?.previous_employer_address?.type_of_employment
          ),
        previousCoEmploymentSinceYear:
          this.props.application_detail?.co_applicant?.previous_employer_address
            ?.employment_since_year,
        previousCoEmploymentSinceMonth:
          this.props.application_detail?.co_applicant?.previous_employer_address
            ?.employment_since_month,
        previousCoGrossIncome:
          this.props.application_detail?.co_applicant?.previous_employer_address
            ?.gross_income,
        previousCoEmployeeBusinessName:
          this.props.application_detail?.co_applicant?.previous_employer_address
            ?.business_name,
        previousCoEmployeeTypeOfBusiness:
          this.props.application_detail?.co_applicant?.previous_employer_address
            ?.type_of_business,
        previousCoOccupation:
          this.props.application_detail?.co_applicant?.previous_employer_address
            ?.occupation,
        coEmploymentSinceYear:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant
                .employment_since_year !== undefined &&
                this.props.application_detail.co_applicant
                  .employment_since_year !== null
                ? this.props.application_detail.co_applicant
                  .employment_since_year
                : ""
              : ""
            : "",
        coEmploymentSinceMonth:
          this.props.application_detail !== undefined &&
            this.props.application_detail !== null
            ? this.props.application_detail.co_applicant !== null &&
              this.props.application_detail.co_applicant !== null
              ? this.props.application_detail.co_applicant
                .employment_since_month !== undefined &&
                this.props.application_detail.co_applicant
                  .employment_since_month !== null
                ? this.props.application_detail.co_applicant
                  .employment_since_month
                : ""
              : ""
            : "",

        // this.props.application_detail
        //   ? this.props.application_detail.income_verification &&
        //     this.props.application_detail.income_file
        //     ? "Download File"
        //     : this.props.application_detail.income_verification.split("/").pop()
        //   : "",
        postApp: this.state.postApp.slice().map((item) => {
          if (item.id === 1) {
            return {
              ...item,
              disbaled: false,
              done:
                (this.props.application_detail != undefined &&
                  this.props.application_detail != null
                  ? this.props.application_detail.personal_complete !=
                    undefined &&
                    this.props.application_detail.personal_complete != null
                    ? this.props.application_detail.personal_complete
                    : false
                  : false) &&
                (this.props.application_detail != undefined &&
                  this.props.application_detail != null
                  ? this.props.application_detail.employement_complete !=
                    undefined &&
                    this.props.application_detail.employement_complete != null
                    ? this.props.application_detail.employement_complete
                    : false
                  : false),
              pending:
                this.props?.application_detail?.personal_complete == true
                  ? this.props?.application_detail?.employement_complete == true
                    ? false
                    : true
                  : true,
            };
          }
          if (item.id === 2) {
            return {
              ...item,
              disbaled: this.props.application_detail
                ? this.props.application_detail.co_applicant &&
                  Object.keys(this.props.application_detail.co_applicant)
                    .length > 0
                  ? false
                  : true
                : true,
              done:
                (this.props.application_detail != undefined &&
                  this.props.application_detail != null
                  ? this.props.application_detail.co_personal_complete !=
                    undefined &&
                    this.props.application_detail.co_personal_complete != null
                    ? this.props.application_detail.co_personal_complete
                    : false
                  : false) &&
                (this.props.application_detail != undefined &&
                  this.props.application_detail != null
                  ? this.props.application_detail.co_employement_complete !=
                    undefined &&
                    this.props.application_detail.co_employement_complete !=
                    null
                    ? this.props.application_detail.co_employement_complete
                    : false
                  : false),
              pending: this.props?.application_detail?.co_applicant
                ? Object.keys(this.props?.application_detail?.co_applicant)
                  .length > 0
                  ? true
                  : false
                : false,
            };
          }
          if (item.id === 3) {
            return {
              ...item,
              disbaled: false,
              done:
                (this.props.application_detail != undefined &&
                  this.props.application_detail != null
                  ? this.props.application_detail.seller_complete !=
                    undefined &&
                    this.props.application_detail.seller_complete != null
                    ? this.props.application_detail.seller_complete
                    : false
                  : false) &&
                (this.props.application_detail != undefined &&
                  this.props.application_detail != null
                  ? this.props.application_detail.assets_complete !=
                    undefined &&
                    this.props.application_detail.assets_complete != null
                    ? this.props.application_detail.assets_complete
                    : false
                  : false) &&
                (this.props.application_detail != undefined &&
                  this.props.application_detail != null
                  ? this.props.application_detail.addtional_complete !=
                    undefined &&
                    this.props.application_detail.addtional_complete != null
                    ? this.props.application_detail.addtional_complete
                    : false
                  : false),
              pending:
                this.props?.application_detail?.vehicle?.length > 0 ||
                  this.props?.application_detail?.seller != null ||
                  this.props?.application_detail?.additional_item.length > 0
                  ? true
                  : false,
            };
          }
          if (item.id === 4) {
            return {
              ...item,
              disbaled: false,
              done:
                this.props.application_detail != undefined &&
                  this.props.application_detail != null
                  ? this.props.application_detail.verify_identity_complete !=
                    undefined &&
                    this.props.application_detail.verify_identity_complete !=
                    null
                    ? this.props.application_detail.verify_identity_complete
                    : false
                  : false,
              pending:
                this.props.application_detail != undefined &&
                  this.props.application_detail != null
                  ? this.props.application_detail.license != undefined &&
                    this.props.application_detail.license != null &&
                    (this.props.application_detail.license || []).length > 0
                    ? true
                    : this.props.application_detail.jumio_status != "DONE"
                      ? false
                      : true
                  : false,
            };
          }
          if (item.id === 5) {
            return {
              ...item,
              disbaled: false,
              done:
                this.props.application_detail != undefined &&
                  this.props.application_detail != null
                  ? this.props.application_detail
                    .income_verification_complete != undefined &&
                    this.props.application_detail
                      .income_verification_complete != null
                    ? this.props.application_detail.income_verification_complete
                    : false
                  : false,
              pending:
                this.props.application_detail != undefined &&
                  this.props.application_detail != null
                  ? this.props.application_detail.income_statement !=
                    undefined &&
                    this.props.application_detail.income_statement != null &&
                    (this.props.application_detail.income_statement || [])
                      .length > 0
                    ? true
                    : this.props.application_detail.income_verification
                      ? true
                      : false
                  : false,
            };
          }
          if (item.id === 6) {
            return {
              ...item,
              disbaled: false,
              done:
                this.props.application_detail != undefined &&
                  this.props.application_detail != null
                  ? this.props.application_detail.loan_payment_complete !=
                    undefined &&
                    this.props.application_detail.loan_payment_complete != null
                    ? this.props.application_detail.loan_payment_complete
                    : false
                  : false,
            };
          }
          if (item.id === 7) {
            return {
              ...item,
              disbaled: false,
              done:
                this.props.application_detail != undefined &&
                  this.props.application_detail != null
                  ? this.props.application_detail.loan_document_complete !=
                    undefined &&
                    this.props.application_detail.loan_document_complete != null
                    ? this.props.application_detail.loan_document_complete
                    : false
                  : false,
            };
          }
        }),
        // Complete Tags
        personal_complete:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.personal_complete != undefined &&
              this.props.application_detail.personal_complete != null
              ? this.props.application_detail.personal_complete
              : false
            : false,
        employement_complete:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.employement_complete != undefined &&
              this.props.application_detail.employement_complete != null
              ? this.props.application_detail.employement_complete
              : false
            : false,
        co_personal_complete:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.co_personal_complete != undefined &&
              this.props.application_detail.co_personal_complete != null
              ? this.props.application_detail.co_personal_complete
              : false
            : false,
        co_employement_complete:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.co_employement_complete !=
              undefined &&
              this.props.application_detail.co_employement_complete != null
              ? this.props.application_detail.co_employement_complete
              : false
            : false,
        assets_complete:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.assets_complete != undefined &&
              this.props.application_detail.assets_complete != null
              ? this.props.application_detail.assets_complete
              : false
            : false,
        seller_complete:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.seller_complete != undefined &&
              this.props.application_detail.seller_complete != null
              ? this.props.application_detail.seller_complete
              : false
            : false,
        addtional_complete:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.addtional_complete != undefined &&
              this.props.application_detail.addtional_complete != null
              ? this.props.application_detail.addtional_complete
              : false
            : false,
        verify_identity_complete:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.verify_identity_complete !=
              undefined &&
              this.props.application_detail.verify_identity_complete != null
              ? this.props.application_detail.verify_identity_complete
              : false
            : false,
        income_verification_complete:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.income_verification_complete !=
              undefined &&
              this.props.application_detail.income_verification_complete != null
              ? this.props.application_detail.income_verification_complete
              : false
            : false,
        loan_payment_complete:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.loan_payment_complete !=
              undefined &&
              this.props.application_detail.loan_payment_complete != null
              ? this.props.application_detail.loan_payment_complete
              : false
            : false,
        loan_document_complete:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.loan_document_complete !=
              undefined &&
              this.props.application_detail.loan_document_complete != null
              ? this.props.application_detail.loan_document_complete
              : false
            : false,
        upload_doc_complete:
          this.props.application_detail != undefined &&
            this.props.application_detail != null
            ? this.props.application_detail.upload_doc_complete != undefined &&
              this.props.application_detail.upload_doc_complete != null
              ? this.props.application_detail.upload_doc_complete
              : false
            : false,
        selectedAgent: this.props.application_detail
          ? this.props.application_detail.agent
            ? {
              value: this.props.application_detail.agent.id,
              label: this.props.application_detail.agent.full_name,
            }
            : ""
          : "",
        assignAgent: this.props.application_detail
          ? this.props.application_detail.agent
            ? this.props.application_detail.agent.id
              ? this.props.application_detail.agent.id
              : ""
            : ""
          : "",
        firstTypeOfVehicle: firstTypeOfVehicle,
        jumioReference: this.props.application_detail
          ? this.props.application_detail.jumio_reference
            ? this.props.application_detail.jumio_reference
            : ""
          : "",
        jumio_status: this.props.application_detail
          ? this.props.application_detail.jumio_status
            ? this.props.application_detail.jumio_status
            : ""
          : "",
        jumio_images: this.props.application_detail
          ? this.props.application_detail.jumio_images
            ? [this.props.application_detail.jumio_images]
            : []
          : [],
        jumio_data: this.props.application_detail
          ? this.props.application_detail.jumio_data
            ? [this.props.application_detail.jumio_data]
            : []
          : [],
        photo: this.props.application_detail
          ? this.props.application_detail.user
            ? this.props.application_detail.user.photo
              ? this.props.application_detail.user.photo
              : ""
            : ""
          : "",
      });
    }
    if (
      prevState.step !== this.state.step &&
      this.state.step > this.state.lastStep
    ) {
      this.setState({
        ...this.state,
        lastStep: this.state.step,
      });
      localStorage.setItem("lastStepPostAppEditAdmin", this.state.step);
    }

    if (
      prevProps.deleteAddtionalInfo !== this.props.deleteAddtionalInfo &&
      this.props.deleteAddtionalInfo !== undefined
    ) {
      this.setState({
        ...this.state,
        addtionalInformation: this.state.addtionalInformation.filter(
          (item, index) => {
            return Number(item.id) !== Number(this.state.addtionalDeletedId);
          }
        ),
      });
    }
    if (
      prevProps.deleteUploadedDoc !== this.props.deleteUploadedDoc &&
      this.props.deleteUploadedDoc !== undefined
    ) {
      this.setState({
        ...this.state,
        documents: this.state.documents.slice().map((item, fileIndex) => {
          if (Number(item.id) === Number(this.state.deletedDocId)) {
            return {
              ...item,
              file: null,
              is_uploaded: false,
            };
          }
          return item;
        }),
        adminDocumentRequest: this.state.adminDocumentRequest
          .slice()
          .map((item) => {
            if (Number(item.id) === Number(this.state.deletedDocId)) {
              return {
                ...item,
                is_uploaded: false,
                isRequest: false,
                id: "",
              };
            }
            return item;
          }),
        documentsTable: this.state.documentsTable.filter((item, fileIndex) => {
          return Number(item.id) !== Number(this.state.deletedDocId);
        }),
        // documentsTable: this.state.documentsTable.slice().map((item, fileIndex) => {
        //     if (Number(item.id) === Number(this.state.deletedDocId)) {
        //         return {
        //             ...item,
        //             file: null,
        //             fileType: '',
        //             is_uploaded: false
        //         }
        //     }
        //     return item
        // }),
        deletedDocId: "",
      });
    }
    if (
      prevProps.deleteVehicleDetail !== this.props.deleteVehicleDetail &&
      this.props.deleteVehicleDetail !== undefined
    ) {
      this.setState({
        ...this.state,
        assetsDetails: this.state.assetsDetails.filter((item, index) => {
          return Number(item.id) !== Number(this.state.assetDeletedId);
        }),
        assetsDetailsForm: this.state.assetsDetailsForm.filter(
          (item, index) => {
            return Number(item.id) !== Number(this.state.assetDeletedId);
          }
        ),
        assetDeletedId: "",
      });
    }
    if (
      prevProps.agent_listing !== this.props.agent_listing &&
      this.props.agent_listing !== undefined
    ) {
      this.setState({
        ...this.state,
        allAgents: (this.props.agent_listing || []).filter(item=> ((item.aud_user_id !== undefined && item.aud_user_id !== null && item.aud_user_id.length > 0) && +item.user_type === 5)).map((item) => {
              return {
                value:
                  item.aud_user_id !== undefined &&
                    item.aud_user_id !== null &&
                    item.aud_user_id.length > 0
                    ? item.aud_user_id[0].user_id || ""
                    : "",
                label:
                  item.aud_user_id !== undefined &&
                    item.aud_user_id !== null &&
                    item.aud_user_id.length > 0
                    ? item.aud_user_id[0].name || ""
                    : "",
              };
        }),
      });
    }
    if (
      prevState.amortization !== this.state.amortization &&
      this.state.amortization !== undefined
    ) {
      let totalAmount =
        this.state.loan_amount !== undefined && this.state.loan_amount !== ""
          ? this.state.loan_amount
          : 0;
      totalAmount = totalAmount
        .toString()
        .split(",")
        .join("")
        .split("$")
        .join("");
      var loan = Number(totalAmount).toFixed(2);
      var month = Number(this.state.amortization);
      let interestRate =
        this.state.interestRate !== undefined && this.state.interestRate !== ""
          ? this.state.interestRate
          : 1;
      interestRate = this.state.interestRate
        .toString()
        .split(",")
        .join("")
        .split("%")
        .join("");
      var int = Number(interestRate).toFixed(2);
      var down =
        this.state.downPayment !== undefined && this.state.downPayment !== ""
          ? this.state.downPayment
          : 0;
      down = down.toString().split(",").join("").split("$").join("");
      down = Number(down).toFixed(2);
      var amount = parseInt(loan);
      var months = parseInt(month);
      var down = parseInt(down);
      var annInterest = parseFloat(int) / 100;
      const paymentType =
        this.state.paymentType === "weekly"
          ? 52
          : this.state.paymentType === "bi-weekly"
            ? 26
            : this.state.paymentType === "monthly"
              ? 12
              : 12;
      var monInt = annInterest / paymentType;
      const loanamount = loan;
      // const eff = 5.5 / 100
      months = months / 12;
      const eff = annInterest / 100;
      const i = annInterest / 100 / paymentType;
      const n = months * paymentType;
      const d = (Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n));
      const periodicpayment = loanamount / d;

      var calculation = (
        (monInt + monInt / (Math.pow(1 + monInt, months) - 1)) *
        (amount - (down || 0))
      ).toFixed(2);
      this.setState({
        ...this.state,
        // monthlyAmount: totalAmount == 0 ? 0 : calculation == 0 ? 0 : calculation,
        monthlyAmount:
          totalAmount == 0 ? 0 : periodicpayment == 0 ? 0 : periodicpayment,
      });
    }
    if (
      prevState.paymentType !== this.state.paymentType &&
      this.state.paymentType !== undefined
    ) {
      let totalAmount =
        this.state.loan_amount !== undefined && this.state.loan_amount !== ""
          ? this.state.loan_amount
          : 0;
      totalAmount = totalAmount
        .toString()
        .split(",")
        .join("")
        .split("$")
        .join("");
      var loan = Number(totalAmount).toFixed(2);
      var month = Number(this.state.amortization);
      let interestRate =
        this.state.interestRate !== undefined && this.state.interestRate !== ""
          ? this.state.interestRate
          : 1;
      interestRate = this.state.interestRate
        .toString()
        .split(",")
        .join("")
        .split("%")
        .join("");
      var int = Number(interestRate).toFixed(2);
      var down =
        this.state.downPayment !== undefined && this.state.downPayment !== ""
          ? this.state.downPayment
          : 0;
      down = down.toString().split(",").join("").split("$").join("");
      down = Number(down).toFixed(2);
      var amount = parseInt(loan);
      var months = parseInt(month);
      down = parseInt(down);
      var annInterest = parseFloat(int) / 100;
      console.log(
        totalAmount,
        month,
        interestRate,
        down,
        "totalAmount,month, interestRate, down"
      );
      const paymentType =
        this.state.paymentType === "weekly"
          ? 52
          : this.state.paymentType === "bi-weekly"
            ? 26
            : this.state.paymentType === "monthly"
              ? 12
              : 12;
      var monInt = annInterest / paymentType;
      const loanamount = loan;
      months = months / 12;
      const i = annInterest / 100 / paymentType;
      const n = months * paymentType;
      const d = (Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n));
      const periodicpayment = loanamount / d;
      this.setState({
        ...this.state,
        monthlyAmount:
          totalAmount == 0 ? 0 : periodicpayment == 0 ? 0 : periodicpayment,
      });
    }
    if (
      prevProps.stock_detail !== this.props.stock_detail &&
      this.props.stock_detail &&
      this.props.stock_detail.length > 0
    ) {
      let assetsDetails = this.state.assetsDetails.slice();
      let assetsDetailsForm = this.state.assetsDetailsForm.slice();
      this.props.stock_detail.map((item) => {
        assetsDetails = assetsDetails.map((asst, index) => {
          if (Number(index) === Number(this.state.stockIndex)) {
            return {
              ...asst,
              selectedVehicle: {
                value: item.category ? item.category.id : "",
                label: item.category ? item.category.name : "",
              },
              vehicleType: item.category ? item.category.id : "",
              make: item.make ? item.make.make_name : "",
              model: item.model ? item.model.model_make : "",
              // trim: item.trim ? item.trim.v_trim : '',
              trim: item.trim ? item.trim : "",
              price: item.price,
              kilometer: item.kilometer,
              vin: item.vin,
              year: item.year,
              selectedYear: { value: item.year, label: item.year },
              condition: item.v_condition,
              selectedCondition: {
                value: item.v_condition,
                label: item.v_condition,
              },
            };
          }
          return asst;
        });
      });
      this.props.stock_detail.map((item) => {
        assetsDetailsForm = assetsDetailsForm.map((asst, index) => {
          if (Number(index) === Number(this.state.stockIndex)) {
            return {
              ...asst,
              selectedVehicle: {
                value: item.category ? item.category.id : "",
                label: item.category ? item.category.name : "",
              },
              vehicleType: item.category ? item.category.id : "",
              make: item.make ? item.make.make_name : "",
              model: item.model ? item.model.model_make : "",
              // trim: item.trim ? item.trim.v_trim : '',
              trim: item.trim ? item.trim : "",
              price: item.price,
              kilometer: item.kilometer,
              vin: item.vin,
              year: item.year,
              selectedYear: { value: item.year, label: item.year },
              condition: item.v_condition,
              selectedCondition: {
                value: item.v_condition,
                label: item.v_condition,
              },
            };
          }
          return asst;
        });
      });
      this.setState({
        ...this.state,
        assetsDetails,
        assetsDetailsForm,
      });
    }
    if (prevProps.co_applicant_delete !== this.props.co_applicant_delete) {
      this.setState({
        ...this.state,
        coApplicant: false,
        coApplicantId: "",
        coApplicantFirstName: "",
        coApplicantLastName: "",
        coApplicantDateOfBirth: "",
        coApplicantTelephone: "",
        coApplicantAddress: "",
        coApplicantStreetAddress: "",
        coApplicantLocationName: "",
        coApplicantCity: "",
        coApplicantProvince: "",
        selectedCoApplicantProvince: "",
        coApplicantPostalCode: "",
        coApplicantCountry: "",
        coApplicantEmploymentStatus: "",
        selectCoApplicantEmploymentStatus: "",
        coApplicantTypeOfEmployment: "",
        selectedCoApplicantTypeOfEmployment: "",
        coApplicantEmployerName: "",
        coApplicantOccupation: "",
        coApplicantEmploymentSince: "",
        coApplicantGrossMonthlyIncome: 0,
        coApplicantDefaultGrossMonthlyIncome: 0,
      });
      history.push(`${this.state.url}/applicant-detail`);
    }
    if (
      prevProps.personal_complete_redux !== this.props.personal_complete_redux
    ) {
      this.setState({
        ...this.state,
        postApp: this.state.postApp.slice().map((item) => {
          if (item.id === 1) {
            return {
              ...item,
              done:
                (this.props.personal_complete_redux
                  ? this.props.personal_complete_redux
                  : false) &&
                (this.props.employement_complete_redux
                  ? this.props.employement_complete_redux
                  : false),
            };
          }
          return item;
        }),
      });
    }
    if (
      prevProps.employement_complete_redux !==
      this.props.employement_complete_redux
    ) {
      this.setState({
        ...this.state,
        postApp: this.state.postApp.slice().map((item) => {
          if (item.id === 1) {
            return {
              ...item,
              done:
                (this.props.personal_complete_redux
                  ? this.props.personal_complete_redux
                  : false) &&
                (this.props.employement_complete_redux
                  ? this.props.employement_complete_redux
                  : false),
            };
          }
          return item;
        }),
      });
    }
    if (
      prevProps.co_personal_complete_redux !==
      this.props.co_personal_complete_redux
    ) {
      this.setState({
        ...this.state,
        postApp: this.state.postApp.slice().map((item) => {
          if (item.id === 2) {
            return {
              ...item,
              done:
                (this.props.co_personal_complete_redux
                  ? this.props.co_personal_complete_redux
                  : false) &&
                (this.props.co_employement_complete_redux
                  ? this.props.co_employement_complete_redux
                  : false),
            };
          }
          return item;
        }),
      });
    }
    if (
      prevProps.co_employement_complete_redux !==
      this.props.co_employement_complete_redux
    ) {
      this.setState({
        ...this.state,
        postApp: this.state.postApp.slice().map((item) => {
          if (item.id === 2) {
            return {
              ...item,
              done:
                (this.props.co_personal_complete_redux
                  ? this.props.co_personal_complete_redux
                  : false) &&
                (this.props.co_employement_complete_redux
                  ? this.props.co_employement_complete_redux
                  : false),
            };
          }
          return item;
        }),
      });
    }
    if (prevProps.assets_complete_redux !== this.props.assets_complete_redux) {
      this.setState({
        ...this.state,
        postApp: this.state.postApp.slice().map((item) => {
          if (item.id === 3) {
            return {
              ...item,
              done:
                (this.props.assets_complete_redux
                  ? this.props.assets_complete_redux
                  : false) &&
                (this.props.seller_complete_redux
                  ? this.props.seller_complete_redux
                  : false) &&
                (this.props.addtional_complete_redux
                  ? this.props.addtional_complete_redux
                  : false),
            };
          }
          return item;
        }),
      });
    }
    if (prevProps.seller_complete_redux !== this.props.seller_complete_redux) {
      this.setState({
        ...this.state,
        postApp: this.state.postApp.slice().map((item) => {
          if (item.id === 3) {
            return {
              ...item,
              done:
                (this.props.assets_complete_redux
                  ? this.props.assets_complete_redux
                  : false) &&
                (this.props.seller_complete_redux
                  ? this.props.seller_complete_redux
                  : false) &&
                (this.props.addtional_complete_redux
                  ? this.props.addtional_complete_redux
                  : false),
            };
          }
          return item;
        }),
      });
    }
    if (
      prevProps.addtional_complete_redux !== this.props.addtional_complete_redux
    ) {
      this.setState({
        ...this.state,
        postApp: this.state.postApp.slice().map((item) => {
          if (item.id === 3) {
            return {
              ...item,
              done:
                (this.props.assets_complete_redux
                  ? this.props.assets_complete_redux
                  : false) &&
                (this.props.seller_complete_redux
                  ? this.props.seller_complete_redux
                  : false) &&
                (this.props.addtional_complete_redux
                  ? this.props.addtional_complete_redux
                  : false),
            };
          }
          return item;
        }),
      });
    }
    if (
      prevProps.verify_identity_complete_redux !==
      this.props.verify_identity_complete_redux
    ) {
      this.setState({
        ...this.state,
        postApp: this.state.postApp.slice().map((item) => {
          if (item.id === 4) {
            return {
              ...item,
              done: this.props.verify_identity_complete_redux
                ? this.props.verify_identity_complete_redux
                : false,
            };
          }
          return item;
        }),
      });
    }
    if (
      prevProps.income_verification_complete_redux !==
      this.props.income_verification_complete_redux
    ) {
      this.setState({
        ...this.state,
        postApp: this.state.postApp.slice().map((item) => {
          if (item.id === 5) {
            return {
              ...item,
              done: this.props.income_verification_complete_redux
                ? this.props.income_verification_complete_redux
                : false,
            };
          }
          return item;
        }),
      });
    }
    if (
      prevProps.loan_payment_complete_redux !==
      this.props.loan_payment_complete_redux
    ) {
      this.setState({
        ...this.state,
        postApp: this.state.postApp.slice().map((item) => {
          if (item.id === 6) {
            return {
              ...item,
              done: this.props.loan_payment_complete_redux
                ? this.props.loan_payment_complete_redux
                : false,
            };
          }
          return item;
        }),
      });
    }
    if (
      prevProps.loan_document_complete_redux !==
      this.props.loan_document_complete_redux
    ) {
      this.setState({
        ...this.state,
        postApp: this.state.postApp.slice().map((item) => {
          if (item.id === 7) {
            return {
              ...item,
              done: this.props.loan_document_complete_redux
                ? this.props.loan_document_complete_redux
                : false,
            };
          }
          return item;
        }),
      });
    }
    if (
      prevState.selectApplicationStatus !==
      this.state.selectApplicationStatus &&
      this.state.selectApplicationStatus
    ) {
      let data = {};
      if (Number(this.state.selectApplicationStatus) === 4) {
        data = {
          id: this.state.buyerAppId,
          application_status: this.state.applicationStatus,
          decline_reason: this.state.declineReason,
          additional_item: [],
        };
      } else {
        data = {
          id: this.state.buyerAppId,
          application_status: this.state.applicationStatus,
          additional_item: [],
        };
      }

      this.props.update_application_detail_status(data);
    }
    if (
      prevProps.loan_delete !== this.props.loan_delete &&
      this.props.loan_delete === true
    ) {
      this.setState({
        ...this.state,
        loanDoc: null,
        loanDocName: "",
      });
    }
  }
  removeCoApplicant = (coApplicantId) => {
    localStorage.removeItem("coApplicantEditPostAppAdmin");
    if (coApplicantId) {
      this.props.delete_coApplicant(coApplicantId);
    }
    this.setState({
      ...this.state,
      step: 1,
      coApplicant: false,
      postApp: this.state.postApp.slice().map((item) => {
        if (Number(item.id) === Number(1)) {
          return {
            ...item,
            active: true,
            disbaled: false,
          };
        }
        return {
          ...item,
          active: item.id === 2 ? false : item.active,
          // disbaled: true
          disbaled: item.id === 2 ? true : false,
        };
      }),
    });
    if (!coApplicantId) {
      history.push(`${this.state.url}/applicant-detail`);
    }
  };

  dowload_files = (filePath) => {
    console.log(filePath, "File Pathz");
    const path = API_URL + filePath;
    console.log(path, "path");
    this.props.downloadFile(path);
  };

  changePaymentType = (name) => {
    this.setState({
      ...this.state,
      paymentType: name,
    });
  };
  handleChangeSlider = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  removeLocalStorage = () => {
    localStorage.removeItem("lastStepPostAppEditAdmin");
    localStorage.removeItem("coApplicantEditPostAppAdmin");
  };
  onClickChangeStep = (prev, step) => {
    if (step === 2) {
      localStorage.setItem("coApplicantEditPostAppAdmin", true);
      this.setState({
        ...this.state,
        step: step,
        coApplicant: true,
        postApp: this.state.postApp.slice().map((item) => {
          if (Number(item.id) === Number(prev)) {
            return {
              ...item,
              active: false,
              disbaled: false,
            };
          }
          if (Number(item.id) === Number(step)) {
            return {
              ...item,
              active: true,
              disbaled: false,
            };
          }
          // return item
          return {
            ...item,
            active: false,
          };
        }),
      });
    } else {
      this.setState({
        ...this.state,
        step: step,
        postApp: this.state.postApp.slice().map((item) => {
          if (Number(item.id) === Number(prev)) {
            return {
              ...item,
              active: false,
              disbaled: false,
            };
          }
          if (Number(item.id) === Number(step)) {
            return {
              ...item,
              active: item.id !== 2 ? true : this.state.coApplicant,
              disbaled: false,
            };
          }
          // return item
          return {
            ...item,
            active: false,
          };
        }),
      });
    }
  };
  onClickChangeNav = (step) => {
    if (step === 2) {
      localStorage.setItem("coApplicantEditPostApp", true);
      this.setState({
        ...this.state,
        step: step,
        coApplicant: true,
        postApp: this.state.postApp.slice().map((item) => {
          if (Number(item.id) === Number(step)) {
            return {
              ...item,
              active: true,
              disbaled: false,
            };
          }
          if (
            Number(item.id) === Number(this.state.step) &&
            Number(this.state.step) !== Number(step)
          ) {
            return {
              ...item,
              active: false,
              disbaled: false,
            };
          }
          // return item
          return {
            ...item,
            active: false,
          };
        }),
      });
    } else {
      this.setState({
        ...this.state,
        step: step,
        postApp: this.state.postApp.slice().map((item) => {
          if (Number(item.id) === Number(step)) {
            return {
              ...item,
              active: true,
              disbaled: false,
            };
          }
          if (
            Number(item.id) === Number(this.state.step) &&
            Number(this.state.step) !== Number(step)
          ) {
            return {
              ...item,
              active: false,
              disbaled: false,
            };
          }
          // return item
          return {
            ...item,
            active: false,
          };
        }),
      });
    }
  };
  blurLoanAmount = () => {
    let totalAmount =
      this.state.loan_amount !== undefined && this.state.loan_amount !== ""
        ? this.state.loan_amount
        : 0;
    totalAmount = totalAmount
      .toString()
      .split(",")
      .join("")
      .split("$")
      .join("");
    var loan = Number(totalAmount).toFixed(2);
    var month = Number(this.state.amortization);
    let interestRate =
      this.state.interestRate !== undefined && this.state.interestRate !== ""
        ? this.state.interestRate
        : 1;
    interestRate = this.state.interestRate
      .toString()
      .split(",")
      .join("")
      .split("%")
      .join("");
    var int = Number(interestRate).toFixed(2);
    var down =
      this.state.downPayment !== undefined && this.state.downPayment !== ""
        ? this.state.downPayment
        : 0;
    down = down.toString().split(",").join("").split("$").join("");
    down = Number(down).toFixed(2);
    var amount = parseInt(loan);
    var months = parseInt(month);
    down = parseInt(down);
    var annInterest = parseFloat(int) / 100;
    console.log(
      totalAmount,
      month,
      interestRate,
      down,
      "totalAmount,month, interestRate, down"
    );
    const paymentType =
      this.state.paymentType === "weekly"
        ? 52
        : this.state.paymentType === "bi-weekly"
          ? 26
          : this.state.paymentType === "monthly"
            ? 12
            : 12;
    var monInt = annInterest / paymentType;
    const loanamount = loan;
    months = months / 12;
    const i = annInterest / 100 / paymentType;
    const n = months * paymentType;
    const d = (Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n));
    const periodicpayment = loanamount / d;
    this.setState({
      ...this.state,
      monthlyAmount:
        totalAmount == 0 ? 0 : periodicpayment == 0 ? 0 : periodicpayment,
    });
  };
  blurLoanAmountIntrest = () => {
    if (this.state.interestRate) {
      let totalAmount =
        this.state.loan_amount !== undefined && this.state.loan_amount !== ""
          ? this.state.loan_amount
          : 0;
      totalAmount = totalAmount
        .toString()
        .split(",")
        .join("")
        .split("$")
        .join("");
      var loan = Number(totalAmount).toFixed(2);
      var month = Number(this.state.amortization);
      let interestRate =
        this.state.interestRate !== undefined && this.state.interestRate !== ""
          ? this.state.interestRate
          : 1;
      interestRate = this.state.interestRate
        .toString()
        .split(",")
        .join("")
        .split("%")
        .join("");
      var int = Number(interestRate).toFixed(2);
      var down =
        this.state.downPayment !== undefined && this.state.downPayment !== ""
          ? this.state.downPayment
          : 0;
      down = down.toString().split(",").join("").split("$").join("");
      down = Number(down).toFixed(2);
      var months = parseInt(month);
      down = parseInt(down);
      var annInterest = parseFloat(int) / 100;
      console.log(
        totalAmount,
        month,
        interestRate,
        down,
        "totalAmount,month, interestRate, down"
      );
      const paymentType =
        this.state.paymentType === "weekly"
          ? 52
          : this.state.paymentType === "bi-weekly"
            ? 26
            : this.state.paymentType === "monthly"
              ? 12
              : 12;
      var monInt = annInterest / paymentType;
      const loanamount = loan;
      months = months / 12;
      const i = annInterest / 100 / paymentType;
      const n = months * paymentType;
      const d = (Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n));
      const periodicpayment = loanamount / d;

      this.setState({
        ...this.state,
        monthlyAmount:
          totalAmount == 0 ? 0 : periodicpayment == 0 ? 0 : periodicpayment,
      });
    } else {
      this.setState({
        ...this.state,
        interestRate: "1",
      });
    }
  };
  emptyFun = () => {
    return true;
  };
  handleOnBlurStock = (id, index) => {
    this.setState({
      ...this.state,
      stockIndex: index,
    });
    if (id) {
      this.props.get_stock_id_detail(id);
    }
  };
  changeSelectStatus = (e, formName, name, stateName, prevState) => {
    if (Number(prevState) !== Number(e.value)) {
      if (Number(e.value) === 4) {
        window.$("#confirmDecline").modal("show");
      } else {
        window.$("#updateStatusModel").modal("show");
      }

      this.setState({
        ...this.state,
        tempStatus: e,
      });
    } else {
      return false;
    }
  };
  update_application_status = (e) => {
    this.setState({
      ...this.state,
      selectedApplicationStatus: e,
      applicationStatus:
        e !== undefined && e !== null
          ? e.value !== undefined && e.value !== null
            ? e.value
            : ""
          : "",
      selectApplicationStatus:
        e !== undefined && e !== null
          ? e.value !== undefined && e.value !== null
            ? e.value
            : ""
          : "",
    });
  };
  update_application_decline = (e, declineReason) => {
    this.setState({
      ...this.state,
      selectedApplicationStatus: e,
      applicationStatus:
        e !== undefined && e !== null
          ? e.value !== undefined && e.value !== null
            ? e.value
            : ""
          : "",
      selectApplicationStatus:
        e !== undefined && e !== null
          ? e.value !== undefined && e.value !== null
            ? e.value
            : ""
          : "",
      declineReason: declineReason,
    });
  };
  changeCompleteStatus = (e, name) => {
    this.setState({
      ...this.state,
      [name]: !this.state[name],
    });
    const data = {
      id: this.state.buyerAppId,
      [name]: !this.state[name],
      additional_item: [],
    };
    console.log(data, "complete_flag");
    this.props.update_application_detail_complete(data, name);
  };
  onDrop = async (files, id) => {
    console.log(files, id, "On Drop");
    this.setState({
      ...this.state,
      imageErrors: [],
    });
    let index = 0;
    let width = 141.8;
    let height = 107.31;
    console.log(this.state.vehicleImages, "vehicleImages");
    console.log(
      this.state.vehicleUploadImages,
      "this.state.vehicleUploadImages"
    );
    console.log(
      this.state.vehicleImages.filter(
        (item) => item.preViewFiles === null && item.path === ""
      ),
      "this.state.vehicleImages.filter( (item) => item.preViewFiles === null && item.path === '')"
    );
    let emptyPreviewFiles = this.state.vehicleImages.filter(
      (item) => item.preViewFiles === null && item.path === ""
    );
    let fillPreviewFiles = this.state.vehicleImages.filter(
      (item) => item.preViewFiles !== null || item.path !== ""
    );
    let emptyFiles = this.state.vehicleUploadImages.filter(
      (item) => item.files === null && item.path === ""
    );
    let fillFiles = this.state.vehicleUploadImages.filter(
      (item) => item.files !== null || item.path !== ""
    );
    for (const item of files) {
      if (
        item.type != "image/png" &&
        item.type != "image/jpg" &&
        item.type != "image/jpeg"
      ) {
        this.setState({
          ...this.state,
          imageErrors: [
            ...this.state.imageErrors,
            {
              message: `${item.path} File does not support. You must use .png, jpeg or .jpg`,
            },
          ],
        });
      } else {
        if (item.size > 2 * 1024 * 1024) {
          this.setState({
            ...this.state,
            imageErrors: [
              ...this.state.imageErrors,
              {
                message: `${item.path} Please upload a file smaller than 2 MB`,
              },
            ],
          });
        } else {
          emptyPreviewFiles = emptyPreviewFiles.map((img, fileIndex) => {
            if (fileIndex === index) {
              console.log(item, "File");
              return {
                ...img,
                preViewFiles: Object.assign(item, {
                  preview: URL.createObjectURL(item),
                }),
              };
            }
            return img;
          });
          emptyFiles = emptyFiles.map((img, fileIndex) => {
            if (fileIndex === index) {
              return {
                ...img,
                files: item,
              };
            }
            return img;
          });

          index++;
        }

        this.setState({
          ...this.state,
          vehicleUploadImages: [...(fillFiles || []), ...emptyFiles],
          vehicleImages: [...(fillPreviewFiles || []), ...emptyPreviewFiles],
        });
      }
    }
  };

  removeFile = (id) => {
    const fileExist = this.state.vehicleImages
      .filter((item) => Number(item.id) === Number(id))
      .map((item) => {
        return item.path;
      })[0];
    if (fileExist !== undefined && fileExist !== null && fileExist !== "") {
      const data = {
        update: "remove_images",
        rimg_len: 1,
        "rimages[0]": fileExist,
      };
      console.log(data);
      // props.delete_listing_image(data);
    }

    const vehicleUploadImages = this.state.vehicleUploadImages
      .slice()
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            files: null,
            path: "",
          };
        }
        return item;
      });
    const vehicleImages = this.state.vehicleImages.slice().map((item) => {
      if (item.id === id) {
        return {
          ...item,
          preViewFiles: null,
          path: "",
        };
      }
      return item;
    });
    this.setState({
      ...this.state,
      vehicleImages,
      vehicleUploadImages,
    });
  };
  refund_application = (id) => {
    this.setState({ loadingRefund: true })
    const url = `/refund/`;
    // https://dev-api.financethat.ca/refund/
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: {
        "id": id,
        "refund_status": 2
      },
      url,
    };
    axios(options)
      .then(async (response) => {
        console.log(response, "response")
        this.setState({ loadingRefund: false })
        if (response.data.success) {
        }
        this.setState({changeStatusRefund: 2})

      })
      .catch((err) => {
        console.log(err, "err")
        this.setState({ loadingRefund: false })

      });
  };
  render() {
    let lonaAmount =
      this.state.loan_amount !== undefined && this.state.loan_amount !== ""
        ? this.state.loan_amount
        : 0;
    lonaAmount = lonaAmount.toString().split(",").join("").split("$").join("");
    var result = this.props.match.url.split("/");
    var Param = result[result.length - 2];

    return (
      <React.Fragment>
        <Helmet>
          <title>
            {Param
              ? Param === "pending"
                ? "Pending Application"
                : "Active Application"
              : "Application"}
          </title>
          <meta name="description" content="" />
        </Helmet>
        <div className="app-form-main clearfix">
        <a className="back" href={`/admin/application/pending`}>
            {" "}
            Back to applications{" "}
          </a>
          <div className="app-form-side-bar">
            <div className="side-bar-content">
              <div className="sidebar-head clearfix">
                <div className="row date-Id" style={{ color: '#fff' }}>

                  <div className="col-6"><span>
                    {this.state.created_at != null &&
                      this.state.created_at != undefined &&
                      this.state.created_at !== ""
                      ? moment(this.state.created_at).format("ll")
                      : ""}{" "}
                  </span>
                  </div>
                  <div className="col-6" ><span className="float-right">Application ID: {this.state.buyerAppId}</span></div>
                </div>
                <div className="row report-btn py-3">
                    <div class="col-md-6 p-0">
                      <Link
                        to={"#"}
                        className="btn disable px-3"
                        target="_blank"
                      >
                        {"Applicant Credit Report >"}
                      </Link>
                    </div>
                    <div class="col-md-6 p-0">
                      <Link to={"#"}
                        className="btn disable px-3"
                        target="_blank" >
                        {"Co-applicant Credit Report >"}
                      </Link>
                    </div>
                  {/* {this.state.coApplicantId ? <Link to={'/admin/application/co-applicant-credit-report/' + this.state.coApplicantId} className="btn btn-primary" target="_blank"> Co Applicant Credit Report </Link> : null} */}
                </div>
                <div className="application-status" id="dropdown-basic">
                  <p> Application Status </p>

                </div>
              </div>
              <div className="sidebar-nav-holder">
                <ul className="nav-list">
                  {(this.state.postApp || []).map((item, index) => (
                    <li
                      className={
                        item.disbaled
                          ? "nav-list-item not_done" //"nav-list-item disable"
                          : item.done === true
                            ? "nav-list-item done"
                            : item.pending === true
                              ? "nav-list-item already_upload"
                              : item.active === true
                                ? "nav-list-item active"
                                : "nav-list-item not_done"
                      }
                      key={index}
                      onClick={
                        item.disbaled
                          ? this.emptyFun
                          : () => this.onClickChangeNav(item.id)
                      }
                    >
                      {" "}
                      <Link
                        className="nav-link"
                        to={item.disbaled ? "#" : item.path}
                      >
                        {" "}
                        <span className="status-circle">
                          {" "}
                          {item.disbaled ? (
                            <i class="fa fa-check"></i>
                          ) : item.done === true ? (
                            <i class="fa fa-check"></i>
                          ) : item.pending === true ? (
                            <img
                              src="/assets/image/applicationClock.svg"
                              alt="img"
                              className="mb-1"
                            />
                          ) : item.active ? (
                            <i
                              class="fa fa-check"
                              style={{ color: "#fff" }}
                            ></i>
                          ) : (
                            <i class="fa fa-check"></i>
                          )}{" "}
                        </span>{" "}
                        {item.name}{" "}
                      </Link>{" "}
                      {item.disbaled ||
                        (item.done === true ? (
                          <span className="status-tag verified">Verified</span>
                        ) : (
                          item.pending && (
                            <span className="status-tag pending">
                              Pending Review
                            </span>
                          )
                        ))}
                    </li>
                  ))}
                </ul>
                <Link
                  className="upload-document"
                  to={`${this.props.match.url}/upload-doc`}
                  onClick={() => this.onClickChangeNav(8)}
                >
                  {" "}
                  <span
                    className="text-holder"
                    onClick={this.removeLocalStorage}
                  >
                    {" "}
                    Upload Documents{" "}
                  </span>{" "}
                </Link>
                {(this.props?.application_detail?.refund_status == 0 && this.state.changeStatusRefund == 0) ?
                  <div

                  >
                  </div>
                  : (this.props?.application_detail?.refund_status == 2  || this.state.changeStatusRefund == 2)?
                    <div
                      className="Refunded"
                    >
                      {" "}
                      <span
                        className="Refunded-icon"
                      >
                        {" "}
                        Refunded{" "}
                      </span>{" "}
                    </div>
                    : (this.props?.application_detail?.refund_status == 1 || this.state.changeStatusRefund == 1)  ?
                    <div
                    className="Request-Refunded"
                    onClick={() => {
                      if (this.props?.application_detail?.id) {
                        this.refund_application(this.props?.application_detail?.id)
                      }
                    }}
                  >
                    {" "}
                    <span
                      className="Request-Refunded-text"
                    >
                      {" "}
                      {this.state.loadingRefund ? "Loading..." : "Refund"}{" "}
                    </span>{" "}
                  </div>
                      : ""
                }
                {/* <Link
                  className="Request-Refunded"
                  to={`${this.props.match.url}/upload-doc`}
                  onClick={() => this.onClickChangeNav(8)}
                >
                  {" "}
                  <span
                    className="Request-Refunded-text"
                    onClick={this.removeLocalStorage}
                  >
                    {" "}
                    Request-Refund{" "}
                  </span>{" "}
                </Link>
                <Link
                  className="Refunded"
                  to={`${this.props.match.url}/upload-doc`}
                  onClick={() => this.onClickChangeNav(8)}
                >
                  {" "}
                  <span
                    className="Refunded-icon"
                    onClick={this.removeLocalStorage}
                  >
                    {" "}
                    Refunded{" "}
                  </span>{" "}
                </Link>
                <Link
                  className="Refund-in-progress"
                  to={`${this.props.match.url}/upload-doc`}
                  onClick={() => this.onClickChangeNav(8)}
                >
                  {" "}
                  <span
                    className="Refund-icon"
                    onClick={this.removeLocalStorage}
                  >
                    {" "}
                    Refund in progress{" "}
                  </span>{" "}
                </Link>
 */}




              </div>
              <div className="image-holder">
                <img src="/assets/image/sidebar-bottom-image.svg" alt="" />
              </div>
            </div>
          </div>
          <Switch>

            <Route
              path={`${this.props.match.url}`}
              exact
              name="Buyer Application Detail"
              render={(props) => (
                <BuyerApplicationDetail
                  handleOnChange={this.handleOnChange}
                  {...this.state}
                  handleOnChangeYears={this.handleOnChangeYears}
                  handleOnChangeDates={this.handleOnChangeDates}
                  handleLocationChange={this.handleLocationChange}
                  changeSelect={this.changeSelect}
                  onClickChangeStep={this.onClickChangeStep}
                  {...this.props}
                  addAppLication={true}
                  handleChangeSlider={this.handleChangeSlider}
                  changeCompleteStatus={this.changeCompleteStatus}
                />
              )}
            />
            <Route
              path={`${this.props.match.url}/applicant-detail`}
              exact
              name="Buyer Application Detail"
              render={(props) => (
                <BuyerApplicationDetail
                  handleOnChange={this.handleOnChange}
                  {...this.state}
                  handleOnChangeYears={this.handleOnChangeYears}
                  handleOnChangeDates={this.handleOnChangeDates}
                  handleLocationChange={this.handleLocationChange}
                  changeSelect={this.changeSelect}
                  onClickChangeStep={this.onClickChangeStep}
                  {...this.props}
                  addAppLication={true}
                  handleChangeSlider={this.handleChangeSlider}
                  changeCompleteStatus={this.changeCompleteStatus}
                />
              )}
            />
            <Route
              path={`${this.props.match.url}/co-applicant`}
              exact
              name="Co Applicant"
              render={(props) => (
                <CoApplicant
                  handleOnChange={this.handleOnChange}
                  {...this.state}
                  {...this.props}
                  handleOnChangeYears={this.handleOnChangeYears}
                  handleOnChangeDates={this.handleOnChangeDates}
                  handleLocationChange={this.handleLocationChange}
                  changeSelect={this.changeSelect}
                  onClickChangeStep={this.onClickChangeStep}
                  removeCoApplicant={this.removeCoApplicant}
                  changeCompleteStatus={this.changeCompleteStatus}
                  handleChangeSlider={this.handleChangeSlider}
                />
              )}
            />
            <Route
              path={`${this.props.match.url}/assets-detail`}
              exact
              name="Assets Detail"
              render={(props) => (
                <AssetDetail
                  handleOnChange={this.handleOnChange}
                  {...this.state}
                  {...this.props}
                  changeSelectAssets={this.changeSelectAssets}
                  handleOnChangeAssets={this.handleOnChangeAssets}
                  addAssets={this.addAssets}
                  deleteAsset={this.deleteAsset}
                  changeSelectInfo={this.changeSelectInfo}
                  handleOnChangeInfo={this.handleOnChangeInfo}
                  addAddtionalInfor={this.addAddtionalInfor}
                  changeSelect={this.changeSelect}
                  deleteAddtionalInfor={this.deleteAddtionalInfor}
                  handleLocationChange={this.handleLocationChange}
                  onClickChangeStep={this.onClickChangeStep}
                  handleOnBlurStock={this.handleOnBlurStock}
                  changeCompleteStatus={this.changeCompleteStatus}
                  _handleUploadSellerDocChange={
                    this._handleUploadSellerDocChange
                  }
                  onDrop={this.onDrop}
                  removeFile={this.removeFile}
                />
              )}
            />
            <Route
              path={`${this.props.match.url}/verify-identity`}
              exact
              name="Verify Identity"
              render={(props) => (
                <VerifyIdentity
                  {...this.state}
                  onClickChangeStep={this.onClickChangeStep}
                  changeCompleteStatus={this.changeCompleteStatus}
                  get_jumio_response={this.props.get_jumio_response}
                  dowload_files={this.dowload_files}
                />
              )}
            />
            <Route
              path={`${this.props.match.url}/income-verify`}
              exact
              name="Income Verification"
              render={(props) => (
                <IncomeVerification
                  {...this.state}
                  onClickChangeStep={this.onClickChangeStep}
                  changeCompleteStatus={this.changeCompleteStatus}
                  dowload_files={this.dowload_files}
                />
              )}
            />
            <Route
              path={`${this.props.match.url}/loan-payment`}
              exact
              name="Loan Payment Detail"
              render={(props) => (
                <LoanPaymentDetail
                  {...this.state}
                  {...this.props}
                  handleOnChangeDates={this.handleOnChangeDates}
                  handleOnChange={this.handleOnChange}
                  changePaymentType={this.changePaymentType}
                  onClickChangeStep={this.onClickChangeStep}
                  changeSelect={this.changeSelect}
                  blurLoanAmount={this.blurLoanAmount}
                  blurLoanAmountIntrest={this.blurLoanAmountIntrest}
                  changeCompleteStatus={this.changeCompleteStatus}
                />
              )}
            />
            <Route
              path={`${this.props.match.url}/loan-document`}
              exact
              name="Loan Document"
              render={(props) => (
                <LoanDocument
                  {...this.state}
                  {...this.props}
                  _handleloanDocChange={this._handleloanDocChange}
                  deleteLoanDoc={this.deleteLoanDoc}
                  dowload_files={this.dowload_files}
                  onClickChangeStep={this.onClickChangeStep}
                  changeCompleteStatus={this.changeCompleteStatus}
                />
              )}
            />
            <Route
              path={`${this.props.match.url}/upload-doc`}
              exact
              name="Upload Doc"
              render={(props) => (
                <UploadDoc
                  {...this.state}
                  {...this.props}
                  _handleImageChange={this._handleImageChange}
                  updateadminUploadDoc={this.updateadminUploadDoc}
                  deleteUploadedDoc={this.deleteUploadedDoc}
                  deleteUploadDoc={this.deleteUploadDoc}
                  onClickChangeStep={this.onClickChangeStep}
                  changeCompleteStatus={this.changeCompleteStatus}
                  dowload_files={this.dowload_files}
                  delete_Upload_Doc={this.delete_Upload_Doc}
                  _handleUploadDocChange={this._handleUploadDocChange}
                  upload_unrequested_doc={this.upload_unrequested_doc}
                />
              )}
            />
            <Route
              path={`${this.props.match.url}/assign-agent`}
              exact
              name="Assign Agent"
              render={(props) => (
                <AssignAgent
                  {...this.state}
                  {...this.props}
                  changeSelect={this.changeSelect}
                  onClickChangeStep={this.onClickChangeStep}
                  changeCompleteStatus={this.changeCompleteStatus}
                />
              )}
            />
            <Route name="404 Not Found" path={`${this.props.match.url}/*`}
              component={PageNotFoundApp} />
          </Switch>
          <ConfirmModel
            tempSelect={this.state.tempStatus}
            update_application_status={this.update_application_status}
            heading={"Application Status"}
            section1={"Do you really want to change application status"}
            section2=""
          />
          <ConfirmDecline
            declineReason={this.state.declineReason}
            tempSelect={this.state.tempStatus}
            update_application_decline={this.update_application_decline}
            heading={"Application Decline"}
          />
          {/* <PdfPrint /> */}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    type_of_vehicles: state.adPostReducers.addPostReducer.type_of_vehicle,
    addtional_types:
      state.adminReducer.adminAccounts.applicationReducer.addtional_types,
    application_detail:
      state.adminReducer.adminAccounts.applicationReducer.application_detail,
    vehicle_makes:
      state.adminReducer.adminAccounts.applicationReducer.vehicle_makes,
    vehicle_models:
      state.adminReducer.adminAccounts.applicationReducer.vehicle_models,
    vehicle_trims:
      state.adminReducer.adminAccounts.applicationReducer.vehicle_trims,
    loading_update:
      state.adminReducer.adminAccounts.applicationReducer.loading_update,
    updateBuyerApplicationPersonal:
      state.adminReducer.adminAccounts.applicationReducer
        .updateBuyerApplicationPersonal,
    updateBuyerApplicationEmployement:
      state.adminReducer.adminAccounts.applicationReducer
        .updateBuyerApplicationEmployement,
    updateCoBuyerApplicationPersonal:
      state.adminReducer.adminAccounts.applicationReducer
        .updateCoBuyerApplicationPersonal,
    updateCoBuyerApplicationEmployement:
      state.adminReducer.adminAccounts.applicationReducer
        .updateCoBuyerApplicationEmployement,
    updateAssetsDetail:
      state.adminReducer.adminAccounts.applicationReducer.updateAssetsDetail,
    updateSellerDetail:
      state.adminReducer.adminAccounts.applicationReducer.updateSellerDetail,
    updateAddtionalInfo:
      state.adminReducer.adminAccounts.applicationReducer.updateAddtionalInfo,
    deleteAddtionalInfo:
      state.adminReducer.adminAccounts.applicationReducer.deleteAddtionalInfo,
    updateAssignAgent:
      state.adminReducer.adminAccounts.applicationReducer.updateAssignAgent,
    updateAdminLoanDocumentDetail:
      state.adminReducer.adminAccounts.applicationReducer
        .updateAdminLoanDocumentDetail,
    loading_delete_addtional:
      state.adminReducer.adminAccounts.applicationReducer
        .loading_delete_addtional,
    deleteVehicleDetail:
      state.adminReducer.adminAccounts.applicationReducer.deleteVehicleDetail,
    loading_delete_vehicle:
      state.adminReducer.adminAccounts.applicationReducer
        .loading_delete_vehicle,
    deleteUploadedDoc:
      state.adminReducer.adminAccounts.applicationReducer.deleteUploadedDoc,
    loading_delete_uploaded_doc:
      state.adminReducer.adminAccounts.applicationReducer
        .loading_delete_uploaded_doc,
    loadingFlinksRequestId:
      state.adminReducer.adminAccounts.applicationReducer
        .loadingFlinksRequestId,
    loadingFlinksLogin:
      state.adminReducer.adminAccounts.applicationReducer.loadingFlinksLogin,
    flinks_login_id:
      state.adminReducer.adminAccounts.applicationReducer.flinks_login_id,
    flinks_login_response:
      state.adminReducer.adminAccounts.applicationReducer.flinks_login_response,
    delete_doc_id:
      state.adminReducer.adminAccounts.applicationReducer.delete_doc_id,
    upload_doc_id:
      state.adminReducer.adminAccounts.applicationReducer.upload_doc_id,
    co_applicant_delete:
      state.adminReducer.adminAccounts.applicationReducer.co_applicant_delete,
    delete_co_applicant_loading:
      state.adminReducer.adminAccounts.applicationReducer
        .delete_co_applicant_loading,
    loading_stock_id_detail:
      state.adminReducer.adminAccounts.applicationReducer
        .loading_stock_id_detail,
    stock_detail:
      state.adminReducer.adminAccounts.applicationReducer.stock_detail,
    // agent_listing: state.adminReducer.adminAccounts.agentReducer.agent_listing,
    agent_listing:
      state.adminReducer.adminAccounts.applicationReducer.agent_listing,
    personal_complete_redux:
      state.adminReducer.adminAccounts.applicationReducer.personal_complete,
    employement_complete_redux:
      state.adminReducer.adminAccounts.applicationReducer.employement_complete,
    co_personal_complete_redux:
      state.adminReducer.adminAccounts.applicationReducer.co_personal_complete,
    co_employement_complete_redux:
      state.adminReducer.adminAccounts.applicationReducer
        .co_employement_complete,
    assets_complete_redux:
      state.adminReducer.adminAccounts.applicationReducer.assets_complete,
    seller_complete_redux:
      state.adminReducer.adminAccounts.applicationReducer.seller_complete,
    addtional_complete_redux:
      state.adminReducer.adminAccounts.applicationReducer.addtional_complete,
    verify_identity_complete_redux:
      state.adminReducer.adminAccounts.applicationReducer
        .verify_identity_complete,
    income_verification_complete_redux:
      state.adminReducer.adminAccounts.applicationReducer
        .income_verification_complete,
    loan_payment_complete_redux:
      state.adminReducer.adminAccounts.applicationReducer.loan_payment_complete,
    loan_document_complete_redux:
      state.adminReducer.adminAccounts.applicationReducer
        .loan_document_complete,
    upload_doc_complete_redux:
      state.adminReducer.adminAccounts.applicationReducer.upload_doc_complete,
    loan_loading:
      state.adminReducer.adminAccounts.applicationReducer.loan_loading,
    loan_delete:
      state.adminReducer.adminAccounts.applicationReducer.loan_delete,
  };
};
export default connect(mapStateToProps, {
  get_vehicle_type,
  get_addtional_type,
  get_application_detail,
  get_vehicle_make,
  get_vehicle_model,
  get_vehicle_trims,
  update_application_detail,
  delete_addtional_info,
  downloadFile,
  update_application_detail_file,
  update_application_upload_doc_file,
  delete_vehicle_detail,
  delete_upload_doc,
  get_login_id_flinks,
  login_flinks,
  get_agents,
  get_stock_id_detail,
  delete_coApplicant,
  update_application_detail_complete,
  get_jumio_response,
  update_application_detail_status,
  delete_upload_doc_file,
  get_flinks_images,
  get_application_agents,
  upload_un_requested_doc,
  delete_loan_doc_file,
  upload_asset_detail_files,
  add_new_application_detail
})(AddNewAdminApplication);
