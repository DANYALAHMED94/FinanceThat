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
import { Link } from 'react-router-dom'
import { toastr } from 'react-redux-toastr'
import { forEach } from "lodash";

// note: you don't need the whole path to node_modules.. just the package name
window.jQuery = $;
// dynamically require owl
require("owl.carousel");
var that
class AddPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			location: "",
			featureName: "",
			previousAccident: '',
			previousOwner: '',
			color: "",
			cylinder: '',
			drivetrain: "",
			fuelType: "",
			transmission: "",
			seating: '',
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
			backTo: '',
			currentTab: 16,
			user_id: this.props.user !== null && this.props.user !== undefined ? this.props.user.user_id : '',
			postSteps: [{
				name: 'Vehicle Details', value: 1, completed: false, current: true
			}, {
				name: 'Photos', value: 2, completed: false, current: false
			}, {
				name: 'Location', value: 3, completed: false, current: false
			}, {
				name: 'Boost', value: 4, completed: false, current: false
			}, {
				name: 'Post Ad', value: 5, completed: false, current: false
			}]

		};
		this.validator = new SimpleReactValidator();
		that = this
	}


	componentDidMount() {
		// runAfterElementExists(".owl-carousel", function () {
		// });
		console.log(this.state)
		var currentTab = this.state.currentTab
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
					lazyLoad: true,
					center: true,
					touchDrag: false,
					mouseDrag: false,
					rewind: false,
					// slideSpeed: 0,
					navContainer: "controls-class",
					smartSpeed: 450,
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
					startPosition: 16,
				});

				// owl.on('changed.owl.carousel', function (e) {
				// 	if (currentTab == e.item.index) {

				owl.on("mousewheel", ".owl-stage", function (e) {
					console.log(that.state)
					if (e.originalEvent.wheelDelta > 0) {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						console.log(that.state.currentTab)
						const jumpTo = that.state.currentTab >= 16 ? 16 : that.state.currentTab + 1
						console.log(jumpTo)
						owl.trigger('to.owl.carousel', jumpTo)
						that.setState({
							...this.state,
							currentTab: that.state.currentTab >= 16 ? 16 : that.state.currentTab + 1
						})
						return false
					}
					if (that.state.currentTab == 17 && that.props.vehicle_features.filter(item => item.checked === true).length > 0) {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 17)
						that.setState({
							...this.state,
							currentTab: 17
						})
						return false
					}
					if (that.state.currentTab == 1 && that.state.previousAccident !== '') {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 17)

						that.setState({
							...this.state,
							currentTab: 17
						})
						return false
					}
					if (that.state.currentTab == 2 && that.state.previousOwner !== '') {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 1)

						that.setState({
							...this.state,
							currentTab: 1
						})
						return false
					}
					if (that.state.currentTab == 3 && that.state.color !== '') {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 2)

						that.setState({
							...this.state,
							currentTab: 2
						})
						return false
					}
					if (that.state.currentTab == 4 && that.state.cylinder !== '') {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 3)

						that.setState({
							...this.state,
							currentTab: 3
						})
						return false
					}
					if (that.state.currentTab == 5 && that.state.drivetrain !== '') {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 4)

						that.setState({
							...this.state,
							currentTab: 4
						})
						return false
					}
					if (that.state.currentTab == 6 && that.state.fuelType !== '') {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 5)

						that.setState({
							...this.state,
							currentTab: 5
						})
						return false
					}
					if (that.state.currentTab == 7 && that.state.transmission !== '') {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 6)

						that.setState({
							...this.state,
							currentTab: 6
						})
						return false
					}
					if (that.state.currentTab == 8 && that.state.seating !== '') {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 7)

						that.setState({
							...this.state,
							currentTab: 7
						})
						return false
					}
					if (that.state.currentTab == 9 && that.state.bodyType !== '') {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 8)

						that.setState({
							...this.state,
							currentTab: 8
						})
						return false
					}
					if (that.state.currentTab == 10 && (that.state.price !== '' && that.state.kilometer !== '')) {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 9)

						that.setState({
							...this.state,
							currentTab: 9
						})
						return false
					}
					if (that.state.currentTab == 11 && that.state.selectCondition !== '') {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 10)

						that.setState({
							...this.state,
							currentTab: 10
						})
						return false
					}
					if (that.state.currentTab == 12 && that.state.selectYear !== '') {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 11)

						that.setState({
							...this.state,
							currentTab: 11
						})
						return false
					}
					if (that.state.currentTab == 13 && (that.state.trim !== '' ||
						that.state.otherTrim !== '')) {

						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 12)

						that.setState({
							...this.state,
							currentTab: 12
						})
						return false
					}
					if (that.state.currentTab == 14 && (that.state.modelName !== '' ||
						that.state.otherModel !== '')) {

						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 13)
						that.setState({
							...this.state,
							currentTab: 13
						})
						return false
					}
					if (that.state.currentTab == 15 && (that.state.makeName !== '' ||
						that.state.otherMake !== '')) {
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 14)
						that.setState({
							...this.state,
							currentTab: 14
						})
						return false
					}
					if (that.state.currentTab == 16 && that.state.typeOfVehicle !== '') {

						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger('to.owl.carousel', 15)

						that.setState({
							...this.state,
							currentTab: 15
						})
						return false
					}

					e.preventDefault();
				});
				$('#btn').on('click', function () {
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
		// Geocode.setRegion("es");

		// Enable or disable logs. Its optional.
		Geocode.enableDebug();

	}

	changeStep = (e) => {
		this.setState({
			...this.state,
			step: e,
			stepBoost: e == 4 ? 1 : 1,
			postSteps: this.state.postSteps.slice().map(item => {
				return {
					...item,
					current: item.value == e ? true : false
				}

			})
		});


		if (e == 1) {
			this.reLoadCarsoul()

		}
	};

	nextSlide = () => {
		if (this.state.backTo == '') {
			if (!this.validator.fieldValid('price')) {
				this.validator.showMessageFor('price')
				this.forceUpdate();
				return false
			}
			if (!this.validator.fieldValid('kilometer')) {
				this.validator.showMessageFor('kilometer')
				this.forceUpdate();
				return false
			}

			document.getElementById("btn").click();
		} else {

			this.setState({
				...this.state,
				step: 4,
				backTo: '',
				stepBoost: 3,
				postSteps: this.state.postSteps.slice().map(item => {
					if (item.value == 4) {
						return {
							...item,
							current: true
						}
					}
					return {
						...item,
						current: false,
					}
				})
			});
		}

	}

	changeStepButton = (prev, current) => {
		console.log(this.state)
		if (this.state.backTo == '') {
			this.setState({
				...this.state,
				step: current,
				backTo: '',
				stepBoost: current == 4 ? 1 : 1,
				postSteps: this.state.postSteps.slice().map(item => {
					if (item.value == prev) {
						return {
							...item,
							completed: true,
							current: false
						}
					}
					return {
						...item,
						current: item.value == current ? true : false
					}
				})
			});
		} else {
			this.setState({
				...this.state,
				step: 4,
				backTo: '',
				stepBoost: 3,
				postSteps: this.state.postSteps.slice().map(item => {
					if (item.value == 4) {
						return {
							...item,
							current: true
						}
					}
					return {
						...item,
						current: false,
					}
				})
			});
		}



		if (current == 1) {
			this.reLoadCarsoul()

		}
	}

	editPost = (step, slide, backTo) => {
		this.setState({
			...this.state,
			step: step,
			postSteps: this.state.postSteps.slice().map(item => {
				if (item.value == step) {
					return {
						...item,
						current: !item.current
					}
				}
				return item
			}),
			backTo: backTo
		});
		if (step == 1) {
			const backTo = this.state.backTo
			$(document).ready(function () {
				if ($('.owl-carousel').length) {
					var owl = $(".owl-carousel");
					var owlInstance = owl.data('owlCarousel');
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
						// slideSpeed: 0,
						smartSpeed: 450,
						animateIn: "slideInUp",
						navContainer: "controls-class",
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
						startPosition: slide,
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
						$('.owl-carousel').trigger('refresh.owl.carousel');
						owl.trigger("prev.owl");
					});
				}
			})
		}
	}

	reLoadCarsoul = () => {
		// window.scrollTo(0, 0);
		// window.scrollTo({
		// 	top: 0,
		// 	behavior: "smooth",
		//   });
		$(document).ready(function () {
			if ($('.owl-carousel').length) {
				var owl = $(".owl-carousel");
				var owlInstance = owl.data('owlCarousel');
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
					// slideSpeed: 0,
					smartSpeed: 450,
					animateIn: "slideInUp",
					navContainer: "controls-class",
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
					startPosition: 16,
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
					$('.owl-carousel').trigger('refresh.owl.carousel');
					owl.trigger("prev.owl");
				});
			}
		})
	}

	discardState = () => {
		this.setState({
			step: 1,
			location: "",
			featureName: "",
			previousAccident: '',
			previousOwner: '',
			color: "",
			cylinder: '',
			drivetrain: "",
			fuelType: "",
			transmission: "",
			seating: '',
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
			backTo: '',
			user_id: this.props.user !== null && this.props.user !== undefined ? this.props.user.user_id : '',
			postSteps: [{
				name: 'Vehicle Details', value: 1, completed: false, current: true
			}, {
				name: 'Photos', value: 2, completed: false, current: false
			}, {
				name: 'Location', value: 3, completed: false, current: false
			}, {
				name: 'Boost', value: 4, completed: false, current: false
			}, {
				name: 'Post Ad', value: 5, completed: false, current: false
			}]

		})
		this.reLoadCarsoul()
	}

	handleOnChangeScroll = (e) => {
		const { name, value } = e.target;
		// this.setState({
		// 	...this.state,
		// 	[name]: value,

		// });
		if (this.state.currentTab == 17 && this.props.vehicle_features.filter(item => item.checked === true).length > 0) {
			this.setState({
				...this.state,
				[name]: value,
				currentTab: 16
			})

		}
		if (this.state.currentTab == 1 && name == 'previousAccident') {
			this.setState({
				...this.state,
				[name]: value,
				currentTab: 17
			})

		}
		if (this.state.currentTab == 2 && name == 'previousOwner') {
			this.setState({
				...this.state,
				[name]: value,
				currentTab: 1
			})

		}
		if (this.state.currentTab == 3 && name == 'color') {
			this.setState({
				...this.state,
				[name]: value,
				currentTab: 2
			})

		}
		if (this.state.currentTab == 4 && name == 'cylinder') {

			this.setState({
				...this.state,
				[name]: value,
				currentTab: 3
			})

		}
		if (this.state.currentTab == 5 && name == 'drivetrain') {
			this.setState({
				...this.state,
				[name]: value,
				currentTab: 4
			})

		}
		if (this.state.currentTab == 6 && name == 'fuelType') {

			this.setState({
				...this.state,
				[name]: value,
				currentTab: 5
			})

		}
		if (this.state.currentTab == 7 && name == 'transmission') {
			this.setState({
				...this.state,
				[name]: value,
				currentTab: 6
			})

		}
		if (this.state.currentTab == 8 && name == 'seating') {

			this.setState({
				...this.state,
				[name]: value,
				currentTab: 7
			})

		}
		if (this.state.currentTab == 9 && name == 'bodyType') {
			this.setState({
				...this.state,
				[name]: value,
				currentTab: 8
			})

		}
		if (this.state.currentTab == 10 && (name == 'price' || name == 'kilometer')) {
			this.setState({
				...this.state,
				[name]: value,
				currentTab: 9
			})

		}
		if (this.state.currentTab == 11 && name == 'selectCondition') {
			this.setState({
				...this.state,
				[name]: value,
				currentTab: 10
			})

		}
		if (this.state.currentTab == 12 && name == 'selectYear') {
			this.setState({
				...this.state,
				[name]: value,
				currentTab: 11
			})

		}
		if (this.state.currentTab == 13 && (name == 'trim' ||
			name == 'otherTrim')) {
			this.setState({
				...this.state,
				[name]: value,
				currentTab: 12
			})

		}
		if (this.state.currentTab == 14 && (name == "modelName" ||
			name == "otherModel")) {
			this.setState({
				...this.state,
				[name]: value,
				currentTab: 13
			})
		}
		if (this.state.currentTab == 15 && (name == 'makeName' ||
			name == 'otherMake')) {
			this.setState({
				...this.state,
				[name]: value,
				currentTab: 14
			})

		}

		if (e.target.name !== 'price' && e.target.name !== 'kilometer' && e.target.name !== 'otherMake' && e.target.name !== 'otherModel' && e.target.name !== 'otherTrim') {
			document.getElementById("btn").click();
		}

	};

	handleOnChange = (e) => {
		const { name, value } = e.target
		this.setState({
			...this.state,
			[name]: value
		})
	}

	hanldeOnChangeTypeOfVehicle = (e) => {
		const { name, value } = e.target;
		document.getElementById("btn").click();
		if (this.state.currentTab == 16 && name == 'typeOfVehicle') {
			this.setState({
				...this.state,
				[name]: value,
				currentTab: 15
			})

		}
		// this.setState({
		// 	...this.state,
		// 	[name]: value,
		// });
	};

	handleOnClick = (name, value) => {
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
		let file = files[0];
		files.forEach(item => {
			if (file.type != "image/png" && file.type != "image/jpg" && file.type != "image/jpeg") {
				toastr.error('Error', `${item.path} File does not support. You must use .png, jpeg or .jpg`)
				// return false;
			} else
				if (file.size > (2 * 1024 * 1024)) {
					toastr.error('Error', `${item.path} Please upload a file smaller than 2 MB`)
					// return false;
				} else {
					this.setState({
						...this.state,
						files: [...this.state.files, (item)],
						preViewFiles: [...this.state.preViewFiles, Object.assign(item, {
							preview: URL.createObjectURL(item)
						})]
					})
				}
		})
		// if (file.type != "image/png" && file.type != "image/jpg" && file.type != "image/jpeg") {
		// 	toastr.error('Error', "File does not support. You must use .png, jpeg or .jpg ")
		// 	return false;
		// }
		// if (file.size > (2 * 1024 * 1024)) {
		// 	toastr.error('Error', "Please upload a file smaller than 5 MB")
		// 	return false;
		// }
		// this.setState({
		// 	...this.state,
		// 	files: [...this.state.files, (files[0])],
		// 	preViewFiles: [...this.state.preViewFiles, files.map((file) =>
		// 		Object.assign(file, {
		// 			preview: URL.createObjectURL(file)
		// 		}))[0]],
		// })
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
		// if (this.state.typeOfVehicle == '' || (this.state.modelName == '' && this.state.otherModel == '') || (this.state.makeName == '' && this.state.otherMake == '') || (this.state.trimName == '' && this.state.otherTrim == '') || this.state.fuelType == '' || this.state.bodyType == '' || this.state.transmission == '' || this.props.vehicle_features.filter(item => item.checked === true).length == 0 || this.state.color == '' || this.state.cylinder == '' || this.state.drivetrain == '' || this.state.previousOwner == '' || this.state.previousAccident == '' || this.state.selectCondition == '') {
		// 	this.changeStep(1)
		// 	this.validator.showMessages();
		// 	this.forceUpdate();
		// 	return false;
		// }
		// if (this.state.files.length == 0) {
		// 	this.changeStep(2)
		// 	this.validator.showMessages();
		// 	this.forceUpdate();
		// 	return false;
		// }
		// if (this.state.locationName == '') {
		// 	this.changeStep(3)
		// 	this.validator.showMessages();
		// 	this.forceUpdate();
		// 	return false;
		// }
		// if (this.state.checkPayment == '' && this.state.cardCVC == '' && this.state.cardExpirDate == '' && this.state.cardNumber == '') {
		// 	this.setState({
		// 		...this.state,
		// 		step: 4,
		// 		stepBoost: 2
		// 	});
		// 	this.validator.showMessages();
		// 	this.forceUpdate();
		// 	return false;
		// }
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
		var listing_type = 1;
		if (this.state.selectedBoost == 'free') {
			listing_type = 1;
		} else if (this.state.selectedBoost == 'standard') {
			listing_type = 2;
		} else {
			listing_type = 3;
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
		formData.append("kilometer", this.state.kilometer == '' ? 0 : this.state.kilometer.split(',').join(""));
		formData.append("price", this.state.price == '' ? 0 : this.state.price.split(',').join(""));
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
		formData.append("longitude", this.state.longitude == '' ? 0 : this.state.longitude.toFixed(7));
		formData.append("latitude", this.state.latitude == '' ? 0 : this.state.latitude.toFixed(7));
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
		formData.append("is_deleted", null);
		formData.append("modified_at", new Date());
		formData.append("is_sold", 0);

		formData.append("description", '');
		formData.append("stripe_payment_amount", '');
		formData.append("stripe_check_id", '');
		formData.append("bumpup_active", this.state.hardCodeInt);
		formData.append("listing_type", listing_type);
		formData.append("dealer_or_private_seller", this.state.hardCodeInt);
		formData.append("sub_type_id", this.state.hardCodeInt);
		formData.append("user_type", localStorage.getItem('user_type') !== null && localStorage.getItem('user_type') !== undefined ? localStorage.getItem('user_type') : '');
		formData.append("has_bumpup", this.state.hardCodeInt);
		formData.append("city", '');

		this.props.create_ad_post(formData)
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.typeOfVehicle !== this.state.typeOfVehicle && this.state.typeOfVehicle !== '' && this.state.typeOfVehicle !== undefined) {
			this.setState({
				...this.state,
				featureName: "",
				previousAccident: '',
				previousOwner: '',
				color: "",
				cylinder: '',
				drivetrain: "",
				fuelType: "",
				transmission: "",
				seating: '',
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
				makeName: "",
				otherMake: "",
				backTo: ''
			})
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
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
			this.changeStepButton(4, 5)
		}
		if (prevProps.user !== this.props.user && this.props.user !== null && this.props.user !== undefined) {

			this.setState({
				...this.state,
				user_id: this.props.user.user_id
			})
		}
	}


	render() {
		console.log('state', this.state)
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
							// response.results[0].address_components.map((item, index) => {
							location.push({
								label: response.results[0].formatted_address,
								value: response.results[0].place_id,
								lat: response.results[0].geometry.location.lat,
								lng: response.results[0].geometry.location.lng
							})

							// })
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
					<div className="col-xl-3 col-lg-4 col-md-3 col-sm-12 col-12" key={index} >
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
								{item.name.toUpperCase() == 'AUTOMOTIVE' || item.name.toUpperCase() == 'AUTOMOTIVE' || item.name.toUpperCase() == 'AUTOS' ? <img
									src={"/assets/image/vehicle-1.svg"}
									alt={item.name}
								/> : item.name.toUpperCase() == 'MOTORCYCLE' || item.name.toUpperCase() == 'MOTORCYCLES' ? <img src="/assets/image/vehicle-2.svg" alt={item.name}
								/> : item.name.toUpperCase() == 'ATV/UTV' || item.name.toUpperCase() == 'ATVS/UTVS' ? <img src="/assets/image/vehicle-3.svg" alt={item.name}
								/> : item.name.toUpperCase() == 'SNOWMOBILE' || item.name.toUpperCase() == 'SNOWMOBILES' ? <img src="/assets/image/vehicle-4.svg" alt={item.name}
								/> : item.name.toUpperCase() == 'RV' || item.name.toUpperCase() == 'RVS' ? <img src="/assets/image/vehicle-5.svg" alt={item.name}
								/> : item.name.toUpperCase() == 'WATERCRAFT' || item.name.toUpperCase() == 'WATERCRAFTS' ? <img src="/assets/image/vehicle-6.svg" alt={item.name}
								/> : item.name.toUpperCase() == 'BOAT' || item.name.toUpperCase() == 'BOATS' ? <img src="/assets/image/vehicle-6.svg" alt={item.name}
								/> : item.name.toUpperCase() == 'LAWN & GARDEN' || item.name.toUpperCase() == 'LAWN & GARDENS' ? <img src="/assets/image/vehicle-1.svg" alt={item.name}
								/> : ''}

								<h1>{item.name}</h1>
							</div>
						</label>

					</div>
				</React.Fragment>
			)
		}
		)
		const enableStep2 = (this.state.typeOfVehicle !== '' && (this.state.modelName !== '' || this.state.otherModel !== '') && (this.state.makeName !== '' || this.state.otherMake !== '') && (this.state.trimName !== '' || this.state.otherTrim !== '') && this.state.fuelType !== '' && this.state.bodyType !== '' && this.state.transmission !== '' && this.props.vehicle_features.filter(item => item.checked === true).length !== 0 && this.state.color !== '' && this.state.cylinder !== '' && this.state.drivetrain !== '' && this.state.previousOwner !== '' && this.state.previousAccident !== '' && this.state.selectCondition !== '') ? true : false
		const enableStep3 = this.state.files.length > 0
		const enableStep4 = this.state.locationName !== '' && this.state.locationName !== null
		return (
			<React.Fragment>
				<section className="Section-AddPost ">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<div className="PostAdd-Container">
									<div className="row">
										<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
											<div className="PostAdd-TopList">
												<ul>
													{this.state.postSteps.map((item, index) => (
														<React.Fragment>
															<li
																className={
																	item.current == true ? "headactive" : item.completed == true ? "active" : ''
																}
																onClick={item.current == false && item.completed == true ? () => this.changeStep(item.value) : item.current == true && item.completed == false ? () => this.changeStep(item.value) : ''}
															>
																<a>{item.value}</a>
															</li>
															<li
																className={
																	item.current == true ? "headactive" : item.completed == true ? "activetext" : ''
																}
																onClick={item.current == false && item.completed == true ? () => this.changeStep(item.value) : item.current == true && item.completed == false ? () => this.changeStep(item.value) : ''}
															>
																<h1>{item.name}</h1>
															</li>
														</React.Fragment>
													))}
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
																					{this.validator.message('Features', this.state.featureName, 'required')}
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


																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="SecSeven-Btn">
																					<button
																						type="button"
																						onClick={enableStep2 == true ? () => this.changeStepButton(1, 2) : ''}
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
																			{this.validator.message('Previous Accident', this.state.previousAccident, 'required')}
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
																			{this.validator.message('Previous Owner', this.state.previousOwner, 'required')}
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
																			{this.validator.message('Color', this.state.color, 'required')}
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
																			{this.validator.message('Cylinder', this.state.cylinder, 'required')}
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
																			{this.validator.message('Drive Train', this.state.drivetrain, 'required')}
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
																			{this.validator.message('Fuel Type', this.state.fuelType, 'required')}
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
																			{this.validator.message('Transmission', this.state.transmission, 'required')}
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
																						onChange={this.handleOnChangeScroll}
																						value={this.state.seating}

																					>
																						<option value=''></option>
																						<option value='2'>2</option>
																						<option value='4'>4</option>
																						<option value='5'>5</option>
																						<option value='6'>6</option>
																						<option value='8'>8</option>
																						<option value='10'>10+</option>
																					</select>
																					{this.validator.message('Seating', this.state.seating, 'required')}
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
																			{this.validator.message('Body Type', this.state.bodyType, 'required')}
																		</div>
																	</div>

																	<div className="AdPost-SecSeven item">
																		<div className="row">
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="Price-Form">
																					<label>Price</label>
																					<NumberFormat
																						className='form-control'
																						value={(this.state.price)}
																						decimalScale={2}
																						onChange={this.handleOnChangeScroll}
																						thousandSeparator={true}
																						id="price"
																						name="price"
																					/>
																					{this.validator.message('price', this.state.price, 'required')}
																				</div>
																			</div>

																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="Kilometter-Form mb-0">
																					<label>Kilometers</label>
																					<NumberFormat
																						className='form-control'
																						value={this.state.kilometer}
																						id="kilometer"
																						name="kilometer"
																						onChange={this.handleOnChangeScroll}
																						thousandSeparator={true}
																					/>
																					{this.validator.message('kilometer', this.state.kilometer, 'required')}
																				</div>
																			</div>
																			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																				<div className="SecSeven-Btn">
																					<button
																						type="button"
																						onClick={this.nextSlide}
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
																			{this.validator.message('Condition', this.state.selectCondition, 'required')}
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
																						onChange={this.handleOnChangeScroll}
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
																					{this.validator.message('Year', this.state.selectYear, 'required')}
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
																						onChange={this.handleOnChangeScroll}
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
																						onChange={this.handleOnChangeScroll}
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
																						onChange={this.handleOnChangeScroll}
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
																				index >= 0 && index < 6 ? (
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
																					</React.Fragment>) : null
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
																						onChange={this.handleOnChangeScroll}
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
																					{item.make_name.toUpperCase() == 'HONDA' ? (<React.Fragment>
																						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index}>
																							<div className={this.state.selectVehicleMake == item.id ? "SelectCar-Brand active" : "SelectCar-Brand"} onClick={() => this.handleOnClick('selectVehicleMake', item.id)}>
																								<img src="/assets/image/honda.svg" alt={item.make_name} />
																							</div>
																						</div>
																					</React.Fragment>) : item.make_name.toUpperCase() == 'TOYOTA' ? (<React.Fragment>
																						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index}>
																							<div className={this.state.selectVehicleMake == item.id ? "SelectCar-Brand active" : "SelectCar-Brand"} onClick={() => this.handleOnClick('selectVehicleMake', item.id)}>
																								<img src="/assets/image/toyota.svg" alt={item.make_name} />
																							</div>
																						</div>
																					</React.Fragment>) : item.make_name.toUpperCase() == 'NISSAN' ? (<React.Fragment>
																						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index}>
																							<div className={this.state.selectVehicleMake == item.id ? "SelectCar-Brand active" : "SelectCar-Brand"} onClick={() => this.handleOnClick('selectVehicleMake', item.id)}>
																								<img src="/assets/image/nissan.svg" alt={item.make_name} />
																							</div>
																						</div>
																					</React.Fragment>) : item.make_name.toUpperCase() == 'MAZDA' ? (<React.Fragment>
																						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index}>
																							<div className={this.state.selectVehicleMake == item.id ? "SelectCar-Brand active" : "SelectCar-Brand"} onClick={() => this.handleOnClick('selectVehicleMake', item.id)}>
																								<img src="/assets/image/mazda.svg" alt={item.make_name} />
																							</div>
																						</div>
																					</React.Fragment>) : item.make_name.toUpperCase() == 'HYUNDAI' ? (<React.Fragment>
																						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index}>
																							<div className={this.state.selectVehicleMake == item.id ? "SelectCar-Brand active" : "SelectCar-Brand"} onClick={() => this.handleOnClick('selectVehicleMake', item.id)}>
																								<img src="/assets/image/hyundai.svg" alt={item.make_name} />
																							</div>
																						</div>
																					</React.Fragment>) : item.make_name.toUpperCase() == 'CHEVROLET' ? (<React.Fragment>
																						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index}>
																							<div className={this.state.selectVehicleMake == item.id ? "SelectCar-Brand active" : "SelectCar-Brand"} onClick={() => this.handleOnClick('selectVehicleMake', item.id)}>
																								<img src="/assets/image/chevrolet.svg" alt={item.make_name} />
																							</div>
																						</div>
																					</React.Fragment>) : item.make_name.toUpperCase() == 'FORD' ? (<React.Fragment>
																						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index}>
																							<div className={this.state.selectVehicleMake == item.id ? "SelectCar-Brand active" : "SelectCar-Brand"} onClick={() => this.handleOnClick('selectVehicleMake', item.id)}>
																								<img src="/assets/image/ford.svg" alt={item.make_name} />
																							</div>
																						</div>
																					</React.Fragment>) : item.make_name.toUpperCase() == 'VOLKSWAGEN' ? (<React.Fragment>
																						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index}>
																							<div className={this.state.selectVehicleMake == item.id ? "SelectCar-Brand active" : "SelectCar-Brand"} onClick={() => this.handleOnClick('selectVehicleMake', item.id)}>
																								<img src="/assets/image/volkswagen.svg" alt={item.make_name} />
																							</div>
																						</div>
																					</React.Fragment>) : item.make_name.toUpperCase() == 'AUDI' ? (<React.Fragment>
																						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index}>
																							<div className={this.state.selectVehicleMake == item.id ? "SelectCar-Brand active" : "SelectCar-Brand"} onClick={() => this.handleOnClick('selectVehicleMake', item.id)}>
																								<img src="/assets/image/audi.svg" alt={item.make_name} />
																							</div>
																						</div>
																					</React.Fragment>) : item.make_name.toUpperCase() == 'LEXUS' ? (<React.Fragment>
																						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index}>
																							<div className={this.state.selectVehicleMake == item.id ? "SelectCar-Brand active" : "SelectCar-Brand"} onClick={() => this.handleOnClick('selectVehicleMake', item.id)}>
																								<img src="/assets/image/lexus.svg" alt={item.make_name} />
																							</div>
																						</div>
																					</React.Fragment>) : item.make_name.toUpperCase() == 'MERCEDES-BENZ' || item.make_name.toUpperCase() == 'MERCEDES' || item.make_name.toUpperCase() == 'MERCEDESBENZ' ? (<React.Fragment>
																						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index}>
																							<div className={this.state.selectVehicleMake == item.id ? "SelectCar-Brand active" : "SelectCar-Brand"} onClick={() => this.handleOnClick('selectVehicleMake', item.id)}>
																								<img src="/assets/image/mercedes-benz.svg" alt={item.make_name} />
																							</div>
																						</div>
																					</React.Fragment>) : item.make_name.toUpperCase() == 'PROSCHE' ? (<React.Fragment>
																						<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index}>
																							<div className={this.state.selectVehicleMake == item.id ? "SelectCar-Brand active" : "SelectCar-Brand"} onClick={() => this.handleOnClick('selectVehicleMake', item.id)}>
																								<img src="/assets/image/prosche.svg" alt={item.make_name} />
																							</div>
																						</div>
																					</React.Fragment>) : null}
																					{/* <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" key={index}>
																						<div className={this.state.selectVehicleMake == item.id ? "SelectCar-Brand active" : "SelectCar-Brand"} onClick={() => this.handleOnClick('selectVehicleMake', item.id)}>
																							{item.make_name.toUpperCase() == 'HONDA' ? <img src="/assets/image/honda.svg" alt={item.make_name} /> : item.make_name.toUpperCase() == 'TOYOTA' ? <img src="/assets/image/toyota.svg" alt={item.make_name} /> : item.make_name.toUpperCase() == 'NISSAN' ? <img src="/assets/image/nissan.svg" alt={item.make_name} /> : item.make_name.toUpperCase() == 'HYUNDAI' ? <img src="/assets/image/hyundai.svg" alt={item.make_name} /> : item.make_name.toUpperCase() == 'MAZDA' ? <img src="/assets/image/mazda.svg" alt={item.make_name} /> : item.make_name.toUpperCase() == 'FORD' ? <img src="/assets/image/ford.svg" alt={item.make_name} /> : item.make_name.toUpperCase() == 'CHEVROLET' ? <img src="/assets/image/chevrolet.svg" alt={item.make_name} /> : item.make_name.toUpperCase() == 'VOLKSWAGEN' ? <img src="/assets/image/volkswagen.svg" alt={item.make_name} /> : item.make_name.toUpperCase() == 'AUDI' ? <img src="/assets/image/audi.svg" alt={item.make_name} /> : item.make_name.toUpperCase() == 'LEXUS' ? <img src="/assets/image/lexus.svg" alt={item.make_name} /> : item.make_name.toUpperCase() == 'MERCEDES-BENZ' ? <img src="/assets/image/mercedes-benz.svg" alt={item.make_name} /> : item.make_name.toUpperCase() == 'MERCEDES' ? <img src="/assets/image/mercedes-benz.svg" alt={item.make_name} /> : item.make_name.toUpperCase() == 'MERCEDESBENZ' ? <img src="/assets/image/mercedes-benz.svg" alt={item.make_name} /> : item.make_name.toUpperCase() == 'PROSCHE' ? <img src="/assets/image/prosche.svg" alt={item.make_name} /> : null}
																						</div>
																					</div> */}
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
																					onClick={enableStep3 == true ? () => this.changeStepButton(2, 3) : ''}
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
																			<AsyncSelect cacheOptions loadOptions={promiseOptions} onChange={this.handleInputChange} value={this.state.location} isClearable />
																		</div>
																	</div>

																	<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																		<div className="SecSeven-Btn">
																			<button
																				type="button"
																				onClick={enableStep4 == true ? () => this.changeStepButton(3, 4) : ''}
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
																							<button type="button" onClick={() => this.editPost(1, 16, 10)}>
																								<img
																									src="/assets/image/post-edit-icon.svg"
																									alt=""
																								/>
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
																							<button type="button" onClick={() => this.editPost(1, 17, 17)}>
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
																							<button type="button" onClick={() => this.editPost(2, 0, 4)}>
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
																							<button type="button" onClick={() => this.editPost(3, 0, 4)}>
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
																									type="button"
																									onClick={this.discardState}
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
																								<Link to="/Ad-post/list" >
																									<button type="button" >
																										Post Ad
                                                </button>
																								</Link>
																							</div>
																						</div>
																					</div>
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
