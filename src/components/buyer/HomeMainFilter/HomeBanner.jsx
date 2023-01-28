import React, { useState, useEffect, memo } from "react";
import MoreFilter from "./MoreFilter";
import Banner from "./Banner";
import { useDispatch, useSelector } from "react-redux";
import { get_vehicle_make } from "../../../actions/addPostActions";
import { get_multi_vehicle_models } from "../../../actions/homeActions";
const HomeBanner = (props) => {
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => {
    return {
      type_of_vehicles: state.homeReducer.type_of_vehicles,
      vehicle_make: state.adPostReducers.addPostReducer.vehicle_make,
      vehicle_models: state.homeReducer.vehicle_models,
    };
  });
  const [showMore, setShowMore] = useState(false);
  /** Reducer State */
  const [state, setState] = useState({
    vehicleCategory: null,
    vehicleMake: null,
    vehicleModel: null,
    categoryFilter: "",
    categoryFilterName: "",
    maxKm: "",
    maxPrice: "",
    yearFilter: "",
    makeFilter: "",
    modelFilter: "",
    modelFilterName: "",
    makeFilterName: "",
    location: props.location,
    type_of_vehicle:
      reduxState.type_of_vehicles !== undefined &&
      reduxState.type_of_vehicles !== null
        ? reduxState.type_of_vehicles
        : [],
    vehicle_make: [],
    vehicle_makes: [],
    filter_vehicle_make: [],
    vehicle_model: [],
    vehicle_models: [],
    filter_vehicle_model: [],
    itemtitle: "",
    vehicleOptions:
      reduxState.type_of_vehicles !== undefined &&
      reduxState.type_of_vehicles !== null
        ? reduxState.type_of_vehicles.map((item) => {
            return {
              value: item.id,
              label: item.name,
            };
          })
        : [],
    vehicleMakeOptions: [],
    vehicleModelOptions: [],
    color: null,
    vehicleColor: "",
    yearsDropDown: props.years,
    fromYearDropDown: props.fromYear,
    vehicleYear: "",
    distance: props.distance,
    selectedToYear: [],
    toYear: "",
    allCategory: true,
    allMake: true,
    allModels: true,
    allColor: true,
    colors: [
      { label: "Green", value: "Green", colorName: "ColorGreen" },
      { label: "Yellow", value: "Yellow", colorName: "ColorYellow" },
      { label: "Orange", value: "Orange", colorName: "ColorOrange" },
      { label: "Purple", value: "Purple", colorName: "ColorPurple" },
      { label: "Blue", value: "Blue", colorName: "ColorBlue" },
      { label: "Silver", value: "Silver", colorName: "ColorSilver" },
      { label: "Black", value: "Black", colorName: "ColorBlack" },
      { label: "Red", value: "Red", colorName: "ColorRed" },
      { label: "Gold", value: "Gold", colorName: "ColorGold" },
      { label: "Grey", value: "Grey", colorName: "ColorGrey" },
      { label: "Biege", value: "Biege", colorName: "ColorBiege" },
      { label: "Brown", value: "Brown", colorName: "ColorBrown" },
    ],
  });

  const toTitleCase = (str) => {
    return str.toLowerCase().replace(/(?:^|[\s-/])\w/g, function (match) {
      return match.toUpperCase();
    });
  };
  useEffect(() => {
    if (reduxState.type_of_vehicles && reduxState.type_of_vehicles.length > 0) {
      const typeOfVehicle = [];
      (reduxState.type_of_vehicles || []).map((item, index) => {
        typeOfVehicle.push({
          value: item.id,
          label: item.name,
        });
      });

      setState({
        ...state,
        type_of_vehicle: reduxState.type_of_vehicles,
        vehicleOptions: typeOfVehicle,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxState.type_of_vehicles]);

  useEffect(() => {
    if (state.categoryFilter) {
      dispatch(get_vehicle_make(state.categoryFilter));
      const categoryName =
        state.categoryFilter !== ""
          ? (state.type_of_vehicle || [])
              .filter((item) => item.id == state.categoryFilter)
              .map((item) => {
                return item.name;
              })[0] == undefined
            ? ""
            : (state.type_of_vehicle || [])
                .filter((item) => item.id == state.categoryFilter)
                .map((item) => {
                  return item.name;
                })[0]
          : "";
      setState({
        ...state,
        categoryFilterName: categoryName,
        vehicleMakeOptions: [],
        vehicle_make: [],
        vehicle_makes: [],
        makeFilter: "",
        makeFilterName: "",
        vehicleMake: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.categoryFilter]);

  useEffect(() => {
    if (reduxState.vehicle_make && reduxState.vehicle_make.length > 0) {
      setState({
        ...state,
        vehicle_makes: reduxState.vehicle_make.map((item) => {
          return {
            value: item.id,
            label: toTitleCase(item.make_name),
            name: item.make_name,
            mk_count: item.mk_count,
            isChecked: false,
          };
        }),
        vehicleMakeOptions: reduxState.vehicle_make.map((item) => {
          return {
            value: item.id,
            label: toTitleCase(item.make_name),
            name: item.make_name,
            mk_count: item.mk_count,
          };
        }),
        vehicle_model: [],
        vehicleModelOptions: [],
        modelFilterName: "",
        modelFilter: "",
        vehicleModel: "",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxState.vehicle_make]);

  useEffect(() => {
    if (state.vehicleMake) {
      const getIds = state.vehicleMake
        ? state.vehicleMake.value
          ? state.vehicleMake.value
          : ""
        : "";
      console.log(getIds);
      if (getIds) {
        dispatch(get_multi_vehicle_models({ list_of_ids: [getIds] }));
        setState({
          ...state,
          vehicle_model: [],
          vehicle_models: [],
          vehicleModelOptions: [],
          vehicleModel: "",
          modelFilter: "",
          modelFilterName: "",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.vehicleMake]);

  useEffect(() => {
    if (reduxState.vehicle_models) {
      setState({
        ...state,
        vehicle_model: reduxState.vehicle_models,
        vehicle_models: reduxState.vehicle_models.map((item) => {
          return {
            value: item.id,
            label: toTitleCase(item.model_make),
            name: item.model_make,
            md_count: item.md_count,
            isChecked: false,
            // isChecked: (state.vehicleModel || []).filter(mod => Number(mod) === Number(item.id)).length === 0 ? false : true
          };
        }),
        vehicleModelOptions: reduxState.vehicle_models.map((item) => {
          return {
            value: item.id,
            label: toTitleCase(item.model_make),
            name: item.model_make,
            md_count: item.md_count,
          };
        }),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxState.vehicle_models]);

  useEffect(() => {
    if (props.latitude || props.longitude || props.distance || props.location) {
      setState({
        ...state,
        latitude: props.latitude,
        longitude: props.longitude,
        distance: props.distance,
        location: props.location,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.latitude || props.longitude || props.distance || props.location]);

  const changeShowMore = () => {
    setShowMore(!showMore);
  };

  const chnageStateValue = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };
  const changeSelectBanner = (inputName, filterId, value) => {
    setState({
      ...state,
      [inputName]: value,
      [filterId]: value ? (value.value ? value.value : "") : "",
    });
  };
  const changeMoreFilterValues = (e, inputName, filterId, filterName) => {
    setState({
      ...state,
      [inputName]: e,
      [filterId]: e ? (e.value ? e.value : "") : "",
      [filterName]: e ? (e.label ? e.label : "") : "",
      allCategory: inputName === "vehicleCategory" ? false : state.allCategory,
      allMake: inputName === "vehicleMake" ? false : state.allMake,
      allModels: inputName === "vehicleModel" ? false : state.allModels,
      allColor: inputName === "color" ? false : state.allColor,
      toYear: inputName === "yearFilter" ? e.label : state.toYear,
    });
  };
  const changeColor = (e, inputName, filterId) => {
    setState({
      ...state,
      [inputName]: e,
      [filterId]: e ? (e.value ? e.value : "") : "",
      allColor: inputName === "color" ? false : this.state.allColor,
    });
  };
  const ChangeDate = (value, inputName, formName) => {
    setState({
      ...state,
      [inputName]: value,
      [formName]: value ? (value.value ? value.value : "") : "",
    });
  };
  const selectAll = (name) => {
    if (name === "categoryFilterName") {
      setState({
        ...state,
        allCategory: !state.allCategory,
        vehicleCategory: "",
        categoryFilter: "",
        categoryFilterName: "",
      });
    } else if (name === "makeFilterName") {
      setState({
        ...state,
        allMake: !state.allMake,
        makeFilter: "",
        makeFilterName: "",
        vehicleMake: "",
        vehicle_model: [],
        vehicleModelOptions: [],
        modelFilterName: "",
        modelFilter: "",
        vehicleModel: "",
        vehicle_makes: state.vehicle_makes.map((item) => {
          return {
            ...item,
            isChecked: false,
          };
        }),
      });
    } else if (name === "modelFilterName") {
      setState({
        ...state,
        allModels: !state.allModels,
        modelFilterName: "",
        modelFilter: "",
        vehicleModel: "",
        vehicle_models: state.vehicle_models.map((item) => {
          return {
            ...item,
            isChecked: false,
          };
        }),
      });
    } else if (name === "vehicleColor") {
      setState({
        ...state,
        allColor: !state.allColor,
        color: null,
        vehicleColor: "",
      });
    }
  };
  console.log(state, "Home state");
  return showMore ? (
    <MoreFilter
      {...state}
      selectAll={selectAll}
      changeShowMore={changeShowMore}
      chnageStateValue={chnageStateValue}
      changeMoreFilterValues={changeMoreFilterValues}
      changeColor={changeColor}
      ChangeDate={ChangeDate}
    />
  ) : (
    <Banner
      search={state.search}
      location={state.location}
      latitude={state.latitude}
      longitude={state.longitude}
      distance={state.distance}
      vehicleOptions={state.vehicleOptions}
      categoryFilter={state.categoryFilter}
      categoryFilterName={state.categoryFilterName}
      maxKm={state.maxKm}
      changeShowMore={changeShowMore}
      chnageStateValue={chnageStateValue}
      changeSelectBanner={changeSelectBanner}
    />
  );
};
export default memo(HomeBanner);
