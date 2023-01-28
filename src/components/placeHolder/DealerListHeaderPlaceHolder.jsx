import React from "react";
import Skeleton from 'react-loading-skeleton';

const DealerListHeaderPlaceHolder = (props) => {
    return (
        <React.Fragment>
            <div className="inner-pages-banner dealer-listing-banner">
                <img src="/assets/image/dealer-banner-image.jpg" alt="" />
                <div className="banner-detail-sec">
                    <div className="dealer-detail-col">
                        <div className="dealer-logo-holder">
                            <Skeleton style={{
                                lineHeight: '3', borderRadius: '50px',
                                width: '42px',
                                height: '42px'
                            }} />
                        </div>
                    </div>
                    <div className="dealer-detail-col">
                        <div className="dealer-detail">
                            <h1> Acme Powersport Inc. </h1>
                            <ul className="dealer-detail-list clearfix">
                                <li className="dealer-detail-list-item location">
                                    <span className="detail-icon">  </span>
                              Toronto, Ontario
                          </li>
                                <li className="dealer-detail-list-item tel">
                                    <span className="detail-icon">  </span>
                              416-324-4434
                          </li>
                                <li className="dealer-detail-list-item email">
                                    <span className="detail-icon">  </span>
                              finanacethat@gmail.com
                          </li>
                                <li className="dealer-detail-list-item url">
                                    <span className="detail-icon">  </span>
                              acmepowersport.com
                          </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}
export default DealerListHeaderPlaceHolder