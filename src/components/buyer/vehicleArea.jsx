import React, { useState, memo } from "react";
import $ from "jquery";
import { toastr } from 'react-redux-toastr'
import NewlyListed from "./vehicleAreaComponents/NewlyListed";
import TrendingListing from './vehicleAreaComponents/TrendingListing'
import ReducePrice from './vehicleAreaComponents/ReducePrice'
import UnderPriceListing from "./vehicleAreaComponents/UnderPriceListing";
import { useDispatch, useSelector } from 'react-redux'
import { saved_ad_post_vehicle_area, un_saved_ad_post_vehicle_area } from '../../actions/homeActions'
const VehicleArea = (props) => {
    const dispatch = useDispatch()
    const user_id = useSelector((state) => state.authReducer.authentication.user.user_id)
    const [filterSelected, setFilterSelected] = useState('nav-newly')

    const changeTab = (para) => {
        if (para === "nav-newly") {
            $("#nav-newly").removeClass('tabDeactive')
            $("#nav-most-viewed").addClass('tabDeactive')
            $("#nav-reduced-price").addClass('tabDeactive')
            $("#nav-under-price").addClass('tabDeactive')
            if (props.new_listing_loading === true) {
                return false
            }
        } else if (para === "nav-most-viewed") {
            $("#nav-most-viewed").removeClass('tabDeactive')
            $("#nav-newly").addClass('tabDeactive')
            $("#nav-reduced-price").addClass('tabDeactive')
            $("#nav-under-price").addClass('tabDeactive')
            if (props.featured_listing_loading === true) {
                return false
            }
        } else if (para === "nav-reduced-price") {
            $("#nav-reduced-price").removeClass('tabDeactive')
            $("#nav-newly").addClass('tabDeactive')
            $("#nav-most-viewed").addClass('tabDeactive')
            $("#nav-under-price").addClass('tabDeactive')
            if (props.reduce_price_listing_loading === true) {
                return false
            }
        } else if (para === "nav-under-price") {
            $("#nav-under-price").removeClass('tabDeactive')
            $("#nav-newly").addClass('tabDeactive')
            $("#nav-most-viewed").addClass('tabDeactive')
            $("#nav-reduced-price").addClass('tabDeactive')
            if (props.under_listing_loading === true) {
                return false
            }
        } else {
            $("#nav-newly").removeClass('tabDeactive')
            $("#nav-most-viewed").addClass('tabDeactive')
            $("#nav-reduced-price").addClass('tabDeactive')
            $("#nav-under-price").addClass('tabDeactive')
            if (props.new_listing_loading === true) {
                return false
            }
            // this.props.get_new_listing()
        }
        setFilterSelected(para)
    }
    const handleSavedAd = (ad_id, status) => {
        const data = {
            user_id: user_id,
            ad_id: ad_id
        }
        if (!user_id) {
            toastr.error('Error', 'User Have To Login First')
            return false
        }
        if (!status) {
            dispatch(saved_ad_post_vehicle_area(data, filterSelected))

        } else {
            dispatch(un_saved_ad_post_vehicle_area(data, filterSelected))
        }
    }
    return (<>
        <section className="hp-vehicle-in-area">
            <h2> Vehicles in your area </h2>
            <div className="feature-list-tabs">
                <ul className="nav nav-tabs" id="nav-tab" role="tablist">
                    <li className="nav-item"><a
                        className="nav-link active"
                        id="nav-newly-tab"
                        data-toggle="tab"
                        href="#nav-newly"
                        role="tab"
                        aria-controls="nav-newly"
                        aria-selected="true"
                        onClick={() => changeTab('nav-newly')}
                    >
                        <span className="tab-text">Newly listed </span>
                    </a>
                    </li>

                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="nav-most-viewed-tab"
                            data-toggle="tab"
                            href="#nav-most-viewed"
                            role="tab"
                            aria-controls="nav-most-viewed"
                            aria-selected="false"
                            onClick={() => changeTab('nav-most-viewed')}
                        >
                            <span className="tab-text"> Trending Listings </span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="nav-reduced-price-tab"
                            data-toggle="tab"
                            href="#nav-reduced-price"
                            role="tab"
                            aria-controls="nav-reduced-price"
                            aria-selected="false"
                            onClick={() => changeTab('nav-reduced-price')}
                        >
                            <span className="tab-text"> Reduced price </span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id="nav-under-price-tab"
                            data-toggle="tab"
                            href="#nav-under-price"
                            role="tab"
                            aria-controls="nav-under-price"
                            aria-selected="false"
                            onClick={() => changeTab('nav-under-price')}
                        >
                            <span className="tab-text"> Under $10,000 </span>
                        </a>
                    </li>
                </ul>
                <div
                    className="tab-content py-3 px-3 px-sm-0"
                    id="nav-tabContent"
                >
                    <div
                        className="tab-pane fade show active"
                        id="nav-newly"
                        role="tabpanel"
                        aria-labelledby="nav-newly-tab"
                    >
                        {filterSelected === 'nav-newly' ? <NewlyListed handleSavedAd={handleSavedAd} latitude={props.lat}
                            longitude={props.lng} distance={props.distance} /> : null}
                    </div>
                    <div
                        className="tab-pane tabDeactive fade tab-2"
                        id="nav-most-viewed"
                        role="tabpanel"
                        aria-labelledby="nav-most-viewed-tab"
                    >
                        {filterSelected === 'nav-most-viewed' ? <TrendingListing handleSavedAd={handleSavedAd} latitude={props.lat}
                            longitude={props.lng} distance={props.distance} /> : null}
                    </div>
                    <div className="tab-pane tabDeactive fade" id="nav-reduced-price" role="tabpanel" aria-labelledby="nav-reduced-price-tab">
                        {filterSelected === 'nav-reduced-price' ? <ReducePrice handleSavedAd={handleSavedAd} latitude={props.lat}
                            longitude={props.lng} distance={props.distance} /> : null}

                    </div>
                    <div
                        className="tab-pane tabDeactive fade"
                        id="nav-under-price"
                        role="tabpanel"
                        aria-labelledby="nav-under-price-tab"
                    >
                        {filterSelected === 'nav-under-price' ? <UnderPriceListing handleSavedAd={handleSavedAd} latitude={props.lat}
                            longitude={props.lng} distance={props.distance} /> : null}
                    </div>
                </div>
            </div>
        </section>

    </>)
}


export default memo(VehicleArea);