import React, { useState, memo } from 'react'
import { useEffect } from 'react';
import OwlCarousel from "react-owl-carousel2";
import ListingCarousel from './ListingCarousel'
const options = {
    loop: false,
    margin: 20,
    items: 2,
    dots: true,
    nav: true,
    navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
    ],
    thumbs: true,
    thumbImage: true,
    lazyLoad: true,
    responsive: {
        0: {
            items: 1,
            nav: false,
        },
        600: {
            items: 1,
            nav: false,
        },
        991: {
            items: 1,
            nav: false,
            loop: false,
        },
        1200: {
            items: 2,
            nav: true,
            loop: false,
        },

    },
};
const EmptyComponent = (props) => {
    return (<>
        <div className="empty-content">
            <img src="/assets/image/empty-icon.svg" alt="" />
            <h2> No Result </h2>
            <p> Sorry there is no result for {props.name}. </p>
        </div>
    </>)
}
const FeatureListingDetail = (props) => {
    const [state, setState] = useState({
        dataArray: [],
    })
    useEffect(() => {
        let dataArray = [];
        let cot = 0;
        const dataLength = props.home_motorcycle_detail !== undefined && props.home_motorcycle_detail !== null && (props.home_motorcycle_detail || []).length > 0 ? Math.ceil((props.home_motorcycle_detail || []).length / 2) : 0
        for (let i = 0; i < dataLength; i++) {
            const item = props.home_motorcycle_detail[cot];
            const item2 = props.home_motorcycle_detail[cot + 1];
            const data = []
            if (item !== undefined && item !== null && props.home_motorcycle_detail.length > 0) {
                data.push(item)
                if (item2 !== undefined && item2 !== null) {
                    data.push(item2)
                }
            }
            if (data.length > 0) {
                dataArray.push(data)
            }
            cot = cot + 2;
        }
        setState({
            ...state,
            dataArray: dataArray,
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.home_motorcycle_detail])



    return (<>
        {(state.dataArray && state.dataArray.length > 0) ? (<OwlCarousel options={options}  >
            <ListingCarousel dataArray={state.dataArray} toggleSavedAd={props.toggleSavedAd} />
        </OwlCarousel>) : props.homeMotorcycleLoading === false && (props.home_vehicle_detail && props.home_vehicle_detail.length === 0) ? (<EmptyComponent name={props.name} />) : ''}

    </>)
}
export default memo(FeatureListingDetail)