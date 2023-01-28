import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import TostarMessages from '../../components/alertMessages/TostarMessages'
import {
    admin_login, register, resend_email,
    verify_user
} from '../../actions/authActions';
import FacbookLogin from '../../components/socialLogins/FacbookLogin'
import GoogleLogin from '../../components/socialLogins/GoogleLogin'
import Verification from './Verification'
import { history } from '../../_helpers/history'

class AdminSignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            email_error: false,
            emailMessage: '',
            password: "",
            password_error: false,
            passwordMessage: '',
            changePasswordField: false,
            submitted: false,
            showVerifiedScreen: false
        }
        this.validator = new SimpleReactValidator();

    }


    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // if (!this.validator.allValid()) {
        //   this.validator.showMessages();
        //   this.forceUpdate();
        //   return false;
        // }
        const { email, password } = this.state;

        if (typeof email !== "undefined") {
            if (!email.match('[a-zA-Z0-9\s]+')) {
                this.setState({
                    ...this.state,
                    email_error: true,
                    emailMessage: 'Please enter your email address'
                })
                return false
            } else {
                let lastAtPos = email.lastIndexOf('@');
                let lastDotPos = email.lastIndexOf('.');
                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                    this.setState({
                        ...this.state,
                        email_error: true,
                        emailMessage: 'Please enter a valid email address'
                    })
                    return false
                }
            }
        }
        if (typeof password !== "undefined") {
            if (!password.match('[a-zA-Z0-9\s]+')) {
                this.setState({
                    ...this.state,
                    password_error: true,
                    passwordMessage: 'Please enter your password'
                })
                return false
            }
        }

        if (email && password) {
            const data = {
                email, password
            }
            this.props.admin_login(data);
        }
    }
    changePasswordField = () => {
        this.setState({
            ...this.state,
            changePasswordField: !this.state.changePasswordField
        })
    }
    onBlurRemoveMessage = (name, messageName) => {
        this.setState({
            ...this.state,
            [name]: false,
            [messageName]: ''
        })
    }
    responseFacebook = (response) => {
        console.log(response);
        const data = {
            full_name: response.name,
            email: response.email,
            access_token: response.accessToken,
            login_type: 1,
            user_type: 1
        }
        this.props.register(data);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userVerified !== this.props.userVerified && this.props.userVerified === false) {
            this.setState({
                ...this.state,
                showVerifiedScreen: true
            })
        }
        if (prevProps.isVerify !== this.props.isVerify && this.props.isVerify === true) {
            history.push('/')
        }
    }
    // responseGoogle = (response) => {
    //     console.log(response, 'Google response');
    //     if (response.profileObj) {
    //       this.setState({
    //         ...this.state,
    //         email: response.profileObj.email,
    //         full_name: response.profileObj.givenName + ' ' + response.profileObj.familyName,
    //       })
    //       const data = {
    //         full_name: response.profileObj.givenName + ' ' + response.profileObj.familyName,
    //         email: response.profileObj.email,
    //         access_token: response.profileObj.googleId,
    //         login_type: 1,
    //         user_type: 1
    //       }
    //       this.props.register(data);
    //     }
    //   }
    render() {
        return (
            this.state.showVerifiedScreen === true ? (
                <><Verification email={this.state.email} {...this.props} validator={this.validator} /></>
            ) : (<React.Fragment>
                <section className="Section-ListandGrid pt-0">

                    <div className="Addpost-responsiveimg bannerhide-mobile">
                        <img className="w-100" src="/assets/image/sign-in-responsive-img.png" alt="" />
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
                                            <div className="DealerHead">
                                                <h3>Sign in</h3>
                                                <p>
                                                    Don't have an account?{" "}
                                                    {/* <Link to="/register">Sign Up</Link> */}
                                                </p>
                                            </div>
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="row MobileSignUp-Container">
                                                    <div className="SignIn-Con">
                                                        <div className="Register-Form">
                                                            <label>Email Address</label>
                                                            <input
                                                                type="text" className="form-control"
                                                                name="email"
                                                                placeholder="Email Address"
                                                                onChange={this.handleChange}
                                                                onBlur={() => this.onBlurRemoveMessage('email_error', 'emailMessage')}
                                                            />
                                                            {this.state.email_error === true ? <div className='srv-validation-message' style={{ color: 'red' }}>{this.state.emailMessage}</div> : ''}
                                                            {/* {this.validator.message('email', this.state.email, 'required|email')} */}
                                                        </div>
                                                    </div>

                                                    <div className="SignIn-Con">
                                                        <div className="Register-Form mb-0">
                                                            <label>Password</label>
                                                            <input
                                                                type={this.state.changePasswordField ? "text" : "password"} className="form-control"
                                                                name="password" placeholder='Password'
                                                                onChange={this.handleChange}
                                                                onBlur={() => this.onBlurRemoveMessage('password_error', 'passwordMessage')}
                                                                style={{ fontSize: this.state.password && !this.state.changePasswordField ? '24px' : '16px' }}
                                                            />
                                                            {this.state.password_error === true ? <div className='srv-validation-message' style={{ color: 'red' }}>{this.state.passwordMessage}</div> : ''}
                                                            {/* {this.validator.message('password', this.state.password, 'required')} */}
                                                            <div className="passicon"><i className="icon-pass-icon" onClick={this.changePasswordField}></i></div>
                                                            {/* <PasswordStrengthBar className="pass" password={this.state.password} /> */}

                                                        </div>
                                                        <div className="forgetpass">
                                                            <Link to='/admin/forgot-password'>Forgot password?</Link>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="CreatAccount-Btn">
                                                            <button type="submit" disabled={this.props.isLoading} >{this.props.isLoading === true ? (<i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : 'Sign in'}</button>
                                                            {/* <span>or</span> */}
                                                        </div>
                                                    </div>
                                                    {/* <GoogleLogin />
                                                    <FacbookLogin responseFacebook={this.responseFacebook} /> */}

                                                </div>
                                            </form>
                                        </div>

                                    </div>

                                    <div className="col-lg-5 col-md-5 col-sm-12 col-12 pr-0 Dealer-Mobileimg">

                                        <div className="Sec-SelectAccount">
                                            <div className="SelectText">
                                                <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
                                            </div>
                                            <img src="/assets/image/signup-img.png" alt="" />
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <TostarMessages />
                </section>
            </React.Fragment >
            ))
    }
}

const actionCreators = {
    admin_login,
    register, resend_email,
    verify_user
};
const mapStateToProps = (state) => {
    return {
        isLoading: state.authReducer.authentication.isLoading,
        userVerified: state.authReducer.authentication.userVerified,
        isVerify: state.authReducer.registration.isVerify,
    }
}
export default connect(mapStateToProps, actionCreators)(AdminSignIn);
