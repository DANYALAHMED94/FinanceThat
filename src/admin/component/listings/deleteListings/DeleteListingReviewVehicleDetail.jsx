import React, { useEffect } from 'react'
import NumberFormat from 'react-number-format'
import {
    transmissions,
    colors,
    seatings,
    conditions,
    owners,
    accidents,
    years
} from '../listingConstants'
const DeleteListingReviewVehicleDetail = props => {
    console.log(props.state)
    return (<React.Fragment>
        <div className="DealerID-List">
            <div className="LeftCon"><h1>Category</h1></div>
            <div className="RightCon"><h2><span>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<input type='text' name='vehicleCategory' value={props.state.vehicleCategory} onChange={props.handleOnChange} />) : props.state.vehicleCategory}</span></h2></div>
        </div>

        <div className="DealerID-List">
            <div className="LeftCon"><h1>Condition</h1></div>
            <div className="RightCon"><h2><span>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<select name="vehicleCondition" onChange={props.handleOnChange} value={props.state.vehicleCondition} >
                {conditions.map((cond, condIndex) => (
                    <option value={cond.name} key={condIndex}>{cond.name}</option>
                ))}
                                )</select>) : props.state.vehicleCondition}</span></h2></div>
        </div>

        <div className="DealerID-List">
            <div className="LeftCon"><h1>Year</h1></div>
            <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<select name="vehicleYear" onChange={props.handleOnChange} value={props.state.vehicleYear} >
                {years.map((year, yearIndex) => (
                    <option value={year.value} key={yearIndex}>{year.label}</option>
                ))} )</select>) : props.state.vehicleYear}</h2></div>
        </div>

        <div className="DealerID-List">
            <div className="LeftCon"><h1>Make</h1></div>
            <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<input type='text' name='vehicleMake' value={props.state.vehicleMake} onChange={props.handleOnChange} />) : props.state.vehicleMake}</h2></div>
        </div>

        <div className="DealerID-List">
            <div className="LeftCon"><h1>Model</h1></div>
            <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<input type='text' name='vehicleModel' value={props.state.vehicleModel} onChange={props.handleOnChange} />) : props.state.vehicleModel}</h2></div>
        </div>

        <div className="DealerID-List">
            <div className="LeftCon"><h1>KM</h1></div>
            <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<NumberFormat
                value={props.state.vehicleKilometer}
                id="vehicleKilometer"
                name="vehicleKilometer"
                onChange={props.handleOnChange}
                thousandSeparator={true}
            />) : props.state.vehicleKilometer !== undefined && props.state.vehicleKilometer !== null && props.state.vehicleKilometer !== '' ? props.state.vehicleKilometer.toLocaleString('en-US') : (0).toLocaleString('en-US')}</h2></div>
        </div>
        {/* */}
        <div className="DealerID-List">
            <div className="LeftCon"><h1>VIN</h1></div>
            <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<input type='text' name='vehicleVin' value={props.state.vehicleVin} onChange={props.handleOnChange} />) : props.state.vehicleVin}</h2></div>
        </div>

        <div className="DealerID-List">
            <div className="LeftCon"><h1>Price</h1></div>
            <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<NumberFormat required
                value={props.state.vehiclePrice}
                id="vehiclePrice"
                name="vehiclePrice"
                onChange={props.handleOnChange}
                thousandSeparator={true}
            />) : props.state.vehiclePrice !== undefined && props.state.vehiclePrice !== null && props.state.vehiclePrice !== '' ? new Intl.NumberFormat('en-US',
                { style: 'currency', currency: 'USD' }
            ).format(Number(props.state.vehiclePrice))// '$100.00'
                : new Intl.NumberFormat('en-US',
                    { style: 'currency', currency: 'USD' }
                ).format(0)}</h2></div>
        </div>

        <div className="DealerID-List">
            <div className="LeftCon"><h1>Body type</h1></div>
            <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<input type='text' name='vehicleBodyType' value={props.state.vehicleBodyType} onChange={props.handleOnChange} />) : props.state.vehicleBodyType}</h2></div>
        </div>

        <div className="DealerID-List">
            <div className="LeftCon"><h1>Seating</h1></div>
            <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<select name="vehicleSeating" onChange={props.handleOnChange} value={props.state.vehicleSeating} >
                {seatings.map((seat, seatIndex) => (
                    <option value={seat.value} key={seatIndex}>{seat.label}</option>
                ))})</select>) : props.state.vehicleSeating}</h2></div>
        </div>

        <div className="DealerID-List">
            <div className="LeftCon"><h1>Transmission</h1></div>
            <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<select name="vehicleTransmission" onChange={props.handleOnChange} value={props.state.vehicleTransmission} >
                {transmissions.map((trans, transIndex) => (
                    <option value={trans.name} key={transIndex}>{trans.name}</option>
                ))})</select>) : props.state.vehicleTransmission}</h2></div>
        </div>

        <div className="DealerID-List">
            <div className="LeftCon"><h1>Exterior Color</h1></div>
            <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<select name="vehicleColor" onChange={props.handleOnChange} value={props.state.vehicleColor} >
                {colors.map((col, colIndex) => (
                    <option value={col.name} key={colIndex}>{col.name}</option>
                ))})</select>) : props.state.vehicleColor}</h2></div>
        </div>

        <div className="DealerID-List">
            <div className="LeftCon"><h1>Fuel type</h1></div>
            <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<input type='text' name='vehicleFuelType' value={props.state.vehicleFuelType} onChange={props.handleOnChange} />) : props.state.vehicleFuelType}</h2></div>
        </div>

        <div className="DealerID-List">
            <div className="LeftCon"><h1>Drive Train</h1></div>
            <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<input type='text' name='vehicleDriveTrain' value={props.state.vehicleDriveTrain} onChange={props.handleOnChange} />) : props.state.vehicleDriveTrain}</h2></div>
        </div>

        <div className="DealerID-List">
            <div className="LeftCon"><h1>Cylinder</h1></div>
            <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<input type='text' name='vehicleCylinder' value={props.state.vehicleCylinder} onChange={props.handleOnChange} />) : props.state.vehicleCylinder}</h2></div>
        </div>

        <div className="DealerID-List">
            <div className="LeftCon"><h1>Owners</h1></div>
            <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<select name="vehiclePreviousOwners" onChange={props.handleOnChange} value={props.state.vehiclePreviousOwners} >
                <option value={''} >Select Owner</option>
                {owners.map((own, ownIndex) => (
                    <option value={own.value} key={ownIndex}>{own.name}</option>
                ))})</select>) : owners.filter(item => Number(item.value) === Number(props.state.vehiclePreviousOwners)) !== undefined && owners.filter(item => Number(item.value) === Number(props.state.vehiclePreviousOwners)) !== null && owners.filter(item => Number(item.value) === Number(props.state.vehiclePreviousOwners)).length > 0 ? owners.filter(item => Number(item.value) === Number(props.state.vehiclePreviousOwners))[0].name || '' : ''}</h2></div>
            {/* owners.filter(item => Number(item.value) === Number(props.state.vehiclePreviousOwners))[0].name || */}
        </div>

        <div className="DealerID-List">
            <div className="LeftCon"><h1>Accidents:</h1></div>
            <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<select name="vehiclePreviousAccidents" onChange={props.handleOnChange} value={props.state.vehiclePreviousAccidents} >
                <option value={''} >Select Owner</option>
                {accidents.map((acd, acdIndex) => (
                    <option value={acd.value} key={acdIndex}>{acd.name}</option>
                ))})</select>) : accidents.filter(item => Number(item.value) === Number(props.state.vehiclePreviousAccidents)) !== undefined && accidents.filter(item => Number(item.value) === Number(props.state.vehiclePreviousAccidents)) !== null && accidents.filter(item => Number(item.value) === Number(props.state.vehiclePreviousAccidents)).length > 0 ? accidents.filter(item => Number(item.value) === Number(props.state.vehiclePreviousAccidents))[0].name || '' : ''}</h2></div>
        </div>

    </React.Fragment>)
}
export default DeleteListingReviewVehicleDetail