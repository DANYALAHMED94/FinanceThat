import React from 'react'
import NumberFormat from 'react-number-format';
import Select, { components } from 'react-select';
import { Animated } from "react-animated-css";
import { Scrollbars } from "react-custom-scrollbars";
import MakePlaceHolder from '../../components/placeHolder/MakePlaceHolder'
import ModelPlaceHolder from '../../components/placeHolder/ModelPlaceHolder'
import TypeOfVehiclePlaceHolder from '../../components/placeHolder/TypeOfVehiclePlaceHolder'
import CKEditor from 'ckeditor4-react';

const { Option } = components;

const renderScrollbar = props => {
    return (
        <div style={{ height: 260 }}>
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

const toTitleCase = (str) => {
    return str.toLowerCase().replace(/(?:^|[\s-/])\w/g, function (match) {
        return match.toUpperCase();
    });
}

const TypeofVehicle = (props) => {
    /**
     *
     *  Make Drop Down
     *
     */
    const makeDrop = []
    props.vehicle_makes.map((item, index) => {
        return makeDrop.push({
            label: toTitleCase(item.make_name), value: item.id
        })
    })
    /**
     *
     *  Model Drop Down
     *
     */
    const modelDrop = []
    props.vehicle_models.map(item => {
        return modelDrop.push({
            label: toTitleCase(item.model_make), value: item.id
        })
    })

    const type_of_vehicle = (props.type_of_vehicles || []).map((item, index) => {
        return (
            <React.Fragment key={index}>
                <div className="boxed-grid-col">
                    <div className="addPostBox" key={index}  >
                        <label className="AdPost-CheckBox">
                            <div className="AdPost-Thumble item" >
                                <input
                                    type="checkbox"
                                    value={Number(item.id)}
                                    name="typeOfVehicle"
                                    onChange={props.handleOnChange}
                                    checked={
                                        Number(props.state.typeOfVehicle) === Number(item.id)
                                    }
                                    disabled={Number(props.state.typeOfVehicle) === Number(item.id)}
                                />
                                <span className="checkadpost"></span>
                                <span className="icon-holder">{item.name.toUpperCase() === ('AUTOMOTIVE').toUpperCase() || item.name.toUpperCase() === ('AUTOS').toUpperCase() || item.name.toUpperCase() === ('AUTO').toUpperCase() ? <img src="/assets/image/automotive.svg" alt={item.name} /> :
                                    item.name.toUpperCase() === ('MOTORCYCLE').toUpperCase() || item.name.toUpperCase() === ('MOTORCYCLES').toUpperCase() ? <img src="/assets/image/motorcycle.svg" alt={item.name} /> :
                                        item.name.toUpperCase() === ('RV').toUpperCase() || item.name.toUpperCase() === ('RVS').toUpperCase() ? <img src="/assets/image/rv.svg" alt={item.name} /> :
                                            item.name.toUpperCase() === ('Boat').toUpperCase() || item.name.toUpperCase() === ('Boats').toUpperCase() ? <img src="/assets/image/boat.svg" alt={item.name} /> :
                                                item.name.toUpperCase() === ('Trailer').toUpperCase() || item.name.toUpperCase() === ('Trailers').toUpperCase() ? <img src="/assets/image/trailer.svg" alt={item.name} /> :
                                                    item.name.toUpperCase() === ("Powersport").toUpperCase() || item.name.toUpperCase() === ("Powersports").toUpperCase() ? <img src="/assets/image/power-sport.svg" alt={item.name} /> :
                                                        item.name.toUpperCase() === ("Small Equipment").toUpperCase() || item.name.toUpperCase() === ("Small Equipments").toUpperCase() ? <img src="/assets/image/small-epuipment.svg" alt={item.name} /> : ''}
                                </span>
                                <h1>{item.name}</h1>
                            </div>
                        </label>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    )
    const sub_type_of_vehicle = (props.type_of_vehicles || []).map((item, index) => (
        item.name.toUpperCase() === ('powersport').toUpperCase() || item.name.toUpperCase() === ('powersports').toUpperCase() ? (item.typeofvehicle_id || []).map((subItem, subIndex) => (
            <React.Fragment key={subIndex}>
                <div className="boxed-grid-col">
                    <div className="addPostBox" key={subIndex}  >
                        <label className="AdPost-CheckBox">
                            <div className="AdPost-Thumble item" >
                                <input
                                    type="checkbox"
                                    value={Number(subItem.id)}
                                    name="subTypeId"
                                    onChange={props.handleOnChange}
                                    checked={
                                        Number(props.state.subTypeId) === Number(subItem.id)
                                    }
                                    disabled={Number(props.state.subTypeId) === Number(subItem.id)}
                                />
                                <span className="checkadpost"></span>
                                <span className="icon-holder">
                                    {subItem.name.toUpperCase() === ('ATV/UTV').toUpperCase() || subItem.name.toUpperCase() === ('ATVS/UTVS').toUpperCase() ? <img src="/assets/image/ATVUTV.svg" alt={subItem.name} /> : subItem.name.toUpperCase() === ('Watercraft').toUpperCase() || subItem.name.toUpperCase() === ('Watercrafts').toUpperCase() ? <img src="/assets/image/Watercraft.svg" alt={subItem.name} /> : subItem.name.toUpperCase() === ('Snowmobile').toUpperCase() || subItem.name.toUpperCase() === ('Snowmobiles').toUpperCase() ? <img src="/assets/image/snowmobile.svg" alt={subItem.name} /> : ''}
                                </span>

                                <h1>{subItem.name}</h1>
                            </div>
                        </label>
                    </div>
                </div>
            </React.Fragment>
        )) : null
    )
    )
    const emptyFun = () => {
        return true
    }
    const vehcile_mokes = props.state.selectedTypeName.toUpperCase() === ('Automotive').toUpperCase() ? (props.vehicle_makes || []).map((item, index) => (
        <React.Fragment key={index}>
            {/* {item.image_path !== null && item.image_path !== undefined ? (<div className="boxed-grid-col" key={index} style={{ minHeight: '96.81px' }}> */}
            {item.image_path ? (<div className="boxed-grid-col" key={index} style={{ minHeight: '96.81px' }}>
                <div className={Number(props.state.selectVehicleMake) === Number(item.id) ? "SelectCar-Brand active" : "SelectCar-Brand"} onClick={Number(props.state.selectVehicleMake) === Number(item.id) ? emptyFun : () => props.handleOnClick('selectVehicleMake', item.id)} style={{ minHeight: '70.81px' }}>
                    <img src={item.image_path} alt={item.make_name} />
                </div>
            </div>) : null}

        </React.Fragment>
    )) : []

    const motorSelectNext = props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? 9 : (props.state.engineStepName === 'Engine Horsepower' || props.state.engineStepName === 'Engine CC') ? (props.state.selectedSubTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('Watercraft').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('ATV/UTV').toUpperCase()) ? 10 : props.state.selectedTypeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 15 : 14 : props.state.selectedTypeName.toUpperCase() === ('RV').toUpperCase() ? 7.1 : props.state.selectedTypeName.toUpperCase() === ('TRAILER').toUpperCase() ? 14 : 8
    const motorSelectPrev = (props.state.engineStepName === 'Engine Horsepower' || props.state.engineStepName === 'Engine CC') ? (props.state.selectedSubTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('Watercraft').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('ATV/UTV').toUpperCase()) ? 10 : 7 : props.state.selectedTypeName.toUpperCase() === ('Trailer').toUpperCase() ? 7 : 13
    const boatSelectPrev = 10
    const boatSelectNext = props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? 15 : 12
    const boatSelectModelNext = props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() || (props.state.selectedSubTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('Watercraft').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('ATV/UTV').toUpperCase()) ? 4.1 : props.state.selectedTypeName.toUpperCase() === ('Trailer').toUpperCase() ? 5 : props.state.selectedTypeName.toUpperCase() === ('Automotive').toUpperCase() ? 4 : props.state.selectedTypeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 4.1 : 5
    const boatSelectModelPrev = props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() || (props.state.selectedSubTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('Watercraft').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('ATV/UTV').toUpperCase()) || props.state.selectedTypeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 3 : props.state.selectedTypeName.toUpperCase() === ('Automotive').toUpperCase() ? 4 : 3
    const boatSelectYearPrev = props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() || (props.state.selectedSubTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('Watercraft').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('ATV/UTV').toUpperCase()) || props.state.selectedTypeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 4.1 : props.state.selectedTypeName.toUpperCase() === ('Trailer').toUpperCase() ? 3 : props.state.selectedTypeName.toUpperCase() === ('Automotive').toUpperCase() ? 4 : 3
    const boatBackFuel = props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? 11 : props.state.selectedTypeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 7 : props.state.selectedTypeName.toUpperCase() === ('RV').toUpperCase() ? 7.1 : 14
    // const boatNextOwner = props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? 17 : props.state.selectedSubTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('Watercraft').toUpperCase() ? 18 : 16
    const boatNextOwner = props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? 17 : props.state.selectedSubTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('Watercraft').toUpperCase() ? 16 : 16
    const boatBackOwner = props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? 15 : 16
    const backSubType = props.state.selectedSubTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('Watercraft').toUpperCase() ? 15 : props.state.selectedTypeName.toUpperCase() === ('Small Equipment').toUpperCase() || props.state.selectedTypeName.toUpperCase() === ('Trailer').toUpperCase() ? 16 : 17
    const transmissionNext = (props.state.selectedSubTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('Watercraft').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('ATV/UTV').toUpperCase()) ? 14 : 11
    const transmissionPrev = (props.state.selectedSubTypeName.toUpperCase() === ('Snowmobile').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('Watercraft').toUpperCase() || props.state.selectedSubTypeName.toUpperCase() === ('ATV/UTV').toUpperCase()) ? 7 : 9
    const prevSeating = props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? 7 : 8
    const nextAccident = props.state.selectedTypeName.toUpperCase() === ('Trailer').toUpperCase() || props.state.selectedTypeName.toUpperCase() === ('Small Equipment').toUpperCase() ? 18 : 17
    const barPercent = props.state.backTo !== '' ? props.state.startPercent + props.state.startPercent + props.state.startPercent + props.state.startPercent + props.state.startPercent : props.state.startPercent
    return (
        <React.Fragment>
            {Number(props.state.step) === 18 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecThree item">


                        <div className="#" >
                            <div className="post-ad-tabular-filter-row vin-hin-section">
                                <label>Description</label>
                                <CKEditor
                                    className="form-control ckEditior-postadd"
                                    data={props.state.description}
                                    onChange={props.handleOnChangeDesc}
                                />
                                {/* <textarea required className="form-control Distextarea" id="description" name="description" rows="4" cols="50" onChange={props.handleOnChange}>
                                    {props.state.description}
                                </textarea> */}
                            </div>

                        </div>
                        <div className='row align-items-center'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn previous-btn float-left">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(backSubType, -props.state.startPercent)}
                                    >
                                        <i className="fa fa-angle-left"></i>
                                        Previous{" "}
                                    </button>
                                </div>
                            </div>
                            {/* props.state.startPercent */}
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn">
                                    <button
                                        type="button"
                                        onClick={() => props.changeStepButton(19, 1, 2, barPercent)}
                                    >
                                        Next{" "}
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null}
            {Number(props.state.step) === 17 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecThree item" id="features">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pl-0 pr-0 pr-0 pl-0">
                                <div className="VehicleForm-Head">
                                    <h6 className="section-heading">Features</h6>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {(props.state.vehicle_features || []).map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="col-xl-4 col-lg-3 col-md-6 col-sm-12 col-12 pr-0 pl-0" key={index}>
                                        <label className="FeatureRadio-Btn" title="title text goes here">
                                            {item.v_features}
                                            <input
                                                type="checkbox"
                                                name="featureName"
                                                id="featureRadio"
                                                value={item.id}
                                                checked={item.checked}
                                                onChange={() => props.handleOnChangeFeatures(item.id)}
                                            />
                                            <span className="FeatureMark"></span>
                                        </label>
                                    </div>
                                </React.Fragment>
                            ))}

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className='row align-items-center'>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                        <div className="SecSeven-Btn previous-btn float-left">
                                            <button
                                                type="button"
                                                onClick={() => props.changeSilde(boatBackOwner, -props.state.startPercent)}
                                            >
                                                <i className="fa fa-angle-left"></i>
                                                Previous{" "}
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                        <div className="SecSeven-Btn">
                                            <button
                                                type="button"
                                                onClick={() => props.changeSilde(18, props.state.startPercent)}
                                            >
                                                Next{" "}
                                                <i className="fa fa-angle-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null}
            {Number(props.state.step) === 16 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecThree item">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="VehicleForm-Head">
                                    <h6 className="section-heading">Previous Accidents</h6>
                                </div>
                            </div>
                        </div>

                        <div className="two-col-grid clearfix">
                            {(props.state.accidents || []).map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="col-outer">
                                        <div className="grid-col">
                                            <div
                                                className={
                                                    Number(props.state.previousAccident) ===
                                                        Number(item.value) && props.state.previousAccident !== ""
                                                        ? "VehicleChoose-Name active"
                                                        : "VehicleChoose-Name"
                                                }
                                                onClick={() =>
                                                    props.handleOnClick(
                                                        "previousAccident",
                                                        item.value
                                                    )
                                                }

                                            >
                                                <h1>{item.name}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}

                        </div>
                        <div className='row align-items-center'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn previous-btn float-left">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(15, -props.state.startPercent)}
                                    >
                                        <i className="fa fa-angle-left"></i>
                                        Previous{" "}
                                    </button>
                                </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(nextAccident, props.state.startPercent)}
                                    >
                                        Next{" "}
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null}
            {Number(props.state.step) === 15 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecThree item">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="VehicleForm-Head">
                                    <h6 className="section-heading">Previous Owners</h6>
                                </div>
                            </div>
                        </div>

                        <div className="two-col-grid clearfix">
                            {(props.state.owners || []).map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="col-outer">
                                        <div className="grid-col">
                                            <div
                                                className={
                                                    Number(props.state.previousOwner) ===
                                                        Number(item.value)
                                                        ? "VehicleChoose-Name active"
                                                        : "VehicleChoose-Name"
                                                }
                                                onClick={() =>
                                                    props.handleOnClick(
                                                        "previousOwner",
                                                        item.value
                                                    )
                                                }

                                            >
                                                <h1>{item.name}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        <div className='row align-items-center'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn previous-btn float-left">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(boatBackFuel, -props.state.startPercent)}
                                    >
                                        <i className="fa fa-angle-left"></i>
                                        Previous{" "}
                                    </button>
                                </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(boatNextOwner, props.state.startPercent)}
                                    >
                                        Next{" "}
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null}
            {Number(props.state.step) === 14 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecThree item">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="VehicleForm-Head">
                                    <h6 className="section-heading">Color</h6>
                                </div>
                            </div>
                        </div>

                        <div className="three-col-grid clearfix">
                            {(props.state.colors || []).map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="col-outer">
                                        <div className="grid-col">
                                            <div
                                                className={
                                                    props.state.color === item.name
                                                        ? "ColorPost-Container active"
                                                        : "ColorPost-Container"
                                                }
                                                onClick={() =>
                                                    props.handleOnClick("color", item.name)
                                                }

                                            >
                                                <div className={item.classname}>
                                                    <h1>
                                                        <span>{item.name}</span>
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}

                        </div>
                        <div className='row align-items-center'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn previous-btn float-left">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(motorSelectPrev, -props.state.startPercent)}
                                    >
                                        <i className="fa fa-angle-left"></i>
                                        Previous{" "}
                                    </button>
                                </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(15, props.state.startPercent)}
                                    >
                                        Next{" "}
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null}
            {Number(props.state.step) === 13 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecThree item">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="VehicleForm-Head">
                                    <h6 className="section-heading">Cylinder</h6>
                                </div>
                            </div>
                        </div>

                        <div className="two-col-grid clearfix">
                            {(props.state.cylinders || []).map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="col-outer">
                                        <div className="grid-col">
                                            <div
                                                className={
                                                    Number(props.state.cylinder) === Number(item.value)
                                                        ? "VehicleChoose-Name active"
                                                        : "VehicleChoose-Name"
                                                }
                                                onClick={() =>
                                                    props.handleOnClick("cylinder", item.value)
                                                }

                                            >
                                                <h1>{item.value}</h1>
                                            </div>
                                        </div>
                                    </div>

                                </React.Fragment>
                            ))}

                        </div>
                        <div className='row align-items-center'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn previous-btn float-left">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(12, -props.state.startPercent)}
                                    >
                                        <i className="fa fa-angle-left"></i>
                                        Previous{" "}
                                    </button>
                                </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(14, props.state.startPercent)}
                                    >
                                        Next{" "}
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null}
            {Number(props.state.step) === 12 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecThree item">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="VehicleForm-Head">
                                    <h6 className="section-heading">Drivetrain</h6>
                                </div>
                            </div>
                        </div>

                        <div className="two-col-grid clearfix">
                            {(props.vehicle_drive_train || []).map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="col-outer" key={index}>
                                        <div className="grid-col">
                                            <div
                                                className={
                                                    Number(props.state.drivetrain) === Number(item.id)
                                                        ? "VehicleChoose-Name active"
                                                        : "VehicleChoose-Name"
                                                }
                                                onClick={() =>
                                                    props.handleOnClick(
                                                        "drivetrain",
                                                        item.id
                                                    )
                                                }

                                            >
                                                <h1>{item.drive_train}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        <div className='row align-items-center'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn previous-btn float-left">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(11, -props.state.startPercent)}
                                    >
                                        <i className="fa fa-angle-left"></i>
                                        Previous{" "}
                                    </button>
                                </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(13, props.state.startPercent)}
                                    >
                                        Next{" "}
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null}
            {Number(props.state.step) === 11 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecThree item">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="VehicleForm-Head">
                                    <h6 className="section-heading">Fuel Type</h6>
                                </div>
                            </div>
                        </div>

                        <div className="two-col-grid clearfix">
                            {(props.vehicle_fuel_type || []).map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="col-outer" key={index}>
                                        <div className="grid-col">
                                            <div
                                                className={
                                                    Number(props.state.fuelType) === Number(item.id)
                                                        ? "VehicleChoose-Name active"
                                                        : "VehicleChoose-Name"
                                                }
                                                onClick={() =>
                                                    props.handleOnClick(
                                                        "fuelType",
                                                        item.id
                                                    )
                                                }


                                            >
                                                <h1>{item.fuel_type}</h1>
                                            </div>
                                        </div>
                                    </div>

                                </React.Fragment>
                            ))}
                        </div>
                        <div className='row align-items-center'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn previous-btn float-left">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(boatSelectPrev, -props.state.startPercent)}
                                    >
                                        <i className="fa fa-angle-left"></i>
                                        Previous{" "}
                                    </button>
                                </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(boatSelectNext, props.state.startPercent)}
                                    >
                                        Next{" "}
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null}
            {Number(props.state.step) === 10 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecThree item">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="VehicleForm-Head">
                                    <h6 className="section-heading">{props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? "Steering Type" : "Transmission"}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="two-col-grid clearfix">

                            {props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? ((props.state.steeringTypes || []).map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="col-outer">
                                        <div className="grid-col">
                                            <div
                                                className={
                                                    props.state.steeringType ===
                                                        item.name
                                                        ? "VehicleChoose-Name active"
                                                        : "VehicleChoose-Name"
                                                }
                                                onClick={() =>
                                                    props.handleOnClick(
                                                        "steeringType",
                                                        item.name
                                                    )
                                                }
                                            >
                                                <h1>{item.name}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))) : ((props.state.transmissions || []).map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="col-outer">
                                        <div className="grid-col">
                                            <div
                                                className={
                                                    props.state.transmission ===
                                                        item.name
                                                        ? "VehicleChoose-Name active"
                                                        : "VehicleChoose-Name"
                                                }
                                                onClick={() =>
                                                    props.handleOnClick(
                                                        "transmission",
                                                        item.name
                                                    )
                                                }
                                            >
                                                <h1>{item.name}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )))}
                            { }

                            {/* {this.validator.message('Transmission', this.state.transmission, 'required')} */}
                        </div>
                        <div className='row align-items-center'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn previous-btn float-left">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(transmissionPrev, -props.state.startPercent)}
                                    >
                                        <i className="fa fa-angle-left"></i>
                                        Previous{" "}
                                    </button>
                                </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(transmissionNext, props.state.startPercent)}
                                    >
                                        Next{" "}
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null}
            {Number(props.state.step) === 9 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecThree item">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="SecEight-DropMenu hull-material-head">
                                    <h6 className="section-heading">{props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? "Passengers" : "Seating"}</h6>
                                    <Select
                                        placeholder="Select Seating"
                                        id={props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? "selectedPassenger" : "selectSeating"}
                                        name={props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? "selectedPassenger" : "selectSeating"}
                                        defaultValue={{ value: '2', label: '2' }}
                                        value={props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? props.state.selectedPassenger : props.state.selectSeating}
                                        onChange={(e) => props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? props.changeSelect(e, 'passenger', 'selectedPassenger') : props.changeSelect(e, 'seating', 'selectSeating')}
                                        options={props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? props.state.passengers : props.state.seatings}
                                        className="react-select-main"
                                        classNamePrefix="react-select"
                                        components={{
                                            Option: renderOption,
                                            MenuList: renderScrollbar
                                        }}
                                        captureMenuScroll={false}

                                    />
                                    {props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? props.validator.message('passenger', props.state.passenger, 'required') : props.validator.message('Seating', props.state.seating, 'required')}
                                </div>
                                {props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? (<div className="SecEight-DropMenu hull-material-head">
                                    <h6 className="section-heading">Hull Material</h6>
                                    <Select
                                        placeholder="Select Hull Material"
                                        id={'selectedHullMaterial'}
                                        name={'selectedHullMaterial'}
                                        defaultValue={props.state.selectedHullMaterial}
                                        value={props.state.selectedHullMaterial}
                                        onChange={(e) => props.changeSelect(e, 'hull_material', 'selectedHullMaterial')}
                                        options={props.state.hullMaterials}
                                        className="react-select-main"
                                        classNamePrefix="react-select"
                                        components={{
                                            Option: renderOption,
                                            MenuList: renderScrollbar
                                        }}
                                        captureMenuScroll={false}

                                    />
                                </div>) : null}

                                <div className='row'>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                        <div className="SecSeven-Btn previous-btn float-left">
                                            <button
                                                type="button"
                                                onClick={() => props.changeSilde(prevSeating, -props.state.startPercent)}
                                            >
                                                <i className="fa fa-angle-left"></i>
                                                Previous{" "}
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                        <div className="SecSeven-Btn">
                                            <button
                                                type="button"
                                                onClick={() => props.changeSilde(10, props.state.startPercent)}
                                            >
                                                Next{" "}
                                                <i className="fa fa-angle-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null}
            {Number(props.state.step) === 8 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecThree item">
                        <h6 className="section-heading top-heading-m">Body Type</h6>

                        <div className="two-col-grid clearfix">
                            {(props.vehicle_body || []).map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="col-outer" key={index}>
                                        <div className="grid-col">
                                            <div
                                                className={
                                                    props.state.bodyType === item.id
                                                        ? "VehicleChoose-Name active"
                                                        : "VehicleChoose-Name"
                                                }
                                                onClick={() =>
                                                    props.handleOnClick(
                                                        "bodyType",
                                                        item.id
                                                    )
                                                }

                                            >
                                                <h1>{item.body_type}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}

                        </div>
                        <div className='row'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn previous-btn float-left">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(7, -props.state.startPercent)}
                                    >
                                        <i className="fa fa-angle-left"></i>
                                        Previous{" "}
                                    </button>
                                </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(9, props.state.startPercent)}
                                    >
                                        Next{" "}
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null}
            {Number(props.state.step) === 7.1 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecSeven item">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="Price-Form">
                                    <label>Length (FT)</label>
                                    <NumberFormat required
                                        className='form-control rv-length'
                                        value={(props.state.length)}
                                        decimalScale={2}
                                        onChange={props.handleOnChange}
                                        thousandSeparator={true}
                                        id="length"
                                        name="length"
                                    />
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="Kilometter-Form mb-0">
                                    <label>Weight (KG)</label>
                                    <NumberFormat required
                                        className='form-control rv-weight'
                                        value={props.state.weight}
                                        id="weight"
                                        name="weight"
                                        onChange={props.handleOnChange}
                                        thousandSeparator={true}
                                    />
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className='row'>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                        <div className="SecSeven-Btn previous-btn float-left">
                                            <button
                                                type="button"
                                                onClick={() => props.changeSilde(7, -props.state.startPercent)}
                                            >
                                                <i className="fa fa-angle-left"></i>
                                                Previous{" "}
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                        <div className="SecSeven-Btn">
                                            <button
                                                type="button"
                                                onClick={() => props.changeSilde(15, props.state.startPercent)}
                                            >
                                                Next{" "}
                                                <i className="fa fa-angle-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Animated>
            ) : null}
            {Number(props.state.step) === 7 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecSeven item">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="Price-Form">
                                    <label>Price</label>
                                    <NumberFormat required
                                        className='form-control'
                                        value={(props.state.price)}
                                        decimalScale={2}
                                        onChange={props.handleOnChange}
                                        thousandSeparator={true}
                                        id="price"
                                        name="price"
                                    />
                                </div>
                            </div>
                            {props.state.selectedTypeName.toUpperCase() === ('BOAT').toUpperCase() ? (<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="Price-Form">
                                    <label>Length (FT)</label>
                                    <NumberFormat required
                                        className='form-control rv-length'
                                        value={(props.state.length)}
                                        decimalScale={2}
                                        onChange={props.handleOnChange}
                                        thousandSeparator={true}
                                        id="length"
                                        name="length"
                                    />
                                </div>
                            </div>) : (<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="Kilometter-Form mb-0">
                                    <label>Kilometers</label>
                                    <NumberFormat required
                                        className='form-control'
                                        value={props.state.kilometer}
                                        id="kilometer"
                                        name="kilometer"
                                        onChange={props.handleOnChange}
                                        thousandSeparator={true}
                                    />
                                </div>
                            </div>)}


                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className='row'>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                        <div className="SecSeven-Btn previous-btn float-left">
                                            <button
                                                type="button"
                                                onClick={() => props.changeSilde(props.state.engineStepName !== '' && props.state.engineStepName !== undefined ? 1.3 : props.state.newStepName !== '' && props.state.newStepName !== undefined ? 1.2 : 6, -props.state.startPercent)}
                                            >
                                                <i className="fa fa-angle-left"></i>
                                                Previous{" "}
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                        <div className="SecSeven-Btn">
                                            <button
                                                type="button"
                                                onClick={() => props.changeSilde(motorSelectNext, props.state.startPercent)}
                                            >
                                                Next{" "}
                                                <i className="fa fa-angle-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Animated>
            ) : null}
            {props.state.engineStepName !== '' && props.state.engineStepName !== undefined && props.state.newStep === true && Number(props.state.step) === 1.3 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecFifteen vin-hin-section">
                        <div className="post-ad-tabular-filter-row EnginInput">
                            <label>{props.state.engineStepName}</label>
                            <div className="form-group">
                                {/* <input
                                    className="form-control"
                                    type="text"
                                    id={'engineCC'}
                                    name={'engineCC'}
                                    value={props.state.engineCC}
                                    onChange={props.handleOnChange}
                                    placeholder={props.state.engineStepName === 'Engine Horsepower' ? 'Enter Engine Horsepower' : 'Engine CC'}
                                /> */}
                                <NumberFormat
                                    className="form-control"
                                    id="engineCC"
                                    name="engineCC"
                                    value={props.state.engineCC}
                                    onChange={props.handleOnChange}
                                    placeholder={props.state.engineStepName === 'Engine Horsepower' ? 'Enter Engine Horsepower' : 'Engine CC'}
                                    style={{
                                        background: "none",
                                        paddingLeft: "20px",
                                    }} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn previous-btn float-left">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(props.state.newStepName !== '' && props.state.newStepName !== undefined ? 1.2 : 6, -props.state.startPercent)}
                                    >
                                        <i className="fa fa-angle-left"></i>
                                        Previous{" "}
                                    </button>
                                </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(7, props.state.startPercent)}
                                    >
                                        Next{" "}
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null}
            {props.state.newStepName !== '' && props.state.newStepName !== undefined && props.state.newStep === true && Number(props.state.step) === 1.2 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecFifteen vin-hin-section">
                        <div className="post-ad-tabular-filter-row">
                            <label>{props.state.newStepName}</label>
                            <div className="form-group">
                                <input required
                                    className="form-control"
                                    type="text"
                                    id={props.state.newStepName === 'VIN Number' ? 'vinNumber' : props.state.newStepName === 'HIN Number' ? 'hinNumber' : props.state.newStepName === 'Serial Number' ? 'serialNumber' : props.state.newStepName === 'Engine Horsepower' ? 'engineCC' : ''}
                                    name={props.state.newStepName === 'VIN Number' ? 'vinNumber' : props.state.newStepName === 'HIN Number' ? 'hinNumber' : props.state.newStepName === 'Serial Number' ? 'serialNumber' : props.state.newStepName === 'Engine Horsepower' ? 'engineCC' : ''}
                                    value={props.state.newStepName === 'VIN Number' ? props.state.vinNumber : props.state.newStepName === 'HIN Number' ? props.state.hinNumber : props.state.newStepName === 'Serial Number' ? props.state.serialNumber : props.state.newStepName === 'Engine Horsepower' ? props.state.engineCC : ''}
                                    onChange={props.handleOnChangeVinHinSerial}
                                    placeholder={props.state.newStepName === 'VIN Number' ? 'Enter the VIN here' : props.state.newStepName === 'HIN Number' ? 'Enter the HIN here' : props.state.newStepName === 'Serial Number' ? 'Enter the serial number here' : props.state.newStepName === 'Engine Horsepower' ? 'Enter Engine Horsepower' : ''}
                                />
                            </div>
                            <p>{props.state.newStepName === 'VIN Number' ? 'A VIN is composed of 17 characters (digits and capital letters) that act as a unique identifier for the vehicle. The VIN can be found on the vehicle’s title, registration, or certificate of insurance.' : props.state.newStepName === 'HIN Number' ? 'The Hull Identification Number (HIN) is a 12- or 15-character serial number that uniquely identifies a boat. HIN can be found on the vehicle’s title, registration, or certificate of insurance.' : props.state.newStepName === 'Serial Number' ? 'Serial number is usually marked on the equipment it self.' : ''}  </p>
                            <strong className="title">{props.state.newStepName === 'VIN Number' ? 'Example: 2C3CCAEG4DH565714' : props.state.newStepName === 'HIN Number' ? 'Example: ABC12345B612  or CA-ABC12345B612' : ''}  </strong>
                        </div>

                        <div className='row'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn previous-btn float-left">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(6, -props.state.startPercent)}
                                    >
                                        <i className="fa fa-angle-left"></i>
                                        Previous{" "}
                                    </button>
                                </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(props.state.engineStepName !== '' && props.state.engineStepName !== undefined ? 1.3 : 7, props.state.startPercent)}
                                    >
                                        Next{" "}
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null}
            {Number(props.state.step) === 6 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecThree item">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="VehicleForm-Head">
                                    <h6 className="section-heading top-heading-m">Select Condition</h6>
                                </div>
                            </div>
                        </div>

                        <div className="two-col-grid clearfix">
                            {(props.state.conditions || []).map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="col-outer">
                                        <div className="grid-col">
                                            <div
                                                className={
                                                    props.state.selectCondition === item.name
                                                        ? "VehicleChoose-Name active"
                                                        : "VehicleChoose-Name"
                                                }
                                                onClick={() =>
                                                    props.handleOnClick(
                                                        "selectCondition",
                                                        item.name
                                                    )
                                                }

                                            >
                                                <h1>{item.name}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}

                        </div>
                        <div className='row'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn previous-btn float-left">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(5, -props.state.startPercent)}
                                    >
                                        <i className="fa fa-angle-left"></i>
                                        Previous{" "}
                                    </button>
                                </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(props.state.newStepName !== '' && props.state.newStepName !== undefined ? 1.2 : props.state.engineStepName !== '' && props.state.engineStepName !== undefined ? 1.3 : 7, props.state.startPercent)}
                                    >
                                        Next{" "}
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null}
            {Number(props.state.step) === 5 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecFive item">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="SecEight-DropMenu">
                                    <h6 className='section-heading'>
                                        Select Year
                                    </h6>
                                    <Select
                                        placeholder="Select Year"
                                        id="selectYear"
                                        name="selectYear"
                                        value={props.state.selectYear}
                                        onChange={props.changeYear}
                                        options={props.state.yearsDropDown}
                                        className="react-select-main"
                                        classNamePrefix="react-select"
                                        components={{
                                            Option: renderOption,
                                            MenuList: renderScrollbar
                                        }}
                                        captureMenuScroll={false}

                                    />
                                    <div className='row'>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                            <div className="SecSeven-Btn previous-btn float-left">
                                                <button
                                                    type="button"
                                                    onClick={() => props.changeSilde(boatSelectYearPrev, -props.state.startPercent)}
                                                >
                                                    <i className="fa fa-angle-left"></i>
                                                    Previous{" "}
                                                </button>
                                            </div>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                            <div className="SecSeven-Btn">
                                                <button
                                                    type="button"
                                                    onClick={() => props.changeSilde(6, props.state.startPercent)}
                                                >
                                                    Next{" "}
                                                    <i className="fa fa-angle-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null}
            {Number(props.state.step) === 4.1 ? (<>
                < Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecFour item">
                        <div className="post-ad-tabular-filter">
                            <div className="post-ad-tabular-filer-inner">
                                <div className="post-ad-tabular-filter-row">
                                    <div className="post-ad-tabular-filter-col">
                                        <div className="VehicleForm-Head">
                                            <label>Hours</label>
                                        </div>
                                    </div>
                                    <div className="post-ad-tabular-filter-col">
                                        <div className="VehicleForm-Head">
                                            <NumberFormat
                                                className="form-control"
                                                id="boatHours"
                                                name="boatHours"
                                                value={props.state.boatHours}
                                                onChange={props.handleOnChange}
                                                placeholder="Enter Hours"
                                                style={{
                                                    background: "none",
                                                    paddingLeft: "20px",
                                                }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="two-col-grid clearfix">

                        </div>
                        <div className='row'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn previous-btn float-left">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(boatSelectModelPrev, -props.state.startPercent)}
                                    >
                                        <i className="fa fa-angle-left"></i>
                                        Previous{" "}
                                    </button>
                                </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(5, props.state.startPercent)}
                                    >
                                        Next{" "}
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </Animated></>) : null}


            {Number(props.state.step) === 4 ? (
                (<>
                    < Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                        <div className="AdPost-SecFour item">
                            <div className="post-ad-tabular-filter">
                                <div className="post-ad-tabular-filer-inner">
                                    <div className="post-ad-tabular-filter-row">
                                        <div className="post-ad-tabular-filter-col">
                                            <div className="VehicleForm-Head">
                                                <label>Select Trim</label>
                                            </div>
                                        </div>
                                        <div className="post-ad-tabular-filter-col">
                                            <div className="VehicleForm-Head">
                                                <Select
                                                    placeholder="Search Trim"
                                                    id="trimName"
                                                    name="trimName"
                                                    value={props.state.trimName}
                                                    onChange={(e) => props.changeSelect(e, 'selectTrim', 'trimName')}
                                                    options={props.state.trims}
                                                    isSearchable
                                                    isClearable
                                                    className="react-select-main"
                                                    classNamePrefix="react-select"
                                                    components={{
                                                        Option: renderOption,
                                                        MenuList: renderScrollbar
                                                    }}
                                                    captureMenuScroll={false}

                                                />
                                                {/* <input required
                                                    className="form-control"
                                                    type="text"
                                                    id="trimName"
                                                    name="trimName"
                                                    value={props.state.trimName}
                                                    onChange={props.handleOnChange}
                                                    placeholder="Search Trim"
                                                /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post-ad-tabular-filter-row">
                                        <div className="post-ad-tabular-filter-col">
                                            <div className="VehicleForm-Head">
                                                <label>Other, enter trim</label>
                                            </div>
                                        </div>
                                        <div className="post-ad-tabular-filter-col">
                                            <div className="VehicleForm-Head">
                                                <input required
                                                    className="form-control"
                                                    type="text"
                                                    id='otherTrim'
                                                    name="otherTrim"
                                                    value={props.state.otherTrim}
                                                    // onBlur={this.blurTrim}
                                                    onChange={props.handleOnChange}
                                                    placeholder="Enter the name of your vehicle trim"
                                                    style={{
                                                        background: "none",
                                                        paddingLeft: "20px",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="two-col-grid clearfix">
                                {props.removeLoaderTrims === false ? (<><ModelPlaceHolder /><ModelPlaceHolder /><ModelPlaceHolder /><ModelPlaceHolder /><ModelPlaceHolder /><ModelPlaceHolder /></>) : null}
                                {(props.state.trims || []).map((item, index) => (
                                    index >= 0 && index < 6 ? (
                                        <React.Fragment key={index}>
                                            <div className="col-outer">
                                                <div className="grid-col">
                                                    <div
                                                        className={
                                                            Number(props.state.selectTrim) ===
                                                                Number(item.value)
                                                                ? "VehicleChoose-Name active"
                                                                : "VehicleChoose-Name"
                                                        }
                                                        onClick={Number(props.state.selectTrim) ===
                                                            Number(item.value) ? emptyFun : () =>
                                                            props.handleOnClick(
                                                                "selectTrim",
                                                                item.value
                                                            )
                                                        }
                                                    >
                                                        <h1>{item.label}</h1>
                                                    </div>
                                                </div>
                                            </div>

                                        </React.Fragment>) : null
                                ))}

                            </div>
                            <div className='row'>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                    <div className="SecSeven-Btn previous-btn float-left">
                                        <button
                                            type="button"
                                            onClick={() => props.changeSilde(3, -props.state.startPercent)}
                                        >
                                            <i className="fa fa-angle-left"></i>
                                            Previous{" "}
                                        </button>
                                    </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                    <div className="SecSeven-Btn">
                                        <button
                                            type="button"
                                            onClick={() => props.changeSilde(5, props.state.startPercent)}
                                        >
                                            Next{" "}
                                            <i className="fa fa-angle-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Animated>
                </>)
            ) : null
            }
            {Number(props.state.step) === 3 ? (
                <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                    <div className="AdPost-SecThree select-model-screen item">
                        <div className="post-ad-tabular-filter">
                            <div className="post-ad-tabular-filer-inner">
                                <div className="post-ad-tabular-filter-row">
                                    <div className="post-ad-tabular-filter-col">
                                        <div className="VehicleForm-Head">
                                            <label>Select Model</label>
                                        </div>
                                    </div>
                                    <div className="post-ad-tabular-filter-col">
                                        <div className="VehicleForm-Head">
                                            <Select
                                                placeholder="Search Model"
                                                id="modelName"
                                                name="modelName"
                                                closeMenuOnSelect="false"
                                                value={props.state.modelName}
                                                onChange={props.handleOnChangeModel}
                                                options={modelDrop}
                                                isSearchable
                                                isClearable
                                                className="react-select-main"
                                                classNamePrefix="react-select"
                                                components={{
                                                    Option: renderOption,
                                                    MenuList: renderScrollbar
                                                }}
                                                captureMenuScroll={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="post-ad-tabular-filter-row">
                                    <div className="post-ad-tabular-filter-col">
                                        <div className="VehicleForm-Head">
                                            <label>Other, enter model</label>
                                        </div>
                                    </div>
                                    <div className="post-ad-tabular-filter-col">
                                        <div className="VehicleForm-Head">
                                            <input required
                                                className="form-control"
                                                type="text"
                                                id="otherModel"
                                                name="otherModel"
                                                onBlur={props.blurModel}
                                                value={props.state.otherModel}
                                                onChange={props.handleOnChange}
                                                placeholder="Enter the name of your vehicle model"
                                                style={{
                                                    background: "none",
                                                    paddingLeft: "20px",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="two-col-grid clearfix">
                            {(props.removeLoaderModel === false) ? (<><ModelPlaceHolder /><ModelPlaceHolder /><ModelPlaceHolder /><ModelPlaceHolder /><ModelPlaceHolder /><ModelPlaceHolder /></>) : null}
                            {(props.vehicle_models || []).map((item, index) => (
                                index >= 0 && index < 6 ? (
                                    <React.Fragment key={index}>

                                        <div className="col-outer">
                                            <div className="grid-col" key={index}>
                                                <div
                                                    className={
                                                        Number(props.state.selectModel) === Number(item.id)
                                                            ? "VehicleChoose-Name active"
                                                            : "VehicleChoose-Name"
                                                    }
                                                    onClick={Number(props.state.selectModel) === Number(item.id) ? emptyFun : () =>
                                                        props.handleOnClick(
                                                            "selectModel",
                                                            item.id
                                                        )
                                                    }

                                                >
                                                    <h1>{toTitleCase(item.model_make)}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>) : null
                            ))}

                        </div>
                        <div className='row'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn previous-btn float-left">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(2, -props.state.startPercent)}
                                    >
                                        <i className="fa fa-angle-left"></i>
                                        Previous{" "}
                                    </button>
                                </div>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                <div className="SecSeven-Btn">
                                    <button
                                        type="button"
                                        onClick={() => props.changeSilde(boatSelectModelNext, props.state.startPercent)}
                                    >
                                        Next{" "}
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            ) : null
            }
            {
                Number(props.state.step) === 2 ? (
                    <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                        <div className="AdPost-SecTwo make-screen item">
                            <div className="post-ad-tabular-filter">
                                <div className="post-ad-tabular-filer-inner">
                                    <div className="post-ad-tabular-filter-row">
                                        <div className="post-ad-tabular-filter-col">
                                            <div className="VehicleForm-Head">
                                                <label>Select Make</label>
                                            </div>
                                        </div>
                                        <div className="post-ad-tabular-filter-col">
                                            <div className="VehicleForm-Head">
                                                <Select
                                                    placeholder="Search Make"
                                                    id="makeName"
                                                    name="makeName"
                                                    value={props.state.makeName}
                                                    onChange={props.handleOnChangeMake}
                                                    options={makeDrop}
                                                    isSearchable
                                                    isClearable
                                                    className="react-select-main"
                                                    classNamePrefix="react-select"
                                                    components={{
                                                        Option: renderOption,
                                                        MenuList: renderScrollbar
                                                    }}
                                                    captureMenuScroll={false}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post-ad-tabular-filter-row">
                                        <div className="post-ad-tabular-filter-col">
                                            <div className="VehicleForm-Head">
                                                <label>Other, provide make</label>
                                            </div>
                                        </div>
                                        <div className="post-ad-tabular-filter-col">
                                            <div className="VehicleForm-Head">
                                                <input required
                                                    className="form-control"
                                                    type="text"
                                                    id="otherMake"
                                                    name="otherMake"
                                                    value={props.state.otherMake}
                                                    onBlur={props.blurMake}
                                                    onChange={props.handleOnChange}
                                                    placeholder="Enter the name of your vehicle make"
                                                    style={{
                                                        background: "none",
                                                        paddingLeft: "20px",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {Number(props.state.typeOfVehicle) === 7 ? (<h6 className="quick-search-heading"> Quick Select </h6>) : ''}
                            <div className="boxed-grid-main clearfix">
                                {(props.removeLoaderMake === false) ? (<><MakePlaceHolder /><MakePlaceHolder /><MakePlaceHolder /><MakePlaceHolder /><MakePlaceHolder /><MakePlaceHolder /><MakePlaceHolder /><MakePlaceHolder /><MakePlaceHolder /><MakePlaceHolder /><MakePlaceHolder /><MakePlaceHolder /></>) : null}
                                {vehcile_mokes}
                            </div>
                            <div className='row align-items-center'>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                    <div className="SecSeven-Btn previous-btn float-left">
                                        <button
                                            type="button"
                                            onClick={props.state.subVehicleType !== '' ? () => props.changeSilde(1.1, -props.state.startPercent) : () => props.changeSilde(1, -props.state.startPercent)}
                                        >
                                            <i className="fa fa-angle-left"></i>
                                            Previous{" "}
                                        </button>
                                    </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                    <div className="SecSeven-Btn">
                                        <button
                                            type="button"
                                            onClick={() => props.changeSilde(3, props.state.startPercent)}
                                        >
                                            Next{" "}
                                            <i className="fa fa-angle-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Animated>
                ) : null
            }
            {
                Number(props.state.step) === 1.1 ? (
                    <>
                        <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                            <div className="AdPost-SecOne item" id="type_of_vehicles">
                                <h6>Select type of Vehicle:</h6>
                                <div className="boxed-grid-main clearfix">
                                    {/* {type_of_vehicle} */}
                                    {sub_type_of_vehicle}
                                    {/* Sub Type */}
                                </div>
                                <div className='row align-items-center'>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                        <div className="SecSeven-Btn previous-btn float-left">
                                            <button
                                                type="button"
                                                onClick={() => props.changeSilde(1, -props.state.startPercent)}
                                            >
                                                <i className="fa fa-angle-left"></i>
                                                Previous{" "}
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                        <div className="SecSeven-Btn">
                                            <button
                                                type="button"
                                                onClick={() => props.changeSilde(2, props.state.startPercent)}
                                            >
                                                Next{" "}
                                                <i className="fa fa-angle-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Animated>
                    </>
                ) : null
            }
            {
                Number(props.state.step) === 1 ? (
                    <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                        <div className="AdPost-SecOne type-of-vehicle-screen item" id="type_of_vehicles">
                            <h6>Type of Vehicle</h6>
                            <div className="boxed-grid-main clearfix">
                                {props.removeLoaderType === false ? (<><TypeOfVehiclePlaceHolder /><TypeOfVehiclePlaceHolder /><TypeOfVehiclePlaceHolder /><TypeOfVehiclePlaceHolder /><TypeOfVehiclePlaceHolder /><TypeOfVehiclePlaceHolder /><TypeOfVehiclePlaceHolder /></>) : null}

                                {type_of_vehicle}
                            </div>
                            <div className="SecSeven-Btn">
                                <button
                                    type="button"
                                    onClick={props.state.subVehicleType !== '' ? () => props.changeSilde(1.1, props.state.startPercent) : () => props.changeSilde(2, props.state.startPercent)}
                                >
                                    Next{" "}
                                    <i className="fa fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </Animated>
                )
                    : null
            }        </React.Fragment >
    )
}
export default TypeofVehicle