import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom"
class ListView extends Component {
  render() {
    const options = {
      loop: true,
      margin: 10,
      items: 1,
      autoplay: false,
      autoplayTimeout: 7000,
      smartSpeed: 800,
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
        <div className="col-xl-9 col-lg-8 col-md-9 col-sm-12 col-12">
          <div className="row">
            {(this.props.add_post_detail || []).map((item, index) => (

              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="ListView-Container">
                  <div className="row">

                    <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                      <OwlCarousel
                        options={options}
                        className="ImageSlider owl-three owl-carousel owl-theme"
                      >
                        {(item.images || []).map((img, imgindex) => (
                          <img
                            src={img.image_path}
                            width="328"
                            height="276"
                            alt="Image"
                          />
                        ))}

                        <img
                          src="/assets/image/thumb-7.jpg"
                          width="328"
                          height="276"
                          alt=""
                        />
                        <img
                          src="/assets/image/thumb-7.jpg"
                          width="328"
                          height="276"
                          alt=""
                        />
                      </OwlCarousel>
                    </div>

                    <div className="col-lg-7 col-md-6 col-sm-12 col-12">
                      <div className="ListView-Head">
                        <h1>
                          <img src="/assets/image/head-tag.svg" /> $13,999
                      </h1>
                        <h2>2018 Volvo XC90 T6 Momentum</h2>
                      </div>

                      <div className="ListView-Btm">
                        <ul>
                          <li>
                            <h1>
                              <i className="icon-maps-and-flags"></i> Brampton ON
                          </h1>
                          </li>
                          <li>
                            <h2>
                              <img src="/assets/image/speedometer.svg" alt="" />
                              <span>120,000 km</span>
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
                        <a href="#">
                          <i className="fa fa-heart-o"></i>
                        </a>
                        <div className="clearfix"></div>
                        <img src="/assets/image/energy-image.svg" alt="" />
                      </div>
                    </div>

                  </div>
                  <div></div>
                </div>
              </div>
            ))}

            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="ListView-Container">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                    <OwlCarousel
                      options={options}
                      className="ImageSlider owl-three owl-carousel owl-theme"
                    >
                      <img
                        src="/assets/image/thumb-6.jpg"
                        width="328"
                        height="276"
                        alt=""
                      />
                      <img
                        src="/assets/image/thumb-7.jpg"
                        width="328"
                        height="276"
                        alt=""
                      />
                      <img
                        src="/assets/image/thumb-6.jpg"
                        width="328"
                        height="276"
                        alt=""
                      />
                    </OwlCarousel>
                  </div>

                  <div className="col-lg-7 col-md-6 col-sm-12 col-12">
                    <div className="ListView-Head">
                      <h1>
                        <img src="/assets/image/head-tag.svg" /> $13,999
                      </h1>
                      <h2>2018 Volvo XC90 T6 Momentum</h2>
                    </div>

                    <div className="ListView-Btm">
                      <ul>
                        <li>
                          <h1>
                            <i className="icon-maps-and-flags"></i> Brampton ON
                          </h1>
                        </li>
                        <li>
                          <h2>
                            <img src="/assets/image/speedometer.svg" alt="" />
                            <span>120,000 km</span>
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
                      <a href="#">
                        <i className="fa fa-heart-o"></i>
                      </a>
                      <div className="clearfix"></div>
                      <img src="/assets/image/energy-image.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="ListView-Container">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                    <OwlCarousel
                      options={options}
                      className="ImageSlider owl-three owl-carousel owl-theme"
                    >
                      <img
                        src="/assets/image/thumb-6.jpg"
                        width="328"
                        height="276"
                        alt=""
                      />
                      <img
                        src="/assets/image/thumb-7.jpg"
                        width="328"
                        height="276"
                        alt=""
                      />
                      <img
                        src="/assets/image/thumb-6.jpg"
                        width="328"
                        height="276"
                        alt=""
                      />
                    </OwlCarousel>
                  </div>

                  <div className="col-lg-7 col-md-6 col-sm-12 col-12">
                    <div className="ListView-Head">
                      <h1>
                        <img src="/assets/image/head-tag.svg" /> $13,999
                      </h1>
                      <h2>2018 Volvo XC90 T6 Momentum</h2>
                    </div>

                    <div className="ListView-Btm">
                      <ul>
                        <li>
                          <h1>
                            <i className="icon-maps-and-flags"></i> Brampton ON
                          </h1>
                        </li>
                        <li>
                          <h2>
                            <img src="/assets/image/speedometer.svg" alt="" />
                            <span>120,000 km</span>
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
                      <a href="#">
                        <i className="fa fa-heart-o"></i>
                      </a>
                      <div className="clearfix"></div>
                      <img src="/assets/image/energy-image.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="ListView-Container">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                    <OwlCarousel
                      options={options}
                      className="ImageSlider owl-three owl-carousel owl-theme"
                    >
                      <img
                        src="/assets/image/thumb-6.jpg"
                        width="328"
                        height="276"
                        alt=""
                      />
                      <img
                        src="/assets/image/thumb-7.jpg"
                        width="328"
                        height="276"
                        alt=""
                      />
                      <img
                        src="/assets/image/thumb-6.jpg"
                        width="328"
                        height="276"
                        alt=""
                      />
                    </OwlCarousel>
                  </div>

                  <div className="col-lg-7 col-md-6 col-sm-12 col-12">
                    <div className="ListView-Head">
                      <h1>
                        <img src="/assets/image/head-tag.svg" /> $13,999
                      </h1>
                      <h2>2018 Volvo XC90 T6 Momentum</h2>
                    </div>

                    <div className="ListView-Btm">
                      <ul>
                        <li>
                          <h1>
                            <i className="icon-maps-and-flags"></i> Brampton ON
                          </h1>
                        </li>
                        <li>
                          <h2>
                            <img src="/assets/image/speedometer.svg" alt="" />
                            <span>120,000 km</span>
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
                      <a href="#">
                        <i className="fa fa-heart-o"></i>
                      </a>
                      <div className="clearfix"></div>
                      <img src="/assets/image/energy-image.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>

          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default ListView;
