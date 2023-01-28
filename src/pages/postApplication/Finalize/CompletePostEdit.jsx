import React from 'react'
import { Animated } from "react-animated-css";

const CompletePostEdit = (props) => {
    const vehicleStep = props.sellerInfo === 'yes' && props.listingSource === 'Vehicle listed on Finance That' ? props.vehicleFinanceStep : props.vehicleDetailStep
    return (
        <React.Fragment>
            <Animated animationIn={props.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                <div className="AdPost-SecOne">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="AddFinalize-Container">
                                <div className="AddFinalize-Head">
                                    <h1>Finalize Application</h1>
                                </div>
                                <div className="Finalize-CardDetail">
                                    <div className="CardDetail-Left">
                                        <h1>Applicant Information</h1>
                                        <p>
                                            Edit Information
                                              </p>
                                    </div>

                                    <div className="CardDetail-Right" >
                                        <button type="button" onClick={() => props.editPost(1, 6, props.vehicleDetailStep, props.applicantInfor)} >
                                            <img
                                                src="/assets/image/post-edit-icon.svg"
                                                alt="Edit"

                                            />
                                                Edit
                                              </button>
                                    </div>
                                </div>

                                <div className="Finalize-CardDetail">
                                    <div className="CardDetail-Left">
                                        <h1>Address</h1>
                                        <p>
                                            Edit your Address
                                              </p>
                                    </div>

                                    <div className="CardDetail-Right">
                                        <button type="button" onClick={() => props.editPost(2, 6, vehicleStep, props.applicantAddress)}>
                                            <img
                                                src="/assets/image/post-edit-icon.svg"
                                                alt="Edit"
                                            />{" "}
                                                Edit
                                              </button>
                                    </div>
                                </div>

                                <div className="Finalize-CardDetail">
                                    <div className="CardDetail-Left">
                                        <h1>Employment</h1>
                                        <p>Edit Employment Status Occupation, Name, Since, Gross</p>
                                    </div>

                                    <div className="CardDetail-Right">
                                        <button type="button" onClick={() => props.editPost(3, 6, vehicleStep, props.employmentInfo)} >
                                            <img
                                                src="/assets/image/post-edit-icon.svg"
                                                alt="Edit"
                                            />{" "}
                                                Edit
                                              </button>
                                    </div>
                                </div>
                                {props.cpApplicant === 'yes' ? (
                                    <div className="Finalize-CardDetail">
                                        <div className="CardDetail-Left" >
                                            <h1>Co Applicant</h1>
                                            <p>Edit Co Applicant Information</p>
                                        </div>

                                        <div className="CardDetail-Right">
                                            <button type="button" onClick={() => props.editPost(4, 6, '', props.coApplicationBar)} >
                                                <img
                                                    src="/assets/image/post-edit-icon.svg"
                                                    alt="Edit"
                                                />{" "}
                                                Edit
                                              </button>
                                        </div>
                                    </div>) : null}

                                <div className="Finalize-CardDetail">
                                    <div className="CardDetail-Left" >
                                        <h1>Vehicle Information</h1>
                                        <p>Edit Vehicle Information, Type Including Tax</p>
                                    </div>

                                    <div className="CardDetail-Right">
                                        <button type="button" onClick={() => props.editPost(5, 6, '', props.vehicleInformation)} >
                                            <img
                                                src="/assets/image/post-edit-icon.svg"
                                                alt="Edit"
                                            />{" "}
                                                Edit
                                              </button>
                                    </div>
                                </div>
                                {props.vehicleDetailStep !== '' ? (<>
                                    <div className="Finalize-CardDetail">
                                        <div className="CardDetail-Left">
                                            <h1>Seller Inforamtion</h1>
                                            <p>Name, Address, Postal, Provincy, EMail, Telephone</p>
                                        </div>
                                        <div className="CardDetail-Right">
                                            <button type="button" onClick={() => props.editPost(5, 6, vehicleStep, props.sellerBar)} >
                                                <img
                                                    src="/assets/image/post-edit-icon.svg"
                                                    alt="Edit"
                                                />{" "}
                                                Edit
                                              </button>
                                        </div>
                                    </div></>) : null}


                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="FinalizePre-Btn discard-btn">
                                            <button
                                             className="active"
                                             type="button"
                                             data-toggle="modal" data-target="#discardModel"
                                             onClick={props.discardState}
                                             disabled={props.isLoading}
                                            >
                                                Discard
                                                </button>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="FinalizePre-Btn float-right">
                                            <button type="button" onClick={props.submitPost} disabled={props.isLoading}>
                                                {props.isLoading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : 'Apply'}
                                            </button>
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
export default CompletePostEdit