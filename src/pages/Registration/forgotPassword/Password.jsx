import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import TostarMessages from '../../../components/alertMessages/TostarMessages'
import {
    update_forgot_password
} from '../../../actions/authActions';
import PasswordStrengthBar from 'react-password-strength-bar';
class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            confirmPassword: "",
            confirmError: '',
            confirmPasswordError: false,
            changePasswordField: false,
            changeConformPasswordField: false,
            showStrong: false,
            showPasswordStrongMessage: ''
        }
        this.validator = new SimpleReactValidator();
    }
    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    changePasswordField = () => {
        this.setState({
            ...this.state,
            changePasswordField: !this.state.changePasswordField
        })
    }
    changeConformPasswordField = () => {
        this.setState({
            ...this.state,
            changeConformPasswordField: !this.state.changeConformPasswordField
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.newPassword !== this.state.newPassword || nextState.confirmPassword !== this.state.confirmPassword || nextProps.forgotPasswordLoading !== this.props.forgotPasswordLoading || nextState.changePasswordField !== this.state.changePasswordField || nextState.changeConformPasswordField !== this.state.changeConformPasswordField || nextState.confirmError !== this.state.confirmError || nextState.showPasswordStrongMessage !== this.state.showPasswordStrongMessage || nextState.showStrong !== this.state.showStrong || nextState.confirmPasswordError !== this.state.confirmPasswordError) {
            return true
        }
        return false
    }
    update_password = (e) => {
        e.preventDefault()
        const { newPassword, confirmPassword } = this.state;
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
        if (strongRegex.test(newPassword) === false) {
            this.setState({
                ...this.state,
                showStrong: true,
                showPasswordStrongMessage: 'Must be 8 characters and include number(s) & uppercase letter(s)',
                confirmPasswordError: false,
                confirmError: '',
            })
            return false
        }

        if (typeof newPassword !== "undefined" && typeof confirmPassword !== "undefined") {
            if (newPassword != confirmPassword) {
                this.setState({
                    ...this.state,
                    confirmPasswordError: true,
                    confirmError: 'Passwords do not match.',
                    showStrong: false,
                    showPasswordStrongMessage: ''
                })
                return false
            } else {
                this.setState({
                    ...this.state,
                    confirmPasswordError: false,
                    confirmError: '',
                    showStrong: false,
                    showPasswordStrongMessage: ''
                })
            }
        }
        const data = {
            password: newPassword
        }
        const token = this.props.match ? this.props.match.params ? this.props.match.params.token ? this.props.match.params.token : '' : '' : '';
        console.log(data)
        this.props.update_forgot_password(data, token)
    }

    render() {
        console.log(this.state)
        return (

            <React.Fragment>
                <section className="Section-ListandGrid pt-0">

                    <div className="Addpost-responsiveimg bannerhide-mobile">
                        <img className="w-100" src="/assets/image/forget-pass-responsive-image.png" alt="" />
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
                                            <form onSubmit={this.update_password}>
                                                <div className="row MobileSignUp-Container VerifyScreen-Password">

                                                    <div className="create-password-head">
                                                        <h1>Create new password</h1>

                                                        <ul>
                                                            <li>Must contain minimum 8 characters</li>
                                                            <li>Must contain alphanumeric characters</li>
                                                            <li>New password should not match <span>previously used password</span></li>
                                                        </ul>

                                                    </div>

                                                    <div className="SignIn-Con">
                                                        <div className="Register-Form">
                                                            <label>New Password</label>
                                                            <input
                                                                type={this.state.changePasswordField ? "text" : "password"}
                                                                id="newPassword"
                                                                className="form-control"
                                                                name="newPassword"
                                                                value={this.state.newPassword}
                                                                onChange={this.handleChange}
                                                                style={{ fontSize: this.state.newPassword && !this.state.changePasswordField ? '24px' : '16px' }}
                                                            />
                                                            {this.state.newPassword.length > 0 ? (<PasswordStrengthBar className="password-strenght" password={this.state.newPassword} />) : null}
                                                            {this.state.confirmPasswordError === true ? <div className='srv-validation-message' style={{ color: 'red' }}>{this.state.confirmError}</div> : ''}
                                                            {this.state.showStrong === true ? <div className='srv-validation-message' style={{ color: 'red' }}>{this.state.showPasswordStrongMessage}</div> : ''}
                                                            <div className="passicon"><i className="icon-pass-icon" onClick={this.changePasswordField}></i></div>
                                                        </div>
                                                    </div>


                                                    <div className="SignIn-Con">
                                                        <div className="Register-Form mb-0">
                                                            <label>Confirm new password</label>
                                                            <input
                                                                type={this.state.changeConformPasswordField ? "text" : "password"}
                                                                id="confirmPassword"
                                                                className="form-control"
                                                                name="confirmPassword"
                                                                value={this.state.confirmPassword}
                                                                onChange={this.handleChange}
                                                                style={{ fontSize: this.state.confirmPassword && !this.state.changeConformPasswordField ? '24px' : '16px' }}
                                                            />
                                                            {this.state.confirmPasswordError === true ? <div className='srv-validation-message' style={{ color: 'red' }}>{this.state.confirmError}</div> : ''}
                                                            <div className="passicon"><i className="icon-pass-icon" onClick={this.changeConformPasswordField}></i></div>
                                                        </div>
                                                    </div>


                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="CreatAccount-Btn">
                                                            <button type="submit" disabled={this.props.forgotPasswordLoading} >{this.props.forgotPasswordLoading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : 'Confirm'}</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </form>
                                        </div>

                                    </div>

                                    <div className="col-lg-5 col-md-5 col-sm-12 col-12 pr-0 Dealer-Mobileimg">

                                        <div className="Sec-SelectAccount">
                                            <div className="SelectText">
                                                <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
                                            </div>
                                            <img src="/assets/image/forget-pass-img.png" alt="" />
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
}

const actionCreators = {
    update_forgot_password
};
const mapStateToProps = (state) => {
    return {
        forgotPasswordLoading: state.authReducer.authentication.forgotPasswordLoading,
        userVerified: state.authReducer.authentication.userVerified,
        isVerify: state.authReducer.registration.isVerify,

    }
}
export default connect(mapStateToProps, actionCreators)(Password);
