/* eslint-disable default-case */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function SearchAddress({ formState, setFormState, onContinue }) {
  // onSubmit
  const onSubmit = () => {
    if(address){
        onContinue();
    }else {
        alert("Please Add Address")
    }
  };

  const [address, setAddress] = useState(formState?.fullAddress || "")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
  },[])

  useEffect(()=>{
    if(typeof address === "object"){
      setIsLoading(true)
      new Promise((resolve) => {
        Geocode.fromAddress(address.label).then(
          (response) => {
            console.log(response);
            const formatedAddress = response.results[0].formatted_address;
            let city,
              state,
              country,
              postal_code,
              street_number,
              route,
              state_long;
            for (
              let i = 0;
              i < response.results[0].address_components.length;
              i++
            ) {
              for (
                let j = 0;
                j < response.results[0].address_components[i].types.length;
                j++
              ) {
                switch (response.results[0].address_components[i].types[j]) {
                  case "locality":
                    city = response.results[0].address_components[i].long_name;
                    break;
                  case "administrative_area_level_1":
                    state_long =
                      response.results[0].address_components[i].long_name;
                    state =
                      response.results[0].address_components[i].short_name;

                    break;
                  case "country":
                    country =
                      response.results[0].address_components[i].long_name;
                    break;
                  case "route":
                    route = response.results[0].address_components[i].long_name;
                    break;
                  case "postal_code":
                    postal_code =
                      response.results[0].address_components[i].long_name;
                    break;
                  case "street_number":
                    street_number =
                      response.results[0].address_components[i].long_name;
                    break;
                }
              }
            }
            street_number =
              (street_number === undefined || street_number === null
                ? ""
                : street_number) +
              " " +
              (route === undefined || route === null ? "" : route);
              setFormState({
                  ...formState,
                  city:city,
                  postal_code:postal_code,
                  province:state,
                  street_address:street_number,
                  locationName:formatedAddress,
                  fullAddress:address
              })
              setIsLoading(false)
              //  console.log(city, state, country, postal_code, street_number);
            // console.log(response);
          },
          (error) => {
            setIsLoading(false)
            console.error(error);
          }
        );
      });
    }

  },[address]);

  // useEffect(()=> {
  //   setAddress({label:formState.locationName || ""})
  // },[formState.locationName])
  // main return
  return (
    <div className="formWrapper">
      <h1>What is your address?</h1>
       <div className="optionFlex">
       <div className="address__fld">
            <GooglePlacesAutocomplete required
                apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                autocompletionRequest={{
                componentRestrictions: {
                              country: ['ca'],
                                  }
                              }}
                              selectProps={{
                                value: (address),                                onChange: ((e) => setAddress(e)),
                                  isClearable: true,
                                  placeholder: 'Start typing your address here',
                                  className: "react-location-select-main",
                                  classNamePrefix: "react-location-select",
                              }}
                              onLoadFailed={(error) => (
                                  console.error("Could not inject Google script", error)
                              )}
                          />
                      </div>

        </div>
          <button type="button" className="primaryButton continueBtn" onClick={onSubmit} disabled={isLoading}>
          <span></span> <span>{isLoading ? "Loading" : "Continue"}</span>
          <img
            src="/assets/image/arrow_circle_right_outline.svg"
            alt="icon"
          />
        </button>
        <p>This helps us find you a vehicle near you.</p>
    </div>
  );
}
