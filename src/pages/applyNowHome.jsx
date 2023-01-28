import React from "react";
import GoogleReviews from "../components/buyer/googleReview/googleReviews";
import Footer from "../hoc/layout/footer/Footer";
import { history } from "../_helpers";
import "../assets/css/applyNowPage.css";
export default function applyNowHome() {
  const menuListData = [
    "Rates starting at 3.99%",
    "Buy from dealer or private seller",
    "Finance used or new vehicles",
    "$0 downpayment in most cases",
    "Nationwide contactless delivery",
    "100% safe and secured",
  ];
  const vehicalList = [
    { name: "ATV/UTV", image: "/assets/image/applyFinanceVehical1.svg" },
    {
      name: "Motorcycle",
      image: "/assets/image/applyFinanceVehical2.svg",
      margin: "8px",
    },
    {
      name: "Boat",
      image: "/assets/image/applyFinanceVehical3.svg",
      margin: "12px",
    },
    { name: "Watercraft", image: "/assets/image/applyFinanceVehical4.svg" },
    {
      name: "Snowmobile",
      image: "/assets/image/applyFinanceVehical5.svg",
      margin: "15px",
    },
    { name: "RV", image: "/assets/image/applyFinanceVehical6.svg" },
  ];
  const cardData = [
    {
      title: "Find your dream Vehicle",
      text: "Choose a vehicle from our marketplace or anywhere else, we also finance private sales. All sellers and vehicles listed on our platform have been verified for ownership, are lien-free and sold by the real owners.",
      image: "/assets/image/applyLandingCard1.svg",
    },
    {
      title: "Get Approved",
      text: "When you have picked the vehicle you wish to purchase, apply to get pre-approved in less than 2 minutes!",
      image: "/assets/image/applyLandingCard2.svg",
    },
    {
      title: "Enjoy your vehicle!.",
      image: "/assets/image/applyLandingCard3.svg",
      text: "Get financed and enjoy your new vehicle! We will pay the seller within 24 hrs. Your vehicle will be ready for pickup or contactless delivery within 24hrs – 48hrs.",
    },
  ];

  // main return
  return (
    <div className="applyNowMain">
      <section className="bannerSec">
        <div className="contentWrapper">
          <div className="subBanner">
            <img src="/assets/image/applyLandingBanner2.jpg" alt="subBanner" />
            <div className="bannertext">
              <h1>Get Approved Today! </h1>
              <h5>NO CREDIT - GOOD CREDIT - BAD CREDIT</h5>
            </div>
          </div>
          <div className="menuList">
            {menuListData.map((item, i) => {
              return (
                <div key={i} className="item">
                  <div className="circle">
                    <i class="fa fa-check"></i>
                  </div>
                  <span>{item}</span>
                </div>
              );
            })}

            <button
              onClick={() => {
                history.push("/post-application");
              }}
              className="primaryButton"
            >
              <img
                src="/assets/image/double-click.svg"
                alt="doubleClick"
                className="doubleClick"
              />
              <span>Apply Now</span>
            </button>
            <p>Application takes less than 2 minutes</p>
          </div>
        </div>
      </section>
      <section className="fiananceEverything">
        <div className="container-fluid">
          <div className=" row secWrapper">
            <div className="col-lg-6 px-0">
              <div className="vehicalSec">
                <h1>We finance everything</h1>
                <div className="vehicalFlexWrapper">
                  {vehicalList.map((item, i) => (
                    <div key={i} className="item">
                      <img src={item.image} alt="vehical"></img>
                      <h3 style={{ marginTop: item.margin }}>{item.name}</h3>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    history.push("/post-application");
                  }}
                  className="primaryButton "
                >
                  <img
                    src="/assets/image/double-click.svg"
                    alt="doubleClick"
                    className="doubleClick"
                  />
                  <span>Apply Now</span>
                </button>
                <p>Application takes less than 2 minutes</p>
              </div>
            </div>
            <div className="col-lg-6 px-0">
              <div className="videoSec">
                <div className="facebook-responsive" style={{ width: "100%" }}>
                  <iframe
                    src="https://youtu.be/GV9dFdiczQ8"
                    width="100%"
                    height="100%"
                    scrolling="no"
                    frameborder="0"
                    allowfullscreen="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen="true"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="howItWorks">
        <h1> HOW IT WORKS </h1>
        <div className="container-fluid">
          <div className="row cardFlex">
            {cardData?.map((item, index) => {
              return (
                <div className="col-md-4">
                  <div className="item">
                    <div className="centerFlex">
                      <img src={item.image} alt="card"></img>
                    </div>
                    <div className="flexCenter">
                      <div className="circle">{index + 1}</div>
                      <div className="content">
                        <h2>{item.title}</h2>
                        <div>{item.text}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <div className="w-100 text-center">
              <button
                onClick={() => {
                  history.push("/post-application");
                }}
                className="primaryButton "
              >
                <img
                  src="/assets/image/double-click.svg"
                  alt="doubleClick"
                  className="doubleClick"
                />
                <span>Apply Now</span>
              </button>
              <p className="px-3">Application takes less than 2 minutes</p>
            </div>
          </div>
        </div>
      </section>
      <section className="applyFeature">
        <div className="wrapper">
          <img
            src="/assets/image/applyFeature2.svg"
            alt="img"
            className="mb-3 mb-sm-0"
          ></img>
          <img src="/assets/image/applyFeature1.svg" alt="img"></img>
        </div>
      </section>
      <GoogleReviews />

      <div className="buttonWrapper">
        <div>
          <button
            onClick={() => {
              history.push("/post-application");
            }}
            className="primaryButton "
          >
            <img
              src="/assets/image/double-click.svg"
              alt="doubleClick"
              className="doubleClick"
            />
            <span>Apply Now</span>
          </button>
          <p>Application takes less than 2 minutes</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
