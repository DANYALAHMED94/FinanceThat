import React, { Component, PureComponent } from "react";
import GridView from "../../components/listingViews/GridView.jsx";
import ListView from "../../components/listingViews/ListView.jsx";
import { Scrollbars } from "react-custom-scrollbars";
import AddDetails from "../AddDetails.jsx";
import {
  get_post_list,
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
  next_url_call,
  get_vehicle_type,
  get_vehicle_make,
  get_vehicle_model,
  get_multi_vehicle_models,
  get_user_profile_data,
  get_vehicle_make_sub_type,
  get_dealer_profile_data,
} from "../../actions/listPostActions";
import {
  get_vehicle_feature,
  get_vehicle_trims,
  toggle_vehicle_features,
  remove_all_features,
  remove_all,
  get_vehicle_fuel_type,
  get_vehicle_drive_train,
  get_vehicle_body_type,
  remove_specific_state,
  remove_selected_features,
} from "../../actions/addPostActions";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import MaskedInput from "react-text-mask";
import {
  steeringTypes,
  seatings,
  passengers,
  cylinders,
  sortData,
} from "./filterConstants";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import GoogleMapModelSearch from "../../components/googleMap/GoogleMapModelSearch";
import $ from "jquery";
import { API_URL } from "../../constant";
import { Helmet } from "react-helmet";

class DealerList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addPostId: null,
      viewList: "grid",
      searchKm: "",
      search: "",
      category: "",
      sortBy: "",
      sortBySelected: { name: "", value: "", label: "ALL" },
      // fromRange: 0,
      fromRange: "",
      toRange: "",
      seller_type: [
        { name: "Private Seller", value: 1 },
        { name: "Dealer", value: 2 },
      ],
      selectAllSellerType: true,
      featureName: "",
      color: "All Color",
      transmission: [
        { name: "Automatic", value: "Automatic" },
        { name: "Manual", value: "Manual" },
      ],
      selectAllTransmission: true,
      selectedTransmission: [],
      transmissionId: "",
      selectTrim: "",
      toYear: new Date().getFullYear() + 1,
      fromYear: 1990,
      vehicleMake: "",
      fromKilometer: "",
      toKilometer: "",
      vehicleModel: "",
      typeOfVehicle: "All Vehicles",
      selectCondition: [
        { name: "New", value: "New", id: "New" },
        { name: "Pre-owned", value: "Pre-owned", id: "Used" },
      ],
      selectAllCondition: true,
      selectedConditions: [],
      conditionId: "",
      type_of_vehicle: [],
      vehicle_make: [],
      vehicle_model: [],
      categoryFilterName: "",
      makeFilterName: "",
      modelFilterName: "",
      latitude: "",
      longitude: "",
      start_pay: "",
      paymentPrice: "p",
      end_pay: "",
      vehicleFuelType: [],
      selectAllFuelType: true,
      selectedFuelType: [],
      fuelTypeId: "",
      vehicleDriveTrain: [],
      selectAllDriveTrain: true,
      vehicleCylinder: cylinders.map((item) => {
        return {
          name: item.value,
          value: item.value,
        };
      }),
      selectAllCylinder: true,
      vehicleSeating: seatings.map((item) => {
        return {
          name: item.label,
          value: item.value,
        };
      }),
      selectAllSeating: true,
      colors: [
        { name: "Green", value: "Green", className: "ColorGreen" },
        { name: "Yellow", value: "Yellow", className: "ColorYellow" },
        { name: "Orange", value: "Orange", className: "ColorOrange" },
        { name: "Purple", value: "Purple", className: "ColorPurple" },
        { name: "Blue", value: "Blue", className: "ColorBlue" },
        { name: "Silver", value: "Silver", className: "ColorSilver" },
        { name: "Black", value: "Black", className: "ColorBlack" },
        { name: "Red", value: "Red", className: "ColorRed" },
        { name: "Gold", value: "Gold", className: "ColorGold" },
        { name: "Grey", value: "Grey", className: "ColorGrey" },
        { name: "Biege", value: "Biege", className: "ColorBiege" },
        { name: "Brown", value: "Brown", className: "ColorBrown" },
      ],
      selectAllColor: true,
      vehicleBody: [],
      selectedBodyType: [],
      selectedBodyTypeId: "",
      selectAllVehicleBody: true,
      vehicleAccident: [
        {
          name: "Previously Accidented",
          value: "previously_accidented",
          id: 1,
        },
        { name: "No Accident Reported", value: "no_accidented", id: 0 },
      ],
      selectAllAccident: true,
      vehicleOwner: [
        { name: "One Owner", value: "one_owner", id: 1 },
        { name: "Multiple Owner", value: "multiple_owner", id: 2 },
      ],
      selectAllOwner: true,
      vin: "",
      start_ec: "",
      end_ec: "",
      hours: "",
      vehiclePassenger: passengers.map((item) => {
        return {
          value: item.value,
          name: item.label,
        };
      }),
      selectAllPassenger: true,
      toggleMobileView: false,
      steering_type: steeringTypes.map((item) => {
        return {
          name: item.name,
          value: item.name,
        };
      }),
      selectAllSteering: true,
      subTypeOfVehicle: "",
      yearsDropDown: [],
      fromYearDropDown: [],
      // distance: this.props.location.query !== undefined ? this.props.location.query.distance !== undefined ? this.props.location.query.distance : '' : '',
      distance: 0,
      selectedToYear: [
        {
          label: new Date().getFullYear(),
          value: new Date().getFullYear(),
        },
      ],
      selectedFromYear: [{ label: "1990", value: 1990 }],
      rangeSlider: [0, 0],
      checkAllCanda: false,
      typeOfVehicles: [],
      selectedTypeOfVehicle: "",
      p_size: 30,
      t_p_size: 10,
      sort_by_filters: sortData,
      allTrims: [],
      selectAllTrims: true,
      allModels: [],
      selectAllModels: true,
      allMakes: [],
      selectAllMakes: true,
      newMakeId: "",
      oldMakeId: "",
      subTypeVehicle: [],
      selectAllSubTypeVehicle: true,
      newVehicleId: "",
      oldVehicleId: "",
      selectedSeating: [],
      selectedSeatingId: "",
      selectedColor: [],
      selectedColorId: "",
      selectedOwners: [],
      selectedOwnerId: "",
      selectedSellerType: [],
      selectedSellerId: "",
      selectedAccident: [],
      selectedAccidentId: "",
      selectedDriveTrain: [],
      driveTrainId: "",
      selectedCylinderId: "",
      selectedCylinder: [],
      selectedPassenger: [],
      selectedPassengerId: "",
      selectedSteering: [],
      selectedSteeringTypeId: "",
      selectedSubTypes: [],
      selectedMakeId: "",
      selectedMakes: [],
      selectedModel: [],
      selectedModelId: "",
      selectedTrim: [],
      selectedTrimId: "",
      subTypeId: "",
      start_hours: "",
      end_hours: "",
      start_length: "",
      end_length: "",
      start_weight: "",
      end_weight: "",
      hull_material: "",
      hullMaterials: [
        { name: "Aluminum", value: "Aluminum" },
        { name: "Composite", value: "Composite" },
        { name: "Ferro-cement", value: "Ferro-cement" },
        { name: "Fiberglass", value: "Fiberglass" },
        { name: "Hypalon", value: "Hypalon" },
        { name: "PVC", value: "PVC" },
        { name: "Roplene", value: "Roplene" },
        { name: "Steel", value: "Steel" },
        { name: "Wood", value: "Wood" },
        { name: "Other", value: "Other" },
      ],
      selectAllHullMaterial: true,
      selectedHullMaterial: [],
      hullMaterialId: "",
      vehicleLoader: false,
      selectAllFeatures: true,
      filters: [
        {
          id: 7,
          name: "Automotive",
          make: true,
          model: true,
          trim: true,
          year: true,
          body_type: true,
          price: true,
          kilometer: true,
          condition: true,
          transmission: true,
          fuel_type: true,
          drive_train: true,
          cylinder: true,
          seating: true,
          color: true,
          seller_type: true,
          accident: true,
          owners: true,
          features: true,
          passenger: false,
          steering_type: false,
          vin: false,
          engineCC: false,
          hours: false,
          passengers: false,
          steering_types: false,
          length: false,
          hull_material: false,
          weight: false,
          engineName: "",
        },
        {
          id: 9,
          name: "Powersport",
          make: true,
          model: true,
          trim: false,
          year: true,
          body_type: false,
          price: true,
          kilometer: true,
          condition: true,
          transmission: true,
          fuel_type: false,
          drive_train: false,
          cylinder: false,
          seating: false,
          color: true,
          seller_type: true,
          accident: true,
          owners: true,
          features: true,
          passenger: false,
          steering_type: false,
          vin: false,
          engineCC: true,
          hours: true,
          passengers: false,
          steering_types: false,
          length: false,
          hull_material: false,
          weight: false,
          engineName: "Engine CC",
        },
        {
          id: 2,
          name: "Motorcycle",
          make: true,
          model: true,
          trim: false,
          year: true,
          body_type: false,
          price: true,
          kilometer: true,
          condition: true,
          transmission: false,
          fuel_type: false,
          drive_train: false,
          cylinder: false,
          seating: false,
          color: true,
          seller_type: true,
          accident: true,
          owners: true,
          features: true,
          passenger: false,
          steering_type: false,
          vin: false,
          engineCC: true,
          hours: false,
          passengers: false,
          steering_types: false,
          length: false,
          hull_material: false,
          weight: false,
          engineName: "Engine CC",
        },
        {
          id: 3,
          name: "Boat",
          make: true,
          model: true,
          trim: false,
          year: true,
          body_type: false,
          price: true,
          kilometer: false,
          condition: true,
          transmission: false,
          fuel_type: true,
          passenger: true,
          steering_type: true,
          drive_train: false,
          cylinder: false,
          seating: false,
          color: true,
          seller_type: true,
          accident: true,
          owners: true,
          features: true,
          vin: false,
          engineCC: true,
          hours: true,
          passengers: true,
          steering_types: true,
          length: true,
          hull_material: true,
          weight: false,
          engineName: "Engine Horsepower",
        },
        {
          id: 6,
          name: "RV",
          make: true,
          model: true,
          trim: false,
          year: true,
          body_type: false,
          price: true,
          kilometer: true,
          condition: true,
          transmission: false,
          fuel_type: false,
          passenger: false,
          steering_type: false,
          drive_train: false,
          cylinder: false,
          seating: false,
          color: true,
          seller_type: true,
          accident: true,
          owners: true,
          features: true,
          vin: false,
          engineCC: false,
          hours: false,
          passengers: false,
          steering_types: false,
          length: true,
          hull_material: false,
          weight: true,
          engineName: "Engine CC",
        },
        {
          id: 8,
          name: "Small Equipment",
          make: true,
          model: true,
          trim: false,
          year: true,
          body_type: false,
          price: true,
          kilometer: false,
          condition: true,
          transmission: false,
          fuel_type: false,
          passenger: false,
          steering_type: false,
          drive_train: false,
          cylinder: false,
          seating: false,
          color: false,
          seller_type: true,
          accident: true,
          owners: true,
          features: false,
          vin: false,
          engineCC: true,
          hours: true,
          passengers: false,
          steering_types: false,
          length: false,
          hull_material: false,
          weight: false,
          engineName: "Engine CC",
        },
        {
          id: 1,
          name: "Trailer",
          make: true,
          model: true,
          trim: false,
          year: true,
          body_type: false,
          price: true,
          kilometer: true,
          condition: true,
          transmission: false,
          fuel_type: false,
          passenger: false,
          steering_type: false,
          drive_train: false,
          cylinder: false,
          seating: false,
          color: true,
          seller_type: true,
          accident: true,
          owners: true,
          features: false,
          vin: false,
          engineCC: false,
          hours: false,
          passengers: false,
          steering_types: false,
          length: false,
          hull_material: false,
          weight: false,
          engineName: "Engine CC",
        },
      ],
      allowFilters: [
        {
          id: 7,
          name: "Automotive",
          make: true,
          model: true,
          trim: true,
          year: true,
          body_type: true,
          price: true,
          kilometer: true,
          condition: true,
          transmission: true,
          fuel_type: true,
          drive_train: true,
          cylinder: true,
          seating: true,
          color: true,
          seller_type: true,
          accident: true,
          owners: true,
          features: true,
          passenger: false,
          steering_type: false,
          vin: false,
          engineCC: false,
          hours: false,
          passengers: false,
          steering_types: false,
          length: false,
          hull_material: false,
          weight: false,
          engineName: "",
        },
      ],
      dealer_id:
        this.props.match.params !== undefined &&
        this.props.match.params !== null
          ? this.props.match.params.id !== undefined &&
            this.props.match.params.id !== null
            ? this.props.match.params.id
            : ""
          : "",
      user_type: 2,
      // this.props.match.params !== undefined &&
      // this.props.match.params !== null
      //   ? this.props.match.params.user_type !== undefined &&
      //     this.props.match.params.user_type !== null
      //     ? this.props.match.params.user_type
      //     : ""
      //   : "",
      firstName: "",
      lastName: "",
      streetAddress: "",
      postalCode: "",
      city: "",
      country: "",
      email: "",
      telephone: "",
      firstSearchKm: "",
      startDate: "",
      endDate: "",
      logoPath: "",
      website: "",
      name: "",
    };
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    const data = {
      id: this.state.dealer_id,
    };
    this.props.get_vehicle_type(data);
    if (
      this.state.user_type !== undefined &&
      this.state.user_type !== null &&
      this.state.user_type !== ""
    ) {
      // if (Number(this.state.user_type) === 1) {
      //   this.props.get_user_profile_data(this.state.dealer_id);
      // } else {
      this.props.get_dealer_profile_data(this.state.dealer_id);
      // }
    }
    let currentYear = new Date().getFullYear() + 1;
    let earliestYear = 1900;
    let countYears = 1900;
    let years = [];
    let toYears = [];
    while (currentYear >= earliestYear) {
      years.push({ label: `${currentYear}`, value: currentYear });
      toYears.push({ label: `${countYears}`, value: countYears });
      currentYear -= 1;
      countYears += 1;
    }
    this.setState({
      ...this.state,
      yearsDropDown: years,
      fromYearDropDown: toYears,
    });
    this.props.get_vehicle_fuel_type();
    this.props.get_vehicle_drive_train();
    if (
      this.props.location.query !== undefined &&
      this.props.location.query.category !== undefined &&
      this.props.location.query.category !== ""
    ) {
      this.props.get_vehicle_make(this.props.location.query.category);
    }
    if (
      this.props.location.query !== undefined &&
      this.props.location.query.vehicleMake !== undefined &&
      this.props.location.query.vehicleMake !== ""
    ) {
      this.props.get_vehicle_model(this.props.location.query.vehicleMake);
    }
    if (
      this.props.location.query !== undefined &&
      this.props.location.query.category !== undefined &&
      this.props.location.query.category !== "" &&
      Number(this.props.location.query.category) === Number(7)
    ) {
      this.props.get_vehicle_body_type(this.props.location.query.category);
    }
    if (this.state.latitude === "" && this.state.longitude === "") {
      this.searchPost();
    }
    this.add_filter_reducer();
  }

  handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name == "category" || name == "typeOfVehicle") {
      this.setState({
        ...this.state,
        category: value,
        typeOfVehicle: value,
      });
    } else {
      this.setState({
        ...this.state,
        [name]: value,
      });
    }
  };

  handleOnChangeFeatures = (id) => {
    const features_list = this.props.vehicle_features.filter(
      (item) => item.id == id
    );
    const data = {
      ...features_list[0],
      name: features_list.length > 0 ? features_list[0].v_features : "",
      filter_name: "feature",
    };
    this.setState({
      ...this.state,
      selectAllFeatures: false,
    });
    // this.props.filter_on_features(data)
    this.props.toggle_vehicle_features(id);
    setTimeout(() => {
      this.callFilterApi();
      this.add_filter_reducer();
    }, 10);
  };

  handleOnClick = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.typeOfVehicle !== this.state.typeOfVehicle &&
      this.state.typeOfVehicle !== "" &&
      this.state.typeOfVehicle !== "All Vehicles"
    ) {
      const allowFilters =
        this.state.filters.filter(
          (item) => Number(item.id) === Number(this.state.typeOfVehicle)
        ).length > 0
          ? this.state.filters.filter(
              (item) => Number(item.id) === Number(this.state.typeOfVehicle)
            )
          : [
              {
                id: 7,
                name: "Automotive",
                make: true,
                model: true,
                trim: true,
                year: true,
                body_type: true,
                price: true,
                kilometer: true,
                condition: true,
                transmission: true,
                fuel_type: true,
                drive_train: true,
                cylinder: true,
                seating: true,
                color: true,
                seller_type: true,
                accident: true,
                owners: true,
                features: true,
                passenger: false,
                steering_type: false,
                vin: false,
                engineCC: false,
                hours: false,
                passengers: false,
                steering_types: false,
                length: false,
                hull_material: false,
                weight: false,
                engineName: "",
              },
            ];
      this.props.remove_selected_features();
      this.props.remove_filter("allFeatures", "");
      // === 'All Vehicles' ? 'All Vehicles' : this.state.typeOfVehicle,
      this.setState({
        ...this.state,
        // vehicle_make: makes,
        category: this.state.typeOfVehicle,
        sortBy: "",
        fromRange: "",
        toRange: "",
        // toRange:
        //   this.props.location.query !== undefined &&
        //     this.props.location.query.fromRange !== undefined
        //     ? this.props.location.query.fromRange
        //     : "",
        seller_type: [
          { name: "Private Seller", value: 1 },
          { name: "Dealer", value: 2 },
        ],
        selectAllSellerType: true,
        featureName: "",
        colors: [
          { name: "Green", value: "Green", className: "ColorGreen" },
          { name: "Yellow", value: "Yellow", className: "ColorYellow" },
          { name: "Orange", value: "Orange", className: "ColorOrange" },
          { name: "Purple", value: "Purple", className: "ColorPurple" },
          { name: "Blue", value: "Blue", className: "ColorBlue" },
          { name: "Silver", value: "Silver", className: "ColorSilver" },
          { name: "Black", value: "Black", className: "ColorBlack" },
          { name: "Red", value: "Red", className: "ColorRed" },
          { name: "Gold", value: "Gold", className: "ColorGold" },
          { name: "Grey", value: "Grey", className: "ColorGrey" },
          { name: "Biege", value: "Biege", className: "ColorBiege" },
          { name: "Brown", value: "Brown", className: "ColorBrown" },
        ],
        selectAllColor: true,
        transmission: [
          { name: "Automatic", value: "Automatic" },
          { name: "Manual", value: "Manual" },
        ],
        selectAllTransmission: true,
        selectedTransmission: [],
        transmissionId: "",
        selectTrim: "",
        toYear: new Date().getFullYear() + 1,
        fromYear: 1990,
        vehicleMake: "",
        fromKilometer: "",
        toKilometer: "",
        vehicleModel: "",
        selectCondition: [
          { name: "New", value: "New", id: "New" },
          { name: "Pre-owned", value: "Pre-owned", id: "Used" },
        ],
        selectAllCondition: true,
        selectedConditions: [],
        conditionId: "",
        categoryFilterName: "",
        makeFilterName: "",
        modelFilterName: "",
        search: "",
        // searchKm: '',
        // longitude: '',
        // longitude: '',
        paymentPrice: "p",
        start_pay: "",
        end_pay: "",
        // vehicleFuelType: '',
        // vehicleDriveTrain: '',
        vehicleCylinder: cylinders.map((item) => {
          return {
            name: item.value,
            value: item.value,
          };
        }),
        selectAllCylinder: true,
        vehicleSeating: seatings.map((item) => {
          return {
            name: item.label,
            value: item.value,
          };
        }),
        selectAllSeating: true,
        vehicleBody: [],
        selectedBodyType: [],
        selectedBodyTypeId: "",
        selectAllVehicleBody: true,
        vehicleAccident: [
          {
            name: "Previously Accidented",
            value: "previously_accidented",
            id: 1,
          },
          { name: "No Accident Reported", value: "no_accidented", id: 0 },
        ],
        selectAllAccident: true,
        vehicleOwner: [
          { name: "One Owner", value: "one_owner", id: 1 },
          { name: "Multiple Owner", value: "multiple_owner", id: 2 },
        ],
        selectAllOwner: true,
        vin: "",
        start_ec: "",
        end_ec: "",
        hours: "",
        vehiclePassenger: passengers.map((item) => {
          return {
            value: item.value,
            name: item.label,
          };
        }),
        selectAllPassenger: true,
        steering_type: steeringTypes.map((item) => {
          return {
            name: item.name,
            value: item.name,
          };
        }),
        selectAllSteering: true,
        subTypeOfVehicle: "",
        allowFilters: allowFilters,
        allTrims: [],
        selectAllTrims: true,
        allModels: [],
        selectAllModels: true,
        allMakes: [],
        selectAllMakes: true,
        selectedMakeId: "",
        selectedMakes: [],
        selectedModel: [],
        selectedModelId: "",
        selectedTrim: [],
        selectedTrimId: "",
        selectedSubTypes: [],
        subTypeId: "",
        start_hours: "",
        end_hours: "",
        start_length: "",
        end_length: "",
        start_weight: "",
        end_weight: "",
        hull_material: "",
        hullMaterials: [
          { name: "Aluminum", value: "Aluminum" },
          { name: "Composite", value: "Composite" },
          { name: "Ferro-cement", value: "Ferro-cement" },
          { name: "Fiberglass", value: "Fiberglass" },
          { name: "Hypalon", value: "Hypalon" },
          { name: "PVC", value: "PVC" },
          { name: "Roplene", value: "Roplene" },
          { name: "Steel", value: "Steel" },
          { name: "Wood", value: "Wood" },
          { name: "Other", value: "Other" },
        ],
        selectAllHullMaterial: true,
        selectedHullMaterial: [],
        hullMaterialId: "",
        selectedFuelType: [],
        selectedCylinder: [],
        selectedSeating: [],
        selectedColor: [],
        selectedOwners: [],
        selectedSellerType: [],
        selectedAccident: [],
        selectedPassenger: [],
        selectedSteering: [],
        vehicleLoader:
          this.state.typeOfVehicle !== "All Vehicles" ? true : false,
        selectAllFeatures: true,
      });
      setTimeout(() => {
        this.add_filter_reducer();
        this.callFilterApi();
      }, 100);
      if (this.state.typeOfVehicle === "All Vehicles") {
        this.props.remove_specific_state();
      } else {
        this.props.get_vehicle_make(this.state.typeOfVehicle);
        this.props.change_type_of_vehicle(this.state.typeOfVehicle);
        this.props.get_vehicle_feature(this.state.typeOfVehicle);
        this.props.get_vehicle_body_type(this.state.typeOfVehicle);
      }

      // this.callFilterApi()
    }

    if (
      prevState.selectAllTypeOfVehicle !== this.state.selectAllTypeOfVehicle &&
      this.state.selectedTypeOfVehicle === true
    ) {
      this.props.remove_specific_state();
    }

    if (
      prevState.selectedSubTypes !== this.state.selectedSubTypes &&
      this.state.selectedSubTypes !== undefined &&
      this.state.selectedSubTypes.length > 0
    ) {
      setTimeout(() => {
        this.add_filter_reducer();
        this.callFilterApi();
      }, 100);
      if (
        (this.state.subTypeVehicle || [])
          .filter((item) => item.isChecked === true)
          .map((item) => {
            return item.value;
          }).length > 0
      ) {
        const list_of_ids = (this.state.subTypeVehicle || [])
          .filter((item) => item.isChecked === true)
          .map((item) => {
            return item.value;
          });
        this.props.get_vehicle_make_sub_type({ list_of_ids: list_of_ids });
      } else {
        if (this.state.typeOfVehicle === "All Vehicles") {
          this.props.remove_specific_state();
        } else {
          this.props.get_vehicle_make(this.state.typeOfVehicle);
        }
      }
    }

    if (
      prevState.selectedMakes !== this.state.selectedMakes &&
      this.state.selectedMakes !== undefined &&
      this.state.selectedMakes.length > 0
    ) {
      this.props.get_multi_vehicle_models({
        list_of_ids: (this.state.allMakes || [])
          .filter((item) => item.isChecked === true)
          .map((item) => {
            return item.value;
          }),
      });
      // const isExist = (this.state.allMakes || []).filter(item => Number(item.value) === Number(this.state.selectedMakeId) && item.isChecked === true)
      // if (isExist !== undefined && isExist !== null && isExist.length > 0) {
      //     this.props.get_vehicle_model(this.state.selectedMakeId)
      // } else {
      //     this.setState({
      //         ...this.state,
      //         allModels: this.state.allModels.filter(item => Number(item.make_id) !== Number(this.state.selectedMakeId))
      //     })
      //     // this.add_filter_reducer()
      //     // this.callFilterApi()
      // }
      this.callFilterApi();
      this.add_filter_reducer();
    }

    if (
      prevState.selectedModel !== this.state.selectedModel &&
      this.state.selectedModel !== undefined &&
      this.state.selectedModel.length > 0
    ) {
      const isExist = (this.state.allModels || []).filter(
        (item) =>
          Number(item.value) === Number(this.state.selectedModelId) &&
          item.isChecked === true
      );
      if (isExist !== undefined && isExist !== null && isExist.length > 0) {
        this.props.get_vehicle_trims(this.state.selectedModelId);
      } else {
        this.setState({
          ...this.state,
          allTrims: this.state.allTrims.filter(
            (item) =>
              Number(item.model_id) !== Number(this.state.selectedModelId)
          ),
        });
        // this.callFilterApi()
      }
      this.callFilterApi();
      this.add_filter_reducer();
    }

    if (
      prevState.selectedHullMaterial !== this.state.selectedHullMaterial &&
      this.state.selectedHullMaterial !== undefined &&
      this.state.selectedHullMaterial.length > 0
    ) {
      this.add_filter_reducer();
      this.callFilterApi();
    }
    if (
      prevState.selectedTrim !== this.state.selectedTrim &&
      this.state.selectedTrim !== undefined &&
      this.state.selectedTrim.length > 0
    ) {
      this.add_filter_reducer();
      this.callFilterApi();
    }
    if (
      prevState.selectedBodyType !== this.state.selectedBodyType &&
      this.state.selectedBodyType !== undefined &&
      this.state.selectedBodyType.length > 0
    ) {
      this.add_filter_reducer();
      this.callFilterApi();
    }

    if (
      prevState.selectedConditions !== this.state.selectedConditions &&
      this.state.selectedConditions !== undefined &&
      this.state.selectedConditions.length > 0
    ) {
      // conditionId
      this.add_filter_reducer();
      this.callFilterApi();
    }

    if (
      prevState.selectedTransmission !== this.state.selectedTransmission &&
      this.state.selectedTransmission !== undefined &&
      this.state.selectedTransmission.length > 0
    ) {
      // transmissionId
      this.add_filter_reducer();
      this.callFilterApi();
    }

    if (
      prevState.selectedFuelType !== this.state.selectedFuelType &&
      this.state.selectedFuelType !== undefined &&
      this.state.selectedFuelType.length > 0
    ) {
      // fuelTypeId
      this.add_filter_reducer();
      this.callFilterApi();
    }

    if (
      prevState.selectedDriveTrain !== this.state.selectedDriveTrain &&
      this.state.selectedDriveTrain !== undefined &&
      this.state.selectedDriveTrain.length > 0
    ) {
      // driveTrainId
      this.add_filter_reducer();
      this.callFilterApi();
    }

    if (
      prevState.selectedCylinder !== this.state.selectedCylinder &&
      this.state.selectedCylinder !== undefined &&
      this.state.selectedCylinder.length > 0
    ) {
      // selectedCylinderId
      this.add_filter_reducer();
      this.callFilterApi();
    }

    if (
      prevState.selectedSeating !== this.state.selectedSeating &&
      this.state.selectedSeating !== undefined &&
      this.state.selectedSeating.length > 0
    ) {
      // selectedSeatingId
      this.add_filter_reducer();
      this.callFilterApi();
    }

    if (
      prevState.selectedColor !== this.state.selectedColor &&
      this.state.selectedColor !== undefined &&
      this.state.selectedColor.length > 0
    ) {
      // selectedColorId
      this.add_filter_reducer();
      this.callFilterApi();
    }

    if (
      prevState.selectedOwners !== this.state.selectedOwners &&
      this.state.selectedOwners !== undefined &&
      this.state.selectedOwners.length > 0
    ) {
      // selectedOwnerId
      this.add_filter_reducer();
      this.callFilterApi();
    }

    if (
      prevState.selectedSellerType !== this.state.selectedSellerType &&
      this.state.selectedSellerType !== undefined &&
      this.state.selectedSellerType.length > 0
    ) {
      // selectedSellerId
      this.add_filter_reducer();
      this.callFilterApi();
    }
    if (
      prevState.selectAllSellerType !== this.state.selectAllSellerType &&
      this.state.selectAllSellerType === true
    ) {
      this.add_filter_reducer();
      this.callFilterApi();
    }

    if (
      prevState.selectedAccident !== this.state.selectedAccident &&
      this.state.selectedAccident !== undefined &&
      this.state.selectedAccident.length > 0
    ) {
      // selectedAccidentId
      this.add_filter_reducer();
      this.callFilterApi();
    }

    if (
      prevState.selectedPassenger !== this.state.selectedPassenger &&
      this.state.selectedPassenger !== undefined &&
      this.state.selectedPassenger.length > 0
    ) {
      // selectedPassengerId
      this.add_filter_reducer();
      this.callFilterApi();
    }

    if (
      prevState.selectedSteering !== this.state.selectedSteering &&
      this.state.selectedSteering !== undefined &&
      this.state.selectedSteering.length > 0
    ) {
      // selectedSteeringId
      this.add_filter_reducer();
      this.callFilterApi();
    }

    if (
      (prevState.fromYear !== this.state.fromYear &&
        Number(this.state.fromYear) !== 0) ||
      (prevState.toYear !== this.state.toYear &&
        Number(this.state.toYear) !== 0)
    ) {
      this.add_filter_reducer();
      this.callFilterApi();
    }

    if (
      prevProps.vehicle_drive_train !== this.props.vehicle_drive_train &&
      this.props.vehicle_drive_train !== undefined
    ) {
      this.setState({
        ...this.state,
        vehicleDriveTrain: this.props.vehicle_drive_train.map((item) => {
          return {
            name: item.drive_train,
            value: item.id,
          };
        }),
      });
    }
    if (
      prevProps.vehicle_fuel_type !== this.props.vehicle_fuel_type &&
      this.props.vehicle_fuel_type !== undefined
    ) {
      this.setState({
        ...this.state,
        vehicleFuelType: this.props.vehicle_fuel_type.map((item) => {
          return {
            name: item.fuel_type,
            value: item.id,
          };
        }),
      });
    }
    if (
      prevProps.vehicle_body !== this.props.vehicle_body &&
      this.props.vehicle_body !== undefined
    ) {
      this.setState({
        ...this.state,
        vehicleBody: this.props.vehicle_body.map((item) => {
          return {
            value: item.id,
            name: item.body_type,
            image_path: item.image_path,
            bt_count: item.bt_count,
          };
        }),
      });
    }
    if (
      prevProps.vehicle_trims !== this.props.vehicle_trims &&
      this.props.vehicle_trims !== undefined
    ) {
      this.setState({
        ...this.state,
        allTrims: [
          ...this.state.allTrims,
          ...(this.props.vehicle_trims || []).map((item) => {
            return {
              value: item.id,
              name: item.v_trim,
              model_id: item.model_id,
            };
          }),
        ],
      });
    }
    // if (prevProps.vehicle_model !== this.props.vehicle_model && this.props.vehicle_model !== undefined) {
    //     let allModels = [...this.state.allModels, ...(this.props.vehicle_model || []).map(item => {
    //         return {
    //             value: item.id,
    //             name: item.model_make,
    //             md_count: item.md_count,
    //             make_id: item.make_id
    //         }
    //     })]
    //     allModels = allModels.slice().map(item => {
    //         if (Number(item.value) === Number(this.state.vehicleModel)) {
    //             return {
    //                 ...item,
    //                 isChecked: true
    //             }
    //         }
    //         return item
    //     })

    //     this.setState({
    //         ...this.state,
    //         allModels: allModels,
    //         // selectedModel: allModels.filter(item => item.isChecked === true).length > 0 ?  []: allModels,
    //         selectAllModels: allModels.filter(item => item.isChecked === true).length > 0 ? false : true
    //     })
    // }
    if (
      prevProps.vehicle_model !== this.props.vehicle_model &&
      this.props.vehicle_model !== undefined
    ) {
      // let allModels = [...this.state.allModels, ...(this.props.vehicle_model || []).map(item => {
      console.log(this.props.vehicle_model, "this.props.vehicle_model");
      let allModels = (this.props.vehicle_model || []).map((item) => {
        return {
          value: item.id,
          name: item.model_make,
          md_count: item.md_count,
          make_id: item.make_id,
        };
      });
      (this.state.vehicleModel || []).map((item) => {
        allModels = allModels.slice().map((mod) => {
          if (Number(mod.value) === Number(item)) {
            return {
              ...mod,
              isChecked: true,
            };
          }
          return mod;
        });
      });
      const selectedModel = this.state.selectedModel.filter(
        (item) => item.isChecked
      );
      if (selectedModel && selectedModel.length > 0) {
        (selectedModel || []).map((item) => {
          allModels = allModels.slice().map((mod) => {
            if (Number(mod.value) === Number(item.value)) {
              return {
                ...mod,
                isChecked: true,
              };
            }
            return mod;
          });
        });
      }
      this.setState({
        ...this.state,
        allModels: allModels,
        selectAllModels:
          allModels.filter((item) => item.isChecked === true).length > 0
            ? false
            : true,
      });
    }
    if (
      prevProps.vehicle_make !== this.props.vehicle_make &&
      this.props.vehicle_make !== undefined
    ) {
      // let allMakes = [
      //   ...this.state.allMakes,
      //   ...(this.props.vehicle_make || []).map((item) => {
      //     return {
      //       value: item.id,
      //       name: item.make_name,
      //       mk_count: item.mk_count,
      //       type_id: item.type_id,
      //       total_makes: item.total_makes,
      //     };
      //   }),
      // ];

      // allMakes = allMakes.slice().map((item) => {
      //   if (Number(item.value) === Number(this.state.vehicleMake)) {
      //     return {
      //       ...item,
      //       isChecked: true,
      //     };
      //   }
      //   return item;
      // });
      let allMakes = (this.props.vehicle_make || []).map((item) => {
        return {
          value: item.id,
          name: item.make_name,
          mk_count: item.mk_count,
          type_id: item.type_id,
          total_makes: item.total_makes,
        };
      });

      allMakes = allMakes.slice().map((mak) => {
        if (Number(mak.value) === Number(this.state.vehicleMake)) {
          return {
            ...mak,
            isChecked: true,
          };
        }
        return mak;
      });
      this.setState({
        ...this.state,
        allMakes: allMakes,
        // selectedMakes: allMakes.filter(item => item.isChecked === true).length > 0 ? [] : allMakes,
        selectAllMakes:
          allMakes.filter((item) => item.isChecked === true).length > 0
            ? false
            : true,
        vehicleLoader: false,
      });
    }
    /**
     *
     *
     *  Location Drop Down
     *
     */

    // if (prevState.searchKm !== this.state.searchKm) {
    //     Geocode.fromAddress(this.state.searchKm).then(
    //         response => {
    //             this.setState({
    //                 ...this.state,
    //                 latitude: response.results[0].geometry.location.lat,
    //                 longitude: response.results[0].geometry.location.lng
    //             })
    //         },
    //         error => {
    //             console.error('error Location Api', error);
    //         }
    //     );
    // }
    // if (
    //   prevState.searchKm !== this.state.searchKm &&
    //   this.state.searchKm !== undefined &&
    //   this.state.searchKm !== ""
    // ) {
    //   this.add_filter_reducer();
    // }
    // if (
    //   prevState.firstSearchKm !== this.state.firstSearchKm &&
    //   this.state.firstSearchKm !== undefined &&
    //   this.state.firstSearchKm !== ""
    // ) {
    //   this.callFilterApi();
    // }
    if (
      prevProps.type_of_vehicles !== this.props.type_of_vehicles &&
      this.props.type_of_vehicles !== undefined
    ) {
      let subTypes = (this.props.type_of_vehicles || [])
        .filter((item, index) => Number(item.id) === 9)
        .map((item) => item.typeofvehicle_id || []);
      subTypes =
        subTypes !== undefined && subTypes !== null && subTypes.length > 0
          ? subTypes[0]
          : [];
      this.setState({
        ...this.state,
        type_of_vehicle: this.props.type_of_vehicles,
        subTypeVehicle: (subTypes || []).map((subItem, subIndex) => {
          return {
            value: subItem.id,
            name: subItem.name,
            st_count: subItem.st_count,
          };
        }),
      });
    }
    if (
      prevProps.get_user_profile !== this.props.get_user_profile &&
      this.props.get_user_profile !== undefined &&
      Object.keys(this.props.get_user_profile).length > 0
    ) {
      const firstName =
        this.props.get_user_profile.first_name !== undefined
          ? this.props.get_user_profile.first_name
          : this.props.get_user_profile.business_name;
      const lastName =
        this.props.get_user_profile.last_name !== undefined
          ? this.props.get_user_profile.last_name
          : this.props.get_user_profile.operating_name;
      const streetAddress =
        this.props.get_user_profile.street !== undefined
          ? this.props.get_user_profile.street
          : this.props.get_user_profile.street_address;
      const postalCode =
        this.props.get_user_profile.postal_code !== undefined
          ? this.props.get_user_profile.postal_code
          : this.props.get_user_profile.postal_code;
      const city =
        this.props.get_user_profile.city !== undefined
          ? this.props.get_user_profile.city
          : this.props.get_user_profile.city;
      const country =
        this.props.get_user_profile.country !== undefined
          ? this.props.get_user_profile.country
          : this.props.get_user_profile.country;
      const email =
        this.props.get_user_profile.email === undefined
          ? this.props.get_user_profile.user_id !== undefined &&
            this.props.get_user_profile.user_id !== null
            ? this.props.get_user_profile.user_id.email !== undefined &&
              this.props.get_user_profile.user_id.email !== null
              ? this.props.get_user_profile.user_id.email
              : ""
            : ""
          : this.props.get_user_profile.email;
      const telephone =
        this.props.get_user_profile.telephone !== undefined
          ? this.props.get_user_profile.telephone
          : this.props.get_user_profile.phone;
      const logoPath =
        this.props.get_user_profile.logo_path !== undefined
          ? this.props.get_user_profile.logo_path
          : this.props.get_user_profile.logo_path;
      const website =
        this.props.get_user_profile.website !== undefined
          ? this.props.get_user_profile.website
          : this.props.get_user_profile.website;
      const name =
        this.props.get_user_profile.operating_name !== undefined
          ? this.props.get_user_profile.operating_name
          : this.props.get_user_profile.operating_name;
      // this.props.get_user_profile.name !== undefined
      //   ? this.props.get_user_profile.name
      //   : this.props.get_user_profile.name;
      this.setState({
        ...this.state,
        firstName: firstName,
        lastName: lastName,
        streetAddress: streetAddress,
        postalCode: postalCode,
        city: city,
        country: country,
        email: email,
        telephone: telephone,
        logoPath: logoPath,
        website: website,
        name: name,
      });
    }
    if (
      prevState.toggleMobileView !== this.state.toggleMobileView &&
      this.state.toggleMobileView === true
    ) {
      $("body").css({ overflow: "hidden" });
    }
    if (
      prevState.toggleMobileView !== this.state.toggleMobileView &&
      this.state.toggleMobileView === false
    ) {
      $("body").css({ overflow: "" });
    }
  }

  blurOnKilometer = () => {
    this.add_filter_reducer();
    this.callFilterApi();
  };
  blurOnHours = () => {
    this.add_filter_reducer();
    this.callFilterApi();
  };
  blurOnVin = () => {
    this.add_filter_reducer();
    this.callFilterApi();
  };
  blurOnEngineCC = () => {
    this.add_filter_reducer();
    this.callFilterApi();
  };
  blurOnHorsePower = () => {
    this.add_filter_reducer();
    this.callFilterApi();
  };

  blurOnPrice = () => {
    this.add_filter_reducer();
    this.callFilterApi();
  };
  blurOnLength = () => {
    this.add_filter_reducer();
    this.callFilterApi();
  };
  blurOnWeight = () => {
    this.add_filter_reducer();
    this.callFilterApi();
  };
  add_filter_reducer = () => {
    const modelName =
      this.state.selectAllModels === true && this.state.modelFilterName === ""
        ? ""
        : (this.state.selectedModel || []).length > 0
        ? this.state.selectedModel
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedModel
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? this.state.selectedModel
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return { name: item.name, id: item.value };
              })
          : ""
        : this.state.modelFilterName !== ""
        ? [{ name: this.state.modelFilterName, id: this.state.vehicleModel }]
        : "";
    const makeName =
      this.state.selectAllMakes === true && this.state.makeFilterName === ""
        ? ""
        : (this.state.selectedMakes || []).length > 0
        ? this.state.selectedMakes
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedMakes
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? this.state.selectedMakes
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return { name: item.name, id: item.value };
              })
          : ""
        : this.state.makeFilterName !== ""
        ? [{ name: this.state.makeFilterName, id: this.state.vehicleMake }]
        : "";
    const typeVehicle =
      this.state.categoryFilterName === "All Vehicles"
        ? ""
        : this.state.categoryFilterName;
    const typeVehicleName =
      this.state.typeOfVehicle === "All Vehicles"
        ? "All Vehicles"
        : this.state.typeOfVehicle !== ""
        ? (this.state.type_of_vehicle || [])
            .filter(
              (item) => Number(item.id) === Number(this.state.typeOfVehicle)
            )
            .map((item) => {
              return item.name;
            })[0] == undefined
          ? typeVehicle
          : (this.state.type_of_vehicle || [])
              .filter((item) => item.id == this.state.typeOfVehicle)
              .map((item) => {
                return item.name;
              })[0]
        : typeVehicle;
    // const subType = this.state.subTypeOfVehicle !== '' ? this.state.type_of_vehicle.filter(item => item.name.toUpperCase() === ('powersport').toUpperCase() || item.name.toUpperCase() === ('powersports').toUpperCase())[0] : ''
    const subTypeData =
      this.state.selectAllSubTypeVehicle === true
        ? ""
        : (this.state.selectedSubTypes || []).length > 0
        ? this.state.selectedSubTypes.filter((item) => {
            return item.isChecked === true;
          })
        : "";
    const subTypeName =
      subTypeData !== undefined &&
      subTypeData !== null &&
      subTypeData.length > 0
        ? subTypeData.map((item) => {
            return { name: item.name, id: item.value };
          })
        : "";
    const priceFilter =
      this.state.fromRange == "" && this.state.toRange == ""
        ? ""
        : this.state.fromRange !== "" && this.state.toRange == ""
        ? `Price Over ${this.state.fromRange}`
        : this.state.fromRange == "" && this.state.toRange !== ""
        ? `Price Under ${this.state.toRange}`
        : `Price ${this.state.fromRange + "-" + this.state.toRange}`;
    const location =
      this.state.searchKm !== undefined &&
      this.state.searchKm !== null &&
      this.state.searchKm !== ""
        ? this.state.searchKm.split(",").slice(-3, -1)[0] +
          ", " +
          this.state.searchKm.split(",").slice(-2, -1)[0].split(" ")[1]
        : "";
    const kilometerFilter =
      this.state.fromKilometer == "" && this.state.toKilometer == ""
        ? ""
        : this.state.fromKilometer !== "" && this.state.toKilometer == ""
        ? `Kilometer Over ${this.state.fromKilometer}`
        : this.state.fromKilometer == "" && this.state.toKilometer !== ""
        ? `Kilometer Under ${this.state.toKilometer}`
        : `Kilometer ${
            this.state.fromKilometer + "-" + this.state.toKilometer
          }`;
    const yearFilter =
      this.state.startDate == "" && this.state.endDate == ""
        ? ""
        : this.state.startDate !== "" && this.state.endDate == ""
        ? `Year Over ${this.state.startDate}`
        : this.state.startDate == "" && this.state.endDate !== ""
        ? `Year Under ${this.state.endDate}`
        : `Year ${this.state.startDate + "-" + this.state.endDate}`;
    const trim =
      this.state.selectedTrim === true
        ? ""
        : (this.state.selectedTrim || []).length > 0
        ? this.state.selectedTrim.length > 0
          ? this.state.selectedTrim
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return item.name;
              }) !== undefined &&
            this.state.selectedTrim
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return item.name;
              }).length > 0
            ? this.state.selectedTrim
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return { name: item.name, id: item.value };
                })
            : ""
          : ""
        : "";
    const transmission =
      this.state.selectAllTransmission === true
        ? ""
        : this.state.selectedTransmission
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedTransmission
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
        ? this.state.selectedTransmission
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return { name: item.name, id: item.value };
            })
        : "";
    const condition =
      this.state.selectAllCondition === true
        ? ""
        : (this.state.selectedConditions || []).length > 0
        ? this.state.selectedConditions
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedConditions
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? this.state.selectedConditions
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return { name: item.name, id: item.value };
              })
          : ""
        : "";
    const color =
      this.state.selectAllColor === true
        ? ""
        : (this.state.selectedColor || []).length > 0
        ? this.state.selectedColor
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedColor
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? this.state.selectedColor
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return { name: item.name, id: item.value };
              })
          : ""
        : "";
    const seller_type =
      this.state.selectAllSellerType === true
        ? ""
        : (this.state.selectedSellerType || []).length > 0
        ? this.state.selectedSellerType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedSellerType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? this.state.selectedSellerType
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return { name: item.name, id: item.value };
              })
          : ""
        : "";
    const features = this.props.vehicle_features
      .filter((item) => item.checked == true)
      .map((item) => {
        return { id: item.id, name: item.v_features };
      });
    const vehicleFuel =
      this.state.selectAllFuelType === true
        ? ""
        : this.state.selectedFuelType.length > 0
        ? this.state.selectedFuelType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedFuelType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? this.state.selectedFuelType
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return { name: item.name, id: item.value };
              })
          : ""
        : "";
    const vehicleDrive =
      this.state.selectAllDriveTrain === true
        ? ""
        : this.state.selectedDriveTrain.length > 0
        ? this.state.selectedDriveTrain
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedDriveTrain
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? this.state.selectedDriveTrain
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return { name: item.name, id: item.value };
              })
          : ""
        : "";
    const vehicleCylinder =
      this.state.selectAllCylinder === true
        ? ""
        : (this.state.selectedCylinder || []).length > 0
        ? this.state.selectedCylinder
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedCylinder
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? this.state.selectedCylinder
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return { name: item.name, id: item.value };
              })
          : ""
        : "";
    const vehicleSeating =
      this.state.selectAllSeating === true
        ? ""
        : (this.state.selectedSeating || []).length > 0
        ? this.state.selectedSeating
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedSeating
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? this.state.selectedSeating
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return { name: item.name, id: item.value };
              })
          : ""
        : "";
    const vehicleBody =
      this.state.selectAllVehicleBody === true
        ? ""
        : (this.state.selectedBodyType || []).length > 0
        ? this.state.selectedBodyType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedBodyType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? this.state.selectedBodyType
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return { name: item.name, id: item.value };
              })
          : ""
        : "";
    const vehicleAccident =
      this.state.selectAllAccident === true
        ? ""
        : (this.state.selectedAccident || []).length > 0
        ? this.state.selectedAccident
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedAccident
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? this.state.selectedAccident
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return { name: item.name, id: item.value };
              })
          : ""
        : "";
    const vehicleOwner =
      this.state.selectAllOwner === true
        ? ""
        : (this.state.selectedOwners || []).length > 0
        ? this.state.selectedOwners
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedOwners
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? this.state.selectedOwners
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return { name: item.name, id: item.value };
              })
          : ""
        : "";
    const vin = this.state.vin;
    const hours = this.state.hours;
    const steering_type =
      this.state.selectAllSteering === true
        ? ""
        : (this.state.selectedSteering || []).length > 0
        ? this.state.selectedSteering
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedSteering
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? this.state.selectedSteering
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return { name: item.name, id: item.value };
              })
          : ""
        : "";
    const sortBy =
      this.state.sort_by_filters.filter(
        (item) => item.value === this.state.sortBy
      ) !== undefined &&
      this.state.sort_by_filters.filter(
        (item) => item.value === this.state.sortBy
      ) !== null &&
      this.state.sort_by_filters.filter(
        (item) => item.value === this.state.sortBy
      ).length > 0
        ? this.state.sort_by_filters.filter(
            (item) => item.value === this.state.sortBy
          )[0].name
        : "All Sort By";
    const checkAllCanda = this.state.checkAllCanda;
    const vehiclePassenger =
      this.state.selectAllPassenger === true
        ? ""
        : (this.state.vehiclePassenger || []).length > 0
        ? this.state.vehiclePassenger
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.vehiclePassenger
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? this.state.vehiclePassenger
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return { name: item.name, id: item.value };
              })
          : ""
        : "";
    const enginFilter =
      this.state.start_ec == "" && this.state.end_ec == ""
        ? ""
        : this.state.start_ec !== "" && this.state.end_ec == ""
        ? `Over ${this.state.start_ec}(CC)`
        : this.state.start_ec == "" && this.state.end_ec !== ""
        ? `Under ${this.state.end_ec}(CC)`
        : `${this.state.start_ec + "-" + this.state.end_ec}(CC)`;
    const hoursFilter =
      this.state.start_hours == "" && this.state.end_hours == ""
        ? ""
        : this.state.start_hours !== "" && this.state.end_hours == ""
        ? `Over ${this.state.start_hours}(Hr)`
        : this.state.start_hours == "" && this.state.end_hours !== ""
        ? `Under ${this.state.end_hours}(Hr)`
        : `${this.state.start_hours + "-" + this.state.end_hours}(Hr)`;
    const lengthFilter =
      this.state.start_length == "" && this.state.end_length == ""
        ? ""
        : this.state.start_length !== "" && this.state.end_length == ""
        ? `Over ${this.state.start_length}(Ft)`
        : this.state.start_length == "" && this.state.end_length !== ""
        ? `Under ${this.state.end_length}(Ft)`
        : `${this.state.start_length + "-" + this.state.end_length}(Ft)`;
    const hullMaterial =
      this.state.selectAllHullMaterial === true
        ? ""
        : (this.state.hullMaterials || []).length > 0
        ? this.state.hullMaterials
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.hullMaterials
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? this.state.hullMaterials
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return { name: item.name, id: item.value };
              })
          : ""
        : "";
    const weightFilter =
      this.state.start_weight == "" && this.state.end_weight == ""
        ? ""
        : this.state.start_weight !== "" && this.state.end_weight == ""
        ? `Over ${this.state.start_weight}`
        : this.state.start_weight == "" && this.state.end_weight !== ""
        ? `Under ${this.state.end_weight}`
        : this.state.start_weight + "-" + this.state.end_weight;
    const data = {
      model: modelName,
      make: makeName,
      category: typeVehicleName,
      subTypeData: subTypeData,
      subTypeName: subTypeName,
      priceFilter: priceFilter,
      location: location,
      kilometerFilter: kilometerFilter,
      yearFilter: yearFilter,
      trim: trim,
      transmission: transmission,
      condition: condition,
      color: color,
      seller_type: seller_type,
      features: features,
      vehicleFuel: vehicleFuel,
      vehicleDrive: vehicleDrive,
      vehicleCylinder: vehicleCylinder,
      vehicleSeating: vehicleSeating,
      vehicleBody: vehicleBody,
      vehicleAccident: vehicleAccident,
      vehicleOwner: vehicleOwner,
      vehiclePassenger: vehiclePassenger,
      vin: vin,
      lengthFilter: lengthFilter,
      hullMaterial: hullMaterial,
      weightFilter: weightFilter,
      enginFilter: enginFilter,
      hoursFilter: hoursFilter,
      steering_type: steering_type,
      sortBy: sortBy,
      checkAllCanda: checkAllCanda,
    };
    let startDistance = 0;
    let endDistance = 0;
    if (this.state.checkAllCanda === false) {
      // data.distance = this.state.distance
      startDistance =
        this.state.rangeSlider !== undefined &&
        this.state.rangeSlider !== null &&
        this.state.rangeSlider.length > 0
          ? this.state.rangeSlider[0]
          : 0;
      data.distance =
        this.state.rangeSlider !== undefined &&
        this.state.rangeSlider !== null &&
        this.state.rangeSlider.length > 0
          ? this.state.rangeSlider[0]
          : 0;
    }
    // if (
    //   this.state.rangeSlider !== undefined &&
    //   this.state.rangeSlider !== null &&
    //   this.state.rangeSlider.length > 0 &&
    //   this.state.rangeSlider[1] !== 0 &&
    //   this.state.rangeSlider[1] !== ""
    // ) {
    //   endDistance =
    //     this.state.rangeSlider !== undefined &&
    //     this.state.rangeSlider !== null &&
    //     this.state.rangeSlider.length > 0 &&
    //     this.state.rangeSlider[1];
    //   data.endDistance =
    //     this.state.rangeSlider !== undefined &&
    //     this.state.rangeSlider !== null &&
    //     this.state.rangeSlider.length > 0 &&
    //     this.state.rangeSlider[1];
    // }
    data.distanceFilter =
      startDistance == 0 && endDistance == 0
        ? ""
        : startDistance !== 0 && endDistance == 0
        ? `Over ${startDistance} Km`
        : startDistance == 0 && endDistance !== 0
        ? `Under ${endDistance} Km`
        : `${startDistance + "-" + endDistance} Km`;
    console.log(data, "adFilter");
    this.props.add_filters(data);
  };

  callFilterApi = () => {
    const modelName =
      this.state.selectAllModels === true && this.state.modelFilterName === ""
        ? ""
        : (this.state.selectedModel || []).length > 0
        ? this.state.selectedModel
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedModel
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedModel
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : this.state.modelFilterName !== ""
        ? JSON.stringify([this.state.modelFilterName].join(","))
        : "";
    const makeName =
      this.state.selectAllMakes === true && this.state.makeFilterName === ""
        ? ""
        : (this.state.selectedMakes || []).length > 0
        ? this.state.selectedMakes
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedMakes
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedMakes
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : this.state.makeFilterName !== ""
        ? JSON.stringify([this.state.makeFilterName].join(","))
        : "";
    const typeVehicle =
      this.state.categoryFilterName === "All Vehicles"
        ? ""
        : this.state.categoryFilterName;
    const typeVehicleName =
      this.state.typeOfVehicle === "All Vehicles"
        ? ""
        : this.state.typeOfVehicle !== ""
        ? (this.state.type_of_vehicle || [])
            .filter(
              (item) => Number(item.id) === Number(this.state.typeOfVehicle)
            )
            .map((item) => {
              return item.name;
            })[0] == undefined
          ? typeVehicle
          : (this.state.type_of_vehicle || [])
              .filter((item) => item.id == this.state.typeOfVehicle)
              .map((item) => {
                return item.name;
              })[0]
        : typeVehicle;
    const subTypeData =
      this.state.selectAllSubTypeVehicle === true
        ? ""
        : (this.state.selectedSubTypes || []).length > 0
        ? this.state.selectedSubTypes.filter((item) => {
            return item.isChecked === true;
          })
        : "";
    const subTypeName =
      subTypeData !== undefined &&
      subTypeData !== null &&
      subTypeData.length > 0
        ? JSON.stringify([
            subTypeData
              .map((item) => {
                return item.name;
              })
              .join(","),
          ])
        : "";
    const trim =
      this.state.selectedTrim === true
        ? ""
        : (this.state.selectedTrim || []).length > 0
        ? this.state.selectedTrim.length > 0
          ? this.state.selectedTrim
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return item.name;
              }) !== undefined &&
            this.state.selectedTrim
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return item.name;
              }).length > 0
            ? JSON.stringify([
                this.state.selectedTrim
                  .filter((item) => item.isChecked === true)
                  .map((item) => {
                    return item.name;
                  })
                  .join(","),
              ])
            : ""
          : ""
        : "";
    const transmission =
      this.state.selectAllTransmission === true
        ? ""
        : this.state.selectedTransmission
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedTransmission
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
        ? JSON.stringify([
            this.state.selectedTransmission
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return item.name;
              })
              .join(","),
          ])
        : "";
    const condition =
      this.state.selectAllCondition === true
        ? ""
        : (this.state.selectedConditions || []).length > 0
        ? this.state.selectedConditions
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.id;
            }) !== undefined &&
          this.state.selectedConditions
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.id;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedConditions
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.id;
                })
                .join(","),
            ])
          : ""
        : "";
    const color =
      this.state.selectAllColor === true
        ? ""
        : (this.state.selectedColor || []).length > 0
        ? this.state.selectedColor
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedColor
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedColor
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const seller_type =
      this.state.selectAllSellerType === true
        ? ""
        : (this.state.selectedSellerType || []).length > 0
        ? this.state.selectedSellerType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedSellerType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedSellerType
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.value;
                })
                .join(","),
            ])
          : ""
        : "";
    const features =
      this.props.vehicle_features.filter((item) => item.checked == true)
        .length > 0
        ? JSON.stringify([
            this.props.vehicle_features
              .filter((item) => item.checked == true)
              .map((item) => {
                return item.v_features;
              })
              .join(","),
          ])
        : "";
    const vehicleFuel =
      this.state.selectAllFuelType === true
        ? ""
        : this.state.selectedFuelType.length > 0
        ? this.state.selectedFuelType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedFuelType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedFuelType
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const vehicleDrive =
      this.state.selectAllDriveTrain === true
        ? ""
        : this.state.selectedDriveTrain.length > 0
        ? this.state.selectedDriveTrain
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedDriveTrain
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedDriveTrain
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const vehicleCylinder =
      this.state.selectAllCylinder === true
        ? ""
        : (this.state.selectedCylinder || []).length > 0
        ? this.state.selectedCylinder
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedCylinder
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedCylinder
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const vehicleSeating =
      this.state.selectAllSeating === true
        ? ""
        : (this.state.selectedSeating || []).length > 0
        ? this.state.selectedSeating
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedSeating
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedSeating
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const vehicleBody =
      this.state.selectAllVehicleBody === true
        ? ""
        : (this.state.selectedBodyType || []).length > 0
        ? this.state.selectedBodyType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedBodyType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedBodyType
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const vehicleAccident =
      this.state.selectAllAccident === true
        ? ""
        : (this.state.selectedAccident || []).length > 0
        ? this.state.selectedAccident
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedAccident
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedAccident
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.id;
                })
                .join(","),
            ])
          : ""
        : "";
    const vehicleOwner =
      this.state.selectAllOwner === true
        ? ""
        : (this.state.selectedOwners || []).length > 0
        ? this.state.selectedOwners
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.id;
            }) !== undefined &&
          this.state.selectedOwners
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.id;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedOwners
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.id;
                })
                .join(","),
            ])
          : ""
        : "";
    const vehiclePassenger =
      this.state.selectAllPassenger === true
        ? ""
        : (this.state.vehiclePassenger || []).length > 0
        ? this.state.vehiclePassenger
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.vehiclePassenger
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.vehiclePassenger
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const hullMaterial =
      this.state.selectAllHullMaterial === true
        ? ""
        : (this.state.hullMaterials || []).length > 0
        ? this.state.hullMaterials
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.hullMaterials
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.hullMaterials
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const steering_type =
      this.state.selectAllSteering === true
        ? ""
        : (this.state.selectedSteering || []).length > 0
        ? this.state.selectedSteering
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedSteering
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedSteering
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const data = {
      start_pay:
        this.state.start_pay == ""
          ? ""
          : this.state.start_pay.split(",").join(""),
      end_pay:
        this.state.end_pay == "" ? "" : this.state.end_pay.split(",").join(""),
      search: this.state.search,
      category: typeVehicleName,
      start_p:
        this.state.fromRange == ""
          ? 0
          : this.state.fromRange
              .replace("$", "")
              .replace(".", "")
              .split(",")
              .join(""),
      end_p:
        this.state.toRange == ""
          ? ""
          : this.state.toRange
              .replace("$", "")
              .replace(".", "")
              .split(",")
              .join(""),
      start_k:
        this.state.fromKilometer == ""
          ? 0
          : this.state.fromKilometer.split(",").join(""),
      end_k:
        this.state.toKilometer == ""
          ? ""
          : this.state.toKilometer.split(",").join(""),
      start_y: this.state.fromYear == "" ? 0 : this.state.fromYear,
      end_y: this.state.toYear,
      make: makeName,
      model: modelName,
      trim: trim,
      transmission: transmission,
      condition: condition,
      color: color,
      seller_type: seller_type,
      features: features,
      vehicleFuel: vehicleFuel,
      vehicleDrive: vehicleDrive,
      vehicleCylinder: vehicleCylinder,
      vehicleSeating: vehicleSeating,
      vehicleBody: vehicleBody,
      vehicleAccident: vehicleAccident,
      vehicleOwner: vehicleOwner,
      vin: this.state.vin,
      start_ec: this.state.start_ec,
      end_ec: this.state.end_ec,
      vehiclePassenger: vehiclePassenger,
      hullMaterial: hullMaterial,
      steering_type: steering_type,
      sortBy: this.state.sortBy,
      start_length: this.state.start_length,
      end_length: this.state.end_length,
      start_hours: this.state.start_hours,
      end_hours: this.state.end_hours,
      start_weight: this.state.start_weight,
      end_weight: this.state.end_weight,
      subTypeName: subTypeName,
      distance: 0,
      p_size: this.state.p_size,
      user_id: this.state.dealer_id,
    };
    console.log(data, "callFilterApi");
    this.props.get_filter_record(data);
  };
  resetState = (name, value) => {
    if (name == "vehicleModel") {
      this.setState({
        ...this.state,
        [name]: "",
        modelFilterName: "",
      });
    } else if (name == "vehicleMake") {
      this.setState({
        ...this.state,
        makeFilterName: "",
        [name]: "",
      });
    } else if (name == "typeOfVehicle") {
      this.setState({
        ...this.state,
        [name]: "",
        category: "",
        categoryFilterName: "",
        allowFilters: [
          {
            id: 7,
            name: "Automotive",
            make: true,
            model: true,
            trim: true,
            year: true,
            body_type: true,
            price: true,
            kilometer: true,
            condition: true,
            transmission: true,
            fuel_type: true,
            drive_train: true,
            cylinder: true,
            seating: true,
            color: true,
            seller_type: true,
            accident: true,
            owners: true,
            features: true,
            passenger: false,
            steering_type: false,
            vin: false,
            engineCC: false,
            hours: false,
            passengers: false,
            steering_types: false,
          },
        ],
        sortBy: "",
        sortBySelected: { name: "", value: "", label: "ALL" },
        fromRange: "",
        toRange: "",
        seller_type: [
          { name: "Private Seller", value: 1 },
          { name: "Dealer", value: 2 },
        ],
        selectAllSellerType: true,
        featureName: "",
        colors: [
          { name: "Green", value: "Green", className: "ColorGreen" },
          { name: "Yellow", value: "Yellow", className: "ColorYellow" },
          { name: "Orange", value: "Orange", className: "ColorOrange" },
          { name: "Purple", value: "Purple", className: "ColorPurple" },
          { name: "Blue", value: "Blue", className: "ColorBlue" },
          { name: "Silver", value: "Silver", className: "ColorSilver" },
          { name: "Black", value: "Black", className: "ColorBlack" },
          { name: "Red", value: "Red", className: "ColorRed" },
          { name: "Gold", value: "Gold", className: "ColorGold" },
          { name: "Grey", value: "Grey", className: "ColorGrey" },
          { name: "Biege", value: "Biege", className: "ColorBiege" },
          { name: "Brown", value: "Brown", className: "ColorBrown" },
        ],
        selectAllColor: true,
        transmission: [
          { name: "Automatic", value: "Automatic" },
          { name: "Manual", value: "Manual" },
        ],
        selectAllTransmission: true,
        selectedTransmission: [],
        transmissionId: "",
        selectTrim: "",
        toYear: new Date().getFullYear() + 1,
        fromYear: 1990,
        vehicleMake: "",
        fromKilometer: "",
        toKilometer: "",
        vehicleModel: "",
        selectCondition: [
          { name: "New", value: "New", id: "New" },
          { name: "Pre-owned", value: "Pre-owned", id: "Used" },
        ],
        selectAllCondition: true,
        selectedConditions: [],
        conditionId: "",
        makeFilterName: "",
        modelFilterName: "",
        search: "",
        paymentPrice: "p",
        start_pay: "",
        end_pay: "",
        start_pay: "",
        end_pay: "",
        vehicleCylinder: cylinders.map((item) => {
          return {
            name: item.value,
            value: item.value,
          };
        }),
        selectAllCylinder: true,
        vehicleSeating: seatings.map((item) => {
          return {
            name: item.label,
            value: item.value,
          };
        }),
        selectAllSeating: true,
        vehicleBody: [],
        selectedBodyType: [],
        selectedBodyTypeId: "",
        selectAllVehicleBody: true,
        vehicleAccident: [
          {
            name: "Previously Accidented",
            value: "previously_accidented",
            id: 1,
          },
          { name: "No Accident Reported", value: "no_accidented", id: 0 },
        ],
        selectAllAccident: true,
        vehicleOwner: [
          { name: "One Owner", value: "one_owner", id: 1 },
          { name: "Multiple Owner", value: "multiple_owner", id: 2 },
        ],
        selectAllOwner: true,
        vin: "",
        start_ec: "",
        end_ec: "",
        hours: "",
        vehiclePassenger: passengers.map((item) => {
          return {
            value: item.value,
            name: item.label,
          };
        }),
        selectAllPassenger: true,
        steering_type: steeringTypes.map((item) => {
          return {
            name: item.name,
            value: item.name,
          };
        }),
        selectAllSteering: true,
        subTypeOfVehicle: "",
        allTrims: [],
        selectAllTrims: true,
        allModels: [],
        selectAllModels: true,
        allMakes: [],
        selectAllMakes: true,
        selectedMakeId: "",
        selectedMakes: [],
        selectedModel: [],
        selectedModelId: "",
        selectedTrim: [],
        selectedTrimId: "",
        selectedSubTypes: [],
        subTypeId: "",
        start_hours: "",
        end_hours: "",
        start_length: "",
        end_length: "",
        start_weight: "",
        end_weight: "",
        hull_material: "",
        hullMaterials: [
          { name: "Aluminum", value: "Aluminum" },
          { name: "Composite", value: "Composite" },
          { name: "Ferro-cement", value: "Ferro-cement" },
          { name: "Fiberglass", value: "Fiberglass" },
          { name: "Hypalon", value: "Hypalon" },
          { name: "PVC", value: "PVC" },
          { name: "Roplene", value: "Roplene" },
          { name: "Steel", value: "Steel" },
          { name: "Wood", value: "Wood" },
          { name: "Other", value: "Other" },
        ],
        selectAllHullMaterial: true,
        selectedHullMaterial: [],
        hullMaterialId: "",
        selectedFuelType: [],
        selectedCylinder: [],
        selectedSeating: [],
        selectedColor: [],
        selectedOwners: [],
        selectedSellerType: [],
        selectAllSellerType: true,
        selectedAccident: [],
        selectedPassenger: [],
        selectedSteering: [],
        vehicleLoader: false,
        selectAllFeatures: true,
      });
      this.props.remove_filter("allFeatures", "");
      setTimeout(() => {
        this.add_filter_reducer();
        this.callFilterApi();
      }, 10);
      return true;
    } else if (name == "subTypeOfVehicle") {
      this.setState({
        ...this.state,
        [name]: "",
      });
    } else if (name == "vehicleFuel") {
      this.setState({
        ...this.state,
        vehicleFuelType: "",
      });
    } else if (name == "location") {
      this.setState({
        ...this.state,
        searchKm: "",
        latitude: "",
        longitude: "",
      });
    } else if (name === "priceFilter") {
      this.setState({
        ...this.state,
        fromRange: "",
        toRange: "",
      });
    } else if (name === "kilometerFilter") {
      this.setState({
        ...this.state,
        fromKilometer: "",
        toKilometer: "",
      });
    } else if (name === "yearFilter") {
      this.setState({
        ...this.state,
        selectedFromYear: "",
        fromYear: "",
        selectedToYear: "",
        toYear: "",
        startDate: "",
        endDate: "",
      });
    } else if (name === "enginFilter") {
      this.setState({
        ...this.state,
        start_ec: "",
        end_ec: "",
      });
    } else if (name === "hoursFilter") {
      this.setState({
        ...this.state,
        start_hours: "",
        end_hours: "",
      });
    } else if (name === "lengthFilter") {
      this.setState({
        ...this.state,
        start_length: "",
        end_length: "",
      });
    } else if (name === "weightFilter") {
      this.setState({
        ...this.state,
        start_weight: "",
        end_weight: "",
      });
    } else if (name === "distanceFilter") {
      this.setState({
        ...this.state,
        distance: 0,
        rangeSlider: [0, 0],
      });
    } else {
      this.setState({
        ...this.state,
        [name]: "",
      });
    }
    this.props.remove_filter(name, value);
    setTimeout(() => {
      this.callFilterApi();
    }, 10);
  };
  resetAllState = () => {
    this.setState({
      ...this.state,
      startDate: "",
      endDate: "",
      category: "",
      subTypeOfVehicle: "",
      selectedTypeOfVehicle: "",
      sortBy: "",
      featureName: "",
      selectTrim: "",
      toYear: "",
      fromYear: "",
      vehicleMake: "",
      fromKilometer: "",
      toKilometer: "",
      vehicleModel: "",
      typeOfVehicle: "All Vehicles",
      categoryFilterName: "",
      makeFilterName: "",
      modelFilterName: "",
      search: "",
      searchKm: "",
      latitude: "",
      longitude: "",
      paymentPrice: "p",
      start_pay: "",
      end_pay: "",
      vin: "",
      start_ec: "",
      end_ec: "",
      hours: "",
      allowFilters: [
        {
          id: 7,
          name: "Automotive",
          make: true,
          model: true,
          trim: true,
          year: true,
          body_type: true,
          price: true,
          kilometer: true,
          condition: true,
          transmission: true,
          fuel_type: true,
          drive_train: true,
          cylinder: true,
          seating: true,
          color: true,
          seller_type: true,
          accident: true,
          owners: true,
          features: true,
          passenger: false,
          steering_type: false,
          vin: false,
          engineCC: false,
          hours: false,
          passengers: false,
          steering_types: false,
        },
      ],
      distance: 0,
      selectedToYear: [
        { label: new Date().getFullYear(), value: new Date().getFullYear() },
      ],
      selectedFromYear: [{ label: "1990", value: 1990 }],
      rangeSlider: [0, 0],
      checkAllCanda: false,
      seller_type: [
        { name: "Private Seller", value: 1 },
        { name: "Dealer", value: 2 },
      ],
      selectAllSellerType: true,
      color: "All Color",
      // color:
      //   this.props.location.query !== undefined
      //     ? this.props.location.query.color !== undefined
      //       ? this.props.location.query.color
      //       : "All Color"
      //     : "All Color",
      transmission: [
        { name: "Automatic", value: "Automatic" },
        { name: "Manual", value: "Manual" },
      ],
      selectAllTransmission: true,
      selectedTransmission: [],
      transmissionId: "",
      toYear: new Date().getFullYear() + 1,
      // toYear:
      //   this.props.location.query !== undefined &&
      //     this.props.location.query.fromYear !== undefined
      //     ? this.props.location.query.fromYear
      //     : new Date().getFullYear() + 1,
      fromYear: 1990,
      selectCondition: [
        { name: "New", value: "New", id: "New" },
        { name: "Pre-owned", value: "Pre-owned", id: "Used" },
      ],
      selectAllCondition: true,
      selectedConditions: [],
      conditionId: "",
      vehicle_make: [],
      vehicle_model: [],
      selectAllFuelType: true,
      selectedFuelType: [],
      fuelTypeId: "",
      vehicleDriveTrain: [],
      selectAllDriveTrain: true,
      vehicleCylinder: cylinders.map((item) => {
        return {
          name: item.value,
          value: item.value,
        };
      }),
      selectAllCylinder: true,
      vehicleSeating: seatings.map((item) => {
        return {
          name: item.label,
          value: item.value,
        };
      }),
      selectAllSeating: true,
      colors: [
        { name: "Green", value: "Green", className: "ColorGreen" },
        { name: "Yellow", value: "Yellow", className: "ColorYellow" },
        { name: "Orange", value: "Orange", className: "ColorOrange" },
        { name: "Purple", value: "Purple", className: "ColorPurple" },
        { name: "Blue", value: "Blue", className: "ColorBlue" },
        { name: "Silver", value: "Silver", className: "ColorSilver" },
        { name: "Black", value: "Black", className: "ColorBlack" },
        { name: "Red", value: "Red", className: "ColorRed" },
        { name: "Gold", value: "Gold", className: "ColorGold" },
        { name: "Grey", value: "Grey", className: "ColorGrey" },
        { name: "Biege", value: "Biege", className: "ColorBiege" },
        { name: "Brown", value: "Brown", className: "ColorBrown" },
      ],
      selectAllColor: true,
      vehicleBody: [],
      selectedBodyType: [],
      selectedBodyTypeId: "",
      selectAllVehicleBody: true,
      vehicleAccident: [
        {
          name: "Previously Accidented",
          value: "previously_accidented",
          id: 1,
        },
        { name: "No Accident Reported", value: "no_accidented", id: 0 },
      ],
      selectAllAccident: true,
      vehicleOwner: [
        { name: "One Owner", value: "one_owner", id: 1 },
        { name: "Multiple Owner", value: "multiple_owner", id: 2 },
      ],
      selectAllOwner: true,
      vehiclePassenger: passengers.map((item) => {
        return {
          value: item.value,
          name: item.label,
        };
      }),
      selectAllPassenger: true,
      toggleMobileView: false,
      steering_type: steeringTypes.map((item) => {
        return {
          name: item.name,
          value: item.name,
        };
      }),
      selectAllSteering: true,
      p_size: 30,
      t_p_size: 10,
      sort_by_filters: [
        {
          name: "Price Lowest First",
          value: "price_lowest_first",
        },
        {
          name: "Price Highest First",
          value: "price_highest_first",
        },
        {
          name: "Listings Newest",
          value: "listings_newest",
        },
        {
          name: "Listings Oldest",
          value: "listings_oldest",
        },
        {
          name: "Distance Nearest",
          value: "distance_nearest",
        },
        {
          name: "Distance Farthest",
          value: "distance_farthest",
        },
        {
          name: "Year Nearest",
          value: "year_nearest",
        },
        {
          name: "Year Lowest",
          value: "year_lowest",
        },
        {
          name: "Mileage Lowest",
          value: "mileage_lowest",
        },
        {
          name: "Mileage Highest",
          value: "mileage_highest",
        },
      ],
      allTrims: [],
      selectAllTrims: true,
      allModels: [],
      selectAllModels: true,
      allMakes: [],
      selectAllMakes: true,
      newMakeId: "",
      oldMakeId: "",

      selectAllSubTypeVehicle: true,
      newVehicleId: "",
      oldVehicleId: "",
      selectedSeating: [],
      selectedSeatingId: "",
      selectedColor: [],
      selectedColorId: "",
      selectedOwners: [],
      selectedOwnerId: "",
      selectedSellerType: [],
      selectedSellerId: "",
      selectedAccident: [],
      selectedAccidentId: "",
      selectedDriveTrain: [],
      driveTrainId: "",
      selectedCylinderId: "",
      selectedCylinder: [],
      selectedPassenger: [],
      selectedPassengerId: "",
      selectedSteering: [],
      selectedSteeringTypeId: "",
      selectedSubTypes: [],
      subTypeId: "",
      start_hours: "",
      end_hours: "",
      start_length: "",
      end_length: "",
      start_weight: "",
      end_weight: "",
      hull_material: "",
      hullMaterials: [
        { name: "Aluminum", value: "Aluminum" },
        { name: "Composite", value: "Composite" },
        { name: "Ferro-cement", value: "Ferro-cement" },
        { name: "Fiberglass", value: "Fiberglass" },
        { name: "Hypalon", value: "Hypalon" },
        { name: "PVC", value: "PVC" },
        { name: "Roplene", value: "Roplene" },
        { name: "Steel", value: "Steel" },
        { name: "Wood", value: "Wood" },
        { name: "Other", value: "Other" },
      ],
      selectAllHullMaterial: true,
      selectedHullMaterial: [],
      hullMaterialId: "",
      subTypeVehicle: this.state.subTypeVehicle.map((item) => {
        return { ...item, isChecked: false };
      }),
    });
    this.props.remove_all_filter();
    this.props.remove_all_features();
    // this.props.remove_all()
    setTimeout(() => {
      this.callFilterApi();
    }, 100);
    // this.callFilterApi()
  };

  removeFeatures = (id) => {
    this.props.toggle_vehicle_features(id);
    this.props.remove_filter_feature(id);
    setTimeout(() => {
      this.callFilterApi();
    }, 10);
  };
  changePaymentPrice = (e) => {
    this.setState({
      ...this.state,
      paymentPrice: e,
    });
  };
  onSliderChange = (value) => {
    this.setState({
      ...this.state,
      rangeSlider: value,
    });
  };
  searchPost = () => {
    const modelName =
      this.state.selectAllModels === true && this.state.modelFilterName === ""
        ? ""
        : (this.state.selectedModel || []).length > 0
        ? this.state.selectedModel
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedModel
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedModel
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : this.state.modelFilterName !== ""
        ? JSON.stringify([this.state.modelFilterName].join(","))
        : "";
    const makeName =
      this.state.selectAllMakes === true && this.state.makeFilterName === ""
        ? ""
        : (this.state.selectedMakes || []).length > 0
        ? this.state.selectedMakes
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedMakes
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedMakes
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : this.state.makeFilterName !== ""
        ? JSON.stringify([this.state.makeFilterName].join(","))
        : "";
    const typeVehicle =
      this.state.categoryFilterName === "All Vehicles"
        ? ""
        : this.state.categoryFilterName;
    const typeVehicleName =
      this.state.typeOfVehicle === "All Vehicles"
        ? ""
        : this.state.typeOfVehicle !== ""
        ? (this.state.type_of_vehicle || [])
            .filter(
              (item) => Number(item.id) === Number(this.state.typeOfVehicle)
            )
            .map((item) => {
              return item.name;
            })[0] == undefined
          ? typeVehicle
          : (this.state.type_of_vehicle || [])
              .filter((item) => item.id == this.state.typeOfVehicle)
              .map((item) => {
                return item.name;
              })[0]
        : typeVehicle;
    const subTypeData =
      this.state.selectAllSubTypeVehicle === true
        ? ""
        : (this.state.selectedSubTypes || []).length > 0
        ? this.state.selectedSubTypes.filter((item) => {
            return item.isChecked === true;
          })
        : "";
    const subTypeName =
      subTypeData !== undefined &&
      subTypeData !== null &&
      subTypeData.length > 0
        ? JSON.stringify([
            subTypeData
              .map((item) => {
                return item.name;
              })
              .join(","),
          ])
        : "";
    const trim =
      this.state.selectedTrim === true
        ? ""
        : (this.state.selectedTrim || []).length > 0
        ? this.state.selectedTrim.length > 0
          ? this.state.selectedTrim
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return item.name;
              }) !== undefined &&
            this.state.selectedTrim
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return item.name;
              }).length > 0
            ? JSON.stringify([
                this.state.selectedTrim
                  .filter((item) => item.isChecked === true)
                  .map((item) => {
                    return item.name;
                  })
                  .join(","),
              ])
            : ""
          : ""
        : "";
    const transmission =
      this.state.selectAllTransmission === true
        ? ""
        : this.state.selectedTransmission
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedTransmission
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
        ? JSON.stringify([
            this.state.selectedTransmission
              .filter((item) => item.isChecked === true)
              .map((item) => {
                return item.name;
              })
              .join(","),
          ])
        : "";
    const condition =
      this.state.selectAllCondition === true
        ? ""
        : (this.state.selectedConditions || []).length > 0
        ? this.state.selectedConditions
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.id;
            }) !== undefined &&
          this.state.selectedConditions
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.id;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedConditions
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.id;
                })
                .join(","),
            ])
          : ""
        : "";
    const color =
      this.state.selectAllColor === true
        ? ""
        : (this.state.selectedColor || []).length > 0
        ? this.state.selectedColor
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedColor
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedColor
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const seller_type =
      this.state.selectAllSellerType === true
        ? ""
        : (this.state.selectedSellerType || []).length > 0
        ? this.state.selectedSellerType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedSellerType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedSellerType
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.value;
                })
                .join(","),
            ])
          : ""
        : "";
    const features =
      this.props.vehicle_features.filter((item) => item.checked == true)
        .length > 0
        ? JSON.stringify([
            this.props.vehicle_features
              .filter((item) => item.checked == true)
              .map((item) => {
                return item.v_features;
              })
              .join(","),
          ])
        : "";
    const vehicleFuel =
      this.state.selectAllFuelType === true
        ? ""
        : this.state.selectedFuelType.length > 0
        ? this.state.selectedFuelType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedFuelType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedFuelType
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const vehicleDrive =
      this.state.selectAllDriveTrain === true
        ? ""
        : this.state.selectedDriveTrain.length > 0
        ? this.state.selectedDriveTrain
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedDriveTrain
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedDriveTrain
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const vehicleCylinder =
      this.state.selectAllCylinder === true
        ? ""
        : (this.state.selectedCylinder || []).length > 0
        ? this.state.selectedCylinder
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedCylinder
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedCylinder
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const vehicleSeating =
      this.state.selectAllSeating === true
        ? ""
        : (this.state.selectedSeating || []).length > 0
        ? this.state.selectedSeating
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedSeating
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedSeating
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const vehicleBody =
      this.state.selectAllVehicleBody === true
        ? ""
        : (this.state.selectedBodyType || []).length > 0
        ? this.state.selectedBodyType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedBodyType
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedBodyType
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const vehicleAccident =
      this.state.selectAllAccident === true
        ? ""
        : (this.state.selectedAccident || []).length > 0
        ? this.state.selectedAccident
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedAccident
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedAccident
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.id;
                })
                .join(","),
            ])
          : ""
        : "";
    const vehicleOwner =
      this.state.selectAllOwner === true
        ? ""
        : (this.state.selectedOwners || []).length > 0
        ? this.state.selectedOwners
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.id;
            }) !== undefined &&
          this.state.selectedOwners
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.id;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedOwners
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.id;
                })
                .join(","),
            ])
          : ""
        : "";
    const vehiclePassenger =
      this.state.selectAllPassenger === true
        ? ""
        : (this.state.vehiclePassenger || []).length > 0
        ? this.state.vehiclePassenger
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.vehiclePassenger
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.vehiclePassenger
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const hullMaterial =
      this.state.selectAllHullMaterial === true
        ? ""
        : (this.state.hullMaterials || []).length > 0
        ? this.state.hullMaterials
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.hullMaterials
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.hullMaterials
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const steering_type =
      this.state.selectAllSteering === true
        ? ""
        : (this.state.selectedSteering || []).length > 0
        ? this.state.selectedSteering
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }) !== undefined &&
          this.state.selectedSteering
            .filter((item) => item.isChecked === true)
            .map((item) => {
              return item.name;
            }).length > 0
          ? JSON.stringify([
              this.state.selectedSteering
                .filter((item) => item.isChecked === true)
                .map((item) => {
                  return item.name;
                })
                .join(","),
            ])
          : ""
        : "";
    const data = {
      start_pay:
        this.state.start_pay == ""
          ? ""
          : this.state.start_pay.split(",").join(""),
      end_pay:
        this.state.end_pay == "" ? "" : this.state.end_pay.split(",").join(""),
      search: this.state.search,
      category: typeVehicleName,
      start_p:
        this.state.fromRange == ""
          ? 0
          : this.state.fromRange
              .replace("$", "")
              .replace(".", "")
              .split(",")
              .join(""),
      end_p:
        this.state.toRange == ""
          ? ""
          : this.state.toRange
              .replace("$", "")
              .replace(".", "")
              .split(",")
              .join(""),
      start_k:
        this.state.fromKilometer == ""
          ? 0
          : this.state.fromKilometer.split(",").join(""),
      end_k:
        this.state.toKilometer == ""
          ? ""
          : this.state.toKilometer.split(",").join(""),
      start_y: this.state.fromYear == "" ? 0 : this.state.fromYear,
      end_y: this.state.toYear,
      make: makeName,
      model: modelName,
      trim: trim,
      transmission: transmission,
      condition: condition,
      color: color,
      seller_type: seller_type,
      features: features,
      vehicleFuel: vehicleFuel,
      vehicleDrive: vehicleDrive,
      vehicleCylinder: vehicleCylinder,
      vehicleSeating: vehicleSeating,
      vehicleBody: vehicleBody,
      vehicleAccident: vehicleAccident,
      vehicleOwner: vehicleOwner,
      vin: this.state.vin,
      start_ec: this.state.start_ec,
      end_ec: this.state.end_ec,
      hours: this.state.hours,
      vehiclePassenger: vehiclePassenger,
      hullMaterial: hullMaterial,
      steering_type: steering_type,
      sortBy: this.state.sortBy,
      start_length: this.state.start_length,
      end_length: this.state.end_length,
      start_hours: this.state.start_hours,
      end_hours: this.state.end_hours,
      start_weight: this.state.start_weight,
      end_weight: this.state.end_weight,
      // subTypeOfVehicle: this.state.subTypeOfVehicle,
      subTypeName: subTypeName,
      // distance: this.state.distance,
      distance: 0,
      // endDistance: this.state.rangeSlider !== undefined && this.state.rangeSlider !== null && this.state.rangeSlider.length > 0 ? this.state.rangeSlider[1] : 0,
      // checkAllCanda: this.state.checkAllCanda,
      p_size: this.state.p_size,
      user_id: this.state.dealer_id,
    };
    this.props.get_filter_record(data);
  };
  componentWillUnmount() {
    this.props.remove_all_posts();
    this.props.remove_all();
  }
  camelize = (str) => {
    return str.replace(/\W+(.)/g, function (match, chr) {
      return chr.toUpperCase();
    });
  };
  handleChangeSelect = (e, inputName, formName, reduxName) => {
    this.setState({
      ...this.state,
      [inputName]: e,
      [formName]:
        e !== undefined && e !== null
          ? e.value !== undefined && e.value !== null
            ? e.value
            : ""
          : "",
      [reduxName]: e ? (e.value ? e.value : "") : "",
    });
  };
  handleOnChack = () => {
    this.setState({
      ...this.state,
      checkAllCanda: !this.state.checkAllCanda,
    });
  };
  setLocation = (location, lat, log) => {
    // window.$('#googleMapModelHome').modal('hide')
    if (
      this.state.firstSearchKm !== undefined &&
      this.state.firstSearchKm !== ""
    ) {
      this.setState({
        ...this.state,
        searchKm: location,
        latitude: Number(lat).toFixed(7),
        longitude: Number(log).toFixed(7),
      });
    } else {
      this.setState({
        ...this.state,
        firstSearchKm: location,
        searchKm: location,
        latitude: Number(lat).toFixed(7),
        longitude: Number(log).toFixed(7),
      });
    }
  };
  setDistance = (distance) => {
    this.setState({
      ...this.state,
      rangeSlider: [0, distance],
    });
  };
  toggleGoogleMap = () => {
    window.$("#googleMapModelHome").modal("show");
  };

  handleChangeSelectVehicle = (e, formName, name, additionalName) => {
    this.setState({
      ...this.state,
      [formName]: e,
      [name]:
        e !== undefined && e !== null
          ? e.value !== undefined && e.value !== null
            ? e.value
            : ""
          : "",
      [additionalName]:
        e !== undefined && e !== null
          ? e.value !== undefined && e.value !== null
            ? e.value
            : ""
          : "",
    });
  };

  handleOnSelect = (value, name, allSelect, selectState, selectedId, id) => {
    this.setState({
      ...this.state,
      [name]: this.state[name].map((item) => {
        if (item.name === value) {
          return {
            ...item,
            isChecked: !item.isChecked,
          };
        }
        return item;
      }),
      [allSelect]: false,
      [selectState]: this.state[name].map((item) => {
        if (item.name === value) {
          return {
            ...item,
            isChecked: !item.isChecked,
          };
        }
        return item;
      }),
      [selectedId]: id,
    });
  };
  handleOnSelectMakeModel = (
    value,
    name,
    allSelect,
    selectState,
    selectedId,
    id
  ) => {
    this.setState({
      ...this.state,
      [name]: this.state[name].map((item) => {
        if (Number(item.value) === Number(id)) {
          return {
            ...item,
            isChecked: !item.isChecked,
          };
        }
        return item;
      }),
      [allSelect]: false,
      [selectState]: this.state[name].map((item) => {
        if (Number(item.value) === Number(id)) {
          return {
            ...item,
            isChecked: !item.isChecked,
          };
        }
        return item;
      }),
      [selectedId]: id,
      vehicleMake:
        selectState === "selectedMakes" &&
        Number(this.state.vehicleMake) === Number(id)
          ? ""
          : this.state.vehicleMake,
      makeFilterName:
        selectState === "selectedMakes" &&
        Number(this.state.vehicleMake) === Number(id)
          ? ""
          : this.state.makeFilterName,
      vehicleModel:
        selectState === "selectedModel" &&
        Number(this.state.vehicleModel) === Number(id)
          ? ""
          : this.state.vehicleModel,
      modelFilterName:
        selectState === "selectedModel" &&
        Number(this.state.vehicleModel) === Number(id)
          ? ""
          : this.state.modelFilterName,
    });
  };
  handleOnSelectAll = (name, allName, selectState, id) => {
    this.setState({
      ...this.state,
      [name]: !this.state[name],
      [allName]: this.state[allName].map((item) => {
        return {
          ...item,
          isChecked: false,
        };
      }),
      [selectState]: this.state[allName].map((item) => {
        return {
          ...item,
          isChecked: false,
        };
      }),
      [id]: "",
      vehicleMake: name === "selectAllMakes" ? "" : this.state.vehicleMake,
      makeFilterName:
        name === "selectAllMakes" ? "" : this.state.makeFilterName,
      vehicleModel: name === "selectAllModels" ? "" : this.state.vehicleModel,
      modelFilterName:
        name === "selectAllModels" ? "" : this.state.modelFilterName,
    });
    setTimeout(() => {
      this.add_filter_reducer();
    }, 10);
  };
  removeMultiSelect = (formName, stateName, reduxName, id) => {
    this.setState({
      ...this.state,
      [formName]: this.state[formName].map((item) => {
        if (Number(item.value) === Number(id)) {
          return {
            ...item,
            isChecked: false,
          };
        }
        return item;
      }),
      [stateName]: this.state[formName].map((item) => {
        if (Number(item.value) === Number(id)) {
          return {
            ...item,
            isChecked: false,
          };
        }
        return item;
      }),
      vehicleMake:
        stateName === "selectedMakes" &&
        Number(this.state.vehicleMake) === Number(id)
          ? ""
          : this.state.vehicleMake,
      makeFilterName:
        stateName === "selectedMakes" &&
        Number(this.state.vehicleMake) === Number(id)
          ? ""
          : this.state.makeFilterName,
      vehicleModel:
        stateName === "selectedModel" &&
        Number(this.state.vehicleModel) === Number(id)
          ? ""
          : this.state.vehicleModel,
      modelFilterName:
        stateName === "selectedModel" &&
        Number(this.state.vehicleModel) === Number(id)
          ? ""
          : this.state.modelFilterName,
    });
    this.props.remove_filter(reduxName, id);
  };
  removeMultiSelectString = (formName, stateName, reduxName, id) => {
    this.setState({
      ...this.state,
      [formName]: this.state[formName].map((item) => {
        if (item.value.toString() === id.toString()) {
          return {
            ...item,
            isChecked: false,
          };
        }
        return item;
      }),
      [stateName]: this.state[formName].map((item) => {
        if (item.value.toString() === id.toString()) {
          return {
            ...item,
            isChecked: false,
          };
        }
        return item;
      }),
    });
    this.props.remove_filter(reduxName, id);
  };
  toggleCheckAllFeatures = () => {
    this.setState({
      ...this.state,
      selectAllFeatures: !this.state.selectAllFeatures,
    });
    this.props.remove_selected_features();
    this.props.remove_filter("allFeatures", "");
    setTimeout(() => {
      this.callFilterApi();
    }, 10);
  };
  searchOnLocation = () => {
    this.add_filter_reducer();
    this.callFilterApi();
  };
  toTitleCase = (str) => {
    return str.toLowerCase().replace(/(?:^|[\s-/])\w/g, function (match) {
      return match.toUpperCase();
    });
  };
  handleOnChangeSort = (e) => {
    this.setState({
      ...this.state,
      sortBySelected: e,
      sortBy: e ? (e.value ? e.value : "") : "",
    });
    setTimeout(() => {
      this.add_filter_reducer();
      this.callFilterApi();
    }, 20);
  };

  render() {
    const { Range } = Slider;
    const log = (value) => {
      this.onSliderChange(value);
      console.log(value); //eslint-disable-line
    };
    let first =
      this.state.name !== undefined &&
      this.state.name !== null &&
      this.state.name !== ""
        ? this.state.name.split(" ")[0]
        : "";
    let last =
      this.state.name !== undefined &&
      this.state.name !== null &&
      this.state.name !== ""
        ? this.state.name.split(" ")[1]
        : "";
    last =
      last === "&"
        ? this.state.name !== undefined &&
          this.state.name !== null &&
          this.state.name !== ""
          ? this.state.name.split(" ")[2]
          : last
        : last;
    console.log(last, "last");
    first = first ? first.charAt(0).toUpperCase() : "";
    last = last ? last.charAt(0).toUpperCase() : "";
    return (
      <React.Fragment>
        <Helmet>
          <title>Search</title>
          <meta name="description" content="" />
        </Helmet>
        <div className="inner-pages-banner dealer-listing-banner">
          <img
            src="/assets/image/dealer-banner-image.jpg"
            className="d-none d-sm-block"
            alt=""
          />
          <img
            src="/assets/image/dealer-list-mobile.png"
            className="d-block d-sm-none"
            alt=""
          />
          <div className="banner-detail-sec">
            <div className="dealer-detail-col">
              <div className="dealer-logo-holder">
                {this.state.logoPath ? (
                  <img
                    src={
                      this.state.logoPath
                        ? API_URL + this.state.logoPath
                        : "/assets/image/dealer-logo.svg"
                    }
                    alt=""
                  />
                ) : (
                  <span className="dealer-list-avatar">
                    {" "}
                    {`${first}${last}`}{" "}
                  </span>
                )}
              </div>
            </div>
            <div className="dealer-detail-col">
              <div className="dealer-detail">
                <h1>
                  {/* {this.state.firstName !== undefined &&
                    this.state.firstName !== null
                    ? this.state.firstName
                    : ""}{" "} */}
                  {this.state.lastName !== undefined &&
                  this.state.lastName !== null
                    ? this.state.lastName
                    : ""}
                </h1>
                <ul className="dealer-detail-list clearfix">
                  {this.state.city ? (
                    <li className="dealer-detail-list-item location">
                      <span className="detail-icon"> </span>
                      {this.state.city ? this.state.city : ""}
                    </li>
                  ) : null}
                  {this.state.telephone ? (
                    <li className="dealer-detail-list-item tel">
                      <span className="detail-icon"> </span>
                      {this.state.telephone ? this.state.telephone : ""}
                    </li>
                  ) : null}

                  {this.state.email ? (
                    <li className="dealer-detail-list-item email">
                      <span className="detail-icon"> </span>
                      {this.state.email ? this.state.email : ""}
                    </li>
                  ) : null}
                  {this.state.website ? (
                    <li className="dealer-detail-list-item url">
                      <span className="detail-icon"> </span>
                      {this.state.website}
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section className="Section-ListandGrid">
          <div className="search-main-holder">
            <div className="filters-col">
              <div className="MobileSearch pl-3 pr-3 pt-3">
                <div className="MobileFilter-Container">
                  {/* <div className="TorontoFilter" onClick={this.toggleGoogleMap}>
                    <i className="icon-subtract-icon"></i>
                    <h1>
                      {this.state.searchKm !== undefined &&
                        this.state.searchKm !== null &&
                        this.state.searchKm !== ""
                        ? this.state.searchKm.split(",").slice(-3, -1)[0] +
                        ", " +
                        this.state.searchKm
                          .split(",")
                          .slice(-2, -1)[0]
                          .split(" ")[1]
                        : ""}{" "}
                      - {this.state.distance || 0}km
                    </h1>
                    {/* <h1>{this.state.searchKm} - {this.state.distance || 0}km</h1> *
                  </div> */}

                  <div
                    className="choosefilter"
                    onClick={() =>
                      this.setState({
                        ...this.state,
                        toggleMobileView: !this.state.toggleMobileView,
                      })
                    }
                  >
                    <img src="/assets/image/responsive-filter.svg" alt="" />
                    <h2>
                      Filters(
                      {this.props.selected_filter_list.length !== 0 &&
                      this.props.selected_filter_list !== undefined
                        ? this.props.selected_filter_list.length
                        : 0}
                      )
                    </h2>
                  </div>

                  <div
                    className="FilterStep3"
                    onClick={() =>
                      this.setState({
                        ...this.state,
                        toggleMobileView: !this.state.toggleMobileView,
                      })
                    }
                  >
                    <div className="Responsivedrop">
                      <img
                        src="/assets/image/arrow-down.svg"
                        alt="Responsivedrop"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/** Mobile View */}
              {/* <div className="LeftMenu-Container"> */}
              <div
                className={
                  this.state.toggleMobileView === true
                    ? "LeftMenu-Container"
                    : "LeftMenu-Container mobile-display-none"
                }
              >
                <div className="mobilesearch">
                  <div
                    className="cross-list-mobile"
                    onClick={() =>
                      this.setState({
                        ...this.state,
                        toggleMobileView: !this.state.toggleMobileView,
                      })
                    }
                  ></div>
                </div>

                <div className="Filter-Head">
                  <h1>Filters</h1>
                  <button type="button" onClick={this.resetAllState}>
                    Clear Filters
                  </button>
                </div>

                <div className="FilterList">
                  <ul>
                    {this.props.selected_filter_list.length !== 0 &&
                    this.props.selected_filter_list !== undefined
                      ? this.props.selected_filter_list.map((item, index) => (
                          <React.Fragment key={index}>
                            {/* {item.location !== '' && item.location !== undefined && item.location !== null ? (<React.Fragment>
                                                    <li key={index}>
                                                        <a >
                                                            {item.location} <div className="Filter-Close" onClick={() => this.resetState('location', item.location)}></div>
                                                        </a>
                                                    </li>
                                                </React.Fragment>) : null} */}
                            {/* {item.distanceFilter !== '' && item.distanceFilter !== undefined && item.distanceFilter !== null ? (<React.Fragment>
                                                    <li key={index}>
                                                        <a >
                                                            {item.distanceFilter} <div className="Filter-Close" onClick={() => this.resetState('distanceFilter', item.distanceFilter)}></div>
                                                        </a>
                                                    </li>
                                                </React.Fragment>) : null} */}
                            {item.sortBy !== "" &&
                            item.sortBy !== undefined &&
                            item.sortBy !== null &&
                            item.sortBy !== "All Sort By" ? (
                              <React.Fragment>
                                <li key={index}>
                                  <a>
                                    {item.sortBy}{" "}
                                    <div
                                      className="Filter-Close"
                                      onClick={() =>
                                        this.resetState("sortBy", item.sortBy)
                                      }
                                    ></div>
                                  </a>
                                </li>
                              </React.Fragment>
                            ) : null}
                            {item.priceFilter !== "" &&
                            item.priceFilter !== undefined &&
                            item.priceFilter !== null &&
                            Number(item.priceFilter) !== 0 ? (
                              <React.Fragment>
                                <li key={index}>
                                  <a>
                                    {item.priceFilter}{" "}
                                    <div
                                      className="Filter-Close"
                                      onClick={() =>
                                        this.resetState(
                                          "priceFilter",
                                          item.priceFilter
                                        )
                                      }
                                    ></div>
                                  </a>
                                </li>
                              </React.Fragment>
                            ) : null}
                            {item.category !== "" &&
                            item.category !== undefined &&
                            item.category !== null &&
                            item.category !== "All Vehicles" ? (
                              <React.Fragment>
                                <li key={index}>
                                  <a>
                                    {item.category}{" "}
                                    <div
                                      className="Filter-Close"
                                      onClick={() =>
                                        this.resetState(
                                          "typeOfVehicle",
                                          item.category
                                        )
                                      }
                                    ></div>
                                  </a>
                                </li>
                              </React.Fragment>
                            ) : null}
                            {item.subTypeName !== "" &&
                            item.subTypeName !== undefined &&
                            item.subTypeName !== null &&
                            item.subTypeName.length > 0 ? (
                              <React.Fragment>
                                {item.subTypeName.map(
                                  (subType, subTypeIndex) => (
                                    <li key={subTypeIndex}>
                                      <a>
                                        {subType.name}{" "}
                                        <div
                                          className="Filter-Close"
                                          onClick={() =>
                                            this.removeMultiSelect(
                                              "selectedSubTypes",
                                              "subTypeVehicle",
                                              "vehicleSubType",
                                              subType.id
                                            )
                                          }
                                        ></div>
                                      </a>
                                    </li>
                                  )
                                )}
                              </React.Fragment>
                            ) : null}
                            {item.make !== "" &&
                            item.make !== undefined &&
                            item.make !== null &&
                            item.make.length > 0 ? (
                              <React.Fragment>
                                {item.make.map((mak, makeIndex) => (
                                  <li key={makeIndex}>
                                    <a>
                                      {this.toTitleCase(mak.name)}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelect(
                                            "allMakes",
                                            "selectedMakes",
                                            "vehicleMake",
                                            mak.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.model !== "" &&
                            item.model !== undefined &&
                            item.model !== null &&
                            item.model.length > 0 ? (
                              <React.Fragment>
                                {item.model.map((mod, modIndex) => (
                                  <li key={modIndex}>
                                    <a>
                                      {this.toTitleCase(mod.name)}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelect(
                                            "allModels",
                                            "selectedModel",
                                            "vehicleModel",
                                            mod.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.trim !== "" &&
                            item.trim !== undefined &&
                            item.trim !== null &&
                            item.trim.length > 0 ? (
                              <React.Fragment>
                                {item.trim.map((tri, triIndex) => (
                                  <li key={triIndex}>
                                    <a>
                                      {this.toTitleCase(tri.name)}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelect(
                                            "allTrims",
                                            "selectedTrim",
                                            "selectTrim",
                                            tri.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.yearFilter !== "" &&
                            item.yearFilter !== undefined &&
                            item.yearFilter !== null &&
                            Number(item.yearFilter) !== 0 ? (
                              <React.Fragment>
                                <li key={index}>
                                  <a>
                                    {item.yearFilter}{" "}
                                    <div
                                      className="Filter-Close"
                                      onClick={() =>
                                        this.resetState(
                                          "yearFilter",
                                          item.yearFilter
                                        )
                                      }
                                    ></div>
                                  </a>
                                </li>
                              </React.Fragment>
                            ) : null}
                            {item.kilometerFilter !== "" &&
                            item.kilometerFilter !== undefined &&
                            item.kilometerFilter !== null &&
                            Number(item.kilometerFilter) !== 0 ? (
                              <React.Fragment>
                                <li key={index}>
                                  <a>
                                    {item.kilometerFilter}{" "}
                                    <div
                                      className="Filter-Close"
                                      onClick={() =>
                                        this.resetState(
                                          "kilometerFilter",
                                          item.kilometerFilter
                                        )
                                      }
                                    ></div>
                                  </a>
                                </li>
                              </React.Fragment>
                            ) : null}
                            {item.vehicleBody !== "" &&
                            item.vehicleBody !== undefined &&
                            item.vehicleBody !== null &&
                            item.vehicleBody.length > 0 ? (
                              <React.Fragment>
                                {item.vehicleBody.map((tri, triIndex) => (
                                  <li key={triIndex}>
                                    <a>
                                      {tri.name}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelect(
                                            "vehicleBody",
                                            "selectedBodyType",
                                            "vehicleBody",
                                            tri.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.steering_type !== "" &&
                            item.steering_type !== undefined &&
                            item.steering_type !== null &&
                            item.steering_type.length > 0 ? (
                              <React.Fragment>
                                {item.steering_type.map((tri, triIndex) => (
                                  <li key={triIndex}>
                                    <a>
                                      {tri.name}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelectString(
                                            "steering_type",
                                            "selectedSteering",
                                            "steering_type",
                                            tri.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.condition !== "" &&
                            item.condition !== undefined &&
                            item.condition !== null &&
                            item.condition.length > 0 ? (
                              <React.Fragment>
                                {item.condition.map((tri, triIndex) => (
                                  <li key={triIndex}>
                                    <a>
                                      {tri.name}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelectString(
                                            "selectCondition",
                                            "selectedConditions",
                                            "condition",
                                            tri.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.enginFilter !== "" &&
                            item.enginFilter !== undefined &&
                            item.enginFilter !== null &&
                            Number(item.enginFilter) !== 0 ? (
                              <React.Fragment>
                                <li key={index}>
                                  <a>
                                    {item.enginFilter}{" "}
                                    <div
                                      className="Filter-Close"
                                      onClick={() =>
                                        this.resetState(
                                          "enginFilter",
                                          item.enginFilter
                                        )
                                      }
                                    ></div>
                                  </a>
                                </li>
                              </React.Fragment>
                            ) : null}
                            {item.hoursFilter !== "" &&
                            item.hoursFilter !== undefined &&
                            item.hoursFilter !== null &&
                            Number(item.hoursFilter) !== 0 ? (
                              <React.Fragment>
                                <li key={index}>
                                  <a>
                                    {item.hoursFilter}{" "}
                                    <div
                                      className="Filter-Close"
                                      onClick={() =>
                                        this.resetState(
                                          "hoursFilter",
                                          item.hoursFilter
                                        )
                                      }
                                    ></div>
                                  </a>
                                </li>
                              </React.Fragment>
                            ) : null}
                            {item.lengthFilter !== "" &&
                            item.lengthFilter !== undefined &&
                            item.lengthFilter !== null &&
                            Number(item.lengthFilter) !== 0 ? (
                              <React.Fragment>
                                <li key={index}>
                                  <a>
                                    {item.lengthFilter}{" "}
                                    <div
                                      className="Filter-Close"
                                      onClick={() =>
                                        this.resetState(
                                          "lengthFilter",
                                          item.lengthFilter
                                        )
                                      }
                                    ></div>
                                  </a>
                                </li>
                              </React.Fragment>
                            ) : null}
                            {item.weightFilter !== "" &&
                            item.weightFilter !== undefined &&
                            item.weightFilter !== null &&
                            Number(item.weightFilter) !== 0 ? (
                              <React.Fragment>
                                <li key={index}>
                                  <a>
                                    {item.weightFilter}{" "}
                                    <div
                                      className="Filter-Close"
                                      onClick={() =>
                                        this.resetState(
                                          "weightFilter",
                                          item.weightFilter
                                        )
                                      }
                                    ></div>
                                  </a>
                                </li>
                              </React.Fragment>
                            ) : null}
                            {item.hourFilter !== "" &&
                            item.hourFilter !== undefined &&
                            item.hourFilter !== null &&
                            Number(item.hourFilter) !== 0 ? (
                              <React.Fragment>
                                <li key={index}>
                                  <a>
                                    {item.hourFilter}{" "}
                                    <div
                                      className="Filter-Close"
                                      onClick={() =>
                                        this.resetState(
                                          "hourFilter",
                                          item.hourFilter
                                        )
                                      }
                                    ></div>
                                  </a>
                                </li>
                              </React.Fragment>
                            ) : null}
                            {item.transmission !== "" &&
                            item.transmission !== undefined &&
                            item.transmission !== null &&
                            item.transmission.length > 0 ? (
                              <React.Fragment>
                                {item.transmission.map((tri, triIndex) => (
                                  <li key={triIndex}>
                                    <a>
                                      {tri.name}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelectString(
                                            "transmission",
                                            "selectedTransmission",
                                            "transmission",
                                            tri.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.vehicleFuel !== "" &&
                            item.vehicleFuel !== undefined &&
                            item.vehicleFuel !== null &&
                            item.vehicleFuel.length > 0 ? (
                              <React.Fragment>
                                {item.vehicleFuel.map((tri, triIndex) => (
                                  <li key={triIndex}>
                                    <a>
                                      {tri.name}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelect(
                                            "vehicleFuelType",
                                            "selectedFuelType",
                                            "vehicleFuel",
                                            tri.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.hullMaterial !== "" &&
                            item.hullMaterial !== undefined &&
                            item.hullMaterial !== null &&
                            item.hullMaterial.length > 0 ? (
                              <React.Fragment>
                                {item.hullMaterial.map((tri, triIndex) => (
                                  <li key={triIndex}>
                                    <a>
                                      {tri.name}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelectString(
                                            "hullMaterials",
                                            "selectedHullMaterial",
                                            "hullMaterial",
                                            tri.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.vehiclePassenger !== "" &&
                            item.vehiclePassenger !== undefined &&
                            item.vehiclePassenger !== null &&
                            item.vehiclePassenger.length > 0 ? (
                              <React.Fragment>
                                {item.vehiclePassenger.map((tri, triIndex) => (
                                  <li key={triIndex}>
                                    <a>
                                      {tri.name}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelect(
                                            "vehiclePassenger",
                                            "selectedPassenger",
                                            "vehiclePassenger",
                                            tri.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.vehicleDrive !== "" &&
                            item.vehicleDrive !== undefined &&
                            item.vehicleDrive !== null &&
                            item.vehicleDrive.length > 0 ? (
                              <React.Fragment>
                                {item.vehicleDrive.map((tri, triIndex) => (
                                  <li key={triIndex}>
                                    <a>
                                      {tri.name}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelect(
                                            "vehicleDriveTrain",
                                            "selectedDriveTrain",
                                            "vehicleDrive",
                                            tri.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.vehicleCylinder !== "" &&
                            item.vehicleCylinder !== undefined &&
                            item.vehicleCylinder !== null &&
                            item.vehicleCylinder.length > 0 ? (
                              <React.Fragment>
                                {item.vehicleCylinder.map((tri, triIndex) => (
                                  <li key={triIndex}>
                                    <a>
                                      {tri.name}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelect(
                                            "vehicleCylinder",
                                            "selectedCylinder",
                                            "vehicleCylinder",
                                            tri.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.vehicleSeating !== "" &&
                            item.vehicleSeating !== undefined &&
                            item.vehicleSeating !== null &&
                            item.vehicleSeating.length > 0 ? (
                              <React.Fragment>
                                {item.vehicleSeating.map((tri, triIndex) => (
                                  <li key={triIndex}>
                                    <a>
                                      {tri.name}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelect(
                                            "vehicleSeating",
                                            "selectedSeating",
                                            "vehicleSeating",
                                            tri.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.color !== "" &&
                            item.color !== undefined &&
                            item.color !== null &&
                            item.color.length > 0 ? (
                              <React.Fragment>
                                {item.color.map((tri, triIndex) => (
                                  <li key={triIndex}>
                                    <a>
                                      {tri.name}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelectString(
                                            "colors",
                                            "selectedColor",
                                            "color",
                                            tri.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.vehicleOwner !== "" &&
                            item.vehicleOwner !== undefined &&
                            item.vehicleOwner !== null &&
                            item.vehicleOwner.length > 0 ? (
                              <React.Fragment>
                                {item.vehicleOwner.map((tri, triIndex) => (
                                  <li key={triIndex}>
                                    <a>
                                      {tri.name}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelectString(
                                            "vehicleOwner",
                                            "selectedOwners",
                                            "vehicleOwner",
                                            tri.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.seller_type !== "" &&
                            item.seller_type !== undefined &&
                            item.seller_type !== null &&
                            item.seller_type.length > 0 ? (
                              <React.Fragment>
                                {item.seller_type.map((tri, triIndex) => (
                                  <li key={triIndex}>
                                    <a>
                                      {tri.name}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelect(
                                            "seller_type",
                                            "selectedSellerType",
                                            "seller_type",
                                            tri.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.vehicleAccident !== "" &&
                            item.vehicleAccident !== undefined &&
                            item.vehicleAccident !== null &&
                            item.vehicleAccident.length > 0 ? (
                              <React.Fragment>
                                {item.vehicleAccident.map((tri, triIndex) => (
                                  <li key={triIndex}>
                                    <a>
                                      {tri.name}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeMultiSelectString(
                                            "vehicleAccident",
                                            "selectedAccident",
                                            "vehicleAccident",
                                            tri.id
                                          )
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                            {item.features.length !== 0 &&
                            item.features !== undefined &&
                            item.features !== null ? (
                              <React.Fragment>
                                {item.features.map((itemFeat, featureIndex) => (
                                  <li key={featureIndex}>
                                    <a>
                                      {itemFeat.name}{" "}
                                      <div
                                        className="Filter-Close"
                                        onClick={() =>
                                          this.removeFeatures(itemFeat.id)
                                        }
                                      ></div>
                                    </a>
                                  </li>
                                ))}
                              </React.Fragment>
                            ) : null}
                          </React.Fragment>
                        ))
                      : null}
                  </ul>
                </div>

                <div className="MobileSearch mb-0">
                  {/* <div
                    className="mobile-location-input"
                    onClick={this.toggleGoogleMap}
                  >
                    <input
                      type="text"
                      id="searchKm"
                      name="searchKm"
                      placeholder="Add location"
                      value={
                        this.state.searchKm !== undefined &&
                          this.state.searchKm !== null &&
                          this.state.searchKm !== ""
                          ? this.state.searchKm.split(",").slice(-3, -1)[0] +
                          ", " +
                          this.state.searchKm
                            .split(",")
                            .slice(-2, -1)[0]
                            .split(" ")[1]
                          : ""
                      }
                      disabled
                    />
                    <i className="icon-subtract-icon"></i>
                  </div> */}

                  <div className="range-slider-mobile-view">
                    <h1>Distance</h1>
                    <h2>
                      Range{" "}
                      <span>
                        {this.state.rangeSlider !== undefined &&
                        this.state.rangeSlider !== null &&
                        this.state.rangeSlider.length > 0
                          ? this.state.rangeSlider[0]
                          : 0}
                        km -{" "}
                        {this.state.rangeSlider !== undefined &&
                        this.state.rangeSlider !== null &&
                        this.state.rangeSlider.length > 0
                          ? this.state.rangeSlider[1]
                          : 0}
                        km
                      </span>
                    </h2>
                    <Range
                      allowCross={false}
                      max={200}
                      min={0}
                      value={this.state.rangeSlider}
                      draggableTrack
                      onChange={log}
                    />
                  </div>

                  <div className="filter-reset-button">
                    <button type="button" onClick={this.resetAllState}>
                      Reset
                    </button>
                    <button
                      type="button"
                      className="active float-right"
                      onClick={this.searchPost}
                    >
                      Apply{" "}
                      {this.props.selected_filter_list.length !== 0 &&
                      this.props.selected_filter_list !== undefined
                        ? this.props.selected_filter_list.length
                        : 0}{" "}
                      Filters
                    </button>
                  </div>
                </div>

                <div className="MobileSearch mb-2">
                  <label className="mobile-check-btn">
                    All of Canada
                    <input
                      type="checkbox"
                      onChange={this.handleOnChack}
                      checked={this.state.checkAllCanda}
                      name="checkAllCanda"
                    />
                    <span className="mobilemark"></span>
                  </label>
                </div>

                <div className="accordion" id="accordionExample">
                  {this.state.allowFilters.map((mainFilter, index) => (
                    <React.Fragment key={index}>
                      {mainFilter.price === true ? (
                        <div className="card">
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
                              {this.state.paymentPrice == "p" ? (
                                <React.Fragment>
                                  <div className="filter-two-col price-main clearfix">
                                    <div className="filters-inner-col">
                                      <label>Min</label>
                                      <NumberFormat
                                        className="form-control"
                                        id="fromRange"
                                        name="fromRange"
                                        value={this.state.fromRange}
                                        decimalScale={2}
                                        prefix={"$"}
                                        onChange={this.handleOnChange}
                                        thousandSeparator={true}
                                        placeholder="Min"
                                        onBlur={this.blurOnPrice}
                                      />
                                    </div>
                                    <div className="filters-inner-col">
                                      <label>Max</label>
                                      {/* {this.props.showloaderValues === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null} */}
                                      <NumberFormat
                                        className="form-control"
                                        id="toRange"
                                        name="toRange"
                                        value={this.state.toRange}
                                        decimalScale={2}
                                        prefix={"$"}
                                        onChange={this.handleOnChange}
                                        thousandSeparator={true}
                                        placeholder="Max"
                                        onBlur={this.blurOnPrice}
                                      />
                                    </div>
                                  </div>
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="row">
                                      <div className="col-lg-6 col-md-6 col-sm-12 col-12 pl-0">
                                        <div className="MonthlyPay-Form">
                                          <label>From</label>
                                          <select
                                            id="start_pay"
                                            name="start_pay"
                                            onChange={this.handleOnChange}
                                            value={this.state.start_pay}
                                          >
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
                                          <select
                                            id="end_pay"
                                            name="end_pay"
                                            onChange={this.handleOnChange}
                                            value={this.state.end_pay}
                                          >
                                            <option></option>
                                            <option value={50000}>
                                              $50,000+
                                            </option>
                                            <option value={60000}>
                                              {" "}
                                              $60,000+
                                            </option>
                                            <option value={70000}>
                                              $70,000+
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </React.Fragment>
                              )}
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
                            {(this.state.type_of_vehicle || []).length === 0 ||
                            this.state.vehicleLoader === true ? (
                              <div className="filters-preloader">
                                <div className="spinner"></div>
                              </div>
                            ) : null}
                            <div
                              className={
                                (this.state.type_of_vehicle || []).length === 0
                                  ? "filter-two-col filters-vehicle-type clearfix"
                                  : "filter-two-col filters-vehicle-type clearfix show"
                              }
                            >
                              {/* <div className="filters-inner-col">
                                <div
                                  title={"All Vehicles"}
                                  className={
                                    this.state.typeOfVehicle === "All Vehicles"
                                      ? "vehicle-type-box active"
                                      : "vehicle-type-box"
                                  }
                                  onClick={() =>
                                    this.handleOnClick(
                                      "typeOfVehicle",
                                      "All Vehicles"
                                    )
                                  }
                                >
                                  <div className="vehicle-type-image view-all-icon">
                                    <img
                                      src="/assets/image/finance-that-tag.svg"
                                      alt=""
                                    />
                                  </div>
                                  <div className="vehicle-type-description">
                                    <strong>
                                      {"All Vehicles"}
                                    </strong>
                                  </div>
                                </div>
                              </div> */}

                              {(this.state.type_of_vehicle || []).map(
                                (item, index) => {
                                  return (
                                    <React.Fragment key={index}>
                                      <div className="filters-inner-col">
                                        <div
                                          title={item.name}
                                          className={
                                            item.id === this.state.typeOfVehicle
                                              ? "vehicle-type-box active"
                                              : "vehicle-type-box"
                                          }
                                          onClick={() =>
                                            this.handleOnClick(
                                              "typeOfVehicle",
                                              item.id
                                            )
                                          }
                                        >
                                          <div className="vehicle-type-image">
                                            {item.name == "Automotive" ? (
                                              <img
                                                src="/assets/image/filters-autos-icon.svg"
                                                alt={item.name}
                                              />
                                            ) : item.name == "Autos" ? (
                                              <img
                                                src="/assets/image/automotive.svg"
                                                alt={item.name}
                                              />
                                            ) : item.name == "Motorcycle" ? (
                                              <img
                                                src="/assets/image/filters-motorcycle-icon.svg"
                                                alt={item.name}
                                              />
                                            ) : item.name == "ATV/UTV" ? (
                                              <img
                                                src="/assets/image/ATVUTV.svg"
                                                alt={item.name}
                                              />
                                            ) : item.name == "Snowmobiles" ? (
                                              <img
                                                src="/assets/image/snowmobile.svg"
                                                alt={item.name}
                                              />
                                            ) : item.name == "RV" ? (
                                              <img
                                                src="/assets/image/filters-rv-icon.svg"
                                                alt={item.name}
                                              />
                                            ) : item.name == "Watercrafts" ? (
                                              <img
                                                src="/assets/image/Watercraft.svg"
                                                alt={item.name}
                                              />
                                            ) : item.name == "Boat" ? (
                                              <img
                                                src="/assets/image/filters-boats-icon.svg"
                                                alt={item.name}
                                              />
                                            ) : item.name == "Powersport" ? (
                                              <img
                                                src="/assets/image/filters-powersports-icon.svg"
                                                alt={item.name}
                                              />
                                            ) : item.name == "Trailer" ? (
                                              <img
                                                src="/assets/image/filters-trailers-icon.svg"
                                                alt={item.name}
                                              />
                                            ) : item.name ==
                                              "Small Equipment" ? (
                                              <img
                                                src="/assets/image/filters-small-equipment-icon.svg"
                                                alt={item.name}
                                              />
                                            ) :item.name == "Construction" ? (
                                              <img
                                                src="/assets/image/skidSteer.jpg"
                                                alt={item.name}
                                                width="80px"
                                                height="45px"
                                              />
                                            ) :(
                                              <img
                                                src={
                                                  item.image_path !== null
                                                    ? item.image_path
                                                    : "/assets/image/crossovers.svg"
                                                }
                                                alt={item.name}
                                              />
                                            )}
                                          </div>
                                          <div className="vehicle-type-description">
                                            <strong>
                                              {item.name}{" "}
                                              {item.vt_count !== undefined &&
                                              item.vt_count !== null &&
                                              Number(item.vt_count) !== 0 ? (
                                                <span>({item.vt_count})</span>
                                              ) : (
                                                <span>(0)</span>
                                              )}
                                            </strong>
                                          </div>
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {Number(this.state.typeOfVehicle) === 9 ? (
                        <div className="card">
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
                              {(this.state.type_of_vehicle || []).length ===
                              0 ? (
                                <div className="filters-preloader">
                                  <div className="spinner"></div>
                                </div>
                              ) : null}
                              <div
                                className={
                                  (this.state.type_of_vehicle || []).length ===
                                  0
                                    ? "filter-two-col filters-vehicle-type clearfix"
                                    : "filter-two-col filters-vehicle-type clearfix show"
                                }
                              >
                                <div className="filters-inner-col">
                                  <div
                                    title={"All"}
                                    className={
                                      this.state.selectAllSubTypeVehicle ===
                                      true
                                        ? "vehicle-type-box active"
                                        : "vehicle-type-box"
                                    }
                                    onClick={() =>
                                      this.handleOnSelectAll(
                                        "selectAllSubTypeVehicle",
                                        "subTypeVehicle",
                                        "selectedSubTypes",
                                        "subTypeId"
                                      )
                                    }
                                  >
                                    <div className="vehicle-type-image">
                                      <img
                                        src="/assets/image/finance-that-tag.svg"
                                        alt=""
                                      />
                                    </div>
                                    <div className="vehicle-type-description">
                                      <strong>{"All"}</strong>
                                    </div>
                                  </div>
                                </div>
                                {(this.state.subTypeVehicle || []).map(
                                  (subItem, subIndex) => {
                                    return (
                                      <React.Fragment key={index}>
                                        <div className="filters-inner-col">
                                          <div
                                            title={subItem.name}
                                            className={
                                              subItem.isChecked === true
                                                ? "vehicle-type-box active"
                                                : "vehicle-type-box"
                                            }
                                            onClick={() =>
                                              this.handleOnSelect(
                                                subItem.name,
                                                "subTypeVehicle",
                                                "selectAllSubTypeVehicle",
                                                "selectedSubTypes",
                                                "subTypeId",
                                                subItem.value
                                              )
                                            }
                                          >
                                            <div className="vehicle-type-image">
                                              {subItem.name.toUpperCase() ===
                                                "ATV/UTV".toUpperCase() ||
                                              subItem.name.toUpperCase() ===
                                                "ATVS/UTVS".toUpperCase() ? (
                                                <img
                                                  src="/assets/image/ATVUTV.svg"
                                                  alt={subItem.name}
                                                />
                                              ) : subItem.name.toUpperCase() ===
                                                  "Watercraft".toUpperCase() ||
                                                subItem.name.toUpperCase() ===
                                                  "Watercrafts".toUpperCase() ? (
                                                <img
                                                  src="/assets/image/Watercraft.svg"
                                                  alt={subItem.name}
                                                />
                                              ) : subItem.name.toUpperCase() ===
                                                  "Snowmobile".toUpperCase() ||
                                                subItem.name.toUpperCase() ===
                                                  "Snowmobiles".toUpperCase() ? (
                                                <img
                                                  src="/assets/image/snowmobile.svg"
                                                  alt={subItem.name}
                                                />
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                            <div className="vehicle-type-description">
                                              <strong>
                                                {subItem.name}
                                                {subItem.st_count !==
                                                  undefined &&
                                                subItem.st_count !== null &&
                                                Number(subItem.st_count) !==
                                                  0 ? (
                                                  <span>
                                                    ({subItem.st_count})
                                                  </span>
                                                ) : (
                                                  <span>(0)</span>
                                                )}
                                              </strong>
                                            </div>
                                          </div>
                                        </div>
                                      </React.Fragment>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {mainFilter.make === true ? (
                        (this.state.allMakes || []) !== undefined &&
                        (this.state.allMakes || []) !== null &&
                        (this.state.allMakes || []).length > 0 &&
                        this.state.selectAllTypeOfVehicle !== true ? (
                          <div className="card">
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
                                {this.props.removeLoaderMake === false ? (
                                  <div className="filters-preloader">
                                    <div className="spinner"></div>
                                  </div>
                                ) : null}
                                <div
                                  className="collapse show"
                                  id="collapseMenu"
                                >
                                  <Scrollbars
                                    autoHeight
                                    autoHeightMin="100%"
                                    autoHeightMax="374px"
                                    className="MakeMenu-List filters-list"
                                  >
                                    {/* <h1>POPULAR MAKES</h1> */}
                                    <ul>
                                      <li
                                        onClick={() =>
                                          this.handleOnSelectAll(
                                            "selectAllMakes",
                                            "allMakes",
                                            "selectedMakes",
                                            "selectedMakeId"
                                          )
                                        }
                                        className={
                                          this.state.selectAllMakes === true
                                            ? "active"
                                            : ""
                                        }
                                      >
                                        <a>
                                          <span className="bullet"></span>
                                          {"All Makes"}
                                          {(this.state.allMakes || []) !==
                                            undefined &&
                                          (this.state.allMakes || []) !==
                                            null &&
                                          (this.state.allMakes || []).length >
                                            0 ? (
                                            (this.state.allMakes || [])[0] !==
                                              undefined &&
                                            (this.state.allMakes || [])[0] !==
                                              null ? (
                                              (this.state.allMakes || [])[0]
                                                .total_makes !== undefined &&
                                              (this.state.allMakes || [])[0]
                                                .total_makes !== null &&
                                              Number(
                                                (this.state.allMakes || [])[0]
                                                  .total_makes
                                              ) !== 0 ? (
                                                <span>
                                                  (
                                                  {
                                                    (this.state.allMakes ||
                                                      [])[0].total_makes
                                                  }
                                                  )
                                                </span>
                                              ) : (
                                                <span>(0)</span>
                                              )
                                            ) : (
                                              <span></span>
                                            )
                                          ) : (
                                            <span></span>
                                          )}
                                        </a>
                                      </li>
                                      {(this.state.allMakes || []).map(
                                        (item, index) => {
                                          return (
                                            <li
                                              key={index}
                                              onClick={() =>
                                                this.handleOnSelectMakeModel(
                                                  item.name,
                                                  "allMakes",
                                                  "selectAllMakes",
                                                  "selectedMakes",
                                                  "selectedMakeId",
                                                  item.value
                                                )
                                              }
                                              className={
                                                item.isChecked ? "active" : ""
                                              }
                                            >
                                              <a>
                                                <span className="bullet"></span>
                                                {item.name !== undefined &&
                                                item.name !== null
                                                  ? this.toTitleCase(item.name)
                                                  : ""}
                                                {item.mk_count !== undefined &&
                                                item.mk_count !== null &&
                                                Number(item.mk_count) !== 0 ? (
                                                  <span>({item.mk_count})</span>
                                                ) : (
                                                  <span>(0)</span>
                                                )}
                                              </a>
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                  </Scrollbars>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null
                      ) : null}

                      {mainFilter.model === true ? (
                        (this.state.allModels || []) !== undefined &&
                        (this.state.allModels || []) !== null &&
                        (this.state.allModels || []).length > 0 &&
                        this.state.selectAllMakes !== true ? (
                          <div className="card">
                            <div className="card-header" id="headingFour">
                              <h2 className="mb-0">
                                <button
                                  className="btn btn-link btn-block text-left collapsed"
                                  type="button"
                                  data-toggle="collapse"
                                  // data-target={(this.state.vehicle_model || []).length > 0 ? "#collapseFour" : ''}
                                  data-target="#collapseFour"
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
                                {this.props.removeLoaderModel === false ? (
                                  <div className="filters-preloader">
                                    <div className="spinner"></div>
                                  </div>
                                ) : null}
                                <Scrollbars
                                  autoHeight
                                  autoHeightMin="100%"
                                  autoHeightMax="374px"
                                  className="model-List filters-list"
                                >
                                  <ul>
                                    <li
                                      key={index}
                                      onClick={() =>
                                        this.handleOnSelectAll(
                                          "selectAllModels",
                                          "allModels",
                                          "selectedModel",
                                          "selectedModelId"
                                        )
                                      }
                                      className={
                                        this.state.selectAllModels === true
                                          ? "active"
                                          : ""
                                      }
                                    >
                                      <a>
                                        <span className="bullet"></span>
                                        All
                                      </a>
                                    </li>
                                    {(this.state.allModels || []).map(
                                      (item, index) => {
                                        return (
                                          <li
                                            key={index}
                                            onClick={() =>
                                              this.handleOnSelectMakeModel(
                                                item.name,
                                                "allModels",
                                                "selectAllModels",
                                                "selectedModel",
                                                "selectedModelId",
                                                item.value
                                              )
                                            }
                                            className={
                                              item.isChecked ? "active" : ""
                                            }
                                          >
                                            <a>
                                              <span className="bullet"></span>
                                              {item.name !== undefined &&
                                              item.name !== null
                                                ? this.toTitleCase(item.name)
                                                : ""}
                                              {item.md_count !== undefined &&
                                              item.md_count !== null &&
                                              Number(item.md_count) !== 0 ? (
                                                <span>({item.md_count})</span>
                                              ) : (
                                                <span>(0)</span>
                                              )}
                                            </a>
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                </Scrollbars>
                              </div>
                            </div>
                          </div>
                        ) : null
                      ) : null}

                      {mainFilter.trim === true ? (
                        (this.state.allTrims || []) !== undefined &&
                        (this.state.allTrims || []) !== null &&
                        (this.state.allTrims || []).length > 0 ? (
                          <div className="card ">
                            <div className="card-header" id="headingFive">
                              <h2 className="mb-0">
                                <button
                                  className="btn btn-link btn-block text-left collapsed"
                                  type="button"
                                  data-toggle="collapse"
                                  // data-target={(this.props.vehicle_trims || []).length > 0 ? "#collapseFive" : ''}
                                  data-target="#collapseFive"
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
                              {this.props.removeLoaderTrims === false ? (
                                <div className="filters-preloader">
                                  <div className="spinner"></div>
                                </div>
                              ) : (
                                <div className="card-body item m-0">
                                  <div className="">
                                    {/* <div className="trim-List filters-list"> */}
                                    <Scrollbars
                                      autoHeight
                                      autoHeightMin="100%"
                                      autoHeightMax="374px"
                                      className="model-List filters-list"
                                    >
                                      <ul>
                                        <li
                                          key={index}
                                          onClick={() =>
                                            this.handleOnSelectAll(
                                              "selectAllTrims",
                                              "allTrims",
                                              "selectedTrim",
                                              "selectedTrimId"
                                            )
                                          }
                                          className={
                                            this.state.selectAllTrims === true
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          <a>
                                            <span className="bullet"></span>
                                            All
                                          </a>
                                        </li>
                                        {(this.state.allTrims || []).map(
                                          (item, index) => {
                                            return (
                                              <li
                                                key={index}
                                                onClick={() =>
                                                  this.handleOnSelectMakeModel(
                                                    item.name,
                                                    "allTrims",
                                                    "selectAllTrims",
                                                    "selectedTrim",
                                                    "selectedTrimId",
                                                    item.value
                                                  )
                                                }
                                                className={
                                                  item.isChecked === true
                                                    ? "active"
                                                    : ""
                                                }
                                              >
                                                <a>
                                                  <span className="bullet"></span>
                                                  {item.name !== undefined &&
                                                  item.name !== null
                                                    ? this.toTitleCase(
                                                        item.name
                                                      )
                                                    : ""}
                                                </a>
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    </Scrollbars>
                                    {/* </div> */}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : null
                      ) : null}
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
                                  <Select
                                    isSearchable={false}
                                    className="banner-react-select-main"
                                    classNamePrefix="banner-react-select"
                                    closeMenuOnSelect
                                    options={this.state.fromYearDropDown}
                                    required
                                    name="selectedFromYear"
                                    value={this.state.selectedFromYear}
                                    onChange={(e) =>
                                      this.handleChangeSelect(
                                        e,
                                        "selectedFromYear",
                                        "fromYear",
                                        "startDate"
                                      )
                                    }
                                  />
                                  {/* <input type="text" className="form-control" id="fromYear" name="fromYear" value={this.state.fromYear} onChange={this.handleOnChange} /> */}
                                </div>
                                <div className="filters-inner-col">
                                  <label>To</label>
                                  {this.props.showloaderValues === true ? (
                                    <i
                                      class="fa fa-circle-o-notch fa-spin"
                                      aria-hidden="true"
                                    ></i>
                                  ) : null}
                                  <Select
                                    isSearchable={false}
                                    className="banner-react-select-main"
                                    classNamePrefix="banner-react-select"
                                    closeMenuOnSelect
                                    options={this.state.yearsDropDown}
                                    required
                                    name="selectedToYear"
                                    value={this.state.selectedToYear}
                                    onChange={(e) =>
                                      this.handleChangeSelect(
                                        e,
                                        "selectedToYear",
                                        "toYear",
                                        "endDate"
                                      )
                                    }
                                  />
                                  {/* <input type="text" className="form-control" id="toYear" name="toYear" value={this.state.toYear} onChange={this.handleOnChange} /> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {mainFilter.body_type === true ? (
                        this.state.vehicleBody !== undefined &&
                        this.state.vehicleBody !== null &&
                        (this.state.vehicleBody || []).length > 0 ? (
                          <div className="card">
                            <div className="card-header" id="headingSix">
                              <h2 className="mb-0">
                                <button
                                  className="btn btn-link btn-block text-left collapsed"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target={
                                    (this.state.vehicleBody || []).length > 0
                                      ? "#body-style"
                                      : ""
                                  }
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
                                {this.props.loaderBodyType !== undefined &&
                                this.props.loaderBodyType !== null &&
                                this.props.loaderBodyType === true ? (
                                  <div className="filters-preloader">
                                    <div className="spinner"></div>
                                  </div>
                                ) : null}
                                <div className="filter-two-col filters-vehicle-type vehicle-body-style clearfix show">
                                  <div
                                    onClick={() =>
                                      this.handleOnSelectAll(
                                        "selectAllVehicleBody",
                                        "vehicleBody",
                                        "selectedBodyType",
                                        "selectedBodyTypeId"
                                      )
                                    }
                                    className="filters-inner-col"
                                  >
                                    <div
                                      title=""
                                      className={
                                        this.state.selectAllVehicleBody === true
                                          ? "vehicle-type-box active"
                                          : "vehicle-type-box"
                                      }
                                    >
                                      <div className="vehicle-type-image">
                                        <img
                                          src="/assets/image/finance-that-tag.svg"
                                          alt=""
                                        />
                                        {/* <img src={item.image_path} alt="" /> */}
                                      </div>
                                      <div className="vehicle-type-description">
                                        <strong>All</strong>
                                      </div>
                                    </div>
                                  </div>
                                  {(this.state.vehicleBody || []).map(
                                    (item, index) => (
                                      <div
                                        onClick={() =>
                                          this.handleOnSelect(
                                            item.name,
                                            "vehicleBody",
                                            "selectAllVehicleBody",
                                            "selectedBodyType",
                                            "selectedBodyTypeId",
                                            item.value
                                          )
                                        }
                                        className="filters-inner-col"
                                        key={index}
                                      >
                                        <div
                                          title=""
                                          className={
                                            item.isChecked === true
                                              ? "vehicle-type-box active"
                                              : "vehicle-type-box"
                                          }
                                        >
                                          <div className="vehicle-type-image">
                                            <img src={item.image_path} alt="" />
                                          </div>
                                          <div className="vehicle-type-description">
                                            <strong>
                                              {item.name}
                                              {item.bt_count !== undefined &&
                                              item.bt_count !== null &&
                                              Number(item.bt_count) !== 0 ? (
                                                <span>({item.bt_count})</span>
                                              ) : (
                                                <span>(0)</span>
                                              )}
                                            </strong>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}

                                  {/** Down */}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null
                      ) : null}

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
                                  <NumberFormat
                                    className="form-control"
                                    value={this.state.fromKilometer}
                                    id="fromKilometer"
                                    placeholder="Min"
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
                                  {this.props.showloaderValues === true ? (
                                    <i
                                      class="fa fa-circle-o-notch fa-spin"
                                      aria-hidden="true"
                                    ></i>
                                  ) : null}
                                  <NumberFormat
                                    className="form-control"
                                    value={this.state.toKilometer}
                                    id="toKilometer"
                                    placeholder="Max"
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
                              <div className="filters-list condition-main clearfix">
                                <ul>
                                  <li>
                                    <label className="checkMarkContainer">
                                      All
                                      <input
                                        type="checkbox"
                                        checked={this.state.selectAllCondition}
                                        name="selectAllCondition"
                                        value={"All"}
                                        onChange={() =>
                                          this.handleOnSelectAll(
                                            "selectAllCondition",
                                            "selectCondition",
                                            "selectedConditions",
                                            "conditionId"
                                          )
                                        }
                                      />
                                      <span className="filtersCheckmark"></span>
                                    </label>
                                  </li>
                                  {(this.state.selectCondition || []).map(
                                    (item, index) => (
                                      <li>
                                        <label className="checkMarkContainer">
                                          {item.name}
                                          <input
                                            type="checkbox"
                                            checked={item.isChecked}
                                            name="selectCondition"
                                            value={item.value}
                                            onChange={() =>
                                              this.handleOnSelect(
                                                item.name,
                                                "selectCondition",
                                                "selectAllCondition",
                                                "selectedConditions",
                                                "conditionId",
                                                item.value
                                              )
                                            }
                                          />
                                          <span className="filtersCheckmark"></span>
                                        </label>
                                      </li>
                                    )
                                  )}
                                </ul>
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
                              <div className="filters-list transmission-main clearfix">
                                <ul>
                                  <li>
                                    <label className="checkMarkContainer">
                                      All
                                      <input
                                        type="checkbox"
                                        checked={
                                          this.state.selectAllTransmission
                                        }
                                        name="selectAllTransmission"
                                        value={"All"}
                                        onChange={() =>
                                          this.handleOnSelectAll(
                                            "selectAllTransmission",
                                            "transmission",
                                            "selectedTransmission",
                                            "transmissionId"
                                          )
                                        }
                                      />
                                      <span className="filtersCheckmark"></span>
                                    </label>
                                  </li>
                                  {(this.state.transmission || []).map(
                                    (item, index) => (
                                      <li
                                        className="filters-inner-col"
                                        key={index}
                                      >
                                        <label className="checkMarkContainer">
                                          {item.name}
                                          <input
                                            type="checkbox"
                                            checked={item.isChecked}
                                            name="transmission"
                                            value={item.value}
                                            onChange={() =>
                                              this.handleOnSelect(
                                                item.name,
                                                "transmission",
                                                "selectAllTransmission",
                                                "selectedTransmission",
                                                "transmissionId",
                                                item.value
                                              )
                                            }
                                          />
                                          <span className="filtersCheckmark"></span>
                                        </label>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {mainFilter.vin === true ? (
                        <div className="card">
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
                                    className="form-control"
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

                      {mainFilter.engineCC === true ? (
                        <div className="card">
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
                                Engine Hours
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
                                  <label>Min</label>
                                  <NumberFormat
                                    className="form-control"
                                    value={this.state.start_ec}
                                    placeholder="Min"
                                    id="start_ec"
                                    name="start_ec"
                                    onChange={this.handleOnChange}
                                    onBlur={this.blurOnEngineCC}
                                  />
                                </div>
                                <div className="filters-inner-col">
                                  <label>Max</label>
                                  <NumberFormat
                                    className="form-control"
                                    value={this.state.end_ec}
                                    placeholder="Max"
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

                      {mainFilter.hours === true ? (
                        <div className="card">
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
                                Engine Horsepower
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
                                <div className="filter-two-col filters-kilometers-main clearfix">
                                  <div className="filters-inner-col">
                                    <label>Min</label>
                                    <NumberFormat
                                      className="form-control"
                                      value={this.state.start_hours}
                                      placeholder="Min"
                                      id="start_hours"
                                      name="start_hours"
                                      onChange={this.handleOnChange}
                                      onBlur={this.blurOnHorsePower}
                                    />
                                  </div>
                                  <div className="filters-inner-col">
                                    <label>Max</label>
                                    <NumberFormat
                                      className="form-control"
                                      value={this.state.end_hours}
                                      placeholder="Max"
                                      id="end_hours"
                                      name="end_hours"
                                      onChange={this.handleOnChange}
                                      onBlur={this.blurOnHorsePower}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {mainFilter.length === true ? (
                        <div className="card">
                          <div className="card-header" id="headingNine">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left collapsed"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseLength"
                                aria-expanded="true"
                                aria-controls="collapseLength"
                              >
                                Length(FT)
                              </button>
                            </h2>
                          </div>

                          <div
                            id="collapseLength"
                            className="collapse"
                            aria-labelledby="headingNine"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <div className="filter-two-col filters-kilometers-main clearfix">
                                <div className="filter-two-col filters-kilometers-main clearfix">
                                  <div className="filters-inner-col">
                                    <label>Min</label>
                                    <NumberFormat
                                      className="form-control"
                                      value={this.state.start_length}
                                      placeholder="Min"
                                      id="start_length"
                                      name="start_length"
                                      onChange={this.handleOnChange}
                                      onBlur={this.blurOnLength}
                                    />
                                  </div>
                                  <div className="filters-inner-col">
                                    <label>Max</label>
                                    <NumberFormat
                                      className="form-control"
                                      value={this.state.end_length}
                                      placeholder="Max"
                                      id="end_length"
                                      name="end_length"
                                      onChange={this.handleOnChange}
                                      onBlur={this.blurOnLength}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {mainFilter.weight === true ? (
                        <div className="card">
                          <div className="card-header" id="headingNine">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left collapsed"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseWeigth"
                                aria-expanded="true"
                                aria-controls="collapseWeigth"
                              >
                                Weight(KG)
                              </button>
                            </h2>
                          </div>

                          <div
                            id="collapseWeigth"
                            className="collapse"
                            aria-labelledby="headingNine"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <div className="filter-two-col filters-kilometers-main clearfix">
                                <div className="filter-two-col filters-kilometers-main clearfix">
                                  <div className="filters-inner-col">
                                    <label>Min</label>
                                    <NumberFormat
                                      className="form-control"
                                      value={this.state.start_weight}
                                      placeholder="Min"
                                      id="start_weight"
                                      name="start_weight"
                                      onChange={this.handleOnChange}
                                      onBlur={this.blurOnWeight}
                                    />
                                  </div>
                                  <div className="filters-inner-col">
                                    <label>Max</label>
                                    <NumberFormat
                                      className="form-control"
                                      value={this.state.end_weight}
                                      placeholder="Max"
                                      id="end_weight"
                                      name="end_weight"
                                      onChange={this.handleOnChange}
                                      onBlur={this.blurOnWeight}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {mainFilter.hull_material === true ? (
                        <div className="card">
                          <div className="card-header" id="headingDriveTrain">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left collapsed"
                                type="button"
                                data-toggle="collapse"
                                data-target={
                                  (this.state.vehicleDriveTrain || []).length >
                                  0
                                    ? "#hullMaterial"
                                    : ""
                                }
                                aria-expanded="true"
                                aria-controls="hullMaterial"
                              >
                                Hull Material
                              </button>
                            </h2>
                          </div>

                          <div
                            id="hullMaterial"
                            className="collapse"
                            aria-labelledby="headingDriveTrain"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <Scrollbars
                                autoHeight
                                autoHeightMin="100%"
                                autoHeightMax="374px"
                                className="model-List filters-list"
                              >
                                <ul>
                                  <li
                                    key={index}
                                    className={
                                      this.state.selectAllHullMaterial === true
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <label className="checkMarkContainer">
                                      All
                                      <input
                                        type="checkbox"
                                        checked={
                                          this.state.selectAllHullMaterial
                                        }
                                        name="selectAllHullMaterial"
                                        value="All"
                                        onChange={() =>
                                          this.handleOnSelectAll(
                                            "selectAllHullMaterial",
                                            "hullMaterials",
                                            "selectedHullMaterial",
                                            "hullMaterialId"
                                          )
                                        }
                                      />
                                      <span className="filtersCheckmark"></span>
                                    </label>
                                  </li>
                                  {(this.state.hullMaterials || []).map(
                                    (item, index) => {
                                      return (
                                        <li
                                          key={index}
                                          className={
                                            item.isChecked ? "active" : ""
                                          }
                                        >
                                          <label className="checkMarkContainer">
                                            {item.name}
                                            <input
                                              type="checkbox"
                                              checked={item.isChecked}
                                              name="hullMaterialId"
                                              value={item.value}
                                              onChange={() =>
                                                this.handleOnSelect(
                                                  item.name,
                                                  "hullMaterials",
                                                  "selectAllHullMaterial",
                                                  "selectedHullMaterial",
                                                  "hullMaterialId",
                                                  item.value
                                                )
                                              }
                                            />
                                            <span className="filtersCheckmark"></span>
                                          </label>
                                        </li>
                                      );
                                    }
                                  )}
                                </ul>
                              </Scrollbars>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {mainFilter.fuel_type === true ? (
                        this.state.vehicleFuelType !== undefined &&
                        this.state.vehicleFuelType !== null &&
                        (this.state.vehicleFuelType || []).length > 0 ? (
                          <div className="card">
                            <div className="card-header" id="headingFuelType">
                              <h2 className="mb-0">
                                <button
                                  className="btn btn-link btn-block text-left collapsed"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target={
                                    (this.state.vehicleFuelType || []).length >
                                    0
                                      ? "#fuelType"
                                      : ""
                                  }
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
                                {this.props.loaderFuelType !== undefined &&
                                this.props.loaderFuelType !== null &&
                                this.props.loaderFuelType === true ? (
                                  <div className="filters-preloader">
                                    <div className="spinner"></div>
                                  </div>
                                ) : null}
                                <Scrollbars
                                  autoHeight
                                  autoHeightMin="100%"
                                  autoHeightMax="374px"
                                  className="model-List filters-list"
                                >
                                  <ul>
                                    <li
                                      key={index}
                                      className={
                                        this.state.selectAllFuelType === true
                                          ? "active"
                                          : ""
                                      }
                                    >
                                      <label className="checkMarkContainer">
                                        All
                                        <input
                                          type="checkbox"
                                          checked={this.state.selectAllFuelType}
                                          name="selectAllFuelType"
                                          value="All"
                                          onChange={() =>
                                            this.handleOnSelectAll(
                                              "selectAllFuelType",
                                              "vehicleFuelType",
                                              "selectedFuelType",
                                              "fuelTypeId"
                                            )
                                          }
                                        />
                                        <span className="filtersCheckmark"></span>
                                      </label>
                                    </li>
                                    {(this.state.vehicleFuelType || []).map(
                                      (item, index) => {
                                        return (
                                          <li
                                            key={index}
                                            className={
                                              item.isChecked ? "active" : ""
                                            }
                                          >
                                            <label className="checkMarkContainer">
                                              {item.name}
                                              <input
                                                type="checkbox"
                                                checked={item.isChecked}
                                                name="vehicleFuelType"
                                                value={item.value}
                                                onChange={() =>
                                                  this.handleOnSelect(
                                                    item.name,
                                                    "vehicleFuelType",
                                                    "selectAllFuelType",
                                                    "selectedFuelType",
                                                    "fuelTypeId",
                                                    item.value
                                                  )
                                                }
                                              />
                                              <span className="filtersCheckmark"></span>
                                            </label>
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                </Scrollbars>
                              </div>
                            </div>
                          </div>
                        ) : null
                      ) : null}

                      {mainFilter.drive_train === true ? (
                        this.state.vehicleDriveTrain !== undefined &&
                        this.state.vehicleDriveTrain !== null &&
                        (this.state.vehicleDriveTrain || []).length > 0 ? (
                          <div className="card">
                            <div className="card-header" id="headingDriveTrain">
                              <h2 className="mb-0">
                                <button
                                  className="btn btn-link btn-block text-left collapsed"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target={
                                    (this.state.vehicleDriveTrain || [])
                                      .length > 0
                                      ? "#driveTrain"
                                      : ""
                                  }
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
                                {this.props.loaderDriveTrain !== undefined &&
                                this.props.loaderDriveTrain !== null &&
                                this.props.loaderDriveTrain === true ? (
                                  <div className="filters-preloader">
                                    <div className="spinner"></div>
                                  </div>
                                ) : null}
                                <Scrollbars
                                  autoHeight
                                  autoHeightMin="100%"
                                  autoHeightMax="374px"
                                  className="model-List filters-list"
                                >
                                  <ul>
                                    <li
                                      key={index}
                                      className={
                                        this.state.selectAllDriveTrain === true
                                          ? "active"
                                          : ""
                                      }
                                    >
                                      <label className="checkMarkContainer">
                                        All
                                        <input
                                          type="checkbox"
                                          checked={
                                            this.state.selectAllDriveTrain
                                          }
                                          name="selectAllDriveTrain"
                                          value="All"
                                          onChange={() =>
                                            this.handleOnSelectAll(
                                              "selectAllDriveTrain",
                                              "vehicleDriveTrain",
                                              "selectedDriveTrain",
                                              "driveTrainId"
                                            )
                                          }
                                        />
                                        <span className="filtersCheckmark"></span>
                                      </label>
                                    </li>
                                    {(this.state.vehicleDriveTrain || []).map(
                                      (item, index) => {
                                        return (
                                          <li
                                            key={index}
                                            className={
                                              item.isChecked ? "active" : ""
                                            }
                                          >
                                            <label className="checkMarkContainer">
                                              {item.name}
                                              <input
                                                type="checkbox"
                                                checked={item.isChecked}
                                                name="vehicleDriveTrain"
                                                value={item.value}
                                                onChange={() =>
                                                  this.handleOnSelect(
                                                    item.name,
                                                    "vehicleDriveTrain",
                                                    "selectAllDriveTrain",
                                                    "selectedDriveTrain",
                                                    "driveTrainId",
                                                    item.value
                                                  )
                                                }
                                              />
                                              <span className="filtersCheckmark"></span>
                                            </label>
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                </Scrollbars>
                              </div>
                            </div>
                          </div>
                        ) : null
                      ) : null}

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
                              <Scrollbars
                                autoHeight
                                autoHeightMin="100%"
                                autoHeightMax="374px"
                                className="model-List filters-list"
                              >
                                <ul>
                                  <li
                                    key={index}
                                    className={
                                      this.state.selectAllCylinder === true
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <label className="checkMarkContainer">
                                      All
                                      <input
                                        type="checkbox"
                                        checked={this.state.selectAllCylinder}
                                        name="selectAllCylinder"
                                        value="All"
                                        onChange={() =>
                                          this.handleOnSelectAll(
                                            "selectAllCylinder",
                                            "vehicleCylinder",
                                            "selectedCylinder",
                                            "selectedCylinderId"
                                          )
                                        }
                                      />
                                      <span className="filtersCheckmark"></span>
                                    </label>
                                  </li>
                                  {(this.state.vehicleCylinder || []).map(
                                    (item, index) => {
                                      return (
                                        <li
                                          key={index}
                                          className={
                                            item.isChecked ? "active" : ""
                                          }
                                        >
                                          <label className="checkMarkContainer">
                                            {item.name}
                                            <input
                                              type="checkbox"
                                              checked={item.isChecked}
                                              name="vehicleCylinder"
                                              value={item.value}
                                              onChange={() =>
                                                this.handleOnSelect(
                                                  item.name,
                                                  "vehicleCylinder",
                                                  "selectAllCylinder",
                                                  "selectedCylinder",
                                                  "selectedCylinderId",
                                                  item.value
                                                )
                                              }
                                            />
                                            <span className="filtersCheckmark"></span>
                                          </label>
                                        </li>
                                      );
                                    }
                                  )}
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
                              <Scrollbars
                                autoHeight
                                autoHeightMin="100%"
                                autoHeightMax="374px"
                                className="model-List filters-list"
                              >
                                <ul>
                                  <li
                                    key={index}
                                    className={
                                      this.state.selectAllSeating === true
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <label className="checkMarkContainer">
                                      All
                                      <input
                                        type="checkbox"
                                        checked={this.state.selectAllSeating}
                                        name="selectAllSeating"
                                        value="All"
                                        onChange={() =>
                                          this.handleOnSelectAll(
                                            "selectAllSeating",
                                            "vehicleSeating",
                                            "selectedSeating",
                                            "selectedSeatingId"
                                          )
                                        }
                                      />
                                      <span className="filtersCheckmark"></span>
                                    </label>
                                  </li>
                                  {(this.state.vehicleSeating || []).map(
                                    (item, index) => {
                                      return (
                                        <li
                                          key={index}
                                          className={
                                            item.isChecked ? "active" : ""
                                          }
                                        >
                                          <label className="checkMarkContainer">
                                            {item.name}
                                            <input
                                              type="checkbox"
                                              checked={item.isChecked}
                                              name="vehicleSeating"
                                              value={item.value}
                                              onChange={() =>
                                                this.handleOnSelect(
                                                  item.name,
                                                  "vehicleSeating",
                                                  "selectAllSeating",
                                                  "selectedSeating",
                                                  "selectedSeatingId",
                                                  item.value
                                                )
                                              }
                                            />
                                            <span className="filtersCheckmark"></span>
                                          </label>
                                        </li>
                                      );
                                    }
                                  )}
                                </ul>
                              </Scrollbars>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {mainFilter.passengers === true ? (
                        <div className="card">
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
                              <Scrollbars
                                autoHeight
                                autoHeightMin="100%"
                                autoHeightMax="374px"
                                className="model-List filters-list"
                              >
                                <ul>
                                  <li
                                    key={index}
                                    className={
                                      this.state.selectAllPassenger === true
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <label className="checkMarkContainer">
                                      All
                                      <input
                                        type="checkbox"
                                        checked={this.state.selectAllPassenger}
                                        name="selectAllPassenger"
                                        value="All"
                                        onChange={() =>
                                          this.handleOnSelectAll(
                                            "selectAllPassenger",
                                            "vehiclePassenger",
                                            "selectedPassenger",
                                            "selectedPassengerId"
                                          )
                                        }
                                      />
                                      <span className="filtersCheckmark"></span>
                                    </label>
                                  </li>
                                  {(this.state.vehiclePassenger || []).map(
                                    (item, index) => {
                                      return (
                                        <li
                                          key={index}
                                          className={
                                            item.isChecked ? "active" : ""
                                          }
                                        >
                                          <label className="checkMarkContainer">
                                            {item.name}
                                            <input
                                              type="checkbox"
                                              checked={item.isChecked}
                                              name="vehiclePassenger"
                                              value={item.value}
                                              onChange={() =>
                                                this.handleOnSelect(
                                                  item.name,
                                                  "vehiclePassenger",
                                                  "selectAllPassenger",
                                                  "selectedPassenger",
                                                  "selectedPassengerId",
                                                  item.value
                                                )
                                              }
                                            />
                                            <span className="filtersCheckmark"></span>
                                          </label>
                                        </li>
                                      );
                                    }
                                  )}
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
                                  <li
                                    key={index}
                                    className={
                                      this.state.selectAllSteering === true
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <label className="checkMarkContainer">
                                      All
                                      <input
                                        type="checkbox"
                                        checked={this.state.selectAllSteering}
                                        name="selectAllSteering"
                                        value="All"
                                        onChange={() =>
                                          this.handleOnSelectAll(
                                            "selectAllSteering",
                                            "steering_type",
                                            "selectedSteering",
                                            "selectedSteeringTypeId"
                                          )
                                        }
                                      />
                                      <span className="filtersCheckmark"></span>
                                    </label>
                                  </li>
                                  {(this.state.steering_type || []).map(
                                    (item) => (
                                      <li
                                        key={index}
                                        className={
                                          item.isChecked ? "active" : ""
                                        }
                                      >
                                        <label className="checkMarkContainer">
                                          {item.name}
                                          <input
                                            type="checkbox"
                                            checked={item.isChecked}
                                            name="steering_type"
                                            value={item.value}
                                            onChange={() =>
                                              this.handleOnSelect(
                                                item.name,
                                                "steering_type",
                                                "selectAllSteering",
                                                "selectedSteering",
                                                "selectedSteeringTypeId",
                                                item.value
                                              )
                                            }
                                          />
                                          <span className="filtersCheckmark"></span>
                                        </label>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
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
                                    this.state.selectAllColor === true
                                      ? "ColorPost-Container active"
                                      : "ColorPost-Container"
                                  }
                                  onClick={() =>
                                    this.handleOnSelectAll(
                                      "selectAllColor",
                                      "colors",
                                      "selectAllColor",
                                      "selectedColorId"
                                    )
                                  }
                                >
                                  <div className="color-box">
                                    <h1>
                                      <span>Show All</span>
                                    </h1>
                                  </div>
                                </div>
                                {(this.state.colors || []).map(
                                  (item, index) => (
                                    <div
                                      className={
                                        item.isChecked === true
                                          ? "ColorPost-Container active"
                                          : "ColorPost-Container"
                                      }
                                      onClick={() =>
                                        this.handleOnSelect(
                                          item.name,
                                          "colors",
                                          "selectAllColor",
                                          "selectedColor",
                                          "selectedColorId",
                                          item.value
                                        )
                                      }
                                      key={index}
                                    >
                                      <div
                                        className={`color-box ${item.className} `}
                                      >
                                        <h1>
                                          <span>{item.name}</span>
                                        </h1>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {mainFilter.owners === true ? (
                        <div className="card">
                          <div
                            className="card-header"
                            id="headingOwnersAccidents"
                          >
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
                                      All
                                      <input
                                        type="checkbox"
                                        checked={this.state.selectAllOwner}
                                        name="selectAllOwner"
                                        value="All"
                                        onChange={() =>
                                          this.handleOnSelectAll(
                                            "selectAllOwner",
                                            "vehicleOwner",
                                            "selectedOwners",
                                            "selectedOwnerId"
                                          )
                                        }
                                      />
                                      <span className="filtersCheckmark"></span>
                                    </label>
                                  </li>
                                  {(this.state.vehicleOwner || []).map(
                                    (item, index) => (
                                      <li key={index}>
                                        <label className="checkMarkContainer">
                                          {item.name}
                                          <input
                                            type="checkbox"
                                            checked={item.isChecked}
                                            name="vehicleOwner"
                                            value={item.value}
                                            onChange={() =>
                                              this.handleOnSelect(
                                                item.name,
                                                "vehicleOwner",
                                                "selectAllOwner",
                                                "selectedOwners",
                                                "selectedOwnerId",
                                                item.value
                                              )
                                            }
                                          />
                                          <span className="filtersCheckmark"></span>
                                        </label>
                                      </li>
                                    )
                                  )}
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
                                      All
                                      <input
                                        type="checkbox"
                                        checked={this.state.selectAllSellerType}
                                        name="selectAllSellerType"
                                        value={"All"}
                                        onChange={() =>
                                          this.handleOnSelectAll(
                                            "selectAllSellerType",
                                            "seller_type",
                                            "selectedSellerType",
                                            "selectedSellerId"
                                          )
                                        }
                                      />
                                      <span className="filtersCheckmark"></span>
                                    </label>
                                  </li>
                                  {(this.state.seller_type || []).map(
                                    (item, index) => (
                                      <li>
                                        <label className="checkMarkContainer">
                                          {item.name}
                                          <input
                                            type="checkbox"
                                            checked={item.isChecked}
                                            name="seller_type"
                                            value={item.value}
                                            onChange={() =>
                                              this.handleOnSelect(
                                                item.name,
                                                "seller_type",
                                                "selectAllSellerType",
                                                "selectedSellerType",
                                                "selectedSellerId",
                                                item.value
                                              )
                                            }
                                          />
                                          <span className="filtersCheckmark"></span>
                                        </label>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {mainFilter.accident === true ? (
                        <div className="card">
                          <div
                            className="card-header"
                            id="headingOwnersAccidents"
                          >
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
                                      All
                                      <input
                                        type="checkbox"
                                        checked={this.state.selectAllAccident}
                                        name="selectAllAccident"
                                        value={"All"}
                                        onChange={() =>
                                          this.handleOnSelectAll(
                                            "selectAllAccident",
                                            "vehicleAccident",
                                            "selectedAccident",
                                            "selectedAccidentId"
                                          )
                                        }
                                      />
                                      <span className="filtersCheckmark"></span>
                                    </label>
                                  </li>
                                  {(this.state.vehicleAccident || []).map(
                                    (item, index) => (
                                      <li key={index}>
                                        <label className="checkMarkContainer">
                                          {item.name}
                                          <input
                                            type="checkbox"
                                            checked={item.isChecked}
                                            name="vehicleAccident"
                                            value={item.value}
                                            onChange={() =>
                                              this.handleOnSelect(
                                                item.name,
                                                "vehicleAccident",
                                                "selectAllAccident",
                                                "selectedAccident",
                                                "selectedAccidentId",
                                                item.value
                                              )
                                            }
                                          />
                                          <span className="filtersCheckmark"></span>
                                        </label>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {mainFilter.features === true ? (
                        this.props.vehicle_features !== undefined &&
                        this.props.vehicle_features !== null &&
                        this.state.typeOfVehicle !== "" &&
                        this.state.typeOfVehicle !== "All Vehicles" ? (
                          <div className="card">
                            <div className="card-header" id="heading13">
                              <h2 className="mb-0">
                                <button
                                  className="btn btn-link btn-block text-left collapsed"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target={
                                    (this.props.vehicle_features || []).length >
                                    0
                                      ? "#collapse13"
                                      : ""
                                  }
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
                                {this.props.loaderFeatures !== undefined &&
                                this.props.loaderFeatures !== null &&
                                this.props.loaderFeatures === true ? (
                                  <div className="filters-preloader">
                                    <div className="spinner"></div>
                                  </div>
                                ) : null}
                                <Scrollbars
                                  autoHeight
                                  autoHeightMin="100%"
                                  autoHeightMax="260px"
                                  className="filters-list features-list"
                                >
                                  <div
                                    className="features-row clearfix"
                                    key={index}
                                  >
                                    <label className="checkMarkContainer">
                                      All
                                      <input
                                        type="checkbox"
                                        name="selectAllFeatures"
                                        id="selectAllFeatures"
                                        value={"All"}
                                        checked={this.state.selectAllFeatures}
                                        onChange={this.toggleCheckAllFeatures}
                                      />
                                      <span className="filtersCheckmark"></span>
                                    </label>
                                  </div>
                                  {(this.props.vehicle_features || []).map(
                                    (item, index) => (
                                      <React.Fragment key={index}>
                                        <div
                                          className="features-row clearfix"
                                          key={index}
                                        >
                                          <label className="checkMarkContainer">
                                            {item.v_features}
                                            <input
                                              type="checkbox"
                                              name="featureName"
                                              id="featureRadio"
                                              value={item.id}
                                              checked={item.checked}
                                              onChange={() =>
                                                this.handleOnChangeFeatures(
                                                  item.id
                                                )
                                              }
                                            />
                                            <span className="filtersCheckmark"></span>
                                          </label>
                                        </div>
                                      </React.Fragment>
                                    )
                                  )}
                                </Scrollbars>
                              </div>
                            </div>
                          </div>
                        ) : null
                      ) : null}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/** Mobile view End */}

              {/* <AdPostSearchMobileView {...this.props} toggleMobileView={this.state.toggleMobileView} /> */}
            </div>

            {this.state.viewList == "list" ? (
              <ListView
                {...this.props}
                openModal={(id) => {
                  this.setState({
                    addPostId: id,
                  });
                }}
              />
            ) : (
              <div className="right-grid-view-main">
                <div className="right-grid-view">
                  <div className="search-grid-main-holder clearfix">
                    {/* <GridView
                      {...this.props}
                      sortBySelected={this.state.sortBySelected}
                      handleOnChangeSort={this.handleOnChangeSort}
                    /> */}
                    <GridView
                      {...this.props}
                      sortBySelected={this.state.sortBySelected}
                      handleOnChangeSort={this.handleOnChangeSort}
                      openModal={(id) => {
                        this.setState({
                          addPostId: id,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          {this.state.addPostId && (
            <div>
              <AddDetails
                addPostId={this.state.addPostId}
                closeModal={() =>
                  this.setState({
                    addPostId: null,
                  })
                }
              />
            </div>
          )}
          <GoogleMapModelSearch
            setLocation={this.setLocation}
            setDistance={this.setDistance}
            {...this.state}
            searchOnLocation={this.searchOnLocation}
          />
        </section>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    add_post_list: state.adPostReducers.listPostReducer.add_post_list,
    post_list_filters: state.adPostReducers.listPostReducer.post_list_filters,
    type_of_vehicles: state.adPostReducers.listPostReducer.type_of_vehicles,
    vehicle_features: state.adPostReducers.addPostReducer.vehicle_features,
    selected_filter_list:
      state.adPostReducers.listPostReducer.selected_filter_list,
    removeLoaderTrims: state.adPostReducers.addPostReducer.removeLoaderTrims,
    vehicle_trims: state.adPostReducers.addPostReducer.vehicle_trims,
    showListSearchLoader:
      state.adPostReducers.listPostReducer.showListSearchLoader,
    vehicle_body: state.adPostReducers.addPostReducer.vehicle_body,
    vehicle_drive_train:
      state.adPostReducers.addPostReducer.vehicle_drive_train,
    vehicle_fuel_type: state.adPostReducers.addPostReducer.vehicle_fuel_type,
    vehicle_make: state.adPostReducers.listPostReducer.vehicle_make,
    removeLoaderMake: state.adPostReducers.listPostReducer.removeLoaderMake,
    vehicle_model: state.adPostReducers.listPostReducer.vehicle_model,
    removeLoaderModel: state.adPostReducers.listPostReducer.removeLoaderModel,
    loaderBodyType: state.adPostReducers.addPostReducer.loaderBodyType,
    loaderFuelType: state.adPostReducers.addPostReducer.loaderFuelType,
    loaderDriveTrain: state.adPostReducers.addPostReducer.loaderDriveTrain,
    loaderFeatures: state.adPostReducers.addPostReducer.loaderFeatures,
    showloaderValues: state.adPostReducers.listPostReducer.showloaderValues,
    get_search_values: state.adPostReducers.listPostReducer.get_search_values,
    get_user_profile: state.adPostReducers.listPostReducer.get_user_profile,
    photo: state.adPostReducers.listPostReducer.photo,
    top_ads: state.adPostReducers.listPostReducer.top_ads,
    top_ads_loading: state.adPostReducers.listPostReducer.top_ads_loading,
    nextLoadMoreUrl: state.adPostReducers.listPostReducer.nextLoadMoreUrl,
    next_post_loading: state.adPostReducers.listPostReducer.next_post_loading,
    totalListing: state.adPostReducers.listPostReducer.totalListing,
  };
};
export default connect(mapStateToProps, {
  get_post_list,
  get_vehicle_type,
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
  get_dealer_profile_data,
  get_user_profile_data,
  get_vehicle_make_sub_type,
  get_top_ads,
  next_url_call,
  remove_selected_features,
  get_multi_vehicle_models,
})(DealerList);
