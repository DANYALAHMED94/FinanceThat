import React from 'react'
import { Link } from 'react-router-dom'
import { Animated } from "react-animated-css";

const ConfirmPost = props => {
    return (
        <React.Fragment>
            <Animated animationIn="fadeInUp" animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="AdPost-SecOne">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="AddFinalize-Container">
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="AllDone-Head">
                                                {Number(props.appStatus) !== 1 ? (<><h1>All Done!</h1>
                                                    <h2>
                                                        Your ad is updated. Your ad is currently under review.
                                                    </h2>
                                                </>) : (<><h1>All Done!</h1>
                                                    <h2>
                                                        Your ad was successfully updated.
                                                    </h2>
                                                </>)}

                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="FinalizePre-Btn float-left">
                                                <Link to="/buyer/my-ads" >
                                                    <button type="button" >
                                                        My Ads
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Animated>
        </React.Fragment>
    )
}
export default ConfirmPost