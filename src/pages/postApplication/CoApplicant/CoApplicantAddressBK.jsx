import React from 'react'
import { Animated } from "react-animated-css";

const CoApplicantAddress = props => {
    return (
        <React.Fragment>
            <Animated animationIn={props.state.animation} animationInDuration={1000} animationOutDuration={1000} animationOut="fadeOutUp" isVisible={true}>
                <div className="PostApp-SecTwo">
                    <div className="clearfix">
                        <form>

                            <div className="ApplicantAddress">
                                <label>Co Applicant Address</label>
                                <input
                                    autofill="off"
                                    autocorrect="off"
                                    autoComplete="off"
                                    name="coApplicantAddress"
                                    type="text"
                                    id='coApplicantAddress'
                                    class="form-control inputplace"
                                    placeholder="Type your complete address"
                                    onChange={(e) => props.handleLocationChange(e, 'coApplicantAddress')} value={props.state.coApplicantAddress} ></input>
                                {/* {props.validator.message('Co Applicant Address', props.state.coCity, 'required')} */}
                            </div>

                            <div className="AddManual-Btn">
                                <button type="button" onClick={() => props.changeMannualAddress(1, 'coApplicantMannualAddress')}>Add Manual Address</button>
                            </div>
                            <div className='row align-items-center'>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                    <div className="PostApp-NextBtn previous-btn float-left">
                                        <button type="button" onClick={() => props.changeStepCoApplicant(1, -props.state.startPerc)}> <i className="fa fa-angle-left"></i> Previous </button>
                                    </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                    <div className="PostApp-NextBtn float-right">
                                        <button type="button" onClick={() => props.changeMannualAddress(1, 'coApplicantMannualAddress')}>Next <i className="fa fa-angle-right"></i></button>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>

                </div>
            </Animated>
        </React.Fragment >
    )
}
export default CoApplicantAddress