import React, { Component } from "react";
import GridView from "../../components/listingViews/GridView.jsx";
import ListView from "../../components/listingViews/ListView.jsx";
import { get_post_list } from '../../actions/listPostActions'
import {
  get_vehicle_type
} from '../../actions/addPostActions'
import { connect } from 'react-redux'
class ListingSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewList: "list",
    };
  }
  componentDidMount() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    this.props.get_vehicle_type()
    this.props.get_post_list()
  }
  chnageListView = (para) => {
    this.setState({
      viewList: para,
    });
  };
  render() {
    return (
      <React.Fragment>
        <section className="Section-ListandGrid">
          <div className="container-fluid">
            <div className="row">

              <div className="col-md-12 col-sm-12 col-12">
                <div className="ListSearch-Container">
                  <div className="row">
                    <div className="col-xl-5 col-lg-4 col-md-5 col-sm-12 col-12 pr-0">
                      <div className="ListSearch-Form">
                        <input
                          type="text"
                          id=""
                          name=""
                          placeholder="Search by make, model or keyword"
                        />
                      </div>
                    </div>

                    <div className="col-xl-2 col-lg-3 col-md-2 col-sm-12 col-12 pr-0 pl-0">
                      <div className="ListSearch-Form">
                        <select id="" name="">
                          <option>All categories</option>
                          <option>All categories</option>
                          <option>All categories</option>
                          <option>All categories</option>
                        </select>
                        <span className="fa fa-chevron-down"></span>
                      </div>
                    </div>

                    <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                      <div className="ListLocation-Form">
                        <input
                          type="text"
                          id=""
                          name=""
                          placeholder="Brampton within 200km"
                        />
                        <i className="icon-maps-and-flags"></i>
                        <button type="button">Search</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="row">
                  <div className="col-lg-7 col-md-7 col-sm-12 col-12">
                    <div className="ShopType-Btn">
                      <h1>Recommended Filters</h1>
                      <a href="#">ATV/UTV</a>
                      <a href="#">Cars</a>
                      <a href="#">Motorcycles</a>
                      <a href="#">Snowmobiles</a>
                      <a href="#">Watercrafts</a>
                      <a href="#">RV</a>
                    </div>
                  </div>

                  <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                    <div className="SortBay-Menu">
                      <h1>Sort By:</h1>
                      <select id="" name="">
                        <option>Best Match</option>
                        <option>Best Match</option>
                        <option>Best Match</option>
                      </select>
                      <i className="icon-arrow-down"></i>
                    </div>

                    <div className="ListGrid-Icon">
                      <a
                        onClick={() => this.chnageListView("grid")}
                        className={
                          this.state.viewList == "grid" ? "active" : null
                        }
                      >
                        <i className="icon-grid"></i>
                      </a>
                      <a
                        className={
                          this.state.viewList == "list" ? "active" : null
                        }
                        onClick={() => this.chnageListView("list")}
                      >
                        <i className="icon-list"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-md-3 col-sm-12 col-12">
                    <div className="LeftMenu-Container">
                      <div className="Filter-Head">
                        <h1>
                          Filters <span>(4)</span>
                        </h1>
                        <button type="reset">Clear Filters</button>
                      </div>

                      <div className="FilterList">
                        <ul>
                          <li>
                            <a href="#">
                              Volvo <i className="fa fa-times"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Volvo <i className="fa fa-times"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              T6 Momentum <i className="fa fa-times"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Volvo <i className="fa fa-times"></i>
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="accordion" id="accordionExample">
                        <div className="card">
                          <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                Price/Monthly Payment
                              </button>
                            </h2>
                          </div>

                          <div
                            id="collapseOne"
                            className="collapse show"
                            aria-labelledby="headingOne"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <div className="MonthlyPay-Container">

                                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                  <li className="nav-item">
                                    <a className="nav-link active btn0ne" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Price Range</a>
                                  </li>
                                  <li className="nav-item">
                                    <a className="nav-link btnTwo" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Monthly Payment</a>
                                  </li>
                                </ul>

                              </div>

                              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="row">
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 pl-0">
                                    <div className="MonthlyPay-Form">
                                      <label>From</label>
                                      <select id="" name="">
                                        <option>$6,000</option>
                                        <option>$6,000</option>
                                        <option>$6,000</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 pr-0">
                                    <div className="MonthlyPay-Form">
                                      <label>To</label>
                                      <select id="" name="">
                                        <option>$60,000+</option>
                                        <option>$60,000+</option>
                                        <option>$60,000+</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="card-header" id="headingTwo">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseTwo"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                Type of vehicles
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
                              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="row">
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 pl-0">
                                    <div className="Vechicle-image">
                                      <a href="#">
                                        <img
                                          src="/assets/image/crossovers.svg"
                                          alt=""
                                        />
                                      </a>
                                      <h4>
                                        ATV/UTV <span>(4)</span>
                                      </h4>
                                    </div>
                                  </div>

                                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 pr-0">
                                    <div className="Vechicle-image">
                                      <a href="#">
                                        <img
                                          src="/assets/image/luxury-vehicles.svg"
                                          alt=""
                                        />
                                      </a>
                                      <h4>
                                        Autos <span>(28)</span>
                                      </h4>
                                    </div>
                                  </div>

                                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 pl-0">
                                    <div className="Vechicle-image">
                                      <a href="#">
                                        <img
                                          src="/assets/image/crossovers.svg"
                                          alt=""
                                        />
                                      </a>
                                      <h4>
                                        Motorcycles <span>(263)</span>
                                      </h4>
                                    </div>
                                  </div>

                                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 pr-0">
                                    <div className="Vechicle-image">
                                      <a href="#">
                                        <img
                                          src="/assets/image/diesel-engines.svg"
                                          alt=""
                                        />
                                      </a>
                                      <h4>
                                        Boats <span>(2)</span>
                                      </h4>
                                    </div>
                                  </div>

                                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 pl-0">
                                    <div className="Vechicle-image">
                                      <a href="#">
                                        <img
                                          src="/assets/image/electric-vehicles.svg"
                                          alt=""
                                        />
                                      </a>
                                      <h4>
                                        Snowmobiles <span>(28)</span>
                                      </h4>
                                    </div>
                                  </div>

                                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 pr-0">
                                    <div className="Vechicle-image">
                                      <a href="#">
                                        <img
                                          src="/assets/image/diesel-engines.svg"
                                          alt=""
                                        />
                                      </a>
                                      <h4>
                                        Watercrafts <span>(2)</span>
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="card-header" id="headingThree">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseThree"
                                aria-expanded="true"
                                aria-controls="collapseThree"
                              >
                                Make
                              </button>
                            </h2>
                          </div>

                          <div
                            id="collapseThree"
                            className="collapse"
                            aria-labelledby="headingThree"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <div className="MakeMenu">
                                <a
                                  data-toggle="collapse"
                                  href="#collapseMenu"
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="collapseMenu"
                                >
                                  Any make <span>63,607</span>
                                </a>
                              </div>

                              <div className="collapse" id="collapseMenu">
                                <div className="MakeMenu-List">
                                  <h1>POPULAR MAKES</h1>
                                  <ul>
                                    <li>
                                      <a href="#">
                                        Audi <span>63,607</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        BMW <span>63,607</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        Chevrolet <span>63,607</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        Dodge <span>63,607</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        Honda <span>63,607</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        Mercedes-Benz <span>63,607</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        Nissan <span>63,607</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        Honda <span>63,607</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        Mercedes-Benz <span>63,607</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        Nissan <span>63,607</span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="card-header" id="headingFour">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseFour"
                                aria-expanded="true"
                                aria-controls="collapseFour"
                              >
                                Modal
                              </button>
                            </h2>
                          </div>

                          <div
                            id="collapseFour"
                            className="collapse"
                            aria-labelledby="headingFour"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body"></div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="card-header" id="headingFive">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseFive"
                                aria-expanded="true"
                                aria-controls="collapseFive"
                              >
                                Trim
                              </button>
                            </h2>
                          </div>

                          <div
                            id="collapseFive"
                            className="collapse"
                            aria-labelledby="headingFive"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body"></div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="card-header" id="headingSix">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseSix"
                                aria-expanded="true"
                                aria-controls="collapseSix"
                              >
                                Year
                              </button>
                            </h2>
                          </div>

                          <div
                            id="collapseSix"
                            className="collapse"
                            aria-labelledby="headingSix"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="row">
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 pl-0">
                                    <div className="MonthlyPay-Form mt-3">
                                      <label>From</label>
                                      <select id="" name="">
                                        <option>2009</option>
                                        <option>2009</option>
                                        <option>2009</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 pr-0">
                                    <div className="MonthlyPay-Form mt-3">
                                      <label>To</label>
                                      <select id="" name="">
                                        <option>2021</option>
                                        <option>2021</option>
                                        <option>2021</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="card-header" id="headingSeven">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseSeven"
                                aria-expanded="true"
                                aria-controls="collapseSeven"
                              >
                                Transmission
                              </button>
                            </h2>
                          </div>

                          <div
                            id="collapseSeven"
                            className="collapse"
                            aria-labelledby="headingSeven"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <div className="Trans-Btn">
                                <label className="TransContainer">
                                  Automatic
                                  <input type="checkbox" checked="checked" />
                                  <span className="TransCheckmark"></span>
                                </label>

                                <label className="TransContainer">
                                  Manual
                                  <input type="checkbox" />
                                  <span className="TransCheckmark"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="card-header" id="headingNine">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseNine"
                                aria-expanded="true"
                                aria-controls="collapseNine"
                              >
                                Kilometers
                              </button>
                            </h2>
                          </div>

                          <div
                            id="collapseNine"
                            className="collapse"
                            aria-labelledby="headingNine"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="row">
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 pl-0">
                                    <div className="MonthlyPay-Form mt-3">
                                      <label>From</label>
                                      <select id="" name="">
                                        <option>2009</option>
                                        <option>2009</option>
                                        <option>2009</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 pr-0">
                                    <div className="MonthlyPay-Form mt-3">
                                      <label>To</label>
                                      <select id="" name="">
                                        <option>2021</option>
                                        <option>2021</option>
                                        <option>2021</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="card-header" id="headingTen">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseTen"
                                aria-expanded="true"
                                aria-controls="collapseTen"
                              >
                                Condition
                              </button>
                            </h2>
                          </div>

                          <div
                            id="collapseTen"
                            className="collapse"
                            aria-labelledby="headingTen"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body"></div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="card-header" id="headingEleven">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseEleven"
                                aria-expanded="true"
                                aria-controls="collapseEleven"
                              >
                                Seller Type
                              </button>
                            </h2>
                          </div>

                          <div
                            id="collapseEleven"
                            className="collapse"
                            aria-labelledby="headingEleven"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body"></div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="card-header" id="heading12">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapse12"
                                aria-expanded="true"
                                aria-controls="collapse12"
                              >
                                Color
                              </button>
                            </h2>
                          </div>

                          <div
                            id="collapse12"
                            className="collapse"
                            aria-labelledby="heading12"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body"></div>
                          </div>
                        </div>

                        <div className="card">
                          <div className="card-header" id="heading13">
                            <h2 className="mb-0">
                              <button
                                className="btn btn-link btn-block text-left"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapse13"
                                aria-expanded="true"
                                aria-controls="collapse13"
                              >
                                Features
                              </button>
                            </h2>
                          </div>

                          <div
                            id="collapse13"
                            className="collapse"
                            aria-labelledby="heading13"
                            data-parent="#accordionExample"
                          >
                            <div className="card-body"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.state.viewList == "list" ? <ListView  {...this.props} /> : <GridView  {...this.props} />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    add_post_detail: state.adPostReducers.listPostReducer.add_post_detail,
    type_of_vehicles: state.adPostReducers.addPostReducer.type_of_vehicle,
  }
}
export default connect(mapStateToProps, { get_post_list, get_vehicle_type })(ListingSearch);
