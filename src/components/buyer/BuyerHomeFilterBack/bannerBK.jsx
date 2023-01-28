import React, { Component } from "react";
import { Link } from "react-router-dom"
import { buyer_banner_toggle, buyer_banner_toggle_mobile } from '../../actions/componentRedirectionActions'
import Select from 'react-select';
import { connect } from 'react-redux'
import {
  get_vehicle_make,
} from '../../actions/addPostActions'
import $ from 'jquery'
class Banner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      category: '',
      location: this.props.location,
      type_of_vehicle: [],
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      maxKm: '',
      maxPrice: '',
      yearFilter: '',
      distance: this.props.distance,
      vehicleOptions: this.props.type_of_vehicles !== undefined && this.props.type_of_vehicles !== null ? this.props.type_of_vehicles.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      }) : [],
      vehicleCategory: '',
      categoryFilterName: ''
    }
  }

  handleOnChange = (e) => {
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.type_of_vehicles !== this.props.type_of_vehicles && this.props.type_of_vehicles !== undefined) {
      const typeOfVehicle = [];
      (this.props.type_of_vehicles || []).map((item, index) => {
        typeOfVehicle.push({
          value: item.id,
          label: item.name
        })
      })
      this.setState({
        ...this.state,
        type_of_vehicle: this.props.type_of_vehicles,
        vehicleOptions: typeOfVehicle
      })
    }


    if (prevState.categoryFilter !== this.state.categoryFilter && this.state.categoryFilter !== '') {
      // this.props.get_vehicle_make(this.state.categoryFilter)
      const categoryName = this.state.categoryFilter !== '' ? (this.state.type_of_vehicle || []).filter(item => item.id == this.state.categoryFilter).map(item => { return item.name })[0] == undefined ? '' : (this.state.type_of_vehicle || []).filter(item => item.id == this.state.categoryFilter).map(item => { return item.name })[0] : ''
      this.setState({
        ...this.state,
        categoryFilterName: categoryName
      })
    }

    if ((prevProps.latitude !== this.props.latitude && this.props.latitude) || (prevProps.longitude !== this.props.longitude && this.props.longitude) || (prevProps.distance !== this.props.distance && this.props.distance) || (prevProps.location !== this.props.location && this.props.location)) {
      this.setState({
        ...this.state,
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        distance: this.props.distance,
        location: this.props.location
      })
    }
    /**
*
*
*  Location Drop Down
*
*/

  }
  toggleGoogleMap = () => {
    window.$('#googleMapModelHome').modal('show')
  }

  handleChangeSelect = (e, inputName, filterId, filterName) => {
    this.setState({
      ...this.state,
      [inputName]: e,
      [filterId]: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : '' : '',
    })
  }
  mobileMoreFilter = () => {
    $("body").css({ "overflow": "hidden" });
    this.props.changeShowMore()
  }
  render() {
    return (
      <React.Fragment>
        <section className="SectionBanner first-banner">
          <div className="banner-filters-content-main">
            <div className="banner-filters-content-inner">
              <div className="NavBanner-Head">
                <h1>
                  Buy, sell and get financing
                  <br /> with a click of a button.
                </h1>
              </div>

              <div className="MobileSearch">
                <input type="text" id="search1" name="search" placeholder="Search by make, model or keyword" value={this.state.search}
                  onChange={this.handleOnChange} />

                <div className="ShowFilter-Head"><button role="button" onClick={this.mobileMoreFilter}>Show More Filters <i className="icon-arrow-down"></i></button></div>

              </div>

              <div className="SearchFilter-Container clearfix">
                <div className="SearchFilter-form search">
                  <input
                    type="text"
                    id="search"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleOnChange}
                    placeholder="Search by make, model or keyword"
                  />
                </div>

                <div className="SearchFilter-form categories">
                  <Select
                    placeholder="All Categories"
                    isSearchable={false}
                    className="banner-react-select-main"
                    classNamePrefix="banner-react-select"
                    closeMenuOnSelect
                    options={this.state.vehicleOptions}
                    required
                    name="vehicleCategory"
                    value={this.state.vehicleCategory}
                    onChange={(e) => this.handleChangeSelect(e, 'vehicleCategory', 'categoryFilter', 'categoryFilterName')}
                  />
                </div>

                <div className="AddLocation-Form location" onClick={this.toggleGoogleMap}>
                  <i className="icon-subtract-icon"></i>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={this.state.location !== undefined && this.state.location !== null && this.state.location !== '' ? this.state.location.split(',').slice(-3, -1)[0] + ", " + this.state.location.split(',').slice(-2, -1)[0].split(' ')[1] : ''}
                    onChange={this.handleOnChange}
                    placeholder="Add Location"
                    disabled
                    style={{ cursor: 'pointer' }}
                  />

                </div>
                <Link to={{
                  pathname: "/Ad-post/list", query: {
                    location: this.state.location,
                    search: this.state.search,
                    category: this.state.categoryFilter,
                    categoryFilterName: this.state.categoryFilterName,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude, fromKilometer: this.state.maxKm !== null && this.state.maxKm !== '' ? this.state.maxKm.toLocaleString('en-US') : '',
                    // (0).toLocaleString('en-US')
                    fromRange: this.state.maxPrice,
                    fromYear: this.state.yearFilter,
                    distance: this.state.distance
                  }
                }}
                  className="btn btn-primary"
                  id='searchHomeButton'
                >

                  Search</Link>
                <div className="ShowFilter-Head" >
                  <button role="button" onClick={this.props.changeShowMore}>
                    Show More Filters <i className="icon-arrow-down"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
const actionCreators = {
  buyer_banner_toggle: buyer_banner_toggle,
  buyer_banner_toggle_mobile: buyer_banner_toggle_mobile,
  get_vehicle_make: get_vehicle_make
};
const mapStateToProps = (state) => {
  return {
    post_list_filters: state.adPostReducers.listPostReducer.post_list_filters,
    type_of_vehicles: state.homeReducer.type_of_vehicles,
    removeLoaderTrims: state.adPostReducers.addPostReducer.removeLoaderTrims,
    vehicle_make: state.adPostReducers.addPostReducer.vehicle_make,
    removeLoaderMake: state.adPostReducers.addPostReducer.removeLoaderMake,
    vehicle_model: state.adPostReducers.addPostReducer.vehicle_model,
    removeLoaderModel: state.adPostReducers.addPostReducer.removeLoaderModel,
    showloaderValues: state.adPostReducers.listPostReducer.showloaderValues,
  }
}
export default connect(mapStateToProps, actionCreators)(Banner);
