import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom"
import { API_URL } from '../../constant'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { saved_ad_post, un_saved_ad_post } from '../../actions/listPostActions'
import ListPostPlaceHolder from '../../components/placeHolder/ListPostPlaceHolder'
class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleSavedAd = (ad_id, status) => {
    const data = {
      user_id: this.props.user_id,
      ad_id: ad_id
    }
    if (typeof this.props.user_id === 'undefined' || typeof this.props.user_id === 'null' || this.props.user_id === '') {
      toastr.error('Error', 'User Have To Login First')
      return false
    }
    if (status === false) {
      this.props.saved_ad_post(data)

    } else {
      this.props.un_saved_ad_post(data)
    }
  }
  render() {
    const options = {
      loop: true,
      margin: 10,
      items: 1,
      // autoplay: false,
      // autoplayTimeout: 7000,
      smartSpeed: 800,
      autoHeight: 'true',
      responsiveClass: 'true',
      dots: false,
      nav: true,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      responsive: {
        0: {
          items: 1,
          nav: true,
        },
        600: {
          items: 1,
          nav: false,
        },
        1000: {
          items: 1,
          nav: true,
          loop: false,
        },
      },
    };
    return (
      <React.Fragment>
        <div className="col-xl-9 col-lg-8 col-md-9 col-sm-12 col-12">
          <div className="row">

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="ResultHead">
                <h3>{(this.props.add_post_list || []).length} results</h3>
                {/* <h3>122 results for Honda Civic</h3> */}
              </div>
            </div>
            {(this.props.add_post_list || []).length > 0 ? (this.props.add_post_list || []).map((item, index) => (

              <div className="col-lg-12 col-md-12 col-sm-12 col-12" key={index}>
                <div className="ListView-Container">
                  <div className="row">

                    <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                      <OwlCarousel
                        options={options}
                        className="ImageSlider owl-three owl-carousel owl-theme"
                      >
                        {(item.images || []).length === 0 ? (<React.Fragment>
                          <img
                            src={'/assets/image/no_image.png'}
                            width="328"
                            height="276"
                            alt="No Image"
                          />
                        </React.Fragment>) : item.images != undefined && item.images != null ? item.images[0].image_path !== undefined && item.images[0].image_path !== null ?
                          (<img
                            src={`${API_URL}/media/${item.images[0].image_path}`} width="328"
                            width="328"
                            height="276"
                            alt="Image"
                            key={1}
                          />) : (<img
                            src={'/assets/image/no_image.png'}
                            width="328"
                            height="276"
                            alt="No Image"
                          />) : (<img
                            src={'/assets/image/no_image.png'}
                            width="328"
                            height="276"
                            alt="No Image"
                          />)
                        }
                      </OwlCarousel>
                    </div>

                    <div className="col-lg-7 col-md-6 col-sm-12 col-12">
                      <div className="ListView-Head">
                        <h1>
                          <Link to={`/ad-post/detail/${item.id}`}>

                            <img src="/assets/image/head-tag.svg" />  {item.price !== null && item.price !== '' ? new Intl.NumberFormat('en-US',
                              { style: 'currency', currency: 'USD' }
                            ).format(item.price)// '$100.00'
                              : new Intl.NumberFormat('en-US',
                                { style: 'currency', currency: 'USD' }
                              ).format(0)}
                          </Link>
                        </h1>
                        <Link to={`/ad-post/detail/${item.id}`}><h2>{item.des}</h2></Link>
                      </div>

                      <div className="ListView-Btm">
                        <ul>
                          <li>
                            <h1>
                              <i className="icon-subtract-icon"></i> {item.location}
                            </h1>
                          </li>
                          <li>
                            <h2>
                              <img src="/assets/image/speedometer.svg" alt="" />
                              <span>{item.kilometer !== null && item.kilometer !== '' ? item.kilometer.toLocaleString('en-US') : (0).toLocaleString('en-US')} km</span>
                            </h2>
                          </li>
                          <li>
                            <h3>
                              <img src="/assets/image/finance-that-tag.svg" />
                              <span>Finance that</span>
                            </h3>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-12 col-12">
                      <div className="ListRight-Image">
                        <a onClick={() => this.handleSavedAd(item.id, typeof item.saved_ad === 'undefined' || item.saved_ad === false ? false : true)}>
                          <i className={typeof item.saved_ad === undefined || item.saved_ad === false ? "fa fa-heart-o" : "fa fa-heart-o active"}></i>
                        </a>
                        <div className="clearfix"></div>
                        <img src="/assets/image/energy-image.svg" alt="" />
                      </div>
                    </div>

                  </div>




                  <div></div>
                </div>
              </div>
            )) : <><ListPostPlaceHolder /><ListPostPlaceHolder /><ListPostPlaceHolder /><ListPostPlaceHolder /><ListPostPlaceHolder /><ListPostPlaceHolder /><ListPostPlaceHolder /></>}

          </div>
        </div>
      </React.Fragment >
    );
  }
}
const mapStateToProps = state => {
  return {
    user_id: state.authReducer.authentication.user.user_id,
  }
}
export default connect(mapStateToProps, { saved_ad_post, un_saved_ad_post })(ListView);
// (item.images || []).map((img, imgindex) => (
//   <img
//     src={`${API_URL}/media/${img.image_path}`} width="328"
//     width="328"
//     height="276"
//     alt="Image"
//     key={imgindex}
//   />
// ))}