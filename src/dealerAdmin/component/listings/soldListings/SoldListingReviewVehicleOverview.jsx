import React, { useEffect } from 'react'
import NumberFormat from 'react-number-format'
import {
    conditions,
    years
} from '../listingConstants'
const SoldListingReviewVehicleOverview = props => {
    return (
        <React.Fragment>
            <div className="DealerID-List">
                <div className="LeftCon"><h1>Condition</h1></div>
                <div className="RightCon"><h2><span>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicleOverivew === true ? (<select name="vehicleCondition" onChange={props.handleOnChange} value={props.state.vehicleCondition} >
                    {conditions.map((cond, condIndex) => (
                        <option value={cond.name} key={condIndex}>{cond.name}</option>
                    ))}
                                )</select>) : props.state.vehicleCondition}</span></h2></div>
            </div>

            <div className="DealerID-List">
                <div className="LeftCon"><h1>Year</h1></div>
                <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicleOverivew === true ? (<select name="vehicleYear" onChange={props.handleOnChange} value={props.state.vehicleYear} >
                    {years.map((year, yearIndex) => (
                        <option value={year.value} key={yearIndex}>{year.label}</option>
                    ))}
                                )</select>) : props.state.vehicleYear}</h2></div>
            </div>

            <div className="DealerID-List">
                <div className="LeftCon"><h1>Make</h1></div>
                <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicleOverivew === true ? (<input type='text' name='vehicleMake' value={props.state.vehicleMake} onChange={props.handleOnChange} />) : props.state.vehicleMake}</h2></div>
            </div>

            <div className="DealerID-List">
                <div className="LeftCon"><h1>Model</h1></div>
                <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicleOverivew === true ? (<input type='text' name='vehicleModel' value={props.state.vehicleModel} onChange={props.handleOnChange} />) : props.state.vehicleModel}</h2></div>
            </div>

            <div className="DealerID-List">
                <div className="LeftCon"><h1>KM</h1></div>
                <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicleOverivew === true ? (<NumberFormat required
                    value={props.state.vehicleKilometer}
                    id="vehicleKilometer"
                    name="vehicleKilometer"
                    onChange={props.handleOnChange}
                    thousandSeparator={true}
                />) : props.state.vehicleKilometer !== undefined && props.state.vehicleKilometer !== null && props.state.vehicleKilometer !== '' ? props.state.vehicleKilometer.toLocaleString('en-US') : (0).toLocaleString('en-US')}</h2></div>
                {/* props.state.vehicleKilometer !== null && props.state.vehicleKilometer !== '' ? props.state.vehicleKilometer.toLocaleString('en-US') : (0).toLocaleString('en-US') */}
            </div>

        </React.Fragment>
    )
}
export default SoldListingReviewVehicleOverview