import React from "react";
import Skeleton from 'react-loading-skeleton';

const ListPostPlaceHolder = (props) => {
    return (
        <React.Fragment>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="ListView-Container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                            <Skeleton style={{ lineHeight: '10' }} />
                        </div>
                        <div className="col-lg-7 col-md-6 col-sm-12 col-12">
                            <div className="ListView-Head">
                                <h1>
                                    <Skeleton width={100} />
                                </h1>
                                <h2> <Skeleton width={250} /></h2>
                            </div>
                            <div className="ListView-Btm">
                                <ul>
                                    <li>
                                        <h1>
                                            <i className="icon-subtract-icon"></i><Skeleton width={100} />
                                        </h1>
                                    </li>
                                    <li>
                                        <h2>
                                            <Skeleton width={80}>
                                                <img src="/assets/image/speedometer.svg" alt="" />
                                             Km
                                             </Skeleton>
                                        </h2>
                                    </li>
                                    <li>
                                        <h3>
                                            {/* <Skeleton width={80}>
                                                <img src="/assets/image/speedometer.svg" alt="" />
                                                Finance that
                                             </Skeleton> */}
                                            <img src="/assets/image/finance-that-tag.svg" />
                                            <span><Skeleton width={80} /></span>
                                        </h3>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12 col-12">
                            <div className="ListRight-Image" style={{ float: 'right', paddingRight: '20px' }}>
                                <Skeleton width={20} />
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default ListPostPlaceHolder