import React, { memo } from 'react'
import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom"
import { API_URL } from '../../../constant'
const innerSlideroptions = {
    loop: true,
    rewind: true,
    lazyLoad: true,
    margin: 10,
    items: 1,
    dots: false,
    nav: true,
    thumbs: true,
    thumbImage: true,
    navText: [
        "",
        "",
    ],
    responsive: {
        0: {
            items: 1,
            nav: true,
        }
    },
};

const FeatureListingCarsoule = (props) => {

    return (<>
        <OwlCarousel options={innerSlideroptions} className="owl-two owl-carousel owl-theme">
            {(props.images || []).map((img, imgIndex) => (
                <div key={imgIndex} className="item"><Link to={`/ad-post/detail/${props.stock_id}`}><img className="owl-lazy" data-src={img.image_path ? API_URL + '/media/' + img.image_path : "/assets/image/vehicle-in-area-image2.jpg"} data-src-retina={img.image_path ? API_URL + '/media/' + img.image_path : "/assets/image/vehicle-in-area-image2.jpg"} alt="vehicle" /></Link></div>
            ))}
        </OwlCarousel>
    </>
    )
}
export default memo(FeatureListingCarsoule)