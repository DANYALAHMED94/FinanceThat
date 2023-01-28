/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const ActiveListingReviewLocation = (props) => {
  useEffect(() => {
    if (
      props.loading_update_listing_vehicle_location !== undefined &&
      props.loading_update_listing_vehicle_location !== null &&
      props.loading_update_listing_vehicle_location === false
    ) {
      props.setVehicleLocation(false);
    }
  }, [props.loading_update_listing_vehicle_location]);
  const updateVehicleLocation = () => {
    const data = {
      update: "ad",
      user_id: props.state.userId,
      id: props.state.listingId,
      location: props.listLocation.locationName,
      longitude:
        props.listLocation !== undefined &&
        props.listLocation.listingLongitude !== undefined
          ? (props.listLocation.listingLongitude || 0).toFixed(7)
          : 0,
      latitude:
        props.listLocation !== undefined &&
        props.listLocation.listingLatitude !== undefined
          ? (props.listLocation.listingLatitude || 0).toFixed(7)
          : 0,
      city: props.listLocation.locationCity,
      province: props.listLocation.locationProvince,
    };
    console.log("data", data);
    if (
      props.state.userId !== undefined &&
      props.state.userId !== null &&
      props.state.userId !== ""
    ) {
      console.log("data", data);
      props.update_listing_vehicle_location(data);
    }
  };
  return (
    <React.Fragment>
      <div className="Admin-DealerAdres">
        {/* <img src="/assets/image/addess-icon.svg" alt="" /> */}
        {props.loading_listing_detail === true ? (
          <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
        ) : props.editVehicleLocation === true ? (
          <React.Fragment>
            <GooglePlacesAutocomplete
              apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
              autocompletionRequest={{
                componentRestrictions: {
                  country: ["ca"],
                },
              }}
              selectProps={{
                value: props.listLocation.location,
                onChange: props.handleLocationChange,
                isClearable: true,
                placeholder: "Search Location",
                className: "react-location-select-main",
                classNamePrefix: "react-location-select",
              }}
              onLoadFailed={(error) =>
                console.error("Could not inject Google script", error)
              }
            />
            <div className="Account-EditBtn">
              {props.editVehicleLocation === true ? (
                <button
                  type="button"
                  className="newbtn-add"
                  disabled={!props.editVehicleLocation}
                  onClick={updateVehicleLocation}
                >
                  {" "}
                  {props.loading_update_listing_vehicle_location === true ? (
                    <i
                      class="fa fa-circle-o-notch fa-spin"
                      aria-hidden="true"
                    ></i>
                  ) : (
                    "Update"
                  )}{" "}
                </button>
              ) : null}
            </div>
          </React.Fragment>
        ) : (
          <h3>
            {props.listLocation.locationCity
              ? props.listLocation.locationCity
              : ""}
            {props.listLocation.locationCity &&
            props.listLocation.locationProvince
              ? ","
              : ""}{" "}
            {props.listLocation.locationProvince
              ? props.listLocation.locationProvince
              : ""}
            {/* {props.listLocation.locationName !== undefined && props.listLocation.locationName !== null && props.listLocation.locationName !== '' ? props.listLocation.locationName.split(',').slice(-3, -1)[0] + ", " + props.listLocation.locationName.split(',').slice(-2, -1)[0] : ''} */}
          </h3>
        )}
      </div>
    </React.Fragment>
  );
};
export default ActiveListingReviewLocation;
{
  /* <input type='text' name='listingLocation' value={props.state.listingLocation} onChange={props.handleOnChange} /> */
}
