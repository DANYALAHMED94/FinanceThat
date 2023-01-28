import React, { Component } from 'react'
import Geocode from "react-geocode";
import { Scrollbars } from "react-custom-scrollbars";
import {
    get_post_list, filter_on_price_range,
    filter_on_trim,
    filter_on_year_range,
    filter_on_transmission,
    filter_on_kilometer_range,
    filter_on_condition,
    filter_on_seller_type,
    filter_on_color,
    filter_on_features,
    get_list_filters,
    filter_on_make,
    filter_on_model,
    saved_ad_post,
    add_filters,
    remove_filter,
    remove_all_filter,
    remove_filter_feature,
    get_filter_record,
    remove_all_posts,
    change_type_of_vehicle

} from '../../actions/listPostActions'
import {
    get_vehicle_type,
    get_vehicle_feature,
    get_vehicle_trims,
    toggle_vehicle_features,
    remove_all_features,
    remove_all,
    get_vehicle_fuel_type,
    get_vehicle_drive_train,
    get_vehicle_body_type
} from '../../actions/addPostActions'
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format';
import MaskedInput from 'react-text-mask'
import {
    transmissions,
    colors,
    steeringTypes,
    seatings,
    passengers,
    conditions,
    owners,
    accidents,
    cylinders
} from './filterConstants'
class AdPostSearchMobileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewList: "grid",
            searchKm: this.props.location.query !== undefined ? this.props.location.query.location !== undefined ? this.props.location.query.location : '' : '',
            search: this.props.location.query !== undefined ? this.props.location.query.search !== undefined ? this.props.location.query.search : '' : '',
            category: this.props.location.query !== undefined ? this.props.location.query.category !== undefined ? this.props.location.query.category : '' : '',
            sortBy: '',
            fromRange: '',
            toRange: this.props.location.query !== undefined ? this.props.location.query.fromRange !== undefined ? this.props.location.query.fromRange : '' : '',
            seller_type: '',
            featureName: '',
            color: this.props.location.query !== undefined ? this.props.location.query.color !== undefined ? this.props.location.query.color : '' : '',
            transmission: '',
            selectTrim: '',
            toYear: this.props.location.query !== undefined ? this.props.location.query.fromYear !== undefined ? this.props.location.query.fromYear : '' : '',
            fromYear: '',
            vehicleMake: this.props.location.query !== undefined ? this.props.location.query.vehicleMake !== undefined ? this.props.location.query.vehicleMake : '' : '',
            fromKilometer: '',
            toKilometer: this.props.location.query !== undefined ? this.props.location.query.fromKilometer !== undefined ? this.props.location.query.fromKilometer : '' : '',
            vehicleModel: this.props.location.query !== undefined ? this.props.location.query.vehicleModel !== undefined ? this.props.location.query.vehicleModel : '' : '',
            typeOfVehicle: this.props.location.query !== undefined ? this.props.location.query.category !== undefined ? this.props.location.query.category : '' : '',
            selectCondition: '',
            type_of_vehicle: [],
            vehicle_make: [],
            vehicle_model: [],
            categoryFilterName: this.props.location.query !== undefined ? this.props.location.query.categoryFilterName !== undefined ? this.props.location.query.categoryFilterName : '' : '',
            makeFilterName: this.props.location.query !== undefined ? this.props.location.query.makeFilterName !== undefined ? this.props.location.query.makeFilterName : '' : '',
            modelFilterName: this.props.location.query !== undefined ? this.props.location.query.modelFilterName !== undefined ? this.props.location.query.modelFilterName : '' : '',
            latitude: this.props.location.query !== undefined ? this.props.location.query.latitude !== undefined ? this.props.location.query.latitude : '' : '',
            longitude: this.props.location.query !== undefined ? this.props.location.query.longitude !== undefined ? this.props.location.query.longitude : '' : '',
            start_pay: '',
            paymentPrice: 'p',
            end_pay: '',
            vehicleFuelType: '',
            vehicleDriveTrain: '',
            vehicleCylinder: '',
            vehicleSeating: '',
            vehicleBody: '',
            vehicleAccident: '',
            vehicleOwner: '',
            filters: [{
                id: 7, name: "Automotive", make: true, model: true, trim: true, year: true, body_type: true, price: true,
                kilometer: true,
                condition: true, transmission: true, fuel_type: true, drive_train: true, cylinder: true, seating: true, color: true, seller_type: true, accident: true, owner: true, features: true, passenger: false, steering_type: false
            },
            {
                id: 9, name: "Powersport", make: true, model: true, trim: false, year: true, body_type: false, price: true,
                kilometer: true,
                condition: true, transmission: true, fuel_type: false, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: true, passenger: false, steering_type: false
            },
            {
                id: 2, name: "Motorcycle", make: true, model: true, trim: false, year: true, body_type: false, price: true,
                kilometer: true,
                condition: true, transmission: false, fuel_type: false, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: true, passenger: false, steering_type: false
            },
            {
                id: 3, name: "Boat", make: true, model: true, trim: false, year: true, body_type: false, price: true,
                kilometer: true,
                condition: true, transmission: false, fuel_type: true, passenger: true, steering_type: true, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: true
            },
            {
                id: 6, name: "RV", make: true, model: true, trim: false, year: true, body_type: false, price: true,
                kilometer: true,
                condition: true, transmission: false, fuel_type: false, passenger: false, steering_type: false, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: true
            },
            {
                id: 8, name: "Small Equipment", make: true, model: true, trim: false, year: true, body_type: false, price: true,
                kilometer: true,
                condition: true, transmission: false, fuel_type: false, passenger: false, steering_type: false, drive_train: false, cylinder: false, seating: false, color: false, seller_type: true, accident: false, owners: false, features: false
            }
            ],
            allowFilters: [{
                id: 7, name: "Automotive", make: true, model: true, trim: true, year: true, body_type: true, price: true,
                kilometer: true,
                condition: true, transmission: true, fuel_type: true, drive_train: true, cylinder: true, seating: true, color: true, seller_type: true, accident: true, owner: true, features: true, passenger: false, steering_type: false
            }]

        };
        window.scrollTo(0, 0)

    }

    componentDidMount() {
        console.log('this.props', this.props)
        // this.props.get_vehicle_type()
        this.searchPost()
        this.add_filter_reducer()
        //   this.props.get_post_list()
        this.props.get_list_filters()
        this.props.get_vehicle_fuel_type()

        this.props.get_vehicle_drive_train()
        Geocode.setApiKey("AIzaSyBDXs8HHpZSRxd1vJapwzON64a_vmjpn_4");
        Geocode.setLanguage("en");
        Geocode.enableDebug();
    }

    chnageListView = (para) => {
        this.setState({
            viewList: para,
        });
    };

    handleOnChange = (e) => {

        const { name, value } = e.target
        if (name == 'category' || name == 'typeOfVehicle') {
            this.setState({
                ...this.state,
                category: value,
                typeOfVehicle: value,
            })
        } else if (name == 'fromKilometer' || name == 'toKilometer') {
            if (value >= 0) {
                this.setState({
                    ...this.state,
                    [name]: value
                })
            }

        } else {
            this.setState({
                ...this.state,
                [name]: value
            })
        }

    }

    handleOnChangeFeatures = (id) => {
        const features_list = this.props.vehicle_features.filter(item => item.id == id)
        const data = {
            ...features_list[0],
            name: features_list.length > 0 ? features_list[0].v_features : '',
            filter_name: 'feature'
        }
        // this.props.filter_on_features(data)
        this.props.toggle_vehicle_features(id)
        setTimeout(() => {
            this.callFilterApi()
            this.add_filter_reducer()
        }, 10)

    }

    handleOnClick = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.typeOfVehicle !== this.state.typeOfVehicle && this.state.typeOfVehicle !== '') {
            const makes = this.props.post_list_filters.vehicle_make !== undefined && this.props.post_list_filters.vehicle_make !== null ? this.props.post_list_filters.vehicle_make.filter(item => Number(this.state.typeOfVehicle) === Number(item.type_id)) : []
            console.log('makes', makes)
            console.log(this.props.post_list_filters.vehicle_make)
            const allowFilters = this.state.filters.filter(item => Number(item.id) === Number(this.state.typeOfVehicle)).length > 0 ? this.state.filters.filter(item => Number(item.id) === Number(this.state.typeOfVehicle)) : [{
                id: 7, name: "Automotive", make: true, model: true, trim: true, year: true, body_type: true, price: true,
                kilometer: true,
                condition: true, transmission: true, fuel_type: true, drive_train: true, cylinder: true, seating: true, color: true, seller_type: true, accident: true, owner: true, features: true, passenger: false, steering_type: false
            }]
            this.setState({
                ...this.state,
                vehicle_make: makes,
                category: this.state.typeOfVehicle,
                sortBy: '',
                fromRange: '',
                toRange: '',
                seller_type: '',
                featureName: '',
                color: '',
                transmission: '',
                selectTrim: '',
                toYear: new Date().getFullYear(),
                fromYear: 1900,
                vehicleMake: '',
                fromKilometer: '',
                toKilometer: '',
                vehicleModel: '',
                selectCondition: '',
                categoryFilterName: '',
                makeFilterName: '',
                modelFilterName: '',
                search: '',
                searchKm: '',
                longitude: '',
                longitude: '',
                paymentPrice: 'p',
                start_pay: '',
                end_pay: '',
                start_pay: '',
                end_pay: '',
                vehicleFuelType: '',
                vehicleDriveTrain: '',
                vehicleCylinder: '',
                vehicleSeating: '',
                vehicleBody: '',
                vehicleAccident: '',
                vehicleOwner: '',
                allowFilters: allowFilters
            })
            // this.props.remove_all_filter()
            // this.props.remove_all_features()
            // this.props.remove_all()
            setTimeout(() => {
                this.add_filter_reducer()
                this.callFilterApi()
            }, 100)
            this.props.change_type_of_vehicle(this.state.typeOfVehicle)
            this.props.get_vehicle_feature(this.state.typeOfVehicle)
            this.props.get_vehicle_body_type(this.state.typeOfVehicle)
        }
        if ((prevState.fromRange !== this.state.fromRange) || (prevState.toRange !== this.state.toRange)) {
            this.add_filter_reducer()
            this.callFilterApi()
            // this.props.filter_on_price_range(data)
        }
        if ((prevState.start_pay !== this.state.start_pay) || (prevState.end_pay !== this.state.end_pay)) {
            this.add_filter_reducer()
            this.callFilterApi()
            // this.props.filter_on_price_range(data)
        }
        if (prevState.selectTrim !== this.state.selectTrim && this.state.selectTrim !== '') {
            this.add_filter_reducer()
            this.callFilterApi()
            // this.props.filter_on_trim(data)
        }
        if ((prevState.fromYear !== this.state.fromYear) || (prevState.toYear !== this.state.toYear)) {
            this.add_filter_reducer()
            this.callFilterApi()
            // this.props.filter_on_year_range(data)
        }
        if ((prevState.fromKilometer !== this.state.fromKilometer) || (prevState.toKilometer !== this.state.toKilometer)) {
            this.add_filter_reducer()
            this.callFilterApi()
        }
        if (prevState.transmission !== this.state.transmission && this.state.transmission !== '') {
            this.add_filter_reducer()
            this.callFilterApi()
            // this.props.filter_on_transmission(data)
        }
        if (prevState.selectCondition !== this.state.selectCondition && this.state.selectCondition !== '') {
            this.add_filter_reducer()
            this.callFilterApi()
            // this.props.filter_on_condition(data)
        }
        if (prevState.seller_type !== this.state.seller_type && this.state.seller_type !== '') {
            this.add_filter_reducer()
            this.callFilterApi()
            // this.props.filter_on_seller_type(data)
        }
        if (prevState.color !== this.state.color && this.state.color !== '') {
            this.add_filter_reducer()
            this.callFilterApi()
            // this.props.filter_on_color(data)
        }
        if (prevState.vehicleMake !== this.state.vehicleMake && this.state.vehicleMake !== '') {
            const models = this.props.post_list_filters.vehicle_model !== undefined && this.props.post_list_filters.vehicle_model !== null ? this.props.post_list_filters.vehicle_model.filter(item => Number(item.make_id_id) === Number(this.state.vehicleMake)) : []
            this.setState({
                ...this.state,
                vehicle_model: models
            })
            this.add_filter_reducer()
            this.callFilterApi()
            // this.props.filter_on_make(data)
        }
        if (prevState.vehicleModel !== this.state.vehicleModel && this.state.vehicleModel !== '') {
            this.props.get_vehicle_trims(this.state.vehicleModel)
            this.add_filter_reducer()
            this.callFilterApi()
            // this.props.filter_on_model(data)
        }
        if (prevState.vehicleFuelType !== this.state.vehicleFuelType && this.state.vehicleFuelType !== '') {
            this.add_filter_reducer()
            this.callFilterApi()
        }
        if (prevState.vehicleDriveTrain !== this.state.vehicleDriveTrain && this.state.vehicleDriveTrain !== '') {
            this.add_filter_reducer()
            this.callFilterApi()
        }
        if (prevState.vehicleCylinder !== this.state.vehicleCylinder && this.state.vehicleCylinder !== '') {
            this.add_filter_reducer()
            this.callFilterApi()
        }
        if (prevState.vehicleSeating !== this.state.vehicleSeating && this.state.vehicleSeating !== '') {
            this.add_filter_reducer()
            this.callFilterApi()
        }
        if (prevState.vehicleBody !== this.state.vehicleBody && this.state.vehicleBody !== '') {
            this.add_filter_reducer()
            this.callFilterApi()
        }
        if (prevState.vehicleAccident !== this.state.vehicleAccident && this.state.vehicleAccident !== '') {
            this.add_filter_reducer()
            this.callFilterApi()
        }
        if (prevState.vehicleOwner !== this.state.vehicleOwner && this.state.vehicleOwner !== '') {
            this.add_filter_reducer()
            this.callFilterApi()
        }
        if (prevState.paymentPrice !== this.state.paymentPrice) {

            this.setState({
                ...this.state,
                fromRange: '',
                toRange: '',
                start_pay: '',
                end_pay: ''
            })
            // this.props.filter_on_model(data)
        }
        /**
     *
     *
     *  Location Drop Down
     *
     */

        if (prevState.searchKm !== this.state.searchKm) {
            // new Promise(resolve => {
            Geocode.fromAddress(this.state.searchKm).then(
                response => {
                    let location = []
                    // response.results[0].address_components.map((item, index) => {
                    this.setState({
                        ...this.state,
                        latitude: response.results[0].geometry.location.lat,
                        longitude: response.results[0].geometry.location.lng
                    })
                    // resolve((location));
                },
                error => {
                    console.error('error Location Api', error);
                }
            );
            // })
        }
        if (prevProps.post_list_filters !== this.props.post_list_filters && this.props.post_list_filters !== undefined) {
            this.setState({
                ...this.state,
                type_of_vehicle: this.props.post_list_filters.type_of_vehicle,
            })
        }

    }

    blurOnKilometer = () => {
        this.add_filter_reducer()
        this.callFilterApi()
    }


    add_filter_reducer = () => {
        const modelName = this.state.vehicleModel !== '' ? this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] == undefined ? this.state.modelFilterName : this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] : this.state.modelFilterName
        const makeName = this.state.vehicleMake != '' ? this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] == undefined ? this.state.makeFilterName : this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] : this.state.makeFilterName
        const data = {
            category: this.state.typeOfVehicle !== '' ? (this.state.type_of_vehicle || []).filter(item => item.id == this.state.typeOfVehicle).map(item => { return item.name })[0] == undefined ? this.state.categoryFilterName : (this.state.type_of_vehicle || []).filter(item => item.id == this.state.typeOfVehicle).map(item => { return item.name })[0] : this.state.categoryFilterName,
            start_p: this.state.fromRange == '' ? 0 : this.state.fromRange.replace('$', '').split(',').join(""),
            end_p: this.state.toRange.replace('$', '').split(',').join(""),
            start_k: this.state.fromKilometer == '' ? 0 : this.state.fromKilometer.split(',').join(""),
            end_k: this.state.toKilometer.split(',').join(""),
            start_y: this.state.fromYear == '' ? 0 : this.state.fromYear,
            end_y: this.state.toYear,
            make: makeName,
            model: modelName,
            trim: this.state.selectTrim,
            transmission: this.state.transmission,
            condition: this.state.selectCondition,
            color: this.state.color,
            seller_type: this.state.seller_type == 2 ? 'Private Seller' : this.state.seller_type == 1 ? 'Dealer' : '',
            features: this.props.vehicle_features.filter(item => item.checked == true).map(item => { return { id: item.id, name: item.v_features } }),
            vehicleFuel: this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.fuel_type })[0] !== undefined && this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.fuel_type })[0] !== null ? this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.fuel_type })[0] : '',
            vehicleDrive: this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.drive_train })[0] !== undefined && this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.drive_train })[0] !== null ? this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.drive_train })[0] : '',
            vehicleCylinder: this.state.vehicleCylinder,
            vehicleSeating: this.state.vehicleSeating,
            vehicleBody: this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] !== undefined && this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] !== null ? this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] : '',
            vehicleAccident: this.state.vehicleAccident,
            vehicleOwner: this.state.vehicleOwner,
        }
        console.log(data, 'adFilter')
        this.props.add_filters(data)
    }

    callFilterApi = () => {
        const modelName = this.state.vehicleModel !== '' ? this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] == undefined ? this.state.modelFilterName : this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] : this.state.modelFilterName
        const makeName = this.state.vehicleMake != '' ? this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] == undefined ? this.state.makeFilterName : this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] : this.state.makeFilterName
        const data = {
            start_pay: this.state.start_pay == '' ? '' : this.state.start_pay.split(',').join(""),
            end_pay: this.state.end_pay == '' ? '' : this.state.end_pay.split(',').join(""),
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            search: this.state.search,
            category: this.state.typeOfVehicle !== '' ? (this.state.type_of_vehicle || []).filter(item => item.id == this.state.typeOfVehicle).map(item => { return item.name })[0] == undefined ? this.state.categoryFilterName : (this.state.type_of_vehicle || []).filter(item => item.id == this.state.typeOfVehicle).map(item => { return item.name })[0] : this.state.categoryFilterName,
            start_p: this.state.fromRange == '' ? 0 : this.state.fromRange.replace('$', '').split(',').join(""),
            end_p: this.state.toRange == '' ? '' : this.state.toRange.replace('$', '').split(',').join(""),
            start_k: this.state.fromKilometer == '' ? 0 : this.state.fromKilometer.split(',').join(""),
            end_k: this.state.toKilometer == '' ? '' : this.state.toKilometer.split(',').join(""),
            start_y: this.state.fromYear == '' ? 0 : this.state.fromYear,
            end_y: this.state.toYear,
            make: makeName,
            model: modelName,
            trim: this.state.selectTrim,
            transmission: this.state.transmission,
            condition: this.state.selectCondition,
            color: this.state.color,
            seller_type: this.state.seller_type,
            features: this.props.vehicle_features.filter(item => item.checked == true).map(item => { return item.v_features }).length > 0 ? JSON.stringify([this.props.vehicle_features.filter(item => item.checked == true).map(item => { return item.v_features }).join(',')]) : '',
            vehicleFuel: this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.fuel_type })[0] !== undefined && this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.fuel_type })[0] !== null ? this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.fuel_type })[0] : '',
            vehicleDrive: this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.drive_train })[0] !== undefined && this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.drive_train })[0] !== null ? this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.drive_train })[0] : '',
            vehicleCylinder: this.state.vehicleCylinder,
            vehicleSeating: this.state.vehicleSeating,
            vehicleBody: this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] !== undefined && this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] !== null ? this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] : '',
            vehicleAccident: this.state.vehicleAccident,
            vehicleOwner: this.state.vehicleOwner,
        }
        this.props.get_filter_record(data)
    }

    resetState = (name, value) => {
        if (name == 'vehicleModel') {
            this.setState({
                ...this.state,
                [name]: '',
                modelFilterName: ''
            })
        } else if (name == 'vehicleMake') {
            this.setState({
                ...this.state,
                makeFilterName: '',
                [name]: ''
            })
        } else if (name == 'typeOfVehicle') {
            this.setState({
                ...this.state,
                [name]: '',
                category: '',
                categoryFilterName: ''
            })
        } else {
            this.setState({
                ...this.state,
                [name]: ''
            })
        }

        this.props.remove_filter(name, value)
        setTimeout(() => {
            this.callFilterApi()
        }, 10)
    }

    resetAllState = () => {
        this.setState({
            ...this.state,
            category: '',
            sortBy: '',
            fromRange: '',
            toRange: '',
            seller_type: '',
            featureName: '',
            color: '',
            transmission: '',
            selectTrim: '',
            toYear: new Date().getFullYear(),
            fromYear: 1900,
            vehicleMake: '',
            fromKilometer: '',
            toKilometer: '',
            vehicleModel: '',
            typeOfVehicle: '',
            selectCondition: '',
            categoryFilterName: '',
            makeFilterName: '',
            modelFilterName: '',
            search: '',
            searchKm: '',
            longitude: '',
            longitude: '',
            paymentPrice: 'p',
            start_pay: '',
            end_pay: '',
            start_pay: '',
            end_pay: '',
            vehicleFuelType: '',
            vehicleDriveTrain: '',
            vehicleCylinder: '',
            vehicleSeating: '',
            vehicleBody: '',
            vehicleAccident: '',
            vehicleOwner: '',
            allowFilters: [{
                id: 7, name: "Automotive", make: true, model: true, trim: true, year: true, body_type: true, price: true,
                kilometer: true,
                condition: true, transmission: true, fuel_type: true, drive_train: true, cylinder: true, seating: true, color: true, seller_type: true, accident: true, owner: true, features: true, passenger: false, steering_type: false
            }]
        })
        this.props.remove_all_filter()
        this.props.remove_all_features()
        // this.props.remove_all()
        setTimeout(() => {
            this.callFilterApi()
        }, 100)
        // this.callFilterApi()
    }
    removeFeatures = (id) => {
        this.props.toggle_vehicle_features(id)
        this.props.remove_filter_feature(id)
        setTimeout(() => {
            this.callFilterApi()
        }, 10)

    }

    changePaymentPrice = (e) => {
        console.log(e)
        this.setState({
            ...this.state,
            paymentPrice: e,

        })
    }

    searchPost = () => {
        const modelName = this.state.vehicleModel !== '' ? this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] == undefined ? this.state.modelFilterName : this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] : this.state.modelFilterName
        const makeName = this.state.vehicleMake != '' ? this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] == undefined ? this.state.makeFilterName : this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] : this.state.makeFilterName
        const data = {
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            search: this.state.search,
            category: this.state.typeOfVehicle !== '' ? (this.state.type_of_vehicle || []).filter(item => item.id == this.state.typeOfVehicle).map(item => { return item.name })[0] == undefined ? this.state.categoryFilterName : (this.state.type_of_vehicle || []).filter(item => item.id == this.state.typeOfVehicle).map(item => { return item.name })[0] : this.state.categoryFilterName,
            start_pay: this.state.start_pay == '' ? '' : this.state.start_pay.split(',').join(""),
            end_pay: this.state.end_pay == '' ? '' : this.state.end_pay.split(',').join(""),
            start_p: this.state.fromRange == '' ? 0 : this.state.fromRange.replace('$', '').split(',').join(""),
            end_p: this.state.toRange == '' ? '' : this.state.toRange.replace('$', '').split(',').join(""),
            start_k: this.state.fromKilometer == '' ? 0 : this.state.fromKilometer.split(',').join(""),
            end_k: this.state.toKilometer == '' ? '' : this.state.toKilometer.split(',').join(""),
            start_y: this.state.fromYear == '' ? 0 : this.state.fromYear,
            end_y: this.state.toYear,
            make: makeName,
            model: modelName,
            trim: this.state.selectTrim,
            transmission: this.state.transmission,
            condition: this.state.selectCondition,
            color: this.state.color,
            seller_type: this.state.seller_type,
            features: this.props.vehicle_features.filter(item => item.checked == true).map(item => { return item.v_features }).length > 0 ? JSON.stringify([this.props.vehicle_features.filter(item => item.checked == true).map(item => { return item.v_features }).join(',')]) : '',
            vehicleFuel: this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.fuel_type })[0] !== undefined && this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.fuel_type })[0] !== null ? this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.fuel_type })[0] : '',
            vehicleDrive: this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.drive_train })[0] !== undefined && this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.drive_train })[0] !== null ? this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.drive_train })[0] : '',
            vehicleCylinder: this.state.vehicleCylinder,
            vehicleSeating: this.state.vehicleSeating,
            vehicleBody: this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] !== undefined && this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] !== null ? this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] : '',
            vehicleAccident: this.state.vehicleAccident,
            vehicleOwner: this.state.vehicleOwner,
        }
        this.props.get_filter_record(data)
    }

    componentWillUnmount() {
        this.props.remove_all_posts()
        this.props.remove_all()
    }
    camelize = (str) => {
        return str.replace(/\W+(.)/g, function (match, chr) {
            return chr.toUpperCase();
        });
    }
    render() {
        return (<React.Fragment>

            <div className="MobileNav" style={{ display: `${this.props.toggleMobileView === false ? 'none' : ''}` }}>


                <div className="LeftMenu-Container">

                    <div className="Filter-Head">
                        <h1>
                            Filters
{/* Filters <span>(0)</span> */}
                        </h1>
                        <button type="button" onClick={this.resetAllState}>Clear Filters</button>
                    </div>

                    <div className="FilterList">
                        <ul>
                            {this.props.selected_filter_list.length !== 0 && this.props.selected_filter_list !== undefined ? (this.props.selected_filter_list.map((item, index) => (
                                <React.Fragment key={index}>
                                    {item.category !== '' && item.category !== undefined && item.category !== null ? (<React.Fragment>
                                        <li key={index}>
                                            <a >
                                                {item.category} <div className="Filter-Close" onClick={() => this.resetState('typeOfVehicle', item.category)}></div>
                                            </a>
                                        </li>
                                    </React.Fragment>) : null}
                                    {item.make !== '' && item.make !== undefined && item.make !== null ? (<React.Fragment>
                                        <li key={index}>
                                            <a >
                                                {item.make} <div className="Filter-Close" onClick={() => this.resetState('vehicleMake', item.make)}></div>
                                            </a>
                                        </li>
                                    </React.Fragment>) : null}
                                    {item.model !== '' && item.model !== undefined && item.model !== null ? (<React.Fragment>
                                        <li key={index}>
                                            <a >
                                                {item.model} <div className="Filter-Close" onClick={() => this.resetState('vehicleModel', item.model)}></div>
                                            </a>
                                        </li>
                                    </React.Fragment>) : null}
                                    {item.trim !== '' && item.trim !== undefined && item.trim !== null ? (<React.Fragment>
                                        <li key={index}>
                                            <a >
                                                {item.trim} <div className="Filter-Close" onClick={() => this.resetState('selectTrim', item.trim)}></div>
                                            </a>
                                        </li>
                                    </React.Fragment>) : null}
                                    {item.transmission !== '' && item.transmission !== undefined && item.transmission !== null ? (<React.Fragment>
                                        <li key={index}>
                                            <a >
                                                {item.transmission} <div className="Filter-Close" onClick={() => this.resetState('transmission', item.transmission)}></div>
                                            </a>
                                        </li>
                                    </React.Fragment>) : null}
                                    {item.condition !== '' && item.condition !== undefined && item.condition !== null ? (<React.Fragment>
                                        <li key={index}>
                                            <a >
                                                {item.condition} <div className="Filter-Close" onClick={() => this.resetState('condition', item.condition)}></div>
                                            </a>
                                        </li>
                                    </React.Fragment>) : null}
                                    {item.color !== '' && item.color !== undefined && item.color !== null ? (<React.Fragment>
                                        <li key={index}>
                                            <a >
                                                {item.color} <div className="Filter-Close" onClick={() => this.resetState('color', item.color)}></div>
                                            </a>
                                        </li>
                                    </React.Fragment>) : null}
                                    {item.seller_type !== '' && item.seller_type !== undefined && item.seller_type !== null ? (<React.Fragment>
                                        <li key={index}>
                                            <a >
                                                {item.seller_type} <div className="Filter-Close" onClick={() => this.resetState('seller_type', item.seller_type)}></div>
                                            </a>
                                        </li>
                                    </React.Fragment>) : null}

                                    {item.vehicleFuel !== '' && item.vehicleFuel !== undefined && item.vehicleFuel !== null ? (<React.Fragment>
                                        <li key={index}>
                                            <a >
                                                {item.vehicleFuel} <div className="Filter-Close" onClick={() => this.resetState('vehicleFuel', item.vehicleFuel)}></div>
                                            </a>
                                        </li>
                                    </React.Fragment>) : null}
                                    {item.vehicleDrive !== '' && item.vehicleDrive !== undefined && item.vehicleDrive !== null ? (<React.Fragment>
                                        <li key={index}>
                                            <a >
                                                {item.vehicleDrive} <div className="Filter-Close" onClick={() => this.resetState('vehicleDrive', item.vehicleDrive)}></div>
                                            </a>
                                        </li>
                                    </React.Fragment>) : null}
                                    {item.vehicleBody !== '' && item.vehicleBody !== undefined && item.vehicleBody !== null ? (<React.Fragment>
                                        <li key={index}>
                                            <a >
                                                {item.vehicleBody} <div className="Filter-Close" onClick={() => this.resetState('vehicleBody', item.vehicleBody)}></div>
                                            </a>
                                        </li>
                                    </React.Fragment>) : null}
                                    {item.features.length !== 0 && item.features !== undefined && item.features !== null ? (
                                        <React.Fragment>
                                            {item.features.map((itemFeat, featureIndex) => (
                                                <li key={featureIndex}>
                                                    <a >
                                                        {itemFeat.name} <div className="Filter-Close" onClick={() => this.removeFeatures(itemFeat.id)}></div>
                                                    </a>
                                                </li>
                                            )
                                            )}
                                        </React.Fragment>) : null}
                                </React.Fragment>
                            ))) : ''}

                        </ul>
                    </div>

                    <div className="accordion" id="accordionExample">
                        {this.state.allowFilters.map(mainFilter => (
                            <React.Fragment>
                                {mainFilter.price === true ? (
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
                                                    Price
 </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="collapseOne"
                                            className="collapse show"
                                            aria-labelledby="headingOne"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body">
                                                {this.state.paymentPrice == 'p' ? (<React.Fragment>
                                                    <div className="filter-two-col price-main clearfix">
                                                        <div className="filters-inner-col">
                                                            <label>Min</label>
                                                            <input type="text" className="form-control" id="fromRange" name="fromRange" onChange={this.handleOnChange} value={this.state.fromRange} />
                                                        </div>
                                                        <div className="filters-inner-col">
                                                            <label>Max</label>
                                                            <input type="text" className="form-control" id="toRange" name="toRange" onChange={this.handleOnChange} value={this.state.toRange} />
                                                        </div>
                                                    </div>
                                                </React.Fragment>) : (<React.Fragment>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12 pl-0">
                                                                <div className="MonthlyPay-Form">
                                                                    <label>From</label>
                                                                    <select id="start_pay" name="start_pay" onChange={this.handleOnChange} value={this.state.start_pay}>
                                                                        <option></option>
                                                                        <option value={5000}>$5,000</option>
                                                                        <option value={6000}>$6,000</option>
                                                                        <option value={7000}>$7,000</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12 pr-0">
                                                                <div className="MonthlyPay-Form">
                                                                    <label>To</label>
                                                                    <select id="end_pay" name="end_pay" onChange={this.handleOnChange} value={this.state.end_pay}>
                                                                        <option></option>
                                                                        <option value={50000}>$50,000+</option>
                                                                        <option value={60000}> $60,000+</option>
                                                                        <option value={70000}>$70,000+</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>)}

                                            </div>
                                        </div>
                                    </div>

                                ) : null}
                                <div className="card">
                                    <div className="card-header" id="headingTwo">
                                        <h2 className="mb-0">
                                            <button
                                                className="btn btn-link btn-block text-left collapsed"
                                                type="button"
                                                data-toggle="collapse"
                                                data-target="#collapseTwo"
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                            >
                                                Type of vehicles
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
                                            {(this.state.type_of_vehicle || []).length === 0 ? (<div className="filters-preloader">
                                                <div className="spinner"></div>
                                            </div>) : null}
                                            <div className={(this.state.type_of_vehicle || []).length === 0 ? "filter-two-col filters-vehicle-type clearfix" : "filter-two-col filters-vehicle-type clearfix show"}>
                                                {(this.state.type_of_vehicle || []).map((item, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <div className="filters-inner-col">
                                                                <div title={this.camelize(item.name)} className={item.id === this.state.typeOfVehicle ? 'vehicle-type-box active' : 'vehicle-type-box'} onClick={(() => this.handleOnClick('typeOfVehicle', item.id))}>
                                                                    <div className="vehicle-type-image">
                                                                        {item.name == 'Automotive' ? <img
                                                                            src="/assets/image/filters-autos-icon.svg"
                                                                            alt={item.name}
                                                                        /> : item.name == 'Autos' ? <img
                                                                            src="/assets/image/automotive.svg"
                                                                            alt={item.name}
                                                                        /> : item.name == "Motorcycle" ? <img
                                                                            src="/assets/image/filters-motorcycle-icon.svg"
                                                                            alt={item.name}
                                                                        /> : item.name == "ATV/UTV" ? <img
                                                                            src="/assets/image/ATVUTV.svg"
                                                                            alt={item.name}
                                                                        /> : item.name == "Snowmobiles" ? <img
                                                                            src="/assets/image/snowmobile.svg"
                                                                            alt={item.name}
                                                                        /> : item.name == "RV" ? <img
                                                                            src="/assets/image/filters-rv-icon.svg"
                                                                            alt={item.name}
                                                                        /> : item.name == "Watercrafts" ? <img
                                                                            src="/assets/image/Watercraft.svg"
                                                                            alt={item.name}
                                                                        /> : item.name == "Boat" ? <img
                                                                            src="/assets/image/filters-boats-icon.svg"
                                                                            alt={item.name}
                                                                        /> : item.name == "Powersport" ? <img
                                                                            src="/assets/image/filters-powersports-icon.svg"
                                                                            alt={item.name}
                                                                        /> : item.name == "Trailer" ? <img
                                                                            src="/assets/image/filters-trailers-icon.svg"
                                                                            alt={item.name}
                                                                        /> : item.name == "Small Equipment" ? <img
                                                                            src="/assets/image/filters-small-equipment-icon.svg"
                                                                            alt={item.name}
                                                                        /> :
                                                                            <img
                                                                                src={item.image_path !== null ? item.image_path : "/assets/image/crossovers.svg"}
                                                                                alt={item.name}
                                                                            />}
                                                                        {/* <img
            src={item.image_path !== null ? item.image_path : "/assets/image/crossovers.svg"}
            alt={item.name}
                /> */}
                                                                    </div>
                                                                    <div className='vehicle-type-description'>
                                                                        <strong>{this.camelize(item.name)} <span>({item.vt_count !== undefined && item.vt_count !== null && Number(item.vt_count) !== 0 ? item.vt_count : ''})</span></strong>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    )
                                                })}

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {mainFilter.make === true ? ((this.state.vehicle_make || []).length > 0 ? (
                                    <div className="card">
                                        <div className="card-header" id="headingThree">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target={(this.state.vehicle_make || []).length > 0 ? "#collapseThree" : ""}
                                                    aria-expanded="true"
                                                    aria-controls="collapseThree"
                                                >
                                                    Make
    </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="collapseThree"
                                            className="collapse"
                                            aria-labelledby="headingThree"
                                            data-parent="#accordionExample"
                                            disabled
                                        >
                                            <div className="card-body">
                                                {(this.state.vehicle_make || []).length === 0 ? (<div className="filters-preloader">
                                                    <div className="spinner"></div>
                                                </div>) : null}
                                                <div className="collapse show" id="collapseMenu">
                                                    <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="MakeMenu-List filters-list">
                                                        {/* <h1>POPULAR MAKES</h1> */}
                                                        <ul>
                                                            {(this.state.vehicle_make || []).map((item, index) => {
                                                                return (
                                                                    <li key={index} onClick={(() => this.handleOnClick('vehicleMake', item.id))} className={item.id === this.state.vehicleMake ? 'active' : ''}>
                                                                        <a >
                                                                            <span className="bullet"></span>
                                                                            {this.camelize(item.make_name)} {item.mk_count !== undefined && item.mk_count !== null && Number(item.mk_count) !== 0 ? <span>({item.mk_count})</span> : <span></span>}
                                                                        </a>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </Scrollbars>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null) : null}

                                {mainFilter.model === true ? ((this.state.vehicle_model || []).length > 0 ? (
                                    <div className="card">
                                        <div className="card-header" id="headingFour">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target={(this.state.vehicle_model || []).length > 0 ? "#collapseFour" : ""}
                                                    aria-expanded="true"
                                                    aria-controls="collapseFour"
                                                >
                                                    Model
     </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="collapseFour"
                                            className="collapse"
                                            aria-labelledby="headingFour"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body">
                                                {(this.state.vehicle_model || []).length === 0 ? (<div className="filters-preloader">
                                                    <div className="spinner"></div>
                                                </div>) : null}
                                                <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                                                    <ul>
                                                        {(this.state.vehicle_model || []).map((item, index) => {
                                                            return (
                                                                <li key={index} onClick={() => this.handleOnClick("vehicleModel", item.id)} className={this.state.vehicleModel == item.id ? 'active' : ''}>
                                                                    <a >
                                                                        <span className="bullet"></span>
                                                                        {this.camelize(item.model_make)}
                                                                    </a>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </Scrollbars>
                                            </div>
                                        </div>
                                    </div>
                                ) : null) : null}

                                {mainFilter.trim === true ? ((this.props.vehicle_trims || []).length > 0 ? (
                                    <div className="card ">
                                        <div className="card-header" id="headingFive">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target={(this.props.vehicle_trims || []).length > 0 ? "#collapseFive" : ""}
                                                    aria-expanded="true"
                                                    aria-controls="collapseFive"
                                                >
                                                    Trim
    </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="collapseFive"
                                            className="collapse"
                                            aria-labelledby="headingFive"
                                            data-parent="#accordionExample"
                                        >

                                            {this.props.removeLoaderTrims === false ? (<div className="filters-preloader">
                                                <div className="spinner"></div>
                                            </div>) : (<div className="card-body item m-0">
                                                <div className="">

                                                    <div className="trim-List filters-list">

                                                        <ul>
                                                            {(this.props.vehicle_trims || []).map((item, index) => {
                                                                return (
                                                                    <li key={index} onClick={() => this.handleOnClick("selectTrim", item.v_trim)} className={this.state.selectTrim === item.v_trim ? "active" : ""}>
                                                                        <a >
                                                                            <span className="bullet"></span>
                                                                            {this.camelize(item.v_trim !== undefined && item.v_trim !== null ? item.v_trim : '')}
                                                                        </a>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>)}

                                        </div>
                                    </div>
                                ) : null) : null}

                                {mainFilter.year === true ? (
                                    <div className="card">
                                        <div className="card-header" id="headingSix">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#collapseSix"
                                                    aria-expanded="true"
                                                    aria-controls="collapseSix"
                                                >
                                                    Year
     </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="collapseSix"
                                            className="collapse"
                                            aria-labelledby="headingSix"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body">
                                                <div className="filter-two-col filters-year-main clearfix">
                                                    <div className="filters-inner-col">
                                                        <label>From</label>
                                                        <input type="text" className="form-control" id="fromYear" name="fromYear" value={this.state.fromYear} onChange={this.handleOnChange} />
                                                    </div>
                                                    <div className="filters-inner-col">
                                                        <label>To</label>
                                                        <input type="text" className="form-control" id="toYear" name="toYear" value={this.state.toYear} onChange={this.handleOnChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                {mainFilter.body_type === true ? (this.props.vehicle_body !== undefined && this.props.vehicle_body !== null && this.props.vehicle_body.length > 0 ? (
                                    <div className="card">
                                        <div className="card-header" id="headingSix">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#body-style"
                                                    aria-expanded="true"
                                                    aria-controls="body-style"
                                                >
                                                    Body Type
   </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="body-style"
                                            className="collapse"
                                            aria-labelledby="body-style"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body">
                                                {this.props.loaderBodyType !== undefined && this.props.loaderBodyType !== null && this.props.loaderBodyType === true ? (<div className="filters-preloader">
                                                    <div className="spinner"></div>
                                                </div>) : null}
                                                <div className="filter-two-col filters-vehicle-type vehicle-body-style clearfix show">
                                                    {(this.props.vehicle_body || []).map((item, index) => (
                                                        <div onClick={() => this.handleOnClick("vehicleBody", item.id)} className={this.state.vehicleBody === item.id ? "filters-inner-col active" : "filters-inner-col"} >
                                                            <div title="" className="vehicle-type-box">
                                                                <div className="vehicle-type-image">
                                                                    <img src={item.image_path} alt="" />
                                                                </div>
                                                                <div className="vehicle-type-description">
                                                                    <strong>{item.body_type}
                                                                        {/* <span>(4)</span> */}
                                                                    </strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {/** Down */}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ) : null) : null}

                                {mainFilter.kilometer === true ? (
                                    <div className="card">
                                        <div className="card-header" id="headingNine">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#collapseNine"
                                                    aria-expanded="true"
                                                    aria-controls="collapseNine"
                                                >
                                                    Kilometers
    </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="collapseNine"
                                            className="collapse"
                                            aria-labelledby="headingNine"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body">
                                                <div className="filter-two-col filters-kilometers-main clearfix">
                                                    <div className="filters-inner-col">
                                                        <label>From</label>
                                                        <input type="text" className="form-control" id="fromKilometer" name="fromKilometer" value={this.state.fromYear} onChange={this.handleOnChange} />
                                                    </div>
                                                    <div className="filters-inner-col">
                                                        <label>To</label>
                                                        <input type="text" className="form-control" id="toKilometer" name="toKilometer" min="0" onBlur={this.blurOnKilometer} value={this.state.toKilometer} onChange={this.handleOnChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                {mainFilter.condition === true ? (
                                    <div className="card">
                                        <div className="card-header" id="headingTen">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#collapseTen"
                                                    aria-expanded="true"
                                                    aria-controls="collapseTen"
                                                >
                                                    Condition
        </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="collapseTen"
                                            className="collapse"
                                            aria-labelledby="headingTen"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body min-height-auto">
                                                <div className="filter-two-col condition-main clearfix">
                                                    <div className="filters-inner-col">
                                                        <label className="checkMarkContainer">
                                                            New
        <input type="checkbox" checked={this.state.selectCondition === 'New'} name='selectCondition' value={'New'} onChange={this.handleOnChange} />
                                                            <span className="filtersCheckmark"></span>
                                                        </label>
                                                    </div>
                                                    <div className="filters-inner-col">
                                                        <label className="checkMarkContainer">
                                                            Used
        <input type="checkbox" checked={this.state.selectCondition === 'Used'} name='selectCondition' value={'Used'} onChange={this.handleOnChange} />
                                                            <span className="filtersCheckmark"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                {mainFilter.transmission === true ? (
                                    <div className="card">
                                        <div className="card-header" id="headingSeven">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#collapseSeven"
                                                    aria-expanded="true"
                                                    aria-controls="collapseSeven"
                                                >
                                                    Transmission
    </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="collapseSeven"
                                            className="collapse"
                                            aria-labelledby="headingSeven"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body min-height-auto">
                                                <div className="filter-two-col transmission-main clearfix">
                                                    <div className="filters-inner-col">
                                                        <label className="checkMarkContainer">
                                                            Automatic
    <input type="checkbox" checked={this.state.transmission === 'Automatic'} name='transmission' value={'Automatic'} onChange={this.handleOnChange} />
                                                            <span className="filtersCheckmark"></span>
                                                        </label>
                                                    </div>
                                                    <div className="filters-inner-col">
                                                        <label className="checkMarkContainer">
                                                            Manual
    <input type="checkbox" checked={this.state.transmission === 'Manual'} name='transmission' value={'Manual'} onChange={this.handleOnChange} />
                                                            <span className="filtersCheckmark"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                {mainFilter.fuel_type === true ? (this.props.vehicle_fuel_type !== undefined && this.props.vehicle_fuel_type !== null && this.props.vehicle_fuel_type.length > 0 ? (
                                    <div className="card">
                                        <div className="card-header" id="headingFuelType">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#fuelType"
                                                    aria-expanded="true"
                                                    aria-controls="fuelType"
                                                >
                                                    Fuel Type
 </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="fuelType"
                                            className="collapse"
                                            aria-labelledby="headingFuelType"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body">
                                                {(this.props.vehicle_fuel_type || []).length === 0 ? (<div className="filters-preloader">
                                                    <div className="spinner"></div>
                                                </div>) : null}
                                                <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                                                    <ul>
                                                        {(this.state.vehicle_model || []).map((item, index) => {
                                                            return (
                                                                <li key={index} onClick={() => this.handleOnClick("vehicleModel", item.id)} className={this.state.vehicleModel == item.id ? 'active' : ''}>
                                                                    <a >
                                                                        <span className="bullet"></span>
                                                                        {this.camelize(item.model_make)}
                                                                    </a>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </Scrollbars>
                                            </div>
                                        </div>
                                    </div>
                                ) : null) : null}

                                {mainFilter.drive_train === true ? (this.props.vehicle_drive_train !== undefined && this.props.vehicle_drive_train !== null && this.props.vehicle_drive_train.length > 0 ? (
                                    <div className="card">
                                        <div className="card-header" id="headingDriveTrain">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target={(this.props.vehicle_drive_train || []).length > 0 ? "#driveTrain" : ""}
                                                    aria-expanded="true"
                                                    aria-controls="driveTrain"
                                                >
                                                    Drive Train
      </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="driveTrain"
                                            className="collapse"
                                            aria-labelledby="headingDriveTrain"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body">
                                                {this.props.loaderDriveTrain !== undefined && this.props.loaderDriveTrain !== null && this.props.loaderDriveTrain === true ? (<div className="filters-preloader">
                                                    <div className="spinner"></div>
                                                </div>) : null}
                                                <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                                                    <ul>
                                                        {(this.props.vehicle_drive_train || []).map((item, index) => {
                                                            return (
                                                                <li key={index} onClick={() => this.handleOnClick("vehicleDriveTrain", item.id)} className={Number(this.state.vehicleDriveTrain) === Number(item.id) ? 'active' : ''}>
                                                                    <a >
                                                                        <span className="bullet"></span>
                                                                        {this.camelize(item.drive_train)}
                                                                    </a>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </Scrollbars>
                                            </div>
                                        </div>
                                    </div>
                                ) : null) : null}

                                {mainFilter.cylinder === true ? (
                                    <div className="card">
                                        <div className="card-header" id="headingCylinders">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#cylinders"
                                                    aria-expanded="true"
                                                    aria-controls="cylinders"
                                                >
                                                    Cylinders
    </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="cylinders"
                                            className="collapse"
                                            aria-labelledby="headingCylinders"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body">
                                                <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                                                    <ul>
                                                        {(cylinders || []).map((item, index) => {
                                                            return (
                                                                <li key={index} onClick={() => this.handleOnClick("vehicleCylinder", item.value)} className={Number(this.state.vehicleCylinder) === Number(item.value) ? 'active' : ''}>
                                                                    <a >
                                                                        <span className="bullet"></span>
                                                                        {(item.value)}
                                                                    </a>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </Scrollbars>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                {mainFilter.seating === true ? (
                                    <div className="card">
                                        <div className="card-header" id="headingSeating">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#seating"
                                                    aria-expanded="true"
                                                    aria-controls="seating"
                                                >
                                                    Seating
    </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="seating"
                                            className="collapse"
                                            aria-labelledby="headingSeating"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body">
                                                <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                                                    <ul>
                                                        {(seatings || []).map((item, index) => {
                                                            return (
                                                                <li key={index} onClick={() => this.handleOnClick("vehicleSeating", item.value)} className={Number(this.state.vehicleSeating) === Number(item.value) ? 'active' : ''}>
                                                                    <a >
                                                                        <span className="bullet"></span>
                                                                        {(item.label)}
                                                                    </a>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </Scrollbars>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                {mainFilter.color === true ? (
                                    <div className="card">
                                        <div className="card-header" id="heading12">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#collapse12"
                                                    aria-expanded="true"
                                                    aria-controls="collapse12"
                                                >
                                                    Exterior Color
    </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="collapse12"
                                            className="collapse"
                                            aria-labelledby="heading12"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body AdPost-SecThree item m-0">
                                                <div className="filters-color-main clearfix">
                                                    <div
                                                        className={
                                                            this.state.color === "Green"
                                                                ? "ColorPost-Container active"
                                                                : "ColorPost-Container"
                                                        }
                                                        onClick={() =>
                                                            this.handleOnClick("color", "Green")
                                                        }

                                                    >
                                                        <div className="color-box ColorGreen">
                                                            <h1>
                                                                <span>Green</span>
                                                            </h1>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={
                                                            this.state.color === "Yellow"
                                                                ? "ColorPost-Container active"
                                                                : "ColorPost-Container"
                                                        }
                                                        onClick={() =>
                                                            this.handleOnClick(
                                                                "color",
                                                                "Yellow"
                                                            )
                                                        }

                                                    >
                                                        <div className="color-box ColorYellow">
                                                            <h1>
                                                                <span>Yellow</span>
                                                            </h1>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={
                                                            this.state.color === "Orange"
                                                                ? "ColorPost-Container active"
                                                                : "ColorPost-Container"
                                                        }
                                                        onClick={() =>
                                                            this.handleOnClick(
                                                                "color",
                                                                "Orange"
                                                            )
                                                        }

                                                    >
                                                        <div className="color-box ColorOrange">
                                                            <h1>
                                                                <span>Orange</span>
                                                            </h1>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={
                                                            this.state.color === "Purple"
                                                                ? "ColorPost-Container active"
                                                                : "ColorPost-Container"
                                                        }
                                                        onClick={() =>
                                                            this.handleOnClick(
                                                                "color",
                                                                "Purple"
                                                            )
                                                        }

                                                    >
                                                        <div className="color-box ColorPurple">
                                                            <h1>
                                                                <span>Purple</span>
                                                            </h1>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={
                                                            this.state.color === "Blue"
                                                                ? "ColorPost-Container active"
                                                                : "ColorPost-Container"
                                                        }
                                                        onClick={() =>
                                                            this.handleOnClick("color", "Blue")
                                                        }

                                                    >
                                                        <div className="color-box ColorBlue">
                                                            <h1>
                                                                <span>Blue</span>
                                                            </h1>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={
                                                            this.state.color === "Silver"
                                                                ? "ColorPost-Container active"
                                                                : "ColorPost-Container"
                                                        }
                                                        onClick={() =>
                                                            this.handleOnClick(
                                                                "color",
                                                                "Silver"
                                                            )
                                                        }

                                                    >
                                                        <div className="color-box ColorSilver">
                                                            <h1>
                                                                <span>Silver</span>
                                                            </h1>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={
                                                            this.state.color === "Black"
                                                                ? "ColorPost-Container active"
                                                                : "ColorPost-Container"
                                                        }
                                                        onClick={() =>
                                                            this.handleOnClick("color", "Black")
                                                        }

                                                    >
                                                        <div className="color-box ColorBlack">
                                                            <h1>
                                                                <span>Black</span>
                                                            </h1>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={
                                                            this.state.color === "Red"
                                                                ? "ColorPost-Container active"
                                                                : "ColorPost-Container"
                                                        }
                                                        onClick={() =>
                                                            this.handleOnClick("color", "Red")
                                                        }

                                                    >
                                                        <div className="color-box ColorRed">
                                                            <h1>
                                                                <span>Red</span>
                                                            </h1>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={
                                                            this.state.color === "Gold"
                                                                ? "ColorPost-Container active"
                                                                : "ColorPost-Container"
                                                        }
                                                        onClick={() =>
                                                            this.handleOnClick("color", "Gold")
                                                        }

                                                    >
                                                        <div className="color-box ColorGold">
                                                            <h1>
                                                                <span>Gold</span>
                                                            </h1>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={
                                                            this.state.color === "Grey"
                                                                ? "ColorPost-Container active"
                                                                : "ColorPost-Container"
                                                        }
                                                        onClick={() =>
                                                            this.handleOnClick("color", "Grey")
                                                        }

                                                    >
                                                        <div className="color-box ColorGrey">
                                                            <h1>
                                                                <span>Grey</span>
                                                            </h1>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={
                                                            this.state.color === "Biege"
                                                                ? "ColorPost-Container active"
                                                                : "ColorPost-Container"
                                                        }
                                                        onClick={() =>
                                                            this.handleOnClick("color", "Biege")
                                                        }

                                                    >
                                                        <div className="color-box ColorBiege">
                                                            <h1>
                                                                <span>Biege</span>
                                                            </h1>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={
                                                            this.state.color === "Brown"
                                                                ? "ColorPost-Container active"
                                                                : "ColorPost-Container"
                                                        }
                                                        onClick={() =>
                                                            this.handleOnClick("color", "Brown")
                                                        }

                                                    >
                                                        <div className="color-box ColorBrown">
                                                            <h1>
                                                                <span>Brown</span>
                                                            </h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                {mainFilter.owner === true ? (
                                    <div className="card">
                                        <div className="card-header" id="headingOwners">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#collapseOwners"
                                                    aria-expanded="true"
                                                    aria-controls="collapseOwners"
                                                >
                                                    Owners
     </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="collapseOwners"
                                            className="collapse"
                                            aria-labelledby="headingOwners"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body min-height-auto">
                                                <div className="filter-two-col owners-main clearfix">
                                                    <div className="filters-inner-col">
                                                        <label className="checkMarkContainer">
                                                            One Owner
                                                     <input type="checkbox" checked={this.state.vehicleOwner === 'one_owner'} name='vehicleOwner' value="one_owner" onChange={this.handleOnChange} />
                                                            <span className="filtersCheckmark"></span>
                                                        </label>
                                                    </div>
                                                    <div className="filters-inner-col">
                                                        <label className="checkMarkContainer">
                                                            Multiple Owner
                                                     <input type="checkbox" checked={this.state.vehicleOwner === 'multiple_owner'} name='vehicleOwner' value="multiple_owner" onChange={this.handleOnChange} />
                                                            <span className="filtersCheckmark"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                {mainFilter.seller_type === true ? (
                                    <div className="card">
                                        <div className="card-header" id="headingEleven">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#collapseEleven"
                                                    aria-expanded="true"
                                                    aria-controls="collapseEleven"
                                                >
                                                    Seller Type
</button>
                                            </h2>
                                        </div>

                                        <div
                                            id="collapseEleven"
                                            className="collapse"
                                            aria-labelledby="headingEleven"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body">
                                                <div className="seller-type-List filters-list">
                                                    <ul>
                                                        <li className={this.state.seller_type === 2 ? "active" : ""} onClick={() => this.handleOnClick("seller_type", 2)}>
                                                            <a >
                                                                <span className="bullet"></span>
Private Seller
</a>
                                                        </li>
                                                        <li className={this.state.seller_type === 1 ? "active" : ""} onClick={() => this.handleOnClick("seller_type", 1)}>
                                                            <a >
                                                                <span className="bullet"></span>
Dealer
</a>
                                                        </li>
                                                    </ul>
                                                </div>



                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                {mainFilter.accident === true ? (
                                    <div className="card">
                                        <div className="card-header" id="headingOwnersAccidents">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#collapseAccidents"
                                                    aria-expanded="true"
                                                    aria-controls="collapseAccidents"
                                                >
                                                    Accidents
      </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="collapseAccidents"
                                            className="collapse"
                                            aria-labelledby="headingOwnersAccidents"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body min-height-auto">
                                                <div className="filters-list accident-main">
                                                    <ul>
                                                        <li>
                                                            <label className="checkMarkContainer">
                                                                Previously Accidented
                                                          <input type="checkbox" checked={this.state.vehicleAccident === 'previously_accidented'} name='vehicleAccident' value="previously_accidented" onChange={this.handleOnChange} />
                                                                <span className="filtersCheckmark"></span>
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <label className="checkMarkContainer">
                                                                No Accidented
                                                          <input type="checkbox" checked={this.state.vehicleAccident === 'no_accidented'} name='vehicleAccident' value="no_accidented" onChange={this.handleOnChange} />
                                                                <span className="filtersCheckmark"></span>
                                                            </label>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                {mainFilter.features === true ? (this.props.vehicle_features !== undefined && this.props.vehicle_features !== null && this.props.vehicle_features.length > 0 ? (
                                    <div className="card">
                                        <div className="card-header" id="heading13">
                                            <h2 className="mb-0">
                                                <button
                                                    className="btn btn-link btn-block text-left collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#collapse13"
                                                    aria-expanded="true"
                                                    aria-controls="collapse13"
                                                >
                                                    Features
     </button>
                                            </h2>
                                        </div>

                                        <div
                                            id="collapse13"
                                            className="collapse"
                                            aria-labelledby="heading13"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body">
                                                {this.props.loaderFeatures !== undefined && this.props.loaderFeatures !== null && this.props.loaderFeatures === true ? (<div className="filters-preloader">
                                                    <div className="spinner"></div>
                                                </div>) : null}
                                                <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="260px" className="filters-list features-list">
                                                    {(this.props.vehicle_features || []).map((item, index) => (
                                                        <React.Fragment key={index}>
                                                            <div className="features-row clearfix" key={index}>
                                                                <label className="checkMarkContainer">
                                                                    {item.v_features}
                                                                    <input
                                                                        type="checkbox"
                                                                        name="featureName"
                                                                        id="featureRadio"
                                                                        value={item.id}
                                                                        checked={item.checked}
                                                                        onChange={() => this.handleOnChangeFeatures(item.id)}
                                                                    />
                                                                    <span className="filtersCheckmark"></span>
                                                                </label>
                                                            </div>
                                                        </React.Fragment>
                                                    ))}
                                                </Scrollbars>
                                            </div>
                                        </div>
                                    </div>
                                ) : null) : null}
                            </React.Fragment>
                        ))}
                    </div>
                </div>



            </div>

        </React.Fragment >)
    }
}
const mapStateToProps = (state) => {
    return {
        add_post_list: state.adPostReducers.listPostReducer.add_post_list,
        post_list_filters: state.adPostReducers.listPostReducer.post_list_filters,
        // type_of_vehicles: state.addPostReducer.type_of_vehicle,
        vehicle_features: state.adPostReducers.addPostReducer.vehicle_features,
        selected_filter_list: state.adPostReducers.listPostReducer.selected_filter_list,
        list_type_of_vehicle: state.adPostReducers.listPostReducer.list_type_of_vehicle,
        list_vehicle_make: state.adPostReducers.listPostReducer.list_vehicle_make,
        list_vehicle_model: state.adPostReducers.listPostReducer.list_vehicle_model,
        removeLoaderTrims: state.adPostReducers.addPostReducer.removeLoaderTrims,
        vehicle_trims: state.adPostReducers.addPostReducer.vehicle_trims,
        showListSearchLoader: state.adPostReducers.listPostReducer.showListSearchLoader,
        vehicle_body: state.adPostReducers.addPostReducer.vehicle_body,
        vehicle_drive_train: state.adPostReducers.addPostReducer.vehicle_drive_train,
        vehicle_fuel_type: state.adPostReducers.addPostReducer.vehicle_fuel_type,
        loaderBodyType: state.adPostReducers.addPostReducer.loaderBodyType,
        loaderFuelType: state.adPostReducers.addPostReducer.loaderFuelType,
        loaderDriveTrain: state.adPostReducers.addPostReducer.loaderDriveTrain,
        loaderFeatures: state.adPostReducers.addPostReducer.loaderFeatures,
    }
}
export default connect(mapStateToProps, {
    get_post_list, get_vehicle_type,
    get_vehicle_feature,
    filter_on_price_range,
    filter_on_trim,
    filter_on_year_range,
    filter_on_transmission,
    filter_on_kilometer_range,
    filter_on_condition,
    filter_on_seller_type,
    filter_on_color,
    filter_on_features,
    get_list_filters,
    filter_on_make,
    filter_on_model,
    change_type_of_vehicle,
    toggle_vehicle_features,
    saved_ad_post,
    add_filters,
    remove_filter,
    remove_all_filter,
    remove_filter_feature,
    remove_all_features,
    get_filter_record,
    remove_all_posts,
    get_vehicle_trims,
    remove_all,
    get_vehicle_fuel_type,
    get_vehicle_drive_train,
    get_vehicle_body_type
})(AdPostSearchMobileView);
// export default AdPostSearchMobileView