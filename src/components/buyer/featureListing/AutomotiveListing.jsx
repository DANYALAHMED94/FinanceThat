import React, { memo, useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel2";
import ListingCarousel from "./ListingCarousel";
import { get_home_type_vehicle_detail } from "../../../actions/homeActions";
import FeatureVehiclePlaceHolderHome from "../../placeHolder/FeatureVehiclePlaceHolderHome";
import EmptyComponent from "./EmptyComponent";
import { saved_ad_post, un_saved_ad_post } from "../../../actions/homeActions";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import ListingDesktopView from "./ListingDesktopView";
import ListingTabletView from "./ListingTabletView";
import ListingMobileView from "./ListingMobileView";

const AutomotiveListing = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      home_vehicle_detail: state.homeReducer.home_vehicle_detail,
      vehicle_detail_loading: state.homeReducer.vehicle_detail_loading,
      user_id: state.authReducer.authentication.user.user_id,
    };
  });
  const [dataArray, setDataArray] = useState([]);
  useEffect(() => {
    let data = {
      sortBy: "random",
      start_pay: "",
      end_pay: "",
      longitude: props.lng,
      latitude: props.lat,
      search: "",
      start_p: 0,
      end_p: "",
      start_k: 0,
      end_k: "",
      start_y: 1900,
      end_y: new Date().getFullYear(),
      make: "",
      model: "",
      trim: "",
      transmission: "",
      condition: "",
      color: "",
      seller_type: "",
      features: "",
      vehicleFuel: "",
      vehicleDrive: "",
      vehicleCylinder: "",
      vehicleSeating: "",
      vehicleBody: "",
      vehicleAccident: "",
      vehicleOwner: "",
      vin: "",
      engineCC: "",
      hours: "",
      vehiclePassenger: "",
      steering_type: "",

      subTypeOfVehicle: "",
      subTypeName: "",
      p_size: 30,
      category: props.category,
      featured_listings: "True",
    };
    // if (props.lng && props.lat) {
    //   data.sortBy = "distance_nearest";
    // }
    dispatch(get_home_type_vehicle_detail(data));
    console.log(data, "Data");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category]);
  useEffect(() => {
    if (state.home_vehicle_detail) {
      console.log(state.home_vehicle_detail, "vehical data");
      setDataArray(state.home_vehicle_detail);
    }
  }, [state.home_vehicle_detail]);
  const toggleSavedAd = (ad_id, status) => {
    const data = {
      user_id: state.user_id,
      ad_id: ad_id,
    };
    if (!state.user_id) {
      toastr.error("Error", "User Have To Login First");
      return false;
    }
    if (!status) {
      dispatch(saved_ad_post(data, "home_vehicle_detail"));
    } else {
      dispatch(un_saved_ad_post(data, "home_vehicle_detail"));
    }
  };
  return (
    <>
      {state.vehicle_detail_loading === true ? (
        <>
          <div className="d-block d-md-none">
            <FeatureVehiclePlaceHolderHome />
          </div>
          <div className="d-none d-md-block d-lg-none">
            <div className="mainViewFlex">
              {[...Array(4).keys()].map((item) => {
                return <FeatureVehiclePlaceHolderHome key={item} />;
              })}
            </div>
          </div>
          <div className="d-none d-lg-block">
            <div className="mainViewFlex">
              {[...Array(10).keys()].map((item) => {
                return <FeatureVehiclePlaceHolderHome key={item} />;
              })}
            </div>
          </div>
        </>
      ) : null}
      {dataArray && dataArray.length > 0 && !state.vehicle_detail_loading ? (
        <>
          <div className="d-block d-md-none">
            <ListingMobileView
              dataArray={dataArray}
              toggleSavedAd={toggleSavedAd}
            />
          </div>
          <div className="d-none d-md-block d-lg-none">
            <ListingTabletView
              dataArray={dataArray}
              toggleSavedAd={toggleSavedAd}
            />
          </div>
          <div className="d-none d-lg-block">
            <ListingDesktopView
              dataArray={dataArray}
              toggleSavedAd={toggleSavedAd}
            />
          </div>
        </>
      ) : state.vehicle_detail_loading === false ? (
        <EmptyComponent name={props.category} />
      ) : null}
    </>
  );
};

export default memo(AutomotiveListing);
