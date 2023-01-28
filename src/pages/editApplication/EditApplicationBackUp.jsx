import React, { Component } from 'react'
import BuyerApplicationDetail from '../../components/buyerApplication/BuyerApplicationDetail'
import CoApplicant from '../../components/buyerApplication/CoApplicant'
import AssetDetail from '../../components/buyerApplication/AssetDetail'
import VerifyIdentity from '../../components/buyerApplication/VerifyIdentity'
import IncomeVerification from '../../components/buyerApplication/IncomeVerification'
import LoanPaymentDetail from '../../components/buyerApplication/LoanPaymentDetail'
import UploadDoc from '../../components/buyerApplication/UploadDoc'
import LoanDocument from '../../components/buyerApplication/LoanDocument'
import { Route, Switch, Link } from 'react-router-dom'
import Geocode from "react-geocode";
import {
    get_vehicle_type,
} from '../../actions/addPostActions'
import {
    get_addtional_type, get_vehicle_make,
    get_application_detail,
    get_vehicle_model,
    get_vehicle_trims,
    update_application_detail,
    delete_addtional_info,
    downloadFile,
    update_application_detail_file,
    delete_vehicle_detail,
    delete_upload_doc,
    get_login_id_flinks,
    login_flinks
} from '../../actions/editPostAppActions'
import moment from 'moment'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { API_URL } from '../../constant'

class EditApplication extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buyerAppId: '',
            url: this.props.match.url,
            applicantFirstName: '',
            applicantLastName: '',
            applicantDateOfBirth: '',
            applicantTelephone: '',
            applicantAddress: '',
            applicantStreetAddress: '',
            applicantLocationName: '',
            applicantCity: '',
            applicantProvince: '',
            selectedProvince: '',
            applicantPostalCode: '',
            applicantCountry: '',
            employmentStatus: '',
            selectEmploymentStatus: '',
            typeOfEmployment: '',
            selectedTypeOfEmployment: '',
            employerName: '',
            occupation: '',
            employmentSince: '',
            grossMonthlyIncome: '',
            provinces: [{ value: 'AB', label: 'Alberta' }, { value: 'BC', label: 'British Columbia' }, { value: 'MB', label: 'Manitoba' }, { value: 'NB', label: 'New Brunswick' }, { value: 'NL', label: 'Newfoundland and Labrador' }, { value: 'NS', label: 'Nova Scotia' }, { value: 'ON', label: 'Ontario' }, { value: 'PE', label: 'Prince Edward Island' }, { value: 'QC', label: 'Quebec' }, { value: 'SK', label: 'Saskatchewan' }, { value: 'NT', label: 'Northwest Territories' }, { value: 'NU', label: 'Nunavut' }, { value: 'YT', label: 'Yukon' }],
            statuses: [{ value: 'Owned', label: 'Owned' }, { value: 'Rent', label: 'Rent' }, { value: 'Live With Parents', label: 'Live With Parents' }, { value: 'Other', label: 'Other' }],
            employmentStatuses: [{ label: 'Employed', value: 'Employed' }, { label: 'Self employed', value: 'Self employed' }, { label: 'Retired', value: 'Retired' }, { label: 'Unemployed', value: 'Unemployed' }],
            typeOfEmployments: [{ label: 'Full Time', value: 'Full Time' }, { label: 'Part Time', value: 'Part Time' }, { label: 'Seasonal', value: 'Seasonal' }],
            vehicleOptions: [],
            vehicleType: '',
            selectedVehicle: '',
            conditions: [{ value: 'New', label: 'New' }, { value: 'Used', label: 'Used' }],
            assetsDetails: [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', selectedMake: '', model: '', selectedModel: '', trim: '', selectedTrim: '', kilometer: '', vin: '', price: '', condition: '', selectedCondition: '', is_updated: false, new: true }],
            assetsDetailsForm: [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', selectedMake: '', model: '', selectedModel: '', trim: '', selectedTrim: '', kilometer: '', vin: '', price: '', condition: '', selectedCondition: '', vehicleMakes: [], vehicleModel: [], vehicleTrims: [], new: true, is_updated: false }],
            assetDeletedId: '',
            yearsDropDown: [],
            // Seller States
            sellerDealerShipName: '',
            sellerFirstName: '',
            sellerLastName: '',
            sellerProvince: '',
            selectedSellerProvince: '',
            sellertCity: '',
            sellerPostalCode: '',
            sellerCountry: '',
            sellerStreetAddress: '',
            sellerLocationName: '',
            sellerFax: '',
            //  AddtionalInformation
            addtionalTypes: [],
            addtionalInformation: [{ infoProvider: '', infoCost: '', selectedProductType: '', productType: '', new: true, id: '', is_updated: false }],
            addtionalDeletedId: '',
            // Co Applicant
            coApplicant: false,
            coApplicantFirstName: '',
            coApplicantLastName: '',
            coApplicantDateOfBirth: '',
            coApplicantTelephone: '',
            coApplicantAddress: '',
            coApplicantStreetAddress: '',
            coApplicantLocationName: '',
            coApplicantCity: '',
            coApplicantProvince: '',
            selectedCoApplicantProvince: '',
            coApplicantPostalCode: '',
            coApplicantCountry: '',
            coApplicantEmploymentStatus: '',
            selectCoApplicantEmploymentStatus: '',
            coApplicantTypeOfEmployment: '',
            selectedCoApplicantTypeOfEmployment: '',
            coApplicantEmployerName: '',
            coApplicantOccupation: '',
            coApplicantEmploymentSince: '',
            coApplicantGrossMonthlyIncome: '',
            coApplicantDefaultGrossMonthlyIncome: '',
            postApp: [{ id: 1, name: 'Applicant Details', active: true, disbaled: false, done: false, path: `${this.props.match.url}/applicant-detail` },
            { id: 2, name: 'Co Applicant', active: false, disbaled: false, done: false, path: `${this.props.match.url}/co-applicant` },
            { id: 3, name: 'Asset Detail', active: false, disbaled: false, done: false, path: `${this.props.match.url}/assets-detail` },
            { id: 4, name: 'Verify Identity', active: false, disbaled: false, done: false, path: `${this.props.match.url}/verify-identity` },
            { id: 5, name: 'Income Verifications', active: false, disbaled: false, done: false, path: `${this.props.match.url}/income-verify` },
            { id: 6, name: 'Loan Payment Detail', active: false, disbaled: false, done: false, path: `${this.props.match.url}/loan-payment` },
            { id: 7, name: 'Loan Documents', active: false, disbaled: false, done: false, path: `${this.props.match.url}/loan-document` }],
            step: 1,
            lastStep: 1,
            applicationStatus: '',
            created_at: '',
            loan_amount: 0,
            //Upload Doc
            documents: [],
            documentsTable: [],
            deletedDocId: '',
            // Loan Doc
            loanDoc: null,
            loanDocumentsTable: [],
            required_documents: [],
            loanDeletedDocId: '',
            //States
            approvedAmount: '',
            downPayment: '',
            financingAmount: '',
            applicantEmail: '',
            amortization: '',
            interestRate: '',
            grossMonthlyIncomeSlider: 0,
            monthlyAmount: 0,
            paymentType: 'Monthly'
        }

        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleloanDocChange = this._handleloanDocChange.bind(this);
        this._handleUploadDocChange = this._handleUploadDocChange.bind(this);

    }
    componentDidMount() {
        this.props.get_vehicle_type()
        this.props.get_addtional_type()
        if (this.props.match !== undefined && this.props.match.params !== undefined && this.props.match.params !== null && this.props.match.params.id !== undefined && this.props.match.params.id !== undefined) {
            this.props.get_application_detail(this.props.match.params.id)
        }
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
        Geocode.setLanguage("en");
        Geocode.setRegion("es");
        let currentYear = new Date().getFullYear();
        let earliestYear = 1900;
        let years = []
        while (currentYear >= earliestYear) {
            years.push({ label: `${currentYear}`, value: currentYear })
            currentYear -= 1;
        }
        let lastStep = 1
        let coApplicant = false
        if (localStorage.getItem('lastStepPostAppEdit')) {
            lastStep = localStorage.getItem('lastStepPostAppEdit')
        }
        if (localStorage.getItem('coApplicantEditPostApp')) {
            coApplicant = Boolean(localStorage.getItem('coApplicantEditPostApp'))
        }
        this.setState({
            ...this.state,
            yearsDropDown: years,
            lastStep: lastStep,
            coApplicant: coApplicant,
            postApp: this.state.postApp.slice().map(item => {
                if (Number(item.id) < Number(lastStep)) {
                    if (item.id === 2) {
                        return {
                            ...item,
                            active: false,
                            done: coApplicant,
                            // active: item.id !== 2 ? true : coApplicant,
                            disbaled: false
                        }
                    } else {
                        return {
                            ...item,
                            // active: true,
                            active: false,
                            done: true,
                            // active: item.id !== 2 ? true : coApplicant,
                            disbaled: false
                        }
                    }
                }
                if (Number(item.id) === Number(lastStep)) {
                    return {
                        ...item,
                        active: true,
                        done: false,
                        disbaled: false
                    }
                }
                return item
            })
        })
    }
    handleOnChange = (e) => {
        const { name, value } = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }
    handleOnChangeDates = (e, name) => {
        this.setState({
            ...this.state,
            [name]: e
        })
    }
    handleLocationChange = (e, name) => {
        this.setState({
            ...this.state,
            [name]: e
        })
    }
    changeSelect = (e, formName, name) => {
        this.setState({
            ...this.state,
            [name]: e,
            [formName]: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : '' : ''

        })
    }
    changeSelectAssets = (e, formName, name, index) => {
        this.setState({
            ...this.state,
            assetsDetails: this.state.assetsDetails.slice().map((item, dataIndex) => {
                if (dataIndex === index) {
                    return {
                        ...item,
                        [name]: e,
                        [formName]: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : '' : ''
                    }
                }
                return item
            }),
            assetsDetailsForm: this.state.assetsDetailsForm.slice().map((item, dataIndex) => {
                if (dataIndex === index) {
                    return {
                        ...item,
                        [name]: e,
                        [formName]: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : '' : ''
                    }
                }
                return item
            })
        })
    }

    handleOnChangeAssets = (e, index) => {
        const { name, value } = e.target
        this.setState({
            ...this.state,
            assetsDetails: this.state.assetsDetails.slice().map((item, dataIndex) => {
                if (dataIndex === index) {
                    return {
                        ...item,
                        [name]: value
                    }
                }
                return item
            }),
            assetsDetailsForm: this.state.assetsDetailsForm.slice().map((item, dataIndex) => {
                if (dataIndex === index) {
                    return {
                        ...item,
                        [name]: value
                    }
                }
                return item
            })
        })
    }
    addAssets = () => {
        this.setState({
            ...this.state,
            assetsDetails: [...this.state.assetsDetails, { id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', selectedMake: '', mode: '', selectedModel: '', trim: '', selectedTrim: '', kilometer: '', vin: '', price: '', condition: '', is_updated: false, new: true }],
            assetsDetailsForm: [...this.state.assetsDetailsForm, { id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', selectedMake: '', model: '', selectedModel: '', trim: '', selectedTrim: '', kilometer: '', vin: '', price: '', condition: '', selectedCondition: '', vehicleMakes: [], vehicleModel: [], vehicleTrims: [], is_updated: false, new: true }]
        })
    }
    deleteAsset = (itemIndex) => {
        let assetId = this.state.assetsDetails.filter((item, index) => { return index === itemIndex }).map(item => { return item.id !== undefined && item.id !== null && item.id !== '' ? item.id : '' })[0]
        if (assetId != undefined && assetId !== null && assetId !== '') {
            this.props.delete_vehicle_detail(assetId)
            this.setState({
                ...this.state,
                assetDeletedId: assetId
            })
        } else {
            this.setState({
                ...this.state,
                assetsDetails: this.state.assetsDetails.filter((item, index) => { return index !== itemIndex }),
                assetsDetailsForm: this.state.assetsDetailsForm.filter((item, index) => { return index !== itemIndex })
            })
        }

    }
    changeSelectInfo = (e, formName, name, index) => {
        this.setState({
            ...this.state,
            addtionalInformation: this.state.addtionalInformation.slice().map((item, dataIndex) => {
                if (dataIndex === index) {
                    return {
                        ...item,
                        [name]: e,
                        [formName]: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : '' : ''
                    }
                }
                return item
            })

        })
    }
    handleOnChangeInfo = (e, index) => {
        const { name, value } = e.target
        this.setState({
            ...this.state,
            addtionalInformation: this.state.addtionalInformation.slice().map((item, dataIndex) => {
                if (dataIndex === index) {
                    return {
                        ...item,
                        [name]: value
                    }
                }
                return item
            })

        })
    }

    addAddtionalInfor = () => {
        this.setState({
            ...this.state,
            addtionalInformation: [...this.state.addtionalInformation, { productType: [], infoProvider: '', infoCost: '', selectedProductType: '', productType: '', new: true, id: '', is_updated: false }],
        })
    }
    deleteAddtionalInfor = (itemIndex) => {
        const id = this.state.addtionalInformation.filter((item, index) => index === itemIndex).map(item => { return item.id !== undefined && item.id !== null && item.id !== '' ? item.id : '' })[0]
        if (id != undefined && id != null && id !== '') {
            this.props.delete_addtional_info(id)
            this.setState({
                ...this.state,
                addtionalDeletedId: id
            })
        } else {
            this.setState({
                ...this.state,
                addtionalInformation: this.state.addtionalInformation.filter((item, index) => { return index !== itemIndex }),
            })
        }
    }
    onClickChangeStep = (prev, step) => {
        if (step === 2) {
            localStorage.setItem('coApplicantEditPostApp', true)
            this.setState({
                ...this.state,
                step: step,
                coApplicant: true,
                postApp: this.state.postApp.slice().map(item => {
                    // if (Number(item.id) === Number(step)) {
                    //     return {
                    //         ...item,
                    //         active: true,
                    //         disbaled: false
                    //     }
                    // }
                    if (Number(item.id) === Number(prev)) {
                        return {
                            ...item,
                            active: false,
                            disbaled: false,
                            done: true
                        }
                    }
                    if (Number(item.id) === Number(step)) {
                        return {
                            ...item,
                            active: true,
                            disbaled: false,
                            done: false
                        }
                    }
                    return item
                })
            })
        } else {
            this.setState({
                ...this.state,
                step: step,
                postApp: this.state.postApp.slice().map(item => {
                    // if (Number(item.id) <= Number(step)) {
                    //     return {
                    //         ...item,
                    //         active: item.id !== 2 ? true : this.state.coApplicant,
                    //         disbaled: false
                    //     }
                    // }
                    if (Number(item.id) === Number(prev)) {
                        return {
                            ...item,
                            active: false,
                            disbaled: false,
                            done: true
                        }
                    }
                    if (Number(item.id) == Number(step)) {
                        return {
                            ...item,
                            active: item.id !== 2 ? true : this.state.coApplicant,
                            disbaled: false,
                            done: false
                        }
                    }
                    return item
                })
            })
        }
    }
    onClickChangeNav = (step) => {
        if (step === 2) {
            localStorage.setItem('coApplicantEditPostApp', true)
            this.setState({
                ...this.state,
                step: step,
                coApplicant: true,
                postApp: this.state.postApp.slice().map(item => {
                    if (Number(item.id) === Number(step)) {
                        return {
                            ...item,
                            active: true,
                            disbaled: false
                        }
                    }
                    if (Number(item.id) === Number(this.state.step) && Number(this.state.step) !== Number(step)) {
                        return {
                            ...item,
                            active: false,
                            disbaled: false,
                            done: true,
                        }
                    }
                    return item
                })
            })
        } else {
            this.setState({
                ...this.state,
                step: step,
                postApp: this.state.postApp.slice().map(item => {
                    if (Number(item.id) === Number(step)) {
                        return {
                            ...item,
                            active: item.id !== 2 ? true : this.state.coApplicant,
                            disbaled: false
                        }
                    }
                    if (Number(item.id) === Number(this.state.step) && Number(this.state.step) !== Number(step)) {
                        return {
                            ...item,
                            active: false,
                            disbaled: false,
                            done: true,
                        }
                    }
                    return item
                })
            })
        }
    }
    _handleImageChange(e, fileIndex) {
        e.preventDefault();
        let file = e.target.files[0];
        if (file !== undefined && file !== null) {
            if (file.type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.type != "application/pdf" && file.type != "application/docs") {
                toastr.error('Error', "File does not support. You must use pdf, docs ")
                return false;
            }
            // if (file.size > (2 * 1024 * 1024)) {
            //     toastr.error('Error', "Please upload a file smaller than 2 MB")
            //     return false;
            // }
            const name = e.target.name;
            const fileNameState = e.target.name + 'Name'
            // let reader = new FileReader();
            const fileName = e.target.files[0].name
            this.setState({
                ...this.state,
                documents: this.state.documents.slice().map((item, index) => {
                    if (fileIndex === index) {
                        return {
                            ...item,
                            [name]: file,
                            [fileNameState]: fileName,
                            status: 'Uploaded',
                            fileType: file.type
                        }
                    }
                    return item
                }),
                documentsTable: [...this.state.documentsTable, {
                    [name]: file,
                    [fileNameState]: fileName,
                    status: 'Uploaded',
                    fileType: file.type
                }]
                // [name]: file,
                // [fileNameState]: fileName
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
    _handleloanDocChange(e, fileIndex) {
        e.preventDefault();
        let file = e.target.files[0];
        if (file !== undefined && file !== null) {
            if (file.type != "image/png" && file.type != "image/jpg" && file.type != "image/jpeg" && file.type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.type != "application/pdf" && file.type != "application/docs") {
                toastr.error('Error', "File does not support. You must use pdf, docs, .png, jpeg or .jpg ")
                return false;
            }
            // if (file.size > (2 * 1024 * 1024)) {
            //     toastr.error('Error', "Please upload a file smaller than 2 MB")
            //     return false;
            // }
            const name = e.target.name;
            const fileNameState = e.target.name + 'Name'
            const fileName = e.target.files[0].name
            this.setState({
                ...this.state,
                required_documents: this.state.required_documents.slice().map((item, index) => {
                    if (fileIndex === index) {
                        return {
                            ...item,
                            file: file,
                            fileType: file.type
                        }
                    }
                    return item
                }),
                loanDocumentsTable: this.state.loanDocumentsTable.slice().map((item, index) => {
                    if (fileIndex === index) {
                        return {
                            ...item,
                            file: file,
                            fileType: file.type
                        }
                    }
                    return item
                })
            });

        }
    }

    deleteLoanDoc = (index, id) => {
        this.setState({
            ...this.state,
            required_documents: this.state.required_documents.slice().map((item, fileIndex) => {
                if (fileIndex === index) {
                    return {
                        ...item,
                        file: null,
                    }
                }
                return item
            }),
            loanDocumentsTable: this.state.loanDocumentsTable.slice().map((item, fileIndex) => {
                if (fileIndex === index) {
                    return {
                        ...item,
                        file: null,
                        fileType: ''
                    }
                }
                return item
            }),
            loanDeletedDocId: id
        })
    }
    /**
     * 
     *Upload Doc
     * 
     * 
     */



    _handleUploadDocChange(e, fileIndex) {
        e.preventDefault();
        let file = e.target.files[0];
        if (file !== undefined && file !== null) {
            if (file.type != "image/png" && file.type != "image/jpg" && file.type != "image/jpeg" && file.type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.type != "application/pdf" && file.type != "application/docs") {
                toastr.error('Error', "File does not support. You must use pdf, docs, .png, jpeg or .jpg ")
                return false;
            }
            // if (file.size > (2 * 1024 * 1024)) {
            //     toastr.error('Error', "Please upload a file smaller than 2 MB")
            //     return false;
            // }
            const name = e.target.name;
            const fileNameState = e.target.name + 'Name'
            const fileName = e.target.files[0].name
            this.setState({
                ...this.state,
                documents: this.state.documents.slice().map((item, index) => {
                    if (fileIndex === index) {
                        return {
                            ...item,
                            file: file,
                            fileType: file.type,
                            is_uploaded: true
                        }
                    }
                    return item
                }),
                documentsTable: this.state.documentsTable.slice().map((item, index) => {
                    if (fileIndex === index) {
                        return {
                            ...item,
                            file: file,
                            fileType: file.type,
                            is_uploaded: true
                        }
                    }
                    return item
                })
            });

            const filename = this.state.documents.filter((item, index) => Number(index) === Number(fileIndex))
            console.log(filename, 'filename')
            var formData = new FormData();
            if (filename != undefined && filename != null && filename.length > 0) {
                console.log([{
                    id: filename[0].id,
                    name: filename[0].name,
                    file: file,
                    is_uploaded: true,
                    file_type: file.type

                }])
                // formData.append('required_documents', [{
                //     id: filename[0].id,
                //     name: filename[0].name,
                //     file: file,
                //     is_uploaded: true,
                //     file_type: file.type

                // }])

                formData.append('name', filename[0].name)
                formData.append('file', file)
                formData.append('is_uploaded', true)
                formData.append('file_type', file.type)
                // formData.append('additional_item', [])
                // Display the key/value pairs
                console.log(...formData, 'form data');
                for (var pair of formData.entries()) {
                    console.log(pair[0] + ', ' + pair[1], 'form data');
                }
                this.props.update_application_detail_file(formData, filename[0].id, 'uploadDocClient')
            }
        }
    }

    deleteUploadDoc = (itemIndex, id) => {
        const docId = this.state.documents.filter((item, index) => index === itemIndex).map(item => { return item.file !== undefined && item.file !== null && item.file !== '' ? item.id : '' })[0]
        if (docId != undefined && docId != null && docId !== '') {
            this.props.delete_upload_doc(docId)
            this.setState({
                ...this.state,
                deletedDocId: docId
            })
        } else {
            this.setState({
                ...this.state,
                documents: this.state.documents.slice().map((item, fileIndex) => {
                    if (fileIndex === itemIndex) {
                        return {
                            ...item,
                            file: null,
                            is_uploaded: false
                        }
                    }
                    return item
                }),
                documentsTable: this.state.documentsTable.slice().map((item, fileIndex) => {
                    if (fileIndex === itemIndex) {
                        return {
                            ...item,
                            file: null,
                            fileType: '',
                            is_uploaded: false
                        }
                    }
                    return item
                }),
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.type_of_vehicles !== this.props.type_of_vehicles && this.props.type_of_vehicles !== undefined) {
            const typeOfVehicle = [];
            (this.props.type_of_vehicles || []).map((item, index) => {
                typeOfVehicle.push({
                    value: item.id,
                    label: item.name
                })
            })
            this.setState({
                ...this.state,
                vehicleOptions: typeOfVehicle,
                assetsDetails: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.vehicle !== undefined && this.props.application_detail.vehicle !== null && this.props.application_detail.vehicle.length > 0 ? (this.props.application_detail.vehicle || []).map(item => {
                    return {
                        ...item,
                        vehicleType: item.type_of_vehicle !== undefined && item.type_of_vehicle !== null ? item.type_of_vehicle : '',
                        selectedVehicle: item.type_of_vehicle !== undefined && item.type_of_vehicle !== null ? (typeOfVehicle || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== undefined && (typeOfVehicle || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== null && (typeOfVehicle || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)).length > 0 ? (typeOfVehicle || []).filter(typeVehcile => { return Number(typeVehcile.value) === Number(item.type_of_vehicle) })[0] : '' : '',
                        is_updated: true, new: false, vehicleMakes: [], vehicleModel: [], vehicleTrims: [],
                    }
                }
                ) : [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', selectedMake: '', mode: '', selectedModel: '', trim: '', selectedTrim: '', kilometer: '', vin: '', price: '', condition: '', is_updated: false, new: true }] : [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', selectedMake: '', mode: '', selectedModel: '', trim: '', selectedTrim: '', kilometer: '', vin: '', price: '', condition: '', is_updated: false, new: true }],
                assetsDetailsForm: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.vehicle !== undefined && this.props.application_detail.vehicle !== null && this.props.application_detail.vehicle.length > 0 ? (this.props.application_detail.vehicle || []).map(item => {
                    return {
                        ...item,
                        vehicleType: item.type_of_vehicle !== undefined && item.type_of_vehicle !== null ? item.type_of_vehicle : '',
                        selectedVehicle: item.type_of_vehicle !== undefined && item.type_of_vehicle !== null ? (typeOfVehicle || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== undefined && (typeOfVehicle || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== null && (typeOfVehicle || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)).length > 0 ? (typeOfVehicle || []).filter(typeVehcile => { return Number(typeVehcile.value) === Number(item.type_of_vehicle) })[0] : '' : '',
                        is_updated: true, new: false, vehicleMakes: [], vehicleModel: [], vehicleTrims: [], selectedModel: '',
                        selectedTrim: '',
                        selectedCondition: '', selectedMake: ''
                    }
                }) : [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', selectedMake: '', model: '', selectedModel: '', trim: '', selectedTrim: '', kilometer: '', vin: '', price: '', condition: '', selectedCondition: '', vehicleMakes: [], vehicleModel: [], vehicleTrims: [], is_updated: false, new: true }] : [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', selectedMake: '', model: '', selectedModel: '', trim: '', selectedTrim: '', kilometer: '', vin: '', price: '', condition: '', selectedCondition: '', vehicleMakes: [], vehicleModel: [], vehicleTrims: [], is_updated: false, new: true }],
            })
        }
        if (prevProps.addtional_types !== this.props.addtional_types && this.props.addtional_types !== undefined) {
            const addtionalTypes = [];
            (this.props.addtional_types || []).map((item, index) => {
                addtionalTypes.push({
                    value: item.id,
                    label: item.type
                })
            })
            this.setState({
                ...this.state,
                addtionalTypes: addtionalTypes,
                addtionalInformation: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.additional_item !== undefined && this.props.application_detail.additional_item !== null && this.props.application_detail.additional_item.length > 0 ? this.props.application_detail.additional_item.map(item => { return { infoProvider: item.provider, infoCost: item.cost, selectedProductType: this.props.addtional_types !== undefined && this.props.addtional_types !== null && this.props.addtional_types.length > 0 ? this.props.addtional_types.filter(ad => Number(ad.id) === Number(item.type)).map(add => { return { value: add.id, label: add.type } })[0] : '', productType: item.type, id: item.id, new: false, is_updated: true } }) : [{ infoProvider: '', infoCost: '', selectedProductType: '', productType: '', id: '', new: true }] : [{ infoProvider: '', infoCost: '', selectedProductType: '', productType: '', id: '', new: true, is_updated: false }],
            })
        }
        if (prevProps.application_detail !== this.props.application_detail && this.props.application_detail !== undefined && Object.keys(this.props.application_detail) !== 0) {
            const financing_amount = this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.financing_amount != undefined && this.props.application_detail.financing_amount != null ? (this.props.application_detail.financing_amount) : 0 : 0
            let defaultLoanAmount = this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.financing_amount != undefined && this.props.application_detail.financing_amount != null ? (this.props.application_detail.financing_amount / 100) : 0 : 0

            defaultLoanAmount = defaultLoanAmount ? defaultLoanAmount * 13 : 0
            defaultLoanAmount = defaultLoanAmount ? Number(financing_amount) + defaultLoanAmount + 1099 : 0
            // let totalAmount = this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.loan_amount != undefined && this.props.application_detail.loan_amount != null ? this.props.application_detail.loan_amount : 0 : 0;
            let totalAmount = this.props.application_detail ? Number(this.props.application_detail.loan_amount) ? this.props.application_detail.loan_amount : '' : '';
            var loan = Number(totalAmount).toFixed(2)
            var month = this.props.application_detail ? this.props.application_detail.amortization ? Number(this.props.application_detail.amortization) : 0 : 0;
            let interestRate = this.props.application_detail ? this.props.application_detail.interest_rate ? Number(this.props.application_detail.interest_rate) : 1 : 1;
            var int = Number(interestRate).toFixed(2)
            var down = this.props.application_detail ? this.props.application_detail.down_payment ? this.props.application_detail.down_payment : 0 : 0;
            down = Number(down).toFixed(2)
            var amount = parseInt(loan)
            var months = parseInt(month)
            var down = parseInt(down)
            var annInterest = parseFloat(int) / 100
            const paymentType = this.props.application_detail ? this.props.application_detail.payment_frequency ? this.props.application_detail.payment_frequency === 'weekly' ? 52 : this.props.application_detail.payment_frequency === 'bi-weekly' ? 26 : this.props.application_detail.payment_frequency === 'monthly' ? 12 : 12 : 12 : 12;
            var monInt = annInterest / paymentType
            // var monInt = annInterest / 12
            var calculation = ((monInt + (monInt / (Math.pow((1 + monInt), months) - 1))) * (amount - (down || 0))).toFixed(2);

            this.setState({
                ...this.state,
                buyerAppId: this.props.application_detail.id !== undefined && this.props.application_detail.id !== null ? this.props.application_detail.id : '',
                applicantFirstName: this.props.application_detail.first_name !== undefined && this.props.application_detail.first_name !== null ? this.props.application_detail.first_name : '',
                applicantLastName: this.props.application_detail.last_name !== undefined && this.props.application_detail.last_name !== null ? this.props.application_detail.last_name : '',
                applicantDateOfBirth: this.props.application_detail.dob !== undefined && this.props.application_detail.dob !== null && this.props.application_detail.dob !== '' ? new Date(this.props.application_detail.dob) : '',
                applicantTelephone: this.props.application_detail.telephone !== undefined && this.props.application_detail.telephone !== null ? this.props.application_detail.telephone : '',
                applicantAddress: this.props.application_detail.address !== undefined && this.props.application_detail.address !== null ? { label: this.props.application_detail.address, value: {} } : '',
                applicantStreetAddress: this.props.application_detail.street_address !== undefined && this.props.application_detail.street_address !== null ? this.props.application_detail.street_address : '',
                applicantLocationName: this.props.application_detail.address !== undefined && this.props.application_detail.address !== null ? this.props.application_detail.address : '',
                applicantCity: this.props.application_detail.city !== undefined && this.props.application_detail.city !== null ? this.props.application_detail.city : '',
                applicantProvince: this.props.application_detail.province !== undefined && this.props.application_detail.province !== null ? this.props.application_detail.province : '',
                selectedProvince: this.props.application_detail.province !== undefined && this.props.application_detail.province !== null ? (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.province }) !== undefined && (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.province }) !== null && (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.province }).length > 0 ? (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.province })[0] : '' : '',
                applicantPostalCode: this.props.application_detail.postal_code !== undefined && this.props.application_detail.postal_code !== null ? this.props.application_detail.postal_code : '',
                applicantCountry: this.props.application_detail.country !== undefined && this.props.application_detail.country !== null ? this.props.application_detail.country : '',
                employmentStatus: this.props.application_detail.employement_status !== undefined && this.props.application_detail.employement_status !== null ? this.props.application_detail.employement_status : '',
                selectEmploymentStatus: this.props.application_detail.employement_status !== undefined && this.props.application_detail.employement_status !== null ? (this.state.employmentStatuses || []).filter(item => { return item.value === this.props.application_detail.employement_status }) !== undefined && (this.state.employmentStatuses || []).filter(item => { return item.value === this.props.application_detail.employement_status }) !== null && (this.state.employmentStatuses || []).filter(item => { return item.value === this.props.application_detail.employement_status }).length > 0 ? (this.state.employmentStatuses || []).filter(item => { return item.value === this.props.application_detail.employement_status })[0] : '' : '',
                typeOfEmployment: this.props.application_detail.type_of_employment !== undefined && this.props.application_detail.type_of_employment !== null ? this.props.application_detail.type_of_employment : '',
                selectedTypeOfEmployment: this.props.application_detail.type_of_employment !== undefined && this.props.application_detail.type_of_employment !== null ? (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.type_of_employment }) !== undefined && (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.type_of_employment }) !== null && (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.type_of_employment }).length > 0 ? (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.type_of_employment })[0] : '' : '',
                employerName: this.props.application_detail.employer_name !== undefined && this.props.application_detail.employer_name !== null ? this.props.application_detail.employer_name : '',
                occupation: this.props.application_detail.occupation !== undefined && this.props.application_detail.occupation !== null ? this.props.application_detail.occupation : '',
                employmentSince: this.props.application_detail.employment_since !== undefined && this.props.application_detail.employment_since !== null && this.props.application_detail.employment_since !== '' ? new Date(this.props.application_detail.employment_since) : '',
                grossMonthlyIncome: this.props.application_detail.gross_income !== undefined && this.props.application_detail.gross_income !== null ? this.props.application_detail.gross_income : 0,
                grossMonthlyIncomeSlider: this.props.application_detail.gross_income ? this.props.application_detail.gross_income : 0,
                // Vehicle Data
                assetsDetails: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.vehicle !== undefined && this.props.application_detail.vehicle !== null && this.props.application_detail.vehicle.length > 0 ? (this.props.application_detail.vehicle || []).map(item => {
                    return { id: item.id !== undefined && item.id !== null ? item.id : '', vehicleType: item.type_of_vehicle !== undefined && item.type_of_vehicle !== null ? item.type_of_vehicle : '', selectedVehicle: item.type_of_vehicle !== undefined && item.type_of_vehicle !== null ? (this.state.vehicleOptions || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== undefined && (this.state.vehicleOptions || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== null && (this.state.vehicleOptions || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)).length > 0 ? (this.state.vehicleOptions || []).filter(typeVehcile => { return Number(typeVehcile.value) === Number(item.type_of_vehicle) })[0] : '' : '', stockNumber: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.stock !== undefined && this.props.application_detail.stock !== null && Object.keys(this.props.application_detail.stock).length > 0 ? this.props.application_detail.stock.stock_id !== undefined && this.props.application_detail.stock.stock_id !== null ? this.props.application_detail.stock.stock_id : '' : '' : '', year: item.year !== undefined && item.year !== null ? item.year : '', selectedYear: item.year !== undefined && item.year !== null ? { value: item.year, label: item.year } : '', make: item.make !== undefined && item.make !== null ? item.make : '', selectedMake: '', model: item.model !== undefined && item.model !== null ? item.model : '', selectedModel: '', trim: item.trim !== undefined && item.trim !== null ? item.trim : '', selectedTrim: '', kilometer: item.kilometer !== undefined && item.kilometer !== null ? item.kilometer : '', vin: item.vin !== undefined && item.vin !== null ? item.vin : '', price: this.props.application_detail !== undefined && item !== null ? item.price !== undefined && item.price !== null ? item.price : '' : '', condition: this.props.application_detail !== undefined && item !== null ? item.condition !== undefined && item.condition !== null ? item.condition : '' : '', selectedCondition: this.props.application_detail !== undefined && item !== null ? item.condition !== undefined && item.condition !== null ? { value: item.condition, label: item.condition } : '' : '', is_updated: true, new: false }
                }
                ) : [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', selectedMake: '', mode: '', selectedModel: '', trim: '', selectedTrim: '', kilometer: '', vin: '', price: '', condition: '', is_updated: false, new: true }] : [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', selectedMake: '', mode: '', selectedModel: '', trim: '', selectedTrim: '', kilometer: '', vin: '', price: '', condition: '', is_updated: false, new: true }],
                assetsDetailsForm: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.vehicle !== undefined && this.props.application_detail.vehicle !== null && this.props.application_detail.vehicle.length > 0 ? (this.props.application_detail.vehicle || []).map(item => {
                    return {
                        id: item.id !== undefined && item.id !== null ? item.id : '', vehicleType: item.type_of_vehicle !== undefined && item.type_of_vehicle !== null ? item.type_of_vehicle : '', selectedVehicle: item.type_of_vehicle !== undefined && item.type_of_vehicle !== null ? (this.state.vehicleOptions || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== undefined && (this.state.vehicleOptions || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== null && (this.state.vehicleOptions || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)).length > 0 ? (this.state.vehicleOptions || []).filter(typeVehcile => { return Number(typeVehcile.value) === Number(item.type_of_vehicle) })[0] : '' : '', stockNumber: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.stock !== undefined && this.props.application_detail.stock !== null && Object.keys(this.props.application_detail.stock).length > 0 ? this.props.application_detail.stock.stock_id !== undefined && this.props.application_detail.stock.stock_id !== null ? this.props.application_detail.stock.stock_id : '' : '' : '', year: item.year !== undefined && item.year !== null ? item.year : '', selectedYear: item.year !== undefined && item.year !== null ? { value: item.year, label: item.year } : '', make: this.props.application_detail !== undefined && item !== null ? item.make !== undefined && item.make !== null ? item.make : '' : '', selectedMake: '', model: this.props.application_detail !== undefined && item !== null ? item.model !== undefined && item.model !== null ? item.model : '' : '', selectedModel: '', trim: this.props.application_detail !== undefined && item !== null ? item.trim !== undefined && item.trim !== null ? item.trim : '' : '', selectedTrim: '', kilometer: this.props.application_detail !== undefined && item !== null ? item.kilometer !== undefined && item.kilometer !== null ? item.kilometer : '' : '', vin: this.props.application_detail !== undefined && item !== null ? item.vin !== undefined && item.vin !== null ? item.vin : '' : '', price: item.price !== undefined && item.price !== null ? item.price : '', condition: item.condition !== undefined && item.condition !== null ? item.condition : '', selectedCondition: item.condition !== undefined && item.condition !== null ? { value: item.condition, label: item.condition } : '', vehicleMakes: [], vehicleModel: [], vehicleTrims: [], is_updated: true, new: false
                    }
                }) : [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', selectedMake: '', model: '', selectedModel: '', trim: '', selectedTrim: '', kilometer: '', vin: '', price: '', condition: '', selectedCondition: '', vehicleMakes: [], vehicleModel: [], vehicleTrims: [], is_updated: false, new: true }] : [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', selectedMake: '', model: '', selectedModel: '', trim: '', selectedTrim: '', kilometer: '', vin: '', price: '', condition: '', selectedCondition: '', vehicleMakes: [], vehicleModel: [], vehicleTrims: [], is_updated: false, new: true }],
                // Seller States
                sellerDealerShipName: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.seller !== null ? this.props.application_detail.seller.dealership_name !== undefined && this.props.application_detail.seller.dealership_name !== null ? this.props.application_detail.seller.dealership_name : '' : '' : '',
                sellerFirstName: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.seller !== null ? this.props.application_detail.seller.first_name !== undefined && this.props.application_detail.seller.first_name !== null ? this.props.application_detail.seller.first_name : '' : '' : '',
                sellerLastName: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.seller !== null ? this.props.application_detail.seller.last_name !== undefined && this.props.application_detail.seller.last_name !== null ? this.props.application_detail.seller.last_name : '' : '' : '',
                sellerProvince: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.seller !== null ? this.props.application_detail.seller.province !== undefined && this.props.application_detail.seller.province !== null ? this.props.application_detail.seller.province : '' : '' : '',
                selectedSellerProvince: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.seller !== null ? this.props.application_detail.seller.province !== undefined && this.props.application_detail.seller.province !== null ? (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.seller.province }) !== undefined && (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.seller.province }) !== null && (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.seller.province }).length > 0 ? (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.seller.province })[0] : '' : '' : '' : '',
                sellertCity: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.seller !== null ? this.props.application_detail.seller.city !== undefined && this.props.application_detail.seller.city !== null ? this.props.application_detail.seller.city : '' : '' : '',
                sellerPostalCode: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.seller !== null ? this.props.application_detail.seller.postal_code !== undefined && this.props.application_detail.seller.postal_code !== null ? this.props.application_detail.seller.postal_code : '' : '' : '',
                sellerCountry: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.seller !== null ? this.props.application_detail.seller.country !== undefined && this.props.application_detail.seller.country !== null ? this.props.application_detail.seller.country : '' : '' : '',
                sellerStreetAddress: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.seller !== null ? this.props.application_detail.seller.street !== undefined && this.props.application_detail.seller.street !== null ? this.props.application_detail.seller.street : '' : '' : '',
                sellerLocationName: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.seller !== null ? this.props.application_detail.seller.street !== undefined && this.props.application_detail.seller.street !== null ? this.props.application_detail.seller.street : '' : '' : '',
                sellerFax: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.seller !== null ? this.props.application_detail.seller.fax !== undefined && this.props.application_detail.seller.fax !== null ? this.props.application_detail.seller.fax : '' : '' : '',
                //  AddtionalInformation
                addtionalInformation: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.additional_item !== undefined && this.props.application_detail.additional_item !== null && this.props.application_detail.additional_item.length > 0 ? this.props.application_detail.additional_item.map(item => { return { infoProvider: item.provider, infoCost: item.cost, selectedProductType: this.props.addtional_types !== undefined && this.props.addtional_types !== null && this.props.addtional_types.length > 0 ? this.props.addtional_types.filter(ad => Number(ad.id) === Number(item.type)).map(add => { return { value: add.id, label: add.type } })[0] : '', productType: item.type, id: item.id, new: false, is_updated: true } }) : [{ infoProvider: '', infoCost: '', selectedProductType: '', productType: '', id: '', new: true }] : [{ infoProvider: '', infoCost: '', selectedProductType: '', productType: '', id: '', new: true, is_updated: false }],
                // Co Applicant
                coApplicant: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null && Object.keys(this.props.application_detail.co_applicant).length > 0 ? true : false : false,
                coApplicantFirstName: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.first_name !== undefined && this.props.application_detail.co_applicant.first_name !== null ? this.props.application_detail.co_applicant.first_name : '' : '' : '',
                coApplicantLastName: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.last_name !== undefined && this.props.application_detail.co_applicant.last_name !== null ? this.props.application_detail.co_applicant.last_name : '' : '' : '',
                coApplicantDateOfBirth: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.dob !== undefined && this.props.application_detail.co_applicant.dob !== null && this.props.application_detail.co_applicant.dob !== '' ? new Date(this.props.application_detail.co_applicant.dob) : '' : '' : '',
                coApplicantTelephone: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.telephone !== undefined && this.props.application_detail.co_applicant.telephone !== null ? this.props.application_detail.co_applicant.telephone : '' : '' : '',
                coApplicantAddress: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.address !== undefined && this.props.application_detail.co_applicant.address !== null ? { label: this.props.application_detail.co_applicant.address, value: {} } : '' : '' : '',
                coApplicantStreetAddress: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.street_address !== undefined && this.props.application_detail.co_applicant.street_address !== null ? this.props.application_detail.co_applicant.street_address : '' : '' : '',
                coApplicantLocationName: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.address !== undefined && this.props.application_detail.co_applicant.address !== null ? this.props.application_detail.co_applicant.address : '' : '' : '',
                coApplicantCity: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.city !== undefined && this.props.application_detail.co_applicant.city !== null ? this.props.application_detail.co_applicant.city : '' : '' : '',
                coApplicantProvince: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.province !== undefined && this.props.application_detail.co_applicant.province !== null ? this.props.application_detail.co_applicant.province : '' : '' : '',
                selectedCoApplicantProvince: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.province !== undefined && this.props.application_detail.co_applicant.province !== null ? (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.co_applicant.province }) !== undefined && (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.co_applicant.province }) !== null && (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.co_applicant.province }).length > 0 ? (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.co_applicant.province })[0] : '' : '' : '' : '',
                coApplicantPostalCode: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.postal_code !== undefined && this.props.application_detail.co_applicant.postal_code !== null ? this.props.application_detail.co_applicant.postal_code : '' : '' : '',
                coApplicantCountry: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.country !== undefined && this.props.application_detail.co_applicant.country !== null ? this.props.application_detail.co_applicant.country : '' : '' : '',
                coApplicantEmploymentStatus: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.employement_status !== undefined && this.props.application_detail.co_applicant.employement_status !== null ? this.props.application_detail.co_applicant.employement_status : '' : '' : '',
                selectCoApplicantEmploymentStatus: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.employement_status !== undefined && this.props.application_detail.co_applicant.employement_status !== null ? (this.state.employmentStatuses || []).filter(item => { return item.value === this.props.application_detail.co_applicant.employement_status }) !== undefined && (this.state.employmentStatuses || []).filter(item => { return item.value === this.props.application_detail.co_applicant.employement_status }) !== null && (this.state.employmentStatuses || []).filter(item => { return item.value === this.props.application_detail.co_applicant.employement_status }).length > 0 ? (this.state.employmentStatuses || []).filter(item => { return item.value === this.props.application_detail.co_applicant.employement_status })[0] : '' : '' : '' : '',
                coApplicantTypeOfEmployment: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.type_of_employment !== undefined && this.props.application_detail.co_applicant.type_of_employment !== null ? this.props.application_detail.co_applicant.type_of_employment : '' : '' : '',
                selectedCoApplicantTypeOfEmployment: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.type_of_employment !== undefined && this.props.application_detail.co_applicant.type_of_employment !== null ? (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.co_applicant.type_of_employment }) !== undefined && (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.co_applicant.type_of_employment }) !== null && (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.co_applicant.type_of_employment }).length > 0 ? (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.co_applicant.type_of_employment })[0] : '' : '' : '' : '',
                coApplicantEmployerName: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.employer_name !== undefined && this.props.application_detail.co_applicant.employer_name !== null ? this.props.application_detail.co_applicant.employer_name : '' : '' : '',
                coApplicantOccupation: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.occupation !== undefined && this.props.application_detail.co_applicant.occupation !== null ? this.props.application_detail.co_applicant.occupation : '' : '' : '',
                coApplicantEmploymentSince: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.employment_since !== undefined && this.props.application_detail.co_applicant.employment_since !== null && this.props.application_detail.co_applicant.employment_since !== '' ? new Date(this.props.application_detail.co_applicant.employment_since) : '' : '' : '',
                coApplicantGrossMonthlyIncome: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.gross_income !== undefined && this.props.application_detail.co_applicant.gross_income !== null ? this.props.application_detail.co_applicant.gross_income : 0 : 0 : 0,
                coApplicantDefaultGrossMonthlyIncome: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.gross_income !== undefined && this.props.application_detail.co_applicant.gross_income !== null ? this.props.application_detail.co_applicant.gross_income : 0 : 0 : 0,
                applicationStatus: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.application_status != undefined && this.props.application_detail.application_status != null ? this.props.application_detail.application_status : '' : '',
                // Required Document
                documents: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.required_documents != undefined && this.props.application_detail.required_documents != null ? (this.props.application_detail.required_documents || []).map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        fileType: item.file_type,
                        file: item.file,
                        is_uploaded: item.is_uploaded
                    }
                }) : [] : [],
                documentsTable: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.required_documents != undefined && this.props.application_detail.required_documents != null ? (this.props.application_detail.required_documents || []).map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        fileType: item.file_type,
                        file: item.file,
                        is_uploaded: item.is_uploaded
                    }
                }) : [] : [],
                //States
                approvedAmount: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.approved_amount != undefined && this.props.application_detail.approved_amount != null ? this.props.application_detail.approved_amount : '' : '',
                // downPayment: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.down_payment != undefined && this.props.application_detail.down_payment != null ? this.props.application_detail.down_payment : '' : '',
                downPayment: this.props.application_detail ? this.props.application_detail.down_payment ? this.props.application_detail.down_payment : 'N/A' : 'N/A',
                // financingAmount: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.financing_amount != undefined && this.props.application_detail.financing_amount != null ? this.props.application_detail.financing_amount : '' : '',
                financingAmount: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.financing_amount != undefined && this.props.application_detail.financing_amount != null ? this.props.application_detail.financing_amount : '' : '',
        applicantEmail: this.props.application_detail.applicant_email_by_dealer,
                
                // applicantEmail: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.user != undefined && this.props.application_detail.user != null && Object.keys(this.props.application_detail.user).length > 0 ? this.props.application_detail.user.email !== undefined && this.props.application_detail.user !== null ? this.props.application_detail.user.email : '' : '' : '',
                amortization: this.props.application_detail ? this.props.application_detail.amortization ? Number(this.props.application_detail.amortization) : 'N/A' : 'N/A',
                // amortization: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.amortization != undefined && this.props.application_detail.amortization != null ? Number(this.props.application_detail.amortization) : '' : '',
                interestRate: this.props.application_detail ? this.props.application_detail.interest_rate ? Number(this.props.application_detail.interest_rate) : 'N/A' : 'N/A',
                created_at: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.created_at != undefined && this.props.application_detail.created_at != null ? this.props.application_detail.created_at : '' : '',
                loan_amount: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.loan_amount != undefined && this.props.application_detail.loan_amount != null ? this.props.application_detail.loan_amount : defaultLoanAmount : defaultLoanAmount,
                // Loan Doc
                loanDoc: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.loan_document != undefined && this.props.application_detail.loan_document != null ? this.props.application_detail.loan_document : '' : '',
                monthlyAmount: totalAmount == 0 ? 0 : calculation == 0 ? 0 : calculation,
                paymentType: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.payment_frequency != undefined && this.props.application_detail.payment_frequency != null ? this.props.application_detail.payment_frequency === 'weekly' ? 'Weekly' : this.props.application_detail.payment_frequency === 'bi-weekly' ? 'Bi-Weekly' : this.props.application_detail.payment_frequency === 'monthly' ? 'Monthly' : 'Monthly' : 'Monthly' : 'Monthly',
                postApp: this.state.postApp.slice().map(item => {
                    if (item.id === 2) {
                        return {
                            ...item,
                            disbaled: this.props.application_detai ? this.props.application_detail.co_applicant && Object.keys(this.props.application_detail.co_applicant).length > 0 ? false : true : true
                        }
                    }
                    return item
                })

            })
            if (this.props.application_detail.vehicle !== null && this.props.application_detail.vehicle.length > 0) {
                for (let i = 0; i <= this.props.application_detail.vehicle.length; i++) {
                    if (this.props.application_detail.vehicle[i] !== undefined && this.props.application_detail.vehicle[i].type_of_vehicle !== undefined && this.props.application_detail.vehicle[i].type_of_vehicle !== null && this.props.application_detail.vehicle[i].type_of_vehicle !== '') {
                        this.props.get_vehicle_make(this.props.application_detail.vehicle[i].type_of_vehicle, i, '')
                    }
                    if (this.props.application_detail.vehicle[i] !== undefined && this.props.application_detail.vehicle[i].make !== undefined && this.props.application_detail.vehicle[i].make !== null && this.props.application_detail.vehicle[i].make !== '') {
                        this.props.get_vehicle_model(this.props.application_detail.vehicle[i].make, i, '')
                    }
                    if (this.props.application_detail.vehicle[i] !== undefined && this.props.application_detail.vehicle[i].model !== undefined && this.props.application_detail.vehicle[i].model !== null && this.props.application_detail.vehicle[i].model !== '') {
                        this.props.get_vehicle_trims(this.props.application_detail.vehicle[i].model, i, '')
                    }
                }
            }
        }
        if (prevState.step !== this.state.step && this.state.step > this.state.lastStep) {
            this.setState({
                ...this.state,
                lastStep: this.state.step
            })
            localStorage.setItem('lastStepPostAppEdit', this.state.step)
        }
        // if (prevState.coApplicantAddress !== this.state.coApplicantAddress && this.state.coApplicantAddress !== null && this.state.coApplicantAddress !== undefined && this.state.coApplicantAddress !== '') {
        //     new Promise((resolve) => {
        //         Geocode.fromAddress(this.state.coApplicantAddress.label).then(
        //             (response) => {
        //                 const address = response.results[0].formatted_address;
        //                 let city, state, country, postal_code, street_number, route, state_long;
        //                 for (let i = 0; i < response.results[0].address_components.length; i++) {
        //                     for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
        //                         switch (response.results[0].address_components[i].types[j]) {
        //                             case "locality":
        //                                 city = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "administrative_area_level_1":
        //                                 state_long = response.results[0].address_components[i].long_name;
        //                                 state = response.results[0].address_components[i].short_name;

        //                                 break;
        //                             case "country":
        //                                 country = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "route":
        //                                 route = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "postal_code":
        //                                 postal_code = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "street_number":
        //                                 street_number = response.results[0].address_components[i].long_name;
        //                                 break;
        //                         }
        //                     }
        //                 }
        //                 street_number = (street_number === undefined || street_number === null ? '' : street_number) + ' ' + (route === undefined || route === null ? '' : route)
        //                 this.setState({
        //                     ...this.state,

        //                     coApplicantProvince: state === undefined || state === null ? '' : state,
        //                     selectedCoApplicantProvince: (state === undefined || state === null) && (state_long === undefined || state_long === null) ? '' : { value: state, label: state_long },
        //                     coApplicantCity: city === undefined || city === null ? '' : city,
        //                     coApplicantPostalCode: postal_code === undefined || postal_code === null ? '' : postal_code,
        //                     coApplicantCountry: country === undefined || country === null ? '' : country,
        //                     coApplicantStreetAddress: street_number === undefined || street_number === null ? '' : street_number,
        //                     coApplicantLocationName: this.state.coApplicantAddress.label

        //                 })
        //             },
        //             (error) => {
        //                 console.error(error);
        //             }
        //         );
        //     })
        // }
        // if (prevState.applicantAddress !== this.state.applicantAddress && this.state.applicantAddress !== null && this.state.applicantAddress !== undefined && this.state.applicantAddress !== '') {
        //     new Promise((resolve) => {
        //         Geocode.fromAddress(this.state.applicantAddress.label).then(
        //             (response) => {
        //                 const address = response.results[0].formatted_address;
        //                 let city, state, country, postal_code, street_number, route, state_long;
        //                 for (let i = 0; i < response.results[0].address_components.length; i++) {
        //                     for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
        //                         switch (response.results[0].address_components[i].types[j]) {
        //                             case "locality":
        //                                 city = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "administrative_area_level_1":
        //                                 // state = response.results[0].address_components[i].long_name;
        //                                 state = response.results[0].address_components[i].short_name;
        //                                 state_long = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "route":
        //                                 route = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "country":
        //                                 country = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "postal_code":
        //                                 postal_code = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "street_number":
        //                                 street_number = response.results[0].address_components[i].long_name;
        //                                 break;
        //                         }
        //                     }
        //                 }
        //                 street_number = (street_number === undefined || street_number === null ? '' : street_number) + ' ' + (route === undefined || route === null ? '' : route)
        //                 this.setState({
        //                     ...this.state,
        //                     applicantProvince: state === undefined || state === null ? '' : state,
        //                     selectedProvince: (state === undefined || state === null) && (state_long === undefined || state_long === null) ? '' : { value: state, label: state_long },
        //                     applicantCity: city === undefined || city === null ? '' : city,
        //                     applicantPostalCode: postal_code === undefined || postal_code === null ? '' : postal_code,
        //                     applicantCountry: country === undefined || country === null ? '' : country,
        //                     applicantStreetAddress: street_number === undefined || street_number === null ? '' : street_number,
        //                     applicantLocationName: this.state.applicantAddress.label,


        //                 })
        //             },
        //             (error) => {
        //                 console.error(error);
        //             }
        //         );
        //     })
        // }
        // if (prevState.sellerAddress !== this.state.sellerAddress && this.state.sellerAddress !== null && this.state.sellerAddress !== undefined && this.state.sellerAddress !== '') {
        //     new Promise((resolve) => {
        //         Geocode.fromAddress(this.state.sellerAddress.label).then(
        //             (response) => {
        //                 const address = response.results[0].formatted_address;
        //                 let city, state, country, postal_code, street_number, route, state_long;
        //                 for (let i = 0; i < response.results[0].address_components.length; i++) {
        //                     for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
        //                         switch (response.results[0].address_components[i].types[j]) {
        //                             case "locality":
        //                                 city = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "administrative_area_level_1":
        //                                 // state = response.results[0].address_components[i].long_name;
        //                                 state = response.results[0].address_components[i].short_name;
        //                                 state_long = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "route":
        //                                 route = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "country":
        //                                 country = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "postal_code":
        //                                 postal_code = response.results[0].address_components[i].long_name;
        //                                 break;
        //                             case "street_number":
        //                                 street_number = response.results[0].address_components[i].long_name;
        //                                 break;
        //                         }
        //                     }
        //                 }
        //                 street_number = (street_number === undefined || street_number === null ? '' : street_number) + ' ' + (route === undefined || route === null ? '' : route)
        //                 this.setState({
        //                     ...this.state,
        //                     sellerProvince: state === undefined || state === null ? '' : state,
        //                     selectedSellerProvince: (state === undefined || state === null) && (state_long === undefined || state_long === null) ? '' : { value: state, label: state_long },
        //                     sellertCity: city === undefined || city === null ? '' : city,
        //                     sellerPostalCode: postal_code === undefined || postal_code === null ? '' : postal_code,
        //                     sellerCountry: country === undefined || country === null ? '' : country,
        //                     sellerStreetAddress: street_number === undefined || street_number === null ? '' : street_number,
        //                     sellerLocationName: this.state.sellerAddress.label,


        //                 })
        //             },
        //             (error) => {
        //                 console.error(error);
        //             }
        //         );
        //     })
        // }
        if (prevState.assetsDetails !== this.state.assetsDetails && this.state.assetsDetails !== undefined) {
            if ((this.state.assetsDetails || []).length > 0) {
                (this.state.assetsDetails || []).map((item, index) => {
                    console.log(prevState.assetsDetails[index], 'prevState.assetsDetails[index]')
                    console.log(item, 'State.assetsDetails[index]')
                    if (prevState.assetsDetails[index] != undefined && prevState.assetsDetails[index].vehicleType != item.vehicleType && item.vehicleType != undefined) {
                        this.props.get_vehicle_make(item.vehicleType, index, prevState.assetsDetails[index].vehicleType)
                        // this.setState
                    }
                    if (prevState.assetsDetails[index] != undefined && prevState.assetsDetails[index].make != item.make && item.make != undefined) {
                        if (item.make != undefined && item.make != null && item.make != '') {
                            this.props.get_vehicle_model(item.make, index, prevState.assetsDetails[index].vehicleType)
                        }
                    }
                    if (prevState.assetsDetails[index] != undefined && prevState.assetsDetails[index].model != item.model && item.model != undefined) {
                        if (item.model != undefined && item.model != null && item.model != '') {
                            this.props.get_vehicle_trims(item.model, index, prevState.assetsDetails[index].vehicleType)
                        }
                    }
                })
            }
        }
        if (prevProps.vehicle_makes !== this.props.vehicle_makes && this.props.vehicle_makes !== undefined) {
            this.setState({
                ...this.state,
                assetsDetailsForm: this.state.assetsDetailsForm.slice().map((item, index) => {
                    if (item.vehicleMakes != undefined && item.vehicleMakes != null) {
                        return {
                            ...item,
                            selectedMake: this.props.vehicle_makes[`vehicle${index}${item.vehicleType}`] !== undefined && this.props.vehicle_makes[`vehicle${index}${item.vehicleType}`] !== null && this.props.vehicle_makes[`vehicle${index}${item.vehicleType}`].length > 0 ? this.props.vehicle_makes[`vehicle${index}${item.vehicleType}`].filter(mak => Number(mak.id) === Number(item.make)).map(mak => {
                                return {
                                    value: mak.id,
                                    label: mak.make_name
                                }
                            }) : '',
                            vehicleMakes: this.props.vehicle_makes[`vehicle${index}${item.vehicleType}`] !== undefined && this.props.vehicle_makes[`vehicle${index}${item.vehicleType}`] !== null && this.props.vehicle_makes[`vehicle${index}${item.vehicleType}`].length > 0 ? this.props.vehicle_makes[`vehicle${index}${item.vehicleType}`].map(mak => {
                                return {
                                    value: mak.id,
                                    label: mak.make_name
                                }
                            }) : [],

                        }
                    }
                    return item
                }),
                selectedModel: '',
                vehicleModel: []
            })
        }
        if (prevProps.vehicle_models !== this.props.vehicle_models && this.props.vehicle_models !== undefined) {
            this.setState({
                ...this.state,
                assetsDetailsForm: this.state.assetsDetailsForm.slice().map((item, index) => {
                    if (item.vehicleModel !== undefined && item.vehicleModel !== null) {
                        return {
                            ...item,
                            selectedModel: this.props.vehicle_models[`vehicle${index}${item.make}`] !== undefined && this.props.vehicle_models[`vehicle${index}${item.make}`] !== null && this.props.vehicle_models[`vehicle${index}${item.make}`].length > 0 ? this.props.vehicle_models[`vehicle${index}${item.make}`].filter(mod => Number(mod.id) === Number(item.model)).map(mod => {
                                return {
                                    value: mod.id,
                                    label: mod.model_make
                                }
                            }) : '',
                            vehicleModel: this.props.vehicle_models[`vehicle${index}${item.make}`] !== undefined && this.props.vehicle_models[`vehicle${index}${item.make}`] !== null && this.props.vehicle_models[`vehicle${index}${item.make}`].length > 0 ? this.props.vehicle_models[`vehicle${index}${item.make}`].map(mod => {
                                return {
                                    value: mod.id,
                                    label: mod.model_make
                                }
                            }) : []
                        }
                    }
                    return item
                }),
                selectedTrim: '',
                vehicleTrims: []
            })
        }
        if (prevProps.vehicle_trims !== this.props.vehicle_trims && this.props.vehicle_trims !== undefined) {
            this.setState({
                ...this.state,
                assetsDetailsForm: this.state.assetsDetailsForm.slice().map((item, index) => {
                    if (item.vehicleTrims !== undefined && item.vehicleTrims !== null) {
                        return {
                            ...item,
                            selectedTrim: this.props.vehicle_trims[`vehicle${index}${item.model}`] !== undefined && this.props.vehicle_trims[`vehicle${index}${item.model}`] !== null && this.props.vehicle_trims[`vehicle${index}${item.model}`].length > 0 ? this.props.vehicle_trims[`vehicle${index}${item.model}`].filter(trim => Number(trim.id) === Number(trim)).map(trim => {
                                return {
                                    value: trim.id,
                                    label: trim.v_trim
                                }
                            }) : '',
                            vehicleTrims: this.props.vehicle_trims[`vehicle${index}${item.model}`] !== undefined && this.props.vehicle_trims[`vehicle${index}${item.model}`] !== null && this.props.vehicle_trims[`vehicle${index}${item.model}`].length > 0 ? this.props.vehicle_trims[`vehicle${index}${item.model}`].map(trim => {
                                return {
                                    value: trim.id,
                                    label: trim.v_trim
                                }
                            }) : []
                        }
                    }
                    return item
                })
            })
        }
        if (prevProps.deleteAddtionalInfo !== this.props.deleteAddtionalInfo && this.props.deleteAddtionalInfo !== undefined) {
            this.setState({
                ...this.state,
                addtionalInformation: this.state.addtionalInformation.filter((item, index) => { return Number(item.id) !== Number(this.state.addtionalDeletedId) }),
            })
        }
        if (prevProps.deleteUploadedDoc !== this.props.deleteUploadedDoc && this.props.deleteUploadedDoc !== undefined) {
            this.setState({
                ...this.state,
                documents: this.state.documents.slice().map((item, fileIndex) => {
                    if (Number(item.id) === Number(this.state.deletedDocId)) {
                        return {
                            ...item,
                            file: null,
                            is_uploaded: false
                        }
                    }
                    return item
                }),
                documentsTable: this.state.documentsTable.slice().map((item, fileIndex) => {
                    if (Number(item.id) === Number(this.state.deletedDocId)) {
                        return {
                            ...item,
                            file: null,
                            fileType: '',
                            is_uploaded: false
                        }
                    }
                    return item
                }),
                deletedDocId: ''
            })
        }
        if (prevProps.deleteVehicleDetail !== this.props.deleteVehicleDetail && this.props.deleteVehicleDetail !== undefined) {
            this.setState({
                ...this.state,
                assetsDetails: this.state.assetsDetails.filter((item, index) => { return Number(item.id) !== Number(this.state.assetDeletedId) }),
                assetsDetailsForm: this.state.assetsDetailsForm.filter((item, index) => { return Number(item.id) !== Number(this.state.assetDeletedId) }),
                assetDeletedId: ''
            })
        }
    }
    removeCoApplicant = (step) => {
        localStorage.removeItem('coApplicantEditPostApp')
        this.setState({
            ...this.state,
            step: step,
            coApplicant: true,
            postApp: this.state.postApp.slice().map(item => {
                if (Number(item.id) === Number(step)) {
                    return {
                        ...item,
                        active: true,
                        disbaled: false
                    }
                }
                return {
                    ...item,
                    active: item.id === 2 ? false : item.active,
                    disbaled: true
                }
            })
        })
    }
    dowload_files = (filePath) => {
        const path = API_URL + filePath
        this.props.downloadFile(path)
    }
    handleChangeSlider = (value) => {
        this.setState({
            ...this.state,
            grossMonthlyIncome: value,
        })
    }
    handleChangeCoSlider = (value) => {
        this.setState({
            ...this.state,
            coApplicantGrossMonthlyIncome: value,
        })
    }
    emptyFun = () => {
        return true
    }
    render() {
        console.log(this.state, 'dadasdasdasdasdasdasdasdsad')
        // console.log(this.props.vehicle_makes, 'dadasdasdasdasdasdasdasdsad')
        return (<React.Fragment>
            <div className="app-form-main clearfix">
                <Link className="back" to="/buyer/my-application"> Back to Dashboard </Link>
                <div className="app-form-side-bar">
                    <div className="side-bar-content">
                        <div className="sidebar-head clearfix">
                            <div className="head-left">
                                <span className="date">{this.state.created_at != null && this.state.created_at != undefined && this.state.created_at !== '' ? moment(this.state.created_at).format('ll') : ''}</span>
                                {/* <Link to={this.state.url} className="btn btn-primary"> Credit Report </Link> */}
                            </div>
                            <div className="head-right">
                                <span className="amount-label"> Loan Amount </span>
                                <span className="amount"> {this.state.loan_amount !== null && this.state.loan_amount !== '' ? new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }
                                ).format(Number(this.state.loan_amount))// '$100.00'
                                    : new Intl.NumberFormat('en-US',
                                        { style: 'currency', currency: 'USD' }
                                    ).format(0)} </span>
                                {/* <span className="monthly">  {this.state.monthlyAmount !== null && this.state.monthlyAmount !== '' ? new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }
                                ).format(Number(this.state.monthlyAmount))// '$100.00'
                                    : new Intl.NumberFormat('en-US',
                                        { style: 'currency', currency: 'USD' }
                                    ).format(0)} {this.state.paymentType} </span> */}
                            </div>
                            <div className="application-status">
                                <p> Application Status </p>
                                {Number(this.state.applicationStatus) === Number('1') ? (
                                    <React.Fragment>
                                        <span className="status unverified"> Pending </span>
                                    </React.Fragment>) : Number(this.state.applicationStatus) === Number('2') ? (
                                        <React.Fragment>
                                            <span className="status conditionally-approved"> Conditionally approved </span>
                                        </React.Fragment>) : Number(this.state.applicationStatus) === Number('3') ? (
                                            <React.Fragment>
                                                <span className="status pre-approved"> Pre-approved </span>
                                            </React.Fragment>) : Number(this.state.applicationStatus) === Number('4') ? (
                                                <React.Fragment>
                                                    <span className="status declinded"> Decline </span>
                                                </React.Fragment>) : Number(this.state.applicationStatus) === Number('5') ? (
                                                    <React.Fragment>
                                                        <span className="status approved"> Approved </span>
                                                    </React.Fragment>) : (
                                    <React.Fragment>
                                        <span className="status declinded"> {this.state.applicationStatus} </span>
                                    </React.Fragment>)}
                            </div>
                        </div>
                        <div className="sidebar-nav-holder">
                            <ul className="nav-list">
                                {(this.state.postApp || []).map((item, index) => (
                                    <li className={item.active === true ? "nav-list-item active" : item.done === true ? "nav-list-item done" : "nav-list-item"} key={index} onClick={item.disbaled ? this.emptyFun : () => this.onClickChangeNav(item.id)}> <Link className="nav-link" to={item.disbaled ? '#' : item.path}> <span className="status-circle"> <i class="fa fa-check"></i> </span> {item.name} </Link> </li>
                                ))}

                            </ul>
                            <Link className="upload-document" to={`${this.props.match.url}/upload-doc`} onClick={() => this.onClickChangeNav(8)}> <span className="text-holder"> Upload Documents </span> </Link>
                        </div>
                        <div className="image-holder">
                            <img src="/assets/image/sidebar-bottom-image.svg" alt="" />
                        </div>
                    </div>
                </div>
                <Switch>
                    <Route path={`${this.props.match.url}`}
                        exact
                        name="Buyer Application Detail"
                        render={(props) => <BuyerApplicationDetail handleOnChange={this.handleOnChange}  {...this.state} handleOnChangeDates={this.handleOnChangeDates} handleLocationChange={this.handleLocationChange} changeSelect={this.changeSelect} onClickChangeStep={this.onClickChangeStep} {...this.props} handleChangeSlider={this.handleChangeSlider} />} />
                    <Route path={`${this.props.match.url}/applicant-detail`}
                        exact
                        name="Buyer Application Detail"
                        render={(props) => <BuyerApplicationDetail handleOnChange={this.handleOnChange} {...this.state} handleOnChangeDates={this.handleOnChangeDates} handleLocationChange={this.handleLocationChange} changeSelect={this.changeSelect} onClickChangeStep={this.onClickChangeStep} {...this.props} handleChangeSlider={this.handleChangeSlider} />} />
                    <Route path={`${this.props.match.url}/co-applicant`}
                        exact
                        name="Co Applicant"
                        render={(props) => <CoApplicant handleOnChange={this.handleOnChange} {...this.state} {...this.props} handleOnChangeDates={this.handleOnChangeDates} handleLocationChange={this.handleLocationChange} changeSelect={this.changeSelect} onClickChangeStep={this.onClickChangeStep} removeCoApplicant={this.removeCoApplicant} handleChangeCoSlider={this.handleChangeCoSlider} />} />
                    <Route path={`${this.props.match.url}/assets-detail`}
                        exact
                        name="Assets Detail"
                        render={(props) => <AssetDetail handleOnChange={this.handleOnChange} {...this.state} {...this.props} changeSelectAssets={this.changeSelectAssets} handleOnChangeAssets={this.handleOnChangeAssets} addAssets={this.addAssets} deleteAsset={this.deleteAsset} changeSelectInfo={this.changeSelectInfo}
                            handleOnChangeInfo={this.handleOnChangeInfo}
                            addAddtionalInfor={this.addAddtionalInfor}
                            deleteAddtionalInfor={this.deleteAddtionalInfor} handleLocationChange={this.handleLocationChange} onClickChangeStep={this.onClickChangeStep} changeSelect={this.changeSelect} />} />
                    <Route path={`${this.props.match.url}/verify-identity`}
                        exact
                        name="Verify Identity"
                        render={(props) => <VerifyIdentity  {...this.state} onClickChangeStep={this.onClickChangeStep} {...this.props} />} />
                    <Route path={`${this.props.match.url}/income-verify`}
                        exact
                        name="Income Verification"
                        render={(props) => <IncomeVerification  {...this.state} onClickChangeStep={this.onClickChangeStep} {...this.props} />} />
                    <Route path={`${this.props.match.url}/loan-payment`}
                        exact
                        name="Loan Payment Detail"
                        render={(props) => <LoanPaymentDetail  {...this.state} {...this.props} onClickChangeStep={this.onClickChangeStep} />} />
                    <Route path={`${this.props.match.url}/loan-document`}
                        exact
                        name="Loan Payment Detail"
                        render={(props) => <LoanDocument  {...this.state} {...this.props} _handleloanDocChange={this._handleloanDocChange} deleteLoanDoc={this.deleteLoanDoc} dowload_files={this.dowload_files} />} />
                    <Route path={`${this.props.match.url}/upload-doc`}
                        exact
                        name="Upload Doc"
                        render={(props) => <UploadDoc  {...this.state} {...this.props} _handleUploadDocChange={this._handleUploadDocChange} deleteUploadDoc={this.deleteUploadDoc} dowload_files={this.dowload_files} />} />
                </Switch>
            </div>
        </React.Fragment >)
    }
}
const mapStateToProps = (state) => {
    return {
        type_of_vehicles: state.adPostReducers.addPostReducer.type_of_vehicle,
        addtional_types: state.adPostReducers.editPostAppReducer.addtional_types,
        application_detail: state.adPostReducers.editPostAppReducer.application_detail,
        vehicle_makes: state.adPostReducers.editPostAppReducer.vehicle_makes,
        vehicle_models: state.adPostReducers.editPostAppReducer.vehicle_models,
        vehicle_trims: state.adPostReducers.editPostAppReducer.vehicle_trims,
        loading_update: state.adPostReducers.editPostAppReducer.loading_update,
        updateBuyerApplicationPersonal: state.adPostReducers.editPostAppReducer.updateBuyerApplicationPersonal,
        updateBuyerApplicationEmployement: state.adPostReducers.editPostAppReducer.updateBuyerApplicationEmployement,
        updateCoBuyerApplicationPersonal: state.adPostReducers.editPostAppReducer.updateCoBuyerApplicationPersonal,
        updateCoBuyerApplicationEmployement: state.adPostReducers.editPostAppReducer.updateCoBuyerApplicationEmployement,
        updateAssetsDetail: state.adPostReducers.editPostAppReducer.updateAssetsDetail,
        updateSellerDetail: state.adPostReducers.editPostAppReducer.updateSellerDetail,
        updateAddtionalInfo: state.adPostReducers.editPostAppReducer.updateAddtionalInfo,
        deleteAddtionalInfo: state.adPostReducers.editPostAppReducer.deleteAddtionalInfo,
        loading_delete_addtional: state.adPostReducers.editPostAppReducer.loading_delete_addtional,
        deleteVehicleDetail: state.adPostReducers.editPostAppReducer.deleteVehicleDetail,
        loading_delete_vehicle: state.adPostReducers.editPostAppReducer.loading_delete_vehicle,
        deleteUploadedDoc: state.adPostReducers.editPostAppReducer.deleteUploadedDoc,
        loading_delete_uploaded_doc: state.adPostReducers.editPostAppReducer.loading_delete_uploaded_doc,
        loadingFlinksRequestId: state.adPostReducers.editPostAppReducer.loadingFlinksRequestId,
        loadingFlinksLogin: state.adPostReducers.editPostAppReducer.loadingFlinksLogin,
        flinks_login_id: state.adPostReducers.editPostAppReducer.flinks_login_id,
        flinks_login_response: state.adPostReducers.editPostAppReducer.flinks_login_response,
        delete_doc_id: state.adPostReducers.editPostAppReducer.delete_doc_id,
    }
}
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
    delete_vehicle_detail,
    delete_upload_doc,
    get_login_id_flinks,
    login_flinks
})(EditApplication);