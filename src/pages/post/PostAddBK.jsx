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
    create_ad_post,
    remove_all_post_state,
    get_sub_type_vehicle_make,
    remove_all,
    get_vehicle_trims
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

var that
const stripePromise = loadStripe("pk_test_51GuJuNLUX1TNWvb0ZJwCYps1kqWvvakfGbZg9nazir7X6ljyVhZj3hshS4als0h7zExPH4BfkSl9Ju8OWZ0IuJer00NG1TWxIq");
class PostAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            card: null,
            step: 1,
            lastStep: 1,
            location: "",
            featureName: "",
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
            cardCVC: "",
            cardExpirDate: "",
            cardNumber: "",
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
            imageErrors: []

        };
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
        that = this
    }

    componentDidMount() {
        this.props.get_vehicle_type()
        this.props.get_vehicle_fuel_type()
        this.props.get_vehicle_drive_train()
        // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
        Geocode.setApiKey("AIzaSyBDXs8HHpZSRxd1vJapwzON64a_vmjpn_4");
        // set response language. Defaults to english.
        Geocode.setLanguage("en");
        // set response region. Its optional.
        // A Geocoding request with region=es (Spain) will return the Spanish city.
        // Geocode.setRegion("es");

        // Enable or disable logs. Its optional.
        Geocode.enableDebug();
        // window.addEventListener("popstate", () => {
        //     //your code...
        //     alert('hello')
        //     return <Prompt message={checkStatus} />
        // });


    }

    discardState = () => {
        this.setState({
            step: 1,
            lastStep: 1,
            location: "",
            featureName: "",
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
            cardCVC: "",
            cardExpirDate: "",
            cardNumber: "",
            selectVehicleMake: '',
            selectedSubTypeName: '',
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
            selectedSubTypeName: '',
            serialNumber: "",
            uploadImages: [{ id: 1, files: null }, { id: 2, files: null }, { id: 3, files: null }, { id: 4, files: null }, { id: 5, files: null }, { id: 6, files: null }, { id: 7, files: null }, { id: 8, files: null }, { id: 9, files: null }, { id: 10, files: null }],
            previewImages: [{ id: 1, preViewFiles: null }, { id: 2, preViewFiles: null }, { id: 3, preViewFiles: null }, { id: 4, preViewFiles: null }, { id: 5, preViewFiles: null }, { id: 6, preViewFiles: null }, { id: 7, preViewFiles: null }, { id: 8, preViewFiles: null }, { id: 9, preViewFiles: null }, { id: 10, preViewFiles: null }],
            isBlocking: true,
            description: '',
            totalSlides: 24,
            animation: "fadeInUp"
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
            trim = value
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

    handleOnChangeMake = (e) => {
        this.setState({
            ...this.state,
            makeName: e,
            selectVehicleMake: e !== null ? e.value : this.state.selectVehicleMake
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
        this.setState({
            ...this.state,
            imageErrors: []
        })
        let index = 0
        let width = 141.8
        let height = 107.31
        for (const item of files) {
            if (item.type != "image/png" && item.type != "image/jpg" && item.type != "image/jpeg") {
                toastr.error('Error', `${item.path} File does not support. You must use .png, jpeg or .jpg`)
                return false;
            } else
                if (item.size > (2 * 1024 * 1024)) {
                    toastr.error('Error', `${item.path} Please upload a file smaller than 2 MB`)
                    return false;
                } else {
                    const ext = item.type !== undefined && item.type !== null ? item.type.split('/')[1] : 'png'
                    await this.resizeFile(item, ext, width, height, index)
                }

        }
    };

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
        this.props.toggle_vehicle_features(id)
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
                geocodeByAddress(this.state.location.label)
                    .then(results => getLatLng(results[0]))
                    .then(({ lat, lng }) =>
                        this.setState({
                            ...this.state,
                            longitude: lng,
                            latitude: lat,
                            locationName: this.state.location.label
                        }),
                        resolve()
                    )
                    .catch(err => {
                        reject(err)
                        console.log(err.message)
                    })
            })

        }

        if (prevProps.user !== this.props.user && this.props.user !== null && this.props.user !== undefined) {

            this.setState({
                ...this.state,
                user_id: this.props.user.user_id
            })
        }
        if (prevState.typeOfVehicle !== this.state.typeOfVehicle && this.state.typeOfVehicle !== '' && this.state.typeOfVehicle !== undefined) {
            let typeName = this.props.type_of_vehicles.filter(item => item.id == this.state.typeOfVehicle).map(item => { return item.name })[0]
            typeName = typeName !== undefined && typeName !== null ? typeName.toUpperCase() : ''
            const subType = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Powersport').toUpperCase() ? 1 : '' : ''
            const typeMotor = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('Motorcycles').toUpperCase() ? 1 : '' : ''
            const typeBoat = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('BOAT').toUpperCase() ? 1 : '' : ''
            const typeRV = typeName !== undefined && typeName !== null && typeName !== '' ? typeName.toUpperCase() === ('RV').toUpperCase() ? 1 : '' : ''
            let startPercent = 0
            startPercent = subType !== '' ? 100 / 24 : typeMotor !== '' ? 100 / 18 : typeBoat !== '' ? 100 / 20 : typeRV !== '' ? 100 / 16 : 100 / 24
            let typeOfVehicleScreens = subType !== '' ? 19 : typeMotor !== '' ? 12 : typeBoat !== '' ? 13 : typeRV !== '' ? 16 : 19
            let photoScreen = subType !== '' ? 20 : typeMotor !== '' ? 13 : typeBoat !== '' ? 14 : typeRV !== '' ? 17 : 20
            let locationScreen = subType !== '' ? 21 : typeMotor !== '' ? 14 : typeBoat !== '' ? 15 : typeRV !== '' ? 18 : 21
            let boostScreen = subType !== '' ? 22 : typeMotor !== '' ? 15 : typeBoat !== '' ? 16 : typeRV !== '' ? 19 : 22
            let paymentScreen = subType !== '' ? 23 : typeMotor !== '' ? 16 : typeBoat !== '' ? 17 : typeRV !== '' ? 20 : 23
            this.props.get_vehicle_feature(this.state.typeOfVehicle)
            this.setState({
                ...this.state,
                featureName: "",
                previousAccident: '',
                previousOwner: '',
                color: "",
                cylinder: '',
                drivetrain: "",
                fuelType: "",
                transmission: "",
                seating: '2',
                passenger: typeName === ('Boat').toUpperCase() ? '2' : '',
                bodyType: "",
                price: "",
                kilometer: "",
                selectCondition: "",
                year: "2021",
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
                selectedTypeName: typeName,
                newStepName: subType !== '' ? 'VIN Number' : typeName === ('Automotive').toUpperCase() ? 'VIN Number' : typeName === ('Boat').toUpperCase() ? 'HIN Number' : typeName === ('Small Equipment').toUpperCase() ? 'Serial Number' : typeName === ('Trailer').toUpperCase() ? 'VIN Number' : '',
                engineStepName: typeName === ('Boat').toUpperCase() ? 'Engine Horsepower' : typeName === ('Motorcycles').toUpperCase() ? 'Engine Horsepower' : '',
                newStep: subType !== '' ? false : typeName === ('Automotive').toUpperCase() ? true : typeName === ('Boat').toUpperCase() ? true : typeName === ('Small Equipment').toUpperCase() ? true : typeName === ('Motorcycles').toUpperCase() ? true : typeName === ('Trailer').toUpperCase() ? true : false,
                // barPercent: 1.176470588235294,
                // Add Payment
                barPercent: startPercent,
                startPercent: startPercent,
                vinNumber: '',
                hinNumber: '',
                serialNumber: "",
                engineCC: '',
                subVehicleType: subType,
                step: subType == '' ? 2 : 1.1,
                postSteps: this.state.postSteps.slice().map(item => {
                    if (item.value !== 1) {
                        return {
                            ...item,
                            perc: item.value === 2 ? Number(typeOfVehicleScreens) * Number(startPercent) : item.value === 3 ? Number(startPercent) * Number(photoScreen) : item.value === 4 ? Number(startPercent) * Number(locationScreen) : item.value === 5 ? Number(startPercent) * Number(boostScreen) : item.value === 6 ? Number(startPercent) * Number(paymentScreen) : item.parc
                        }
                    }
                    return item
                }),
                animation: "fadeInUp"
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
            const bar = 100 - this.state.barPercent
            startPercent = subTypeName !== '' ? bar / 16 : bar / 18
            let typeOfVehicleScreens = subTypeName !== '' ? 11 : 13
            let photoScreen = subTypeName !== '' ? 12 : 14
            let locationScreen = subTypeName !== '' ? 13 : 15
            let boostScreen = subTypeName !== '' ? 14 : 16
            let paymentScreen = subTypeName !== '' ? 15 : 17
            this.setState({
                ...this.state,
                step: 2,
                subTypeId: this.state.subTypeId,
                // Add Sub Type
                selectedSubTypeName: subTypeName,
                newStepName: subType !== '' ? 'VIN Number' : '',
                engineStepName: subType !== '' || subTypeAtv !== '' ? 'Engine Horsepower' : '',
                startPercent: startPercent,
                newStep: subType !== '' || subTypeAtv !== '' ? true : false,
                featureName: "",
                previousAccident: '',
                previousOwner: '',
                color: "",
                cylinder: '',
                drivetrain: "",
                fuelType: "",
                transmission: "",
                seating: '2',
                passenger: this.state.selectedTypeName === ('Boat').toUpperCase() ? '2' : '',
                bodyType: "",
                price: "",
                kilometer: "",
                selectCondition: "",
                year: "2021",
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
                vinNumber: '',
                hinNumber: '',
                serialNumber: "",
                engineCC: '',
                barPercent: startPercent,
                startPercent: startPercent,
                postSteps: this.state.postSteps.slice().map(item => {
                    if (item.value !== 1) {
                        return {
                            ...item,
                            perc: item.value === 2 ? Number(typeOfVehicleScreens) * Number(startPercent) : item.value === 3 ? Number(startPercent) * Number(photoScreen) : item.value === 4 ? Number(startPercent) * Number(locationScreen) : item.value === 5 ? Number(startPercent) * Number(boostScreen) : item.value === 6 ? Number(startPercent) * Number(paymentScreen) : item.parc
                        }
                    }
                    return item
                }),
                // Add Payment
                barPercent: this.state.barPercent + startPercent,
                animation: "fadeInUp"
            })
            this.props.get_sub_type_vehicle_make(this.state.subTypeId)
        }
        if (prevState.selectVehicleMake !== this.state.selectVehicleMake && this.state.selectVehicleMake !== '' && this.state.selectVehicleMake !== undefined) {
            this.setState({
                ...this.state,
                step: 3,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
            })
            this.props.get_vehicle_model(this.state.selectVehicleMake)
        }
        if (prevState.selectModel !== this.state.selectModel && this.state.selectModel !== '' && this.state.selectModel !== undefined) {
            this.setState({
                ...this.state,
                step: this.state.selectedTypeName.toUpperCase() === ("BOAT").toUpperCase() || (this.state.selectedSubTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || this.state.selectedSubTypeName.toUpperCase() === ('Watercraft').toUpperCase()) ? 4.1 : this.state.selectedSubTypeName.toUpperCase() === ('ATV/UTV').toUpperCase() ? 5 : this.state.selectedTypeName.toUpperCase() === ('Automotive').toUpperCase() ? 4 : 5,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
            })
            this.props.get_vehicle_trims(this.state.selectModel)
        }
        if (prevProps.vehicle_trims !== this.props.vehicle_trims && this.props.vehicle_trims !== undefined) {
            const trims = [];
            (this.props.vehicle_trims || []).map(item => {
                return trims.push({
                    id: item.id,
                    name: item.v_trim
                })
            })
            this.setState({
                ...this.state,
                trims: trims,
                otherTrim: '',
                selectTrim: '',
                trimName: ''
            })
        }
        if (prevState.selectTrim !== this.state.selectTrim && this.state.selectTrim !== '' && this.state.selectTrim !== undefined) {
            this.setState({
                ...this.state,
                step: 5,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
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
        if (prevState.year !== this.state.year && this.state.year !== '' && this.state.year !== undefined) {
            this.setState({
                ...this.state,
                step: this.state.selectedTypeName.toUpperCase() === ("RV").toUpperCase() ? 15 : 6,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
            })
        }
        if (prevState.seating !== this.state.seating && this.state.seating !== '' && this.state.seating !== undefined) {
            this.setState({
                ...this.state,
                step: 10,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
            })
        }
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
                step: 17,
                // Add Payment
                barPercent: this.state.barPercent + this.state.startPercent,
                animation: "fadeInUp"
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
        // if (prevProps.clientScreat !== this.props.clientScreat && this.props.clientScreat !== undefined) {

        //     this.props.stripe.confirmCardPayment(this.props.clientSecret, {
        //         payment_method: {
        //             card: this.props.CardNumberElement
        //         }
        //     }).then(response => {

        //         console.log('Done', response)
        //     }).catch(err => {

        //         console.log('Error Payment', err.message)
        //     });
        //     // if (payload.error) {
        //     //     console.log('Error Payment', payload.error.message)
        //     // } else {
        //     //     console.log('Done', payload)
        //     // }

        // }

        // if(prevState.selectedBoost !== this.state.selectedBoost && this.state.selectedBoost !== undefined){
        //     this.setState({
        //         ...this.state,
        //         step: this.state.,
        //         barPercent: this.state.barPercent + this.state.startPercent,
        //     })
        // }
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
        this.setState({
            ...this.state,
            otherMake: this.state.otherMake,
        })
    }

    blurModel = () => {
        this.setState({
            ...this.state,
            otherModel: this.state.otherModel,
        })
    }

    blurTrim = () => {
        this.setState({
            ...this.state,
            otherTrim: this.state.otherTrim,
        })
    }

    removeFile = (id) => {

        const uploadImages = this.state.uploadImages.slice().map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    files: null
                }
            }
            return item
        })
        const previewImages = this.state.previewImages.slice().map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    preViewFiles: null
                }
            }
            return item
        })
        this.setState({
            ...this.state,
            uploadImages,
            previewImages
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
        console.log(e, 'step')

        if (e == 2) {
            if (this.state.typeOfVehicle === '' || this.state.typeOfVehicle === undefined || this.state.typeOfVehicle === null) {
                toastr.error('Error', 'Please Select Category')
                return false
            }
        }

        if (e === 3) {
            if ((this.state.selectVehicleMake === '' || this.state.selectVehicleMake === undefined || this.state.selectVehicleMake === null) && (this.state.otherMake === '' || this.state.otherMake === undefined || this.state.otherMake === null) && (this.state.makeName === '' || this.state.makeName === undefined || this.state.makeName === null)) {
                toastr.error('Error', 'Please Select Vehicle Make')
                return false
            }
        }

        if (e === 4) {
            if ((this.state.selectModel === '' || this.state.selectModel === undefined || this.state.selectModel === null) && (this.state.otherModel === '' || this.state.otherModel === undefined || this.state.otherModel === null) && (this.state.modelName === '' || this.state.modelName === undefined || this.state.modelName === null)) {
                toastr.error('Error', 'Please Select Vehicle Model')
                return false
            }
        }

        if (this.state.selectedTypeName.toUpperCase() === ("Automotive").toUpperCase()) {
            if (e === 5) {
                if ((this.state.selectTrim === '' || this.state.selectTrim === undefined || this.state.selectTrim === null) && (this.state.otherTrim === '' || this.state.otherTrim === undefined || this.state.otherTrim === null) && (this.state.trimName === '' || this.state.trimName === undefined || this.state.trimName === null)) {
                    toastr.error('Error', 'Please Select Vehicle Trim')
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
                    if (this.state.hinNumber === '' || this.state.hinNumber === undefined || this.state.hinNumber.length < 13) {
                        toastr.error('Error', `Please Enter 13 to 14 HIN Number`)
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
                    toastr.error('Error', 'Please Select Car Transmission')
                    return false
                }
            }

            if (e === 12) {
                if ((this.state.fuelType === '' || this.state.fuelType === undefined)) {
                    toastr.error('Error', 'Please Select Car Fuel Type')
                    return false
                }
            }

            if (e === 13) {
                if ((this.state.drivetrain === '' || this.state.drivetrain === undefined)) {
                    toastr.error('Error', 'Please Select Car Drive Train')
                    return false
                }
            }

            if (e === 14) {
                if ((this.state.cylinder === '' || this.state.cylinder === undefined)) {
                    toastr.error('Error', 'Please Select Car Cylinder')
                    return false
                }
            }
            if (e === 15) {
                if ((this.state.color === '' || this.state.color === undefined)) {
                    toastr.error('Error', 'Please Select Car Color')
                    return false
                }
            }
            if (e === 16) {
                if ((this.state.previousOwner === '' || this.state.previousOwner === undefined)) {
                    toastr.error('Error', 'Please Select Car Previous Owner')
                    return false
                }
            }
            if (e === 17) {
                if ((this.state.previousAccident === '' || this.state.previousAccident === undefined)) {
                    toastr.error('Error', 'Please Select Car Previous Accident')
                    return false
                }
            }
            if (e === 18) {
                if ((this.props.vehicle_features.filter(item => item.checked === true).length === 0)) {
                    toastr.error('Error', 'Please Select Car Features')
                    return false
                }
            }
        }
        if (this.state.selectedTypeName.toUpperCase() === ("BOAT").toUpperCase()) {
            if (e === 4.1) {
                if ((this.state.selectModel === '' || this.state.selectModel === undefined || this.state.selectModel === null) && (this.state.otherModel === '' || this.state.otherModel === undefined || this.state.otherModel === null) && (this.state.modelName === '' || this.state.modelName === undefined || this.state.modelName === null)) {
                    toastr.error('Error', 'Please Select Vehicle Model')
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
                    if (this.state.hinNumber === '' || this.state.hinNumber === undefined || this.state.hinNumber.length < 13) {
                        toastr.error('Error', `Please Enter 13 to 14 HIN Number`)
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
                if ((this.state.price === '' || this.state.price === undefined || this.state.price === null) || (this.state.kilometer === '' || this.state.kilometer === undefined || this.state.kilometer === null)) {
                    toastr.error('Error', 'Please Enter Price And Kilometer')
                    return false
                }
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
        if (this.state.selectedTypeName.toUpperCase() === ("MOTORCYCLES").toUpperCase()) {
            if (e === 5) {
                if ((this.state.selectModel === '' || this.state.selectModel === undefined || this.state.selectModel === null) && (this.state.otherModel === '' || this.state.otherModel === undefined || this.state.otherModel === null) && (this.state.modelName === '' || this.state.modelName === undefined || this.state.modelName === null)) {
                    toastr.error('Error', 'Please Select Vehicle Model')
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
                    toastr.error('Error', 'Please Select Car Color')
                    return false
                }
            }
            if (e === 16) {
                if ((this.state.previousOwner === '' || this.state.previousOwner === undefined)) {
                    toastr.error('Error', 'Please Select Car Previous Owner')
                    return false
                }
            }

            if (e === 17) {
                if ((this.state.previousAccident === '' || this.state.previousAccident === undefined)) {
                    toastr.error('Error', 'Please Select Car Previous Accident')
                    return false
                }
            }
            if (e === 18) {
                if ((this.props.vehicle_features.filter(item => item.checked === true).length === 0)) {
                    toastr.error('Error', 'Please Select Car Features')
                    return false
                }
            }
        }
        if (this.state.selectedTypeName.toUpperCase() === ("RV").toUpperCase()) {
            if (e === 5) {
                if ((this.state.selectModel === '' || this.state.selectModel === undefined || this.state.selectModel === null) && (this.state.otherModel === '' || this.state.otherModel === undefined || this.state.otherModel === null) && (this.state.modelName === '' || this.state.modelName === undefined || this.state.modelName === null)) {
                    toastr.error('Error', 'Please Select Vehicle Model')
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

            if (e === 8) {
                if ((this.state.price === '' || this.state.price === undefined || this.state.price === null) || (this.state.kilometer === '' || this.state.kilometer === undefined || this.state.kilometer === null)) {
                    toastr.error('Error', 'Please Enter Price And Kilometer')
                    return false
                }
            }
            if (e === 15) {
                if ((this.state.price === '' || this.state.price === undefined || this.state.price === null) || (this.state.kilometer === '' || this.state.kilometer === undefined || this.state.kilometer === null)) {
                    toastr.error('Error', 'Please Enter Price And Kilometer')
                    return false
                }
            }

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
                if ((this.props.vehicle_features.filter(item => item.checked === true).length === 0)) {
                    toastr.error('Error', 'Please Select Car Features')
                    return false
                }
            }
        }
        if (this.state.selectedSubTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || this.state.selectedSubTypeName.toUpperCase() === ('Watercraft').toUpperCase()) {
            if (e === 4.1) {
                if ((this.state.selectModel === '' || this.state.selectModel === undefined || this.state.selectModel === null) && (this.state.otherModel === '' || this.state.otherModel === undefined || this.state.otherModel === null) && (this.state.modelName === '' || this.state.modelName === undefined || this.state.modelName === null)) {
                    toastr.error('Error', 'Please Select Vehicle Model')
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
                    if (this.state.hinNumber === '' || this.state.hinNumber === undefined || this.state.hinNumber.length < 13) {
                        toastr.error('Error', `Please Enter 13 to 14 HIN Number`)
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
                    toastr.error('Error', 'Please Select Car Previous Owner')
                    return false
                }
            }
        }

        if (this.state.selectedSubTypeName.toUpperCase() === ('ATV/UTV').toUpperCase()) {
            if (e === 5) {
                if ((this.state.selectModel === '' || this.state.selectModel === undefined || this.state.selectModel === null) && (this.state.otherModel === '' || this.state.otherModel === undefined || this.state.otherModel === null) && (this.state.modelName === '' || this.state.modelName === undefined || this.state.modelName === null)) {
                    toastr.error('Error', 'Please Select Vehicle Model')
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
                    toastr.error('Error', 'Please Select  Transmission')
                    return false
                }
            }
            if (e === 15) {
                if ((this.state.color === '' || this.state.color === undefined)) {
                    toastr.error('Error', 'Please Select  Color')
                    return false
                }
            }
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
            if (e === 18 && this.state.selectedSubTypeName.toUpperCase() !== ('Snowmobile').toUpperCase() && this.state.selectedSubTypeName.toUpperCase() !== ('Watercraft').toUpperCase()) {
                if ((this.props.vehicle_features.filter(item => item.checked === true).length === 0)) {
                    toastr.error('Error', 'Please Select  Features')
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

    handleOnClickBoost = (name, value, e, perc, prev, current, finalizeId) => {
        // if (this.state.backTo == '') {
        this.setState({
            ...this.state,
            [name]: value,
            // stepBoost: e
            tab: current,
            postSteps: this.state.postSteps.slice().map(item => {
                if (item.value == current) {
                    return {
                        ...item,
                        current: true
                    }
                }
                return {
                    ...item,
                    completed: item.value === 6 ? false : true,
                    current: false,
                    disbaled: item.value === 5 && value === 'free' ? true : item.disbaled
                }

            }),
            step: e,
            finalizeStep: finalizeId !== undefined ? finalizeId : this.state.finalizeStep,
            barPercent: this.state.barPercent + (perc),
            animation: (perc) > 0 ? "fadeInUp" : "fadeInDown"
        });
        // }
        //  else {
        //     this.setState({
        //         ...this.state,
        //         [name]: value,
        //         step: 23,
        //         tab: 6,
        //         backTo: '',
        //         finalizeStep: this.state.finalizeStep !== undefined ? this.state.finalizeStep : '',
        //         barPercent: this.state.newStep === true ? 95.83333333333334 : 95.83333333333334,
        //         postSteps: this.state.postSteps.slice().map(item => {
        //             if (item.value == 6) {
        //                 return {
        //                     ...item,
        //                     current: true
        //                 }
        //             }
        //             return {
        //                 ...item,
        //                 current: false,
        //             }
        //         })
        //     });
        // }

    };

    setCard = (card) => {
        console.log('Card', card)
        // this.setState({
        //     ...this.state,
        //     card: card
        // })
    }

    changeStepButton = (step, prev, current, perc, finalizeId, card) => {
        if (step == 19) {
            if ((this.state.description === '' || this.state.description === null)) {
                toastr.error('Error', 'Please Enter Description')
                return false
            }
        }

        if (step == 20) {
            if ((this.state.uploadImages == null || this.state.uploadImages == undefined || this.state.uploadImages.filter(item => item.files !== null).length == 0)) {
                toastr.error('Error', 'Please Select Car Images')
                return false
            }
            if ((this.state.uploadImages !== null && this.state.uploadImages !== undefined && this.state.uploadImages.filter(item => item.files !== null).length < 4)) {
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
        // if (this.state.selectedBoost !== 'free') {
        //     if (step == 23) {
        //         if ((this.state.checkPayment == null || this.state.checkPayment == undefined || this.state.checkPayment == '')) {
        //             toastr.error('Error', 'Please Select Payment Type')
        //             return false
        //         }
        //         if ((this.state.cardNumber == null || this.state.cardNumber == undefined || this.state.cardNumber == '')) {
        //             toastr.error('Error', 'Please Enter Card Number')
        //             return false
        //         }
        //         if ((this.state.cardExpirDate == null || this.state.cardExpirDate == undefined || this.state.cardExpirDate == '')) {
        //             toastr.error('Error', 'Please Enter Card Exp Date')
        //             return false
        //         }
        //         if ((this.state.cardCVC == null || this.state.cardCVC == undefined || this.state.cardCVC == '')) {
        //             toastr.error('Error', 'Please Enter Card CVC')
        //             return false
        //         }
        //     }
        // }
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
                barPercent: this.state.barPercent + (perc),
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
                finalizeStep: this.state.finalizeStep !== undefined ? this.state.finalizeStep : '',
                // /Add Payment
                barPercent: this.state.newStep === true ? 95.83333333333334
                    : 95.83333333333334,
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
                }
                return item
            }),
            finalizeStep: finalizeId !== undefined ? finalizeId : '',
            backTo: backTo,
            barPercent: (perc),
            animation: 'fadeInDown'
        });
    }

    changeStep = (e, perc) => {
        // step: e == 1 ? 1 : e == 2 ? 18 : e == 3 ? 19 : e == 4 ? 20 : 23,
        this.setState({
            ...this.state,
            tab: e,
            step: e == 1 ? 1 : e == 2 ? 19 : e == 3 ? 20 : e == 4 ? 21 : e == 5 ? 22 : 23,
            // payment Add
            // step: e == 1 ? 1 : e == 2 ? 19 : e == 3 ? 20 : e == 4 ? 21 : 23,
            postSteps: this.state.postSteps.slice().map(item => {
                return {
                    ...item,
                    current: item.value == e ? true : false
                }

            }),
            barPercent: perc,
            animation: 'fadeInDown'

            // e === 4 ? this.state.stepBoost === 2 ? (perc) + 6.66 : this.state.stepBoost === 3 ? (perc) + 13.32 : (perc) : perc
            // barPercent: e === 1 ? 0 : e === 2 ? 20 : e === 3 ? 40 : e === 4 ? this.state.stepBoost == 1 ? 60 : this.state.stepBoost === 2 ? 66.6 : this.state.stepBoost === 3 ? 73.32 : 80 : 100
        });
    };

    submitAdPost = () => {

        const features = this.props.vehicle_features.filter(item => item.checked === true).map(item => {
            return {
                id: item.id,
                v_features: item.v_features
            }
        })
        var formData = new FormData();
        let img_len = 0
        // if (this.state.file !== null) {
        //     for (let i = 0; i < this.state.files.length; i++) {
        //         formData.append(`images[${i}]`, this.state.files[i])
        //     }
        //     img_len = this.state.files.length
        // }
        if (this.state.uploadImages !== undefined && this.state.uploadImages !== null) {
            for (let i = 0; i < this.state.uploadImages.length; i++) {
                if (this.state.uploadImages[i].files !== undefined && this.state.uploadImages[i].files !== null) {
                    formData.append(`images[${i}]`, this.state.uploadImages[i].files)
                }
            }
            img_len = this.state.uploadImages.filter(item => item.files).length
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
        formData.append("transmission ", this.state.transmission);
        formData.append("fuel_type", this.state.fuelType);
        formData.append("drive_train", this.state.drivetrain);
        formData.append("cylinder", this.state.cylinder);
        formData.append("color", this.state.color);
        formData.append("previous_owners", this.state.previousOwner);
        formData.append("previous_accidents", this.state.previousAccident);
        formData.append("features", JSON.stringify(features));
        if (this.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() || this.state.selectedTypeName.toUpperCase() === ('MOTORCYCLES').toUpperCase()) {
            formData.append("engine", this.state.engineCC);
        }
        // formData.append("location", this.state.location == null ? '' : this.state.location);
        formData.append("other_model ", this.state.otherModel);
        if (this.state.selectModel !== '' || this.state.selectModel !== null) {
            formData.append("model", this.state.selectModel);
        }

        formData.append("otherTrim", this.state.otherTrim);
        formData.append("trim", this.state.trimName);
        formData.append("selectTrim", this.state.selectTrim);
        formData.append("year", this.state.year);
        formData.append("v_condition", this.state.selectCondition);
        formData.append("kilometer", this.state.kilometer == '' ? 0 : this.state.kilometer.split(',').join(""));
        formData.append("price", this.state.price == '' ? 0 : this.state.price.split(',').join(""));
        formData.append("body_type", this.state.bodyType);
        if (this.state.selectedTypeName.toUpperCase() !== ('BOAT').toUpperCase()) {
            formData.append("seating", this.state.seating);
        }
        // formData.append("images ", JSON.stringify(this.state.files));
        formData.append("selectVehicleMake", this.state.selectVehicleMake);
        formData.append("cardNumber", this.state.cardNumber);
        formData.append("cardExpirDate", this.state.cardExpirDate);
        formData.append("cardCVC", this.state.cardCVC);
        formData.append("checkPayment", this.state.checkPayment);
        formData.append("selectedBoost", this.state.selectedBoost);
        formData.append("other_make", this.state.otherMake);
        if (this.state.selectVehicleMake !== '' || this.state.selectVehicleMake !== null) {
            formData.append("make", this.state.selectVehicleMake);
        }
        formData.append("category", this.state.typeOfVehicle);
        formData.append("modelName", this.state.modelName);
        formData.append("longitude", this.state.longitude == '' ? 0 : this.state.longitude.toFixed(7));
        formData.append("latitude", this.state.latitude == '' ? 0 : this.state.latitude.toFixed(7));
        formData.append("location", this.state.locationName);
        formData.append("user_id", this.state.user_id);
        /** Not Used, Used in Backend */
        formData.append("accept_charges", '');
        formData.append("line_amount", '');
        formData.append("line_description", '');
        formData.append("line_name", '');
        formData.append("ownership_doc_back", this.state.nullState);
        formData.append("has_lines", '');
        formData.append("ownership_doc", this.state.nullState);
        formData.append("reason", 'Hard Coded No Reason');
        formData.append("vin", this.state.vinNumber);
        formData.append("hin", this.state.hinNumber);
        formData.append("serial_number", this.state.serialNumber);
        formData.append("is_active", this.state.hardCodeInt);
        formData.append("is_deleted", null);
        formData.append("modified_at", new Date());
        formData.append("is_sold", 0);

        formData.append("description", this.state.description);
        formData.append("stripe_payment_amount", '');
        formData.append("stripe_check_id", '');
        formData.append("bumpup_active", this.state.hardCodeInt);
        formData.append("listing_type", listing_type);
        formData.append("dealer_or_private_seller", this.state.hardCodeInt);
        formData.append("sub_type_id", this.state.subTypeId === '' ? 0 : this.state.subTypeId);
        formData.append("user_type", localStorage.getItem('user_type') !== null && localStorage.getItem('user_type') !== undefined ? localStorage.getItem('user_type') : '');
        formData.append("has_bumpup", this.state.hardCodeInt);
        formData.append("city", '');
        if (this.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase()) {
            formData.append('steering_type', this.state.steeringType)
            formData.append('passengers', this.state.passenger)
            formData.append('hours', this.state.boatHours)
            formData.append("seating", this.state.passenger);

        }
        // for (var pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        this.props.create_ad_post(formData)
    }

    handleLocationChange = (e) => {
        this.setState({
            ...this.state,
            location: e
        })
    }

    componentWillUnmount() {
        this.props.remove_all_post_state()
        this.props.remove_all()
    }

    render() {
        const { stripe } = this.props;
        // console.log(this.state)
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
                                                                removeLoaderModel={this.props.removeLoaderModel} removeLoaderType={this.props.removeLoaderType} removeLoaderTrims={this.props.removeLoaderTrims} />
                                                        </>) : this.state.tab === 2 ? (<>
                                                            <Photos files={files} onDrop={this.onDrop} changeSilde={this.changeSilde} changeStepButton={this.changeStepButton} startPercent={this.state.startPercent} previewImages={this.state.previewImages} removeFile={this.removeFile} animation={this.state.animation} />
                                                        </>) : this.state.tab === 3 ? (<>
                                                            <Locations handleInputChange={this.handleInputChange} handleLocationChange={this.handleLocationChange} changeStepButton={this.changeStepButton} location={this.state.location} promiseOptions={promiseOptions} stepBoost={this.state.stepBoost} startPercent={this.state.startPercent} animation={this.state.animation} />
                                                        </>) : this.state.tab === 4 ? (<>
                                                            <Boost changeBoost={this.changeBoost} changeCardValues={this.changeCardValues} handleOnChange={this.handleOnChange} changeStepButton={this.changeStepButton} handleOnClickBoost={this.handleOnClickBoost} selectedBoost={this.state.selectedBoost} cardCVC={this.state.cardCVC} cardNumber={this.state.cardNumber} cardExpirDate={this.state.cardExpirDate} stepBoost={this.state.stepBoost} submitAdPost={this.submitAdPost} editPost={this.editPost} discardState={this.discardState} startPercent={this.state.startPercent} animation={this.state.animation} />
                                                        </>) : this.state.tab === 5 ? (<>
                                                            <Payment setCard={this.setCard} changeBoost={this.changeBoost} checkPayment={this.state.checkPayment} changeCardValues={this.changeCardValues} handleOnChange={this.handleOnChange} changeStepButton={this.changeStepButton} handleOnClickBoost={this.handleOnClickBoost} selectedBoost={this.state.selectedBoost} cardCVC={this.state.cardCVC} cardNumber={this.state.cardNumber} cardExpirDate={this.state.cardExpirDate} startPercent={this.state.startPercent} animation={this.state.animation} completePostAdd={this.completePostAdd} clientSecret={this.props.clientSecret} />
                                                        </>) : this.state.tab === 6 && this.state.finalizeStep === 1 ? (<>
                                                            <FinalizeAdd changeBoost={this.changeBoost} changeCardValues={this.changeCardValues} handleOnChange={this.handleOnChange} changeStepButton={this.changeStepButton} handleOnClickBoost={this.handleOnClickBoost} selectedBoost={this.state.selectedBoost} cardCVC={this.state.cardCVC} cardNumber={this.state.cardNumber} cardExpirDate={this.state.cardExpirDate} stepBoost={this.state.stepBoost} submitAdPost={this.submitAdPost} editPost={this.editPost} discardState={this.discardState} isLoading={this.props.isLoading} startPercent={this.state.startPercent} typeOfVehiclePerc={typeOfVehiclePerc}
                                                                photoPerc={photoPerc}
                                                                locationPerc={locationPerc}
                                                                boostPerc={boostPerc}
                                                                paymentPerc={paymentPerc}
                                                                postAdPerc={postAdPerc} animation={this.state.animation} completePostAdd={this.completePostAdd} clientSecret={this.props.clientSecret} card={this.state.card} />
                                                        </>) : this.state.tab === 6 && this.state.finalizeStep === '' ? (<>
                                                            <ConfirmPost />
                                                        </>) : null}
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
    create_ad_post,
    remove_all_post_state,
    get_sub_type_vehicle_make,
    remove_all,
    get_vehicle_trims
})(PostAdd);

// {this.state.step < 18 ? (<>
//     <TypeofVehicle handleOnChangeFeatures={this.handleOnChangeFeatures} changeStepButton={this.changeStepButton} state={this.state} handleOnClick={this.handleOnClick} handleOnChange={this.handleOnChange} changeSilde={this.changeSilde} {...this.props} validator={this.validator} changeSubVehicleTye={this.changeSubVehicleTye} />
// </>) : this.state.step == 18 ? (<>
//     <Photos files={files} onDrop={this.onDrop} changeSilde={this.changeSilde} changeStepButton={this.changeStepButton} />
// </>) : this.state.step == 19 ? (<>
//     <Locations handleInputChange={this.handleInputChange} changeStepButton={this.changeStepButton} location={this.state.location} promiseOptions={promiseOptions} />
// </>) : this.state.step == 20 ? (<>
//     <Boost changeBoost={this.changeBoost} changeCardValues={this.changeCardValues} handleOnChange={this.handleOnChange} changeStepButton={this.changeStepButton} handleOnClickBoost={this.handleOnClickBoost} selectedBoost={this.state.selectedBoost} cardCVC={this.state.cardCVC} cardNumber={this.state.cardNumber} cardExpirDate={this.state.cardExpirDate} stepBoost={this.state.stepBoost} submitAdPost={this.submitAdPost} editPost={this.editPost} discardState={this.discardState} />
// </>) : this.state.step == 23 ? (<>
//     <ConfirmPost />
// </>) : null}
   // await files.forEach(async (item, index) => {
        //     if (item.type != "image/png" && item.type != "image/jpg" && item.type != "image/jpeg") {
        //         toastr.error('Error', `${item.path} File does not support. You must use .png, jpeg or .jpg`)
        //         return false;
        //     } else
        //         if (item.size > (2 * 1024 * 1024)) {
        //             toastr.error('Error', `${item.path} Please upload a file smaller than 2 MB`)
        //             return false;
        //         } else {
        //             const ext = item.type !== undefined && item.type !== null ? item.type.split('/')[1] : 'png'
        //             console.log(ext)
        //             console.log(item)
        //             const imageBase64 = await this.resizeFile(item, ext)
        //             emptyPreviewFiles = emptyPreviewFiles.map((img, fileIndex) => {
        //                 if (fileIndex === index) {
        //                     return {
        //                         ...img,
        //                         preViewFiles: imageBase64
        //                     }
        //                 }
        //                 return img
        //             })
        //             console.log(emptyPreviewFiles)
        //             emptyFiles = emptyFiles.map((img, fileIndex) => {
        //                 if (fileIndex === index) {
        //                     return {
        //                         ...img,
        //                         files: item
        //                     }
        //                 }
        //                 return img
        //             })


        //         }
        // })