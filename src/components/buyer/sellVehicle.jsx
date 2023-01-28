/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from "react";
import { Link } from 'react-router-dom'
class SellVehicle extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="sell-vehicle clearfix">
                    <span className="round"></span>
                    <div className="sell-vehicle-boxes clearfix">
                        <div className="sell-vehicle-box pre-approved-buyer">
                            <span className="icon-holder">
                                <img src="/assets/image/sell-vehicle-icon1.svg" alt="" />
                            </span>
                            <p> <Link to='/seller/add-post'> Pre-approved <br /> Buyers </Link> </p>
                            <a href="#" className="action"></a>
                        </div>
                        <div className="sell-vehicle-box sell-vechilce-today desktop">
                            <h2> Sell your vehicle today! </h2>
                            <Link to='/seller/add-post' className="btn btn-primary"> Post ad </Link>
                            <a href="#" className="action"></a>
                        </div>
                        <div className="sell-vehicle-box get-paid">
                            <span className="icon-holder">
                                <img src="/assets/image/sell-vehicle-icon2.svg" alt="" />
                            </span>
                            <p> <Link to='/seller/add-post'> Get Paid in <br /> 24hrs </Link> </p>
                            <a href="#" className="action"></a>
                        </div>
                        <div className="sell-vehicle-box advertising">
                            <span className="icon-holder">
                                <img src="/assets/image/sell-vehicle-icon3.svg" alt="" />
                            </span>
                            <p> <Link to='/seller/add-post'> Social Media <br /> Advertising </Link> </p>
                            <a href="#" className="action"></a>
                        </div>
                    </div>
                    <div className="sell-vehicle-box sell-vechilce-today devices">
                        <h2> Sell your vehicle today! </h2>
                        <Link to='/seller/add-post' className="btn btn-primary"> Post ad </Link>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default SellVehicle;
