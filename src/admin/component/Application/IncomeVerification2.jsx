import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
var that
class IncomeVerification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestId: '',
            loginId: ''
        }
        that = this
    }
    componentDidMount() {
        window.addEventListener('message', function (e) {
            console.log(e.data)
            if (e.data.loginId != undefined && e.data.loginId != null && e.data.loginId != '') {
                const data = {
                    loginId: e.data.loginId,
                    MostRecentCached: true
                }
                that.setState({
                    ...that.state,
                    loginId: e.data.requestId,
                    requestId: ''
                })
            }
            if (e.data.requestId != undefined && e.data.requestId != null && e.data.requestId != '') {

                that.setState({
                    ...that.state,
                    requestId: e.data.requestId,
                    loginId: ''
                })
            }
        });

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.requestId !== this.state.requestId && this.state.requestId !== undefined && this.state.requestId !== '') {
            const data = {
                RequestId: this.state.requestId
            }
            this.props.get_login_id_flinks(data)
        }
        if (prevState.loginId !== this.state.loginId && this.state.loginId !== undefined && this.state.loginId !== '') {
            const data = {
                loginId: this.state.loginId,
                MostRecentCached: true
            }
            this.props.login_flinks(data)
        }
    }
    render() {
        return (<React.Fragment >
            <div className="app-form-content">
                <div className="applicant-info-main">
                    <div className="admin-form-head">
                        <div className="admin-form-head-inner">
                            <span style={{ backgroundImage: 'url(assets/image/avatar-image.png)' }} className="avatar"> </span>
                            <strong className="title d-inline-block"> {`${this.props.applicantFirstName != undefined && this.props.applicantFirstName != null ? this.props.applicantFirstName || '' : ''} ${this.props.applicantLastName != undefined && this.props.applicantLastName != null ? this.props.applicantLastName || '' : ''}`} </strong> <span className="date d-inline-block"> {this.props.created_at != null && this.props.created_at != undefined && this.props.created_at !== '' ? moment(this.props.created_at).format('ll') : ''} </span> <span className="type d-inline-block"> Automotive </span>
                            <p> <span className=""> <em>PH:</em> {this.props.applicantTelephone != undefined && this.props.applicantTelephone != null ? this.props.applicantTelephone || '' : ''} </span> <span className=""> <em>E:</em>{this.props.applicantEmail != undefined && this.props.applicantEmail != null ? this.props.applicantEmail || '' : ''} </span> </p>
                            <span className="name"> {`${this.props.applicantFirstName != undefined && this.props.applicantFirstName != null ? this.props.applicantFirstName || '' : ''} ${this.props.applicantLastName != undefined && this.props.applicantLastName != null ? this.props.applicantLastName || '' : ''}`} </span>
                        </div>
                    </div>
                    <iframe height="760"
                        src="https://financethat-iframe.private.fin.ag/?demo=true&redirectUrl=https://flinks.com/contact/thank-you&innerRedirect=true&theme=light&consentEnable=true&customerName=FinTech&backgroundColor=f7f7f7&foregroundColor1=000000&desktopLayout=true&headerEnable=false&institutionFilterEnable=true">
                    </iframe>
                    <div className="footer-btns-holder clearfix">
                        <Link to={`${this.props.url}/verify-identity`}> <button class="btn btn-primary float-left" onClick={() => this.props.onClickChangeStep(4)}> Back  </button></Link>
                        {/* <button class="btn btn-primary float-right active"> Continue  </button> */}
                        <Link to={`${this.props.url}/loan-payment`}><button className="btn btn-primary float-right active" onClick={() => this.props.onClickChangeStep(6)}> Continue  </button></Link>
                    </div>
                </div>
            </div>
        </React.Fragment >)
    }
}
export default IncomeVerification