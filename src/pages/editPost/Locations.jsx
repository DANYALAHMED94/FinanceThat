import React from 'react'
import { Animated } from "react-animated-css";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const Locations = props => {
    // const barPercent = props.stepBoost === 2 ? props.startPercent + 6.66 : props.stepBoost === 3 ? props.startPercent + 13.32 : props.startPercent
    const barPercent = props.backTo !== '' ? props.startPercent + props.startPercent + props.startPercent : props.startPercent
    return (
        <React.Fragment>
            <Animated animationIn={props.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                <div className="AdPost-SecFifteen">
                    <div className="VehicleForm-Head">
                        <h6 className="section-heading">Add Location</h6>
                    </div>

                    <div className="">
                        <GooglePlacesAutocomplete
                            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                            autocompletionRequest={{

                                componentRestrictions: {
                                    country: ['ca'],
                                }
                            }}
                            selectProps={{
                                value: (props.location),
                                onChange: (props.handleLocationChange),
                                isClearable: true,
                                placeholder: 'Search Location',
                                className: "react-location-select-main",
                                classNamePrefix: "react-location-select",

                            }}

                            onLoadFailed={(error) => (
                                console.error("Could not inject Google script", error)
                            )}

                        />
                    </div>

                    <div className='row'>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                            <div className="SecSeven-Btn previous-btn float-left">
                                {/* 20 */}
                                <button
                                    type="button"
                                    onClick={() => props.changeStepButton(19, 1, 2, -props.startPercent)}
                                >
                                    {/* onClick={() => props.changeStepButton(19, 1, 2, -16.66666666666667)} */}
                                    <i className="fa fa-angle-left"></i>
                                        Previous{" "}
                                </button>
                            </div>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                            {/* barPercent */}
                            <div className="SecSeven-Btn">

                                <button
                                    type="button"
                                    onClick={() => props.changeStepButton(21, 3, 6, barPercent)}
                                >
                                    Next{" "}
                                    <i className="fa fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Animated>
        </React.Fragment>
    )
}
export default Locations