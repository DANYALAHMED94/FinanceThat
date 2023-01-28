import React, { Component } from 'react'
import BuyerApplicationDetail from '../../components/DealerApplication/BuyerApplicationDetail'
import CoApplicant from '../../components/DealerApplication/CoApplicant'
import AssetDetail from '../../components/DealerApplication/AssetDetail'
import AdditionalItems from '../../components/DealerApplication/AdditionalItems'
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
    login_flinks,
    get_stock_id_detail,
    delete_coApplicant
} from '../../actions/editPostAppActions'
import moment from 'moment'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { API_URL } from '../../constant'
import { history } from '../../_helpers/history'
import { Helmet } from 'react-helmet';
import PageNotFound404 from '../404page/pageNotFound404'

class DealerEditPostApp extends Component {
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
            sellerTelephone: '',
            sellerEmail: '',
            sellerCity: '',
            //  AddtionalInformation
            addtionalTypes: [],
            addtionalInformation: [{ infoProvider: '', infoCost: '', selectedProductType: '', productType: '', new: true, id: '', is_updated: false }],
            addtionalDeletedId: '',
            // Co Applicant
            coApplicant: false,
            coApplicantId: '',
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
            postApp: [{ id: 1, name: 'Applicant Details', active: true, disbaled: false, path: `${this.props.match.url}/applicant-detail`, pending: false },
            { id: 2, name: 'Co Applicant', active: false, disbaled: false, path: `${this.props.match.url}/co-applicant`, pending: false },
            { id: 3, name: 'Asset Detail', active: false, disbaled: false, path: `${this.props.match.url}/assets-detail`, pending: false },
            { id: 4, name: 'Additional Items', active: false, disbaled: false, path: `${this.props.match.url}/additional-item`, pending: false }],
            step: 1,
            lastStep: 1,
            applicationStatus: '',
            created_at: '',
            loan_amount: 0,
            //States
            approvedAmount: '',
            downPayment: '',
            financingAmount: '',
            applicantEmail: '',
            amortization: '',
            interestRate: '',
            grossMonthlyIncomeSlider: 0,
            coApplicantDefaultGrossMonthlyIncome: 0,
            stockIndex: '',
            firstTypeOfVehicle: '',
            jumio_url: '',
            photo: '',
        }
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
        if (localStorage.getItem('lastStepDealerPostAppEdit')) {
            lastStep = localStorage.getItem('lastStepDealerPostAppEdit')
        }
        if (localStorage.getItem('coApplicantDealerEditPostApp')) {
            coApplicant = Boolean(localStorage.getItem('coApplicantDealerEditPostApp'))
        }
        this.setState({
            ...this.state,
            yearsDropDown: years,
            lastStep: lastStep,
            coApplicant: coApplicant,
            postApp: this.state.postApp.slice().map(item => {
                if (item.path === this.props.location.pathname) {
                    return {
                        ...item,
                        active: true
                    }
                }
                return {
                    ...item, active: false
                }
            })
            // postApp: this.state.postApp.slice().map(item => {
            //     if (Number(item.id) <= Number(lastStep)) {
            //         if (item.id === 2) {
            //             return {
            //                 ...item,
            //                 active: coApplicant,
            //                 // active: item.id !== 2 ? true : coApplicant,
            //                 disbaled: false
            //             }
            //         } else {
            //             return {
            //                 ...item,
            //                 active: true,
            //                 // active: item.id !== 2 ? true : coApplicant,
            //                 disbaled: false
            //             }
            //         }

            //     }
            //     return item
            // })
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
    onClickChangeStep = (step) => {
        if (step === 2) {
            localStorage.setItem('coApplicantDealerEditPostApp', true)
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
                    // return item
                    return {
                        ...item,
                        active: false
                    }
                })
            })
        } else {
            this.setState({
                ...this.state,
                step: step,
                postApp: this.state.postApp.slice().map(item => {
                    // if (Number(item.id) <= Number(step)) {
                    if (Number(item.id) == Number(step)) {
                        return {
                            ...item,
                            active: item.id !== 2 ? true : this.state.coApplicant,
                            disbaled: false
                        }
                    }
                    // return item
                    return {
                        ...item,
                        active: false
                    }
                })
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
            let firstTypeOfVehicle = this.props.application_detail ? this.props.application_detail.vehicle && this.props.application_detail.vehicle.length > 0 ? (this.props.application_detail.vehicle || [])[0] ? typeOfVehicle.filter(item => Number(item.value) === Number((this.props.application_detail.vehicle || [])[0].type_of_vehicle)).map(item => { return item.label }) : '' : '' : ''
            this.setState({
                ...this.state,
                vehicleOptions: typeOfVehicle,
                firstTypeOfVehicle: firstTypeOfVehicle && firstTypeOfVehicle.length > 0 ? firstTypeOfVehicle[0] : '',
                assetsDetails: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.vehicle !== undefined && this.props.application_detail.vehicle !== null && this.props.application_detail.vehicle.length > 0 ? (this.props.application_detail.vehicle || []).map(item => {
                    return {
                        ...item,
                        vehicleType: item.type_of_vehicle !== undefined && item.type_of_vehicle !== null ? item.type_of_vehicle : '',
                        selectedVehicle: item.type_of_vehicle !== undefined && item.type_of_vehicle !== null ? (typeOfVehicle || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== undefined && (typeOfVehicle || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== null && (typeOfVehicle || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)).length > 0 ? (typeOfVehicle || []).filter(typeVehcile => { return Number(typeVehcile.value) === Number(item.type_of_vehicle) })[0] : '' : '',
                        is_updated: true, new: false
                    }
                }
                ) : [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', selectedMake: '', mode: '', selectedModel: '', trim: '', selectedTrim: '', kilometer: '', vin: '', price: '', condition: '', is_updated: false, new: true }] : [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', selectedMake: '', mode: '', selectedModel: '', trim: '', selectedTrim: '', kilometer: '', vin: '', price: '', condition: '', is_updated: false, new: true }],
                assetsDetailsForm: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.vehicle !== undefined && this.props.application_detail.vehicle !== null && this.props.application_detail.vehicle.length > 0 ? (this.props.application_detail.vehicle || []).map(item => {
                    return {
                        ...item,
                        vehicleType: item.type_of_vehicle !== undefined && item.type_of_vehicle !== null ? item.type_of_vehicle : '',
                        selectedVehicle: item.type_of_vehicle !== undefined && item.type_of_vehicle !== null ? (typeOfVehicle || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== undefined && (typeOfVehicle || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== null && (typeOfVehicle || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)).length > 0 ? (typeOfVehicle || []).filter(typeVehcile => { return Number(typeVehcile.value) === Number(item.type_of_vehicle) })[0] : '' : '',
                        is_updated: true, new: false,
                        // vehicleMakes: [], vehicleModel: [], vehicleTrims: [], selectedModel: '',
                        // selectedTrim: '',
                        // selectedCondition: '',
                        //  selectedMake: ''
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
            // let defaultLoanAmount = this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.financing_amount != undefined && this.props.application_detail.financing_amount != null ? (this.props.application_detail.financing_amount / 100) : 0 : 0
            let defaultLoanAmount = this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.financing_amount != undefined && this.props.application_detail.financing_amount != null ? (this.props.application_detail.financing_amount) : 0 : 0

            // defaultLoanAmount = defaultLoanAmount ? defaultLoanAmount * 13 : 0
            // defaultLoanAmount = defaultLoanAmount ? Number(financing_amount) + defaultLoanAmount + 1099 : 0

            let firstTypeOfVehicle = this.props.application_detail ? this.props.application_detail.vehicle && this.props.application_detail.vehicle.length > 0 ? (this.props.application_detail.vehicle || [])[0] ? (this.state.vehicleOptions || []).filter(item => Number(item.value) === Number((this.props.application_detail.vehicle || [])[0].type_of_vehicle)).map(item => { return item.label }) : '' : '' : ''

            let applicantDateOfBirth = this.props.application_detail.dob !== undefined && this.props.application_detail.dob !== null && this.props.application_detail.dob !== '' ? (this.props.application_detail.dob) : ''
            applicantDateOfBirth = applicantDateOfBirth ? applicantDateOfBirth.split('T') : ''
            applicantDateOfBirth = applicantDateOfBirth && applicantDateOfBirth.length > 0 ? applicantDateOfBirth[0] : applicantDateOfBirth
            applicantDateOfBirth = applicantDateOfBirth ? new Date(applicantDateOfBirth + 'T00:00:00') : applicantDateOfBirth

            let employmentSince = this.props.application_detail.employment_since !== undefined && this.props.application_detail.employment_since !== null && this.props.application_detail.employment_since !== '' ? (this.props.application_detail.employment_since) : ''
            employmentSince = employmentSince ? employmentSince.split('T') : ''
            employmentSince = employmentSince && employmentSince.length > 0 ? employmentSince[0] : employmentSince
            employmentSince = employmentSince ? new Date(employmentSince + 'T00:00:00') : employmentSince


            let coApplicantDate = this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.dob !== undefined && this.props.application_detail.co_applicant.dob !== null && this.props.application_detail.co_applicant.dob !== '' ? (this.props.application_detail.co_applicant.dob) : '' : '' : ''
            coApplicantDate = coApplicantDate ? coApplicantDate.split('T') : ''
            coApplicantDate = coApplicantDate && coApplicantDate.length > 0 ? coApplicantDate[0] : coApplicantDate
            coApplicantDate = coApplicantDate ? new Date(coApplicantDate + 'T00:00:00') : coApplicantDate

            let coApplicantEmploymentSince = this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.employment_since !== undefined && this.props.application_detail.co_applicant.employment_since !== null && this.props.application_detail.co_applicant.employment_since !== '' ? this.props.application_detail.co_applicant.employment_since : '' : '' : ''
            coApplicantEmploymentSince = coApplicantEmploymentSince ? coApplicantEmploymentSince.split('T') : ''
            coApplicantEmploymentSince = coApplicantEmploymentSince && coApplicantEmploymentSince.length > 0 ? coApplicantEmploymentSince[0] : coApplicantEmploymentSince
            coApplicantEmploymentSince = coApplicantEmploymentSince ? new Date(coApplicantEmploymentSince + 'T00:00:00') : coApplicantEmploymentSince

            this.setState({
                ...this.state,
                buyerAppId: this.props.application_detail.id !== undefined && this.props.application_detail.id !== null ? this.props.application_detail.id : '',
                applicantFirstName: this.props.application_detail.first_name !== undefined && this.props.application_detail.first_name !== null ? this.props.application_detail.first_name : '',
                applicantLastName: this.props.application_detail.last_name !== undefined && this.props.application_detail.last_name !== null ? this.props.application_detail.last_name : '',
                applicantDateOfBirth: applicantDateOfBirth,
                // this.props.application_detail.dob !== undefined && this.props.application_detail.dob !== null && this.props.application_detail.dob !== '' ? new Date(this.props.application_detail.dob+'T00:00:00') : '',
                applicantTelephone: this.props.application_detail.telephone !== undefined && this.props.application_detail.telephone !== null ? this.props.application_detail.telephone : '',
                applicantAddress: this.props.application_detail.address !== undefined && this.props.application_detail.address !== null ? { label: this.props.application_detail.address, value: {} } : '',
                applicantStreetAddress: this.props.application_detail.street_address !== undefined && this.props.application_detail.street_address !== null ? this.props.application_detail.street_address : '',
                // applicantLocationName: this.props.application_detail.address !== undefined && this.props.application_detail.address !== null ? this.props.application_detail.address : '',
                applicantLocationName: this.props.application_detail.street_address !== undefined && this.props.application_detail.street_address !== null ? this.props.application_detail.street_address : '',
                applicantCity: this.props.application_detail.city !== undefined && this.props.application_detail.city !== null ? this.props.application_detail.city : '',
                applicantProvince: this.props.application_detail.province !== undefined && this.props.application_detail.province !== null ? this.props.application_detail.province : '',
                selectedProvince: this.props.application_detail.province !== undefined && this.props.application_detail.province !== null ? (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.province }) !== undefined && (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.province }) !== null && (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.province }).length > 0 ? (this.state.provinces || []).filter(item => { return item.value === this.props.application_detail.province })[0] : '' : '',
                applicantPostalCode: this.props.application_detail.postal_code !== undefined && this.props.application_detail.postal_code !== null ? this.props.application_detail.postal_code : '',
                applicantCountry: this.props.application_detail.country !== undefined && this.props.application_detail.country !== null ? this.props.application_detail.country : '',
                employmentStatus: this.props.application_detail.employement_status !== undefined && this.props.application_detail.employement_status !== null ? this.props.application_detail.employement_status : '',
                selectEmploymentStatus: this.props.application_detail.employement_status !== undefined && this.props.application_detail.employement_status !== null ? (this.state.employmentStatuses || []).filter(item => { return item.value === this.props.application_detail.employement_status }) !== undefined && (this.state.employmentStatuses || []).filter(item => { return item.value === this.props.application_detail.employement_status }) !== null && (this.state.employmentStatuses || []).filter(item => { return item.value === this.props.application_detail.employement_status }).length > 0 ? (this.state.employmentStatuses || []).filter(item => { return item.value === this.props.application_detail.employement_status })[0] : '' : '',
                typeOfEmployment: this.props.application_detail.type_of_employment !== undefined && this.props.application_detail.type_of_employment !== null ? this.props.application_detail.type_of_employment : '',
                // selectedTypeOfEmployment: this.props.application_detail.type_of_employment !== undefined && this.props.application_detail.type_of_employment !== null ? (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.type_of_employment }) !== undefined && (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.type_of_employment }) !== null && (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.type_of_employment }).length > 0 ? (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.type_of_employment })[0] : '' : '',
                selectedTypeOfEmployment: this.props.application_detail.type_of_employment !== undefined && this.props.application_detail.type_of_employment !== null ? (this.state.typeOfEmployments || []).filter(item => { return (item.value).toLowerCase() === (this.props.application_detail.type_of_employment).toLowerCase() }) !== undefined && (this.state.typeOfEmployments || []).filter(item => { return (item.value).toLowerCase() === (this.props.application_detail.type_of_employment).toLowerCase() }) !== null && (this.state.typeOfEmployments || []).filter(item => { return (item.value).toLowerCase() === (this.props.application_detail.type_of_employment).toLowerCase() }).length > 0 ? (this.state.typeOfEmployments || []).filter(item => { return (item.value).toLowerCase() === (this.props.application_detail.type_of_employment).toLowerCase() })[0] : '' : '',
                employerName: this.props.application_detail.employer_name !== undefined && this.props.application_detail.employer_name !== null ? this.props.application_detail.employer_name : '',
                occupation: this.props.application_detail.occupation !== undefined && this.props.application_detail.occupation !== null ? this.props.application_detail.occupation : '',
                employmentSince: employmentSince,
                // this.props.application_detail.employment_since !== undefined && this.props.application_detail.employment_since !== null && this.props.application_detail.employment_since !== '' ? new Date(this.props.application_detail.employment_since+'T00:00:00') : '',
                grossMonthlyIncome: this.props.application_detail.gross_income !== undefined && this.props.application_detail.gross_income !== null ? this.props.application_detail.gross_income : '',
                grossMonthlyIncomeSlider: this.props.application_detail.gross_income !== undefined && this.props.application_detail.gross_income !== null ? this.props.application_detail.gross_income : '',
                // Vehicle Data
                assetsDetails: this.props.application_detail ? this.props.application_detail.vehicle && this.props.application_detail.vehicle.length > 0 ? (this.props.application_detail.vehicle || []).map(item => {
                    return {
                        id: item.id ? item.id : '', vehicleType: item.type_of_vehicle ? item.type_of_vehicle : '', selectedVehicle: item.type_of_vehicle ? (this.state.vehicleOptions || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== undefined && (this.state.vehicleOptions || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== null && (this.state.vehicleOptions || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)).length > 0 ? (this.state.vehicleOptions || []).filter(typeVehcile => { return Number(typeVehcile.value) === Number(item.type_of_vehicle) })[0] : '' : '',
                        stockNumber: item.stock_id ? item.stock_id : '',
                        //  stockNumber: this.props.application_detail ? this.props.application_detail.stock && Object.keys(this.props.application_detail.stock).length > 0 ? this.props.application_detail.stock.stock_id ? this.props.application_detail.stock.stock_id : '' : '' : '',
                        year: item.year ? item.year : '', selectedYear: item.year !== undefined && item.year !== null ? { value: item.year, label: item.year } : '', make: item.make ? item.make : '', model: item.model ? item.model : '', trim: item.trim ? item.trim : '', kilometer: item.kilometer ? item.kilometer : '', vin: item.vin ? item.vin : '', price: this.props.application_detail !== undefined && item !== null ? item.price ? item.price : '' : '', condition: this.props.application_detail !== undefined && item !== null ? item.condition ? item.condition : '' : '', selectedCondition: this.props.application_detail !== undefined && item !== null ? item.condition !== undefined && item.condition !== null ? { value: item.condition, label: item.condition } : '' : '', is_updated: true, new: false
                    }
                }
                ) : [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', mode: '', trim: '', kilometer: '', vin: '', price: '', condition: '', is_updated: false, new: true }] : [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', mode: '', trim: '', kilometer: '', vin: '', price: '', condition: '', is_updated: false, new: true }],
                assetsDetailsForm: this.props.application_detail ? this.props.application_detail.vehicle && this.props.application_detail.vehicle.length > 0 ? (this.props.application_detail.vehicle || []).map(item => {
                    return {
                        id: item.id ? item.id : '', vehicleType: item.type_of_vehicle ? item.type_of_vehicle : '', selectedVehicle: item.type_of_vehicle ? (this.state.vehicleOptions || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== undefined && (this.state.vehicleOptions || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)) !== null && (this.state.vehicleOptions || []).filter(typeVehcile => Number(typeVehcile.value) === Number(item.type_of_vehicle)).length > 0 ? (this.state.vehicleOptions || []).filter(typeVehcile => { return Number(typeVehcile.value) === Number(item.type_of_vehicle) })[0] : '' : '',
                        stockNumber: item.stock_id ? item.stock_id : '',
                        // stockNumber: this.props.application_detail ? this.props.application_detail.stock && Object.keys(this.props.application_detail.stock).length > 0 ? this.props.application_detail.stock.stock_id ? this.props.application_detail.stock.stock_id : '' : '' : '',
                        year: item.year ? item.year : '', selectedYear: item.year ? { value: item.year, label: item.year } : '', make: this.props.application_detail !== undefined && item !== null ? item.make ? item.make : '' : '', model: this.props.application_detail !== undefined && item !== null ? item.model ? item.model : '' : '', trim: this.props.application_detail !== undefined && item !== null ? item.trim ? item.trim : '' : '', kilometer: this.props.application_detail !== undefined && item !== null ? item.kilometer ? item.kilometer : '' : '', vin: this.props.application_detail !== undefined && item !== null ? item.vin ? item.vin : '' : '', price: item.price ? item.price : '', condition: item.condition !== undefined && item.condition !== null ? item.condition : '', selectedCondition: item.condition !== undefined && item.condition !== null ? { value: item.condition, label: item.condition } : '', is_updated: true, new: false
                    }
                }) : [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', model: '', trim: '', kilometer: '', vin: '', price: '', condition: '', selectedCondition: '', is_updated: false, new: true }] : [{ id: '', vehicleType: '', selectedVehicle: '', stockNumber: '', year: '', selectedYear: '', make: '', model: '', trim: '', kilometer: '', vin: '', price: '', condition: '', selectedCondition: '', is_updated: false, new: true }],
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
                sellerTelephone: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.seller !== null ? this.props.application_detail.seller.telephone !== undefined && this.props.application_detail.seller.telephone !== null ? this.props.application_detail.seller.telephone : '' : '' : '',
                sellerEmail: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.seller !== null ? this.props.application_detail.seller.email !== undefined && this.props.application_detail.seller.email !== null ? this.props.application_detail.seller.email : '' : '' : '',
                sellerCity: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.seller !== null ? this.props.application_detail.seller.city !== undefined && this.props.application_detail.seller.city !== null ? this.props.application_detail.seller.city : '' : '' : '',
                //  AddtionalInformation
                addtionalInformation: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.seller !== undefined && this.props.application_detail.additional_item !== undefined && this.props.application_detail.additional_item !== null && this.props.application_detail.additional_item.length > 0 ? this.props.application_detail.additional_item.map(item => { return { infoProvider: item.provider, infoCost: item.cost, selectedProductType: this.props.addtional_types !== undefined && this.props.addtional_types !== null && this.props.addtional_types.length > 0 ? this.props.addtional_types.filter(ad => Number(ad.id) === Number(item.type)).map(add => { return { value: add.id, label: add.type } })[0] : '', productType: item.type, id: item.id, new: false, is_updated: true } }) : [{ infoProvider: '', infoCost: '', selectedProductType: '', productType: '', id: '', new: true }] : [{ infoProvider: '', infoCost: '', selectedProductType: '', productType: '', id: '', new: true, is_updated: false }],
                // Co Applicant
                coApplicant: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null && Object.keys(this.props.application_detail.co_applicant).length > 0 ? true : false : false,
                coApplicantId: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.id !== undefined && this.props.application_detail.co_applicant.id !== null ? this.props.application_detail.co_applicant.id : '' : '' : '',
                coApplicantFirstName: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.first_name !== undefined && this.props.application_detail.co_applicant.first_name !== null ? this.props.application_detail.co_applicant.first_name : '' : '' : '',
                coApplicantLastName: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.last_name !== undefined && this.props.application_detail.co_applicant.last_name !== null ? this.props.application_detail.co_applicant.last_name : '' : '' : '',
                coApplicantDateOfBirth: coApplicantDate,
                // this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.dob !== undefined && this.props.application_detail.co_applicant.dob !== null && this.props.application_detail.co_applicant.dob !== '' ? new Date(this.props.application_detail.co_applicant.dob+'T00:00:00') : '' : '' : '',
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
                selectedCoApplicantTypeOfEmployment: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.type_of_employment !== undefined && this.props.application_detail.co_applicant.type_of_employment !== null ? (this.state.typeOfEmployments || []).filter(item => { return (item.value).toLowerCase() === (this.props.application_detail.co_applicant.type_of_employment).toLowerCase() }) !== undefined && (this.state.typeOfEmployments || []).filter(item => { return (item.value).toLowerCase() === (this.props.application_detail.co_applicant.type_of_employment).toLowerCase() }) !== null && (this.state.typeOfEmployments || []).filter(item => { return (item.value).toLowerCase() === (this.props.application_detail.co_applicant.type_of_employment).toLowerCase() }).length > 0 ? (this.state.typeOfEmployments || []).filter(item => { return (item.value).toLowerCase() === (this.props.application_detail.co_applicant.type_of_employment).toLowerCase() })[0] : '' : '' : '' : '',
                // selectedCoApplicantTypeOfEmployment: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.type_of_employment !== undefined && this.props.application_detail.co_applicant.type_of_employment !== null ? (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.co_applicant.type_of_employment }) !== undefined && (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.co_applicant.type_of_employment }) !== null && (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.co_applicant.type_of_employment }).length > 0 ? (this.state.typeOfEmployments || []).filter(item => { return item.value === this.props.application_detail.co_applicant.type_of_employment })[0] : '' : '' : '' : '',
                coApplicantEmployerName: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.employer_name !== undefined && this.props.application_detail.co_applicant.employer_name !== null ? this.props.application_detail.co_applicant.employer_name : '' : '' : '',
                coApplicantOccupation: this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.occupation !== undefined && this.props.application_detail.co_applicant.occupation !== null ? this.props.application_detail.co_applicant.occupation : '' : '' : '',
                coApplicantEmploymentSince: coApplicantEmploymentSince,
                // this.props.application_detail !== undefined && this.props.application_detail !== null ? this.props.application_detail.co_applicant !== null && this.props.application_detail.co_applicant !== null ? this.props.application_detail.co_applicant.employment_since !== undefined && this.props.application_detail.co_applicant.employment_since !== null && this.props.application_detail.co_applicant.employment_since !== '' ? new Date(this.props.application_detail.co_applicant.employment_since+'T00:00:00') : '' : '' : '',
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
                downPayment: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.down_payment != undefined && this.props.application_detail.down_payment != null ? this.props.application_detail.down_payment : '' : '',
                financingAmount: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.financing_amount != undefined && this.props.application_detail.financing_amount != null ? this.props.application_detail.financing_amount : '' : '',
        applicantEmail: this.props.application_detail.applicant_email_by_dealer,
                
                // applicantEmail: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.user != undefined && this.props.application_detail.user != null && Object.keys(this.props.application_detail.user).length > 0 ? Number(this.props.application_detail.user.id) === -99 ? this.props.application_detail.email_address ? this.props.application_detail.email_address : '' : this.props.application_detail.user.email !== undefined && this.props.application_detail.user !== null ? this.props.application_detail.user.email : '' : '' : '',
                amortization: this.props.application_detail ? this.props.application_detail.amortization ? Number(this.props.application_detail.amortization) : 'N/A' : 'N/A',
                interestRate: this.props.application_detail ? this.props.application_detail.interest_rate ? Number(this.props.application_detail.interest_rate) : 'N/A' : 'N/A',
                created_at: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.created_at != undefined && this.props.application_detail.created_at != null ? this.props.application_detail.created_at : '' : '',
                loan_amount: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.loan_amount != undefined && this.props.application_detail.loan_amount != null ? this.props.application_detail.loan_amount : defaultLoanAmount : defaultLoanAmount,
                // Loan Doc
                loanDoc: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.loan_document != undefined && this.props.application_detail.loan_document != null ? this.props.application_detail.loan_document : '' : '',
                firstTypeOfVehicle: firstTypeOfVehicle,
                jumio_url: this.props.application_detail != undefined && this.props.application_detail != null ? this.props.application_detail.jumio_url != undefined && this.props.application_detail.jumio_url != null ? this.props.application_detail.jumio_url : '' : '',
                photo: this.props.application_detail ? this.props.application_detail.user ? this.props.application_detail.user.photo ? this.props.application_detail.user.photo : '' : '' : '',
                postApp: this.state.postApp.slice().map(item => {
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
                            disbaled: this.props.application_detail ? this.props.application_detail.co_applicant && Object.keys(this.props.application_detail.co_applicant).length > 0 ? false : true : true,
                            pending:
                                this.props?.application_detail?.co_applicant ? Object.keys(this.props?.application_detail?.co_applicant).length > 0
                                    ? true
                                    : false : false
                        }
                    }
                    if (item.id === 3) {
                        return {
                            ...item,
                            disbaled: false,
                            done:

                                (this.props.application_detail != undefined &&
                                    this.props.application_detail != null
                                    ? this.props.application_detail.assets_complete !=
                                        undefined &&
                                        this.props.application_detail.assets_complete != null
                                        ? this.props.application_detail.assets_complete
                                        : false
                                    : false),

                            pending:
                                this.props?.application_detail?.vehicle?.length > 0
                                    ? true
                                    : false

                        };
                    }
                    return item
                })
            })
        }
        if (prevState.step !== this.state.step && this.state.step > this.state.lastStep) {
            this.setState({
                ...this.state,
                lastStep: this.state.step
            })
            localStorage.setItem('lastStepDealerPostAppEdit', this.state.step)
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
        if (prevProps.stock_detail !== this.props.stock_detail && this.props.stock_detail && this.props.stock_detail.length > 0) {
            let assetsDetails = this.state.assetsDetails.slice()
            let assetsDetailsForm = this.state.assetsDetailsForm.slice()
            this.props.stock_detail.map(item => {
                assetsDetails = assetsDetails.map((asst, index) => {
                    if (Number(index) === Number(this.state.stockIndex)) {
                        return {
                            ...asst,
                            selectedVehicle: { value: item.category ? item.category.id : '', label: item.category ? item.category.name : '' },
                            vehicleType: item.category ? item.category.id : '',
                            make: item.make ? item.make.make_name : '',
                            model: item.model ? item.model.model_make : "",
                            // trim: item.trim ? item.trim.v_trim : '',
                            trim: item.trim ? item.trim : '',
                            price: item.price,
                            kilometer: item.kilometer,
                            vin: item.vin,
                            year: item.year,
                            selectedYear: { value: item.year, label: item.year },
                            condition: item.v_condition,
                            selectedCondition: { value: item.v_condition, label: item.v_condition }
                        }
                    }
                    return asst
                })
            })
            this.props.stock_detail.map(item => {
                assetsDetailsForm = assetsDetailsForm.map((asst, index) => {
                    if (Number(index) === Number(this.state.stockIndex)) {
                        return {
                            ...asst,
                            selectedVehicle: { value: item.category ? item.category.id : '', label: item.category ? item.category.name : '' },
                            vehicleType: item.category ? item.category.id : '',
                            make: item.make ? item.make.make_name : '',
                            model: item.model ? item.model.model_make : "",
                            // trim: item.trim ? item.trim.v_trim : '',
                            trim: item.trim ? item.trim : '',
                            price: item.price,
                            kilometer: item.kilometer,
                            vin: item.vin,
                            year: item.year,
                            selectedYear: { value: item.year, label: item.year },
                            condition: item.v_condition,
                            selectedCondition: { value: item.v_condition, label: item.v_condition }
                        }
                    }
                    return asst
                })
            })
            this.setState({
                ...this.state,
                assetsDetails,
                assetsDetailsForm
            })
        }
        if (prevProps.co_applicant_delete !== this.props.co_applicant_delete) {
            this.setState({
                ...this.state,
                coApplicant: false,
                coApplicantId: '',
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
                coApplicantGrossMonthlyIncome: 0,
                coApplicantDefaultGrossMonthlyIncome: 0,
            })
            history.push(`${this.state.url}/applicant-detail`)
        }
    }
    // removeCoApplicant = (step) => {
    removeCoApplicant = (coApplicantId) => {
        localStorage.removeItem('coApplicantDealerEditPostApp')
        if (coApplicantId) {
            this.props.delete_coApplicant(coApplicantId)
        }
        this.setState({
            ...this.state,
            // step: step,
            step: 1,
            coApplicant: true,
            postApp: this.state.postApp.slice().map(item => {
                // if (Number(item.id) === Number(step)) {
                if (Number(item.id) === Number(1)) {
                    return {
                        ...item,
                        active: true,
                        disbaled: false
                    }
                }
                return {
                    ...item,
                    active: item.id === 2 ? false : item.active,
                    // disbaled: true
                    disbaled: item.id === 2 ? true : false
                }
            })
        })
        if (!coApplicantId) {
            history.push(`${this.state.url}/applicant-detail`)
        }

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
    emptyFun = () => {
        return true
    }
    handleOnBlurStock = (id, index) => {
        this.setState({
            ...this.state,
            stockIndex: index
        })
        this.props.get_stock_id_detail(id)
    }
    render() {
        console.log(this.state, 'dadasdasdasdasdasdasdasdsad')
        console.log(this.props, 'dadasdasdasdasdasdasdasdsad')
        if(this.props.showNotFound){
            return (
              <PageNotFound404 />
            )
          }
        return (<React.Fragment>
            <Helmet>
                <title>Application Detail</title>
                <meta name="description" content="" />
            </Helmet>
            <div className="app-form-main clearfix">
                <Link className="back" to="/buyer/my-application"> Back to Dashboard</Link>
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
                                {/* <span className="monthly">  {this.state.loan_amount !== null && this.state.loan_amount !== '' ? new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }
                                ).format(Number(this.state.loan_amount))// '$100.00'
                                    : new Intl.NumberFormat('en-US',
                                        { style: 'currency', currency: 'USD' }
                                    ).format(0)} Monthly </span> */}
                            </div>
                            <div className="application-status">
                                <p> Application Status </p>
                                {Number(this.state.applicationStatus) === Number('1') ? (
                                    <React.Fragment>
                                        <span className="status unverified"> Credit Unknown  </span>
                                    </React.Fragment>) : Number(this.state.applicationStatus) === Number('2') ? (
                                        <React.Fragment>
                                            <span className="status conditionally-approved"> Conditionally approved </span>
                                        </React.Fragment>) : Number(this.state.applicationStatus) === Number('3') ? (
                                            <React.Fragment>
                                                <span className="status pre-approved"> Pre-approved </span>
                                            </React.Fragment>) : Number(this.state.applicationStatus) === Number('4') ? (
                                                <React.Fragment>
                                                    <span className="status declinded"> Declined </span>
                                                </React.Fragment>) : Number(this.state.applicationStatus) === Number('5') ? (
                                                    <React.Fragment>
                                                        <span className="status approved"> Approved </span>
                                                    </React.Fragment>) : Number(this.state.applicationStatus) === Number('6') ? (
                                                        <React.Fragment>
                                                            <span className="status funded"> Booked </span>
                                                        </React.Fragment>) : Number(this.state.applicationStatus) === Number('7') ? (
                                                            <React.Fragment>
                                                                <span className="status withdraw"> Withdraw </span>
                                                            </React.Fragment>) : (
                                    <React.Fragment>
                                        <span className="status declinded"> {this.state.applicationStatus === 'pending' ? 'Credit Unknown' : this.state.applicationStatus}  </span>
                                    </React.Fragment>)}
                            </div>
                        </div>
                        <div className="sidebar-nav-holder">
                            <ul className="nav-list">
                                {/* {(this.state.postApp || []).map((item, index) => (
                                    <li className={item.active === true ? "nav-list-item done" : "nav-list-item"} key={index} onClick={() => this.onClickChangeStep(item.id)}> <Link className="nav-link" to={item.path}> <span className="status-circle"> <i class="fa fa-check"></i> </span> {item.name} </Link> </li>
                                ))} */}
                                {(this.state.postApp || []).map((item, index) => (
                                    <li
                                        className={
                                            item.disbaled
                                                ? "nav-list-item disable"
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
                                    // <li className={item.done === true ? "nav-list-item done" : item.active === true ? "nav-list-item active" : item.disbaled ? "nav-list-item disable" : "nav-list-item not_done"} key={index} onClick={item.disbaled ? this.emptyFun : () => this.onClickChangeStep(item.id)}> <Link className="nav-link" to={item.disbaled ? '#' : item.path}> <span className="status-circle">  {item.disbaled ? (
                                    //     <i class="fa fa-check"></i>
                                    // ) : item.done === true ? (
                                    //     <i class="fa fa-check"></i>
                                    // ) : item.pending === true ? (
                                    //     <img
                                    //         src="/assets/image/applicationClock.svg"
                                    //         alt="img"
                                    //         className="mb-1"
                                    //     />
                                    // ) : item.active ? (
                                    //     <i class="fa fa-check" style={{ color: '#fff' }}></i>
                                    // ) : (
                                    //     <i class="fa fa-check"></i>
                                    // )} </span> {item.name} </Link> </li>
                                ))}

                            </ul>
                            {/* <Link className="upload-document" to={`${this.props.match.url}/upload-doc`}> <span className="text-holder"> Upload Documents </span> </Link> */}
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
                        render={(props) => <CoApplicant handleOnChange={this.handleOnChange} {...this.state} {...this.props} handleOnChangeDates={this.handleOnChangeDates} handleLocationChange={this.handleLocationChange} changeSelect={this.changeSelect} onClickChangeStep={this.onClickChangeStep} removeCoApplicant={this.removeCoApplicant} />} />
                    <Route path={`${this.props.match.url}/assets-detail`}
                        exact
                        name="Assets Detail"
                        render={(props) => <AssetDetail handleOnChange={this.handleOnChange} {...this.state} {...this.props} changeSelectAssets={this.changeSelectAssets} handleOnChangeAssets={this.handleOnChangeAssets} addAssets={this.addAssets} deleteAsset={this.deleteAsset}
                            handleLocationChange={this.handleLocationChange} onClickChangeStep={this.onClickChangeStep} handleOnBlurStock={this.handleOnBlurStock} />} />
                    <Route path={`${this.props.match.url}/additional-item`}
                        exact
                        name="Additional Items"
                        render={(props) => <AdditionalItems handleOnChange={this.handleOnChange} {...this.state} {...this.props} changeSelectAssets={this.changeSelectAssets} changeSelectInfo={this.changeSelectInfo}
                            handleOnChangeInfo={this.handleOnChangeInfo}
                            addAddtionalInfor={this.addAddtionalInfor}
                            deleteAddtionalInfor={this.deleteAddtionalInfor} handleLocationChange={this.handleLocationChange} onClickChangeStep={this.onClickChangeStep} />} />
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
        loading_stock_id_detail: state.adPostReducers.editPostAppReducer.loading_stock_id_detail,
        stock_detail: state.adPostReducers.editPostAppReducer.stock_detail,
        co_applicant_delete: state.adPostReducers.editPostAppReducer.co_applicant_delete,
        delete_co_applicant_loading: state.adPostReducers.editPostAppReducer.delete_co_applicant_loading,
        loading_edit_application: state.adPostReducers.editPostAppReducer.loading_edit_application,
        showNotFound:state.adPostReducers.editPostAppReducer.showNotFound,

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
    login_flinks,
    get_stock_id_detail,
    delete_coApplicant
})(DealerEditPostApp);