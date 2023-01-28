import React, { Component, PureComponent } from "react";
import GridView from "../../components/listingViews/GridView.jsx";
import ListView from "../../components/listingViews/ListView.jsx";
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
  change_type_of_vehicle,
  get_list_filter_values,
  get_top_ads,
  next_url_call
} from '../../actions/listPostActions'
import {
  get_vehicle_type,
  get_vehicle_feature,
  get_vehicle_make,
  get_vehicle_model,
  get_vehicle_trims,
  toggle_vehicle_features,
  remove_all_features,
  remove_all,
  get_vehicle_fuel_type,
  get_vehicle_drive_train,
  get_vehicle_body_type,
  remove_specific_state,
  get_sub_type_vehicle_make
} from '../../actions/addPostActions'
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format';
import MaskedInput from 'react-text-mask'
import {
  steeringTypes,
  seatings,
  passengers,
  cylinders
} from './filterConstants'
import AdPostSearchMobileView from './AdPostSearchMobileView'
import TopAdPost from './TopAdPost'
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import GoogleMapModelSearch from '../../components/googleMap/GoogleMapModelSearch'

var sideBarFilters = [{
  id: 7, name: "Automotive", make: true, model: true, trim: true, year: true, body_type: true, price: true,
  kilometer: true,
  condition: true, transmission: true, fuel_type: true, drive_train: true, cylinder: true, seating: true, color: true, seller_type: true, accident: true, owners: true, features: true, passenger: false, steering_type: false, vin: false, engineCC: false, hours: false, passengers: false, steering_types: false
},
{
  id: 9, name: "Powersport", make: true, model: true, trim: false, year: true, body_type: false, price: true,
  kilometer: true,
  condition: true, transmission: true, fuel_type: false, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: true, passenger: false, steering_type: false, vin: false, engineCC: true, hours: true, passengers: false, steering_types: false
},
{
  id: 2, name: "Motorcycle", make: true, model: true, trim: false, year: true, body_type: false, price: true,
  kilometer: true,
  condition: true, transmission: false, fuel_type: false, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: true, passenger: false, steering_type: false, vin: false, engineCC: true, hours: false, passengers: false, steering_types: false
},
{
  id: 3, name: "Boat", make: true, model: true, trim: false, year: true, body_type: false, price: true,
  kilometer: true,
  condition: true, transmission: false, fuel_type: true, passenger: true, steering_type: true, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: true, vin: false, engineCC: true, hours: false, passengers: true, steering_types: true
},
{
  id: 6, name: "RV", make: true, model: true, trim: false, year: true, body_type: false, price: true,
  kilometer: true,
  condition: true, transmission: false, fuel_type: false, passenger: false, steering_type: false, drive_train: false, cylinder: false, seating: false, color: true, seller_type: true, accident: true, owners: true, features: true, vin: false, engineCC: false, hours: false, passengers: false, steering_types: false
},
{
  id: 8, name: "Small Equipment", make: true, model: true, trim: false, year: true, body_type: false, price: true,
  kilometer: true,
  condition: true, transmission: false, fuel_type: false, passenger: false, steering_type: false, drive_train: false, cylinder: false, seating: false, color: false, seller_type: true, accident: true, owners: true, features: false, vin: false, engineCC: true, hours: true, passengers: false, steering_types: false
}
];
class AdPostSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewList: "grid",
      searchKm: this.props.location.query !== undefined ? this.props.location.query.location !== undefined ? this.props.location.query.location : '' : '',
      search: this.props.location.query !== undefined ? this.props.location.query.search !== undefined ? this.props.location.query.search : '' : '',
      category: this.props.location.query !== undefined ? this.props.location.query.category !== undefined ? this.props.location.query.category : '' : '',
      sortBy: this.props.location.query !== undefined ? this.props.location.query.sortBy !== undefined ? this.props.location.query.sortBy : '' : '',
      // fromRange: 0,
      fromRange: '',
      toRange: this.props.location.query !== undefined && this.props.location.query.fromRange !== undefined ? this.props.location.query.fromRange : '',
      // (this.props.get_search_values || []).length > 0 ? this.props.get_search_values[0] !== undefined && this.props.get_search_values[0] !== null ? this.props.get_search_values[0].price__max !== undefined && this.props.get_search_values[0].price__max !== null ? Number(this.props.get_search_values[0].price__max).toFixed(2) : '' : '' : ''
      seller_type: 'Both Seller Type',
      featureName: '',
      color: this.props.location.query !== undefined ? this.props.location.query.color !== undefined ? this.props.location.query.color : 'All Color' : 'All Color',
      transmission: 'Both Transmissions',
      selectTrim: '',
      toYear: this.props.location.query !== undefined && this.props.location.query.fromYear !== undefined ? this.props.location.query.fromYear : new Date().getFullYear() + 1,
      // (this.props.get_search_values || []).length > 0 ? this.props.get_search_values[0] !== undefined && this.props.get_search_values[0] !== null ? this.props.get_search_values[0].year__max !== undefined && this.props.get_search_values[0].year__max !== null ? (this.props.get_search_values[0].year__max) : new Date().getFullYear() : new Date().getFullYear() : new Date().getFullYear(),
      fromYear: 1990,
      vehicleMake: this.props.location.query !== undefined ? this.props.location.query.vehicleMake !== undefined ? this.props.location.query.vehicleMake : '' : '',
      fromKilometer: '',
      toKilometer: this.props.location.query !== undefined && this.props.location.query.fromKilometer !== undefined ? this.props.location.query.fromKilometer : '',
      // (this.props.get_search_values || []).length > 0 ? this.props.get_search_values[0] !== undefined && this.props.get_search_values[0] !== null ? this.props.get_search_values[0].kilometer__max !== undefined && this.props.get_search_values[0].kilometer__max !== null ** this.props.get_search_values[0].kilometer__max !== '' ? (this.props.get_search_values[0].kilometer__max).toLocaleString('en-US') : '' : '' : ''
      vehicleModel: this.props.location.query !== undefined ? this.props.location.query.vehicleModel !== undefined ? this.props.location.query.vehicleModel : '' : '',
      typeOfVehicle: this.props.location.query !== undefined ? this.props.location.query.category !== undefined ? this.props.location.query.category : 'All Vehicles' : 'All Vehicles',
      selectCondition: 'Both Conditions',
      type_of_vehicle: [],
      vehicle_make: [],
      vehicle_model: [],
      categoryFilterName: this.props.location.query !== undefined ? this.props.location.query.categoryFilterName !== undefined ? this.props.location.query.categoryFilterName : '' : '',
      makeFilterName: this.props.location.query !== undefined ? this.props.location.query.makeFilterName !== undefined ? this.props.location.query.makeFilterName : '' : '',
      modelFilterName: this.props.location.query !== undefined ? this.props.location.query.modalFilterName !== undefined ? this.props.location.query.modalFilterName : '' : '',
      latitude: this.props.location.query !== undefined ? this.props.location.query.latitude !== undefined ? this.props.location.query.latitude : '' : '',
      longitude: this.props.location.query !== undefined ? this.props.location.query.longitude !== undefined ? this.props.location.query.longitude : '' : '',
      start_pay: '',
      paymentPrice: 'p',
      end_pay: '',
      vehicleFuelType: 'All Fuel Types',
      vehicleDriveTrain: 'All Drive Traim',
      vehicleCylinder: 'All Cylinder',
      vehicleSeating: 'All Seating',
      vehicleBody: '',
      vehicleAccident: 'Both Accidents',
      vehicleOwner: 'Both Owners',
      vin: '',
      start_ec: '',
      end_ec: '',
      hours: '',
      vehiclePassenger: '',
      toggleMobileView: false,
      steering_type: '',
      subTypeOfVehicle: '',
      filters: sideBarFilters,
      allowFilters: this.props.location.query !== undefined ? this.props.location.query.category !== undefined && this.props.location.query.category !== '' ? sideBarFilters.filter(item => Number(item.id) === Number(this.props.location.query.category)) : [{
        id: 7, name: "Automotive", make: true, model: true, trim: true, year: true, body_type: true, price: true,
        kilometer: true,
        condition: true, transmission: true, fuel_type: true, drive_train: true, cylinder: true, seating: true, color: true, seller_type: true, accident: true, owners: true, features: true, passenger: false, steering_type: false, vin: false, engineCC: false, hours: false, passengers: false, steering_types: false
      }] : [{
        id: 7, name: "Automotive", make: true, model: true, trim: true, year: true, body_type: true, price: true,
        kilometer: true,
        condition: true, transmission: true, fuel_type: true, drive_train: true, cylinder: true, seating: true, color: true, seller_type: true, accident: true, owners: true, features: true, passenger: false, steering_type: false, vin: false, engineCC: false, hours: false, passengers: false, steering_types: false
      }],
      yearsDropDown: [],
      fromYearDropDown: [],
      // distance: this.props.location.query !== undefined ? this.props.location.query.distance !== undefined ? this.props.location.query.distance : '' : '',
      distance: 0,
      selectedToYear: [{ label: this.props.location.query !== undefined && this.props.location.query.fromYear !== undefined ? this.props.location.query.fromYear : new Date().getFullYear(), value: this.props.location.query !== undefined && this.props.location.query.fromYear !== undefined ? this.props.location.query.fromYear : new Date().getFullYear() }],
      selectedFromYear: [{ label: '1990', value: 1990 }],
      rangeSlider: [0, this.props.location.query !== undefined ? this.props.location.query.distance !== undefined ? this.props.location.query.distance : 0 : 0],
      checkAllCanda: false,
      typeOfVehicles: '',
      selectedTypeOfVehicle: '',
      p_size: 30,
      t_p_size: 10,
      sort_by_filters: [{
        name: 'Price Lowest First', value: 'price_lowest_first'
      }, {
        name: 'Price Highest First', value: 'price_highest_first'
      }, {
        name: 'Listings Newest', value: 'listings_newest'
      }, {
        name: 'Listings Oldest', value: 'listings_oldest'
      }, {
        name: 'Distance Nearest', value: 'distance_nearest'
      }, {
        name: 'Distance Farthest', value: 'distance_farthest'
      }, {
        name: 'Year Nearest', value: 'year_nearest'
      }, {
        name: 'Year Lowest', value: 'year_lowest'
      }, {
        name: 'Mileage Lowest', value: 'mileage_lowest'
      }, {
        name: 'Mileage Highest', value: 'mileage_highest'
      }]

    };
    window.scrollTo(0, 0)

  }

  componentDidMount() {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_GEOCODE_KEY);
    Geocode.setLanguage("en");
    Geocode.enableDebug();
    let currentYear = new Date().getFullYear() + 1;
    let earliestYear = 1900;
    let countYears = 1900;
    let years = []
    let toYears = [];
    while (currentYear >= earliestYear) {
      years.push({ label: `${currentYear}`, value: currentYear })
      toYears.push({ label: `${countYears}`, value: countYears })
      currentYear -= 1;
      countYears += 1;
    }
    this.setState({
      ...this.state,
      yearsDropDown: years,
      fromYearDropDown: toYears
    })
    this.props.get_vehicle_type()
    const modelName = this.state.vehicleModel !== '' ? this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] == undefined ? this.state.modelFilterName : this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] : this.state.modelFilterName
    const makeName = this.state.vehicleMake != '' ? this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] == undefined ? this.state.makeFilterName : this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] : this.state.makeFilterName
    const typeVehicle = this.state.categoryFilterName === 'All Vehicles' ? '' : this.state.categoryFilterName
    const subType = this.state.subTypeOfVehicle !== '' ? this.state.type_of_vehicle.filter(item => item.name.toUpperCase() === ('powersport').toUpperCase() || item.name.toUpperCase() === ('powersports').toUpperCase())[0] : ''
    const subTypeData = subType.typeofvehicle_id !== undefined && subType.typeofvehicle_id !== null ? subType.typeofvehicle_id.filter(item => { return (Number(item.id) === Number(this.state.subTypeOfVehicle)) }) : ''
    const subTypeName = subTypeData !== undefined && subTypeData !== null && subTypeData.length > 0 ? subTypeData.map(item => { return (item.name) })[0] : ''
    const data = {
      sortBy: 'random',
      typeAd: '3',
      subTypeOfVehicle: this.state.subTypeOfVehicle,
      category: (this.state.type_of_vehicle || []) !== undefined && (this.state.type_of_vehicle || []) !== null && (this.state.type_of_vehicle || []).length > 0 ? this.state.typeOfVehicle !== '' ? (this.state.type_of_vehicle || []).filter(item => Number(item.id) === Number(this.state.typeOfVehicle)).map(item => { return item.name })[0] == undefined ? typeVehicle : (this.state.type_of_vehicle || []).filter(item => item.id == this.state.typeOfVehicle).map(item => { return item.name })[0] : typeVehicle : this.state.categoryFilterName,
      make: makeName,
      model: modelName,
    }
    this.props.get_top_ads(data)
    //   this.props.get_post_list()
    // this.props.get_list_filters()
    this.props.get_vehicle_fuel_type()
    if (this.props.get_search_values !== undefined && this.props.get_search_values !== null && this.props.get_search_values.length === 0) {
      this.props.get_list_filter_values()
    }
    this.props.get_vehicle_drive_train()
    if (this.props.location.query !== undefined && this.props.location.query.category !== undefined && this.props.location.query.category !== '') {
      this.props.get_vehicle_make(this.props.location.query.category)
    }
    if (this.props.location.query !== undefined && this.props.location.query.vehicleMake !== undefined && this.props.location.query.vehicleMake !== '') {
      this.props.get_vehicle_model(this.props.location.query.vehicleMake)
    }
    this.searchPost()
    this.add_filter_reducer()
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
    }
    else {
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
      const allowFilters = this.state.filters.filter(item => Number(item.id) === Number(this.state.typeOfVehicle)).length > 0 ? this.state.filters.filter(item => Number(item.id) === Number(this.state.typeOfVehicle)) : [{
        id: 7, name: "Automotive", make: true, model: true, trim: true, year: true, body_type: true, price: true,
        kilometer: true,
        condition: true, transmission: true, fuel_type: true, drive_train: true, cylinder: true, seating: true, color: true, seller_type: true, accident: true, owners: true, features: true, passenger: false, steering_type: false, vin: false, engineCC: false, hours: false, passengers: false, steering_types: false
      }]
      // === 'All Vehicles' ? 'All Vehicles' : this.state.typeOfVehicle,
      this.setState({
        ...this.state,
        // vehicle_make: makes,
        category: this.state.typeOfVehicle,
        sortBy: '',
        fromRange: '',
        toRange: this.props.location.query !== undefined && this.props.location.query.fromRange !== undefined ? this.props.location.query.fromRange : '',
        seller_type: '',
        featureName: '',
        color: '',
        transmission: '',
        selectTrim: '',
        toYear: new Date().getFullYear() + 1,
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
        vin: '',
        start_ec: '',
        end_ec: '',
        hours: '',
        vehiclePassenger: '',
        steering_type: '',
        subTypeOfVehicle: '',
        allowFilters: allowFilters,

      })
      // this.props.remove_all_filter()
      // this.props.remove_all_features()
      // this.props.remove_all()
      setTimeout(() => {
        this.add_filter_reducer()
        this.callFilterApi()
        this.get_top_ad()
      }, 100)
      if (this.state.typeOfVehicle === 'All Vehicles') {
        this.props.remove_specific_state()

      } else {
        this.props.get_vehicle_make(this.state.typeOfVehicle)
        this.props.change_type_of_vehicle(this.state.typeOfVehicle)
        this.props.get_vehicle_feature(this.state.typeOfVehicle)
        this.props.get_vehicle_body_type(this.state.typeOfVehicle)
      }


      // this.callFilterApi()
    }
    if (prevState.subTypeOfVehicle !== this.state.subTypeOfVehicle && this.state.subTypeOfVehicle !== '') {
      this.setState({
        ...this.state,
        sortBy: '',
        fromRange: '',
        toRange: this.props.location.query !== undefined && this.props.location.query.fromRange !== undefined ? this.props.location.query.fromRange : '',
        seller_type: '',
        featureName: '',
        color: '',
        transmission: '',
        selectTrim: '',
        toYear: new Date().getFullYear() + 1,
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
        vin: '',
        start_ec: '',
        end_ec: '',
        hours: '',
        vehiclePassenger: '',
        steering_type: '',


      })
      setTimeout(() => {
        this.add_filter_reducer()
        this.callFilterApi()
        this.get_top_ad()
      }, 100)
      this.props.get_sub_type_vehicle_make(this.state.subTypeOfVehicle)

    }
    if (prevProps.vehicle_make !== this.props.vehicle_make && this.props.vehicle_make !== undefined && this.props.vehicle_make !== '') {
      this.setState({
        ...this.state,
        vehicle_make: this.props.vehicle_make

      })
    }

    if ((prevState.start_pay !== this.state.start_pay && this.state.start_pay !== '' && Number(this.state.start_pay) !== 0) || (prevState.end_pay !== this.state.end_pay && this.state.end_pay !== '' && Number(this.state.end_pay) !== 0)) {
      this.add_filter_reducer()
      this.callFilterApi()
      // this.props.filter_on_price_range(data)
    }
    if (prevState.selectTrim !== this.state.selectTrim && this.state.selectTrim !== '') {
      this.add_filter_reducer()
      this.callFilterApi()
      // this.props.filter_on_trim(data)
    }
    if ((prevState.fromYear !== this.state.fromYear && Number(this.state.fromYear) !== 0) || (prevState.toYear !== this.state.toYear && Number(this.state.toYear) !== 0)) {
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
      if (this.state.vehicleMake !== 'all_makes') {
        this.props.get_vehicle_model(this.state.vehicleMake)
      }
      this.add_filter_reducer()
      this.callFilterApi()
      this.get_top_ad()
      // this.props.filter_on_make(data)
    }
    if (prevProps.vehicle_model !== this.props.vehicle_model && this.props.vehicle_model !== undefined && this.props.vehicle_model !== '') {
      this.setState({
        ...this.state,
        vehicle_model: this.props.vehicle_model
      })
    }
    if (prevState.vehicleModel !== this.state.vehicleModel && this.state.vehicleModel !== '') {
      this.props.get_vehicle_trims(this.state.vehicleModel)
      this.add_filter_reducer()
      this.callFilterApi()
      this.get_top_ad()
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
    if (prevState.steering_type !== this.state.steering_type && this.state.steering_type !== '') {
      this.add_filter_reducer()
      this.callFilterApi()
    }
    if (prevState.vehiclePassenger !== this.state.vehiclePassenger && this.state.vehiclePassenger !== '') {
      this.add_filter_reducer()
      this.callFilterApi()
    }
    if (prevState.sortBy !== this.state.sortBy && this.state.sortBy !== '') {
      this.add_filter_reducer()
      this.callFilterApi()
    }
    if (prevState.checkAllCanda !== this.state.checkAllCanda && this.state.checkAllCanda !== '') {
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

    if (prevState.searchKm !== this.state.searchKm && this.state.searchKm !== undefined && this.state.searchKm !== '') {
      // new Promise(resolve => {
      // Geocode.fromAddress(this.state.searchKm).then(
      //   response => {
      //     let location = []
      //     // response.results[0].address_components.map((item, index) => {
      //     this.setState({
      //       ...this.state,
      //       latitude: response.results[0].geometry.location.lat,
      //       longitude: response.results[0].geometry.location.lng
      //     })
      //     // resolve((location));
      //   },
      //   error => {
      //     console.error('error Location Api', error);
      //   }
      // );
      this.add_filter_reducer()
      this.callFilterApi()
      // })
    }
    if (prevProps.type_of_vehicles !== this.props.type_of_vehicles && this.props.type_of_vehicles !== undefined) {
      this.setState({
        ...this.state,
        type_of_vehicle: this.props.type_of_vehicles,
        typeOfVehicles: this.props.type_of_vehicles.map(item => {
          return { label: item.name, value: item.id }
        }),
        selectedTypeOfVehicle: this.props.type_of_vehicles.filter(item => Number(item.id) === Number(this.state.category)).map(item => {
          return { label: item.name, value: item.id }
        })
      })
    }

    if (prevProps.get_search_values !== this.props.get_search_values && this.props.get_search_values !== undefined) {
      // this.setState({
      //   ...this.state,
      //   toKilometer: (this.props.get_search_values || []).length > 0 ? this.props.get_search_values[0] !== undefined && this.props.get_search_values[0] !== null ? this.props.get_search_values[0].kilometer__max !== undefined && this.props.get_search_values[0].kilometer__max !== null ** this.props.get_search_values[0].kilometer__max !== '' ? (this.props.get_search_values[0].kilometer__max).toLocaleString('en-US') : '' : '' : '',
      //   toRange: (this.props.get_search_values || []).length > 0 ? this.props.get_search_values[0] !== undefined && this.props.get_search_values[0] !== null ? this.props.get_search_values[0].price__max !== undefined && this.props.get_search_values[0].price__max !== null ? Number(this.props.get_search_values[0].price__max).toFixed(2) : '' : '' : '',
      //   toYear: (this.props.get_search_values || []).length > 0 ? this.props.get_search_values[0] !== undefined && this.props.get_search_values[0] !== null ? this.props.get_search_values[0].year__max !== undefined && this.props.get_search_values[0].year__max !== null ? (this.props.get_search_values[0].year__max) : '' : '' : '',
      // })
    }
  }

  blurOnKilometer = () => {
    this.add_filter_reducer()
    this.callFilterApi()
  }

  blurOnHours = () => {
    this.add_filter_reducer()
    this.callFilterApi()
  }
  blurOnVin = () => {
    this.add_filter_reducer()
    this.callFilterApi()
  }
  blurOnEngineCC = () => {
    this.add_filter_reducer()
    this.callFilterApi()
  }
  blurOnYear = () => {
    this.add_filter_reducer()
    this.callFilterApi()
  }
  blurOnPrice = () => {
    this.add_filter_reducer()
    this.callFilterApi()
  }
  add_filter_reducer = () => {
    const modelName = this.state.vehicleModel !== '' ? this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] == undefined ? this.state.modelFilterName : this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] : this.state.modelFilterName
    const makeName = this.state.vehicleMake != '' ? this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] == undefined ? this.state.makeFilterName : this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] : this.state.makeFilterName
    const typeVehicle = this.state.categoryFilterName === 'All Vehicles' ? '' : this.state.categoryFilterName
    const subType = this.state.subTypeOfVehicle !== '' ? this.state.type_of_vehicle.filter(item => item.name.toUpperCase() === ('powersport').toUpperCase() || item.name.toUpperCase() === ('powersports').toUpperCase())[0] : ''
    const subTypeData = subType.typeofvehicle_id !== undefined && subType.typeofvehicle_id !== null ? subType.typeofvehicle_id.filter(item => { return (Number(item.id) === Number(this.state.subTypeOfVehicle)) }) : ''
    const subTypeName = subTypeData !== undefined && subTypeData !== null && subTypeData.length > 0 ? subTypeData.map(item => { return (item.name) })[0] : ''
    const data = {
      category: this.state.typeOfVehicle === 'All Vehicles' ? 'All Vehicles' : this.state.typeOfVehicle !== '' ? (this.state.type_of_vehicle || []).filter(item => Number(item.id) === Number(this.state.typeOfVehicle)).map(item => { return item.name })[0] == undefined ? typeVehicle : (this.state.type_of_vehicle || []).filter(item => item.id == this.state.typeOfVehicle).map(item => { return item.name })[0] : typeVehicle,
      priceFilter: this.state.fromRange == '' && this.state.toRange == '' ? '' : this.state.fromRange !== '' && this.state.toRange == '' ? `Over ${this.state.fromRange}` : this.state.fromRange == '' && this.state.toRange !== '' ? `Under ${this.state.toRange}` : this.state.fromRange + '-' + this.state.toRange,
      location: this.state.searchKm !== undefined && this.state.searchKm !== null && this.state.searchKm !== '' ? this.state.searchKm.split(',').slice(-3, -1)[0] + ", " + this.state.searchKm.split(',').slice(-2, -1)[0].split(' ')[1] : '',
      // start_p: this.state.fromRange == '' ? 0 : this.state.fromRange,
      // start_p: this.state.fromRange == '' ? 0 : this.state.fromRange.replace('$', '').split(',').join(""),
      // end_p: this.state.toRange,
      // end_p: this.state.toRange.replace('$', '').split(',').join(""),
      // start_k: this.state.fromKilometer == '' ? 0 : this.state.fromKilometer.split(',').join(""),
      kilometerFilter: this.state.fromKilometer == '' && this.state.toKilometer == '' ? '' : this.state.fromKilometer !== '' && this.state.toKilometer == '' ? `Kilometer Over ${this.state.fromKilometer}` : this.state.fromKilometer == '' && this.state.toKilometer !== '' ? `Kilometer Under ${this.state.toKilometer}` : `Kilometer ${this.state.fromKilometer + '-' + this.state.toKilometer}`,
      // start_k: this.state.fromKilometer == '' ? 0 : this.state.fromKilometer,
      // end_k: this.state.toKilometer.split(',').join(""),
      // end_k: this.state.toKilometer,
      yearFilter: this.state.fromYear == '' && this.state.toYear == '' ? '' : this.state.fromYear !== '' && this.state.toYear == '' ? `Year Over ${this.state.fromYear}` : this.state.fromYear == '' && this.state.toYear !== '' ? `Year Under ${this.state.toYear}` : `Year ${this.state.fromYear + '-' + this.state.toYear}`,
      // start_y: this.state.fromYear == '' ? 0 : this.state.fromYear,
      // end_y: this.state.toYear,
      make: makeName !== '' ? makeName : '',
      model: modelName !== '' ? modelName : '',
      trim: this.state.selectTrim !== '' ? this.state.selectTrim : '',
      transmission: this.state.transmission,
      condition: this.state.selectCondition,
      color: this.state.color,
      seller_type: this.state.seller_type == 1 ? 'Private Seller' : this.state.seller_type == 2 ? 'Dealer' : this.state.seller_type === 'Both Seller Type' ? 'Both Seller Type' : '',
      features: this.props.vehicle_features.filter(item => item.checked == true).map(item => { return { id: item.id, name: item.v_features } }),
      vehicleFuel: this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.fuel_type })[0] !== undefined && this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.fuel_type })[0] !== null ? this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.fuel_type })[0] : this.state.vehicleFuelType,
      vehicleDrive: this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.drive_train })[0] !== undefined && this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.drive_train })[0] !== null ? this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.drive_train })[0] : this.state.vehicleDriveTrain,
      vehicleCylinder: this.state.vehicleCylinder,
      vehicleSeating: this.state.vehicleSeating,
      vehicleBody: this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] !== undefined && this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] !== null ? this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] : '',
      vehicleAccident: this.state.vehicleAccident,
      vehicleOwner: this.state.vehicleOwner,
      vin: this.state.vin,
      start_ec: this.state.start_ec,
      end_ec: this.state.end_ec,
      hours: this.state.hours,
      vehiclePassenger: this.state.vehiclePassenger,
      steering_type: this.state.steering_type,
      sortBy: this.state.sort_by_filters.filter(item => item.value === this.state.sortBy) !== undefined && this.state.sort_by_filters.filter(item => item.value === this.state.sortBy) !== null && this.state.sort_by_filters.filter(item => item.value === this.state.sortBy).length > 0 ? this.state.sort_by_filters.filter(item => item.value === this.state.sortBy)[0].name : 'All Sort By',
      subTypeName: subTypeName,
      // distance: this.state.distance,
      // endDistance: this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 ? this.state.rangeSlider[1] : 0,
      checkAllCanda: this.state.checkAllCanda
    }
    if (this.state.checkAllCanda === false) {
      // data.distance = this.state.distance
      data.distance = this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 ? this.state.rangeSlider[0] : 0

    }
    if (this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 && this.state.rangeSlider[1] !== 0 && this.state.rangeSlider[1] !== '') {
      data.endDistance = this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 && this.state.rangeSlider[1]
    }
    console.log(data, 'adFilter')
    this.props.add_filters(data)
  }

  callFilterApi = () => {
    const modelName = this.state.vehicleModel !== '' ? this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] == undefined ? this.state.modelFilterName : this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] : this.state.modelFilterName
    const makeName = this.state.vehicleMake != '' ? this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] == undefined ? this.state.makeFilterName : this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] : this.state.makeFilterName
    const subType = this.state.subTypeOfVehicle !== '' ? this.state.type_of_vehicle.filter(item => item.name.toUpperCase() === ('powersport').toUpperCase() || item.name.toUpperCase() === ('powersports').toUpperCase())[0] : ''
    const subTypeData = subType.typeofvehicle_id !== undefined && subType.typeofvehicle_id !== null ? subType.typeofvehicle_id.filter(item => { return (Number(item.id) === Number(this.state.subTypeOfVehicle)) }) : ''
    const subTypeName = subTypeData !== undefined && subTypeData !== null && subTypeData.length > 0 ? subTypeData.map(item => { return (item.name) })[0] : ''
    const typeVehicle = this.state.categoryFilterName === 'All Vehicles' ? '' : this.state.categoryFilterName

    const data = {
      start_pay: this.state.start_pay == '' ? '' : this.state.start_pay.split(',').join(""),
      end_pay: this.state.end_pay == '' ? '' : this.state.end_pay.split(',').join(""),
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      search: this.state.search,
      category: this.state.typeOfVehicle !== '' ? (this.state.type_of_vehicle || []).filter(item => Number(item.id) === Number(this.state.typeOfVehicle)).map(item => { return item.name })[0] == undefined ? typeVehicle : (this.state.type_of_vehicle || []).filter(item => item.id == this.state.typeOfVehicle).map(item => { return item.name })[0] : typeVehicle,
      start_p: this.state.fromRange == '' ? 0 : this.state.fromRange.replace('$', '').replace('.', '').split(',').join(""),
      end_p: this.state.toRange == '' ? '' : this.state.toRange.replace('$', '').replace('.', '').split(',').join(""),
      start_k: this.state.fromKilometer == '' ? 0 : this.state.fromKilometer.split(',').join(""),
      end_k: this.state.toKilometer == '' ? '' : this.state.toKilometer.split(',').join(""),
      start_y: this.state.fromYear == '' ? 0 : this.state.fromYear,
      end_y: this.state.toYear,
      make: makeName,
      model: modelName,
      trim: this.state.selectTrim,
      transmission: this.state.transmission === 'Both Transmissions' ? '' : this.state.transmission,
      condition: this.state.selectCondition === 'Both Conditions' ? '' : this.state.selectCondition !== '' ? this.state.selectCondition === 'Pre-owned' ? 'Used' : this.state.selectCondition : this.state.selectCondition,
      color: this.state.color !== '' ? this.state.color === 'All Color' ? '' : this.state.color : this.state.color,
      seller_type: this.state.seller_type === 'Both Seller Type' ? '' : this.state.seller_type,
      features: this.props.vehicle_features.filter(item => item.checked == true).map(item => { return item.v_features }).length > 0 ? JSON.stringify([this.props.vehicle_features.filter(item => item.checked == true).map(item => { return item.v_features }).join(',')]) : '',
      vehicleFuel: this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.id })[0] !== undefined && this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.id })[0] !== null ? this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.id })[0] : '',
      vehicleDrive: this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.id })[0] !== undefined && this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.id })[0] !== null ? this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.id })[0] : '',
      vehicleCylinder: this.state.vehicleCylinder === 'All Cylinder' ? '' : this.state.vehicleCylinder,
      vehicleSeating: this.state.vehicleSeating === 'All Seating' ? '' : this.state.vehicleSeating,
      // vehicleBody: this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] !== undefined && this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] !== null ? this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] : '',
      vehicleBody: this.state.vehicleBody === 'All Body Type' ? '' : this.state.vehicleBody,
      vehicleAccident: this.state.vehicleAccident === 'Both Accidents' ? "" : this.state.vehicleAccident !== '' ? this.state.vehicleAccident === 'no_accidented' ? 0 : 1 : this.state.vehicleAccident,
      vehicleOwner: this.state.vehicleOwner === 'Both Owners' ? '' : this.state.vehicleOwner !== '' ? this.state.vehicleOwner === 'one_owner' ? 1 : 2 : this.state.vehicleOwner,
      vin: this.state.vin,
      start_ec: this.state.start_ec,
      end_ec: this.state.end_ec,
      hours: this.state.hours,
      vehiclePassenger: this.state.vehiclePassenger,
      steering_type: this.state.steering_type,
      sortBy: this.state.sortBy,
      subTypeOfVehicle: this.state.subTypeOfVehicle,
      subTypeName: subTypeName,
      // distance: this.state.distance,
      // endDistance: this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 ? this.state.rangeSlider[1] : 0,
      checkAllCanda: this.state.checkAllCanda,
      p_size: this.state.p_size
    }
    if (this.state.checkAllCanda === false) {
      // data.distance = this.state.distance
      data.distance = this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 ? this.state.rangeSlider[0] : 0
      // data.endDistance = this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 ? this.state.rangeSlider[1] : 0
    }
    if (this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 && this.state.rangeSlider[1] !== 0 && this.state.rangeSlider[1] !== '') {
      data.endDistance = this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 && this.state.rangeSlider[1]
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
    } else if (name == 'subTypeOfVehicle') {
      this.setState({
        ...this.state,
        [name]: '',
      })
    } else if (name == 'vehicleFuel') {
      this.setState({
        ...this.state,
        vehicleFuelType: '',
      })

    }
    else if (name == 'location') {
      this.setState({
        ...this.state,
        searchKm: '',
        latitude: '',
        longitude: ''
      })

    }
    //  else if (name === 'end_k') {
    //   this.setState({
    //     ...this.state,
    //     toKilometer: ''
    //   })
    // } else if (name === 'start_k') {
    //   this.setState({
    //     ...this.state,
    //     fromKilometer: ''
    //   })
    // }
    // else if (name === 'start_y') {
    //   this.setState({
    //     ...this.state,
    //     selectedFromYear: '',
    //     fromYear: ''
    //   })
    // } else if (name === 'end_y') {
    //   this.setState({
    //     ...this.state,
    //     selectedToYear: '',
    //     toYear: '',
    //   })
    // } 
    else if (name === 'priceFilter') {
      this.setState({
        ...this.state,
        fromRange: '',
        toRange: ''
      })
    } else if (name === 'kilometerFilter') {
      this.setState({
        ...this.state,
        fromKilometer: '',
        toKilometer: ''
      })
    } else if (name === 'yearFilter') {
      this.setState({
        ...this.state,
        selectedFromYear: '',
        fromYear: '',
        selectedToYear: '',
        toYear: '',
      })
    }
    //  else if (name === 'start_p') {
    //   this.setState({
    //     ...this.state,
    //     fromRange: ''
    //   })
    // } else if (name === 'end_p') {
    //   this.setState({
    //     ...this.state,
    //     toRange: ''
    //   })
    // } 
    else {
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
      subTypeOfVehicle: '',
      selectedTypeOfVehicle: '',
      sortBy: '',
      fromRange: '',
      // toRange: this.props.location.query !== undefined && this.props.location.query.fromRange !== undefined ? this.props.location.query.fromRange : '',
      toRange: '',
      seller_type: '',
      featureName: '',
      color: '',
      transmission: '',
      selectTrim: '',
      // toYear: new Date().getFullYear() + 1,
      toYear: '',
      fromYear: '',
      vehicleMake: '',
      fromKilometer: '',
      toKilometer: '',
      // toKilometer: (this.props.get_search_values || []).length > 0 ? this.props.get_search_values[0] !== undefined && this.props.get_search_values[0] !== null ? this.props.get_search_values[0].kilometer__max !== undefined && this.props.get_search_values[0].kilometer__max !== null ** this.props.get_search_values[0].kilometer__max !== '' ? (this.props.get_search_values[0].kilometer__max).toLocaleString('en-US') : '' : '' : '',
      vehicleModel: '',
      typeOfVehicle: '',
      selectCondition: '',
      categoryFilterName: '',
      makeFilterName: '',
      modelFilterName: '',
      search: '',
      searchKm: '',
      latitude: '',
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
      vin: '',
      start_ec: '',
      end_ec: '',
      hours: '',
      vehiclePassenger: '',
      steering_type: '',
      sortBy: '',
      allowFilters: [{
        id: 7, name: "Automotive", make: true, model: true, trim: true, year: true, body_type: true, price: true,
        kilometer: true,
        condition: true, transmission: true, fuel_type: true, drive_train: true, cylinder: true, seating: true, color: true, seller_type: true, accident: true, owners: true, features: true, passenger: false, steering_type: false, vin: false, engineCC: false, hours: false, passengers: false, steering_types: false
      }],
      distance: 0,
      selectedToYear: '',
      // selectedToYear: [{ label: new Date().getFullYear(), value: new Date().getFullYear() }],
      // selectedFromYear: [{ label: '1990', value: 1990 }],
      selectedFromYear: '',
      rangeSlider: [0, 0],
      checkAllCanda: false
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
  onSliderChange = (value) => {
    console.log(value, 'Slider');
    this.setState({
      ...this.state,
      rangeSlider: value,
    });
  };
  searchPost = () => {
    const modelName = this.state.vehicleModel !== '' ? this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] == undefined ? this.state.modelFilterName : this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] : this.state.modelFilterName
    const makeName = this.state.vehicleMake != '' ? this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] == undefined ? this.state.makeFilterName : this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] : this.state.makeFilterName
    const typeVehicle = this.state.categoryFilterName === 'All Vehicles' ? '' : this.state.categoryFilterName
    const subType = this.state.subTypeOfVehicle !== '' ? this.state.type_of_vehicle.filter(item => item.name.toUpperCase() === ('powersport').toUpperCase() || item.name.toUpperCase() === ('powersports').toUpperCase())[0] : ''
    const subTypeData = subType.typeofvehicle_id !== undefined && subType.typeofvehicle_id !== null ? subType.typeofvehicle_id.filter(item => { return (Number(item.id) === Number(this.state.subTypeOfVehicle)) }) : ''
    const subTypeName = subTypeData !== undefined && subTypeData !== null && subTypeData.length > 0 ? subTypeData.map(item => { return (item.name) })[0] : ''
    const data = {
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      search: this.state.search,
      subTypeOfVehicle: this.state.subTypeOfVehicle,
      category: (this.state.type_of_vehicle || []) !== undefined && (this.state.type_of_vehicle || []) !== null && (this.state.type_of_vehicle || []).length > 0 ? this.state.typeOfVehicle !== '' ? (this.state.type_of_vehicle || []).filter(item => Number(item.id) === Number(this.state.typeOfVehicle)).map(item => { return item.name })[0] == undefined ? typeVehicle : (this.state.type_of_vehicle || []).filter(item => item.id == this.state.typeOfVehicle).map(item => { return item.name })[0] : typeVehicle : this.state.categoryFilterName,
      start_pay: this.state.start_pay == '' ? '' : this.state.start_pay.split(',').join(""),
      end_pay: this.state.end_pay == '' ? '' : this.state.end_pay.split(',').join(""),
      start_p: this.state.fromRange == '' ? 0 : this.state.fromRange.replace('$', '').replace('.', '').split(',').join(""),
      end_p: this.state.toRange == '' ? '' : this.state.toRange.replace('$', '').replace('.', '').split(',').join(""),
      start_k: this.state.fromKilometer == '' ? 0 : this.state.fromKilometer.split(',').join(""),
      end_k: this.state.toKilometer == '' ? '' : this.state.toKilometer.split(',').join(""),
      start_y: this.state.fromYear == '' ? 0 : this.state.fromYear,
      end_y: this.state.toYear,
      make: makeName,
      model: modelName,
      trim: this.state.selectTrim,
      transmission: this.state.transmission === 'Both Transmissions' ? '' : this.state.transmission,
      condition: this.state.selectCondition === 'Both Conditions' ? '' : this.state.selectCondition !== '' ? this.state.selectCondition === 'Pre-owned' ? 'Used' : this.state.selectCondition : this.state.selectCondition,
      color: this.state.color !== '' ? this.state.color === 'All Color' ? '' : this.state.color : this.state.color,
      seller_type: this.state.seller_type === 'Both Seller Type' ? '' : this.state.seller_type,
      features: this.props.vehicle_features.filter(item => item.checked == true).map(item => { return item.v_features }).length > 0 ? JSON.stringify([this.props.vehicle_features.filter(item => item.checked == true).map(item => { return item.v_features }).join(',')]) : '',
      vehicleFuel: this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.id })[0] !== undefined && this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.id })[0] !== null ? this.props.vehicle_fuel_type.filter(item => Number(item.id) === Number(this.state.vehicleFuelType)).map(item => { return item.id })[0] : '',
      vehicleDrive: this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.id })[0] !== undefined && this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.id })[0] !== null ? this.props.vehicle_drive_train.filter(item => Number(item.id) === Number(this.state.vehicleDriveTrain)).map(item => { return item.id })[0] : '',
      vehicleCylinder: this.state.vehicleCylinder === 'All Cylinder' ? '' : this.state.vehicleCylinder,
      vehicleSeating: this.state.vehicleSeating === 'All Seating' ? '' : this.state.vehicleSeating,
      // vehicleBody: this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] !== undefined && this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] !== null ? this.props.vehicle_body.filter(item => Number(item.id) === Number(this.state.vehicleBody)).map(item => { return item.body_type })[0] : '',
      vehicleBody: this.state.vehicleBody === 'All Body Type' ? '' : this.state.vehicleBody,
      vehicleAccident: this.state.vehicleAccident === 'Both Accidents' ? "" : this.state.vehicleAccident !== '' ? this.state.vehicleAccident === 'no_accidented' ? 0 : 1 : this.state.vehicleAccident,
      vehicleOwner: this.state.vehicleOwner === 'Both Owners' ? '' : this.state.vehicleOwner !== '' ? this.state.vehicleOwner === 'one_owner' ? 1 : 2 : this.state.vehicleOwner,
      vin: this.state.vin,
      start_ec: this.state.start_ec,
      end_ec: this.state.end_ec,
      // engineCC: this.state.engineCC,
      hours: this.state.hours,
      vehiclePassenger: this.state.vehiclePassenger,
      steering_type: this.state.steering_type,
      sortBy: this.state.sortBy,
      subTypeName: subTypeName,
      dealer_id: '',
      // distance: this.state.distance,
      // endDistance: this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 ? this.state.rangeSlider[1] : 0,
      checkAllCanda: this.state.checkAllCanda,
      p_size: this.state.p_size
    }
    if (this.state.checkAllCanda === false) {
      // data.distance = this.state.distance
      data.distance = this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 ? this.state.rangeSlider[0] : 0
      // data.endDistance = this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 ? this.state.rangeSlider[1] : 0
    }
    if (this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 && this.state.rangeSlider[1] !== 0 && this.state.rangeSlider[1] !== '') {
      data.endDistance = this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 && this.state.rangeSlider[1]
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
  handleChangeSelect = (e, inputName, formName) => {
    this.setState({
      ...this.state,
      [inputName]: e,
      [formName]: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : '' : '',
    })
  }
  handleOnChack = () => {
    this.setState({
      ...this.state,
      checkAllCanda: !this.state.checkAllCanda
    })
  }
  setLocation = (location, lat, log) => {
    // window.$('#googleMapModelHome').modal('hide')
    this.setState({
      ...this.state,
      searchKm: location,
      latitude: Number(lat).toFixed(7),
      longitude: Number(log).toFixed(7)
    })
  }
  setDistance = (distance) => {
    this.setState({
      ...this.state,
      rangeSlider: [0, distance]
    })
  }
  toggleGoogleMap = () => {
    window.$('#googleMapModelHome').modal('show')
  }
  get_top_ad = () => {
    const modelName = this.state.vehicleModel !== '' ? this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] == undefined ? this.state.modelFilterName : this.state.vehicle_model.filter(item => item.id == this.state.vehicleModel).map(item => { return item.model_make })[0] : this.state.modelFilterName
    const makeName = this.state.vehicleMake != '' ? this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] == undefined ? this.state.makeFilterName : this.state.vehicle_make.filter(item => item.id == this.state.vehicleMake).map(item => { return item.make_name })[0] : this.state.makeFilterName
    const typeVehicle = this.state.categoryFilterName === 'All Vehicles' ? '' : this.state.categoryFilterName
    const subType = this.state.subTypeOfVehicle !== '' ? this.state.type_of_vehicle.filter(item => item.name.toUpperCase() === ('powersport').toUpperCase() || item.name.toUpperCase() === ('powersports').toUpperCase())[0] : ''
    const subTypeData = subType.typeofvehicle_id !== undefined && subType.typeofvehicle_id !== null ? subType.typeofvehicle_id.filter(item => { return (Number(item.id) === Number(this.state.subTypeOfVehicle)) }) : ''
    const subTypeName = subTypeData !== undefined && subTypeData !== null && subTypeData.length > 0 ? subTypeData.map(item => { return (item.name) })[0] : ''
    const data = {
      sortBy: 'random',
      typeAd: '3',
      subTypeOfVehicle: this.state.subTypeOfVehicle,
      category: (this.state.type_of_vehicle || []) !== undefined && (this.state.type_of_vehicle || []) !== null && (this.state.type_of_vehicle || []).length > 0 ? this.state.typeOfVehicle !== '' ? (this.state.type_of_vehicle || []).filter(item => Number(item.id) === Number(this.state.typeOfVehicle)).map(item => { return item.name })[0] == undefined ? typeVehicle : (this.state.type_of_vehicle || []).filter(item => item.id == this.state.typeOfVehicle).map(item => { return item.name })[0] : typeVehicle : this.state.categoryFilterName,
      make: makeName,
      model: modelName,
    }
    this.props.get_top_ads(data)
  }
  // handleChangeSelect = (e, name, formName) => {
  //   this.setState({
  //     ...this.state,
  //     [formName]: e,
  //     [name]: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : '' : ''
  //   })
  // }
  handleChangeSelectVehicle = (e, formName, name, additionalName) => {
    this.setState({
      ...this.state,
      [formName]: e,
      [name]: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : '' : '',
      [additionalName]: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : '' : '',
    })
  }
  render() {
    const { Range } = Slider;
    const log = (value) => {
      this.onSliderChange(value)
      console.log(value); //eslint-disable-line
    }
    console.log(this.state, 'state')
    return (
      <React.Fragment>
        <section className="Section-ListandGrid">
          <div className="container-fluid">
            <div className="row">

              <div className="col-md-12 col-sm-12 col-12">

                <div className="MobileSearch">
                  <input type="text" id="search" name="search" placeholder="Search by make, model or keyword" value={this.state.search} onChange={this.handleOnChange} />
                  <button type="submit"><img src="/assets/image/search-icon-responsive.svg" alt="" /></button>
                </div>

                <div className="MobileSearch">
                  <div className="MobileFilter-Container">

                    <div className="TorontoFilter">
                      <i className="icon-subtract-icon"></i>
                      <h1>{this.state.searchKm !== undefined && this.state.searchKm !== null && this.state.searchKm !== '' ? this.state.searchKm.split(',').slice(-3, -1)[0] + ", " + this.state.searchKm.split(',').slice(-2, -1)[0].split(' ')[1] : ''} - {this.state.distance || 0}km</h1>
                    </div>

                    <div className="choosefilter" onClick={() => this.setState({
                      ...this.state,
                      toggleMobileView: !this.state.toggleMobileView
                    })}>
                      <img src="/assets/image/responsive-filter.svg" alt="" />
                      <h2>Filters({this.props.selected_filter_list.length !== 0 && this.props.selected_filter_list !== undefined ? this.props.selected_filter_list.length : 0})</h2>
                    </div>

                    <div className="FilterStep3" onClick={() => this.setState({
                      ...this.state,
                      toggleMobileView: !this.state.toggleMobileView
                    })}>
                      <div className="Responsivedrop"><img src="/assets/image/arrow-down.svg" alt="Responsivedrop" /></div>
                    </div>

                  </div>
                </div>

                <div className="ListSearch-Container">
                  <div className="row">
                    <div className="col-xl-5 col-lg-4 col-md-5 col-sm-12 col-12 pr-0" >
                      <div className="ListSearch-Form">
                        <input
                          type="text"
                          id="search"
                          name="search"
                          value={this.state.search}
                          placeholder="Search by make, model or keyword"
                          onChange={this.handleOnChange}
                        />
                      </div>
                    </div>

                    <div className="col-xl-2 col-lg-3 col-md-2 col-sm-12 col-12 pr-0 pl-0">
                      <div className="ListSearch-Form">
                        <Select
                          placeholder="All Categories"
                          isSearchable={false}
                          className="banner-react-select-main"
                          classNamePrefix="banner-react-select"
                          closeMenuOnSelect
                          options={this.state.typeOfVehicles}
                          required
                          name="selectedTypeOfVehicle"
                          value={this.state.selectedTypeOfVehicle}
                          onChange={(e) => this.handleChangeSelectVehicle(e, 'selectedTypeOfVehicle', 'category', 'typeOfVehicle')}
                        />
                        {/* <select id="category" name="category" value={this.state.category} onChange={this.handleOnChange}>

                          <option value='All Vehicles'>All categories</option>
                          {(this.state.type_of_vehicle || []).map((item, index) => (
                            <option value={item.id} key={index}>{item.name}</option>
                          ))}
                        </select> */}
                        {/* <span className="fa fa-chevron-down"></span> */}
                      </div>
                    </div>

                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                      <div className="ListLocation-Form" >
                        <div onClick={this.toggleGoogleMap}>
                          <input
                            type="text"
                            id="searchKm"
                            name="searchKm"
                            disabled
                            value={this.state.searchKm !== undefined && this.state.searchKm !== null && this.state.searchKm !== '' ? this.state.searchKm.split(',').slice(-3, -1)[0] + ", " + this.state.searchKm.split(',').slice(-2, -1)[0].split(' ')[1] : ''}
                            // value={this.state.searchKm !== undefined && this.state.searchKm !== null && this.state.searchKm !== '' ? this.state.searchKm.split(',').slice(-3, -1)[0] !== undefined && this.state.searchKm.split(',').slice(-3, -1)[0] !== null ? this.state.searchKm.split(',').slice(-3, -1)[0] : '' + ", " + this.state.searchKm.split(',').slice(-2, -1)[0].split(' ')[1] !== undefined && this.state.searchKm.split(',').slice(-2, -1)[0].split(' ')[1] !== null ? this.state.searchKm.split(',').slice(-2, -1)[0].split(' ')[1] : '' : ''}
                            placeholder="Brampton within 200km"
                            onChange={this.handleOnChange}
                          />
                          <i className="icon-subtract-icon" ></i>
                        </div>
                        <button type="button" onClick={this.searchPost}>Search</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
          <div className="search-main-holder">
            {/* style={{ display: `${this.state.toggleMobileView === false ? 'none' : ''}` }} */}
            <div className="filters-col" >
              {/** Mobile View */}
              <div className={this.state.toggleMobileView === true ? "LeftMenu-Container" : "LeftMenu-Container mobile-display-none"} >

                <div className="mobilesearch">
                  <div className="cross-list-mobile" onClick={() => this.setState({
                    ...this.state,
                    toggleMobileView: !this.state.toggleMobileView
                  })}></div>
                </div>

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
                        {item.location !== '' && item.location !== undefined && item.location !== null ? (<React.Fragment>
                          <li key={index}>
                            <a >
                              {item.location} <div className="Filter-Close" onClick={() => this.resetState('location', item.location)}></div>
                            </a>
                          </li>
                        </React.Fragment>) : null}
                        {item.sortBy !== '' && item.sortBy !== undefined && item.sortBy !== null ? (<React.Fragment>
                          <li key={index}>
                            <a >
                              {item.sortBy} <div className="Filter-Close" onClick={() => this.resetState('sortBy', item.sortBy)}></div>
                            </a>
                          </li>
                        </React.Fragment>) : null}
                        {item.priceFilter !== '' && item.priceFilter !== undefined && item.priceFilter !== null && Number(item.priceFilter) !== 0 ? (<React.Fragment>
                          <li key={index}>
                            <a >
                              {item.priceFilter} <div className="Filter-Close" onClick={() => this.resetState('priceFilter', item.priceFilter)}></div>
                            </a>
                          </li>
                        </React.Fragment>) : null}
                        {item.category !== '' && item.category !== undefined && item.category !== null ? (<React.Fragment>
                          <li key={index}>
                            <a >
                              {item.category} <div className="Filter-Close" onClick={() => this.resetState('typeOfVehicle', item.category)}></div>
                            </a>
                          </li>
                        </React.Fragment>) : null}
                        {item.subTypeName !== '' && item.subTypeName !== undefined && item.subTypeName !== null ? (<React.Fragment>
                          <li key={index}>
                            <a >
                              {item.subTypeName} <div className="Filter-Close" onClick={() => this.resetState('subTypeOfVehicle', item.subTypeName)}></div>
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
                        {item.yearFilter !== '' && item.yearFilter !== undefined && item.yearFilter !== null && Number(item.yearFilter) !== 0 ? (<React.Fragment>
                          <li key={index}>
                            <a >
                              {item.yearFilter} <div className="Filter-Close" onClick={() => this.resetState('yearFilter', item.yearFilter)}></div>
                            </a>
                          </li>
                        </React.Fragment>) : null}
                        {item.kilometerFilter !== '' && item.kilometerFilter !== undefined && item.kilometerFilter !== null && Number(item.kilometerFilter) !== 0 ? (<React.Fragment>
                          <li key={index}>
                            <a >
                              {item.kilometerFilter} <div className="Filter-Close" onClick={() => this.resetState('kilometerFilter', item.kilometerFilter)}></div>
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
                        {item.steering_type !== '' && item.steering_type !== undefined && item.steering_type !== null ? (<React.Fragment>
                          <li key={index}>
                            <a >
                              {item.steering_type} <div className="Filter-Close" onClick={() => this.resetState('steering_type', item.steering_type)}></div>
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
                        {item.transmission !== '' && item.transmission !== undefined && item.transmission !== null ? (<React.Fragment>
                          <li key={index}>
                            <a >
                              {item.transmission} <div className="Filter-Close" onClick={() => this.resetState('transmission', item.transmission)}></div>
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
                        {item.vehicleCylinder !== '' && item.vehicleCylinder !== undefined && item.vehicleCylinder !== null ? (<React.Fragment>
                          <li key={index}>
                            <a >
                              {item.vehicleCylinder} <div className="Filter-Close" onClick={() => this.resetState('vehicleCylinder', item.vehicleCylinder)}></div>
                            </a>
                          </li>
                        </React.Fragment>) : null}
                        {item.vehicleSeating !== '' && item.vehicleSeating !== undefined && item.vehicleSeating !== null ? (<React.Fragment>
                          <li key={index}>
                            <a >
                              {item.vehicleSeating} <div className="Filter-Close" onClick={() => this.resetState('vehicleSeating', item.vehicleSeating)}></div>
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
                        {item.vehicleOwner !== '' && item.vehicleOwner !== undefined && item.vehicleOwner !== null ? (<React.Fragment>
                          <li key={index}>
                            <a >
                              {item.vehicleOwner === 'one_owner' ? 'One Owner' : item.vehicleOwner === 'multiple_owner' ? 'Multiple Owner' : 'Both Owners'} <div className="Filter-Close" onClick={() => this.resetState('vehicleOwner', item.vehicleOwner)}></div>
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
                        {item.vehicleAccident !== '' && item.vehicleAccident !== undefined && item.vehicleAccident !== null ? (<React.Fragment>
                          <li key={index}>
                            <a >
                              {item.vehicleAccident === 'previously_accidented' ? 'Previously Accidented' : item.vehicleAccident === 'no_accidented' ? 'No Accident Reported' : 'Both Accidents'} <div className="Filter-Close" onClick={() => this.resetState('vehicleAccident', item.vehicleAccident)}></div>
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


                <div className="MobileSearch mb-0">
                  <div className="mobile-location-input">
                    <input type="text" id="searchKm" name="searchKm" placeholder="Add location" value={this.state.searchKm !== undefined && this.state.searchKm !== null && this.state.searchKm !== '' ? this.state.searchKm.split(',').slice(-3, -1)[0] + ", " + this.state.searchKm.split(',').slice(-2, -1)[0].split(' ')[1] : ''} onChange={this.handleOnChange} />
                    <i className="icon-subtract-icon"></i>
                  </div>


                  <div className="range-slider-mobile-view">
                    <h1>Distance</h1>
                    <h2>Range <span>{this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 ? this.state.rangeSlider[0] : 0}km - {this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 ? this.state.rangeSlider[1] : 0}km</span></h2>
                    <Range allowCross={false} max={400} min={0} defaultValue={this.state.rangeSlider} draggableTrack onChange={log} />
                  </div>


                  <div className="filter-reset-button">
                    <button type="button" onClick={this.resetAllState}>Reset</button>
                    <button type="button" className="active float-right" onClick={this.searchPost}>Apply {this.props.selected_filter_list.length !== 0 && this.props.selected_filter_list !== undefined ? this.props.selected_filter_list.length : 0} Filters</button>
                  </div>

                </div>


                <div className="MobileSearch mb-2">
                  <label className="mobile-check-btn">All of Canada
                  <input type="checkbox" onChange={this.handleOnChack} checked={this.state.checkAllCanda} name='checkAllCanda' />
                    <span className="mobilemark"></span>
                  </label>
                </div>


                <div className="accordion" id="accordionExample">
                  {this.state.allowFilters.map((mainFilter, index) => (
                    <React.Fragment key={index}>

                      {mainFilter.price === true ? (<div className="card">
                        <div className="card-header" id="headingOne">
                          <h2 className="mb-0">
                            <button
                              className="btn btn-link btn-block text-left collapsed"
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
                          className="collapse"
                          aria-labelledby="headingOne"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            {this.state.paymentPrice == 'p' ? (<React.Fragment>
                              <div className="filter-two-col price-main clearfix">
                                <div className="filters-inner-col">
                                  <label>Min</label>
                                  <NumberFormat
                                    className="form-control" id="fromRange" name="fromRange"
                                    value={this.state.fromRange}
                                    decimalScale={2}
                                    prefix={'$'}
                                    onChange={this.handleOnChange}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    placeholder='Min'
                                    onBlur={this.blurOnPrice}
                                  />
                                </div>
                                <div className="filters-inner-col">
                                  <label>Max</label>
                                  {this.props.showloaderValues === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null}
                                  <NumberFormat
                                    className="form-control" id="toRange" name="toRange"
                                    value={this.state.toRange}
                                    decimalScale={2}
                                    prefix={'$'}
                                    onChange={this.handleOnChange}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    placeholder='Max'
                                    onBlur={this.blurOnPrice}
                                  />
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
                                      <div title={(item.name)} className={item.id === this.state.typeOfVehicle ? 'vehicle-type-box active' : 'vehicle-type-box'} onClick={(() => this.handleOnClick('typeOfVehicle', item.id))}>
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
                                        </div>
                                        <div className='vehicle-type-description'>
                                          <strong>{(item.name)} {item.vt_count !== undefined && item.vt_count !== null && Number(item.vt_count) !== 0 ? (<span>({item.vt_count})</span>) : <span>(0)</span>}</strong>
                                        </div>
                                      </div>
                                    </div>
                                  </React.Fragment>
                                )
                              })}
                              <div className="filters-inner-col">
                                <div title={'All Vehicles'} className={this.state.typeOfVehicle === 'All Vehicles' ? 'vehicle-type-box active' : 'vehicle-type-box'} onClick={(() => this.handleOnClick('typeOfVehicle', 'All Vehicles'))}>
                                  <div className="vehicle-type-image view-all-icon">
                                    <img src="/assets/image/finance-that-tag.svg" alt="" />
                                  </div>
                                  <div className='vehicle-type-description'>
                                    <strong>{'All Vehicles'}
                                      {/* {item.vt_count !== undefined && item.vt_count !== null && Number(item.vt_count) !== 0 ? (<span>({item.vt_count})</span>) : <span>(0)</span>} */}
                                    </strong>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {Number(this.state.typeOfVehicle) === 9 ? (<div className="card">
                        <div className="card-header" id="headingTwo">
                          <h2 className="mb-0">
                            <button
                              className="btn btn-link btn-block text-left collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseSubType"
                              aria-expanded="true"
                              aria-controls="collapseSubType"
                            >
                              Type of Powersport
</button>
                          </h2>
                        </div>

                        <div
                          id="collapseSubType"
                          className="collapse"
                          aria-labelledby="headingTwo"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            {(this.state.type_of_vehicle || []).length === 0 ? (<div className="filters-preloader">
                              <div className="spinner"></div>
                            </div>) : null}
                            <div className={(this.state.type_of_vehicle || []).length === 0 ? "filter-two-col filters-vehicle-type clearfix" : "filter-two-col filters-vehicle-type clearfix show"}>
                              {(this.state.type_of_vehicle || []).filter((item, index) => (
                                Number(item.id) === 9)).map(item => (item.typeofvehicle_id || []).map((subItem, subIndex) => {
                                  return (<React.Fragment key={index}>
                                    <div className="filters-inner-col">
                                      <div title={(subItem.name)} className={subItem.id === this.state.subTypeOfVehicle ? 'vehicle-type-box active' : 'vehicle-type-box'} onClick={(() => this.handleOnClick('subTypeOfVehicle', subItem.id))}>
                                        <div className="vehicle-type-image">
                                          {subItem.name.toUpperCase() === ('ATV/UTV').toUpperCase() || subItem.name.toUpperCase() === ('ATVS/UTVS').toUpperCase() ? <img src="/assets/image/ATVUTV.svg" alt={subItem.name} /> : subItem.name.toUpperCase() === ('Watercraft').toUpperCase() || subItem.name.toUpperCase() === ('Watercrafts').toUpperCase() ? <img src="/assets/image/Watercraft.svg" alt={subItem.name} /> : subItem.name.toUpperCase() === ('Snowmobile').toUpperCase() || subItem.name.toUpperCase() === ('Snowmobiles').toUpperCase() ? <img src="/assets/image/snowmobile.svg" alt={subItem.name} /> : ''}
                                        </div>
                                        <div className='vehicle-type-description'>
                                          <strong>{subItem.name}{item.st_count !== undefined && item.st_count !== null && Number(item.st_count) !== 0 ? (<span>({item.st_count})</span>) : <span>(0)</span>}
                                          </strong>
                                        </div>
                                      </div>
                                    </div>
                                  </React.Fragment>)
                                }))}
                            </div>
                          </div>
                        </div>
                      </div>
                      ) : null}
                      {mainFilter.make === true ? ((this.state.vehicle_make || []) !== undefined && (this.state.vehicle_make || []) !== null && this.state.typeOfVehicle !== '' && this.state.typeOfVehicle !== 'All Vehicles' ? (<div className="card">
                        <div className="card-header" id="headingThree">
                          <h2 className="mb-0">
                            <button
                              className="btn btn-link btn-block text-left collapsed"
                              type="button"
                              data-toggle="collapse"
                              // data-target={(this.state.vehicle_make || []).length > 0 ? "#collapseThree" : ''}
                              data-target="#collapseThree"
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
                            {this.props.removeLoaderMake === false ? (<div className="filters-preloader">
                              <div className="spinner"></div>
                            </div>) : null}
                            <div className="collapse show" id="collapseMenu">
                              <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="MakeMenu-List filters-list">
                                {/* <h1>POPULAR MAKES</h1> */}
                                <ul>
                                  <li onClick={(() => this.handleOnClick('vehicleMake', 'all_makes'))} className={this.state.vehicleMake === 'all_makes' ? 'active' : ''}>
                                    <a >
                                      <span className="bullet"></span>
                                      {'All Makes'}{(this.state.vehicle_make || []) !== undefined && (this.state.vehicle_make || []) !== null && (this.state.vehicle_make || []).length > 0 ? (this.state.vehicle_make || [])[0] !== undefined && (this.state.vehicle_make || [])[0] !== null ? (this.state.vehicle_make || [])[0].total_makes !== undefined && (this.state.vehicle_make || [])[0].total_makes !== null && Number((this.state.vehicle_make || [])[0].total_makes) !== 0 ? <span>({(this.state.vehicle_make || [])[0].total_makes})</span> : <span>(0)</span> : <span></span> : <span></span>}
                                    </a>
                                  </li>
                                  {(this.state.vehicle_make || []).map((item, index) => {
                                    return (
                                      <li key={index} onClick={(() => this.handleOnClick('vehicleMake', item.id))} className={item.id === this.state.vehicleMake ? 'active' : ''}>
                                        <a >
                                          <span className="bullet"></span>
                                          {(item.make_name)}{item.mk_count !== undefined && item.mk_count !== null && Number(item.mk_count) !== 0 ? <span>({item.mk_count})</span> : <span>(0)</span>}
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

                      {mainFilter.model === true ? ((this.state.vehicle_model || []) !== undefined && (this.state.vehicle_model || []) !== null && this.state.vehicleMake !== '' && this.state.vehicleMake !== 'all_makes' ? (<div className="card">
                        <div className="card-header" id="headingFour">
                          <h2 className="mb-0">
                            <button
                              className="btn btn-link btn-block text-left collapsed"
                              type="button"
                              data-toggle="collapse"
                              // data-target={(this.state.vehicle_model || []).length > 0 ? "#collapseFour" : ''}
                              data-target='#collapseFour'
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
                            {this.props.removeLoaderModel === false ? (<div className="filters-preloader">
                              <div className="spinner"></div>
                            </div>) : null}
                            <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                              <ul>
                                {(this.state.vehicle_model || []).map((item, index) => {
                                  return (
                                    <li key={index} onClick={() => this.handleOnClick("vehicleModel", item.id)} className={this.state.vehicleModel == item.id ? 'active' : ''}>
                                      <a >
                                        <span className="bullet"></span>
                                        {(item.model_make)}{item.md_count !== undefined && item.md_count !== null && Number(item.md_count) !== 0 ? <span>({item.md_count})</span> : <span>(0)</span>}

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

                      {mainFilter.trim === true ? ((this.props.vehicle_trims || []) !== undefined && (this.props.vehicle_trims || []) !== null && this.state.vehicleModel !== '' ? (<div className="card ">
                        <div className="card-header" id="headingFive">
                          <h2 className="mb-0">
                            <button
                              className="btn btn-link btn-block text-left collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target={(this.props.vehicle_trims || []).length > 0 ? "#collapseFive" : ''}
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
                                          {(item.v_trim !== undefined && item.v_trim !== null ? item.v_trim : '')}
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

                      {mainFilter.year === true ? (<div className="card">
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
                                <Select
                                  isSearchable={false}
                                  className="banner-react-select-main"
                                  classNamePrefix="banner-react-select"
                                  closeMenuOnSelect
                                  options={this.state.fromYearDropDown}
                                  required
                                  name="selectedFromYear"
                                  value={this.state.selectedFromYear}
                                  onChange={(e) => this.handleChangeSelect(e, 'selectedFromYear', 'fromYear')}
                                />
                                {/* <input type="text" className="form-control" id="fromYear" name="fromYear" value={this.state.fromYear} onChange={this.handleOnChange} /> */}
                              </div>
                              <div className="filters-inner-col">
                                <label>To</label>
                                {this.props.showloaderValues === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null}
                                <Select
                                  isSearchable={false}
                                  className="banner-react-select-main"
                                  classNamePrefix="banner-react-select"
                                  closeMenuOnSelect
                                  options={this.state.yearsDropDown}
                                  required
                                  name="selectedToYear"
                                  value={this.state.selectedToYear}
                                  onChange={(e) => this.handleChangeSelect(e, 'selectedToYear', 'toYear')}
                                />
                                {/* <input type="text" className="form-control" id="toYear" name="toYear" value={this.state.toYear} onChange={this.handleOnChange} /> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      ) : null}

                      {mainFilter.body_type === true ? (this.props.vehicle_body !== undefined && this.props.vehicle_body !== null && this.state.typeOfVehicle !== '' && this.state.typeOfVehicle !== 'All Vehicles' ? (<div className="card">
                        <div className="card-header" id="headingSix">
                          <h2 className="mb-0">
                            <button
                              className="btn btn-link btn-block text-left collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target={(this.props.vehicle_body || []).length > 0 ? "#body-style" : ""}
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
                                <div onClick={() => this.handleOnClick("vehicleBody", item.id)} className={this.state.vehicleBody === item.id ? "filters-inner-col active" : "filters-inner-col"}>
                                  <div title="" className="vehicle-type-box">
                                    <div className="vehicle-type-image">
                                      <img src={item.image_path} alt="" />
                                    </div>
                                    <div className="vehicle-type-description">
                                      <strong>{item.body_type}
                                        {item.bt_count !== undefined && item.bt_count !== null && Number(item.bt_count) !== 0 ? (<span>({item.bt_count})</span>) : <span>(0)</span>}
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

                      {mainFilter.kilometer === true ? (<div className="card">
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
                                <NumberFormat
                                  className='form-control'
                                  value={this.state.fromKilometer}
                                  id="fromKilometer" placeholder="Min"
                                  name="fromKilometer"
                                  onChange={this.handleOnChange}
                                  thousandSeparator={true}
                                  allowNegative={false}
                                  onBlur={this.blurOnKilometer}
                                />
                                {/* <input type="text" className="form-control" id="fromKilometer" name="fromKilometer" value={this.state.fromYear} onChange={this.handleOnChange} /> */}
                              </div>
                              <div className="filters-inner-col">
                                <label>To</label>
                                {this.props.showloaderValues === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null}
                                <NumberFormat
                                  className='form-control'
                                  value={this.state.toKilometer}
                                  id="toKilometer" placeholder="Max"
                                  name="toKilometer"
                                  onChange={this.handleOnChange}
                                  thousandSeparator={true}
                                  allowNegative={false}
                                  onBlur={this.blurOnKilometer}
                                />
                                {/* <input type="text" className="form-control" id="toKilometer" name="toKilometer" min="0" onBlur={this.blurOnKilometer} value={this.state.toKilometer} onChange={this.handleOnChange} /> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      ) : null}

                      {mainFilter.condition === true ? (<div className="card">
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
                                  Pre-owned
<input type="checkbox" checked={this.state.selectCondition === 'Pre-owned'} name='selectCondition' value={'Pre-owned'} onChange={this.handleOnChange} />
                                  <span className="filtersCheckmark"></span>
                                </label>
                              </div>
                              <div className="filters-inner-col">
                                <label className="checkMarkContainer">
                                  Both
<input type="checkbox" checked={this.state.selectCondition === 'Both Conditions'} name='selectCondition' value={'Both Conditions'} onChange={this.handleOnChange} />
                                  <span className="filtersCheckmark"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      ) : null}

                      {mainFilter.transmission === true ? (<div className="card">
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
                              <div className="filters-inner-col">
                                <label className="checkMarkContainer">
                                  Both
<input type="checkbox" checked={this.state.transmission === 'Both Transmissions'} name='transmission' value={'Both Transmissions'} onChange={this.handleOnChange} />
                                  <span className="filtersCheckmark"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      ) : null}

                      {mainFilter.vin === true ? (<div className="card">
                        <div className="card-header" id="headingNine">
                          <h2 className="mb-0">
                            <button
                              className="btn btn-link btn-block text-left collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseVin"
                              aria-expanded="true"
                              aria-controls="collapseVin"
                            >
                              Vin
</button>
                          </h2>
                        </div>

                        <div
                          id="collapseVin"
                          className="collapse"
                          aria-labelledby="headingNine"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <div className="filter-two-col filters-kilometers-main clearfix">
                              <div className="filters-inner-col">
                                <label>Vin</label>
                                <NumberFormat
                                  className='form-control'
                                  value={this.state.vin}
                                  id="vin"
                                  name="vin"
                                  onChange={this.handleOnChange}
                                  onBlur={this.blurOnVin}
                                />

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      ) : null}

                      {mainFilter.engineCC === true ? (<div className="card">
                        <div className="card-header" id="headingNine">
                          <h2 className="mb-0">
                            <button
                              className="btn btn-link btn-block text-left collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseEngineCC"
                              aria-expanded="true"
                              aria-controls="collapseEngineCC"
                            >
                              Engine CC
</button>
                          </h2>
                        </div>

                        <div
                          id="collapseEngineCC"
                          className="collapse"
                          aria-labelledby="headingNine"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <div className="filter-two-col filters-kilometers-main clearfix">
                              <div className="filters-inner-col">
                                <label>To Engine CC</label>
                                <NumberFormat
                                  className='form-control'
                                  value={this.state.start_ec}
                                  id="start_ec"
                                  name="start_ec"
                                  onChange={this.handleOnChange}
                                  onBlur={this.blurOnEngineCC}
                                />

                              </div>
                              <div className="filters-inner-col">
                                <label>From Engine CC</label>
                                <NumberFormat
                                  className='form-control'
                                  value={this.state.end_ec}
                                  id="end_ec"
                                  name="end_ec"
                                  onChange={this.handleOnChange}
                                  onBlur={this.blurOnEngineCC}
                                />

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      ) : null}

                      {mainFilter.hours === true ? (<div className="card">
                        <div className="card-header" id="headingNine">
                          <h2 className="mb-0">
                            <button
                              className="btn btn-link btn-block text-left collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseHours"
                              aria-expanded="true"
                              aria-controls="collapseHours"
                            >
                              Hours
</button>
                          </h2>
                        </div>

                        <div
                          id="collapseHours"
                          className="collapse"
                          aria-labelledby="headingNine"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <div className="filter-two-col filters-kilometers-main clearfix">
                              <div className="filters-inner-col">
                                <label>Vin</label>
                                <NumberFormat
                                  className='form-control'
                                  value={this.state.hours}
                                  id="hours"
                                  name="hours"
                                  onChange={this.handleOnChange}
                                  onBlur={this.blurOnHours}
                                />

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      ) : null}


                      {mainFilter.fuel_type === true ? (this.props.vehicle_fuel_type !== undefined && this.props.vehicle_fuel_type !== null ? (<div className="card">
                        <div className="card-header" id="headingFuelType">
                          <h2 className="mb-0">
                            <button
                              className="btn btn-link btn-block text-left collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target={(this.props.vehicle_fuel_type || []).length > 0 ? "#fuelType" : ""}
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
                            {this.props.loaderFuelType !== undefined && this.props.loaderFuelType !== null && this.props.loaderFuelType === true ? (<div className="filters-preloader">
                              <div className="spinner"></div>
                            </div>) : null}
                            <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                              <ul>
                                <li key={index} onClick={() => this.handleOnClick("vehicleFuelType", 'All Fuel Types')} className={(this.state.vehicleFuelType) === 'All Fuel Types' ? 'active' : ''}>
                                  <a >
                                    <span className="bullet"></span>
                                    {'All Fuel Types'}
                                  </a>
                                </li>
                                {(this.props.vehicle_fuel_type || []).map((item, index) => {
                                  return (
                                    <li key={index} onClick={() => this.handleOnClick("vehicleFuelType", item.id)} className={Number(this.state.vehicleFuelType) === Number(item.id) ? 'active' : ''}>
                                      <a >
                                        <span className="bullet"></span>
                                        {(item.fuel_type)}
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

                      {mainFilter.drive_train === true ? (this.props.vehicle_drive_train !== undefined && this.props.vehicle_drive_train !== null ? (<div className="card">
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
                                <li key={index} onClick={() => this.handleOnClick("vehicleDriveTrain", 'All Drive Traim')} className={(this.state.vehicleDriveTrain) === ('All Drive Traim') ? 'active' : ''}>
                                  <a >
                                    <span className="bullet"></span>
                                    {'All Drive Traim'}
                                  </a>
                                </li>
                                {(this.props.vehicle_drive_train || []).map((item, index) => {
                                  return (
                                    <li key={index} onClick={() => this.handleOnClick("vehicleDriveTrain", item.id)} className={Number(this.state.vehicleDriveTrain) === Number(item.id) ? 'active' : ''}>
                                      <a >
                                        <span className="bullet"></span>
                                        {(item.drive_train)}
                                      </a>
                                    </li>
                                  )
                                })}
                              </ul>
                            </Scrollbars>
                          </div>
                        </div>
                      </div>) : null) : null}

                      {mainFilter.cylinder === true ? (<div className="card">
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

                                <li key={index} onClick={() => this.handleOnClick("vehicleCylinder", 'All Cylinder')} className={(this.state.vehicleCylinder) === ('All Cylinder') ? 'active' : ''}>
                                  <a >
                                    <span className="bullet"></span>
                                    {'All Cylinder'}
                                  </a>
                                </li>
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

                      {mainFilter.seating === true ? (<div className="card">
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
                                <li key={index} onClick={() => this.handleOnClick("vehicleSeating", 'All Seating')} className={(this.state.vehicleSeating) === ('All Seating') ? 'active' : ''}>
                                  <a >
                                    <span className="bullet"></span>
                                    {'All Seating'}
                                  </a>
                                </li>
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

                      {mainFilter.passengers === true ? (<div className="card">
                        <div className="card-header" id="headingCylinders">
                          <h2 className="mb-0">
                            <button
                              className="btn btn-link btn-block text-left collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#VehiclePassenger"
                              aria-expanded="true"
                              aria-controls="VehiclePassenger"
                            >
                              Passengers
</button>
                          </h2>
                        </div>

                        <div
                          id="VehiclePassenger"
                          className="collapse"
                          aria-labelledby="headingCylinders"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                              <ul>
                                {(passengers || []).map((item, index) => {
                                  return (
                                    <li key={index} onClick={() => this.handleOnClick("vehiclePassenger", item.value)} className={Number(this.state.vehiclePassenger) === Number(item.value) ? 'active' : ''}>
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

                      {mainFilter.steering_type === true ? (
                        <div className="card">
                          <div className="card-header" id="headingEleven">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left collapsed"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseElevenSteeringType"
                                aria-expanded="true"
                                aria-controls="collapseElevenSteeringType"
                              >
                                Steering Type
</button>
                            </h2>
                          </div>

                          <div
                            id="collapseElevenSteeringType"
                            className="collapse"
                            aria-labelledby="headingEleven"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <div className="seller-type-List filters-list">
                                <ul>
                                  {(steeringTypes || []).map(item => (
                                    <li className={item.name === this.state.steering_type ? "active" : ""} onClick={() => this.handleOnClick("steering_type", item.name)}>
                                      <a >
                                        <span className="bullet"></span>
                                        {item.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>



                            </div>
                          </div>
                        </div>
                      ) : null}


                      {mainFilter.color === true ? (<div className="card">
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
                                  this.state.color === "All Color"
                                    ? "ColorPost-Container active"
                                    : "ColorPost-Container"
                                }
                                onClick={() =>
                                  this.handleOnClick("color", "All Color")
                                }

                              >
                                <div className="color-box">
                                  <h1>
                                    <span>Show All</span>
                                  </h1>
                                </div>
                              </div>
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

                      {mainFilter.owners === true ? (<div className="card">
                        <div className="card-header" id="headingOwnersAccidents">
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
                          aria-labelledby="headingOwnersAccidents"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body min-height-auto">
                            <div className="filters-list accident-main">
                              <ul>
                                <li>
                                  <label className="checkMarkContainer">
                                    One Owner
  <input type="checkbox" checked={this.state.vehicleOwner === 'one_owner'} name='vehicleOwner' value="one_owner" onChange={this.handleOnChange} />
                                    <span className="filtersCheckmark"></span>
                                  </label>
                                </li>
                                <li>
                                  <label className="checkMarkContainer">
                                    Multiple Owner
  <input type="checkbox" checked={this.state.vehicleOwner === 'multiple_owner'} name='vehicleOwner' value="multiple_owner" onChange={this.handleOnChange} />
                                    <span className="filtersCheckmark"></span>
                                  </label>
                                </li>
                                <li>
                                  <label className="checkMarkContainer">
                                    Both
  <input type="checkbox" checked={this.state.vehicleOwner === 'Both Owners'} name='vehicleOwner' value="Both Owners" onChange={this.handleOnChange} />
                                    <span className="filtersCheckmark"></span>
                                  </label>
                                </li>
                              </ul>
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
                            <div className="card-body min-height-auto">
                              <div className="filters-list accident-main">
                                <ul>
                                  <li>
                                    <label className="checkMarkContainer">
                                      Private Seller
  <input type="checkbox" checked={Number(this.state.seller_type) === Number(1)} name='seller_type' value={1} onChange={this.handleOnChange} />
                                      <span className="filtersCheckmark"></span>
                                    </label>
                                  </li>
                                  <li>
                                    <label className="checkMarkContainer">
                                      Dealer
  <input type="checkbox" checked={Number(this.state.seller_type) === Number(2)} name='seller_type' value={2} onChange={this.handleOnChange} />
                                      <span className="filtersCheckmark"></span>
                                    </label>
                                  </li>
                                  <li>
                                    <label className="checkMarkContainer">
                                      Both
  <input type="checkbox" checked={(this.state.seller_type) === ('Both Seller type')} name='seller_type' value={'Both Seller type'} onChange={this.handleOnChange} />
                                      <span className="filtersCheckmark"></span>
                                    </label>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {/* <div className="card-body">
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



                            </div> */}
                          </div>
                        </div>
                      ) : null}

                      {mainFilter.accident === true ? (<div className="card">
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
                                    No Accident Reported
  <input type="checkbox" checked={this.state.vehicleAccident === 'no_accidented'} name='vehicleAccident' value="no_accidented" onChange={this.handleOnChange} />
                                    <span className="filtersCheckmark"></span>
                                  </label>
                                </li>
                                <li>
                                  <label className="checkMarkContainer">
                                    Both
  <input type="checkbox" checked={this.state.vehicleAccident === 'Both Accidents'} name='vehicleAccident' value="Both Accidents" onChange={this.handleOnChange} />
                                    <span className="filtersCheckmark"></span>
                                  </label>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      ) : null}

                      {mainFilter.features === true ? (this.props.vehicle_features !== undefined && this.props.vehicle_features !== null && this.state.typeOfVehicle !== '' && this.state.typeOfVehicle !== 'All Vehicles' ? (<div className="card">
                        <div className="card-header" id="heading13">
                          <h2 className="mb-0">
                            <button
                              className="btn btn-link btn-block text-left collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target={(this.props.vehicle_features || []).length > 0 ? "#collapse13" : ''}
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

              {/** Mobile view End */}

              {/* <AdPostSearchMobileView {...this.props} toggleMobileView={this.state.toggleMobileView} /> */}
            </div>

            {this.state.viewList == "list" ? <ListView  {...this.props} /> : (<React.Fragment><TopAdPost  {...this.props} /><GridView  {...this.props} sortBy={this.state.sortBy} handleOnChange={this.handleOnChange} /></React.Fragment>)}
          </div>
          <GoogleMapModelSearch setLocation={this.setLocation} setDistance={this.setDistance} {...this.state} />

        </section>
      </React.Fragment >
    );
  }
}
const mapStateToProps = (state) => {
  return {
    add_post_list: state.adPostReducers.listPostReducer.add_post_list,
    post_list_filters: state.adPostReducers.listPostReducer.post_list_filters,
    type_of_vehicles: state.adPostReducers.addPostReducer.type_of_vehicle,
    vehicle_features: state.adPostReducers.addPostReducer.vehicle_features,
    selected_filter_list: state.adPostReducers.listPostReducer.selected_filter_list,
    removeLoaderTrims: state.adPostReducers.addPostReducer.removeLoaderTrims,
    vehicle_trims: state.adPostReducers.addPostReducer.vehicle_trims,
    showListSearchLoader: state.adPostReducers.listPostReducer.showListSearchLoader,
    vehicle_body: state.adPostReducers.addPostReducer.vehicle_body,
    vehicle_drive_train: state.adPostReducers.addPostReducer.vehicle_drive_train,
    vehicle_fuel_type: state.adPostReducers.addPostReducer.vehicle_fuel_type,
    vehicle_make: state.adPostReducers.addPostReducer.vehicle_make,
    removeLoaderMake: state.adPostReducers.addPostReducer.removeLoaderMake,
    vehicle_model: state.adPostReducers.addPostReducer.vehicle_model,
    removeLoaderModel: state.adPostReducers.addPostReducer.removeLoaderModel,
    loaderBodyType: state.adPostReducers.addPostReducer.loaderBodyType,
    loaderFuelType: state.adPostReducers.addPostReducer.loaderFuelType,
    loaderDriveTrain: state.adPostReducers.addPostReducer.loaderDriveTrain,
    loaderFeatures: state.adPostReducers.addPostReducer.loaderFeatures,
    showloaderValues: state.adPostReducers.listPostReducer.showloaderValues,
    get_search_values: state.adPostReducers.listPostReducer.get_search_values,
    top_ads: state.adPostReducers.listPostReducer.top_ads,
    top_ads_loading: state.adPostReducers.listPostReducer.top_ads_loading,
    nextLoadMoreUrl: state.adPostReducers.listPostReducer.nextLoadMoreUrl,
    next_post_loading: state.adPostReducers.listPostReducer.next_post_loading,
  }
}
export default connect(mapStateToProps, {
  get_post_list, get_vehicle_type,
  get_vehicle_make,
  get_vehicle_model,
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
  get_vehicle_body_type,
  get_list_filter_values,
  remove_specific_state,
  get_sub_type_vehicle_make,
  get_top_ads,
  next_url_call
})(AdPostSearch);
