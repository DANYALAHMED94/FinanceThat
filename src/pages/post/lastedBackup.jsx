import React, { Component } from "react";
import $ from "jquery";
import { connect } from 'react-redux';
import {
	get_vehicle_type,
	get_vehicle_make,
	get_vehicle_make,
	get_vehicle_body_type,
	get_vehicle_fuel_type,
	get_vehicle_drive_train,
	get_vehicle_feature,
	toggle_vehicle_features,
	create_ad_post
} from '../../actions/addPostActions'
import Dropzone from 'react-dropzone';
import AsyncSelect from 'react-select/async';
import SimpleReactValidator from 'simple-react-validator';
import Select from 'react-select';
import Geocode from "react-geocode";
import NumberFormat from 'react-number-format';

// note: you don't need the whole path to node_modules.. just the package name
window.jQuery = $;
// dynamically require owl
require("owl.carousel");

// function runAfterElementExists(jquery_selector, callback) {
// 	$.noConflict();
// 	var checker = window.setInterval(function () {
// 		//if one or more elements have been yielded by jquery
// 		//using this selector
// 		if ($(jquery_selector).length) {
// 			//stop checking for the existence of this element
// 			clearInterval(checker);
// 			var owl = $(".owl-carousel");
// 			var owlInstance = owl.data('owlCarousel');

// 			// if instance is existing
// 			if (owlInstance != null)
// 				owlInstance.reinit();

// 			owl.owlCarousel({
// 				loop: false,
// 				nav: false,
// 				dots: true,
// 				center: true,
// 				touchDrag: false,
// 				mouseDrag: false,
// 				rewind: false,
// 				slideSpeed: 0,
// 				navContainer: "controls-class",
// 				animateIn: "slideInUp",
// 				margin: 10,
// 				responsive: {
// 					0: {
// 						items: 1,
// 					},
// 					600: {
// 						items: 1,
// 					},
// 					960: {
// 						items: 1,
// 					},
// 					1200: {
// 						items: 1,
// 					},
// 				},

// 				URLhashListener: true,
// 				autoplayHoverPause: true,
// 				startPosition: "URLHash",
// 			});
// 			owl.on("mousewheel", ".owl-stage", function (e) {
// 				if (e.originalEvent.wheelDelta > 0) {
// 					$('.owl-carousel').trigger('refresh.owl.carousel');
// 					owl.trigger("next.owl");

// 				} else {
// 					$('.owl-carousel').trigger('refresh.owl.carousel');
// 					owl.trigger("prev.owl");
// 				}
// 				e.preventDefault();
// 			});
// 			$('#btn').on('click', function () {
// 				// alert('hello')
// 				$('.owl-carousel').trigger('refresh.owl.carousel');
// 				owl.trigger("prev.owl");
// 			});
// 			//call the passed in function via the parameter above
// 			callback();
// 		}
// 	}, 200); //I usually check 5 times per second
// }

// //this is an example place in your code where you would like to
// //start checking whether the target element exists
// //I have used a class below, but you can use any jQuery selector
// runAfterElementExists(".owl-carousel", function () {
// 	//any code here will run after the element is found to exist
// 	//and the interval has been deleted
// });

// $(document).ready(function () {
// 	if ($('.owl-carousel').length) {
// 		//stop checking for the existence of this element
// 		// clearInterval(checker);
// 		var owl = $(".owl-carousel");
// 		var owlInstance = owl.data('owlCarousel');

// 		// if instance is existing
// 		if (owlInstance != null)
// 			owlInstance.reinit();

// 		owl.owlCarousel({
// 			loop: false,
// 			nav: false,
// 			dots: true,
// 			center: true,
// 			touchDrag: false,
// 			mouseDrag: false,
// 			rewind: false,
// 			slideSpeed: 0,
// 			navContainer: "controls-class",
// 			animateIn: "slideInUp",
// 			margin: 10,
// 			responsive: {
// 				0: {
// 					items: 1,
// 				},
// 				600: {
// 					items: 1,
// 				},
// 				960: {
// 					items: 1,
// 				},
// 				1200: {
// 					items: 1,
// 				},
// 			},

// 			URLhashListener: true,
// 			autoplayHoverPause: true,
// 			startPosition: "URLHash",
// 		});
// 		owl.on("mousewheel", ".owl-stage", function (e) {
// 			if (e.originalEvent.wheelDelta > 0) {
// 				$('.owl-carousel').trigger('refresh.owl.carousel');
// 				owl.trigger("next.owl");

// 			} else {
// 				$('.owl-carousel').trigger('refresh.owl.carousel');
// 				owl.trigger("prev.owl");
// 			}
// 			e.preventDefault();
// 		});
// 		$('#btn').on('click', function () {
// 			// alert('hello')
// 			$('.owl-carousel').trigger('refresh.owl.carousel');
// 			owl.trigger("prev.owl");
// 		});
// 		//call the passed in function via the parameter above
// 		// callback();
// 	}
// })

class AddPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			location: "",
			featureName: "",
			previousAccident: "",
			previousOwner: "",
			color: "",
			cylinder: "",
			drivetrain: "",
			fuelType: "",
			transmission: "",
			seating: "",
			bodyType: "",
			price: "",
			kilometer: "",
			selectCondition: "",
			selectYear: "",
			selectTrim: "",
			trimName: "",
			otherTrim: "",
			selectModel: "",
			otherModel: "",
			modelName: "",
			typeOfVehicle: "",
			makeName: "",
			otherMake: "",
			selectedBoost: "",
			stepBoost: 1,
			checkPayment: "",
			cardCVC: "",
			cardExpirDate: "",
			cardNumber: "",
			selectVehicleMake: '',
			files: [],
			preViewFiles: [],
			hardCodeInt: 1,
			nullState: null,
			locationValues: [],
			longitude: '',
			latitude: '',
			locationName: '',
			user_id: this.props.user !== null && this.props.user !== undefined ? this.props.user.user_id : ''

		};
		this.validator = new SimpleReactValidator();
	}


	componentDidMount() {
		// runAfterElementExists(".owl-carousel", function () {
		// });
		$(document).ready(function () {
			if ($('.owl-carousel').length) {
				//stop checking for the existence of this element
				// clearInterval(checker);
				var owl = $(".owl-carousel");
				var owlInstance = owl.data('owlCarousel');

				// if instance is existing
				if (owlInstance != null)
					owlInstance.reinit();

				owl.owlCarousel({
					loop: false,
					nav: false,
					dots: true,
					center: true,
					touchDrag: false,
					mouseDrag: false,
					rewind: false,
					slideSpeed: 0,
					navContainer: "controls-class",
					animateIn: "slideInUp",
					margin: 10,
					responsive: {
						0: {
							items: 1,
						},
						600: {
							items: 1,
						},
						960: {
							items: 1,
						},
						1200: {
							items: 1,
						},
					},

					URLhashListener: true,
					autoplayHoverPause: true,
					startPosition: "URLHash",
				});
				owl.on("mousewheel", ".owl-stage", function (e) {
					if (e.originalEvent.wheelDelta > 0) {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger("next.owl");

					} else {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger("prev.owl");
					}
					e.preventDefault();
				});
				$('#btn').on('click', function () {
					// alert('hello')
					$('.owl-carousel').trigger('refresh.owl.carousel');
					owl.trigger("prev.owl");
				});
				//call the passed in function via the parameter above
				// callback();
			}
		})
		this.props.get_vehicle_type()
		this.props.get_vehicle_fuel_type()
		this.props.get_vehicle_drive_train()
		this.props.get_vehicle_feature()
		// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
		Geocode.setApiKey("AIzaSyBDXs8HHpZSRxd1vJapwzON64a_vmjpn_4");

		// set response language. Defaults to english.
		Geocode.setLanguage("en");

		// set response region. Its optional.
		// A Geocoding request with region=es (Spain) will return the Spanish city.
		Geocode.setRegion("es");

		// Enable or disable logs. Its optional.
		Geocode.enableDebug();

	}

	changeStep = (e) => {
		this.setState({
			...this.state,
			step: e,
			stepBoost: e == 4 ? 1 : 1
		});

		if (e == 1) {
			// runAfterElementExists(".owl-carousel", function () {
			// });
			$(document).ready(function () {
				if ($('.owl-carousel').length) {
					//stop checking for the existence of this element
					// clearInterval(checker);
					var owl = $(".owl-carousel");
					var owlInstance = owl.data('owlCarousel');

					// if instance is existing
					if (owlInstance != null)
						owlInstance.reinit();

					owl.owlCarousel({
						loop: false,
						nav: false,
						dots: true,
						center: true,
						touchDrag: false,
						mouseDrag: false,
						rewind: false,
						slideSpeed: 0,
						navContainer: "controls-class",
						animateIn: "slideInUp",
						margin: 10,
						responsive: {
							0: {
								items: 1,
							},
							600: {
								items: 1,
							},
							960: {
								items: 1,
							},
							1200: {
								items: 1,
							},
						},

						URLhashListener: true,
						autoplayHoverPause: true,
						startPosition: "URLHash",
					});
					owl.on("mousewheel", ".owl-stage", function (e) {
						if (e.originalEvent.wheelDelta > 0) {
							$('.owl-carousel').trigger('refresh.owl.carousel');
							owl.trigger("next.owl");

						} else {
							$('.owl-carousel').trigger('refresh.owl.carousel');
							owl.trigger("prev.owl");
						}
						e.preventDefault();
					});
					$('#btn').on('click', function () {
						// alert('hello')

						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger("prev.owl");
					});
					//call the passed in function via the parameter above
					// callback();
				}
			})
		}
	};

	handleOnChange = (e) => {
		const { name, value } = e.target;
		document.getElementById("btn").click();
		this.setState({
			...this.state,
			[name]: value,

		});
	};

	hanldeOnChangeTypeOfVehicle = (e) => {
		const { name, value } = e.target;
		document.getElementById("btn").click();
		this.setState({
			...this.state,
			[name]: value,
		});
	};

	handleOnClick = (name, value) => {
		console.log(name, value)
		document.getElementById("btn").click();
		let modelName = ''
		let makeName = ''
		let trim = ''
		if (name === 'selectModel') {
			modelName = this.props.vehicle_models.filter(item => item.id === value).map(item => { return { label: item.model_make, value: item.id } })[0]
		}
		if (name === 'selectVehicleMake') {
			makeName = this.props.vehicle_makes.filter(item => item.id === value).map(item => { return { label: item.make_name, value: item.id } })[0]
		}
		if (name === 'selectTrim') {
			trim = value
		}
		this.setState({
			...this.state,
			[name]: value,
			modelName: modelName !== '' ? modelName : this.state.modelName,
			makeName: makeName !== '' ? makeName : this.state.makeName,
			trimName: trim !== '' ? trim : this.state.trimName
		});
	};

	handleOnChangeModel = (e) => {
		document.getElementById("btn").click();
		this.setState({
			...this.state,
			modelName: e,
			selectModel: e !== null ? e.value : this.state.selectModel
		})
	}

	handleOnChangeMake = (e) => {
		document.getElementById("btn").click();
		this.setState({
			...this.state,
			makeName: e,
			selectVehicleMake: e !== null ? e.value : this.state.selectVehicleMake
		})
	}
	handleOnClickBoost = (name, value, e) => {
		this.setState({
			...this.state,
			[name]: value,
			stepBoost: e,
		});
	};

	onDrop = (files) => {
		this.setState({
			...this.state,
			files: [...this.state.files, (files[0])],
			preViewFiles: [...this.state.preViewFiles, files.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file)
				}))[0]],
		})
	};

	handleOnChangeFeatures = (id) => {
		this.props.toggle_vehicle_features(id)
	}

	handleInputChange = (newValue) => {
		this.setState({
			...this.state,
			location: newValue
		})
	}

	submitAdPost = () => {
		if (this.state.typeOfVehicle == '' || (this.state.modelName == '' && this.state.otherModel == '') || (this.state.makeName == '' && this.state.otherMake == '') || (this.state.trimName == '' && this.state.otherTrim == '') || this.state.fuelType == '' || this.state.bodyType == '' || this.state.transmission == '' || this.props.vehicle_features.filter(item => item.checked === true).length == 0 || this.state.color == '' || this.state.cylinder == '' || this.state.drivetrain == '' || this.state.previousOwner == '' || this.state.previousAccident == '' || this.state.selectCondition == '') {
			this.changeStep(1)
			this.validator.showMessages();
			this.forceUpdate();
			return false;
		}
		if (this.state.files.length == 0) {
			this.changeStep(2)
			this.validator.showMessages();
			this.forceUpdate();
			return false;
		}
		if (this.state.locationName == '') {
			this.changeStep(3)
			this.validator.showMessages();
			this.forceUpdate();
			return false;
		}
		if (this.state.checkPayment == '' && this.state.cardCVC == '' && this.state.cardExpirDate == '' && this.state.cardNumber == '') {
			this.setState({
				...this.state,
				step: 4,
				stepBoost: 2
			});
			this.validator.showMessages();
			this.forceUpdate();
			return false;
		}
		// if (!this.validator.allValid()) {
		// 	this.validator.showMessages();
		// 	this.forceUpdate();
		// 	return false;
		// }
		const features = this.props.vehicle_features.filter(item => item.checked === true).map(item => {
			return {
				id: item.id,
				v_features: item.v_features
			}
		})
		var formData = new FormData();
		let img_len = 0
		if (this.state.file !== null) {
			for (let i = 0; i < this.state.files.length; i++) {
				formData.append(`images[${i}]`, this.state.files[i])
			}
			img_len = this.state.files.length
		}
		formData.append("img_len ", img_len);
		formData.append("transmission ", this.state.transmission);
		formData.append("fuel_type", this.state.fuelType);
		formData.append("drive_train", this.state.drivetrain);
		formData.append("cylinder", this.state.cylinder);
		formData.append("color", this.state.color);
		formData.append("previous_owners", this.state.previousOwner);
		formData.append("previous_accidents", this.state.previousAccident);
		formData.append("features", JSON.stringify(features));
		// formData.append("location", this.state.location == null ? '' : this.state.location);
		formData.append("other_model ", this.state.otherModel);
		formData.append("model", this.state.selectModel == '' ? 0 : this.state.selectModel);
		formData.append("otherTrim", this.state.otherTrim);
		formData.append("trim", this.state.trimName);
		formData.append("selectTrim", this.state.selectTrim);
		formData.append("year", this.state.selectYear);
		formData.append("v_condition", this.state.selectCondition);
		formData.append("kilometer", this.state.kilometer == '' ? 0 : this.state.kilometer);
		formData.append("price", this.state.price == '' ? 0 : this.state.price);
		formData.append("body_type", this.state.bodyType);
		formData.append("seating", this.state.seating);
		// formData.append("images ", JSON.stringify(this.state.files));
		formData.append("selectVehicleMake", this.state.selectVehicleMake);
		formData.append("cardNumber", this.state.cardNumber);
		formData.append("cardExpirDate", this.state.cardExpirDate);
		formData.append("cardCVC", this.state.cardCVC);
		formData.append("checkPayment", this.state.checkPayment);
		formData.append("selectedBoost", this.state.selectedBoost);
		formData.append("other_make", this.state.otherMake);
		formData.append("make", this.state.selectVehicleMake == '' ? 0 : this.state.selectVehicleMake);
		formData.append("category", this.state.typeOfVehicle);
		formData.append("modelName", this.state.modelName);
		formData.append("longitude", this.state.longitude == '' ? 0 : this.state.longitude);
		formData.append("latitude", this.state.latitude == '' ? 0 : this.state.latitude);
		formData.append("location", this.state.locationName);
		formData.append("user_id", this.state.user_id);
		/** Not Used, Used in Backend */
		formData.append("accept_charges", '');
		formData.append("line_amount", '');
		formData.append("line_description", '');
		formData.append("line_name", '');
		formData.append("ownership_doc_back", this.state.nullState);
		formData.append("has_lines", '');
		formData.append("ownership_doc", this.state.nullState);
		formData.append("reason", 'Hard Coded No Reason');
		formData.append("vin", '');
		formData.append("is_active", this.state.hardCodeInt);
		formData.append("is_deleted", this.state.hardCodeInt);
		formData.append("modified_at", new Date());
		formData.append("is_sold", 0);

		formData.append("description", '');
		formData.append("stripe_payment_amount", '');
		formData.append("stripe_check_id", '');
		formData.append("bumpup_active", this.state.hardCodeInt);
		formData.append("listing_type", this.state.hardCodeInt);
		formData.append("dealer_or_private_seller", this.state.hardCodeInt);
		formData.append("sub_type_id", this.state.hardCodeInt);
		formData.append("user_type", this.state.hardCodeInt);
		formData.append("has_bumpup", this.state.hardCodeInt);
		formData.append("city", '');

		console.log(formData)
		this.props.create_ad_post(formData)
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.typeOfVehicle !== this.state.typeOfVehicle && this.state.typeOfVehicle !== '' && this.state.typeOfVehicle !== undefined) {
			this.props.get_vehicle_make(this.state.typeOfVehicle)
			this.props.get_vehicle_body_type(this.state.typeOfVehicle)
		}
		if (prevState.selectVehicleMake !== this.state.selectVehicleMake && this.state.selectVehicleMake !== '' && this.state.selectVehicleMake !== undefined) {
			this.props.get_vehicle_make(this.state.selectVehicleMake)
		}
		if (prevState.location !== this.state.location && this.state.location !== null && this.state.location !== undefined) {
			this.setState({
				...this.state,
				longitude: this.state.location.lng,
				latitude: this.state.location.lat,
				locationName: this.state.location.label
			})
		}
		if (prevProps.update_view !== this.props.update_view && this.props.update_view !== undefined) {
			this.changeStep(5)
		}
		if (prevProps.user !== this.props.user && this.props.user !== null && this.props.user !== undefined) {
			console.log(this.props.user)
			console.log(this.props.user['user_id'])
			console.log(this.props.user.user_id)
			this.setState({
				...this.state,
				user_id: this.props.user.user_id
			})
		}
	}


	render() {
		const thumb = {
			position: "relative",
			display: "inline-flex",
			borderRadius: 2,
			border: "1px solid #eaeaea",
			marginBottom: 8,
			marginRight: 8,
			width: 100,
			height: 100,
			padding: 4,
			boxSizing: "border-box"
		};
		const thumbInner = {
			display: "flex",
			minWidth: 0,
			overflow: "hidden"
		};
		const img = {
			display: "block",
			width: "auto",
			height: "100%"
		};

		console.log('props', this.props)
		console.log(this.state);
		const files = this.state.preViewFiles.map((file, index) => (
			<div style={thumb} key={file.name}>
				<div style={thumbInner}>
					<img src={file.preview} style={img} alt="" />
				</div>
			</div>
		));
		/**
		 * 
		 * 
		 * Card Date
		 * 
		 *  
		 */
		const limit = (val, max) => {
			if (val.length === 1 && val[0] > max[0]) {
				val = '0' + val;
			}

			if (val.length === 2) {
				if (Number(val) === 0) {
					val = '01';

					//this can happen when user paste number
				} else if (val > max) {
					val = max;
				}
			}

			return val;
		}

		const cardExpiry = (val) => {
			let month = limit(val.substring(0, 2), '12');
			let year = val.substring(2, 4);
			// this.setState({
			// 	...this.state,
			// 	cardExpirDate: month + (year.length ? '/' + year : '')
			// })
			return month + (year.length ? '/' + year : '');
		}


		/**
		 * 
		 * 
		 *  Location Drop Down
		 * 
		 */
		const promiseOptions = inputValue =>
			new Promise(resolve => {
				setTimeout(() => {
					Geocode.fromAddress(inputValue).then(
						response => {
							let location = []
							response.results[0].address_components.map((item, index) => {
								return location.push({
									label: item.long_name,
									value: item.short_name,
									lat: response.results[0].geometry.location.lat,
									lng: response.results[0].geometry.location.lng
								})

							})
							this.setState({
								...this.state,
								locationValues: location
							})
							resolve((location));
						},
						error => {
							// console.error(error);
						}
					);
				}, 1000);
			});
		/**
		 * 
		 *  Make Drop Down
		 * 
		 */
		const makeDrop = []
		this.props.vehicle_makes.map((item, index) => {
			return makeDrop.push({
				label: item.make_name, value: item.id
			})
		})
		/**
		 * 
		 *  Model Drop Down
		 * 
		 */
		const modelDrop = []
		this.props.vehicle_models.map(item => {
			return modelDrop.push({
				label: item.model_make, value: item.id
			})
		})

		const type_of_vehicle = (this.props.type_of_vehicles || []).map((item, index) => {
			return (
				<React.Fragment key={index}>
					<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index} >
						<label className="AdPost-CheckBox">
							<div className="AdPost-Thumble">
								<input
									type="checkbox"
									value={item.id}
									name="typeOfVehicle"
									onChange={this.hanldeOnChangeTypeOfVehicle}
									checked={
										this.state.typeOfVehicle == item.id
									}

								/>
								<span className="checkadpost"></span>
								{ }
								{item.name == 'Automotive' ? <img
									src="/assets/image/vehicle-1.svg"
									alt={item.name}
								/> : item.name == "Motorcycle" ? <img
									src="/assets/image/vehicle-2.svg"
									alt={item.name}
								/> : item.name == "ATV/UTV" ? <img
									src="/assets/image/vehicle-3.svg"
									alt={item.name}
								/> : item.name == "Snowmobile" ? <img
									src="/assets/image/vehicle-4.svg"
									alt={item.name}
								/> : item.name == "RV" ? <img
									src="/assets/image/vehicle-5.svg"
									alt={item.name}
								/> : item.name == "Watercraft" ? <img
									src="/assets/image/vehicle-6.svg"
									alt={item.name}
								/> : null}
								<h1>{item.name}</h1>
							</div>
						</label>

					</div>
				</React.Fragment>
			)
		}
		)
		return (
			<React.Fragment>
				{/*	<Helmet>
					<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDXs8HHpZSRxd1vJapwzON64a_vmjpn_4&libraries=places"></script>
						<script src="/assets/js/dropZone.js"></script>
						 <script src="/assets/owlcarousel/owl.carousel.min.js"></script> 
			</Helmet> */}
				<section className="Section-AddPost ">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<div className="PostAdd-Container">
									<div className="row">
										<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
											<div className="PostAdd-TopList">
												<ul>
													<li
														className={
															this.state.step == 1 ? "active" : "headactive"
														}
														onClick={() => this.changeStep(1)}
													>
														<a>1</a>
													</li>
													<li
														className={
															this.state.step == 1 ? "activetext" : "headactive"
														}
														onClick={() => this.changeStep(1)}
													>
														<h1>Vehicle Details</h1>
													</li>
													<li
														className={
															this.state.step == 2 ? "active" : "headactive"
														}
														onClick={() => this.changeStep(2)}
													>
														<a>2</a>
													</li>
													<li
														className={
															this.state.step == 2 ? "activetext" : "headactive"
														}
														onClick={() => this.changeStep(2)}
													>
														<h1>Photos</h1>
													</li>
													<li
														className={
															this.state.step == 3 ? "active" : "headactive"
														}
														onClick={() => this.changeStep(3)}
													>
														<a>3</a>
													</li>
													<li
														className={
															this.state.step == 3 ? "activetext" : "headactive"
														}
														onClick={() => this.changeStep(3)}
													>
														<h1>Location</h1>
													</li>
													<li
														className={
															this.state.step == 4 ? "active" : "headactive"
														}
														onClick={() => this.changeStep(4)}
													>
														<a>4</a>
													</li>
													<li
														className={
															this.state.step == 4 ? "activetext" : "headactive"
														}
														onClick={() => this.changeStep(4)}
													>
														<h1>Boost</h1>
													</li>
													<li
														className={
															this.state.step == 5 ? "active" : "headactive"
														}
														onClick={() => this.changeStep(5)}
													>
														<a>5</a>
													</li>
													<li
														className={
															this.state.step == 5 ? "activetext" : "headactive"
														}
														onClick={() => this.changeStep(5)}
													>
														<h1>Post Ad</h1>
													</li>
												</ul>
											</div>
										</div>

										<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
											<div className="row">
												<div className="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12"></div>
												<div
													className={
														this.state.step === 4 && this.state.stepBoost !== 3
															? "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
															: "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"
													}
												>
													<div className="SliderContainer">
														{this.state.step == 1 ? (
															<React.Fragment>
																<input type='button' id='btn' hidden />
																<div className="owl-three owl-carousel owl-theme">
																	<div className="AdPost-SecThree item" id="features">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pl-0 pr-0 pr-0 pl-0">
																				<div className="VehicleForm-Head">
																					<label>Features</label>
																				</div>
																			</div>
																		</div>

																		<div className="row BrandMt">
																			{(this.props.vehicle_features || []).map((item, index) => (
																				<React.Fragment key={index}>
																					<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0" key={index}>
																						<label className="FeatureRadio-Btn">
																							{item.v_features}
																							<input
																								type="checkbox"
																								name="featureName"
																								id="featureRadio"
																								value={item.id}
																								checked={item.checked}
																								onChange={() => this.handleOnChangeFeatures(item.id)}
																							/>
																							<span className="FeatureMark"></span>
																						</label>
																					</div>
																				</React.Fragment>
																			))}

																			{this.validator.message('Features', this.state.featureName, 'required')}
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="SecSeven-Btn">
																					<button
																						type="button"
																						onClick={() => this.changeStep(2)}
																					>
																						Next{" "}
																						<i className="fa fa-angle-right"></i>
																					</button>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div className="AdPost-SecThree item">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="VehicleForm-Head">
																					<label>Previous Accidents</label>
																				</div>
																			</div>
																		</div>

																		<div className="row BrandMt">
																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.previousAccident ==
																							0 && this.state.previousAccident !== ""
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"previousAccident",
																							0
																						)
																					}

																				>
																					<h1>No Accidents</h1>
																				</div>
																			</div>

																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.previousAccident ==
																							1 && this.state.previousAccident !== ""
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"previousAccident",
																							1
																						)
																					}

																				>
																					<h1>1 Accident</h1>
																				</div>
																			</div>

																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.previousAccident ==
																							2 && this.state.previousAccident !== ""
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"previousAccident",
																							2
																						)
																					}

																				>
																					<h1>2+ Accidents</h1>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div className="AdPost-SecThree item">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="VehicleForm-Head">
																					<label>Previous Owners</label>
																				</div>
																			</div>
																		</div>

																		<div className="row BrandMt">
																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.previousOwner ==
																							1
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"previousOwner",
																							1
																						)
																					}

																				>
																					<h1>1 Owner</h1>
																				</div>
																			</div>

																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.previousOwner ==
																							2
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"previousOwner",
																							2
																						)
																					}

																				>
																					<h1>2 Owner</h1>
																				</div>
																			</div>

																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.previousOwner ==
																							3
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"previousOwner",
																							3
																						)
																					}

																				>
																					<h1>2+ Owner</h1>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div className="AdPost-SecThree item">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="VehicleForm-Head">
																					<label>Color</label>
																				</div>
																			</div>
																		</div>

																		<div className="row BrandMt">
																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div
																					className={
																						this.state.color === "Green"
																							? "ColorPost-Container active"
																							: "ColorPost-Container"
																					}
																					onClick={() =>
																						this.handleOnClick("color", "Green")
																					}

																				>
																					<div className="ColorGreen">
																						<h1>
																							<span>Green</span>
																						</h1>
																					</div>
																				</div>
																			</div>

																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div
																					className={
																						this.state.color === "Yellow"
																							? "ColorPost-Container active"
																							: "ColorPost-Container"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"color",
																							"Yellow"
																						)
																					}

																				>
																					<div className="ColorYellow">
																						<h1>
																							<span>Yellow</span>
																						</h1>
																					</div>
																				</div>
																			</div>

																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div
																					className={
																						this.state.color === "Orange"
																							? "ColorPost-Container active"
																							: "ColorPost-Container"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"color",
																							"Orange"
																						)
																					}

																				>
																					<div className="ColorOrange">
																						<h1>
																							<span>Orange</span>
																						</h1>
																					</div>
																				</div>
																			</div>

																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div
																					className={
																						this.state.color === "Purple"
																							? "ColorPost-Container active"
																							: "ColorPost-Container"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"color",
																							"Purple"
																						)
																					}

																				>
																					<div className="ColorPurple">
																						<h1>
																							<span>Purple</span>
																						</h1>
																					</div>
																				</div>
																			</div>

																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div
																					className={
																						this.state.color === "Blue"
																							? "ColorPost-Container active"
																							: "ColorPost-Container"
																					}
																					onClick={() =>
																						this.handleOnClick("color", "Blue")
																					}

																				>
																					<div className="ColorBlue">
																						<h1>
																							<span>Blue</span>
																						</h1>
																					</div>
																				</div>
																			</div>

																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div
																					className={
																						this.state.color === "Silver"
																							? "ColorPost-Container active"
																							: "ColorPost-Container"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"color",
																							"Silver"
																						)
																					}

																				>
																					<div className="ColorSilver">
																						<h1>
																							<span>Silver</span>
																						</h1>
																					</div>
																				</div>
																			</div>

																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div
																					className={
																						this.state.color === "Black"
																							? "ColorPost-Container active"
																							: "ColorPost-Container"
																					}
																					onClick={() =>
																						this.handleOnClick("color", "Black")
																					}

																				>
																					<div className="ColorBlack">
																						<h1>
																							<span>Black</span>
																						</h1>
																					</div>
																				</div>
																			</div>

																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div
																					className={
																						this.state.color === "Red"
																							? "ColorPost-Container active"
																							: "ColorPost-Container"
																					}
																					onClick={() =>
																						this.handleOnClick("color", "Red")
																					}

																				>
																					<div className="ColorRed">
																						<h1>
																							<span>Red</span>
																						</h1>
																					</div>
																				</div>
																			</div>

																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div
																					className={
																						this.state.color === "Gold"
																							? "ColorPost-Container active"
																							: "ColorPost-Container"
																					}
																					onClick={() =>
																						this.handleOnClick("color", "Gold")
																					}

																				>
																					<div className="ColorGold">
																						<h1>
																							<span>Gold</span>
																						</h1>
																					</div>
																				</div>
																			</div>

																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div
																					className={
																						this.state.color === "Grey"
																							? "ColorPost-Container active"
																							: "ColorPost-Container"
																					}
																					onClick={() =>
																						this.handleOnClick("color", "Grey")
																					}

																				>
																					<div className="ColorGrey">
																						<h1>
																							<span>Grey</span>
																						</h1>
																					</div>
																				</div>
																			</div>

																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div
																					className={
																						this.state.color === "Biege"
																							? "ColorPost-Container active"
																							: "ColorPost-Container"
																					}
																					onClick={() =>
																						this.handleOnClick("color", "Biege")
																					}

																				>
																					<div className="ColorBiege">
																						<h1>
																							<span>Biege</span>
																						</h1>
																					</div>
																				</div>
																			</div>

																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div
																					className={
																						this.state.color === "Brown"
																							? "ColorPost-Container active"
																							: "ColorPost-Container"
																					}
																					onClick={() =>
																						this.handleOnClick("color", "Brown")
																					}

																				>
																					<div className="ColorBrown">
																						<h1>
																							<span>Brown</span>
																						</h1>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div className="AdPost-SecThree item">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="VehicleForm-Head">
																					<label>Cylinder</label>
																				</div>
																			</div>
																		</div>

																		<div className="row BrandMt">
																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.cylinder === "3"
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick("cylinder", "3")
																					}

																				>
																					<h1>3</h1>
																				</div>
																			</div>

																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.cylinder === "4"
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick("cylinder", "4")
																					}

																				>
																					<h1>4</h1>
																				</div>
																			</div>

																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.cylinder === "5"
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick("cylinder", "5")
																					}

																				>
																					<h1>5</h1>
																				</div>
																			</div>

																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.cylinder === "6"
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick("cylinder", "6")
																					}

																				>
																					<h1>6</h1>
																				</div>
																			</div>

																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.cylinder === "8"
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick("cylinder", "8")
																					}

																				>
																					<h1>8</h1>
																				</div>
																			</div>

																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.cylinder === "12"
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick("cylinder", "12")
																					}

																				>
																					<h1>12</h1>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div className="AdPost-SecThree item">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="VehicleForm-Head">
																					<label>Drivetrain</label>
																				</div>
																			</div>
																		</div>

																		<div className="row BrandMt">
																			{(this.props.vehicle_drive_train || []).map((item, index) => (
																				<React.Fragment key={index}>
																					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" key={index}>
																						<div
																							className={
																								this.state.drivetrain == item.id
																									? "VehicleChoose-Name active"
																									: "VehicleChoose-Name"
																							}
																							onClick={() =>
																								this.handleOnClick(
																									"drivetrain",
																									item.id
																								)
																							}

																						>
																							<h1>{item.drive_train}</h1>
																						</div>
																					</div>
																				</React.Fragment>
																			))}
																		</div>
																	</div>

																	<div className="AdPost-SecThree item">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="VehicleForm-Head">
																					<label>Fuel Type</label>
																				</div>
																			</div>
																		</div>

																		<div className="row BrandMt">
																			{(this.props.vehicle_fuel_type || []).map((item, index) => (
																				<React.Fragment key={index}>
																					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" key={index}>
																						<div
																							className={
																								this.state.fuelType == item.id
																									? "VehicleChoose-Name active"
																									: "VehicleChoose-Name"
																							}
																							onClick={() =>
																								this.handleOnClick(
																									"fuelType",
																									item.id
																								)
																							}


																						>
																							<h1>{item.fuel_type}</h1>
																						</div>
																					</div>

																				</React.Fragment>
																			))}
																		</div>
																	</div>

																	<div className="AdPost-SecThree item">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="VehicleForm-Head">
																					<label>Transmission</label>
																				</div>
																			</div>
																		</div>

																		<div className="row BrandMt">
																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.transmission ===
																							"Automatic"
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"transmission",
																							"Automatic"
																						)
																					}

																				>
																					<h1>Automatic</h1>
																				</div>
																			</div>

																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.transmission === "Manual"
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"transmission",
																							"Manual"
																						)
																					}

																				>
																					<h1>Manual</h1>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div className="AdPost-SecThree item">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="SecEight-DropMenu">
																					<label>Seating</label>
																					<select
																						id="seating"
																						name="seating"
																						onChange={this.handleOnChange}

																					>
																						<option>1</option>
																						<option>2</option>
																						<option>3</option>
																						<option>4</option>
																						<option>5</option>
																						<option>6</option>
																					</select>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div className="AdPost-SecThree item">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="VehicleForm-Head">
																					<label>Body Type</label>
																				</div>
																			</div>
																		</div>

																		<div className="row BrandMt">
																			{(this.props.vehicle_body || []).map((item, index) => (
																				<React.Fragment key={index}>
																					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" key={index}>
																						<div
																							className={
																								this.state.bodyType === item.id
																									? "VehicleChoose-Name active"
																									: "VehicleChoose-Name"
																							}
																							onClick={() =>
																								this.handleOnClick(
																									"bodyType",
																									item.id
																								)
																							}

																						>
																							<h1>{item.body_type}</h1>
																						</div>
																					</div>
																				</React.Fragment>
																			))}

																		</div>
																	</div>

																	<div className="AdPost-SecSeven item">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="Price-Form">
																					<label>Price</label>
																					<input
																						type="text"
																						id="price"
																						name="price"
																						placeholder="15,999"
																						value={this.state.price}
																						onChange={this.handleOnChange}
																					/>
																				</div>
																			</div>

																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="Kilometter-Form mb-0">
																					<label>Kilometers</label>
																					<input
																						type="text"
																						id="kilometer"
																						name="kilometer"
																						placeholder="20,000"
																						value={this.state.kilometer}
																						onChange={
																							(this, this.handleOnChange)
																						}
																					/>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div className="AdPost-SecThree item">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="VehicleForm-Head">
																					<label>Select Condition</label>
																				</div>
																			</div>
																		</div>

																		<div className="row BrandMt">
																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.selectCondition === "New"
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"selectCondition",
																							"New"
																						)
																					}

																				>
																					<h1>New</h1>
																				</div>
																			</div>

																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.selectCondition ===
																							"Used"
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"selectCondition",
																							"Used"
																						)
																					}

																				>
																					<h1>Used</h1>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div className="AdPost-SecFive item">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="SecEight-DropMenu">
																					<label className="mb-4">
																						Select Year
                                          </label>
																					<select
																						className="form-control js-example-tags"

																						name="selectYear"
																						value={this.state.selectYear}
																						onChange={this.handleOnChange}
																					>
																						<option></option>
																						{/* {yearOption} */}
																						<option>2021</option>
																						<option>2020</option>
																						<option>2019</option>
																						<option>2018</option>
																						<option>2017</option>
																						<option>2016</option>
																						<option>2015</option>
																						<option>2014</option>
																						<option>2013</option>
																						<option>2012</option>
																						<option>2011</option>
																						<option>2010</option>
																						<option>2009</option>
																						<option>2008</option>
																						<option>2007</option>
																						<option>2006</option>
																						<option>2005</option>
																						<option>2004</option>
																						<option>2003</option>
																						<option>2002</option>
																						<option>2001</option>
																						<option>2000</option>
																						<option>1999</option>
																						<option>1998</option>
																						<option>1997</option>
																						<option>1996</option>
																						<option>1995</option>
																						<option>1994</option>
																						<option>1993</option>
																						<option>1992</option>
																						<option>1991</option>
																						<option>1990</option>
																					</select>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div className="AdPost-SecFour item">
																		<div className="row">
																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div className="VehicleForm-Head mb-4">
																					<label>Select Trim</label>
																				</div>
																			</div>
																			<div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 mb-4">
																				<div className="VehicleForm-Head">
																					<input
																						className="form-control"
																						type="text"
																						id="trimName"
																						name="trimName"
																						value={this.state.trimName}
																						onChange={this.handleOnChange}
																						placeholder="Search Trim"
																					/>
																				</div>
																			</div>
																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div className="VehicleForm-Head">
																					<label>Other, enter trim</label>
																				</div>
																			</div>

																			<div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 ">
																				<div className="VehicleForm-Head">
																					<input
																						className="form-control"
																						type="text"
																						id='otherTrim'
																						name="otherTrim"
																						value={this.state.otherTrim}
																						onChange={this.handleOnChange}
																						placeholder="Enter the name of your vehicle trim"
																						style={{
																							background: "none",
																							paddingLeft: "20px",
																						}}
																					/>
																				</div>
																			</div>
																		</div>

																		<div className="row BrandMt">
																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.selectTrim ===
																							"1.5 EMT I DTEC"
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"selectTrim",
																							"1.5 EMT I DTEC"
																						)
																					}

																				>
																					<h1>1.5 EMT I DTEC</h1>
																				</div>
																			</div>

																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.selectTrim ===
																							"1.5 S CVT Diesel"
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"selectTrim",
																							"1.5 S CVT Diesel"
																						)
																					}

																				>
																					<h1>1.5 S CVT Diesel</h1>
																				</div>
																			</div>

																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.selectTrim ===
																							"1.5 S CVT DTE"
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"selectTrim",
																							"1.5 S CVT DTE"
																						)
																					}

																				>
																					<h1>1.5 S CVT DTEC</h1>
																				</div>
																			</div>


																			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																				<div
																					className={
																						this.state.selectTrim === "None"
																							? "VehicleChoose-Name active"
																							: "VehicleChoose-Name"
																					}
																					onClick={() =>
																						this.handleOnClick(
																							"selectTrim",
																							"None"
																						)
																					}

																				>
																					<h1>None</h1>
																				</div>
																			</div>
																		</div>
																	</div>

																	<div className="AdPost-SecThree item">
																		<div className="row">
																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div className="VehicleForm-Head">
																					<label>Select Model</label>
																				</div>
																			</div>

																			<div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 mb-4">
																				<div className="VehicleForm-Head">
																					<Select
																						placeholder="Search Car Brand"
																						id="modelName"
																						name="modelName"
																						value={this.state.modelName}
																						onChange={this.handleOnChangeModel}
																						options={modelDrop}
																						isSearchable
																						isClearable
																					/>
																					{/* <input
																						className="form-control"
																						type="text"
																						id="modelName"
																						name="modelName"
																						value={this.state.modelName}
																						onChange={this.handleOnChange}
																						placeholder="Search Car Brand"
																					/> */}
																				</div>
																			</div>

																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div className="VehicleForm-Head">
																					<label>Other, enter model</label>
																				</div>
																			</div>

																			<div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 ">
																				<div className="VehicleForm-Head">
																					<input
																						className="form-control"
																						type="text"
																						id="otherModel"
																						name="otherModel"
																						value={this.state.otherModel}
																						onChange={this.handleOnChange}
																						placeholder="Enter the name of your vehicle model"
																						style={{
																							background: "none",
																							paddingLeft: "20px",
																						}}
																					/>
																				</div>
																			</div>
																		</div>

																		<div className="row BrandMt">
																			{(this.props.vehicle_models || []).map((item, index) => (
																				<React.Fragment key={index}>
																					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" key={index}>
																						<div
																							className={
																								this.state.selectModel == item.id
																									? "VehicleChoose-Name active"
																									: "VehicleChoose-Name"
																							}
																							onClick={() =>
																								this.handleOnClick(
																									"selectModel",
																									item.id
																								)
																							}

																						>
																							<h1>{item.model_make}</h1>
																						</div>
																					</div>
																				</React.Fragment>
																			))}
																		</div>
																	</div>

																	<div className="AdPost-SecTwo item">
																		<div className="row">
																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div className="VehicleForm-Head">
																					<label>Select Make</label>
																				</div>
																			</div>

																			<div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 mb-4">
																				<div className="VehicleForm-Head">
																					<Select
																						placeholder="Search Car Make"
																						id="makeName"
																						name="makeName"
																						value={this.state.makeName}
																						onChange={this.handleOnChangeMake}
																						options={makeDrop}
																						isSearchable
																						isClearable
																					/>
																					{/* <input
																						className="form-control"
																						type="text"
																						id="makeName"
																						name="makeName"
																						value={this.state.makeName}
																						onChange={this.handleOnChange}
																						placeholder="Search Car Make"
																					/> */}
																				</div>
																			</div>

																			<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																				<div className="VehicleForm-Head">
																					<label>Other, provide make</label>
																				</div>
																			</div>

																			<div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 ">
																				<div className="VehicleForm-Head">
																					<input
																						className="form-control"
																						type="text"
																						id="otherMake"
																						name="otherMake"
																						value={this.state.otherMake}
																						onChange={this.handleOnChange}
																						placeholder="Enter the name of your vehicle make"
																						style={{
																							background: "none",
																							paddingLeft: "20px",
																						}}
																					/>
																				</div>
																			</div>
																		</div>

																		<div className="row BrandMt">
																			{(this.props.vehicle_makes || []).map((item, index) => (
																				<React.Fragment key={index}>
																					<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index}>
																						<div className={this.state.selectVehicleMake == item.id ? "SelectCar-Brand active" : "SelectCar-Brand"} onClick={() => this.handleOnClick('selectVehicleMake', item.id)} >
																							{item.make_name === 'Honda' ?
																								<img
																									src="/assets/image/honda.svg"
																									alt=""
																								/>
																								: item.make_name === 'Toyota' ? <img
																									src="/assets/image/toyota.svg"
																									alt=""
																								/>
																									: item.make_name === 'Nissan' ? <img
																										src="/assets/image/nissan.svg"
																										alt=""
																									/>
																										: item.make_name === 'Hyundai' ? <img
																											src="/assets/image/hyundai.svg"
																											alt=""
																										/>
																											: null}
																						</div>
																					</div>
																				</React.Fragment>
																			))}
																			{this.validator.message('Make', this.state.typeOfVehicle, 'required')}
																		</div>
																	</div>

																	<div className="AdPost-SecOne item" id="type_of_vehicles">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<h6>Type of Vehicle</h6>
																			</div>
																			{type_of_vehicle}
																			{this.validator.message('Type Of Vehicle', this.state.typeOfVehicle, 'required')}
																			{/*	{(this.props.type_of_vehicles || []).map((item, index) =>
																			(
																				<React.Fragment key={index}>
																					<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index} >
																						<label className="AdPost-CheckBox">
																							<div className="AdPost-Thumble">
																								<input
																									type="checkbox"
																									value={item.id}
																									name="typeOfVehicle"
																									onChange={this.hanldeOnChangeTypeOfVehicle}
																									checked={
																										this.state.typeOfVehicle == item.id
																									}

																								/>
																								<span className="checkadpost"></span>
																								{ }
																								{item.name == 'Automotive' ? <img
																									src="/assets/image/vehicle-1.svg"
																									alt={item.name}
																								/> : item.name == "Motorcycle" ? <img
																									src="/assets/image/vehicle-2.svg"
																									alt={item.name}
																								/> : item.name == "ATV/UTV" ? <img
																									src="/assets/image/vehicle-3.svg"
																									alt={item.name}
																								/> : item.name == "Snowmobile" ? <img
																									src="/assets/image/vehicle-4.svg"
																									alt={item.name}
																								/> : item.name == "RV" ? <img
																									src="/assets/image/vehicle-5.svg"
																									alt={item.name}
																								/> : item.name == "Watercraft" ? <img
																									src="/assets/image/vehicle-6.svg"
																									alt={item.name}
																								/> : null}
																								<h1>{item.name}</h1>
																							</div>
																						</label>
																					</div>
																				</React.Fragment>
																			)
																			)}

																								*/}
																		</div>
																	</div>
																</div>
															</React.Fragment>

														) : null}
														{this.state.step == 2 ? (
															<React.Fragment >
																<div className="AdPost-SecFifteen">
																	<div className="row">
																		<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																			<div className="VehicleForm-Head">
																				<label>Add Photos</label>
																			</div>
																		</div>
																	</div>

																	<div className="row BrandMt">
																		<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																			<Dropzone onDrop={this.onDrop}>
																				{({ getRootProps, getInputProps }) => (
																					<section className="#">
																						<div {...getRootProps({ className: 'dropzone' })}>
																							<input {...getInputProps()} />
																							<img src="/assets/image/file-icon.svg" alt="Watercraft" />
																							<p>Browse Image</p>
																						</div>
																						<aside className="dropimage">
																							{/* <h4>Files</h4> */}
																							<ul>{files}</ul>
																						</aside>
																					</section>
																				)}
																			</Dropzone>
																		</div>

																		<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																			<div className="SecSeven-Btn">
																				<button
																					type="button"
																					onClick={() => this.changeStep(3)}
																				>
																					Next{" "}
																					<i className="fa fa-angle-right"></i>
																				</button>
																			</div>
																		</div>
																	</div>
																</div>
															</React.Fragment>
														) : this.state.step == 3 ? (
															<React.Fragment>
																<div className="AdPost-SecFifteen">
																	<div className="row">
																		<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																			<div className="VehicleForm-Head">
																				<label>Add Location</label>
																			</div>
																		</div>
																	</div>

																	<div className="row BrandMt">
																		<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																			<AsyncSelect cacheOptions loadOptions={promiseOptions} onChange={this.handleInputChange} isClearable />
																		</div>
																	</div>

																	<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																		<div className="SecSeven-Btn">
																			<button
																				type="button"
																				onClick={() => this.changeStep(4)}
																			>
																				Next{" "}
																				<i className="fa fa-angle-right"></i>
																			</button>
																		</div>
																	</div>

																</div>
															</React.Fragment>
														) : this.state.step == 4 ? (
															this.state.stepBoost === 1 ? (
																<React.Fragment>
																	<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																		<div className="AdPostSec-twelve">
																			<div className="row">
																				<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																					<div className="VehicleForm-Head">
																						<label>Boost your Ad</label>
																					</div>
																				</div>
																			</div>

																			<div className="AdBoost-Container">
																				<div className="row">
																					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																						<div className="addDuration-Head">
																							<h1>Ad Duration</h1>
																							<p>
																								Your ad is listed for 14 days
                                              </p>
																						</div>

																						<div className="addDuration-Head">
																							<h1>Photos</h1>
																							<p>Upto 10 Photos for your ad</p>
																						</div>

																						<div className="addDuration-Head">
																							<h1>Top Ad</h1>
																							<p>
																								Ad is on rotation on the top of
                                                <br /> the Search Result Page
                                              </p>
																						</div>

																						<div className="addDuration-Head">
																							<h1>Homepage Ads</h1>
																							<p>
																								Your ad is Promoted on the
                                                <br /> Homepage in Rotation
                                              </p>
																						</div>

																						<div className="addDuration-Head">
																							<h1>Bump Up</h1>
																							<p>
																								Your ad is Bumped to top
                                                <br /> Position every week
                                              </p>
																						</div>

																						<div className="addDuration-Head">
																							<h1>Social Media Ads</h1>
																							<p>
																								Your ad is Promoted on Various
                                                <br /> Social Media Platfroms
                                              </p>
																						</div>

																						<div className="TableBoost">
																							<table className="table">
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
																												<a className={this.state.selectedBoost === 'free' ? "active" : ''}
																													onClick={() =>
																														this.handleOnClickBoost(
																															"selectedBoost",
																															"free",
																															2
																														)
																													}
																												>
																													Selected
                                                        </a>
																											</div>
																										</td>
																									</tr>

																									<tr>
																										<th className="headone">
																											STANDARD
                                                      <br /> <span>$9.99</span>
																										</th>

																										<td>
																											<div className="ad-durationBtn mt-2 pb-0">
																												<img
																													src="/assets/image/adgood-icon.svg"
																													alt=""
																												/>
																											</div>
																										</td>

																										<td>
																											<div className="ad-durationBtn mt-2 pb-0">
																												<img
																													src="/assets/image/adgood-icon.svg"
																													alt=""
																												/>
																											</div>
																										</td>

																										<td>
																											<div className="adcross-Btn mt-2 pb-0">
																												<img
																													src="/assets/image/ad-cross-icon.svg"
																													alt=""
																												/>
																											</div>
																										</td>

																										<td>
																											<div className="adcross-Btn mt-2 pb-0">
																												<img
																													src="/assets/image/ad-cross-icon.svg"
																													alt=""
																												/>
																											</div>
																										</td>

																										<td>
																											<div className="adcross-Btn mt-2 pb-0">
																												<img
																													src="/assets/image/ad-cross-icon.svg"
																													alt=""
																												/>
																											</div>
																										</td>

																										<td>
																											<div className="adcross-Btn mt-2 pb-0">
																												<img
																													src="/assets/image/ad-cross-icon.svg"
																													alt=""
																												/>
																											</div>
																										</td>

																										<td>
																											<div className="SelectedBtn mt-2 pb-0">
																												<a className={this.state.selectedBoost === 'standard' ? "active" : ''}
																													onClick={() =>
																														this.handleOnClickBoost(
																															"selectedBoost",
																															"standard",
																															2
																														)
																													}
																												>
																													{" "}
                                                          Selected
                                                        </a>
																											</div>
																										</td>
																									</tr>

																									<tr>
																										<th className="headone">
																											PREMIUM
                                                      <br /> <span>$14.99</span>
																										</th>

																										<td>
																											<div className="ad-durationBtn mt-2 pb-0">
																												<img
																													src="/assets/image/adgood-icon.svg"
																													alt=""
																												/>
																											</div>
																										</td>

																										<td>
																											<div className="ad-durationBtn mt-2 pb-0">
																												<img
																													src="/assets/image/adgood-icon.svg"
																													alt=""
																												/>
																											</div>
																										</td>

																										<td>
																											<div className="ad-durationBtn mt-2 pb-0">
																												<img
																													src="/assets/image/adgood-icon.svg"
																													alt=""
																												/>
																											</div>
																										</td>

																										<td>
																											<div className="ad-durationBtn mt-2 pb-0">
																												<img
																													src="/assets/image/adgood-icon.svg"
																													alt=""
																												/>
																											</div>
																										</td>

																										<td>
																											<div className="ad-durationBtn mt-2 pb-0">
																												<img
																													src="/assets/image/adgood-icon.svg"
																													alt=""
																												/>
																											</div>
																										</td>

																										<td>
																											<div className="ad-durationBtn mt-2 pb-0">
																												<img
																													src="/assets/image/adgood-icon.svg"
																													alt=""
																												/>
																											</div>
																										</td>

																										<td>
																											<div className="SelectedBtn mt-2 pb-0">
																												<a className={this.state.selectedBoost === 'premium' ? "active" : ''}
																													onClick={() =>
																														this.handleOnClickBoost(
																															"selectedBoost",
																															"premium",
																															2
																														)
																													}
																												>
																													Selected
                                                        </a>
																											</div>
																										</td>
																									</tr>
																								</tbody>
																							</table>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</React.Fragment>
															) : this.state.stepBoost === 2 ? (
																<React.Fragment>
																	<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																		<div className="AdPostSec-Thirteen">
																			<div className="row">
																				<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																					<div className="VehicleForm-Head">
																						<label>Payment Method</label>
																					</div>
																				</div>
																			</div>

																			<div className="PaymentMethod-Container">
																				<div className="row">
																					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																						<div className="MethodBtn-Third">
																							<div className="paymentback">
																								<label className="MethodRadio-Btn">
																									<img
																										src="/assets/image/paypal-icon.svg"
																										alt=""
																									/>
																									<input
																										type="radio"
																										name="checkPayment"
																										id="checkPayment"
																										onChange={
																											this.handleOnChange
																										}
																										value="pay_pal"
																									/>
																									<span className="MethodCheck"></span>
																								</label>
																							</div>

																							<div className="paymentback">
																								<label className="MethodRadio-Btn">
																									Credit card
                                                  <input
																										type="radio"
																										name="checkPayment"
																										id="checkPayment"
																										onChange={
																											this.handleOnChange
																										}
																										value="credit_card"
																									/>
																									<span className="MethodCheck"></span>
																								</label>
																							</div>

																							<div className="row">
																								<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

																									<div className="CardNumber-Form mt-4">
																										<label>Card Number</label>

																										<NumberFormat value={this.state.cardNumber} format="#### #### #### ####" placeholder="#### #### #### ####" name='cardNumber' onValueChange={(values) => {
																											const { formattedValue, value } = values;
																											// formattedValue = $2,223
																											// value ie, 2223
																											this.setState({ cardNumber: value })
																										}} />
																										<img
																											src="/assets/image/atm-card-icon.svg"
																											alt="ATM Card"
																										/>
																									</div>
																								</div>

																								<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																									<div className="CardNumber-Form">
																										<label>Expiry Date</label>
																										<NumberFormat value={this.state.cardExpirDate} format="##/##" placeholder="MM/YY" mask={['M', 'M', 'Y', 'Y']} name='cardExpirDate'
																											onValueChange={(values) => {
																												const { formattedValue, value } = values;
																												let month = limit(value.substring(0, 2), '12');
																												let year = value.substring(2, 4);
																												const expirDate = month + year
																												// formattedValue = $2,223
																												// value ie, 2223
																												this.setState({ cardExpirDate: expirDate })
																											}}
																										/>
																										<img
																											src="/assets/image/post-calendar-icon.svg"
																											style={{ top: "54px" }}
																											alt="Calendar"
																										/>
																									</div>
																								</div>

																								<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																									<div className="CardNumber-Form">
																										<label>CVC/CVV</label>
																										<NumberFormat value={this.state.cardCVC} format="###" placeholder="***" name='cardCVC' onValueChange={(values) => {
																											const { formattedValue, value } = values;
																											// formattedValue = $2,223
																											// value ie, 2223
																											this.setState({ cardCVC: value })
																										}} />
																										<img
																											src="/assets/image/Union-Lock.svg"
																											style={{ top: "54px" }}
																											alt="Union Lock"
																										/>
																									</div>
																								</div>

																								<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																									<div className="ExpiryUnlock">
																										<img
																											src="/assets/image/cardlock-union.svg"
																											alt="Card Lock"
																										/>
																										<h1>
																											Your Transaction is
																											secured with SSL
																											Encryption
                                                    </h1>
																									</div>
																								</div>
																							</div>
																						</div>
																					</div>

																					<div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
																						<div className="AddSummary-Head">
																							<h6>Summary</h6>
																						</div>

																						<div className="Add-SummaryContainer">
																							<div className="PremiumList">
																								<h1>
																									{this.state.selectedBoost == 'free' ? "Free Listing" : this.state.selectedBoost == 'standard' ? "Standard Listing" : this.state.selectedBoost == 'premium' ? "Premium Listing" : "Free Listing"}
																									<span>$14.99</span>
																								</h1>
																								<p>
																									14 Days - 10 Photos - Top Ads
                                                  <br />
                                                  Homepage Ads - Bump Up -
                                                  Social Media Ads
                                                </p>
																							</div>

																							<div className="PremiumList">
																								<h1>
																									Tax <span>$1.95</span>
																								</h1>
																								<p>13% HST</p>
																							</div>

																							<div className="PremiumList">
																								<h1>
																									Total (CAD){" "}
																									<span>$16.90</span>
																								</h1>
																								<p>Ad will expire in 14 days</p>
																							</div>

																							<div className="TotalContinue-Btn">
																								<button
																									type="button"
																									onClick={() =>
																										this.setState({
																											...this.state,
																											stepBoost: 3,
																										})
																									}
																								>
																									Continue
                                                </button>
																								<p>
																									You will not be charged until
																									you post ad.
                                                </p>
																							</div>
																						</div>
																					</div>

																					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
																				</div>
																			</div>
																		</div>
																	</div>
																</React.Fragment>
															) : this.state.stepBoost === 3 ? (
																<React.Fragment>
																	<div className="AdPost-SecOne">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="AddFinalize-Container">
																					<div className="AddFinalize-Head">
																						<h1>Finalize your ad</h1>
																					</div>

																					<div className="Finalize-CardDetail">
																						<div className="CardDetail-Left">
																							<h1>Car Details</h1>
																							<p>
																								Mileage and basic information
                                              </p>
																						</div>

																						<div className="CardDetail-Right">
																							<button type="submit">
																								<img
																									src="/assets/image/post-edit-icon.svg"
																									alt=""
																								/>{" "}
                                                Edit
                                              </button>
																						</div>
																					</div>

																					<div className="Finalize-CardDetail">
																						<div className="CardDetail-Left">
																							<h1>Car Features</h1>
																							<p>
																								Comfort, Entertainment, Extras
                                              </p>
																						</div>

																						<div className="CardDetail-Right">
																							<button type="submit">
																								<img
																									src="/assets/image/post-edit-icon.svg"
																									alt=""
																								/>{" "}
                                                Edit
                                              </button>
																						</div>
																					</div>

																					<div className="Finalize-CardDetail">
																						<div className="CardDetail-Left">
																							<h1>Ad Details</h1>
																							<p>Image, Description, Price</p>
																						</div>

																						<div className="CardDetail-Right">
																							<button type="submit">
																								<img
																									src="/assets/image/post-edit-icon.svg"
																									alt=""
																								/>{" "}
                                                Edit
                                              </button>
																						</div>
																					</div>

																					<div className="Finalize-CardDetail">
																						<div className="CardDetail-Left">
																							<h1>Contact</h1>
																							<p>Location and Phone Number</p>
																						</div>

																						<div className="CardDetail-Right">
																							<button type="submit">
																								<img
																									src="/assets/image/post-edit-icon.svg"
																									alt=""
																								/>{" "}
                                                Edit
                                              </button>
																						</div>
																					</div>

																					<div className="row">
																						<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																							<div className="FinalizePre-Btn">
																								<button
																									className="active"
																									type="submit"
																								>
																									Discard
                                                </button>
																							</div>
																						</div>

																						<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																							<div className="FinalizePre-Btn float-right">
																								<button type="button" onClick={this.submitAdPost} >
																									{/*onClick={() => this.changeStep(5)}>*/}
																									Post Ad
                                                </button>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</React.Fragment>
															) : null
														) : this.state.step === 5 ? (
															<React.Fragment>
																<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																	<div className="AdPost-SecOne">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="AddFinalize-Container">
																					<div className="row">
																						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																							<div className="AllDone-Head">
																								<h1>All Done!</h1>
																								<h2>
																									Your ad is under review and
																									will be up shortly.
                                                </h2>
																								<p>
																									To maintain the quality of our
																									ads, we manually go over each
																									ad and make sure it is
                                                  <br /> to our standard. You
                                                  will receive an email when the
                                                  ad is active.{" "}
																								</p>
																							</div>
																						</div>

																						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																							<div className="FinalizePre-Btn float-left">
																								<button type="submit">
																									Post Ad
                                                </button>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>

																			<div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
																				<div className="PostAdd-ImgRight">
																					<img
																						src="image/vehicle-right-img.png"
																						width="880"
																						height="704"
																						alt=""
																					/>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</React.Fragment>
														) : null}

														{/* </div> */}

														{/* <div className="owl-three owl-carousel owl-theme">
                                                    </div> */}
													</div>
												</div>
												{this.state.step === 4 &&
													this.state.stepBoost !== 3 ? null : (
														<React.Fragment>
															<div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
																<div className="PostAdd-ImgRight">
																	<img
																		src="/assets/image/vehicle-right-img.png"
																		width="880"
																		height="704"
																		alt=""
																	/>
																</div>
															</div>
														</React.Fragment>
													)}
											</div>
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
const mapStateToProps = (state) => {
	return {
		type_of_vehicles: state.adPostReducers.addPostReducer.type_of_vehicle,
		vehicle_makes: state.adPostReducers.addPostReducer.vehicle_make,
		vehicle_models: state.adPostReducers.addPostReducer.vehicle_model,
		vehicle_body: state.adPostReducers.addPostReducer.vehicle_body,
		vehicle_drive_train: state.adPostReducers.addPostReducer.vehicle_drive_train,
		vehicle_fuel_type: state.adPostReducers.addPostReducer.vehicle_fuel_type,
		vehicle_features: state.adPostReducers.addPostReducer.vehicle_features,
		update_view: state.adPostReducers.addPostReducer.update_view,
		user: state.authReducer.authentication.user
	}
}
export default connect(mapStateToProps, {
	get_vehicle_type,
	get_vehicle_make,
	get_vehicle_make,
	get_vehicle_body_type,
	get_vehicle_fuel_type,
	get_vehicle_drive_train,
	get_vehicle_feature,
	toggle_vehicle_features,
	create_ad_post
})(AddPost);

