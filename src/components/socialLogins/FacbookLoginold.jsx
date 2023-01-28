import React, { Component } from 'react';
import { Link } from "react-router-dom";


class FacebookLogin extends Component {

    componentDidMount() {
        // Load the required SDK asynchronously for facebook, google and linkedin
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
                cookie: true,  // enable cookies to allow the server to access the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.8' // use version 2.1
            });
        };
    }

    facebookLogin = () => {
        /*window.FB.login(
            this.checkLoginState(), 
            { scope : 'email, public_profile' } //Add scope whatever you need about the facebook user
        ); */

        window.FB.login(
            function (resp) {
                this.statusChangeCallback(resp);
                // ,user_work_history,user_education_history,user_location,email,public_profile'
                //id,  name,first_name, last_name,verified , locale,timezone,link,gender, updated_time, 
            }.bind(this), { scope: 'public_profile,email' });
    }

    checkLoginState() {
        alert("Checking Login Status")
        console.log("Checking login status...........");

        window.FB.getLoginStatus(function (response) {
            alert("FB Callback")
            console.log("----------->")
            console.log(response)
            this.statusChangeCallback(response);
        }.bind(this));
    }

    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            alert("Connected to facebook. Retriving user from fb");
            // Logged into your app and Facebook.
            this.fetchDataFacebook();
        } else if (response.status === 'not_authorized') {
            console.log('Import error', 'Authorize app to import data', 'error')
        } else {
            console.log('Import error', 'Error occured while importing data', 'error')
        }
    }

    fetchDataFacebook = () => {
        console.log('Welcome!  Fetching your information.... ');

        window.FB.api('/me', function (user) {
            console.log(user);
            console.log('Successful login from facebook : ' + user.name);
            alert('Successful login for: ' + user.name);
        });
    }
    logoutFB = () => {
        alert()
        window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout((response) => {
            console.log(response)

        }));
        // window.FB.logout((response) => {
        //     console.log(response)

        //     // Person is now logged out
        // });
    }
    render() {
        return (
            <>
                <div className="# padLeft" onClick={() => this.facebookLogin()}>
                    <Link>
                        <div className="LoginSocial-Btm">
                            <img src="/assets/image/facebook.svg" alt="facebook" />
                            <h1>Sign in with Facebook</h1>
                        </div>
                    </Link>
                </div>
                <div className="# padLeft" onClick={() => this.logoutFB()}>
                    <Link>
                        <div className="LoginSocial-Btm">
                            <img src="/assets/image/facebook.svg" alt="facebook" />
                            <h1>Logout Facebook</h1>
                        </div>
                    </Link>
                </div>
            </>
        )
    }
}

export default FacebookLogin;