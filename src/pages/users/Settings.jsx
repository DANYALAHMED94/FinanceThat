import React, { Component } from "react";
import { update_user_password } from '../../actions/userProfileActions'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            changeCurrentPasswordField: false,
            changePasswordField: false,
            changeConformPasswordField: false,
            confirmPasswordError: false,
            showStrong: false,
            showPasswordStrongMessage: '',
        };
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    handleOnchange = e => {
        const { name, value } = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }
    changeCurrentPasswordField = () => {
        this.setState({
            ...this.state,
            changeCurrentPasswordField: !this.state.changeCurrentPasswordField
        })
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

    update_password = (e) => {
        e.preventDefault()
        const { newPassword, confirmPassword } = this.state;
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
        if (strongRegex.test(newPassword) === false) {
            this.setState({
                ...this.state,
                showStrong: true,
                showPasswordStrongMessage: 'Password must be alphanumeric with minimum length of 8 characters',
                confirmPasswordError: false,
                confirmError: '',
            })
            return false
        }
        // if (typeof newPassword !== "undefined" && typeof confirmPassword !== "undefined") {
        if (newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
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
            // old_pass: this.state.currentPassword,
            new_pass: newPassword
        }
        this.props.update_user_password(data)
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>My settings</title>
                    <meta name="description" content="" />
                </Helmet>
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                    <div className="UserProfile-Container user-settings-container">
                        <form onSubmit={this.update_password}>
                            <div className="ChangePass-Container mt-0">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h1>Change Your Password</h1>
                                    </div>

                                    <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                        <div className="ChangePass-Form">
                                            <label className="setting-label">Current password</label>
                                            <i className="icon-pass-icon icon-eye" aria-hidden="true" onClick={this.changeCurrentPasswordField}></i>
                                            <input
                                                type={this.state.changeCurrentPasswordField ? "text" : "password"}
                                                id="currentPassword"
                                                className="form-control"
                                                name="currentPassword"
                                                value={this.state.currentPassword}
                                                onChange={this.handleOnchange}
                                                style={{ fontSize: this.state.currentPassword && !this.state.changeCurrentPasswordField ? '24px' : '16px' }}
                                            />
                                            {this.validator.message('Current Pasword', this.state.currentPassword, 'required|min:8')}
                                            <Link className="setting-current-password" to='/forgot-password'>Forget Password?</Link>
                                        </div>
                                    </div>

                                    <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                        <div className="ChangePass-Form setting-your-new-password">
                                            <label className="setting-label">Your new password</label>
                                            <i className="icon-pass-icon icon-eye" aria-hidden="true" onClick={this.changePasswordField}></i>
                                            <input
                                                type={this.state.changePasswordField ? "text" : "password"}
                                                id="newPassword"
                                                className="form-control"
                                                name="newPassword"
                                                value={this.state.newPassword}
                                                onChange={this.handleOnchange}
                                                style={{ fontSize: this.state.newPassword && !this.state.changePasswordField ? '24px' : '16px' }}
                                            />
                                            {this.state.newPassword.length > 0 ? (<PasswordStrengthBar className="password-strenght" password={this.state.newPassword} />) : null}
                                            {this.state.showStrong === true ? <div className='srv-validation-message' style={{ color: 'red' }}>{this.state.showPasswordStrongMessage}</div> : ''}
                                            {this.state.confirmPasswordError === true ? <div className='srv-validation-message' style={{ color: 'red' }}>{this.state.confirmError}</div> : ''}
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                        <div className="ChangePass-Form">
                                            <label className="setting-label">Confirm new password</label>
                                            <i className="icon-pass-icon icon-eye" aria-hidden="true" onClick={this.changeConformPasswordField}></i>
                                            <input
                                                type={this.state.changeConformPasswordField ? "text" : "password"}
                                                id="confirmPassword"
                                                className="form-control"
                                                name="confirmPassword"
                                                value={this.state.confirmPassword}
                                                onChange={this.handleOnchange}
                                                style={{ fontSize: this.state.confirmPassword && !this.state.changeConformPasswordField ? '24px' : '16px' }}
                                            />
                                            {this.state.confirmPasswordError === true ? <div className='srv-validation-message' style={{ color: 'red' }}>{this.state.confirmError}</div> : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="ChangePass-Container mb-0">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>


                                    <div className="col-md-12 col-sm-12 col-12">
                                        <div className="ChangePass-Btn button-update-setting">
                                            <button type="submit" disabled={this.props.profile_password_update_loading}>{this.props.profile_password_update_loading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : 'Update Password'}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="UserProfile-Container update-banner user-settings-container mt-0">
                        <h1> The Area Banner </h1>
                        <div className="form-group">
                            <label for="upload-banner">Upload Banner</label>
                            <input id="upload-banner" type="file" />
                        </div>
                        <div className="preview-banner">
                            <img src="/assets/image/dealer-banner-image.jpg"/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        user_id: state.authReducer.authentication.user.user_id,
        get_user_profile: state.userProfileReducer.get_user_profile,
        preview: state.userProfileReducer.preview,
        profile_update_loading: state.userProfileReducer.profile_update_loading,
        profile_password_update_loading: state.userProfileReducer.profile_password_update_loading,
    }
}
export default connect(mapStateToProps, { update_user_password })(Settings);
