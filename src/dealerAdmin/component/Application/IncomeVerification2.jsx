import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import ApplicationHeaderAdmin from "./ApplicationHeaderAdmin";
var that;
class IncomeVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestId: "",
      loginId: "",
    };
    that = this;
  }
  componentDidMount() {
    window.addEventListener("message", function (e) {
      console.log(e.data);
      if (
        e.data.loginId != undefined &&
        e.data.loginId != null &&
        e.data.loginId != ""
      ) {
        const data = {
          loginId: e.data.loginId,
          MostRecentCached: true,
        };
        that.setState({
          ...that.state,
          loginId: e.data.requestId,
          requestId: "",
        });
      }
      if (
        e.data.requestId != undefined &&
        e.data.requestId != null &&
        e.data.requestId != ""
      ) {
        that.setState({
          ...that.state,
          requestId: e.data.requestId,
          loginId: "",
        });
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.requestId !== this.state.requestId &&
      this.state.requestId !== undefined &&
      this.state.requestId !== ""
    ) {
      const data = {
        RequestId: this.state.requestId,
      };
      this.props.get_login_id_flinks(data);
    }
    if (
      prevState.loginId !== this.state.loginId &&
      this.state.loginId !== undefined &&
      this.state.loginId !== ""
    ) {
      const data = {
        loginId: this.state.loginId,
        MostRecentCached: true,
      };
      this.props.login_flinks(data);
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="app-form-content">
          <div className="applicant-info-main">
            <ApplicationHeaderAdmin {...this.props} />
            <iframe
              height="760"
              src="https://financethat-iframe.private.fin.ag/?demo=true&redirectUrl=https://flinks.com/contact/thank-you&innerRedirect=true&theme=light&consentEnable=true&customerName=FinTech&backgroundColor=f7f7f7&foregroundColor1=000000&desktopLayout=true&headerEnable=false&institutionFilterEnable=true"
            ></iframe>
            <div className="footer-btns-holder clearfix">
              <Link to={`${this.props.url}/verify-identity`}>
                {" "}
                <button
                  class="btn btn-primary float-left"
                  onClick={() => this.props.onClickChangeStep(4)}
                >
                  {" "}
                  Back{" "}
                </button>
              </Link>
              {/* <button class="btn btn-primary float-right active"> Continue  </button> */}
              <Link to={`${this.props.url}/loan-payment`}>
                <button
                  className="btn btn-primary float-right active"
                  onClick={() => this.props.onClickChangeStep(6)}
                >
                  {" "}
                  Continue{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default IncomeVerification;
