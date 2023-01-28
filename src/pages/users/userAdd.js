import React, { Component } from "react";
import { Link } from "react-router-dom";
import { get_my_ads, delete_user_add } from '../../actions/myAdsActions'
import { connect } from 'react-redux'
import { API_URL } from '../../constant'
import moment from 'moment'
import ConfirmModel from '../../components/alertMessages/ConfirmModel'
import UserAddPlaceHolder from '../../components/placeHolder/UserAddPlaceHolder'
import { Helmet } from 'react-helmet';

class UserAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleted_id: ''
    }
  }
  componentDidMount() {
    if (this.props.user_id !== undefined) {
      this.props.get_my_ads(this.props.user_id)
    }

  }
  delete_ad = (id) => {
    this.props.delete_user_add(id)
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>{localStorage.getItem('user_type') ? Number(localStorage.getItem('user_type')) === 2 ? 'Dealer' : 'Seller' : 'Seller'} - Dashboard</title>
          <meta name="description" content="" />
        </Helmet>
        <div className="col-xl-9 col-lg-9 col-md-7 col-sm-12 col-12">
          <div className="Section-SavedAds">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="Savedads-Head">
                  <h1>My Ads</h1>
                </div>
              </div>
              {!this.props.loading_ads ? (this.props.my_ads_list || []).map((item, index) => (
                <React.Fragment key={index}>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="Saveads-Container">
                      <div className="row">

                        <div className="colum-1">
                          <div className="AdImage">
                            {/* {item.is_active !== undefined && item.is_active !== null && item.is_active !== 0 ? (<Link to={`/ad-post/detail/${item.id}`}> */}
                            {(<Link to={`/ad-post/detail/${item.stock_id}`}>
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
                            </Link>)}
                          </div>
                        </div>

                        <div className="colum-2">
                          <div className="AdHeading">
                            {(<Link to={`/ad-post/detail/${item.stock_id}`}><h1>
                              <img src="/assets/image/head-tag.svg" alt="head-tag.svg" /> {!item.price ? (0).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                              }) : Number(item.price).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                              })}
                            </h1></Link>)}

                            {(<Link to={`/ad-post/detail/${item.stock_id}`}><h2>{item.des}</h2></Link>)}

                          </div>

                          <div className="SaveExpire-Container">
                            <div className="SaveExpire-List">
                              <h3>
                                <i className="icon-ad-calendar"></i>
                              </h3>
                              <h4>
                                Expires <br />
                                {/* Jan 26, 2020 */}
                                <span>{!item.expiry ? '' : moment(item.expiry).format('ll')}</span>
                              </h4>
                            </div>

                            <div className="SaveExpire-List">
                              <h3>
                                <i className="icon-eye-view"></i>
                              </h3>
                              <h4>
                                Views <br />
                                <span>{!item.visit_count ? 0 : item.visit_count || 0} </span>
                              </h4>
                            </div>
                          </div>
                        </div>

                        <div className="colum-3">
                          <div className="clearfix"></div>

                          <div className="MyBtn-Container">
                            <div className="MyBtn-One">
                              <button type="button" data-toggle="modal" data-target="#confirmModel" onClick={() => this.setState({ ...this.state, deleted_id: item.id })}>{this.props.deleteLoading === true && Number(item.id) === Number(this.props.deletedId) ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : <i class="icon-delete-trash"></i>}</button>

                            </div>
                            <Link to={`/seller/add-post/${item.stock_id}`}>
                              <div className="MyBtn-Two">
                                <button>
                                  <i className="icon-form-edit"></i> Edit ad
                                </button>
                              </div>
                            </Link>
                            {Number(item.listing_type) !== 3 ? (<Link to={`/seller/add-post-more-view/${item.stock_id}`}>
                              <div className="MyBtn-Three">
                                <button>Get More Views</button>
                              </div>
                            </Link>) : null}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <ConfirmModel buttonAction={this.delete_ad} id={item.id} heading={'Delete listing?'} section1={'Do you want to Delete listing from'} section2={'your Ads?'} /> */}
                </React.Fragment>
              )) : (<><UserAddPlaceHolder /><UserAddPlaceHolder /><UserAddPlaceHolder /><UserAddPlaceHolder /><UserAddPlaceHolder /></>)}
              <ConfirmModel buttonAction={this.delete_ad} id={this.state.deleted_id} heading={'Delete listing?'} section1={'Do you want to Delete listing from'} section2={'your Ads?'} />
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
    my_ads_list: state.adsReducer.myAdsReducer.my_ads_list,
    deleteLoading: state.adsReducer.myAdsReducer.deleteLoading,
    deletedId: state.adsReducer.myAdsReducer.deletedId,
    loading_ads: state.adsReducer.myAdsReducer.loading_ads,
  }
}
export default connect(mapStateToProps, { get_my_ads, delete_user_add })(UserAdd);
