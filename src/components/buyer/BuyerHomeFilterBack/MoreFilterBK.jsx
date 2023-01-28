import React, { Component } from "react";
import { Link } from "react-router-dom"
import { get_multi_vehicle_models } from '../../actions/homeActions'
import { connect } from 'react-redux'
import Select from 'react-select';
import { Scrollbars } from "react-custom-scrollbars";
import {
    get_vehicle_make
} from '../../actions/addPostActions'
import $ from 'jquery'
class MoreFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            location: this.props.location,
            type_of_vehicle: this.props.type_of_vehicles !== undefined && this.props.type_of_vehicles !== null ? this.props.type_of_vehicles : [],
            vehicle_make: [],
            vehicle_makes: [],
            filter_vehicle_make: [],
            vehicle_model: [],
            vehicle_models: [],
            filter_vehicle_model: [],
            itemtitle: "",
            colors: [{ label: 'Green', value: 'Green', colorName: 'ColorGreen' }, { label: 'Yellow', value: 'Yellow', colorName: 'ColorYellow' }, { label: 'Orange', value: 'Orange', colorName: 'ColorOrange' }, { label: 'Purple', value: 'Purple', colorName: 'ColorPurple' }, { label: 'Blue', value: 'Blue', colorName: 'ColorBlue' }, { label: 'Silver', value: 'Silver', colorName: 'ColorSilver' }, { label: 'Black', value: 'Black', colorName: 'ColorBlack' }, { label: 'Red', value: 'Red', colorName: 'ColorRed' }, { label: 'Gold', value: 'Gold', colorName: 'ColorGold' }, { label: 'Grey', value: 'Grey', colorName: 'ColorGrey' }, { label: 'Biege', value: 'Biege', colorName: 'ColorBiege' }, { label: 'Brown', value: 'Brown', colorName: 'ColorBrown' }],
            vehicleOptions: this.props.type_of_vehicles !== undefined && this.props.type_of_vehicles !== null ? this.props.type_of_vehicles.map(item => {
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
            distance: this.props.distance,
            selectedToYear: [],
            toYear: '',
            allCategory: true,
            allMake: true,
            allModels: true,
            allColor: true
        }
    }
    componentDidMount() {
        let currentYear = new Date().getFullYear() + 1;
        let earliestYear = 1900;
        let years = []
        while (currentYear >= earliestYear) {
            years.push({ label: `${currentYear}`, value: currentYear })
            currentYear -= 1;
        }
        this.setState({
            ...this.state,
            yearsDropDown: years
        })
    }
    handleOnChange = (e) => {
        const { name, value } = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    serachFilter = () => {
        const data = {
            categoryFilter: this.state.categoryFilter,
            colorFilter: this.state.vehicleColor,
            maxKm: this.state.maxKm !== null && this.state.maxKm !== '' ? this.state.maxKm.toLocaleString('en-US') : (0).toLocaleString('en-US'),
            maxPrice: this.state.maxPrice,
            yearFilter: this.state.vehicleYear,
            makeFilter: this.state.makeFilter,
            modelFilter: this.state.modelFilter,
            location: this.state.location
        }
    }
    toTitleCase = (str) => {
        return str.toLowerCase().replace(/(?:^|[\s-/])\w/g, function (match) {
            return match.toUpperCase();
        });
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
            this.props.get_vehicle_make(this.state.categoryFilter)
            const categoryName = this.state.categoryFilter !== '' ? (this.state.type_of_vehicle || []).filter(item => item.id == this.state.categoryFilter).map(item => { return item.name })[0] == undefined ? '' : (this.state.type_of_vehicle || []).filter(item => item.id == this.state.categoryFilter).map(item => { return item.name })[0] : ''
            this.setState({
                ...this.state,
                categoryFilterName: categoryName,
                vehicleMakeOptions: [],
                vehicle_make: [],
                vehicle_makes: [],
                makeFilter: '',
                makeFilterName: '',
                vehicleMake: '',

            })
        }
        if (prevProps.vehicle_make !== this.props.vehicle_make && this.props.vehicle_make) {
            this.setState({
                ...this.state,
                vehicle_makes: this.props.vehicle_make.map(item => {
                    return {
                        value: item.id,
                        label: this.toTitleCase(item.make_name),
                        name: item.make_name,
                        mk_count: item.mk_count,
                        isChecked: false
                    }
                }),
                vehicleMakeOptions: this.props.vehicle_make.map(item => {
                    return {
                        value: item.id,
                        label: this.toTitleCase(item.make_name),
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
        if (prevState.vehicleMake !== this.state.vehicleMake && this.state.vehicleMake) {
            // const getIds = this.state.vehicleMake.map(item => { return item.value })
            const getIds = this.state.vehicleMake ? this.state.vehicleMake.value ? this.state.vehicleMake.value : '' : ''
            console.log(getIds)
            if (getIds) {
                this.props.get_multi_vehicle_models({ list_of_ids: [getIds] })
            }

        }
        if (prevProps.vehicle_models !== this.props.vehicle_models && this.props.vehicle_models !== undefined) {
            this.setState({
                ...this.state,
                vehicle_model: this.props.vehicle_models,
                vehicle_models: this.props.vehicle_models.map(item => {
                    return {
                        value: item.id,
                        label: this.toTitleCase(item.model_make),
                        name: item.model_make,
                        md_count: item.md_count,
                        isChecked: (this.state.vehicleModel || []).filter(mod => Number(mod) === Number(item.id)).length === 0 ? false : true
                    }
                }),
                vehicleModelOptions: this.props.vehicle_models.map(item => {
                    return {
                        value: item.id,
                        label: this.toTitleCase(item.model_make),
                        name: item.model_make,
                        md_count: item.md_count
                    }
                })
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
            [filterId]: e ? e.value ? e.value : '' : '',
            [filterName]: e ? e.label ? e.label : '' : '',
            allCategory: inputName === 'vehicleCategory' ? false : this.state.allCategory,
            allMake: inputName === 'vehicleMake' ? false : this.state.allMake,
            allModels: inputName === 'vehicleModel' ? false : this.state.allModels
        })
    }
    handleChangeSelectColor = (e, inputName, filterId, filterName) => {
        this.setState({
            ...this.state,
            [inputName]: e,
            [filterId]: e ? e.value ? e.value : '' : '',
            allColor: inputName === 'color' ? false : this.state.allColor
        })
    }

    handleChangeSelectMobile = (e, inputName, filterId, filterName) => {
        const existInput = this.state[inputName] ? this.state[inputName].filter(item => Number(item.value) === Number(e.value)) : []
        this.setState({
            ...this.state,
            [inputName]: (existInput || []).length > 0 ? this.state[inputName].filter(item => Number(item.value) !== Number(e.value)) : [...this.state[inputName], e],
            [filterId]: e ? e.value ? (existInput || []).length > 0 ? this.state[filterId].filter(item => Number(item) !== Number(e.value)) : [...this.state[filterId], e.value] : '' : '',
            [filterName]: this.state[filterName].slice().map(item => {
                if (Number(item.value) === Number(e.value)) {
                    return {
                        ...item,
                        isChecked: !item.isChecked
                    }
                }
                return item
            }),
            allCategory: inputName === 'vehicleCategory' ? false : this.state.allCategory,
            allMake: inputName === 'vehicleMake' ? false : this.state.allMake,
            allModels: inputName === 'vehicleModel' ? false : this.state.allModels
        })
    }
    handleChangeSelectMobileColor = (e, inputName, filterId, filterName) => {
        const existInput = this.state[inputName] ? this.state[inputName].filter(item => Number(item.value) === Number(e.value)) : []
        this.setState({
            ...this.state,
            [inputName]: (existInput || []).length > 0 ? this.state[inputName].filter(item => Number(item.value) !== Number(e.value)) : [...(this.state[inputName] || []), e],
            [filterName]: this.state[filterName].slice().map(item => {
                if ((item.value) === (e.value)) {
                    return {
                        ...item,
                        isChecked: !item.isChecked
                    }
                }
                return item
            }),
            allColor: inputName === 'vehicleColor' ? false : this.state.allColor
        })
    }
    handleChangeSelectVehicle = (e, inputName, filterId, filterName) => {
        this.setState({
            ...this.state,
            [inputName]: e,
            [filterId]: e ? e.value ? e.value : '' : '',
            [filterName]: e ? e.label ? e.label : '' : '',
            allCategory: inputName === 'vehicleCategory' ? false : this.state.allCategory,
            allMake: inputName === 'vehicleMake' ? false : this.state.allMake,
            allModels: inputName === 'vehicleModel' ? false : this.state.allModels
        })
    }
    handleChangeSelectDate = (e, inputName, formName) => {
        this.setState({
            ...this.state,
            [inputName]: e,
            [formName]: e !== undefined && e !== null ? e.value !== undefined && e.value !== null ? e.value : '' : '',
        })
    }
    selectAll = (name) => {
        if (name === 'categoryFilterName') {
            this.setState({
                ...this.state,
                allCategory: !this.state.allCategory,
                vehicleCategory: '',
                categoryFilter: '',
                categoryFilterName: '',
            })
        } else if (name === 'makeFilterName') {
            this.setState({
                ...this.state,
                allMake: !this.state.allMake,
                makeFilter: '',
                makeFilterName: '',
                vehicleMake: '',
                vehicle_model: [],
                vehicleModelOptions: [],
                modelFilterName: '',
                modelFilter: '',
                vehicleModel: '',
                vehicle_makes: this.state.vehicle_makes.map(item => {
                    return {
                        ...item,
                        isChecked: false
                    }
                })
            })
        } else if (name === 'modelFilterName') {
            this.setState({
                ...this.state,
                allModels: !this.state.allModels,
                modelFilterName: '',
                modelFilter: '',
                vehicleModel: '',
                vehicle_models: this.state.vehicle_models.map(item => {
                    return {
                        ...item,
                        isChecked: false
                    }
                })
            })
        } else if (name === 'vehicleColor') {
            this.setState({
                ...this.state,
                allColor: !this.state.allColor,
                color: null,
                vehicleColor: '',
                colors: this.state.colors.map(item => {
                    return {
                        ...item,
                        isChecked: false
                    }
                })
            })
        }

    }
    formatOptionLabel = ({ value, label, colorName }) => (
        <div className="colors-manu"> <span className={colorName}></span>{label}</div>
    );
    mobileMoreFilter = () => {
        $("body").css({ "overflow": "" });
        this.props.changeShowMore()
    }
    render() {
        console.log(this.state, 'More Filters')
        const data = {
            // location: this.state.location, search: this.state.search, categoryFilterName: this.state.categoryFilterName,
            // color: this.state.color ? (this.state.color || []).map(item => { return item.value }) : '',
            // fromKilometer: this.state.maxKm !== null && this.state.maxKm !== '' ? this.state.maxKm.toLocaleString('en-US') : '',
            // fromRange: this.state.maxPrice,
            // fromYear: this.state.vehicleYear,
            // makeFilterName: this.state.vehicleMake ? ((this.state.vehicleMake || []).map(item => { return { name: item.name, id: item.value } })) : '',
            // modalFilterName: this.state.vehicleModel ? ((this.state.vehicleModel || []).map(item => { return { name: item.name, id: item.value } })) : '',
            // category: this.state.categoryFilter,
            // latitude: this.props.latitude,
            // longitude: this.props.longitude,
            // vehicleModel: this.state.vehicleModel ? ((this.state.vehicleModel || []).map(item => { return item.value })) : '',
            // vehicleMake: this.state.vehicleMake ? ((this.state.vehicleMake || []).map(item => { return item.value })) : '',
            // distance: this.state.distance
        }
        return (
            <React.Fragment>
                <section className="SectionBanner">
                    <div className="banner-filters-content-main">
                        <div className="banner-filters-content-inner">

                            <div className="col-md-12 col-sm-12 col-12">
                                <div className="NavBanner-Head">
                                    <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
                                </div>

                            </div>

                            <div className="LeftMenu-Container morefilter-mobile-view">

                                <div className="mobilesearch" onClick={this.mobileMoreFilter}><div className="cross-list-mobile-two" ></div></div>

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
                                                            {(this.state.type_of_vehicle || []).map((item, index) => (
                                                                <div className="filters-inner-col" onClick={() => this.handleChangeSelectVehicle({ value: item.id, label: item.name }, 'vehicleCategory', 'categoryFilter', 'categoryFilterName')} key={index}>
                                                                    <div title={item.name} className={this.state.categoryFilterName === item.name ? 'vehicle-type-box active' : 'vehicle-type-box'} >
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
                                                        <div className={this.state.allCategory === true ? "filters-inner-col active" : "filters-inner-col"} onClick={() => this.selectAll('categoryFilterName')}>
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
                                                                    options={this.state.fromYearDropDown}
                                                                    required
                                                                    name="yearFilter"
                                                                    value={this.state.yearFilter}
                                                                    onChange={(e) => this.handleChangeSelectDate(e, 'yearFilter', 'vehicleYear')}
                                                                />
                                                            </div>
                                                            <div className="filters-inner-col">
                                                                <label>To</label>
                                                                <Select
                                                                    isSearchable={false}
                                                                    className="banner-react-select-main"
                                                                    classNamePrefix="banner-react-select"
                                                                    closeMenuOnSelect
                                                                    options={this.state.yearsDropDown}
                                                                    required
                                                                    name="selectedToYear"
                                                                    value={this.state.selectedToYear}
                                                                    onChange={(e) => this.handleChangeSelectDate(e, 'selectedToYear', 'toYear')}
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
                                                    {this.props.removeLoaderMake === false ? (<div className="filters-preloader">
                                                        <div className="spinner"></div>
                                                    </div>) : null}
                                                    <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="MakeMenu-List filters-list">
                                                        {/* <h1>POPULAR MAKES</h1> */}
                                                        <ul>
                                                            <li onClick={() => this.selectAll('makeFilterName')} className={this.state.allMake === true ? 'active' : ''}>
                                                                <a >
                                                                    <span className="bullet"></span>
                                                                    {'All Makes'}
                                                                    {(this.props.vehicle_make || []) !== undefined && (this.props.vehicle_make || []) !== null && (this.props.vehicle_make || []).length > 0 ? (this.props.vehicle_make || [])[0] !== undefined && (this.props.vehicle_make || [])[0] !== null ? (this.props.vehicle_make || [])[0].total_makes !== undefined && (this.props.vehicle_make || [])[0].total_makes !== null && Number((this.props.vehicle_make || [])[0].total_makes) !== 0 ? <span>({(this.props.vehicle_make || [])[0].total_makes})</span> : <span>(0)</span> : <span></span> : <span></span>}
                                                                </a>
                                                            </li>
                                                            {(this.state.vehicle_makes || []).map((item, index) => {
                                                                return (
                                                                    <li key={index} onClick={() => this.handleChangeSelectVehicle({ value: item.value, label: item.label, name: item.name, mk_count: item.mk_count }, 'vehicleMake', 'makeFilter', 'makeFilterName')} className={Number(this.state.makeFilter) === Number(item.value) ? 'active' : ''}>
                                                                        <a >
                                                                            <span className="bullet"></span>
                                                                            {(item.label !== undefined && item.label !== null ? this.toTitleCase(item.label) : '')}{item.mk_count !== undefined && item.mk_count !== null && Number(item.mk_count) !== 0 ? <span>({item.mk_count})</span> : <span>(0)</span>}
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
                                                    {this.props.removeLoaderModel === false ? (<div className="filters-preloader">
                                                        <div className="spinner"></div>
                                                    </div>) : null}
                                                    <Scrollbars autoHeight autoHeightMin="100%" autoHeightMax="374px" className="model-List filters-list">
                                                        <ul>
                                                            <li onClick={() => this.selectAll('modelFilterName')} className={this.state.allModels === true ? 'active' : ''} >
                                                                <a >
                                                                    <span className="bullet"></span>
                                                                    All
                                                                </a>
                                                            </li>
                                                            {(this.state.vehicle_models || []).map((item, index) => {
                                                                return (
                                                                    <li key={index} onClick={() => this.handleChangeSelectVehicle({ value: item.value, label: item.label, name: item.name, md_count: item.md_count }, 'vehicleModel', 'modelFilter', 'modelFilterName')} className={Number(this.state.modelFilter) === Number(item.value) ? 'active' : ''}>
                                                                        <a >
                                                                            <span className="bullet"></span>
                                                                            {(item.label !== undefined && item.label !== null ? this.toTitleCase(item.label) : '')}{item.md_count !== undefined && item.md_count !== null && Number(item.md_count) !== 0 ? <span>({item.md_count})</span> : <span>(0)</span>}

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
                                                            <li onClick={() => this.selectAll('vehicleColor')} className={this.state.allColor === true ? 'active' : ''}>
                                                                <a >
                                                                    <span className="bullet"></span>
                                                                    {'All Color'}
                                                                </a>
                                                            </li>
                                                            {(this.state.colors || []).map((item, index) => {
                                                                return (
                                                                    <li key={index} onClick={() => this.handleChangeSelectVehicle({ value: item.value, label: item.label, colorName: item.colorName }, 'color', 'vehicleColor', 'vehicleColor')} className={(this.state.vehicleColor) === (item.value) ? 'active' : ''}>
                                                                        <a >
                                                                            <span className="bullet"></span>
                                                                            {(item.label !== undefined && item.label !== null ? this.toTitleCase(item.label) : '')}
                                                                        </a>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </Scrollbars>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mobile-location-input" onClick={this.toggleGoogleMap}>
                                            <label>Applicant Address</label>
                                            <input type="text" id="location1" name="location" placeholder="Start typing your address here"
                                                value={this.state.location !== undefined && this.state.location !== null && this.state.location !== '' ? this.state.location.split(',').slice(-3, -1)[0] + ", " + this.state.location.split(',').slice(-2, -1)[0].split(' ')[1] : ''}
                                                disabled style={{ cursor: 'pointer' }} />
                                            <i className="icon-subtract-icon"></i>

                                        </div>

                                        <div className="mobile-location-input">
                                            <Link to={{
                                                pathname: "/Ad-post/list", query: data
                                            }}
                                                id='searchHomeButton'
                                            >
                                                <button type="button">Search</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="SearchFilter-Container more-filters clearfix">
                                <div className="showless-filter" onClick={this.props.changeShowMore} >
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
                                            options={this.state.vehicleOptions}
                                            required
                                            name="vehicleCategory"
                                            value={this.state.vehicleCategory}
                                            onChange={(e) => this.handleChangeSelectVehicle(e, 'vehicleCategory', 'categoryFilter', 'categoryFilterName')}
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
                                                options={this.state.yearsDropDown}
                                                required
                                                name='yearFilter'
                                                value={this.state.yearFilter}
                                                onChange={(e) => this.handleChangeSelect(e, 'yearFilter', 'vehicleYear', '')}
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
                                                options={this.state.vehicleMakeOptions}
                                                required
                                                name='vehicleMake'
                                                value={this.state.vehicleMake}
                                                onChange={(e) => this.handleChangeSelect(e, 'vehicleMake', 'makeFilter', 'makeFilterName')}

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
                                                options={this.state.vehicleModelOptions}
                                                required
                                                name='vehicleModel'
                                                value={this.state.vehicleModel}
                                                onChange={(e) => this.handleChangeSelect(e, 'vehicleModel', 'modelFilter', 'modelFilterName')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="hm-filters-row clearfix">

                                    <div className="hm-filters-col max-price">
                                        <div className="MaxPrice-form">
                                            <input type="text" id="maxPrice" name="maxPrice" value={this.state.maxPrice} placeholder="Max Price" onChange={this.handleOnChange} />
                                            <img src="assets/image/filters-max-price-icon.svg" alt="" />
                                        </div>
                                    </div>

                                    <div className="hm-filters-col max-km">
                                        <div className="MaxPrice-form">
                                            <input type="text" id="maxKm" name="maxKm" placeholder="Max KM" value={this.state.maxKm} onChange={this.handleOnChange} />
                                            <img src="assets/image/filters-max-km-icon.svg" alt="" />
                                        </div>
                                    </div>

                                    <div className="hm-filters-col colors">
                                        <Select
                                            placeholder="Color"
                                            isSearchable={false}
                                            formatOptionLabel={this.formatOptionLabel}
                                            className="banner-react-select-main"
                                            classNamePrefix="banner-react-select"
                                            closeMenuOnSelect={false}
                                            options={this.state.colors}
                                            required
                                            value={this.state.color}
                                            onChange={(e) => this.handleChangeSelectColor(e, 'color', 'vehicleColor', 'colors')}
                                        />
                                    </div>

                                    <div className="hm-filters-col location" >
                                        <div className="filteradd-location" onClick={this.toggleGoogleMap} >
                                            <i className="icon-subtract-icon" ></i>
                                            <input type="text" id="location" name="location" placeholder="Add Location" onChange={this.handleOnChange}
                                                value={this.state.location !== undefined && this.state.location !== null && this.state.location !== '' ? this.state.location.split(',').slice(-3, -1)[0] && this.state.location.split(',').slice(-2, -1)[0].split(' ')[1] ? this.state.location.split(',').slice(-3, -1)[0] + ", " + this.state.location.split(',').slice(-2, -1)[0].split(' ')[1] : this.state.location : ''}
                                                disabled style={{ cursor: 'pointer' }}
                                            />
                                        </div>

                                        <div className="filteradd-location SearchBtn">
                                            <Link to={{
                                                pathname: "/Ad-post/list", query: data
                                            }}
                                                id='searchHomeButton'
                                            >
                                                <button type="button">Search</button>
                                            </Link>
                                        </div>


                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </React.Fragment >
        );
    }
}
const actionCreators = {
    get_vehicle_make: get_vehicle_make,
    get_multi_vehicle_models: get_multi_vehicle_models,
};
const mapStateToProps = (state) => {
    return {
        post_list_filters: state.adPostReducers.listPostReducer.post_list_filters,
        type_of_vehicles: state.homeReducer.type_of_vehicles,
        removeLoaderTrims: state.adPostReducers.addPostReducer.removeLoaderTrims,
        vehicle_make: state.adPostReducers.addPostReducer.vehicle_make,
        removeLoaderMake: state.adPostReducers.addPostReducer.removeLoaderMake,
        vehicle_models: state.homeReducer.vehicle_models,
        removeLoaderModel: state.homeReducer.removeLoaderModel,
        showloaderValues: state.adPostReducers.listPostReducer.showloaderValues,
    }
}
export default connect(mapStateToProps, actionCreators)(MoreFilter);
//  pathname: "/Ad-post/list", query: {
//                                                     location: this.state.location, search: this.state.search, categoryFilterName: this.state.categoryFilterName,
//                                                     color: this.state.vehicleColor,
//                                                     fromKilometer: this.state.maxKm !== null && this.state.maxKm !== '' ? this.state.maxKm.toLocaleString('en-US') : '',
//                                                     // (0).toLocaleString('en-US')
//                                                     fromRange: this.state.maxPrice,
//                                                     fromYear: this.state.vehicleYear,
//                                                     makeFilterName: this.state.makeFilterName,
//                                                     modalFilterName: this.state.modelFilterName,
//                                                     category: this.state.categoryFilter,
//                                                     latitude: this.state.latitude,
//                                                     longitude: this.state.longitude,
//                                                     vehicleModel: this.state.modelFilter,
//                                                     vehicleMake: this.state.makeFilter,
//                                                     distance: this.state.distance
//                                                 }