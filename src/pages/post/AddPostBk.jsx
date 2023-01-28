import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel2";
import { Helmet } from "react-helmet";
import $ from "jquery";
// note: you don't need the whole path to node_modules.. just the package name
window.jQuery = $;
// dynamically require owl
require("owl.carousel");
function runAfterElementExists(jquery_selector, callback) {
	$.noConflict();
	var checker = window.setInterval(function () {
		//if one or more elements have been yielded by jquery
		//using this selector
		console.log(jquery_selector);
		if ($(jquery_selector).length) {
			console.log(jquery_selector);
			//stop checking for the existence of this element
			clearInterval(checker);
			var owl = $(".owl-carousel");
			console.log("owl", owl);
			owl.owlCarousel({
				loop: true,
				nav: false,
				dots: true,
				center: true,
				touchDrag: false,
				mouseDrag: false,
				slideSpeed: 300,
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
					owl.trigger("next.owl");
				} else {
					owl.trigger("prev.owl");
				}
				e.preventDefault();
			});
			//call the passed in function via the parameter above
			callback();
		}
	}, 200); //I usually check 5 times per second
}

//this is an example place in your code where you would like to
//start checking whether the target element exists
//I have used a class below, but you can use any jQuery selector
runAfterElementExists(".owl-carousel", function () {

	//any code here will run after the element is found to exist
	//and the interval has been deleted
	// $(document).ready(function () {

	// });
});

class AddPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			vehicleDetailStep: 1,
			location: "",
			photo: null,
			featureName: "",
			previousAccident: "No_Accident",
			previousOwner: "1_Owner",
			color: "green",
			cylinder: "3",
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
			searchMake: "",
			otherMake: "",
			selectedBoost: "",
			stepBoost: 1,
			checkPayment: "",
			cardCVC: "",
			cardExpirDate: "",
			cardNumber: "",
		};
	}

	componentDidMount() {
		runAfterElementExists(".owl-carousel", function () {
		});
	}

	changeStep = (e) => {
		this.setState({
			...this.state,
			step: e,
			stepBoost: e == 4 ? 1 : 1
		});

		if (e == 1) {
			runAfterElementExists(".owl-carousel", function () {
			});
		}
	};
	handleOnChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			...this.state,
			[name]: value,
		});
	};
	hanldeOnChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			...this.state,
			[name]: value,
		});
	};
	handleOnClick = (name, value, e) => {
		this.setState({
			...this.state,
			[name]: value,
		});
	};
	handleOnClickBoost = (name, value, e) => {
		this.setState({
			...this.state,
			[name]: value,
			stepBoost: e,
		});
	};

	render() {
		console.log(this.state);
		return (
			<React.Fragment>
				{/* <Helmet>
				<script src="/assets/js/dropZone.js"></script>
				<script src="/assets/owlcarousel/owl.carousel.min.js"></script>

			</Helmet> */}
				<section className="Section-AddPost">
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
																<div className="owl-three owl-carousel owl-theme">
																	{this.state.vehicleDetailStep === 16 ? (<React.Fragment>
																		<div className="AdPost-SecThree">
																			<div className="row">
																				<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pl-0 pr-0 pr-0 pl-0">
																					<div className="VehicleForm-Head">
																						<label>Features</label>
																					</div>
																				</div>
																			</div>

																			<div className="row BrandMt">
																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Leather seats
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="leather_seats"
																							checked={
																								this.state.featureName ==
																								"leather_seats"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Navigation
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="navigation"
																							checked={
																								this.state.featureName ==
																								"navigation"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Push Start
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="push_start"
																							checked={
																								this.state.featureName ==
																								"push_start"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Heated mirrors
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="heated_mirrors"
																							checked={
																								this.state.featureName ==
																								"heated_mirrors"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Cruise Control
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="curise_control"
																							checked={
																								this.state.featureName ==
																								"curise_control"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Bluetooth
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="bluetooth"
																							checked={
																								this.state.featureName ==
																								"bluetooth"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Adaptive Cruise
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="adaptive_cruise"
																							checked={
																								this.state.featureName ==
																								"adaptive_cruise"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Heated mirrors
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="heated_mirrors"
																							checked={
																								this.state.featureName ==
																								"heated_mirrors"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Sunroof
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="sunroof"
																							checked={
																								this.state.featureName ==
																								"sunroof"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Allow wheels
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="allow_wheels"
																							checked={
																								this.state.featureName ==
																								"allow_wheels"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Trailer hitch
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="trailer_hitch"
																							checked={
																								this.state.featureName ==
																								"trailer_hitch"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Heated seats
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="heated_seats"
																							checked={
																								this.state.featureName ==
																								"heated_seats"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Alarm
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="alarm"
																							checked={
																								this.state.featureName == "alarm"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Power locks
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="power_locks"
																							checked={
																								this.state.featureName ==
																								"power_locks"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Dual Climate Control
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="dual_climate_controle"
																							checked={
																								this.state.featureName ==
																								"dual_climate_controle"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn">
																						Power mirrors
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="power_mirrors"
																							checked={
																								this.state.featureName ==
																								"power_mirrors"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn mb-0">
																						Keyless entry
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="keyLess_entry"
																							checked={
																								this.state.featureName ==
																								"keyLess_entry"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn mb-0">
																						Fog lights
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="fog_light"
																							checked={
																								this.state.featureName ==
																								"fog_light"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pr-0 pl-0">
																					<label className="FeatureRadio-Btn mb-0">
																						Parking Assistant
                                          <input
																							type="radio"
																							name="featureName"
																							id="featureRadio"
																							value="parking_assistant"
																							checked={
																								this.state.featureName ==
																								"parking_assistant"
																							}
																							onChange={this.handleOnChange}
																						/>
																						<span className="FeatureMark"></span>
																					</label>
																				</div>

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
																	</React.Fragment>) : null}
															
																	{this.state.vehicleDetailStep === 15 ? (<React.Fragment>
																		<div className="AdPost-SecThree">
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
																								"No_Accident"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"previousAccident",
																								"No_Accident"
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
																								"1_Accident"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"previousAccident",
																								"1_Accident"
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
																								"2+_Accident"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"previousAccident",
																								"2+_Accident"
																							)
																						}
																					>
																						<h1>2+ Accidents</h1>
																					</div>
																				</div>
																			</div>
																		</div>
																	</React.Fragment>) : null}
															
																	{this.state.vehicleDetailStep === 14 ? (<React.Fragment>
																		<div className="AdPost-SecThree">
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
																								"1_Owner"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"previousOwner",
																								"1_Owner"
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
																								"2_Owner"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"previousOwner",
																								"2_Owner"
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
																								"2+ Owner"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"previousOwner",
																								"2+ Owner"
																							)
																						}
																					>
																						<h1>2+ Owner</h1>
																					</div>
																				</div>
																			</div>
																		</div>
																	</React.Fragment>) : null}
																														
																	{this.state.vehicleDetailStep === 13 ? (<React.Fragment>
																	<div className="AdPost-SecThree">
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
																	</React.Fragment>):null}
																
																	{this.state.vehicleDetailStep === 12 ? (<React.Fragment>
																		<div className="AdPost-SecThree">
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
																	</React.Fragment>) : null}
																	
																	{this.state.vehicleDetailStep === 11 ? (<React.Fragment>
																		<div className="AdPost-SecThree">
																			<div className="row">
																				<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																					<div className="VehicleForm-Head">
																						<label>Drivetrain</label>
																					</div>
																				</div>
																			</div>

																			<div className="row BrandMt">
																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.drivetrain === "AWD"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"drivetrain",
																								"AWD"
																							)
																						}
																					>
																						<h1>AWD</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.drivetrain === "FWD"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"drivetrain",
																								"FWD"
																							)
																						}
																					>
																						<h1>FWD</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.drivetrain === "RWD"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"drivetrain",
																								"RWD"
																							)
																						}
																					>
																						<h1>RWD</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.drivetrain === "4X4"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"drivetrain",
																								"4X4"
																							)
																						}
																					>
																						<h1>4X4</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.drivetrain === "4X2"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"drivetrain",
																								"4X2"
																							)
																						}
																					>
																						<h1>4X2</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.drivetrain === "OTHER"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"drivetrain",
																								"OTHER"
																							)
																						}
																					>
																						<h1>OTHER</h1>
																					</div>
																				</div>
																			</div>
																		</div>
																	</React.Fragment>) : null}
																	
																	{this.state.vehicleDetailStep === 11 ? (<React.Fragment>
																		<div className="AdPost-SecThree">
																			<div className="row">
																				<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																					<div className="VehicleForm-Head">
																						<label>Fuel Type</label>
																					</div>
																				</div>
																			</div>

																			<div className="row BrandMt">
																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.fuelType === "Gasoline"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"fuelType",
																								"Gasoline"
																							)
																						}
																					>
																						<h1>Gasoline</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.fuelType === "Diesel"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"fuelType",
																								"Diesel"
																							)
																						}
																					>
																						<h1>Diesel</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.fuelType === "Electric"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"fuelType",
																								"Electric"
																							)
																						}
																					>
																						<h1>Electric</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.fuelType === "CNC"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"fuelType",
																								"CNC"
																							)
																						}
																					>
																						<h1>CNC</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.fuelType === "Hybrid"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"fuelType",
																								"Hybrid"
																							)
																						}
																					>
																						<h1>Hybrid</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.fuelType === "OTHER"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"fuelType",
																								"OTHER"
																							)
																						}
																					>
																						<h1>OTHER</h1>
																					</div>
																				</div>
																			</div>
																		</div>
																	</React.Fragment>) : null}
																	
																	{this.state.vehicleDetailStep === 10 ? (<React.Fragment>
																		<div className="AdPost-SecThree">
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
																	</React.Fragment>) : null}
																	
																	{this.state.vehicleDetailStep === 9 ? (<React.Fragment>
																		<div className="AdPost-SecThree">
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
																	</React.Fragment>) : null}
																	
																	{this.state.vehicleDetailStep === 8 ? (<React.Fragment>
																		<div className="AdPost-SecThree">
																			<div className="row">
																				<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																					<div className="VehicleForm-Head">
																						<label>Body Type</label>
																					</div>
																				</div>
																			</div>

																			<div className="row BrandMt">
																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.bodyType === "Sedan"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"bodyType",
																								"Sedan"
																							)
																						}
																					>
																						<h1>Sedan</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.bodyType === "Suv"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"bodyType",
																								"Suv"
																							)
																						}
																					>
																						<h1>Suv</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.bodyType === "Sports_Car"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"bodyType",
																								"Sports_Car"
																							)
																						}
																					>
																						<h1>Sports Car</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.bodyType === "Coupe"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"bodyType",
																								"Coupe"
																							)
																						}
																					>
																						<h1>Coupe</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.bodyType ===
																								"Pickup_Truck"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"bodyType",
																								"Pickup_Truck"
																							)
																						}
																					>
																						<h1>Pickup Truck</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.bodyType === "Wagon"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"bodyType",
																								"Wagon"
																							)
																						}
																					>
																						<h1>Wagon</h1>
																					</div>
																				</div>
																			</div>
																		</div>
																	</React.Fragment>) : null}
																	
																	{this.state.vehicleDetailStep === 7 ? (<React.Fragment>
																		<div className="AdPost-SecSeven">
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

																				<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																					<div className="SecSeven-Btn">
																						<button type="submit">
																							Next{" "}
																							<i className="fa fa-angle-right"></i>
																						</button>
																					</div>
																				</div>
																			</div>
																		</div>
																	</React.Fragment>) : null}
																	
																	{this.state.vehicleDetailStep === 6 ? (<React.Fragment>
																		<div className="AdPost-SecThree">
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
																	</React.Fragment>) : null}
																	
																	{this.state.vehicleDetailStep === 5 ? (<React.Fragment>
																		<div className="AdPost-SecFive">
																			<div className="row">
																				<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																					<div className="VehicleForm-Head">
																						<label className="mb-4">
																							Select Year
                                          </label>
																						<select
																							className="form-control js-example-tags"
																							id="selectYear"
																							name="selectYear"
																							value={this.state.selectYear}
																							onChange={this.handleOnChange}
																						>
																							<option></option>
																							<option>2021</option>
																							<option>2022</option>
																						</select>
																					</div>
																				</div>
																			</div>
																		</div>
																	</React.Fragment>) : null}

																	{this.state.vehicleDetailStep === 4 ? (<React.Fragment>
																		<div className="AdPost-SecFour">
																			<div className="row">
																				<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																					<div className="VehicleForm-Head mb-4">
																						<label>Select Trim</label>
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
																							id="otherTrim"
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
																								"1.5 S CVT DTE1"
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
																							this.state.selectTrim ===
																								"1.5 S CVT-DTEC2"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"selectTrim",
																								"1.5 S CVT-DTEC2"
																							)
																						}
																					>
																						<h1>1.5 S CVT-DTEC</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.selectTrim ===
																								"1.5 S CVT-DTEC3"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"selectTrim",
																								"1.5 S CVT-DTEC3"
																							)
																						}
																					>
																						<h1>1.5 S CVT-DTEC</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.selectTrim ===
																								"1.5 S CVT-DTEC4"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"selectTrim",
																								"1.5 S CVT-DTEC4"
																							)
																						}
																					>
																						<h1>1.5 S CVT-DTEC</h1>
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
																	</React.Fragment>) : null}
																	
																	{this.state.vehicleDetailStep === 3 ? (<React.Fragment>
																		<div className="AdPost-SecThree">
																			<div className="row">
																				<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																					<div className="VehicleForm-Head">
																						<label>Select Model</label>
																					</div>
																				</div>

																				<div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 mb-4">
																					<div className="VehicleForm-Head">
																						<input
																							className="form-control"
																							type="text"
																							id="modelName"
																							name="modelName"
																							value={this.state.modelName}
																							onChange={this.handleOnChange}
																							placeholder="Search Car Brand"
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
																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.selectModel === "Amaze"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"selectModel",
																								"Amaze"
																							)
																						}
																					>
																						<h1>Amaze</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.selectModel === "Brio"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"selectModel",
																								"Brio"
																							)
																						}
																					>
																						<h1>Brio</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.selectModel === "City"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"selectModel",
																								"City"
																							)
																						}
																					>
																						<h1>City</h1>
																					</div>
																				</div>

																				<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																					<div
																						className={
																							this.state.selectModel === "Civic"
																								? "VehicleChoose-Name active"
																								: "VehicleChoose-Name"
																						}
																						onClick={() =>
																							this.handleOnClick(
																								"selectModel",
																								"Civic"
																							)
																						}
																					>
																						<h1>Civic</h1>
																					</div>
																				</div>
																			</div>
																		</div>
																	</React.Fragment>) : null}
																	
																	{this.state.vehicleDetailStep === 2 ? (<React.Fragment>
																		<div className="AdPost-SecTwo">
																			<div className="row">
																				<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
																					<div className="VehicleForm-Head">
																						<label>Select Make</label>
																					</div>
																				</div>

																				<div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 mb-4">
																					<div className="VehicleForm-Head">
																						<input
																							className="form-control"
																							type="text"
																							id="searchMake"
																							name="searchMake"
																							value={this.state.searchMake}
																							onChange={this.handleOnChange}
																							placeholder="Search Car Make"
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
																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<div className="SelectCar-Brand active">
																						<img
																							src="/assets/image/honda.svg"
																							alt=""
																						/>
																					</div>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<div className="SelectCar-Brand">
																						<img
																							src="/assets/image/toyota.svg"
																							alt=""
																						/>
																					</div>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<div className="SelectCar-Brand">
																						<img
																							src="/assets/image/nissan.svg"
																							alt=""
																						/>
																					</div>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<div className="SelectCar-Brand">
																						<img
																							src="/assets/image/hyundai.svg"
																							alt=""
																						/>
																					</div>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<div className="SelectCar-Brand">
																						<img
																							src="/assets/image/mazda.svg"
																							alt=""
																						/>
																					</div>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<div className="SelectCar-Brand">
																						<img
																							src="/assets/image/ford.svg"
																							alt=""
																						/>
																					</div>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<div className="SelectCar-Brand">
																						<img
																							src="/assets/image/chevrolet.svg"
																							alt=""
																						/>
																					</div>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<div className="SelectCar-Brand">
																						<img
																							src="/assets/image/volkswagen.svg"
																							alt=""
																						/>
																					</div>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<div className="SelectCar-Brand">
																						<img
																							src="/assets/image/audi.svg"
																							alt=""
																						/>
																					</div>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<div className="SelectCar-Brand">
																						<img
																							src="/assets/image/lexus.svg"
																							alt=""
																						/>
																					</div>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<div className="SelectCar-Brand">
																						<img
																							src="/assets/image/mercedes-benz.svg"
																							alt=""
																						/>
																					</div>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<div className="SelectCar-Brand">
																						<img
																							src="/assets/image/prosche.svg"
																							alt=""
																						/>
																					</div>
																				</div>
																			</div>
																		</div>
																	</React.Fragment>) : null}
																	
																	{this.state.vehicleDetailStep === 1 ? (<React.Fragment>
																		<div className="AdPost-SecOne">
																			<div className="row">
																				<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																					<h6>Type of Vehicle</h6>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<label className="AdPost-CheckBox">
																						<div className="AdPost-Thumble">
																							<input
																								type="checkbox"
																								value="Automotive"
																								name="typeOfVehicle"
																								onChange={this.hanldeOnChange}
																								checked={
																									this.state.typeOfVehicle ==
																									"Automotive"
																								}
																							/>
																							<span className="checkadpost"></span>
																							<img
																								src="/assets/image/vehicle-1.svg"
																								alt="Automotive"
																							/>
																							<h1>Automotive</h1>
																						</div>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<label className="AdPost-CheckBox">
																						<div className="AdPost-Thumble">
																							<input
																								type="checkbox"
																								value="Motorcycle"
																								name="typeOfVehicle"
																								onChange={this.hanldeOnChange}
																								checked={
																									this.state.typeOfVehicle ==
																									"Motorcycle"
																								}
																							/>
																							<span className="checkadpost"></span>
																							<img
																								src="/assets/image/vehicle-2.svg"
																								alt="Motorcycle"
																							/>
																							<h1>Motorcycle</h1>
																						</div>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<label className="AdPost-CheckBox">
																						<div className="AdPost-Thumble">
																							<input
																								type="checkbox"
																								value="ATV/UTV"
																								name="typeOfVehicle"
																								onChange={this.hanldeOnChange}
																								checked={
																									this.state.typeOfVehicle ==
																									"ATV/UTV"
																								}
																							/>
																							<span className="checkadpost"></span>
																							<img
																								src="/assets/image/vehicle-3.svg"
																								alt="ATV/UTV"
																							/>
																							<h1>ATV/UTV</h1>
																						</div>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<label className="AdPost-CheckBox">
																						<div className="AdPost-Thumble">
																							<input
																								type="checkbox"
																								value="Snowmobile"
																								name="typeOfVehicle"
																								onChange={this.hanldeOnChange}
																								checked={
																									this.state.typeOfVehicle ==
																									"Snowmobile"
																								}
																							/>
																							<span className="checkadpost"></span>
																							<img
																								src="/assets/image/vehicle-4.svg"
																								alt="Snowmobile"
																							/>
																							<h1>Snowmobile</h1>
																						</div>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<label className="AdPost-CheckBox">
																						<div className="AdPost-Thumble">
																							<input
																								type="checkbox"
																								value="RV"
																								name="typeOfVehicle"
																								onChange={this.hanldeOnChange}
																								checked={
																									this.state.typeOfVehicle == "RV"
																								}
																							/>
																							<span className="checkadpost"></span>
																							<img
																								src="/assets/image/vehicle-5.svg"
																								alt="RV"
																							/>
																							<h1>RV</h1>
																						</div>
																					</label>
																				</div>

																				<div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
																					<label className="AdPost-CheckBox">
																						<div className="AdPost-Thumble">
																							<input
																								type="checkbox"
																								value="Watercraft"
																								name="typeOfVehicle"
																								onChange={this.hanldeOnChange}
																								checked={
																									this.state.typeOfVehicle ==
																									"Watercraft"
																								}
																							/>
																							<span className="checkadpost"></span>
																							<img
																								src="/assets/image/vehicle-6.svg"
																								alt="Watercraft"
																							/>
																							<h1>Watercraft</h1>
																						</div>
																					</label>
																				</div>
																			</div>
																		</div>

																	</React.Fragment>) : null}

																</div>
															</React.Fragment>

														) : null}
														{this.state.step == 2 ? (
															<React.Fragment>
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
																			<form
																				action="/upload"
																				className="dropzone needsclick"
																				id="my-awesome-dropzone"
																			>
																				<div className="dz-message needsclick">
																					<span>
																						<img
																							src="/assets/image/file-icon.svg"
																							alt="file-icon"
																						/>
																					</span>
																					<br />
                                          Browse Image
                                        </div>

																				<span className="note needsclick"></span>
																			</form>
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
																			<select className="form-control js-example-tags">
																				<option selected="selected"></option>
																				<option>
																					Victoria, British Columbia.
                                        </option>
																				<option>
																					Victoria, British Columbia.
                                        </option>
																			</select>
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
																												<a
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
																												<a
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
																												<a
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
																									/>
																									<span className="MethodCheck"></span>
																								</label>
																							</div>

																							<div className="row">
																								<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																									<div className="CardNumber-Form mt-4">
																										<label>Card Number</label>
																										<input
																											type="text"
																											id="cardNumber"
																											name="cardNumber"
																											placeholder="0000 0000 0000 000"
																											value={
																												this.state.cardNumber
																											}
																											onChange={
																												this.handleOnChange
																											}
																										/>
																										<img
																											src="image/atm-card-icon.svg"
																											alt=""
																										/>
																									</div>
																								</div>

																								<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																									<div className="CardNumber-Form">
																										<label>Expiry Date</label>
																										<input
																											type="text"
																											id="cardExpirDate"
																											name="cardExpirDate"
																											placeholder="MM/YY"
																											value={
																												this.state.cardExpirDate
																											}
																											onChange={
																												this.handleOnChange
																											}
																										/>
																										<img
																											src="image/post-calendar-icon.svg"
																											style={{ top: "54px" }}
																											alt=""
																										/>
																									</div>
																								</div>

																								<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
																									<div className="CardNumber-Form">
																										<label>CVC/CVV</label>
																										<input
																											type="text"
																											id="cardCVC"
																											name="cardCVC"
																											placeholder="***"
																											value={this.state.cardCVC}
																											onChange={
																												this.handleOnChange
																											}
																										/>
																										<img
																											src="image/Union-Lock.svg"
																											style={{ top: "54px" }}
																											alt=""
																										/>
																									</div>
																								</div>

																								<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
																									<div className="ExpiryUnlock">
																										<img
																											src="image/cardlock-union.svg"
																											alt=""
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
																									Premium Listing{" "}
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
																								<button type="button" onClick={() => this.changeStep(5)}>
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
			</React.Fragment>
		);
	}
}

export default AddPost;
