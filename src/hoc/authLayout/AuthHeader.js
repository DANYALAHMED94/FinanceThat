import React from "react";
import { Link } from "react-router-dom";
const AuthHeader = (props) => {
  return (
    <React.Fragment>

      <header className="SectionHeader">
        <div className="container-fluid">
          <div className="row authhead">
            <div className="col-md-4 col-sm-12 col-12">
              <div className="WebLogo">
                <Link to="/">
                  <img src="/assets/image/financethat-logo.svg" alt="" />
                </Link>
              </div>
            </div>

            <div className="col-md-8 col-sm-12 col-12">
              <div className="RegisterBtn">
                <Link to="/login" className={props.linkLogin === true ? 'active' : ''}>Sign in</Link>
                <Link to="/register" className={props.linkRegister === true ? 'active' : ''}>Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}

export default AuthHeader;