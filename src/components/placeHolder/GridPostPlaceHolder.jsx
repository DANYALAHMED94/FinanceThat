import React from "react";
import Skeleton from 'react-loading-skeleton';

const GridPostPlaceHolder = props => {
    return (
        <React.Fragment>
            <div className="search-grid-col" >
                <div className="ProdThum-Service">
                    <h4 className="loading-head"><Skeleton width={100} style={{ lineHeight: '23px',backgroundColor: '#E0E0E0', backgroundImage: 'linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0' }} /></h4>
                    <div className="thumb-image loading"></div>
                    <div className="IconBadge">
                        {<i> <Skeleton width={27} height={27} style={{ lineHeight: '27px',backgroundColor: '#E0E0E0', backgroundImage: 'linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0', borderRadius: '50%' }} /></i>}
                    </div>
                    <div className="ProdHead">
                        <div className="disc-row loading-row">
                            <h2 className="loading-head2"><Skeleton width={'100%'} style={{ lineHeight: '19px',backgroundColor: '#E0E0E0', backgroundImage: 'linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0' }} /></h2>
                            <span className="year"> <Skeleton width={34} style={{ lineHeight: '19px',backgroundColor: '#E0E0E0', backgroundImage: 'linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0' }} /> </span>
                        </div>
                        <div className="disc-row">
                            <span className="location loading">
                                <i className=""><Skeleton width={21} style={{ lineHeight: '21px',backgroundColor: '#E0E0E0', backgroundImage: 'linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0', borderRadius: '50%' }} /></i>  <Skeleton width={'100%'} style={{ lineHeight: '12px',backgroundColor: '#E0E0E0', backgroundImage: 'linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0', borderRadius: '5px', display: 'inline-block' }} />
                            </span>
                            <span className="price-tag">
                                <Skeleton width={77} style={{ lineHeight: '24px',backgroundColor: '#E0E0E0', backgroundImage: 'linear-gradient( 90deg , #E0E0E0, #f5f5f5 , #E0E0E0', borderRadius: '5px', display: 'block' }} />
                            </span>
                        </div>
                    </div>
                </div>
            </div >
        </React.Fragment >
    )
}
export default GridPostPlaceHolder
