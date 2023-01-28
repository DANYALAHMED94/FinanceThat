import React from 'react'
import NumberFormat from 'react-number-format';
import { Animated } from "react-animated-css";
import Select, { components } from 'react-select';
import { Scrollbars } from "react-custom-scrollbars";

const { Option } = components;

const renderScrollbar = props => {
    return (
        <div style={{ height: 260 }}>
            <Scrollbars>{props.children}</Scrollbars>
        </div>
    );
};

const renderSubScrollbar = props => {
    return (
        <div style={{ height: 200 }}>
            <Scrollbars>{props.children}</Scrollbars>
        </div>
    );
};


const renderScrollbarListing = props => {
    return (
        <div style={{ height: 100 }}>
            <Scrollbars>{props.children}</Scrollbars>
        </div>
    );
};


const renderOption = props => {
    return (
        <Option {...props}>
            <div>{props.data.label}</div>
        </Option>
    );
};
const VehicleInformation = props => {
    const type_of_vehicle = [];
    (props.type_of_vehicles || []).map(item => {
        type_of_vehicle.push({
            value: item.id,
            label: item.name,
            subVehicles:(item.typeofvehicle_id || [])?.map(ite=> {
                return {
                    value:ite.id,
                    label:ite.name
                }
            })
        })
    })
    const prevBar = props.state.coApplication === 'yes' ? (props.state.startPerCo) : (props.state.startPerc * 2)
    const currentTab = props.state.coApplication === 'yes' ? 4 : 3
    const prevTab = props.state.coApplication === 'yes' ? 3 : 2
    const NextVal = (props.state.startPerc / 2)
    const Next = props.state.finalizeStep === '' ? (props.state.startPerc) : (props.state.startPerc + NextVal)
    const vehicleBar = props.state.listingSource === 'Vehicle listed on Finance That' ? (props.state.startPerc / 2) : props.state.listingSource === 'Vehicle sold somewhere else' ? (props.state.startPerc / 3) : props.state.startPerc
    return (
        <React.Fragment>
            <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                <div className="PostApp-SecOne">


                    <div className="StepLast-Container">

                        <div className="StepLast-Head">
                            <h1 className="ListSorce-MtO">Vehicle information</h1>
                        </div>

                        <div className="PostApp-Coapplicant">
                            <h1>Do you have the vehicle and it’s seller information?</h1>
                            <ul>
                                <li>
                                    <label className="Applicant-Btn">Yes
  				    <input type="radio" id="sellerInfo" name="sellerInfo" onChange={props.handleOnChange} value={'yes'} checked={props.state.sellerInfo === 'yes'} disabled={props.match.params !== undefined && props.match.params.id !== undefined} />
                                        <span className="Appmark"></span>
                                    </label>
                                </li>
                                <li>
                                    <label className="Applicant-Btn">No
  				    <input type="radio" id="sellerInfo" name="sellerInfo" onChange={props.handleOnChange} value={'no'} checked={props.state.sellerInfo === 'no'} disabled={props.match.params !== undefined && props.match.params.id !== undefined} />
                                        <span className="Appmark"></span>
                                    </label>
                                </li>
                                <li>
                                    {props.validator.message('Seller Info', props.state.sellerInfo, 'required')}
                                </li>
                            </ul>
                        </div>

                        <div className="clearfix"></div>
                        <div className="clearfix"></div>
                        <div className="clearfix"></div>

                        {props.state.sellerInfo === 'no' && (
                            <>
                            <div className="PostApp-Coapplicant" style={{margin:"30px 0px 0px 0px"}}>
                            <h1>Are you looking to buy from a private seller?</h1>
                            <ul>
                                <li>
                                    <label className="Applicant-Btn">Yes
                                        <input type="radio" id="looking_for_private_seller" name="looking_for_private_seller" onChange={props.handleOnChange} value={'yes'} checked={props.state.looking_for_private_seller === 'yes'} disabled={props.match.params !== undefined && props.match.params.id !== undefined} />
                                        <span className="Appmark"></span>
                                    </label>
                                </li>
                                <li>
                                    <label className="Applicant-Btn">No
                                        <input type="radio" id="looking_for_private_seller" name="looking_for_private_seller" onChange={props.handleOnChange} value={'no'} checked={props.state.looking_for_private_seller === 'no'} disabled={props.match.params !== undefined && props.match.params.id !== undefined} />
                                        <span className="Appmark"></span>
                                    </label>
                                </li>
                                <li>
                                    {props.validator.message('Private Seller', props.state.looking_for_private_seller, 'required')}
                                </li>
                            </ul>
                        </div>
                                                <div className="clearfix"></div>
                                                <div className="clearfix"></div>
                                                <div className="clearfix"></div>
                                                </>
                        ) }
                        {props.state.sellerInfo === 'yes' ? (<>
                            <div className="ListSource-Form">
                                <label>Listing Source</label>
                                <Select
                                    placeholder=""
                                    id="selectListingSource"
                                    name="selectListingSource"
                                    options={props.state.listingSources}
                                    onChange={(e) => props.changeSelect(e, 'listingSource', 'selectListingSource')}
                                    value={props.state.selectListingSource}
                                    className="react-select-main"
                                    classNamePrefix="react-select"
                                    components={{
                                        Option: renderOption,
                                        MenuList: renderScrollbarListing
                                    }}
                                    // captureMenuScroll={false}
                                    onBlur={() => props.validator.showMessageFor('Listing Source')}
                                    isDisabled={props.match.params !== undefined && props.match.params.id !== undefined}
                                />
                                {props.validator.message('Listing Source', props.state.listingSource, 'required')}
                            </div>
                        </>) : null}
                        {props.state.listingSource === 'Vehicle sold somewhere else' && props.state.sellerInfo === 'yes' ? (<>
                            <div className="ListSource-Form">
                                <label>Type of Vehicle</label>
                                <Select
                                    placeholder=""
                                    id="selectTypeOfVehicle"
                                    name="selectTypeOfVehicle"
                                    options={type_of_vehicle}
                                    onChange={(e) => props.changeSelect(e, 'typeOfVehicle', 'selectTypeOfVehicle')}
                                    value={props.state.selectTypeOfVehicle}
                                    className="react-select-main"
                                    classNamePrefix="react-select"
                                    components={{
                                        Option: renderOption,
                                        MenuList: renderScrollbar
                                    }}
                                    captureMenuScroll={false}
                                    onBlur={() => props.validator.showMessageFor('Vehicle Type')}
                                />
                                {props.validator.message('Vehicle Type', props.state.typeOfVehicle, 'required')}
                            </div>

                              {(type_of_vehicle || [])?.filter(item=> +item.value === +props.state.typeOfVehicle)?.[0]?.subVehicles?.length > 0 && (
                                     <div className="ListSource-Form">
                                     <label>Sub Type of Vehicle</label>
                                     <Select
                                         placeholder=""
                                         id="selectsubTypeOfVehicle"
                                         name="selectsubTypeOfVehicle"
                                         options={(type_of_vehicle || [])?.filter(item=> +item.value === +props.state.typeOfVehicle)?.[0]?.subVehicles || []}
                                         onChange={(e) => props.changeSelect(e, 'subtypeOfVehicle', 'selectsubTypeOfVehicle')}
                                         value={props.state.selectsubTypeOfVehicle}
                                         className="react-select-main"
                                         classNamePrefix="react-select"
                                         components={{
                                             Option: renderOption,
                                             MenuList: renderSubScrollbar
                                         }}
                                         captureMenuScroll={false}
                                         onBlur={() => props.validator.showMessageFor('Vehicle Sub Type')}
                                     />
                                     {props.validator.message('Vehicle Sub Type', props.state.subtypeOfVehicle, 'required')}
                                     </div>


                            )}       

                            <div className="ListSource-Form">
                                <label>Vehicle Price Including tax</label>
                                <NumberFormat
                                    className='form-control Priced-2'
                                    value={(props.state.vehiclePrice)}
                                    decimalScale={2}
                                    prefix={'$'}
                                    onChange={props.handleOnChange}
                                    thousandSeparator={true}
                                    id="vehiclePrice"
                                    name="vehiclePrice" placeholder="Enter the Price Include Tax"
                                    onBlur={() => props.validator.showMessageFor('Vehicle Price')}
                                />
                                {props.validator.message('Vehicle Price', props.state.vehiclePrice, 'required')}
                            </div>
                        </>) : null}
                    </div>




                    <div className='row align-items-center'>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                            <div className="PostApp-NextBtn previous-btn float-left">
                                <button type="button" onClick={() => props.changeStepButton(prevTab, currentTab, -prevBar)}> <i className="fa fa-angle-left"></i> Previous </button>
                            </div>
                        </div>
                        {/* || props.state.backTo !== ''  */}
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                            <div className="PostApp-NextBtn float-right">
                                <button type="button" onClick={props.state.sellerInfo === 'no' ? () => props.changeStepButton(5, 6, (Next)) : props.state.listingSource === 'Vehicle sold somewhere else' ? () => props.changeVehicleDetail(1, vehicleBar) : props.state.listingSource === 'Vehicle listed on Finance That' ? () => props.changeVehicleFinance(1, vehicleBar) : props.validateVehicleInfor}>Next <i className="fa fa-angle-right"></i></button>
                            </div>
                        </div>
                    </div>


                </div>
            </Animated>
        </React.Fragment>
    )
}
export default VehicleInformation
// () => props.changeStepButton(4, 5)