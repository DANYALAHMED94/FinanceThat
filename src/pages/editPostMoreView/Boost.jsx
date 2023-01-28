import React from 'react'
import { Animated } from "react-animated-css";

const Boost = props => {
    const barPer = props.defaultSelectedBoost !== 'free' && props.defaultSelectedBoost !== '' ? props.startPercent * 2 : props.startPercent
    const start = props.defaultSelectedBoost !== 'free' && props.defaultSelectedBoost !== '' ? 4 : 4
    const end = props.defaultSelectedBoost !== 'free' && props.defaultSelectedBoost !== '' ? 6 : 5
    const finalizeId = props.defaultSelectedBoost !== 'free' && props.defaultSelectedBoost !== '' ? 1 : ''
    return (
        <React.Fragment>
            <Animated animationIn={props.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                <div className="AdPostSec-twelve">


                    <div className="BoostYour-Container">

                        <div className="BoostYour-Head">
                            <h3>Boost your Ad</h3>
                        </div>

                        <div className="BoostFree-Container">

                            <div className="BoostFree-Head"><h4>FREE</h4></div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Ad Duration</h1>
                                    <p>Your ad is listed for 14 days</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="BoostDuration">
                                        <img src="/assets/image/adgood-icon.svg" alt="" />
                                    </div>
                                </div>

                            </div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Photos</h1>
                                    <p>Upto 10 Photos for your ad</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="BoostDuration">
                                        <img src="/assets/image/adgood-icon.svg" alt="" />
                                    </div>
                                </div>

                            </div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Top Ads</h1>
                                    <p>Ad is on rotation on the top of the<br /> Search Result Page</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="TopAddRight">
                                        <div className="BoostMt"><img src="/assets/image/ad-cross-icon.svg" alt="" /></div>
                                    </div>
                                </div>

                            </div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Homepage Ads</h1>
                                    <p>Your ad is Promoted on the Homepage<br /> in Rotation</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="TopAddRight">
                                        <div className="BoostMt"><img src="/assets/image/ad-cross-icon.svg" alt="" /></div>
                                    </div>
                                </div>

                            </div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Bump Up</h1>
                                    <p>Your ad is Bumped to top Position<br /> every week</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="TopAddRight">
                                        <div className="BoostMt"><img src="/assets/image/ad-cross-icon.svg" alt="" /></div>
                                    </div>
                                </div>

                            </div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Social Media Ads</h1>
                                    <p>Your ad is Promoted on Various Social<br /> Media Platfroms</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="TopAddRight">
                                        <div className="BoostMt"><img src="/assets/image/ad-cross-icon.svg" alt="" /></div>
                                    </div>
                                </div>

                            </div>
                            <div className="BoostAdBtn">
                                <button className={props.selectedBoost === 'free' ? "active" : ''}
                                    onClick={() =>
                                        props.handleOnClickBoost(
                                            "selectedBoost",
                                            "free",
                                            23,
                                            (props.startPercent * 2),
                                            4, 6, 1,
                                            0
                                        )
                                    }
                                // disabled={props.defaultSelectedBoost === 'premium'}
                                >
                                    {/* props.handleOnClickBoost(
                                                            "selectedBoost",
                                                            "free",
                                                            22,
                                                            16.66666666666667,
                                                            4, 5
                                                        ) */}
                                    {props.selectedBoost === 'free' ? "Selected" : 'Select'}

                                </button>
                            </div>

                            {/* <div className="BoostAdBtn"><a className="active" href="#">Select</a></div> */}

                        </div>

                        <div className="BoostFree-Container">

                            <div className="BoostFree-Head"><h4>STANDARD <span>$9.99</span></h4></div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Ad Duration</h1>
                                    <p>Your ad is listed for 14 days</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="BoostDuration">
                                        <img src="/assets/image/adgood-icon.svg" alt="" />
                                    </div>
                                </div>

                            </div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Photos</h1>
                                    <p>Upto 10 Photos for your ad</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="BoostDuration">
                                        <img src="/assets/image/adgood-icon.svg" alt="" />
                                    </div>
                                </div>

                            </div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Top Ads</h1>
                                    <p>Ad is on rotation on the top of the<br /> Search Result Page</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="BoostDuration">
                                        <img src="/assets/image/adgood-icon.svg" alt="" />
                                    </div>
                                </div>

                            </div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Homepage Ads</h1>
                                    <p>Your ad is Promoted on the Homepage<br /> in Rotation</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="BoostDuration">
                                        <img src="/assets/image/adgood-icon.svg" alt="" />
                                    </div>
                                    {/* <div className="TopAddRight">
                                        <div className="BoostMt"><img src="/assets/image/ad-cross-icon.svg" alt="" /></div>
                                    </div> */}
                                </div>

                            </div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Bump Up</h1>
                                    <p>Your ad is Bumped to top Position<br /> every week</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="TopAddRight">
                                        <div className="BoostMt"><img src="/assets/image/ad-cross-icon.svg" alt="" /></div>
                                    </div>
                                </div>

                            </div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Social Media Ads</h1>
                                    <p>Your ad is Promoted on Various Social<br /> Media Platfroms</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="TopAddRight">
                                        <div className="BoostMt"><img src="/assets/image/ad-cross-icon.svg" alt="" /></div>
                                    </div>
                                </div>

                            </div>
                            <div className="BoostAdBtn">
                                <button className={props.selectedBoost === 'standard' ? "active" : ''}
                                    onClick={() =>
                                        props.handleOnClickBoost(
                                            "selectedBoost",
                                            "standard",
                                            22,
                                            barPer,
                                            start, end, finalizeId,
                                            9.99
                                        )
                                    }
                                // disabled={props.defaultSelectedBoost === 'premium'}
                                >
                                    {" "}
                                    {props.selectedBoost === 'standard' ? "Selected" : 'Select'}
                                </button>
                            </div>
                            {/* <div className="BoostAdBtn"><a href="#">Select</a></div> */}

                        </div>

                        <div className="BoostFree-Container">

                            <div className="BoostFree-Head"><h4>PREMIUM <span>$14.99</span></h4></div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Ad Duration</h1>
                                    <p>Your ad is listed for 14 days</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="BoostDuration">
                                        <img src="/assets/image/adgood-icon.svg" alt="" />
                                    </div>
                                </div>

                            </div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Photos</h1>
                                    <p>Upto 10 Photos for your ad</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="BoostDuration">
                                        <img src="/assets/image/adgood-icon.svg" alt="" />
                                    </div>
                                </div>

                            </div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Top Ads</h1>
                                    <p>Ad is on rotation on the top of the<br /> Search Result Page</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="BoostDuration">
                                        <img src="/assets/image/adgood-icon.svg" alt="" />
                                    </div>
                                </div>

                            </div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Homepage Ads</h1>
                                    <p>Your ad is Promoted on the Homepage<br /> in Rotation</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="BoostDuration">
                                        <img src="/assets/image/adgood-icon.svg" alt="" />
                                    </div>
                                </div>

                            </div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Bump Up</h1>
                                    <p>Your ad is Bumped to top Position<br /> every week</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="BoostDuration">
                                        <img src="/assets/image/adgood-icon.svg" alt="" />
                                    </div>
                                </div>

                            </div>

                            <div className="BoostAdDuration">

                                <div className="BoostLeft">
                                    <h1>Social Media Ads</h1>
                                    <p>Your ad is Promoted on Various Social<br /> Media Platfroms</p>
                                </div>

                                <div className="BoostRight">
                                    <div className="BoostDuration">
                                        <img src="/assets/image/adgood-icon.svg" alt="" />
                                    </div>
                                </div>

                            </div>
                            <div className="BoostAdBtn">
                                <button className={props.selectedBoost === 'premium' ? "active" : ''}
                                    onClick={() =>
                                        props.handleOnClickBoost(
                                            "selectedBoost",
                                            "premium",
                                            22,
                                            barPer,
                                            start, end, finalizeId,
                                            14.99
                                        )
                                    }
                                // disabled={props.defaultSelectedBoost === 'premium'}
                                >
                                    {props.selectedBoost === 'premium' ? "Selected" : 'Select'}
                                </button>
                            </div>
                            {/* <div className="BoostAdBtn"><a href="#">Select</a></div> */}

                        </div>

                    </div>


                    <div className="clearfix"></div>


                    <div className="VehicleForm-Head">
                        <label>Boost your Ad</label>
                    </div>
                    <div className="AdBoost-Container">
                        <div className="TableBoost">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <td>
                                            <div className="addDuration-Head">
                                                <h1>Ad Duration</h1>
                                                <p>
                                                    Your ad is listed for 14 days
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="addDuration-Head">
                                                <h1>Photos</h1>
                                                <p>Upto 10 Photos for your ad</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="addDuration-Head">
                                                <h1>Top Ad</h1>
                                                <p>
                                                    Ad is on rotation on the top of
                                                    the Search Result Page
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="addDuration-Head">
                                                <h1>Homepage Ads</h1>
                                                <p>
                                                    Your ad is Promoted on the
                                                    Homepage in Rotation
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="addDuration-Head">
                                                <h1>Bump Up</h1>
                                                <p>
                                                    Your ad is Bumped to top
                                                    Position every week
                                                </p>
                                            </div>
                                        </td>
                                        <td colSpan="2">
                                            <div className="addDuration-Head addDuration-last-Head">
                                                <h1>Social Media Ads</h1>
                                                <p>
                                                    Your ad is Promoted on Various
                                                    Social Media Platfroms
                                                </p>
                                            </div></td>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th className="headone">
                                            Free
                                        </th>

                                        <td>
                                            <div className="ad-durationBtn">
                                                <img
                                                    src="/assets/image/adgood-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="ad-durationBtn">
                                                <img
                                                    src="/assets/image/adgood-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="adcross-Btn">
                                                <img
                                                    src="/assets/image/ad-cross-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="adcross-Btn">
                                                <img
                                                    src="/assets/image/ad-cross-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="adcross-Btn">
                                                <img
                                                    src="/assets/image/ad-cross-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="adcross-Btn">
                                                <img
                                                    src="/assets/image/ad-cross-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="SelectedBtn">
                                                <button className={props.selectedBoost === 'free' ? "active" : ''}
                                                    onClick={() =>
                                                        props.handleOnClickBoost(
                                                            "selectedBoost",
                                                            "free",
                                                            23,
                                                            (props.startPercent * 2),
                                                            4, 6, 1,
                                                            0
                                                        )
                                                    }
                                                // disabled={props.defaultSelectedBoost === 'premium'}
                                                >
                                                    {/* props.handleOnClickBoost(
                                                            "selectedBoost",
                                                            "free",
                                                            22,
                                                            16.66666666666667,
                                                            4, 5
                                                        ) */}
                                                    {props.selectedBoost === 'free' ? "Selected" : 'Select'}

                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th className="headone">
                                            STANDARD
                                            <span>$9.99</span>
                                        </th>

                                        <td>
                                            <div className="ad-durationBtn pb-0">
                                                <img
                                                    src="/assets/image/adgood-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="ad-durationBtn pb-0">
                                                <img
                                                    src="/assets/image/adgood-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="ad-durationBtn pb-0">
                                                <img
                                                    src="/assets/image/adgood-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                            {/* <div className="adcross-Btn pb-0">
                                                <img
                                                    src="/assets/image/ad-cross-icon.svg"
                                                    alt=""
                                                />
                                            </div> */}
                                        </td>

                                        <td>
                                            <div className="ad-durationBtn pb-0">
                                                <img
                                                    src="/assets/image/adgood-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                            {/* <div className="adcross-Btn pb-0">
                                                <img
                                                    src="/assets/image/ad-cross-icon.svg"
                                                    alt=""
                                                />
                                            </div> */}
                                        </td>

                                        <td>
                                            <div className="adcross-Btn pb-0">
                                                <img
                                                    src="/assets/image/ad-cross-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="adcross-Btn pb-0">
                                                <img
                                                    src="/assets/image/ad-cross-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="SelectedBtn pb-0">
                                                <button className={props.selectedBoost === 'standard' ? "active" : ''}
                                                    onClick={() =>
                                                        props.handleOnClickBoost(
                                                            "selectedBoost",
                                                            "standard",
                                                            22,
                                                            barPer,
                                                            start, end, finalizeId,
                                                            9.99
                                                        )
                                                    }
                                                // disabled={props.defaultSelectedBoost === 'premium'}
                                                >
                                                    {" "}
                                                    {props.selectedBoost === 'standard' ? "Selected" : 'Select'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th className="headone">
                                            PREMIUM
                                            <span>$14.99</span>
                                        </th>

                                        <td>
                                            <div className="ad-durationBtn pb-0">
                                                <img
                                                    src="/assets/image/adgood-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="ad-durationBtn pb-0">
                                                <img
                                                    src="/assets/image/adgood-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="ad-durationBtn pb-0">
                                                <img
                                                    src="/assets/image/adgood-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="ad-durationBtn pb-0">
                                                <img
                                                    src="/assets/image/adgood-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="ad-durationBtn pb-0">
                                                <img
                                                    src="/assets/image/adgood-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="ad-durationBtn pb-0">
                                                <img
                                                    src="/assets/image/adgood-icon.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </td>

                                        <td>
                                            <div className="SelectedBtn pb-0">
                                                <button className={props.selectedBoost === 'premium' ? "active" : ''}
                                                    onClick={() =>
                                                        props.handleOnClickBoost(
                                                            "selectedBoost",
                                                            "premium",
                                                            22,
                                                            barPer,
                                                            start, end, finalizeId,
                                                            14.99
                                                        )
                                                    }
                                                // disabled={props.defaultSelectedBoost === 'premium'}
                                                >
                                                    {props.selectedBoost === 'premium' ? "Selected" : 'Select'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xl-12'>
                            <div className="SecSeven-Btn previous-btn float-left">
                                <button className="mt-5"
                                    type="button"
                                    onClick={() => props.changeStepButton(20, 4, 3, -props.startPercent, finalizeId)}
                                >
                                    <i className="fa fa-angle-left"></i>
                                    Previous{" "}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </Animated>
        </React.Fragment>
    )
}
export default Boost