import React, { Component } from "react";
import MapCompSearch from "./MapCompSearch";
import Slider from "react-rangeslider";
import { Link } from "react-router-dom";
import $ from 'jquery'
class GoogleMapModelSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // value: this.props.distance !== undefined && this.props.distance !== null && this.props.distance !== '' ? this.props.distance : 0
      value:
        this.props.rangeSlider !== undefined &&
        this.props.rangeSlider !== null &&
        this.props.rangeSlider.length > 0
          ? this.props.rangeSlider[1] !== undefined &&
            this.props.rangeSlider[1] !== null &&
            this.props.rangeSlider[1] !== 0
            ? this.props.rangeSlider[1]
            : 1
          : 1,
      centerGps: null,
    };
  }

  closeModel = () => {
    $("body").css({ "overflow": "" });
    window.$('#googleMapModelHome').modal('hide')
    $('#searchHomeButton')[0].click();
    // $("#searchHomeButton").trigger("click");
}
  handleChangeStart = () => {
    console.log("Change event started");
  };
  handleChange = (value) => {
    this.setState({
      ...this.state,
      value: value,
    });
  };
  
  handleChangeComplete = () => {
    console.log("Change event completed");
    this.props.setDistance(this.state.value);
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.rangeSlider !== this.props.rangeSlider &&
      this.props.rangeSlider != undefined &&
      this.props.rangeSlider != null
    ) {
      this.setState({
        ...this.state,
        value:
          this.props.rangeSlider !== undefined &&
          this.props.rangeSlider !== null &&
          this.props.rangeSlider.length > 0
            ? this.props.rangeSlider[1] !== undefined &&
              this.props.rangeSlider[1] !== null &&
              this.props.rangeSlider[1] !== 0
              ? this.props.rangeSlider[1]
              : 0
            : 0,
        centerGps: null,
      });
    }
  }

  render() {
    const { value } = this.state;

    return (
      <React.Fragment>
        <div className="MapSearch-ModalContainer">
          <div
            className="modal fade"
            id="googleMapModelHome"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Wheredo-Heading">
                    <h1>Where do you want to search</h1>
                  </div>

                  <div className="Wheredo-btn">
                    <button
                      type="button"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <img
                        src="/assets/image/sprite-icon/cross-outline.svg"
                        alt="Close"
                        aria-label="Close"
                        onClick={this.closeModel}
                      />
                    </button>
                  </div>

                  <div className="clearfix"></div>

                  {/* <div className="AddGoogle-Map" id='AddGoogle-Map'> */}
                  {/* */}
                  <MapCompSearch {...this.props} distance={this.state.value} />

                  {/* </div> */}
                </div>
                <div className="footer-modal">
                  <div className="slider">
                    <div className="value-head">Distance</div>
                    <Slider
                      min={0}
                      max={1000}
                      value={value}
                      onChangeStart={this.handleChangeStart}
                      onChange={this.handleChange}
                      onChangeComplete={this.handleChangeComplete}
                      onBlue={this.blurRange}
                    />
                    <div className="value">{value}km</div>
                  </div>
                  <div className="slider-apply-btn">
                    <button
                      type="button"
                      onClick={this.closeModel}
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default GoogleMapModelSearch;
