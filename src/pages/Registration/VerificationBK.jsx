import React, { useState } from 'react'
import TostarMessages from '../../components/alertMessages/TostarMessages'
const Verification = (props) => {
    const emailSplit = props.email !== undefined || props.email !== null || props.email !== '' ? props.email.split("@")[0] : '';
    const firstEmail = emailSplit.substring(0, 1);
    const lastEmail = emailSplit.substring(emailSplit.length - 1);
    const endEmail = props.email !== undefined || props.email !== null || props.email !== '' ? props.email.split("@")[1] : '';

    const resendCode = () => {
        const data = {
            email: props.email,
            "code_type": "email_verification"
        }
        props.resend_email(data)
    }

    const [verificationCode, setVerificationCode] = useState('')

    const handleOnChange = (e) => {
        setVerificationCode(e.target.value)
    }

    const submitVerification = (e) => {
        e.preventDefault();
        if (!props.validator.fieldValid('Verification')) {
            props.validator.showMessageFor('Verification')
            return false
        }
        const data = {
            vc: verificationCode,
            email: props.email,
        }
        props.verify_user(data)
    }

    return (
        <React.Fragment>
            <section className="Section-ListandGrid p-0">

                <div className="Addpost-responsiveimg bannerhide-mobile">
                    <img className="w-100" src="/assets/image/signup-responsive-img.png" alt="" />
                    <div className="UserRegister-SignUp-r">
                        <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
                    </div>
                </div>


                <div className="container-fluid">
                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="row">

                                {/* <div className="col-lg-1 col-md-1 col-sm-12 col-12"></div> */}

                                <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                                    <div className="RegisterAccount-Container">

                                        <div className="Verification-Head">
                                            {/* <h1>Verification Code</h1> */}
                                            <h1>Please take a moment to verify your email</h1>
                                            {/* <p>There may be a delay before receiving your code</p> */}
                                            <p>We have sent a verification code to your email <b>{props.email ? props.email : ''}</b></p>
                                            <p>Please enter the code in the box below to confirm your identity.</p>
                                        </div>

                                        <div className="CodeSent-Con">

                                            <div className="CodeSent-Left">
                                                <img src="/assets/image/security-icon.svg" alt="" />
                                            </div>

                                            <div className="CodeSent-Right">
                                                <h1>Code Sent to</h1>
                                                <h2>{firstEmail}....{lastEmail}@{endEmail}</h2>
                                            </div>

                                        </div>

                                        <div className="VerifyCode-Form">
                                            <label>Verification Code</label>
                                            <input type="text" id="verificationCode" name="verificationCode" placeholder="Enter the Verification Code" value={verificationCode} onChange={handleOnChange} onBlur={() => props.validator.showMessageFor('Verification')} />
                                            {props.validator.message('Verification', verificationCode, 'required')}
                                        </div>

                                        <div className="CodeAgain-Head">
                                            <h4>Code Again? <button onClick={resendCode}>Resend</button></h4>
                                        </div>

                                        <div className="VerifyBtn">
                                            <button type="button" onClick={submitVerification} >Confirm</button>
                                        </div>



                                    </div>
                                </div>

                                <div className="col-lg-5 col-md-5 col-sm-12 col-12 pr-0 Dealer-Mobileimg">
                                    <div className="Sec-SelectAccount">
                                        <div className="SelectText">
                                            <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
                                        </div>
                                        <img src="/assets/image/select-img-1.png" alt="" />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <TostarMessages />
            </section>
        </React.Fragment >
    )
}
export default Verification