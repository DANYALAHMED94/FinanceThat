import React from 'react'
import { Animated } from "react-animated-css";

const VehicleListed = props => {
    const bar = (props.state.startPerc / 2)

    const Next = props.state.backTo === '' ? (bar) : props.state.finalizeStep === '' ? (bar) : (bar + bar)
    // const Next = props.state.backTo === '' ? (props.state.startPerc * 2) : props.state.finalizeStep === '' ? (props.state.startPerc * 2) : (props.state.startPerc * 3)
    return (
        <React.Fragment>
            <Animated animationIn={props.state.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                <div className="PostApp-SecOne">
                    <div className="StepLast-Container">
                        <div className="VechileList-Head">
                            <h2>Vehicle listed on Finance That</h2>
                            <p>Please enter the listing stock number so we can attach the vehicle with your application.</p>
                        </div>

                        <div className="StockNumber-Container">
                            <div className="StockCon-Left">
                                <input type="text" id="stockNumber" name="stockNumber" value={props.state.stockNumber} placeholder="Enter the stock number here" onChange={props.handleOnChange} onBlur={() => props.validator.showMessageFor('Stock Number')} />
                                {props.validator.message('Stock Number', props.state.stockNumber, 'required')}
                            </div>
                            <div className="StockCon-Right"><button type="button" onClick={props.findStockNumber} disabled={props.loadingStock === true}
                            // disabled={props.state.stockNumber === ''}
                            >{props.loadingStock === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : 'Find'}</button></div>
                        </div>
                        <div className="VehicleFound-Container">
                            {/* <h1>{props.single_stock_detail !== undefined && props.single_stock_detail.length > 0 ? "Vehicle Found!" : "No Vehicle Found!"}</h1> */}
                            <h1>{props.stock_message !== undefined && props.stock_message !== null ? props.stock_message : ""}</h1>
                            {(props.single_stock_detail || []).map((item, index) => {
                                return (<React.Fragment key={index}>
                                    <div className="Vehicle-Ad2">
                                        <div className="Veh-Ad3"><h2>Stock</h2></div>
                                        <div className="Veh-Ad4"><h3>{item.stock_id}</h3></div>
                                    </div>
                                    {item.make !== undefined && item.make !== null ? item.make.model_make !== undefined && item.make.model_make !== null ? (
                                        <div className="Vehicle-Ad2">
                                            <div className="Veh-Ad3"><h2>Make</h2></div>
                                            <div className="Veh-Ad4"><h3>{item.make.make_name}</h3></div>
                                        </div>
                                    ) : null : null}

                                    {item.model !== undefined && item.model !== null ? item.model.model_make !== undefined && item.model.model_make !== null ? (
                                        <div className="Vehicle-Ad2">
                                            <div className="Veh-Ad3"><h2>Model</h2></div>
                                            <div className="Veh-Ad4"><h3>{item.model.model_make}</h3></div>
                                        </div>
                                    ) : null : null}
                                    {item.trim !== undefined && item.trim !== null && item.trim !== '' ? (
                                        <>
                                            <div className="Vehicle-Ad2">
                                                <div className="Veh-Ad3"><h2>Trim</h2></div>
                                                <div className="Veh-Ad4"><h3>{item.trim}</h3></div>
                                            </div></>
                                    ) : null}


                                    <div className="Vehicle-Ad2">
                                        <div className="Veh-Ad3"><h2>Price</h2></div>
                                        <div className="Veh-Ad4"><h3>{item.price !== null && item.price !== '' ? new Intl.NumberFormat('en-US',
                                            { style: 'currency', currency: 'USD' }
                                        ).format(Number(item.price))// '$100.00'
                                            : new Intl.NumberFormat('en-US',
                                                { style: 'currency', currency: 'USD' }
                                            ).format(0)}</h3></div>
                                    </div>
                                </React.Fragment>)
                            })}

                        </div>

                    </div>


                    <div className='row align-items-center'>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                            <div className="PostApp-NextBtn previous-btn float-left">
                                <button type="button" onClick={() => props.changeVehicleFinance('', -bar)}> <i className="fa fa-angle-left"></i> Previous </button>
                            </div>
                        </div>
                        {/* onClick={props.state.sellerInfo === 'no' ? () => props.changeStepButton(4, 5) : props.state.listingSource === 'Vehicle sold somewhere else' ? () => props.changeVehicleDetail(1) : props.state.listingSource === 'Vehicle listed on Finance That' ? () => props.changeVehicleFinance(1) : null} */}
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                            <div className="PostApp-NextBtn float-right">
                                <button type="button" onClick={() => props.changeStepButton(5, 6, (Next))} >Next <i className="fa fa-angle-right"></i></button>
                            </div>
                        </div>
                    </div>


                </div>
            </Animated>
        </React.Fragment>
    )
}
export default VehicleListed