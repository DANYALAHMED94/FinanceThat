/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Form, Field, useFormikContext } from "formik";
import { SelectInput, TextInput, TextMaskedInput,SeacrchInput } from "../formInputs";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {Provinces} from "../../../../_constants/Provinces"
import Geocode from "react-geocode";

const AddressFormik = ({address, setStreetAddress, setAddress}) => {

    const formikProps = useFormikContext()
    useEffect(()=>{
        new Promise((resolve) => {
          Geocode.fromAddress(address.label).then(
            (response) => {
              console.log(response);
              const address = response.results[0].formatted_address;
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
                formikProps.setFieldValue('city', city)
                formikProps.setFieldValue('postal_code', postal_code)
                formikProps.setFieldValue('province',state || "")
                setStreetAddress(street_number)
                 console.log(city, state, country, postal_code, street_number);
              // console.log(response);
            },
            (error) => {
              console.error(error);
            }
          );
        });
      },[address]);

      return (
        <Form>
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
                                value: (address),
                                onChange: ((e) => setAddress(e)),
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
          <Field
            name="city"
            type="text"
            component={TextInput}
            placeholder="City"
          />
          <Field
            name="province"
            type="text"
            component={SelectInput}
            placeholder="Province"
            options={Provinces}
          />
          <Field
            mask={[
              /[a-zA-Z0-9]/i,
              /[a-zA-Z0-9]/,
              /[a-zA-Z0-9]/i,
              " ",
              /[a-zA-Z0-9]/,
              /[a-zA-Z0-9]/i,
              /[a-zA-Z0-9]/,
            ]}
            guide={false}
            name="postal_code"
            component={TextMaskedInput}
            placeholder="Postal Code"
          />
          <Field
            name="country"
            type="text"
            component={TextInput}
            placeholder="Country"
            value="Canada"
            disabled
          />
        </div>
        <button type="submit" className="primaryButton continueBtn">
          <span></span> <span>Continue</span>
          <img
            src="/assets/image/arrow_circle_right_outline.svg"
            alt="icon"
          />
        </button>
        <p>This helps us find you a vehicle near you.</p>
      </Form>
    )
}
export default AddressFormik