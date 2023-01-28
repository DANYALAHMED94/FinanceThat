/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom"
import Select from 'react-select';
// import {
//   get_vehicle_make,
// } from '../../actions/addPostActions'
import $ from 'jquery'
import {  useSelector } from 'react-redux'

const Banner = props => {
  const reduxState = useSelector(state=> {return {
    type_of_vehicles: state.homeReducer.type_of_vehicles,
    vehicle_make: state.adPostReducers.addPostReducer.vehicle_make,
    vehicle_models: state.homeReducer.vehicle_models,
}})
  const [state, setState] = useState({
    search: '',
    category: '',
    location: props.location,
    type_of_vehicle: [],
    latitude: props.latitude,
    longitude: props.longitude,
    maxKm: '',
    maxPrice: '',
    yearFilter: '',
    distance: props.distance,
    vehicleOptions: reduxState.type_of_vehicles !== undefined && reduxState.type_of_vehicles !== null ? reduxState.type_of_vehicles.map(item => {
      return {
        value: item.id,
        label: item.name
      }
    }) : [],
    vehicleCategory: '',
    categoryFilterName: ''
  })
    useEffect(()=> {
      if ( reduxState.type_of_vehicles) {
        const typeOfVehicle = [];
        (reduxState.type_of_vehicles || []).map((item, index) => (
          typeOfVehicle.push({
            value: item.id,
            label: item.name
          })
        ))
        setState({
          ...state,
          type_of_vehicle: reduxState.type_of_vehicles,
          vehicleOptions: typeOfVehicle
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[reduxState.type_of_vehicles])
    useEffect(()=> {
      if (state.categoryFilter) {
        const categoryName = state.categoryFilter !== '' ? (state.type_of_vehicle || []).filter(item => item.id == state.categoryFilter).map(item => { return item.name })[0] == undefined ? '' : (state.type_of_vehicle || []).filter(item => item.id == state.categoryFilter).map(item => { return item.name })[0] : ''
        setState({
          ...state,
          categoryFilterName: categoryName
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.categoryFilter])
    useEffect(()=> {
      if (props.latitude) {
        setState({
          ...state,
          latitude: props.latitude,
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.latitude])
    useEffect(()=> {
      if (props.longitude) {
        setState({
          ...state,
          longitude: props.longitude,
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.longitude])
    useEffect(()=> {
      if (props.distance) {
        setState({
          ...state,
          distance: props.distance,
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.distance])
    useEffect(()=> {
      if (prevProps.location ) {
        setState({
          ...state,
          location: props.location
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.location])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
  }
  const toggleGoogleMap = () => {
    window.$('#googleMapModelHome').modal('show')
  }
  const handleChangeSelect = (e, inputName, filterId, filterName) => {
    setState({
      ...state,
      [inputName]: e,
      [filterId]: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : '' : '',
    })
  }
  const mobileMoreFilter = () => {
    $("body").css({ "overflow": "hidden" });
    props.changeShowMore()
  }
  console.log(reduxState, 'reduxState')
return (<>
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
                <input type="text" id="search1" name="search" placeholder="Search by make, model or keyword" value={state.search}
                  onChange={handleOnChange} />
                <div className="ShowFilter-Head"><button role="button" onClick={mobileMoreFilter}>Show More Filters <i className="icon-arrow-down"></i></button></div>
              </div>
              <div className="SearchFilter-Container clearfix">
                <div className="SearchFilter-form search">
                  <input
                    type="text"
                    id="search"
                    name="search"
                    value={state.search}
                    onChange={handleOnChange}
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
                    options={state.vehicleOptions}
                    required
                    name="vehicleCategory"
                    value={state.vehicleCategory}
                    onChange={(e) => handleChangeSelect(e, 'vehicleCategory', 'categoryFilter', 'categoryFilterName')}
                  />
                </div>

                <div className="AddLocation-Form location" onClick={toggleGoogleMap}>
                  <i className="icon-subtract-icon"></i>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={state.location !== undefined && state.location !== null && state.location !== '' ? state.location.split(',').slice(-3, -1)[0] + ", " + state.location.split(',').slice(-2, -1)[0].split(' ')[1] : ''}
                    onChange={handleOnChange}
                    placeholder="Add Location"
                    disabled
                    style={{ cursor: 'pointer' }}
                  />

                </div>
                <Link to={{
                  pathname: "/Ad-post/list", query: {
                    location: state.location,
                    search: state.search,
                    category: state.categoryFilter,
                    categoryFilterName: state.categoryFilterName,
                    latitude: state.latitude,
                    longitude: state.longitude, fromKilometer: state.maxKm !== null && state.maxKm !== '' ? state.maxKm.toLocaleString('en-US') : '',
                    fromRange: state.maxPrice,
                    fromYear: state.yearFilter,
                    distance: state.distance
                  }
                }}
                  className="btn btn-primary"
                  id='searchHomeButton'
                >

                  Search</Link>
                <div className="ShowFilter-Head" >
                  <button role="button" onClick={props.changeShowMore}>
                    Show More Filters <i className="icon-arrow-down"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
     
</>)
}
export default memo(Banner);
