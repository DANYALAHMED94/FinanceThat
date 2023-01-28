import React, { Component } from 'react';
import { Link } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';


class FacbookLogin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props, 'sdasdsa')
        return (
            <>

                <div className="Loginwidth-mobile padLeft">
                    <FacebookLogin
                        appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                        autoLoad={false}
                        fields="name,email,picture"
                        scope="public_profile,email"
                        callback={this.props.responseFacebook}
                        cssClass="my-facebook-button-class"
                    />
                </div>
                {/* <div className="# padLeft" onClick={() => this.logoutFB()}>
                    <Link>
                        <div className="LoginSocial-Btm">
                            <img src="/assets/image/facebook.svg" alt="facebook" />
                            <h1>Logout Facebook</h1>
                        </div>
                    </Link>
                </div> */}
            </>
        )
    }
}

export default FacbookLogin;