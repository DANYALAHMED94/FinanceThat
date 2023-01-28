import React, { Component } from 'react'
import MapComp from './MapComp'
import Slider from 'react-rangeslider'
import $ from 'jquery'
class GoogleMapModel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.distance ? this.props.distance : 0
        }
    }

    closeModel = () => {
        $("body").css({ "overflow": "" });
        window.$('#googleMapModelHome').modal('hide')
        $('#searchHomeButton')[0].click();
        // $("#searchHomeButton").trigger("click");
    }
    handleChangeStart = () => {
        console.log('Change event started')
    };
    handleChange = value => {
        this.setState({
            ...this.state,
            value: value
        })
    };
    handleChangeComplete = () => {
        this.props.setDistance(this.state.value)
    };
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps.distance !== this.props.distance || this.props.latitude !== nextProps.latitude ||
    //         this.props.longitude !== nextProps.longitude || this.state.value !== nextState.value) {
    //         return true
    //     }
    //     return false
    // }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.distance !== this.props.distance && this.props.distance) {
            // if (prevProps.distance !== this.props.distance && this.props.distance != undefined && this.props.distance != null) {
            this.setState({
                ...this.state,
                value: Number(this.props.distance)
            })
        }
    }

    render() {
        const { value } = this.state
        return (<React.Fragment>
            <div className="MapSearch-ModalContainer">
                <div className="modal fade" id="googleMapModelHome" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="Wheredo-Heading"><h1>Where do you want to search</h1></div>

                                <div className="Wheredo-btn">
                                    <button type="button" data-dismiss="modal" aria-label="Close">
                                        <img src="/assets/image/sprite-icon/cross-outline.svg" alt="Close" />
                                    </button>
                                </div>
                                <div className="clearfix"></div>
                                <MapComp {...this.props} distance={this.state.value} />
                            </div>
                            <div className='footer-modal'>
                                <div className='slider'>
                                    <div className='value-head'>Distance</div>
                                    <Slider
                                        min={0}
                                        max={1000}
                                        value={value}
                                        onChangeStart={this.handleChangeStart}
                                        onChange={this.handleChange}
                                        onChangeComplete={this.handleChangeComplete}
                                        onBlue={this.blurRange}
                                    />
                                    <div className='value'>{value}km</div>
                                </div>
                                <div className="slider-apply-btn">
                                    <button type="button" onClick={this.closeModel} >Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment >)
    }
}
export default GoogleMapModel