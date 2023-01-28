import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { forgot_password } from '../../../actions/authActions'
import { connect } from 'react-redux'
import ForgotConfirmation from './ForgotConfirmation'
class AdminForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            showConfirm: false,
            forgotError: '',
            email_error: false
        }
    }
    handleOnChange = (e) => {
        const { name, value } = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }
    handleOnClick = (e) => {
        const data = {
            email: this.state.email
        }
        if (typeof this.state.email !== "undefined") {
            if (!this.state.email.match('[a-zA-Z0-9\s]+')) {
                this.setState({
                    ...this.state,
                    forgotError: '',
                    email_error: true,
                    emailMessage: 'Please enter your email address'
                })
                return false
            } else {
                let lastAtPos = this.state.email.lastIndexOf('@');
                let lastDotPos = this.state.email.lastIndexOf('.');
                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                    this.setState({
                        ...this.state,
                        forgotError: '',
                        email_error: true,
                        emailMessage: 'Please enter a valid email address'
                    })
                    return false
                }
            }
        }
        this.props.forgot_password(data)
        console.log(data)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.forgotPasswordConfirm !== this.props.forgotPasswordConfirm && this.props.forgotPasswordConfirm !== undefined) {
            this.setState({
                ...this.state,
                showConfirm: true
            })
        }
        if (prevProps.forgotMessage !== this.props.forgotMessage && this.props.forgotMessage !== undefined) {
            this.setState({
                ...this.state,
                forgotError: this.props.forgotMessage
            })
        }
    }
    onBlurRemoveMessage = (name, messageName) => {
        this.setState({
            ...this.state,
            [name]: false,
            [messageName]: '',
            forgotError: ''
        })
    }
    render() {
        if (this.state.showConfirm === true) {
            return <ForgotConfirmation />
        } else {
            return (
                <React.Fragment>

                   <div className="Addpost-responsiveimg bannerhide-mobile">
                    <img className="w-100" src="/assets/image/forget-pass-responsive-image.png" alt="" />
                    <div className="UserRegister-SignUp-r">
                     <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
                    </div>
                   </div>

                    <section class="Section-ListandGrid p-0">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="row">
                                        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div class="UserSign-Container GetPass-PadLeft">

                                                <div class="UserSign-Head">
                                                    <h3>Forget Password</h3>
                                                    {/* <p>Already have a Finance That account? <Link to='/login'>Sign In</Link></p> */}
                                                    <p className="pass-head-mt">Enter the email linked with your Finance That account & we<br /> will send an email with instructions to reset your password.</p>
                                                </div>


                                                <div class="row">
                                                    <div className="forget-password-validation">
                                                        <div class="SignUp-Con">
                                                            <div class="Register-Form mb-0">
                                                                <label>Email address</label>
                                                                <input class={this.state.forgotError !== '' || this.state.email_error === true ? "form-control danger" : "form-control"} type="text" id="email" name="email" placeholder="Enter email address" value={this.state.email} onChange={this.handleOnChange} onBlur={() => this.onBlurRemoveMessage('email_error', 'emailMessage')} />
                                                                {this.state.email_error === true ? <div className='srv-validation-message' style={{ color: 'red' }}>{this.state.emailMessage}</div> : ''}

                                                            </div>

                                                        </div>
                                                        {this.state.forgotError !== '' ? <div className='srv-validation-message' style={{ color: 'red' }}>{this.state.forgotError}</div> : ''}
                                                    </div>

                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div class="CreatAccount-Btn">
                                                            <button type="button" onClick={this.handleOnClick} disabled={this.props.forgotPasswordLoading}>{this.props.forgotPasswordLoading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : 'Submit'}</button>
                                                        </div>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-12 col-12 pr-0 Dealer-Mobileimg">
                                            <div class="Sec-SelectAccount">
                                                <div class="SelectText">
                                                    <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
                                                </div>
                                                <img src="/assets/image/forget-pass-img.png" width="739" height="996" alt="" />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>


                </React.Fragment>
            )
        }
    }
}
const actionCreators = {
    forgot_password
};
const mapStateToProps = (state) => {
    return {
        forgotPasswordLoading: state.authReducer.authentication.forgotPasswordLoading,
        forgotPasswordConfirm: state.authReducer.authentication.forgotPasswordConfirm,
        forgotMessage: state.authReducer.authentication.forgotMessage
    }
}
export default connect(mapStateToProps, actionCreators)(AdminForgotPassword);