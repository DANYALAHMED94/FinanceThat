import React, { useEffect } from 'react';
import Footer from "../hoc/layout/footer/Footer";
import { scroller } from "react-scroll";
import PostApplicationV2 from "./../pages/postApplicationV2/postApplicationV2";
import { useLocation } from "react-router";
import { history } from '../_helpers';
import { toastr } from 'react-redux-toastr'
import "../assets/css/applyNowPage.css";
const ApplyNowHome =()=> {
  const path = useLocation().pathname;
  useEffect(() => {
        scroller.scrollTo("module__getApprovedTodayWrap", {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
        });
},[path]);

useEffect(()=> {
  if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))?.user_type === 2){
    history.push('/');
    toastr.error('', "Dealer can only create application from their dashboard")
  }
},[])

  return (
    <div className="applyNowMain">

      <section class="fs__heroBannerWrapper">
        <div class="banner__topLeftShapeWrap">
          <img src="../assets/image/applyImgs/banner-shape-left.svg" alt="" />
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="fs__bannerDescriptionWrapper">
              <h1>Financing made easy<br />with Finance That!</h1>
              <p>We finance cars, ATVs, motorcycles, boats, and other types of vehicles with competitive interest rates regardless of year, make, or model.</p>
              <div class="header__benefitsWrapper">
                <ul>
                  <li>
                    <span class="icon__wrapper"><img src="../assets/image/applyImgs/icon-check-icon.svg" alt="" /></span>
                    Rates starting at 3.99%
                  </li>
                  <li>
                    <span class="icon__wrapper"><img src="../assets/image/applyImgs/icon-check-icon.svg" alt="" /></span>
                    Finance used or new vehicles
                  </li>
                  <li>
                    <span class="icon__wrapper"><img src="../assets/image/applyImgs/icon-check-icon.svg" alt="" /></span>
                    Buy from dealer or private seller
                  </li>
                  <li>
                    <span class="icon__wrapper"><img src="../assets/image/applyImgs/icon-check-icon.svg" alt="" /></span>
                    $0 downpayment in most cases
                  </li>
                  <li>
                    <span class="icon__wrapper"><img src="../assets/image/applyImgs/icon-check-icon.svg" alt="" /></span>
                    Nationwide contactless delivery
                  </li>
                  <li>
                    <span class="icon__wrapper"><img src="../assets/image/applyImgs/icon-check-icon.svg" alt="" /></span>
                    100% safe and secured
                  </li>
                </ul>
              </div>
              <div class="fs__btnWrapper">
                <a href="#formPage" class="fs__btn" style={{textDecoration:"none !important"}}>
                  Apply now
                  <span class="icon__arrow">
                    <img src="../assets/image/applyImgs/icon-long-arrow-white.svg" alt="" />
                  </span>
                </a>
                <small>Application takes less than 2 minutes</small>
              </div>

            </div>
          </div>
          <div class="col-md-6">
            <div class="banner__videoWrapper">
              <div class="banner__video">
                <iframe src="https://www.youtube.com/embed/GV9dFdiczQ8" width="560" height="314" scrolling="no" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
              </div>
            </div>
          </div>
        </div>
        <div class="banner__toprightImageWrap">
          <img src="../assets/image/applyImgs/banner-image-right.png" alt="" />
        </div>
      </section>

      <section class="section__getApprovedToday">
        <div class="section__container">
          <div class="section__header">
            <h2>Get Approved Today!</h2>
          </div>

          <div class="module__getApprovedTodayWrap" id="formPage" style={{height: path !== "/applynow/1" ? "690px" : "850px"}}>
            <PostApplicationV2 />
            {/* <img src="../assets/image/applyImgs/get-approved-today-img.jpg" alt="" class="content__image" /> */}
          </div>

        </div>
        <div class="section__bottomRightShapeWrap">
          <img src="../assets/image/applyImgs/approved-section-shape-bottom-left.svg" alt="" />
        </div>
      </section>
      {/* <!--/.section__getApprovedToday--> */}

      <section class="fs__whyChooseUsWrapper">
        <div class="fs__whyChooseUsRow">
          <div class="fs__whyChooseUsMainGrid fs__whyChooseUsMainGridLarge">
            <div class="row">

              <div class="col-md-6">
                <div class="fs__loanIntakeStepsMainWrap">
                  <h2>How to get Financing<br />from FinanceThat</h2>
                  <ul class="fs__loanIntakeStepsWrap">
                    <li>
                      <h3>Find Your Dream Vehicle</h3>
                      <p>Find a vehicle from our marketplace or anywhere else. We also finance private sales. All sellers and vehicles listed on our platform have been verified for ownership, are lien-free, and sold by the real owners.</p>
                    </li>
                    <li>
                      <h3>Apply and Get Approved</h3>
                      <p>When you have picked the vehicle you wish to purchase, apply to get pre-approved in less than 2 minutes!</p>
                    </li>
                    <li>
                      <h3>Enjoy your Vehicle!</h3>
                      <p>Get financed and enjoy your new vehicle! We will pay the seller within 24 hrs. Your vehicle will be ready for pick up within 24hrs – 48hrs.</p>
                    </li>
                  </ul>
                  <div class="fs__btnWrapper">
                    <a href="#formPage" className="fs__btn" style={{textDecoration:"none !important"}}>
                      Apply now
                      <span class="icon__arrow">
                        <img src="../assets/image/applyImgs/icon-long-arrow-white.svg" alt="" />
                      </span>
                    </a>
                    <small>Application takes less than 2 minutes</small>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="fs__loanIntakeStepsMainWrap fs__loanIntakeStepsMainWrapAlt">
                  <h2>Why choose Finance That to finance your vehicle</h2>
                  <ul class="fs__loanIntakeStepsWrap">
                    <li>
                      <h3>Competitive Rates</h3>
                      <p>Financing rates starts from as low as 3.99% based on your credit.</p>
                    </li>
                    <li>
                      <h3>Private Sale Financing</h3>
                      <p>Finance That provides financing for private listings. You can pick any vehicle, and we will help you with financing.</p>
                    </li>
                    <li>
                      <h3>Quick Processing</h3>
                      <p>Our agents can get you in your new vehicle quicker than any competitor.</p>
                    </li>
                    <li>
                      <h3>Safe and Secured</h3>
                      <p>Your data is secure with us, and no personal information is communicated with any third party.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="fs__whyChooseUsMainGrid fs__whyChooseUsMainGridSmall" style={{background:`url("../assets/image/applyImgs/why-choose-us-image.jpg")`}}>
            {/* <!-- <div class="fs__whyChooseUsImageWrap">
                <img src="../assets/image/applyImgs/why-choose-us.jpg" alt=""/>
            </div> --> */}
          </div>
        </div>

      </section>
      {/* <!--/.fs__loanFeaturesWrapper--> */}

      <section class="section__googleReviewWrapper">
        <div class="section__container">
          <div class="section__row">
            <div class="section__grid section__gridLogo">
              <div class="google__reviewLogoWrap">
                <img src="../assets/image/applyImgs/google-review-icon.svg" alt="Google Review" />
              </div>
            </div>
            <div class="section__grid section__gridDesc">
              <div class="google__reviewDescWrapper">
                <h3>We’re the top rated Powersport financing company on Google</h3>
                <p>Finance That has been helping American and Canadians with Auto and Powersport Financing since 2018</p>
                <a target="_blank" href="https://www.google.com/maps/place/Finance+That/@44.3275586,-79.7011039,15z/data=!4m2!3m1!1s0x0:0x77e1e00caa85cc65?sa=X&ved=2ahUKEwi0u8_mp_j3AhXhhIkEHXsPBrgQ_BJ6BAhVEAU" class="review__btn">Read our reviews on Google</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--/.section__googleReviewWrapper--> */}

      <section class="section__clientTestimonialsWrapper">
        <div class="section__container">
          <div class="section__header">
            <h2>What our customers says about us</h2>
          </div>
          <div class="section__row">

            <div class="section__Grid">
              <div class="client__testimonialWrap">
                <div class="client__descWrap">
                  <div class="star__ratingWrap">
                    <ul>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                    </ul>
                  </div>
                  <div class="review__descWrap">
                    <p>“This is the best company for any kind of auto or powersport financing. They are transparent, fair and reliable. I am more than happy to do business with them. And of course, they really deserve a 5 star rating.”</p>
                  </div>
                </div>
                <div class="review__userWrap">
                  <div class="user__wrap">
                    <div class="user__icon">
                      <img src="../assets/image/applyImgs/user-icon.svg" alt="" />
                    </div>
                    <div class="user__desc">
                      <h3>Donald Swain</h3>
                      <span>Buyer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="section__Grid">
              <div class="client__testimonialWrap">
                <div class="client__descWrap">
                  <div class="star__ratingWrap">
                    <ul>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                    </ul>
                  </div>
                  <div class="review__descWrap">
                    <p>“When I wanted to lease a new Camry LE I tried talking to a couple Toyota dealers. It seemed that the good deals were reserved for others, not me, When I went to Finance That online, I was treated the same as everyone else. I bought the Camry I wanted, slightly used, for a great price with payments lower than leasing I wanted and I am very thrilled. So much that I have trouble parking it for the night.”</p>
                  </div>
                </div>
                <div class="review__userWrap">
                  <div class="user__wrap">
                    <div class="user__icon">
                      <img src="../assets/image/applyImgs/user-icon.svg" alt="" />
                    </div>
                    <div class="user__desc">
                      <h3>Milo Perry</h3>
                      <span>Buyer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="section__Grid">
              <div class="client__testimonialWrap">
                <div class="client__descWrap">
                  <div class="star__ratingWrap">
                    <ul>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                    </ul>
                  </div>
                  <div class="review__descWrap">
                    <p>“They explained every little detail to me. They took care of all the paperwork as well. I am impressed, really! I just got a car loan from them and let me tell you, they're amazing.”</p>
                  </div>
                </div>
                <div class="review__userWrap">
                  <div class="user__wrap">
                    <div class="user__icon">
                      <img src="../assets/image/applyImgs/user-icon.svg" alt="" />
                    </div>
                    <div class="user__desc">
                      <h3>Julissa Sebastian</h3>
                      <span>Buyer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="section__Grid">
              <div class="client__testimonialWrap">
                <div class="client__descWrap">
                  <div class="star__ratingWrap">
                    <ul>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                      <li><img src="../assets/image/applyImgs/icon-star.svg" alt="" /></li>
                    </ul>
                  </div>
                  <div class="review__descWrap">
                    <p>I had a great experience with Finance That. The application process was very easy. They were all friendly and Brian who assisted me with my application was great! He got me out of a previous bad deal and now I'm in a car that I can afford. Great place to go to for to get financing on used vehicle.</p>
                  </div>
                </div>
                <div class="review__userWrap">
                  <div class="user__wrap">
                    <div class="user__icon">
                      <img src="../assets/image/applyImgs/user-icon.svg" alt="" />
                    </div>
                    <div class="user__desc">
                      <h3>Christopher Simmons</h3>
                      <span>Buyer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <Footer />

      {/* <!--/.section__googleReviewWrapper--> */}
    </div>
  );
}
export default ApplyNowHome