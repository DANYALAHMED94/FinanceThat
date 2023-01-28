import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const ArchiveListingReviewLocation = (props) => {
  return (
    <React.Fragment>
      <div className="Admin-DealerAdres">
        {props.loading_listing_detail === true ? (
          <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
        ) : props.editVehicleLocation === true ? (
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
          </h3>
        )}
      </div>
    </React.Fragment>
  );
};
export default ArchiveListingReviewLocation;
