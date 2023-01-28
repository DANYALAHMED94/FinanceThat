import React,{memo} from 'react'
import Skeleton from 'react-loading-skeleton';

const HomeNewlyListingPlaceHolder = () => {
    return (
        <React.Fragment>
            <div className="item">
                <div className="vehicle-in-area-box">
                    <div className="image-holder" style={{
                        background: 'linearGradient(270.35deg,rgba(255, 255, 255, 0.176471) 0.26%,47.89%, rgba(255, 255, 255, 0) 99.65%)',
                        minHeight: '350px',
                        border: '0.5px solid #E6E6E6',
                        borderRadius: '14.0659px'
                    }}>
                        <span className="favourite">
                            {<i> <Skeleton width={27} height={27} style={{ lineHeight: '27px', backgroundColor: '#E0E0E0', backgroundImage: 'linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0', borderRadius: '50%' }} /></i>}
                        </span>

                        <div className="bottom-info">
                            <div className="disc-row clearfix">
                                <span className="title"><Skeleton width={'100%'} style={{ lineHeight: '19px', backgroundColor: '#E0E0E0', backgroundImage: 'linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0' }} /></span>
                                <span className="year"> <Skeleton width={34} style={{ lineHeight: '19px', backgroundColor: '#E0E0E0', backgroundImage: 'linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0' }} /> </span>
                            </div>
                            <div className="disc-row clearfix">
                                <span className="location"><Skeleton width={'100%'} style={{ lineHeight: '19px', backgroundColor: '#E0E0E0', backgroundImage: 'linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0' }} /></span>
                                <span className="price-tag"><Skeleton width={77} style={{ lineHeight: '24px', backgroundColor: '#E0E0E0', backgroundImage: 'linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0', borderRadius: '5px', display: 'block' }} /> </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default memo(HomeNewlyListingPlaceHolder)