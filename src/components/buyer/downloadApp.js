import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom"
import $ from "jquery";
import { API_URL } from '../../constant'
import HomePlaceHolder from '../../components/placeHolder/HomePlaceHolder'
const options = {
  loop: true,
  margin: 0,
  items: 1,
  responsive: true,
  dots: true,
  nav: true,
  thumbs: true,
  thumbImage: true,
  dots: false,
  navContainer: '#customNav',
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
    1200: {
      items: 1,
      nav: true,
      loop: false,
    },
  },
};
class DowloadApp extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  changeTab = (para) => {
    if (para == "nav-newly") {
      $("#nav-newly").removeClass('tabDeactive')
      $("#nav-most-viewed").addClass('tabDeactive')
      $("#nav-reduced-price").addClass('tabDeactive')
      $("#nav-under-price").addClass('tabDeactive')
    } else if (para == "nav-most-viewed") {
      $("#nav-most-viewed").removeClass('tabDeactive')
      $("#nav-newly").addClass('tabDeactive')
      $("#nav-reduced-price").addClass('tabDeactive')
      $("#nav-under-price").addClass('tabDeactive')
    } else if (para == "nav-reduced-price") {
      $("#nav-reduced-price").removeClass('tabDeactive')
      $("#nav-newly").addClass('tabDeactive')
      $("#nav-most-viewed").addClass('tabDeactive')
      $("#nav-under-price").addClass('tabDeactive')
    }else if (para == "nav-under-price") {
      $("#nav-under-price").removeClass('tabDeactive')
      $("#nav-newly").addClass('tabDeactive')
      $("#nav-most-viewed").addClass('tabDeactive')
      $("#nav-reduced-price").addClass('tabDeactive')
    } else {
      $("#nav-newly").removeClass('tabDeactive')
      $("#nav-most-viewed").addClass('tabDeactive')
      $("#nav-reduced-price").addClass('tabDeactive')
      $("#nav-under-price").addClass('tabDeactive')
    }

  }
  render() {
    return (
      <React.Fragment>
        <section className="hp-dowload-app">
            <div className="download-app-main">
                <div className="download-app-image">
                    <img src="/assets/image/download-app-image.png" alt="" />
                </div>
                <div className="download-app-content">
                    <div className="download-app-content-inner">
                        <div className="download-app-content-inner-main">
                            <p> Sell, buy and get financing <br/> easily with our mobile app <br/> lauching Fall 2021 </p>
                            {/* <a href="#"> <img src="/assets/image/app-store-image.svg" alt="" /> </a>
                            <a href="#"> <img src="/assets/image/playstore-image.svg" alt="" /> </a> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </React.Fragment>
    );
  }
}
export default DowloadApp;
