/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, memo, useState } from "react";
import { get_multi_vehicle_models } from '../../actions/homeActions'
import Select from 'react-select';
import { Scrollbars } from "react-custom-scrollbars";
import {
    get_vehicle_make
} from '../../actions/addPostActions'
import $ from 'jquery'
import { useDispatch, useSelector } from 'react-redux'

const MoreFilter = props => {
    const dispatch = useDispatch()
    const reduxState = useSelector(state=> {return {
        type_of_vehicles: state.homeReducer.type_of_vehicles,
        vehicle_make: state.adPostReducers.addPostReducer.vehicle_make,
        removeLoaderMake: state.adPostReducers.addPostReducer.removeLoaderMake,
        vehicle_models: state.homeReducer.vehicle_models,
        removeLoaderModel: state.homeReducer.removeLoaderModel,
        
    }})
    const [state, setState] = useState({
        vehicleCategory: null,
        vehicleMake: null,
        vehicleModel: null,
        categoryFilter: '',
        categoryFilterName: '',
        maxKm: '',
        maxPrice: '',
        yearFilter: '',
        makeFilter: '',
        modelFilter: '',
        modelFilterName: '',
        makeFilterName: '',
        location: props.location,
        type_of_vehicle: reduxState.type_of_vehicles !== undefined && reduxState.type_of_vehicles !== null ? reduxState.type_of_vehicles : [],
        vehicle_make: [],
        vehicle_makes: [],
        filter_vehicle_make: [],
        vehicle_model: [],
        vehicle_models: [],
        filter_vehicle_model: [],
        itemtitle: "",
        colors: [{ label: 'Green', value: 'Green', colorName: 'ColorGreen' }, { label: 'Yellow', value: 'Yellow', colorName: 'ColorYellow' }, { label: 'Orange', value: 'Orange', colorName: 'ColorOrange' }, { label: 'Purple', value: 'Purple', colorName: 'ColorPurple' }, { label: 'Blue', value: 'Blue', colorName: 'ColorBlue' }, { label: 'Silver', value: 'Silver', colorName: 'ColorSilver' }, { label: 'Black', value: 'Black', colorName: 'ColorBlack' }, { label: 'Red', value: 'Red', colorName: 'ColorRed' }, { label: 'Gold', value: 'Gold', colorName: 'ColorGold' }, { label: 'Grey', value: 'Grey', colorName: 'ColorGrey' }, { label: 'Biege', value: 'Biege', colorName: 'ColorBiege' }, { label: 'Brown', value: 'Brown', colorName: 'ColorBrown' }],
        vehicleOptions: reduxState.type_of_vehicles !== undefined && reduxState.type_of_vehicles !== null ? reduxState.type_of_vehicles.map(item => {
            return {
                value: item.id,
                label: item.name
            }
        }) : [],
        vehicleMakeOptions: [],
        vehicleModelOptions: [],
        color: null,
        vehicleColor: '',
        yearsDropDown: [],
        vehicleYear: '',
        distance: props.distance,
        selectedToYear: [],
        toYear: '',
        allCategory: true,
        allMake: true,
        allModels: true,
        allColor: true
    })
    useEffect(()=> {
        let currentYear = new Date().getFullYear() + 1;
        let earliestYear = 1900;
        let years = []
        while (currentYear >= earliestYear) {
            years.push({ label: `${currentYear}`, value: currentYear })
            currentYear -= 1;
        }
        setState({
            ...state,
            yearsDropDown: years
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
    }
    const toTitleCase = (str) => {
        return str.toLowerCase().replace(/(?:^|[\s-/])\w/g, function (match) {
            return match.toUpperCase();
        });
    }
    useEffect(()=> {
        if (reduxState.type_of_vehicles) {
            const typeOfVehicle = [];
            (reduxState.type_of_vehicles || []).map((item, index) => {
                typeOfVehicle.push({
                    value: item.id,
                    label: item.name
                })
            })
            setState({
                ...state,
                type_of_vehicle: reduxState.type_of_vehicles,
                vehicleOptions: typeOfVehicle
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduxState.type_of_vehicles])
    useEffect(()=> {
        if (state.categoryFilter) {
            dispatch(get_vehicle_make(state.categoryFilter))
            const categoryName = state.categoryFilter !== '' ? (state.type_of_vehicle || []).filter(item => item.id == state.categoryFilter).map(item => { return item.name })[0] == undefined ? '' : (state.type_of_vehicle || []).filter(item => item.id == state.categoryFilter).map(item => { return item.name })[0] : ''
            setState({
                ...state,
                categoryFilterName: categoryName,
                vehicleMakeOptions: [],
                vehicle_make: [],
                vehicle_makes: [],
                makeFilter: '',
                makeFilterName: '',
                vehicleMake: '',

            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.categoryFilter])
    useEffect(()=> {
        if (reduxState.vehicle_make) {
            setState({
                ...state,
                vehicle_makes: reduxState.vehicle_make.map(item => {
                    return {
                        value: item.id,
                        label: toTitleCase(item.make_name),
                        name: item.make_name,
                        mk_count: item.mk_count,
                        isChecked: false
                    }
                }),
                vehicleMakeOptions: reduxState.vehicle_make.map(item => {
                    return {
                        value: item.id,
                        label: toTitleCase(item.make_name),
                        name: item.make_name,
                        mk_count: item.mk_count
                    }
                }),
                vehicle_model: [],
                vehicleModelOptions: [],
                modelFilterName: '',
                modelFilter: '',
                vehicleModel: ''
            })
        }
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduxState.vehicle_make])
    useEffect(()=> {
        if (reduxState.vehicleMake ) {
            // const getIds = state.vehicleMake.map(item => { return item.value })
            const getIds = state.vehicleMake ? state.vehicleMake.value ? state.vehicleMake.value : '' : ''
            console.log(getIds)
            if (getIds) {
                dispatch(get_multi_vehicle_models({ list_of_ids: [getIds] }))
            }

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduxState.vehicleMake])
    useEffect(()=> {
        if (reduxState.vehicle_models) {
            setState({
                ...state,
                vehicle_model: reduxState.vehicle_models,
                vehicle_models: reduxState.vehicle_models.map(item => {
                    return {
                        value: item.id,
                        label: toTitleCase(item.model_make),
                        name: item.model_make,
                        md_count: item.md_count,
                        isChecked: (state.vehicleModel || []).filter(mod => Number(mod) === Number(item.id)).length === 0 ? false : true
                    }
                }),
                vehicleModelOptions: reduxState.vehicle_models.map(item => {
                    return {
                        value: item.id,
                        label: toTitleCase(item.model_make),
                        name: item.model_make,
                        md_count: item.md_count
                    }
                })
            })
        }
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduxState.vehicle_models])
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
      const  toggleGoogleMap = () => {
        window.$('#googleMapModelHome').modal('show')
    }
    const handleChangeSelect = (e, inputName, filterId, filterName) => {
        setState({
            ...state,
            [inputName]: e,
            [filterId]: e ? e.value ? e.value : '' : '',
            [filterName]: e ? e.label ? e.label : '' : '',
            allCategory: inputName === 'vehicleCategory' ? false : state.allCategory,
            allMake: inputName === 'vehicleMake' ? false : state.allMake,
            allModels: inputName === 'vehicleModel' ? false : state.allModels
        })
    }
    const  handleChangeSelectColor = (e, inputName, filterId, filterName) => {
        setState({
            ...state,
            [inputName]: e,
            [filterId]: e ? e.value ? e.value : '' : '',
            allColor: inputName === 'color' ? false : state.allColor
        })
    }
   const  handleChangeSelectVehicle = (e, inputName, filterId, filterName) => {
    setState({
        ...state,
        [inputName]: e,
        [filterId]: e ? e.value ? e.value : '' : '',
        [filterName]: e ? e.label ? e.label : '' : '',
        allCategory: inputName === 'vehicleCategory' ? false : state.allCategory,
        allMake: inputName === 'vehicleMake' ? false : state.allMake,
        allModels: inputName === 'vehicleModel' ? false : state.allModels
    })
    }
    const handleChangeSelectDate = (e, inputName, formName) => {
        setState({
            ...state,
            [inputName]: e,
            [formName]: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : '' : '',
        })
    }
    const selectAll = (name) => {
        if (name === 'categoryFilterName') {
            setState({
                ...state,
                allCategory: !state.allCategory,
                vehicleCategory: '',
                categoryFilter: '',
                categoryFilterName: '',
            })
        } else if (name === 'makeFilterName') {
            setState({
                ...state,
                allMake: !state.allMake,
                makeFilter: '',
                makeFilterName: '',
                vehicleMake: '',
                vehicle_model: [],
                vehicleModelOptions: [],
                modelFilterName: '',
                modelFilter: '',
                vehicleModel: '',
                vehicle_makes: state.vehicle_makes.map(item => {
                    return {
                        ...item,
                        isChecked: false
                    }
                })
            })
        } else if (name === 'modelFilterName') {
            setState({
                ...state,
                allModels: !state.allModels,
                modelFilterName: '',
                modelFilter: '',
                vehicleModel: '',
                vehicle_models: state.vehicle_models.map(item => {
                    return {
                        ...item,
                        isChecked: false
                    }
                })
            })
        } else if (name === 'vehicleColor') {
            setState({
                ...state,
                allColor: !state.allColor,
                color: null,
                vehicleColor: '',
                colors: state.colors.map(item => {
                    return {
                        ...item,
                        isChecked: false
                    }
                })
            })
        }

    }
    const formatOptionLabel = ({ value, label, colorName }) => (
        <div className="colors-manu"> <span className={colorName}></span>{label}</div>
    );
    const mobileMoreFilter = () => {
        $("body").css({ "overflow": "" });
        props.changeShowMore()
    }
    return (<>
          <section className="SectionBanner">
                    <div className="banner-filters-content-main">
                        <div className="banner-filters-content-inner">
                            <div className="col-md-12 col-sm-12 col-12">
                                <div className="NavBanner-Head">
                                    <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
                                </div>
                            </div>
                            <div className="LeftMenu-Container morefilter-mobile-view">
                                <div className="mobilesearch" onClick={mobileMoreFilter}><div className="cross-list-mobile-two" ></div></div>
                                <div className="morefilter-inner-mobile">
                                    <div className="accordion" id="accordionExample">
                                        <div className="card">
                                            <div className="card-header" id="headingTwo">
                                                <h2 className="mb-0">
                                                    <button
                                                        className="btn btn-link btn-block text-left collapsed"
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target="#collapseTwo"
                                                        aria-expanded="true"
                                                        aria-controls="collapseOne"
                                                    >
                                                        All Categories
                                                    </button>
                                                </h2>
                                            </div>
                                            <div
                                                id="collapseTwo"
                                                className="collapse"
                                                aria-labelledby="headingTwo"
                                                data-parent="#accordionExample"
                                            >
                                                <div className="card-body">
                                                    <div className={"filter-two-col filters-vehicle-type clearfix show"}>
                                                        <React.Fragment >
                                                            {(state.type_of_vehicle || []).map((item, index) => (
                                                                <div className="filters-inner-col" onClick={() => handleChangeSelectVehicle({ value: item.id, label: item.name }, 'vehicleCategory', 'categoryFilter', 'categoryFilterName')} key={index}>
                                                                    <div title={item.name} className={state.categoryFilterName === item.name ? 'vehicle-type-box active' : 'vehicle-type-box'} >
                                                                        <div className="vehicle-type-image">
                                                                            <img
                                                                                src={item.image_path}
                                                                                alt={item.name}
                                                                            />
                                                                        </div>
                                                                        <div className='vehicle-type-description'>
                                                                            <strong><span>({item.vt_count})</span></strong>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </React.Fragment>
                                                        <div className={state.allCategory === true ? "filters-inner-col active" : "filters-inner-col"} onClick={() => selectAll('categoryFilterName')}>
                                                            <div title={'View All'} className='vehicle-type-box'>
                                                                <div className="vehicle-type-image">
                                                                    { }
                                                                </div>
                                                                <div className='vehicle-type-description'>
                                                                    <strong>{'View All'}
                                                                    </strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingthree">
                                                <h2 className="mb-0">
                                                    <button
                                                        className="btn btn-link btn-block text-left collapsed"
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target="#collapsethree"
                                                        aria-expanded="true"
                                                        aria-controls="collapseOne"
                                                    >
                                                        Year
                                                    </button>
                                                </h2>
                                            </div>

                                            <div
                                                id="collapsethree"
                                                className="collapse"
                                                aria-labelledby="headingthree"
                                                data-parent="#accordionExample"
                                            >
                                                <div className="card-body">
                                                    <div className={"filter-two-col filters-vehicle-type clearfix show"}>
                                                        <React.Fragment >
                                                            <div className="filters-inner-col">
                                                                <label>From</label>
                                                                <Select
                                                                    isSearchable={false}
                                                                    className="banner-react-select-main"
                                                                    classNamePrefix="banner-react-select"
                                                                    closeMenuOnSelect
                                                                    options={state.fromYearDropDown}
                                                                    required
                                                                    name="yearFilter"
                                                                    value={state.yearFilter}
                                                                    onChange={(e) => handleChangeSelectDate(e, 'yearFilter', 'vehicleYear')}
                                                                />
                                                            </div>
                                                            <div className="filters-inner-col">
                                                                <label>To</label>
                                                                <Select
                                                                    isSearchable={false}
                                                                    className="banner-react-select-main"
                                                                    classNamePrefix="banner-react-select"
                                                                    closeMenuOnSelect
                                                                    options={state.yearsDropDown}
                                                                    required
                                                                    name="selectedToYear"
                                                                    value={state.selectedToYear}
                                                                    onChange={(e) => handleChangeSelectDate(e, 'selectedToYear', 'toYear')}
                                                                />
                                                            </div>
                                                        </React.Fragment>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="card">
                                            <div className="card-header" id="headingfour">
                                                <h2 className="mb-0">
                                                    <button
                                                        className="btn btn-link btn-block text-left collapsed"
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target="#collapsefour"
                                                        aria-expanded="true"
                                                        aria-controls="collapseOne"
                                                    >
                                                        Make
                                                    </button>
                                                </h2>
                                            </div>

                                            <div
                                                id="collapsefour"
                                                className="collapse"
                                                aria-labelledby="headingfour"
                                                data-parent="#accordionExample"
                                            >
                                                <div className="card-body">
                                                    {reduxState.removeLoaderMake === false ? (<div className="filters-preloader">
                                                        <div className="spinner"></div>
                                                    </div>) : null}
                                                    <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="MakeMenu-List filters-list">
                                                        {/* <h1>POPULAR MAKES</h1> */}
                                                        <ul>
                                                            <li onClick={() => selectAll('makeFilterName')} className={state.allMake === true ? 'active' : ''}>
                                                                <a >
                                                                    <span className="bullet"></span>
                                                                    {'All Makes'}
                                                                    {(reduxState.vehicle_make || []) !== undefined && (reduxState.vehicle_make || []) !== null && (reduxState.vehicle_make || []).length > 0 ? (reduxState.vehicle_make || [])[0] !== undefined && (reduxState.vehicle_make || [])[0] !== null ? (reduxState.vehicle_make || [])[0].total_makes !== undefined && (reduxState.vehicle_make || [])[0].total_makes !== null && Number((reduxState.vehicle_make || [])[0].total_makes) !== 0 ? <span>({(props.vehicle_make || [])[0].total_makes})</span> : <span>(0)</span> : <span></span> : <span></span>}
                                                                </a>
                                                            </li>
                                                            {(state.vehicle_makes || []).map((item, index) => {
                                                                return (
                                                                    <li key={index} onClick={() => handleChangeSelectVehicle({ value: item.value, label: item.label, name: item.name, mk_count: item.mk_count }, 'vehicleMake', 'makeFilter', 'makeFilterName')} className={Number(state.makeFilter) === Number(item.value) ? 'active' : ''}>
                                                                        <a >
                                                                            <span className="bullet"></span>
                                                                            {(item.label !== undefined && item.label !== null ? toTitleCase(item.label) : '')}{item.mk_count !== undefined && item.mk_count !== null && Number(item.mk_count) !== 0 ? <span>({item.mk_count})</span> : <span>(0)</span>}
                                                                        </a>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </Scrollbars>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingfive">
                                                <h2 className="mb-0">
                                                    <button
                                                        className="btn btn-link btn-block text-left collapsed"
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target="#collapsefive"
                                                        aria-expanded="true"
                                                        aria-controls="collapseOne"
                                                    >
                                                        Modal
                                                    </button>
                                                </h2>
                                            </div>

                                            <div
                                                id="collapsefive"
                                                className="collapse"
                                                aria-labelledby="headingfive"
                                                data-parent="#accordionExample"
                                            >
                                                <div className="card-body">
                                                    {reduxState.removeLoaderModel === false ? (<div className="filters-preloader">
                                                        <div className="spinner"></div>
                                                    </div>) : null}
                                                    <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                                                        <ul>
                                                            <li onClick={() => selectAll('modelFilterName')} className={state.allModels === true ? 'active' : ''} >
                                                                <a >
                                                                    <span className="bullet"></span>
                                                                    All
                                                                </a>
                                                            </li>
                                                            {(state.vehicle_models || []).map((item, index) => {
                                                                return (
                                                                    <li key={index} onClick={() => handleChangeSelectVehicle({ value: item.value, label: item.label, name: item.name, md_count: item.md_count }, 'vehicleModel', 'modelFilter', 'modelFilterName')} className={Number(state.modelFilter) === Number(item.value) ? 'active' : ''}>
                                                                        <a >
                                                                            <span className="bullet"></span>
                                                                            {(item.label !== undefined && item.label !== null ? toTitleCase(item.label) : '')}{item.md_count !== undefined && item.md_count !== null && Number(item.md_count) !== 0 ? <span>({item.md_count})</span> : <span>(0)</span>}

                                                                        </a>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </Scrollbars>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="card">
                                            <div className="card-header" id="headingsix">
                                                <h2 className="mb-0">
                                                    <button
                                                        className="btn btn-link btn-block text-left collapsed"
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target="#collapsesix"
                                                        aria-expanded="true"
                                                        aria-controls="collapseOne"
                                                    >
                                                        Color
                                                    </button>
                                                </h2>
                                            </div>

                                            <div
                                                id="collapsesix"
                                                className="collapse"
                                                aria-labelledby="headingsix"
                                                data-parent="#accordionExample"
                                            >
                                                <div className="card-body">
                                                    <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="MakeMenu-List filters-list">
                                                        {/* <h1>POPULAR MAKES</h1> */}
                                                        <ul>
                                                            <li onClick={() => selectAll('vehicleColor')} className={state.allColor === true ? 'active' : ''}>
                                                                <a >
                                                                    <span className="bullet"></span>
                                                                    {'All Color'}
                                                                </a>
                                                            </li>
                                                            {(state.colors || []).map((item, index) => {
                                                                return (
                                                                    <li key={index} onClick={() => handleChangeSelectVehicle({ value: item.value, label: item.label, colorName: item.colorName }, 'color', 'vehicleColor', 'vehicleColor')} className={(state.vehicleColor) === (item.value) ? 'active' : ''}>
                                                                        <a >
                                                                            <span className="bullet"></span>
                                                                            {(item.label !== undefined && item.label !== null ? toTitleCase(item.label) : '')}
                                                                        </a>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </Scrollbars>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mobile-location-input" onClick={toggleGoogleMap}>
                                            <label>Applicant Address</label>
                                            <input type="text" id="location1" name="location" placeholder="Start typing your address here"
                                                value={state.location !== undefined && state.location !== null && state.location !== '' ? state.location.split(',').slice(-3, -1)[0] + ", " + state.location.split(',').slice(-2, -1)[0].split(' ')[1] : ''}
                                                disabled style={{ cursor: 'pointer' }} />
                                            <i className="icon-subtract-icon"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="SearchFilter-Container more-filters clearfix">
                                <div className="showless-filter" onClick={props.changeShowMore} >
                                    <a role="button">Show less Filters <i className="fa fa-angle-up"></i></a>
                                </div>
                                <div className="hm-filters-row border-row clearfix">
                                    <div className="hm-filters-col all-categories">
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
                                            onChange={(e) => handleChangeSelectVehicle(e, 'vehicleCategory', 'categoryFilter', 'categoryFilterName')}
                                        />
                                    </div>
                                    <div className="hm-filters-col year">
                                        <div className="indexfilter-form">
                                            <Select
                                                placeholder="Year"
                                                isSearchable={false}
                                                className="banner-react-select-main"
                                                classNamePrefix="banner-react-select"
                                                closeMenuOnSelect
                                                options={state.yearsDropDown}
                                                required
                                                name='yearFilter'
                                                value={state.yearFilter}
                                                onChange={(e) => handleChangeSelect(e, 'yearFilter', 'vehicleYear', '')}
                                            />
                                        </div>
                                    </div>
                                    <div className="hm-filters-col makes">
                                        <div className="indexfilter-form">
                                            <Select
                                                placeholder="All Makes"
                                                isSearchable={false}
                                                className="banner-react-select-main"
                                                classNamePrefix="banner-react-select"
                                                closeMenuOnSelect={false}
                                                options={state.vehicleMakeOptions}
                                                required
                                                name='vehicleMake'
                                                value={state.vehicleMake}
                                                onChange={(e) => handleChangeSelect(e, 'vehicleMake', 'makeFilter', 'makeFilterName')}

                                            />
                                        </div>
                                    </div>
                                    <div className="hm-filters-col models">
                                        <div className="modalfilter-form">
                                            <Select
                                                placeholder="All Model"
                                                isSearchable={false}
                                                className="banner-react-select-main"
                                                classNamePrefix="banner-react-select"
                                                closeMenuOnSelect={false}
                                                options={state.vehicleModelOptions}
                                                required
                                                name='vehicleModel'
                                                value={state.vehicleModel}
                                                onChange={(e) => handleChangeSelect(e, 'vehicleModel', 'modelFilter', 'modelFilterName')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="hm-filters-row clearfix">
                                    <div className="hm-filters-col max-price">
                                        <div className="MaxPrice-form">
                                            <input type="text" id="maxPrice" name="maxPrice" value={state.maxPrice} placeholder="Max Price" onChange={handleOnChange} />
                                            <img src="assets/image/filters-max-price-icon.svg" alt="" />
                                        </div>
                                    </div>

                                    <div className="hm-filters-col max-km">
                                        <div className="MaxPrice-form">
                                            <input type="text" id="maxKm" name="maxKm" placeholder="Max KM" value={state.maxKm} onChange={handleOnChange} />
                                            <img src="assets/image/filters-max-km-icon.svg" alt="" />
                                        </div>
                                    </div>
                                    <div className="hm-filters-col colors">
                                        <Select
                                            placeholder="Color"
                                            isSearchable={false}
                                            formatOptionLabel={formatOptionLabel}
                                            className="banner-react-select-main"
                                            classNamePrefix="banner-react-select"
                                            closeMenuOnSelect={false}
                                            options={state.colors}
                                            required
                                            value={state.color}
                                            onChange={(e) => handleChangeSelectColor(e, 'color', 'vehicleColor', 'colors')}
                                        />
                                    </div>
                                    <div className="hm-filters-col location" >
                                        <div className="filteradd-location" onClick={toggleGoogleMap} >
                                            <i className="icon-subtract-icon" ></i>
                                            <input type="text" id="location" name="location" placeholder="Add Location" onChange={handleOnChange}
                                                value={state.location !== undefined && state.location !== null && state.location !== '' ? state.location.split(',').slice(-3, -1)[0] && state.location.split(',').slice(-2, -1)[0].split(' ')[1] ? state.location.split(',').slice(-3, -1)[0] + ", " + state.location.split(',').slice(-2, -1)[0].split(' ')[1] : state.location : ''}
                                                disabled style={{ cursor: 'pointer' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
    </>)
}
export default memo(MoreFilter);