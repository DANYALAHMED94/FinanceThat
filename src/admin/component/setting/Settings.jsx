import React, { useEffect, useState, useRef } from 'react'
import { toastr } from 'react-redux-toastr'
import SimpleReactValidator from 'simple-react-validator';
import { ReactComponent as EmailSvg } from '../../../assets/image/email.svg';

const Settings = props => {
    const simpleValidator = useRef(new SimpleReactValidator())
    const [, forceUpdate] = useState();

    const [state, setState] = useState({
        password: '',
        confirmPassword: '',
        confirmPasswordError: false,
        confirmError: ''
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
    }
    useEffect(() => {
        if (state.password !== undefined && state.password !== null) {
            setState({
                ...state,
                confirmPasswordError: false,
                confirmError: ''
            })
        }
    }, [state.password])
    useEffect(() => {
        if (state.confirmPassword !== undefined && state.confirmPassword !== null) {
            setState({
                ...state,
                confirmPasswordError: false,
                confirmError: ''
            })
        }
    }, [state.confirmPassword])

    useEffect(() => {
        if (props.update_passowrd !== undefined && props.update_passowrd !== null) {
            setState({
                password: '',
                confirmPassword: '',
                confirmPasswordError: false,
                confirmError: ''
            })
            simpleValidator.current.hideMessageFor('password');
            simpleValidator.current.hideMessageFor('confirmPassword');
        }

    }, [props.update_passowrd])

    const updatePassword = (e) => {
        e.preventDefault()
        if (!simpleValidator.current.fieldValid('password')) {
            simpleValidator.current.showMessageFor('password')
            forceUpdate(1)
            return false
        }
        if (!simpleValidator.current.fieldValid('confirmPassword')) {
            simpleValidator.current.showMessageFor('confirmPassword')
            forceUpdate(1)
            return false
        }
        if (typeof state.password !== "undefined" && typeof state.confirmPassword !== "undefined") {
            if (state.password != state.confirmPassword) {
                setState({
                    ...state,
                    confirmPasswordError: true,
                    confirmError: 'Passwords do not match.'
                })
                return false
            } else {
                setState({
                    ...state,
                    confirmPasswordError: false,
                    confirmError: ''
                })
            }

        }
        if (props.admin_id !== undefined && props.admin_id !== null && props.admin_id !== '') {
            const data = {
                update: 'password',
                id: props.admin_id,
                password: state.password
            }
            console.log(data)
            props.update_admin_password(data)
        } else {
            toastr.error('Error', 'Please Login First')

        }

    }
    return (
        <React.Fragment>
            <div className="Admin-MainHead">

                <div className="Admin-HeadLeft">
                    <h3>Settings</h3>
                    <p className='settingMenagetext'>Manage your email and password from here.</p>
                </div>
                <div className="Admin-HeadRight"></div>
            </div>

            <div className="clearfix"></div>
            <div className="Admin-DealerSetting">
                <div className="InnerDealer-Container">
                    <div className="Inner-Dealer-Head">
                        <h5>Email</h5>
                        <div className="InnerRight"></div>
                    </div>
                    <div className="borderonly"></div>

                    <form onSubmit={updatePassword}>
                        <div class="form-group row">
                            <label for="staticEmail" class="col-sm-4 col-form-label">Email address</label>
                            <div class="col-sm-6">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text-biling" id="inputGroup-sizing-default">
                                            <EmailSvg />
                                        </span>
                                    </div>
                                    <input type="text" class="form-control form-control-border-left" placeholder='email@example.com' aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                                </div>
                            </div>
                        </div>
                        <div className="borderonly"></div>

                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-4 col-form-label">Current password</label>
                            <div class="col-sm-6">
                                <input type="password" class="form-control" id="inputPassword" placeholder="Password" />
                                {/* {/* <p className='validation-message'>Please enter your current password to change your password</p> *} */}
                            </div>
                        </div>
                        <div className="borderonly"></div>

                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-4 col-form-label">New password</label>
                            <div class="col-sm-6">
                                <input type="password" class="form-control" name="password" id="inputPassword" placeholder="New Password" value={state.password} onChange={handleOnChange} onBlur={() => simpleValidator.current.showMessageFor('password')} />
                                {state.confirmPasswordError === true ? <div className='srv-validation-message'>{state.confirmError}</div> : ""}
                                {simpleValidator.current.message('password', state.password, 'required|min:8')}
                            </div>
                        </div>
                        <div className="borderonly"></div>

                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-4 col-form-label">Confirm new password</label>
                            <div class="col-sm-6">
                                <input type="password" class="form-control" name="confirmPassword" id="inputPassword" placeholder="Confirm Password" value={state.confirmPassword} onChange={handleOnChange} onBlur={() => simpleValidator.current.showMessageFor('confirmPassword')} />
                                {state.confirmPasswordError === true ? <div className='srv-validation-message'>{state.confirmError}</div> : ''}
                                {simpleValidator.current.message('confirmPassword', state.confirmPassword, 'required|min:8')}
                            </div>
                        </div>
                        <div className="borderonly"></div>
                        <div class="form-group row">
                            <div class="col-sm-12 textAlienEnd">
                                <button type="submit" class="btn btn-light btnDesignSave">{props.loading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : 'Save'}</button>
                            </div>
                        </div>
                    </form>
                    {/* <form onSubmit={updatePassword}>
                        <div className="DealerID-Container">
                            <div className="CustomMake-Form pt-0">
                                <div className="MakeLeft-Form">
                                    <label>New password</label>
                                    <input type="password" id="password" name="password" placeholder="Enter" value={state.password} onChange={handleOnChange} onBlur={() => simpleValidator.current.showMessageFor('password')} />
                                    {state.confirmPasswordError === true ? <div className='srv-validation-message'>{state.confirmError}</div> : ''}
                                    {simpleValidator.current.message('password', state.password, 'required|min:8')}
                                </div>

                                <div className="MakeRight-Form">
                                    <label>Confirm new password</label>
                                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter" value={state.confirmPassword} onChange={handleOnChange} onBlur={() => simpleValidator.current.showMessageFor('confirmPassword')} />
                                    {state.confirmPasswordError === true ? <div className='srv-validation-message'>{state.confirmError}</div> : ''}
                                    {simpleValidator.current.message('confirmPassword', state.confirmPassword, 'required|min:8')}
                                </div>

                            </div>

                            <button type="submit" >{props.loading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : 'Save'}</button>

                        </div>

                    </form> */}
                </div>
            </div>

        </React.Fragment>
    )
}
export default Settings