import React, { Component } from "react";
import { connect } from 'react-redux';
import {
    get_vehicle_type,
    get_vehicle_make,
    get_vehicle_model,
    get_vehicle_body_type,
    get_vehicle_fuel_type,
    get_vehicle_drive_train,
    get_vehicle_feature,
    toggle_vehicle_features,
    update_ad_post,
    remove_all_post_state,
    get_sub_type_vehicle_make,
    remove_all,
    get_vehicle_trims,
    create_post_success,
    create_payment_intent,
    remove_client_secret,
    handle_blur_make_model_trim,
    post_ad_end,
    paypal_intent_create,
    payal_transcation,
    remove_card_intents,
    get_edit_post_ad_record,
    default_select_feature
} from '../../actions/addPostActions'
import SimpleReactValidator from 'simple-react-validator';
import Geocode from "react-geocode";
import { toastr } from 'react-redux-toastr'
import TypeofVehicle from "./TypeofVehicle";
import Photos from "./Photos";
import Locations from "./Locations";
import Boost from './Boost'
import ConfirmPost from './ConfirmPost'
import TostarMessages from '../../components/alertMessages/TostarMessages'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { reject } from "lodash";
import { Beforeunload } from 'react-beforeunload';
import { Prompt } from "react-router";
import { history } from '../../_helpers/history'
import Payment from './Payment'
import FinalizeAdd from "./FinalizeAdd";
import {
    Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import ConfirmModel from '../../components/alertMessages/ConfirmModel'

var that
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
class EditPostAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            card: null,
            amountPay: 0,
            boostAmount: 0,
            step: 1,
            lastStep: 1,
            location: "",
            defaultPrice: '',
            defaultSelectedfeature: [],
            previousAccident: '',
            previousOwner: '',
            color: "",
            cylinder: '',
            drivetrain: "",
            fuelType: "",
            transmission: "",
            seating: '2',
            passenger: '',
            selectSeating: { value: '2', label: '2' },
            selectedPassenger: { value: '2', label: '2' },
            bodyType: "",
            price: "",
            kilometer: "",
            selectCondition: "",
            selectYear: { label: "2021", value: 2021 },
            year: "2021",
            selectTrim: "",
            trimName: "",
            otherTrim: "",
            selectModel: "",
            otherModel: "",
            modelName: "",
            typeOfVehicle: "",
            subTypeId: "",
            subVehicleType: '',
            makeName: "",
            otherMake: "",
            selectedBoost: "",
            stepBoost: 1,
            checkPayment: "",
            selectVehicleMake: '',
            files: [],
            preViewFiles: [],
            hardCodeInt: 1,
            nullState: null,
            locationValues: [],
            longitude: '',
            latitude: '',
            locationName: '',
            backTo: '',
            tab: 1,
            lastTab: 1,
            lastTabIndex: 1,
            engineCC: '',
            finalizeStep: '',
            selectedSubTypeName: '',
            user_id: this.props.user !== null && this.props.user !== undefined ? this.props.user.user_id : '',
            postSteps: [{
                name: 'Vehicle Details', value: 1, completed: false, current: true, disbaled: false, perc: 0
            }, {
                name: 'Photos', value: 2, completed: false, current: false, disbaled: false, perc: 79.16666666666667
            }, {
                name: 'Location', value: 3, completed: false, current: false, disbaled: false, perc: 83.33333333333333
            }, {
                name: 'Boost', value: 4, completed: false, current: false, disbaled: false, perc: 87.50000000000001
            }, {
                name: 'Payment', value: 5, completed: false, current: false, disbaled: false, perc: 91.66666666666667
            }, {
                name: 'Post Ad', value: 6, completed: false, current: false, disbaled: false, perc: 95.83333333333334
            }],
            colors: [
                { name: 'Green', classname: 'ColorGreen' },
                { name: 'Yellow', classname: 'ColorYellow' },
                { name: 'Orange', classname: 'ColorOrange' },
                { name: 'Purple', classname: 'ColorPurple' },
                { name: 'Blue', classname: 'ColorBlue' },
                { name: 'Silver', classname: 'ColorSilver' },
                { name: 'Black', classname: 'ColorBlack' },
                { name: 'Red', classname: 'ColorRed' },
                { name: 'Gold', classname: 'ColorGold' },
                { name: 'Grey', classname: 'ColorGrey' },
                { name: 'Biege', classname: 'ColorBiege' },
                { name: 'Brown', classname: 'ColorBrown' },
                { name: 'Other', classname: 'ColorGrey' },
            ],
            cylinders: [
                { value: '3' }, { value: '4' }, { value: '5' }, { value: '6' }, { value: '8' }, { value: '12' }],
            transmissions: [
                { name: 'Automatic' },
                { name: 'Manual' }],
            steeringTypes: [
                { name: 'Tille' },
                { name: 'Wheel' }],
            seatings: [{ value: '2', label: '2' }, { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }, { value: '8', label: '8' }, { value: '10', label: '10+' }],
            passengers: [{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }, { value: '7', label: '7' }, { value: '8', label: '8' }, { value: '9', label: '9' }, { value: '10', label: '10' }, { value: '10', label: '10+' }],
            // trims: [{ name: '1.5 EMT I DTEC' }, { name: '1.5 S CVT Diesel' }, { name: '1.5 S CVT DTEC' }, { name: 'None' }],
            trims: [],
            conditions: [{ name: 'New' }, { name: 'Used' }],
            owners: [{ name: '1 Owner', value: 1 }, { name: '2 Owner', value: 2 }, { name: '2+ Owner', value: 3 }],
            accidents: [{ name: 'No Accidents', value: 0 }, { name: '1 Accident', value: 1 }, { name: '2+ Accidents', value: 2 }],
            barPercent: 0,
            startPercent: 0,
            newStep: false,
            newStepName: '',
            steeringType: '',
            vinNumber: '',
            hinNumber: '',
            boatHours: '',
            selectedTypeName: '',
            serialNumber: "",
            uploadImages: [{ id: 1, files: null }, { id: 2, files: null }, { id: 3, files: null }, { id: 4, files: null }, { id: 5, files: null }, { id: 6, files: null }, { id: 7, files: null }, { id: 8, files: null }, { id: 9, files: null }, { id: 10, files: null }],
            previewImages: [{ id: 1, preViewFiles: null }, { id: 2, preViewFiles: null }, { id: 3, preViewFiles: null }, { id: 4, preViewFiles: null }, { id: 5, preViewFiles: null }, { id: 6, preViewFiles: null }, { id: 7, preViewFiles: null }, { id: 8, preViewFiles: null }, { id: 9, preViewFiles: null }, { id: 10, preViewFiles: null }],
            isBlocking: true,
            description: '',
            totalSlides: 24,
            animation: "fadeInUp",
            imageErrors: [],
            cardNumber: '',
            cardExpiry: '',
            cardCvc: '',
            yearsDropDown: [],
            postCity: '',
            deletedImages: [],
            vehicle_features: [],
            defaultSelectedBoost: '',
            defaultCheckPayment: '',
            postAdId: this.props.match.params !== undefined && this.props.match.params !== null ? this.props.match.params.id !== undefined && this.props.match.params.id !== null ? this.props.match.params.id : '' : '',
            length: '',
            weight: '',
            appStatus: ''

        };
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
        that = this
        this.props.remove_all_post_state()
        this.props.remove_all()
        this.props.get_vehicle_type()
        this.props.get_vehicle_fuel_type()
        this.props.get_vehicle_drive_train()
    }

    componentDidMount() {
        if (this.state.postAdId !== undefined && this.state.postAdId !== null && this.state.postAdId !== '') {
            this.props.get_edit_post_ad_record(this.state.postAdId)
        }
        // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_GEOCODE_KEY);
        // set response language. Defaults to english.
        Geocode.setLanguage("en");
        // set response region. Its optional.
        // A Geocoding request with region=es (Spain) will return the Spanish city.
        // Geocode.setRegion("es");

        // Enable or disable logs. Its optional.
        Geocode.enableDebug();
        let currentYear = new Date().getFullYear();
        let earliestYear = 1900;
        let years = []
        while (currentYear >= earliestYear) {
            years.push({ label: `${currentYear}`, value: currentYear })
            currentYear -= 1;
        }
        this.setState({
            ...this.state,
            yearsDropDown: years
        })
    }

    discardState = () => {
        this.setState({
            ...this.state,
            card: null,
            step: 1,
            lastStep: 1,
            location: "",
            defaultSelectedfeature: [],
            previousAccident: '',
            previousOwner: '',
            color: "",
            cylinder: '',
            drivetrain: "",
            fuelType: "",
            transmission: "",
            seating: '2',
            passenger: '',
            selectSeating: { value: '2', label: '2' },
            selectedPassenger: { value: '2', label: '2' },
            bodyType: "",
            price: "",
            kilometer: "",
            selectCondition: "",
            selectYear: { label: "2021", value: 2021 },
            year: "2021",
            selectTrim: "",
            trimName: "",
            otherTrim: "",
            selectModel: "",
            otherModel: "",
            modelName: "",
            typeOfVehicle: "",
            subTypeId: "",
            subVehicleType: '',
            makeName: "",
            otherMake: "",
            selectedBoost: "",
            stepBoost: 1,
            checkPayment: "",
            // cardCVC: "",
            // cardExpirDate: "",
            // cardNumber: "",
            selectVehicleMake: '',
            files: [],
            preViewFiles: [],
            hardCodeInt: 1,
            nullState: null,
            locationValues: [],
            longitude: '',
            latitude: '',
            locationName: '',
            backTo: '',
            tab: 1,
            lastTab: 1,
            lastTabIndex: 1,
            engineCC: '',
            finalizeStep: '',
            selectedSubTypeName: '',
            deletedImages: [],
            vehicle_features: [],
            user_id: this.props.user !== null && this.props.user !== undefined ? this.props.user.user_id : '',
            postSteps: [{
                name: 'Vehicle Details', value: 1, completed: false, current: true, disbaled: false, perc: 0
            }, {
                name: 'Photos', value: 2, completed: false, current: false, disbaled: false, perc: 79.16666666666667
            }, {
                name: 'Location', value: 3, completed: false, current: false, disbaled: false, perc: 83.33333333333333
            }, {
                name: 'Boost', value: 4, completed: false, current: false, disbaled: false, perc: 87.50000000000001
            }, {
                name: 'Payment', value: 5, completed: false, current: false, disbaled: false, perc: 91.66666666666667
            }, {
                name: 'Post Ad', value: 6, completed: false, current: false, disbaled: false, perc: 95.83333333333334
            }],
            colors: [
                { name: 'Green', classname: 'ColorGreen' },
                { name: 'Yellow', classname: 'ColorYellow' },
                { name: 'Orange', classname: 'ColorOrange' },
                { name: 'Purple', classname: 'ColorPurple' },
                { name: 'Blue', classname: 'ColorBlue' },
                { name: 'Silver', classname: 'ColorSilver' },
                { name: 'Black', classname: 'ColorBlack' },
                { name: 'Red', classname: 'ColorRed' },
                { name: 'Gold', classname: 'ColorGold' },
                { name: 'Grey', classname: 'ColorGrey' },
                { name: 'Biege', classname: 'ColorBiege' },
                { name: 'Brown', classname: 'ColorBrown' },
                { name: 'Other', classname: 'ColorGrey' },
            ],
            cylinders: [
                { value: '3' }, { value: '4' }, { value: '5' }, { value: '6' }, { value: '8' }, { value: '12' }],
            transmissions: [
                { name: 'Automatic' },
                { name: 'Manual' }],
            steeringTypes: [
                { name: 'Tille' },
                { name: 'Wheel' }],
            seatings: [{ value: '2', label: '2' }, { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }, { value: '8', label: '8' }, { value: '10', label: '10+' }],
            passengers: [{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }, { value: '7', label: '7' }, { value: '8', label: '8' }, { value: '9', label: '9' }, { value: '10', label: '10' }, { value: '10', label: '10+' }],
            // trims: [{ name: '1.5 EMT I DTEC' }, { name: '1.5 S CVT Diesel' }, { name: '1.5 S CVT DTEC' }, { name: 'None' }],
            trims: [],
            conditions: [{ name: 'New' }, { name: 'Used' }],
            owners: [{ name: '1 Owner', value: 1 }, { name: '2 Owner', value: 2 }, { name: '2+ Owner', value: 3 }],
            accidents: [{ name: 'No Accidents', value: 0 }, { name: '1 Accident', value: 1 }, { name: '2+ Accidents', value: 2 }],
            barPercent: 0,
            startPercent: 0,
            newStep: false,
            newStepName: '',
            steeringType: '',
            vinNumber: '',
            hinNumber: '',
            boatHours: '',
            selectedTypeName: '',
            serialNumber: "",
            uploadImages: [{ id: 1, files: null }, { id: 2, files: null }, { id: 3, files: null }, { id: 4, files: null }, { id: 5, files: null }, { id: 6, files: null }, { id: 7, files: null }, { id: 8, files: null }, { id: 9, files: null }, { id: 10, files: null }],
            previewImages: [{ id: 1, preViewFiles: null }, { id: 2, preViewFiles: null }, { id: 3, preViewFiles: null }, { id: 4, preViewFiles: null }, { id: 5, preViewFiles: null }, { id: 6, preViewFiles: null }, { id: 7, preViewFiles: null }, { id: 8, preViewFiles: null }, { id: 9, preViewFiles: null }, { id: 10, preViewFiles: null }],
            isBlocking: true,
            description: '',
            totalSlides: 24,
            animation: "fadeInUp",
            imageErrors: [],
            cardNumber: '',
            cardExpiry: '',
            cardCvc: '',
            amountPay: 0,
            boostAmount: 0,
            defaultSelectedBoost: '',
            defaultCheckPayment: '',
            postCity: '',
            length: '',
            weight: '',
        })
        this.props.remove_all_post_state()
    }

    handleOnChange = (e) => {
        const { name, value } = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleOnChangeModel = (e) => {
        this.setState({
            ...this.state,
            modelName: e,
            selectModel: e !== null ? e.value : this.state.selectModel
        })
    }

    changeYear = (e) => {
        // selectYear: e
        this.setState({
            ...this.state,
            year: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : null : null,
            selectYear: e
        })
    }

    changeSelect = (e, formName, name) => {
        this.setState({
            ...this.state,
            [formName]: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : null : null,
            [name]: e
        })
    }

    handleOnChangeMake = (e) => {
        this.setState({
            ...this.state,
            makeName: e,
            selectVehicleMake: e !== null ? e.value : this.state.selectVehicleMake
        })
    }

    handleOnClick = (name, value) => {
        let modelName = ''
        let makeName = ''
        let trim = ''
        if (name === 'selectModel') {
            modelName = this.props.vehicle_models.filter(item => item.id === value).map(item => { return { label: item.model_make, value: item.id } })[0]
        }
        if (name === 'selectVehicleMake') {
            makeName = this.props.vehicle_makes.filter(item => item.id === value).map(item => { return { label: item.make_name, value: item.id } })[0]
        }
        if (name === 'selectTrim') {
            // trim = value
            trim = this.props.vehicle_trims.filter(item => item.id === value).map(item => { return { label: item.v_trim, value: item.id } })[0]
        }
        this.setState({
            ...this.state,
            [name]: value,
            modelName: modelName !== '' ? modelName : this.state.modelName,
            makeName: makeName !== '' ? makeName : this.state.makeName,
            trimName: trim !== '' ? trim : this.state.trimName
        });
    };

    handleOnChangeModel = (e) => {
        this.setState({
            ...this.state,
            modelName: e,
            selectModel: e !== null ? e.value : this.state.selectModel
        })
    }

    changeCardValues = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    changeBoost = (e, perc) => {
        this.setState({
            ...this.state,
            stepBoost: e,
            barPercent: this.state.barPercent + (perc),
            animation: (perc) > 0 ? "fadeInUp" : "fadeInDown",
        })
    }


    onDrop = async (files, id) => {
        that.setState({
            ...that.state,
            imageErrors: []
        })
        let index = 0
        let emptyPreviewFiles = that.state.previewImages.filter(item => item.preViewFiles === null && item.path === '')
        let fillPreviewFiles = that.state.previewImages.filter(item => item.preViewFiles !== null || item.path !== '')
        let emptyFiles = that.state.uploadImages.filter(item => item.files === null && item.path === '')
        let fillFiles = that.state.uploadImages.filter(item => item.files !== null || item.path !== '')
        for (const item of files) {
            if (item.type != "image/png" && item.type != "image/jpg" && item.type != "image/jpeg") {
                that.setState({
                    ...that.state,
                    imageErrors: [...that.state.imageErrors, { 'message': `${item.path} File does not support. You must use .png, jpeg or .jpg` }]
                })
            } else {
                emptyPreviewFiles = emptyPreviewFiles.map((img, fileIndex) => {
                    if (fileIndex === index) {
                        return {
                            ...img,
                            preViewFiles: Object.assign(item, {
                                preview: URL.createObjectURL(item)
                            }),
                        }
                    }
                    return img
                })
                emptyFiles = emptyFiles.map((img, fileIndex) => {
                    if (fileIndex === index) {
                        return {
                            ...img,
                            files: item
                        }
                    }
                    return img
                })

                index++
            }
            that.setState({
                ...that.state,
                uploadImages: [...fillFiles || [], ...emptyFiles],
                previewImages: [...fillPreviewFiles || [], ...emptyPreviewFiles]
            })
        }
    };

    removeFile = (id) => {
        const fileExist = this.state.previewImages.filter(item => Number(item.id) === Number(id)).map(item => { return item.path })[0]
        const previewImages = this.state.previewImages.slice().map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    preViewFiles: null,
                    path: ''
                }
            }
            return item
        })
        this.setState({
            ...this.state,
            previewImages,
            deletedImages: fileExist !== undefined && fileExist !== null && fileExist !== '' ? [...this.state.deletedImages, { path: fileExist }] : this.state.deletedImages
        })
    }
    /**
          * 
          *  Image Resize
          * 
          */

    resizeFile = (file, ext, width, height, index) => new Promise((resolve, reject) => {
        let emptyPreviewFiles = that.state.previewImages.filter(item => item.preViewFiles === null)
        let fillPreviewFiles = that.state.previewImages.filter(item => item.preViewFiles !== null)
        let emptyFiles = that.state.uploadImages.filter(item => item.files === null)
        let fillFiles = that.state.uploadImages.filter(item => item.files !== null)
        var reader = new FileReader(); // CREATE AN NEW INSTANCE.
        reader.onload = function (event) {
            var img = new Image();
            img.src = event.target.result;
            img.onload = function (e) {

                // width = imageWidth
                // height = imageHeight

                if (e.target.height < 107 || e.target.width < 141) {
                    that.setState({
                        ...that.state,
                        imageErrors: [...that.state.imageErrors, { 'message': 'Image Size Too Small' }]
                    })
                    resolve(null);
                } else {
                    const canvas = document.createElement('canvas')
                    var imageWidth = e.target.width;
                    var imageHeight = e.target.height;
                    const transformedRatio = 1 / 1;
                    // Initial data, if the image does not change aspect it stays like this. 
                    let sx = 0;
                    let sy = 0;
                    let sWidth = imageWidth;
                    let sHeight = imageHeight;
                    let dx = 0;
                    let dy = 0;
                    let dWidth = imageWidth;
                    let dHeight = imageHeight;
                    let canvasWidth = imageWidth;
                    let canvasHeight = imageHeight;
                    let fill = false;
                    const originalRatio = imageWidth / imageHeight;

                    if (originalRatio > transformedRatio) {
                        if (fill) {
                            canvasHeight = imageWidth / transformedRatio;
                            dy = Math.abs(canvasHeight - imageHeight) / 2;
                        } else {
                            sWidth = imageWidth * transformedRatio;
                            canvasWidth = sWidth;
                            dWidth = sWidth;
                            sx = Math.abs(imageWidth - sWidth) / 2;
                        }
                    }

                    if (originalRatio < transformedRatio) {
                        if (fill) {
                            canvasWidth = imageHeight * transformedRatio;
                            dx = Math.abs(canvasWidth - imageWidth) / 2;
                        } else {
                            sHeight = imageWidth / transformedRatio;
                            canvasHeight = sHeight;
                            dHeight = sHeight;
                            sy = Math.abs(imageHeight - sHeight) / 2;
                        }
                    }
                    const ctx = canvas.getContext('2d')
                    canvas.width = canvasWidth;
                    canvas.height = canvasHeight;
                    // ctx.fillStyle = "#FE27FF";

                    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                    ctx.drawImage(e.target, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                    const scrEncoded = ctx.canvas.toDataURL(e.target, `image/${ext}`)
                    emptyPreviewFiles = emptyPreviewFiles.map((img, fileIndex) => {
                        if (fileIndex === index) {
                            return {
                                ...img,
                                preViewFiles: scrEncoded
                            }
                        }
                        return img
                    })
                    emptyFiles = emptyFiles.map((img, fileIndex) => {
                        if (fileIndex === index) {
                            return {
                                ...img,
                                files: file
                            }
                        }
                        return img
                    })
                    that.setState({
                        ...that.state,
                        uploadImages: [...fillFiles || [], ...emptyFiles],
                        previewImages: [...fillPreviewFiles || [], ...emptyPreviewFiles]
                    })
                    index++
                    resolve(scrEncoded)
                }


                // https://www.encodedna.com/javascript/check-image-width-height-and-type-before-uploading-using-javascript.htm
            }
        };
        reader.readAsDataURL(file);

    });


    handleOnChangeFeatures = (id) => {
        this.setState({
            ...this.state,
            vehicle_features: this.state.vehicle_features.slice().map(item => {
                if (Number(item.id) === Number(id)) {
                    return {
                        ...item,
                        checked: !item.checked
                    }
                }
                return item
            })
        })
        // this.props.toggle_vehicle_features(id)
    }

    handleInputChange = (newValue) => {
        this.setState({
            ...this.state,
            location: newValue
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.location !== this.state.location && this.state.location !== null && this.state.location !== undefined && this.state.location !== '') {
            new Promise((resolve) => {
                Geocode.fromAddress(this.state.location.label).then(
                    (response) => {
                        console.log(response, 'response Address')
                        const address = response.results[0].formatted_address;
                        let city, state, country, postal_code, street_number, route, state_long;
                        for (let i = 0; i < response.results[0].address_components.length; i++) {
                            for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                                switch (response.results[0].address_components[i].types[j]) {
                                    case "locality":
                                        city = response.results[0].address_components[i].long_name;
                                        break;
                                    case "administrative_area_level_1":
                                        state_long = response.results[0].address_components[i].long_name;
                                        state = response.results[0].address_components[i].short_name;

                                        break;
                                    case "country":
                                        country = response.results[0].address_components[i].long_name;
                                        break;
                                    case "route":
                                        route = response.results[0].address_components[i].long_name;
                                        break;
                                    case "postal_code":
                                        postal_code = response.results[0].address_components[i].long_name;
                                        break;
                                    case "street_number":
                                        street_number = response.results[0].address_components[i].long_name;
                                        break;
                                }
                            }
                        }
                        street_number = (street_number === undefined || street_number === null ? '' : street_number) + ' ' + (route === undefined || route === null ? '' : route)
                        this.setState({
                            ...this.state,
                            postCity: city === undefined || city === null ? '' : city,
                            locationName: this.state.location.label,
                            longitude: response !== undefined && response !== null && response.results.length > 0 ? response.results[0] !== undefined && response.results[0] !== null ? response.results[0].geometry.location.lng : '' : '',
                            latitude: response !== undefined && response !== null && response.results.length > 0 ? response.results[0] !== undefined && response.results[0] !== null ? response.results[0].geometry.location.lat : '' : '',
                        })
                        resolve()
                        // console.log(city, state, country, postal_code, street_number);
                        // console.log(response);
                    },
                    (error) => {
                        reject(error)
                        console.error(error);
                    }
                );


            })
            // new Promise((resolve, reject) => {
            //     geocodeByAddress(this.state.location.label)
            //         .then(results => getLatLng(results[0]))
            //         .then(({ lat, lng }) =>
            //             this.setState({
            //                 ...this.state,
            //                 longitude: lng,
            //                 latitude: lat,
            //                 locationName: this.state.location.label
            //             }),
            //             resolve()
            //         )
            //         .catch(err => {
            //             reject(err)
            //             console.log(err.message)
            //         })
            // })

        }
        if (prevProps.user !== this.props.user && this.props.user !== null && this.props.user !== undefined) {
            this.setState({
                ...this.state,
                user_id: this.props.user.user_id
            })
        }
        if (prevState.typeOfVehicle !== this.state.typeOfVehicle && this.state.typeOfVehicle !== '' && this.state.typeOfVehicle !== undefined) {
            let typeName = this.props.type_of_vehicles.filter(item => Number(item.id) == Number(this.state.typeOfVehicle)).map(item => { return item.name })[0]
            typeName = typeName !== undefined && typeName !== null ? typeName.toUpperCase() : ''
            const subType = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Powersport').toUpperCase() ? 1 : '' : ''
            const typeMotor = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Motorcycle').toUpperCase() ? 1 : '' : ''
            const typeBoat = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('BOAT').toUpperCase() ? 1 : '' : ''
            const typeRV = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('RV').toUpperCase() ? 1 : '' : ''
            const typeSmall = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 1 : '' : ''
            const typeTrailer = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Trailer').toUpperCase() ? 1 : '' : ''
            let startPercent = 0
            // startPercent = subType !== '' ? 100 / 24 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 20 : typeRV !== '' ? 100 / 16 : typeSmall !== '' ? 100 / 16 : 100 / 24
            // startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 16 : typeSmall !== '' ? 100 / 16 : 100 / 24
            startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 17 : typeSmall !== '' ? 100 / 16 : typeTrailer !== '' ? 100 / 15 : 100 / 24
            console.log('startPercent ', startPercent)
            // 13
            // let typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 10 : typeSmall !== '' ? 10 : 19
            let typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 11 : typeSmall !== '' ? 10 : typeTrailer !== '' ? 10 : 19
            // 14
            // let photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 11 : typeSmall !== '' ? 11 : 20
            let photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 12 : typeSmall !== '' ? 11 : typeTrailer !== '' ? 11 : 20
            // 15
            // let locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 12 : typeSmall !== '' ? 12 : 21
            let locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 13 : typeSmall !== '' ? 12 : typeTrailer !== '' ? 12 : 21
            // 16
            // let boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 13 : typeSmall !== '' ? 13 : 22
            let boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 14 : typeSmall !== '' ? 13 : typeTrailer !== '' ? 13 : 22
            // 17
            // let paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 14 : typeSmall !== '' ? 14 : 23
            let paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 15 : typeSmall !== '' ? 14 : typeTrailer !== '' ? 14 : 23
            // // startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 16 : typeSmall !== '' ? 100 / 16 : 100 / 24
            // startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 17 : typeSmall !== '' ? 100 / 16 : 100 / 24
            // console.log('startPercent ', startPercent)
            // // let typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 10 : typeSmall !== '' ? 10 : 19
            // let typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 11 : typeSmall !== '' ? 10 : 19
            // // let photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 11 : typeSmall !== '' ? 11 : 20
            // let photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 12 : typeSmall !== '' ? 11 : 20
            // // let locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 12 : typeSmall !== '' ? 12 : 21
            // let locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 13 : typeSmall !== '' ? 12 : 21
            // // let boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 13 : typeSmall !== '' ? 13 : 22
            // let boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 14 : typeSmall !== '' ? 13 : 22
            // // let paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 14 : typeSmall !== '' ? 14 : 23
            // let paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 15 : typeSmall !== '' ? 14 : 23
            console.log('Screens ', typeOfVehicleScreens, photoScreen, locationScreen, boostScreen, paymentScreen)
            this.props.get_vehicle_feature(this.state.typeOfVehicle)
            const imagesFiles = []
            const orignalImage = []
            for (var i = 0; i < 10; i++) {
                imagesFiles.push({
                    id: i,
                    preViewFiles: null,
                    ad_id: '',
                    path: ''
                })
                orignalImage.push({
                    id: i,
                    files: null,
                    ad_id: '',
                    path: ''
                })
            }
            this.setState({
                ...this.state,
                defaultSelectedfeature: [],
                vehicle_features: [],
                previousAccident: '',
                previousOwner: '',
                color: "",
                cylinder: '',
                drivetrain: "",
                fuelType: "",
                transmission: "",
                seating: '',
                passenger: typeName === ('Boat').toUpperCase() ? '' : '',
                bodyType: "",
                price: "",
                kilometer: "",
                selectCondition: "",
                year: "",
                selectTrim: "",
                trimName: "",
                otherTrim: "",
                selectModel: "",
                otherModel: "",
                modelName: "",
                makeName: "",
                otherMake: "",
                backTo: '',
                subTypeId: '',
                boatHours: '',
                steeringType: '',
                selectedSubTypeName: '',
                defaultSelectedBoost: '',
                selectedTypeName: typeName,
                // newStepName: subType !== '' ? 'VIN Number' : typeName === ('Automotive').toUpperCase() ? 'VIN Number' : typeName === ('Boat').toUpperCase() ? 'HIN Number' : typeName === ('Small Equipment').toUpperCase() ? 'Serial Number' : typeName === ('Trailer').toUpperCase() ? 'VIN Number' : '',
                newStepName: subType !== '' ? 'VIN Number' : typeName === ('Automotive').toUpperCase() ? 'VIN Number' : typeName === ('Boat').toUpperCase() ? 'HIN Number' : typeName === ('Small Equipment').toUpperCase() ? 'Serial Number' : '',
                engineStepName: typeName === ('Boat').toUpperCase() ? 'Engine Horsepower' : typeName === ('Motorcycle').toUpperCase() ? 'Engine Horsepower' : typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 'Engine Horsepower' : '',
                // newStep: subType !== '' ? false : typeName === ('Automotive').toUpperCase() ? true : typeName === ('Boat').toUpperCase() ? true : typeName === ('Small Equipment').toUpperCase() ? true : typeName === ('Motorcycle').toUpperCase() ? true : typeName === ('Trailer').toUpperCase() ? true : false,
                newStep: subType !== '' ? false : typeName === ('Automotive').toUpperCase() ? true : typeName === ('Boat').toUpperCase() ? true : typeName === ('Small Equipment').toUpperCase() ? true : typeName === ('Motorcycle').toUpperCase() ? true : false,
                // barPercent: 1.176470588235294,
                // Add Payment
                barPercent: subType === '' ? startPercent : this.state.startPercent,
                startPercent: subType === '' ? startPercent : this.state.startPercent,
                vinNumber: '',
                hinNumber: '',
                serialNumber: "",
                engineCC: '',
                subVehicleType: subType,
                step: subType == '' ? 2 : 1.1,
                lastTab: 1,
                lastTabIndex: 1,
                lastStep: subType == '' ? 2 : 1.1,
                postSteps: subType === '' ? this.state.postSteps.slice().map(item => {
                    if (item.value !== 1) {
                        return {
                            ...item,
                            perc: item.value === 2 ? Number(typeOfVehicleScreens) * Number(startPercent) : item.value === 3 ? Number(startPercent) * Number(photoScreen) : item.value === 4 ? Number(startPercent) * Number(locationScreen) : item.value === 5 ? Number(startPercent) * Number(boostScreen) : item.value === 6 ? Number(startPercent) * Number(paymentScreen) : item.parc,
                            completed: false,
                            current: false
                        }
                    }
                    return {
                        ...item,
                        completed: false,
                        current: item.value === 1 ? true : false
                    }
                }) : this.state.postSteps,
                animation: "fadeInUp",
                description: '',
                card: null,
                location: "",
                selectSeating: '',
                selectedPassenger: '',
                selectedBoost: "",
                stepBoost: 1,
                checkPayment: "",
                selectVehicleMake: '',
                files: [],
                preViewFiles: [],
                locationValues: [],
                longitude: '',
                latitude: '',
                locationName: '',
                backTo: '',
                finalizeStep: '',
                selectedSubTypeName: '',
                trims: [],
                steeringType: '',
                serialNumber: "",
                uploadImages: orignalImage,
                previewImages: imagesFiles,
                isBlocking: true,
                imageErrors: [],
                cardNumber: '',
                cardExpiry: '',
                cardCvc: '',
                amountPay: 0,
                boostAmount: 0,
                length: '',
                weight: ''
            })

            if (subType === '') {
                this.props.get_vehicle_make(this.state.typeOfVehicle)
            }
            this.props.get_vehicle_body_type(this.state.typeOfVehicle)
        }
        if (prevState.subTypeId !== this.state.subTypeId && this.state.subTypeId !== '' && this.state.subTypeId !== undefined) {
            let subTypeName = this.props.type_of_vehicles.filter(item => item.id == 9) !== undefined ? this.props.type_of_vehicles.filter(item => item.id == 9)[0].typeofvehicle_id !== undefined ? this.props.type_of_vehicles.filter(item => item.id == 9)[0].typeofvehicle_id.filter(item => Number(item.id) === Number(this.state.subTypeId)).map(item => { return item.name })[0] : '' : ''
            const subType = subTypeName !== undefined && subTypeName !== null && subTypeName !== '' ? subTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || subTypeName.toUpperCase() === ('Watercraft').toUpperCase() ? 1 : '' : ''
            const subTypeAtv = subTypeName !== undefined && subTypeName !== null && subTypeName !== '' ? subTypeName.toUpperCase() === ('ATV/UTV').toUpperCase() ? 1 : '' : ''
            let startPercent = 0
            // const bar = 100 - this.state.barPercent
            const bar = 100
            startPercent = subTypeAtv === '' ? bar / 17 : bar / 19
            let typeOfVehicleScreens = subTypeAtv === '' ? 12 : 14
            let photoScreen = subTypeAtv === '' ? 13 : 15
            let locationScreen = subTypeAtv === '' ? 14 : 16
            let boostScreen = subTypeAtv === '' ? 15 : 17
            let paymentScreen = subTypeAtv === '' ? 16 : 18
            this.setState({
                ...this.state,
                step: 2,
                subTypeId: this.state.subTypeId,
                // Add Sub Type
                vehicle_features: [],
                selectedSubTypeName: subTypeName,
                newStepName: subType !== '' ? 'VIN Number' : '',
                engineStepName: subType !== '' || subTypeAtv !== '' ? 'Engine Horsepower' : '',
                startPercent: startPercent,
                newStep: subType !== '' || subTypeAtv !== '' ? true : false,
                defaultSelectedfeature: [],
                previousAccident: '',
                previousOwner: '',
                color: "",
                cylinder: '',
                drivetrain: "",
                fuelType: "",
                transmission: "",
                seating: '',
                passenger: this.state.selectedTypeName === ('Boat').toUpperCase() ? '' : '',
                bodyType: "",
                price: "",
                kilometer: "",
                selectCondition: "",
                year: "",
                selectTrim: "",
                trimName: "",
                otherTrim: "",
                selectModel: "",
                otherModel: "",
                modelName: "",
                makeName: "",
                otherMake: "",
                backTo: '',
                boatHours: '',
                steeringType: '',
                vinNumber: '',
                hinNumber: '',
                serialNumber: "",
                engineCC: '',
                defaultSelectedBoost: '',
                barPercent: (startPercent * 2),
                startPercent: startPercent,
                postSteps: this.state.postSteps.slice().map(item => {
                    if (item.value !== 1) {
                        return {
                            ...item,
                            perc: item.value === 2 ? Number(typeOfVehicleScreens) * Number(startPercent) : item.value === 3 ? Number(startPercent) * Number(photoScreen) : item.value === 4 ? Number(startPercent) * Number(locationScreen) : item.value === 5 ? Number(startPercent) * Number(boostScreen) : item.value === 6 ? Number(startPercent) * Number(paymentScreen) : item.parc,
                            completed: false,
                            current: false
                        }
                    }
                    return {
                        ...item,
                        completed: false,
                        current: item.value === 1 ? true : false
                    }
                }),
                // Add Payment
                // barPercent: this.state.barPercent + startPercent,
                animation: "fadeInUp",
                lastTab: 1,
                lastTabIndex: 1,
                lastStep: 1.1,
            })
            this.props.get_sub_type_vehicle_make(this.state.subTypeId)
        }
        if (prevState.selectVehicleMake !== this.state.selectVehicleMake && this.state.selectVehicleMake !== '' && this.state.selectVehicleMake !== undefined) {
            this.setState({
                ...this.state,
                step: 3,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp",
                selectModel: '',
                otherModel: '',
                modelName: '',
                otherMake: ''
            })
            this.props.get_vehicle_model(this.state.selectVehicleMake)
        }
        if (prevState.selectModel !== this.state.selectModel && this.state.selectModel !== '' && this.state.selectModel !== undefined) {
            this.setState({
                ...this.state,
                step: this.state.selectedTypeName.toUpperCase() === ("BOAT").toUpperCase() || (this.state.selectedSubTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || this.state.selectedSubTypeName.toUpperCase() === ('Watercraft').toUpperCase()) || this.state.selectedTypeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 4.1 : this.state.selectedSubTypeName.toUpperCase() === ('ATV/UTV').toUpperCase() ? 5 : this.state.selectedTypeName.toUpperCase() === ('Automotive').toUpperCase() ? 4 : 5,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp",
                // trimName: '',
                // otherTrim: '',
                // selectTrim: '',
                // otherModel: '',

            })
            this.props.get_vehicle_trims(this.state.selectModel)
        }
        if (prevProps.vehicle_trims !== this.props.vehicle_trims && this.props.vehicle_trims !== undefined) {
            const trims = [];
            (this.props.vehicle_trims || []).map(item => {
                return trims.push({
                    value: item.id,
                    label: item.v_trim
                })
            })
            this.setState({
                ...this.state,
                trims: trims,
                // otherTrim: '',
                // selectTrim: '',
                // trimName: ''
            })
        }
        if (prevState.selectTrim !== this.state.selectTrim && this.state.selectTrim !== '' && this.state.selectTrim !== undefined) {
            this.setState({
                ...this.state,
                step: 5,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp",
                otherTrim: ''
            })
        }
        if (prevState.selectCondition !== this.state.selectCondition && this.state.selectCondition !== '' && this.state.selectCondition !== undefined) {
            this.setState({
                ...this.state,
                // step: 7,
                step: this.state.newStep === true && this.state.newStepName !== '' ? 1.2 : this.state.newStep === true && this.state.engineStepName !== '' ? 1.3 : 7,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
            })
        }
        if (prevState.bodyType !== this.state.bodyType && this.state.bodyType !== '' && this.state.bodyType !== undefined) {
            this.setState({
                ...this.state,
                step: 9,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
            })
        }
        // if (prevState.year !== this.state.year && this.state.year !== '' && this.state.year !== undefined) {
        //     this.setState({
        //         ...this.state,
        //         step: this.state.selectedTypeName.toUpperCase() === ("RV").toUpperCase() ? 15 : 6,
        //         // Add Payment
        //         barPercent: this.state.barPercent + this.state.startPercent,
        //         animation: "fadeInUp"
        //     })
        // }
        // if (prevState.seating !== this.state.seating && this.state.seating !== '' && this.state.seating !== undefined) {
        //     this.setState({
        //         ...this.state,
        //         step: 10,
        //         // Add Payment
        //         barPercent: this.state.barPercent + this.state.startPercent,
        //         animation: "fadeInUp"
        //     })
        // }
        if (prevState.transmission !== this.state.transmission && this.state.transmission !== '' && this.state.transmission !== undefined) {
            this.setState({
                ...this.state,
                step: this.state.selectedSubTypeName.toUpperCase() === ('ATV/UTV').toUpperCase() ? 14 : 11,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
            })
        }
        if (prevState.steeringType !== this.state.steeringType && this.state.steeringType !== '' && this.state.steeringType !== undefined) {
            this.setState({
                ...this.state,
                step: 11,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
            })
        }
        if (prevState.fuelType !== this.state.fuelType && this.state.fuelType !== '' && this.state.fuelType !== undefined) {
            this.setState({
                ...this.state,
                step: this.state.selectedTypeName.toUpperCase() === ("BOAT").toUpperCase() ? 15 : 12,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
            })
        }
        if (prevState.drivetrain !== this.state.drivetrain && this.state.drivetrain !== '' && this.state.drivetrain !== undefined) {
            this.setState({
                ...this.state,
                step: 13,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
            })
        }
        if (prevState.cylinder !== this.state.cylinder && this.state.cylinder !== '' && this.state.cylinder !== undefined) {
            this.setState({
                ...this.state,
                step: 14,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
            })
        }
        if (prevState.color !== this.state.color && this.state.color !== '' && this.state.color !== undefined) {
            this.setState({
                ...this.state,
                step: 15,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
            })
        }
        if (prevState.previousOwner !== this.state.previousOwner && this.state.previousOwner !== '' && this.state.previousOwner !== undefined) {
            this.setState({
                ...this.state,
                step: this.state.selectedTypeName.toUpperCase() === ("BOAT").toUpperCase() ? 17 : this.state.selectedSubTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || this.state.selectedSubTypeName.toUpperCase() === ('Watercraft').toUpperCase() ? 18 : 16,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
            })
        }
        if (prevState.previousAccident !== this.state.previousAccident && this.state.previousAccident !== '' && this.state.previousAccident !== undefined) {
            this.setState({
                ...this.state,
                step: this.state.selectedTypeName.toUpperCase() === ('Trailer').toUpperCase() ? 18 : 17,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
            })
        }
        // if (prevState.previousAccident !== this.state.previousAccident && this.state.previousAccident !== '' && this.state.previousAccident !== undefined) {
        //     this.setState({
        //         ...this.state,
        //         step: 17,
        //         // Add Payment
        //         barPercent: this.state.barPercent + this.state.startPercent,
        //         animation: "fadeInUp"
        //     })
        // }
        if (prevState.locationName !== this.state.locationName && this.state.locationName !== undefined && this.state.locationName !== '') {
            let typeName = this.state.selectedTypeName
            typeName = typeName !== undefined && typeName !== null ? typeName.toUpperCase() : ''
            const subType = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Powersport').toUpperCase() ? 1 : '' : ''
            const typeMotor = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Motorcycle').toUpperCase() ? 1 : '' : ''
            const typeBoat = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('BOAT').toUpperCase() ? 1 : '' : ''
            const typeRV = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('RV').toUpperCase() ? 1 : '' : ''
            const typeSmall = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 1 : '' : ''
            const typeTrailer = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Trailer').toUpperCase() ? 1 : '' : ''
            let startPercent = 0
            let typeOfVehicleScreens = 0;
            let photoScreen = 0;
            let locationScreen = 0;
            let boostScreen = 0;
            let paymentScreen = 0;
            let newStepName = '';
            let engineStepName = '';
            let newStep = false;
            if (subType === '') {
                startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 17 : typeSmall !== '' ? 100 / 16 : typeTrailer !== '' ? 100 / 15 : 100 / 24
                console.log('startPercent ', startPercent)
                // typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 10 : typeSmall !== '' ? 10 : 19
                typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 11 : typeSmall !== '' ? 10 : typeTrailer !== '' ? 10 : 19
                // photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 11 : typeSmall !== '' ? 11 : 20
                photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 12 : typeSmall !== '' ? 11 : typeTrailer !== '' ? 11 : 20
                // locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 12 : typeSmall !== '' ? 12 : 21
                locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 13 : typeSmall !== '' ? 12 : typeTrailer !== '' ? 12 : 21
                // boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 13 : typeSmall !== '' ? 13 : 22
                boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 14 : typeSmall !== '' ? 13 : typeTrailer !== '' ? 14 : 22
                // paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 14 : typeSmall !== '' ? 14 : 23
                paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 15 : typeSmall !== '' ? 14 : typeTrailer !== '' ? 14 : 23
                newStepName = subType !== '' ? 'VIN Number' : typeName === ('Automotive').toUpperCase() ? 'VIN Number' : typeName === ('Boat').toUpperCase() ? 'HIN Number' : typeName === ('Small Equipment').toUpperCase() ? 'Serial Number' : '';
                engineStepName = typeName === ('Boat').toUpperCase() ? 'Engine Horsepower' : typeName === ('Motorcycle').toUpperCase() ? 'Engine Horsepower' : typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 'Engine Horsepower' : '';
                newStep = subType !== '' ? false : typeName === ('Automotive').toUpperCase() ? true : typeName === ('Boat').toUpperCase() ? true : typeName === ('Small Equipment').toUpperCase() ? true : typeName === ('Motorcycle').toUpperCase() ? true : false;
                // startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 16 : typeSmall !== '' ? 100 / 16 : 100 / 24
                // startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 17 : typeSmall !== '' ? 100 / 16 : 100 / 24
                // console.log('startPercent ', startPercent)
                // // typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 10 : typeSmall !== '' ? 10 : 19
                // typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 11 : typeSmall !== '' ? 10 : 19
                // // photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 11 : typeSmall !== '' ? 11 : 20
                // photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 12 : typeSmall !== '' ? 11 : 20
                // // locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 12 : typeSmall !== '' ? 12 : 21
                // locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 13 : typeSmall !== '' ? 12 : 21
                // // boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 13 : typeSmall !== '' ? 13 : 22
                // boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 14 : typeSmall !== '' ? 13 : 22
                // // paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 14 : typeSmall !== '' ? 14 : 23
                // paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 15 : typeSmall !== '' ? 14 : 23
                // newStepName = subType !== '' ? 'VIN Number' : typeName === ('Automotive').toUpperCase() ? 'VIN Number' : typeName === ('Boat').toUpperCase() ? 'HIN Number' : typeName === ('Small Equipment').toUpperCase() ? 'Serial Number' : typeName === ('Trailer').toUpperCase() ? 'VIN Number' : '';
                // engineStepName = typeName === ('Boat').toUpperCase() ? 'Engine Horsepower' : typeName === ('Motorcycle').toUpperCase() ? 'Engine Horsepower' : typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 'Engine Horsepower' : '';
                // newStep = subType !== '' ? false : typeName === ('Automotive').toUpperCase() ? true : typeName === ('Boat').toUpperCase() ? true : typeName === ('Small Equipment').toUpperCase() ? true : typeName === ('Motorcycle').toUpperCase() ? true : typeName === ('Trailer').toUpperCase() ? true : false;
            } else {
                let subTypeName = this.state.selectedSubTypeName;
                const subType = subTypeName !== undefined && subTypeName !== null && subTypeName !== '' ? subTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || subTypeName.toUpperCase() === ('Watercraft').toUpperCase() ? 1 : '' : '';
                const subTypeAtv = subTypeName !== undefined && subTypeName !== null && subTypeName !== '' ? subTypeName.toUpperCase() === ('ATV/UTV').toUpperCase() ? 1 : '' : '';

                // const bar = 100 - this.state.barPercent
                const bar = 100
                startPercent = subTypeAtv === '' ? bar / 17 : bar / 19
                typeOfVehicleScreens = subTypeAtv === '' ? 12 : 14
                photoScreen = subTypeAtv === '' ? 13 : 15
                locationScreen = subTypeAtv === '' ? 14 : 16
                boostScreen = subTypeAtv === '' ? 15 : 17
                paymentScreen = subTypeAtv === '' ? 16 : 18
                newStepName = subType !== '' ? 'VIN Number' : '';
                engineStepName = subType !== '' || subTypeAtv !== '' ? 'Engine Horsepower' : '';
                newStep = subType !== '' || subTypeAtv !== '' ? true : false;
            }
            // let typeName = this.state.selectedTypeName
            // typeName = typeName !== undefined && typeName !== null ? typeName.toUpperCase() : ''
            // const subType = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Powersport').toUpperCase() ? 1 : '' : ''
            // const typeMotor = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Motorcycle').toUpperCase() ? 1 : '' : ''
            // const typeBoat = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('BOAT').toUpperCase() ? 1 : '' : ''
            // const typeRV = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('RV').toUpperCase() ? 1 : '' : ''
            // const typeSmall = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 1 : '' : ''
            // let startPercent = 0
            // startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 16 : typeSmall !== '' ? 100 / 16 : 100 / 24
            // console.log('startPercent ', startPercent)
            // let locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 12 : typeSmall !== '' ? 12 : 21
            // console.log(Number(locationScreen), this.state.startPercent, 'Location Name')

            this.setState({
                ...this.state,
                step: 21,
                lastStep: 21,
                // Add Payment
                barPercent: Number(locationScreen) * this.state.startPercent,
                animation: "fadeInUp",
                tab: 4,
                postSteps: this.state.postSteps.slice().map(item => {
                    if (item.value < 4) {
                        return {
                            ...item,
                            completed: true,
                            current: false
                        }
                    }
                    return {
                        ...item,
                        completed: false,
                        current: item.value === 4 ? true : false
                    }
                })
            })
        }
        if (prevState.defaultSelectedBoost !== this.state.defaultSelectedBoost && this.state.defaultSelectedBoost !== undefined && this.state.defaultSelectedBoost !== 'free' && this.state.defaultSelectedBoost !== '') {
            let typeName = this.state.selectedTypeName
            typeName = typeName !== undefined && typeName !== null ? typeName.toUpperCase() : ''
            const subType = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Powersport').toUpperCase() ? 1 : '' : ''
            const typeMotor = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Motorcycle').toUpperCase() ? 1 : '' : ''
            const typeBoat = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('BOAT').toUpperCase() ? 1 : '' : ''
            const typeRV = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('RV').toUpperCase() ? 1 : '' : ''
            const typeSmall = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 1 : '' : ''
            const typeTrailer = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Trailer').toUpperCase() ? 1 : '' : ''
            let startPercent = 0
            let typeOfVehicleScreens = 0;
            let photoScreen = 0;
            let locationScreen = 0;
            let boostScreen = 0;
            let paymentScreen = 0;
            let newStepName = '';
            let engineStepName = '';
            let newStep = false;
            if (subType === '') {
                startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 17 : typeSmall !== '' ? 100 / 16 : typeTrailer !== '' ? 100 / 15 : 100 / 24
                console.log('startPercent ', startPercent)
                // typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 10 : typeSmall !== '' ? 10 : 19
                typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 11 : typeSmall !== '' ? 10 : typeTrailer !== '' ? 10 : 19
                // photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 11 : typeSmall !== '' ? 11 : 20
                photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 12 : typeSmall !== '' ? 11 : typeTrailer !== '' ? 11 : 20
                // locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 12 : typeSmall !== '' ? 12 : 21
                locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 13 : typeSmall !== '' ? 12 : typeTrailer !== '' ? 12 : 21
                // boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 13 : typeSmall !== '' ? 13 : 22
                boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 14 : typeSmall !== '' ? 13 : typeTrailer !== '' ? 14 : 22
                // paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 14 : typeSmall !== '' ? 14 : 23
                paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 15 : typeSmall !== '' ? 14 : typeTrailer !== '' ? 14 : 23
                newStepName = subType !== '' ? 'VIN Number' : typeName === ('Automotive').toUpperCase() ? 'VIN Number' : typeName === ('Boat').toUpperCase() ? 'HIN Number' : typeName === ('Small Equipment').toUpperCase() ? 'Serial Number' : '';
                engineStepName = typeName === ('Boat').toUpperCase() ? 'Engine Horsepower' : typeName === ('Motorcycle').toUpperCase() ? 'Engine Horsepower' : typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 'Engine Horsepower' : '';
                newStep = subType !== '' ? false : typeName === ('Automotive').toUpperCase() ? true : typeName === ('Boat').toUpperCase() ? true : typeName === ('Small Equipment').toUpperCase() ? true : typeName === ('Motorcycle').toUpperCase() ? true : false;
                // // startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 16 : typeSmall !== '' ? 100 / 16 : 100 / 24
                // startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 17 : typeSmall !== '' ? 100 / 16 : 100 / 24
                // console.log('startPercent ', startPercent)
                // // typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 10 : typeSmall !== '' ? 10 : 19
                // typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 11 : typeSmall !== '' ? 10 : 19
                // // photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 11 : typeSmall !== '' ? 11 : 20
                // photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 12 : typeSmall !== '' ? 11 : 20
                // // locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 12 : typeSmall !== '' ? 12 : 21
                // locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 13 : typeSmall !== '' ? 12 : 21
                // // boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 13 : typeSmall !== '' ? 13 : 22
                // boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 14 : typeSmall !== '' ? 13 : 22
                // // paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 14 : typeSmall !== '' ? 14 : 23
                // paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 15 : typeSmall !== '' ? 14 : 23
                // newStepName = subType !== '' ? 'VIN Number' : typeName === ('Automotive').toUpperCase() ? 'VIN Number' : typeName === ('Boat').toUpperCase() ? 'HIN Number' : typeName === ('Small Equipment').toUpperCase() ? 'Serial Number' : typeName === ('Trailer').toUpperCase() ? 'VIN Number' : '';
                // engineStepName = typeName === ('Boat').toUpperCase() ? 'Engine Horsepower' : typeName === ('Motorcycle').toUpperCase() ? 'Engine Horsepower' : typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 'Engine Horsepower' : '';
                // newStep = subType !== '' ? false : typeName === ('Automotive').toUpperCase() ? true : typeName === ('Boat').toUpperCase() ? true : typeName === ('Small Equipment').toUpperCase() ? true : typeName === ('Motorcycle').toUpperCase() ? true : typeName === ('Trailer').toUpperCase() ? true : false;
            } else {
                let subTypeName = this.state.selectedSubTypeName;
                const subType = subTypeName !== undefined && subTypeName !== null && subTypeName !== '' ? subTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || subTypeName.toUpperCase() === ('Watercraft').toUpperCase() ? 1 : '' : '';
                const subTypeAtv = subTypeName !== undefined && subTypeName !== null && subTypeName !== '' ? subTypeName.toUpperCase() === ('ATV/UTV').toUpperCase() ? 1 : '' : '';

                // const bar = 100 - this.state.barPercent
                const bar = 100
                startPercent = subTypeAtv === '' ? bar / 17 : bar / 19
                typeOfVehicleScreens = subTypeAtv === '' ? 12 : 14
                photoScreen = subTypeAtv === '' ? 13 : 15
                locationScreen = subTypeAtv === '' ? 14 : 16
                boostScreen = subTypeAtv === '' ? 15 : 17
                paymentScreen = subTypeAtv === '' ? 16 : 18
                newStepName = subType !== '' ? 'VIN Number' : '';
                engineStepName = subType !== '' || subTypeAtv !== '' ? 'Engine Horsepower' : '';
                newStep = subType !== '' || subTypeAtv !== '' ? true : false;
            }
            // let typeName = this.state.selectedTypeName
            // typeName = typeName !== undefined && typeName !== null ? typeName.toUpperCase() : ''
            // const subType = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Powersport').toUpperCase() ? 1 : '' : ''
            // const typeMotor = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Motorcycle').toUpperCase() ? 1 : '' : ''
            // const typeBoat = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('BOAT').toUpperCase() ? 1 : '' : ''
            // const typeRV = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('RV').toUpperCase() ? 1 : '' : ''
            // const typeSmall = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 1 : '' : ''
            // let startPercent = 0
            // startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 16 : typeSmall !== '' ? 100 / 16 : 100 / 24
            // console.log('startPercent ', startPercent)
            // let paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 14 : typeSmall !== '' ? 14 : 23
            // console.log(Number(paymentScreen), this.state.startPercent, 'defaultSelectedBoost Name Not')

            this.setState({
                ...this.state,
                step: 22,
                lastStep: 22,
                // Add Payment
                barPercent: Number(paymentScreen) * this.state.startPercent,
                animation: "fadeInUp",
                finalizeStep: 1,
                // animation: this.state.animation,
                tab: 6,
                postSteps: this.state.postSteps.slice().map(item => {
                    if (item.value < 6) {
                        return {
                            ...item,
                            completed: true,
                            current: false,
                            disbaled: item.value === 5 ? true : false
                        }
                    }
                    return {
                        ...item,
                        completed: false,
                        current: item.value === 6 ? true : false
                    }
                })
            })
        }
        if (prevState.defaultSelectedBoost !== this.state.defaultSelectedBoost && this.state.defaultSelectedBoost !== undefined && this.state.defaultSelectedBoost === 'free' && this.state.defaultSelectedBoost !== '') {
            let typeName = this.state.selectedTypeName
            typeName = typeName !== undefined && typeName !== null ? typeName.toUpperCase() : ''
            const subType = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Powersport').toUpperCase() ? 1 : '' : ''
            const typeMotor = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Motorcycle').toUpperCase() ? 1 : '' : ''
            const typeBoat = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('BOAT').toUpperCase() ? 1 : '' : ''
            const typeRV = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('RV').toUpperCase() ? 1 : '' : ''
            const typeSmall = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 1 : '' : ''
            const typeTrailer = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Trailer').toUpperCase() ? 1 : '' : ''
            let startPercent = 0
            let typeOfVehicleScreens = 0;
            let photoScreen = 0;
            let locationScreen = 0;
            let boostScreen = 0;
            let paymentScreen = 0;
            let newStepName = '';
            let engineStepName = '';
            let newStep = false;
            if (subType === '') {
                startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 17 : typeSmall !== '' ? 100 / 16 : typeTrailer !== '' ? 100 / 15 : 100 / 24
                console.log('startPercent ', startPercent)
                // typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 10 : typeSmall !== '' ? 10 : 19
                typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 11 : typeSmall !== '' ? 10 : typeTrailer !== '' ? 10 : 19
                // photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 11 : typeSmall !== '' ? 11 : 20
                photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 12 : typeSmall !== '' ? 11 : typeTrailer !== '' ? 11 : 20
                // locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 12 : typeSmall !== '' ? 12 : 21
                locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 13 : typeSmall !== '' ? 12 : typeTrailer !== '' ? 12 : 21
                // boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 13 : typeSmall !== '' ? 13 : 22
                boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 14 : typeSmall !== '' ? 13 : typeTrailer !== '' ? 14 : 22
                // paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 14 : typeSmall !== '' ? 14 : 23
                paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 15 : typeSmall !== '' ? 14 : typeTrailer !== '' ? 14 : 23
                newStepName = subType !== '' ? 'VIN Number' : typeName === ('Automotive').toUpperCase() ? 'VIN Number' : typeName === ('Boat').toUpperCase() ? 'HIN Number' : typeName === ('Small Equipment').toUpperCase() ? 'Serial Number' : '';
                engineStepName = typeName === ('Boat').toUpperCase() ? 'Engine Horsepower' : typeName === ('Motorcycle').toUpperCase() ? 'Engine Horsepower' : typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 'Engine Horsepower' : '';
                newStep = subType !== '' ? false : typeName === ('Automotive').toUpperCase() ? true : typeName === ('Boat').toUpperCase() ? true : typeName === ('Small Equipment').toUpperCase() ? true : typeName === ('Motorcycle').toUpperCase() ? true : false;
                // // startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 16 : typeSmall !== '' ? 100 / 16 : 100 / 24
                // startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 17 : typeSmall !== '' ? 100 / 16 : 100 / 24
                // console.log('startPercent ', startPercent)
                // // typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 10 : typeSmall !== '' ? 10 : 19
                // typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 11 : typeSmall !== '' ? 10 : 19
                // // photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 11 : typeSmall !== '' ? 11 : 20
                // photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 12 : typeSmall !== '' ? 11 : 20
                // // locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 12 : typeSmall !== '' ? 12 : 21
                // locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 13 : typeSmall !== '' ? 12 : 21
                // // boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 13 : typeSmall !== '' ? 13 : 22
                // boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 14 : typeSmall !== '' ? 13 : 22
                // // paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 14 : typeSmall !== '' ? 14 : 23
                // paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 15 : typeSmall !== '' ? 14 : 23
                // newStepName = subType !== '' ? 'VIN Number' : typeName === ('Automotive').toUpperCase() ? 'VIN Number' : typeName === ('Boat').toUpperCase() ? 'HIN Number' : typeName === ('Small Equipment').toUpperCase() ? 'Serial Number' : typeName === ('Trailer').toUpperCase() ? 'VIN Number' : '';
                // engineStepName = typeName === ('Boat').toUpperCase() ? 'Engine Horsepower' : typeName === ('Motorcycle').toUpperCase() ? 'Engine Horsepower' : typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 'Engine Horsepower' : '';
                // newStep = subType !== '' ? false : typeName === ('Automotive').toUpperCase() ? true : typeName === ('Boat').toUpperCase() ? true : typeName === ('Small Equipment').toUpperCase() ? true : typeName === ('Motorcycle').toUpperCase() ? true : typeName === ('Trailer').toUpperCase() ? true : false;
            } else {
                let subTypeName = this.state.selectedSubTypeName;
                const subType = subTypeName !== undefined && subTypeName !== null && subTypeName !== '' ? subTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || subTypeName.toUpperCase() === ('Watercraft').toUpperCase() ? 1 : '' : '';
                const subTypeAtv = subTypeName !== undefined && subTypeName !== null && subTypeName !== '' ? subTypeName.toUpperCase() === ('ATV/UTV').toUpperCase() ? 1 : '' : '';

                // const bar = 100 - this.state.barPercent
                const bar = 100
                startPercent = subTypeAtv === '' ? bar / 17 : bar / 19
                typeOfVehicleScreens = subTypeAtv === '' ? 12 : 14
                photoScreen = subTypeAtv === '' ? 13 : 15
                locationScreen = subTypeAtv === '' ? 14 : 16
                boostScreen = subTypeAtv === '' ? 15 : 17
                paymentScreen = subTypeAtv === '' ? 16 : 18
                newStepName = subType !== '' ? 'VIN Number' : '';
                engineStepName = subType !== '' || subTypeAtv !== '' ? 'Engine Horsepower' : '';
                newStep = subType !== '' || subTypeAtv !== '' ? true : false;
            }

            // let typeName = this.state.selectedTypeName
            // typeName = typeName !== undefined && typeName !== null ? typeName.toUpperCase() : ''
            // const subType = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Powersport').toUpperCase() ? 1 : '' : ''
            // const typeMotor = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Motorcycle').toUpperCase() ? 1 : '' : ''
            // const typeBoat = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('BOAT').toUpperCase() ? 1 : '' : ''
            // const typeRV = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('RV').toUpperCase() ? 1 : '' : ''
            // const typeSmall = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 1 : '' : ''
            // let startPercent = 0
            // startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 16 : typeSmall !== '' ? 100 / 16 : 100 / 24
            // console.log('startPercent ', startPercent)
            // // let boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 13 : typeSmall !== '' ? 13 : 22
            // let paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 14 : typeSmall !== '' ? 14 : 23
            console.log(Number(paymentScreen), this.state.startPercent, 'defaultSelectedBoost Name ')

            this.setState({
                ...this.state,
                step: 22,
                lastStep: 22,
                // Add Payment
                barPercent: Number(paymentScreen) * this.state.startPercent,
                animation: "fadeInUp",
                finalizeStep: 1,
                // animation: this.state.animation,
                tab: 6,
                postSteps: this.state.postSteps.slice().map(item => {
                    if (item.value < 6) {
                        return {
                            ...item,
                            completed: item.value === 5 ? false : true,
                            current: false,
                            disbaled: item.value === 5 ? true : false,
                        }
                    }
                    return {
                        ...item,
                        completed: false,
                        current: item.value === 6 ? true : false
                    }
                })
            })
        }
        if ((prevState.tab !== this.state.tab && this.state.tab > this.state.lastTab) || (prevState.step !== this.state.step && this.state.step > this.state.lastStep)) {
            this.setState({
                ...this.state,
                lastTab: this.state.tab,
                lastTabIndex: this.state.tab,
                lastStep: this.state.step,
            })
        }
        if (this.state.imageErrors !== undefined && this.state.imageErrors !== null && this.state.imageErrors.length > 0) {
            this.state.imageErrors.map(item => {
                toastr.error('Error', `${item.message}`)
            })
            this.setState({
                ...this.state,
                imageErrors: []
            })
        }
        if (prevProps.update_view !== this.props.update_view && this.props.update_view !== undefined) {
            this.setState({
                ...this.state,
                tab: 6,
                step: 24,
                barPercent: 100,
                finalizeStep: '',
                postSteps: this.state.postSteps.slice().map(item => {
                    if (item.value == 6) {
                        return {
                            ...item,
                            completed: true,
                            current: false,
                            disbaled: true,
                        }
                    }
                    return {
                        ...item,
                        disbaled: true,
                        completed: true,
                        current: false
                    }
                })
            })
        }
        if (prevState.checkPayment !== this.state.checkPayment && this.state.checkPayment !== undefined) {
            this.props.remove_card_intents()
        }
        if (prevProps.paypalPayment !== this.props.paypalPayment && this.props.paypalPayment !== undefined && this.props.paypalPayment === true) {
            this.create_post()
        }
        if (prevProps.post_ad_detail_edit !== this.props.post_ad_detail_edit && this.props.post_ad_detail_edit !== undefined && this.props.post_ad_detail_edit.length > 0) {
            this.props.post_ad_detail_edit.map(item => {
                let typeName = item.category !== undefined && item.category !== null ? item.category.name : ''
                typeName = typeName !== undefined && typeName !== null ? typeName.toUpperCase() : ''
                const subType = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Powersport').toUpperCase() ? 1 : '' : ''
                const typeMotor = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Motorcycle').toUpperCase() ? 1 : '' : ''
                const typeBoat = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('BOAT').toUpperCase() ? 1 : '' : ''
                const typeRV = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('RV').toUpperCase() ? 1 : '' : ''
                const typeSmall = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 1 : '' : ''
                const typeTrailer = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Trailer').toUpperCase() ? 1 : '' : ''
                let startPercent = 0
                let typeOfVehicleScreens = 0;
                let photoScreen = 0;
                let locationScreen = 0;
                let boostScreen = 0;
                let paymentScreen = 0;
                let newStepName = '';
                let engineStepName = '';
                let newStep = false;
                if (subType === '') {
                    startPercent = subType !== '' ? 0 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 21 : typeRV !== '' ? 100 / 17 : typeSmall !== '' ? 100 / 16 : typeTrailer !== '' ? 100 / 15 : 100 / 24
                    console.log('startPercent ', startPercent)
                    // typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 10 : typeSmall !== '' ? 10 : 19
                    typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 15 : typeRV !== '' ? 11 : typeSmall !== '' ? 10 : typeTrailer !== '' ? 10 : 19
                    // photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 11 : typeSmall !== '' ? 11 : 20
                    photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 16 : typeRV !== '' ? 12 : typeSmall !== '' ? 11 : typeTrailer !== '' ? 11 : 20
                    // locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 12 : typeSmall !== '' ? 12 : 21
                    locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 17 : typeRV !== '' ? 13 : typeSmall !== '' ? 12 : typeTrailer !== '' ? 12 : 21
                    // boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 13 : typeSmall !== '' ? 13 : 22
                    boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 18 : typeRV !== '' ? 14 : typeSmall !== '' ? 13 : typeTrailer !== '' ? 14 : 22
                    // paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 14 : typeSmall !== '' ? 14 : 23
                    paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 19 : typeRV !== '' ? 15 : typeSmall !== '' ? 14 : typeTrailer !== '' ? 14 : 23
                    newStepName = subType !== '' ? 'VIN Number' : typeName === ('Automotive').toUpperCase() ? 'VIN Number' : typeName === ('Boat').toUpperCase() ? 'HIN Number' : typeName === ('Small Equipment').toUpperCase() ? 'Serial Number' : '';
                    engineStepName = typeName === ('Boat').toUpperCase() ? 'Engine Horsepower' : typeName === ('Motorcycle').toUpperCase() ? 'Engine Horsepower' : typeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 'Engine Horsepower' : '';
                    newStep = subType !== '' ? false : typeName === ('Automotive').toUpperCase() ? true : typeName === ('Boat').toUpperCase() ? true : typeName === ('Small Equipment').toUpperCase() ? true : typeName === ('Motorcycle').toUpperCase() ? true : false;

                } else {
                    let subTypeName = item.sub_type_id !== undefined && item.sub_type_id !== null ? item.sub_type_id.name !== undefined && item.sub_type_id.name !== null ? item.sub_type_id.name || '' : '' : '';
                    const subType = subTypeName !== undefined && subTypeName !== null && subTypeName !== '' ? subTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || subTypeName.toUpperCase() === ('Watercraft').toUpperCase() ? 1 : '' : '';
                    const subTypeAtv = subTypeName !== undefined && subTypeName !== null && subTypeName !== '' ? subTypeName.toUpperCase() === ('ATV/UTV').toUpperCase() ? 1 : '' : '';

                    // const bar = 100 - this.state.barPercent
                    const bar = 100
                    startPercent = subTypeAtv === '' ? bar / 17 : bar / 19
                    typeOfVehicleScreens = subTypeAtv === '' ? 12 : 14
                    photoScreen = subTypeAtv === '' ? 13 : 15
                    locationScreen = subTypeAtv === '' ? 14 : 16
                    boostScreen = subTypeAtv === '' ? 15 : 17
                    paymentScreen = subTypeAtv === '' ? 16 : 18
                    newStepName = subType !== '' ? 'VIN Number' : '';
                    engineStepName = subType !== '' || subTypeAtv !== '' ? 'Engine Horsepower' : '';
                    newStep = subType !== '' || subTypeAtv !== '' ? true : false;
                }
                console.log(startPercent, 'Start')
                console.log('Screens ', typeOfVehicleScreens, photoScreen, locationScreen, boostScreen, paymentScreen)
                let images = item.images != undefined && item.images != null && item.images.length > 0 ? item.images || [] : []
                const imagesFiles = []
                const orignalImage = []
                let ad_id = ''
                for (var i = 0; i < 10; i++) {
                    if (images[i] !== undefined && images[i] !== null) {
                        ad_id = images[i].ad_id
                        imagesFiles.push({
                            id: i,
                            preViewFiles: null,
                            ad_id: images[i].ad_id,
                            path: images[i].image_path
                        })
                        orignalImage.push({
                            id: i,
                            files: null,
                            ad_id: images[i].ad_id,
                            path: images[i].image_path
                        })
                    } else {
                        imagesFiles.push({
                            id: i,
                            preViewFiles: null,
                            ad_id: ad_id,
                            path: ''
                        })
                        orignalImage.push({ ad_id: ad_id, id: i, path: '', files: null })
                    }

                }
                if (item.other_model !== undefined && item.other_model !== null && item.other_model !== '') {
                    this.props.handle_blur_make_model_trim('model')
                }
                if (item.other_trim !== undefined && item.other_trim !== null && item.other_trim !== '') {
                    this.props.handle_blur_make_model_trim('trim')
                }
                return this.setState({
                    boostAmount: item.listing_type !== undefined && item.listing_type !== null && item.listing_type.length > 0 ? item.listing_type[0] !== undefined && item.listing_type[0] !== null ? item.listing_type[0].price !== undefined && item.listing_type[0].price !== null ? item.listing_type[0].price || '' : '' : '' : '',
                    step: 1,
                    lastStep: 1,
                    defaultSelectedfeature: item.features !== undefined && item.features !== null && item.features.length > 0 ? JSON.parse(item.features) : [],
                    location: item.location !== undefined && item.location !== null ? [{ label: item.location, value: {} }] : [],
                    previousAccident: item.previous_accidents !== undefined && item.previous_accidents !== null ? item.previous_accidents : '',
                    previousOwner: item.previous_owners !== undefined && item.previous_owners !== null ? item.previous_owners : '',
                    color: item.color !== undefined && item.color !== null ? item.color : '',
                    cylinder: item.cylinder !== undefined && item.cylinder !== null ? item.cylinder : '',
                    drivetrain: item.drive_train !== undefined && item.drive_train !== null ? item.drive_train.id !== undefined && item.drive_train.id !== null ? item.drive_train.id || '' : '' : '',
                    fuelType: item.fuel_type !== undefined && item.fuel_type !== null ? item.fuel_type.id !== undefined && item.fuel_type.id !== null ? item.fuel_type.id || '' : '' : '',
                    transmission: item.transmission !== undefined && item.transmission !== null ? item.transmission : '',
                    seating: item.seating !== undefined && item.seating !== null ? item.seating : '',
                    passenger: item.passengers !== undefined && item.passengers !== null ? item.passengers : '',
                    selectSeating: item.seating ? { value: item.seating, label: item.seating } : { value: '2', label: '2' },
                    selectedPassenger: item.passengers ? { value: item.passengers, label: item.passengers } : { value: '2', label: '2' },
                    bodyType: item.body_type !== undefined && item.body_type !== null ? item.body_type.id !== undefined && item.body_type.id !== null ? item.body_type.id || '' : '' : '',
                    price: item.price !== undefined && item.price !== null ? item.price : '',
                    defaultPrice: item.price !== undefined && item.price !== null ? item.price : '',
                    kilometer: item.kilometer !== undefined && item.kilometer !== null ? item.kilometer : '',
                    selectCondition: item.v_condition !== undefined && item.v_condition !== null ? item.v_condition : '',
                    selectYear: { label: item.year !== undefined && item.year !== null ? item.year : '', value: item.year !== undefined && item.year !== null ? item.year : '' },
                    year: item.year !== undefined && item.year !== null ? item.year : '',
                    trimName: item.trim !== undefined && item.trim !== null && item.trim.length > 0 ? item.trim[0] !== undefined && item.trim[0] !== null ? item.trim[0].id !== undefined && item.trim[0].id !== null ? [{ value: item.trim[0].id, label: item.trim[0].v_trim }] || [] : [] : [] : [],
                    selectTrim: item.trim !== undefined && item.trim !== null && item.trim.length > 0 ? item.trim[0] !== undefined && item.trim[0] !== null ? item.trim[0].id !== undefined && item.trim[0].id !== null ? item.trim[0].id || '' : '' : '' : '',
                    otherTrim: item.other_trim !== undefined && item.other_trim !== null ? item.other_trim : '',
                    selectModel: item.model !== undefined && item.model !== null ? item.model.id !== undefined && item.model.id !== null ? item.model.id || '' : '' : '',
                    otherModel: item.other_model !== undefined && item.other_model !== null ? item.other_model : '',
                    modelName: item.model !== undefined && item.model !== null ? item.model.model_make !== undefined && item.model.model_make !== null ? [{ label: item.model.model_make, value: item.model.id }] || [] : [] : [],
                    typeOfVehicle: item.category !== undefined && item.category !== null ? item.category.id !== undefined && item.category.id !== null ? item.category.id || '' : '' : '',
                    subTypeId: item.sub_type_id !== undefined && item.sub_type_id !== null ? item.sub_type_id.id !== undefined && item.sub_type_id.id !== null ? item.sub_type_id.id || '' : '' : '',
                    subVehicleType: item.sub_type_id !== undefined && item.sub_type_id !== null ? item.sub_type_id.id !== undefined && item.sub_type_id.id !== null ? item.sub_type_id.id || '' : '' : '',
                    stepBoost: 1,
                    checkPayment: item.payment_mode !== undefined && item.payment_mode !== null && item.payment_mode !== '' ? item.payment_mode !== 'free' ? item.payment_mode : "" : '',
                    defaultCheckPayment: item.payment_mode !== undefined && item.payment_mode !== null && item.payment_mode !== '' ? item.payment_mode : '',
                    // !== 'free' ? item.payment_mode : ""
                    otherMake: item.other_make !== undefined && item.other_make !== null ? item.other_make : '',
                    makeName: item.make !== undefined && item.make !== null ? item.make.make_name !== undefined && item.make.make_name !== null ? [{ label: item.make.make_name, value: item.make.id }] || [] : [] : [],
                    selectVehicleMake: item.make !== undefined && item.make !== null ? item.make.id !== undefined && item.make.id !== null ? item.make.id || '' : '' : '',
                    files: orignalImage,
                    preViewFiles: imagesFiles,
                    hardCodeInt: 1,
                    nullState: null,
                    locationValues: [],
                    longitude: item.longitude !== undefined && item.longitude !== null ? item.longitude : '',
                    latitude: item.latitude !== undefined && item.latitude !== null ? item.latitude : '',
                    locationName: item.location !== undefined && item.location !== null ? item.location : '',
                    backTo: '',
                    tab: 1,
                    lastTab: 1,
                    lastTabIndex: 1,
                    engineCC: item.engine !== undefined && item.engine !== null ? item.engine : '',
                    finalizeStep: 1,
                    selectedSubTypeName: item.sub_type_id !== undefined && item.sub_type_id !== null ? item.sub_type_id.name !== undefined && item.sub_type_id.name !== null ? item.sub_type_id.name || '' : '' : '',
                    user_id: this.props.user !== null && this.props.user !== undefined ? this.props.user.user_id : '',
                    colors: [
                        { name: 'Green', classname: 'ColorGreen' },
                        { name: 'Yellow', classname: 'ColorYellow' },
                        { name: 'Orange', classname: 'ColorOrange' },
                        { name: 'Purple', classname: 'ColorPurple' },
                        { name: 'Blue', classname: 'ColorBlue' },
                        { name: 'Silver', classname: 'ColorSilver' },
                        { name: 'Black', classname: 'ColorBlack' },
                        { name: 'Red', classname: 'ColorRed' },
                        { name: 'Gold', classname: 'ColorGold' },
                        { name: 'Grey', classname: 'ColorGrey' },
                        { name: 'Biege', classname: 'ColorBiege' },
                        { name: 'Brown', classname: 'ColorBrown' },
                        { name: 'Other', classname: 'ColorGrey' },
                    ],
                    cylinders: [
                        { value: '3' }, { value: '4' }, { value: '5' }, { value: '6' }, { value: '8' }, { value: '12' }],
                    transmissions: [
                        { name: 'Automatic' },
                        { name: 'Manual' }],
                    steeringTypes: [
                        { name: 'Tille' },
                        { name: 'Wheel' }],
                    seatings: [{ value: '2', label: '2' }, { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }, { value: '8', label: '8' }, { value: '10', label: '10+' }],
                    passengers: [{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }, { value: '7', label: '7' }, { value: '8', label: '8' }, { value: '9', label: '9' }, { value: '10', label: '10' }, { value: '10', label: '10+' }],
                    // trims: [{ name: '1.5 EMT I DTEC' }, { name: '1.5 S CVT Diesel' }, { name: '1.5 S CVT DTEC' }, { name: 'None' }],
                    trims: [],
                    conditions: [{ name: 'New' }, { name: 'Used' }],
                    owners: [{ name: '1 Owner', value: 1 }, { name: '2 Owner', value: 2 }, { name: '2+ Owner', value: 3 }],
                    accidents: [{ name: 'No Accidents', value: 0 }, { name: '1 Accident', value: 1 }, { name: '2+ Accidents', value: 2 }],
                    barPercent: startPercent,
                    startPercent: startPercent,
                    newStepName: newStepName,
                    engineStepName: engineStepName,
                    newStep: newStep,
                    steeringType: item.steering_type !== undefined && item.steering_type !== null ? item.steering_type : '',
                    vinNumber: item.vin !== undefined && item.vin !== null ? item.vin : '',
                    hinNumber: item.hin !== undefined && item.hin !== null ? item.hin : '',
                    boatHours: item.hours !== undefined && item.hours !== null ? item.hours : '',
                    selectedTypeName: item.category !== undefined && item.category !== null ? item.category.name !== undefined && item.category.name !== null ? item.category.name || '' : '' : '',
                    serialNumber: item.serial_number !== undefined && item.serial_number !== null ? item.serial_number : '',
                    uploadImages: orignalImage,
                    previewImages: imagesFiles,
                    isBlocking: true,
                    description: item.description !== undefined && item.description !== null ? item.description : '',
                    totalSlides: 24,
                    animation: "fadeInUp",
                    imageErrors: [],
                    cardNumber: '',
                    cardExpiry: '',
                    cardCvc: '',
                    selectedBoost: item.listing_type !== undefined && item.listing_type !== null && item.listing_type.length > 0 ? item.listing_type[0] !== undefined && item.listing_type[0] !== null ? item.listing_type[0].listing_type !== undefined && item.listing_type[0].listing_type !== null ? item.listing_type[0].listing_type || '' : '' : '' : '',
                    defaultSelectedBoost: item.listing_type !== undefined && item.listing_type !== null && item.listing_type.length > 0 ? item.listing_type[0] !== undefined && item.listing_type[0] !== null ? item.listing_type[0].listing_type !== undefined && item.listing_type[0].listing_type !== null ? item.listing_type[0].listing_type || '' : '' : '' : '',
                    postSteps: this.state.postSteps.slice().map(item => {
                        if (item.value < 6) {
                            return {
                                ...item,
                                perc: item.value === 1 ? 0 : item.value === 2 ? Number(typeOfVehicleScreens) * Number(startPercent) : item.value === 3 ? Number(startPercent) * Number(photoScreen) : item.value === 4 ? Number(startPercent) * Number(locationScreen) : item.value === 5 ? Number(startPercent) * Number(boostScreen) : item.parc,
                                completed: true,
                                current: false,
                                disbaled: item.value === 5 ? true : false
                            }
                        }
                        return {
                            ...item,
                            completed: false,
                            current: true,
                            perc: item.value === 6 ? Number(startPercent) * Number(paymentScreen) : item.parc,
                        }
                    }),
                    postCity: item.city !== undefined && item.city !== null ? item.city : '',
                    length: item.length !== undefined && item.length !== null ? item.length : '',
                    weight: item.weight !== undefined && item.weight !== null ? item.weight : '',
                    appStatus: item.is_active ? item.is_active : ''
                })

            })

        }
        if ((prevProps.vehicle_features !== this.props.vehicle_features && this.props.vehicle_features !== undefined && this.props.vehicle_features.length > 0)) {
            this.setState({
                ...this.state,
                vehicle_features: this.props.vehicle_features.slice().map(item => {
                    return {
                        ...item,
                        checked: this.state.defaultSelectedfeature.filter((feat, featIndex) => Number(feat.id) === Number(item.id)) !== undefined && this.state.defaultSelectedfeature.filter((feat, featIndex) => Number(feat.id) === Number(item.id)) !== null && this.state.defaultSelectedfeature.filter((feat, featIndex) => Number(feat.id) === Number(item.id)).length > 0 ? true : false
                    }
                })
            })
        }
    }

    completePostAdd = () => {
        this.setState({
            ...this.state,
            tab: 6,
            step: 24,
            barPercent: 100,
            finalizeStep: '',
            postSteps: this.state.postSteps.slice().map(item => {
                if (item.value == 6) {
                    return {
                        ...item,
                        completed: true,
                        current: false,
                        disbaled: true,
                    }
                }
                return {
                    ...item,
                    disbaled: true,
                    completed: true,
                    current: false
                }
            })
        })
    }

    emptyFunction = () => {
        return true
    }

    blurMake = () => {
        this.props.handle_blur_make_model_trim('model')
    }

    blurModel = () => {
        this.props.handle_blur_make_model_trim('trim')
    }

    blurTrim = () => {
        this.setState({
            ...this.state,
            otherTrim: this.state.otherTrim,
        })
    }


    handleOnChangeVinHinSerial = (e) => {
        const { value, name } = e.target
        if (name === 'vinNumber') {
            if (value.length > 17) {
                // toastr.error('Error', 'Vin Number Contain 17 Characters')
                return false
            }
        }
        if (name === 'hinNumber') {
            if (value.length > 14) {
                // toastr.error('Error', 'Hin Number Contain 14 Characters')
                return false
            }
        }
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    changeSubVehicleTye = (tab) => {
        this.setState({
            ...this.state,
            subVehicleType: tab
        })
    }

    changeSilde = (e, perc) => {
        if (e == 2) {
            if (this.state.typeOfVehicle === '' || this.state.typeOfVehicle === undefined || this.state.typeOfVehicle === null) {
                toastr.error('Error', 'Please Select Category')
                return false
            }
        }

        if (e === 3) {
            if ((this.state.selectVehicleMake === '' || this.state.selectVehicleMake === undefined || this.state.selectVehicleMake === null) && (this.state.otherMake === '' || this.state.otherMake === undefined || this.state.otherMake === null) && (this.state.makeName === '' || this.state.makeName === undefined || this.state.makeName === null)) {
                toastr.error('Error', 'Please Select Make')
                return false
            }
        }

        if (e === 4) {
            if ((this.state.selectModel === '' || this.state.selectModel === undefined || this.state.selectModel === null) && (this.state.otherModel === '' || this.state.otherModel === undefined || this.state.otherModel === null) && (this.state.modelName === '' || this.state.modelName === undefined || this.state.modelName === null)) {
                toastr.error('Error', 'Please Select Model')
                return false
            }
        }

        if (this.state.selectedTypeName.toUpperCase() === ("Automotive").toUpperCase()) {
            console.log(this.state.selectTrim, this.state.otherTrim, this.state.trimName, this.state.trims)
            if (e === 5 && this.state.trims !== undefined && this.state.trims.length > 0) {
                if ((this.state.selectTrim === '' || this.state.selectTrim === undefined || this.state.selectTrim === null) && (this.state.otherTrim === '' || this.state.otherTrim === undefined || this.state.otherTrim === null) && (this.state.trimName === '' || this.state.trimName === undefined || this.state.trimName === null)) {
                    toastr.error('Error', 'Please Select Trim')
                    return false
                }
            }
            if (e === 6) {
                if ((this.state.selectYear === '' || this.state.selectYear === undefined)) {
                    toastr.error('Error', 'Please Select Year')
                    return false
                }
            }
            if (this.state.newStep === true && e === 1.2) {
                if ((this.state.selectCondition === '' || this.state.selectCondition === undefined)) {
                    toastr.error('Error', 'Please Select Condition')
                    return false
                }
            }

            if (this.state.newStep === true && e === 1.3) {
                if (this.state.newStepName === 'VIN Number') {
                    if (this.state.vinNumber === '' || this.state.vinNumber === undefined || this.state.vinNumber.length < 17) {
                        toastr.error('Error', `Please Enter 17 Vin Number `)
                        return false
                    }
                }

                if (this.state.newStepName === 'HIN Number') {
                    if (this.state.hinNumber === '' || this.state.hinNumber === undefined || this.state.hinNumber.length < 12) {
                        toastr.error('Error', `Please Enter 12 to 14 HIN Number`)
                        return false
                    }
                }
                if (this.state.newStepName === 'Serial Number') {
                    if ((this.state.serialNumber === '' || this.state.serialNumber === undefined)) {
                        toastr.error('Error', `Please Select Serial Number`)
                        return false
                    }
                }

            }
            if (e === 7) {
                if ((this.state.selectCondition === '' || this.state.selectCondition === undefined)) {
                    toastr.error('Error', 'Please Select Condition')
                    return false
                }
            }

            if (e === 8) {
                if ((this.state.price === '' || this.state.price === undefined || this.state.price === null) || (this.state.kilometer === '' || this.state.kilometer === undefined || this.state.kilometer === null)) {
                    toastr.error('Error', 'Please Enter Price And Kilometer')
                    return false
                }
            }
            if (e === 9) {
                if ((this.state.bodyType === '' || this.state.bodyType === undefined)) {
                    toastr.error('Error', 'Please Select Body Type')
                    return false
                }
            }


            if (e === 10) {
                if ((this.state.seating === '' || this.state.seating === undefined)) {
                    toastr.error('Error', 'Please Select Seating')
                    return false
                }
            }

            if (e === 11) {
                if ((this.state.transmission === '' || this.state.transmission === undefined)) {
                    toastr.error('Error', 'Please Select Transmission')
                    return false
                }
            }

            if (e === 12) {
                if ((this.state.fuelType === '' || this.state.fuelType === undefined)) {
                    toastr.error('Error', 'Please Select Fuel Type')
                    return false
                }
            }

            if (e === 13) {
                if ((this.state.drivetrain === '' || this.state.drivetrain === undefined)) {
                    toastr.error('Error', 'Please Select Drive Train')
                    return false
                }
            }

            if (e === 14) {
                if ((this.state.cylinder === '' || this.state.cylinder === undefined)) {
                    toastr.error('Error', 'Please Select Cylinder')
                    return false
                }
            }
            if (e === 15) {
                if ((this.state.color === '' || this.state.color === undefined)) {
                    toastr.error('Error', 'Please Select Color')
                    return false
                }
            }
            if (e === 16) {
                if ((this.state.previousOwner === '' || this.state.previousOwner === undefined)) {
                    toastr.error('Error', 'Please Select Previous Owner')
                    return false
                }
            }
            if (e === 17) {
                if ((this.state.previousAccident === '' || this.state.previousAccident === undefined)) {
                    toastr.error('Error', 'Please Select Previous Accident')
                    return false
                }
            }
            if (e === 18) {
                if ((this.state.vehicle_features.filter(item => item.checked === true).length === 0)) {
                    toastr.error('Error', 'Please Select Features')
                    return false
                }
            }
        }
        if (this.state.selectedTypeName.toUpperCase() === ("BOAT").toUpperCase()) {
            if (e === 4.1) {
                if ((this.state.selectModel === '' || this.state.selectModel === undefined || this.state.selectModel === null) && (this.state.otherModel === '' || this.state.otherModel === undefined || this.state.otherModel === null) && (this.state.modelName === '' || this.state.modelName === undefined || this.state.modelName === null)) {
                    toastr.error('Error', 'Please Select Model')
                    return false
                }
            }
            if (e === 5) {
                if ((this.state.boatHours === '' || this.state.boatHours === undefined || this.state.boatHours === null)) {
                    toastr.error('Error', 'Please Enter Hours')
                    return false
                }
            }
            if (e === 6) {
                if ((this.state.selectYear === '' || this.state.selectYear === undefined)) {
                    toastr.error('Error', 'Please Select Year')
                    return false
                }
            }
            if (this.state.newStep === true && e === 1.2) {
                if ((this.state.selectCondition === '' || this.state.selectCondition === undefined)) {
                    toastr.error('Error', 'Please Select Condition')
                    return false
                }
            }

            if (this.state.newStep === true && (e === 1.3)) {
                if (this.state.newStepName === 'VIN Number') {
                    if (this.state.vinNumber === '' || this.state.vinNumber === undefined || this.state.vinNumber.length < 17) {
                        toastr.error('Error', `Please Enter 17 Vin Number `)
                        return false
                    }
                }

                if (this.state.newStepName === 'HIN Number') {
                    if (this.state.hinNumber === '' || this.state.hinNumber === undefined || this.state.hinNumber.length < 12) {
                        toastr.error('Error', `Please Enter 12 to 14 HIN Number`)
                        return false
                    }
                }
                if (this.state.newStepName === 'Serial Number') {
                    if ((this.state.serialNumber === '' || this.state.serialNumber === undefined)) {
                        toastr.error('Error', `Please Select Serial Number`)
                        return false
                    }
                }
            }
            if (this.state.newStep === true && this.state.engineStepName !== '' && e === 7) {
                if (this.state.engineStepName === 'Engine Horsepower') {
                    if ((this.state.engineCC === '' || this.state.engineCC === undefined)) {
                        toastr.error('Error', `Please Select Engine Horsepower`)
                        return false
                    }
                }
            }

            if (e === 9) {
                if ((this.state.price === '' || this.state.price === undefined || this.state.price === null)) {
                    toastr.error('Error', 'Please Enter Price And Kilometer')
                    return false
                }
                // if ((this.state.price === '' || this.state.price === undefined || this.state.price === null) || (this.state.kilometer === '' || this.state.kilometer === undefined || this.state.kilometer === null)) {
                //     toastr.error('Error', 'Please Enter Price And Kilometer')
                //     return false
                // }
            }
            if (e === 10 && this.state.selectedTypeName.toUpperCase() === ("BOAT").toUpperCase()) {
                if ((this.state.passenger === '' || this.state.passenger === undefined)) {
                    toastr.error('Error', 'Please Select Passenger')
                    return false
                }
            }

            if (e === 11 && this.state.selectedTypeName.toUpperCase() === ("BOAT").toUpperCase()) {
                if ((this.state.steeringType === '' || this.state.steeringType === undefined)) {
                    toastr.error('Error', 'Please Select Steering Type')
                    return false
                }
            }

            if (e === 15) {
                if ((this.state.fuelType === '' || this.state.fuelType === undefined)) {
                    toastr.error('Error', 'Please Select Fuel Type')
                    return false
                }
            }

            if (e === 17) {
                if ((this.state.previousOwner === '' || this.state.previousOwner === undefined)) {
                    toastr.error('Error', 'Please Select Previous Owner')
                    return false
                }
            }
        }
        if (this.state.selectedTypeName.toUpperCase() === ("MOTORCYCLE").toUpperCase()) {
            if (e === 5) {
                if ((this.state.selectModel === '' || this.state.selectModel === undefined || this.state.selectModel === null) && (this.state.otherModel === '' || this.state.otherModel === undefined || this.state.otherModel === null) && (this.state.modelName === '' || this.state.modelName === undefined || this.state.modelName === null)) {
                    toastr.error('Error', 'Please Select Model')
                    return false
                }
            }
            if (e === 6) {
                if ((this.state.selectYear === '' || this.state.selectYear === undefined)) {
                    toastr.error('Error', 'Please Select Year')
                    return false
                }
            }
            if (this.state.newStep === true && e === 1.3) {
                if ((this.state.selectCondition === '' || this.state.selectCondition === undefined)) {
                    toastr.error('Error', 'Please Select Condition')
                    return false
                }

            }

            if (this.state.newStep === true && this.state.engineStepName !== '' && e === 7) {
                if (this.state.engineStepName === 'Engine Horsepower') {
                    if ((this.state.engineCC === '' || this.state.engineCC === undefined)) {
                        toastr.error('Error', `Please Select Engine Horsepower`)
                        return false
                    }
                }
            }
            if (e === 14) {
                if ((this.state.price === '' || this.state.price === undefined || this.state.price === null) || (this.state.kilometer === '' || this.state.kilometer === undefined || this.state.kilometer === null)) {
                    toastr.error('Error', 'Please Enter Price And Kilometer')
                    return false
                }
            }
            if (e === 15) {
                if ((this.state.color === '' || this.state.color === undefined)) {
                    toastr.error('Error', 'Please Select Color')
                    return false
                }
            }
            if (e === 16) {
                if ((this.state.previousOwner === '' || this.state.previousOwner === undefined)) {
                    toastr.error('Error', 'Please Select Previous Owner')
                    return false
                }
            }

            if (e === 17) {
                if ((this.state.previousAccident === '' || this.state.previousAccident === undefined)) {
                    toastr.error('Error', 'Please Select Previous Accident')
                    return false
                }
            }
            if (e === 18) {
                if ((this.state.vehicle_features.filter(item => item.checked === true).length === 0)) {
                    toastr.error('Error', 'Please Select Features')
                    return false
                }
            }
        }
        if (this.state.selectedTypeName.toUpperCase() === ("RV").toUpperCase()) {
            if (e === 5) {
                if ((this.state.selectModel === '' || this.state.selectModel === undefined || this.state.selectModel === null) && (this.state.otherModel === '' || this.state.otherModel === undefined || this.state.otherModel === null) && (this.state.modelName === '' || this.state.modelName === undefined || this.state.modelName === null)) {
                    toastr.error('Error', 'Please Select Model')
                    return false
                }
            }
            if (e === 6) {
                if ((this.state.selectYear === '' || this.state.selectYear === undefined)) {
                    toastr.error('Error', 'Please Select Year')
                    return false
                }
            }
            if (e === 7) {
                if ((this.state.selectCondition === '' || this.state.selectCondition === undefined)) {
                    toastr.error('Error', 'Please Select Condition')
                    return false
                }
            }

            // if (e === 8) {
            //     if ((this.state.price === '' || this.state.price === undefined || this.state.price === null) || (this.state.kilometer === '' || this.state.kilometer === undefined || this.state.kilometer === null)) {
            //         toastr.error('Error', 'Please Enter Price And Kilometer')
            //         return false
            //     }
            // }
            if (e === 7.1) {
                if ((this.state.price === '' || this.state.price === undefined || this.state.price === null) || (this.state.kilometer === '' || this.state.kilometer === undefined || this.state.kilometer === null)) {
                    toastr.error('Error', 'Please Enter Price And Kilometer')
                    return false
                }
            }
            if (e === 15) {
                if ((this.state.length === '' || this.state.length === undefined || this.state.length === null) || (this.state.weight === '' || this.state.weight === undefined || this.state.weight === null)) {
                    toastr.error('Error', 'Please Enter Length And Weight')
                    return false
                }
            }
            // if (e === 15) {
            //     if ((this.state.price === '' || this.state.price === undefined || this.state.price === null) || (this.state.kilometer === '' || this.state.kilometer === undefined || this.state.kilometer === null)) {
            //         toastr.error('Error', 'Please Enter Price And Kilometer')
            //         return false
            //     }
            // }

            if (e === 16) {
                if ((this.state.previousOwner === '' || this.state.previousOwner === undefined)) {
                    toastr.error('Error', 'Please Select  Previous Owner')
                    return false
                }
            }

            if (e === 17) {
                if ((this.state.previousAccident === '' || this.state.previousAccident === undefined)) {
                    toastr.error('Error', 'Please Select  Previous Accident')
                    return false
                }
            }
            if (e === 18) {
                if ((this.state.vehicle_features.filter(item => item.checked === true).length === 0)) {
                    toastr.error('Error', 'Please Select Features')
                    return false
                }
            }
        }
        if (this.state.selectedSubTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || this.state.selectedSubTypeName.toUpperCase() === ('Watercraft').toUpperCase()) {
            if (e === 4.1) {
                if ((this.state.selectModel === '' || this.state.selectModel === undefined || this.state.selectModel === null) && (this.state.otherModel === '' || this.state.otherModel === undefined || this.state.otherModel === null) && (this.state.modelName === '' || this.state.modelName === undefined || this.state.modelName === null)) {
                    toastr.error('Error', 'Please Select Model')
                    return false
                }
            }
            if (e === 5) {
                if ((this.state.boatHours === '' || this.state.boatHours === undefined || this.state.boatHours === null)) {
                    toastr.error('Error', 'Please Enter Hours')
                    return false
                }
            }
            if (e === 6) {
                if ((this.state.selectYear === '' || this.state.selectYear === undefined)) {
                    toastr.error('Error', 'Please Select Year')
                    return false
                }
            }
            if (this.state.newStep === true && e === 1.2) {
                if ((this.state.selectCondition === '' || this.state.selectCondition === undefined)) {
                    toastr.error('Error', 'Please Select Condition')
                    return false
                }

            }
            if (this.state.newStep === true && e === 1.3) {
                if (this.state.newStepName === 'VIN Number') {
                    if (this.state.vinNumber === '' || this.state.vinNumber === undefined || this.state.vinNumber.length < 17) {
                        toastr.error('Error', `Please Enter 17 Vin Number `)
                        return false
                    }
                }

                if (this.state.newStepName === 'HIN Number') {
                    if (this.state.hinNumber === '' || this.state.hinNumber === undefined || this.state.hinNumber.length < 12) {
                        toastr.error('Error', `Please Enter 12 to 14 HIN Number`)
                        return false
                    }
                }
                if (this.state.newStepName === 'Serial Number') {
                    if ((this.state.serialNumber === '' || this.state.serialNumber === undefined)) {
                        toastr.error('Error', `Please Select Serial Number`)
                        return false
                    }
                }

            }
            if (this.state.newStep === true && this.state.engineStepName !== '' && e === 7) {
                if (this.state.engineStepName === 'Engine Horsepower') {
                    if ((this.state.engineCC === '' || this.state.engineCC === undefined)) {
                        toastr.error('Error', `Please Select Engine Horsepower`)
                        return false
                    }
                }
            }
            if (e === 15) {
                if ((this.state.price === '' || this.state.price === undefined || this.state.price === null) || (this.state.kilometer === '' || this.state.kilometer === undefined || this.state.kilometer === null)) {
                    toastr.error('Error', 'Please Enter Price And Kilometer')
                    return false
                }
            }
            if (e === 18) {
                if ((this.state.previousOwner === '' || this.state.previousOwner === undefined)) {
                    toastr.error('Error', 'Please Select Previous Owner')
                    return false
                }
            }
        }
        if (this.state.selectedSubTypeName.toUpperCase() === ('ATV/UTV').toUpperCase()) {
            if (e === 5) {
                if ((this.state.selectModel === '' || this.state.selectModel === undefined || this.state.selectModel === null) && (this.state.otherModel === '' || this.state.otherModel === undefined || this.state.otherModel === null) && (this.state.modelName === '' || this.state.modelName === undefined || this.state.modelName === null)) {
                    toastr.error('Error', 'Please Select Model')
                    return false
                }
            }
            if (e === 6) {
                if ((this.state.selectYear === '' || this.state.selectYear === undefined)) {
                    toastr.error('Error', 'Please Select Year')
                    return false
                }
            }
            if (this.state.newStep === true && e === 1.3 && this.state.selectedSubTypeName.toUpperCase() === ('ATV/UTV').toUpperCase()) {
                if ((this.state.selectCondition === '' || this.state.selectCondition === undefined)) {
                    toastr.error('Error', 'Please Select Condition')
                    return false
                }

            }
            if (this.state.newStep === true && this.state.engineStepName !== '' && e === 7) {
                if (this.state.engineStepName === 'Engine Horsepower') {
                    if ((this.state.engineCC === '' || this.state.engineCC === undefined)) {
                        toastr.error('Error', `Please Select Engine Horsepower`)
                        return false
                    }
                }
            }
            if (e === 10) {
                if ((this.state.price === '' || this.state.price === undefined || this.state.price === null) || (this.state.kilometer === '' || this.state.kilometer === undefined || this.state.kilometer === null)) {
                    toastr.error('Error', 'Please Enter Price And Kilometer')
                    return false
                }
            }
            if (e === 14) {
                if ((this.state.transmission === '' || this.state.transmission === undefined)) {
                    toastr.error('Error', 'Please Select Transmission')
                    return false
                }
            }
            if (e === 15) {
                if ((this.state.color === '' || this.state.color === undefined)) {
                    toastr.error('Error', 'Please Select Color')
                    return false
                }
            }
            if (e === 16) {
                if ((this.state.previousOwner === '' || this.state.previousOwner === undefined)) {
                    toastr.error('Error', 'Please Select Previous Owner')
                    return false
                }
            }
            if (e === 17) {
                if ((this.state.previousAccident === '' || this.state.previousAccident === undefined)) {
                    toastr.error('Error', 'Please Select Previous Accident')
                    return false
                }
            }
            if (e === 18 && this.state.selectedSubTypeName.toUpperCase() !== ('Snowmobile').toUpperCase() && this.state.selectedSubTypeName.toUpperCase() !== ('Watercraft').toUpperCase()) {
                if ((this.state.vehicle_features.filter(item => item.checked === true).length === 0)) {
                    toastr.error('Error', 'Please Select Features')
                    return false
                }
            }

        }
        if (this.state.selectedTypeName.toUpperCase() === ('Small Equipment').toUpperCase()) {
            if (e === 4.1) {
                if ((this.state.selectModel === '' || this.state.selectModel === undefined || this.state.selectModel === null) && (this.state.otherModel === '' || this.state.otherModel === undefined || this.state.otherModel === null) && (this.state.modelName === '' || this.state.modelName === undefined || this.state.modelName === null)) {
                    toastr.error('Error', 'Please Select Model')
                    return false
                }
            }
            if (e === 5) {
                if ((this.state.boatHours === '' || this.state.boatHours === undefined || this.state.boatHours === null)) {
                    toastr.error('Error', 'Please Enter Hours')
                    return false
                }
            }
            if (e === 6) {
                if ((this.state.selectYear === '' || this.state.selectYear === undefined)) {
                    toastr.error('Error', 'Please Select Year')
                    return false
                }
            }
            if (this.state.newStep === true && e === 1.2) {
                if ((this.state.selectCondition === '' || this.state.selectCondition === undefined)) {
                    toastr.error('Error', 'Please Select Condition')
                    return false
                }

            }
            if (this.state.newStep === true && e === 1.3) {
                if (this.state.newStepName === 'VIN Number') {
                    if (this.state.vinNumber === '' || this.state.vinNumber === undefined || this.state.vinNumber.length < 17) {
                        toastr.error('Error', `Please Enter 17 Vin Number `)
                        return false
                    }
                }

                if (this.state.newStepName === 'HIN Number') {
                    if (this.state.hinNumber === '' || this.state.hinNumber === undefined || this.state.hinNumber.length < 12) {
                        toastr.error('Error', `Please Enter 12 to 14 HIN Number`)
                        return false
                    }
                }
                if (this.state.newStepName === 'Serial Number') {
                    if ((this.state.serialNumber === '' || this.state.serialNumber === undefined)) {
                        toastr.error('Error', `Please Select Serial Number`)
                        return false
                    }
                }

            }
            if (this.state.newStep === true && this.state.engineStepName !== '' && e === 7) {
                if (this.state.engineStepName === 'Engine Horsepower') {
                    if ((this.state.engineCC === '' || this.state.engineCC === undefined)) {
                        toastr.error('Error', `Please Select Engine Horsepower`)
                        return false
                    }
                }
            }
            if (e === 18) {
                if ((this.state.price === '' || this.state.price === undefined || this.state.price === null) || (this.state.kilometer === '' || this.state.kilometer === undefined || this.state.kilometer === null)) {
                    toastr.error('Error', 'Please Enter Price And Kilometer')
                    return false
                }
            }
        }
        this.setState({
            ...this.state,
            step: e,
            barPercent: this.state.barPercent + (perc),
            animation: (perc) > 0 ? "fadeInUp" : "fadeInDown"
            // e === 1 ? 0 : this.state.stepBoost === 2 ? this.state.barPercent + (perc) + 6.66 : this.state.stepBoost === 3 ? this.state.barPercent + (perc) + 13.32 : 
        })
    }

    handleOnClickBoost = (name, value, e, perc, prev, current, finalizeId, amount) => {
        console.log('name, value, e, perc, prev, current, finalizeId, amount', name, value, e, perc, prev, current, finalizeId, amount)
        // if (this.state.backTo == '') {
        if (this.state.defaultSelectedBoost === 'premium') {
            this.setState({
                ...this.state,
                step: 23,
                tab: 6,
                backTo: '',
                // finalizeStep: finalizeId !== undefined ? finalizeId : this.state.finalizeStep,
                // /Add Payment
                // card: '',
                barPercent: this.state.barPercent + (perc),
                postSteps: this.state.postSteps.slice().map(item => {
                    if (item.value == 6) {
                        return {
                            ...item,
                            current: true
                        }
                    }
                    return {
                        ...item,
                        current: false,
                    }
                }),
                animation: "fadeInUp"
            });
        } else {
            current = this.state.defaultSelectedBoost !== value && value !== 'free' ? 5 : current
            perc = this.state.defaultSelectedBoost !== value && value !== 'free' ? this.state.startPercent : this.state.startPercent * 2
            this.setState({
                ...this.state,
                [name]: value,
                // defaultSelectedBoost: '',
                card: null,
                checkPayment: '',
                // stepBoost: e
                tab: current,
                postSteps: this.state.defaultSelectedBoost === value ? this.state.postSteps.slice().map(item => {
                    if (item.value == current) {
                        return {
                            ...item,
                            current: true,
                        }
                    }
                    return {
                        ...item,
                        completed: item.value === 6 ? false : (item.value === 5 && value === 'free') ? false : true,
                        current: false,
                    }
                }) : this.state.postSteps.slice().map(item => {
                    if (item.value == current) {
                        return {
                            ...item,
                            current: true,
                            disbaled: (item.value === 5 && value === 'free') || (item.value === 5 && this.state.defaultSelectedBoost !== value && value !== 'free') ? true : false,

                            // completed: item.value === 5 && value === 'free' ? false : true
                        }
                    }
                    return {
                        ...item,
                        completed: item.value === 6 ? false : (item.value === 5 && value === 'free') ? false : true,
                        // completed: item.value === 6 ? false : item.value === 5 && value === 'free' ? false : true,
                        current: false,
                        disbaled: (item.value === 5 && value === 'free') || (item.value === 5 && this.state.defaultSelectedBoost !== value && value !== 'free') ? true : false
                    }

                }),
                step: e,
                finalizeStep: finalizeId !== undefined ? finalizeId : this.state.finalizeStep,
                // finalizeStep: value === 'free' ? 1 : this.state.finalizeStep,
                backTo: value !== this.state.defaultSelectedBoost ? '' : this.state.backTo,
                barPercent: this.state.barPercent + (perc),
                animation: (perc) > 0 ? "fadeInUp" : "fadeInDown",
                boostAmount: (amount),
                amountPay: Number(amount) + ((Number(amount) / 100) * 13),
                // checkPayment: value === 'free' ? '' : this.state.checkPayment
            });
        }

    };

    setCardError = (name, card) => {
        this.setState({
            ...this.state,
            [name]: card
        })
    }

    changeStepButton = (step, prev, current, perc, finalizeId, card) => {
        console.log('step, prev, current, perc, finalizeId, card', step, prev, current, perc, finalizeId, card)
        if (step == 19) {
            if ((this.state.description === '' || this.state.description === null)) {
                toastr.error('Error', 'Please Enter Description')
                return false
            }
        }

        if (step == 20) {
            if ((this.state.uploadImages == null || this.state.uploadImages == undefined || this.state.uploadImages.filter(item => item.files !== null || item.path !== '').length == 0)) {
                toastr.error('Error', 'Please Select Car Images')
                return false
            }
            if ((this.state.uploadImages !== null && this.state.uploadImages !== undefined && this.state.uploadImages.filter(item => item.files !== null || item.path !== '').length < 4)) {
                toastr.error('Error', 'Please Select Atleast 4 Car Images')
                return false
            }
        }
        if (step == 21) {
            if ((this.state.location == null || this.state.location == undefined || this.state.location == '')) {
                toastr.error('Error', 'Please Select Location')
                return false
            }
        }
        /**
         * 
         * Card Validation
         */
        if (this.state.selectedBoost !== 'free') {
            if (step == 23) {
                if ((this.state.checkPayment == null || this.state.checkPayment == undefined || this.state.checkPayment == '')) {
                    toastr.error('Error', 'Please Select Payment Type')
                    return false
                }
                if (this.state.checkPayment !== 'pay_pal') {
                    // if ((this.state.cardNumber == null || this.state.cardNumber == undefined || this.state.cardNumber == '')) {
                    if ((this.state.cardNumber !== true)) {
                        toastr.error('Error', this.state.cardNumber || 'Please Enter Card Number')
                        return false
                    }
                    // if ((this.state.cardExpirDate == null || this.state.cardExpirDate == undefined || this.state.cardExpirDate == '')) {
                    if ((this.state.cardExpiry !== true)) {
                        toastr.error('Error', this.state.cardExpiry || 'Please Enter Card Exp')
                        return false
                    }
                    // if ((this.state.cardCVC == null || this.state.cardCVC == undefined || this.state.cardCVC == '')) {
                    if ((this.state.cardCvc !== true)) {
                        toastr.error('Error', this.state.cardCvc || 'Please Enter Card CVC')
                        return false
                    }
                }
            }
        }
        console.log(card, 'Card Payment Object')
        if (this.state.backTo == '') {
            this.setState({
                ...this.state,
                step: step,
                tab: current,
                backTo: '',
                // Add Payment 
                barPercent: this.state.barPercent + (perc),
                finalizeStep: finalizeId !== undefined ? finalizeId : this.state.finalizeStep,
                card: card !== undefined ? card : this.state.card,

                animation: (perc) > 0 ? "fadeInUp" : "fadeInDown",
                postSteps: this.state.postSteps.slice().map(item => {
                    if (item.value == prev) {
                        return {
                            ...item,
                            completed: true,
                            current: false
                        }
                    }
                    return {
                        ...item,
                        current: item.value == current ? true : false
                    }
                })
            });
        } else {
            this.setState({
                ...this.state,
                step: 23,
                tab: 6,
                backTo: '',
                finalizeStep: finalizeId !== undefined ? finalizeId : this.state.finalizeStep,
                // /Add Payment
                card: card !== undefined ? card : this.state.card,
                barPercent: this.state.barPercent + (perc),
                postSteps: this.state.postSteps.slice().map(item => {
                    if (item.value == 6) {
                        return {
                            ...item,
                            current: true
                        }
                    }
                    return {
                        ...item,
                        current: false,
                    }
                }),
                animation: "fadeInUp"
            });
        }
    }

    editPost = (step, slide, backTo, perc, finalizeId) => {
        this.setState({
            ...this.state,
            tab: step,
            step: slide,
            postSteps: this.state.postSteps.slice().map(item => {
                if (item.value == step) {
                    return {
                        ...item,
                        current: !item.current
                    }
                } else {
                    return {
                        ...item,
                        current: false
                    }
                }
                // return item
            }),
            finalizeStep: finalizeId !== undefined ? finalizeId : '',
            backTo: backTo,
            barPercent: (perc),
            animation: 'fadeInDown'
        });
    }

    changeStep = (e, perc) => {
        if (e == 2) {
            if ((this.state.description === '' || this.state.description === null)) {
                toastr.error('Error', 'Please Enter Description')
                return false
            }
        }

        if (e == 3) {
            if ((this.state.uploadImages == null || this.state.uploadImages == undefined || this.state.uploadImages.filter(item => item.files !== null || item.path !== '').length == 0)) {
                toastr.error('Error', 'Please Select Car Images')
                return false
            }
            if ((this.state.uploadImages !== null && this.state.uploadImages !== undefined && this.state.uploadImages.filter(item => item.files !== null || item.path !== '').length < 4)) {
                toastr.error('Error', 'Please Select Atleast 4 Car Images')
                return false
            }
        }
        if (e == 4) {
            if ((this.state.location == null || this.state.location == undefined || this.state.location == '')) {
                toastr.error('Error', 'Please Select Location')
                return false
            }
        }
        if (e == 5) {
            if ((this.state.selectedBoost == null || this.state.selectedBoost == undefined || this.state.selectedBoost == '')) {
                toastr.error('Error', 'Please Select Boost')
                return false
            }
        }
        /**
         * 
         * Card Validation
         */
        if (this.state.defaultSelectedBoost !== this.state.selectedBoost) {
            if (this.state.defaultCheckPayment !== this.state.checkPayment) {
                if (this.state.selectedBoost !== 'free') {
                    if (e == 6) {
                        if ((this.state.checkPayment == null || this.state.checkPayment == undefined || this.state.checkPayment == '')) {
                            toastr.error('Error', 'Please Select Payment Type')
                            return false
                        }
                        if (this.state.checkPayment !== 'pay_pal') {
                            // if ((this.state.cardNumber == null || this.state.cardNumber == undefined || this.state.cardNumber == '')) {
                            if ((this.state.cardNumber !== true)) {
                                toastr.error('Error', this.state.cardNumber || 'Please Enter Card Number')
                                return false
                            }
                            // if ((this.state.cardExpirDate == null || this.state.cardExpirDate == undefined || this.state.cardExpirDate == '')) {
                            if ((this.state.cardExpiry !== true)) {
                                toastr.error('Error', this.state.cardExpiry || 'Please Enter Card Exp')
                                return false
                            }
                            // if ((this.state.cardCVC == null || this.state.cardCVC == undefined || this.state.cardCVC == '')) {
                            if ((this.state.cardCvc !== true)) {
                                toastr.error('Error', this.state.cardCvc || 'Please Enter Card CVC')
                                return false
                            }
                            // if ((this.state.cardCVC == null || this.state.cardCVC == undefined || this.state.cardCVC == '')) {

                            if (this.state.checkPayment === 'credit_card' && (this.state.card == null || this.state.card == undefined)) {
                                toastr.error('Error', 'Please Click On Continue')
                                return false
                            }
                        }
                        if (this.state.checkPayment === "pay_pal" && this.props.paypalIntentData !== undefined && this.props.paypalIntentData !== null && Object.keys(this.props.paypalIntentData).length === 0) {
                            toastr.error('Error', 'Please Click On PayPal')
                            return false
                        }
                    }
                }
            }

        }

        this.setState({
            ...this.state,
            tab: e,
            step: e == 1 ? 1 : e == 2 ? 19 : e == 3 ? 20 : e == 4 ? 21 : e == 5 ? 22 : 23,
            // payment Add
            postSteps: this.state.postSteps.slice().map(item => {
                return {
                    ...item,
                    current: item.value == e ? true : false
                }

            }),
            barPercent: perc,
            animation: 'fadeInDown',
            finalizeStep: 1
        });
    };

    create_post = () => {
        const payment_mode = this.state.selectedBoost === 'free' ? 'free' : this.state.checkPayment === 'pay_pal' ? 'pay_pal' : this.state.checkPayment === 'credit_card' ? 'credit_card' : ''
        const features = this.state.vehicle_features.filter(item => item.checked === true).map(item => {
            return {
                id: item.id,
                v_features: item.v_features
            }
        })
        var formData = new FormData();
        let img_len = 0
        let rimg_len = 0
        const uploadImages = this.state.uploadImages.filter(item => item.files !== null && item.files !== undefined)
        if (uploadImages !== undefined && uploadImages !== null) {
            for (let i = 0; i < uploadImages.length; i++) {
                if (uploadImages[i].files !== undefined && uploadImages[i].files !== null) {
                    formData.append(`images[${i}]`, uploadImages[i].files)
                }
            }
            img_len = uploadImages.filter(item => item.files).length
        }
        const deletedImages = this.state.deletedImages.filter(item => item.path !== null && item.path !== undefined)
        if (deletedImages !== undefined && deletedImages !== null) {
            for (let i = 0; i < deletedImages.length; i++) {
                if (deletedImages[i].path !== undefined && deletedImages[i].path !== null) {
                    formData.append(`rimages[${i}]`, deletedImages[i].path)
                }
            }
            rimg_len = deletedImages.filter(item => item.path).length
        }
        var listing_type = 1;
        if (this.state.selectedBoost == 'free') {
            listing_type = 1;
        } else if (this.state.selectedBoost == 'standard') {
            listing_type = 2;
        } else {
            listing_type = 3;
        }
        formData.append("img_len ", img_len);
        formData.append("rimg_len ", rimg_len);
        formData.append("payment_mode ", payment_mode);
        if (this.state.transmission !== undefined && this.state.transmission !== null && this.state.transmission !== '') {
            formData.append("transmission ", this.state.transmission);
        }
        if (this.state.fuelType !== undefined && this.state.fuelType !== null && this.state.fuelType !== '') {
            formData.append("fuel_type", this.state.fuelType);
        }
        if (this.state.drivetrain !== undefined && this.state.drivetrain !== null && this.state.drivetrain !== '') {
            formData.append("drive_train", this.state.drivetrain);
        }
        if (this.state.cylinder !== undefined && this.state.cylinder !== null && this.state.cylinder !== '') {
            formData.append("cylinder", this.state.cylinder);
        }
        if (this.state.color !== undefined && this.state.color !== null && this.state.color !== '') {
            formData.append("color", this.state.color);
        }
        if (this.state.previousOwner !== undefined && this.state.previousOwner !== null && this.state.previousOwner !== '') {
            formData.append("previous_owners", this.state.previousOwner);
        }
        if (this.state.previousAccident !== undefined && this.state.previousAccident !== null && this.state.previousAccident !== '') {
            formData.append("previous_accidents", this.state.previousAccident);
        }
        if (features !== undefined && features !== null && features !== '') {
            formData.append("features", JSON.stringify(features));
        }
        if (this.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() || this.state.selectedTypeName.toUpperCase() === ('MOTORCYCLE').toUpperCase()) {
            if (this.state.engineCC !== undefined && this.state.engineCC !== null && this.state.engineCC !== '') {
                formData.append("engine", this.state.engineCC);
            }
        }
        if (this.state.otherModel !== undefined && this.state.otherModel !== null && this.state.otherModel !== '') {
            formData.append("other_model ", this.state.otherModel);
        }
        // formData.append("location", this.state.location == null ? '' : this.state.location);
        if (this.state.selectModel !== '' || this.state.selectModel !== null) {
            formData.append("model", this.state.selectModel);
        }
        if (this.state.otherTrim !== undefined && this.state.otherTrim !== null && this.state.otherTrim !== '') {
            formData.append("otherTrim", this.state.otherTrim);
        }

        let trim = ''
        if (this.state.trimName !== undefined && this.state.trimName !== null && this.state.trimName !== '') {
            if (this.state.trimName.length > 0) {
                trim = this.state.trimName[0].label
            } else if (Object.keys(this.state.trimName).length > 0) {
                trim = this.state.trimName.label
            } else {
                trim = ''
            }
        } else {
            trim = this.state.trimName
        }
        formData.append("trim", trim);
        if (this.state.selectTrim !== undefined && this.state.selectTrim !== null && this.state.selectTrim !== '') {
            formData.append("selectTrim", this.state.selectTrim);
        }
        if (this.state.year !== undefined && this.state.year !== null && this.state.year !== '') {
            formData.append("year", this.state.year);
        }
        if (this.state.selectCondition !== undefined && this.state.selectCondition !== null && this.state.selectCondition !== '') {
            formData.append("v_condition", this.state.selectCondition);
        }
        if (this.state.kilometer !== undefined && this.state.kilometer !== null && this.state.kilometer !== '') {
            formData.append("kilometer", this.state.kilometer == '' ? 0 : this.state.kilometer.toString().split(',').join(""));
        }
        if (this.state.price !== undefined && this.state.price !== null && this.state.price !== '') {
            formData.append("price", this.state.price == '' ? 0 : this.state.price.toString().split(',').join(""));
            formData.append("updated_price", this.state.defaultPrice == '' ? 0 : this.state.defaultPrice.toString().split(',').join(""));
        }
        if (this.state.bodyType !== undefined && this.state.bodyType !== null && this.state.bodyType !== '') {
            formData.append("body_type", this.state.bodyType);
        }
        if (this.state.selectedTypeName.toUpperCase() !== ('BOAT').toUpperCase()) {
            formData.append("seating", this.state.seating);
        }
        // formData.append("images ", JSON.stringify(this.state.files));
        if (this.state.selectVehicleMake !== undefined && this.state.selectVehicleMake !== null && this.state.selectVehicleMake !== '') {
            formData.append("selectVehicleMake", this.state.selectVehicleMake);
        }
        if (this.state.postCity !== undefined && this.state.postCity !== null && this.state.postCity !== '') {
            formData.append("city", this.state.postCity);
        }
        if (this.state.length !== undefined && this.state.length !== null && this.state.length !== '') {
            formData.append("length", this.state.length.toString().split(',').join(""));
        }
        if (this.state.weight !== undefined && this.state.weight !== null && this.state.weight !== '') {
            formData.append("weight", this.state.weight.toString().split(',').join(""));
        }
        // formData.append("cardNumber", this.state.cardNumber);
        // formData.append("cardExpirDate", this.state.cardExpirDate);
        // formData.append("cardCVC", this.state.cardCVC);
        if (this.state.amountPay !== undefined && this.state.amountPay !== null && this.state.amountPay !== '' && this.state.amountPay !== 0) {
            formData.append('amountPay', this.state.amountPay)
        }
        if (this.state.checkPayment !== undefined && this.state.checkPayment !== null && this.state.checkPayment !== '') {
            formData.append("checkPayment", this.state.checkPayment);
        }
        if (this.state.selectedBoost !== undefined && this.state.selectedBoost !== null && this.state.selectedBoost !== '') {
            formData.append("selectedBoost", this.state.selectedBoost);
        }
        if (this.state.checkPayment !== undefined && this.state.checkPayment !== null && this.state.checkPayment !== '') {
            if (this.state.defaultCheckPayment !== undefined && this.state.defaultCheckPayment !== null && this.state.defaultCheckPayment !== '') {
                if (this.state.checkPayment !== this.state.defaultCheckPayment) {
                    if (this.state.checkPayment === 'credit_card') {
                        formData.append("stripe_intent", this.props.clientSecret !== undefined && this.props.clientSecret !== null && Object.keys(this.props.clientSecret).length > 0 ? this.props.clientSecret.id !== undefined && this.props.clientSecret.id !== null ? this.props.clientSecret.id : '' : '');
                    }
                    if (this.state.checkPayment === 'pay_pal') {
                        if (this.props.paypal_api_response !== undefined && this.props.paypal_api_response !== null && Object.keys(this.props.paypal_api_response) > 0) {
                            formData.append("capture_id", this.props.paypal_api_response !== undefined && this.props.paypal_api_response !== null ? this.props.paypal_api_response.id !== undefined && this.props.paypal_api_response.id !== null ? this.props.paypal_api_response.id : '' : '');
                        }
                    }
                }

            }
        }
        if (this.state.otherMake !== undefined && this.state.otherMake !== null && this.state.otherMake !== '') {
            formData.append("other_make", this.state.otherMake);
        }
        if (this.state.selectVehicleMake !== '' || this.state.selectVehicleMake !== null) {
            formData.append("make", this.state.selectVehicleMake);
        }
        if (this.state.typeOfVehicle !== undefined && this.state.typeOfVehicle !== null && this.state.typeOfVehicle !== '') {
            formData.append("category", this.state.typeOfVehicle);
        }
        if (this.state.modelName !== undefined && this.state.modelName !== null && this.state.modelName !== '') {
            formData.append("modelName", this.state.modelName);
        }

        if (this.state.longitude !== undefined && this.state.longitude !== null && this.state.longitude !== '') {
            formData.append("longitude", Number(this.state.longitude) == '' ? 0 : Number(this.state.longitude).toFixed(7));
        }
        if (this.state.latitude !== undefined && this.state.latitude !== null && this.state.latitude !== '') {
            formData.append("latitude", Number(this.state.latitude) == '' ? 0 : Number(this.state.latitude).toFixed(7));
        }
        if (this.state.locationName !== undefined && this.state.locationName !== null && this.state.locationName !== '') {
            formData.append("location", this.state.locationName);
        }
        if (this.state.user_id !== undefined && this.state.user_id !== null && this.state.user_id !== '') {
            formData.append("user_id", this.state.user_id);
        }
        /** Not Used, Used in Backend */
        formData.append("accept_charges", '');
        formData.append("line_amount", '');
        formData.append("line_description", '');
        formData.append("line_name", '');
        formData.append("ownership_doc_back", this.state.nullState);
        formData.append("has_lines", '');
        formData.append("ownership_doc", this.state.nullState);
        // if (this.state.vinNumber !== undefined && this.state.vinNumber !== null && this.state.vinNumber !== '') {
        // formData.append("reason", '');
        // }
        if (this.state.vinNumber !== undefined && this.state.vinNumber !== null && this.state.vinNumber !== '') {
            formData.append("vin", this.state.vinNumber);
        }
        if (this.state.hinNumber !== undefined && this.state.hinNumber !== null && this.state.hinNumber !== '') {
            formData.append("hin", this.state.hinNumber);
        }
        if (this.state.serialNumber !== undefined && this.state.serialNumber !== null && this.state.serialNumber !== '') {
            formData.append("serial_number", this.state.serialNumber);
        }

        // formData.append("is_active", 0);
        // formData.append("is_deleted", null);
        // formData.append("modified_at", new Date());
        // formData.append("is_sold", 0);
        if (this.state.description !== undefined && this.state.description !== null && this.state.description !== '') {
            formData.append("description", this.state.description);
        }
        formData.append("stripe_payment_amount", '');
        formData.append("stripe_check_id", '');
        formData.append("bumpup_active", this.state.selectedBoost !== '' && this.state.selectedBoost !== 'free' && this.state.selectedBoost !== 'standard' ? 1 : 0);

        formData.append("listing_type", listing_type);
        formData.append("dealer_or_private_seller", localStorage.getItem('user_type'));
        // formData.append("sub_type_id", this.state.subTypeId === '' ? 0 : this.state.subTypeId);
        formData.append("sub_type_id", this.state.subTypeId);
        formData.append("user_type", localStorage.getItem('user_type') !== null && localStorage.getItem('user_type') !== undefined ? localStorage.getItem('user_type') : '');
        formData.append("has_bumpup", this.state.selectedBoost !== '' && this.state.selectedBoost !== 'free' && this.state.selectedBoost !== 'standard' ? 1 : 0);
        if (this.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase()) {
            if (this.state.steeringType !== undefined && this.state.steeringType !== null && this.state.steeringType !== '') {
                formData.append('steering_type', this.state.steeringType)
            }
            if (this.state.passenger !== undefined && this.state.passenger !== null && this.state.passenger !== '') {
                formData.append('passengers', this.state.passenger)
            }
            if (this.state.seating !== undefined && this.state.seating !== null && this.state.seating !== '') {
                formData.append("seating", this.state.seating);
            }
        }
        if (this.state.selectedTypeName.toUpperCase() === ('AUTOMOTIVE').toUpperCase()) {
            if (this.state.seating !== undefined && this.state.seating !== null && this.state.seating !== '') {
                formData.append("seating", this.state.seating);
            }
        }
        if (this.state.boatHours !== undefined && this.state.boatHours !== null && this.state.boatHours !== '') {
            formData.append('hours', this.state.boatHours)
        }
        if (this.state.engineCC !== undefined && this.state.engineCC !== null && this.state.engineCC !== '') {
            formData.append('engine', this.state.engineCC)
        }
        if (this.state.postAdId !== undefined && this.state.postAdId !== null && this.state.postAdId !== '') {
            this.props.update_ad_post(formData, this.state.postAdId)

        }
    }

    submitAdPost = () => {
        if (this.state.selectedBoost === 'free' || this.state.selectedBoost === '' || this.state.defaultSelectedBoost === 'standard' || this.state.defaultSelectedBoost === 'premium') {
            this.create_post()
        } else if (this.state.checkPayment === 'credit_card' && (this.state.selectedBoost !== 'free' || this.state.selectedBoost !== '')) {
            const data = {
                selectedBoost: this.state.selectedBoost,
                amountPay: this.state.amountPay !== undefined && this.state.amountPay !== null && this.state.amountPay !== '' ? Number(this.state.amountPay).toFixed(2) : 0
            }
            this.props.create_payment_intent(data)
        } else {
            const data = this.props.paypalIntentData
            if (data !== undefined && data !== null && data !== '') {
                this.props.payal_transcation(data)
            }
        }
    }

    handleLocationChange = (e) => {
        this.setState({
            ...this.state,
            // location: e.target.value
            location: e
        })
    }

    componentWillUnmount() {
        this.props.remove_all_post_state()
        this.props.remove_all()
    }
    render() {
        console.log(this.state)
        // console.log(this.state.startPercent)
        const typeOfVehiclePerc = this.state.postSteps.filter(item => item.value === 1).map(item => { return item.perc })[0]
        const photoPerc = this.state.postSteps.filter(item => item.value === 2).map(item => { return item.perc })[0]
        const locationPerc = this.state.postSteps.filter(item => item.value === 3).map(item => { return item.perc })[0]
        const boostPerc = this.state.postSteps.filter(item => item.value === 4).map(item => { return item.perc })[0]
        const paymentPerc = this.state.postSteps.filter(item => item.value === 5).map(item => { return item.perc })[0]
        const postAdPerc = this.state.postSteps.filter(item => item.value === 6).map(item => { return item.perc })[0]
        const checkStatus = () => {
            var check = window.confirm("Are You sure to leave?");
            if (check == true) {
                return true;
            } else {
                // history.replace('/seller/add-post')
                return false;
            }
        };

        /**
         *  DropDown
         * 
         */

        const thumb = {
            position: "relative",
            display: "inline-flex",
            borderRadius: 2,
            border: "1px solid #eaeaea",
            marginBottom: 8,
            marginRight: 8,
            width: 100,
            height: 100,
            padding: 4,
            boxSizing: "border-box"
        };
        const thumbInner = {
            display: "flex",
            minWidth: 0,
            overflow: "hidden"
        };
        const img = {
            display: "block",
            width: "auto",
            height: "100%"
        };

        const files = this.state.preViewFiles.map((file, index) => (
            <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                    <i className="fa fa-times" aria-hidden="true" style={{
                        position: 'absolute',
                        right: '6px',
                        zIndex: '999',
                        color: '#FB7333',
                        top: '5px'
                    }}
                        onClick={() => this.removeFile(file)}></i>
                    <img src={file.preview} style={img} alt="" />
                </div>
            </div>
        ));


        /**
         *
         *
         *  Location Drop Down
         *
         */
        const promiseOptions = inputValue =>
            new Promise(resolve => {
                setTimeout(() => {
                    Geocode.fromAddress(inputValue).then(
                        response => {
                            let location = []
                            // response.results[0].address_components.map((item, index) => {
                            location.push({
                                label: response.results[0].formatted_address,
                                value: response.results[0].place_id,
                                lat: response.results[0].geometry.location.lat,
                                lng: response.results[0].geometry.location.lng
                            })

                            // })
                            this.setState({
                                ...this.state,
                                locationValues: location
                            })
                            resolve((location));
                        },
                        error => {
                            // console.error(error);
                        }
                    );
                }, 100);
            });
        /**
         *
         *  Make Drop Down
         *
         */
        const makeDrop = []
        this.props.vehicle_makes.map((item, index) => {
            return makeDrop.push({
                label: item.make_name, value: item.id
            })
        })
        /**
         *
         *  Model Drop Down
         *
         */
        const modelDrop = []
        this.props.vehicle_models.map(item => {
            return modelDrop.push({
                label: item.model_make, value: item.id
            })
        })

        const percentBar = `${this.state.barPercent}%`
        const clickAble = this.state.lastTab > this.state.tab
        // console.log(this.state.postSteps)
        // console.log(this.state)
        // console.log(this.state.newStepName)
        // console.log(this.state.lastTabIndex)
        return (
            <React.Fragment>
                {/* <Prompt
                    when={!!this.state.typeOfVehicle}
                    message={(location, action) => {
                        if (action === 'POP') {
                            // this.setState(prevState => ({
                            //     ...this.state,
                            //     step: prevState.step - 1
                            // }))
                            console.log("Backing up...")
                        }

                        return location.pathname.startsWith("/app")
                            ? true
                            : `Are you sure you want to go to ${location.pathname}?`
                    }}

                /> */}
                <Beforeunload onBeforeunload={(event) => (
                    event.preventDefault()
                )}>

                    <Elements stripe={stripePromise}>
                        <section className="Section-AddPost ">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="PostAdd-Container">
                                            <div className="PostAdd-TopList">
                                                <ul>
                                                    {this.state.postSteps.map((item, index) => (
                                                        <React.Fragment key={index}>
                                                            <li
                                                                className={
                                                                    item.current == true ? "headactive" : item.completed == true ? "active" : ''
                                                                }
                                                                onClick={item.current == false && (item.completed == true || clickAble) && item.disbaled == false ? () => this.changeStep(item.value, item.perc) : item.current == true && item.completed == false && item.disbaled == false ? () => this.changeStep(item.value, item.perc) : this.emptyFunction}
                                                            >
                                                                <a>{item.value}</a>
                                                            </li>
                                                            <li
                                                                className={
                                                                    item.current == true ? "headactive" : item.completed == true ? "activetext" : ''
                                                                }
                                                                onClick={item.current == false && (item.completed == true || clickAble) && item.disbaled == false ? () => this.changeStep(item.value, item.perc) : item.current == true && item.completed == false && item.disbaled == false ? () => this.changeStep(item.value, item.perc) : this.emptyFunction}
                                                            >
                                                                <h1>{item.name}</h1>
                                                            </li>
                                                        </React.Fragment>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="top-status-bar">
                                                <div className="top-status-bar-inner">
                                                    <div className="filled-status-bar" style={{ width: percentBar }}> </div>
                                                </div>
                                            </div>
                                            <div className="ad-post-body-main clearfix">

                                                <div className="Addpost-responsiveimg">
                                                    <img src="/assets/image/addpost-img-responsive.svg" alt="" />
                                                </div>


                                                <div
                                                    className={
                                                        // this.state.tab === 4 && this.state.stepBoost !== 3
                                                        this.state.tab === 4 || this.state.tab === 5
                                                            ? "full"
                                                            : "ad-post-left-section"
                                                    }
                                                >
                                                    <div className="SliderContainer">
                                                        {this.state.tab === 1 ? (<>
                                                            <TypeofVehicle handleOnChangeFeatures={this.handleOnChangeFeatures} changeStepButton={this.changeStepButton} state={this.state} handleOnClick={this.handleOnClick} handleOnChange={this.handleOnChange} changeSilde={this.changeSilde} {...this.props} validator={this.validator} changeSubVehicleTye={this.changeSubVehicleTye} handleOnChangeMake={this.handleOnChangeMake} handleOnChangeModel={this.handleOnChangeModel} changeYear={this.changeYear} changeSelect={this.changeSelect} handleOnChangeVinHinSerial={this.handleOnChangeVinHinSerial} removeLoaderMake={this.props.removeLoaderMake}
                                                                removeLoaderModel={this.props.removeLoaderModel} removeLoaderType={this.props.removeLoaderType} removeLoaderTrims={this.props.removeLoaderTrims} blurMake={this.blurMake} blurModel={this.blurModel} paypal_intent_create={this.props.paypal_intent_create}
                                                            />
                                                        </>) : this.state.tab === 2 ? (<>
                                                            <Photos files={files} onDrop={this.onDrop} changeSilde={this.changeSilde} changeStepButton={this.changeStepButton} startPercent={this.state.startPercent} previewImages={this.state.previewImages} removeFile={this.removeFile} animation={this.state.animation} backTo={this.state.backTo} />
                                                        </>) : this.state.tab === 3 ? (<>
                                                            <Locations handleInputChange={this.handleInputChange} handleLocationChange={this.handleLocationChange} changeStepButton={this.changeStepButton} location={this.state.location} promiseOptions={promiseOptions} stepBoost={this.state.stepBoost} startPercent={this.state.startPercent} animation={this.state.animation} backTo={this.state.backTo} />
                                                        </>) : this.state.tab === 4 ? (<>
                                                            <Boost changeBoost={this.changeBoost} changeCardValues={this.changeCardValues} handleOnChange={this.handleOnChange} changeStepButton={this.changeStepButton} handleOnClickBoost={this.handleOnClickBoost} selectedBoost={this.state.selectedBoost} cardCVC={this.state.cardCVC} cardNumber={this.state.cardNumber} cardExpirDate={this.state.cardExpirDate} stepBoost={this.state.stepBoost} submitAdPost={this.submitAdPost} editPost={this.editPost} discardState={this.discardState} startPercent={this.state.startPercent} animation={this.state.animation} backTo={this.state.backTo} defaultSelectedBoost={this.state.defaultSelectedBoost} />
                                                        </>) : this.state.tab === 6 && this.state.finalizeStep === 1 ? (<>
                                                            <FinalizeAdd changeBoost={this.changeBoost} changeCardValues={this.changeCardValues} handleOnChange={this.handleOnChange} changeStepButton={this.changeStepButton} handleOnClickBoost={this.handleOnClickBoost} selectedBoost={this.state.selectedBoost} cardCVC={this.state.cardCVC} cardNumber={this.state.cardNumber} cardExpirDate={this.state.cardExpirDate} stepBoost={this.state.stepBoost} submitAdPost={this.submitAdPost} editPost={this.editPost} discardState={this.discardState} isLoading={this.props.isLoading} startPercent={this.state.startPercent} typeOfVehiclePerc={typeOfVehiclePerc}
                                                                photoPerc={photoPerc}
                                                                locationPerc={locationPerc}
                                                                boostPerc={boostPerc}
                                                                paymentPerc={paymentPerc}
                                                                postAdPerc={postAdPerc} animation={this.state.animation} completePostAdd={this.completePostAdd} clientSecret={this.props.clientSecret} card={this.state.card} create_post_success={this.props.create_post_success} create_post={this.create_post} remove_client_secret={this.props.remove_client_secret} amountPay={this.state.amountPay} checkPayment={this.state.checkPayment} post_ad_end={this.props.post_ad_end} defaultSelectedBoost={this.state.defaultSelectedBoost} />
                                                        </>) : this.state.tab === 6 && this.state.finalizeStep === '' ? (<>
                                                            <ConfirmPost appStatus={this.state.appStatus} />
                                                        </>) : null}
                                                        <>
                                                            <Payment setCardError={this.setCardError} changeBoost={this.changeBoost} checkPayment={this.state.checkPayment} changeCardValues={this.changeCardValues} handleOnChange={this.handleOnChange} changeStepButton={this.changeStepButton} handleOnClickBoost={this.handleOnClickBoost} selectedBoost={this.state.selectedBoost} cardCVC={this.state.cardCVC} cardNumber={this.state.cardNumber} cardExpirDate={this.state.cardExpirDate} startPercent={this.state.startPercent} animation={this.state.animation} completePostAdd={this.completePostAdd} clientSecret={this.props.clientSecret} tab={this.state.tab} boostAmount={this.state.boostAmount} paypal_intent_create={this.props.paypal_intent_create} amountPay={this.state.amountPay} paypalIntentData={this.props.paypalIntentData} />
                                                        </>
                                                    </div>
                                                </div>
                                                {this.state.tab === 4 ||
                                                    // && this.state.stepBoost !== 3
                                                    this.state.tab === 5 ? null : (
                                                    <React.Fragment>
                                                        <div className="PostAdd-ImgRight">
                                                            <img
                                                                src="/assets/image/vehicle-right-img.svg"
                                                                width="880"
                                                                height="704"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </React.Fragment>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ConfirmModel buttonAction={this.discardState} id={''} heading={'Discard Ad?'} section1={'Are you sure you want to discard this ad?'} section2={''} />
                            <TostarMessages />
                        </section>
                    </Elements>

                </Beforeunload>

            </React.Fragment >
        )


    }

}
const mapStateToProps = (state) => {
    return {
        type_of_vehicles: state.adPostReducers.addPostReducer.type_of_vehicle,
        vehicle_makes: state.adPostReducers.addPostReducer.vehicle_make,
        vehicle_models: state.adPostReducers.addPostReducer.vehicle_model,
        vehicle_trims: state.adPostReducers.addPostReducer.vehicle_trims,
        vehicle_body: state.adPostReducers.addPostReducer.vehicle_body,
        vehicle_drive_train: state.adPostReducers.addPostReducer.vehicle_drive_train,
        vehicle_fuel_type: state.adPostReducers.addPostReducer.vehicle_fuel_type,
        vehicle_features: state.adPostReducers.addPostReducer.vehicle_features,
        update_view: state.adPostReducers.addPostReducer.update_view,
        user: state.authReducer.authentication.user,
        isLoading: state.adPostReducers.addPostReducer.isLoading,
        removeLoaderMake: state.adPostReducers.addPostReducer.removeLoaderMake,
        removeLoaderModel: state.adPostReducers.addPostReducer.removeLoaderModel,
        removeLoaderType: state.adPostReducers.addPostReducer.removeLoaderType,
        removeLoaderTrims: state.adPostReducers.addPostReducer.removeLoaderTrims,
        clientSecret: state.adPostReducers.addPostReducer.clientSecret,
        paypalIntentData: state.adPostReducers.addPostReducer.paypalIntentData,
        paypalPayment: state.adPostReducers.addPostReducer.paypalPayment,
        post_ad_detail_edit: state.adPostReducers.addPostReducer.post_ad_detail_edit,
        paypal_api_response: state.adPostReducers.addPostReducer.paypal_api_response,
    }
}
export default connect(mapStateToProps, {
    get_vehicle_type,
    get_vehicle_make,
    get_vehicle_model,
    get_vehicle_body_type,
    get_vehicle_fuel_type,
    get_vehicle_drive_train,
    get_vehicle_feature,
    toggle_vehicle_features,
    update_ad_post,
    remove_all_post_state,
    get_sub_type_vehicle_make,
    remove_all,
    get_vehicle_trims,
    create_post_success,
    create_payment_intent,
    remove_client_secret,
    handle_blur_make_model_trim,
    post_ad_end,
    paypal_intent_create,
    payal_transcation,
    remove_card_intents,
    get_edit_post_ad_record,
    default_select_feature
})(EditPostAdd);
