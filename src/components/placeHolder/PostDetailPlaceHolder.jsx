import React from "react";
import Skeleton from 'react-loading-skeleton';

const PostDetailPlaceHolder = (props) => {
    return (
        <React.Fragment>
            <div className="detail-carousal" >
                <div className="LargeImage-Container">
                    <div className="cross-detail">
                        <Skeleton style={{
                            lineHeight: '3', borderRadius: '50px',
                            width: '42px',
                            height: '42px'
                        }} />
                    </div>
                    {/* <div className="ListDetail-Image owl-three owl-carousel owl-theme"> */}
                    <Skeleton style={{ lineHeight: '60' }} />
                    <div className="ListDetail-Badge" >
                        <i className="fa fa-heart-o"></i>
                    </div>
                </div>
            </div>
            <div className="detail-list-detail">
                <div className="ListDetail-Scroll">
                    <div className="LargeRight-Image">
                        <h1><Skeleton width={150} style={{
                            lineHeight: '3'
                        }} /> </h1>
                        <Skeleton width={150} style={{
                            lineHeight: '3'
                        }} />
                        <h2><Skeleton width={400} /></h2>
                        <h3><Skeleton width={380} /></h3>
                        <h4>
                            <Skeleton width={360} />
                        </h4>
                        <h6>
                            <Skeleton width={150} style={{ lineHeight: '3' }} />
                        </h6>
                    </div>

                    <div className="FinanceThat-Container clearfix">
                        <div className="financethat-left-image"> <Skeleton width={105} style={{ lineHeight: '4' }} /> </div>
                        <div className="financethat-right-content">
                            <div className="ServiceOne">
                                <Skeleton width={140} style={{ lineHeight: '3' }} />
                            </div>

                            <div className="ServiceTwo">
                                <Skeleton width={50} style={{ lineHeight: '3' }} />
                            </div>

                            <div className="ServiceTwo">
                                <Skeleton width={50} style={{ lineHeight: '3' }} />
                            </div>
                        </div>
                    </div>
                    <div className="AsideMenu-Container">
                        <div className="OverViewListing">
                            <h1>Overview</h1>
                            <ul>
                                <li>
                                    <div className="OverView-Container">
                                        <div className="OverView-Left">
                                            <h2><Skeleton width={130} style={{ lineHeight: '3' }} /></h2>
                                        </div>

                                        <div className="OverView-Right">
                                            <h2><Skeleton width={130} style={{ lineHeight: '3' }} /></h2>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className="OverView-Container">
                                        <div className="OverView-Left">
                                            <h2><Skeleton width={130} style={{ lineHeight: '3' }} /></h2>
                                        </div>

                                        <div className="OverView-Right">
                                            <h2><Skeleton width={130} style={{ lineHeight: '3' }} /></h2>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className="OverView-Container">
                                        <div className="OverView-Left">
                                            <h2><Skeleton width={130} style={{ lineHeight: '3' }} /></h2>
                                        </div>

                                        <div className="OverView-Right">
                                            <h2><Skeleton width={130} style={{ lineHeight: '3' }} /></h2>
                                        </div>
                                    </div>
                                </li>


                                <li>
                                    <div className="OverViewRate-Container">

                                        <div className="RateImage">
                                            <Skeleton style={{ lineHeight: '7' }} width={150} />
                                        </div>

                                        <div className="OverView-Btm">
                                            <h1><Skeleton style={{ lineHeight: '2' }} width={200} /></h1>
                                            <h5><Skeleton style={{ lineHeight: '2' }} width={200} /></h5>
                                            <div className="RateList"></div>
                                            <Skeleton style={{ lineHeight: '2' }} width={600} />
                                        </div>


                                    </div>
                                </li>



                            </ul>
                        </div>

                        <div className="Description-Head">
                            <h2>Description</h2>
                            <p>
                                <Skeleton width={600} style={{ lineHeight: '8' }} />
                            </p>
                        </div>

                        <div className="OverViewListing">
                            <h1 className="rounded-0">Vehicle Detail</h1>
                            <ul>
                                <li>
                                    <div className="OverView-Container">
                                        <div className="OverView-Left">
                                            <h5><Skeleton width={130} style={{ lineHeight: '3' }} /></h5>
                                        </div>

                                        <div className="OverView-Right">
                                            <h5><Skeleton width={130} style={{ lineHeight: '3' }} /></h5>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className="OverView-Container">
                                        <div className="OverView-Left">
                                            <h5><Skeleton width={130} style={{ lineHeight: '3' }} /></h5>
                                        </div>

                                        <div className="OverView-Right">
                                            <h5><Skeleton width={130} style={{ lineHeight: '3' }} /></h5>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className="OverView-Container">
                                        <div className="OverView-Left">
                                            <h5><Skeleton width={130} style={{ lineHeight: '3' }} /></h5>
                                        </div>

                                        <div className="OverView-Right">
                                            <h5><Skeleton width={130} style={{ lineHeight: '3' }} /></h5>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="FeatureList-Large">
                            <h4>Features</h4>
                            <ul>
                                <li>
                                    <a ><Skeleton width={100} /></a>
                                </li>
                                <li>
                                    <a ><Skeleton width={100} /></a>
                                </li>
                                <li>
                                    <a ><Skeleton width={100} /></a>
                                </li>

                            </ul>
                        </div>

                        <div className="LargePayment-Container">
                            <div className="accordion" id="accordionExample">
                                <div className="card">
                                    <div className="card-header" id="headingOne">
                                        <div className="card-header" id="headingOne">
                                            <strong className="title">
                                                Payment Calculator
                              </strong>
                                        </div>
                                    </div>

                                    <div
                                        id="collapseOne"
                                        className="collapse show"
                                        aria-labelledby="headingOne"
                                        data-parent="#accordionExample"
                                    >
                                        <div className="card-body pl-0 pr-0">
                                            <div className="row">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="CreditSelect-Container" style={{ backgroundColor: 'white' }} >
                                                        <Skeleton width={600} style={{ lineHeight: '3' }} />
                                                    </div>
                                                </div>

                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="DownPayment-Container MonthlyPay-Form" style={{ backgroundColor: 'white' }}>
                                                        <Skeleton width={250} style={{ lineHeight: '3' }} />
                                                    </div>
                                                </div>

                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="CreditSelect-Container" style={{ backgroundColor: 'white' }}>
                                                        <Skeleton width={250} style={{ lineHeight: '3' }} />
                                                    </div>
                                                </div>

                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="Payment-SummaryList">
                                                        <h1>Summary**</h1>
                                                        <ul>
                                                            <li>
                                                                <Skeleton width={600} style={{ lineHeight: '2' }} />
                                                            </li>
                                                            <li>
                                                                <Skeleton width={600} style={{ lineHeight: '2' }} />
                                                            </li>
                                                            <li>
                                                                <Skeleton width={600} style={{ lineHeight: '2' }} />
                                                            </li>
                                                            <li>
                                                                <Skeleton width={600} style={{ lineHeight: '2' }} />

                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="EstimatedPayment-Head">
                                                        <Skeleton width={200} />
                                                        {/* <h1>Estimated Payment</h1>
                                                        <h2><Skeleton width={50} /></h2>
                                                        <span>or</span>
                                                        <h3><Skeleton width={50} /></h3>
                                                        <h4>Estimated APR</h4> */}
                                                        <Skeleton width={590} style={{ lineHeight: '2' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}
export default PostDetailPlaceHolder