import React, { useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import HomeNewlyListingPlaceHolder from '../../../components/placeHolder/HomeNewlyListingPlaceHolder'
import OwlCarousel from "react-owl-carousel2";
import { API_URL } from '../../../constant'
import EmptyComponent from './EmptyComponent'
import { get_under_listing } from '../../../actions/homeActions'
import { useDispatch, useSelector } from 'react-redux'
import { capitalize, capsProvince } from "./../../../_helpers/capitalize";

const options = {
    loop: true,
    margin: 14,
    rewind: true,
    items: 2,
    dots: false,
    nav: true,
    thumbs: true,
    thumbImage: true,
    navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
    ],
    responsive: {
        0: {
            items: 1,
            nav: false,
        },
        600: {
            items: 1,
            nav: false,
        },
        1000: {
            items: 1,
            nav: true,
            loop: false,
        },
        1200: {
            items: 4,
            nav: true,
            loop: false,
        },
    },
};
const owlOptions = {
    loop: true,
    margin: 14,
    items: 2,
    dots: false,
    nav: true,
    thumbs: true,
    thumbImage: true,
    navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
    ],
    responsive: {
        0: {
            items: 1,
            nav: false,
        },
        600: {
            items: 1,
            nav: false,
        },
        1000: {
            items: 1,
            nav: true,
            loop: false,
        },
        1200: {
            items: 4,
            nav: true,
            loop: false,
        },
    },
};
const UnderPriceListing = props => {
    const dispatch = useDispatch()
    const state = useSelector((state) => {
        return {
            under_listing: state.homeReducer.under_listing,
            under_listing_loading: state.homeReducer.under_listing_loading,
            loading_saved_ad_home: state.homeReducer.loading_saved_ad_home,
            home_vehicle_area_ad_id: state.homeReducer.home_vehicle_area_ad_id
        }
    })
    useEffect(() => {
        const data = {
            latitude: props.latitude,
            longitude: props.longitude,
            dist_radius: props.distance
        }
        dispatch(get_under_listing(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<>
        {state.under_listing_loading ? (<><OwlCarousel options={owlOptions} className="owl-one owl-carousel owl-theme"><HomeNewlyListingPlaceHolder /><HomeNewlyListingPlaceHolder /><HomeNewlyListingPlaceHolder /><HomeNewlyListingPlaceHolder /> </OwlCarousel></>) : ((state.under_listing || []).length > 0 ? (<OwlCarousel options={options} className="owl-one owl-carousel owl-theme">
            {(state.under_listing || []).map((item, index) => (
                <React.Fragment key={index}>
                    <div className="item">
                        <div className="vehicle-in-area-box">
                            <div className="image-holder">
                                <span className="favourite">
                                    {state.loading_saved_ad_home && (Number(item.id) === Number(state.home_vehicle_area_ad_id)) ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : <i className={!item.saved_ad ? "fa fa-heart-o" : "fa fa-heart-o active"} onClick={() => props.handleSavedAd(item.id, !item.saved_ad ? false : true)} ></i>}
                                </span>
                                <Link to={`/ad-post/detail/${item.stock_id}`}>
                                    <img src={item && item.images && item.images.length > 0 ? item.images[0] ? item.images[0].image_path ? API_URL + '/media/' + item.images[0].image_path : "/assets/image/vehicle-in-area-image2.jpg" : "/assets/image/vehicle-in-area-image2.jpg" : "/assets/image/vehicle-in-area-image2.jpg"} alt="vehicle" />
                                    <div className="image-overlay"></div>
                                    <div className="bottom-info">
                                        <div className="disc-row clearfix">
                                            <span className="title">{item && item.des_2 ? item.des_2 || '' : ''} </span>
                                            <span className="year"> {item && item.year ? item.year || '' : ''} </span>
                                        </div>
                                        <div className="disc-row clearfix">
                                            <span className="location"><i className="icon-subtract-icon"></i>
                                                {item && item.city ? capitalize(item.city) : ''}{item && item.city && item.province ? ',' : ''} {item && item.province ? capsProvince(item.province) : ''}
                                            </span>
                                            <span className="price-tag"> {item && item.price ? new Intl.NumberFormat('en-US',
                                                { style: 'currency', currency: 'USD' }
                                            ).format(Number(item.price))// '$100.00'
                                                : new Intl.NumberFormat('en-US',
                                                    { style: 'currency', currency: 'USD' }
                                                ).format(0)} </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                </React.Fragment>
            ))}
            <div className="item">
                <Link to={{
                    pathname: "/Ad-post/list", query: {
                        // sortBy: 'price_lowest_first'
                        fromRange: '$10,000',

                    }
                }}>

                    <div className="view-all-vihicles-in-area">
                        <div className="view-all-vihicles-in-area-inner">
                            <img src="/assets/image/see-more-icon.svg" alt="see-more-icon" />
                            <span className="title"> View All </span>
                            <p> Under 10,000 listed vehicles in your area </p>
                        </div>
                    </div>
                </Link>
            </div>
        </OwlCarousel>
        ) : <EmptyComponent name='Under 10K' />)}
    </>
    )
}
export default memo(UnderPriceListing)