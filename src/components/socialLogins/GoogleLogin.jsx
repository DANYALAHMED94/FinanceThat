import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom'
// https://github.com/Sivanesh-S/react-google-authentication/blob/master/src/components/LoginHooks.js

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLogin = (props) => {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    props.responseGoogle(res)
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    // alert(
    //   `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    // );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    // isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <div className="Loginwidth-mobile" onClick={()=>signIn()}>
                         <Link to='#'>
                             <div className="LoginSocial-Btm">
                                 <img src="/assets/image/google-icon.svg" alt="google-icon" />
                                 <h1>Sign in with Google</h1>
                             </div>
                         </Link>
                     </div>
  );
}

export default GoogleLogin;