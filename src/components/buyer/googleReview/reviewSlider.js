import React, { useRef, useState } from "react";
import OwlCarousel from "react-owl-carousel2";
import ReviewCard from "./reviewCard";
import { reviews } from "./reviewsData";

export default function ReviewSlider() {
  const sliderRef = useRef(null);

  const [slideCount, setSlideCount] = useState(1);
  console.log(slideCount, "slide count");
  //   sliderOptions
  const options = {
    loop: true,
    margin: 20,
    autoplay: true,
    items: 1,
    nav: false,
    thumbs: true,
    thumbImage: true,
    dots: false,
    // navContainer: ".reviewContainer",
    navText: [
      "<i className='fa fa-angle-left'></i>",
      "<i className='fa fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 1,
        nav: false,
      },
      1000: {
        items: 1,
        nav: false,
        loop: false,
      },
      1200: {
        items: 1,
        nav: false,
        loop: false,
      },
    },
  };

  const events = {};

  const onNext = () => {
    sliderRef.current.next();
  };

  const onPrev = () => {
    sliderRef.current.prev();
  };

  //   main return
  return (
    <div className="reviewSlider">
      <OwlCarousel ref={sliderRef} options={options} events={events}>
        {reviews.map((item, index) => (
          <ReviewCard {...item} key={index} />
        ))}
      </OwlCarousel>
      <div className="action">
        <div className="sliderFooter">
          <div>
            <button onClick={onPrev}>
              <i class="fa fa-angle-left"></i>
            </button>
            <button onClick={onNext} className="ml-3">
              <i class="fa fa-angle-right"></i>
            </button>
          </div>
        </div>
        <div className="footerText">
          Swipe left or right to read more reviews
        </div>
      </div>
    </div>
  );
}
