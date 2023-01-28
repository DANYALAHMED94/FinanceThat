import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PendingListingReviewUserDetail from './PendingListingReviewUserDetail'
import PendingListingReviewVehicleOverview from './PendingListingReviewVehicleOverview'
import PendingListingReviewLocation from './PendingListingReviewLocation'
import PendingListingReviewGallery from './PendingListingReviewGallery';
import PendingListingReviewVehicleDetail from './PendingListingReviewVehicleDetail';
import Geocode from "react-geocode";
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import CKEditor from 'ckeditor4-react';

const PendingListingReviews = (props) => {
    const [state, setState] = useState({
        /** Listing  */
        listingId: '',
        listingDate: '',
        listingBy: "",
        listingGallery: [],
        listingDesc: '',
        listingReasonDecline: '',

        /** User Listing Detail */
        userId: '',
        userCity: '',
        userStreetAddress: '',
        userCity: '',
        userPostalCode: '',
        userFax: '',
        userEmail: '',
        userName: '',
        userFirstName: "",
        userLastName: "",
        /**Vehicle Detail State */
        vehicleCategory: '',
        vehicleCondition: '',
        vehicleYear: new Date().getFullYear(),
        vehicleMake: '',
        vehicleOtherMake: '',
        vehicleOrgOtherMake: '',
        vehicleModel: '',
        vehicleTrim: '',
        vehicleOtherModel: '',
        vehicleOrgOtherModel: '',
        vehicleKilometer: '',
        vehicleVin: '',
        vehiclePrice: '',
        vehicleBodyType: '',
        vehicleSeating: '',
        vehicleTransmission: '',
        vehicleColor: '',
        vehicleFuelType: '',
        vehicleDriveTrain: '',
        vehicleCylinder: '',
        vehiclePreviousOwners: 1,
        vehiclePreviousAccidents: 0,
        vehicleFeature: [],
        vehicleListingType: '',
        vehicleListingPrice: '',
        vehicleImages: [{ id: 1, preViewFiles: null, path: null, ad_id: '' }, { id: 2, preViewFiles: null, path: null, ad_id: '' }, { id: 3, preViewFiles: null, path: null, ad_id: '' }, { id: 4, preViewFiles: null, path: null, ad_id: '' }, { id: 5, preViewFiles: null, path: null, ad_id: '' }, { id: 6, preViewFiles: null, path: null, ad_id: '' }, { id: 7, preViewFiles: null, path: null, ad_id: '' }, { id: 8, preViewFiles: null, path: null, ad_id: '' }, { id: 9, preViewFiles: null, path: null, ad_id: '' }, { id: 10, preViewFiles: null, path: null, ad_id: '' }],
        vehicleUploadImages: [],
        imageErrors: [],
        /**Api Arrays */
        typeOfVehicles: [],
        vehicleModels: [],
        vehicleMakes: [],
        vehicleTrims: [],
        vehicleBodys: [],
        vehicleFuels: [],
        vehicleDriveTrains: [],
        vehiclesFeatures: [],
        showVehicleFuels: false,
        showVehicleDriveTrains: false,
        showVehicleModels: false,
        showVehicleMakes: false,
        showVehiclesFeatures: false,
        showVehicleBodys: false,
        showVehicleTrims: false

    })
    const [listLocation, setLocation] = useState({
        listingLongitude: '',
        listingLatitude: '',
        locationName: '',
        location: '',
        locationCity: '',
        locationProvince: ''
    })
    const [editUser, setEditUser] = useState(false)
    const [editVehicle, setEditVehicle] = useState(false)
    const [editVehicleOverivew, setEditVehicleOverivew] = useState(false)
    const [editVehicleLocation, setVehicleLocation] = useState(false)
    const [editDesc, setEditDesc] = useState(false)
    const [editListingOption, setEditListingOption] = useState(false)
    const [editListingImages, setEditListingImages] = useState(false)
    const [editListingFeature, setEditListingFeature] = useState(false)
    const [editMakeModel, setEditMakeModel] = useState(false)
    useEffect(() => {
        // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
        Geocode.setApiKey("AIzaSyBDXs8HHpZSRxd1vJapwzON64a_vmjpn_4");
        // set response language. Defaults to english.
        Geocode.setLanguage("en");
        // set response region. Its optional.
        // A Geocoding request with region=es (Spain) will return the Spanish city.
        // Geocode.setRegion("es");

        // Enable or disable logs. Its optional.
        Geocode.enableDebug();
    }, [])

    useEffect(() => {
        if ((props.type_of_vehicles !== undefined && props.type_of_vehicles !== null && props.type_of_vehicles.length > 0) && (props.vehicle_fuel_type !== undefined && props.vehicle_fuel_type !== null && props.vehicle_fuel_type.length > 0) && (props.vehicle_fuel_type !== undefined && props.vehicle_fuel_type !== null && props.vehicle_fuel_type.length > 0)) {
            let typeOfVehicles = [];
            let vehicleDriveTrains = [];
            let vehicleFuels = [];
            (props.type_of_vehicles || []).map((item, index) => {
                if (item.name.toUpperCase() === ('powersport').toUpperCase() || item.name.toUpperCase() === ('powersports').toUpperCase()) {
                    (item.typeofvehicle_id || []).map((subItem, subIndex) => {
                        return typeOfVehicles = [...typeOfVehicles, {
                            value: item.id + '-' + subItem.id,
                            label: subItem.name,
                            subTypeId: subItem.id

                        }]
                    })

                }

                return typeOfVehicles = [...typeOfVehicles, {
                    value: item.id,
                    label: item.name,
                    subTypeId: ''
                }]

            })
            if (props.vehicle_fuel_type !== undefined && props.vehicle_fuel_type !== null && props.vehicle_fuel_type.length > 0) {
                (props.vehicle_fuel_type || []).map(item => {
                    return vehicleFuels.push({
                        value: item.id,
                        label: item.fuel_type
                    })
                })
            } else {
                vehicleFuels = []
            }
            if (props.vehicle_drive_train !== undefined && props.vehicle_drive_train !== null && props.vehicle_drive_train.length > 0) {
                (props.vehicle_drive_train || []).map(item => {
                    return vehicleDriveTrains.push({
                        value: item.id,
                        label: item.drive_train
                    })
                })
            } else {
                vehicleDriveTrains = []
            }
            setState({
                ...state,
                typeOfVehicles: typeOfVehicles,
                vehicleFuels: vehicleFuels,
                vehicleDriveTrains: vehicleDriveTrains,
                showVehicleFuels: vehicleFuels.length > 0 ? true : false,
                showVehicleDriveTrains: vehicleDriveTrains.length > 0 ? true : false
            })
        } else {
            setState({
                ...state,
                typeOfVehicles: [],
                vehicleFuels: [],
                vehicleDriveTrains: [],
                showVehicleFuels: false,
                showVehicleDriveTrains: false
            })
        }


    }, [props.type_of_vehicles, props.vehicle_drive_train, props.vehicle_fuel_type])

    useEffect(() => {
        if (state.vehicleCategory !== undefined && state.vehicleCategory !== null && state.vehicleCategory !== '') {
            const checkId = (state.vehicleCategory).toString().split('-')[1]
            let typeOfVehicle = [];
            if (checkId !== undefined && checkId !== null && checkId !== '') {
                typeOfVehicle = state.typeOfVehicles.filter(item => Number(item.subTypeId) === Number(checkId))
            } else {
                typeOfVehicle = state.typeOfVehicles.filter(item => Number(item.value) === Number(state.vehicleCategory))
            }
            let vehicleId = ''
            if (typeOfVehicle !== undefined && typeOfVehicle !== null && typeOfVehicle.length > 0) {
                if (typeOfVehicle[0].subTypeId === '') {
                    const id = typeOfVehicle[0].value || ''
                    vehicleId = id
                    props.get_vehicle_make(id)

                } else {
                    const id = typeOfVehicle[0].subTypeId || ''
                    vehicleId = id
                    props.get_sub_type_vehicle_make(id)
                }
                if (vehicleId !== undefined && vehicleId !== null && vehicleId !== '') {
                    props.get_vehicle_body_type(vehicleId)
                    props.get_vehicle_feature(vehicleId)
                }

                setState({
                    ...state,
                    vehicleModels: [],
                    vehicleMakes: [],
                    vehicleTrims: [],
                    vehicleBodys: [],
                    vehicleFuels: [],
                    vehicleDriveTrains: [],
                    vehiclesFeatures: [],
                    vehicleCondition: '',
                    vehicleYear: new Date().getFullYear(),
                    vehicleMake: '',
                    vehicleModel: '',
                    vehicleTrim: '',
                    vehicleKilometer: '',
                    vehicleVin: '',
                    vehiclePrice: '',
                    vehicleBodyType: '',
                    vehicleSeating: '',
                    vehicleTransmission: '',
                    vehicleColor: '',
                    vehicleFuelType: '',
                    vehicleDriveTrain: '',
                    vehicleCylinder: '',
                    vehiclePreviousOwners: 1,
                    vehiclePreviousAccidents: 0,
                    vehicleOtherMake: '',
                    vehicleOtherModel: '',
                    vehicleOrgOtherMake: '',
                    vehicleOrgOtherModel: '',
                    vehicleFeature: [],
                    showVehicleFuels: false,
                    showVehicleModels: false,
                    showVehiclesFeatures: false,
                    showVehicleBodys: false,
                    showVehicleTrims: false

                })
            }

        }
    }, [state.vehicleCategory])


    useEffect(() => {
        if (state.vehicleMake !== undefined && state.vehicleMake !== null && state.vehicleMake !== '') {
            let vehicleMakes = state.vehicleMakes.filter(item => Number(item.value) === Number(state.vehicleMake))
            if (vehicleMakes !== undefined && vehicleMakes !== null && vehicleMakes.length > 0) {
                const id = vehicleMakes[0].value || ''
                props.get_vehicle_model(id)
                setState({
                    ...state,
                    vehicleModel: '',
                })
            }

        }
    }, [state.vehicleMake])

    useEffect(() => {
        if (state.vehicleModel !== undefined && state.vehicleModel !== null && state.vehicleModel !== '') {
            let vehicleModels = state.vehicleModels.filter(item => Number(item.value) === Number(state.vehicleModel))
            if (vehicleModels !== undefined && vehicleModels !== null && vehicleModels.length > 0) {
                const id = vehicleModels[0].value || ''
                props.get_vehicle_trims(id)
                setState({
                    ...state,
                    vehicleTrim: '',
                })
            }

        }
    }, [state.vehicleModel])

    useEffect(() => {
        if (props.vehicle_makes !== undefined && props.vehicle_makes !== null && props.vehicle_makes.length > 0) {
            let vehiclesMakes = [];
            (props.vehicle_makes || []).map(item => {
                return vehiclesMakes.push({
                    value: item.id,
                    label: item.make_name
                })
            })
            setState({
                ...state,
                vehicleMakes: vehiclesMakes,
                showVehicleMakes: vehiclesMakes.length > 0 ? true : false

            })
        } else {
            setState({
                ...state,
                vehicleMakes: [],
                showVehicleMakes: false

            })
        }
    }, [props.vehicle_makes])

    useEffect(() => {
        if (props.vehicle_models !== undefined && props.vehicle_models !== null && props.vehicle_models.length > 0) {
            let vehicleModels = [];
            (props.vehicle_models || []).map(item => {
                return vehicleModels.push({
                    value: item.id,
                    label: item.model_make
                })
            })
            setState({
                ...state,
                vehicleModels: vehicleModels,
                showVehicleModels: vehicleModels.length > 0 ? true : false
            })
        } else {
            setState({
                ...state,
                vehicleModels: [],
                showVehicleModels: false

            })
        }
    }, [props.vehicle_models])

    useEffect(() => {
        if (props.vehicle_trims !== undefined && props.vehicle_trims !== null && props.vehicle_trims.length > 0) {
            let vehicleTrims = [];
            (props.vehicle_trims || []).map(item => {
                return vehicleTrims.push({
                    value: item.id,
                    label: item.v_trim
                })
            })
            setState({
                ...state,
                vehicleTrims: vehicleTrims,
                showVehicleTrims: vehicleTrims.length > 0 ? true : false
            })
        } else {
            setState({
                ...state,
                vehicleTrims: [],
                showVehicleTrims: false

            })
        }
    }, [props.vehicle_trims])

    useEffect(() => {
        if ((props.vehicle_features !== undefined && props.vehicle_features !== null && props.vehicle_features.length > 0) && (props.vehicle_body !== undefined && props.vehicle_body !== null && props.vehicle_body.length > 0)) {
            let vehiclesFeatures = [];
            let vehicleBodys = [];
            if (state.vehicleFeature !== undefined && state.vehicleFeature !== null && state.vehicleFeature.length > 0) {
                (props.vehicle_features || []).map(item => {
                    return vehiclesFeatures.push({
                        id: item.id,
                        v_features: item.v_features,
                        isChecked: state.vehicleFeature.filter((feat, featIndex) => Number(feat.id) === Number(item.id)) !== undefined && state.vehicleFeature.filter((feat, featIndex) => Number(feat.id) === Number(item.id)) !== null && state.vehicleFeature.filter((feat, featIndex) => Number(feat.id) === Number(item.id)).length > 0 ? true : false
                    })
                })
            } else {
                (props.vehicle_features || []).map(item => {
                    return vehiclesFeatures.push({
                        id: item.id,
                        v_features: item.v_features,
                        isChecked: false
                    })
                })
            }
            if (props.vehicle_body !== undefined && props.vehicle_body !== null && props.vehicle_body.length > 0) {
                (props.vehicle_body || []).map(item => {
                    return vehicleBodys.push({
                        value: item.id,
                        label: item.body_type
                    })
                })
            } else {
                vehicleBodys = []
            }
            setState({
                ...state,
                vehiclesFeatures: vehiclesFeatures,
                vehicleBodys: vehicleBodys,
                showVehicleBodys: vehicleBodys.length > 0 ? true : false,
                showVehiclesFeatures: vehiclesFeatures.length > 0 ? true : false
            })
        } else {
            setState({
                ...state,
                vehiclesFeatures: [],
                vehicleBodys: [],
                showVehicleBodys: false,
                showVehiclesFeatures: false
            })
        }
    }, [props.vehicle_features, props.vehicle_body])

    useEffect(() => {
        if (props.single_listing_detail !== undefined && props.single_listing_detail !== null) {
            let categoryId = '';
            let makeId = '';
            let modelId = '';
            (props.single_listing_detail || []).map(item => {
                let images = item.images != undefined && item.images != null && item.images.length > 0 ? item.images || [] : []
                const imagesFiles = [];
                const orignalImage = []
                let ad_id = ''
                for (var i = 0; i < 10; i++) {
                    if (images[i] !== undefined && images[i] !== null) {
                        ad_id = images[i].ad_id
                        imagesFiles.push({
                            id: i,
                            preViewFiles: null,
                            ad_id: images[i].ad_id,
                            // path: images[i].image_path
                            path: images[i].photo
                        })
                        orignalImage.push({
                            id: i,
                            files: null,
                            ad_id: images[i].ad_id,
                            // path: images[i].image_path
                            path: images[i].photo
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
                setLocation({
                    ...listLocation,
                    location: item.location !== undefined && item.location !== null ? { label: item.location, value: {} } || '' : '',
                    locationName: item.location !== undefined && item.location !== null ? item.location || '' : '',
                    locationCity: item.city !== undefined && item.city !== null ? item.city || '' : '',
                    locationProvince: item.province !== undefined && item.province !== null ? item.province || '' : '',
                })
                setState({
                    ...state,
                    /** Listing  */
                    listingId: item.id !== undefined && item.id !== null ? item.id || '' : '',
                    listingDate: item.created_at !== undefined && item.created_at !== null ? item.created_at || '' : '',
                    listingBy: Number(item.user_type) === 2 ? 'Dealer' : 'Seller',
                    listingGallery: item.images != undefined && item.images != null ? item.images || [] : [],
                    listingDesc: item.description !== undefined && item.description !== null ? item.description || '' : '',
                    /** User Listing Detail */
                    userId: item.user_id !== undefined && item.user_id !== null && item.user_id.length > 0 ? item.user_id[0].id !== undefined && item.user_id[0].id !== null ? item.user_id[0].id || '' : '' : '',
                    userCity: item.user_id !== undefined && item.user_id !== null && item.user_id.length > 0 ? item.user_id[0].dd_user_id !== undefined && item.user_id[0].dd_user_id !== null && item.user_id[0].dd_user_id.length > 0 ? item.user_id[0].dd_user_id[0].city !== undefined && item.user_id[0].dd_user_id[0].city !== null ? item.user_id[0].dd_user_id[0].city || '' : '' : item.user_id[0].bd_user_id !== undefined && item.user_id[0].bd_user_id !== null && item.user_id[0].bd_user_id.length > 0 ? item.user_id[0].bd_user_id[0].city !== undefined && item.user_id[0].bd_user_id[0].city !== null ? item.user_id[0].bd_user_id[0].city || '' : '' : '' : '',
                    userName: item.user_id !== undefined && item.user_id !== null && item.user_id.length > 0 ? item.user_id[0].dd_user_id !== undefined && item.user_id[0].dd_user_id !== null && item.user_id[0].dd_user_id.length > 0 ? item.user_id[0].dd_user_id[0].operating_name !== undefined && item.user_id[0].dd_user_id[0].operating_name !== null ? item.user_id[0].dd_user_id[0].operating_name || '' : '' : item.user_id[0].bd_user_id !== undefined && item.user_id[0].bd_user_id !== null && item.user_id[0].bd_user_id.length > 0 ? item.user_id[0].bd_user_id[0].name !== undefined && item.user_id[0].bd_user_id[0].name !== null ? item.user_id[0].bd_user_id[0].name || '' : '' : '' : '',
                    userFirstName: item.user_id !== undefined && item.user_id !== null && item.user_id.length > 0 ? item.user_id[0].dd_user_id !== undefined && item.user_id[0].dd_user_id !== null && item.user_id[0].dd_user_id.length > 0 ? item.user_id[0].dd_user_id[0].first_name !== undefined && item.user_id[0].dd_user_id[0].first_name !== null ? item.user_id[0].dd_user_id[0].first_name || '' : '' : item.user_id[0].bd_user_id !== undefined && item.user_id[0].bd_user_id !== null && item.user_id[0].bd_user_id.length > 0 ? item.user_id[0].bd_user_id[0].first_name !== undefined && item.user_id[0].bd_user_id[0].first_name !== null ? item.user_id[0].bd_user_id[0].first_name || '' : '' : '' : '',
                    userLastName: item.user_id !== undefined && item.user_id !== null && item.user_id.length > 0 ? item.user_id[0].dd_user_id !== undefined && item.user_id[0].dd_user_id !== null && item.user_id[0].dd_user_id.length > 0 ? item.user_id[0].dd_user_id[0].last_name !== undefined && item.user_id[0].dd_user_id[0].last_name !== null ? item.user_id[0].dd_user_id[0].last_name || '' : '' : item.user_id[0].bd_user_id !== undefined && item.user_id[0].bd_user_id !== null && item.user_id[0].bd_user_id.length > 0 ? item.user_id[0].bd_user_id[0].last_name !== undefined && item.user_id[0].bd_user_id[0].last_name !== null ? item.user_id[0].bd_user_id[0].last_name || '' : '' : '' : '',
                    userStreetAddress: item.user_id !== undefined && item.user_id !== null && item.user_id.length > 0 ? item.user_id[0].dd_user_id !== undefined && item.user_id[0].dd_user_id !== null && item.user_id[0].dd_user_id.length > 0 ? item.user_id[0].dd_user_id[0].street_address !== undefined && item.user_id[0].dd_user_id[0].street_address !== null ? item.user_id[0].dd_user_id[0].street_address || '' : '' : item.user_id[0].bd_user_id !== undefined && item.user_id[0].bd_user_id !== null && item.user_id[0].bd_user_id.length > 0 ? item.user_id[0].bd_user_id[0].street !== undefined && item.user_id[0].bd_user_id[0].street !== null ? item.user_id[0].bd_user_id[0].street || '' : '' : '' : '',
                    userPostalCode: item.user_id !== undefined && item.user_id !== null && item.user_id.length > 0 ? item.user_id[0].dd_user_id !== undefined && item.user_id[0].dd_user_id !== null && item.user_id[0].dd_user_id.length > 0 ? item.user_id[0].dd_user_id[0].postal_code !== undefined && item.user_id[0].dd_user_id[0].postal_code !== null ? item.user_id[0].dd_user_id[0].postal_code || '' : '' : item.user_id[0].bd_user_id !== undefined && item.user_id[0].bd_user_id !== null && item.user_id[0].bd_user_id.length > 0 ? item.user_id[0].bd_user_id[0].postal_code !== undefined && item.user_id[0].bd_user_id[0].postal_code !== null ? item.user_id[0].bd_user_id[0].postal_code || '' : '' : '' : '',
                    userFax: item.user_id !== undefined && item.user_id !== null && item.user_id.length > 0 ? item.user_id[0].dd_user_id !== undefined && item.user_id[0].dd_user_id !== null && item.user_id[0].dd_user_id.length > 0 ? item.user_id[0].dd_user_id[0].fax !== undefined && item.user_id[0].dd_user_id[0].fax !== null ? item.user_id[0].dd_user_id[0].fax || '' : '' : item.user_id[0].bd_user_id !== undefined && item.user_id[0].bd_user_id !== null && item.user_id[0].bd_user_id.length > 0 ? item.user_id[0].bd_user_id[0].fax !== undefined && item.user_id[0].bd_user_id[0].fax !== null ? item.user_id[0].bd_user_id[0].fax || '' : '' : '' : '',
                    userEmail: item.user_id !== undefined && item.user_id !== null && item.user_id.length > 0 ? item.user_id[0].dd_user_id !== undefined && item.user_id[0].dd_user_id !== null && item.user_id[0].dd_user_id.length > 0 ? item.user_id[0].dd_user_id[0].email !== undefined && item.user_id[0].dd_user_id[0].email !== null ? item.user_id[0].dd_user_id[0].email || '' : '' : item.user_id !== undefined && item.user_id !== null && item.user_id.length > 0 ? item.user_id[0].email || '' : '' : '',
                    /**Vehicle Detail State */
                    vehicleCategory: item.category !== undefined && item.category !== null ? item.category.id !== undefined && item.category.id !== null ? item.category.id || '' : '' : '',
                    vehicleCondition: item.v_condition !== undefined && item.v_condition !== null ? item.v_condition || '' : '',
                    vehicleYear: item.year !== undefined && item.year !== null ? item.year || '' : '',
                    vehicleMake: item.make !== undefined && item.make !== null ? item.make.id !== undefined && item.make.id !== null ? item.make.id || '' : '' : '',
                    // vehicleTrim: item.trim && item.trim.length > 0 ? item.trim[0] ? item.trim[0].id ? item.trim[0].id || '' : '' : '' : '',
                    vehicleTrim: item.trim && item.trim.length > 0 ? item.trim[0] ? item.trim[0].v_trim ? item.trim[0].v_trim || '' : '' : '' : '',
                    vehicleModel: item.model !== undefined && item.model !== null ? item.model.id !== undefined && item.model.id !== null ? item.model.id || '' : '' : '',
                    vehicleKilometer: item.kilometer !== undefined && item.kilometer !== null ? item.kilometer || '' : '',
                    vehicleVin: item.vin !== undefined && item.vin !== null ? item.vin || '' : '',
                    vehiclePrice: item.price !== undefined && item.price !== null ? item.price || '' : '',
                    vehicleBodyType: item.body_type !== undefined && item.body_type !== null ? item.body_type.id !== undefined && item.body_type.id !== null ? item.body_type.id || '' : '' : '',
                    vehicleSeating: item.seating !== undefined && item.seating !== null ? item.seating || '' : '',
                    vehicleTransmission: item.transmission !== undefined && item.transmission !== null ? item.transmission || '' : '',
                    vehicleColor: item.color !== undefined && item.color !== null ? item.color || '' : '',
                    vehicleFuelType: item.fuel_type !== undefined && item.fuel_type !== null ? item.fuel_type.id !== undefined && item.fuel_type.id !== null ? item.fuel_type.id || '' : '' : '',
                    vehicleDriveTrain: item.drive_train !== undefined && item.drive_train !== null ? item.drive_train.id !== undefined && item.drive_train.id !== null ? item.drive_train.id || '' : '' : '',
                    vehicleCylinder: item.cylinder !== undefined && item.cylinder !== null ? item.cylinder || '' : '',
                    vehiclePreviousOwners: item.previous_owners !== undefined && item.previous_owners !== null ? item.previous_owners : '',
                    vehiclePreviousAccidents: item.previous_accidents !== undefined && item.previous_accidents !== null ?
                        item.previous_accidents : '',
                    vehicleFeature: item.features !== undefined && item.features !== null ? JSON.parse(item.features) || [] : [],
                    vehicleListingType: item.listing_type !== undefined && item.listing_type !== null && item.listing_type.length > 0 ? item.listing_type[0].listing_type !== undefined && item.listing_type[0].listing_type !== null ? item.listing_type[0].listing_type || '' : '' : '',
                    vehicleListingPrice: item.listing_type !== undefined && item.listing_type !== null && item.listing_type.length > 0 ? item.listing_type[0].price !== undefined && item.listing_type[0].price !== null ? item.listing_type[0].price || '' : '' : '',
                    vehicleImages: imagesFiles,
                    vehicleUploadImages: orignalImage,
                    vehicleOtherMake: item.other_make !== undefined && item.other_make !== null && item.other_make !== '' ? item.other_make || '' : item.make !== undefined && item.make !== null ? item.make.make_name !== undefined && item.make.make_name !== null ? item.make.make_name || '' : '' : '',

                    vehicleOtherModel: item.other_model !== undefined && item.other_model !== null ? item.other_model || '' : '',
                    vehicleOrgOtherMake: item.other_make !== undefined && item.other_make !== null ? item.other_make || '' : '',
                    vehicleOrgOtherModel: item.other_model !== undefined && item.other_model !== null ? item.other_model || '' : '',

                })
                categoryId = item.category !== undefined && item.category !== null ? item.category.id !== undefined && item.category.id !== null ? item.category.id || '' : '' : '';
                makeId = item.make !== undefined && item.make !== null ? item.make.id !== undefined && item.make.id !== null ? item.make.id || '' : '' : '';
                // For Trim
                modelId = item.model !== undefined && item.model !== null ? item.model.id !== undefined && item.model.id !== null ? item.model.id || '' : '' : ''
            })
            if (categoryId !== undefined && categoryId !== null && categoryId !== '') {
                const id = categoryId || ''
                props.get_vehicle_make(id)
            }
            if (categoryId !== undefined && categoryId !== null && categoryId !== '') {
                props.get_vehicle_body_type(categoryId)
                props.get_vehicle_feature(categoryId)
            }
            if (makeId !== undefined && makeId !== null && makeId !== '') {
                const id = makeId || ''
                props.get_vehicle_model(id)
            }
            if (modelId !== undefined && modelId !== null && modelId !== '') {
                const id = modelId || ''
                props.get_vehicle_trims(id)
            }
        }
    }, [props.single_listing_detail])

    useEffect(() => {
        if (listLocation.location !== undefined && listLocation.location !== null) {
            new Promise((resolve) => {
                Geocode.fromAddress(listLocation.location.label !== undefined && listLocation.location.label !== null ? listLocation.location.label : listLocation.location).then(
                    (response) => {
                        let city, state;
                        for (let i = 0; i < response.results[0].address_components.length; i++) {
                            for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                                switch (response.results[0].address_components[i].types[j]) {
                                    case "locality":
                                        city = response.results[0].address_components[i].long_name;
                                        break;
                                    case "administrative_area_level_3":
                                        city = response.results[0].address_components[i].long_name;
                                        break;
                                    case "administrative_area_level_1":
                                        state = response.results[0].address_components[i].short_name;
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                        setLocation({
                            ...listLocation,
                            locationCity: city,
                            locationProvince: state,
                            listingLongitude: response && response.results.length > 0 ? response.results[0] ? response.results[0].geometry.location.lng : '' : '',
                            listingLatitude: response && response.results.length > 0 ? response.results[0] ? response.results[0].geometry.location.lat : '' : '',
                            locationName: listLocation.location.label !== undefined && listLocation.location.label !== null ? listLocation.location.label : listLocation.location
                        });
                        resolve()
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            })
            // new Promise((resolve, reject) => {
            //     geocodeByAddress(listLocation.location.label !== undefined && listLocation.location.label !== null ? listLocation.location.label : listLocation.location)
            //         .then(results => getLatLng(results[0]))
            //         .then(({ lat, lng }) =>
            //             setLocation({
            //                 ...listLocation,
            //                 listingLongitude: lng,
            //                 listingLatitude: lat,
            //                 locationName: listLocation.location.label !== undefined && listLocation.location.label !== null ? listLocation.location.label : listLocation.location
            //             }),
            //             resolve()
            //         )
            //         .catch(err => {
            //             console.log(err.message)
            //         })
            // })
        }
    }, [listLocation.location])
    useEffect(() => {
        if (props.loading_update_listing_vehicle_features !== undefined && props.loading_update_listing_vehicle_features !== null && props.loading_update_listing_vehicle_features === false) {
            setEditListingFeature(false)
        }
    }, [props.loading_update_listing_vehicle_features])

    useEffect(() => {
        if (props.loading_update_listing_vehicle_description !== undefined && props.loading_update_listing_vehicle_description !== null && props.loading_update_listing_vehicle_description === false) {
            setEditDesc(false)
        }
    }, [props.loading_update_listing_vehicle_description])

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
    }
    const handleLocationChange = (e) => {
        setLocation({
            ...listLocation,
            location: e
        })
    }

    const onDrop = async (files, id) => {
        setState({
            ...state,
            imageErrors: []
        })
        let index = 0
        let width = 141.8
        let height = 107.31
        let emptyPreviewFiles = state.vehicleImages.filter(item => item.preViewFiles === null && item.path === '')
        let fillPreviewFiles = state.vehicleImages.filter(item => item.preViewFiles !== null || item.path !== '')
        let emptyFiles = state.vehicleUploadImages.filter(item => item.files === null && item.path === '')
        let fillFiles = state.vehicleUploadImages.filter(item => item.files !== null || item.path !== '')
        for (const item of files) {
            if (item.type != "image/png" && item.type != "image/jpg" && item.type != "image/jpeg") {
                setState({
                    ...state,
                    imageErrors: [...state.imageErrors, { 'message': `${item.path} File does not support. You must use .png, jpeg or .jpg` }]
                })
            } else {
                if (item.size > (2 * 1024 * 1024)) {
                    setState({
                        ...state,
                        imageErrors: [...state.imageErrors, { 'message': `${item.path} Please upload a file smaller than 2 MB` }]
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
                setState({
                    ...state,
                    vehicleUploadImages: [...fillFiles || [], ...emptyFiles],
                    vehicleImages: [...fillPreviewFiles || [], ...emptyPreviewFiles]
                })
            }
        }
    };

    const removeFile = (id) => {
        const fileExist = state.vehicleImages.filter(item => Number(item.id) === Number(id)).map(item => { return item.path })[0]

        if (fileExist !== undefined && fileExist !== null && fileExist !== '') {
            const data = {
                update: 'remove_images',
                rimg_len: 1,
                'rimages[0]': fileExist
            }
            props.delete_listing_image(data)
        }

        const vehicleUploadImages = state.vehicleUploadImages.slice().map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    files: null,
                    path: ''
                }
            }
            return item
        })
        const vehicleImages = state.vehicleImages.slice().map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    preViewFiles: null,
                    path: ''
                }
            }
            return item
        })
        setState({
            ...state,
            vehicleImages,
            vehicleUploadImages
        })
    }

    const handleFeaturesChange = (id) => {
        const features = state.vehiclesFeatures.slice().map(item => {
            if (Number(item.id) === Number(id)) {
                return {
                    ...item,
                    isChecked: !item.isChecked
                }
            }
            return item
        })
        setState({
            ...state,
            vehiclesFeatures: features
        })
    }
    const updateListingFeatures = () => {
        const features = state.vehiclesFeatures.filter(item => item.isChecked === true).map(item => {
            return {
                id: item.id,
                v_features: item.v_features
            }
        })
        const data = {
            update: 'ad',
            user_id: state.userId,
            id: state.listingId,
            features: JSON.stringify(features)
        }
        console.log(data)
        if (state.userId !== undefined && state.userId !== null && state.userId !== '') {
            props.update_listing_vehicle_features(data)
        }
    }

    const updateListingDescription = () => {
        const data = {
            update: 'ad',
            user_id: state.userId,
            id: state.listingId,
            description: state.listingDesc
        }
        props.update_listing_vehicle_description(data)
    }
    const approvedListing = () => {
        const data = {
            update: 'ad_status',
            action: 'approve',
            id: state.listingId
        }
        props.approved_listing(data)

    }
    const declineListing = () => {
        const data = {
            update: 'ad_status',
            action: 'decline',
            reason: state.listingReasonDecline,
            id: state.listingId
        }
        props.decline_listing(data)

    }
    const updateModeModel = () => {
        if (!props.validator.fieldValid('Other_Make')) {
            props.validator.showMessageFor('Other_Make')
            return false
        }
        if (!props.validator.fieldValid('Other_Model')) {
            props.validator.showMessageFor('Other_Model')
            return false
        }

        const checkId = (state.vehicleCategory).toString().split('-')[1]
        let sub_type_id = 0;
        let category_id = 0;
        if (checkId !== undefined && checkId !== null && checkId !== '') {
            sub_type_id = Number(checkId)
            category_id = (state.vehicleCategory).toString().split('-')[0]
        } else {
            category_id = Number(state.vehicleCategory)
            sub_type_id = 0
        }
        let data
        if (state.vehicleOrgOtherMake === '') {
            data = {
                list_id: state.listingId,
                "update": "model",
                "make_id": state.vehicleMake,
                "model_make": state.vehicleOtherModel,
                "is_active": 1
            }
        } else {
            data = {
                list_id: state.listingId,
                "update": "make_model",
                "type_id": category_id,
                "sub_type_id": sub_type_id,
                "make_name": state.vehicleOtherMake,
                "image_path": null,
                "is_active": 1,
                "vmake_id": [
                    {
                        "model_make": state.vehicleOtherModel,
                        "is_active": 1
                    }
                ]
            }
        }

        console.log(data)
        props.update_make_model(data)
    }
    const handleOnChangeDesc = (e) => {
        setState({
            ...state,
            listingDesc: e.editor.getData(),
        });
    }
    return (
        <React.Fragment>
            <div className="Admin-MainHead">
                <div className="Admin-HeadLeft">
                    <h1>Listing #{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null} {state.listingId}</h1>
                    <h2>Date Added: {props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null} {state.listingDate !== undefined && state.listingDate !== null && state.listingDate !== '' ? moment(state.listingDate).format('yyyy-MM-DD') : ''}</h2>
                </div>

                <div className="Admin-HeadRight"><h3>Pending</h3></div>

            </div>

            <div className="clearfix"></div>

            <div className="Admin-DealerLeft">

                <div className="InnerDealer-Container">

                    <div className="InnerDealer-Head">

                        <div className="InnerLeft"><h1>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null} {state.listingBy} ID <span>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null} {state.userId}</span></h1></div>

                        <div className="InnerRight">
                            {editUser === false ? <button type="button" onClick={() => setEditUser(!editUser)}><img src="/assets/image/icon-edit.svg" alt="" /></button> : null}
                        </div>

                    </div>

                    <div className="DealerID-Container">

                        <PendingListingReviewUserDetail handleOnChange={handleOnChange} state={state} {...props} editUser={editUser} setEditUser={setEditUser} />
                    </div>

                </div>

                <div className="InnerDealer-Container">

                    <div className="InnerDealer-Head">

                        <div className="InnerLeft"><h1>Listing location</h1></div>

                        <div className="InnerRight">
                            {editVehicleLocation === false ? <button type="button" onClick={() => setVehicleLocation(!editVehicleLocation)}><img src="/assets/image/icon-edit.svg" alt="" /></button> : null}
                            {/* <button type="button" onClick={() => setVehicleLocation(!editVehicleLocation)}><img src="/assets/image/icon-edit.svg" alt="" /></button> */}
                        </div>

                    </div>

                    <PendingListingReviewLocation setVehicleLocation={setVehicleLocation} editVehicleLocation={editVehicleLocation} listLocation={listLocation} {...props} handleLocationChange={handleLocationChange} state={state} />
                    {/* <img src="image/addess-icon.svg" alt="" />
                        <h3>Brampton, ON</h3> */}

                </div>

                <div className="InnerDealer-Container">

                    <div className="InnerDealer-Head">

                        <div className="InnerLeft"><h1>Description</h1></div>

                        <div className="InnerRight">
                            {editDesc === false ? <button type="button" onClick={() => setEditDesc(!editDesc)}><img src="/assets/image/icon-edit.svg" alt="" /></button> : null}
                            {/* <button type="button" onClick={() => setEditDesc(!editDesc)}><img src="/assets/image/icon-edit.svg" alt="" /></button>                       */}
                        </div>

                    </div>

                    <div className="Admin-DealerAdres Reasonfor-Head">
                        {/* {props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : editDesc === true ? (<textarea id="listingDesc" name="listingDesc" onChange={handleOnChange} value={state.listingDesc}> </textarea>) : <p> {state.listingDesc}</p>} */}
                        {props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : editDesc === true ? (
                            <CKEditor
                                id="listingDesc"
                                className="form-control ckEditior-postadd"
                                data={state.listingDesc}
                                onChange={handleOnChangeDesc}
                            />
                        ) : <div dangerouslySetInnerHTML={{ __html: state.listingDesc }} className='addDetail-description' />}
                        {/* <textarea id="listingDesc" name="listingDesc" onChange={handleOnChange} value={state.listingDesc}> </textarea>) : <p> {state.listingDesc}</p>} */}

                    </div>
                    <div className="Account-EditBtn">
                        {editDesc === true ? (<button type="button" className="newbtn-add" disabled={!editDesc} onClick={updateListingDescription}> {props.loading_update_listing_vehicle_description === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : 'Update'} </button>) : null}
                    </div>
                </div>

                <div className="InnerDealer-Container">

                    <div className="InnerDealer-Head">

                        <div className="InnerLeft"><h1>Listing options</h1></div>

                        <div className="InnerRight">
                            {/* <button type="button" onClick={() => setEditListingOption(!editListingOption)}><img src="/assets/image/icon-edit.svg" alt="" /></button> */}
                        </div>

                    </div>

                    <div className="DealerID-Container">

                        <div className="DealerID-List">
                            <div className="LeftCon"><h1>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : state.vehicleListingType || ''}</h1></div>
                            <div className="RightCon"><h2><span>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : state.vehicleListingPrice !== null && state.vehicleListingPrice !== '' ? new Intl.NumberFormat('en-US',
                                { style: 'currency', currency: 'USD' }
                            ).format(Number(state.vehicleListingPrice))// '$100.00'
                                : new Intl.NumberFormat('en-US',
                                    { style: 'currency', currency: 'USD' }
                                ).format(0)}</span></h2></div>
                        </div>
                    </div>

                </div>


                <div className="InnerDealer-Container">

                    <div className="InnerDealer-Head">

                        <div className="InnerLeft"><h1>Listing Gallery</h1></div>

                        <div className="InnerRight">
                            {editListingImages !== true ? <button type="button" onClick={() => setEditListingImages(!editListingImages)}><img src="/assets/image/icon-edit.svg" alt="" /></button> : null}
                        </div>

                    </div>

                    <div className="ListGallery">
                        <PendingListingReviewGallery state={state} {...props} editListingImages={editListingImages} onDrop={onDrop} removeFile={removeFile} setEditListingImages={setEditListingImages} />
                    </div>

                </div>
                {/*  */}
                {(state.vehicleOrgOtherMake !== '' ||
                    state.vehicleOrgOtherModel !== '') && (!state.vehicleMake || !state.vehicleModel) && props.success_listing_make_model === false ? (
                    <div class="InnerDealer-Container">

                        <div class="InnerDealer-Head">

                            <div class="InnerLeft"><h1>Custom Make/Model</h1></div>

                            <div class="InnerRight">
                                {editMakeModel === false ? (<button type="button" onClick={() => setEditMakeModel(!editMakeModel)}><img src="/assets/image/icon-edit.svg" alt="" /></button>) : null}
                            </div>

                        </div>
                        <div class="CustomMake-Form">

                            <div class="MakeLeft-Form">
                                <label>Make</label>
                                <input type="text" id="vehicleOtherMake" name="vehicleOtherMake" value={state.vehicleOtherMake} placeholder="Finance" onChange={handleOnChange} disabled={state.vehicleOrgOtherMake === ''} />
                                {props.validator.message('Other_Make', state.vehicleOtherMake, 'required')}
                            </div>

                            <div class="MakeRight-Form">
                                <label>Model</label>
                                <input type="text" id="vehicleOtherModel" name="vehicleOtherModel" value={state.vehicleOtherModel} placeholder="Finance" onChange={handleOnChange} />
                                {props.validator.message('Other_Model', state.vehicleOtherModel, 'required')}
                            </div>
                            {editMakeModel === true ? (<button type="button" className="newbtn-add" disabled={!editMakeModel} onClick={updateModeModel}> {props.loading_listing_make_model === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : 'Update'} </button>) : null}
                            {/* <button type="button" onClick={updateModeModel} disabled={props.loading_listing_make_model}>{props.loading_listing_make_model === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null}Update</button> */}

                        </div>


                    </div>
                ) : null}
            </div>

            <div className="Admin-DealerRight">

                <div className="InnerDealer-Container">

                    <div className="InnerDealer-Head">

                        <div className="InnerLeft"><h1>Vehicle Details</h1></div>

                        <div className="InnerRight">
                            <button type="submit">
                                {/* <span>Download Ownership</span> */}
                                {editVehicle === false ? <img src="/assets/image/icon-edit.svg" alt="" onClick={() => setEditVehicle(!editVehicle)} /> : null}
                            </button>
                        </div>

                    </div>

                    <div className="DealerID-Container">

                        <PendingListingReviewVehicleDetail state={state} {...props} editVehicle={editVehicle} setEditVehicle={setEditVehicle} handleOnChange={handleOnChange} />

                    </div>

                </div>

                {/* <div className="InnerDealer-Container">

                    <div className="InnerDealer-Head">

                        <div className="InnerLeft"><h1>Vehicle Overview</h1></div>

                        <div className="InnerRight">
                            {editVehicleOverivew === false ? <button type="button" onClick={() => setEditVehicleOverivew(!editVehicleOverivew)}><img src="/assets/image/icon-edit.svg" alt="" /></button> : null}

                        </div>

                    </div>

                    <div className="DealerID-Container">
                        <PendingListingReviewVehicleOverview handleOnChange={handleOnChange} state={state} {...props} editVehicleOverivew={editVehicleOverivew} setEditVehicleOverivew={setEditVehicleOverivew} />
                    </div>

                </div> */}

                {state.showVehiclesFeatures === true ? (<div className="InnerDealer-Container">

                    <div className="InnerDealer-Head">

                        <div className="InnerLeft"><h1>Vehicle Features</h1></div>

                        <div className="InnerRight">
                            {editListingFeature === false ? <button type="button" onClick={() => setEditListingFeature(!editListingFeature)}><img src="/assets/image/icon-edit.svg" alt="" /></button> : null}
                            {/* <button type="button" onClick={() => setEditListingFeature(!editListingFeature)}><img src="/assets/image/icon-edit.svg" alt="" /></button> */}
                        </div>

                    </div>
                    <div className="VehicleTable-Container">
                        <table className="table">
                            <tbody>
                                {props.loading_listing_detail === true ? (
                                    <tr >
                                        <td><i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> <b>:</b></td>
                                        <td><span><i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i></span></td>
                                    </tr>) : editListingFeature === true ? ((state.vehiclesFeatures || []).map((item, index) => (
                                        <tr key={index}>
                                            {(index + 1) % 2 !== 0 ?
                                                (<td><div className="Admin-DocumetCheck"><label className="DocBtn-Container">{item.v_features}
                                                    <input type="checkbox" value={item.v_features} checked={item.isChecked} onClick={() => handleFeaturesChange(item.id)} />
                                                    <span className="DocMark"></span>
                                                </label></div><b>:</b></td>) :
                                                (<td><span><div className="Admin-DocumetCheck"><label className="DocBtn-Container">{item.v_features}
                                                    <input type="checkbox" value={item.v_features} checked={item.isChecked} onClick={() => handleFeaturesChange(item.id)} />
                                                    <span className="DocMark"></span>
                                                </label></div> </span></td>)}
                                        </tr>
                                    ))) : ((state.vehiclesFeatures || []).filter(item => item.isChecked === true).map((item, index) => (
                                        <tr key={index}>
                                            {(index + 1) % 2 !== 0 ?
                                                (<td>{item.v_features} <b>:</b></td>) :
                                                (<td><span>{item.v_features} </span></td>)}
                                        </tr>
                                    )))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="Account-EditBtn">
                        {editListingFeature === true ? (<button type="button" className="newbtn-add" disabled={!editListingFeature} onClick={updateListingFeatures}> {props.loading_update_listing_vehicle_features === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : 'Update'} </button>) : null}

                    </div>
                </div>) : null}

            </div>


            <div class="clearfix"></div>

            {/* <div class="Reasonfor-Diclined">
                <div class="Reasonfor-Head">
                    <h1>Reason for declining the registration</h1>
                    <textarea id="listingReasonDecline" name="listingReasonDecline" onChange={handleOnChange} value={state.listingReasonDecline}> </textarea>
                </div>
            </div>

            <div class="clearfix"></div>

            <div class="Reasonfor-Btn">
                <button type="button" onClick={approvedListing} disabled={(props.loading_listing_approved) || ((state.vehicleOrgOtherMake !== '' ||
                    state.vehicleOrgOtherModel !== '') && (!state.vehicleMake || !state.vehicleModel) && props.success_listing_make_model === false)}>{props.loading_listing_approved === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : 'Approve'}</button>
                <button type="button" className="active" onClick={declineListing} disabled={props.loading_listing_decline}>{props.loading_listing_decline === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : 'Decline'}</button>
            </div> */}
        </React.Fragment>
    );
}
export default PendingListingReviews