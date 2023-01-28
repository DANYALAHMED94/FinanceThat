import React, { Component } from 'react'
import Select, { components } from 'react-select';
import { Scrollbars } from "react-custom-scrollbars";
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom'
import $ from 'jquery'
import ConfirmModel from '../alertMessages/ConfirmModel'
import MaskedInput from 'react-text-mask'
import { API_URL } from '../../constant';

class AssetDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            screenName: 'assets-detail',
            assetIndex: ''
        }
        $("#assets-detail").removeClass('tabDeactive')
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.updateAssetsDetail !== this.props.updateAssetsDetail && this.props.updateAssetsDetail !== undefined) {
            this.props.onClickChangeStep(4)
            this.props.history.push(`${this.props.url}/additional-item`)
        }
    }

    update_assets_detail = () => {
        const data = {
            id: this.props.buyerAppId,
            vehicle: this.props.assetsDetails.map(item => {
                if (item.id === '') {
                    return {
                        "type_of_vehicle": item.vehicleType,
                        "year": item.year,
                        "make": item.make,
                        "model": item.model,
                        "trim": item.trim,
                        "kilometer": item.kilometer === '' ? 0 : item.kilometer.toString().split(',').join(""),
                        "vin": item.vin,
                        "price": item.price === '' ? 0 : item.price.toString().split(',').join("").split('$').join(''),
                        "condition": item.condition,
                        "stock_id": item.stockNumber,
                        'is_updated': item.is_updated
                    }
                } else {
                    return {
                        'id': item.id,
                        "type_of_vehicle": item.vehicleType,
                        "year": item.year,
                        "make": item.make,
                        "model": item.model,
                        "trim": item.trim,
                        "kilometer": item.kilometer === '' ? 0 : item.kilometer.toString().split(',').join(""),
                        "vin": item.vin,
                        "price": item.price === '' ? 0 : item.price.toString().split(',').join("").split('$').join(''),
                        "condition": item.condition,
                        "stock_id": item.stockNumber,
                        'is_updated': item.is_updated
                    }
                }
            }),
            additional_item: []
        }
        console.log(data)
        this.props.update_application_detail(data, 'updateAssetsDetail')
    }
    onBack = () => {
        if (this.props.coApplicant === true) {
            this.props.onClickChangeStep(2)
            this.props.history.push(`${this.props.url}/co-applicant`)
        } else {
            this.props.onClickChangeStep(1)
            this.props.history.push(`${this.props.url}/applicant-detail`)
        }

    }
    render() {
        const { Option } = components;

        const renderScrollbar = props => {
            return (
                <div style={{ height: 260 }}>
                    <Scrollbars>{props.children}</Scrollbars>
                </div>
            );
        };
        const renderScrollbarCondition = props => {
            return (
                <div style={{ height: 100 }}>
                    <Scrollbars>{props.children}</Scrollbars>
                </div>
            );
        };
        const renderOption = props => {
            return (
                <Option {...props}>
                    <div>{props.data.label}</div>
                </Option>
            );
        };
        let first = this.props.applicantFirstName ? this.props.applicantFirstName.split(' ')[0] : ''
        let last = this.props.applicantLastName ? this.props.applicantLastName.split(' ')[0] : ''
        first = first ? first.charAt(0).toUpperCase() : ''
        last = last ? last.charAt(0).toUpperCase() : ''
        return (<React.Fragment>
            <div className="app-form-content">
                <div className="app-form-content-inner">
                    <div className="admin-form-head">
                        <div className="admin-form-head-inner">
                        {this.props.photo ? (<span style={{ backgroundImage: `url(${API_URL+'/media/' + this.props.photo})` }} className="avatar"></span>) : (<span  className="avatar">{`${first}${last}`} </span>)}
                            <strong className="title d-inline-block"> {`${this.props.applicantFirstName != undefined && this.props.applicantFirstName != null ? this.props.applicantFirstName || '' : ''} ${this.props.applicantLastName != undefined && this.props.applicantLastName != null ? this.props.applicantLastName || '' : ''}`} </strong>  <span className="type d-inline-block"> {this.props.firstTypeOfVehicle} </span>
                            {/* <p> <span className="">  {this.props.firstTypeOfVehicle} </span>  </p> */}
                        </div>
                    </div>
                    <div className="tab-content" id="formAppTabsContent">
                        <div className="tab-pane fade show active clearfix" id="assets-detail" role="tabpanel" aria-labelledby="assets-detail-tab">
                            {this.state.screenName === 'assets-detail' ? (<React.Fragment>
                                <div className="forms-head clearfix" >
                                    <h1> Asset Detail </h1>
                                </div>
                                {(this.props.assetsDetailsForm || []).map((item, index) => (
                                    <div className="form-main" key={index}>
                                        <div className="form-field-row two-col clearfix">
                                            <div className="form-field-col">
                                                <label> Type of vehicle </label>
                                                <Select
                                                    placeholder="Search Vehicle"
                                                    id="selectedVehicle"
                                                    name="selectedVehicle"
                                                    value={item.selectedVehicle}
                                                    onChange={(e) => this.props.changeSelectAssets(e, 'vehicleType', 'selectedVehicle', index)}
                                                    options={this.props.vehicleOptions}
                                                    isSearchable
                                                    isClearable
                                                    className="react-select-main"
                                                    classNamePrefix="react-select"
                                                    components={{
                                                        Option: renderOption,
                                                        MenuList: renderScrollbar
                                                    }}
                                                    captureMenuScroll={false}
                                                />
                                            </div>
                                            <div className="form-field-col">
                                                <label> Stock Number </label>
                                                <NumberFormat required
                                                    className='form-control'
                                                    onChange={(e) => this.props.handleOnChangeAssets(e, index)}
                                                    value={item.stockNumber}
                                                    name='stockNumber'
                                                    onBlur={() => this.props.handleOnBlurStock(item.stockNumber, index)}
                                                />
                                                {/* <input type="text" className="form-control" name="" placeholder="5768393" /> */}
                                            </div>
                                        </div>
                                        <div className="form-field-row two-col clearfix">
                                            <div className="form-field-col">
                                                <label> Year </label>
                                                <MaskedInput
                                                    mask={[/[0-9]/i, /[0-9]/, /[0-9]/i, /[0-9]/]}
                                                    className="form-control"
                                                    guide={false}
                                                    placeholder='Year'
                                                    id="year" name='year'
                                                    value={item.year}
                                                    onChange={(e) => this.props.handleOnChangeAssets(e, index)}
                                                />
                                                {/* <Select
                                                    placeholder="Select Year"
                                                    id="selectedYear"
                                                    name="selectedYear"
                                                    value={item.selectedYear}
                                                    onChange={(e) => this.props.changeSelectAssets(e, 'year', 'selectedYear', index)}
                                                    options={this.props.yearsDropDown}
                                                    className="react-select-main"
                                                    classNamePrefix="react-select"
                                                    components={{
                                                        Option: renderOption,
                                                        MenuList: renderScrollbar
                                                    }}
                                                    captureMenuScroll={false}

                                                /> */}
                                                {/* <input type="text" className="form-control" name="" placeholder="2020" /> */}
                                            </div>
                                            <div className="form-field-col">
                                                <label> Make </label>

                                                <input type="text" className="form-control" name="make" placeholder="Make" value={item.make} onChange={(e) => this.props.handleOnChangeAssets(e, index)} />
                                            </div>
                                        </div>
                                        <div className="form-field-row two-col clearfix">
                                            <div className="form-field-col">
                                                <label> Model </label>

                                                <input type="text" className="form-control" name="model" placeholder="Model" value={item.model} onChange={(e) => this.props.handleOnChangeAssets(e, index)} />
                                            </div>
                                            <div className="form-field-col">
                                                <label> Trim </label>

                                                <input type="text" className="form-control" name="trim" placeholder="Trim" value={item.trim} onChange={(e) => this.props.handleOnChangeAssets(e, index)} />
                                            </div>
                                        </div>
                                        <div className="form-field-row two-col clearfix">
                                            <div className="form-field-col">
                                                <label> KM </label>
                                                <NumberFormat
                                                    className='form-control'
                                                    value={(item.kilometer)}
                                                    decimalScale={2}
                                                    onChange={(e) => this.props.handleOnChangeAssets(e, index)}
                                                    thousandSeparator={true}
                                                    id="kilometer"
                                                    name="kilometer"
                                                    allowNegative={false}
                                                />
                                                {/* <input type="text" className="form-control km" name="" placeholder="200" /> */}
                                            </div>
                                            <div className="form-field-col">
                                                <label> VIN </label>
                                                <input type="text" className="form-control" name="vin" placeholder="Vin" value={item.vin} onChange={(e) => this.props.handleOnChangeAssets(e, index)} maxLength='17' />
                                            </div>
                                        </div>
                                        <div className="form-field-row two-col clearfix">
                                            <div className="form-field-col">
                                                <label> Price </label>
                                                <NumberFormat
                                                    className='form-control'
                                                    value={(item.price)}
                                                    decimalScale={2}
                                                    onChange={(e) => this.props.handleOnChangeAssets(e, index)}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                    id="price"
                                                    name="price"
                                                    allowNegative={false}
                                                />
                                                {/* <input type="text" className="form-control" name="" placeholder="$68799" /> */}
                                            </div>
                                            <div className="form-field-col">
                                                <label> Condition </label>
                                                <input type="text" className="form-control" name="condition" placeholder="Condition" value={item.condition} onChange={(e) => this.props.handleOnChangeAssets(e, index)} />
                                                {/* <Select
                                                    placeholder="Select Condition"
                                                    id="selectedCondition"
                                                    name="selectedCondition"
                                                    value={item.selectedCondition}
                                                    onChange={(e) => this.props.changeSelectAssets(e, 'condition', 'selectedCondition', index)}
                                                    options={this.props.conditions}
                                                    className="react-select-main"
                                                    classNamePrefix="react-select"
                                                    components={{
                                                        Option: renderOption,
                                                        MenuList: renderScrollbarCondition
                                                    }}
                                                    captureMenuScroll={false}

                                                /> */}
                                            </div>
                                        </div>
                                        <div className="form-field-row two-col clearfix">
                                            <div className="cta m-0 clearfix">
                                                {item.stockNumber !== undefined && item.stockNumber !== null && item.stockNumber !== '' ? (<Link to={`/ad-post/detail/${item.stockNumber}`} target='_blank'><button className="btn btn-primary float-left active"> View listing  </button></Link>) : null}
                                                {/* <button className="add-another float-right" onClick={this.props.addAssets}> Add Another </button> */}
                                                {index > 0 ? this.props.loading_delete_vehicle === true ? (<button className="add-another float-right" ><i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                                                </button>) :
                                                    (<span className="del" data-toggle="modal" data-target="#confirmModel" onClick={() => this.setState({
                                                        ...this.state,
                                                        assetIndex: index
                                                    })}>
                                                    </span>)
                                                    // (<span className="del" onClick={() => this.props.deleteAsset(index)}>
                                                    // </span>)
                                                    : null}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="footer-btns-holder clearfix">
                                    <button className="btn btn-primary float-left" onClick={this.onBack}> Back  </button>
                                    {this.props.loading_update === true ? (<button className="btn btn-primary float-right active" > <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>  </button>) : (<button className="btn btn-primary float-right active" onClick={this.update_assets_detail}> Continue  </button>)}
                                </div>

                            </React.Fragment>) : null}

                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModel buttonAction={this.props.deleteAsset} id={this.state.assetIndex} heading={'Delete Asset?'} section1={'Are you sure you want to Delete this Asset?'} section2={''} />
        </React.Fragment>)
    }
}
export default AssetDetail
