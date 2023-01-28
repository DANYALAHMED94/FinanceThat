import React, { Component } from "react";
import { get_saved_ads, delete_saved_user_add } from '../../actions/savedAdsActions'
import { connect } from 'react-redux'
import { API_URL } from '../../constant'
import { Link } from "react-router-dom";
import ConfirmModel from '../../components/alertMessages/ConfirmModel'
import SavedAdPlaceHolder from '../../components/placeHolder/SavedAdPlaceHolder'
import { Helmet } from 'react-helmet';
import { capitalize,capsProvince } from "./../../_helpers/capitalize";

class UserSaveAdd extends Component {
	constructor(props) {
		super(props)
		this.state = {
			deleted_id: ''
		}
	}
	componentDidMount() {
		if (this.props.user_id !== undefined) {
			this.props.get_saved_ads(this.props.user_id)
		}
	}
	delete_ad = (id) => {
		this.props.delete_saved_user_add(id)
	}
	render() {
		return (
			<React.Fragment>
				<Helmet>
					<title>{localStorage.getItem('user_type') ? Number(localStorage.getItem('user_type')) === 2 ? 'Dealer' : 'Seller' : 'Seller'} - Saved Ads</title>
					<meta name="description" content="" />
				</Helmet>
				<div className="col-xl-9 col-lg-9 col-md-7 col-sm-12 col-12">
					<div className="Section-SavedAds">
						<div className="row">

							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<div className="Savedads-Head"><h1>Saved Ads</h1></div>
							</div>
							{!this.props.loading_saved_ad ? (this.props.user_saved_ads || []).map((item, index) => (
								<React.Fragment>
									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
										<div className="Saveads-Container">
											<div className="row">

												<div className="colum-1">
													<Link to={`/ad-post/detail/${item.stock_id}`}>

														<div className="AdImage">
															{/* {item.images !== undefined && item.images.length > 0 ? (<img */}

															{item.images && item.images[0] && item.images[0].image_path ? (<img
																src={`${API_URL}/media/${item.images[0].image_path}`}
																width="219"
																height="186"
																alt={item.des}
															/>) : (<img
																src="/assets/image/no_image.png"
																width="219"
																height="186"
																alt={"No_Image"}
															/>)}
															{/* {!item.images ? <img
																src="/assets/image/no_image.png"
																width="219"
																height="186"
																alt={"no_image"}
															/> : (<img
																src={`${API_URL}/media/${item.images[0].image_path}`}
																width="219"
																height="186"
																alt={`${'no_image' + item.images[0].id}`}
															/>)} */}

														</div>
													</Link>

												</div>

												<div className="colum-2">

													<div className="AdHeading">
														<Link to={`/ad-post/detail/${item.stock_id}`}> <h1><img src="/assets/image/head-tag.svg" alt="" /> {!item.price ? (0).toLocaleString('en-US', {
															style: 'currency',
															currency: 'USD',
														}) : Number(item.price).toLocaleString('en-US', {
															style: 'currency',
															currency: 'USD',
														})}</h1></Link>
														<Link to={`/ad-post/detail/${item.stock_id}`}><h2>{item.des}</h2></Link>
													</div>

													<div className="AdsList-Btm">
														<ul>
															<li><h1><i className="icon-subtract-icon"></i>
																{item && item.city ? capitalize(item.city) : ''}{item && item.city && item.province ? ',' : ''} {item && item.province ? capsProvince(item.province) : ''}
																{/* {(!item.location) ? '' : item.location.split(',').slice(-3, -1)[0] + ", " + item.location.split(',').slice(-2, -1)[0].split(' ')[1]} */}
															</h1></li>
															<li><h2><img src="/assets/image/speedometer.svg" alt="" />
																<span>{!item.kilometer ? (0).toLocaleString('en-US') : item.kilometer.toLocaleString('en-US')} km</span></h2></li>
														</ul>
													</div>

												</div>

												<div className="colum-3">

													{/* <div className="PhoneCall-Head">
														<h5><i className="icon-phone-call"></i> {item.phone}</h5>
													</div> */}

													<div className="clearfix"></div>

													<div className="SavedBtn">
														<Link to={`/post-application/${item.stock_id}`} ><img src="/assets/image/finance-that-tag.svg" alt="" /> <span>Finance that</span></Link>
														<button type="button" data-toggle="modal" data-target="#confirmModel" onClick={() => this.setState({ ...this.state, deleted_id: item.id })}>{this.props.deleteLoading === true && Number(item.id) === Number(this.props.deletedId) ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : <i class="icon-delete-trash"></i>}</button>
														{/* <ConfirmAlert heading={'Delete'} section={'Do You Want To Delete'} button_text="Delete" buttonAction={this.delete_ad}   /> */}
														{/* <button type="button" onClick={() => this.delete_ad(item.id)}><i className="icon-delete-trash"></i></button> */}
													</div>

												</div>

											</div>
										</div>
									</div>
									{/* <ConfirmModel buttonAction={this.delete_ad} id={item.id} heading={'Remove listing?'} section1={'Do you want to remove listing from'} section2={'your saved list?'} /> */}
								</React.Fragment>)) : <><SavedAdPlaceHolder /><SavedAdPlaceHolder /><SavedAdPlaceHolder /><SavedAdPlaceHolder /><SavedAdPlaceHolder /></>}
							<ConfirmModel buttonAction={this.delete_ad} id={this.state.deleted_id} heading={'Remove listing?'} section1={'Do you want to remove listing from'} section2={'your saved list?'} />
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
const mapStateToProps = state => {
	return {
		user_id: state.authReducer.authentication.user.user_id,
		user_saved_ads: state.adsReducer.savedAdsReducer.user_saved_ads,
		loading_saved_ad: state.adsReducer.savedAdsReducer.loading_saved_ad,
		deleteLoading: state.adsReducer.myAdsReducer.deleteLoading,
		deletedId: state.adsReducer.myAdsReducer.deletedId,
	}
}
export default connect(mapStateToProps, { get_saved_ads, delete_saved_user_add })(UserSaveAdd);
