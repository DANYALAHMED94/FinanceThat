import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom"
import { API_URL } from '../../constant'
import Select, { components } from 'react-select';
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { saved_ad_post, un_saved_ad_post } from '../../actions/listPostActions'
import GridPostPlaceHolder from '../../components/placeHolder/GridPostPlaceHolder'
const { Option } = components;

const renderScrollbar = props => {
  return (
    <div style={{ height: 260 }}>
      <Scrollbars>{props.children}</Scrollbars>
    </div>
  );
};

const renderOption = props => {
  return (
    <Option {...props}>
      <div>{props.data.label}</div>
    </Option>
  );
};

class GridView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sort_by_filters: [{
        name: '', value: '', label: 'ALL'
      }, {
        name: 'Price Lowest First', value: 'price_lowest_first', label: 'Price Lowest First'
      }, {
        name: 'Price Highest First', value: 'price_highest_first', label: 'Price Highest First'
      }, {
        name: 'Listings Newest', value: 'listings_newest', label: 'Listings Newest'
      }, {
        name: 'Listings Oldest', value: 'listings_oldest', label: 'Listings Oldest'
      }, {
        name: 'Distance Nearest', value: 'distance_nearest', label: 'Distance Nearest'
      }, {
        name: 'Distance Farthest', value: 'distance_farthest', label: 'Distance Farthest'
      }, {
        name: 'Year Nearest', value: 'year_nearest', label: 'Year Nearest'
      }, {
        name: 'Year Lowest', value: 'year_lowest', label: 'Year Lowest'
      }, {
        name: 'Mileage Lowest', value: 'mileage_lowest', label: 'Mileage Lowest'
      }, {
        name: 'Mileage Highest', value: 'mileage_highest', label: 'Mileage Highest'
      }],

    }
  }
  handleSavedAd = (ad_id, status) => {
    const data = {
      user_id: this.props.user_id,
      ad_id: ad_id
    }
    if (this.props.user_id == undefined || this.props.user_id == null || this.props.user_id == '') {
      toastr.error('Error', 'User Have To Login First')
      return false
    }
    if (status == false) {
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
      // autoplay: true,
      // autoplayTimeout: 7000,
      smartSpeed: 800,
      autoHeight: true,
      responsiveClass: true,
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

        <div className="grid-view-top-col">
          <div className="ResultHead clearfix">
            <h3>{(this.props.add_post_list || []).length === 0 ? 'No results' : `${(this.props.add_post_list || []).length} results`} </h3>
            <div className="SortBay-Menu">
              <h1>Sort By:</h1>
              <Select
                placeholder="Sort By"
                id="sortBySelected"
                name="sortBySelected"
                value={this.props.sortBySelected}
                onChange={this.props.handleOnChangeSort}
                options={this.state.sort_by_filters}
                isSearchable={false}
                isClearable
                className="react-sort-main"
                classNamePrefix="react-sort"
                components={{
                  Option: renderOption,
                  MenuList: renderScrollbar
                }}
                captureMenuScroll={false}

              />
            </div>
          </div>
        </div>
        <div className="search-grid-main-holder clearfix">
          {this.props.showListSearchLoader === false ? (this.props.add_post_list || []).map((item, index) => (
            <React.Fragment key={index}>
              <div className="search-grid-col" >
                <div className="ProdThum-Service">
                  <div className="IconBadge" onClick={() => this.handleSavedAd(item.id, item.saved_ad == undefined || item.saved_ad == false ? false : true)}>
                    <i className={item.saved_ad == undefined || item.saved_ad == false ? "fa fa-heart-o" : "fa fa-heart-o active"}></i>
                  </div>
                  <Link to={`/ad-post/detail/${item.id}`}>
                    <h4> {item.kilometer !== null && item.kilometer !== '' ? item.kilometer.toLocaleString('en-US') : (0).toLocaleString('en-US')} km</h4>
                    <div className="thumb-image">
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
                        />)}
                    </div>
                    <div className="image-overlay"></div>


                    <div className="ProdHead">
                      <div className="disc-row">
                        <h2>{item.des_2 !== undefined && item.des_2 !== null ? item.des_2 : ''}</h2>
                        <span className="year"> {item.year !== undefined && item.year !== null ? item.year : ''} </span>
                      </div>
                      <div className="disc-row">
                        <span className="location"><i className="icon-subtract-icon"></i>
                          {/* {item.location !== undefined && item.location !== null && item.location !== '' ? item.location.split(',').slice(-3, -1)[0] + ", " + item.location.split(',').slice(-2, -1)[0] : ''}  */}
                          {(Number(item.longitude) === Number(0.0000000)) && (Number(item.latitude) === Number(0.0000000)) ? item.location : item.location !== undefined && item.location !== null && item.location !== '' ? item.location.split(',').slice(-3, -1)[0] + ", " + item.location.split(',').slice(-2, -1)[0] : ''}
                        </span>
                        <span className="price-tag">
                          {item.price !== null && item.price !== '' ? new Intl.NumberFormat('en-US',
                            { style: 'currency', currency: 'USD' }
                          ).format(item.price)// '$100.00'
                            : new Intl.NumberFormat('en-US',
                              { style: 'currency', currency: 'USD' }
                            ).format(0)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </React.Fragment>
          )) : <><GridPostPlaceHolder /><GridPostPlaceHolder /><GridPostPlaceHolder /><GridPostPlaceHolder /><GridPostPlaceHolder /><GridPostPlaceHolder /><GridPostPlaceHolder /><GridPostPlaceHolder /><GridPostPlaceHolder /></>}
          {this.props.next_post_loading === false ? (<></>) : (<><GridPostPlaceHolder /><GridPostPlaceHolder /><GridPostPlaceHolder /><GridPostPlaceHolder /><GridPostPlaceHolder /><GridPostPlaceHolder /><GridPostPlaceHolder /><GridPostPlaceHolder /><GridPostPlaceHolder /></>)}
        </div>
        <div className='listing-load-more-button'>
          {this.props.nextLoadMoreUrl !== undefined && this.props.nextLoadMoreUrl !== null && this.props.nextLoadMoreUrl !== '' ?
            (<button type='button' onClick={() => this.props.next_url_call(this.props.nextLoadMoreUrl)}>Load More</button>) : (<></>)}
        </div>

      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    user_id: state.authReducer.authentication.user.user_id,
  }
}
export default connect(mapStateToProps, { saved_ad_post, un_saved_ad_post })(GridView);
